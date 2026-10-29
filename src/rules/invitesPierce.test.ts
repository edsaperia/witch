// Pierce (Ed, 2026-10-29: "pierce, yes"; tuning invites.pierce, a bag's invitesAdd): a 💌 flies on through `pierce` more creatures
// after the first it lands on, each landing a hit through the same love as any letter's (the coordinator: each one fills a slot,
// c.fills, in the one fade queue, rules/orbit.ts), and does to a stunned one what any letter does (converts it).
import { describe, expect, it } from "vitest";
import { newInvites, stepInvites, type Affection } from "./invites";
import { TUNING, withTuning } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import type { Creature } from "./creatures";
import { stun } from "./orbit";
import { stateOf } from "./creatureStates";

const her = { x: 0, z: 0, facing: 1 };
const critter = (id: number, x: number) => ({ id, species: "wolf", level: 1, x, z: 0, leashed: false, gone: false }) as Creature;
function counting(): Affection & { hits: number[] } {
  const hits: number[] = [];
  return { hits, invitable: () => true, blocksLetters: () => false, hit: c => { hits.push(c.id); }, affection: () => null };
}
/** One letter thrown along +x, flown out. */
function one(pierce: number, creatures: Creature[], A: Affection) {
  const t = withTuning({ invites: { ...TUNING.invites, pierce } }), s = newInvites();
  for (let i = 0, time = 0; i < 2 / STEP; i++, time += STEP) stepInvites(s, { fire: i === 0, aimX: 1, aimZ: 0 }, her, true, creatures, A, time, STEP, t);
  return s;
}

/** A game with her on the ground at the dancefloor and wild foxes of rank 1 in a line along +x at `at` metres, everything else cleared. */
function line(pierce: number, at: number[]): { g: Game; foxes: Creature[] } {
  const g = newGame(1000, withTuning({ invites: { ...TUNING.invites, pierce }, spells: { ...TUNING.spells, bag: "satchel" } })), d = g.map.dancefloor;
  g.clock.paused = false; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0, vx: 0, vz: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  const spare = g.creatures.filter(q => !q.gone && !q.leashed && !q.boss && Math.hypot(q.x - g.witch.x, q.z - g.witch.z) > 100);
  const foxes = at.map((dx, i) => {
    const c = spare[i], x = g.witch.x + dx, z = g.witch.z;
    Object.assign(c, { circle: undefined, species: "fox", level: 1, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, boss: false, siege: undefined, rest: 0, asleep: undefined, napUntil: undefined, affection: undefined, fills: undefined });
    c.cell = [...g.map.cellSafe(x, z).cell] as [number, number];
    return c;
  });
  g.byArea = null;
  return { g, foxes };
}
function throwOne(g: Game, seconds = 1.5): number {
  const W = g.witches[0];
  let hits = 0;
  for (let i = 0; i < seconds / STEP; i++) {
    W.health.hp = 1e6;
    const c: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: i === 0, aimX: 1, aimZ: 0 };
    stepGame(g, c, STEP);
    hits += W.invites.events.filter(e => e.kind === "hit").length;
  }
  return hits;
}

describe("pierce", () => {
  it("at 0, a letter stops at the first it lands on; at 2, it lands on three, each once", () => {
    const row = () => [critter(0, 6), critter(1, 10), critter(2, 14), critter(3, 18)];
    const A0 = counting(); one(0, row(), A0); expect(A0.hits).toEqual([0]);
    const A2 = counting(); one(2, row(), A2); expect(A2.hits).toEqual([0, 1, 2]);
  });

  it("in the game: a pierce-2 letter fills one slot on each of three creatures, in the fade queue as a direct letter's", () => {
    const { g, foxes } = line(2, [6, 10, 14]);
    expect(throwOne(g)).toBe(3);
    const direct = line(0, [6]);
    expect(throwOne(direct.g)).toBe(1);
    for (const c of foxes) {
      expect(c.fills, `fox ${c.id}`).toHaveLength(1);
      expect(c.fills![0]).toBeGreaterThan(0);
      expect(c.fills![0]).toBeCloseTo(direct.foxes[0].fills![0], 9); // (the same share as a direct letter's)
    }
  });

  it("does to a stunned creature or one about to be stunned just what a direct letter does, then flies on", () => {
    const { g, foxes } = line(1, [6, 10]);
    // (each against its own direct letter, thrown at the same moment: one letter, then nothing to wait on, so creatures that
    // move in a fight, rules/combat/styles.ts, are where they were in both)
    const direct = [line(0, [6]), line(0, [10])];
    const ready = (G: Game, stunned: Creature | null, near: Creature | null) => {
      if (stunned) { stunned.affection = 1; stunned.affectionAt = G.clock.time; stun(stunned, G.clock.time, G.clock.time + 60); } // (stunned: her next 💌 converts it)
      if (near) { near.affection = 0.99; near.fills = [0.99]; near.affectionAt = G.clock.time; }
    };
    ready(g, foxes[0], foxes[1]); ready(direct[0].g, direct[0].foxes[0], null); ready(direct[1].g, null, direct[1].foxes[0]);
    expect(throwOne(g)).toBe(2);
    expect(throwOne(direct[0].g)).toBe(1); expect(throwOne(direct[1].g)).toBe(1);
    const D = [direct[0].foxes[0], direct[1].foxes[0]];
    for (const k of [0, 1]) {
      expect(stateOf(foxes[k]), `fox ${k}`).toBe(stateOf(D[k]));
      expect(!!foxes[k].leashed, `fox ${k}`).toBe(!!D[k].leashed);
      expect(!!foxes[k].dazed, `fox ${k}`).toBe(!!D[k].dazed);
      expect(foxes[k].affection ?? 0, `fox ${k}`).toBeCloseTo(D[k].affection ?? 0, 9);
    }
  });
});
