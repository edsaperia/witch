// An area's hostile swarm (Ed, 2026-10-08): its own young and adults, the ones a wave enrages and sets marching on a
// soundsystem. Its challenge grows with the area's place in the runestone order, the last runestone being the end of the game,
// and picking a species never changes it: "Our goal is to be able to have any species at any point along the wave and create a
// swarm that is close to the challenge we want. The fixed points are creature number caps."
//
// Two measures of a swarm's power (Ed: "simple power and simulated power"):
// - estimatedPower: Σhp × Σdps of the swarm (each creature's level hp and dps times its species' strength, combat.json): its
//   Lanchester fighting strength against party animals and soundsystems. The witch doesn't count (Ed: "The witch only ever
//   takes three hits and doesn't care about damage; damage is only creature vs creature vs soundsystem"): her danger is the
//   swarm's count and how often it swings, reported beside it.
// - simulatedPower: measured in a headless sim of real swarms on the real combat rules (config/swarm-power.json, Balance 2's),
//   by species, size and young share, in the same units; where it has no measurement, estimatedPower stands in.
// The challenge curve (targetPower) is the power of a reference swarm of a strength-1 kind: population.swarm's size curve
// (start at the first runestone to endAverage at the last, along curve) and young share (youngShare[0] to [1]). The builder
// (buildSwarm) gives each area of a species the size, within its cap (swarm.caps), and young share whose power comes nearest
// that, preferring a mix of young and adults (Ed: "one adult + one youth is better than 4 youths even if they're the same
// difficulty"). No drawing here.
import SIM from "../../config/swarm-power.json";
import { COMBAT, strengthOf, type CombatData } from "./combat";

/** population.swarm: the challenge curve and the caps. */
export interface SwarmTuning {
  /** The reference swarm's size at the first runestone. */
  start: number;
  /** The reference swarm's size at the last runestone (the end of the game): what an average species fields there. */
  endAverage: number;
  /** The curve from start to end: the route's share run, to this power (1 a straight line, more slower at first). */
  curve: number;
  /** The reference swarm's young share at the first runestone and at the last (the rest adults). */
  youngShare: number[];
  /** The most hostiles an area of a species fields (Ed: "The fixed points are creature number caps"), by species, else default. */
  caps: Record<string, number>;
  /** How far from the target (as a share of it) a swarm may come and still be chosen over the nearest one, so a mix of young
   *  and adults wins (Ed: prefer "a mix of youth vs adult"); the nearest is taken where none is this near. */
  tolerance: number;
  /** Among those, how much a swarm's young share away from the reference's counts against it, beside its distance from the
   *  target (both shares). */
  shareWeight: number;
}

/** The simulated power table (config/swarm-power.json). */
export interface PowerTable {
  version: number;
  youngShares: number[];
  species: Record<string, { sizes: number[]; power: number[][] }>;
  reference?: { sizes: number[]; power: number[][] };
}

export const POWER_TABLE: PowerTable = SIM as PowerTable;

/** How far along the route (0 the first runestone, 1 the last) an area at route index `index` of `length` is. */
export const routeShare = (index: number, length: number): number => Math.max(0, Math.min(1, (index - 1) / Math.max(1, length - 1)));

/** The reference swarm at route share `f`: its size (fractional) and young share. */
export function referenceAt(f: number, S: SwarmTuning): { size: number; young: number } {
  const t = Math.max(0, Math.min(1, f)), k = Math.pow(t, Math.max(0.01, S.curve));
  const y0 = S.youngShare[0] ?? 0.5, y1 = S.youngShare[S.youngShare.length - 1] ?? y0;
  return { size: S.start + (S.endAverage - S.start) * k, young: y0 + (y1 - y0) * t };
}

/** A swarm's hp and dps (levels' young and adult, times its species' strength). */
export function swarmTotals(species: string | null, young: number, adults: number, data: CombatData = COMBAT): { hp: number; dps: number; count: number } {
  const m = species ? strengthOf(species, 1, data) : 1;
  return { hp: (young * data.levels.hp[1] + adults * data.levels.hp[2]) * m, dps: (young * data.levels.dps[1] + adults * data.levels.dps[2]) * m, count: young + adults };
}

