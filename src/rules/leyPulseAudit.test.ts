// Where the wave's pulse (its sparkler, render/sparkler.ts; the HUD's wave pointer) is drawn (Ed, 2026-10-08: "I still
// think the sparkler/pulse is sometimes being drawn in the wrong place"): along the drawn line at the ley chain's current
// link (rules/leylines.ts leyChain) the countdown's share of the way (rules/leypulse.ts pulseProgress), never past the
// line's front (render/leylines.ts leyReveal). These hold it to the wave in each case: waves coming, an area cleared early,
// a soundsystem lost, a knockout and respawn, and what a quest done does (Ed hasn't ruled: leyLines.advance).
import { describe, expect, it } from "vitest";
import { hitWitch, loseSoundsystem, newGame, stepGame, type Game } from "./game";
import { pulseHurry } from "./party";
import { TUNING, withTuning } from "./tuning";
import { cellKey, type PartyState } from "./party";
import { leyChain, onAreaDone, waveReached } from "./leylines";
import { leyReachTimes, pulseLinks, pulseProgress } from "./leypulse";
import { holdsArea } from "./clear";
import { leyReveal } from "../render/leylines";

const still = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, still, 1 / 60); };
const wave = (g: Game) => stepGame(g, { ...still, nextWave: true }, 1 / 60);
/** A game under way, the boot over, the witch over the treetops at home (out of every fight). */
function game(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  g.party.bootUntil = Math.min(g.party.bootUntil, g.clock.time - 1);
  return g;
}
/** The line as drawn from the party: its stones, which is current, the pulse's place along it (links) and its front. */
function line(p: PartyState, g: Game) {
  const c = leyChain(p, g.map), t = g.clock.time, share = pulseProgress(p, g.map, t);
  return { stones: c.stones.map(s => cellKey(s.cell)), current: c.current, pulse: c.current + share, front: leyReveal(p, g.map, t, g.map.tuning.leyLines.reveal ?? 3) };
}
/** The pulse on its way from the last wave's stone to the next's, and not past the front. */
function onTheWave(g: Game): void {
  const L = line(g.party, g), last = g.party.wave === 0 ? cellKey(g.map.centreCell) : cellKey(g.party.last!);
  expect(L.current, "one stone a wave").toBe(g.party.wave);
  expect(L.stones[L.current], "from the last wave's stone").toBe(last);
  expect(L.stones[L.current + 1], "to the next wave's").toBe(cellKey(g.party.next[0]));
  if (L.front !== null) expect(L.pulse, "never past the line's front").toBeLessThanOrEqual(L.front + 1e-9);
}
const empty = (g: Game, key: string) => { for (const c of g.creatures) if (cellKey(c.cell) === key && holdsArea(c)) c.gone = true; g.byArea = null; };

