// Home grows (Ed, 2026-10-10; journey.md "Home's size", "One rule for every island"; since Ed, 2026-11-04: "home has 5 areas
// chosen at random from the phase 1 creatures, and grows as you unlock islands"): one area per island she's found, at least 5
// (rules/rosters.ts homeRoster); its shape the world's, growing outward night by night; and on the sea chart. rules/homeStart.test.ts
// has the rest (the random starting kinds, the legends, the challenge at the end).
import { describe, expect, it } from "vitest";
import { coastSpec, foundKinds, homeKinds, homeShape, homeSize, islandOf, knownKinds, legendsFor } from "../rules/rosters";
import { AREA_TYPES, generateMap } from "../rules/map";
import { islandCoast } from "../rules/islandShape";
import { TUNING, type Tuning } from "../rules/tuning";
import { emptySave, recordNight } from "./chartSave";

// Keep explicit 5/6/8-area homes: persistence, outward growth, roster counts and coast scaling are the integration assertions.
const home = (found: string[], world = 0): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: "home", islandAreas: 10, found, world } });
/** Each of the map's areas but home's own, by cell, with its kind. */
// (and every area of the island: those and tonight's find's, which moves each night: Ed, 2026-11-03, the path network's special sites)
const allAreas = (map: ReturnType<typeof generateMap>) => new Set([...areas(map).keys(), ...map.specialSites.map(s => s.cell.join(","))]);
const areas = (map: ReturnType<typeof generateMap>) => new Map(map.cells.filter(([x, y]) => x !== map.centreCell[0] || y !== map.centreCell[1]).map(([x, y]) => [`${x},${y}`, AREA_TYPES[map.typeOf(x, y)].creature]));
/** Later-phase islands found (none of home's starting kinds): 5 of them grow home to 6, 7 to 8 (one starting kind kept on). */
const FOUND5 = ["beetle", "otter", "butterfly", "owl", "toad"], FOUND7 = [...FOUND5, "bear", "lynx"];

describe("home grows with the islands she's found", () => {
  it("knows home's 10, then each kind found with an area type, in the order found, none twice (the zoo's); home is the found ones, at least 5", () => {
    expect(knownKinds()).toEqual(homeKinds());
    expect(knownKinds(["beetle"]).length).toBe(11);
    // (a home kind found is known already; a placeholder is never known)
    expect(knownKinds(["beetle", "fox", "unknown-01", "otter", "butterfly", "otter"])).toEqual([...homeKinds(), "beetle", "otter", "butterfly"]);
    expect(foundKinds(["beetle", "fox", "unknown-01", "otter", "butterfly", "otter"])).toEqual(["beetle", "fox", "otter", "butterfly"]);
    expect([homeSize([]), homeSize(["beetle", "otter", "butterfly"]), homeSize(FOUND5), homeSize(FOUND7)]).toEqual([5, 5, 6, 8]);
  });

  it("5 -> 6 -> 8 areas at home: the first ones kept, each new one an area further out, the shape the world's", () => {
    const m5 = generateMap(41, home([])), m6 = generateMap(42, home(FOUND5)), m8 = generateMap(43, home(FOUND7));
    const a5 = areas(m5), a6 = areas(m6), a8 = areas(m8);
    expect([a5.size, a6.size, a8.size]).toEqual([5, 6, 8]);
    for (const k of a5.values()) expect(homeKinds()).toContain(k);
    for (const k of FOUND7) expect([...a8.values()]).toContain(k);
    expect(m8.centreCell).toEqual(m5.centreCell);
    // the 5-area home's areas every night after (whatever the night's seed); which kind is where is the night's own (Ed,
    // 2026-10-28, rules/deal.ts: its types dealt along each night's route)
    const all5 = allAreas(m5), all6 = allAreas(m6), all8 = allAreas(m8);
    for (const k of all5) { expect(all6.has(k)).toBe(true); expect(all8.has(k)).toBe(true); }
    for (const k of all6) expect(all8.has(k)).toBe(true);
    // the new ones further out, along the island's shape (rules/islandGrowth.ts: each the next it takes from its edge): each
    // joined to the areas before it
    for (const k of all8) if (!all5.has(k))
      expect([...(m8.neighbours.get(k) ?? [])].some(q => all5.has(q) || q === m8.centreCell.join(",") || (all8.has(q) && q !== k)), `${k} joined to the island`).toBe(true);
    const landOf = (m: ReturnType<typeof generateMap>) => m.bounds.land!.dist.filter(d => d > 0).length; // (its land's samples: the island bigger)
    expect(landOf(m8)).toBeGreaterThan(landOf(m5));
    // 1 legend a night at first (1 in 5 areas); as many as any island of its size after
    expect(m5.legendKinds.length).toBe(1);
    expect(m8.legendKinds.length).toBe(legendsFor(8));
  }, 120000);

  it("is the starting home with nothing found: 5 areas, its grid from its first cell", () => {
    const m = generateMap(7, home([]));
    expect(m.first).toBe(0);
    expect(m.island?.size).toBe(5);
  }, 60000);

  it("end to end: a night won on an island finds its legends' kinds; the next night home has their areas, its legends favouring islands unfound", () => {
    let save = emptySave();
    // home won: its legend a phase-1 island's (one of home's starting kinds), found; home stays 5
    const night1 = generateMap(5, home(save.found));
    expect(night1.legendKinds).toHaveLength(1);
    expect(homeKinds()).toContain(night1.legendKinds[0]);
    save = recordNight(save, "home", { won: true, found: night1.legendKinds });
    expect(save.found.length).toBe(1);
    expect(areas(generateMap(6, home(save.found))).size).toBe(5);
    // that island won: the kinds new to it found, and home grows by each with an area type once past 5
    const isle = save.found[0], night2 = generateMap(7, { ...TUNING, map: { ...TUNING.map!, island: isle, found: save.found } });
    expect(night2.island?.kind).toBe(isle);
    save = recordNight(save, isle, { won: true, found: night2.legendKinds });
    const mine = foundKinds(save.found), next = generateMap(8, home(save.found)), kinds = [...areas(next).values()];
    expect(mine.length).toBeGreaterThan(1);
    expect(areas(next).size).toBe(homeSize(save.found));
    for (const k of mine) expect(kinds).toContain(k);
    // the night's legends: found kinds only to make up the number
    const unfound = [...new Set(kinds)].filter(k => !save.found.includes(k));
    if (unfound.length >= next.legendKinds.length) for (const k of next.legendKinds) expect(save.found).not.toContain(k);
  }, 120000);

  it("on the sea chart, home's outline grows with it (its coast the same, bigger)", () => {
    const small = islandCoast(coastSpec(homeShape(3, [])), TUNING.map?.coast), big = islandCoast(coastSpec(homeShape(3, FOUND7)), TUNING.map?.coast);
    expect(small.areas).toBe(5);
    expect(big.areas).toBe(8);
    expect(big.radii[0] / small.radii[0]).toBeCloseTo(Math.sqrt(8 / 5), 5);
    expect(big.radii[40] / big.radii[0]).toBeCloseTo(small.radii[40] / small.radii[0], 5);
    expect(islandOf("beetle")).not.toBeNull();
  });
});
