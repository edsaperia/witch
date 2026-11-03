// The journey's islands, step 1 (Ed, 2026-10-11; docs/backlog/journey.md "First prototype"): an island of so many areas the
// waves reach (map.islandAreas: home and that many more, the nearest home's), round; the swarms along each island's own route,
// scaled by its size (Ed, 2026-11-03: population.swarm.largestIsland, only the largest islands reach the final swarm).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { AREA_TYPES, generateMap } from "./map";
import { isInside } from "./mapShape";
import { islandShare, referenceAt } from "./swarm";
import { routeIndex, routePopulation } from "./growth";
import { routeOf } from "./party";
import { newGame, stepGame, STEP } from "./game";
import { spawnCreatures } from "./creatures";

// Keep the explicit 10–50-area matrix: exact area counts, coast reach, route exhaustion and size-independent swarm scaling are tested against it.
const island = (n: number): Tuning => ({ ...TUNING, map: { ...TUNING.map!, islandAreas: n } });

describe("islands by area count (map.islandAreas)", () => {
  it("is home and exactly that many areas grown from home (its phase's shape: rules/islandGrowth.ts), with everything for play inside her flight", () => {
    for (const n of [10, 20, 30, 40, 50]) for (const seed of [1, 7, 123, 4242]) {
      const map = generateMap(seed, island(n)), home = map.siteOf(map.centreCell[0], map.centreCell[1]);
      expect(map.cells.length, `${n} areas, seed ${seed}`).toBe(n + 1);
      expect(map.cells.some(([x, y]) => x === map.centreCell[0] && y === map.centreCell[1])).toBe(true);
      // (its furthest ground: its areas', and its legend areas' grown beside them: Ed, 2026-10-26, the islands grow by them)
      const far = Math.max(...[...map.cells, ...[...(map.legendAreas?.keys() ?? [])].map(k => k.split(",").map(Number))].map(([x, y]) => { const s = map.siteOf(x, y); return Math.hypot(s.x - home.x, s.z - home.z); }));
      for (const [x, y] of map.cells) { const s = map.siteOf(x, y); expect(isInside(map.bounds, s.x, s.z, 0), `seed ${seed}: area ${x},${y} inside`).toBe(true); }
      // (its coast round them, not the old map's: no further out than the buffer's depth and an area past it)
      const coast = map.bounds.land!.loops.find(l => l.sea)!.pts;
      let most = 0;
      for (let k = 0; k < coast.length; k += 2) most = Math.max(most, Math.hypot(coast[k] - home.x, coast[k + 1] - home.z));
      expect(most).toBeGreaterThan(far);
      expect(most).toBeLessThan(far + (TUNING.map!.buffer + 2.5) * map.areaSize * 1.2);
    }
  }, 240000);

  it("plays the waves on any island, the pulse running out after the last stone", () => {
    const g = newGame(123, island(10)), idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    stepGame(g, idle, STEP);
    for (let w = 0; w < 12; w++) stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.party.areas.size + (g.party.ruined?.size ?? 0)).toBe(11); // (home and every one of its 10)
    expect(g.party.next.length).toBe(0);
  }, 120000);
});

describe("the swarm curve by island (population.swarm.largestIsland; Ed, 2026-11-03)", () => {
  const S = TUNING.population.swarm;
  it("grows along each island's own route, scaled by its size: only the largest islands' last area reaches the final swarm", () => {
    expect(S.largestIsland).toBe(50); // (the phase-5 islands: rules/rosters.ts sizeOfPhase)
    expect(S.curve).toBe(0.8);
    expect(islandShare(1, 10, S)).toBe(0);
    expect(islandShare(10, 10, S)).toBeCloseTo(10 / 50, 12); // (a 10-area island's last: a fifth of the way)
    expect(islandShare(5, 10, S)).toBeCloseTo((4 / 9) * (10 / 50), 12);
    expect(islandShare(25, 50, S)).toBeCloseTo(24 / 49, 12);
    expect(islandShare(50, 50, S)).toBe(1);
    expect(islandShare(64, 64, S)).toBe(1); // (home at the campaign's end: bigger than the largest, held at 1)
    expect(islandShare(40, 64, S)).toBeCloseTo(39 / 63, 12);
    expect(referenceAt(islandShare(50, 50, S), S).size).toBeCloseTo(S.endAverage, 9);
    // (the curve steeper early, 0.8: a 10-area island's last area's reference swarm is 1 + 11·0.2^0.8, about 4, not 1.9 as by wave)
    expect(referenceAt(islandShare(10, 10, S), S).size).toBeCloseTo(1 + 11 * Math.pow(0.2, 0.8), 9);
    for (const n of [10, 20, 30, 40]) expect(islandShare(n, n, S)).toBeLessThan(islandShare(n + 10, n + 10, S));
  });

  it("peoples each area by its place on its island and the island's size, as islandShare says", () => {
    const R = TUNING.population.byRoute, start = TUNING.population.start;
    for (const n of [10, 50]) {
      const map = generateMap(123, island(n)), at = routeIndex(routeOf(map).order), made = spawnCreatures(map);
      expect(at.size).toBe(n);
      for (const [key, i] of at) {
        const [cx, cy] = key.split(",").map(Number), species = AREA_TYPES[map.typeOf(cx, cy)].creature;
        const mine = made.filter(c => c.cell[0] === cx && c.cell[1] === cy && !c.boss && !c.circle);
        const want = routePopulation(i, at.size, R, S, start, species);
        expect([1, 2].map(l => mine.filter(c => c.level === l).length), `${n} areas, place ${i} (${species})`).toEqual([want[1], want[2]]);
      }
    }
  }, 240000);
});
