import { prisma } from "../../lib/prisma";
import { CreatePlayerDto, UpdatePlayerDto } from "./dto/players-dto";

export class PlayersRepository {
  async addPlayer(data: CreatePlayerDto) {
    return await prisma.player.create({
      data: {
        name: data.name,
        nationality: data.nationality,
        position: data.position,
        clubs: {
          connect: {
            name: data.club,
          },
        },
        statistics: {
          create: {
            Overall: data.statistics.Overall,
            Pace: data.statistics.Pace,
            Shooting: data.statistics.Shooting,
            Passing: data.statistics.Passing,
            Dribbling: data.statistics.Dribbling,
            Defending: data.statistics.Defending,
            Physical: data.statistics.Physical,
          },
        },
      },
    });
  }

  async findClubByName(name: string) {
    return await prisma.club.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  async findPlayerByName(name: string) {
    return await prisma.player.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  async findAllPlayers() {
    return await prisma.player.findMany({
      include: {
        clubs: true,
      },
    });
  }

  async findPlayerById(id: string) {
    return await prisma.player.findUnique({
      where: {
        id,
      },
      include: {
        clubs: true,
      },
    });
  }

  async updatePlayer(id: string, data: UpdatePlayerDto) {
    const updateData: any = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }
    if (data.nationality !== undefined) {
      updateData.nationality = data.nationality;
    }
    if (data.position !== undefined) {
      updateData.position = data.position;
    }
    if (data.clubName !== undefined) {
      updateData.clubName = data.clubName;
    }

    if (data.statistics) {
      updateData.statistics = data.statistics;
    }

    return await prisma.player.update({
      where: { id },
      data: updateData,
      include: {
        clubs: true,
        statistics: true,
      },
    });
  }

  async deletePlayer(id: string) {
    await prisma.playerStatistics.deleteMany({
      where: { playerId: id },
    });

    return await prisma.player.delete({
      where: { id },
    });
  }
}
