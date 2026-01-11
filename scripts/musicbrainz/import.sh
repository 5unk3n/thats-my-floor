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

# 0. Check data availability
if [ ! -f "$DATA_DIR/artist" ]; then
    echo "❌ Error: Data not found."
    echo "   Please run './scripts/musicbrainz/download.sh' first."
    exit 1
fi

# 1. Read Schema Sequence from downloaded file (extracted from dump)
if [ -f "$DATA_DIR/SCHEMA_SEQUENCE" ]; then
    SCHEMA_SEQ=$(cat "$DATA_DIR/SCHEMA_SEQUENCE")
    echo "ℹ️  Found Schema Sequence: $SCHEMA_SEQ"
else
    echo "⚠️  Warning: SCHEMA_SEQUENCE file not found. Defaulting to 0."
    SCHEMA_SEQ=0
fi

# Read Replication Sequence
SEQ=$(cat "$DATA_DIR/REPLICATION_SEQUENCE")
if [ -z "$SEQ" ]; then
  echo "❌ Error: REPLICATION_SEQUENCE is empty."
  exit 1
fi

echo "🔢 Initial Setup | Schema: $SCHEMA_SEQ | Replication: $SEQ"


echo "📂 [1/4] Creating Shadow Tables..."

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
  DROP MATERIALIZED VIEW IF EXISTS mv_artist_search_new CASCADE;

  -- Ensure Extensions exist
  CREATE EXTENSION IF NOT EXISTS unaccent;
  CREATE EXTENSION IF NOT EXISTS pg_trgm;

  -- 1. mb_artist
  CREATE TABLE mb_artist_new (
      id SERIAL,
      gid UUID NOT NULL,
      name TEXT NOT NULL,
      sort_name TEXT NOT NULL,
      begin_date_year SMALLINT,
      begin_date_month SMALLINT,
      begin_date_day SMALLINT,
      end_date_year SMALLINT,
      end_date_month SMALLINT,
      end_date_day SMALLINT,
      type INTEGER,
      area INTEGER,
      gender INTEGER,
      comment VARCHAR(255) NOT NULL DEFAULT '',
      edits_pending INTEGER NOT NULL DEFAULT 0,
      last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      ended BOOLEAN NOT NULL DEFAULT false,
      begin_area INTEGER,
      end_area INTEGER,

      CONSTRAINT mb_artist_new_pkey PRIMARY KEY (gid)
  );

  -- 2. mb_artist_alias
  CREATE TABLE mb_artist_alias_new (
      id SERIAL,
      artist INTEGER NOT NULL,
      name VARCHAR NOT NULL,
      locale TEXT,
      edits_pending INTEGER NOT NULL DEFAULT 0,
      last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      type INTEGER,
      sort_name VARCHAR NOT NULL,
      begin_date_year SMALLINT,
      begin_date_month SMALLINT,
      begin_date_day SMALLINT,
      end_date_year SMALLINT,
      end_date_month SMALLINT,
      end_date_day SMALLINT,
      primary_for_locale BOOLEAN NOT NULL DEFAULT false,
      ended BOOLEAN NOT NULL DEFAULT false,

      CONSTRAINT mb_artist_alias_new_pkey PRIMARY KEY (id)
  );

  -- 3. mb_url
  CREATE TABLE mb_url_new (
      id SERIAL,
      gid UUID NOT NULL,
      url TEXT NOT NULL,
      edits_pending INTEGER NOT NULL DEFAULT 0,
      last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT mb_url_new_pkey PRIMARY KEY (id)
  );

  -- 4. mb_link
  CREATE TABLE mb_link_new (
      id SERIAL,
      link_type INTEGER NOT NULL,
      begin_date_year SMALLINT,
      begin_date_month SMALLINT,
      begin_date_day SMALLINT,
      end_date_year SMALLINT,
      end_date_month SMALLINT,
      end_date_day SMALLINT,
      attribute_count INTEGER NOT NULL DEFAULT 0,
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      ended BOOLEAN NOT NULL DEFAULT false,

      CONSTRAINT mb_link_new_pkey PRIMARY KEY (id)
  );

  -- 5. mb_link_type
  CREATE TABLE mb_link_type_new (
      id SERIAL,
      parent INTEGER,
      child_order INTEGER NOT NULL DEFAULT 0,
      gid UUID NOT NULL,
      entity_type0 VARCHAR(50) NOT NULL,
      entity_type1 VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      link_phrase VARCHAR(255) NOT NULL,
      reverse_link_phrase VARCHAR(255) NOT NULL,
      long_link_phrase VARCHAR(255) NOT NULL,
      last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      is_deprecated BOOLEAN NOT NULL DEFAULT false,
      has_dates BOOLEAN NOT NULL DEFAULT true,
      entity0_cardinality SMALLINT NOT NULL DEFAULT 0,
      entity1_cardinality SMALLINT NOT NULL DEFAULT 0,

      CONSTRAINT mb_link_type_new_pkey PRIMARY KEY (id)
  );

  -- 6. mb_l_artist_url
  CREATE TABLE mb_l_artist_url_new (
      id SERIAL,
      link INTEGER NOT NULL,
      entity0 INTEGER NOT NULL,
      entity1 INTEGER NOT NULL,
      edits_pending INTEGER NOT NULL DEFAULT 0,
      last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      link_order INTEGER NOT NULL DEFAULT 0,
      entity0_credit TEXT NOT NULL DEFAULT '',
      entity1_credit TEXT NOT NULL DEFAULT '',

      CONSTRAINT mb_l_artist_url_new_pkey PRIMARY KEY (id)
  );

  -- 7. replication_control
  CREATE TABLE replication_control_new (
      id SERIAL PRIMARY KEY,
      current_schema_sequence INTEGER NOT NULL,
      current_replication_sequence INTEGER,
      last_replication_date TIMESTAMPTZ
  );
