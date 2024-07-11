/*
  Warnings:

  - The `claim_status` column on the `benefit_claims` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "benefit_claims" DROP COLUMN "claim_status",
ADD COLUMN     "claim_status" INTEGER NOT NULL DEFAULT 0;
