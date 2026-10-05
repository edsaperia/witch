import { afterEach, describe, expect, it } from "vitest";
import { attackOf, COMBAT, creatureMaxHp, strengthOf } from "./combat";
import { toEvolve } from "./berries";
import { countScale, grownAt, startCount } from "./growth";
import { spawnCreatures } from "./creatures";
import { AREA_TYPES, generateMap } from "./map";
import { levelValue } from "./power";
import { TUNING, withTuning } from "./tuning";

// Species strength classes and berry costs tied to strength (Ed, 2026-10-05). No species has a
// class yet, so these tests give one for a moment (and put it back).
const S = COMBAT.strength!;
const giving = (species: string, cls: string) => { S.species[species] = cls; };
afterEach(() => { for (const k of Object.keys(S.species)) delete S.species[k]; });

describe("species strength (Ed, 2026-10-05: swarms weaker and more of them, loners stronger and fewer)", () => {
  it("scales a species' health and damage by its class, never a legend's", () => {
    expect(strengthOf("wolf", 2)).toBe(1); // normal, unlisted
    giving("wolf", "loner"); giving("bat", "swarm");
    expect(strengthOf("wolf", 2)).toBe(S.classes.loner);
    expect(creatureMaxHp({ species: "wolf", level: 2 })).toBe(COMBAT.levels.hp[2] * S.classes.loner);
    expect(attackOf("wolf", 2)!.damage).toBeCloseTo(attackOf("boar", 2)!.damage * S.classes.loner * (attackOf("wolf", 2)!.attack.cooldown / attackOf("boar", 2)!.attack.cooldown) * ((attackOf("wolf", 2)!.attack.factor ?? 1) / (attackOf("boar", 2)!.attack.factor ?? 1)), 6);
    expect(creatureMaxHp({ species: "bat", level: 1 })).toBeCloseTo(COMBAT.levels.hp[1] * S.classes.swarm, 9);
    expect(strengthOf("wolf", 3)).toBe(1);
    expect(levelValue(2, COMBAT, "wolf")).toBeCloseTo(levelValue(2) * S.classes.loner, 9); // fighting value goes by the same factor
  });

  it("holds 1 / strength as many in an area, so its fighting value stays about the same", () => {
    expect(countScale("wolf")).toBe(1);
    giving("bat", "swarm"); giving("bear", "loner");
    expect(countScale("bat")).toBe(3);
    expect(countScale("bear")).toBe(0.5);
    const P = TUNING.population.start;
    expect(startCount(P.adults, 3)).toBe(P.adults * 3);
    expect(startCount(P.babies, 0.5)).toBe(1); // never none, if any
    expect(startCount(0, 3)).toBe(0);
    // A loner area grows one every other wave; a swarm three a wave.
    expect([1, 2, 3, 4, 5, 6].map(w => grownAt(w, 1, 0.5))).toEqual([0, 1, 0, 1, 0, 1]);
    expect([1, 2, 3].map(w => grownAt(w, 1, 3))).toEqual([3, 3, 3]);
    let sum = 0;
    for (let w = 1; w <= 30; w++) sum += grownAt(w, 1, 0.5);
    expect(sum).toBe(15);
  });

  it("spawns swarm areas three times as many, worth about the same", () => {
    const map = generateMap(123, TUNING), cell = (cx: number, cy: number) => `${cx},${cy}`;
    const plain = spawnCreatures(map), [hx, hy] = map.centreCell;
    // An area that isn't home, and its kind as a swarm.
    const [cx, cy] = hx > 2 ? [hx - 2, hy] : [hx + 2, hy], species = AREA_TYPES[map.typeOf(cx, cy)].creature;
    const before = plain.filter(c => cell(...c.cell) === cell(cx, cy) && !c.boss);
    const value = (l: typeof before) => l.reduce((a, c) => a + levelValue(c.level, COMBAT, c.species), 0), was = value(before);
    giving(species, "swarm");
    const after = spawnCreatures(map).filter(c => cell(...c.cell) === cell(cx, cy) && !c.boss);
    expect(after.length).toBe(before.length * 3);
    expect(value(after)).toBeCloseTo(was, 0);
  }, 30000);
});

describe("berries to evolve, tied to strength (Ed, 2026-10-05: \"tie the cost to strength\")", () => {
  it("costs today's 1 and 3 for a species of normal strength, and nothing past adult", () => {
    expect([0, 1, 2].map(l => toEvolve(l as 0 | 1 | 2, TUNING))).toEqual([1, 3, Infinity]);
    expect(toEvolve(1, TUNING, "wolf")).toBe(3);
  });

  it("costs a loner more and a swarm less (at least one), by the strength gained", () => {
    giving("bear", "loner"); giving("bat", "swarm");
    expect(toEvolve(0, TUNING, "bear")).toBe(4); // a loner's power (hp × dps) is 4 times
    expect(toEvolve(1, TUNING, "bear")).toBe(10);
    expect(toEvolve(0, TUNING, "bat")).toBe(1);
    expect(toEvolve(1, TUNING, "bat")).toBe(1);
  });

  it("can count by fighting value instead (cost.by \"value\"): every class pays the same berries per value", () => {
    const t = withTuning({ berries: { ...TUNING.berries, cost: { by: "value", per: 29 / 4 } } });
    expect([toEvolve(0, t), toEvolve(1, t)]).toEqual([2, 2]); // the same 4 berries baby to adult
    giving("bear", "loner");
    expect(toEvolve(0, t, "bear") + toEvolve(1, t, "bear")).toBe(8); // twice the value, twice the berries
  });
});
