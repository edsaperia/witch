// The biome forests (Ed, 2026-10-23; art/flora/biomes.js): every biome a look, a temperate island none, a border island its two
// blended, and the colours they bake.
import { describe, expect, it } from "vitest";
import { BIOME_LOOKS, biomeColours, biomeJitter, biomeLook } from "../art/flora/biomes.js";
import { M } from "../art/core.js";
import { biomeKey, biomeStrength, COMPASS, islandBlend } from "./rules/lakeLooks";
import { islandOf, KINDS } from "./rules/rosters";
import { TUNING } from "./rules/tuning";

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
  it("takes its biome's look by its ring: semi-temperate near home, the full look furthest out (Ed, 2026-10-25)", () => {
    const T = TUNING.biomeLooks!;
    expect(T.from).toBe(3);
    // the strength follows the ring, and grows ring by ring to the full look
    const s = [3, 4, 5].map(p => biomeStrength(p, T));
    expect(s).toEqual([T.strength[0], T.strength[1], T.strength[2]]);
    expect(s[0]).toBeLessThan(s[1]); expect(s[1]).toBeLessThan(s[2]); expect(s[2]).toBe(1);
    expect(biomeStrength(9, T)).toBe(T.strength[T.strength.length - 1]); // (any further out: the last)
    expect(biomeStrength(1, T)).toBe(1); expect(biomeStrength(4, undefined)).toBe(1); // (nearer in, or no knob: as before)
    // one island of each biome ring: its key carries its ring's strength, so the art cache keeps the rings apart
    const byRing = new Map<number, string>();
    for (const id of Object.keys(KINDS)) {
      const ph = islandOf(id, 0)?.phase ?? 0, key = biomeKey(id, 0, T);
      if (!key || ph < 3) continue;
      const parts = key.split("|"), want = biomeStrength(ph, T);
      if (want < 1) expect(Number(parts[3]), id).toBeCloseTo(want, 2); else expect(parts.length === 1 || parts.length === 3, id).toBe(true); // (the full look: its key as it always was)
      byRing.set(ph, key);
    }
    expect(byRing.size).toBe(3);
    expect(new Set(byRing.values()).size).toBe(3);
    // the north's cold islands, one a ring: each its own key (its art kept apart), its ring's strength last but the full look's
    const cold = ["elk", "arcticfox", "frosttroll"].map(id => ({ ph: islandOf(id, 0)!.phase, key: biomeKey(id, 0, T)! }));
    expect(cold.map(c => c.ph)).toEqual([3, 4, 5]);
    expect(cold.map(c => c.key.split("|")[0])).toEqual(["cold", "cold", "cold"]);
    expect(cold.map(c => c.key.split("|")[3])).toEqual([T.strength[0].toFixed(2), T.strength[1].toFixed(2), undefined]);
    expect(new Set(cold.map(c => c.key)).size).toBe(3);
  });
  it("mixes the look toward temperate by 1 - strength, and keeps two neighbours' blend", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (k: string) => biomeLook(k) as any, full = L("cold"), half = L("cold|cold|1.00|0.50"), none = L("cold|cold|1.00|0.00");
    expect(half.sat).toBeCloseTo((full.sat + 1) / 2, 5); // (temperate's saturation is 1)
    expect(half.snow).toBeCloseTo(full.snow / 2, 5);
    expect(half.leaf[3]).toBeCloseTo(full.leaf[3] / 2, 5); // (its leaves mixed toward its colour half as much)
    expect(half.leaf.slice(0, 3)).toEqual(full.leaf.slice(0, 3));
    expect(half.knobs.gnarl).toBeCloseTo(full.knobs.gnarl / 2, 5);
    expect(none.sat).toBeCloseTo(1, 5); expect(none.snow).toBeCloseTo(0, 5); expect(none.leaf[3]).toBeCloseTo(0, 5); // (none of it: temperate)
    const blend = L("jungle|mangrove swamp|0.50"), weak = L("jungle|mangrove swamp|0.50|0.55");
    expect(weak.sat).toBeCloseTo(blend.sat * 0.55 + 0.45, 5);
    expect(weak.crown.vines.share).toBeCloseTo(blend.crown.vines.share * 0.55, 5);
    expect(L("cold|cold|1.00|1.00")).toEqual(full); // (full strength: the look exactly as before)
  });
});
