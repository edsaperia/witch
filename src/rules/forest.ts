// Where trees and bushes stand. Each sits on a staggered grid cell, jittered, and is kept or
// dropped by the map's tree weight, so trees thicken toward area borders and leave a clearing
// round each area's centre. Every cell is decided from the seed alone, so any patch of forest
// can be produced on its own, near the camera, in any order, and always comes out the same.
import { hash2, smoothstep, vnoise } from "./random";
import { wallFeatures, bedsInRows, type WallFeatures } from "./walls";
import { AREA_TYPES, HOME_LOOK, type AreaLayout, type ForestMap } from "./map";
import { DECOR } from "../../art/decor.js";
import { floorClearing } from "./speakers";
import { RELICS } from "../../art/relics.js";
import { COUNTRY } from "../../art/country.js";

export interface Plant {
  x: number;
  z: number;
  /** Area type index: whose leaves and tree shapes it has. */
  type: number;
  /** Which of that type's drawn variants. */
  variant: number;
  flip: boolean;
}

export const BUSH_VARIANTS = 4;
const CHUNK = 32; // metres

/** How far north a crown reaches over the ground, seen from the treetop camera. */
export function crownReach(map: ForestMap): number {
  const pitch = (map.tuning.camera.treetop.angleIn * Math.PI) / 180;
  return map.tuning.crownHeight / Math.sin(pitch);
}

/** Which area's plants grow at (x, z): the area a little way off, by a seeded low-frequency
 *  offset plus a per-plant stray, so each area's trees and bushes reach a little into its
 *  neighbours with a ragged edge (Ed, 2026-10-03). Only the look blends: everything else (where
 *  creatures roam, partifying, the party border, which area you're in) uses the exact partition. */
export function plantType(map: ForestMap, x: number, z: number, i: number, j: number, salt: number): number {
  const E = map.tuning.areaEdgeBlend, s = map.seed;
  if (E.width <= 0) return map.areaAt(x, z).look;
  const nx = (vnoise(x / E.scale, z / E.scale, s + 81) - 0.5) * 2 * E.width + (hash2(i, j, salt + 1) - 0.5) * E.width * E.stray;
  const nz = (vnoise(x / E.scale, z / E.scale, s + 82) - 0.5) * 2 * E.width + (hash2(i, j, salt + 2) - 0.5) * E.width * E.stray;
  return map.areaAt(x + nx, z + nz).look;
}

/** Home's ground (Ed, 2026-10-05: a meadow with "party decorations instead of trees"): no trees,
 *  bushes or scenery, by its look or, within its circle, wherever a neighbour's would stray in. */
const homeGround = (map: ForestMap, x: number, z: number, look: number) => {
  if (look === HOME_LOOK) return true;
  const d = Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z);
  if (d < map.homeRadius) return true;
  if (d > map.homeRadius + 2 * map.areaSize) return false; // (far off: no lookup)
  const c = map.areaAt(x, z).cell; return c[0] === map.centreCell[0] && c[1] === map.centreCell[1];
};

/** The chance of a tree at (x, z) whose look is area type `type` (Ed, 2026-10-03: "density can be
 *  more varied"): the type's own density (blended across borders, as the types are), times a
 *  low-frequency patch field (dense patches, sparse patches, open glades), times the type's
 *  pattern (groves, stands, rings, rows, thicket, edges only...), times the clearings; with a few
 *  lone trees almost everywhere, so open ground is never empty. */
export function treeChance(map: ForestMap, x: number, z: number, type: number): number {
  if (homeGround(map, x, z, type)) return 0;
  const t = map.tuning, D = t.density, L = AREA_TYPES[type].layout, s = map.seed;
  if (map.hardClear(x, z)) return 0;
  const along = map.paths.clearance(x, z).trees;
  if (along === 0) return 0;
  const n = vnoise(x / D.patchScale, z / D.patchScale, s + 91);
  const patch = D.patchMin + (D.patchMax - D.patchMin) * smoothstep((n - 0.25) / 0.5);
  const w = map.treeWeight(x, z) * L.density * patch * patternMask(map, x, z, L) * t.treeDensity;
  return (w >= D.lone ? w : Math.max(w, D.lone * map.arenaOpen(x, z))) * along; // (no lone trees in an area's arena)
}

