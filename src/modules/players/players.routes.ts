import { Router } from "express";
import { PlayersRepository } from "./players-respository";
import { PlayersService } from "./players-service";
import { PlayersController } from "./players-controller";
import {
  createPlayerSchema,
  updatePlayerSchema,
  playerIdParamSchema,
} from "./dto/players-dto";
import { validate } from "../../middlewares/validate";

const repository = new PlayersRepository();
const service = new PlayersService(repository);
const controller = new PlayersController(service);

const playersRouter = Router();

playersRouter.post(
  "/",
  validate(createPlayerSchema),
  controller.createPlayerController
);

playersRouter.get("/", controller.findAllPlayersController);

playersRouter.put(
  "/:id",
  validate(playerIdParamSchema, "params"),
  validate(updatePlayerSchema, "body"),
  controller.updatePlayerController
);

export default playersRouter;
