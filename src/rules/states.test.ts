import { describe, expect, it } from "vitest";
import { simulateStates } from "./states";
import { generateMap } from "./map";
import { TUNING, withTuning } from "./tuning";

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
    expect(Math.abs(c.invited.leashed - (c.invited.happy + c.invited.leashed) / 3)).toBeLessThanOrEqual(2); // (a talk cut short by the wave still counts)
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

  it("never lets kin fight kin (Ed, 2026-10-05): her happy defenders don't beat their own area's enraged", () => {
    const o = { interval: 300, maxWaves: 8, policy: "defend" as const, skill: 1, dt: 1, relics: 0 };
    const kin = simulateStates(map, o), sep = simulateStates(map, { ...o, ownKind: false });
    const rate = (r: typeof kin) => r.local.filter(l => l.won === true).length / Math.max(1, r.local.filter(l => l.won !== null).length);
    expect(rate(kin)).toBeLessThanOrEqual(rate(sep)); // (other kinds, and happy legends, can still beat them)
  }, 60000);

  it("wakes no legends with soundsystems; one turns angry only once its area has none of its kind", () => {
    const map = generateMap(1000, withTuning({ legends: { ...TUNING.legends, share: 1 } })); // (a legend in every area, as this was written: with legends.share 0.5 the first waves' areas may have none)
    const a = simulateStates(map, { interval: 300, maxWaves: 8, policy: "leash", skill: 1, dt: 1, relics: 0 });
    const d = simulateStates(map, { interval: 300, maxWaves: 8, policy: "defend", skill: 1, dt: 1, relics: 0 });
    expect(a.legends.angry).toBeGreaterThan(d.legends.angry); // leashing everything empties areas of their kind
    const r = simulateStates(map, { interval: 300, maxWaves: 8, policy: "defend", skill: 1, dt: 1, relics: 4 });
    expect(r.legends.relicsUsed).toBe(2); // one found every 4 waves
  }, 60000);

  it("masses her army at the next soundsystem to be attacked, traces the run, and can hurry a lost one", () => {
    const o = { interval: 120, maxWaves: 10, policy: "mass" as const, skill: 1, dt: 1, trace: 10 };
    const a = simulateStates(map, o);
    expect(a.invited.leashed).toBeGreaterThan(0);
    expect(a.trace!.length).toBeGreaterThan(50);
    expect(a.trace![a.trace!.length - 1].peak).toBeGreaterThanOrEqual(a.trace![a.trace!.length - 1].standing);
    const idle = { interval: 120, maxWaves: 40, policy: "defend" as const, skill: 1e-9, dt: 1, relics: 0 };
    const h = simulateStates(map, { ...idle, hurryAt: 0.5, hurryFactor: 3 }), plain = simulateStates(map, idle);
    if (plain.lost && h.lost) expect(h.lost.time).toBeLessThanOrEqual(plain.lost.time);
  }, 60000);

  it("lasts longer when she invites than when she doesn't", () => {
    const idle = simulateStates(map, { interval: 60, maxWaves: 40, policy: "defend", skill: 1e-9 });
    const play = simulateStates(map, { interval: 60, maxWaves: 40, policy: "defend", skill: 4 });
    expect(play.survived).toBeGreaterThanOrEqual(idle.survived);
  }, 60000);
});
