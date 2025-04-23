import { z } from "zod";
import { sCharacter } from "./models";

export const sCharacterList = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(sCharacter),
});

export type tCharacterList = z.infer<typeof sCharacterList>;
