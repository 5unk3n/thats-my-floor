/*
  Warnings:

  - The primary key for the `artists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `follower_count` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `lastfm_artist_id` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `artists` table. All the data in the column will be lost.
  - The `id` column on the `artists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `concert_artists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[mbid]` on the table `artists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mbid` to the `artists` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `artist_id` on the `concert_artists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `artist_id` on the `user_artists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- DropForeignKey
ALTER TABLE "concert_artists" DROP CONSTRAINT "concert_artists_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "user_artists" DROP CONSTRAINT "user_artists_artist_id_fkey";

-- DropIndex
DROP INDEX "artists_lastfm_artist_id_key";

-- AlterTable
ALTER TABLE "artists" DROP CONSTRAINT "artists_pkey",
DROP COLUMN "description",
DROP COLUMN "follower_count",
DROP COLUMN "genre",
DROP COLUMN "image",
DROP COLUMN "lastfm_artist_id",
DROP COLUMN "name",
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "mbid" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "artists_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "concert_artists" DROP CONSTRAINT "concert_artists_pkey",
DROP COLUMN "artist_id",
ADD COLUMN     "artist_id" INTEGER NOT NULL,
ADD CONSTRAINT "concert_artists_pkey" PRIMARY KEY ("concert_id", "artist_id");

-- AlterTable
ALTER TABLE "user_artists" DROP COLUMN "artist_id",
ADD COLUMN     "artist_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "mb_artist" (
    "id" SERIAL NOT NULL,
    "gid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sort_name" TEXT NOT NULL,
    "begin_date_year" SMALLINT,
    "begin_date_month" SMALLINT,
    "begin_date_day" SMALLINT,
    "end_date_year" SMALLINT,
    "end_date_month" SMALLINT,
    "end_date_day" SMALLINT,
    "type" INTEGER,
    "area" INTEGER,
    "gender" INTEGER,
    "comment" VARCHAR(255) NOT NULL DEFAULT '',
    "edits_pending" INTEGER NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "ended" BOOLEAN NOT NULL DEFAULT false,
    "begin_area" INTEGER,
    "end_area" INTEGER,

    CONSTRAINT "mb_artist_pkey" PRIMARY KEY ("gid")
);

-- CreateTable
CREATE TABLE "mb_artist_alias" (
    "id" SERIAL NOT NULL,
    "artist" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "locale" TEXT,
    "edits_pending" INTEGER NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER,
    "sort_name" VARCHAR NOT NULL,
    "begin_date_year" SMALLINT,
    "begin_date_month" SMALLINT,
    "begin_date_day" SMALLINT,
    "end_date_year" SMALLINT,
    "end_date_month" SMALLINT,
    "end_date_day" SMALLINT,
    "primary_for_locale" BOOLEAN NOT NULL DEFAULT false,
    "ended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mb_artist_alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mb_url" (
    "id" SERIAL NOT NULL,
    "gid" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "edits_pending" INTEGER NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mb_url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mb_l_artist_url" (
    "id" SERIAL NOT NULL,
    "link" INTEGER NOT NULL,
    "entity0" INTEGER NOT NULL,
    "entity1" INTEGER NOT NULL,
    "edits_pending" INTEGER NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "link_order" INTEGER NOT NULL DEFAULT 0,
    "entity0_credit" TEXT NOT NULL DEFAULT '',
    "entity1_credit" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "mb_l_artist_url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mb_link" (
    "id" SERIAL NOT NULL,
    "link_type" INTEGER NOT NULL,
    "begin_date_year" SMALLINT,
    "begin_date_month" SMALLINT,
    "begin_date_day" SMALLINT,
    "end_date_year" SMALLINT,
    "end_date_month" SMALLINT,
    "end_date_day" SMALLINT,
    "attribute_count" INTEGER NOT NULL DEFAULT 0,
    "created" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "ended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mb_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mb_link_type" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER,
    "child_order" INTEGER NOT NULL DEFAULT 0,
    "gid" UUID NOT NULL,
    "entity_type0" VARCHAR(50) NOT NULL,
    "entity_type1" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "link_phrase" VARCHAR(255) NOT NULL,
    "reverse_link_phrase" VARCHAR(255) NOT NULL,
    "long_link_phrase" VARCHAR(255) NOT NULL,
    "last_updated" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "is_deprecated" BOOLEAN NOT NULL DEFAULT false,
    "has_dates" BOOLEAN NOT NULL DEFAULT true,
    "entity0_cardinality" SMALLINT NOT NULL DEFAULT 0,
    "entity1_cardinality" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "mb_link_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replication_control" (
    "id" SERIAL NOT NULL,
    "current_schema_sequence" INTEGER NOT NULL,
    "current_replication_sequence" INTEGER,
    "last_replication_date" TIMESTAMPTZ,

    CONSTRAINT "replication_control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist_custom_aliases" (
    "id" SERIAL NOT NULL,
    "artist_mbid" UUID NOT NULL,
    "alias" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'user',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artist_custom_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mb_artist_id_key" ON "mb_artist"("id");

-- CreateIndex
CREATE INDEX "mb_artist_name_idx" ON "mb_artist" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "mb_artist_alias_name_idx" ON "mb_artist_alias" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "mb_l_artist_url_entity0_idx" ON "mb_l_artist_url"("entity0");

-- CreateIndex
CREATE INDEX "mb_l_artist_url_entity1_idx" ON "mb_l_artist_url"("entity1");

-- CreateIndex
CREATE INDEX "mb_link_link_type_idx" ON "mb_link"("link_type");

-- CreateIndex
CREATE INDEX "artist_custom_aliases_alias_idx" ON "artist_custom_aliases" USING GIN ("alias" gin_trgm_ops);

-- CreateIndex
CREATE UNIQUE INDEX "artists_mbid_key" ON "artists"("mbid");

-- CreateIndex
CREATE UNIQUE INDEX "user_artists_user_id_artist_id_key" ON "user_artists"("user_id", "artist_id");

-- AddForeignKey
ALTER TABLE "mb_artist_alias" ADD CONSTRAINT "mb_artist_alias_artist_fkey" FOREIGN KEY ("artist") REFERENCES "mb_artist"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mb_l_artist_url" ADD CONSTRAINT "mb_l_artist_url_entity0_fkey" FOREIGN KEY ("entity0") REFERENCES "mb_artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mb_l_artist_url" ADD CONSTRAINT "mb_l_artist_url_entity1_fkey" FOREIGN KEY ("entity1") REFERENCES "mb_url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mb_l_artist_url" ADD CONSTRAINT "mb_l_artist_url_link_fkey" FOREIGN KEY ("link") REFERENCES "mb_link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mb_link" ADD CONSTRAINT "mb_link_link_type_fkey" FOREIGN KEY ("link_type") REFERENCES "mb_link_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_custom_aliases" ADD CONSTRAINT "artist_custom_aliases_artist_mbid_fkey" FOREIGN KEY ("artist_mbid") REFERENCES "artists"("mbid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concert_artists" ADD CONSTRAINT "concert_artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_artists" ADD CONSTRAINT "user_artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
