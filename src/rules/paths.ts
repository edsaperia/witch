// Paths, roads and railways (Ed, 2026-10-03): worn paths meander between areas' glades, fork,
// loop and sometimes stop at a dead end; a broad old road or two sweeps across the forest; and
// two to four railway lines cross many areas in long, gentle curves, with a branch line, broken
// sections where the track is gone and trees grow between the sleepers. They carve tree-free
// corridors with bushes along their edges. Seeded, so they never change; no drawing here.
import { clamp, hash2, rng, vnoise } from "./random";
import type { ForestMap } from "./map";

export type PathKind = "path" | "road" | "rail";
export const PATH_KINDS: PathKind[] = ["path", "road", "rail"];

export interface PathLine {
  kind: PathKind;
  /** The centreline, sampled every few metres. */
  pts: [number, number][];
  /** Half the corridor's width (metres). */
  half: number;
  /** A path out to nothing in particular: it peters out at its far end. */
  deadEnd?: boolean;
}

export interface PathHit { kind: PathKind; line: number; /** distance from the centreline */ d: number; /** index of the nearest segment */ seg: number }

/** A smooth curve through control points (centripetal Catmull-Rom), sampled every `step` metres. */
export function spline(ctrl: [number, number][], step: number): [number, number][] {
  const out: [number, number][] = [];
  const P = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    const len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), n = Math.max(1, Math.ceil(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(ctrl[ctrl.length - 1]);
  return out;
}

export class PathNetwork {
  readonly lines: PathLine[] = [];
  private grid = new Map<string, [number, number][]>(); // cell -> [line, segment]
  private readonly cell = 24;

  constructor(readonly map: ForestMap) {
    // Railways and roads run off the map's whole extent, so they leave it rather than stop at its edge.
    const t = map.tuning.paths, b = map.extent, r = rng(map.seed * 7 + 4242);
    const W = b.maxX - b.minX, H = b.maxZ - b.minZ;
    const edgePoint = (side: number, u: number): [number, number] =>
      side === 0 ? [b.minX + u * W, b.minZ] : side === 1 ? [b.maxX, b.minZ + u * H] : side === 2 ? [b.minX + u * W, b.maxZ] : [b.minX, b.minZ + u * H];
    // A long line from one edge to another: control points every `spacing` metres, nudged
    // sideways by up to `wander`, so it bends in wide, gentle curves.
    const crossing = (from: [number, number], to: [number, number], spacing: number, wander: number): [number, number][] => {
      const dx = to[0] - from[0], dz = to[1] - from[1], len = Math.hypot(dx, dz), n = Math.max(2, Math.round(len / spacing));
      const ctrl: [number, number][] = [from];
      let off = 0;
      for (let i = 1; i < n; i++) {
        off = clamp(off + (r() - 0.5) * wander, -wander, wander);
        const k = i / n;
        ctrl.push([clamp(from[0] + dx * k - (dz / len) * off, b.minX, b.maxX), clamp(from[1] + dz * k + (dx / len) * off, b.minZ, b.maxZ)]);
      }
      ctrl.push(to);
      return spline(ctrl, 3);
    };
    // Railways: two to four lines, edge to edge, in wide curves; one with a branch line.
    const rails = t.rails[0] + Math.floor(r() * (t.rails[1] - t.rails[0] + 1));
    for (let i = 0; i < rails; i++) {
      const s = Math.floor(r() * 4), e = (s + 2 + (r() < 0.3 ? (r() < 0.5 ? 1 : -1) : 0) + 4) % 4;
      const pts = crossing(edgePoint(s, 0.15 + r() * 0.7), edgePoint(e, 0.15 + r() * 0.7), 320, 140);
      this.lines.push({ kind: "rail", pts, half: t.railHalf });
      if (i === 0 && pts.length > 20) {
        const at = pts[Math.floor(pts.length * (0.3 + r() * 0.4))], side = Math.floor(r() * 4);
        this.lines.push({ kind: "rail", pts: crossing(at, edgePoint(side, 0.2 + r() * 0.6), 300, 120), half: t.railHalf });
      }
    }
    // Old roads: fewer, broad, sweeping; they may cross a railway (a level crossing).
    const roads = t.roads[0] + Math.floor(r() * (t.roads[1] - t.roads[0] + 1));
    for (let i = 0; i < roads; i++) {
      const s = Math.floor(r() * 4), e = (s + 2) % 4;
      this.lines.push({ kind: "road", pts: crossing(edgePoint(s, 0.1 + r() * 0.8), edgePoint(e, 0.1 + r() * 0.8), 240, 110), half: t.roadHalf });
    }
    // Paths: between neighbouring areas' centres (some pairs), meandering; and a dead end or two
    // in some areas, out to nothing in particular (a ruin, later).
    const seen = new Set<string>();
    for (const [k, nbrs] of map.neighbours) {
      const [ax, ay] = k.split(",").map(Number);
      for (const nk of nbrs) {
        const pair = k < nk ? `${k}|${nk}` : `${nk}|${k}`;
        if (seen.has(pair)) continue;
        seen.add(pair);
        const [bx, by] = nk.split(",").map(Number);
        if (bx < 0 || by < 0 || bx >= map.n || by >= map.n) continue;
        if (hash2(ax * 31 + bx, ay * 31 + by, map.seed + 811) > t.linkChance) continue;
        const [a, c] = this.trim(map.siteOf(ax, ay), map.siteOf(bx, by), this.clearOf(ax, ay), this.clearOf(bx, by));
        if (a) this.lines.push({ kind: "path", pts: this.meander(a, c, r), half: t.pathHalf });
      }
      if (hash2(ax, ay, map.seed + 813) < t.deadEndChance) {
        const s = map.siteOf(ax, ay), a = r() * Math.PI * 2, d = 30 + r() * 40, k = this.clearOf(ax, ay);
        const from = { x: s.x + Math.cos(a) * k, z: s.z + Math.sin(a) * k };
        this.lines.push({ kind: "path", pts: this.meander(from, { x: from.x + Math.cos(a) * d, z: from.z + Math.sin(a) * d }, r), half: t.pathHalf, deadEnd: true });
      }
    }
    this.lines.forEach((l, li) => {
      for (let i = 0; i < l.pts.length - 1; i++) {
        const [a, c] = [l.pts[i], l.pts[i + 1]], pad = l.half + 4;
        for (let gx = Math.floor((Math.min(a[0], c[0]) - pad) / this.cell); gx <= Math.floor((Math.max(a[0], c[0]) + pad) / this.cell); gx++)
          for (let gz = Math.floor((Math.min(a[1], c[1]) - pad) / this.cell); gz <= Math.floor((Math.max(a[1], c[1]) + pad) / this.cell); gz++) {
            const key = `${gx},${gz}`;
            let list = this.grid.get(key);
            if (!list) this.grid.set(key, (list = []));
            list.push([li, i]);
          }
      }
    });
  }

  /** How far short of an area's centre its paths stop: at the edge of its clearing, so they lead
   *  into it but never run under its soundsystem, set piece or the dancefloor. */
  private clearOf(cx: number, cy: number): number {
    const m = this.map, home = cx === m.centreCell[0] && cy === m.centreCell[1];
    return home ? m.dancefloor.radius + m.tuning.dancefloor.clearing + 2 : m.tuning.setPieceClear * m.tuning.setPieceScale + 2;
  }
  private trim(a: { x: number; z: number }, b: { x: number; z: number }, ka: number, kb: number): [{ x: number; z: number } | null, { x: number; z: number }] {
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz);
    if (len < ka + kb + 10) return [null, b];
    return [{ x: a.x + (dx / len) * ka, z: a.z + (dz / len) * ka }, { x: b.x - (dx / len) * kb, z: b.z - (dz / len) * kb }];
  }

  /** A wandering path from a to b: a curve through a few points nudged sideways by noise. */
  private meander(a: { x: number; z: number }, b: { x: number; z: number }, r: () => number): [number, number][] {
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.max(1, Math.hypot(dx, dz)), n = Math.max(2, Math.round(len / 25));
    const ctrl: [number, number][] = [[a.x, a.z]];
    // Bends to alternate sides (an S, never a straight line), each a random share of the swing.
    const swing = Math.min(18, len * 0.15), side = r() < 0.5 ? 1 : -1;
    for (let i = 1; i < n; i++) {
      const k = i / n, off = swing * (0.4 + 0.6 * r()) * (i % 2 ? side : -side);
      ctrl.push([a.x + dx * k - (dz / len) * off, a.z + dz * k + (dx / len) * off]);
    }
    ctrl.push([b.x, b.z]);
    return spline(ctrl, 2);
  }

  /** The nearest path, road or railway corridor at (x, z), if within `extra` metres of its edge. */
  at(x: number, z: number, extra = 0): PathHit | null {
    const list = this.grid.get(`${Math.floor(x / this.cell)},${Math.floor(z / this.cell)}`);
    if (!list) return null;
    let best: PathHit | null = null;
    for (const [li, si] of list) {
      const l = this.lines[li], [a, c] = [l.pts[si], l.pts[si + 1]];
      const ex = c[0] - a[0], ez = c[1] - a[1], L2 = ex * ex + ez * ez || 1;
      const u = clamp(((x - a[0]) * ex + (z - a[1]) * ez) / L2, 0, 1), d = Math.hypot(x - a[0] - ex * u, z - a[1] - ez * u);
      if (d > l.half + extra) continue;
      if (!best || d - l.half < best.d - this.lines[best.line].half) best = { kind: l.kind, line: li, d, seg: si };
    }
    return best;
  }

  /** How a point's trees and bushes are changed by the corridors: trees (0 on a corridor; a few on a
   *  broken railway, between the sleepers), bushes (0 on it, bushBoost along its edges). */
  clearance(x: number, z: number): { trees: number; bushes: number } {
    const T = this.map.tuning.paths, h = this.at(x, z, T.edgeBushes);
    if (!h) return { trees: 1, bushes: 1 };
    const half = this.lines[h.line].half;
    if (h.d > half) return { trees: 1, bushes: T.bushBoost };
    if (h.kind === "rail" && this.railBroken(x, z)) return { trees: T.treesOnBroken, bushes: 1 };
    return { trees: 0, bushes: 0 };
  }

  /** Whether a railway is broken here (no track: trees may grow), by a noise along the line. */
  railBroken(x: number, z: number): boolean {
    return vnoise(x / 60, z / 60, this.map.seed + 817) < this.map.tuning.paths.railBroken;
  }
}
