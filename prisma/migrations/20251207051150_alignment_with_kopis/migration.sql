/*
  Warnings:

  - You are about to drop the column `date` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `kopis_id` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_open_date` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_price_max` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_price_min` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_status` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `venue_address` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `venue_map_link` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `venue_name` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the `booking_links` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mt20id]` on the table `concerts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fcltynm` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mt20id` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prfnm` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prfpdfrom` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prfpdto` to the `concerts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking_links" DROP CONSTRAINT "booking_links_concert_id_fkey";

-- DropIndex
DROP INDEX "concerts_date_idx";

-- DropIndex
DROP INDEX "concerts_kopis_id_key";

-- DropIndex
DROP INDEX "concerts_region_idx";

-- AlterTable
ALTER TABLE "concerts" DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "genre",
DROP COLUMN "kopis_id",
DROP COLUMN "region",
DROP COLUMN "ticket_open_date",
DROP COLUMN "ticket_price_max",
DROP COLUMN "ticket_price_min",
DROP COLUMN "ticket_status",
DROP COLUMN "title",
DROP COLUMN "venue_address",
DROP COLUMN "venue_map_link",
DROP COLUMN "venue_name",
ADD COLUMN     "dtguidance" TEXT,
ADD COLUMN     "entrpsnm" TEXT,
ADD COLUMN     "fcltynm" TEXT NOT NULL,
ADD COLUMN     "festival" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "genrenm" TEXT,
ADD COLUMN     "mt20id" TEXT NOT NULL,
ADD COLUMN     "openrun" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pcseguidance" TEXT,
ADD COLUMN     "prfage" TEXT,
ADD COLUMN     "prfcast" TEXT,
ADD COLUMN     "prfcrew" TEXT,
ADD COLUMN     "prfnm" TEXT NOT NULL,
ADD COLUMN     "prfpdfrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "prfpdto" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "prfruntime" TEXT,
ADD COLUMN     "relates" JSONB,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "sty" TEXT,
ADD COLUMN     "styurls" TEXT[],
ADD COLUMN     "visit" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "booking_links";

-- CreateIndex
CREATE UNIQUE INDEX "concerts_mt20id_key" ON "concerts"("mt20id");
