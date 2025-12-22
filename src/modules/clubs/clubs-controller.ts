import { Request, Response, NextFunction } from "express";
import { ClubsService } from "./clubs-service";
import { CreateClubDto } from "./dtos/club-dto";

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

  findAllClubsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const club = await this.service.findAllClubsService();
      return res.status(200).json(club);
    } catch (error) {
      next(error);
    }
  };

  findClubByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const clubById = await this.service.findClubByIdService(id);

      return res.status(200).json(clubById);
    } catch (error) {
      next(error);
    }
  };

  updateClubController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const updatedClub = await this.service.updateClubService(
        id,
        req.body as CreateClubDto
      );
      return res.status(200).json(updatedClub);
    } catch (error) {
      next(error);
    }
  };

  deleteClubController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await this.service.deleteClubService(id);
      return res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  findClubWithPlayersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const club = await this.service.findClubWithPlayersService(id);
      return res.status(200).json(club);
    } catch (error) {
      next(error);
    }
  };
}
