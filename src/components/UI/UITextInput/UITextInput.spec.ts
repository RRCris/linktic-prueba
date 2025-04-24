import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import UITextInput from "./UITextInput.vue";

describe("UITextInput.vue", () => {
  it("Renderizar data inicial", () => {
    const initialText = "initial text";
    const screen = render(UITextInput, { props: { modelValue: initialText } });

    const input: HTMLInputElement = screen.getByRole("textbox");

    expect(input.value).toEqual(initialText);
  });

  it("debe intentar actualizarse", async () => {
    const initialText = "initial text";
    const updateText = "X";
    const screen = render(UITextInput, { props: { modelValue: initialText } });

    const input: HTMLInputElement = screen.getByRole("textbox");

    await userEvent.type(input, updateText);

    expect(screen.emitted()).toHaveProperty("update:modelValue");
    expect(screen.emitted()["update:modelValue"][0]).toEqual([
      initialText + updateText,
    ]);
  });
});
