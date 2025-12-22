import { Router } from "express";
import clubsRouter from "../modules/clubs/clubs.routes";
import playersRouter from "../modules/players/players.routes";

const router = Router();

router.use("/clubs", clubsRouter);
router.use("/players", playersRouter);

export default router;
