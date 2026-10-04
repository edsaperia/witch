// Where trees and bushes stand. Each sits on a staggered grid cell, jittered, and is kept or
// dropped by the map's tree weight, so trees thicken toward area borders and leave a clearing
// round each area's centre. Every cell is decided from the seed alone, so any patch of forest
// can be produced on its own, near the camera, in any order, and always comes out the same.
import { hash2, smoothstep, vnoise } from "./random";
import { wallFeatures, bedsInRows, type WallFeatures } from "./walls";
import { AREA_TYPES, type AreaLayout, type ForestMap } from "./map";

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
  if (E.width <= 0) return map.areaAt(x, z).type;
  const nx = (vnoise(x / E.scale, z / E.scale, s + 81) - 0.5) * 2 * E.width + (hash2(i, j, salt + 1) - 0.5) * E.width * E.stray;
  const nz = (vnoise(x / E.scale, z / E.scale, s + 82) - 0.5) * 2 * E.width + (hash2(i, j, salt + 2) - 0.5) * E.width * E.stray;
  return map.areaAt(x + nx, z + nz).type;
}

/** The chance of a tree at (x, z) whose look is area type `type` (Ed, 2026-10-03: "density can be
 *  more varied"): the type's own density (blended across borders, as the types are), times a
 *  low-frequency patch field (dense patches, sparse patches, open glades), times the type's
 *  pattern (groves, stands, rings, rows, thicket, edges only...), times the clearings; with a few
 *  lone trees almost everywhere, so open ground is never empty. */
export function treeChance(map: ForestMap, x: number, z: number, type: number): number {
  const t = map.tuning, D = t.density, L = AREA_TYPES[type].layout, s = map.seed;
  if (map.hardClear(x, z)) return 0;
  const along = map.paths.clearance(x, z).trees;
  if (along === 0) return 0;
  const n = vnoise(x / D.patchScale, z / D.patchScale, s + 91);
  const patch = D.patchMin + (D.patchMax - D.patchMin) * smoothstep((n - 0.25) / 0.5);
  const w = map.treeWeight(x, z) * L.density * patch * patternMask(map, x, z, L) * t.treeDensity;
  return Math.max(w, D.lone) * along;
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
    if (bedsInRows(map, type)) continue; // a formal garden's beds are laid in rows along its walls
    const sparse = 1 - Math.min(1, treeChance(map, x, z, type) / 0.8);
    if (hash2(i, j, s + 203) > (0.15 + 0.85 * sparse) * AREA_TYPES[type].layout.undergrowth * map.tuning.bushDensity * clump * along) continue;
    if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < map.dancefloor.radius + 2) continue; // the dancefloor stays clear
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

// Where a decoration would go in cell (i, j), before the spacing (null: none there).
function decorCandidate(map: ForestMap, i: number, j: number): (Decor & { rank: number }) | null {
  const D = map.tuning.decor, sp = D.spacing, s = map.seed;
  // The area's layout says how much decor it has (its rate, against a typical 0.3) and of which
  // families; "rocky" ground has more rocks.
  const x = (i + (hash2(i, j, s + 501) - 0.5) * 0.8) * sp, z = (j + (hash2(i, j, s + 502) - 0.5) * 0.8) * sp, a = map.areaAt(x, z);
  const L = AREA_TYPES[a.type].layout, ad = L.decor, rate = ad ? ad.rate / 0.3 : 1, rocky = L.terrain?.includes("rocky") ? 2 : 1;
  const w = ad ? [ad.ruins, ad.rocks * rocky, ad.freak] : [D.ruins, D.rocks * rocky, D.freak], sum = w[0] + w[1] + w[2] || 1;
  const total = (D.ruins + D.rocks + D.freak) * rate * (ad ? (ad.ruins + ad.rocks + ad.freak) / Math.max(0.01, ad.ruins + ad.rocks + ad.freak + ad.lake + ad.modern) : 1) * (rocky > 1 ? 1.5 : 1);
  const roll = hash2(i, j, s + 503);
  if (roll >= total) return null;
  if (a.openness < D.clearing || map.hardClear(x, z) || map.paths.at(x, z, D.pathGap)) return null;
  if (map.reserved(x, z, D.footprint)) return null; // its whole footprint clear of the gameplay and set pieces
  if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < map.dancefloor.radius + map.tuning.dancefloor.clearing + 6) return null;
  // Open ground keeps them all; dense canopy only some.
  const open = 1 - Math.min(1, treeChance(map, x, z, a.type) / 0.8);
  if (hash2(i, j, s + 504) > 0.35 + 0.65 * open) return null;
  const f = (roll / total) * sum, family: DecorFamily = f < w[0] ? "ruins" : f < w[0] + w[1] ? "rocks" : "freak";
  return { x, z, family, variant: Math.floor(hash2(i, j, s + 505) * 1e6), flip: hash2(i, j, s + 506) < 0.5, rank: hash2(i, j, s + 507) };
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
  const D = map.tuning.decor, sp = D.spacing;
  return spaced((i, j) => decorCandidate(map, i, j), sp, D.minGap, Math.ceil((ci * CHUNK) / sp), Math.ceil(((ci + 1) * CHUNK) / sp), Math.ceil((cj * CHUNK) / sp), Math.ceil(((cj + 1) * CHUNK) / sp))
    .map(({ rank: _rank, ...d }) => d);
}

