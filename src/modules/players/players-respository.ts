import { prisma } from "../../lib/prisma";
import { CreatePlayerDto } from "./dto/players-dto";

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
}
