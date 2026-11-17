// Charges (?commands=1; docs/plans/combat-skill-and-commands.md, section 3): a creature's berry pips are its command's charges. Ed,
// 2026-11-17: "a berry fills a meter, which has several charges"; "I think the current buff 'draining' system will be superseded by
// more deliberate charge uses" (no draining: they go only when used); "Berries could give 3-6 charges each, all depending on how
// big/long/strong the action is"; "both youths and adults and legends should have actions; each level has a stronger action and more
// charges. If you fill a youth's charge bar and then give it another berry, it evolves to an adult." Each level's max, perBerry and
// start are its profile's (rules/skill/profile.ts). A legend never eats: its charges never run out (Ed: unlimited, a longer
// cooldown). Babies have none. Pure: the counts live in the berries' state (BerryState.charges).
import { LEGEND } from "../creatureLevels";
import type { Creature } from "../creatures";
import type { Tuning } from "../tuning";
import { commandOf, type Command } from "../skill/profile";

/** Whether commands are on (?commands=1: tuning commands.on). */
export const commandsOn = (t: Pick<Tuning, "commands">): boolean => !!t.commands?.on;

/** Its command now, with commands on: null for a baby, a kind with none, or one not hers. */
export const commandNow = (c: Pick<Creature, "species" | "level"> | undefined, t: Pick<Tuning, "commands">): Command | null =>
  c && commandsOn(t) ? commandOf(c.species, c.level) : null;

type Charges = { charges?: Map<number, number> };

/** Charges it holds (a legend: Infinity; none kept yet: its level's start), never over its level's max. */
export function chargesOf(s: Charges, c: Pick<Creature, "id" | "species" | "level">, t: Pick<Tuning, "commands">): number {
  const K = commandNow(c, t);
  if (!K) return 0;
  if (c.level >= LEGEND) return Infinity;
  return Math.max(0, Math.min(K.max, s.charges?.get(c.id) ?? K.start));
}

/** Berries it could eat for its charges (rules/berries.ts feedRoom, before a hurt one's extra): an adult's to fill its bar; a youth's
 *  to fill its bar and one more, which evolves it; null when commands don't decide (off, or a kind with no command: the old rule). */
export function chargeRoom(s: Charges, c: Creature, t: Pick<Tuning, "commands">): number | null {
  const K = commandNow(c, t);
  if (!K || c.level < 1) return null;
  if (c.level >= LEGEND) return 0;
  const short = Math.max(0, K.max - chargesOf(s, c, t)), fill = Math.ceil(short / Math.max(1, K.perBerry));
  return c.level === 1 ? fill + 1 : fill;
}

/** A berry eaten (rules/berries.ts feed, after a hurt one's heal): its level's perBerry charges, up to its max; a youth already full
 *  evolves instead ("evolve": the caller starts it on the bar line). null when commands don't decide. */
export function feedCharges(s: Charges, c: Creature, t: Pick<Tuning, "commands">): "charged" | "evolve" | null {
  const K = commandNow(c, t);
  if (!K || c.level < 1 || c.level >= LEGEND) return null;
  const now = chargesOf(s, c, t);
  if (c.level === 1 && now >= K.max) return "evolve";
  (s.charges ??= new Map()).set(c.id, Math.min(K.max, now + K.perBerry));
  return "charged";
}

/** One charge spent (a legend's never run out). Returns whether it had one. */
export function spendCharge(s: Charges, c: Creature, t: Pick<Tuning, "commands">): boolean {
  const n = chargesOf(s, c, t);
  if (n < 1) return false;
  if (Number.isFinite(n)) (s.charges ??= new Map()).set(c.id, n - 1);
  return true;
}
