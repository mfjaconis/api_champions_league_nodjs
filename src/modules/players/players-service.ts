import { CreatePlayerDto, UpdatePlayerDto } from "./dto/players-dto";
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

    return this.repository.addPlayer({
      ...data,
      club: clubExists.name,
    });
  }

  async findAllPlayers() {
    const players = await this.repository.findAllPlayers();

    if (!players || players.length <= 0) {
      throw new Error("Players not found");
    }

    return players;
  }

  async findPlayerById(id: string) {
    const player = await this.repository.findPlayerById(id);

    if (!player) {
      throw new Error("Player not found");
    }

    return player;
  }

  async updatePlayerService(id: string, data: UpdatePlayerDto) {
    const player = await this.repository.findPlayerById(id);

    if (!player) {
      throw new Error("Player not found");
    }

    const updateData: UpdatePlayerDto = { ...data };

    if (data.clubName) {
      const clubExists = await this.repository.findClubByName(data.clubName);
      if (!clubExists) {
        throw new Error("Club not found");
      }
      updateData.clubName = clubExists.name;
    }

    return this.repository.updatePlayer(id, updateData);
  }

  async deletePlayerService(id: string) {
    const player = await this.repository.findPlayerById(id);

    if (!player) {
      throw new Error("Player not found");
    }

    await this.repository.deletePlayer(id);

    return {
      message: "Player deleted successfully",
      deletedPlayer: {
        id: player.id,
        name: player.name,
      },
    };
  }
}
