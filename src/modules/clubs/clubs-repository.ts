import { prisma } from "../../lib/prisma";
import { CreateClubDto } from "./dtos/create-club-dto";

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
}
