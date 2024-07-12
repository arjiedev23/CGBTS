/*
  Warnings:

  - You are about to drop the column `processed_ad` on the `benefit_claims` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "benefit_claims" DROP COLUMN "processed_ad",
ADD COLUMN     "processed_at" TIMESTAMP(0);
