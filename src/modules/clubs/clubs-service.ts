import { ClubsRepository } from "./clubs-repository";
import { ClubUpdate, CreateClubDto } from "./dtos/club-dto";

export class ClubsService {
  constructor(private repository: ClubsRepository) {}

  async createClub(data: CreateClubDto) {
    const clubExists = await this.repository.findClubName(data.name);

    if (clubExists) {
      throw new Error("Club already exists");
    }

    return this.repository.createClubRepository(data);
  }

  async findAllClubs(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return await this.repository.findAllClubs(skip, limit);
  }

  async findClubById(id: string) {
    const club = await this.repository.findClubById(id);

    if (!club) {
      throw new Error("Club not found");
    }

    return club;
  }

  async updateClub(id: string, data: ClubUpdate) {
    const club = await this.repository.findClubById(id);

    if (!club) {
      throw new Error("Club not found");
    }

    if (data.name && data.name !== club.name) {
      const clubExists = await this.repository.findClubName(data.name || "");
      if (clubExists) {
        throw new Error("Club name already exists");
      }
    }

    return this.repository.updateClub(id, data);
  }
}