/** How a type's pattern shapes its trees, around 1 on average. */
function patternMask(map: ForestMap, x: number, z: number, L: AreaLayout): number {
  const s = map.seed, c = L.clump;
  switch (L.pattern) {
    case "groves": case "stands": {
      const k = L.pattern === "groves" ? 18 : 10, v = vnoise(x / k, z / k, s + 93);
      return 1 + c * (2.2 * smoothstep((v - 0.45) / 0.2) - 1);
    }
    case "thicket": return 1.25;
    case "rows": {
      // Rows run along a direction, or along a feature (a path, a stream) once those exist; until
      // then, along the area's lean.
      const dir = typeof L.along === "number" ? L.along : (L.lean?.dir ?? 0) + 20;
      const a = ((dir + 90) * Math.PI) / 180, u = x * Math.cos(a) + z * Math.sin(a);
      return 0.25 + 1.5 * smoothstep((Math.cos((u / 5) * Math.PI * 2) - 0.2) / 0.6);
    }
    case "rings": { const o = map.areaAt(x, z).openness; return 0.3 + 1.4 * smoothstep((Math.cos(o * Math.PI * 7) - 0.1) / 0.6); }
    case "edgeOnly": return 1.6 * smoothstep((map.areaAt(x, z).openness - 0.45) / 0.35);
    default: return 1; // scatter, lone: the density does it
  }
}

function treesInChunk(map: ForestMap, ci: number, cj: number): Plant[] {
  const { treeSpacingX: sx, treeSpacingZ: sz } = map.tuning, s = map.seed;
  const out: Plant[] = [], lift = crownReach(map), half = map.tuning.crownHalfWidth;
  const j0 = Math.ceil((cj * CHUNK) / sz), j1 = Math.ceil(((cj + 1) * CHUNK) / sz);
  for (let j = j0; j < j1; j++) {
    const shift = j & 1 ? 0.5 : 0;
    const i0 = Math.ceil((ci * CHUNK) / sx - shift), i1 = Math.ceil(((ci + 1) * CHUNK) / sx - shift);
    for (let i = i0; i < i1; i++) {
      const x = (i + shift + (hash2(i, j, s + 101) - 0.5) * 0.7) * sx;
      const z = (j + (hash2(i, j, s + 102) - 0.5) * 0.7) * sz;
      // A crown must not cover a clearing either, so the weight is checked where it reaches.
      const type = plantType(map, x, z, i, j, s + 106), chance = treeChance(map, x, z, type);
      if (hash2(i, j, s + 103) >= chance) continue;
      // Crowns don't hang over the dancefloor's or a set piece's clearing.
      if (map.hardClear(x, z - lift) || map.hardClear(x - half, z - lift) || map.hardClear(x + half, z - lift)) continue;
      out.push({ x, z, type, variant: Math.floor(hash2(i, j, s + 104) * 1000003) /* the view picks a variant by weight */, flip: hash2(i, j, s + 105) < 0.5 });
    }
  }
  return out;
}

