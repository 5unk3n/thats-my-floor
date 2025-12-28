/*
  Warnings:

  - You are about to drop the column `area` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `dtguidance` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `fcltynm` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `festival` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `mt20id` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `pcseguidance` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfnm` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfpdfrom` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfpdto` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfruntime` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfstate` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `sty` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `styurls` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `visit` on the `concerts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kopis_id]` on the table `concerts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_date` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kopis_id` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `concerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `concerts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "concerts_mt20id_key";

-- AlterTable
ALTER TABLE "concerts" RENAME COLUMN "area" TO "region";
ALTER TABLE "concerts" RENAME COLUMN "dtguidance" TO "schedule";
ALTER TABLE "concerts" RENAME COLUMN "fcltynm" TO "place";
ALTER TABLE "concerts" RENAME COLUMN "festival" TO "is_festival";
ALTER TABLE "concerts" RENAME COLUMN "mt20id" TO "kopis_id";
ALTER TABLE "concerts" RENAME COLUMN "pcseguidance" TO "price";
ALTER TABLE "concerts" RENAME COLUMN "poster" TO "poster_url";
ALTER TABLE "concerts" RENAME COLUMN "prfnm" TO "title";
ALTER TABLE "concerts" RENAME COLUMN "prfpdfrom" TO "start_date";
ALTER TABLE "concerts" RENAME COLUMN "prfpdto" TO "end_date";
ALTER TABLE "concerts" RENAME COLUMN "prfruntime" TO "runtime";
ALTER TABLE "concerts" RENAME COLUMN "prfstate" TO "status";
ALTER TABLE "concerts" RENAME COLUMN "sty" TO "description";
ALTER TABLE "concerts" RENAME COLUMN "styurls" TO "images";
ALTER TABLE "concerts" RENAME COLUMN "visit" TO "is_global";

-- CreateIndex
CREATE UNIQUE INDEX "concerts_kopis_id_key" ON "concerts"("kopis_id");
