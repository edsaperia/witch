import { afterEach, describe, expect, it } from "vitest";
import { attackOf, COMBAT, creatureMaxHp, strengthOf } from "./combat";
import { toEvolve } from "./berries";
import { countScale, grownAt, startCount } from "./growth";
import { spawnCreatures } from "./creatures";
import { AREA_TYPES, generateMap } from "./map";
import { levelValue } from "./power";
import { TUNING, withTuning } from "./tuning";

// Species strength, a number (Ed, 2026-10-05: "just a number that goes up and down"), and berry
// costs tied to it. No species has one yet, so these tests give one for a moment (and put it back).
const S = COMBAT.strength!;
const giving = (species: string, m: number) => { S.species[species] = m; };
afterEach(() => { for (const k of Object.keys(S.species)) delete S.species[k]; });

describe("species strength (Ed, 2026-10-05: weaker ones more of them, stronger ones fewer)", () => {
  it("scales a species' health and damage by its number, never a legend's", () => {
    expect(strengthOf("wolf", 2)).toBe(1); // unlisted: normal
    giving("wolf", 1.5); giving("bat", 0.3);
    expect(strengthOf("wolf", 2)).toBe(1.5);
    expect(creatureMaxHp({ species: "wolf", level: 2 })).toBe(COMBAT.levels.hp[2] * 1.5);
    const w = attackOf("wolf", 2)!, b = attackOf("boar", 2)!;
    expect(w.damage / (w.attack.cooldown * (w.attack.factor ?? 1))).toBeCloseTo((b.damage / (b.attack.cooldown * (b.attack.factor ?? 1))) * 1.5, 6);
    expect(creatureMaxHp({ species: "bat", level: 1 })).toBeCloseTo(COMBAT.levels.hp[1] * 0.3, 9);
    expect(strengthOf("wolf", 3)).toBe(1);
    expect(levelValue(2, COMBAT, "wolf")).toBeCloseTo(levelValue(2) * 1.5, 9); // fighting value goes by the same factor
  });

  it("holds 1 / strength as many in an area, so its fighting value stays about the same", () => {
    expect(countScale("wolf")).toBe(1);
    giving("bat", 1 / 3); giving("bear", 2); giving("boar", 0.8);
    expect(countScale("bat")).toBe(3);
    expect(countScale("bear")).toBe(0.5);
    expect(countScale("boar")).toBe(1.25);
    const P = TUNING.population.start;
    expect(startCount(P.adults, 3)).toBe(P.adults * 3);
    expect(startCount(1, 0.5)).toBe(1); // never none, if any
    expect(startCount(0, 3)).toBe(0);
    // Fractions carry from wave to wave: a strength-2 area grows one every other wave; 0.8, five every four.
    expect([1, 2, 3, 4, 5, 6].map(w => grownAt(w, 1, 0.5))).toEqual([0, 1, 0, 1, 0, 1]);
    expect([1, 2, 3, 4].map(w => grownAt(w, 1, 1.25)).reduce((a, b) => a + b, 0)).toBe(5);
    let sum = 0;
    for (let w = 1; w <= 30; w++) sum += grownAt(w, 1, 0.5);
    expect(sum).toBe(15);
  });

  it("spawns a weak species' areas three times as many, worth about the same", () => {
    const map = generateMap(123, TUNING), cell = (cx: number, cy: number) => `${cx},${cy}`;
    const plain = spawnCreatures(map), [hx, hy] = map.centreCell;
    const [cx, cy] = hx > 2 ? [hx - 2, hy] : [hx + 2, hy], species = AREA_TYPES[map.typeOf(cx, cy)].creature;
    const before = plain.filter(c => cell(...c.cell) === cell(cx, cy) && !c.boss);
    const value = (l: typeof before) => l.reduce((a, c) => a + levelValue(c.level, COMBAT, c.species), 0), was = value(before);
    giving(species, 1 / 3);
    const after = spawnCreatures(map).filter(c => cell(...c.cell) === cell(cx, cy) && !c.boss);
    expect(after.length).toBe(before.length * 3);
    expect(value(after)).toBeCloseTo(was, 0);
  }, 30000);
});

describe("berries to evolve, tied to strength (Ed, 2026-10-05: \"tie the cost to strength\")", () => {
  it("costs 4 and 4 for a species of normal strength (the same 8 baby to adult; doubled, Ed 2026-10-06), nothing past adult", () => {
    expect([0, 1, 2].map(l => toEvolve(l as 0 | 1 | 2, TUNING))).toEqual([4, 4, Infinity]);
    expect(toEvolve(1, TUNING, "wolf")).toBe(4);
  });

  it("buys the same fighting value a berry for every species (at least one berry)", () => {
    giving("bear", 2); giving("bat", 0.3);
    expect(toEvolve(0, TUNING, "bear") + toEvolve(1, TUNING, "bear")).toBe(16); // twice the value, twice the berries
    expect(toEvolve(0, TUNING, "bat")).toBe(1);
    expect(toEvolve(1, TUNING, "bat")).toBe(1);
  });

  it("can count by power instead (cost.by \"power\", hp × dps): the old 1 and 3", () => {
    const t = withTuning({ berries: { ...TUNING.berries, cost: { by: "power", per: 240 } } });
    expect([toEvolve(0, t), toEvolve(1, t)]).toEqual([1, 3]);
  });
});
