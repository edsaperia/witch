// The great stumps' deal (render/markers.ts stumpDeal; Ed, 2026-10-29: "a different stump per area type"): every area a spec, its
// form its type's (art/props/stumps.js stumpForArea), at most `variants` shapes a type, the same every time.
import { describe, expect, it } from "vitest";
import { generateMap } from "../rules/map";
import { TUNING, withTuning } from "../rules/tuning";
import { stumpDeal } from "./markers";
import { stumpId } from "./artBuild";
import { largestWorldTuning } from "../test/worlds";

// Largest shipped world: stump allocation must cover all area types and repeated variants.
const T = largestWorldTuning(withTuning({ runeMarkers: { ...TUNING.runeMarkers, stump: { ...TUNING.runeMarkers.stump!, on: true } } }));

describe("the great stumps' deal", () => {
  it("gives every area a stump of its type's form and colours, at most `variants` of a type, the same each time", () => {
    const map = generateMap(123, T), d = stumpDeal(T, map), again = stumpDeal(T, map), byType = new Map<number, Set<string>>(), form = new Map<number, string>();
    for (const [cx, cy] of map.cells) {
      const s = d.specs.get(`${cx},${cy}`)!, type = map.typeOf(cx, cy);
      expect(s, `${cx},${cy}`).toBeTruthy();
      expect(stumpId(again.specs.get(`${cx},${cy}`)!)).toBe(stumpId(s));
      if (form.has(type)) expect(s.species).toBe(form.get(type)); else form.set(type, s.species);
      let ids = byType.get(type); if (!ids) byType.set(type, (ids = new Set())); ids.add(stumpId(s));
    }
    for (const ids of byType.values()) expect(ids.size).toBeLessThanOrEqual(T.runeMarkers.stump!.variants);
  });
});
