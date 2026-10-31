// No empty clearings by the beach (Ed, 2026-10-26: "Areas near the beach seem to have clearings that are
// empty"): only the playable areas open a fighting arena round their middle and keep room for a
// soundsystem; the buffer's areas, which never get a runestone, soundsystem or fight, grow as forest.
import { describe, expect, it } from "vitest";
import { beachOf } from "./mapShape";
import { generateMap } from "./map";
import { TUNING, withTuning } from "./tuning";

// (the radius map as the tests start from it, and the game's own 10-area islands)
const CASES = [[123, "home", 0], [7, "home", 0], [42, "fox", 0], [9, "ibex", 0], [123, "home", 10], [7, "home", 10], [42, "fox", 10]] as const;
// Keep this explicit size/island matrix: buffer clearings are compared across radius and authored-island layouts.

describe("no reserved clearing with nothing in it", () => {
  for (const [seed, island, islandAreas] of CASES) {
    it(`only playable areas clear an arena or a soundsystem's room (seed ${seed}, ${island}${islandAreas ? `, ${islandAreas} areas` : ""})`, () => {
      const map = generateMap(seed, withTuning({ map: { ...TUNING.map, island, islandAreas } } as never)), L = map.bounds.land!, sand = beachOf(map.bounds, map.tuning);
      let buffer = 0, spotsClear = 0, inland = 0;
      for (const key of map.neighbours.keys()) {
        const [cx, cy] = key.split(",").map(Number), s = map.siteOf(cx, cy), q = map.soundsystemSpot(cx, cy);
        if (map.playable(cx, cy)) {
          if (cx !== map.centreCell[0] || cy !== map.centreCell[1]) expect(map.arenaOpen(q.x, q.z, [cx, cy])).toBeLessThan(0.2);
          continue;
        }
        if (map.isLake?.(cx, cy) || L.distAt(s.x, s.z) < 0) continue;
        buffer++;
        for (let a = 0; a < 12; a++) for (const r of [0, 8, 20, 40]) {
          const t = (a / 12) * Math.PI * 2;
          expect(map.arenaOpen(s.x + Math.cos(t) * r, s.z + Math.sin(t) * r, [cx, cy])).toBe(1);
          expect(map.arenaOpen(q.x + Math.cos(t) * r, q.z + Math.sin(t) * r, [cx, cy])).toBe(1);
        }
        // (its soundsystem's spot, well inland, isn't held clear: only a scene, a ground or the like clears it)
        // (but a legend area's heart, where its legend's circle lies, and the beach's sand, which reaches far inland on some
        // coasts: neither is a reserved clearing; Ed, 2026-10-26, legend areas, grew the land so more buffer areas lie that far in)
        if (L.distAt(q.x, q.z) > 60 && map.areaAt(q.x, q.z).cell.join() === key && !map.isLegendArea?.(cx, cy) && !((sand?.intoSand(q.x, q.z) ?? -1) > 0)) { inland++; if (map.hardClear(q.x, q.z)) spotsClear++; }
      }
      expect(buffer).toBeGreaterThan(10);
      expect(spotsClear).toBeLessThanOrEqual(Math.ceil(inland * 0.25));
    });
  }
});
