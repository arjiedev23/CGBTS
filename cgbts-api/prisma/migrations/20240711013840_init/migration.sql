/*
  Warnings:

  - Added the required column `agency_id` to the `benefits_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "benefits_types" ADD COLUMN     "agency_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "benefits_types" ADD CONSTRAINT "benefits_types_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "agency_information"("agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;
