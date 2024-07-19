-- CreateTable
CREATE TABLE "user_security_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "user_security_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "security_question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_security_questions" ADD CONSTRAINT "user_security_questions_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
