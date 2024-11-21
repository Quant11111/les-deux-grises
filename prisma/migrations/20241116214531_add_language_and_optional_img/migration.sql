-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "image" TEXT,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en';
