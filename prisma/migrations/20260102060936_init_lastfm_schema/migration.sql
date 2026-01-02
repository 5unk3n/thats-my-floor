/*
  Warnings:

  - You are about to drop the column `spotify_artist_id` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the `setlist_tracks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `setlists` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lastfm_artist_id]` on the table `artists` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "setlist_tracks" DROP CONSTRAINT "setlist_tracks_setlist_id_fkey";

-- DropForeignKey
ALTER TABLE "setlists" DROP CONSTRAINT "setlists_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "setlists" DROP CONSTRAINT "setlists_concert_id_fkey";

-- DropIndex
DROP INDEX "artists_spotify_artist_id_key";

-- AlterTable
ALTER TABLE "artists" DROP COLUMN "spotify_artist_id",
ADD COLUMN     "lastfm_artist_id" TEXT;

-- DropTable
DROP TABLE "setlist_tracks";

-- DropTable
DROP TABLE "setlists";

-- CreateIndex
CREATE UNIQUE INDEX "artists_lastfm_artist_id_key" ON "artists"("lastfm_artist_id");
