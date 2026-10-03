// Fractal jittered Voronoi partition (Boris the Brave, 2026), ported from the Witch Art Lab's
// makePartition. Layer 0 is a jittered grid of area sites, one per unit cell. Each finer layer
// halves the grid; every site's parent is its nearest site one layer up. A point belongs to the
// root reached from its nearest site at the deepest layer, which gives areas fractal,
// coastline-like borders. Every point is computed on its own from the seed: no diagram is built.
import { hash2 } from "./random";

/** An area's grid cell: [column, row] of its layer-0 site. */
export type Cell = readonly [number, number];

export interface Partition {
  readonly seed: number;
  readonly depth: number;
  /** The layer-0 site (the area's centre) of the area in cell (cx, cy), in partition units. */
  site(cx: number, cy: number): [number, number];
  /** The area a point belongs to. */
  partition(px: number, py: number): Cell;
  /** 0 at the area's site, about 1 at its border (against the nearest other site). */
  centreness(px: number, py: number, rc: Cell): number;
  /** 0 at any layer-0 site, about 1 midway between two: centreness measured from the nearest
   *  site, whichever area the point falls in. About one area in eight has its own site inside a
   *  neighbour (the fractal borders wander), so clearings are placed by this, and every area
   *  keeps a clearing round its site. */
  openness(px: number, py: number): number;
}

export function makePartition(seed: number, depth: number): Partition {
  const siteCache = new Map<number, [number, number]>();
  const rootCache = new Map<number, Cell>();
  // Integer keys: layers stay under 16 and cells within +-2^20, which a 20 x 20 map never nears.
  const key = (layer: number, cx: number, cy: number) => (layer * 2097152 + (cx + 1048576)) * 2097152 + (cy + 1048576);
  const site = (layer: number, cx: number, cy: number): [number, number] => {
    const k = key(layer, cx, cy);
    let s = siteCache.get(k);
    if (!s) {
      const c = Math.pow(2, -layer);
      s = [c * (cx + hash2(cx * 7 + layer, cy, seed)), c * (cy + hash2(cx, cy * 13 + layer, seed + 1))];
      siteCache.set(k, s);
    }
    return s;
  };
  const nearest = (layer: number, px: number, py: number): Cell => {
    const c = Math.pow(2, -layer), gx = Math.floor(px / c), gy = Math.floor(py / c);
    let bx = gx, by = gy, bd = Infinity;
    for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
      const s = site(layer, gx + dx, gy + dy), d = (s[0] - px) ** 2 + (s[1] - py) ** 2;
      if (d < bd) { bd = d; bx = gx + dx; by = gy + dy; }
    }
    return [bx, by];
  };
  const root = (layer: number, cx: number, cy: number): Cell => {
    const k = key(layer, cx, cy);
    let r = rootCache.get(k);
    if (r) return r;
    if (layer === 0) r = [cx, cy];
    else {
      const s = site(layer, cx, cy), p = nearest(layer - 1, s[0], s[1]);
      r = root(layer - 1, p[0], p[1]);
    }
    rootCache.set(k, r);
    return r;
  };
  return {
    seed,
    depth,
    site: (cx, cy) => site(0, cx, cy),
    partition(px, py) { const c = nearest(depth, px, py); return root(depth, c[0], c[1]); },
    centreness(px, py, rc) {
      const s = site(0, rc[0], rc[1]), d1 = Math.hypot(px - s[0], py - s[1]);
      let d2 = Infinity;
      const gx = Math.floor(px), gy = Math.floor(py);
      for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
        const cx = gx + dx, cy = gy + dy;
        if (cx === rc[0] && cy === rc[1]) continue;
        const o = site(0, cx, cy);
        d2 = Math.min(d2, Math.hypot(px - o[0], py - o[1]));
      }
      return Math.min(1, (2 * d1) / (d1 + d2));
    },
    openness(px, py) {
      let d1 = Infinity, d2 = Infinity;
      const gx = Math.floor(px), gy = Math.floor(py);
      for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
        const o = site(0, gx + dx, gy + dy), d = Math.hypot(px - o[0], py - o[1]);
        if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
      }
      return Math.min(1, (2 * d1) / (d1 + d2));
    },
  };
}
