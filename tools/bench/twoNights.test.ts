// Two nights in one page are two fresh pages (docs/plans/sail-without-reload.md, test C1): a night played after another, on
// another island with other fight knobs, ends in exactly the state the same night does played first. Nothing of the rules'
// own (FIGHT, the combat data, a cache) carries from one game to the next.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { FIGHT } from "../../src/rules/movement";
import { TUNING, type Tuning } from "../../src/rules/tuning";
import { fingerprint } from "./fingerprint";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** The bench's fixed path (tools/bench/rules.ts): headings in turn, rising and landing, a sigil now and then. */
const path = (i: number): Controls => { const a = ((Math.floor(i / 240) % 6) * Math.PI) / 3; return { ...idle, moveX: Math.cos(a), moveZ: Math.sin(a), toggleMode: i % 600 === 300, sigil: i % 450 === 200 }; };

/** A night as the bench plays it, shorter: off the seat, a wave called every 3 s to `wave`, then `steps` of the path. */
function night(seed: number, t: Tuning, wave = 3, steps = 600): Record<string, string> {
  const g = newGame(seed, t);
  g.clock.paused = false;
  stepGame(g, { ...idle, moveX: 1 }, STEP);
  for (let guard = 0; g.party.wave < wave && !g.over && guard < wave * 4; guard++) {
    stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 180 && !g.over; i++) stepGame(g, idle, STEP);
  }
  for (let i = 0; i < steps; i++) stepGame(g, path(i), STEP);
  return fingerprint(g);
}

describe("two nights in one page (test C1)", () => {
  it("the second night is the night played fresh", () => {
    const fresh = night(165272, TUNING);
    // Another night first: another seed, its fights faster and bigger, charging and leaping further.
    const other = structuredClone(TUNING);
    other.groundSpeed *= 1.3; // (FIGHT.walk: read by the steps between fights too)
    other.fight = { ...other.fight, scale: 1.4, speed: 1.3, momentum: 1.5, charge: { ...other.fight.charge, reach: 3 }, leap: { ...other.fight.leap, reach: 2.5 } };
    night(123, other, 4);
    expect(FIGHT.scale).toBe(1.4); expect(FIGHT.walk).toBe(other.groundSpeed); // (it fought: FIGHT is its)
    expect(night(165272, TUNING)).toEqual(fresh);
  }, 120_000);
  it("a new game puts the fight's settings back as a page starts them (the last night's are read before its first fight)", () => {
    const other = structuredClone(TUNING);
    other.fight = { ...other.fight, scale: 2 }; other.groundSpeed *= 2;
    night(123, other, 2, 60);
    expect(FIGHT.scale).toBe(2);
    newGame(165272, TUNING);
    expect(FIGHT).toEqual({ scale: 1, speed: 1, momentum: 1, charge: { reach: 1, turn: 1, brake: 1 }, leap: { reach: 1, through: -1.5 }, walk: 0 });
  }, 120_000);
});