function bushesInChunk(map: ForestMap, ci: number, cj: number): Plant[] {
  const sp = map.tuning.bushSpacing, s = map.seed, out: Plant[] = [];
  const j0 = Math.ceil((cj * CHUNK) / sp), j1 = Math.ceil(((cj + 1) * CHUNK) / sp);
  const i0 = Math.ceil((ci * CHUNK) / sp), i1 = Math.ceil(((ci + 1) * CHUNK) / sp);
  for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
    // A full cell of jitter and a seeded clump mask, so they gather in clumps and gaps rather than rows.
    const x = (i + hash2(i, j, s + 201) - 0.5) * sp, z = (j + hash2(i, j, s + 202) - 0.5) * sp;
    const clump = 1 + map.tuning.bushClump * (2 * smoothstep((vnoise(x / 13, z / 13, s + 207) - 0.35) / 0.3) - 1);
    // Fewer under dense canopy, more where the trees are sparse (clearing rims, glades, open
    // ground), as the type's undergrowth says (Ed, 2026-10-03).
    // Paths keep their corridors clear, with bushes thick along their edges.
    const along = map.paths.clearance(x, z).bushes;
    if (along === 0) continue;
    const type = plantType(map, x, z, i, j, s + 206);
    if (homeGround(map, x, z, type)) continue;
    if (bedsInRows(map, type)) continue; // a formal garden's beds are laid in rows along its walls
    const sparse = 1 - Math.min(1, treeChance(map, x, z, type) / 0.8);
    const roll = hash2(i, j, s + 203), odds = (0.15 + 0.85 * sparse) * AREA_TYPES[type].layout.undergrowth * map.tuning.bushDensity * clump * along;
    if (roll > odds) continue;
    // An area's arena stays mostly open (asked only of the bushes that would grow).
    const A = map.tuning.arena;
    if (A && roll > odds * (A.bushes + (1 - A.bushes) * map.arenaOpen(x, z))) continue;
    if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < floorClearing(map.tuning)) continue; // the dancefloor and its speakers stay clear
    if (map.hardClear(x, z)) continue; // and the treehouse's foot, the grounds, the set pieces' clearings
    out.push({ x, z, type, variant: Math.floor(hash2(i, j, s + 204) * BUSH_VARIANTS), flip: hash2(i, j, s + 205) < 0.5 });
  }
  return out;
}

// Decorations (Ed: "rocks, ruins, lakes, weird freak trees ... just around"): scattered sparsely as
// discoveries, more of them on open ground than under dense canopy; never on a path's corridor, in
// an area's central clearing (its soundsystem and set piece stand there) or by the dancefloor.
export type DecorFamily = "ruins" | "rocks" | "freak";
export interface Decor { x: number; z: number; family: DecorFamily; variant: number; flip: boolean }

// The most any area's odds of a decoration can be (its rate, rocky ground's boost).
const decorOdds = new WeakMap<ForestMap, number>();
function decorOddsMax(map: ForestMap): number {
  let v = decorOdds.get(map);
  if (v === undefined) {
    const D = map.tuning.decor;
    v = (D.ruins + D.rocks + D.freak) * 1.5 * Math.max(1, ...AREA_TYPES.map(t => (t.layout.decor ? t.layout.decor.rate / 0.3 : 1)));
    decorOdds.set(map, v);
  }
  return v;
}