/** The cheap measure: Σhp × Σdps. (null species: a strength-1 kind; fractional counts allowed, for the reference.) */
export function estimatedPower(species: string | null, young: number, adults: number, data: CombatData = COMBAT): number {
  const t = swarmTotals(species, young, adults, data);
  return t.hp * t.dps;
}

/** The measured power of a swarm of `young` and `adults` from a table entry: its size measured, its young share between the
 *  grid's points by a straight line; null where the size wasn't measured. */
function fromTable(e: { sizes: number[]; power: number[][] } | undefined, shares: number[], young: number, adults: number): number | null {
  const n = young + adults, i = e ? e.sizes.indexOf(n) : -1;
  if (!e || i < 0 || n <= 0) return null;
  const row = e.power[i], y = young / n;
  if (!row || row.length !== shares.length) return null;
  for (let j = 1; j < shares.length; j++) if (y <= shares[j] + 1e-9) { const a = shares[j - 1], b = shares[j], k = b > a ? (y - a) / (b - a) : 0; return row[j - 1] + (row[j] - row[j - 1]) * k; }
  return row[row.length - 1];
}

/** A swarm's power for building: the simulated table's where it has the measurement, else estimatedPower. */
export function swarmPower(species: string, young: number, adults: number, table: PowerTable = POWER_TABLE, data: CombatData = COMBAT): number {
  return fromTable(table.species[species], table.youngShares, young, adults) ?? estimatedPower(species, young, adults, data);
}

/** The challenge at route share `f`: the reference swarm's power (the table's reference measurement where it has one). */
export function targetPower(f: number, S: SwarmTuning, table: PowerTable = POWER_TABLE, data: CombatData = COMBAT): number {
  const { size, young } = referenceAt(f, S), y = size * young, a = size - y;
  return (Number.isInteger(size) ? fromTable(table.reference, table.youngShares, Math.round(y), Math.round(a)) : null) ?? estimatedPower(null, y, a, data);
}

/** A species' cap (swarm.caps, else its default). */
export const capOf = (species: string, S: SwarmTuning): number => Math.max(1, Math.floor(S.caps[species] ?? S.caps.default ?? 12));

/** An area of `species` at route share `f`: [young, adults]. Of every size up to its cap and every young/adult split, those
 *  within tolerance of the target (else the nearest); among them a mix of young and adults first, then the least distance
 *  from the target plus shareWeight times the young share's from the reference's, then the smaller. */
export function buildSwarm(f: number, S: SwarmTuning, species: string, table: PowerTable = POWER_TABLE, data: CombatData = COMBAT): [number, number] {
  const target = targetPower(f, S, table, data), ref = referenceAt(f, S).young, cap = capOf(species, S);
  const all: { y: number; a: number; err: number }[] = [];
  for (let n = 0; n <= cap; n++) for (let y = 0; y <= n; y++) // (none, where the target is nothing: minHostile then decides)
    all.push({ y, a: n - y, err: Math.abs(swarmPower(species, y, n - y, table, data) - target) / Math.max(1e-9, target) });
  const best = Math.min(...all.map(c => c.err)), near = all.filter(c => c.err <= Math.max(best, S.tolerance) + 1e-9);
  const mixed = (c: { y: number; a: number }) => c.y + c.a < 2 || (c.y > 0 && c.a > 0);
  const score = (c: { y: number; a: number; err: number }) => c.err + S.shareWeight * (c.y + c.a > 0 ? Math.abs(c.y / (c.y + c.a) - ref) : 0);
  near.sort((p, q) => Number(mixed(q)) - Number(mixed(p)) || score(p) - score(q) || p.y + p.a - (q.y + q.a));
  const c = near[0];
  return [c.y, c.a];
}
