import { afterEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { KitchenCanvas } from "../test/kitchenCanvas";
import { newGame as fullGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { smallWorld } from "../test/worlds";
import { BrewingView as Before } from "./brewing.before.fixture";
import { BrewingView as After } from "./brewing";
import type { View } from "./view";
import { kitchenLayout } from "../rules/mushrooms";
const newGame = smallWorld(fullGame, "Kitchen painter parity uses current state and prop placement, independent of distant island art.");
afterEach(() => vi.unstubAllGlobals());
describe("pure kitchen painter extraction", () => {
  for (const state of ["empty", "one colour", "two colours", "smoke"] as const) it(`preserves RGBA buffers and drawing order for ${state}`, () => {
    vi.stubGlobal("document", { createElement: () => new KitchenCanvas() });
    const g = newGame(123, TUNING); g.herTime = 1.5;
    g.mushrooms.ingredients = state === "empty" ? [] : state === "one colour" ? ["red"] : ["red", "blue"];
    g.mushrooms.baskets.red = state === "empty" ? 0 : 8; g.mushrooms.baskets.blue = state === "two colours" ? 20 : 0;
    if (state === "smoke") g.mushrooms.smoke = { at: 0, until: 4, recipe: ["red", "blue", "pink"] };
    if (state === "one colour") { const b = kitchenLayout(g).baskets[0]; Object.assign(g.witches[0].body, { x: b.x, z: b.z, perch: true, seated: false, mode: "ground" }); }
    const before = new Before(), after = new After(), v = { game: g, mpp: 1 / 6 } as View;
    const map = (x: number, z: number, dx: number, dy: number) => ({ x: x + dx, y: dy, z });
    before.update(v, map, .4); after.update(v, map, .4);
    const panels = (view: unknown) => view as Record<string, { canvas: KitchenCanvas }>;
    for (const id of ["back", "front", "halo"]) {
      const a = panels(before)[id].canvas, b = panels(after)[id].canvas;
      expect(JSON.parse(JSON.stringify(b.context.commands))).toEqual(JSON.parse(JSON.stringify(a.context.commands)));
      expect(createHash("sha256").update(b.pixels).digest("hex")).toBe(createHash("sha256").update(a.pixels).digest("hex"));
      if (id === "back") expect(b.pixels.some(value => value > 0)).toBe(true);
      if (id === "front") expect(b.context.commands.length > 0).toBe(state === "two colours" || state === "smoke");
    }
    before.dispose(); after.dispose();
  });
});
