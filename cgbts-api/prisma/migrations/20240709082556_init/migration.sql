/*
  Warnings:

  - You are about to drop the column `category` on the `faq` table. All the data in the column will be lost.
  - Added the required column `catefory_id` to the `faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faq" DROP COLUMN "category",
ADD COLUMN     "catefory_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "benefits_types" (
    "btypes_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "required_month" INTEGER NOT NULL,

    CONSTRAINT "benefits_types_pkey" PRIMARY KEY ("btypes_id")
);

-- CreateTable
CREATE TABLE "faqs_category" (
    "faq_cateforyId" SERIAL NOT NULL,
    "faq_categoryName" TEXT NOT NULL,

    CONSTRAINT "faqs_category_pkey" PRIMARY KEY ("faq_cateforyId")
);

-- AddForeignKey
ALTER TABLE "faq" ADD CONSTRAINT "faq_catefory_id_fkey" FOREIGN KEY ("catefory_id") REFERENCES "faqs_category"("faq_cateforyId") ON DELETE RESTRICT ON UPDATE CASCADE;
