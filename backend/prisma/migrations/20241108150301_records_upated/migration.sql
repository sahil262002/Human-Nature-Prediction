/*
  Warnings:

  - You are about to drop the column `authorId` on the `Records` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Records" DROP CONSTRAINT "Records_authorId_fkey";

-- AlterTable
ALTER TABLE "Records" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
