import { Router } from "express";
import { ClubsController } from "./clubs-controller";
import { ClubsRepository } from "./clubs-repository";
import { ClubsService } from "./clubs-service";
import { validate } from "../../middlewares/validate";
import { createClubSchema } from "./dtos/create-club-dto";

const repository = new ClubsRepository();
const service = new ClubsService(repository);
const controller = new ClubsController(service);

const clubsRouter = Router();

clubsRouter.post(
  "/",
  validate(createClubSchema),
  controller.createClubController
);

export default clubsRouter;
