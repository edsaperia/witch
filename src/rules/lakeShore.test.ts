import { describe, expect, it } from "vitest";
import { lakesOf, mapBiome } from "./lakeLooks";
import { lavaGlows, shoreKinds, shorePieces } from "./lakeShore";
import { generateMap } from "./map";
import { TUNING } from "./tuning";
import { LAKE_SHORE_PIECES, lakeShoreSprite } from "../../art/lakeShore.js";
import { EMISSIVE } from "../../art/core.js";

// Keep authored biome islands: lava/oasis shore counts and path/clearing exclusions depend on their real lake geometry.
const island = (kind: string) => {
  const t = { ...TUNING, map: { ...TUNING.map, island: kind } } as typeof TUNING, map = generateMap(1, t), L = map.bounds.lakes!;
  return { map, L, ...lakesOf(L, map.island!.seed, mapBiome(map.island, t)) };
};

describe("the biome lakes' shore dressing (rules/lakeShore.ts, art/lakeShore.js)", () => {
  it("dresses each look with its own pieces, along its shore, off the paths and out of the clearings, the same every time", () => {
    const { map, L, lake, looks } = island("stegosaurus"); // (lava, every lake)
    const a = shorePieces(map, lake, looks), b = shorePieces(map, lake, looks);
    expect(a.length).toBeGreaterThan(50);
    expect(b).toEqual(a);
    const kinds = new Set(shoreKinds("lava"));
    for (const p of a) {
      expect(kinds.has(p.kind)).toBe(true);
      expect(Math.abs(L.distAt(p.x, p.z))).toBeLessThan(12); // (by the shore: a little out on it, or a few metres ashore)
      if (L.distAt(p.x, p.z) < 0) expect(map.paths.at(p.x, p.z, 2)).toBeFalsy();
      for (const c of map.legendClearings) expect(Math.hypot(p.x - c.x, p.z - c.z)).toBeGreaterThan(c.r);
    }
  });

  it("dresses nothing round plain water, and lights only lava", () => {
    const home = generateMap(1, TUNING), L = home.bounds.lakes;
    if (L) { const { lake, looks } = lakesOf(L, 0, mapBiome(home.island, TUNING)); expect(shorePieces(home, lake, looks)).toEqual([]); expect(lavaGlows(home, lake, looks)).toEqual([]); }
    const lava = island("stegosaurus"), oasis = island("fennec");
    expect(lavaGlows(lava.map, lava.lake, lava.looks).length).toBeGreaterThan(4);
    expect(lavaGlows(oasis.map, oasis.lake, oasis.looks)).toEqual([]);
  });

  it("draws every piece, only the lava rocks glowing", () => {
    for (const d of LAKE_SHORE_PIECES as { id: string; kind: string; variants: number }[])
      for (let v = 0; v < d.variants; v++) {
        const r = lakeShoreSprite(d.id, {}, { variant: v }) as { whole: { m: ArrayLike<number> } };
        let n = 0, glow = 0;
        for (const m of Array.from(r.whole.m)) if (m) { n++; if (EMISSIVE.has(m)) glow++; }
        expect(n, d.id).toBeGreaterThan(100);
        if (d.kind === "lavaRock") expect(glow, d.id).toBeGreaterThan(0); else expect(glow, d.id).toBe(0);
      }
  });
});
