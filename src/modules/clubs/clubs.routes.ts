import { Router } from "express";
import { ClubsController } from "./clubs-controller";
import { ClubsRepository } from "./clubs-repository";
import { ClubsService } from "./clubs-service";
import { validate } from "../../middlewares/validate";
import { clubSchema, clubIdSchema, updateClubSchema } from "./dtos/club-dto";

const repository = new ClubsRepository();
const service = new ClubsService(repository);
const controller = new ClubsController(service);

const clubsRouter = Router();

clubsRouter.post("/", validate(clubSchema), controller.createClub);

clubsRouter.get("/", controller.findAllClubsController);

clubsRouter.get(
  "/:id",
  validate(clubIdSchema, "params"),
  controller.findClubById
);

clubsRouter.put(
  "/:id",
  validate(clubIdSchema, "params"),
  validate(updateClubSchema, "body"),
  controller.updateClub
);

export default clubsRouter;
