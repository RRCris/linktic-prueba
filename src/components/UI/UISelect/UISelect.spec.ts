import { fireEvent, render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import UISelect from "./UISelect.vue";

const MOCK_OPTIONS = [
  { value: "", label: "Todas las especies" },
  { value: "Human", label: "Human" },
  { value: "Alien", label: "Alien" },
  { value: "Humanoid", label: "Humanoid" },
  { value: "Robot", label: "Robot" },
  { value: "Cronenberg", label: "Cronenberg" },
  { value: "Animal", label: "Animal" },
];
describe("UISelect.vue", () => {
  it("renderizar y elegir la opcion que tenga un value vacio", () => {
    const initValue = "";
    const selected = MOCK_OPTIONS.find((option) => option.value === initValue);
    if (!selected) throw new Error("Hay un error en el mock");
    const screen = render(UISelect, {
      props: {
        options: MOCK_OPTIONS,
        modelValue: initValue, // Provide an initial value for modelValue
      },
    });

    const select = screen.getByRole("button");

    expect(select.children[0]).toHaveTextContent(selected.label);
  });

  it("abrir las opciones al momento de clickear", async () => {
    const screen = render(UISelect, {
      props: {
        options: MOCK_OPTIONS,
        modelValue: "", // Provide an initial value for modelValue
      },
    });

    const select = screen.getByRole("button");
    await fireEvent.click(select);

    const option = screen.getByRole("option", { name: MOCK_OPTIONS[0].label });
    expect(option).not.toBeFalsy();
  });

  it("cambiar el label al momento de seleccionar y cerrar opciones", async () => {
    const screen = render(UISelect, {
      props: {
        options: MOCK_OPTIONS,
        modelValue: "", // Provide an initial value for modelValue
      },
    });
    const select = screen.getByRole("button");
    await fireEvent.click(select);

    const option = screen.getByRole("option", { name: MOCK_OPTIONS[1].label });

    await fireEvent.click(option);

    expect(screen.emitted()).toHaveProperty("update:modelValue");
    expect(screen.emitted()["update:modelValue"][0]).toEqual([
      MOCK_OPTIONS[1].value,
    ]);
    expect(() => screen.getByRole("option")).toThrow();
  });
});
