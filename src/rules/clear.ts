// Clear to transform (Ed, 2026-10-07; a design under study, on its own switch `clear.on`, off in the game): invite every wild
// animal of an area (not its sleeping legend, not the wild baby in its legend's circle) and its runestone turns into a
// soundsystem at once, ahead of the pulse. The pulse keeps its schedule: wave W comes to the W-th stone of the route
// whatever happened, and does nothing to a stone that's already a soundsystem (rules/party.ts pickNext and spreadWave). No
// area grows on a clock: the forest is populated at the start by each area's place on the route (`clear.populate`, a curve
// of extra babies, young and adults by route position, on top of population.start). A legend dreams of a creature from a
// later area of the route (`clear.questAhead`), its buff fixed (legends.questFar 0 in the overlays that model it). A
// soundsystem's health follows the route too (`clear.soundHealth`). No drawing here.
import { AREA_TYPES, type ForestMap } from "./map";
import type { Cell } from "./partition";
import type { Creature } from "./creatures";
import { stateOf } from "./creatureStates";
import { cellKey, routeOf, soundsystemFor, type PartyState } from "./party";
import { countScale, type GrowthState } from "./growth";
import { makeCreature } from "./creatures";
import type { Level } from "./creatures";
import { hash2, rng } from "./random";

export interface ClearRules {
  on: boolean;
  /** Clearing an area turns its stone into a soundsystem at once. */
  transform?: boolean;
  /** Extra creatures by route position (1 the first area the pulse reaches): [position, babies, young, adults], straight
   *  lines between the points, flat past the ends; each times the area's count scale (rules/growth.ts countScale). */
  populate?: [number, number, number, number][];
  /** Or by threat (the form proposed to hotel): an area's extra fighting value (F: young 11.6, adult 40, baby 0) by route
   *  position, [position, F], straight lines between; turned into creatures by its species' profile... */
  threat?: [number, number][];
  /** ...the share of its extra creatures at each level [babies, young, adults], by species (default for the rest)... */
  profiles?: Record<string, [number, number, number]>;
  /** ...and at most this many babies in an area, population.start's included... */
  babyCap?: number;
  /** ...and this many babies in every area, start's included (Ed, 2026-10-07: "about a couple of babies per area": quest
   *  sigils and levelling up), outside the threat (babies are 0 F). */
  babies?: number;
  /** A new soundsystem's health, times combat.soundsystemHealth, by route position: [position, times], straight lines
   *  between, flat past the ends. */
  soundHealth?: [number, number][];
  /** A legend dreams of a kind first found from this many areas on along the route... */
  questAhead?: [number, number];
}

export interface ClearLog {
  /** Areas cleared and turned before their wave: key → game time. */
  cleared: Map<string, number>;
  /** Each wave: its stone's key, when it came, and whether the stone was already a soundsystem (and since when). */
  waves: { wave: number; key: string | null; at: number; already: number | null }[];
  /** Game time the clear check last ran. */
  checkedAt: number;
}

export const newClearLog = (): ClearLog => ({ cleared: new Map(), waves: [], checkedAt: -Infinity });

/** The route position of every area (1 the first the pulse reaches), by key. */
const POS = new WeakMap<ForestMap, Map<string, number>>();
export function routePos(map: ForestMap): Map<string, number> {
  let m = POS.get(map);
  if (!m) { m = new Map(routeOf(map).order.map((k, i) => [k, i + 1])); POS.set(map, m); }
  return m;
}

/** A piecewise-straight curve through `pts` ([x, ...ys]) at x, flat past the ends. */
export function curveAt(pts: readonly (readonly number[])[], x: number, j: number): number {
  if (!pts.length) return 0;
  if (x <= pts[0][0]) return pts[0][j];
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const a = pts[i - 1], b = pts[i], f = (x - a[0]) / Math.max(1e-9, b[0] - a[0]); return a[j] + (b[j] - a[j]) * f; }
  return pts[pts.length - 1][j];
}

/** The forest populated by the route (clear.populate): each area's extra creatures made at the start, so an area's whole
 *  population is there to clear (counts made real only out of her sight could leave one she stands in never cleared). */
export function populateByRoute(creatures: Creature[], map: ForestMap, R: ClearRules): number {
  if (R.threat?.length) return populateByThreat(creatures, map, R);
  if (!R.populate?.length) return 0;
  let made = 0;
  for (const [key, pos] of routePos(map)) {
    const [cx, cy] = key.split(",").map(Number), cell: [number, number] = [cx, cy], k = countScale(AREA_TYPES[map.typeOf(cx, cy)].creature);
    const r = rng(map.seed * 4447 + cx * 211 + cy * 1013 + 5);
    for (let level = 0 as Level; level < 3; level = (level + 1) as Level) {
      // (fractional counts rounded by a seeded coin, so a curve of 0.5 gives about every other area one)
      const want = Math.max(0, curveAt(R.populate, pos, level + 1)) * k, whole = Math.floor(want), n = whole + (hash2(cx * 31 + level, cy * 37, map.seed + 9011) < want - whole ? 1 : 0);
      for (let i = 0; i < n; i++) { creatures.push(makeCreature(map, cell, level, creatures.length, r)); made++; }
    }
  }
  return made;
}

