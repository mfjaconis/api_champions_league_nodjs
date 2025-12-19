import { prisma } from "../../lib/prisma";
import { CreateClubDto } from "./dtos/club-dto";

export class ClubsRepository {
  async createClubRepository(data: CreateClubDto) {
    return await prisma.club.create({
      data,
    });
  }

  async findClubNameRepository(name: string) {
    return await prisma.club.findUnique({
      where: {
        name,
      },
    });
  }

  async findAllClubsRepository() {
    return await prisma.club.findMany();
  }

  async findClubByIdRepository(id: string) {
    const clubById = await prisma.club.findUnique({
      where: {
        id,
      },
    });
    return clubById;
  }

  async updateClubRepository(id: string, data: CreateClubDto) {
    return prisma.club.update({
      where: { id },
      data,
    });
  }

  async deleteClubRepository(id: string) {
    return prisma.club.delete({
      where: { id },
    });
  }
}
