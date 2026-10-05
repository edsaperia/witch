// A soundsystem lost brings the next wave sooner (Ed, 2026-10-05): party.lossPenalty seconds off
// the countdown, at once if less is left, each loss stacking, and the gap after it unchanged.
import { describe, expect, it } from "vitest";
import { loseSoundsystem, newGame, STEP, stepGame, type Game } from "./game";
import { TUNING } from "./tuning";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const P = TUNING.party.lossPenalty, I = TUNING.party.interval;

/** A game a few seconds in, with `left` seconds to the next wave. */
function game(left: number): Game {
  const g = newGame(7, TUNING);
  g.clock.paused = false;
  for (let i = 0; i < 30; i++) stepGame(g, idle, STEP);
  g.party.nextAt = g.clock.time + left;
  return g;
}
const leftOf = (g: Game) => g.party.nextAt - g.clock.time;
/** Step until the wave changes (at most `secs`), returning the time it came. */
function untilWave(g: Game, secs: number): number {
  const w = g.party.wave;
  for (let i = 0; i < secs / STEP + 2 && g.party.wave === w; i++) stepGame(g, idle, STEP);
  expect(g.party.wave).toBe(w + 1);
  return g.clock.time;
}

describe("a soundsystem lost brings the next wave sooner (Ed, 2026-10-05)", () => {
  it("is 60 s by default", () => expect(P).toBe(60));

  it("one loss takes lossPenalty seconds off the countdown, and the gap after the wave is the interval", () => {
    const g = game(100);
    loseSoundsystem(g, "home", 0, 0);
    expect(leftOf(g)).toBeCloseTo(100 - P, 6);
    expect(g.waveEvents).toEqual([expect.objectContaining({ kind: "soundsystemLost", key: "home", cut: P, left: expect.closeTo(100 - P, 6) })]);
    const due = g.party.nextAt, came = untilWave(g, 100 - P + 1);
    expect(came - due).toBeLessThan(STEP + 1e-9); // on time
    expect(g.party.nextAt).toBeCloseTo(due + I, 6); // and the one after a whole interval later
  }, 60000); // (40 s of game)

  it("with less than lossPenalty left, the wave comes at once (the next step)", () => {
    const g = game(20), at = g.clock.time;
    loseSoundsystem(g, "home", 0, 0);
    expect(g.waveEvents[0]).toEqual(expect.objectContaining({ cut: expect.closeTo(20, 6), left: 0 }));
    stepGame(g, idle, STEP);
    expect(g.party.wave).toBe(1);
    expect(g.party.nextAt).toBeCloseTo(at + I, 6);
  });

  it("two losses close together stack, each taking its own lossPenalty off", () => {
    const g = game(200);
    loseSoundsystem(g, "home", 0, 0);
    for (let i = 0; i < 60; i++) stepGame(g, idle, STEP); // a second later
    loseSoundsystem(g, "home", 0, 0);
    expect(leftOf(g)).toBeCloseTo(200 - 1 - 2 * P, 4);
    expect(g.waveEvents.map(e => e.cut)).toEqual([P]);
    expect(g.waveEvents[0].left).toBeCloseTo(200 - 1 - 2 * P, 4);
  });

  it("a woken area's soundsystem lost ends its party and hurries the wave the same way", () => {
    const g = game(150);
    stepGame(g, { ...idle, nextWave: true }, STEP);
    const key = [...g.party.areas.keys()].find(k => g.party.areas.get(k)!.soundsystem && k !== [...g.party.areas.keys()][0])!;
    expect(key).toBeTruthy();
    const before = leftOf(g);
    loseSoundsystem(g, key, 0, 0);
    expect(g.party.areas.has(key)).toBe(false);
    expect(g.combat.ruined.has(key)).toBe(true);
    expect(leftOf(g)).toBeCloseTo(before - P, 6);
  });
});
