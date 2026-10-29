// Home grows (Ed, 2026-10-10; journey.md "Home's size", "One rule for every island"): one area per kind she knows, home's 10 at
// first, then each kind whose island she's found; its shape the world's, growing outward night by night; and on the sea chart.
import { describe, expect, it } from "vitest";
import { coastSpec, homeIsland, homeKinds, islandOf, knownKinds, legendsFor } from "../rules/rosters";
import { AREA_TYPES, generateMap } from "../rules/map";
import { islandCoast } from "../rules/islandShape";
import { TUNING, type Tuning } from "../rules/tuning";
import { emptySave, recordNight } from "./chartSave";

const home = (found: string[], world = 0): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island: "home", islandAreas: 10, found, world } });
/** Each of the map's areas but home's own, by cell, with its kind. */
const areas = (map: ReturnType<typeof generateMap>) => new Map(map.cells.filter(([x, y]) => x !== map.centreCell[0] || y !== map.centreCell[1]).map(([x, y]) => [`${x},${y}`, AREA_TYPES[map.typeOf(x, y)].creature]));

describe("home grows with the kinds she knows", () => {
  it("knows home's 10, then each kind found with an area type, in the order found, none twice", () => {
    expect(knownKinds()).toEqual(homeKinds());
    expect(knownKinds(["beetle"]).length).toBe(11);
    // (a home kind found is known already; a placeholder is never known)
    expect(knownKinds(["beetle", "fox", "unknown-01", "otter", "moth", "otter"])).toEqual([...homeKinds(), "beetle", "otter", "moth"]);
    expect(homeIsland(0, knownKinds(["beetle", "otter", "moth"])).size).toBe(13);
  });

  it("10 -> 11 -> 13 areas at home: the first ones kept, each new kind an area further out, the shape the world's", () => {
    const m10 = generateMap(41, home([])), m11 = generateMap(42, home(["beetle"])), m13 = generateMap(43, home(["beetle", "otter", "moth"]));
    const a10 = areas(m10), a11 = areas(m11), a13 = areas(m13);
    expect([a10.size, a11.size, a13.size]).toEqual([10, 11, 13]);
    expect([...a10.values()].sort()).toEqual([...homeKinds()].sort());
    expect([...a13.values()].sort()).toEqual([...homeKinds(), "beetle", "otter", "moth"].sort());
    expect(m13.centreCell).toEqual(m10.centreCell);
    // the 10-area home's areas every night after (whatever the night's seed); which kind is where is the night's own (Ed,
    // 2026-10-28, rules/deal.ts: its types dealt along each night's route)
    for (const k of a10.keys()) { expect(a11.has(k)).toBe(true); expect(a13.has(k)).toBe(true); }
    for (const k of a11.keys()) expect(a13.has(k)).toBe(true);
    // the new ones further out, along the island's shape (rules/islandGrowth.ts: each the next it takes from its edge): each
    // joined to the areas before it, and past home's own neighbours
    const ring = new Set(m13.neighbours.get(m13.centreCell.join(",")) ?? []);
    for (const k of a13.keys()) if (!a10.has(k)) {
      expect(ring.has(k), `${k} past home's neighbours`).toBe(false);
      expect([...(m13.neighbours.get(k) ?? [])].some(q => a10.has(q) || q === m13.centreCell.join(",") || (a13.has(q) && q !== k)), `${k} joined to the island`).toBe(true);
    }
    const landOf = (m: ReturnType<typeof generateMap>) => m.bounds.land!.dist.filter(d => d > 0).length; // (its land's samples: the island bigger)
    expect(landOf(m13)).toBeGreaterThan(landOf(m10));
    // 2 legends a night at first (1 in 5 areas); 3 at 13
    expect(m10.legendKinds.length).toBe(2);
    expect(m13.legendKinds.length).toBe(legendsFor(13));
  }, 120000);

  it("is the default home unchanged with nothing found (the same map as before home grew)", () => {
    const m = generateMap(7, home([]));
    expect(m.first).toBe(0);
    expect(m.island?.size).toBe(10);
  }, 60000);

  it("end to end: a night won on an island finds its legends' kinds; the next night home has their areas, its legends favouring islands unfound", () => {
    let save = emptySave();
    // home won: its legends are home's kinds, so their islands are found but home stays 10
    const night1 = generateMap(5, home(save.found));
    save = recordNight(save, "home", { won: true, found: night1.legendKinds });
    expect(save.found.length).toBe(2);
    expect(areas(generateMap(6, home(save.found))).size).toBe(10);
    // one of those islands won: the kinds new to it found, and home grows by each with an area type
    const isle = save.found[0], night2 = generateMap(7, { ...TUNING, map: { ...TUNING.map!, island: isle, found: save.found } });
    expect(night2.island?.kind).toBe(isle);
    save = recordNight(save, isle, { won: true, found: night2.legendKinds });
    const known = knownKinds(save.found), next = generateMap(8, home(save.found));
    expect(known.length).toBeGreaterThan(10);
    expect(areas(next).size).toBe(known.length);
    expect([...areas(next).values()].sort()).toEqual([...known].sort());
    // the night's legends: found kinds only to make up the number
    const unfound = known.filter(k => !save.found.includes(k));
    if (unfound.length >= next.legendKinds.length) for (const k of next.legendKinds) expect(save.found).not.toContain(k);
  }, 120000);

  it("on the sea chart, home's outline grows with it (its coast the same, bigger)", () => {
    const small = islandCoast(coastSpec(homeIsland(3)), TUNING.map?.coast), big = islandCoast(coastSpec(homeIsland(3, knownKinds(["beetle", "otter", "moth"]))), TUNING.map?.coast);
    expect(big.areas).toBe(13);
    expect(big.radii[0] / small.radii[0]).toBeCloseTo(Math.sqrt(13 / 10), 5);
    expect(big.radii[40] / big.radii[0]).toBeCloseTo(small.radii[40] / small.radii[0], 5);
    expect(islandOf("beetle")).not.toBeNull();
  });
});
