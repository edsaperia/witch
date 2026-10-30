// Shared simulation-state cues for sound and drawing; neither consumer owns the other's dependency.
import type { Game } from "./game";
import { LEGEND, type Creature, type CreatureState } from "./creatures";
import { cellKey } from "./party";

export type Look = CreatureState | "legend";
type WithState = Creature & { state?: CreatureState };
export function isHappy(c: Creature): boolean {
  const s = (c as WithState).state;
  if (s) return s === "happy";
  return !c.leashed && !!c.friendly;
}
export function lookOf(c: Creature): Look {
  if (c.boss || c.level === LEGEND) return c.leashed ? "leashed" : c.enraged ? "enraged" : "legend";
  const s = (c as WithState).state;
  if (s === "leashed" || c.leashed) return "leashed";
  if (s === "enraged" || c.enraged) return "enraged";
  return isHappy(c) ? "happy" : "wild";
}
export function dances(g: Game, c: Creature): boolean {
  if (c.asleep) return false;
  if (c.leashed || c.partyLegend) return true;
  return lookOf(c) === "happy" && g.party.areas.has(cellKey(c.cell)) && !g.combat.ruined.has(cellKey(c.cell)) && !c.fight;
}
export const bossBreath = (time: number, id: number, every: number) => 0.5 - 0.5 * Math.cos((time / Math.max(0.1, every) + (id % 7) / 7) * Math.PI * 2);
