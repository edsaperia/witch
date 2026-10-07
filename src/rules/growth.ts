// Wild areas grow (Ed, 2026-10-04: "every wave, each still-wild area spawns one extra non-legend
// creature at a random level"): every wave, each area the party hasn't reached gains
// population.growth.perWave creatures, each at a level by growth.weights (baby, young, adult).
// Areas already partified (or ruined) don't grow. Performance (Ed: never simulate or draw thousands
// of idle creatures): a new creature waits as a count, its level and wave only, until a witch comes
// within the creature simulation radius of its area or the area wakes; then it's made, from the
// seed, at a spot out of every witch's sight (beyond the haze's far edge plus growth.hide), so none
// pops in on screen. A woken area's own come at once (they march on its new soundsystem): at the
// spot in the area furthest from the witches, from its edge if she's in it. No drawing here.
import { makeCreature, type Creature, type Level } from "./creatures";
import { AREA_TYPES, type ForestMap } from "./map";
import { strengthOf } from "./combat";
import { hash2, rng } from "./random";

export interface Pending { level: Level; wave: number; n: number }

export interface GrowthState {
  /** Creatures still only counts, by area key. */
  pending: Map<string, Pending[]>;
  /** The last wave grown for. */
  wave: number;
  /** How many have been grown, and how many of those made real. */
  grown: number;
  made: number;
  /** Game time of the last look for areas a witch has come near (once a second is plenty). */
  lookedAt: number;
}

export const newGrowth = (): GrowthState => ({ pending: new Map(), wave: 0, grown: 0, made: 0, lookedAt: -Infinity });

/** The level of an area's `n`th creature grown at `wave`, by the weights (baby, young, adult): the
 *  same for the same seed, area and wave (the balance simulator reads it too). */
export function growthLevel(seed: number, cell: readonly [number, number], wave: number, n: number, weights: readonly number[]): Level {
  const total = weights.reduce((a, b) => a + Math.max(0, b), 0);
  if (!(total > 0)) return 0;
  let u = hash2(cell[0] * 61 + n * 7, cell[1] * 67 + wave * 131, seed + 4421) * total;
  for (let l = 0; l < Math.min(3, weights.length); l++) { u -= Math.max(0, weights[l]); if (u < 0) return l as Level; }
  return Math.min(2, weights.length - 1) as Level;
}

/** A wave came: each still-wild area (`wild` by key) gains its creatures, as counts. */
/** How many times as many creatures an area of `species` holds (Ed, 2026-10-05): 1 / its strength,
 *  so swarms come about three times as many and loners half as many, and an area's fighting value
 *  stays about the same (to two places, so a strength of a third makes exactly three times). */
export const countScale = (species: string) => Math.round(100 / strengthOf(species)) / 100;

/** An area's starting number of a level: `base` times its count scale, rounded, never fewer than
 *  one if there's any to start with. */
export const startCount = (base: number, scale: number) => (base > 0 ? Math.max(1, Math.round(base * scale)) : 0);

/** How many an area grows at `wave`: perWave times its count scale, the fractions carried from
 *  wave to wave (a loner's half a creature a wave is one every other wave). */
export const grownAt = (wave: number, perWave: number, scale: number) => { const k = perWave * scale; return Math.floor(wave * k + 1e-9) - Math.floor((wave - 1) * k + 1e-9); };

/** How many more than population.start an area holds from the start (Ed, 2026-10-07: "pre-populate every area by its
 *  route position"; no growth on a clock): by its place on the waves' route, `index` (1 the first wave's area, 2 the
 *  second's...), table[index - 1] if the table is given (its last entry for the areas past its end), else per × index;
 *  times the area's count scale, rounded down. With per 0.5 it is what an area woken at that wave grew to before. */
export function routeExtra(index: number, R: { per: number; table: readonly number[] }, scale: number): number {
  const base = R.table.length ? R.table[Math.max(0, Math.min(index, R.table.length) - 1)] : R.per * index;
  return Math.max(0, Math.floor(Math.max(0, base) * scale + 1e-9));
}

/** Each area's place on the waves' route (1 the first wave's area; rules/party.ts routeOf), by area key. */
export function routeIndex(order: readonly string[]): Map<string, number> {
  return new Map(order.map((k, i) => [k, i + 1]));
}

