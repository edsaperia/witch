// The world seed (Ed, 2026-10-11; rules/rosters.ts, rules/map.ts): a campaign's islands keep their shapes (coast, areas, roster,
// place on the chart) night after night; what's inside them (scenery, creatures, the night's legends, which type is where) changes each night; another
// world has other shapes.
import { describe, expect, it } from "vitest";
import { bearingOf, homeIsland, islandOf, KIND_NAMES, KINDS } from "./rosters";
import { AREA_TYPES, generateMap } from "./map";
import { TUNING, type Tuning } from "./tuning";
import { newGame } from "./game";

const at = (island: string, world: number, areas = 10): Tuning => ({ ...TUNING, map: { ...TUNING.map!, island, world, islandAreas: areas } });
// (its areas' types are the night's too, dealt along its route (Ed, 2026-10-28, rules/deal.ts); the roster they're dealt from, its world's)
const shape = (m: ReturnType<typeof generateMap>) => ({ cells: m.cells, roster: m.cells.map(([x, y]) => AREA_TYPES[m.typeOf(x, y)].id).sort(), r: m.bounds.land!.box, coast: [0, 1, 2, 3, 4, 5].map(a => m.coast(a)) });
const insides = (m: ReturnType<typeof generateMap>) => JSON.stringify({ types: m.cells.map(([x, y]) => m.typeOf(x, y)), scenes: m.scenes, grounds: m.grounds, legends: m.legendKinds, paths: m.paths.lines?.length ?? 0 });

describe("the world seed", () => {
  it("fixes every island in a world (world 0: the table's own bearings), and moves them all in another", () => {
    for (const k of KIND_NAMES) {
      expect(islandOf(k, 7)).toEqual(islandOf(k, 7));
      expect(bearingOf(k, 0)).toBe(KINDS[k].bearing);
      expect(Math.abs(((bearingOf(k, 7) - KINDS[k].bearing + 540) % 360) - 180)).toBeLessThanOrEqual(7);
    }
    expect(KIND_NAMES.filter(k => islandOf(k, 7)!.seed === islandOf(k, 8)!.seed)).toEqual([]);
    expect(homeIsland(7).seed).toBe(homeIsland(7).seed);
    expect(homeIsland(7).seed).not.toBe(homeIsland(8).seed);
  });

  it("keeps an island's shape every night in one world, its insides the night's own; another world, another shape", () => {
    for (const island of ["home", "fox"]) {
      const nights = [11, 22, 33].map(night => generateMap(night, at(island, 4242)));
      for (const m of nights) expect(shape(m)).toEqual(shape(nights[0]));
      expect(new Set(nights.map(insides)).size).toBeGreaterThan(1);
      expect(shape(generateMap(11, at(island, 777)))).not.toEqual(shape(nights[0]));
    }
  }, 120000);

  it("places the creatures by the night too", () => {
    const a = newGame(11, at("fox", 4242)), b = newGame(22, at("fox", 4242));
    expect(a.map.cells).toEqual(b.map.cells);
    const spots = (g: typeof a) => g.creatures.slice(0, 10).map(c => [Math.round(c.x), Math.round(c.z)].join());
    expect(spots(a)).not.toEqual(spots(b));
  }, 60000);
});
