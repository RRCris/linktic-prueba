import { z } from "zod";
import { sCharacter, type tCharacter } from "../@types/models";

export const BASE_URL = "https://rickandmortyapi.com/api";
export async function getCharacters(): Promise<tCharacter[]> {
  const res = await fetch(`${BASE_URL}/character`);
  const { data, success, error } = z
    .object({ results: z.array(sCharacter) })
    .safeParse(await res.json());

  if (!success) throw new Error(`"Datos de personajes invalidos" : ${error}`);

  return data.results;
}
