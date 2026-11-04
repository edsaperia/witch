// The legend areas' pairs and the least gaps between sites (Ed, 2026-11-04: "Please fix. Look at minimum distances between sites
// too. If necessary we can make areas bigger."). Every legend area has its own pair after the night's deal (no area paired twice, so
// no legend's circle goes into another legend area), and every site keeps its gap: a stone's clearing out of a lake's water by its
// shore, a legend's circle siteGap from the other sites that aren't stones, the stones keeping their own rules (pathNetwork.test.ts).
import { describe, expect, it } from "vitest";
import { generateMap, type ForestMap } from "./map";
import { lakeDepth, lakeKnobs } from "./lakes";
import { floorClearing } from "./speakers";
import { TUNING, type Tuning } from "./tuning";

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

describe("the least gaps between sites", () => {
  it("keeps every stone's clearing off a lake's water by its shore, where the stones stood in it before", () => {
    const wet: string[] = [];
    for (const [kind, seed] of WET) {
      const m = mapOf(kind, seed), T = m.tuning, clear = T.runeMarkers!.stump!.clear, shore = lakeKnobs(T).shore, home = key(m.centreCell);
      expect(m.bounds.lakes).toBeTruthy();
      for (const c of m.cells) {
        if (key(c) === home) continue;
        const q = m.soundsystemSpot(c[0], c[1]), gap = -lakeDepth(m.bounds, q.x, q.z) - clear;
        if (gap < shore - 0.5) wet.push(`${kind} ${seed}: ${key(c)} ${gap.toFixed(1)} m`); // (the lakes' map is sampled: half a metre's play)
      }
    }
    expect(wet).toEqual([]);
  }, 60000);

  it("keeps every legend's circle siteGap from the other legends' circles, the challenge's claim and home's dancefloor and treehouse", () => {
    const near: string[] = [];
    for (const [kind, seed] of [...PAIRED, ...WET]) {
      const m = mapOf(kind, seed), T = m.tuning, gap = T.siteGap!;
      expect(gap).toBe(25);
      const others = [
        ...m.specialSites.map(s => ({ what: s.kind, x: s.x, z: s.z, r: s.r + (s.claimed ? 4 : 0) })),
        { what: "dancefloor", x: m.dancefloor.x, z: m.dancefloor.z, r: floorClearing(T) },
        { what: "treehouse", x: m.treehouse.x, z: m.treehouse.z, r: T.treehouse.clear },
      ];
      const cs = m.legendClearings;
      cs.forEach((c, i) => {
        for (const o of [...others, ...cs.slice(i + 1).map(d => ({ what: `legend ${key(d.cell)}`, ...d }))]) {
          const g = Math.hypot(c.x - o.x, c.z - o.z) - c.r - o.r;
          if (g < gap) near.push(`${kind} ${seed}: legend ${key(c.cell)} to ${o.what} ${g.toFixed(1)} m`);
        }
      });
    }
    expect(near).toEqual([]);
  }, 60000);

  it("makes the same map from the same seed", () => {
    const a = mapOf("crab", 3), b = generateMap(3, islandOf("crab"));
    const stones = (m: ForestMap) => m.cells.map(c => ({ c: key(c), ...m.soundsystemSpot(c[0], c[1]) }));
    expect(stones(b)).toEqual(stones(a));
    expect([...b.legendAreas]).toEqual([...a.legendAreas]);
    expect(b.legendClearings).toEqual(a.legendClearings);
  }, 60000);
});
