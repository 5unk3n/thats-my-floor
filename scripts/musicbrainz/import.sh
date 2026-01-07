#!/bin/bash

# MusicBrainz Import Script (Initial Setup)
# Replaces refresh-db.sh

set -e

# Configuration
DATA_DIR="./data/musicbrainz"
ENV_FILE=".env"
export PGCLIENTENCODING=UTF8

echo "🚀 Starting MusicBrainz Database Import..."

# 1. Load DATABASE_URL
if [ -f "$ENV_FILE" ]; then
  DATABASE_URL=$(grep '^DATABASE_URL=' "$ENV_FILE" | cut -d'=' -f2- | sed "s/^'//;s/'$//;s/^\"//;s/\"$//")
fi

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL not found in $ENV_FILE"
  exit 1
fi

# 2. Check Data Files
REQUIRED_FILES=("artist" "artist_alias" "url" "l_artist_url" "REPLICATION_SEQUENCE" "SCHEMA_SEQUENCE")
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$DATA_DIR/$file" ]; then
    echo "❌ Error: Required file '$file' not found in $DATA_DIR"
    echo "   Please run ./scripts/musicbrainz/download.sh first."
    exit 1
  fi
done

# Read Replication Sequence
SEQ=$(cat "$DATA_DIR/REPLICATION_SEQUENCE")
if [ -z "$SEQ" ]; then
  echo "❌ Error: REPLICATION_SEQUENCE is empty."
  exit 1
fi

# Read Schema Sequence
SCHEMA_SEQ=$(cat "$DATA_DIR/SCHEMA_SEQUENCE")
if [ -z "$SCHEMA_SEQ" ]; then
  echo "❌ Error: SCHEMA_SEQUENCE is empty."
  exit 1
fi

echo "🔢 Initial Setup | Schema: $SCHEMA_SEQ | Replication: $SEQ"


echo "📂 [1/5] Creating Shadow Tables..."

# Use psql to create tables mirroring MusicBrainz Structure
# Reference: https://musicbrainz.org/doc/MusicBrainz_Database/Schema

psql "$DATABASE_URL" <<EOF
  -- Clean up
  DROP TABLE IF EXISTS mb_artist_new CASCADE;
  DROP TABLE IF EXISTS mb_artist_alias_new CASCADE;
  DROP TABLE IF EXISTS mb_url_new CASCADE;
  DROP TABLE IF EXISTS mb_l_artist_url_new CASCADE;
  DROP TABLE IF EXISTS mb_link_new CASCADE;
  DROP TABLE IF EXISTS mb_link_type_new CASCADE;
  DROP TABLE IF EXISTS replication_control_new CASCADE;

  -- 1. mb_artist
  CREATE TABLE mb_artist_new (
      id INTEGER,
      gid UUID PRIMARY KEY,
      name TEXT,
      sort_name TEXT,
      begin_date_year SMALLINT,
      begin_date_month SMALLINT,
      begin_date_day SMALLINT,
      end_date_year SMALLINT,
      end_date_month SMALLINT,
      end_date_day SMALLINT,
      type INTEGER,
      area INTEGER,
      gender INTEGER,
      comment TEXT,
      edits_pending INTEGER,
      last_updated TIMESTAMP WITH TIME ZONE,
      ended BOOLEAN,
      begin_area INTEGER,
      end_area INTEGER
  );

  -- 2. mb_artist_alias
  CREATE TABLE mb_artist_alias_new (
      id INTEGER PRIMARY KEY,
      artist INTEGER,
      name TEXT,
      locale TEXT,
      edits_pending INTEGER,
      last_updated TIMESTAMP WITH TIME ZONE,
      type INTEGER,
      sort_name TEXT,
      begin_date_year SMALLINT,
      begin_date_month SMALLINT,
      begin_date_day SMALLINT,
      end_date_year SMALLINT,
      end_date_month SMALLINT,
      end_date_day SMALLINT,
      primary_for_locale BOOLEAN,
      ended BOOLEAN
  );

  -- 3. mb_url
  CREATE TABLE mb_url_new (
      id INTEGER PRIMARY KEY,
      gid UUID,
      url TEXT,
      edits_pending INTEGER,
      last_updated TIMESTAMP WITH TIME ZONE
  );

  -- 4. mb_link
  CREATE TABLE mb_link_new (
      id INTEGER PRIMARY KEY,
      link_type INTEGER,
      begin_date_year SMALLINT,
      begin_date_month SMALLINT,
      begin_date_day SMALLINT,
      end_date_year SMALLINT,
      end_date_month SMALLINT,
      end_date_day SMALLINT,
      attribute_count INTEGER,
      created TIMESTAMP WITH TIME ZONE,
      ended BOOLEAN
  );

  -- 5. mb_link_type
  CREATE TABLE mb_link_type_new (
      id INTEGER PRIMARY KEY,
      parent INTEGER,
      child_order INTEGER,
      gid UUID,
      entity_type0 TEXT,
      entity_type1 TEXT,
      name TEXT,
      description TEXT,
      link_phrase TEXT,
      reverse_link_phrase TEXT,
      long_link_phrase TEXT,
      priority INTEGER,
      last_updated TIMESTAMP WITH TIME ZONE,
      is_deprecated BOOLEAN
  );

  -- 6. mb_l_artist_url
  CREATE TABLE mb_l_artist_url_new (
      id INTEGER PRIMARY KEY,
      link INTEGER,
      entity0 INTEGER,
      entity1 INTEGER,
      edits_pending INTEGER,
      last_updated TIMESTAMP WITH TIME ZONE
  );

  -- 7. replication_control
  CREATE TABLE replication_control_new (
      id SERIAL PRIMARY KEY,
      current_schema_sequence INTEGER,
      current_replication_sequence INTEGER,
      last_replication_date TIMESTAMP WITH TIME ZONE
  );
