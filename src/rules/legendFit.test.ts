import { describe, expect, it } from "vitest";
import { LEGEND_SIZES, legendRadius, overflow, radiusToFit } from "./legendFit";
import { AREA_TYPES, generateMap } from "./map";
import { TUNING } from "./tuning";

const LC = TUNING.legendClearing;

// Ed, 2026-10-26: "Legend circles need to be larger. Often legends don't fit in them."
describe("legend circles sized to fit their legends (rules/legendFit.ts)", () => {
  it("has every area's creature measured (config/legend-footprints.json: node tools/legends/footprint.mjs)", () => {
    for (const t of AREA_TYPES) if (t.creature) expect(LEGEND_SIZES[t.creature], t.creature).toBeDefined();
  });
  it("never makes a circle smaller than it was, nor bigger than the cap", () => {
    for (const sp of Object.keys(LEGEND_SIZES)) {
      const r = legendRadius(sp, LC);
      expect(r, sp).toBeGreaterThanOrEqual(LC.species[sp] ?? LC.radius);
      expect(r, sp).toBeLessThanOrEqual(Math.max(LC.species[sp] ?? LC.radius, LC.fit!.max));
    }
  });
  it("fits every legend that can fit under the cap, with its margin to spare, as the map places its circle", () => {
    for (const seed of [1, 123, 4242, 90210]) {
      const map = generateMap(seed, TUNING);
      for (const c of map.legendClearings) {
        const sp = AREA_TYPES[map.typeOf(c.cell[0], c.cell[1])].creature;
        if (radiusToFit(sp, LC) > LC.fit!.max) continue; // (the giants: GIANTS below)
        if (c.r < legendRadius(sp, LC) - 1e-6) continue; // (a circle squeezed smaller to fit a tight area: rules/map.ts)
        expect(overflow(sp, c.r, LC), `${sp} in ${c.cell} (seed ${seed})`).toBeLessThanOrEqual(-LC.fit!.margin + 1e-6);
      }
    }
  });
  it("lists the legends too big for any circle under the cap (waiting on Ed's call: drawn smaller asleep, or the circles allowed bigger)", () => {
    const giants = Object.keys(LEGEND_SIZES).filter(sp => radiusToFit(sp, LC) > LC.fit!.max).sort();
    expect(giants).toEqual(GIANTS);
  });
});

/** Too wide asleep for a circle of fit.max (25 m) with the margin, at the legend's place (top 0.45). */
const GIANTS = ["crocodile", "elephant", "elk", "frostwyrm", "griffin", "jaguar", "lion", "sphinx", "stegosaurus", "tiger", "unicorn"];
