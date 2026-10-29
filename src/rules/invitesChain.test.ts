// Chain (Ed, 2026-10-29: "chain"; tuning invites.chain and chainRange, a bag's invitesAdd): a spent 💌 hops on to the nearest other
// invitable creature within chainRange, up to `chain` hops, each landing a hit through the same love as any letter's (the
// coordinator: a slot in c.fills, in the one fade queue, rules/orbit.ts); never to one it has landed on, nor a stunned one, and
// the creature it picks is by the letters' own invitable (Affection.invitable), not a copy.
import { describe, expect, it } from "vitest";
import { newInvites, stepInvites, type Affection } from "./invites";
import { TUNING, withTuning } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import type { Creature } from "./creatures";
import { stun } from "./orbit";

const her = { x: 0, z: 0, facing: 1 };
const critter = (id: number, x: number, z: number) => ({ id, species: "wolf", level: 1, x, z, leashed: false, gone: false }) as Creature;
function counting(no: number[] = []): Affection & { hits: number[]; asked: Set<number> } {
  const hits: number[] = [], asked = new Set<number>();
  return { hits, asked, invitable: c => { asked.add(c.id); return !no.includes(c.id); }, blocksLetters: () => false, hit: c => { hits.push(c.id); }, affection: () => null };
}
function one(chain: number, creatures: Creature[], A: Affection, chainRange = 10) {
  const t = withTuning({ invites: { ...TUNING.invites, chain, chainRange } }), s = newInvites();
  for (let i = 0, time = 0; i < 3 / STEP; i++, time += STEP) stepInvites(s, { fire: i === 0, aimX: 1, aimZ: 0 }, her, true, creatures, A, time, STEP, t);
  return s;
}

function scene(chain: number, at: [number, number][]): { g: Game; foxes: Creature[] } {
  const g = newGame(1000, withTuning({ invites: { ...TUNING.invites, chain }, spells: { ...TUNING.spells, bag: "satchel" } })), d = g.map.dancefloor;
  g.clock.paused = false; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0, vx: 0, vz: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  const spare = g.creatures.filter(q => !q.gone && !q.leashed && !q.boss && Math.hypot(q.x - g.witch.x, q.z - g.witch.z) > 100);
  const foxes = at.map(([dx, dz], i) => {
    const c = spare[i], x = g.witch.x + dx, z = g.witch.z + dz;
    Object.assign(c, { circle: undefined, species: "fox", level: 1, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, boss: false, siege: undefined, rest: 0, asleep: undefined, napUntil: undefined, affection: undefined, fills: undefined });
    c.cell = [...g.map.cellSafe(x, z).cell] as [number, number];
    return c;
  });
  g.byArea = null;
  return { g, foxes };
}
function throwOne(g: Game, seconds = 2): number {
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

describe("chain", () => {
  const spread = () => [critter(0, 8, 0), critter(1, 8, 6), critter(2, 14, 6), critter(3, 40, 30)];
  it("at 0, a letter stops at the first it lands on; at 2, it hops on to the next nearest twice, each once, none beyond chainRange", () => {
    const A0 = counting(); one(0, spread(), A0); expect(A0.hits).toEqual([0]);
    const A2 = counting(); one(2, spread(), A2); expect(A2.hits).toEqual([0, 1, 2]);
    const A9 = counting(); one(9, spread(), A9); expect(A9.hits).toEqual([0, 1, 2]); // (the far one out of every hop's reach)
    const Ashort = counting(); one(2, spread(), Ashort, 4); expect(Ashort.hits).toEqual([0]);
  });

  it("picks the next by the letters' own invitable: one the Affection says no to is never hopped to", () => {
    const A = counting([1]); one(2, spread(), A);
    expect(A.hits).toEqual([0, 2]); // (1 refused: on from 0 to 2, 2 m further, instead)
    expect(A.asked.has(1)).toBe(true);
  });

  it("in the game: a chain-2 letter fills one slot on each of three creatures, each as a direct letter's", () => {
    const { g, foxes } = scene(2, [[8, 0], [8, 6], [14, 6]]);
    expect(throwOne(g)).toBe(3);
    const direct = scene(0, [[8, 0]]);
    expect(throwOne(direct.g)).toBe(1);
    for (const c of foxes) {
      expect(c.fills, `fox ${c.id}`).toHaveLength(1);
      expect(c.fills![0]).toBeCloseTo(direct.foxes[0].fills![0], 9);
    }
  });

  it("never hops to a stunned creature, and fills one about to be stunned no further than a direct letter", () => {
    const { g, foxes } = scene(2, [[8, 0], [8, 4], [8, -7]]);
    stun(foxes[1], g.clock.time, g.clock.time + 60); // (nearest to the first, but stunned: passed by)
    foxes[2].affection = 0.99; foxes[2].fills = [0.99]; foxes[2].affectionAt = g.clock.time;
    const direct = scene(0, [[8, 0]]);
    direct.foxes[0].affection = 0.99; direct.foxes[0].fills = [0.99]; direct.foxes[0].affectionAt = direct.g.clock.time;
    throwOne(g);
    throwOne(direct.g);
    expect(foxes[1].dazed).toBe(true); expect(!!foxes[1].leashed).toBe(false); expect(foxes[1].affection).toBe(1); // (untouched)
    expect(foxes[0].fills).toHaveLength(1);
    expect(foxes[2].fills).toEqual(direct.foxes[0].fills);
    expect(!!foxes[2].dazed).toBe(!!direct.foxes[0].dazed);
  });
});
