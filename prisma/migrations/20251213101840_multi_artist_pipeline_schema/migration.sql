/*
  Warnings:

  - The values [ANALYZING_REQUEST] on the enum `PublishStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `artist_id` on the `concerts` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PublishStatus_new" AS ENUM ('DRAFT', 'ANALYZING', 'REVIEWING', 'PUBLISHED', 'REJECTED');
ALTER TABLE "public"."concerts" ALTER COLUMN "publish_status" DROP DEFAULT;
ALTER TABLE "concerts" ALTER COLUMN "publish_status" TYPE "PublishStatus_new" USING ("publish_status"::text::"PublishStatus_new");
ALTER TYPE "PublishStatus" RENAME TO "PublishStatus_old";
ALTER TYPE "PublishStatus_new" RENAME TO "PublishStatus";
DROP TYPE "public"."PublishStatus_old";
ALTER TABLE "concerts" ALTER COLUMN "publish_status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "concerts" DROP CONSTRAINT "concerts_artist_id_fkey";

-- DropIndex
DROP INDEX "concerts_artist_id_idx";

-- AlterTable
ALTER TABLE "concerts" DROP COLUMN "artist_id";

-- CreateTable
CREATE TABLE "concert_artists" (
    "concert_id" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MAIN',

    CONSTRAINT "concert_artists_pkey" PRIMARY KEY ("concert_id","artist_id")
);

-- AddForeignKey
ALTER TABLE "concert_artists" ADD CONSTRAINT "concert_artists_concert_id_fkey" FOREIGN KEY ("concert_id") REFERENCES "concerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concert_artists" ADD CONSTRAINT "concert_artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
