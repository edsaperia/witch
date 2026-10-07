import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { TUNING } from "./tuning";
import { beachOf } from "./mapShape";
import { dolphinLeaps, krakenRising } from "./seaLife";

describe("the sea's life off the beach (Ed, 2026-10-07)", () => {
  const g = newGame(123, TUNING), b = beachOf(g.map.bounds, g.tuning)!;
  const at = (bearing: number) => { const r = b.edge(bearing) - 20; g.witch = { ...g.witch, x: b.x + Math.cos(bearing) * r, z: b.z + Math.sin(bearing) * r }; };
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
      for (const x of K.tentacles) { expect(b.intoSea(x.x, x.z)).toBeGreaterThan(3); expect(x.x).toBeLessThan(g.witch.x); expect(x.z).toBeLessThan(g.witch.z + 6); }
    }
    expect(risings).toBeGreaterThan(4); expect(on / 3000).toBeLessThan(0.35);
    at(0);
    for (let t = 0; t < 1500; t += 1) expect(krakenRising(g, b, t)).toBeNull();
  });
});
