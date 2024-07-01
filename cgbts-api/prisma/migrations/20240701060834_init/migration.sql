/*
  Warnings:

  - Added the required column `updated_at` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date_of_birth` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "date_of_birth",
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL;
