-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'ANALYZING_REQUEST', 'ANALYZING', 'REVIEWING', 'PUBLISHED', 'REJECTED');

-- AlterTable
ALTER TABLE "concerts" ADD COLUMN     "analysis_result" JSONB,
ADD COLUMN     "publish_status" "PublishStatus" NOT NULL DEFAULT 'DRAFT';