describe("the wave's pulse, drawn where the wave is (Ed, 2026-10-08)", () => {
  it("wave by wave: from the last wave's stone to the next's, setting off as each wave lands, never past the front", () => {
    const g = game();
    onTheWave(g);
    for (let w = 1; w <= 6; w++) {
      run(g, 3); onTheWave(g);
      const before = line(g.party, g);
      wave(g); onTheWave(g);
      const after = line(g.party, g);
      expect(after.stones).toEqual(before.stones); // (the same line: it only moves on along it)
      expect(after.pulse - after.current).toBeLessThan(0.02); // (setting off from the stone the wave reached)
    }
  }, 120000);

  it("an area cleared early: the pulse, the line and the beacons keep their pace (#565); its wave reaches it as ever", () => {
    const g = game(); wave(g);
    const key = cellKey(leyChain(g.party, g.map).stones[g.party.wave + 2].cell), before = line(g.party, g), times = leyReachTimes(g.party, g.map);
    empty(g, key); run(g, 0.5);
    expect(g.party.areas.get(key)?.early).toBe(true);
    const L = line(g.party, g); expect(L.stones).toEqual(before.stones); expect(L.current).toBe(before.current); onTheWave(g); // (its pulse and front only on with the clock)
    expect(leyReachTimes(g.party, g.map)).toEqual(times);
    while (cellKey(g.party.next[0]) !== key) wave(g);
    wave(g); onTheWave(g);
    expect(waveReached(g.party, key)).toBe(g.clock.time);
  }, 120000);

  it("a soundsystem lost: its stone stays on the line, reached when its wave came; the line isn't redrawn and the pulse stays on its link", () => {
    const g = game(); wave(g); wave(g); run(g, 2);
    const key = cellKey(g.party.last!), before = line(g.party, g), at = waveReached(g.party, key);
    const s = g.combat.sounds.get(key)!; s.hp = 0; loseSoundsystem(g, key, s.x, s.z);
    expect(g.party.areas.has(key)).toBe(false); expect(g.party.ruined?.has(key)).toBe(true);
    const after = line(g.party, g);
    expect(after.stones).toEqual(before.stones); expect(after.current).toBe(before.current);
    expect(after.pulse).toBeGreaterThanOrEqual(before.pulse); // (on: the loss brings the wave sooner, party.lossPenalty)
    expect(waveReached(g.party, key)).toBe(at); expect(leyReachTimes(g.party, g.map)!.get(key)).toBeLessThanOrEqual(at!);
    onTheWave(g); wave(g); onTheWave(g);
  }, 120000);

  it("an area cleared early whose soundsystem is lost before its wave: its stone is reached when the wave comes", () => {
    const g = game(); wave(g);
    const key = cellKey(g.party.next[0]);
    empty(g, key); run(g, 0.5);
    const s = g.combat.sounds.get(key)!; s.hp = 0; loseSoundsystem(g, key, s.x, s.z);
    onTheWave(g);
    expect(waveReached(g.party, key)).toBeUndefined();
    wave(g); onTheWave(g);
    expect(waveReached(g.party, key)).toBe(g.clock.time);
  }, 120000);

  it("knocked out and teleported home: the line and the pulse don't change", () => {
    const g = game(); wave(g); run(g, 2);
    g.witch = { ...g.witch, mode: "ground", lift: 0 };
    const before = line(g.party, g), W = g.witches[0];
    W.health.hp = 1; hitWitch(g, 0, g.clock.time, g.tuning);
    expect(W.ko).toBeTruthy();
    run(g, 15);
    const after = line(g.party, g);
    expect(after.stones).toEqual(before.stones); expect(after.current).toBe(before.current); onTheWave(g);
  }, 120000);

  it("a quest done: the line, its order and the pulse stay as they were (Ed, 2026-10-08, leyLines.advance \"wave\"); \"first\" is the old jump", () => {
    let g = game(); wave(g);
    const c = leyChain(g.party, g.map), far = c.stones[c.current + 3], before = line(g.party, g);
    onAreaDone(g.party, g.party.next[0], g.clock.time); onAreaDone(g.party, far.cell, g.clock.time);
    expect(line(g.party, g)).toEqual(before); onTheWave(g);
    // The old way, for comparison: the next stone's quest moves the line on a link, a farther one is pulled out of the route.
    g = game(); wave(g);
    const first = { ...g.map, tuning: withTuning({ leyLines: { ...TUNING.leyLines, advance: "first" } }) } as typeof g.map, b2 = leyChain(g.party, first);
    onAreaDone(g.party, b2.stones[b2.current + 3].cell, g.clock.time);
    const L2 = leyChain(g.party, first);
    expect(L2.stones.map(s => cellKey(s.cell))).not.toEqual(b2.stones.map(s => cellKey(s.cell)));
  }, 120000);
});

