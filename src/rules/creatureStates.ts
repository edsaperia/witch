// Creature states (Ed, 2026-10-05; issue #87): wild, happy, leashed, enraged; config/states.json.
// "Nobody is being killed in this game; we are throwing a party, we're inviting everyone, some
// people don't get invites and so are offended." Who fights whom is one table (foes): leashed
// against wild and enraged, enraged against happy, and never one's own kind. The older flags
// (leashed, enraged, a happy legend) still say the same, and stateOf reads them, so the
// rest of the rules and the view keep working. No drawing here.
import raw from "../../config/states.json";
import { LEGEND, heal, type Creature, type CreatureState } from "./creatures";

/** A creature's state (its names: CREATURE_STATES, rules/creatures.ts). */
export type State = CreatureState;
export interface StatesData { affection: { hits: number[]; drain: number; drainDelay: number; gap: number; /** A legend's meter drains this share a second instead (the party-legend egg). */ legendDrain?: number }; /** The party-legend egg (tuning legends.partyEgg): a happy legend takes 💌s. */ partyEgg?: boolean; leash: "pickup" | "again" | "hold"; /** Seconds after the hearts before a happy one's rune can be picked up (leash "pickup"). */ pickupDelay: number; holdTime: number }
export const STATES = raw as unknown as StatesData;

/** A creature's state now. */
/** A dancer in the won night's conga (rules/win.ts: its place in the line, c.finale, 0 on; the woken legends' are negative). It
 *  follows her round home but is never on her leash again (Ed's playtest, 2026-10-26: "When conga animals are following me, they
 *  shouldn't be leashed to me - they just follow me"): no rune to pick up, no 💌 or chat takes it. */
export const inConga = (c: Creature): boolean => c.finale !== undefined && c.finale >= 0;

export function stateOf(c: Creature): State {
  if (c.leashed) return "leashed";
  if (c.state === "happy" || c.legendState === "happy") return "happy";
  if (c.enraged) return "enraged";
  return "wild";
}

/** Whether creatures in these two states fight (both ways): leashed against wild and enraged,
 *  enraged against happy. Wild and happy ignore each other; wild and enraged too. */
export function foes(a: State, b: State): boolean {
  // (compared directly, not as a joined "a|b" string: that made a string for every pair looked at, a fight's commonest
  // garbage; phase 2's GC audit)
  if (a === b) return false;
  if (a === "leashed") return b === "wild" || b === "enraged";
  if (b === "leashed") return a === "wild" || a === "enraged";
  return (a === "enraged" && b === "happy") || (a === "happy" && b === "enraged");
}

/** Whether a creature in this state goes for the witch: the wild (in or near its area) and the enraged. */
export const huntsWitch = (s: State) => s === "wild" || s === "enraged";

/** Invited: happy, for good (never enraged), whole again; it stays in its own area. */
export function befriend(c: Creature, time: number): void {
  c.state = "happy"; c.enraged = false; c.siege = undefined; c.fight = undefined; c.dazedUntil = undefined;
  c.affection = undefined; c.wanderTo = undefined; c.happyAt = time;
  heal(c, time);
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
  if (c.level === 0) return false; // Ed, 2026-10-31: "No, no baby is invitable", including the circle baby.
  if (c.asleep || c.bed) return false; // (asleep, or walking home to bed: rules/partyOver.ts)
  if (inConga(c)) return false; // (the won night's line: never hers again)
  if (c.swoop?.up) return false; // (a wild flyer up in the air, out of reach: 💌s pass under it; rules/movement.ts stepSwoop)
  if (data.partyEgg && partyEggOpen(c)) return true; // (the Easter egg: a happy legend takes 💌s, 100 of them)
  if (c.gone || c.leashed || (c.fleeUntil && !c.dazedUntil) || c.level === LEGEND || c.boss) return false;
  const s = stateOf(c);
  if (s === "wild") return !c.wanderTo;
  return s === "happy" && c.legendState !== "happy" && data.leash === "again";
}

/** The party-legend egg (Ed, 2026-10-06: "Maybe you should be able to turn a happy legend into a party legend with an
 *  absurd number of invites (100?) and then pick up its sigil but it's totally useless"): a happy legend (by a relic or its
 *  quest) not yet a party legend, free. Asleep, restless and angry ones still block 💌s. */
export const partyEggOpen = (c: Creature) => !!c.boss && c.legendState === "happy" && !c.partyLegend && !c.leashed && !c.gone;

/** Its 100th 💌: a party legend. It dances where it stands and fights no one; its
 *  legendary rune pops out at its feet. */
export function makePartyLegend(c: Creature, time: number): void {
  c.partyLegend = true; c.affection = undefined; c.affectionAt = undefined; c.happyAt = time;
  c.fight = undefined; c.dancing = true; c.anchorX = c.x; c.anchorZ = c.z;
}

/** Its sigil rune (Ed, 2026-10-06; states.leash "pickup"): a happy one carries its sigil as a rune on the ground at its
 *  feet, moving with it, from its hearts on; she leashes it by picking that up (E within leash.pickRadius: rules/leash.ts).
 *  None for those that can't be leashed: happy legends (and legends) only (Ed, 2026-10-06: "There are no more guards"; a
 *  legend circle's baby, once happy, carries one like any other). `time` given: whether it's ready yet
 *  (pickupDelay after the hearts); without, whether it has one at all (the view draws it popping out). */
export function hasRune(c: Creature, time?: number, data: StatesData = STATES): boolean {
  if (c.level === 0) return false; // Babies join at soundsystem conversion, through its loose sigils, never a personal rune.
  if (c.asleep || c.bed || inConga(c) || c.packHide) return false; // (hiding in a pack's lull, a shadow of itself: no rune till it's back, Ed 2026-10-29)
  if (c.atStone || c.loose) return false; // (its sigil in its stone's stack, or lying loose by its soundsystem: rules/stoneStacks.ts)
  if (c.partyLegend) { if (data.leash !== "pickup" || c.gone || c.leashed) return false; } // (a party legend's: the egg)
  else if (data.leash !== "pickup" || c.gone || c.leashed || c.boss || c.level === LEGEND || c.legendState === "happy" || stateOf(c) !== "happy") return false;
  return time === undefined || time >= (c.happyAt ?? -Infinity) + (data.pickupDelay ?? 0);
}

/** The nearest happy creature whose rune is ready within r of (x, z), or null. Its rune lies `south` metres south of it (+z,
 *  down the screen: a number, or each creature's own, rules/runeOffset.ts, as a parked one rests that far north of its placed sigil). */
export function runeNear(creatures: readonly Creature[], x: number, z: number, r: number, time: number, data: StatesData = STATES, south: number | ((c: Creature) => number) = 0): Creature | null {
  let best: Creature | null = null, bd = r;
  for (const c of creatures) {
    if (Math.abs(c.x - x) > r || !hasRune(c, time, data)) continue;
    const rz = c.z + (typeof south === "number" ? south : south(c));
    if (Math.abs(rz - z) > r) continue;
    const d = Math.hypot(c.x - x, rz - z);
    if (d <= bd) { bd = d; best = c; }
  }
  return best;
}

/** Happy ones in an area with a soundsystem enjoy the party (#87): they keep round it, dancing
 *  (the view dances them on the beat), and break off only to fight a siege (combat). */
export function danceAt(c: Creature, at: { x: number; z: number }, radius = 10): void {
  c.anchorX = at.x; c.anchorZ = at.z; c.range = radius; c.dancing = true;
}

