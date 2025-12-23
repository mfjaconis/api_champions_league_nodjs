import { z } from "zod";

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

export const updatePlayerSchema = z
  .object({
    name: z.string().min(3).max(100).optional(),

    clubName: z.string().min(3).max(100).optional(),

    nationality: z.string().min(3).max(15).optional(),
    position: z.string().min(3).max(15).optional(),

    statistics: playerStatisticsSchema.optional(),
  })
  .transform((data) => ({
    ...data,
    statistics: data.statistics
      ? {
          update: data.statistics,
        }
      : undefined,
  }));

export const playerIdParamSchema = z.object({
  id: z.uuid("Invalid ID"),
});

export type CreatePlayerDto = z.infer<typeof createPlayerSchema>;
export type UpdatePlayerDto = z.infer<typeof updatePlayerSchema>;
export type PlayerIdParamDto = z.infer<typeof playerIdParamSchema>;
