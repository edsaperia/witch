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
  /** The area a point belongs to, and how far (partition units) it can move in any direction and
   *  surely stay in it: half the gap between its nearest and second-nearest deepest-layer sites
   *  (moving d changes each distance by at most d, so the nearest stays nearest). */
  partitionSafe(px: number, py: number): { cell: Cell; safe: number };
  /** 0 at the area's site, about 1 at its border (against the nearest other site). */
  centreness(px: number, py: number, rc: Cell): number;
  /** 0 at any layer-0 site, about 1 midway between two: centreness measured from the nearest
   *  site, whichever area the point falls in. About one area in eight has its own site inside a
   *  neighbour (the fractal borders wander), so clearings are placed by this, and every area
   *  keeps a clearing round its site. */
  openness(px: number, py: number): number;
}

/** Home settled first (Ed, 2026-10-05: "Home area should be big enough that the whole circle,
 *  centre the dancefloor, edge the treehouse, is within it"): every point within `radius` of
 *  `cell`'s site belongs to it, and every other area's site stands at least `gap` beyond that
 *  circle, so the areas round it are made round it (partition units). */
export interface HomeCircle { cell: Cell; radius: number; gap: number }

export function makePartition(seed: number, depth: number, home?: HomeCircle): Partition {
  const siteCache = new Map<number, [number, number]>();
  const rootCache = new Map<number, Cell>();
  // Integer keys: layers stay under 16 and cells within +-2^20, which a 20 x 20 map never nears.
  // (small integers where the cell is within ±1024, which every map's is: V8 keeps them unboxed, so a cache lookup makes
  // no heap number; phase 2's GC audit. Anything further out keeps the old wide key, negated so the two never meet.)
  const key = (layer: number, cx: number, cy: number) =>
    cx >= -1024 && cx < 1024 && cy >= -1024 && cy < 1024 && layer < 64 ? (layer * 2048 + (cx + 1024)) * 2048 + (cy + 1024) : -1 - (layer * 2097152 + (cx + 1048576)) * 2097152 - (cy + 1048576);
  const site = (layer: number, cx: number, cy: number): [number, number] => {
    const k = key(layer, cx, cy);
    let s = siteCache.get(k);
    if (!s) {
      const c = Math.pow(2, -layer);
      s = [c * (cx + hash2(cx * 7 + layer, cy, seed)), c * (cy + hash2(cx, cy * 13 + layer, seed + 1))];
      // Home's neighbours keep their sites out past its circle (pushed straight out from its site).
      if (home && layer === 0 && !(cx === home.cell[0] && cy === home.cell[1])) {
        const h = site(0, home.cell[0], home.cell[1]), dx = s[0] - h[0], dy = s[1] - h[1], d = Math.hypot(dx, dy), R = home.radius + home.gap;
        if (d < R) { const a = d > 1e-9 ? Math.atan2(dy, dx) : hash2(cx, cy, seed + 7) * Math.PI * 2; s = [h[0] + Math.cos(a) * R, h[1] + Math.sin(a) * R]; }
      }
      siteCache.set(k, s);
    }
    return s;
  };
  // The 5 x 5 sites round a grid cell, kept in a direct-mapped table of RINGS rings (by layer and cell): neighbouring
  // lookups (a walker, a tile of texels) mostly fall in the same cell, and with every area peopled, creatures walking all
  // over the map each come back to their own few (one remembered ring a layer was rebuilt from 25 map lookups at almost
  // every call). ringOf returns the ring's offset into RING_XY: 25 sites as x, y.
  const RINGS = 2048, ringKey = new Float64Array(RINGS).fill(NaN), RING_XY = new Float64Array(RINGS * 50);
  const ringOf = (layer: number, gx: number, gy: number): number => {
    const k = key(layer, gx, gy), slot = ((Math.imul(gx, 73856093) ^ Math.imul(gy, 19349663) ^ Math.imul(layer, 83492791)) >>> 0) % RINGS, o = slot * 50;
    if (ringKey[slot] !== k) {
      let i = o;
      for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) { const q = site(layer, gx + dx, gy + dy); RING_XY[i++] = q[0]; RING_XY[i++] = q[1]; }
      ringKey[slot] = k;
    }
    return o;
  };
  const nearest = (layer: number, px: number, py: number): Cell => {
    const c = Math.pow(2, -layer), gx = Math.floor(px / c), gy = Math.floor(py / c), o = ringOf(layer, gx, gy), xy = RING_XY;
    let bi = 0, bd = Infinity;
    for (let i = 0; i < 25; i++) { const d = (xy[o + 2 * i] - px) ** 2 + (xy[o + 2 * i + 1] - py) ** 2; if (d < bd) { bd = d; bi = i; } }
    return [gx + Math.floor(bi / 5) - 2, gy + (bi % 5) - 2];
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
  // How far a point is from home's site (Infinity with no home circle).
  const fromHome = (px: number, py: number) => { if (!home) return Infinity; const h = site(0, home.cell[0], home.cell[1]); return Math.hypot(px - h[0], py - h[1]); };
  return {
    seed,
    depth,
    site: (cx, cy) => site(0, cx, cy),
    partition(px, py) {
      if (home && fromHome(px, py) < home.radius) return home.cell;
      // (nearest(depth, ...) inline, its cell in locals: no tuple a call before root's cached one; phase 2's GC audit)
      const c = Math.pow(2, -depth), gx = Math.floor(px / c), gy = Math.floor(py / c), o = ringOf(depth, gx, gy), xy = RING_XY;
      let bi = 0, bd = Infinity;
      for (let i = 0; i < 25; i++) { const d = (xy[o + 2 * i] - px) ** 2 + (xy[o + 2 * i + 1] - py) ** 2; if (d < bd) { bd = d; bi = i; } }
      return root(depth, gx + Math.floor(bi / 5) - 2, gy + (bi % 5) - 2);
    },
    partitionSafe(px, py) {
      const dh = fromHome(px, py);
      if (home && dh < home.radius) return { cell: home.cell, safe: Math.min(Math.pow(2, -depth), home.radius - dh) }; // (capped as below)
      const c = Math.pow(2, -depth), gx = Math.floor(px / c), gy = Math.floor(py / c), o = ringOf(depth, gx, gy), xy = RING_XY;
      let bi = 0, d1 = Infinity, d2 = Infinity;
      for (let i = 0; i < 25; i++) {
        const d = (xy[o + 2 * i] - px) ** 2 + (xy[o + 2 * i + 1] - py) ** 2;
        if (d < d1) { d2 = d1; d1 = d; bi = i; } else if (d < d2) d2 = d;
      }
      const bx = gx + Math.floor(bi / 5) - 2, by = gy + (bi % 5) - 2;
      // The search window holds every site that could be nearest within c of the point, so the margin is capped there.
      return { cell: root(depth, bx, by), safe: Math.min(c, (Math.sqrt(d2) - Math.sqrt(d1)) / 2, dh - (home ? home.radius : 0)) };
    },
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
      const o = ringOf(0, Math.floor(px), Math.floor(py)), xy = RING_XY;
      for (let i = 0; i < 25; i++) {
        const d = (xy[o + 2 * i] - px) ** 2 + (xy[o + 2 * i + 1] - py) ** 2;
        if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
      }
      d1 = Math.sqrt(d1); d2 = Math.sqrt(d2);
      return Math.min(1, (2 * d1) / (d1 + d2));
    },
  };
}
