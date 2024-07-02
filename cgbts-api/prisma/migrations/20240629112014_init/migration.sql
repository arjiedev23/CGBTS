-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_role_Id_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "role_Id" SET DEFAULT 1;
