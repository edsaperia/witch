// Every wild area has at least one hostile (Ed, 2026-10-07: "every wild area has at least one hostile wild creature (young or
// adult)"; population.byRoute.minHostile, rules/growth.ts routePopulation).
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { cellKey } from "./party";
import { routePopulation, type ByRoute } from "./growth";
import { spawnCreatures } from "./creatures";
import { generateMap } from "./map";

describe("every wild area has at least one hostile (Ed, 2026-10-07; population.byRoute.minHostile)", () => {
  it("makes up a shortfall of young or adults with young, and no non-home area starts without one", () => {
    const R: ByRoute = { babies: 2, babyCap: 2, threat: [[1, 0], [10, 0]], profiles: { default: [0, 0.4, 0.6] }, minHostile: 1 };
    const none = { babies: 1, young: 0, adults: 0 };
    expect(routePopulation(1, { ...R, minHostile: 0 }, none, "wolf", 1, 1, [0, 0])).toEqual([2, 0, 0]);
    expect(routePopulation(1, R, none, "wolf", 1, 1, [0, 0])).toEqual([2, 1, 0]);
    expect(routePopulation(1, { ...R, threat: [[1, 40]] }, none, "bear", 1, 1, [0, 0])[1] + routePopulation(1, { ...R, threat: [[1, 40]] }, none, "bear", 1, 1, [0, 0])[2]).toBeGreaterThanOrEqual(1);
    // On a gentle first ring (start with no young, a curve that's nothing at the first stones), every area still has one.
    const gentle = withTuning({ population: { ...TUNING.population, start: none, byRoute: { ...TUNING.population.byRoute, threat: [[1, 0], [10, 0], [40, 180]], minHostile: 1 } } });
    const map = generateMap(123, gentle), all = spawnCreatures(map), home = cellKey(map.centreCell);
    for (const [cx, cy] of map.cells) {
      const key = `${cx},${cy}`;
      if (key === home) continue;
      expect(all.some(c => cellKey(c.cell) === key && !c.boss && !c.circle && c.level > 0 && c.level < 3), key).toBe(true);
    }
  }, 60000);
});
