// Creature states (Ed, 2026-10-05; issue #87): wild, happy, leashed, enraged; config/states.json.
// "Nobody is being killed in this game; we are throwing a party, we're inviting everyone, some
// people don't get invites and so are offended." Who fights whom is one table (foes): leashed
// against wild and enraged, enraged against happy, and never one's own kind. The older flags
// (leashed, enraged, a happy legend) still say the same, and stateOf reads them, so the
// rest of the rules and the view keep working. No drawing here.
import raw from "../../config/states.json";
import { LEGEND, type Creature } from "./creatures";

export type State = "wild" | "happy" | "leashed" | "enraged";
export interface StatesData { affection: { hits: number[]; drain: number; drainDelay: number; gap: number }; leash: "again" | "hold"; holdTime: number }
export const STATES = raw as unknown as StatesData;

/** A creature's state now. */
export function stateOf(c: Creature): State {
  if (c.leashed) return "leashed";
  if (c.state === "happy" || c.legendState === "happy") return "happy";
  if (c.enraged) return "enraged";
  return "wild";
}

/** Whether creatures in these two states fight (both ways): leashed against wild and enraged,
 *  enraged against happy. Wild and happy ignore each other; wild and enraged too. */
export function foes(a: State, b: State): boolean {
  if (a === b) return false;
  const p = a < b ? `${a}|${b}` : `${b}|${a}`;
  return p === "leashed|wild" || p === "enraged|leashed" || p === "enraged|happy";
}

/** Whether a creature in this state goes for the witch: the wild (in or near its area) and the enraged. */
export const huntsWitch = (s: State) => s === "wild" || s === "enraged";

/** Invited: happy, for good (never enraged), whole again; it stays in its own area. */
export function befriend(c: Creature, time: number): void {
  c.state = "happy"; c.enraged = false; c.siege = undefined; c.fight = undefined; c.dazedUntil = undefined;
  c.affection = undefined; c.wanderTo = undefined;
  if (c.hp !== undefined) { c.hp = undefined; c.healedAt = time; }
}

/** A wave put a soundsystem in its area: enraged (its invite meter lost). Happy ones, leashed ones and babies never are. */
export function enrage(c: Creature): boolean {
  // (Never a legend: soundsystems don't wake them (#87); they turn angry by their own rules, legends.ts.)
  if (c.leashed || c.level === 0 || c.boss || stateOf(c) === "happy") return false;
  c.enraged = true; c.state = "enraged"; c.affection = undefined; c.dazedUntil = undefined;
  return true;
}

/** Whether it can be invited now: a wild one (dazed or not; not a legend), or a happy one for its
 *  second step (states.leash). Enraged ones, legends and leashed ones can't. */
export function invitableNow(c: Creature, data: StatesData = STATES): boolean {
  if (c.gone || c.leashed || (c.fleeUntil && !c.dazedUntil) || c.level === LEGEND || c.boss) return false;
  const s = stateOf(c);
  if (s === "wild") return !c.wanderTo;
  return s === "happy" && c.legendState !== "happy" && data.leash === "again";
}

/** Happy ones in an area with a soundsystem enjoy the party (#87): they keep round it, dancing
 *  (the view dances them on the beat), and break off only to fight a siege (combat). */
export function danceAt(c: Creature, at: { x: number; z: number }, radius = 10): void {
  c.anchorX = at.x; c.anchorZ = at.z; c.range = radius; c.dancing = true;
}

/** Dazed (a knocked-down wild one, for tuning combat.daze seconds): nothing attacks it, it attacks nothing, it can be invited. */
export const dazed = (c: Creature, time: number) => c.dazedUntil !== undefined && time < c.dazedUntil;
