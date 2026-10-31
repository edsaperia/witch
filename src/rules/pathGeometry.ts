// Pure path ribbon preparation, shared by the map worker and sliced main-thread fallback.
import { AREA_TYPES, type ForestMap } from './map';
import { floorClearing } from './speakers';
import { hash2 } from './random';

export interface PathGeometry { quads: Map<string, { pos: number[]; uv: number[]; c: number[] }> }
export interface PathGeometryCatalog { kinds: Record<string, { width: number; period: number }>; byArea: Record<string, string[]> }
const NOT_PATHS = new Set(['tarmac', 'railway', 'stairs', 'bridges']);
const prepared = new WeakMap<ForestMap, PathGeometry>();
export const knownPathGeometry = (map: ForestMap): PathGeometry | undefined => prepared.get(map);
export const rememberPathGeometry = (map: ForestMap, data: PathGeometry): void => { prepared.set(map, data); };

export function pathGeometryProblem(data: unknown): string | null {
  const q = data as Partial<PathGeometry> | null;
  if (!q || !(q.quads instanceof Map)) return 'path quads';
  for (const [key, v] of q.quads) {
    if (typeof key !== 'string' || !v || !Array.isArray(v.pos) || !Array.isArray(v.uv) || !Array.isArray(v.c)) return 'path buffers';
    if (v.pos.length % 18 || v.uv.length !== v.pos.length || v.c.length !== v.pos.length / 3 * 2) return 'path buffer lengths';
    if (!v.pos.every(Number.isFinite) || !v.uv.every(Number.isFinite) || !v.c.every(Number.isFinite)) return 'path buffer values';
  }
  return null;
}

export function* pathGeometrySteps(map: ForestMap, catalog: PathGeometryCatalog): Generator<undefined, PathGeometry> {
  const KINDS = catalog.kinds, byArea = catalog.byArea;
    const net = map.paths, seed = map.seed;
    // A path's kind: one of the kinds the area it starts in suits, seeded per area, for its whole
    // length (Ed, v160: no switching mid-path); dirt where none.
    const areaKind = new Map<string, string>();
    const pathKind = (a: { cell: readonly [number, number]; type: number }) => {
      const key = a.cell.join(",");
      let k = areaKind.get(key);
      if (!k) {
        const ok = (byArea[AREA_TYPES[a.type].id] ?? []).filter(k => !NOT_PATHS.has(k) && KINDS[k] && (k !== "magic" || hash2(a.cell[0], a.cell[1], seed + 831) < 0.15));
        k = ok.length ? ok[Math.floor(hash2(a.cell[0], a.cell[1], seed + 833) * ok.length)] : "dirt";
        areaKind.set(key, k);
      }
      return k;
    };
    // One geometry per strip texture (kind and variant).
    const quads = new Map<string, { pos: number[]; uv: number[]; c: number[] }>();
    for (let li = 0; li < net.lines.length; li++) {
      if (li % 16 === 0) yield;
      const l = net.lines[li];
      const variant = l.kind === "rail" ? Math.floor(hash2(li, 1, seed + 835) * 3) : 0;
      const lineKind = l.kind === "path" ? pathKind(l.area ?? map.areaAt(l.pts[0][0], l.pts[0][1])) : "dirt";
      const pts = l.pts, n = pts.length;
      // Distance along the line, and a mitred normal at each point (so neighbouring quads meet).
      const along = [0];
      for (let i = 1; i < n; i++) along.push(along[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const nrm = pts.map((_, i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], d = Math.hypot(dx, dz) || 1;
        return [-dz / d, dx / d];
      });
      const total = along[n - 1];
      // Which segments are drawn (none where the track's gone, nor across the dancefloor's clearing,
      // which the long roads, rails and streams may cross; other cleared spots no longer cut it, Ed
      // v160), and for each
      // point how far it is to the nearer end of its drawn stretch, so the ends fray out.
      const keep = Array.from({ length: n - 1 }, (_, i) => {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2, mz = (pts[i][1] + pts[i + 1][1]) / 2;
        return !(l.kind === "rail" && net.railBroken(mx, mz)) && Math.hypot(mx - map.dancefloor.x, mz - map.dancefloor.z) > floorClearing(map.tuning);
      });
      const runStart: number[] = [], runEnd: number[] = [];
      for (let i = 0, st = 0; i < n - 1; i++) { if (!keep[i]) continue; if (i === 0 || !keep[i - 1]) st = along[i]; runStart[i] = st; }
      for (let i = n - 2, en = 0; i >= 0; i--) { if (!keep[i]) continue; if (i === n - 2 || !keep[i + 1]) en = along[i + 1]; runEnd[i] = en; }
      for (let i = 0; i < n - 1; i++) {
        if (!keep[i]) continue;
        const K = l.kind === "stream" ? { width: l.half * 2, period: 4 } : null;
        const kind = l.kind === "stream" ? "stream" : l.kind === "rail" ? "railway" : l.kind === "road" ? "tarmac" : lineKind;
        const W = K ?? KINDS[kind];
        const key = kind + ":" + variant;
        let q = quads.get(key);
        if (!q) quads.set(key, (q = { pos: [], uv: [], c: [] }));
        const half = (j: number) => (W.width / 2) * (l.deadEnd ? Math.min(1, (total - along[j]) / 6) : 1);
        const corner = (j: number, side: number) => {
          const h = half(j) * side;
          q!.pos.push(pts[j][0] + nrm[j][0] * h, 0.02, pts[j][1] + nrm[j][1] * h);
          q!.uv.push(side > 0 ? 1 : 0, along[j] / W.period, Math.min(along[j] - runStart[i], runEnd[i] - along[j]));
          q!.c.push(pts[j][0], pts[j][1]);
        };
        // Two triangles: (i-, i+, j+) and (i-, j+, j-).
        corner(i, -1); corner(i, 1); corner(i + 1, 1);
        corner(i, -1); corner(i + 1, 1); corner(i + 1, -1);
      }
    }
  return { quads };
}