// Where a decoration would go in cell (i, j), before the spacing (null: none there).
type Cand<T> = T & { rank: number; i: number; j: number };
function decorCandidate(map: ForestMap, i: number, j: number): Cand<Decor> | null {
  const D = map.tuning.decor, sp = D.spacing, s = map.seed;
  // The area's layout says how much decor it has (its rate, against a typical 0.3) and of which
  // families; "rocky" ground has more rocks.
  const roll = hash2(i, j, s + 503);
  if (roll >= decorOddsMax(map)) return null; // out of the running in any area: skip the lookups
  const x = (i + (hash2(i, j, s + 501) - 0.5) * 0.8) * sp, z = (j + (hash2(i, j, s + 502) - 0.5) * 0.8) * sp, a = map.areaAt(x, z);
  if (homeGround(map, x, z, a.look)) return null;
  const L = AREA_TYPES[a.type].layout, ad = L.decor, rate = ad ? ad.rate / 0.3 : 1, rocky = L.terrain?.includes("rocky") ? 2 : 1;
  const w = ad ? [ad.ruins, ad.rocks * rocky, ad.freak] : [D.ruins, D.rocks * rocky, D.freak], sum = w[0] + w[1] + w[2] || 1;
  const total = (D.ruins + D.rocks + D.freak) * rate * (ad ? (ad.ruins + ad.rocks + ad.freak) / Math.max(0.01, ad.ruins + ad.rocks + ad.freak + ad.lake + ad.modern) : 1) * (rocky > 1 ? 1.5 : 1);
  if (roll >= total) return null;
  if (a.openness < D.clearing || map.hardClear(x, z) || map.paths.at(x, z, D.pathGap)) return null;
  if (map.reserved(x, z, D.footprint)) return null; // its whole footprint clear of the gameplay and set pieces
  if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < floorClearing(map.tuning) + 6) return null;
  // Open ground keeps them all; dense canopy only some.
  const open = 1 - Math.min(1, treeChance(map, x, z, a.type) / 0.8);
  if (hash2(i, j, s + 504) > 0.35 + 0.65 * open) return null;
  const f = (roll / total) * sum, family: DecorFamily = f < w[0] ? "ruins" : f < w[0] + w[1] ? "rocks" : "freak";
  return { x, z, family, variant: Math.floor(hash2(i, j, s + 505) * 1e6), flip: hash2(i, j, s + 506) < 0.5, rank: hash2(i, j, s + 507), i, j };
}

/** Keep the candidates no stronger one lies within `gap` metres of (Ed, v147: "too numerous"):
 *  seeded and the same whichever chunk asks, so it never pops. */
function spaced<T extends { x: number; z: number; rank: number }>(cand: (i: number, j: number) => T | null, sp: number, gap: number, i0: number, i1: number, j0: number, j1: number): T[] {
  const out: T[] = [], k = Math.ceil(gap / sp) + 1;
  for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
    const c = cand(i, j);
    if (!c) continue;
    let keep = true;
    for (let dj = -k; dj <= k && keep; dj++) for (let di = -k; di <= k; di++) {
      if (!di && !dj) continue;
      const o = cand(i + di, j + dj);
      if (o && o.rank > c.rank && Math.hypot(o.x - c.x, o.z - c.z) < gap) { keep = false; break; }
    }
    if (keep) out.push(c);
  }
  return out;
}

function decorInChunk(map: ForestMap, ci: number, cj: number): Decor[] {
  const D = map.tuning.decor, sp = D.spacing, u = uniques(map).decor, out: Decor[] = [];
  for (const { rank: _rank, i, j, ...d } of spaced((i, j) => decorCandidate(map, i, j), sp, D.minGap, Math.ceil((ci * CHUNK) / sp), Math.ceil(((ci + 1) * CHUNK) / sp), Math.ceil((cj * CHUNK) / sp), Math.ceil(((cj + 1) * CHUNK) / sp))) {
    if (d.family === "rocks") { out.push(d); continue; } // rocks are generic scatter, not finds
    const v = u.get(i + "," + j);
    if (v !== undefined) out.push({ ...d, variant: v });
  }
  return out;
}

// Modern relics (Ed: the occasional half-buried car, shopping trolley, traffic cone, broken bit of
// highway): rare, more of them by the roads and railways; the view picks which by variant.
export interface Relic { x: number; z: number; variant: number; flip: boolean }