export function growWave(s: GrowthState, map: ForestMap, wave: number, wild: (key: string, cell: [number, number]) => boolean): void {
  const G = map.tuning.population.growth;
  if (wave <= s.wave) return;
  s.wave = wave;
  if (!G.on || G.perWave <= 0) return;
  const [hx, hy] = map.centreCell;
  for (const [cx, cy] of map.cells) {
    if (cx === hx && cy === hy) continue;
    const key = `${cx},${cy}`, cell: [number, number] = [cx, cy];
    if (!wild(key, cell)) continue;
    let l = s.pending.get(key);
    if (!l) s.pending.set(key, (l = []));
    const n = grownAt(wave, G.perWave, countScale(AREA_TYPES[map.typeOf(cx, cy)].creature));
    for (let i = 0; i < n; i++) { l.push({ level: growthLevel(map.seed, cell, wave, i, G.weights), wave, n: i }); s.grown++; }
  }
}

/** Where in its area a new creature can stand out of sight: of a few spots, the one furthest from
 *  every witch; and whether that is beyond `hide` metres from all of them. */
const PROBES = new WeakMap<ForestMap, Map<string, { homeX: number; homeZ: number; range: number; anchorX: number; anchorZ: number }>>();
/** An area's centre, reach and anchor (worked out once per area). */
function probeOf(map: ForestMap, cell: [number, number]) {
  let m = PROBES.get(map);
  if (!m) PROBES.set(map, (m = new Map()));
  const key = `${cell[0]},${cell[1]}`;
  let p = m.get(key);
  if (!p) { const c = makeCreature(map, cell, 0, -1, rng(1)); p = { homeX: c.homeX, homeZ: c.homeZ, range: c.range, anchorX: c.anchorX, anchorZ: c.anchorZ }; m.set(key, p); }
  return p;
}

function spotFor(map: ForestMap, cell: [number, number], witches: readonly { x: number; z: number }[], hide: number, r: () => number): { at: [number, number]; hidden: boolean } {
  const probe = probeOf(map, cell);
  let best: [number, number] = [probe.anchorX, probe.anchorZ], bd = -1;
  for (let i = 0; i < 12; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * probe.range, x = probe.homeX + Math.cos(a) * d, z = probe.homeZ + Math.sin(a) * d;
    const c = map.cellSafe(x, z).cell;
    if (c[0] !== cell[0] || c[1] !== cell[1]) continue;
    const near = witches.reduce((m, w) => Math.min(m, Math.hypot(w.x - x, w.z - z)), Infinity);
    if (near > bd) { bd = near; best = [x, z]; }
  }
  return { at: best, hidden: bd >= hide };
}

/** Make real the pending creatures of the areas near a witch (within `radius` of their centre,
 *  as the simulation reaches) that can stand out of her sight, and every one of the `woken` areas
 *  (out of sight if they can, else from the area's far side). Adds them to `creatures` (ids are
 *  their places in it); returns how many. */
export function materialize(s: GrowthState, creatures: Creature[], map: ForestMap, witches: readonly { x: number; z: number }[], radius: number, time: number, woken: ReadonlySet<string> = new Set()): number {
  if (!s.pending.size) return 0;
  const look = time - s.lookedAt >= 1;
  if (!look && !woken.size) return 0;
  if (look) s.lookedAt = time;
  const hide = map.tuning.haze.far + map.tuning.population.growth.hide;
  let made = 0;
  for (const [key, list] of s.pending) {
    const force = woken.has(key);
    if (!force && !look) continue;
    const [cx, cy] = key.split(",").map(Number), cell: [number, number] = [cx, cy], home = map.siteOf(cx, cy);
    if (!force && !witches.some(w => Math.abs(home.x - w.x) <= radius && Math.abs(home.z - w.z) <= radius)) continue;
    // No spot in it can be out of sight while a witch is this close: try again later, without looking.
    if (!force && witches.some(w => Math.hypot(home.x - w.x, home.z - w.z) + probeOf(map, cell).range * 1.5 < hide)) continue;
    const keep: Pending[] = [];
    for (const p of list) {
      const r = rng(map.seed * 6007 + cx * 389 + cy * 4441 + p.wave * 97 + p.n * 13), spot = spotFor(map, cell, witches, hide, r);
      if (!spot.hidden && !force) { keep.push(p); continue; }
      creatures.push(makeCreature(map, cell, p.level, creatures.length, r, spot.at));
      creatures[creatures.length - 1].seen = time;
      made++;
    }
    if (keep.length) s.pending.set(key, keep); else s.pending.delete(key);
  }
  s.made += made;
  return made;
}

/** How many of each level an area holds as counts only (baby, young, adult). */
export function pendingCounts(s: GrowthState, key: string): [number, number, number] {
  const n: [number, number, number] = [0, 0, 0];
  for (const p of s.pending.get(key) ?? []) n[Math.min(2, p.level)]++;
  return n;
}
