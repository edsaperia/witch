// Where the wave's pulse (its sparkler, render/sparkler.ts; the HUD's wave pointer) is drawn (Ed, 2026-10-08: "I still
// think the sparkler/pulse is sometimes being drawn in the wrong place"): along the drawn line at the ley chain's current
// link (rules/leylines.ts leyChain) the countdown's share of the way (rules/leypulse.ts pulseProgress), never past the
// line's front (render/leylines.ts leyReveal). These hold it to the wave in each case: waves coming, an area cleared early,
// a soundsystem lost, a knockout and respawn, and what a quest done does (Ed hasn't ruled: leyLines.advance).
import { describe, expect, it } from "vitest";
import { hitWitch, loseSoundsystem, newGame, stepGame, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey, type PartyState } from "./party";
import { leyChain, onAreaDone, waveReached } from "./leylines";
import { leyReachTimes, pulseProgress } from "./leypulse";
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

  it("a quest done (as built, Ed to rule): the line moves on past its stone at once; under leyLines.advance \"wave\" (the view drops leyDone) it doesn't", () => {
    // The next wave's stone's quest done: the pulse jumps a link ahead of the wave, at the same share of the next link.
    let g = game(); wave(g);
    const next = cellKey(g.party.next[0]), before = line(g.party, g);
    onAreaDone(g.party, g.party.next[0], g.clock.time);
    const L = line(g.party, g);
    expect(L.current).toBe(before.current + 1); expect(L.stones[L.current]).toBe(next); expect(L.stones).toEqual(before.stones);
    expect(line({ ...g.party, leyDone: undefined }, g)).toEqual(before); // (what "wave" draws)
    // A stone further on: it's taken out of the route's order and put behind the pulse, the pulse running back from it.
    g = game(); wave(g);
    const c = leyChain(g.party, g.map), far = c.stones[c.current + 3], b2 = line(g.party, g);
    onAreaDone(g.party, far.cell, g.clock.time);
    const L2 = line(g.party, g);
    expect(L2.stones).not.toEqual(b2.stones); expect(L2.stones[L2.current]).toBe(cellKey(far.cell)); expect(L2.stones[L2.current + 1]).toBe(cellKey(g.party.next[0]));
    expect(line({ ...g.party, leyDone: undefined }, g)).toEqual(b2);
  }, 120000);
});
