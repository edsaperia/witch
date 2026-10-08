// The soundsystem alarm (Ed, 2026-10-06: an indicator for a soundsystem or speaker attacked off screen): rules/alarms.ts.
import { describe, expect, it } from "vitest";
import type { CombatEvent, SoundHealth } from "./combat";
import { ALARM_DEFAULTS, debugBlows, newAlarms, shownAlarms, stepAlarms } from "./alarms";

const T = ALARM_DEFAULTS;
const sounds = () => new Map<string, SoundHealth>([["home", { hp: 100, max: 100, x: 0, z: 0, radius: 6 }], ["3,4", { hp: 50, max: 50, x: 200, z: -80, radius: 3 }], ["5,1", { hp: 50, max: 50, x: -150, z: 90, radius: 3 }], ["2,2", { hp: 50, max: 50, x: 60, z: 300, radius: 3 }]]);
const hit = (S: Map<string, SoundHealth>, key: string, dmg: number, at: number): CombatEvent[] => {
  const h = S.get(key)!; h.hp = Math.max(0, h.hp - dmg);
  return h.hp > 0 ? [{ kind: "soundHit", key, x: h.x, z: h.z, at }] : [{ kind: "soundHit", key, x: h.x, z: h.z, at }, { kind: "soundDestroyed", key, x: h.x, z: h.z, at }];
};

describe("the soundsystem alarm", () => {
  it("starts on the first blow, follows its health down, and counts a frame's blows once however often it's drawn", () => {
    const A = newAlarms(), S = sounds();
    expect(stepAlarms(A, S, [], 0)).toEqual([]);
    const ev = hit(S, "3,4", 10, 1);
    expect(stepAlarms(A, S, ev, 1)).toEqual(["3,4"]);
    expect(stepAlarms(A, S, ev, 1.01)).toEqual([]); // (the same frame drawn again)
    const a = A.byKey.get("3,4")!;
    expect([a.hits, a.hp, a.max, a.x, a.z]).toEqual([1, 40, 50, 200, -80]);
    expect(stepAlarms(A, S, hit(S, "3,4", 10, 2), 2)).toEqual([]); // (the same attack going on: no new start)
    expect([a.hits, a.hp, a.hitAt, a.startedAt]).toEqual([2, 30, 2, 1]);
  });
  it("goes a few seconds after the blows stop, and a new attack after that starts again", () => {
    const A = newAlarms(), S = sounds();
    stepAlarms(A, S, hit(S, "home", 5, 10), 10);
    stepAlarms(A, S, [], 10 + T.linger - 0.1);
    expect(A.byKey.has("home")).toBe(true);
    stepAlarms(A, S, [], 10 + T.linger + 0.1);
    expect(A.byKey.has("home")).toBe(false);
    expect(stepAlarms(A, S, hit(S, "home", 5, 20), 20)).toEqual(["home"]);
  });
  it("keeps a fallen one for its fall, at no health, then lets it go", () => {
    const A = newAlarms(), S = sounds();
    stepAlarms(A, S, hit(S, "5,1", 30, 1), 1);
    stepAlarms(A, S, hit(S, "5,1", 30, 1.5), 1.5);
    const a = A.byKey.get("5,1")!;
    expect([a.fellAt, a.hp]).toEqual([1.5, 0]);
    stepAlarms(A, S, [], 1.5 + T.fall - 0.05);
    expect(A.byKey.has("5,1")).toBe(true);
    stepAlarms(A, S, [], 1.5 + T.fall + 0.05);
    expect(A.byKey.has("5,1")).toBe(false);
  });
  it("shows one per soundsystem under attack, the most recently hit first, up to a few", () => {
    const A = newAlarms(), S = sounds();
    stepAlarms(A, S, [...hit(S, "home", 1, 1), ...hit(S, "3,4", 1, 1)], 1);
    stepAlarms(A, S, hit(S, "5,1", 1, 2), 2);
    stepAlarms(A, S, hit(S, "2,2", 1, 3), 3);
    stepAlarms(A, S, hit(S, "home", 1, 3.5), 3.5);
    expect(shownAlarms(A).map(a => a.key)).toEqual(["home", "2,2", "5,1"]);
    expect(shownAlarms(A, { ...T, most: 1 }).map(a => a.key)).toEqual(["home"]);
  });
  it("gives the debug blows as real soundHit events on the farthest standing ones, never felling one (mended at the floor)", () => {
    const S = sounds(), ev: CombatEvent[] = [];
    expect(debugBlows(S, ev, 0, 0, 5)).toEqual(["2,2", "3,4"]);
    expect(ev.map(e => e.kind)).toEqual(["soundHit", "soundHit"]);
    for (let i = 0; i < 100; i++) { debugBlows(S, [], 0, 0, 5, 4); for (const h of S.values()) expect(h.hp).toBeGreaterThanOrEqual(h.max * 0.15 - 1e-9); }
    const A = newAlarms();
    expect(stepAlarms(A, S, ev, 5).sort()).toEqual(["2,2", "3,4"]);
  });
});
