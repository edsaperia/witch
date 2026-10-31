import { describe, expect, it } from "vitest";
import { AREA_TYPES, generateMap } from "../rules/map";
import { homeIsland, islandOf, knownKinds } from "../rules/rosters";
import { tuningFromLink } from "./linkParams";

// Ed, 2026-10-12: an island grows only its roster's species. Every area of an island by roster but home's (its playable areas, the
// buffer ring past them, the sea's and the lakes') has one of the roster's types, the ring's that of its nearest playable area.
describe("an island's area types", () => {
  const typesOf = (roster: { kind: string }[]) => new Set(roster.map(r => AREA_TYPES.findIndex(a => a.creature === r.kind)));
  for (const island of ["wolf", "fox", "home"]) {
    it(`are all its roster's, ring and sea too (${island})`, () => {
      const { tuning } = tuningFromLink(new URLSearchParams({ island })); // (as the game's link makes it)
      // Keep each authored island's extent and roster: buffer-ring and sea type assignment are the subject of this test.
      for (const seed of [1, 4242]) {
        const m = generateMap(seed, tuning);
        const want = typesOf((island === "home" ? homeIsland(0, knownKinds(tuning.map?.found ?? []), 999) : islandOf(island, 0)!).roster);
        let ring = 0;
        for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) { // (the map's grid: past it, nothing stands)
          if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
          if (m.inBuffer(x, y)) ring++;
          expect(want.has(m.typeOf(x, y)), `${island} seed ${seed}: area ${x},${y} is type ${m.typeOf(x, y)}`).toBe(true);
        }
        expect(ring).toBeGreaterThan(0);
        expect(generateMap(seed, tuning).typeOf(m.first, m.first)).toBe(m.typeOf(m.first, m.first)); // (the same each time)
      }
    });
  }
});
