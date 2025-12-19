import { z } from "zod";

export const createClubSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(100, "Name must have at most 100 characters"),
});

export const clubIdSchema = z.object({
  id: z.uuid("Invalid ID"),
});

export const clubSchema = createClubSchema;

export type CreateClubDto = z.infer<typeof createClubSchema>;
export type ClubIdDto = z.infer<typeof clubIdSchema>;
