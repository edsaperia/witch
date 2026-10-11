import { describe, expect, it } from "vitest";
import { islandAreas, islandCoast, islandSeed } from "./islandShape";
import { TUNING } from "./tuning";
import { islandPath, islandPixels } from "../../art/islands.js";
import { islandSigil, SIGIL_IDS, SIGILS } from "../../art/sigils.js";

describe("islands' shapes and pictures (the wave 2 finale's dream bubbles, the sea chart)", () => {
  const knobs = TUNING.islands.coast;
  it("gives every kind its own sigil, home's the World Tree", () => {
    expect(islandSigil("home")).toBe("worldTree");
    for (const kind of SIGIL_IDS) { expect(islandSigil(kind)).toBe(kind); expect((SIGILS as Record<string, unknown>)[islandSigil(kind)]).toBeTruthy(); }
  });
  it("draws each kind's coastline the same every time, its own, within the coast's reach, sized by phase", () => {
    const a = islandCoast({ kind: "wolf" }, knobs), b = islandCoast({ kind: "wolf" }, knobs), c = islandCoast({ kind: "fox" }, knobs);
    expect([...a.radii]).toEqual([...b.radii]);
    expect([...a.radii]).not.toEqual([...c.radii]);
    expect(islandSeed("wolf")).not.toBe(islandSeed("fox"));
    const size = Math.sqrt(islandAreas(0) / 64);
    for (const r of a.radii) { expect(r).toBeGreaterThanOrEqual(size * (1 - knobs.amp) - 1e-6); expect(r).toBeLessThanOrEqual(size * (1 + knobs.amp) + 1e-6); }
    expect(islandAreas(0)).toBe(10); expect(islandAreas(2)).toBe(30);
    expect(Math.max(...islandCoast({ kind: "wolf", phase: 2 }, knobs).radii)).toBeGreaterThan(Math.max(...a.radii)); // a later phase's island is bigger
    expect(islandCoast({ kind: "wolf", seed: 7, areas: 40 }, knobs).areas).toBe(40); // the rosters' own numbers when given
  });
  it("pictures every kind's island with its sigil in whole pixels, readable at a bubble's 30 px, and as a path for the sea chart", () => {
    for (const kind of ["home", ...SIGIL_IDS]) {
      const { radii } = islandCoast({ kind }, knobs), p = islandPixels(kind, radii), cols = new Set<string>();
      let ink = 0, land = 0;
      for (let i = 0; i < p.rgba.length; i += 4) {
        expect([0, 255]).toContain(p.rgba[i + 3]);
        if (!p.rgba[i + 3]) continue;
        land++; cols.add(`${p.rgba[i]},${p.rgba[i + 1]},${p.rgba[i + 2]}`);
      }
      const neon = islandPixels(kind, radii, { colour: [1, 2, 3] });
      for (let i = 0; i < neon.rgba.length; i += 4) if (neon.rgba[i] === 1 && neon.rgba[i + 1] === 2) ink++;
      expect(land).toBeGreaterThan(150); // an island, not a speck
      expect(ink).toBeGreaterThan(12); // its sigil on it
      expect(cols.size).toBeGreaterThanOrEqual(4); // land, sand, coast and the sigil
      expect(islandPath(radii)).toMatch(/^M[\d.]+,[\d.]+(L[\d.]+,[\d.]+)+Z$/);
    }
  });
});
