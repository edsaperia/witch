// Won over, out of the fight's way (rules/wonKeepAway.ts; Ed, 2026-11-04, on #1804: "they should roam the whole area, and avoid
// creatures that are fighting. Do this in a simple way - we just want them out of the way of the fight"; "Newly won creatures can't
// be grabbed until the spell is cast, so they don't need to be near"): in any area, her won ones waiting for their stone's spell keep
// clear of her fights, the area's defenders go on defending, and the spell still scatters their sigils round the stone.
import { describe, expect, it } from "vitest";
import { stepGame, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { cellKey } from "./party";
import { befriend, stateOf } from "./creatureStates";
import { castOf, castSpot } from "./stoneStacks";
import { stepWonAway, waitingWon } from "./wonKeepAway";
import type { Creature } from "./creatures";
import { preppedGame } from "../test/preppedGame";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const hold: Controls = { ...still, sigilHeld: true };
const STEP = 1 / 60;
const run = (g: Game, secs: number, c: Controls = still) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, STEP); };
const R = TUNING.invites.wonAway!.radius;

/** A game under way (no waves), her high over home, hard to knock out. */
function game(seed = 123, t: Tuning = TUNING): Game {
  const g = preppedGame(seed, t);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  return g;
}
const own = (g: Game, key: string) => g.creatures.filter(c => cellKey(c.cell) === key && !c.gone);
/** The first wild area with at least `n` young or adults. */
function area(g: Game, n = 3): { key: string; stone: { x: number; z: number } } {
  const home = cellKey(g.map.centreCell);
  for (const [cx, cy] of g.map.cells) {
    const key = `${cx},${cy}`;
    if (key === home || g.party.areas.has(key) || !g.map.playable(cx, cy) || g.challenge?.key === key) continue;
    if (own(g, key).filter(c => c.level > 0 && !c.boss).length >= n) return { key, stone: g.map.soundsystemSpot(cx, cy) };
  }
  throw new Error("no such area");
}
/** Won over by her, its sigil waiting in its stone's stack (rules/game.ts markAtStone). */
const win = (g: Game, c: Creature) => { befriend(c, g.clock.time); c.atStone = true; };
/** The nearest of her fight to c (a wild one hunting her). */
const nearestFighter = (g: Game, c: Creature) => Math.min(...g.creatures.filter(f => !f.gone && f.hunting !== undefined).map(f => Math.hypot(f.x - c.x, f.z - c.z)));

