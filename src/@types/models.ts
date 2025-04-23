import { z } from "zod";

export const schema_character = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  gender: z.string(),
  image: z.string().url(),
});

export type type_character = z.infer<typeof schema_character>;
