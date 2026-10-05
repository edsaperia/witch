// The 💌 invite meter (issue #87; the interface agreed with the rendering builder there). Each 💌
// that lands on an invitable creature adds to its affection; higher levels need more hits
// (states.affection.hits); at most one 💌 counts every affection.gap seconds on any one creature;
// once hits stop it drains slowly. Full, a wild one becomes happy; a happy one (states.leash
// "again") is leashed to her. Enraged ones and legends stop 💌s dead. No drawing here.
import { LEGEND, type Creature } from "./creatures";
import { befriend, invitableNow, stateOf, STATES, type StatesData } from "./states";

/** What the meter needs of the game: the time, and leashing a happy creature to her. */
export interface AffectionWorld { time: number; leash: (c: Creature) => void }

/** A 💌 landed on creature c (amount 1 per letter, times any buff). Returns whether it counted. */
export function hit(g: AffectionWorld, c: Creature, amount: number, time: number = g.time, data: StatesData = STATES): boolean {
  if (!invitableNow(c, data)) return false;
  const A = data.affection;
  if (c.affectionAt !== undefined && time - c.affectionAt < A.gap) return false; // (one 💌 at a time per creature)
  const now = drained(c, time, data);
  c.affection = Math.min(1, now + amount / Math.max(1, A.hits[Math.min(c.level, A.hits.length - 1)]));
  c.affectionAt = time;
  if (c.affection >= 1 - 1e-9) {
    if (stateOf(c) === "happy") { c.affection = undefined; g.leash(c); }
    else befriend(c, time);
    return true;
  }
  return true;
}

/** The invite button held on a happy creature for dt seconds (states.leash "hold"): after
 *  holdTime seconds of it, it's leashed. Let go (a step without this call), it starts over.
 *  Returns whether it was leashed. */
export function hold(g: AffectionWorld, c: Creature, dt: number, time: number = g.time, data: StatesData = STATES): boolean {
  if (data.leash !== "hold" || c.leashed || c.gone || stateOf(c) !== "happy" || c.guard || c.boss) return false;
  c.holdT = (c.holdAt !== undefined && time - c.holdAt <= dt * 1.5 ? c.holdT ?? 0 : 0) + dt;
  c.holdAt = time;
  if (c.holdT < data.holdTime) return false;
  c.holdT = undefined; c.holdAt = undefined; g.leash(c);
  return true;
}

/** Whether a 💌 can affect c now (wild, or happy for its second step; not a legend, not gone). */
export const invitable = (c: Creature): boolean => invitableNow(c);

/** Whether c stops 💌s dead: enraged animals and legends (#87). */
export const blocksLetters = (c: Creature): boolean => !c.gone && (stateOf(c) === "enraged" || c.level === LEGEND || !!c.boss);

/** The meter for the view: affection 0..1 (draining), or null when there is none. */
export function affection(g: { time: number } | { clock: { time: number } }, c: Creature, data: StatesData = STATES): number | null {
  const time = "time" in g ? g.time : g.clock.time, a = drained(c, time, data);
  return a > 0 ? a : null;
}

/** Its affection now, after draining since its last hit. */
function drained(c: Creature, time: number, data: StatesData): number {
  if (!c.affection || c.affectionAt === undefined) return 0;
  const idle = time - c.affectionAt - data.affection.drainDelay;
  return Math.max(0, c.affection - Math.max(0, idle) * data.affection.drain);
}
