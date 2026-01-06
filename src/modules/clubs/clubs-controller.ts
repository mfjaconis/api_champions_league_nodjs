import { Request, Response, NextFunction } from "express";
import { ClubsService } from "./clubs-service";
import { ClubUpdate, CreateClubDto } from "./dtos/club-dto";

export class ClubsController {
  constructor(private readonly service: ClubsService) {}

  createClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const club = await this.service.createClub(req.body as CreateClubDto);
      return res.status(201).json(club);
    } catch (error) {
      next(error);
    }
  };

  findAllClubsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const club = await this.service.findAllClubs(page, limit);
      return res.status(200).json(club);
    } catch (error) {
      next(error);
    }
  };

  findClubById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const club = await this.service.findClubById(id);
      return res.status(200).json(club);
    } catch (error) {
      next(error);
    }
  };

  updateClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedClub = await this.service.updateClub(
        id,
        req.body as ClubUpdate
      );
      return res.status(200).json(updatedClub);
    } catch (error) {
      next(error);
    }
  };
}
