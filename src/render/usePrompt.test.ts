// The use prompt over a house object (Ed's playtest, 2026-10-26: "When she's in range they should light up and there's a prompt
// showing the button to press to open it"; then "Please remove words from the station tags. We used to have little keys to show
// 'WASD', can we use these for E"; render/houseRooms.ts): a keycap alone, the use button as bound on the device she plays with
// (Ed's layout, 2026-10-28: cross; platform/bindings.ts), so a remap shows on it.
import { afterEach, describe, expect, it } from "vitest";
import { useGlyph } from "./houseRooms";
import { bindings } from "../platform/bindings";

afterEach(() => bindings.resetAll());

describe("the use prompt", () => {
  it("is E on the keyboard, the pad's square on a pad (Ed, 2026-10-29), and a tap on touch: a keycap each, no words", () => {
    expect([useGlyph("keys"), useGlyph("pad"), useGlyph("touch")]).toEqual(["E", "pad:square", "TAP"]);
  });
  it("follows a remap", () => {
    bindings.set("game.use", { keys: ["KeyF"], pad: ["triangle"] });
    expect([useGlyph("keys"), useGlyph("pad")]).toEqual(["F", "pad:triangle"]);
  });
});