// Modern relics (Ed: the occasional half-buried car, shopping trolley, traffic cone, broken bit of
// highway): rare, more of them by the roads and railways; the view picks which by variant.
export interface Relic { x: number; z: number; variant: number; flip: boolean }

function relicCandidate(map: ForestMap, i: number, j: number): (Relic & { rank: number }) | null {
  const R = map.tuning.relics, sp = R.spacing, s = map.seed;
  const x = (i + (hash2(i, j, s + 881) - 0.5) * 0.8) * sp, z = (j + (hash2(i, j, s + 882) - 0.5) * 0.8) * sp, a = map.areaAt(x, z);
  const ad = AREA_TYPES[a.type].layout.decor, share = ad ? ad.modern / Math.max(0.01, ad.ruins + ad.rocks + ad.freak + ad.lake + ad.modern) : 0.1;
  const near = map.paths.at(x, z, 20), byRoad = near && (near.kind === "road" || near.kind === "rail") ? R.nearRoad : 1;
  if (hash2(i, j, s + 883) >= R.chance * (0.5 + 5 * share) * byRoad) return null;
  if (a.openness < map.tuning.decor.clearing || map.hardClear(x, z) || map.paths.at(x, z, 2) || map.paths.pieceAt(x, z)) return null;
  if (map.reserved(x, z, map.tuning.decor.footprint)) return null; // its footprint clear of the gameplay, set pieces and grounds
  if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < map.dancefloor.radius + map.tuning.dancefloor.clearing + 6) return null;
  return { x, z, variant: Math.floor(hash2(i, j, s + 884) * 1e6), flip: hash2(i, j, s + 885) < 0.5, rank: hash2(i, j, s + 886) };
}

function relicsInChunk(map: ForestMap, ci: number, cj: number): Relic[] {
  const R = map.tuning.relics, sp = R.spacing;
  return spaced((i, j) => relicCandidate(map, i, j), sp, R.minGap, Math.ceil((ci * CHUNK) / sp), Math.ceil(((ci + 1) * CHUNK) / sp), Math.ceil((cj * CHUNK) / sp), Math.ceil(((cj + 1) * CHUNK) / sp))
    .map(({ rank: _rank, ...r }) => r);
}

// Light sources, placed by seed: campfires and magic stones mostly in clearings and at area
// edges, and ponds that mirror the moon, more of them in the wet area types.
export type LightKind = "campfire" | "stone" | "pond";
export interface LightSource { x: number; z: number; kind: LightKind; size: number }
const WET = new Set(["wetland", "stream", "bog", "beaver-pond", "moor"]);

function lightsInChunk(map: ForestMap, ci: number, cj: number): LightSource[] {
  const L = map.tuning.lightSources, sp = L.spacing, s = map.seed, out: LightSource[] = [];
  const j0 = Math.ceil((cj * CHUNK) / sp), j1 = Math.ceil(((cj + 1) * CHUNK) / sp);
  const i0 = Math.ceil((ci * CHUNK) / sp), i1 = Math.ceil(((ci + 1) * CHUNK) / sp);
  for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
    const x = (i + (hash2(i, j, s + 401) - 0.5) * 0.7) * sp, z = (j + (hash2(i, j, s + 402) - 0.5) * 0.7) * sp;
    if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < map.dancefloor.radius + map.tuning.dancefloor.clearing + 4) continue;
    const a = map.areaAt(x, z), where = a.openness < 0.35 || a.openness > 0.8 ? 1 : 0.25, roll = hash2(i, j, s + 403);
    const wet = WET.has(AREA_TYPES[a.type].id) || !!AREA_TYPES[a.type].layout.terrain?.includes("pools");
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
  constructor(readonly map: ForestMap) {}

  private chunks(x: number, z: number, radius: number): [number, number][] {
    const out: [number, number][] = [];
    for (let cj = Math.floor((z - radius) / CHUNK); cj <= Math.floor((z + radius) / CHUNK); cj++)
      for (let ci = Math.floor((x - radius) / CHUNK); ci <= Math.floor((x + radius) / CHUNK); ci++) out.push([ci, cj]);
    return out;
  }
  private gather<T extends { x: number; z: number }>(cache: Map<string, T[]>, make: (ci: number, cj: number) => T[], x: number, z: number, radius: number): T[] {
    if (cache.size > 600) cache.clear();
    const out: T[] = [];
    for (const [ci, cj] of this.chunks(x, z, radius)) {
      const k = ci + "," + cj;
      let c = cache.get(k);
      if (!c) { c = make(ci, cj); cache.set(k, c); }
      for (const p of c) if (Math.abs(p.x - x) <= radius && Math.abs(p.z - z) <= radius) out.push(p);
    }
    return out;
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
    const m = this.map, A = m.areaSize, out: Plant[] = [];
    if (this.wallFeatureCache.size > 400) this.wallFeatureCache.clear();
    for (let cy = Math.floor((z - radius) / A) - 1; cy <= Math.floor((z + radius) / A) + 1; cy++)
      for (let cx = Math.floor((x - radius) / A) - 1; cx <= Math.floor((x + radius) / A) + 1; cx++) {
        const k = cx + "," + cy;
        let f = this.wallFeatureCache.get(k);
        if (!f) this.wallFeatureCache.set(k, (f = wallFeatures(m, cx, cy)));
        for (const p of pick(f)) if (Math.abs(p.x - x) <= radius && Math.abs(p.z - z) <= radius) out.push(p);
      }
    return out;
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
