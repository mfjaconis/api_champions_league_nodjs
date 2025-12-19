import { z } from "zod";

export const createClubSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(100, "Name must have at most 100 characters"),
});

export type CreateClubDto = z.infer<typeof createClubSchema>;
