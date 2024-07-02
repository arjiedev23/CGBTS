-- CreateTable
CREATE TABLE "contributions" (
    "contribution_id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "post_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "agency_id" INTEGER NOT NULL,

    CONSTRAINT "contributions_pkey" PRIMARY KEY ("contribution_id")
);

-- CreateTable
CREATE TABLE "agency_information" (
    "agency_id" SERIAL NOT NULL,
    "agency_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact_info" TEXT NOT NULL,

    CONSTRAINT "agency_information_pkey" PRIMARY KEY ("agency_id")
);

-- AddForeignKey
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "agency_information"("agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
