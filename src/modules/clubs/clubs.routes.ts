import { Router } from "express";
import { ClubsController } from "./clubs-controller";
import { ClubsRepository } from "./clubs-repository";
import { ClubsService } from "./clubs-service";
import { validate } from "../../middlewares/validate";
import { clubSchema, clubIdSchema } from "./dtos/club-dto";

const repository = new ClubsRepository();
const service = new ClubsService(repository);
const controller = new ClubsController(service);

const clubsRouter = Router();

clubsRouter.post("/", validate(clubSchema), controller.createClubController);

clubsRouter.get("/", controller.findAllClubsController);

clubsRouter.get(
  "/:id",
  validate(clubIdSchema, "params"),
  controller.findClubByIdController
);

clubsRouter.put(
  "/:id",
  validate(clubIdSchema, "params"),
  validate(clubSchema, "body"),
  controller.updateClubController
);

clubsRouter.delete(
  "/:id",
  validate(clubIdSchema, "params"),
  controller.deleteClubController
);

export default clubsRouter;
