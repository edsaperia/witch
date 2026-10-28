// Islands grown from their areas (Ed, 2026-10-11, the journey's irregular islands: rules/islandGrowth.ts): exactly so many areas,
// all joined, home well inland, everything for play off the beach, each phase more irregular than the last; and their real
// outlines for the sea chart and the dreams (rules/islandShape.ts islandOutline).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { generateMap, islandLand } from "./map";
import { soundsystemFor } from "./party";
import { reachOf, shapeOf, SHAPES } from "./islandGrowth";
import { islandOutline } from "./islandShape";
import { homeIsland, islandOf } from "./rosters";

const isle = (phase: number): Tuning => ({ ...TUNING, map: { ...TUNING.map!, islandAreas: phase ? 10 * phase : 10, island: "", phase } });
/** How far from round an outline is: its coast's length squared over 4 pi its area (1 for a circle). */
const ragged = (L: { loops: { pts: ArrayLike<number>; sea: boolean }[] }) => {
  let len = 0, area = 0;
  for (const l of L.loops) if (l.sea) for (let i = 0; i < l.pts.length; i += 2) { const j = (i + 2) % l.pts.length, dx = l.pts[j] - l.pts[i], dz = l.pts[j + 1] - l.pts[i + 1]; len += Math.hypot(dx, dz); area += l.pts[i] * l.pts[j + 1] - l.pts[j] * l.pts[i + 1]; }
  return (len * len) / (4 * Math.PI * Math.abs(area / 2));
};

describe("islands grown from their areas", () => {
  for (const phase of [0, 3, 5]) it(`phase ${phase}: exactly its areas, joined, home inland, everything for play off the beach`, () => {
    for (const seed of [1, 2]) {
      const map = generateMap(seed, isle(phase)), L = map.bounds.land!, home = map.centreCell, keys = new Set(map.cells.map(c => c.join(",")));
      expect(map.cells.length).toBe((phase ? 10 * phase : 10) + 1);
      for (const k of map.neighbours.get(home.join(",")) ?? []) { const [x, y] = k.split(",").map(Number); if (map.playable(x, y) || map.inBuffer(x, y)) expect(keys.has(k), `home's neighbour ${k}`).toBe(true); }
      // joined: every area reached from home over playable neighbours
      const seen = new Set([home.join(",")]), todo = [home.join(",")];
      while (todo.length) for (const k of map.neighbours.get(todo.pop()!) ?? []) if (keys.has(k) && !seen.has(k)) { seen.add(k); todo.push(k); }
      expect(seen.size).toBe(keys.size);
      expect(L.loops.filter(l => l.sea).length).toBe(1); // (one island)
      expect(L.loops.every(l => l.sea)).toBe(true); // (no lakes yet: none but those meant)
      expect(L.distAt(map.dancefloor.x, map.dancefloor.z)).toBeGreaterThan(300);
      for (const c of map.cells) { const s = soundsystemFor(map, c); expect(L.distAt(s.x, s.z), `soundsystem ${c}`).toBeGreaterThan(150); }
      for (const lc of map.legendClearings) expect(L.distAt(lc.x, lc.z) - lc.r).toBeGreaterThan(150);
    }
  }, 120000);

  it("the same island for the same seed; another seed, another shape", () => {
    const a = generateMap(7, isle(4)), b = generateMap(7, isle(4)), c = generateMap(8, isle(4));
    expect(b.cells).toEqual(a.cells);
    expect(c.cells).not.toEqual(a.cells);
  }, 60000);

  it("more irregular phase by phase (Ed, 2026-10-11): home near-round, phase 5 strongly irregular", () => {
    const mean = (p: number) => [1, 2, 3].reduce((t, seed) => t + ragged(islandLand({ kind: "test", phase: p, bearing: 0, size: p ? 10 * p : 10, seed, roster: [] }, isle(p), 16).land), 0) / 3;
    const home = mean(0), p3 = mean(3), p5 = mean(5);
    expect(p3).toBeGreaterThan(home * 1.2);
    expect(p5).toBeGreaterThan(home * 1.4);
    // and its reach: home's within a tenth of round, phase 5's arms well past it
    expect(reachOf(SHAPES[0], 1).most).toBeLessThan(1.1);
    expect(reachOf(SHAPES[5], 1).most).toBeGreaterThan(2.5);
    expect(shapeOf(9)).toBe(SHAPES[5]);
  }, 120000);

  it("gives the sea chart and the dreams the real outline: the map's own coast, round home", () => {
    const fox = islandOf("fox", 0)!, out = islandOutline(fox, TUNING, 16), again = islandOutline(fox, TUNING, 16);
    expect(again).toBe(out); // (made once)
    expect(out.loops.some(l => l.sea)).toBe(true);
    expect(out.far).toBeGreaterThan(out.areaSize);
    // the same island as the map makes when it plays the fox's island
    const map = generateMap(123, { ...TUNING, map: { ...TUNING.map!, island: "fox" } }), d = map.dancefloor, L = map.bounds.land!;
    const sea = out.loops.find(l => l.sea)!;
    let off = 0;
    for (let i = 0; i < sea.pts.length; i += 40) off = Math.max(off, Math.abs(L.distAt(sea.pts[i] + d.x, sea.pts[i + 1] + d.z)));
    expect(off).toBeLessThan(32); // (its coast where the map's is, within its coarser sampling: two of its 16 m steps; a legend area's narrow neck
    // on the fox's island, one more since the longer rosters of Ed, 2026-10-28, comes out 29 m off at 16 m and 21 m at 8 m)
    expect(islandOutline(homeIsland(0), TUNING).loops.length).toBeGreaterThan(0);
  }, 120000);
});
