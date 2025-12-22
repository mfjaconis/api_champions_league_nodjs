import { NextFunction, Request, Response } from "express";
import { CreatePlayerDto } from "./dto/players-dto";
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
}
