// The 💌 ring (Ed, 2026-10-06; render/inviteRing.ts) against the real meter (rules/affection.ts, as the game sets it up):
// its filled slots are the meter's hits, a full ring turns to hearts, and the drain drops envelopes one at a time.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { affectionOf, newGame, stepGame } from "../rules/game";
import { STATES, stateOf } from "../rules/creatureStates";
import type { Creature } from "../rules/creatures";
import { RingModel, ringOf, type RingChange } from "./inviteRing";

function setup(level: number) {
  const g = newGame(123, TUNING), A = affectionOf(g);
  const c = g.creatures.find(k => !k.boss && k.level < 3 && stateOf(k) === "wild")!;
  c.level = level as Creature["level"]; // (a baby, a young or an adult, whichever the map has to hand)
  const ring = (_time: number) => ringOf(c.level, A.affection(c), TUNING.invites.hits);
  return { g, A, c, ring, hits: TUNING.invites.hits[level] };
}

describe("the 💌 ring", () => {
  it("has a slot for every hit its level's meter takes, and its filled slots are the meter's hits", () => {
    for (const level of [0, 1, 2]) {
      const { g, A, c, ring, hits } = setup(level);
      expect(ring(0)).toEqual({ slots: hits, filled: 0 });
      for (let k = 1; k < hits; k++) {
        A.hit(c, TUNING.invites.amount, g.clock.time);
        expect(ring(g.clock.time), `level ${level}, hit ${k}`).toEqual({ slots: hits, filled: k });
      }
    }
  });

  it("joins one envelope a hit into the next gap, and a full ring turns to hearts as the creature is won over", () => {
    const { g, A, c, hits } = setup(1), M = new RingModel(), now = (k: Creature) => ringOf(k.level, A.affection(k), TUNING.invites.hits);
    const all: RingChange[] = [];
    for (let k = 1; k < hits; k++) {
      A.hit(c, TUNING.invites.amount, g.clock.time);
      const ch = M.update([c], now, []);
      expect(ch).toEqual([{ kind: "join", id: c.id, slot: k - 1, slots: hits }]);
      all.push(...ch);
    }
    // The last hit fills it: the creature is happy, its meter gone, and the whole ring goes to hearts.
    A.hit(c, TUNING.invites.amount, g.clock.time);
    expect(stateOf(c)).toBe("happy");
    expect(M.update([c], now, [c.id])).toEqual([{ kind: "hearts", id: c.id, slots: hits }]);
    expect(M.rings.has(c.id)).toBe(false);
    // Its second invite (happy to leashed): a fresh ring, filling the same way.
    A.hit(c, TUNING.invites.amount, g.clock.time);
    expect(M.update([c], now, [])).toEqual([{ kind: "join", id: c.id, slot: 0, slots: hits }]);
  });

  it("left alone, the meter drains and the envelopes drop out of orbit one at a time, last first, as it does", () => {
    const { g, A, c, hits } = setup(2), M = new RingModel(), now = (k: Creature) => ringOf(k.level, A.affection(k), TUNING.invites.hits);
    g.clock.paused = false;
    const n = 6;
    for (let k = 0; k < n; k++) A.hit(c, TUNING.invites.amount, g.clock.time);
    M.update([c], now, []);
    const drops: { slot: number; at: number }[] = [];
    for (let i = 0; i < 60 * 60 && drops.length < n; i++) {
      stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60);
      const ch = M.update([c], now, []);
      expect(ch.length, "at most one a frame").toBeLessThanOrEqual(1);
      for (const e of ch) { expect(e.kind).toBe("drop"); if (e.kind === "drop") drops.push({ slot: e.slot, at: g.clock.time }); }
      if (ch.length) expect(now(c).filled).toBe(n - drops.length); // (the ring is the meter)
    }
    expect(drops.map(d => d.slot)).toEqual([5, 4, 3, 2, 1, 0]);
    // Spaced out as the meter drains: about one hit's worth of drain apart.
    const gap = 1 / hits / STATES.affection.drain; // (the meter's own drain, states.json)
    for (let i = 1; i < drops.length; i++) expect(drops[i].at - drops[i - 1].at).toBeCloseTo(gap, 0);
  }, 60000);
});
