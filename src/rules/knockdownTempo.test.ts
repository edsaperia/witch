// The beat speeds up as she's knocked down (Ed, 2026-10-07: "the BPM goes up by 1 each time you die"): the party's tempo
// rises by knockout.bpmStep a knockdown, eased in from the next beat, and the wave countdown runs that much faster.
import { describe, expect, it } from "vitest";
import { beatAt, bpmAt, knockdownTempo, newBeatClock, tempoRate } from "./beat";
import { hitWitch, newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T = { beat: { bpm: 120 }, knockout: { bpmStep: 1 } };

describe("knockdowns speed up the beat (Ed, 2026-10-07)", () => {
  it("N knockdowns add N BPM, eased in from the next beat without a skip; it never goes down", () => {
    const c = newBeatClock(120);
    for (let i = 0; i < 3; i++) expect(knockdownTempo(c, T, 10 + i * 0.1)).toBe(1);
    expect(c.bonus).toBe(3);
    expect(bpmAt(c, 10)).toBe(120); // (not yet: from the next beat)
    expect(bpmAt(c, 30)).toBeCloseTo(123, 6);
    // the beat runs on smoothly through the change
    for (let s = 9.9; s < 13; s += 0.01) expect(beatAt(c, s + 0.01) - beatAt(c, s)).toBeGreaterThan(0);
    expect(Math.abs(beatAt(c, 10.0001) - beatAt(c, 10))).toBeLessThan(0.01);
  });

  it("stops at knockout.bpmCap, and adds nothing with no bpmStep", () => {
    const c = newBeatClock(120), capped = { ...T, knockout: { bpmStep: 2, bpmCap: 5 } };
    expect([1, 2, 3, 4].map(i => knockdownTempo(c, capped, i))).toEqual([2, 2, 1, 0]);
    expect(c.bonus).toBe(5);
    const off = newBeatClock(120);
    expect(knockdownTempo(off, { beat: T.beat, knockout: {} }, 1)).toBe(0);
    expect(off.bonus ?? 0).toBe(0);
  });

  it("a real knockdown adds its BPM", () => {
    const g = start(123);
    g.witches[0].health.hp = 1;
    for (let i = 0; i < 50 && !g.witches[0].ko; i++) hitWitch(g, 0, g.clock.time + i * (TUNING.witchHealth.grace + 0.05));
    expect(g.witches[0].ko).toBeTruthy();
    expect(g.beat.bonus).toBe(TUNING.knockout.bpmStep);
  }, 60000);

  it("the next wave comes sooner, by the tempo's ratio, from the knockdowns on", () => {
    const steady = start(7), fast = start(7);
    for (const g of [steady, fast]) runUntil(g, () => g.clock.time >= g.party.bootUntil + 10);
    const left = steady.party.nextAt - steady.clock.time;
    for (let i = 0; i < 3; i++) knockdownTempo(fast.beat, fast.tuning, fast.clock.time);
    const rate = tempoRate(fast.beat, fast.tuning);
    expect(rate).toBeCloseTo(1 + 3 / fast.beat.base, 6);
    const from = fast.clock.time, wave = fast.party.wave;
    runUntil(fast, () => fast.party.wave > wave);
    expect(fast.clock.time - from).toBeCloseTo(left / rate, 0); // (within a second)
    const sFrom = steady.clock.time, sWave = steady.party.wave;
    runUntil(steady, () => steady.party.wave > sWave);
    expect(steady.clock.time - sFrom).toBeCloseTo(left, 0);
  }, 120000);
});

/** A game under way, the party spell cast, her health endless, the waves a minute apart. */
function start(seed: number): Game {
  const g = newGame(seed, { ...TUNING, party: { ...TUNING.party, interval: 60 } });
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  stepGame(g, still, 1 / 60);
  return g;
}
function runUntil(g: Game, done: () => boolean): void {
  for (let i = 0; i < 60 * 600 && !done(); i++) stepGame(g, still, 1 / 60);
}
