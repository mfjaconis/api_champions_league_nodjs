import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.reduce((acc, issue) => {
          const field = issue.path.join(".");
          acc[field] = issue.message;
          return acc;
        }, {} as Record<string, string>);

        return res.status(400).json({
          message: "Validation error",
          errors: formattedErrors,
        });
      }

      next(error);
    }
  };
};
