/*
  Warnings:

  - You are about to drop the column `entrpsnm` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `genrenm` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `mt10id` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `openrun` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfage` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfcast` on the `concerts` table. All the data in the column will be lost.
  - You are about to drop the column `prfcrew` on the `concerts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "concerts" DROP COLUMN "entrpsnm",
DROP COLUMN "genrenm",
DROP COLUMN "mt10id",
DROP COLUMN "openrun",
DROP COLUMN "prfage",
DROP COLUMN "prfcast",
DROP COLUMN "prfcrew";
