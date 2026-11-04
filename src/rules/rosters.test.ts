// The journey's rosters (Ed, 2026-10-11; docs/backlog/journey.md "Rosters", rules/rosters.ts): each kind's island, its roster
// and its night's legends; and the map they make.
import { describe, expect, it } from "vitest";
import { dealLegends, OTHERS_MAX, homeKinds, isPlaceholder, islandOf, islandSeed, KIND_NAMES, KINDS, legendsFor, ownAreas, playableIsland, REAL_KINDS, ROSTER_NEIGHBOURHOOD, rosterOf } from "./rosters";
import { AREA_TYPES, generateMap } from "./map";
import { TUNING, type Tuning } from "./tuning";
import { newGame } from "./game";
import { dealtLegends } from "./win";

// Keep authored island sizes/rosters and placeholder fallback: exact area multiplicities, dealt legends and coast identity are the behavior under test.
const onIsland = (island: string, found: string[] = []): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island, found } });
const kindOfCell = (map: ReturnType<typeof generateMap>, k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[map.typeOf(x, y)].creature; };

describe("islands by kind (islandOf)", () => {
  it("puts every kind's island one phase after its own, on its bearing, sized by phase, the same every time", () => {
    for (const k of KIND_NAMES) {
      const i = islandOf(k)!;
      expect(i.phase).toBe(KINDS[k].phase + 1);
      expect(i.bearing).toBe(KINDS[k].bearing);
      expect(i.size).toBe(10 * i.phase);
      expect(islandOf(k)).toEqual(i);
    }
    expect(islandOf("dragon")).toBeNull();
    // (each island its own seed: where it lies)
    expect(new Set(KIND_NAMES.map(k => islandOf(k)!.seed)).size).toBe(KIND_NAMES.length);
  });

  it("gives each a roster by the rule: its kind plentiful, 1-3 new to its phase, only kinds of its phase or before, each other kind on at most 2 areas (Ed, 2026-10-28)", () => {
    for (const k of REAL_KINDS) {
      const i = islandOf(k)!, kinds = i.roster.map(r => r.kind), own = i.roster.find(r => r.kind === k)!;
      expect(i.roster.reduce((a, r) => a + r.areas, 0)).toBe(i.size);
      expect(new Set(kinds).size).toBe(kinds.length);
      expect(own.areas).toBe(Math.max(2, Math.round(i.size / 6)));
      expect(kinds.length).toBeGreaterThanOrEqual(1 + Math.ceil((i.size - own.areas) / OTHERS_MAX));
      for (const r of i.roster) if (r.kind !== k) expect(r.areas, `${k}'s island: ${r.kind}`).toBeLessThanOrEqual(OTHERS_MAX);
      for (const r of i.roster) { expect(KINDS[r.kind].phase).toBeLessThanOrEqual(i.phase); expect(r.areas).toBeGreaterThan(0); }
      const fresh = kinds.filter(x => x !== k && KINDS[x].phase === i.phase).length;
      if (REAL_KINDS.some(x => KINDS[x].phase === i.phase)) { expect(fresh).toBeGreaterThanOrEqual(1); }
      expect(fresh).toBeLessThanOrEqual(3);
      expect(fresh).toBe(Math.min(REAL_KINDS.filter(x => KINDS[x].phase === i.phase).length, Math.max(1, Math.min(3, Math.round(i.size / 15)))));
    }
  });

  // Ed, 2026-11-04 (the middle way): "Now that islands have fewer areas, we can have fewer (none?) repeats of creature types on an
  // island, besides the island of the creature type itself": one area a kind while the island's compass neighbourhood has kinds,
  // second areas (to the neighbourhood's kinds) only once it runs out, kinds from further round only past that.
  describe("its compass neighbourhood (map.rosterNeighbourhood)", () => {
    const apart = (a: number, b: number) => { const d = Math.abs(((a - b) % 360 + 360) % 360); return d > 180 ? 360 - d : d; };
    // today's sizes (10 a phase) and Ed's proposed ones (10/15/20/25/30), at the default and a narrow and the whole compass
    const sizes = { today: (p: number) => 10 * p, proposed: (p: number) => 5 + 5 * p };
    const cases = Object.entries(sizes).flatMap(([scheme, size]) => [ROSTER_NEIGHBOURHOOD, 45, 180].flatMap(hood => REAL_KINDS.map(K => {
      const phase = KINDS[K].phase + 1, bearing = KINDS[K].bearing, s = size(phase), seed = islandSeed(phase, bearing);
      return { K, phase, bearing, size: s, seed, hood, label: `${K}'s island (${scheme}, ${s} areas, ±${hood}°)`, roster: rosterOf(K, phase, bearing, s, seed, hood) };
    })));
    const inHood = (k: string, c: (typeof cases)[number]) => apart(KINDS[k].bearing, c.bearing) <= c.hood;
    // (the kinds the neighbourhood can give: before the island's phase, in the window; those new to its phase are only its 1-3 fresh)
    const hoodKinds = (c: (typeof cases)[number]) => REAL_KINDS.filter(k => k !== c.K && KINDS[k].phase < c.phase && inHood(k, c));

    it("keeps its own kind on ownAreas and shares the rest out, every other kind on 1 or 2 areas", () => {
      for (const c of cases) {
        expect(c.roster[0], c.label).toEqual({ kind: c.K, areas: ownAreas(c.size) });
        expect(c.roster.reduce((a, r) => a + r.areas, 0), c.label).toBe(c.size);
        for (const r of c.roster.slice(1)) expect([1, 2], `${c.label}: ${r.kind}`).toContain(r.areas);
      }
    });

    it("repeats no kind while the neighbourhood still has kinds", () => {
      let without = 0;
      for (const c of cases) {
        const on = new Set(c.roster.map(r => r.kind)), repeats = c.roster.slice(1).filter(r => r.areas > 1);
        if (repeats.length) for (const k of hoodKinds(c)) expect(on.has(k), `${c.label} repeats ${repeats[0].kind} but leaves out ${k}`).toBe(true);
        else without++;
      }
      expect(without).toBeGreaterThan(0); // (some islands have no repeats at all)
    });

    it("gives second areas only once it runs out, to its own kinds first, and reaches further round only past that", () => {
      let fallback = 0;
      for (const c of cases) {
        const others = c.roster.slice(1), near = others.filter(r => inHood(r.kind, c)), far = others.filter(r => !inHood(r.kind, c));
        const repeats = others.filter(r => r.areas > 1).length;
        // as few repeats as the kinds allow: one area a kind, the rest second areas
        expect(repeats, c.label).toBe(c.size - c.roster[0].areas - others.length);
        if (repeats) fallback++;
        // a far kind's second area only once every near kind has two
        if (far.some(r => r.areas > 1)) for (const r of near) expect(r.areas, `${c.label}: ${r.kind}`).toBe(2);
        // a far kind (not one of the 1-3 new to its phase) only once the neighbourhood's kinds are all on and doubled
        if (far.some(r => KINDS[r.kind].phase < c.phase)) {
          for (const k of hoodKinds(c)) expect(others.map(r => r.kind), `${c.label} reaches round the compass before taking ${k}`).toContain(k);
          for (const r of near) expect(r.areas, `${c.label}: ${r.kind}`).toBe(2);
        }
      }
      expect(fallback).toBeGreaterThan(0); // (and some still fall back to repeats)
    });

    it("has more kinds and fewer repeats on a phase-1 island than the 2026-10-28 rule (neighbourhood 0)", () => {
      for (const K of homeKinds()) {
        const i = islandOf(K)!, before = rosterOf(K, i.phase, i.bearing, i.size, i.seed, 0), after = i.roster;
        expect(before.length, K).toBe(1 + Math.ceil((i.size - ownAreas(i.size)) / OTHERS_MAX)); // (0: the old rule, 2 areas a kind)
        expect(after.length, K).toBeGreaterThan(before.length);
        for (const r of after.slice(1)) expect(apart(KINDS[r.kind].bearing, i.bearing), `${K}'s island: ${r.kind}`).toBeLessThanOrEqual(ROSTER_NEIGHBOURHOOD);
      }
    });

    it("is the same roster for the same island every time (seeded), and its map's neighbourhood the tuning's", () => {
      for (const c of cases.slice(0, 64)) expect(rosterOf(c.K, c.phase, c.bearing, c.size, c.seed, c.hood), c.label).toEqual(c.roster);
      for (const K of REAL_KINDS) for (const world of [0, 5]) expect(islandOf(K, world)!.roster).toEqual(islandOf(K, world, TUNING.map!.rosterNeighbourhood)!.roster);
      expect(ROSTER_NEIGHBOURHOOD).toBe(TUNING.map!.rosterNeighbourhood);
    });
  });

  it("deals 1 in 5 areas' legends a night from the roster, never its own kind, no two alike, the ones not found first", () => {
    for (const k of REAL_KINDS) {
      const i = islandOf(k)!, pool = i.roster.map(r => r.kind);
      for (const night of [1, 2, 3]) {
        const d = dealLegends(i, night);
        expect(d.length).toBe(legendsFor(i.size));
        expect(d).not.toContain(k);
        expect(new Set(d).size).toBe(d.length);
        for (const x of d) expect(pool).toContain(x);
      }
      // found ones only to make up the number
      const night = 7, first = dealLegends(i, night), found = new Set(first.slice(0, 1));
      const again = dealLegends(i, night, found), unfound = pool.filter(x => x !== k && !found.has(x)).length;
      if (unfound >= again.length) expect(again.some(x => found.has(x))).toBe(false);
    }
    // W8, Ed 2026-11-02: home-deal variety over eight nights is reported, not pinned.
  });
});

