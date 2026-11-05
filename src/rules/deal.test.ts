// The night's deal of area types (Ed, 2026-10-28; rules/deal.ts): every playable island's own kind first on the route, no kind twice
// in a row, its roster's counts kept (its own about 1 in 6, the rest at most 2), the night's legends beside their kind, and the
// island's shapes the same every night.
import { describe, expect, it } from "vitest";
import { dealAlongRoute, dealProblems, matchLegendAreas, pairLegendAreas } from "./deal";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
import { routeOf } from "./party";
import { islandOf, OTHERS_MAX, ownAreas, playableIsland, REAL_KINDS } from "./rosters";
import { TUNING } from "./tuning";
type Tuning = typeof TUNING;

// Keep every playable island's authored size/roster: counts, route adjacency, stable shapes and path clearance are the integration coverage.
const onIsland = (island: string): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island, found: [], ...(island === "home" ? { islandAreas: 10 } : {}) } });
const kindsAlong = (map: ForestMap) => routeOf(map).order.map(k => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[map.typeOf(x, y)].creature; });
// (its areas: the playable ones and the night's find's, which moves each night: Ed, 2026-11-03, the path network's special sites)
const shapes = (map: ForestMap) => ({ cells: [...map.cells, ...map.specialSites.map(s => s.cell)].map(c => c.join()).sort(), legendAreas: [...map.legendAreas.keys()].sort(), lakes: map.cells.filter(([x, y]) => map.isLake(x, y)), box: map.bounds.land?.box });

describe("dealing types along a route", () => {
  it("puts the own kind first and keeps every kind apart, whatever the deck that allows it", () => {
    const kindOf = (t: number) => `k${t}`;
    for (let seed = 1; seed <= 200; seed++) {
      const n = 10 + (seed % 41), own = 0, deck: number[] = [];
      for (let i = 0; i < Math.max(2, Math.round(n / 6)); i++) deck.push(own);
      for (let t = 1; deck.length < n; t++) for (let j = 0; j < 2 && deck.length < n; j++) deck.push(t);
      const { types, ok } = dealAlongRoute(deck, kindOf, "k0", seed);
      expect(ok).toBe(true);
      expect([...types].sort((a, b) => a - b)).toEqual([...deck].sort((a, b) => a - b));
      expect(dealProblems(types.map(kindOf), "k0")).toEqual([]);
    }
  });

  it("matches as many legends to legend areas as can be", () => {
    const beside: Record<string, string[]> = { a: ["s1", "s2"], b: ["s1"], c: ["s2", "s3"] };
    const m = matchLegendAreas(["a", "b", "c"], k => beside[k]);
    expect(m.size).toBe(3);
    expect(new Set(m.values()).size).toBe(3);
  });

  // (Ed, 2026-11-04: "Please fix": the re-pairing after the deal gave two legend areas one pair when the first's own was taken and
  // nothing else beside it was free; tonight's legend's circle then went into the other one)
  it("pairs every legend area with an area of its own, moving another on where that frees one", () => {
    // s1 (a legend's) can take only A; s2 (empty) was grown beside A and also touches B; s3 (empty) touches only B
    const wants: Record<string, string[]> = { s1: ["A"], s2: ["A", "B"], s3: ["B", "C"] };
    expect([...pairLegendAreas(["s1", "s2", "s3"], s => wants[s])]).toEqual([["s1", "A"], ["s2", "B"], ["s3", "C"]]);
    // (taken in order, each its first free one, so where nothing clashes nothing moves)
    expect([...pairLegendAreas(["s2", "s3"], s => wants[s])]).toEqual([["s2", "A"], ["s3", "B"]]);
    // a slot whose only areas are all held, with no way round, goes without (never sharing)
    const tight: Record<string, string[]> = { s1: ["A"], s2: ["A"] };
    const p = pairLegendAreas(["s1", "s2"], s => tight[s]);
    expect([...p]).toEqual([["s1", "A"]]);
    // and a longer chain: s4 needs C, held by s3, which can move on to B only once s2 moves off it to E (augmenting paths)
    const chain: Record<string, string[]> = { s1: ["A"], s2: ["B", "E"], s3: ["C", "B"], s4: ["C"] };
    const q = pairLegendAreas(["s1", "s2", "s3", "s4"], s => chain[s]);
    expect(q.size).toBe(4);
    expect(new Set(q.values()).size).toBe(4);
    expect(q.get("s4")).toBe("C");
  });
});

describe("the night's deal on the islands", () => {
  it("deals every playable island by Ed's three rules, its legends beside their kind", () => {
    for (const kind of REAL_KINDS.filter(playableIsland)) {
      const i = islandOf(kind)!, map = generateMap(11, onIsland(kind)), kinds = kindsAlong(map);
      expect(dealProblems(kinds, kind), `${kind}'s island`).toEqual([]);
      const count = new Map<string, number>();
      for (const k of kinds) count.set(k, (count.get(k) ?? 0) + 1);
      expect(count.get(kind), kind).toBe(ownAreas(i.size));
      for (const [k, c] of count) if (k !== kind) expect(c, `${kind}'s island: ${k}`).toBeLessThanOrEqual(OTHERS_MAX);
      // (each legend lies beside, or in, an area of its kind)
      const order = routeOf(map).order;
      for (const c of map.legendCells) expect(map.legendKinds, kind).toContain(kinds[order.indexOf(c)]);
    }
  }, 300000);

  it("keeps an island's shapes every night and moves only its types, the rules holding each night", () => {
    for (const kind of ["fox", "wolf", "home"]) {
      const maps = [3, 4, 5, 6].map(night => generateMap(night, onIsland(kind)));
      for (const m of maps) {
        expect(shapes(m), `${kind}, night ${m.seed}: ${m.cells.length} areas`).toEqual(shapes(maps[0]));
        expect(dealProblems(kindsAlong(m), kind === "home" ? null : kind), `${kind}, night ${m.seed}`).toEqual([]);
      }
      // (the types do move between nights)
      const at = (m: ForestMap) => m.cells.map(([x, y]) => m.typeOf(x, y)).join();
      expect(new Set(maps.map(at)).size).toBeGreaterThan(1);
    }
  }, 300000);

  it("keeps every soundsystem off the paths made for the dealt types", () => {
    for (const kind of ["fox", "boar", "wolf"]) {
      const map = generateMap(8, onIsland(kind)), home = map.centreCell;
      for (const [x, y] of map.cells) {
        if (x === home[0] && y === home[1]) continue;
        const q = map.soundsystemSpot(x, y);
        expect(!!map.paths.at(q.x, q.z, map.tuning.soundsystemFootprint), `${kind}: ${x},${y}`).toBe(false);
      }
    }
  }, 120000);
});
