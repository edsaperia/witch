// Where trees and bushes stand. Each sits on a staggered grid cell, jittered, and is kept or
// dropped by the map's tree weight, so trees thicken toward area borders and leave a clearing
// round each area's centre. Every cell is decided from the seed alone, so any patch of forest
// can be produced on its own, near the camera, in any order, and always comes out the same.
import { hash2 } from "./random";
import { AREA_TYPES, type ForestMap } from "./map";

export interface Plant {
  x: number;
  z: number;
  /** Area type index: whose leaves and tree shapes it has. */
  type: number;
  /** Which of that type's drawn variants. */
  variant: number;
  flip: boolean;
}

export const TREE_VARIANTS = 6;
export const BUSH_VARIANTS = 4;
const CHUNK = 32; // metres

/** How far north a crown reaches over the ground, seen from the treetop camera. */
export function crownReach(map: ForestMap): number {
  const pitch = (map.tuning.camera.treetop.angleIn * Math.PI) / 180;
  return map.tuning.crownHeight / Math.sin(pitch);
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
      const a = map.areaAt(x, z);
      if (hash2(i, j, s + 103) >= map.treeWeight(x, z) * AREA_TYPES[a.type].treeDensity) continue;
      if (map.treeWeight(x, z - lift) === 0 || map.treeWeight(x - half, z - lift) === 0 || map.treeWeight(x + half, z - lift) === 0) continue;
      out.push({ x, z, type: a.type, variant: Math.floor(hash2(i, j, s + 104) * TREE_VARIANTS), flip: hash2(i, j, s + 105) < 0.5 });
    }
  }
  return out;
}

function bushesInChunk(map: ForestMap, ci: number, cj: number): Plant[] {
  const sp = map.tuning.bushSpacing, s = map.seed, out: Plant[] = [];
  const j0 = Math.ceil((cj * CHUNK) / sp), j1 = Math.ceil(((cj + 1) * CHUNK) / sp);
  const i0 = Math.ceil((ci * CHUNK) / sp), i1 = Math.ceil(((ci + 1) * CHUNK) / sp);
  for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
    const x = (i + (hash2(i, j, s + 201) - 0.5) * 0.9) * sp, z = (j + (hash2(i, j, s + 202) - 0.5) * 0.9) * sp;
    if (hash2(i, j, s + 203) > (0.12 + Math.min(1, map.treeWeight(x, z)) * 0.3) * map.tuning.bushDensity) continue;
    if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < map.dancefloor.radius + 2) continue; // the dancefloor stays clear
    out.push({ x, z, type: map.areaAt(x, z).type, variant: Math.floor(hash2(i, j, s + 204) * BUSH_VARIANTS), flip: hash2(i, j, s + 205) < 0.5 });
  }
  return out;
}

// Wall objects (edges and barriers: puddles, henges, hedges...) stand where areas meet, only in
// the types that have them. They are scenery: nothing blocks movement (Ed, 2026-10-03).
function wallsInChunk(map: ForestMap, ci: number, cj: number): Plant[] {
  const sp = map.tuning.wallSpacing, s = map.seed, out: Plant[] = [];
  const j0 = Math.ceil((cj * CHUNK) / sp), j1 = Math.ceil(((cj + 1) * CHUNK) / sp);
  const i0 = Math.ceil((ci * CHUNK) / sp), i1 = Math.ceil(((ci + 1) * CHUNK) / sp);
  for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
    if (hash2(i, j, s + 303) > map.tuning.wallDensity) continue;
    const x = (i + (hash2(i, j, s + 301) - 0.5) * 0.6) * sp, z = (j + (hash2(i, j, s + 302) - 0.5) * 0.6) * sp, a = map.areaAt(x, z);
    if (a.openness < 0.82 || !AREA_TYPES[a.type].hasWalls) continue;
    if (Math.hypot(x - map.dancefloor.x, z - map.dancefloor.z) < map.dancefloor.radius + 4) continue;
    out.push({ x, z, type: a.type, variant: Math.floor(hash2(i, j, s + 304) * 4), flip: hash2(i, j, s + 305) < 0.5 });
  }
  return out;
}

/** Trees and bushes near a point, chunk by chunk, remembered once made. */
export class Forest {
  private trees = new Map<string, Plant[]>();
  private bushes = new Map<string, Plant[]>();
  private walls = new Map<string, Plant[]>();
  constructor(readonly map: ForestMap) {}

  private chunks(x: number, z: number, radius: number): [number, number][] {
    const out: [number, number][] = [];
    for (let cj = Math.floor((z - radius) / CHUNK); cj <= Math.floor((z + radius) / CHUNK); cj++)
      for (let ci = Math.floor((x - radius) / CHUNK); ci <= Math.floor((x + radius) / CHUNK); ci++) out.push([ci, cj]);
    return out;
  }
  private gather(cache: Map<string, Plant[]>, make: (ci: number, cj: number) => Plant[], x: number, z: number, radius: number): Plant[] {
    if (cache.size > 600) cache.clear();
    const out: Plant[] = [];
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
  wallsNear(x: number, z: number, radius: number): Plant[] {
    return this.gather(this.walls, (i, j) => wallsInChunk(this.map, i, j), x, z, radius);
  }
  /** Set pieces near a point: each stands in its area's clearing, a little north of the centre. */
  setPiecesNear(x: number, z: number, radius: number): Plant[] {
    const m = this.map, A = m.areaSize, out: Plant[] = [];
    for (let cy = Math.floor((z - radius) / A) - 1; cy <= Math.floor((z + radius) / A) + 1; cy++)
      for (let cx = Math.floor((x - radius) / A) - 1; cx <= Math.floor((x + radius) / A) + 1; cx++) {
        if ((cx === m.centreCell[0] && cy === m.centreCell[1]) || !m.setPieceOf(cx, cy)) continue;
        const s = m.siteOf(cx, cy);
        if (Math.abs(s.x - x) <= radius && Math.abs(s.z - 4 - z) <= radius)
          out.push({ x: s.x, z: s.z - 4, type: m.typeOf(cx, cy), variant: 0, flip: hash2(cx, cy, m.seed + 71) < 0.5 });
      }
    return out;
  }
}
