// The 💌 invite (issue #87): bursts and cooldowns from data, letters that fly, home, land, and are
// blocked by enraged creatures and legends. (The meter itself: rules/affection.ts, creatureStates.test.ts.)
import { describe, expect, it } from "vitest";
import { newInvites, stepInvites, type Affection } from "./invites";
import { TUNING, withTuning } from "./tuning";
import { STEP, newGame, stepGame } from "./game";
import type { Creature } from "./creatures";

const her = { x: 0, z: 0, facing: 1 };
const critter = (id: number, x: number, z: number, more: Partial<Creature> = {}) => ({ id, species: "wolf", level: 1, x, z, leashed: false, gone: false, ...more }) as Creature;
/** An affection that counts hits. */
function counting(): Affection & { hits: Map<number, number> } {
  const hits = new Map<number, number>();
  return { hits, invitable: c => !c.leashed && !c.enraged && !c.boss, blocksLetters: c => !!c.enraged || !!c.boss, hit: c => hits.set(c.id, (hits.get(c.id) ?? 0) + 1), affection: () => null };
}
function fly(creatures: Creature[], A: Affection, aim: [number, number], seconds: number, t = TUNING, fire = true) {
  const s = newInvites(), ev: string[] = [];
  for (let i = 0, time = 0; i < seconds / STEP; i++, time += STEP) {
    s.events = [];
    stepInvites(s, { fire: fire && i === 0, aimX: aim[0], aimZ: aim[1] }, her, true, creatures, A, time, STEP, t);
    ev.push(...s.events.map(e => e.kind));
  }
  return { s, ev };
}

