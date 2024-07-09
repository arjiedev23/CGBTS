/*
  Warnings:

  - You are about to drop the column `father_contact` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `father_dob` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `father_firstname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `father_lastname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `father_middlename` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `father_suffix` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `mother_contact` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `mother_dob` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `mother_firstname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `mother_lastname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `mother_middlename` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `mother_suffix` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `child_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "child_info" DROP CONSTRAINT "child_info_users_id_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "father_contact",
DROP COLUMN "father_dob",
DROP COLUMN "father_firstname",
DROP COLUMN "father_lastname",
DROP COLUMN "father_middlename",
DROP COLUMN "father_suffix",
DROP COLUMN "mother_contact",
DROP COLUMN "mother_dob",
DROP COLUMN "mother_firstname",
DROP COLUMN "mother_lastname",
DROP COLUMN "mother_middlename",
DROP COLUMN "mother_suffix",
ADD COLUMN     "pagibig_id" TEXT,
ADD COLUMN     "philhead_id" TEXT,
ADD COLUMN     "sss_id" TEXT;

-- DropTable
DROP TABLE "child_info";

-- CreateTable
CREATE TABLE "user_info" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "suffix" TEXT,
    "DOB" TIMESTAMP(3) NOT NULL,
    "relationship" TEXT NOT NULL,
    "contact_number" TEXT,
    "users_id" INTEGER NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
