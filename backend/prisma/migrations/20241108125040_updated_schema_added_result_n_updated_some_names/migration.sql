/*
  Warnings:

  - You are about to drop the column `result` on the `Score` table. All the data in the column will be lost.
  - Added the required column `inputByUser` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "result",
ADD COLUMN     "inputByUser" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "outputByModel" INTEGER NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
