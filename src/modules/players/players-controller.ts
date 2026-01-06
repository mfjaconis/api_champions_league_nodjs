import { NextFunction, Request, Response } from "express";
import { CreatePlayerDto, UpdatePlayerDto } from "./dto/players-dto";
import { PlayersService } from "./players-service";

export class PlayersController {
  constructor(private readonly service: PlayersService) {}

  createPlayerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const player = await this.service.createPlayerService(
        req.body as CreatePlayerDto
      );
      return res.status(201).json(player);
    } catch (error) {
      next(error);
    }
  };

  findAllPlayersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const players = await this.service.findAllPlayers();
      return res.status(200).json(players);
    } catch (error) {
      next(error);
    }
  };

  findPlayerByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const player = await this.service.findPlayerById(id);
      return res.status(200).json(player);
    } catch (error) {
      next(error);
    }
  };

  updatePlayerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const player = await this.service.updatePlayerService(
        id,
        req.body as UpdatePlayerDto
      );
      return res.status(200).json(player);
    } catch (error) {
      next(error);
    }
  };

  deletePlayerController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const player = await this.service.deletePlayerService(id);
      return res.status(200).json(player);
    } catch (error) {
      next(error);
    }
  };
}
