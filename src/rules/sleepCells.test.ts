import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP } from "./game";
import { generateMap } from "./map";
import { spawnCreatures } from "./creatures";
import { TUNING } from "./tuning";
import { fillTrunk } from "./finds";
import { endParty } from "./partyOver";
import { largestWorldTuning } from "../test/worlds";
import { sleepCellAudit } from "../test/sleepCells";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
// (the largest island since the challenge circle's claim, 2026-11-03: its area takes the whole circle from the areas round it, so
// the route and the night's deal move on, and its legends with them: seven paired; the ids follow how many creatures the areas
// before them hold)
const expected = [[14, "crab", true], [15, "crab", false], [31, "bear", true], [32, "bear", false], [63, "otter", true], [64, "otter", false],
  [91, "fennec", true], [92, "fennec", false], [145, "lion", true], [146, "lion", false], [165, "newt", true], [166, "newt", false],
  [527, "hedgehog", true], [528, "hedgehog", false]];
// Largest roster reproduces the seven paired legend areas; small/radius fixtures guard the original non-paired contract.
const fixtures = [
  { name: "largest", tuning: largestWorldTuning(TUNING), raw: 14, cells: 65 },
  { name: "four-area", tuning: { ...TUNING, map: { ...TUNING.map!, island: "", islandAreas: 4, found: [] } }, raw: 0, cells: 5 },
  { name: "radius", tuning: { ...TUNING, map: { ...TUNING.map!, island: "", islandAreas: 0, found: [] } }, raw: 0, cells: 98 },
];

describe("sleeping creatures' logical ownership areas", () => {
  it.each(fixtures)("preserves $name ownership from initial placement through both sleep states", ({ tuning, raw, cells }) => {
    const assertStage = (map: ReturnType<typeof generateMap>, creatures: ReturnType<typeof spawnCreatures>) => {
      const audit = sleepCellAudit(map, creatures);
      expect(map.cells).toHaveLength(cells);
      expect(audit.mismatches).toEqual([]);
      expect(audit.rawDifferences).toHaveLength(raw);
      for (const row of audit.rawDifferences) {
        expect(row.sameArea).toBe(true);
        expect(map.legendAreas.get(row.physical.join(","))).toBe(row.assigned.join(","));
        expect(row.logical).toEqual(row.assigned);
        expect(row.boss !== row.circle).toBe(true);
      }
      if (raw) expect(audit.rawDifferences.map(c => [c.id, c.species, c.boss])).toEqual(expected);
    };
    const map = generateMap(123, tuning);
    assertStage(map, spawnCreatures(map));
    const g = newGame(123, tuning);
    assertStage(g.map, g.creatures);
    g.clock.paused = false; fillTrunk(g, {}); g.party.spellAt = null;
    for (let i = 0; i < 30; i++) stepGame(g, idle, STEP);
    assertStage(g.map, g.creatures);
    const lost = newGame(123, tuning); lost.clock.paused = false; fillTrunk(lost, {}); endParty(lost);
    lost.witch = { ...lost.witch, x: lost.map.bounds.minX + 5, z: lost.map.bounds.minZ + 5, seated: false, perch: undefined };
    for (let i = 0; i < 30; i++) stepGame(lost, idle, STEP);
    assertStage(lost.map, lost.creatures);
  });

  it("rejects an unrelated area even for a boss, and rejects a non-circle wild creature in a paired legend area", () => {
    // (a boss lying in a paired legend area: since 2026-11-03's maps the first boss lies in its own area)
    const g = newGame(123, largestWorldTuning(TUNING)), boss = g.creatures.find(c => c.boss && g.map.legendAreas.has(g.map.cellSafe(c.x, c.z).cell.join(",")))!;
    const elsewhere = g.map.cells.map(([x, y]) => g.map.siteOf(x, y)).find(p => !g.map.sameArea(g.map.cellSafe(p.x, p.z).cell, boss.cell))!;
    const bad = { ...boss, x: elsewhere.x, z: elsewhere.z };
    expect(sleepCellAudit(g.map, [bad]).mismatches.map(c => c.id)).toEqual([boss.id]);
    const wild = { ...boss, boss: undefined, circle: undefined };
    expect(sleepCellAudit(g.map, [wild]).mismatches.map(c => c.id)).toEqual([boss.id]);
  });
});
