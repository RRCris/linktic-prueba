import { z } from "zod";
import { schema_character, type type_character } from "../@types/models";

const BASE_URL = "https://rickandmortyapi.com/api";
export async function getCharacters(): Promise<type_character[]> {
  const res = await fetch(`${BASE_URL}/character`);
  const { data, success, error } = z
    .object({ results: z.array(schema_character) })
    .safeParse(await res.json());

  if (!success) throw new Error(`"Datos de personajes invalidos" : ${error}`);

  return data.results;
}
