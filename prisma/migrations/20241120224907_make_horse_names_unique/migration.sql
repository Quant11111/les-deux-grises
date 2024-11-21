/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Horse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Horse_name_key" ON "Horse"("name");
