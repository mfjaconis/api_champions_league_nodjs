import { ClubsRepository } from "./clubs-repository";
import { CreateClubDto } from "./dtos/club-dto";

export class ClubsService {
  constructor(private repository: ClubsRepository) {}

  async createClub(data: CreateClubDto) {
    const clubExists = await this.repository.findClubName(data.name);

    if (clubExists) {
      throw new Error("Club already exists");
    }

    return this.repository.createClubRepository(data);
  }

  async findAllClubs() {
    const club = await this.repository.findAllClubs();

    if (!club || club.length <= 0) {
      throw new Error("Club not found");
    }

    return club;
  }

  async findClubById(id: string) {
    const club = await this.repository.findClubById(id);

    if (!club) {
      throw new Error("Club not found");
    }

    return club;
  }

  async updateClub(id: string, data: CreateClubDto) {
    const club = await this.repository.findClubById(id);

    const clubExists = await this.repository.findClubName(data.name);

    if (clubExists) {
      throw new Error("Club name already exists");
    }

    if (!club) {
      throw new Error("Club not found");
    }

    return this.repository.updateClub(id, data);
  }

  async deleteClub(id: string) {
    const club = await this.repository.findClubById(id);

    if (!club) {
      throw new Error("Club not found");
    }

    const clubId = club.id;
    return this.repository.deleteClub(clubId);
  }
}
