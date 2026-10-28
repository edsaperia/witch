// Combat as orbit slots (Ed, 2026-10-28: "make it and I'll test in gameplay"): no creature health. A creature's 💌 ring is its one
// measure: her 💌s fill its slots, and so does a blow from one of hers (an orbiting heart), a harder blow more of them (its damage
// over combat.json levels.stun, a full ring's worth: set to start at the old health, so a creature first took as many blows to fill
// as it took to knock down; only a starting calibration, for balance passes to tune, Ed 2026-10-28); hearts drain as 💌s do, in one queue with them. All its slots
// full, it's stunned (lying still, the slots held full): her next 💌 converts it; a hostile one (enraged, besieging) runs away
// instead, a free area legend sinks back to sleep. One of hers or a happy one takes 💧s from its enemies' blows the same way, and
// never sheds them but by a berry or a full heal (a befriending, a pickup, the party's end): all its slots 💧, it runs away for
// good. Rules only; render/inviteRing.ts and render/leash draw them.
import { type Creature } from "./creatures";
import { runOff } from "./runaway";
import { stateOf, STATES } from "./creatureStates";
import type { Tuning } from "./tuning";

/** How the slots drain (the 💌 meter's: the tuning's invites.drain and legends.partyDrain, states.json's drainDelay): hearts the same
 *  as 💌s (Ed, 2026-10-28: "this should be the same speed as 💌s fade ... and they go in the same fade 'queue'"). */
export interface Drain { drain: number; drainDelay: number; legendDrain?: number }

/** The game's drain (as rules/game.ts affectionOf builds the meter's). */
export const drainOf = (t: Pick<Tuning, "invites" | "legends">): Drain => ({ drain: t.invites.drain ?? STATES.affection.drain, drainDelay: STATES.affection.drainDelay, legendDrain: t.legends.partyDrain });

/** Takes `d` off the queue's newest end. */
function shed(q: number[], d: number): void {
  while (d > 1e-12 && q.length) {
    const v = q[q.length - 1], a = Math.abs(v);
    if (a <= d) { q.pop(); d -= a; } else { q[q.length - 1] = Math.sign(v) * (a - d); d = 0; }
  }
}

/** Its slots as set at affectionAt: one queue in the order they came, + a 💌's share, − a heart's (c.fills), squared with its
 *  affection (set straight on it elsewhere: the newest shed, or the rest 💌s). */
function queued(c: Creature): number[] {
  const a = c.affection ?? 0, q = c.fills ? [...c.fills] : [], t = q.reduce((s, v) => s + Math.abs(v), 0);
  if (t < a - 1e-9) q.push(a - t); else shed(q, t - a);
  return q;
}

/** Its slots now, oldest first (+ 💌, − heart): one queue, draining from its newest end as the ring's top slot falls first (the
 *  💌 ring's own order, render/inviteRing.ts), whichever kind each is; stunned, held full. */
export function fillsOf(c: Creature, time: number, M: Drain): number[] {
  const q = queued(c);
  if (c.dazed || c.affectionAt === undefined) return q;
  shed(q, Math.max(0, time - c.affectionAt - M.drainDelay) * (c.boss && M.legendDrain !== undefined ? M.legendDrain : M.drain));
  return q;
}

/** Its slots filled now (💌s and hearts together), and the hearts' share of them, 0..1; stunned, all of them. */
export function fillOf(c: Creature, time: number, M: Drain): { fill: number; hearts: number } {
  const q = fillsOf(c, time, M), hearts = Math.min(1, q.reduce((s, v) => s + (v < 0 ? -v : 0), 0));
  return { fill: c.dazed ? 1 : Math.min(1, q.reduce((s, v) => s + Math.abs(v), 0)), hearts };
}

/** Its slots drained to now and set again from now (before a 💌 or a heart joins them). */
export function rebase(c: Creature, time: number, M: Drain): number {
  const q = fillsOf(c, time, M), fill = Math.min(1, q.reduce((s, v) => s + Math.abs(v), 0));
  c.affection = fill || undefined; c.fills = q.length ? q : undefined; c.affectionAt = time;
  return fill;
}

/** 💌s or hearts (`heart`) joining its queue: `share` of its slots, to full at most. Returns its fill now. */
function join(c: Creature, share: number, heart: boolean, time: number, M: Drain): number {
  const fill = rebase(c, time, M), add = Math.min(1 - fill, share);
  if (add > 0) { c.fills = [...(c.fills ?? []), heart ? -add : add]; c.affection = fill + add; }
  return fill + Math.max(0, add);
}

/** A 💌's share of its slots joining them (rules/affection.ts). Returns its fill now. */
export const addLetters = (c: Creature, share: number, time: number, M: Drain): number => join(c, share, false, time, M);

/** Whether it takes 💧s rather than hearts: hers, or happy (a happy legend, a party animal). */
export const friendly = (c: Creature): boolean => c.leashed || stateOf(c) === "happy";
/** Whether a stun sends it running instead of lying stunned: enraged (a wave's besieger). */
export const hostile = (c: Creature): boolean => stateOf(c) === "enraged";

/** Hearts from a blow: `share` of its slots (damage over its full ring's worth, combat.json levels.stun). Returns whether they're all full now. */
export function addHearts(c: Creature, share: number, time: number, M: Drain): boolean {
  if (c.dazed) return true;
  return join(c, share, true, time, M) >= 1 - 1e-9;
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

/** Runs away for good (a stunned hostile, a friend full of 💧s): off for its spot on the beach (rules/runaway.ts runOff; none, `exit`,
 *  the map's edge) at a baby's run, its 💧 over it. */
export function runAway(c: Creature, spot: { x: number; z: number } | null, exit: () => { x: number; z: number }): void {
  runOff(c, spot, exit); c.ranOff = true;
  c.fight = undefined; c.siege = undefined; c.enraged = false; c.dazed = false; c.dazedUntil = undefined;
}
