// A soundsystem lost touches neither the wave countdown nor the tempo (Ed, 2026-10-08: "Losing a soundsystem no longer
// touches the wave countdown", "Losing a soundsystem doesn't affect the bpm"); knockdowns add knockout.bpmStep each
// ("Knockdowns increase the bpm by 5"), with no cap.
import { describe, expect, it } from "vitest";
import { bpmAt, knockdownTempo } from "./beat";
import { loseSoundsystem, newGame, STEP, stepGame, type Game } from "./game";
import { TUNING } from "./tuning";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** A game a few seconds in, booted, the ley pulse `left` seconds (at most its whole first link) from the first wave's stone. */
function game(left: number): Game {
  const g = newGame(7, TUNING);
  g.clock.paused = false; g.witch.seated = false; // (up from the decks: the boot-up counts from then)
  for (let i = 0; i < 30; i++) stepGame(g, idle, STEP);
  const P = g.party.pulse, v = TUNING.leyLines.pulseSpeed, L = P.lens.reduce((a, b) => a + b, 0);
  g.party.bootUntil = g.clock.time - 1; P.at = g.clock.time; P.v = v; P.d = Math.max(0, L - left * v);
  stepGame(g, idle, STEP);
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

describe("a soundsystem lost leaves the waves and the beat alone (Ed, 2026-10-08)", () => {
  it("the tuning has no loss penalty", () => expect((TUNING.party as Record<string, unknown>).lossPenalty).toBeUndefined());

  it("a loss leaves the countdown, the tempo and the knockdown bonus as they were; the wave comes on time", () => {
    const g = game(20), due = g.party.nextAt, bpm = bpmAt(g.beat, g.clock.time), bonus = g.beat.bonus ?? 0;
    loseSoundsystem(g, "home", 0, 0);
    expect(g.party.nextAt).toBe(due);
    expect(g.waveEvents).toEqual([{ kind: "soundsystemLost", key: "home", x: expect.any(Number), z: expect.any(Number), at: g.clock.time }]);
    expect(g.beat.bonus ?? 0).toBe(bonus);
    for (let i = 0; i < 120; i++) stepGame(g, idle, STEP);
    expect(bpmAt(g.beat, g.clock.time)).toBeCloseTo(bpm, 9);
    const came = untilWave(g, 20);
    expect(came - due).toBeLessThan(STEP + 1e-9); // on time
    const next = g.party.pulse.lens.reduce((a, b) => a + b, 0) / g.party.pulse.v;
    expect(g.party.nextAt - came).toBeCloseTo(next, 1); // and the one after its link's length at the pulse's speed later
  });

  it("two losses close together: still nothing", () => {
    const g = game(30), before = leftOf(g);
    loseSoundsystem(g, "home", 0, 0);
    for (let i = 0; i < 60; i++) stepGame(g, idle, STEP); // a second later
    loseSoundsystem(g, "home", 0, 0);
    expect(leftOf(g)).toBeCloseTo(before - 1, 4);
  });

  it("a woken area's soundsystem lost ends its party and leaves the countdown be", () => {
    const g = game(50);
    stepGame(g, { ...idle, nextWave: true }, STEP);
    const key = [...g.party.areas.keys()].find(k => g.party.areas.get(k)!.soundsystem && k !== [...g.party.areas.keys()][0])!;
    expect(key).toBeTruthy();
    const due = g.party.nextAt;
    loseSoundsystem(g, key, 0, 0);
    expect(g.party.areas.has(key)).toBe(false);
    expect(g.combat.ruined.has(key)).toBe(true);
    expect(g.party.nextAt).toBe(due);
    expect(g.beat.bonus ?? 0).toBe(0);
  });
});

describe("knockdowns raise the tempo (Ed, 2026-10-08: \"Knockdowns increase the bpm by 5\")", () => {
  it("5 BPM each, with no cap", () => {
    expect(TUNING.knockout.bpmStep).toBe(5);
    expect(TUNING.knockout.bpmCap).toBeUndefined();
    const g = game(50);
    for (let i = 0; i < 12; i++) expect(knockdownTempo(g.beat, g.tuning, g.clock.time + i)).toBe(5);
    expect(g.beat.bonus).toBe(60);
  });
});
