/*
  Warnings:

  - You are about to drop the column `image` on the `Article` table. All the data in the column will be lost.
  - Added the required column `englishDescription` to the `Horse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frenchDescription` to the `Horse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "image",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "horseIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "links" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Horse" ADD COLUMN     "articleIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "englishDescription" TEXT NOT NULL,
ADD COLUMN     "frenchDescription" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "links" TEXT[] DEFAULT ARRAY[]::TEXT[];