describe("the map of an island by roster", () => {
  it("plays a kind's island from its own seed and size: its areas the roster's, a legend in an area of each kind dealt", () => {
    for (const k of ["fox", "badger", "bear"]) {
      const i = islandOf(k)!, map = generateMap(5, onIsland(k)), other = generateMap(77, onIsland(k));
      expect(map.island?.kind).toBe(k);
      expect(map.cells.length).toBe(i.size + 1);
      // the shape and areas are the island's alone; the night (the run's seed) only deals its legends
      // (its areas: the playable ones and the night's find's, which moves each night: Ed, 2026-11-03, the path network's special sites)
      const areas = (m: typeof map) => [...m.cells, ...m.specialSites.map(s => s.cell)].map(c => c.join()).sort();
      expect(areas(other)).toEqual(areas(map));
      expect(other.bounds.land!.box).toEqual(map.bounds.land!.box); // (the same coast)
      const home = map.centreCell, count = new Map<string, number>();
      for (const [x, y] of map.cells) if (x !== home[0] || y !== home[1]) { const c = AREA_TYPES[map.typeOf(x, y)].creature; count.set(c, (count.get(c) ?? 0) + 1); }
      expect(Object.fromEntries(count)).toEqual(Object.fromEntries(i.roster.map(r => [r.kind, r.areas])));
      expect(map.legendKinds.length).toBe(legendsFor(i.size));
      expect([...map.legendCells].map(c => kindOfCell(map, c)).sort()).toEqual([...map.legendKinds].sort());
    }
  }, 120000);

  it("plays home by default: one area per kind she knows, two legends a night among them", () => {
    const map = generateMap(123, { ...onIsland("home"), map: { ...onIsland("home").map!, islandAreas: 10 } }), home = map.centreCell;
    const kinds = map.cells.filter(([x, y]) => x !== home[0] || y !== home[1]).map(([x, y]) => AREA_TYPES[map.typeOf(x, y)].creature).sort();
    expect(kinds).toEqual([...homeKinds()].sort());
    expect(map.legendKinds.length).toBe(2);
    expect(map.legendCells.size).toBe(2);
  }, 60000);

  it("has the game's legends the night's dealt kinds, favouring islands not yet found", () => {
    const g = newGame(9, onIsland("fox"));
    const legends = dealtLegends(g).filter(c => !c.gone).map(c => c.species).sort();
    expect(g.creatures.filter(c => c.homeGuard).map(c => c.species)).toEqual(["fox"]);
    expect(legends).toEqual([...g.map.legendKinds].sort());
    const found = g.map.legendKinds.slice(0, 1), g2 = newGame(9, onIsland("fox", found));
    const pool = islandOf("fox")!.roster.map(r => r.kind).filter(k => k !== "fox" && !found.includes(k));
    if (pool.length >= g2.map.legendKinds.length) expect(g2.map.legendKinds.some(k => found.includes(k))).toBe(false);
  }, 60000);
});

