import { describe, expect, it } from "vitest";
import { blendAt, islandBiome, LAKE_LOOKS, lakesOf, lookOfLoop, mapBiome } from "./lakeLooks";
import { generateMap } from "./map";
import { TUNING } from "./tuning";
import { lakeKnobs } from "./lakes";

// Keep the authored rattlesnake island in the integration case to cover its actual lake raster and compass biome.
const K = lakeKnobs(TUNING);

describe("biome lakes (rules/lakeLooks.ts)", () => {
  it("blends the two compass biomes a bearing lies between", () => {
    expect(blendAt(0)).toEqual({ a: "cold", b: "mountains and glaciers", w: 1 });
    expect(blendAt(90)).toMatchObject({ a: "volcanic", w: 1 });
    const b = blendAt(100);
    expect(b.a).toBe("volcanic"); expect(b.b).toBe("badlands"); expect(b.w).toBeGreaterThan(0.5);
  });

  it("keeps home's lakes and the inner phases' plain, half the first special phase's, all further out", () => {
    expect(islandBiome("home", 0, 0, K).lakeBlend).toBeNull();
    expect(islandBiome("fox", 0, K.biomeFrom - 1, K).lakeShare).toBe(0);
    expect(islandBiome("ibex", 0, K.biomeFrom, K).lakeShare).toBe(K.biomeFirstShare);
    expect(islandBiome("ibex", 0, K.biomeFrom + 1, K).lakeShare).toBe(1);
  });

  it("blends the volcanic east with its neighbours like every compass point (no island a biome alone)", () => {
    const b = islandBiome("stegosaurus", 0, 5, K);
    expect(b.blend.a).toBe("volcanic");
    expect(["mountains and glaciers", "badlands"]).toContain(b.blend.b);
    expect(b.lakeBlend).toEqual(b.blend);
    const looks = new Set(Array.from({ length: 40 }, (_, i) => lookOfLoop(3, i, b)));
    expect(looks.has("lava")).toBe(true);
    for (const l of looks) expect(["lava", LAKE_LOOKS[b.blend.b]]).toContain(l);
  });

  it("deals each lake one of its island's two looks, the same every time", () => {
    const b = islandBiome("ibex", 0, 5, K), allowed = new Set(["water", LAKE_LOOKS[b.lakeBlend!.a], LAKE_LOOKS[b.lakeBlend!.b]]);
    for (let k = 0; k < 40; k++) { const l = lookOfLoop(k, 1234, b); expect(allowed.has(l)).toBe(true); expect(lookOfLoop(k, 1234, b)).toBe(l); }
  });

  it("finds every lake on a real island and gives it a look", () => {
    const t = { ...TUNING, map: { ...TUNING.map, island: "rattlesnake" } } as typeof TUNING;
    const map = generateMap(1, t), L = map.bounds.lakes;
    expect(map.island?.kind).toBe("rattlesnake");
    if (!L) return; // (an island without lakes has nothing to look at)
    const b = mapBiome(map.island, t), { lake, looks } = lakesOf(L, map.island!.seed, b);
    expect(looks.length).toBeGreaterThan(0);
    for (let i = 0; i < L.dist.length; i++) expect(lake[i] >= 0).toBe(L.dist[i] > 0);
    const allowed = new Set(["water", LAKE_LOOKS[b.lakeBlend!.a], LAKE_LOOKS[b.lakeBlend!.b]]);
    for (const l of looks) expect(allowed.has(l)).toBe(true);
  });
});
