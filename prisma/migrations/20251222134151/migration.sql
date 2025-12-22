/*
  Warnings:

  - Added the required column `nationality` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "statistics" (
    "id" TEXT NOT NULL,
    "Overall" INTEGER NOT NULL,
    "Pace" INTEGER NOT NULL,
    "Shooting" INTEGER NOT NULL,
    "Passing" INTEGER NOT NULL,
    "Dribbling" INTEGER NOT NULL,
    "Defending" INTEGER NOT NULL,
    "Physical" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "statistics_playerId_key" ON "statistics"("playerId");

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
