import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (
    error.message.includes("already exists") ||
    error.message.includes("not found")
  ) {
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(503).json({
      message: "Database unavailable",
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
