import { sCharacterList } from "../@types/api";
import { sCharacter } from "../@types/models";

export const API_MAP = {
  character: { path: "/character", schema: sCharacterList },
  characterDetails: {
    path: (id: string | number) => `/character/${id}`,
    schema: sCharacter,
  },
} as const;