describe("the 💌 invite (issue #87)", () => {
  it("fires a burst of `burst` volleys of `multiShot` letters, then waits out its cooldown", () => {
    const t = withTuning({ invites: { ...TUNING.invites, burst: 3, multiShot: 2, cooldown: 1 } });
    const s = newInvites();
    let shots = 0, letters = 0;
    for (let i = 0, time = 0; i < 0.9 / STEP; i++, time += STEP) {
      s.events = [];
      stepInvites(s, { fire: true, aimX: 1, aimZ: 0 }, her, true, [], counting(), time, STEP, t);
      shots += s.events.filter(e => e.kind === "shot").length;
      letters = Math.max(letters, s.letters.length);
    }
    expect(shots).toBe(3); // one burst: still cooling down after it
    expect(letters).toBe(6);
  });

  it("lands on a wild creature in its path, and lets her own party through", () => {
    const wild = critter(1, 10, 0), mine = critter(2, 5, 0, { leashed: true }), A = counting();
    const { ev } = fly([wild, mine], A, [1, 0], 1);
    expect(A.hits.get(1)).toBe(TUNING.invites.burst); // (every letter that lands counts: no gap since 2026-10-06)
    expect(A.hits.get(2)).toBeUndefined();
    expect(ev.filter(e => e === "hit").length).toBe(TUNING.invites.burst);
  });

  it("is blocked by an enraged creature or a legend in the way", () => {
    for (const blocker of [critter(2, 5, 0, { enraged: true }), critter(2, 5, 0, { boss: true, level: 3 })]) {
      const wild = critter(1, 10, 0), A = counting();
      const { ev } = fly([wild, blocker], A, [1, 0], 1);
      expect(A.hits.get(1)).toBeUndefined();
      expect(ev).toContain("blocked");
    }
  });

  it("homes in on a creature a little off its line, and fizzles out past its range", () => {
    const off = critter(1, 9, 2.2), A = counting();
    fly([off], A, [1, 0], 1);
    expect(A.hits.get(1)).toBeGreaterThan(0);
    const none = withTuning({ invites: { ...TUNING.invites, homing: 0 } }), B = counting();
    const { ev } = fly([critter(1, 9, 2.2)], B, [1, 0], 2, none);
    expect(B.hits.get(1)).toBeUndefined();
    expect(ev).toContain("fizzled");
  });

  it("in the game: only on the ground and off her seat, and no proximity chat when on", () => {
    const g = newGame(77, TUNING);
    g.clock.paused = false;
    const W = g.witches[0];
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: 1, aimZ: 0 }, STEP);
    expect(W.invites.letters.length).toBe(0); // seated
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: 1, aimZ: 0 }, STEP);
    expect(W.invites.letters.length).toBe(0);
    g.witch = { ...g.witch, mode: "ground", lift: 0 };
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: 1, aimZ: 0 }, STEP);
    expect(W.invites.letters.length).toBeGreaterThan(0);
    expect(g.leash.talk).toBeNull();
  });

  it("flies straight through trees and scenery: only animals stop a 💌 (Ed, 2026-10-05)", () => {
    const g = newGame(77, TUNING);
    g.clock.paused = false;
    const d = g.map.dancefloor, tree = g.forest.treesNear(d.x + 120, d.z + 120, 60)[0];
    expect(tree).toBeDefined();
    const W = g.witches[0];
    g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, x: tree.x - 6, z: tree.z, vx: 0, vz: 0 };
    W.health.hp = 1e6;
    const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !k.enraged && k.level < 3)!;
    Object.assign(c, { level: 0, x: tree.x + 6, z: tree.z, tx: tree.x + 6, tz: tree.z, anchorX: tree.x + 6, anchorZ: tree.z, homeX: tree.x + 6, homeZ: tree.z, rest: 99, fight: undefined });
    c.cell = g.map.cellSafe(c.x, c.z).cell as [number, number];
    g.byArea = null;
    let hits = 0;
    for (let i = 0; i < 0.8 / STEP; i++) {
      stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: i === 0, aimX: 1, aimZ: 0 }, STEP);
      hits += W.invites.events.filter(e => e.kind === "hit" && e.id === c.id).length;
      Object.assign(c, { x: tree.x + 6, z: tree.z }); // (it stays put behind the tree)
    }
    expect(hits).toBeGreaterThan(0);
  });

  it("every 💌 that lands counts (Ed, 2026-10-06: no per-creature gap): 5 letters in 0.2 s give five letters' worth", () => {
    const t = withTuning({ invites: { ...TUNING.invites, burst: 5, burstGap: 0.04, multiShot: 1, homing: 0 } });
    const c = critter(0, 8, 0), A = counting();
    const { ev, s } = fly([c], A, [1, 0], 0.6, t);
    expect(ev.filter(e => e === "hit").length).toBe(5); // all five land (and are used up)
    expect(A.hits.get(0)).toBe(5); // and all five count
    expect(s.letters.length).toBe(0);
  });
  it("one 💌 a shot: a meter fills in (hits - 1) cooldowns and a flight, every hit counting (the gap gone, 2026-10-06)", () => {
    expect(TUNING.invites.burst).toBe(1);
    expect(TUNING.invites.multiShot).toBe(1);
    // Fire held at a creature 8 m off: when its nth hit lands.
    const fill = (t: typeof TUNING, n: number) => {
      const s = newInvites(), c = critter(0, 8, 0), A = counting();
      for (let i = 0, time = 0; i < 60 / STEP; i++, time += STEP) {
        s.events = [];
        stepInvites(s, { fire: true, aimX: 1, aimZ: 0 }, her, true, [c], A, time, STEP, t);
        if ((A.hits.get(0) ?? 0) >= n) return time;
      }
      return Infinity;
    };
    const I = TUNING.invites, flight = 8 / I.speed;
    for (let lv = 0; lv < 4; lv++) {
      const now = fill(TUNING, I.hits[lv]), want = (I.hits[lv] - 1) * I.cooldown + flight;
      expect(Math.abs(now - want), `level ${lv}: ${now.toFixed(2)} s, about ${want.toFixed(2)} s`).toBeLessThan(0.03 * want + 0.1); // (the cooldown in whole steps)
    }
  });
});
