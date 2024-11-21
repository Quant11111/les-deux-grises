/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Horse` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `Horse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horse" DROP COLUMN "birthDate",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;