describe("an island's outline (rules/islandShape.ts) is the map's own coast", () => {
  it("draws from islandOf alone: the coast the map makes with the island's seed and the islands' knobs", async () => {
    const { islandCoast } = await import("./islandShape");
    const { makeCoast } = await import("./mapShape");
    const { coastSpec } = await import("./rosters");
    const i = islandOf("wolf")!, c = islandCoast(coastSpec(i), TUNING.islands.coast), m = makeCoast(i.seed, TUNING.islands.coast);
    expect(c.seed).toBe(i.seed);
    expect(c.areas).toBe(i.size);
    const a = -Math.PI + 0.3; // (the radii follow the map's coast, at the island's size)
    expect(c.radii[Math.round(((a + Math.PI) / (Math.PI * 2)) * c.radii.length)] / c.radii[0]).toBeCloseTo(m(-Math.PI + Math.round(((a + Math.PI) / (Math.PI * 2)) * c.radii.length) / c.radii.length * Math.PI * 2) / m(-Math.PI), 5);
  });
});

describe("the islands of kinds not designed yet (placeholders, '?': Ed, 2026-10-11)", () => {
  it("gives all 64 kinds an island with a seed, size and roster, 10 to 50 areas by phase", () => {
    expect(KIND_NAMES.length).toBe(64);
    for (const k of KIND_NAMES) {
      const i = islandOf(k)!;
      expect(i.size).toBe(10 * i.phase);
      expect(i.roster.reduce((a, r) => a + r.areas, 0)).toBe(i.size);
    }
    expect(new Set(KIND_NAMES.map(k => islandOf(k)!.seed)).size).toBe(64);
  });

  it("never puts a placeholder on any island's roster, deals one as a legend, or plays a placeholder's island", () => {
    for (const k of KIND_NAMES) {
      const i = islandOf(k)!;
      for (const r of i.roster) expect(isPlaceholder(r.kind), `${k}'s island: ${r.kind}`).toBe(false);
      for (const night of [1, 2, 3]) for (const d of dealLegends(i, night)) expect(isPlaceholder(d)).toBe(false);
    }
    expect(playableIsland("unknown-01")).toBe(false);
    expect(playableIsland("fox")).toBe(true);
    expect(playableIsland("home")).toBe(true);
    // (map.island a placeholder's: not played as one; the areas random, as with no roster)
    const map = generateMap(5, onIsland("unknown-01"));
    expect(map.island).toBeNull();
    for (const [x, y] of map.cells) expect(isPlaceholder(AREA_TYPES[map.typeOf(x, y)].creature)).toBe(false);
  }, 60000);
});
