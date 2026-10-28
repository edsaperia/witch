// Combat as orbit slots (Ed, 2026-10-28: "make it and I'll test in gameplay"): no creature health. A creature's 💌 ring is its one
// measure: her 💌s fill its slots, and so does a blow from one of hers (an orbiting heart), a harder blow more of them (its damage
// over the creature's old health, so it takes as many blows to fill as it took to knock down); hearts drain as 💌s do. All its slots
// full, it's stunned (lying still, the slots held full): her next 💌 converts it; a hostile one (enraged, besieging) runs away
// instead, a free area legend sinks back to sleep. One of hers or a happy one takes 💧s from its enemies' blows the same way, and
// never sheds them but by a berry or a full heal (a befriending, a pickup, the party's end): all its slots 💧, it runs away for
// good. Rules only; render/inviteRing.ts and render/leash draw them.
import { type Creature } from "./creatures";
import { stateOf, STATES } from "./creatureStates";
import type { Tuning } from "./tuning";

/** How the slots drain (the 💌 meter's: the tuning's invites.drain and legends.partyDrain, states.json's drainDelay); and how long
 *  they hold before draining once they hold hearts (invites.heartHold: a fight's blows come seconds apart, through its lulls). */
export interface Drain { drain: number; drainDelay: number; legendDrain?: number; heartHold?: number }

/** The game's drain (as rules/game.ts affectionOf builds the meter's). */
export const drainOf = (t: Pick<Tuning, "invites" | "legends">): Drain => ({ drain: t.invites.drain ?? STATES.affection.drain, drainDelay: STATES.affection.drainDelay, legendDrain: t.legends.partyDrain, heartHold: t.invites.heartHold });

/** A share of the slots set at `at`, drained to `time`. */
export function drainedOf(c: Creature, value: number | undefined, at: number | undefined, time: number, M: Drain): number {
  if (!value || at === undefined) return 0;
  const idle = Math.max(0, time - at - (c.hearts ? Math.max(M.drainDelay, M.heartHold ?? 0) : M.drainDelay));
  return Math.max(0, value - idle * (c.boss && M.legendDrain !== undefined ? M.legendDrain : M.drain));
}

/** Its slots filled now (💌s and hearts together), and the hearts' share of them, 0..1; stunned, all of them. */
export function fillOf(c: Creature, time: number, M: Drain): { fill: number; hearts: number } {
  if (c.dazed) return { fill: 1, hearts: Math.min(1, c.hearts ?? 0) };
  const fill = drainedOf(c, c.affection, c.affectionAt, time, M);
  return { fill, hearts: Math.min(fill, drainedOf(c, c.hearts, c.affectionAt, time, M)) };
}

/** Its slots drained to now and set again from now (before a 💌 or a heart adds to them): hearts and 💌s drain together. */
export function rebase(c: Creature, time: number, M: Drain): number {
  const { fill, hearts } = fillOf(c, time, M);
  c.affection = fill || undefined; c.hearts = hearts || undefined; c.affectionAt = time;
  return fill;
}

/** Whether it takes 💧s rather than hearts: hers, or happy (a happy legend, a party animal). */
export const friendly = (c: Creature): boolean => c.leashed || stateOf(c) === "happy";
/** Whether a stun sends it running instead of lying stunned: enraged (a wave's besieger). */
export const hostile = (c: Creature): boolean => stateOf(c) === "enraged";

/** Hearts from a blow: `share` of its slots (damage over its old health). Returns whether they're all full now. */
export function addHearts(c: Creature, share: number, time: number, M: Drain): boolean {
  if (c.dazed) return true;
  const fill = rebase(c, time, M), add = Math.min(1 - fill, share);
  c.affection = fill + add; c.hearts = (c.hearts ?? 0) + add;
  return c.affection >= 1 - 1e-9;
}

/** 💧s from a blow: `share` of its slots, for good. Returns whether they're all full now. */
export function addDrops(c: Creature, share: number): boolean {
  c.drops = Math.min(1, (c.drops ?? 0) + share);
  return c.drops >= 1 - 1e-9;
}

/** All its slots full: stunned till `until`, lying still (nothing fights it), its slots held full; her next 💌 converts it. */
export function stun(c: Creature, time: number, until: number): void {
  c.dazed = true; c.dazedUntil = until; c.fight = undefined; c.moving = false; c.vx = 0; c.vz = 0;
  c.affection = 1; c.affectionAt = time;
}

/** Up again unconverted: wild as it was, its full slots draining from now. */
export function getUp(c: Creature, time: number): void {
  c.dazed = false; c.dazedUntil = undefined; c.affection = 1; c.affectionAt = time;
}

/** Runs away for good (a stunned hostile, a friend full of 💧s): off for the map's edge at a baby's run, its 💧 over it. */
export function runAway(c: Creature, out: { x: number; z: number }): void {
  c.fleeUntil = Infinity; c.fleeX = out.x; c.fleeZ = out.z; c.ranOff = true;
  c.fight = undefined; c.siege = undefined; c.enraged = false; c.dazed = false; c.dazedUntil = undefined;
}
