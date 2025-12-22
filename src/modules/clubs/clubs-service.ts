import { ClubsRepository } from "./clubs-repository";
import { CreateClubDto } from "./dtos/club-dto";

export class ClubsService {
  constructor(private repository: ClubsRepository) {}

  async createClubService(data: CreateClubDto) {
    const clubExists = await this.repository.findClubNameRepository(data.name);

    if (clubExists) {
      throw new Error("Club already exists");
    }

    return this.repository.createClubRepository(data);
  }

  async findAllClubsService() {
    const club = await this.repository.findAllClubsRepository();

    if (!club || club.length <= 0) {
      throw new Error("Club not found");
    }

    return await this.repository.findAllClubsRepository();
  }

  async findClubByIdService(id: string) {
    const club = await this.repository.findClubByIdRepository(id);

    if (!club) {
      throw new Error("Club not found");
    }

    return club;
  }

  async updateClubService(id: string, data: CreateClubDto) {
    const club = await this.repository.findClubByIdRepository(id);
    console.log(club);
    const clubExists = await this.repository.findClubNameRepository(data.name);

    if (clubExists) {
      throw new Error("Club name already exists");
    }

    if (!club) {
      throw new Error("Club not found");
    }

    return this.repository.updateClubRepository(id, data);
  }

  async deleteClubService(id: string) {
    const club = await this.repository.findClubByIdRepository(id);
    console.log("club", club);

    if (!club) {
      throw new Error("Club not found");
    }

    return this.repository.deleteClubRepository(id);
  }

  async findClubWithPlayersService(id: string) {
    const club = await this.repository.findClubWithPlayersRepository(id);

    if (!club) {
      throw new Error("Club not found");
    }

    return club;
  }
}
