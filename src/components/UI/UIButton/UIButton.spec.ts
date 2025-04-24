import { render } from "@testing-library/vue";

import UIButton from "./UIButton.vue";
import { describe, expect, it } from "vitest";

describe("UIButton.vue", () => {
  it("renderizar estilo 'primary'", () => {
    const text = "Boton Primario";
    const screen = render(UIButton, {
      slots: {
        default: text,
      },
    });
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(text);
    expect(button.className).toContain("bg-[var(--primary-color)]");
    expect(button.className).toContain("text-white");
  });

  it("renderizar estilo 'secondary'", () => {
    const text = "Boton Secundario";
    const screen = render(UIButton, {
      props: {
        estilo: "secondary",
      },
      slots: {
        default: text,
      },
    });
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(text);
    //verifico que no tenga los estilos de primary
    expect(button.className).not.toContain("var(--primary-color)");
    expect(button.className).not.toContain("text-white");

    //verifico que  tenga los estilos de secondary
    expect(button.className).toContain("bg-gray-200");
    expect(button.className).toContain("text-gray-700");
  });

  it("en caso de renderizar con un estilo invalido no agregar clases ", () => {
    const text = "Boton Default";
    const screen = render({
      components: { UIButton },
      template: `<UIButton estilo="inexistente" >${text}</UIButton>`,
    });
    const button = screen.getByRole("button");
    expect(button.className).not.toContain("var(--primary-color)");
    expect(button.className).not.toContain("bg-gray-200");
  });
});
