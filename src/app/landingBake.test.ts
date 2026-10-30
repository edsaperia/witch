import { describe, expect, it } from "vitest";
import { generateMap, HOME_LOOK } from "../rules/map";
import { tuningFromLink } from "./linkParams";
import { islandArtSeed } from "../render/artCache";
import { landingJobs, landingTypes } from "./landingBake";

describe("the landing's area types drawn ahead", () => {
  it("are home's meadow, the island's own kind, then the rest of its roster, once each", () => {
    const t = landingTypes("wolf", 0);
    expect(t[0]).toBe(HOME_LOOK);
    expect(new Set(t).size).toBe(t.length);
    expect(t.length).toBeGreaterThan(2);
  });
  it("are every area type the island's night draws, whatever its seed (its home area drawn as home's meadow)", () => {
    // Keep each authored island roster: this checks the landing plan against that island's actual generated types.
    for (const island of ["wolf", "fox"]) {
      const want = new Set(landingTypes(island, 0)), { tuning } = tuningFromLink(new URLSearchParams({ island }));
      for (const seed of [1, 4242]) {
        const map = generateMap(seed, tuning);
        for (const [x, y] of map.cells) if (x !== map.centreCell[0] || y !== map.centreCell[1]) expect(want.has(map.typeOf(x, y)), `${island} seed ${seed}: type ${map.typeOf(x, y)}`).toBe(true);
      }
    }
  });
  // (the transition review, 2026-10-19: the island's own trees, kept for every night, then tonight's, swapped in unseen)
  it("gives each island in each world its own tree seed, the same every time", () => {
    expect(islandArtSeed(0, "fox")).toBe(islandArtSeed(0, "fox"));
    expect(islandArtSeed(0, "fox")).not.toBe(islandArtSeed(0, "wolf"));
    expect(islandArtSeed(0, "fox")).not.toBe(islandArtSeed(1, "fox"));
    for (const id of ["home", "fox", "wolf", "marten"]) { const s = islandArtSeed(3, id); expect(Number.isInteger(s) && s >= 0 && s < 1000000).toBe(true); }
  });
  it("draws the island's own trees first (what the game shows at once), then tonight's, for every type it will ask for", () => {
    const jobs = landingJobs("fox", 0, 4242, {} as never, 0.5), types = landingTypes("fox", 0), own = islandArtSeed(0, "fox");
    expect(jobs.length).toBe(types.length * 2);
    expect(jobs.slice(0, types.length).map(j => [j.id, (j as { seed: number }).seed])).toEqual(types.map(t => [t, own]));
    expect(jobs.slice(types.length).map(j => [j.id, (j as { seed: number }).seed])).toEqual(types.map(t => [t, 4242]));
  });
});
