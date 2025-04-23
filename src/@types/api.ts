import { z } from "zod";
import { sCharacter } from "./models";

export const sCharacterList = z.object({ results: z.array(sCharacter) });
