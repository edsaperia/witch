// Where trees and bushes stand. Each sits on a staggered grid cell, jittered, and is kept or
// dropped by the map's tree weight, so trees thicken toward area borders and leave a clearing
// round each area's centre. Every cell is decided from the seed alone, so any patch of forest
// can be produced on its own, near the camera, in any order, and always comes out the same.
import { hash2 } from "./random";
import type { ForestMap } from "./map";

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
      const w = Math.min(map.treeWeight(x, z), map.treeWeight(x, z - lift), map.treeWeight(x - half, z - lift), map.treeWeight(x + half, z - lift), map.treeWeight(x, z - lift * 1.6));
      if (hash2(i, j, s + 103) > w * 1.3) continue;
      const a = map.areaAt(x, z);
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
    if (hash2(i, j, s + 203) > (0.12 + map.treeWeight(x, z) * 0.6) * map.tuning.bushDensity) continue;
    out.push({ x, z, type: map.areaAt(x, z).type, variant: Math.floor(hash2(i, j, s + 204) * BUSH_VARIANTS), flip: hash2(i, j, s + 205) < 0.5 });
  }
  return out;
}

/** Trees and bushes near a point, chunk by chunk, remembered once made. */
export class Forest {
  private trees = new Map<string, Plant[]>();
  private bushes = new Map<string, Plant[]>();
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
}
