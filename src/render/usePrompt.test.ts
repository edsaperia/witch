// The use prompt over a house object (Ed's playtest, 2026-10-26: "When she's in range they should light up and there's a prompt
// showing the button to press to open it"; then "Please remove words from the station tags. We used to have little keys to show
// 'WASD', can we use these for E"; render/houseRooms.ts): a keycap alone, the button on the device she plays with.
import { describe, expect, it } from "vitest";
import { USE_GLYPH } from "./houseRooms";

describe("the use prompt", () => {
  it("is E on the keyboard, the pad's square on a pad, and a tap on touch: a keycap each, no words", () => {
    expect(USE_GLYPH).toEqual({ keys: "E", pad: "SQ", touch: "TAP" });
  });
});
