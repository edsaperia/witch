// The night's tempo is steady (Ed, 2026-11-03: "the tempo (pulse speed) should stay the same through the night, and only raises
// when you get knocked down"; it supersedes his 2026-10-04 rise from 120 to about 140 bpm): the record's bpm, or beat.bpm with
// none, through every wave, the music's styles changing wave by wave but never the tempo; only her knockdowns raise it; and so
// the spark's speed (rules/beat.ts tempoRate) is the same from wave to wave.
import { describe, expect, it } from "vitest";
import { bpmAt, recordTempo, sparkSpeedAt } from "./beat";
import { hitWitch, newGame as fullGame, stepGame, type Controls, type Game } from "./game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "./tuning";
const newGame = smallWorld(fullGame, "The tempo through a few waves needs only the first stones, not distant area diversity.");

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const STEP = 1 / 60;

/** A game under way (the party spell cast, her health endless), on `record`'s tempo if one is given (as at her decks:
 *  rules/wakeUp.ts startParty), stepped past the boot. */
function start(seed: number, record?: number): Game {
  const g = newGame(seed, TUNING);
  if (record !== undefined) recordTempo(g.beat, g.tuning, record, g.clock.time);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  for (let i = 0; i < 600 / STEP && g.clock.time < g.party.bootUntil + 1; i++) stepGame(g, still, STEP);
  expect(g.clock.time).toBeGreaterThan(g.party.bootUntil);
  return g;
}
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, still, STEP); };

/** The tempo and the spark's speed at each of the next `n` waves, called in one after another, a few bars on from each. */
function throughWaves(g: Game, n: number): { wave: number; bpm: number; spark: number }[] {
  const out: { wave: number; bpm: number; spark: number }[] = [];
  for (let k = 0; k < n; k++) {
    const w = g.party.wave;
    stepGame(g, { ...still, nextWave: true }, STEP);
    expect(g.party.wave).toBeGreaterThan(w);
    run(g, 20); // (past any block line and ramp a wave's music might have brought)
    out.push({ wave: g.party.wave, bpm: bpmAt(g.beat, g.clock.time), spark: g.party.pulse.v });
  }
  return out;
}

describe("the night's tempo is steady through the waves (Ed, 2026-11-03)", () => {
  it("with no record and no knockdowns: beat.bpm (120) at every wave, the clock never changing course", () => {
    const g = start(7), segs = g.beat.segs.length, seen = throughWaves(g, 5);
    expect(new Set(seen.map(s => s.wave)).size).toBe(5);
    for (const s of seen) expect(s.bpm, `wave ${s.wave}`).toBe(TUNING.beat.bpm);
    expect(g.beat.segs.length).toBe(segs);
  }, 120000);

  it("a record sets it: its bpm at every wave", () => {
    for (const record of [100, 150]) {
      const g = start(7, record);
      for (const s of throughWaves(g, 4)) expect(s.bpm, `${record} bpm, wave ${s.wave}`).toBe(record);
    }
  }, 120000);

  it("a knockout raises it by knockout.bpmStep, and it holds there through the waves after", () => {
    const g = start(7, 100), step = TUNING.knockout.bpmStep ?? 0;
    expect(step).toBeGreaterThan(0);
    const W = g.witches[0]; W.health.hp = 1;
    for (let i = 0; i < 50 && !W.ko; i++) hitWitch(g, 0, g.clock.time + i * (TUNING.witchHealth.grace + 0.05));
    expect(W.ko).toBeTruthy();
    expect(g.beat.bonus).toBe(step);
    W.health.hp = 1e6;
    run(g, 30); // (back at her decks, the rise eased in)
    expect(bpmAt(g.beat, g.clock.time)).toBeCloseTo(100 + step, 9);
    for (const s of throughWaves(g, 3)) expect(s.bpm, `wave ${s.wave}`).toBeCloseTo(100 + step, 9);
  }, 120000);

  it("so the spark's speed is the same at every wave: the line's at the night's tempo (1.8 m/s at 120; 1.0 at a 100 bpm record)", () => {
    for (const [record, v] of [[undefined, 1.8], [100, 1]] as const) {
      const seen = throughWaves(start(7, record), 5);
      for (const s of seen) {
        expect(s.spark, `wave ${s.wave}`).toBeCloseTo(TUNING.leyLines.pulseSpeed * sparkSpeedAt(record ?? TUNING.beat.bpm, TUNING), 9);
        expect(s.spark).toBeCloseTo(v, 9);
      }
    }
  }, 120000);
});
