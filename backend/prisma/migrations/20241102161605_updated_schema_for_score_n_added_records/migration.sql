/*
  Warnings:

  - You are about to drop the column `authorId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Score` table. All the data in the column will be lost.
  - Added the required column `recordId` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_authorId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "authorId",
DROP COLUMN "value",
ADD COLUMN     "recordId" TEXT NOT NULL,
ADD COLUMN     "result" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Records" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
