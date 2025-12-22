/*
  Warnings:

  - You are about to drop the column `clubId` on the `players` table. All the data in the column will be lost.
  - Added the required column `clubName` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_clubId_fkey";

-- AlterTable
ALTER TABLE "players" DROP COLUMN "clubId",
ADD COLUMN     "clubName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_clubName_fkey" FOREIGN KEY ("clubName") REFERENCES "clubs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
