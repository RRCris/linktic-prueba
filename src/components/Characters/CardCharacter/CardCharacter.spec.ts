import { describe, expect, it } from "vitest";
import type { tCharacter } from "../../../@types/models";
import { render } from "@testing-library/vue";
import CardCharacter from "./CardCharacter.vue";

const MOCK_DATA: tCharacter = {
  id: 15,
  name: "Alien Rick",
  status: "unknown",
  species: "Alien",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
};
describe("CardCharacter.vue", () => {
  it("Deberia renderizar la informacion suministrada", () => {
    const screen = render(CardCharacter, {
      props: {
        character: MOCK_DATA,
        delay: 0,
      },
    });

    //verifica que existan en la pantalla
    screen.getByText(MOCK_DATA.name);
    screen.getByText(MOCK_DATA.status);
    const image: HTMLImageElement = screen.getByRole("img");

    expect(image.src).toEqual(MOCK_DATA.image);
  });
});
