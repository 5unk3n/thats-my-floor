/*
  Warnings:

  - You are about to drop the column `priority` on the `mb_link_type` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "mb_l_artist_url" ADD COLUMN     "entity0_credit" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "entity1_credit" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "link_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "mb_link_type" DROP COLUMN "priority",
ADD COLUMN     "entity0_cardinality" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "entity1_cardinality" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "has_dates" BOOLEAN NOT NULL DEFAULT true;
