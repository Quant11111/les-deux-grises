-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Horse" ADD COLUMN     "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[];
