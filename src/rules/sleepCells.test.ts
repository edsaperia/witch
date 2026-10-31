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
const expected = [[18, "newt", true], [19, "newt", false], [34, "snowleopard", true], [35, "snowleopard", false],
  [86, "fennec", true], [87, "fennec", false], [164, "squirrel", true], [165, "squirrel", false],
  [185, "lion", true], [186, "lion", false], [454, "polarbear", true], [455, "polarbear", false],
  [485, "moth", true], [486, "moth", false]];
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
    const g = newGame(123, largestWorldTuning(TUNING)), boss = g.creatures.find(c => c.boss)!;
    const elsewhere = g.map.cells.map(([x, y]) => g.map.siteOf(x, y)).find(p => !g.map.sameArea(g.map.cellSafe(p.x, p.z).cell, boss.cell))!;
    const bad = { ...boss, x: elsewhere.x, z: elsewhere.z };
    expect(sleepCellAudit(g.map, [bad]).mismatches.map(c => c.id)).toEqual([boss.id]);
    const wild = { ...boss, boss: undefined, circle: undefined };
    expect(sleepCellAudit(g.map, [wild]).mismatches.map(c => c.id)).toEqual([boss.id]);
  });
});
