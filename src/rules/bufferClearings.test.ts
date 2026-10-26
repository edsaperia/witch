// No empty clearings by the beach (Ed, 2026-10-26: "Areas near the beach seem to have clearings that are
// empty"): only the playable areas open a fighting arena round their middle and keep room for a
// soundsystem; the buffer's areas, which never get a runestone, soundsystem or fight, grow as forest.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING, withTuning } from "./tuning";

const CASES = [[123, "home"], [7, "home"], [42, "fox"], [9, "ibex"]] as const;

describe("no reserved clearing with nothing in it", () => {
  for (const [seed, island] of CASES) {
    it(`only playable areas clear an arena or a soundsystem's room (seed ${seed}, ${island})`, () => {
      const map = generateMap(seed, withTuning({ map: { ...TUNING.map, island } } as never)), L = map.bounds.land!;
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
        if (L.distAt(q.x, q.z) > 60 && map.areaAt(q.x, q.z).cell.join() === key) { inland++; if (map.hardClear(q.x, q.z)) spotsClear++; }
      }
      expect(buffer).toBeGreaterThan(10);
      expect(spotsClear).toBeLessThanOrEqual(Math.ceil(inland * 0.25));
    });
  }
});
