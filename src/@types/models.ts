import { z } from "zod";

export const sCharacter = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  gender: z.string(),
  image: z.string().url(),
});

export type tCharacter = z.infer<typeof sCharacter>;
