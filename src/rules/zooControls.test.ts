import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { stateOf } from "./creatureStates";
import { TUNING, type Tuning } from "./tuning";
import { blockCreatures, setZooMood, zooAdd, zooBlockAt, zooCount, zooMood, zooRemove, zooSleep } from "./zooControls";

const zooTuning = (): Tuning => ({ ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0 } });

describe("the zoo's block bar (rules/zooControls.ts)", () => {
  const g = newGame(7, zooTuning()), Z = g.map.zoo!;
  const fox = Z.blocks.find(b => b.area === "old-oaks")!, cell = fox.cell;

  it("finds the block she's in", () => {
    expect(zooBlockAt(g, fox.x!, fox.z!)?.area).toBe("old-oaks"); // (its island's middle: laid out like the chart, rules/zooMap.ts)
    expect(zooBlockAt(g, -10, -10)).toBeNull();
  });

  it("adds and removes creatures of its kind at a level, in its block", () => {
    const before = zooCount(g, cell);
    const c = zooAdd(g, cell, 2)!;
    expect(c.species).toBe("fox"); expect(c.level).toBe(2); expect(c.id).toBe(g.creatures.length - 1);
    expect(c.cell).toEqual(cell);
    expect(zooCount(g, cell)[2]).toBe(before[2] + 1);
    expect(zooRemove(g, cell)).toBe(true);
    expect(zooCount(g, cell)[2]).toBe(before[2]);
    expect(zooAdd(g, g.map.centreCell as [number, number], 1)).toBeNull(); // (home has none)
  });

  it("starts calm, and takes each mood: wild, happy (its runes to pick up), angry, calm again", () => {
    const young = () => blockCreatures(g, cell).filter(c => c.level === 1);
    expect(zooMood(g, cell)).toBe("calm");
    expect(young().every(c => c.friendly && stateOf(c) === "wild")).toBe(true);
    setZooMood(g, cell, "wild");
    expect(young().every(c => !c.friendly && stateOf(c) === "wild")).toBe(true);
    setZooMood(g, cell, "happy");
    expect(young().every(c => stateOf(c) === "happy")).toBe(true);
    setZooMood(g, cell, "angry");
    expect(young().every(c => stateOf(c) === "enraged")).toBe(true);
    expect(blockCreatures(g, cell).filter(c => c.level === 0).every(c => stateOf(c) !== "enraged")).toBe(true); // (never a baby)
    setZooMood(g, cell, "calm");
    expect(young().every(c => c.friendly && stateOf(c) === "wild")).toBe(true);
    expect(zooAdd(g, cell, 1)!.friendly).toBe(true); // (one added later takes the block's mood)
  });

  it("puts a block to sleep and wakes it", () => {
    zooSleep(g, cell, true);
    expect(blockCreatures(g, cell).every(c => c.asleep)).toBe(true);
    zooSleep(g, cell, false);
    expect(blockCreatures(g, cell).every(c => !c.asleep)).toBe(true);
  });
});
