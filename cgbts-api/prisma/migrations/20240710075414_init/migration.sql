/*
  Warnings:

  - You are about to drop the column `philhead_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `benefit_type` on the `benefit_claims` table. All the data in the column will be lost.
  - Added the required column `agency_id` to the `benefit_claims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `btype_id` to the `benefit_claims` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "benefit_claims" DROP CONSTRAINT "benefit_claims_benefit_type_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "philhead_id",
ADD COLUMN     "philhealth_id" TEXT;

-- AlterTable
ALTER TABLE "benefit_claims" DROP COLUMN "benefit_type",
ADD COLUMN     "agency_id" INTEGER NOT NULL,
ADD COLUMN     "btype_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "benefit_claims" ADD CONSTRAINT "benefit_claims_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "agency_information"("agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_claims" ADD CONSTRAINT "benefit_claims_btype_id_fkey" FOREIGN KEY ("btype_id") REFERENCES "benefits_types"("btypes_id") ON DELETE RESTRICT ON UPDATE CASCADE;
