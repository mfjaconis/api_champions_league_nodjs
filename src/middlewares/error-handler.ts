import { Request, Response, NextFunction } from "express";

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

  return res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
