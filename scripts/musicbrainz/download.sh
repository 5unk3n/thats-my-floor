#!/bin/bash

# MusicBrainz PostgreSQL Dump Download Script
# Supports: macOS (Darwin) and Linux/Windows (Git Bash)

set -e

# Configuration
DATA_DIR="./data/musicbrainz"
BASE_URL="https://data.metabrainz.org/pub/musicbrainz/data/fullexport"
LATEST_URL="$BASE_URL/LATEST"

echo "🚀 Starting MusicBrainz Download Workflow..."

# 0. Check Disk Space
echo "💾 [0/6] Checking disk space..."
REQUIRED_SPACE_GB=10
AVAILABLE_SPACE_KB=$(df -k . | awk 'NR==2 {print $4}')
REQUIRED_SPACE_KB=$(($REQUIRED_SPACE_GB * 1024 * 1024))

if [ "$AVAILABLE_SPACE_KB" -lt "$REQUIRED_SPACE_KB" ]; then
    AVAILABLE_SPACE_GB=$(awk "BEGIN {printf \"%.1f\", $AVAILABLE_SPACE_KB / 1024 / 1024}")
    echo "❌ Error: Not enough disk space."
    echo "   Required: ${REQUIRED_SPACE_GB}GB"
    echo "   Available: ${AVAILABLE_SPACE_GB}GB"
    exit 1
fi
echo "   Disk space check passed."

# 1. Directory Creation
echo "📂 [1/6] Creating data directory..."
mkdir -p "$DATA_DIR"

# Check for parallel decompression tools (7-Zip or lbzip2)
# This is STRICTLY REQUIRED for local full dump import because standard tar is too slow (1h+ vs 5min)
SEVEN_Z_CMD=""
LBZIP2_CMD=""

if command -v 7z >/dev/null 2>&1; then
  SEVEN_Z_CMD="7z"
elif command -v 7za >/dev/null 2>&1; then
  SEVEN_Z_CMD="7za"
elif [ -f "/c/Program Files/7-Zip/7z.exe" ]; then
  SEVEN_Z_CMD="/c/Program Files/7-Zip/7z.exe"
fi

if command -v lbzip2 >/dev/null 2>&1; then
  LBZIP2_CMD="lbzip2"
fi

if [ -z "$SEVEN_Z_CMD" ] && [ -z "$LBZIP2_CMD" ]; then
  echo "❌ Error: No optimized decompression tool found."
  echo "   Downloading and extracting MusicBrainz full dump requires multi-core decompression."
  echo "   Using standard 'tar' would take over an hour. Please install one of the following:"
  echo ""
  echo "   [Windows] Install 7-Zip (https://www.7-zip.org/)"
  echo "   [macOS]   brew install p7zip OR brew install lbzip2"
  echo "   [Linux]   sudo apt-get install lbzip2"
  echo ""
  exit 1
fi

if [ -n "$SEVEN_Z_CMD" ]; then
  echo "🚀 Optimized Decompression: Using 7-Zip ($SEVEN_Z_CMD)"
else
  echo "🚀 Optimized Decompression: Using lbzip2"
fi

# 1. Fetch Latest Version
echo "🔍 [2/6] Fetching LATEST version..."
if command -v curl >/dev/null 2>&1; then
  # Fetch the content of the LATEST file (e.g., "20250103-000001")
  VERSION=$(curl -s "$LATEST_URL" | tr -d '[:space:]')
else
  echo "❌ Error: curl is required."
  exit 1
fi

if [ -z "$VERSION" ]; then
  echo "❌ Error: Failed to fetch version from $LATEST_URL"
  exit 1
fi

echo "   Latest Version: $VERSION"

# Construct specific download URL
DOWNLOAD_ROOT="$BASE_URL/$VERSION"

# 3. Download
echo "⬇️  [3/6] Downloading Data..."

# Files to download
# We use the Core dump (mbdump) which contains 'artist', 'artist_alias'
FILE_NAME="mbdump.tar.bz2"
SEQ_FILE_NAME="REPLICATION_SEQUENCE"
SCHEMA_SEQ_FILE_NAME="SCHEMA_SEQUENCE"
TARGET_PATH="$DATA_DIR/$FILE_NAME"

echo "⬇️  [3/6] Downloading Data ($FILE_NAME)..."

if command -v curl >/dev/null 2>&1; then
  # -C - : Resumes download
  # --create-dirs : Creates target dir
  curl -C - -L --create-dirs "$DOWNLOAD_ROOT/$FILE_NAME" -o "$TARGET_PATH"
else
  echo "❌ Error: curl not found."
  exit 1
fi

# 4. Extract
echo "📦 [4/6] Extracting specific tables (artist, artist_alias, url, l_artist_url, link, link_type)..."

if [ -n "$SEVEN_Z_CMD" ]; then
  # 7-Zip is usually the fastest (Windows/Mac)
  # -so : write to stdout
  # Extract tables AND sequence files (which are inside the archive)
  "$SEVEN_Z_CMD" x "$TARGET_PATH" -so | tar -xvf - -C "$DATA_DIR" mbdump/artist mbdump/artist_alias mbdump/url mbdump/l_artist_url mbdump/link mbdump/link_type REPLICATION_SEQUENCE SCHEMA_SEQUENCE
elif [ -n "$LBZIP2_CMD" ]; then
  # Use lbzip2 with tar
  tar --use-compress-program=lbzip2 -xvf "$TARGET_PATH" -C "$DATA_DIR" mbdump/artist mbdump/artist_alias mbdump/url mbdump/l_artist_url mbdump/link mbdump/link_type REPLICATION_SEQUENCE SCHEMA_SEQUENCE
fi



# Move files to root of data dir for simpler access
mv "$DATA_DIR/mbdump/artist" "$DATA_DIR/artist"
mv "$DATA_DIR/mbdump/artist_alias" "$DATA_DIR/artist_alias"
mv "$DATA_DIR/mbdump/url" "$DATA_DIR/url"
mv "$DATA_DIR/mbdump/l_artist_url" "$DATA_DIR/l_artist_url"
mv "$DATA_DIR/mbdump/link" "$DATA_DIR/link"
mv "$DATA_DIR/mbdump/link_type" "$DATA_DIR/link_type"
rm -rf "$DATA_DIR/mbdump"

# 5. Cleanup
echo "🧹 [5/6] Cleaning up archives..."
rm "$TARGET_PATH"



echo "✅ Download Workflow Complete."
