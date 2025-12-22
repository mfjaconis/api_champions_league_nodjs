import { CreatePlayerDto } from "./dto/players-dto";
import { PlayersRepository } from "./players-respository";

export class PlayersService {
  constructor(private repository: PlayersRepository) {}

  async createPlayerService(data: CreatePlayerDto) {
    const playerExists = await this.repository.findPlayerByName(data.name);
    const clubExists = await this.repository.findClubByName(data.club);

    if (!clubExists) {
      throw new Error("Club not found");
    }

    if (playerExists) {
      throw new Error("Player already exists");
    }

    // Usa o nome correto do clube (com o case correto do banco)
    return this.repository.addPlayer({
      ...data,
      club: clubExists.name,
    });
  }
}
