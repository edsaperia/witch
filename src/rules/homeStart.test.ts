// Home at the start (Ed, 2026-11-04: "home has 5 areas chosen at random from the phase 1 creatures, and grows as you unlock
// islands, and has no challenge area. When you unlock every island, home gets a challenge area and you get a special reward for
// completing it."; "no find at home until endgame"; "Home legends: Same as other islands, which I think is 1 in 5? But including
// undiscovered islands of phase 1 if possible."). rules/rosters.ts homeRoster and dealLegends, rules/map.ts, rules/finds.ts.
import { describe, expect, it } from "vitest";
import { allIslandsFound, dealLegends, foundKinds, HOME_START, homeIsland, homeKinds, homeRoster, homeShape, homeSize, KINDS, legendsFor, REAL_KINDS } from "./rosters";
import { AREA_TYPES, generateMap, hydrateMap, prepOf, type ForestMap } from "./map";
import { routeOf } from "./party";
import { newGame } from "./game";
import { TUNING, type Tuning } from "./tuning";
import { emptySave, loadSave } from "../app/chartSave";

const PHASE1 = homeKinds();
/** Home with `found` islands (the save's found list), as the game plays it. */
const home = (found: string[] = []): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: "home", islandAreas: 10, found } });
const key = (c: readonly number[]) => c.join(",");
/** Its playable areas but home's own, by cell, with their kinds. */
const areas = (m: ForestMap) => new Map(m.cells.filter(c => key(c) !== key(m.centreCell)).map(([x, y]) => [`${x},${y}`, AREA_TYPES[m.typeOf(x, y)].creature]));
/** Later-phase kinds (none of home's), in the table's order. */
const LATER = REAL_KINDS.filter(k => KINDS[k].phase > 0);

describe("home's kinds (rules/rosters.ts homeRoster)", () => {
  it("starts at 5, all home's starting kinds, none twice, chosen at random each night (seeded), the same for the same night", () => {
    expect(HOME_START).toBe(5);
    expect(TUNING.home.start).toBe(5);
    const sets = new Set<string>();
    for (let night = 1; night <= 30; night++) {
      const r = homeRoster([], night);
      expect(r).toHaveLength(5);
      expect(new Set(r).size).toBe(5);
      for (const k of r) expect(PHASE1).toContain(k);
      expect(homeRoster([], night)).toEqual(r);
      sets.add([...r].sort().join());
    }
    expect(sets.size).toBeGreaterThan(15); // (30 nights, 252 ways to choose 5 of 10)
  });

  it("grows by one per island found: each found kind an area (any phase), filled to 5 with starting kinds whose islands are unfound", () => {
    // (later-phase islands found: 5 till she's found 5, then one more each, with one unfound phase-1 kind kept on)
    for (let n = 0; n <= 12; n++) {
      const found = LATER.slice(0, n), r = homeRoster(found, 7);
      expect(r.slice(0, n)).toEqual(found);
      expect(r).toHaveLength(Math.max(5, n + 1));
      for (const k of r.slice(n)) { expect(PHASE1).toContain(k); expect(found).not.toContain(k); }
      expect(homeSize(found)).toBe(r.length);
    }
    // (phase-1 islands found, as home's legends lead: 5 till 4 are found, then one more each, 10 once all ten are)
    expect(PHASE1.map((_, i) => homeSize(PHASE1.slice(0, i + 1)))).toEqual([5, 5, 5, 5, 6, 7, 8, 9, 10, 10]);
    // (and on: one per island found, to 64 when every one is)
    const all = [...PHASE1, ...LATER];
    for (const n of [20, 40, 63]) expect(homeSize(all.slice(0, n))).toBe(n);
    expect(homeSize(all)).toBe(64);
    expect(homeRoster(all, 3)).toEqual(all);
  });

  it("while any phase-1 island is unfound, one such kind is always among tonight's areas", () => {
    for (let n = 0; n < 10; n++) for (const night of [1, 2, 3, 4]) {
      const found = [...PHASE1.slice(0, n), ...LATER.slice(0, 12)], r = homeRoster(found, night);
      expect(r.some(k => PHASE1.includes(k) && !found.includes(k)), `${n} phase-1 found, night ${night}`).toBe(true);
    }
  });

  it("ignores what an old save's found list can't be: placeholders, unknown kinds, repeats", () => {
    expect(foundKinds(["beetle", "unknown-01", "nope", "beetle", "fox"])).toEqual(["beetle", "fox"]);
    expect(homeSize(["beetle", "unknown-01", "nope", "beetle"])).toBe(5);
    // (a save from before this home: its found list loads as it was)
    const save = loadSave({ getItem: () => JSON.stringify({ ...emptySave(), found: ["hedgehog", "beetle", "otter"] }), setItem: () => {}, removeItem: () => {} } as unknown as Storage);
    expect(save.found).toEqual(["hedgehog", "beetle", "otter"]);
    expect(homeRoster(save.found, 9).slice(0, 3)).toEqual(["hedgehog", "beetle", "otter"]);
  });
});

