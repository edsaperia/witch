// The 💌 invite (issue #87): bursts and cooldowns from data, letters that fly, home, land, and are
// blocked by enraged creatures and legends, and the stand-in affection that invites at full.
import { describe, expect, it } from "vitest";
import { hitsNeeded, newInvites, standInAffection, stepInvites, type Affection } from "./invites";
import { newLeash } from "./leash";
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
    expect(A.hits.get(1)).toBe(TUNING.invites.burst);
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

  it("fills a stand-in meter by level, drains it slowly, and invites at full", () => {
    const s = newInvites(), leash = newLeash(), A = standInAffection(s, leash, TUNING), c = critter(0, 0, 0, { level: 0 });
    const need = hitsNeeded(c, TUNING);
    for (let i = 0; i < need - 1; i++) A.hit(c, 1, 0);
    expect(A.affection(c)).toBeCloseTo((need - 1) / need);
    expect(c.leashed).toBe(false);
    A.hit(c, 1, 0);
    expect(c.leashed).toBe(true);
    expect(leash.stack).toContain(0);
    const d = critter(1, 0, 0);
    A.hit(d, 1, 0);
    const before = A.affection(d)!;
    stepInvites(s, {}, her, true, [c, d], A, 1, 1, TUNING);
    expect(A.affection(d)!).toBeCloseTo(before - TUNING.invites.drain);
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
});
