// Openings (?skill=1; docs/plans/combat-skill-and-commands.md, section 1): moments when a wild creature is easier to hit. A letter is
// always one hit (Ed, 2026-11-17: "I don't think one letter should ever count for more than one hit. A hit is a letter. But e.g. a
// buff could make you shoot twice as fast, or slow or daze a creature down so that it's easier to hit"), so nothing here changes what
// a letter is worth: a creature sits still after it attacks (generalising the hare's sit, tuning hareStamp.sit), letters wear down its
// poise and, broken, it staggers (stands still; a wind-up is cancelled) and is dazed (slowed) a while after. Which openings a species
// has, and how strong, are its profile's (config/combat-skill.json; Ed: "can vary by creature"). Pure: state lives on the creature.
import type { Creature } from "../creatures";
import type { Tuning } from "../tuning";
import { openingsOf, PROFILED } from "./profile";

/** Whether the openings are on (?skill=1: tuning skill.on). */
export const skillOn = (t: Pick<Tuning, "skill">): boolean => !!t.skill?.on;

const wild = (c: Creature) => !c.leashed && !c.boss && c.level >= 1 && c.level <= 2 && PROFILED.includes(c.species);

/** Its attack let go (rules/combat/release.ts; a lunge at its end, rules/combat/lunge.ts): it sits still its profile's sit.time,
 *  when its sit.after covers this attack (`melee`: a lunge or a blow). Returns whether it sat. */
export function sitAfter(c: Creature, melee: boolean, time: number, t: Pick<Tuning, "skill">): boolean {
  if (!skillOn(t) || !wild(c)) return false;
  const S = openingsOf(c.species).sit;
  if (S.time <= 0 || (S.after === "melee" && !melee) || (S.after === "ranged" && melee)) return false;
  c.sitUntil = Math.max(c.sitUntil ?? 0, time + S.time); c.vx = 0; c.vz = 0; c.moving = false;
  return true;
}

/** A letter landed on it (rules/affection.ts hit, after it counted as its one hit): it wears its poise (more in a wind-up); broken, it
 *  staggers (stands still, its wind-up cancelled) and is dazed (slowed) after. `hits`, its meter's letters (invites.hits by level). */
export function poiseHit(c: Creature, time: number, hits: number, t: Pick<Tuning, "skill">): boolean {
  if (!skillOn(t) || !wild(c) || c.dazed) return false;
  const O = openingsOf(c.species), P = O.poise;
  if (P.share <= 0) return false;
  const was = c.poise ?? { left: 1, at: time };
  const regen = P.regenTime > 0 ? Math.max(0, time - was.at - P.regenDelay) / P.regenTime : 1;
  const windup = !!c.fight && c.fight.windupUntil > time;
  const left = Math.min(1, was.left + regen) - (windup ? P.windup : 1) / Math.max(1, P.share * hits);
  if (left > 1e-9 || (was.immuneUntil !== undefined && time < was.immuneUntil)) { c.poise = { left: Math.max(0, left), at: time, immuneUntil: was.immuneUntil }; return false; }
  // Broken: a stagger, then a daze; poise full again, and it can't break again for stagger.immune seconds.
  const S = O.stagger, until = time + S.time;
  c.stunUntil = Math.max(c.stunUntil ?? 0, until); c.vx = 0; c.vz = 0; c.moving = false;
  if (S.cancels && c.fight && windup) { c.fight.windupUntil = 0; c.fight.spellCast = undefined; c.fight.spellCasts = undefined; c.fight.aim = undefined; }
  if (O.daze.time > 0) c.slowUntil = Math.max(c.slowUntil ?? 0, until + O.daze.time);
  c.poise = { left: 1, at: time, immuneUntil: until + S.immune };
  return true;
}

/** How open it is now, for the view's glint (0 none; 0.3 winding up, where letters wear its poise faster; 0.6 dazed; 1 sitting or
 *  staggered). */
export function openness(c: Creature, time: number, t: Pick<Tuning, "skill">): number {
  if (!skillOn(t) || !wild(c) || c.gone || c.dazed) return 0;
  if ((c.stunUntil !== undefined && time < c.stunUntil) || (c.sitUntil !== undefined && time < c.sitUntil)) return 1;
  if (c.slowUntil !== undefined && time < c.slowUntil) return 0.6;
  if (c.fight && c.fight.windupUntil > time && openingsOf(c.species).poise.windup > 1) return 0.3;
  return 0;
}