describe("in an ordinary area", () => {
  it("her won ones roam clear of her fight, backing off from the wild hunting her", () => {
    const play = (t: Tuning) => {
      const g = game(123, t), a = area(g), cs = own(g, a.key).filter(c => c.level > 0 && !c.boss);
      for (const c of g.creatures) if (!c.boss && cellKey(c.cell) !== a.key && Math.hypot(c.x - a.stone.x, c.z - a.stone.z) < 250) c.gone = true;
      g.byArea = null;
      const won = cs[0], spot = castSpot(a.stone, g.tuning);
      win(g, won);
      g.witch = { ...g.witch, x: spot.x, z: spot.z + 8, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
      g.wildEntry.set(a.key, { at: g.clock.time, until: g.clock.time, last: g.clock.time, danger: 1 }); // (its watch over: the hunt at once)
      run(g, 0.5);
      expect(cs.slice(1).some(c => c.hunting === 0)).toBe(true);
      // (put among the fight, by her)
      won.x = g.witch.x + 1; won.z = g.witch.z; won.tx = won.x; won.tz = won.z;
      let close = 0, n = 0;
      const spots = new Set<string>();
      for (let i = 0; i < 8 * 60; i++) { stepGame(g, still, STEP); if (i > 3 * 60) { n++; if (nearestFighter(g, won) < R) close++; } if (i % 30 === 0) spots.add(`${Math.round(won.x)},${Math.round(won.z)}`); }
      expect(stateOf(won)).toBe("happy"); expect(won.atStone).toBe(true); // (still waiting for the spell, not leashed)
      return { share: close / n, spots: spots.size };
    };
    const on = play(TUNING), off = play(withTuning({ invites: { ...TUNING.invites, wonAway: { on: false, radius: R } } }));
    expect(on.share).toBeLessThan(0.15);
    expect(on.share).toBeLessThan(off.share); // (without it, it stands about in the fight)
    expect(on.spots).toBeGreaterThan(2); // (roaming, not waiting in one place)
  }, 120000);

  it("leaves the area's defenders to their defence: one in a fight isn't moved, and an enraged besieger isn't her fight", () => {
    const g = game(), a = area(g, 4), cs = own(g, a.key).filter(c => c.level > 0 && !c.boss);
    const [defender, idle, besieger, hunter] = cs;
    win(g, defender); win(g, idle);
    // (the defender at grips with an enraged besieger, the idle one beside it; a wild one hunting her far off)
    Object.assign(besieger, { enraged: true, state: "enraged", siege: undefined, x: 0, z: 0, fight: { target: { kind: "creature", id: defender.id }, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 } });
    Object.assign(defender, { x: 1, z: 0, tx: 1, tz: 0, fight: { target: { kind: "creature", id: besieger.id }, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 } });
    Object.assign(idle, { x: -1, z: 0, tx: -1, tz: 0, fight: undefined });
    Object.assign(hunter, { x: 500, z: 500, hunting: 0, fight: undefined });
    expect(waitingWon(defender)).toBe(false); // (in a fight: combat moves it)
    expect(waitingWon(idle)).toBe(true);
    stepWonAway(g, STEP);
    expect([defender.x, defender.z, idle.x, idle.z]).toEqual([1, 0, -1, 0]); // (nothing of her fights near them)
    // A wild one hunting her beside the idle one: it backs off; the defender holds.
    Object.assign(hunter, { x: -2, z: 0 });
    stepWonAway(g, STEP);
    expect([defender.x, defender.z]).toEqual([1, 0]);
    expect(idle.x).toBeGreaterThan(-1);
  }, 60000);

  it("with it off, nothing moves", () => {
    const g = game(123, withTuning({ invites: { ...TUNING.invites, wonAway: { on: false, radius: R } } })), a = area(g), cs = own(g, a.key).filter(c => c.level > 0 && !c.boss);
    win(g, cs[0]); Object.assign(cs[0], { x: 0, z: 0 }); Object.assign(cs[1], { x: 1, z: 0, hunting: 0 });
    expect(stepWonAway(g, STEP)).toBe(0);
    expect([cs[0].x, cs[0].z]).toEqual([0, 0]);
  }, 60000);

  it("doesn't stop the spell: cast, every friend sigil scatters round the stone, wherever its won ones have roamed", () => {
    const g = game(), a = area(g), W = g.witches[0], cs = own(g, a.key).filter(c => !c.boss && c.level > 0);
    for (const c of g.creatures) if (!c.boss && cellKey(c.cell) !== a.key && Math.hypot(c.x - a.stone.x, c.z - a.stone.z) < 250) c.gone = true;
    g.byArea = null;
    for (const c of cs) win(g, c);
    // (roamed off to the far side of their area)
    const far = cs[0]; far.x = a.stone.x + 60; far.z = a.stone.z + 40; far.tx = far.x; far.tz = far.z;
    const spot = castSpot(a.stone, g.tuning);
    g.witch = { ...g.witch, x: spot.x + 0.5, z: spot.z + 0.5, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
    run(g, 0.2);
    run(g, castOf(g.tuning).time + 1.5, hold);
    expect(g.party.areas.has(a.key)).toBe(true);
    const S = castOf(g.tuning).scatter;
    for (const c of cs) {
      expect(c.loose, `${c.id}`).toBe(true);
      const p = g.loose.find(q => q.id === c.id)!;
      expect(Math.hypot(p.x - a.stone.x, p.z - a.stone.z), `${c.id}`).toBeLessThanOrEqual(S.reach + 2); // (round the stone, not where it roamed)
    }
    expect(W.casting).toBeNull();
  }, 60000);
});
