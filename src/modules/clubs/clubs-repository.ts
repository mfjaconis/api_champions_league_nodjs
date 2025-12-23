import { prisma } from "../../lib/prisma";
import { CreateClubDto } from "./dtos/club-dto";

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

  async findAllClubs() {
    return await prisma.club.findMany();
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

  async updateClub(id: string, data: CreateClubDto) {
    return prisma.club.update({
      where: { id },
      data,
    });
  }

  async deleteClub(id: string) {
    return prisma.club.delete({
      where: { id },
    });
  }
}
