import { afterEach, expect, it } from "vitest";
import { bindings } from "./bindings";
import { padPauseHeld } from "./freeze";

afterEach(() => bindings.resetAll());

it("Start always reaches pause when its configurable binding changes or is cleared", () => {
  const press = (i: number) => Array.from({ length: 17 }, (_, k) => k === i);
  bindings.set("global.pause", { pad: ["share"] });
  expect(padPauseHeld(press(9), [])).toBe(true);
  expect(padPauseHeld(press(8), [])).toBe(true);
  bindings.set("global.pause", { pad: [] });
  expect(padPauseHeld(press(9), [])).toBe(true);
  expect(padPauseHeld(press(8), [])).toBe(false);
});
