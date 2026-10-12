import { describe, expect, it } from "vitest";
import { generateMap, HOME_LOOK } from "../rules/map";
import { tuningFromLink } from "./linkParams";
import { landingTypes } from "./landingBake";

describe("the landing's area types drawn ahead", () => {
  it("are home's meadow, the island's own kind, then the rest of its roster, once each", () => {
    const t = landingTypes("wolf", 0);
    expect(t[0]).toBe(HOME_LOOK);
    expect(new Set(t).size).toBe(t.length);
    expect(t.length).toBeGreaterThan(2);
  });
  it("are every area type the island's night draws, whatever its seed (its home area drawn as home's meadow)", () => {
    for (const island of ["wolf", "fox"]) {
      const want = new Set(landingTypes(island, 0)), { tuning } = tuningFromLink(new URLSearchParams({ island }));
      for (const seed of [1, 4242]) {
        const map = generateMap(seed, tuning);
        for (const [x, y] of map.cells) if (x !== map.centreCell[0] || y !== map.centreCell[1]) expect(want.has(map.typeOf(x, y)), `${island} seed ${seed}: type ${map.typeOf(x, y)}`).toBe(true);
      }
    }
  });
});
