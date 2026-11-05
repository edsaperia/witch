// The journey's islands, step 1 (Ed, 2026-10-11; docs/backlog/journey.md "First prototype"): an island of so many areas the
// waves reach (map.islandAreas: home and that many more, the nearest home's), round; the swarms along each island's own route,
// as far along the curve as its phase (Ed, 2026-11-04: population.swarm.fullPhase, phase 5 islands reach the full swarm; home by the islands found).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { AREA_TYPES, generateMap } from "./map";
import { isInside } from "./mapShape";
import { islandShare, phaseReach, referenceAt } from "./swarm";
import { islandReach, routeIndex, routePopulation } from "./growth";
import { AREA_KINDS, foundShare, homeIsland, homeKinds, homeRoster, islandOf, REAL_KINDS } from "./rosters";
import { routeOf } from "./party";
import { stepGame, STEP } from "./game";
import { spawnCreatures } from "./creatures";
import { preppedGame } from "../test/preppedGame"; // (games on a map made once a file from its prep)

// Keep the explicit 10–50-area matrix: exact area counts, coast reach, route exhaustion and size-independent swarm scaling are tested against it.
const island = (n: number): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: "", islandAreas: n } }); // (?island=N: random types, not home, whose size is the islands found since Ed's 2026-11-04 home)

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
    const g = preppedGame(123, island(10)), idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    stepGame(g, idle, STEP);
    for (let w = 0; w < 12; w++) stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.party.areas.size + (g.party.ruined?.size ?? 0)).toBe(11); // (home and every one of its 10)
    expect(g.party.next.length).toBe(0);
  }, 120000);
});

describe("the swarm curve by island's phase (population.swarm.fullPhase; Ed, 2026-11-04)", () => {
  const S = TUNING.population.swarm;
  it("grows along each island's own route as far as its phase: a phase-p island's last area p/5 of the way, phase 5 the full swarm", () => {
    expect(S.fullPhase).toBe(5); // (Ed, 2026-11-04: "we should rebalance this so phase 5 islands get to full packs")
    expect(S.curve).toBe(0.8);
    for (let p = 1; p <= 5; p++) expect(phaseReach(p, S)).toBeCloseTo(p / 5, 12);
    expect(phaseReach(6, S)).toBe(1);
    expect(islandShare(1, 10, phaseReach(1, S))).toBe(0);
    expect(islandShare(10, 10, phaseReach(1, S))).toBeCloseTo(0.2, 12);
    expect(islandShare(5, 10, phaseReach(1, S))).toBeCloseTo((4 / 9) * 0.2, 12);
    expect(islandShare(30, 30, phaseReach(5, S))).toBe(1); // (whatever its size)
    expect(islandShare(10, 30, phaseReach(5, S))).toBeCloseTo(9 / 29, 12);
    expect(referenceAt(islandShare(30, 30, phaseReach(5, S)), S).size).toBeCloseTo(S.endAverage, 9);
    expect(referenceAt(islandShare(10, 10, phaseReach(1, S)), S).size).toBeCloseTo(1 + 11 * Math.pow(0.2, 0.8), 9);
    expect(islandShare(5, 5, 1)).toBe(1);
    expect(islandShare(5, 5, 0)).toBe(0);
    expect(phaseReach(3, { fullPhase: undefined })).toBe(1); // (left out: every island its whole curve)
  });

  it("takes each island's reach from its phase, home's from the islands found, and the whole curve off the roster", () => {
    const kinds = REAL_KINDS.filter(k => AREA_KINDS.has(k));
    expect(foundShare([])).toBe(0);
    expect(foundShare(homeKinds())).toBeCloseTo(homeKinds().length / kinds.length, 12); // (home's starting kinds' phase-1 islands count, as home's areas do: rules/rosters.ts homeRoster)
    expect(foundShare(kinds.slice(0, 9))).toBeCloseTo(9 / kinds.length, 12);
    expect(foundShare(kinds)).toBe(1);
    expect(foundShare([...kinds, "dragon"])).toBe(1);
    for (const k of ["fox", "bear"]) {
      const I = islandOf(k)!, map = { island: I, tuning: TUNING };
      expect(islandReach(map)).toBeCloseTo(I.phase / 5, 12);
    }
    const home = (found: string[]) => ({ island: homeIsland(0, homeRoster(found)), tuning: { ...TUNING, map: { ...TUNING.map!, found } } });
    expect(islandReach(home([]))).toBe(0);
    expect(islandReach(home(kinds.slice(0, 18)))).toBeCloseTo(18 / kinds.length, 12);
    expect(islandReach(home(kinds))).toBe(1);
    expect(islandReach({ island: null, tuning: TUNING })).toBe(1);
  });

  it("peoples each area by its place on its island's route and the island's reach, as islandShare says", () => {
    const R = TUNING.population.byRoute, start = TUNING.population.start;
    for (const t of [island(10), { ...TUNING, map: { ...TUNING.map!, island: "fox", found: [] } }]) {
      const map = generateMap(123, t), at = routeIndex(routeOf(map).order), made = spawnCreatures(map), reach = islandReach(map);
      expect(reach).toBeCloseTo(map.island ? map.island.phase / 5 : 1, 12);
      for (const [key, i] of at) {
        const [cx, cy] = key.split(",").map(Number), species = AREA_TYPES[map.typeOf(cx, cy)].creature;
        const mine = made.filter(c => c.cell[0] === cx && c.cell[1] === cy && !c.boss && !c.circle);
        const want = routePopulation(i, at.size, R, S, start, species, reach);
        expect([1, 2].map(l => mine.filter(c => c.level === l).length), `${map.island?.kind ?? "radius"}, place ${i} (${species})`).toEqual([want[1], want[2]]);
      }
    }
  }, 240000);
});
