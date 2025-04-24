import { test } from "vitest";
import { render } from "@testing-library/vue";

import UIButton from "../../components/UI/UIButton.vue";

test("render button", () => {
  render(UIButton, {});
});
