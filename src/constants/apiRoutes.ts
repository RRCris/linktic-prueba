import { sCharacterList } from "../@types/api";
import { sCharacterExtends } from "../@types/models";

export const API_MAP = {
  character: { path: "/character", schema: sCharacterList },
  characterDetails: {
    path: (id: string | number) => `/character/${id}`,
    schema: sCharacterExtends,
  },
} as const;
