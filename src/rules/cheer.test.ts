import { describe, expect, it } from "vitest";
import type { Creature } from "./creatures";
import { hit } from "./affection";
import { stateOf, STATES } from "./creatureStates";
import { fighting } from "./combat/targeting";

describe("one won over celebrates out of every fight (Ed, 2026-10-29: rules/affection.ts cheerUntil)", () => {
  it("a stunned one converted by her 💌 is happy and out of the fight for cheerFor seconds; none is set without it", () => {
    const c = { id: 1, species: "boar", level: 1, x: 0, z: 0, cell: [0, 0], dazed: true, dazedUntil: 30, affection: 1, affectionAt: 0 } as unknown as Creature;
    expect(hit({ time: 10, leash: () => {}, stunFor: 20, cheerFor: 1 }, c, 1, 10, STATES)).toBe(true);
    expect(stateOf(c)).toBe("happy");
    expect(c.cheerUntil).toBe(11);
    expect(fighting(c)).toBe(false);
    c.cheerUntil = undefined; // (combat's step clears it once it's over: rules/combat.ts)
    expect(fighting(c)).toBe(true);
    const d = { id: 2, species: "boar", level: 1, x: 0, z: 0, cell: [0, 0], dazed: true, dazedUntil: 30, affection: 1, affectionAt: 0 } as unknown as Creature;
    hit({ time: 10, leash: () => {}, stunFor: 20 }, d, 1, 10, STATES);
    expect(d.cheerUntil).toBeUndefined();
  });
});
