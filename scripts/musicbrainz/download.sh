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
echo "💾 [0/7] Checking disk space..."
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
echo "📂 [1/7] Creating data directory..."
mkdir -p "$DATA_DIR"

# 2. Check Latest Version
echo "🔍 [2/7] Checking latest version..."
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

# 3. Check if already downloaded
LOCK_FILE="$DATA_DIR/.version"
if [ -f "$LOCK_FILE" ]; then
  CURRENT_VERSION=$(cat "$LOCK_FILE")
  if [ "$CURRENT_VERSION" == "$VERSION" ]; then
    echo "✅ [3/7] Already on latest version ($VERSION). Skipping download."
    exit 0
  fi
fi
echo "   new version found (Current: ${CURRENT_VERSION:-None} -> New: $VERSION)."

# 4. Download
echo "⬇️  [4/7] Downloading Data..."

# Files to download
# We use the Core dump (mbdump) which contains 'artist', 'artist_alias'
FILE_NAME="mbdump.tar.bz2"
SEQ_FILE_NAME="REPLICATION_SEQUENCE"
SCHEMA_SEQ_FILE_NAME="SCHEMA_SEQUENCE"
TARGET_PATH="$DATA_DIR/$FILE_NAME"
SEQ_TARGET_PATH="$DATA_DIR/$SEQ_FILE_NAME"
SCHEMA_SEQ_TARGET_PATH="$DATA_DIR/$SCHEMA_SEQ_FILE_NAME"

echo "⬇️  [4/7] Downloading Data ($FILE_NAME)..."

if command -v curl >/dev/null 2>&1; then
  # -C - : Resumes download
  # --create-dirs : Creates target dir
  curl -C - -L --create-dirs "$DOWNLOAD_ROOT/$FILE_NAME" -o "$TARGET_PATH"
  curl -s -L --create-dirs "$DOWNLOAD_ROOT/$SEQ_FILE_NAME" -o "$SEQ_TARGET_PATH"
  curl -s -L --create-dirs "$DOWNLOAD_ROOT/$SCHEMA_SEQ_FILE_NAME" -o "$SCHEMA_SEQ_TARGET_PATH"
else
  echo "❌ Error: curl not found."
  exit 1
fi

# 5. Extract
echo "📦 [5/7] Extracting specific tables (artist, artist_alias, url, l_artist_url)..."

# Extract only needed files to save space/time
# Structure inside tar is usually "mbdump/artist", "mbdump/artist_alias"
if command -v tar >/dev/null 2>&1; then
  tar -xvf "$TARGET_PATH" -C "$DATA_DIR" mbdump/artist mbdump/artist_alias mbdump/url mbdump/l_artist_url mbdump/link mbdump/link_type
else
  echo "❌ Error: tar not found."
  exit 1
fi

# Move files to root of data dir for simpler access
mv "$DATA_DIR/mbdump/artist" "$DATA_DIR/artist"
mv "$DATA_DIR/mbdump/artist_alias" "$DATA_DIR/artist_alias"
mv "$DATA_DIR/mbdump/url" "$DATA_DIR/url"
mv "$DATA_DIR/mbdump/l_artist_url" "$DATA_DIR/l_artist_url"
mv "$DATA_DIR/mbdump/link" "$DATA_DIR/link"
mv "$DATA_DIR/mbdump/link_type" "$DATA_DIR/link_type"
rm -rf "$DATA_DIR/mbdump"

# 6. Cleanup
echo "🧹 [6/7] Cleaning up archives..."
rm "$TARGET_PATH"

# 7. Save Replication Sequence
echo "📝 [7/7] Saving replication sequence..."
# Save version (Date) as lock file
echo "$VERSION" > "$LOCK_FILE"

echo "✅ Download Workflow Complete."
