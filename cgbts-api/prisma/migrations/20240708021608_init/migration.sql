-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "father_contact" TEXT,
ADD COLUMN     "father_dob" TEXT,
ADD COLUMN     "father_firstname" TEXT,
ADD COLUMN     "father_lastname" TEXT,
ADD COLUMN     "father_middlename" TEXT,
ADD COLUMN     "father_suffix" TEXT,
ADD COLUMN     "mother_contact" TEXT,
ADD COLUMN     "mother_dob" TEXT,
ADD COLUMN     "mother_firstname" TEXT,
ADD COLUMN     "mother_lastname" TEXT,
ADD COLUMN     "mother_middlename" TEXT,
ADD COLUMN     "mother_suffix" TEXT;

-- CreateTable
CREATE TABLE "child_info" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "suffix" TEXT,
    "DOB" TIMESTAMP(3) NOT NULL,
    "contact_number" TEXT,
    "users_id" INTEGER NOT NULL,

    CONSTRAINT "child_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "benefit_claims" (
    "claim_id" SERIAL NOT NULL,
    "claim_amount" DECIMAL(65,30) NOT NULL,
    "claim_status" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_ad" TIMESTAMP(0) NOT NULL,
    "remarks" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "benefit_type" INTEGER NOT NULL,

    CONSTRAINT "benefit_claims_pkey" PRIMARY KEY ("claim_id")
);

-- AddForeignKey
ALTER TABLE "child_info" ADD CONSTRAINT "child_info_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_claims" ADD CONSTRAINT "benefit_claims_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_claims" ADD CONSTRAINT "benefit_claims_benefit_type_fkey" FOREIGN KEY ("benefit_type") REFERENCES "agency_information"("agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;