describe("the pulse and the line's front never skip (Ed, 2026-10-08: 'it always travels along the route at the bpm speed')", () => {
  /** Waves every 20 s, a short boot, so a test sees several in its time. */
  const FAST = withTuning({ party: { ...TUNING.party, interval: 20, lossPenalty: 8 }, boot: { ...TUNING.boot, time: 1, firstAfter: 0 } });
  function fast(extra?: Parameters<typeof withTuning>[0]): Game {
    const g = newGame(123, extra ? withTuning({ ...FAST, ...extra } as never) : FAST);
    g.clock.paused = false; g.party.spellAt = undefined;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    g.witches[0].health.hp = 1e6;
    return g;
  }
  /** Steps `secs`, `each` before every step; the pulse's and the front's distance along the route never go back, and never
   *  move more than `most` links in a step (at most PULSE_HURRY times the pace, the front `reveal` times that). */
  function watch(g: Game, secs: number, each?: (i: number) => void): { pulse: number; front: number } {
    const reveal = g.map.tuning.leyLines.reveal ?? 3, per = Math.max(1, g.party.next.length), most = (per * (pulseHurry(g.map) + 0.2) / g.map.tuning.party.interval) / 60;
    let pulse = pulseLinks(g.party, g.map, g.clock.time), front = leyReveal(g.party, g.map, g.clock.time, reveal) ?? 0;
    for (let i = 0; i < Math.round(secs * 60); i++) {
      each?.(i); stepGame(g, still, 1 / 60);
      const p = pulseLinks(g.party, g.map, g.clock.time), f = leyReveal(g.party, g.map, g.clock.time, reveal) ?? 0;
      expect(p, `pulse at ${g.clock.time.toFixed(2)}`).toBeGreaterThanOrEqual(pulse - 1e-9);
      expect(p - pulse, `pulse step at ${g.clock.time.toFixed(2)}`).toBeLessThanOrEqual(most + 1e-6);
      expect(f, `front at ${g.clock.time.toFixed(2)}`).toBeGreaterThanOrEqual(front - 1e-9);
      expect(f - front, `front step at ${g.clock.time.toFixed(2)}`).toBeLessThanOrEqual(reveal * most + 1e-6);
      expect(f).toBeGreaterThanOrEqual(p - 1e-9); // (the pulse never past the front)
      pulse = p; front = f;
    }
    return { pulse, front };
  }

  it("through the boot and five waves: the pulse a link a wave, the front leyLines.reveal times as far", () => {
    const g = fast(), end = watch(g, 1.5 + 20 * 5);
    expect(g.party.wave).toBe(5);
    expect(end.pulse).toBeGreaterThan(5); expect(end.pulse).toBeLessThan(5.1);
    expect(end.front).toBeCloseTo((g.map.tuning.leyLines.reveal ?? 3) * end.pulse, 6);
  }, 180000);

  it("a tempo change mid-link (a knockdown's BPM): the pace changes, nothing jumps, and it still arrives with the wave", () => {
    const g = fast();
    watch(g, 1.5 + 25, i => { if (i === 60 * 10) g.beat.bonus = 60; });
    onTheWave(g);
  }, 180000);

  it("a soundsystem lost hurries the wave: the pulse speeds up from where it is, at most the front's pace (pulseHurry), and arrives with it", () => {
    const g = fast();
    let lost = "";
    watch(g, 1.5 + 20 * 3, i => {
      if (i === Math.round(60 * (1.5 + 20 + 15)) && !lost) { lost = cellKey(g.party.last!); const s = g.combat.sounds.get(lost)!; s.hp = 0; loseSoundsystem(g, lost, s.x, s.z); } // (late in the link: the hurry is held to what the pulse can run)
      if (i === Math.round(60 * (1.5 + 40 + 3))) { const k = cellKey(g.party.last!); const s = g.combat.sounds.get(k); if (s) { s.hp = 0; loseSoundsystem(g, k, s.x, s.z); } } // (early in one: the full hurry)
    });
    expect(lost).not.toBe("");
    onTheWave(g);
  }, 180000);

  it("an area cleared early, and quests done for the next stone and one farther on: nothing moves", () => {
    const g = fast();
    watch(g, 1.5 + 20 + 5, i => {
      if (i === 60 * 22) { const c = leyChain(g.party, g.map); empty(g, cellKey(c.stones[c.current + 2].cell)); }
      if (i === 60 * 24) { const c = leyChain(g.party, g.map); onAreaDone(g.party, g.party.next[0], g.clock.time); onAreaDone(g.party, c.stones[c.current + 3].cell, g.clock.time); }
    });
    watch(g, 40); onTheWave(g);
  }, 180000);

  it("two stones a wave (two witches): the pulse runs through both in turn over the countdown, no jump as the wave lands", () => {
    const g = fast({ party: { ...FAST.party, areasPerWave: 2 } });
    const end = watch(g, 1.5 + 20 * 3);
    expect(g.party.wave).toBe(3);
    expect(end.pulse).toBeGreaterThan(6); expect(end.pulse).toBeLessThan(6.2);
  }, 180000);

  it("paused: the pulse and the front hold still", () => {
    const g = fast(); watch(g, 10);
    g.clock.paused = true;
    const was = pulseLinks(g.party, g.map, g.clock.time);
    for (let i = 0; i < 120; i++) stepGame(g, still, 1 / 60);
    expect(pulseLinks(g.party, g.map, g.clock.time)).toBe(was);
  }, 60000);
});