EOF

echo "⬇️  [2/5] Loading Data..."

psql "$DATABASE_URL" -c "\copy mb_artist_new FROM '$DATA_DIR/artist' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_artist_alias_new FROM '$DATA_DIR/artist_alias' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_url_new FROM '$DATA_DIR/url' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_link_new FROM '$DATA_DIR/link' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_link_type_new FROM '$DATA_DIR/link_type' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_l_artist_url_new FROM '$DATA_DIR/l_artist_url' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"

# Initialize Replication Control
psql "$DATABASE_URL" -c "INSERT INTO replication_control_new (current_schema_sequence, current_replication_sequence, last_replication_date) VALUES ($SCHEMA_SEQ, $SEQ, NOW());"

echo "📈 [3/5] Creating Indexes..."
psql "$DATABASE_URL" <<EOF
  CREATE INDEX idx_mb_artist_new_name_trgm ON mb_artist_new USING GIN (name gin_trgm_ops);
  CREATE INDEX idx_mb_artist_alias_new_name_trgm ON mb_artist_alias_new USING GIN (name gin_trgm_ops);
  CREATE INDEX idx_mb_artist_alias_new_artist ON mb_artist_alias_new(artist);
  
  -- mb_l_artist_url indexes
  CREATE INDEX idx_mb_l_artist_url_new_artist ON mb_l_artist_url_new(entity0);
  CREATE INDEX idx_mb_l_artist_url_new_url ON mb_l_artist_url_new(entity1);
  
  -- mb_link indexes
  CREATE INDEX idx_mb_link_new_link_type ON mb_link_new(link_type);
EOF

echo "🔄 [4/5] Performing Atomic Switch..."

psql "$DATABASE_URL" <<EOF
  BEGIN;
    -- Drop old backups if exist (cleaning up previous runs)
    DROP TABLE IF EXISTS mb_artist_old CASCADE;
    DROP TABLE IF EXISTS mb_artist_alias_old CASCADE;
    DROP TABLE IF EXISTS mb_url_old CASCADE;
    DROP TABLE IF EXISTS mb_l_artist_url_old CASCADE;
    DROP TABLE IF EXISTS mb_link_old CASCADE;
    DROP TABLE IF EXISTS mb_link_type_old CASCADE;
    DROP TABLE IF EXISTS replication_control_old CASCADE;

    -- Rename current (if exists) into 'old'
    DO \$\$
    BEGIN
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mb_artist') THEN
          ALTER TABLE mb_artist RENAME TO mb_artist_old;
      END IF;
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mb_artist_alias') THEN
          ALTER TABLE mb_artist_alias RENAME TO mb_artist_alias_old;
      END IF;
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mb_url') THEN
          ALTER TABLE mb_url RENAME TO mb_url_old;
      END IF;
       IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mb_link') THEN
          ALTER TABLE mb_link RENAME TO mb_link_old;
      END IF;
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mb_link_type') THEN
          ALTER TABLE mb_link_type RENAME TO mb_link_type_old;
      END IF;
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mb_l_artist_url') THEN
          ALTER TABLE mb_l_artist_url RENAME TO mb_l_artist_url_old;
      END IF;
       IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'replication_control') THEN
          ALTER TABLE replication_control RENAME TO replication_control_old;
      END IF;
    END \$\$;

    -- Rename new into current
    ALTER TABLE mb_artist_new RENAME TO mb_artist;
    ALTER TABLE mb_artist_alias_new RENAME TO mb_artist_alias;
    ALTER TABLE mb_url_new RENAME TO mb_url;
    ALTER TABLE mb_link_new RENAME TO mb_link;
    ALTER TABLE mb_link_type_new RENAME TO mb_link_type;
    ALTER TABLE mb_l_artist_url_new RENAME TO mb_l_artist_url;
    ALTER TABLE replication_control_new RENAME TO replication_control;
    
  COMMIT;
EOF

# Clean up can be manual or auto. Let's keep old tables for a bit for manual check if needed, or just drop.
# Echo "Cleaning up..."
# psql "$DATABASE_URL" -c "DROP TABLE IF EXISTS mb_artist_old CASCADE;" ...

echo "✅ Import Complete. Sequence: $SEQ"
