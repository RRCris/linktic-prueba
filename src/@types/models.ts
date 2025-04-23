import { z } from "zod";

export const sCharacter = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  gender: z.string(),
  image: z.string().url(),
});

export const sCharacterExtends = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  gender: z.string(),
  image: z.string().url(),
  location: z.object({
    name: z.string(),
  }),
  origin: z.object({
    name: z.string(),
  }),
});

export type tCharacter = z.infer<typeof sCharacter>;
