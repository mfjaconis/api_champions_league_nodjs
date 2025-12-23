import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.string().transform(Number),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
