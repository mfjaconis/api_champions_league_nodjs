import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { env } from "../config/env";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
