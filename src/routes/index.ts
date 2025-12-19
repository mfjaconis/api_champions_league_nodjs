import { Router } from "express";
import clubsRouter from "../modules/clubs/clubs.routes";

const router = Router();

router.use("/clubs", clubsRouter);

export default router;
