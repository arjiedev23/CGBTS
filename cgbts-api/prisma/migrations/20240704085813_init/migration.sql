/*
  Warnings:

  - Added the required column `Contribution_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "Contribution_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_Contribution_id_fkey" FOREIGN KEY ("Contribution_id") REFERENCES "contributions"("contribution_id") ON DELETE RESTRICT ON UPDATE CASCADE;