function relicCandidate(map: ForestMap, i: number, j: number): Cand<Relic> | null {
  const R = map.tuning.relics, sp = R.spacing, s = map.seed;
  if (hash2(i, j, s + 883) >= R.chance * 5.5 * Math.max(1, R.nearRoad)) return null; // out of the running anywhere
  const x = (i + (hash2(i, j, s + 881) - 0.5) * 0.8) * sp, z = (j + (hash2(i, j, s + 882) - 0.5) * 0.8) * sp, a = map.areaAt(x, z);
  if (homeGround(map, x, z, a.look)) return null;
  const ad = AREA_TYPES[a.type].layout.decor, share = ad ? ad.modern / Math.max(0.01, ad.ruins + ad.rocks + ad.freak + ad.lake + ad.modern) : 0.1;
  const roll = hash2(i, j, s + 883), odds = R.chance * (0.5 + 5 * share);
  if (roll >= odds * Math.max(1, R.nearRoad)) return null; // out of the running even by a road: skip the path lookup
  const near = map.paths.at(x, z, 20), byRoad = near && (near.kind === "road" || near.kind === "rail") ? R.nearRoad : 1;
  if (roll >= odds * byRoad) return null;
  if (a.openness < map.tuning.decor.clearing || map.hardClear(x, z) || map.paths.at(x, z, 2) || map.paths.pieceAt(x, z)) return null;
  if (map.reserved(x, z, map.tuning.decor.footprint)) return null; // its footprint clear of the gameplay, set pieces and grounds
  if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < floorClearing(map.tuning) + 6) return null;
  return { x, z, variant: Math.floor(hash2(i, j, s + 884) * 1e6), flip: hash2(i, j, s + 885) < 0.5, rank: hash2(i, j, s + 886), i, j };
}

function relicsInChunk(map: ForestMap, ci: number, cj: number): Relic[] {
  const R = map.tuning.relics, sp = R.spacing, u = uniques(map).relics, out: Relic[] = [];
  for (const { rank: _rank, i, j, ...r } of spaced((i, j) => relicCandidate(map, i, j), sp, R.minGap, Math.ceil((ci * CHUNK) / sp), Math.ceil(((ci + 1) * CHUNK) / sp), Math.ceil((cj * CHUNK) / sp), Math.ceil(((cj + 1) * CHUNK) / sp))) {
    const v = u.get(i + "," + j);
    if (v !== undefined) out.push({ ...r, variant: v });
  }
  return out;
}

// Each find at most once per map (Ed, v160): every ruin (its weathered and overgrown conditions
// count as one), freak tree and modern relic. One seeded pass over the whole map, strongest
// candidate first, gives each spot the piece it rolled or the next one still unused, or nothing
// once they're all used; never a repeat. The variant is the piece's index in the view's list for
// its family (the art's table order, a ruin's conditions in a row).
interface Uniques { decor: Map<string, number>; relics: Map<string, number> }
const UNIQUES = new WeakMap<ForestMap, Uniques>();
const ruinStarts: number[] = [], freakCount = DECOR.filter(d => d.family === "freak").length;
for (let k = 0, n = 0; k < DECOR.length; k++) if (DECOR[k].family === "ruins") { ruinStarts.push(n); n += DECOR[k].variants; }
const ruinVariants = DECOR.filter(d => d.family === "ruins").map(d => d.variants);
// The modern finds: the relics' own, then the countryside and street pieces that stand alone (art/country.js; the scene-only ones are left to scenes).
const modernCount = RELICS.filter(d => d.family === "modern").length + COUNTRY.filter(d => d.family === "farm" || d.family === "street").length;

