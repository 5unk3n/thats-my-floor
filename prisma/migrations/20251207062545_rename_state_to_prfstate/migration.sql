/*
  Warnings:

  - You are about to drop the column `state` on the `concerts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "concerts" DROP COLUMN "state",
ADD COLUMN     "prfstate" TEXT;
