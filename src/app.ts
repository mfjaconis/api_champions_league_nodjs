import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
      credentials: true,
    })
  );
  app.use("/api", router);
  app.use(errorHandler);

  return app;
};

export default createApp;