function uniques(map: ForestMap): Uniques {
  let u = UNIQUES.get(map);
  if (u) return u;
  const b = map.extent, s = map.seed;
  const pass = <T extends { x: number; z: number; rank: number; i: number; j: number }>(cand: (i: number, j: number) => T | null, sp: number, gap: number, pool: (c: T) => [string, number] | null, assign: (c: T, k: number) => number): Map<string, number> => {
    const memo = new Map<string, T | null>(), m = (i: number, j: number) => { const k = i + "," + j; let c = memo.get(k); if (c === undefined) memo.set(k, (c = cand(i, j))); return c; };
    const all = spaced(m, sp, gap, Math.floor(b.minX / sp), Math.ceil(b.maxX / sp) + 1, Math.floor(b.minZ / sp), Math.ceil(b.maxZ / sp) + 1).sort((p, q) => q.rank - p.rank);
    const used = new Map<string, Set<number>>(), out = new Map<string, number>();
    for (const c of all) {
      const p = pool(c);
      if (!p) continue;
      const [name, N] = p, set = used.get(name) ?? new Set<number>();
      used.set(name, set);
      if (set.size >= N) continue;
      let k = Math.floor(hash2(c.i, c.j, s + 509) * N);
      while (set.has(k)) k = (k + 1) % N;
      set.add(k);
      out.set(c.i + "," + c.j, assign(c, k));
    }
    return out;
  };
  const D = map.tuning.decor, R = map.tuning.relics;
  u = {
    decor: pass((i, j) => decorCandidate(map, i, j), D.spacing, D.minGap, c => (c.family === "ruins" ? ["ruins", ruinStarts.length] : c.family === "freak" ? ["freak", freakCount] : null),
      (c, k) => (c.family === "ruins" ? ruinStarts[k] + (c.variant % ruinVariants[k]) : k)),
    relics: pass((i, j) => relicCandidate(map, i, j), R.spacing, R.minGap, () => ["modern", modernCount], (_c, k) => k),
  };
  UNIQUES.set(map, u);
  return u;
}

// Light sources, placed by seed: campfires and magic stones mostly in clearings and at area
// edges, and ponds that mirror the moon, more of them in the wet area types.
export type LightKind = "campfire" | "stone" | "pond";
export interface LightSource { x: number; z: number; kind: LightKind; size: number }

function lightsInChunk(map: ForestMap, ci: number, cj: number): LightSource[] {
  const L = map.tuning.lightSources, sp = L.spacing, s = map.seed, out: LightSource[] = [];
  const j0 = Math.ceil((cj * CHUNK) / sp), j1 = Math.ceil(((cj + 1) * CHUNK) / sp);
  const i0 = Math.ceil((ci * CHUNK) / sp), i1 = Math.ceil(((ci + 1) * CHUNK) / sp);
  for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
    const x = (i + (hash2(i, j, s + 401) - 0.5) * 0.7) * sp, z = (j + (hash2(i, j, s + 402) - 0.5) * 0.7) * sp;
    if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < floorClearing(map.tuning) + 4) continue;
    const a = map.areaAt(x, z), where = a.openness < 0.35 || a.openness > 0.8 ? 1 : 0.25, roll = hash2(i, j, s + 403);
    if (homeGround(map, x, z, a.look)) continue; // (home's lights are its party decorations)
    const wet = AREA_TYPES[a.type].ponds || !!AREA_TYPES[a.type].layout.terrain?.includes("pools");
    const pond = (wet ? L.wetPond : L.pond) * where, fire = L.campfire * where, stone = L.magicStone * where;
    const kind: LightKind | null = roll < pond ? "pond" : roll < pond + fire ? "campfire" : roll < pond + fire + stone ? "stone" : null;
    if (kind) out.push({ x, z, kind, size: 0.75 + hash2(i, j, s + 404) * 0.5 });
  }
  return out;
}

/** Trees and bushes near a point, chunk by chunk, remembered once made. */
export class Forest {
  private trees = new Map<string, Plant[]>();
  private bushes = new Map<string, Plant[]>();
  private wallFeatureCache = new Map<string, WallFeatures>();
  private lights = new Map<string, LightSource[]>();
  private decor = new Map<string, Decor[]>();
  private relics = new Map<string, Relic[]>();
  /** Milliseconds spent making chunks since the view last read (and reset) it. */
  buildMs = 0;
  /** Chunks kept per kind before the farthest are dropped: well over a treetop view's ~700. */
  static readonly KEEP = 2500;
  private centre = { x: 0, z: 0 };
  // The one whole-map pass (which finds go where) runs with the map, not on the first frame that needs it.
  constructor(readonly map: ForestMap) { uniques(map); }

