import { describe, expect, it } from "vitest";
import ZOO from "../../config/zoo.json";
import TUNING_JSON from "../../config/tuning.json";
import { AREA_TYPES } from "./map";
import { newGame } from "./game";
import { KINDS } from "./rosters";
import { TUNING, type Tuning } from "./tuning";
import { zooJunctions, zooPathLines, zooPlan } from "./zoo";

// Keep the complete authored zoo: this integration test checks every area's group and sleeping legend, not a radius-world substitute.
const zooTuning = (): Tuning => ({ ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0 } });

describe("the zoo (?zoo)", () => {
  const plan = zooPlan();

  // (the plan's rows: the jump list's, by biome; the map is laid out like the sea chart now: rules/zooMap.test.ts)
  it("has every area type in one row, each row by its swarm class (light, medium, strong), the undesigned kinds as '?' blocks", () => {
    const listed = ZOO.rows.flatMap(r => r.areas), ids = AREA_TYPES.map(a => a.id);
    expect(new Set(listed).size).toBe(listed.length); // (none twice)
    expect(listed.filter(a => !ids.includes(a))).toEqual([]); // (none that isn't an area type)
    // (every area type a block, once: those config/zoo.json doesn't name yet at the end of their biome's row)
    expect(plan.blocks.filter(b => b.area).map(b => b.area).sort()).toEqual([...ids].sort());
    const classes = (TUNING_JSON as { population: { swarm: { classes: Record<string, { species: string[] }> } } }).population.swarm.classes;
    const rank = (sp: string) => (classes.light.species.includes(sp) ? 0 : classes.strong.species.includes(sp) ? 2 : 1);
    for (const r of ZOO.rows) {
      const ranks = r.areas.map(a => rank(AREA_TYPES.find(t => t.id === a)!.creature));
      expect(ranks, r.name).toEqual([...ranks].sort((a, b) => a - b));
    }
    const unknown = Object.keys(KINDS).filter(k => KINDS[k].placeholder && ZOO.rows.some(r => r.biomes.includes(KINDS[k].biome ?? "")));
    expect(plan.blocks.filter(b => !b.area).map(b => b.kind).sort()).toEqual(unknown.sort());
    expect(plan.rows).toBe(ZOO.rows.length);
    expect(plan.home[0]).toBe(0); // (the entrance, home's column, left of the blocks)
  });

  it("lays its paths along every border and puts a crossing at every corner", () => {
    const A = 100, J = zooJunctions(plan, A), lines = zooPathLines(plan, A);
    expect(J.length).toBe((plan.cols + 1) * (plan.rows + 1));
    expect(lines.length).toBe((plan.rows + 1) * plan.cols + (plan.cols + 1) * plan.rows);
    for (const l of lines) { const [a, b] = [l[0], l[l.length - 1]]; expect(Math.hypot(b[0] - a[0], b[1] - a[1])).toBeCloseTo(A); expect(a[0] === b[0] || a[1] === b[1]).toBe(true); }
  });


  it("gives every block its group, calm, and its legend asleep in its clearing", () => {
    const g = newGame(7, { ...zooTuning(), map: { ...zooTuning().map!, found: ["*"] } }), G = plan.group; // (every island found: ?all)
    for (const b of g.map.zoo!.blocks) {
      if (!b.area) continue;
      const here = g.creatures.filter(c => c.cell[0] === b.cell[0] && c.cell[1] === b.cell[1]);
      const species = AREA_TYPES.find(t => t.id === b.area)!.creature;
      expect(here.every(c => c.species === species)).toBe(true);
      expect(here.filter(c => c.level === 1).length).toBe(G.young);
      expect(here.filter(c => c.level === 2).length).toBe(G.adults);
      expect(here.filter(c => c.level === 3 && c.legendState === "asleep").length).toBe(1);
      expect(here.filter(c => c.level === 0).length).toBe(G.babies + 1); // (and the legend's baby, in its circle)
    }
  });
});
