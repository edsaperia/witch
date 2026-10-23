// The biome forests (Ed, 2026-10-23; art/flora/biomes.js): every biome a look, a temperate island none, a border island its two
// blended, and the colours they bake.
import { describe, expect, it } from "vitest";
import { BIOME_LOOKS, biomeColours, biomeJitter, biomeLook } from "../art/flora/biomes.js";
import { M } from "../art/core.js";
import { biomeKey, COMPASS, islandBlend } from "./rules/lakeLooks";
import { KINDS } from "./rules/rosters";

describe("biome forests", () => {
  it("has a look for every compass biome, and none for temperate", () => {
    for (const b of COMPASS) expect(biomeLook(b), b).not.toBeNull();
    expect(biomeLook("temperate")).toBeNull();
    expect(biomeKey("home", 0)).toBeUndefined();
  });
  it("gives every non-temperate kind's island a key its look reads", () => {
    for (const [id, k] of Object.entries(KINDS)) {
      if (id.startsWith("unknown")) continue;
      const key = biomeKey(id, 0), B = islandBlend(id, 0);
      if (k.biome === "temperate") { expect(key, id).toBeUndefined(); continue; }
      expect(key, id).toBeTruthy();
      expect((BIOME_LOOKS as Record<string, unknown>)[B.a], `${id}: ${B.a}`).toBeTruthy();
      expect(biomeLook(key!), id).not.toBeNull();
    }
  });
  it("blends two biomes by share", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (k: string) => biomeLook(k) as any, a = L("jungle"), b = L("mangrove swamp"), mid = L("jungle|mangrove swamp|0.50");
    expect(mid.sat).toBeCloseTo((a.sat + b.sat) / 2, 5);
    expect(mid.crown.vines.share).toBeCloseTo((BIOME_LOOKS.jungle as { crown: { vines: { share: number } } }).crown.vines.share / 2, 5);
  });
  it("tints leaves and bark, keeps a prop's flowers, and leaves snow's jitter out", () => {
    const c = { [M.LEAF]: [40, 90, 70], [M.LEAF2]: [60, 120, 90], [M.LEAF3]: [20, 50, 40], [M.TRUNK]: [80, 60, 40], [M.FLOWER]: [200, 30, 60] };
    const t = biomeColours({ ...c }, biomeLook("jungle"), M, { flower: false });
    expect(t[M.LEAF]).not.toEqual(c[M.LEAF]);
    expect(t[M.TRUNK]).not.toEqual(c[M.TRUNK]);
    expect(t[M.FLOWER]).toEqual(c[M.FLOWER]);
    expect(biomeColours({ ...c }, null, M)).toEqual(c);
    const rock = { [M.STONE]: [128, 126, 134], [M.STONED]: [64, 62, 72], [M.WEB]: [225, 225, 232] };
    expect(biomeColours({ ...rock }, biomeLook("badlands"), M)[M.STONE]).toEqual(rock[M.STONE]); // (stone only when asked: the trees' tables keep theirs)
    const red = biomeColours({ ...rock }, biomeLook("badlands"), M, { stone: true });
    expect(red[M.STONE][0]).toBeGreaterThan(red[M.STONE][2]); // (red sandstone)
    expect(red[M.STONED][0]).toBeLessThan(red[M.STONE][0]); // (its shade still darker)
    expect(red[M.WEB]).toEqual(rock[M.WEB]); // (snow stays white)
    expect(biomeJitter("cold")).toBe(0);
    expect(biomeJitter(undefined)).toBe(1);
  });
});