EOF

echo "⬇️  [2/4] Loading Data..."

psql "$DATABASE_URL" -c "\copy mb_artist_new FROM '$DATA_DIR/artist' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_artist_alias_new FROM '$DATA_DIR/artist_alias' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_url_new FROM '$DATA_DIR/url' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_link_new FROM '$DATA_DIR/link' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_link_type_new FROM '$DATA_DIR/link_type' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"
psql "$DATABASE_URL" -c "\copy mb_l_artist_url_new FROM '$DATA_DIR/l_artist_url' WITH (FORMAT text, DELIMITER E'\t', NULL '\N')"

# Initialize Replication Control
psql "$DATABASE_URL" -c "INSERT INTO replication_control_new (current_schema_sequence, current_replication_sequence, last_replication_date) VALUES ($SCHEMA_SEQ, $SEQ, NOW());"

echo "📈 [3/4] Performing Atomic Switch..."

psql "$DATABASE_URL" <<EOF
  BEGIN;
    -- 1. Drop existing tables (Immediate Drop Strategy)
    -- We drop CASCADE to handle internal FKs (e.g. aliases referencing artist)
    DROP TABLE IF EXISTS mb_artist CASCADE;
    DROP TABLE IF EXISTS mb_artist_alias CASCADE;
    DROP TABLE IF EXISTS mb_url CASCADE;
    DROP TABLE IF EXISTS mb_l_artist_url CASCADE;
    DROP TABLE IF EXISTS mb_link CASCADE;
    DROP TABLE IF EXISTS mb_link_type CASCADE;
    DROP TABLE IF EXISTS replication_control CASCADE;
    DROP MATERIALIZED VIEW IF EXISTS mv_artist_search CASCADE;

    -- 2. Rename new tables to production names
    ALTER TABLE mb_artist_new RENAME TO mb_artist;
    ALTER TABLE mb_artist_alias_new RENAME TO mb_artist_alias;
    ALTER TABLE mb_url_new RENAME TO mb_url;
    ALTER TABLE mb_l_artist_url_new RENAME TO mb_l_artist_url;
    ALTER TABLE mb_link_new RENAME TO mb_link;
    ALTER TABLE mb_link_type_new RENAME TO mb_link_type;
    ALTER TABLE replication_control_new RENAME TO replication_control;

    -- 3. Rename Constraints & Indexes to match Prisma Expectations
    
    -- Rename Primary Keys (Remove _new suffix)
    ALTER TABLE mb_artist RENAME CONSTRAINT mb_artist_new_pkey TO mb_artist_pkey;
    ALTER TABLE mb_artist_alias RENAME CONSTRAINT mb_artist_alias_new_pkey TO mb_artist_alias_pkey;
    ALTER TABLE mb_url RENAME CONSTRAINT mb_url_new_pkey TO mb_url_pkey;
    ALTER TABLE mb_l_artist_url RENAME CONSTRAINT mb_l_artist_url_new_pkey TO mb_l_artist_url_pkey;
    ALTER TABLE mb_link RENAME CONSTRAINT mb_link_new_pkey TO mb_link_pkey;
    ALTER TABLE mb_link_type RENAME CONSTRAINT mb_link_type_new_pkey TO mb_link_type_pkey;
    ALTER TABLE replication_control RENAME CONSTRAINT replication_control_new_pkey TO replication_control_pkey;

    -- Create/Rename Indexes to match Prisma
    -- Note: We create them afresh here on the PRODUCTION tables for clarity and exact naming
    -- (We skipped index creation on _new tables except for MV)

    CREATE INDEX mb_artist_name_idx ON mb_artist USING GIN (name gin_trgm_ops);
    CREATE INDEX mb_artist_alias_name_idx ON mb_artist_alias USING GIN (name gin_trgm_ops);
    
    CREATE INDEX mb_l_artist_url_entity0_idx ON mb_l_artist_url(entity0);
    CREATE INDEX mb_l_artist_url_entity1_idx ON mb_l_artist_url(entity1);
    CREATE INDEX mb_link_link_type_idx ON mb_link(link_type);

    -- Unique Index for mb_artist.id (Prisma migration 1 had this)
    CREATE UNIQUE INDEX mb_artist_id_key ON mb_artist(id);

    -- 4. Restore Foreign Key Constraints (Match migration.sql)
    ALTER TABLE mb_artist_alias ADD CONSTRAINT mb_artist_alias_artist_fkey FOREIGN KEY (artist) REFERENCES mb_artist(id) ON DELETE NO ACTION ON UPDATE CASCADE;
    ALTER TABLE mb_l_artist_url ADD CONSTRAINT mb_l_artist_url_entity0_fkey FOREIGN KEY (entity0) REFERENCES mb_artist(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE mb_l_artist_url ADD CONSTRAINT mb_l_artist_url_entity1_fkey FOREIGN KEY (entity1) REFERENCES mb_url(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE mb_l_artist_url ADD CONSTRAINT mb_l_artist_url_link_fkey FOREIGN KEY (link) REFERENCES mb_link(id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE mb_link ADD CONSTRAINT mb_link_link_type_fkey FOREIGN KEY (link_type) REFERENCES mb_link_type(id) ON DELETE CASCADE ON UPDATE CASCADE;

  COMMIT;
EOF

echo "📈 [4/4] Creating Materialized View..."
psql "$DATABASE_URL" <<EOF
  -- Create Materialized View on PRODUCTION tables (for REFRESH support)
  CREATE MATERIALIZED VIEW mv_artist_search AS
  WITH artist_base AS (
      -- 1. Artist 본명
      SELECT
          gid,
          name AS canonical_name,
          name AS search_name,
          lower(unaccent(name)) AS search_name_normalized,
          comment,
          0::smallint AS source,
          ''::text AS locale,
          true AS is_primary,
          now() AS last_updated
      FROM mb_artist
      WHERE name IS NOT NULL

      UNION ALL

      -- 2. Artist alias
      SELECT DISTINCT
          a.gid,
          a.name AS canonical_name,
          aa.name AS search_name,
          lower(unaccent(aa.name)) AS search_name_normalized,
          a.comment,
          1::smallint AS source,
          COALESCE(aa.locale, '') AS locale,
          aa.primary_for_locale AS is_primary,
          now() AS last_updated
      FROM mb_artist a
      JOIN mb_artist_alias aa ON a.id = aa.artist
      WHERE aa.name IS NOT NULL
  )
  SELECT * FROM artist_base;

  -- MV Indexes (required for REFRESH CONCURRENTLY)
  CREATE UNIQUE INDEX idx_mv_artist_search_unique
  ON mv_artist_search (gid, search_name, source, locale, is_primary);

  CREATE INDEX idx_mv_artist_search_trgm
  ON mv_artist_search USING GIN (search_name_normalized gin_trgm_ops);
EOF

# Clean up can be manual or auto. Let's keep old tables for a bit for manual check if needed, or just drop.
# Echo "Cleaning up..."
# psql "$DATABASE_URL" -c "DROP TABLE IF EXISTS mb_artist_old CASCADE;" ...

echo "✅ Import Complete. Sequence: $SEQ"
