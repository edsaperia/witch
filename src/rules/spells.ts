// Spells (Ed, 2026-10-04): one spell is equipped per run, chosen from a list unlocked across runs
// (roguelike); the spell button casts it, then it recharges over its cooldown. The first is the
// speed boost: she moves much faster for a few seconds. (The list will grow: placed items such as
// a buff totem or a knockback bomb, speed boots, instant evolve.) No drawing here.
import type { Tuning } from "./tuning";

export type SpellId = "speed";
export const SPELLS: SpellId[] = ["speed"];

export interface SpellState {
  equipped: SpellId;
  /** Game time its effect ends (it's active before then). */
  activeUntil: number;
  /** Game time it can be cast again. */
  readyAt: number;
  /** Game time it was last cast. */
  castAt: number;
}

export function newSpells(t: Tuning): SpellState {
  const e = (SPELLS as string[]).includes(t.spells.equipped) ? (t.spells.equipped as SpellId) : "speed";
  return { equipped: e, activeUntil: -Infinity, readyAt: 0, castAt: -Infinity };
}

/** Cast the equipped spell if it's ready: returns whether it went off. */
export function castSpell(s: SpellState, time: number, t: Tuning): boolean {
  if (time < s.readyAt) return false;
  const S = t.spells.speed;
  s.castAt = time; s.activeUntil = time + S.duration; s.readyAt = s.activeUntil + S.cooldown;
  return true;
}

export const spellActive = (s: SpellState, time: number) => time < s.activeUntil;

/** How far it has recharged, 0 just cast to 1 ready (for the HUD ring). */
export function spellCharge(s: SpellState, time: number): number {
  if (time >= s.readyAt) return 1;
  const total = s.readyAt - s.castAt;
  return total > 0 ? Math.max(0, Math.min(1, (time - s.castAt) / total)) : 1;
}

/** How much faster she moves now: the speed boost's multiplier while it's on, easing off over its last half second. */
export function speedMultiplier(s: SpellState, time: number, t: Tuning): number {
  if (s.equipped !== "speed" || !spellActive(s, time)) return 1;
  const S = t.spells.speed, k = Math.min(1, (s.activeUntil - time) / 0.5);
  return 1 + (S.mult - 1) * k;
}
