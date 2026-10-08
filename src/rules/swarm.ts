// An area's hostile swarm (Ed, 2026-10-08, the swarm plan's phase 1): its own young and adults, the ones a wave enrages and
// sets marching on a soundsystem. Its challenge grows with the area's place in the runestone order (p, 0 at the first stone,
// 1 at the last), and picking a species never changes it: "Our goal is to be able to have any species at any point along the
// wave and create a swarm that is close to the challenge we want. The fixed points are creature number caps."
//
// - Classes (population.swarm.classes): strong (cap 6), medium (cap 12, every species not listed) and light (cap 16; Ed: "a
//   swarm of 20 is too many; cap it at 16"). A class's strength is 12 / its cap (strong ×2, light ×0.75), on each creature's
//   health and damage (rules/combat/data.ts classStrengths), so moving a species is one line of the tuning file.
// - estimatedPower: Σhp × Σdps of the swarm (young 45 hp and 3 dps, adults 160 and 10, times strength). The witch doesn't
//   count (her three hits ignore damage): siegeDps (Σdps) and witchThreat (how many) are reported beside it.
// - powerOf: the one source the builder reads, config/swarm-power.json's simulated power where it has the swarm, else the
//   estimate (phase 1: the file is empty).
// - targetPower(p): the estimated power of a medium reference swarm of n(p) = start + (endAverage − start)·p^curve creatures
//   (1 + 11·p^1.3), its young share easing from youngShare[0] (1.0) to youngShare[1] (0.2).
// - buildSwarm: of every size up to the species' cap (scaled along the same curve, capScales) and every young/adult split,
//   the nearest the target; among those within mixTolerance of the nearest, a mix of young and adults first (Ed: "one adult +
//   one youth is better than 4 youths even if they're the same difficulty"), then the nearest. No drawing here.
import SIM from "../../config/swarm-power.json";
import { COMBAT, strengthOf, type CombatData } from "./combat";

/** A class of species: its cap at the last runestone and its members. */
export interface SwarmClass { cap: number; species: string[] }
/** population.swarm: the challenge curve, the classes and the builder's mix rule. */
export interface SwarmTuning {
  /** The reference swarm's size at the first runestone. */
  start: number;
  /** Its size at the last (the end of the game): what a medium species fields there, the swarms' average. */
  endAverage: number;
  /** The size curve's power k: n(p) = start + (endAverage − start)·p^k. */
  curve: number;
  /** The reference swarm's young share at the first runestone and at the last (the rest adults). */
  youngShare: number[];
  /** The class every species not listed is in, and whose cap the strengths are reckoned from. */
  reference: string;
  /** The classes, by name. */
  classes: Record<string, SwarmClass>;
  /** Each species' cap grows along the curve too (its cap × n(p) / endAverage, rounded up, at least 2), so early swarms stay small. */
  capScales: boolean;
  /** How far (as a share of the target) past the nearest swarm a mixed one may come and still be chosen over it. */
  mixTolerance: number;
}

/** The simulated power table (config/swarm-power.json): by species, by size, by its number of young. */
export interface PowerTable { version: number; species: Record<string, Record<string, number[]>>; meta?: unknown }
export const POWER_TABLE: PowerTable = SIM as PowerTable;

/** How far along the route (0 the first runestone, 1 the last) an area at route index `index` of `length` is. */
export const routeShare = (index: number, length: number): number => Math.max(0, Math.min(1, (index - 1) / Math.max(1, length - 1)));

/** The reference swarm at route share `p`: its size (fractional) and young share. */
export function referenceAt(p: number, S: SwarmTuning): { size: number; young: number } {
  const t = Math.max(0, Math.min(1, p)), y0 = S.youngShare[0] ?? 0.5, y1 = S.youngShare[S.youngShare.length - 1] ?? y0;
  return { size: S.start + (S.endAverage - S.start) * Math.pow(t, Math.max(0.01, S.curve)), young: y0 + (y1 - y0) * t };
}

/** A species' class (the reference class if none lists it). */
export function classOf(species: string, S: SwarmTuning): string {
  for (const [name, c] of Object.entries(S.classes)) if (c.species.includes(species)) return name;
  return S.reference;
}
/** A species' cap at the last runestone. */
export const capOf = (species: string, S: SwarmTuning): number => Math.max(1, Math.floor(S.classes[classOf(species, S)]?.cap ?? 12));
/** Its cap at route share `p` (capScales: grown along the curve, at least 2 so a mix is possible). */
export function capAt(species: string, p: number, S: SwarmTuning): number {
  const cap = capOf(species, S);
  return S.capScales ? Math.min(cap, Math.max(2, Math.ceil((cap * referenceAt(p, S).size) / Math.max(1, S.endAverage)))) : cap;
}

/** A swarm's totals: hp, siegeDps (Σdps, against soundsystems and party animals) and witchThreat (how many: her hits ignore
 *  damage). (null species: a strength-1 kind; fractional counts allowed, for the reference.) */
export function swarmTotals(species: string | null, young: number, adults: number, data: CombatData = COMBAT): { hp: number; siegeDps: number; witchThreat: number } {
  const m = species ? strengthOf(species, 1, data) : 1;
  return { hp: (young * data.levels.hp[1] + adults * data.levels.hp[2]) * m, siegeDps: (young * data.levels.dps[1] + adults * data.levels.dps[2]) * m, witchThreat: young + adults };
}

/** The estimate: Σhp × Σdps. */
export function estimatedPower(species: string | null, young: number, adults: number, data: CombatData = COMBAT): number {
  const t = swarmTotals(species, young, adults, data);
  return t.hp * t.siegeDps;
}

/** A swarm's power, the builder's one source: the simulated table's where it has the swarm, else the estimate. */
export function powerOf(species: string, young: number, adults: number, table: PowerTable = POWER_TABLE, data: CombatData = COMBAT): number {
  const v = table.species[species]?.[String(young + adults)]?.[young];
  return typeof v === "number" && Number.isFinite(v) ? v : estimatedPower(species, young, adults, data);
}

/** The challenge at route share `p`: the reference swarm's estimated power (a strength-1, medium kind). */
export function targetPower(p: number, S: SwarmTuning, data: CombatData = COMBAT): number {
  const { size, young } = referenceAt(p, S), y = size * young;
  return estimatedPower(null, y, size - y, data);
}

/** An area of `species` at route share `p`: [young, adults] (see the top of this file). */
export function buildSwarm(p: number, S: SwarmTuning, species: string, table: PowerTable = POWER_TABLE, data: CombatData = COMBAT): [number, number] {
  const target = targetPower(p, S, data), cap = capAt(species, p, S), all: { y: number; a: number; err: number }[] = [];
  for (let n = target > 0 ? 1 : 0; n <= cap; n++) for (let y = 0; y <= n; y++) // (none only where the target is nothing: minHostile then decides)
    all.push({ y, a: n - y, err: Math.abs(powerOf(species, y, n - y, table, data) - target) / Math.max(1e-9, target) });
  const best = Math.min(...all.map(c => c.err)), near = all.filter(c => c.err <= best + Math.max(0, S.mixTolerance) + 1e-9);
  const mixed = (c: { y: number; a: number }) => c.y + c.a < 2 || (c.y > 0 && c.a > 0);
  near.sort((p, q) => Number(mixed(q)) - Number(mixed(p)) || p.err - q.err || p.y + p.a - (q.y + q.a));
  return [near[0].y, near[0].a];
}
