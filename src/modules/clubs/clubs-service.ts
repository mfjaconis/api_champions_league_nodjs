import { ClubsRepository } from "./clubs-repository";
import { CreateClubDto } from "./dtos/create-club-dto";

export class ClubsService {
  constructor(private repository: ClubsRepository) {}

  async createClubService(data: CreateClubDto) {
    const clubExists = await this.repository.findClubNameRepository(data.name);

    if (clubExists) {
      throw new Error("Club already exists");
    }

    return this.repository.createClubRepository(data);
  }
}
