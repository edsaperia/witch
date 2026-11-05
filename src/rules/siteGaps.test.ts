// The legend areas' pairs and the least gaps between sites (Ed, 2026-11-04: "Please fix. Look at minimum distances between sites
// too. If necessary we can make areas bigger."; then "minimum distance between sites/circles/dancefloor/treehouse of 50m, tunable.
// 10m from a lake edge. If this can't fit, increase area sizes."). Every legend area has its own pair after the night's deal (no area
// paired twice, so no legend's circle goes into another legend area), and every two sites' footprints keep siteGap apart and
// siteLakeGap off a lake's water (rules/map.ts siteRules).
import { describe, expect, it } from "vitest";
import { AREA_TYPES, generateMap, hydrateMap, prepOf, siteRules, type ForestMap } from "./map";
import { legendRadius } from "./legendFit";
import { lakeDepth } from "./lakes";
import { floorClearing } from "./speakers";
import { TUNING, type Tuning } from "./tuning";
import { knownKinds } from "./rosters";
import { KINDS_TABLE } from "./kinds";

const islandOf = (kind: string): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: kind, islandAreas: 10 } });
const key = (c: readonly [number, number]) => `${c[0]},${c[1]}`;
const made = new Map<string, ForestMap>();
const mapOf = (kind: string, seed: number) => { const k = `${kind} ${seed}`; let m = made.get(k); if (!m) made.set(k, (m = generateMap(seed, islandOf(kind)))); return m; };
// (nights where, before the fix, two legend areas shared one pair, tonight's legend's: lion 2, lynx 3 (twice), roe 5, home 7; and
// islands whose stones stood with their clearings, or themselves, in a lake: crab 3, spider 2, toad 2)
const PAIRED: [string, number][] = [["lion", 2], ["lynx", 3], ["roe", 5], ["home", 7]];
const WET: [string, number][] = [["crab", 3], ["spider", 2], ["toad", 2]];

describe("the legend areas' pairs", () => {
  for (const [kind, seed] of PAIRED) {
    it(`gives every legend area a pair of its own, and each legend's circle lies in its own legend area (${kind} island, seed ${seed})`, () => {
      const m = mapOf(kind, seed), pairs = [...m.legendAreas.values()];
      expect(new Set(pairs).size).toBe(pairs.length);
      for (const [la, pair] of m.legendAreas) expect(m.neighbours.get(la)?.has(pair), la).toBe(true);
      for (const lc of m.legendCells) {
        const [x, y] = lc.split(",").map(Number), c = m.legendClearing(x, y);
        if (!c) continue;
        const at = key(c.cell);
        // (in a legend area, it's the one paired with the legend's own; else in the legend's own area)
        expect(at === lc || m.legendAreas.get(at) === lc, `${lc}'s circle in ${at}`).toBe(true);
        // no point of it in any other legend area
        for (let i = 0; i < 32; i++) for (const f of [0.5, 0.98]) {
          const a = (i / 32) * Math.PI * 2, q = key(m.areaAt(c.x + Math.cos(a) * c.r * f, c.z + Math.sin(a) * c.r * f).cell);
          if (q !== at) expect(m.isLegendArea(...(q.split(",").map(Number) as [number, number])), `${lc}'s circle reaches legend area ${q}`).toBe(false);
        }
      }
    }, 60000);
  }
});

// Every site's footprint (Ed, 2026-11-04: "minimum distance between sites/circles/dancefloor/treehouse of 50m, tunable. 10m from a lake
// edge"; "The dancefloor and treehouse can be closer! they're a set piece": home's two one site, nothing between them).
const sitesOf = (m: ForestMap) => {
  const T = m.tuning, R = siteRules(T), home = key(m.centreCell), out: { what: string; x: number; z: number; r: number }[] = [];
  for (const c of m.cells) if (key(c) !== home) { const q = m.soundsystemSpot(c[0], c[1]); out.push({ what: `stone ${key(c)}`, x: q.x, z: q.z, r: R.stoneClear }); }
  for (const c of m.legendClearings) out.push({ what: `legend ${key(c.cell)}`, x: c.x, z: c.z, r: c.r });
  for (const sp of m.specialSites) out.push({ what: `${sp.kind} ${key(sp.cell)}`, x: sp.x, z: sp.z, r: sp.r + (sp.claimed ? 4 : 0) });
  out.push({ what: "home dancefloor", x: m.dancefloor.x, z: m.dancefloor.z, r: floorClearing(T) }, { what: "home treehouse", x: m.treehouse.x, z: m.treehouse.z, r: T.treehouse.clear });
  return out;
};
// (the nights above, and a few of the largest islands and the late home's)
const GAPPED: [string, number][] = [...PAIRED, ...WET, ["griffin", 1], ["elephant", 2], ["tiger", 1]];