  private chunks(x: number, z: number, radius: number): [number, number][] {
    const out: [number, number][] = [];
    for (let cj = Math.floor((z - radius) / CHUNK); cj <= Math.floor((z + radius) / CHUNK); cj++)
      for (let ci = Math.floor((x - radius) / CHUNK); ci <= Math.floor((x + radius) / CHUNK); ci++) out.push([ci, cj]);
    return out;
  }
  /** Over KEEP chunks, drop the farthest from where the forest was last asked about (never the
   *  whole cache: clearing it made a treetop view rebuild every chunk at once, a second's stall). */
  private evict(cache: Map<string, unknown>, keep = Forest.KEEP, size = CHUNK): void {
    if (cache.size <= keep) return;
    const c = this.centre, far = [...cache.keys()].map(k => { const [i, j] = k.split(",").map(Number); return [k, ((i + 0.5) * size - c.x) ** 2 + ((j + 0.5) * size - c.z) ** 2] as const; });
    far.sort((a, b) => b[1] - a[1]);
    for (const [k] of far.slice(0, cache.size - Math.floor(keep * 0.8))) cache.delete(k);
  }
  private chunk<T>(cache: Map<string, T[]>, make: (ci: number, cj: number) => T[], ci: number, cj: number): T[] {
    const k = ci + "," + cj;
    let c = cache.get(k);
    if (!c) { const t0 = performance.now(); c = make(ci, cj); this.buildMs += performance.now() - t0; cache.set(k, c); }
    return c;
  }
  private gather<T extends { x: number; z: number }>(cache: Map<string, T[]>, make: (ci: number, cj: number) => T[], x: number, z: number, radius: number): T[] {
    this.centre = { x, z };
    this.evict(cache);
    const out: T[] = [];
    for (const [ci, cj] of this.chunks(x, z, radius))
      for (const p of this.chunk(cache, make, ci, cj)) if (Math.abs(p.x - x) <= radius && Math.abs(p.z - z) <= radius) out.push(p);
    return out;
  }
  private kinds(): [Map<string, { x: number; z: number }[]>, (ci: number, cj: number) => { x: number; z: number }[]][] {
    const m = this.map;
    return [[this.trees, (i, j) => treesInChunk(m, i, j)], [this.bushes, (i, j) => bushesInChunk(m, i, j)],
      [this.decor, (i, j) => decorInChunk(m, i, j)], [this.relics, (i, j) => relicsInChunk(m, i, j)], [this.lights, (i, j) => lightsInChunk(m, i, j)]];
  }
  /** Make chunks round (x, z) ahead of need, nearest first, for at most budgetMs (at least one
   *  chunk if any is missing): so flying into new forest finds it already made, a little each
   *  frame, instead of all at once. Returns how many chunks in that square are still missing. */
  prefetch(x: number, z: number, radius: number, budgetMs: number): number {
    const t0 = performance.now(), kinds = this.kinds();
    const todo = this.chunks(x, z, radius).filter(([i, j]) => kinds.some(([c]) => !c.has(i + "," + j)));
    todo.sort((a, b) => ((a[0] + 0.5) * CHUNK - x) ** 2 + ((a[1] + 0.5) * CHUNK - z) ** 2 - (((b[0] + 0.5) * CHUNK - x) ** 2 + ((b[1] + 0.5) * CHUNK - z) ** 2));
    let done = 0;
    for (const [i, j] of todo) {
      if (done > 0 && performance.now() - t0 > budgetMs) break;
      for (const [c, make] of kinds) this.chunk(c, make, i, j);
      done++;
    }
    // And each area's wall-object features (made per area, not per chunk), nearest first.
    const A = this.map.areaSize, areas: [number, number, number][] = [];
    for (let cy = Math.floor((z - radius) / A) - 1; cy <= Math.floor((z + radius) / A) + 1; cy++)
      for (let cx = Math.floor((x - radius) / A) - 1; cx <= Math.floor((x + radius) / A) + 1; cx++)
        if (!this.wallFeatureCache.has(cx + "," + cy)) areas.push([cx, cy, ((cx + 0.5) * A - x) ** 2 + ((cy + 0.5) * A - z) ** 2]);
    areas.sort((a, b) => a[2] - b[2]);
    let made = 0;
    for (const [cx, cy] of areas) {
      if (performance.now() - t0 > budgetMs) break;
      this.featuresOf(cx, cy);
      made++;
    }
    return todo.length - done + areas.length - made;
  }
  /** Trees within a square of half-size `radius` round (x, z). */
  treesNear(x: number, z: number, radius: number): Plant[] {
    return this.gather(this.trees, (i, j) => treesInChunk(this.map, i, j), x, z, radius);
  }
  bushesNear(x: number, z: number, radius: number): Plant[] {
    return this.gather(this.bushes, (i, j) => bushesInChunk(this.map, i, j), x, z, radius);
  }
  lightsNear(x: number, z: number, radius: number): LightSource[] {
    return this.gather(this.lights, (i, j) => lightsInChunk(this.map, i, j), x, z, radius);
  }
  decorNear(x: number, z: number, radius: number): Decor[] {
    return this.gather(this.decor, (i, j) => decorInChunk(this.map, i, j), x, z, radius);
  }
  relicsNear(x: number, z: number, radius: number): Relic[] {
    return this.gather(this.relics, (i, j) => relicsInChunk(this.map, i, j), x, z, radius);
  }
  /** Each area's wall-object features (runs, rings, clumps; see walls.ts), remembered per area. */
  private features(x: number, z: number, radius: number, pick: (f: WallFeatures) => Plant[]): Plant[] {
    const A = this.map.areaSize, out: Plant[] = [];
    this.centre = { x, z };
    this.evict(this.wallFeatureCache, 400, A); // the farthest areas go, never all at once
    for (let cy = Math.floor((z - radius) / A) - 1; cy <= Math.floor((z + radius) / A) + 1; cy++)
      for (let cx = Math.floor((x - radius) / A) - 1; cx <= Math.floor((x + radius) / A) + 1; cx++)
        for (const p of pick(this.featuresOf(cx, cy))) if (Math.abs(p.x - x) <= radius && Math.abs(p.z - z) <= radius) out.push(p);
    return out;
  }
  private featuresOf(cx: number, cy: number): WallFeatures {
    const k = cx + "," + cy;
    let f = this.wallFeatureCache.get(k);
    if (!f) { const t0 = performance.now(); f = wallFeatures(this.map, cx, cy); this.buildMs += performance.now() - t0; this.wallFeatureCache.set(k, f); }
    return f;
  }
  wallsNear(x: number, z: number, radius: number): Plant[] { return this.features(x, z, radius, f => f.walls); }
  /** A formal garden's flower beds, in rows along its walls. */
  bedsNear(x: number, z: number, radius: number): Plant[] { return this.features(x, z, radius, f => f.beds); }
  /** Set pieces near a point: each stands in its area's clearing, a little north of the centre. */
  setPiecesNear(x: number, z: number, radius: number): Plant[] {
    const m = this.map, A = m.areaSize, out: Plant[] = [];
    for (let cy = Math.floor((z - radius) / A) - 1; cy <= Math.floor((z + radius) / A) + 1; cy++)
      for (let cx = Math.floor((x - radius) / A) - 1; cx <= Math.floor((x + radius) / A) + 1; cx++) {
        const s = m.setPieceSpot(cx, cy); // none at home, nor where it can't keep clear of the gameplay
        if (s && Math.abs(s.x - x) <= radius && Math.abs(s.z - z) <= radius)
          out.push({ x: s.x, z: s.z, type: m.typeOf(cx, cy), variant: 0, flip: hash2(cx, cy, m.seed + 71) < 0.5 });
      }
    return out;
  }
}
