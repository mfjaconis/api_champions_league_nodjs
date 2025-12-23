-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_clubName_fkey";

-- AlterTable
ALTER TABLE "players" ALTER COLUMN "clubName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_clubName_fkey" FOREIGN KEY ("clubName") REFERENCES "clubs"("name") ON DELETE SET NULL ON UPDATE CASCADE;
