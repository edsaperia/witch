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
    const R: ByRoute = { babies: 2, babyCap: 2, minHostile: 1 }, W = { start: 0, endAverage: 0, curve: 1, youngShare: [0.5, 0.5], reference: "medium", classes: { medium: { cap: 12, species: [] } }, capScales: true, mixTolerance: 0.1 };
    const none = { babies: 1, young: 0, adults: 0 };
    expect(routePopulation(1, 90, { ...R, minHostile: 0 }, W, none, "wolf")).toEqual([2, 0, 0]);
    expect(routePopulation(1, 90, R, W, none, "wolf")).toEqual([2, 1, 0]);
    const big = routePopulation(1, 90, R, { ...W, start: 4, endAverage: 4 }, none, "bear");
    expect(big[1] + big[2]).toBeGreaterThanOrEqual(1);
    // On a gentle first ring (start with no young, swarms of none at the first stones), every area still has one.
    const gentle = withTuning({ population: { ...TUNING.population, start: none, swarm: { ...TUNING.population.swarm, start: 0 }, byRoute: { ...TUNING.population.byRoute, minHostile: 1 } } });
    const map = generateMap(123, gentle), all = spawnCreatures(map), home = cellKey(map.centreCell);
    for (const [cx, cy] of map.cells) {
      const key = `${cx},${cy}`;
      if (key === home) continue;
      expect(all.some(c => cellKey(c.cell) === key && !c.boss && !c.circle && c.level > 0 && c.level < 3), key).toBe(true);
    }
  }, 60000);
});
