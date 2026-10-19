// The sea chart's islands are made in phase order (Ed, 2026-10-19: "When the island shapes on the map are being generated, it should
// be in phase order (earlier phases first)"): the order the outlines worker is asked for, by the chart (app/chartView.ts) and by the
// night's warm job (app/chartWarm.ts), runs by phase, earliest first, and within a phase the nearest first.
import { describe, expect, it } from "vitest";
import { chartIslandIds, chartOrder, islandPhase, outlineOrder } from "./chartWarm";
import { islandAt } from "./chartLayout";
import { KIND_NAMES } from "../rules/rosters";

const sortedByPhase = (ids: string[], world: number) => ids.every((id, i) => i === 0 || islandPhase(ids[i - 1], world) <= islandPhase(id, world));

describe("the chart's islands made in phase order", () => {
  for (const world of [0, 7, 123]) {
    it(`the warm job's order (world ${world}): every island once, home first, by phase, the nearest first within a phase`, () => {
      const ids = chartIslandIds(world);
      expect(ids[0]).toBe("home");
      expect([...ids].sort()).toEqual(["home", ...KIND_NAMES].sort());
      expect(sortedByPhase(ids, world)).toBe(true);
      expect(new Set(ids.map(id => islandPhase(id, world))).size).toBeGreaterThan(2); // (it's sorting something)
      const d = (id: string) => { const a = islandAt(id, world)!; return Math.hypot(a.x, a.y); };
      for (let i = 1; i < ids.length; i++) if (islandPhase(ids[i - 1], world) === islandPhase(ids[i], world)) expect(d(ids[i - 1])).toBeLessThanOrEqual(d(ids[i]));
    });
  }

  it("the chart's order: by phase even when a later phase's island is nearer the chosen one, nearest first within a phase", () => {
    const islands = [
      { id: "far2", x: 100, y: 0, phase: 2 }, { id: "near3", x: 1, y: 0, phase: 3 }, { id: "near2", x: 2, y: 0, phase: 2 },
      { id: "far1", x: 90, y: 0, phase: 1 }, { id: "home", x: 0, y: 0, phase: 0 }, { id: "near1", x: 3, y: 0, phase: 1 },
    ];
    expect(outlineOrder(islands, { x: 0, y: 0 })).toEqual(["home", "near1", "far1", "near2", "far2", "near3"]);
    // chosen far out east: within each phase the one nearer it first, the phases still in order
    expect(outlineOrder(islands, { x: 95, y: 0 })).toEqual(["home", "far1", "near1", "far2", "near2", "near3"]);
  });

  it("the open chart's order (chartOrder): home, then the islands she can sail to nearest the chosen first, then the rest by phase", () => {
    const islands = [
      { id: "far2", x: 100, y: 0, phase: 2, sail: false }, { id: "near3", x: 1, y: 0, phase: 3, sail: true }, { id: "near2", x: 2, y: 0, phase: 2, sail: false },
      { id: "far1", x: 90, y: 0, phase: 1, sail: true }, { id: "home", x: 0, y: 0, phase: 0, sail: true }, { id: "near1", x: 3, y: 0, phase: 1, sail: false },
    ];
    expect(chartOrder(islands, { x: 0, y: 0 })).toEqual(["home", "near3", "far1", "near1", "near2", "far2"]);
    expect(chartOrder(islands, { x: 95, y: 0 })).toEqual(["home", "far1", "near3", "near1", "far2", "near2"]);
  });

  it("the chart's real islands: the order asked for is sorted by phase", () => {
    const world = 123, islands = ["home", ...KIND_NAMES].map(id => { const a = islandAt(id, world)!; return { id, x: a.x, y: a.y, phase: islandPhase(id, world) }; });
    const chosen = islands.find(i => i.phase === Math.max(...islands.map(j => j.phase)))!; // (chosen on the outermost ring: the inner phases still come first)
    const ids = outlineOrder(islands, chosen);
    expect(ids[0]).toBe("home");
    expect(sortedByPhase(ids, world)).toBe(true);
  });
});
