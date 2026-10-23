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
      expect(BIOME_LOOKS[B.a], `${id}: ${B.a}`).toBeTruthy();
      expect(biomeLook(key!), id).not.toBeNull();
    }
  });
  it("blends two biomes by share", () => {
    const a = biomeLook("jungle")!, b = biomeLook("mangrove swamp")!, mid = biomeLook("jungle|mangrove swamp|0.50")!;
    expect(mid.sat).toBeCloseTo((a.sat + b.sat) / 2, 5);
    expect(mid.crown.vines.share).toBeCloseTo(BIOME_LOOKS.jungle.crown!.vines.share / 2, 5);
  });
  it("tints leaves and bark, keeps a prop's flowers, and leaves snow's jitter out", () => {
    const c = { [M.LEAF]: [40, 90, 70], [M.LEAF2]: [60, 120, 90], [M.LEAF3]: [20, 50, 40], [M.TRUNK]: [80, 60, 40], [M.FLOWER]: [200, 30, 60] };
    const t = biomeColours({ ...c }, biomeLook("jungle"), M, { flower: false });
    expect(t[M.LEAF]).not.toEqual(c[M.LEAF]);
    expect(t[M.TRUNK]).not.toEqual(c[M.TRUNK]);
    expect(t[M.FLOWER]).toEqual(c[M.FLOWER]);
    expect(biomeColours({ ...c }, null, M)).toEqual(c);
    expect(biomeJitter("cold")).toBe(0);
    expect(biomeJitter(undefined)).toBe(1);
  });
});
