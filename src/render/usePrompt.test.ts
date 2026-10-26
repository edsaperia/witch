// The use prompt over a house object (Ed's playtest, 2026-10-26: "When she's in range they should light up and there's a prompt
// showing the button to press to open it"; render/houseRooms.ts): every object she can use says its button, on the device she plays
// with, and nothing at all while it's open.
import { describe, expect, it } from "vitest";
import { promptHtml, tagOf, USE_BUTTON } from "./houseRooms";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { deckOf } from "../rules/treehouse";

describe("the use prompt", () => {
  const g = newGame(123, TUNING), D = deckOf(g.map, g.tuning)!, W = g.witches[0];
  it("gives every house object a button: stations, tables, the telescope and the instruments too, not only what used E before", () => {
    for (const o of HOUSE_ROOMS.objects) expect(tagOf(o, W, D, { x: D.x, z: D.z }).act, o.id).toBeDefined();
    const by = (kind: string) => HOUSE_ROOMS.objects.find(o => o.use.kind === kind)!;
    expect(tagOf(by("instrument"), W, D, D).act).toBe("play");
    expect(tagOf(by("telescope"), W, D, D).act).toBe("look");
    expect(tagOf(by("bed"), W, D, D).hold).toBe(true);
  });
  it("shows E on the keyboard, □ on a pad and a tap on touch, and the name alone while it's open", () => {
    const say = { label: "Wardrobe", act: "" };
    expect(promptHtml(say, "keys")).toContain(`>${USE_BUTTON.keys}</b>`);
    expect(promptHtml(say, "pad")).toContain(`>${USE_BUTTON.pad}</b>`);
    expect(promptHtml(say, "touch")).toContain(`>${USE_BUTTON.touch}</b>`);
    expect(promptHtml(say, null)).toBe("Wardrobe");
    expect(promptHtml({ label: "Bed", act: "to sleep", hold: true }, "keys")).toMatch(/^Bed · hold <b[^>]*>E<\/b> to sleep$/);
    expect(promptHtml({ label: "A <b>", act: "x" }, "keys")).toContain("A &lt;b&gt;"); // (its words are text)
  });
});
