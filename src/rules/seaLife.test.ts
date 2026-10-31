import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { TUNING as gameTuning } from "./tuning";
import { largestWorldTuning } from "../test/worlds";
// Largest shipped world: east/west sea-life placement must use a full-sized authored coastline.
const TUNING = largestWorldTuning(gameTuning);
import { beachOf } from "./mapShape";
import { dolphinLeaps, krakenRising } from "./seaLife";
import { facing } from "../test/coast";

describe("the sea's life off the beach (Ed, 2026-10-07)", () => {
  const g = newGame(123, TUNING), b = beachOf(g.map.bounds, g.tuning)!;
  // (20 m in from the coast where it faces `bearing` (atan2 of z and x: 0 east), as far out that way as it goes)
  const at = (bearing: number) => { const p = facing(b.land, bearing); g.witch = { ...g.witch, x: p.x - p.nx * 20, z: p.z - p.nz * 20 }; };
  it("leaps dolphins off the east coast only, in the water north of her, now and then", () => {
    at(0);
    const seen = new Set<number>();
    for (let t = 0; t < 300; t += 0.25) for (const L of dolphinLeaps(g, b, t)) {
      seen.add(L.start);
      expect(b.intoSea(L.x, L.z)).toBeGreaterThan(5); // (in the water)
      expect(L.z).toBeLessThan(g.witch.z + 3); // (level with her or north, away from the camera)
    }
    expect(seen.size).toBeGreaterThan(15); expect(seen.size).toBeLessThan(80);
    at(Math.PI);
    for (let t = 0; t < 300; t += 0.5) expect(dolphinLeaps(g, b, t)).toEqual([]);
  });
  it("raises the kraken off the west coast only, rarely, beside or north of her and out in the water", () => {
    at(Math.PI);
    let risings = 0, on = 0;
    for (let t = 0; t < 1500; t += 0.5) {
      const K = krakenRising(g, b, t); if (!K) continue; on++;
      if (K.tentacles.some(x => x.start === t)) risings++;
      const sh = b.land.shore(g.witch.x, g.witch.z); // (out to sea from her: the west, near enough)
      for (const x of K.tentacles) { expect(b.intoSea(x.x, x.z)).toBeGreaterThan(3); expect((x.x - g.witch.x) * sh.nx + (x.z - g.witch.z) * sh.nz).toBeGreaterThan(0); expect(sh.nx).toBeLessThan(-0.7); expect(x.z).toBeLessThan(g.witch.z + 6); }
    }
    expect(risings).toBeGreaterThan(4); expect(on / 3000).toBeLessThan(0.35);
    at(0);
    for (let t = 0; t < 1500; t += 1) expect(krakenRising(g, b, t)).toBeNull();
  });
});
