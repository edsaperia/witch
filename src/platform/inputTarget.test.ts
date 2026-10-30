import { expect, it } from "vitest";
import { textEntry } from "./inputTarget";
it("text editing owns periods and gameplay keys; sliders and game canvas keep their existing behavior", () => {
  const target = (tagName: string, type = "", isContentEditable = false) => ({ tagName, type, isContentEditable }) as unknown as EventTarget;
  for (const el of [target("TEXTAREA"), target("INPUT", "text"), target("DIV", "", true)]) expect(textEntry(el)).toBe(true);
  for (const el of [null, target("CANVAS"), target("INPUT", "range"), target("INPUT", "checkbox"), target("BUTTON")]) expect(textEntry(el)).toBe(false);
});
