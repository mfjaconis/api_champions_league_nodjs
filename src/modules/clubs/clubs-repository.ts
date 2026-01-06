import { prisma } from "../../lib/prisma";
import { ClubUpdate, CreateClubDto } from "./dtos/club-dto";

export class ClubsRepository {
  async createClubRepository(data: CreateClubDto) {
    return await prisma.club.create({
      data,
    });
  }

  async findClubName(name: string) {
    return await prisma.club.findUnique({
      where: {
        name,
      },
    });
  }

  async findAllClubs(skip: number, limit: number) {
    return await prisma.club.findMany({
      skip,
      take: limit,
      orderBy: { name: "asc" },
    });
  }

  async findClubById(id: string) {
    return await prisma.club.findUnique({
      where: {
        id,
      },
      include: {
        players: true,
      },
    });
  }

  async updateClub(id: string, data: ClubUpdate) {
    return prisma.club.update({
      where: { id },
      data,
    });
  }
}
