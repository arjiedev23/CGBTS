/*
  Warnings:

  - You are about to drop the column `catefory_id` on the `faq` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `faq` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "faq" DROP CONSTRAINT "faq_catefory_id_fkey";

-- AlterTable
ALTER TABLE "faq" DROP COLUMN "catefory_id",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "faq" ADD CONSTRAINT "faq_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "faqs_category"("faq_cateforyId") ON DELETE RESTRICT ON UPDATE CASCADE;
