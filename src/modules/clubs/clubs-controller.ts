import { Request, Response, NextFunction } from "express";
import { ClubsService } from "./clubs-service";
import { CreateClubDto } from "./dtos/create-club-dto";

export class ClubsController {
  constructor(private readonly service: ClubsService) {}

  createClubController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const club = await this.service.createClubService(
        req.body as CreateClubDto
      );
      return res.status(201).json(club);
    } catch (error) {
      next(error);
    }
  };
}
