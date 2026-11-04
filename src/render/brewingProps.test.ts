import { afterEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { KitchenCanvas } from "../test/kitchenCanvas";
import { newGame as fullGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { smallWorld } from "../test/worlds";
import { BrewingView as Before } from "./brewing.before.fixture";
import { BrewingView as After, smokePuffs } from "./brewing";
import { brewingFrame } from "./brewingFrame";
import type { View } from "./view";
import { kitchenLayout, kitchenPlan } from "../rules/mushrooms";
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
    // (the smoke's own puffs spread over the cauldron's reach since Ed, 2026-11-03: its front layer drawn anew, below)
    for (const id of state === "smoke" ? ["back", "halo"] : ["back", "front", "halo"]) {
      const a = panels(before)[id].canvas, b = panels(after)[id].canvas;
      expect(JSON.parse(JSON.stringify(b.context.commands))).toEqual(JSON.parse(JSON.stringify(a.context.commands)));
      expect(createHash("sha256").update(b.pixels).digest("hex")).toBe(createHash("sha256").update(a.pixels).digest("hex"));
      if (id === "back") expect(b.pixels.some(value => value > 0)).toBe(true);
      if (id === "front") expect(b.context.commands.length > 0).toBe(state === "two colours" || state === "smoke");
    }
    before.dispose(); after.dispose();
  });
});
// Ed, 2026-11-03: "The cauldron smoke effect should cover the 10m area for ten seconds or so".
describe("the cauldron's smoke over its reach", () => {
  it("spreads over the whole 10 m disc round the pot in its first 2.5 s, no puff's middle past the reach, fading in and out", () => {
    const at = (age: number, reach = 10) => smokePuffs(age, 10 - age, reach);
    const far = (ps: ReturnType<typeof smokePuffs>) => Math.max(...ps.map(q => Math.hypot(q.x, q.z)));
    expect(far(at(5))).toBeLessThanOrEqual(10); expect(far(at(5)) + Math.max(...at(5).map(q => q.rx))).toBeGreaterThan(10);
    expect(far(at(1.25))).toBeCloseTo(far(at(5)) / 2, 1);
    for (const ring of [2, 5, 8]) expect(at(5).some(q => Math.abs(Math.hypot(q.x, q.z) - ring) < 1), `puffs ${ring} m out`).toBe(true);
    expect(at(0)[0].alpha).toBe(0); expect(at(5)[0].alpha).toBeCloseTo(.65, 12); expect(smokePuffs(9.9, .1, 10)[0].alpha).toBeLessThan(.1);
    expect(far(at(5, 20))).toBeGreaterThan(15); // (the reach's slider, treehouse.house.cauldronReach)
  });
  it("sizes the kitchen's picture to hold the smoke's disc, classic and moved alike", () => {
    for (const placed of [false, true]) for (const reach of [10, 20]) {
      const layout = kitchenPlan(placed), F = brewingFrame(layout, 6, .4, placed, reach), pot = layout.cauldron;
      for (const q of smokePuffs(5, 5, reach)) {
        const x = F.ox + (pot.x - layout.room.x + q.x) * 6, y = F.oy + ((pot.z - layout.room.z + q.z) * .4 - q.h) * 6;
        expect(x - q.rx * 6, `${placed} ${reach}`).toBeGreaterThanOrEqual(-1e-6); expect(x + q.rx * 6).toBeLessThanOrEqual(F.width + 1e-6);
        expect(y - q.ry * 6).toBeGreaterThanOrEqual(-1e-6); expect(y + q.ry * 6).toBeLessThanOrEqual(F.height + 1e-6);
      }
    }
  });
});
