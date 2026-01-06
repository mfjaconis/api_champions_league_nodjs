import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.url(),
  PORT: z.string().transform(Number),
  ALLOWED_ORIGINS: z.string().default("*"),
});

export const env = envSchema.parse(process.env);
