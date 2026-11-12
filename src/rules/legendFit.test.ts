import { describe, expect, it } from "vitest";
import { LEGEND_SIZES, backOf, legendRadius, legendSpot, overflow, radiusToFit, spotShare } from "./legendFit";
import { AREA_TYPES, generateMap } from "./map";
import { TUNING as gameTuning } from "./tuning";
import { spawnCreatures } from "./creatures";
import { largestWorldTuning } from "../test/worlds";
// Largest shipped world: legend placement must be checked against every available area type and footprint.
const TUNING = largestWorldTuning(gameTuning);

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
        if (radiusToFit(sp, LC) > LC.fit!.max) continue; // (over-cap identities are in the informational report)
        if (c.r < legendRadius(sp, LC) - 1e-6) continue; // (a circle squeezed smaller to fit a tight area: rules/map.ts)
        expect(overflow(sp, c.r, LC), `${sp} in ${c.cell} (seed ${seed})`).toBeLessThanOrEqual(-LC.fit!.margin + 1e-6);
      }
    }
  });
});

// Ed, 2026-11-12: "Legends should sleep at the back of their circles, so you can stand in the circle before them." The back is the
// side furthest from the camera (north, -z): the camera looks north, so she stands in front of it, nearer the camera.
describe("legends sleep at the back of their circles (rules/legendFit.ts spotShare)", () => {
  const margin = LC.fit!.margin, back = backOf(LC);
  it("lies further back than it did (top x r), and as far back as the knob says where its circle is its full size", () => {
    expect(back).toBeGreaterThan(LC.top);
    for (const sp of Object.keys(LEGEND_SIZES)) {
      const r = legendRadius(sp, LC), k = spotShare(sp, r, LC);
      expect(k, sp).toBeGreaterThanOrEqual(LC.top);
      expect(k, sp).toBeLessThanOrEqual(back);
      if (radiusToFit(sp, LC) <= r + 1e-9) expect(k, sp).toBeCloseTo(back, 9); // (not capped: all the way back)
    }
  });
  it("keeps its whole sleeping body inside the circle and off its ring, where its circle could be its full size", () => {
    for (const seed of [1, 123, 4242, 90210]) {
      const map = generateMap(seed, TUNING);
      for (const c of map.legendClearings) {
        const sp = AREA_TYPES[map.typeOf(c.cell[0], c.cell[1])].creature, k = spotShare(sp, c.r, LC);
        expect(c.legend.x, sp).toBeCloseTo(c.x, 9);
        expect(c.z - c.legend.z, `${sp} in ${c.cell} (seed ${seed})`).toBeCloseTo(c.r * k, 9);
        if (radiusToFit(sp, LC) > c.r + 1e-9) continue; // (a circle capped or squeezed under what it needs: as far back as it fits, never forward of top)
        // its sleeping width, laid across where it lies, ends margin metres inside the radius: past the ring (edge metres wide, inside it)
        const half = LEGEND_SIZES[sp].asleep[0] / 2, chord = Math.sqrt(c.r * c.r - (c.r * k) ** 2);
        expect(half + margin, `${sp} (seed ${seed})`).toBeLessThanOrEqual(chord + 1e-6);
        expect(margin).toBeGreaterThanOrEqual(c.edge);
      }
    }
  });
  it("leaves the front of the circle open for her to stand in, more of it than before", () => {
    // the open floor in front: from where it lies to the inside of the ring nearest the camera
    const old = { ...LC, back: LC.top };
    for (const sp of Object.keys(LEGEND_SIZES)) {
      const r = legendRadius(sp, LC), r0 = legendRadius(sp, old), front = r * spotShare(sp, r, LC) + r - LC.edge, front0 = r0 * LC.top + r0 - LC.edge;
      expect(front, sp).toBeGreaterThanOrEqual(front0 - 1e-9);
      // more than the circle's radius of open floor in front of where it lies (she is about a metre across)
      const spot = legendSpot(sp, 0, 0, r, LC);
      expect(r - LC.edge - spot.z, sp).toBeGreaterThan(r);
    }
  });
  it("sleeps where its circle puts it: the spawned legend on its spot, the old place with ?legendspot=old (back = top)", () => {
    for (const tuning of [TUNING, { ...TUNING, legendClearing: { ...LC, back: LC.top } }]) {
      const map = generateMap(123, tuning), creatures = spawnCreatures(map), L = tuning.legendClearing;
      for (const c of map.legendClearings) {
        const leg = creatures.find(o => o.boss && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1]);
        if (!leg) continue;
        expect([leg.x, leg.z]).toEqual([c.legend.x, c.legend.z]);
        if (L.back === L.top) expect(c.z - c.legend.z).toBeCloseTo(c.r * L.top, 9);
      }
    }
  });
});

// The old-cap giant identity baseline is informational in tools/behaviour/legends-fit.behaviour.ts.
