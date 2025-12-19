import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validate = (
  schema: z.ZodTypeAny,
  target: ValidationTarget = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data =
        target === "body"
          ? req.body
          : target === "params"
          ? req.params
          : req.query;

      const validated = schema.parse(data);

      if (target === "body") {
        req.body = validated;
      } else if (target === "params") {
        req.params = validated as typeof req.params;
      } else {
        req.query = validated as typeof req.query;
      }

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
