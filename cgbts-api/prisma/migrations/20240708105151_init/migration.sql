-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "faq" (
    "faq_id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("faq_id")
);

-- CreateTable
CREATE TABLE "guides_tutorials" (
    "guide_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "guides_tutorials_pkey" PRIMARY KEY ("guide_id")
);
