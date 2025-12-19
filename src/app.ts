import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use("/api", router);
  app.use(errorHandler);

  return app;
};

export default createApp;
