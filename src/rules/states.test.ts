import { describe, expect, it } from "vitest";
import { simulateStates } from "./states";
import { generateMap } from "./map";
import { TUNING } from "./tuning";

// The creature-state model (issue #87): invite only, happy defenders, leashed army, enraged sieges.
describe("the creature-state model (rules/states.ts, tools/balance/states.mjs)", () => {
  const map = generateMap(1000, TUNING);

  it("runs the same every time, and inviting makes happy creatures (or leashed, by the policy)", () => {
    const o = { interval: 60, maxWaves: 8, policy: "defend" as const, skill: 1 };
    const a = simulateStates(map, o);
    expect(simulateStates(map, o)).toEqual(a);
    expect(a.invited.happy).toBeGreaterThan(0);
    expect(a.invited.leashed).toBe(0);
    const b = simulateStates(map, { ...o, policy: "leash" });
    expect(b.invited.leashed).toBeGreaterThan(0);
    expect(b.invited.happy).toBe(0);
    const c = simulateStates(map, { ...o, policy: "third" });
    expect(c.invited.leashed).toBe(Math.floor((c.invited.happy + c.invited.leashed) / 3));
  }, 30000);

  it("wakes areas into enraged sieges (never their babies), mostly on their own soundsystem", () => {
    const a = simulateStates(map, { interval: 60, maxWaves: 10, policy: "defend", skill: 1e-9 });
    expect(a.local.length).toBeGreaterThan(0);
    expect(a.local[0].enragedF).toBeGreaterThan(0);
    expect(a.local[0].defendersF).toBe(0); // nobody invited
    expect(a.targets.own).toBeGreaterThan(a.targets.other);
    expect(a.waves[a.waves.length - 1].enraged).toBeGreaterThan(0);
    // The pool: wild creatures keep growing in the areas without a soundsystem.
    expect(a.waves[a.waves.length - 1].pool).toBeGreaterThan(a.waves[1].pool);
  }, 30000);

  it("lasts longer when she invites than when she doesn't", () => {
    const idle = simulateStates(map, { interval: 60, maxWaves: 40, policy: "defend", skill: 1e-9 });
    const play = simulateStates(map, { interval: 60, maxWaves: 40, policy: "defend", skill: 4 });
    expect(play.survived).toBeGreaterThanOrEqual(idle.survived);
  }, 60000);
});
