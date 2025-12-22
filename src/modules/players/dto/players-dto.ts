import z from "zod";

const playerStatisticsSchema = z.object({
  Overall: z.number().min(0).max(100),
  Pace: z.number().min(0).max(100),
  Shooting: z.number().min(0).max(100),
  Passing: z.number().min(0).max(100),
  Dribbling: z.number().min(0).max(100),
  Defending: z.number().min(0).max(100),
  Physical: z.number().min(0).max(100),
});

export const createPlayerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(100, "Name must have at most 100 characters"),
  club: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(100, "Name must have at most 100 characters"),
  nationality: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(15, "Name must have at most 15 characters"),
  position: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(15, "Name must have at most 15 characters"),
  statistics: playerStatisticsSchema,
});

export type CreatePlayerDto = z.infer<typeof createPlayerSchema>;