describe("home's legends (rules/rosters.ts dealLegends)", () => {
  it("as any island's, 1 in 5 areas: 1, 2, 4, 8 and 13 at 5, 10, 20, 40 and 64", () => {
    expect([5, 10, 20, 40, 64].map(legendsFor)).toEqual([1, 2, 4, 8, 13]);
  });

  it("an unfound phase-1 island's among them while there is one on the roster, whatever the early quest asks", () => {
    for (let n = 0; n <= 14; n++) for (const night of [1, 2, 3, 5, 8]) {
      const found = [...LATER.slice(0, Math.max(0, n - 4)), ...PHASE1.slice(0, Math.min(4, n))], kinds = homeRoster(found, night), island = homeIsland(0, kinds);
      const f = new Set(found), open = kinds.filter(k => PHASE1.includes(k) && !f.has(k));
      for (const prefer of [[], [kinds[0]], found.slice(0, 1)]) {
        const d = dealLegends(island, night, f, prefer);
        expect(d).toHaveLength(legendsFor(kinds.length));
        expect(new Set(d).size).toBe(d.length);
        for (const k of d) expect(kinds).toContain(k);
        if (open.length) expect(d.some(k => open.includes(k)), `${found.join()} night ${night} prefer ${prefer.join()}`).toBe(true);
      }
    }
  });

  it("once every phase-1 island is found, any kinds (unfound first), later phases too", () => {
    const found = [...PHASE1, ...LATER.slice(0, 5)], kinds = homeRoster(found, 4);
    expect(kinds).toEqual(found);
    const d = dealLegends(homeIsland(0, kinds), 4, new Set(found));
    expect(d).toHaveLength(legendsFor(15));
  });
});

describe("home on the map (rules/map.ts)", () => {
  it("at the start: 5 areas, 5 stumps on the route, one legend, an unfound phase-1 island's; no challenge area, no find", () => {
    for (const seed of [1, 2]) {
      const g = newGame(seed, home()), m = g.map, a = areas(m);
      expect(a.size).toBe(5);
      expect(new Set(a.values()).size).toBe(5);
      for (const k of a.values()) expect(PHASE1).toContain(k);
      expect(routeOf(m).order).toHaveLength(5);
      expect(m.legendKinds).toHaveLength(1);
      expect(PHASE1).toContain(m.legendKinds[0]);
      expect([...a.values()]).toContain(m.legendKinds[0]);
      expect(m.specialSites).toEqual([]);
      expect(g.challenge ?? null).toBeNull();
      expect(g.trunk).toBeNull();
    }
  }, 120000);

  it("its kinds the night's, its places the world's: the same areas, land and legend areas every night, the kinds dealt anew", () => {
    const maps = [3, 4, 5, 6].map(s => generateMap(s, home()));
    const cells = maps.map(m => [...areas(m).keys()].sort().join(" ")), land = maps.map(m => m.bounds.land!.dist.length);
    expect(new Set(cells).size).toBe(1);
    expect(new Set(land).size).toBe(1);
    expect(new Set(maps.map(m => [...m.legendAreas.keys()].sort().join(" "))).size).toBe(1);
    expect(new Set(maps.map(m => [...new Set(areas(m).values())].sort().join())).size).toBeGreaterThan(1);
  }, 120000);

  it("grows outward as islands are found: the first areas kept, the found kinds on it, a legend still to an unfound phase-1 island", () => {
    const m0 = generateMap(11, home()), found = ["beetle", "otter", "hedgehog", "butterfly", "fox", "owl"], m6 = generateMap(12, home(found));
    const a0 = areas(m0), a6 = areas(m6);
    expect(a6.size).toBe(7); // (6 found, and one starting kind whose island is unfound)
    for (const k of found) expect([...a6.values()]).toContain(k);
    expect(m6.centreCell).toEqual(m0.centreCell);
    for (const k of a0.keys()) expect(a6.has(k), `${k} kept`).toBe(true);
    expect(m6.legendKinds).toHaveLength(legendsFor(7));
    expect(m6.legendKinds.some(k => PHASE1.includes(k) && !found.includes(k))).toBe(true);
    expect(m6.specialSites).toEqual([]);
  }, 120000);

  it("no challenge and no find till every island on the chart is found; then its challenge area, its pack an adult and a youth of each of 64", () => {
    const most = REAL_KINDS.slice(0, 63);
    expect(allIslandsFound(most)).toBe(false);
    expect(allIslandsFound(REAL_KINDS)).toBe(true);
    const g63 = newGame(1, home(most));
    expect(g63.map.specialSites).toEqual([]);
    expect(g63.trunk).toBeNull();
    const g64 = newGame(1, home([...REAL_KINDS]));
    expect(areas(g64.map).size).toBe(64);
    expect(g64.map.specialSites.map(s => s.kind)).toEqual(["challenge"]);
    expect(g64.challenge?.pack).toHaveLength(128);
    expect(g64.trunk).not.toBeNull(); // (its reward for now: Ed, "we'll figure this out later")
  }, 300000);

  it("is deterministic (lockstep: a guest makes it from the host's seed and tuning) and made again the same from its prep", () => {
    const t = home(["beetle", "hedgehog"]), a = generateMap(21, t), b = generateMap(21, JSON.parse(JSON.stringify(t)) as Tuning), c = hydrateMap(21, t, prepOf(a));
    for (const m of [b, c]) {
      expect(m.legendKinds).toEqual(a.legendKinds);
      expect([...areas(m)]).toEqual([...areas(a)]);
      expect(routeOf(m).order).toEqual(routeOf(a).order);
    }
  }, 120000);

  it("the sea chart draws home at its size for what's found", () => {
    expect(homeShape(0, []).size).toBe(5);
    expect(homeShape(0, ["beetle", "hedgehog", "fox", "owl", "butterfly", "otter"]).size).toBe(7);
    expect(homeShape(0, [...REAL_KINDS]).size).toBe(64);
  });
});
