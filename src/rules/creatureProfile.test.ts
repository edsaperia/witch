import { describe, expect, it } from "vitest";
import { COMBAT, combatProfile } from "./combat/data";
import { CREATURE_IDS } from "./creatureConfig";
import { toEvolve } from "./berries";
import { TUNING } from "./tuning";

describe("resolved creature statistics", () => {
  it("keeps durability, damage and health distinct and refreshes edited definitions", () => {
    const data = { ...COMBAT, levels: { hp: [0, 10, 30, 100], stun: [0, 20, 60, 100], dps: [0, 4, 9, 20] }, strength: { species: { ram: 2 } } };
    const first = combatProfile("ram", 1, data);
    expect(first).toEqual({ strength: 2, health: 20, durability: 40, damagePerSecond: 8 });
    expect(combatProfile("ram", 1, data)).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    data.levels.hp[1] = 12;
    const edited = combatProfile("ram", 1, data);
    expect(edited).toEqual({ strength: 2, health: 24, durability: 40, damagePerSecond: 8 });
    expect(edited).not.toBe(first);
  });
  it("resolves every youth/adult and supplies finite growth costs only below adult", () => {
    for (const species of CREATURE_IDS) {
      for (const level of [1, 2] as const) {
        const profile = combatProfile(species, level);
        for (const value of Object.values(profile)) { expect(Number.isFinite(value), `${species}@${level}`).toBe(true); expect(value).toBeGreaterThan(0); }
      }
      expect(Number.isFinite(toEvolve(1, TUNING, species))).toBe(true);
      expect(toEvolve(2, TUNING, species)).toBe(Infinity);
    }
  });
});