/** The threat form: count = threat(N) / the profile's mean F a creature, split by its shares (largest remainder, seeded),
 *  babies capped (start's included). */
const F_LEVEL = [0, Math.sqrt(45 * 3), Math.sqrt(160 * 10)];
function populateByThreat(creatures: Creature[], map: ForestMap, R: ClearRules): number {
  const P = R.profiles ?? {}, cap = R.babyCap ?? Infinity, startBabies = map.tuning.population.start.babies;
  let made = 0;
  for (const [key, pos] of routePos(map)) {
    const [cx, cy] = key.split(",").map(Number), cell: [number, number] = [cx, cy], sp = AREA_TYPES[map.typeOf(cx, cy)].creature;
    const mix = P[sp] ?? P.default ?? [0.25, 0.5, 0.25], tot = mix[0] + mix[1] + mix[2] || 1, sh = mix.map(x => x / tot);
    const per = sh[1] * F_LEVEL[1] + sh[2] * F_LEVEL[2];
    if (!(per > 0)) continue;
    const n = Math.max(0, Math.round(curveAt(R.threat!, pos, 1) / per)), raw = sh.map(x => x * n), out = raw.map(Math.floor);
    const rest = raw.map((x, i) => [x - Math.floor(x) + hash2(cx * 7 + i, cy * 11, map.seed + 9013) * 1e-6, i] as const).sort((a, b) => b[0] - a[0]);
    for (let k = 0; k < n - out.reduce((a, b) => a + b, 0); k++) out[rest[k][1]]++;
    out[0] = Math.min(out[0] + Math.max(0, (R.babies ?? 0) - startBabies), Math.max(0, cap - startBabies));
    const r = rng(map.seed * 4447 + cx * 211 + cy * 1013 + 5);
    for (let level = 0 as Level; level < 3; level = (level + 1) as Level) for (let i = 0; i < out[level]; i++) { creatures.push(makeCreature(map, cell, level, creatures.length, r)); made++; }
  }
  return made;
}

/** A soundsystem's health times combat.soundsystemHealth at its route position (clear.soundHealth). */
export function soundHealthAt(map: ForestMap, key: string, R: ClearRules | undefined): number {
  if (!R?.on || !R.soundHealth?.length) return 1;
  const pos = routePos(map).get(key);
  return pos === undefined ? 1 : curveAt(R.soundHealth, pos, 1);
}

/** The wild animals left in an area that clearing counts: not gone, not leashed, not happy, not its legend, not the baby
 *  kept in its legend's circle. */
export const countsForClear = (c: Creature): boolean => !c.gone && !c.leashed && !c.boss && !c.circle && stateOf(c) === "wild";

/** Areas cleared since the last look (once a second): every wild area on the route with none left that counts, none
 *  pending, turned into a soundsystem now. Returns the keys turned. */
export function stepClear(log: ClearLog, p: PartyState, map: ForestMap, growth: GrowthState, time: number, byArea: Map<string, Creature[]>): string[] {
  const R = map.tuning.clear;
  if (!R?.on || R.transform === false || time - log.checkedAt < 1) return [];
  log.checkedAt = time;
  const out: string[] = [];
  for (const key of routePos(map).keys()) {
    if (p.areas.has(key) || p.ruined?.has(key)) continue;
    if ((growth.pending.get(key)?.length ?? 0) > 0) continue;
    const list = byArea.get(key) ?? [];
    if (list.some(countsForClear)) continue;
    // (an area nobody ever lived in, or whose last ran off without her: still cleared, as nothing's left to invite)
    const [cx, cy] = key.split(",").map(Number), cell: Cell = [cx, cy] as const;
    let from: Cell = map.centreCell, best = Infinity;
    const site = map.siteOf(cx, cy);
    for (const nk of map.neighbours.get(key) ?? []) { const a = p.areas.get(nk); if (!a) continue; const s = map.siteOf(a.cell[0], a.cell[1]), d = Math.hypot(s.x - site.x, s.z - site.z); if (d < best) { best = d; from = a.cell; } }
    p.areas.set(key, { cell, wave: p.wave, at: time, from, soundsystem: soundsystemFor(map, cell) });
    log.cleared.set(key, time);
    out.push(key);
  }
  return out;
}

/** Of the kinds on the map not `own`, those first found (on the route) between `ahead[0]` and `ahead[1]` areas after `pos`;
 *  if none, those first found anywhere after it; else every kind. */
export function laterKinds(map: ForestMap, pos: number, own: string, ahead: readonly [number, number]): string[] {
  const first = new Map<string, number>();
  for (const [key, i] of routePos(map)) { const [cx, cy] = key.split(",").map(Number), sp = AREA_TYPES[map.typeOf(cx, cy)].creature; if (!first.has(sp) || i < first.get(sp)!) first.set(sp, i); }
  first.delete(own);
  const kinds = [...first.keys()].sort();
  const near = kinds.filter(sp => first.get(sp)! >= pos + ahead[0] && first.get(sp)! <= pos + ahead[1]);
  if (near.length) return near;
  const later = kinds.filter(sp => first.get(sp)! > pos);
  return later.length ? later : kinds;
}

export { cellKey };