describe("the least gaps between sites", () => {
  it("keeps every two sites' footprints siteGap (50 m) apart, home's dancefloor and treehouse one site", () => {
    const near: string[] = [];
    for (const [kind, seed] of GAPPED) {
      const m = mapOf(kind, seed), gap = siteRules(m.tuning).siteGap, all = sitesOf(m);
      expect(gap).toBe(50);
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        if (a.what.startsWith("home") && b.what.startsWith("home")) continue; // (a set piece)
        const g = Math.hypot(a.x - b.x, a.z - b.z) - a.r - b.r;
        if (g < gap - 0.01) near.push(`${kind} ${seed}: ${a.what} to ${b.what} ${g.toFixed(1)} m`);
      }
    }
    expect(near).toEqual([]);
  }, 300000);

  it("keeps every site's footprint siteLakeGap (10 m) off a lake's water, where the stones stood in it before", () => {
    const wet: string[] = [];
    for (const [kind, seed] of GAPPED) {
      const m = mapOf(kind, seed), lake = siteRules(m.tuning).lakeGap;
      expect(lake).toBe(10);
      if (!m.bounds.lakes) continue;
      for (const s of sitesOf(m)) {
        const g = -lakeDepth(m.bounds, s.x, s.z) - s.r;
        if (g < lake - 0.5) wet.push(`${kind} ${seed}: ${s.what} ${g.toFixed(1)} m`); // (the lakes' map is sampled: half a metre's play)
      }
    }
    expect(WET.every(([k, s]) => !!mapOf(k, s).bounds.lakes)).toBe(true);
    expect(wet).toEqual([]);
  }, 300000);

  it("makes the same map from the same seed", () => {
    const a = mapOf("crab", 3), b = generateMap(3, islandOf("crab"));
    const stones = (m: ForestMap) => m.cells.map(c => ({ c: key(c), ...m.soundsystemSpot(c[0], c[1]) }));
    expect(stones(b)).toEqual(stones(a));
    expect([...b.legendAreas]).toEqual([...a.legendAreas]);
    expect(b.legendClearings).toEqual(a.legendClearings);
  }, 60000);
});

// Nights whose early quest's legend found no room keeping every gap, in its area beside home, and took the farthest spot that fit,
// breaking the gap (the playtest build's coherence check, 4 Nov: home with 40 islands found, seeds 2, 4 and 7; tiger 6, griffin 2,
// elephant 7; this branch's jaguar 1). Its area grows instead (Ed, 2026-11-04: "make the last-resort placement grow the area instead
// of breaking the gap"): the circle wholly its area's, every gap kept.
const homeFound = (n: number): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: "home", islandAreas: 10, found: knownKinds(Object.keys(KINDS_TABLE)).slice(0, n) } });
const CRAMPED: [string, number, Tuning][] = [
  ...[2, 4, 7].map((s): [string, number, Tuning] => ["home of 40", s, homeFound(40)]),
  ...([["tiger", 6], ["griffin", 2], ["elephant", 7], ["jaguar", 1]] as const).map(([k, s]): [string, number, Tuning] => [k, s, islandOf(k)]),
];

describe("an area grown for its legend's circle", () => {
  for (const [what, seed, t] of CRAMPED) {
    it(`never breaks a gap for a legend's circle: ${what}, seed ${seed}`, () => {
      const m = generateMap(seed, t), gap = siteRules(m.tuning).siteGap, lake = siteRules(m.tuning).lakeGap, all = sitesOf(m), near: string[] = [];
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        if (a.what.startsWith("home") && b.what.startsWith("home")) continue;
        const g = Math.hypot(a.x - b.x, a.z - b.z) - a.r - b.r;
        if (g < gap - 0.01) near.push(`${a.what} to ${b.what} ${g.toFixed(1)} m`);
      }
      if (m.bounds.lakes) for (const s of all) { const g = -lakeDepth(m.bounds, s.x, s.z) - s.r; if (g < lake - 0.5) near.push(`${s.what} ${g.toFixed(1)} m off a lake`); }
      expect(near).toEqual([]);
      // every legend tonight has its circle at its full size (Ed, 2026-11-05: "ideally from world generation all of the areas are
      // large enough that this is not an issue"), its own area's
      for (const lc of m.legendCells) {
        const [x, y] = lc.split(",").map(Number), c = m.legendClearing(x, y);
        expect(c, `${lc}'s circle`).toBeTruthy();
        expect(c!.r, `${lc}'s circle's size`).toBeGreaterThanOrEqual(legendRadius(AREA_TYPES[m.typeOf(x, y)].creature, m.tuning.legendClearing) - 0.01);
        for (let i = 0; i < 16; i++) for (const f of [0, 1]) { // (its middle and the 16 points of its rim placing checks: the fractal borders wander between)
          const a = (i / 16) * Math.PI * 2, q = key(m.areaAt(c!.x + Math.cos(a) * c!.r * f, c!.z + Math.sin(a) * c!.r * f).cell);
          expect(q, `${lc}'s circle reaches ${q}`).toBe(key(c!.cell));
        }
      }
    }, 180000);
  }
  it("keeps the island's coast and lakes the same every night, grown or not (griffin 1 and 2, elephant 7 and 8)", () => {
    for (const [kind, a, b] of [["griffin", 1, 2], ["elephant", 7, 8]] as const) {
      const p = prepOf(generateMap(a, islandOf(kind))), q = prepOf(generateMap(b, islandOf(kind)));
      expect(q.land).toEqual(p.land);
      expect(q.lakes).toEqual(p.lakes);
    }
  }, 180000);
  it("grows the same from a map's prep, and the same from the same seed (jaguar 1, home of 40 seed 2)", () => {
    for (const [seed, t] of [[1, islandOf("jaguar")], [2, homeFound(40)]] as const) {
      const a = generateMap(seed, t), b = generateMap(seed, t), c = hydrateMap(seed, t, prepOf(a));
      expect(b.legendClearings).toEqual(a.legendClearings);
      expect(c.legendClearings).toEqual(a.legendClearings);
      for (const m of [b, c]) for (const lc of a.legendClearings) expect(key(m.areaAt(lc.x, lc.z).cell)).toBe(key(lc.cell));
    }
  }, 180000);
});
