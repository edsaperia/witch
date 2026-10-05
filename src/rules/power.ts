// Fighting value (DESIGN.md, Balance; Ed, 2026-10-04: "some kind of measure of how powerful we
// think a player can get, and how quickly"). By Lanchester's square law a side's strength is the
// sum over its fighters of √(hp × dps): a young is worth 15.5, an adult 29, a legend 76, a baby 0.
// The side with more wins, with about √(big² − small²) left. Read by the debug overlay's power
// meter, the playtest log and the balance simulator (tools/balance). No drawing here.
import { COMBAT, strengthOf, type CombatData } from "./combat";
import type { Creature, Level } from "./creatures";

/** One fighter's value at full health: √(hp × dps) for its level (times its species' strength,
 *  which scales both: Ed, 2026-10-05). */
export const levelValue = (level: Level, data: CombatData = COMBAT, species?: string) => Math.sqrt(data.levels.hp[level] * data.levels.dps[level]) * (species ? strengthOf(species, level, data) : 1);

/** One fighter's value now: √(hp left × dps), so a hurt one counts for less. */
export const creatureValue = (c: Creature, data: CombatData = COMBAT) => { const m = strengthOf(c.species, c.level, data); return Math.sqrt(Math.max(0, c.hp ?? data.levels.hp[c.level] * m) * data.levels.dps[c.level] * m); };

/** A side's value: the sum of its fighters'. */
export const sideValue = (list: Iterable<Creature>, data: CombatData = COMBAT) => { let f = 0; for (const c of list) if (!c.gone) f += creatureValue(c, data); return f; };

/** What's left of the winner after a fight to the end, by the square law: √(a² − b²), 0 if b wins. */
export const lanchester = (a: number, b: number) => Math.sqrt(Math.max(0, a * a - b * b));

/** How many of each level, baby to legend. */
export function levelCounts(list: Iterable<Creature>): [number, number, number, number] {
  const n: [number, number, number, number] = [0, 0, 0, 0];
  for (const c of list) if (!c.gone) n[c.level]++;
  return n;
}

export interface PowerReport {
  /** The party's value: on the witches' leashes, and parked at sigils on the ground. */
  leashed: number;
  parked: number;
  /** Party animals by level (leashed and parked together). */
  counts: [number, number, number, number];
  /** Each siege still marching or fighting: the soundsystem's key, its besiegers' value and number, the soundsystem's health. */
  sieges: { key: string; value: number; count: number; hp: number }[];
  /** Every besieger's value together (survivors of won sieges merging on to the next). */
  marching: number;
}

/** The power meter: the party against the sieges, now. */
export function powerReport(creatures: readonly Creature[], witches: readonly { leash: { stack: number[]; placed: { id: number }[] } }[], sounds: ReadonlyMap<string, { hp: number }>): PowerReport {
  const onLeash: Creature[] = [], atSigil: Creature[] = [];
  for (const w of witches) {
    for (const id of w.leash.stack) onLeash.push(creatures[id]);
    for (const p of w.leash.placed) atSigil.push(creatures[p.id]);
  }
  const by = new Map<string, Creature[]>();
  for (const c of creatures) if (c.siege && !c.leashed && !c.gone && !c.fleeUntil && !c.wanderTo) { let l = by.get(c.siege); if (!l) by.set(c.siege, (l = [])); l.push(c); }
  const sieges = [...by].map(([key, l]) => ({ key, value: sideValue(l), count: l.length, hp: sounds.get(key)?.hp ?? 0 })).sort((a, b) => b.value - a.value);
  return { leashed: sideValue(onLeash), parked: sideValue(atSigil), counts: levelCounts([...onLeash, ...atSigil]), sieges, marching: sieges.reduce((a, s) => a + s.value, 0) };
}
