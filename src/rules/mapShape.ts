// The map's shape (Ed, 2026-10-06: "The map as a whole should be circular rather than square, with
// a buffer zone with no runestones around the edge"): where she may fly, as a box (the square map,
// ?shape=square) or the island's land (the land map, rules/land.ts: its coast following its areas' borders, Ed 2026-10-11),
// and the helpers that keep a point in it. The island's edge is soft: over its last `push` metres her outward speed eases to
// nothing and a little drift takes her back in. Its coast isn't a perfect circle (Ed, 2026-10-06: "The island
// shouldn't be a totally perfect circle; make the coast slightly irregular"): which areas are the island's is by their
// centres' distance from home over the coast at that angle (makeCoast; map.coast), and the coast runs round their borders.

import type { LandMap } from "./land";
import { rng } from "./random";

/** The coast's knobs: amp, the most it strays from round (a share of the radius); harmonics, how many
 *  gentle bays and headlands (the 2nd harmonic up); detail, a little finer wobble on top (its share). */
export interface CoastKnobs { amp: number; harmonics: number; detail: number }

/** The coast round home for a seed: its radius at an angle (radians, atan2(z, x) from home) as a
 *  factor of the round radius, 1 - amp to 1 + amp. Low harmonics with seeded weights and phases,
 *  a few finer ones for detail; the same function for every edge, and for the beach and sea. */
export function makeCoast(seed: number, k: CoastKnobs | undefined): (angle: number) => number {
  if (!k || k.amp <= 0) return () => 1;
  const r = rng(seed * 7121 + 4049), terms: [number, number, number][] = []; // (harmonic, weight, phase)
  for (let h = 0; h < Math.max(1, Math.round(k.harmonics)); h++) terms.push([2 + h, 0.5 + 0.5 * r(), r() * Math.PI * 2]);
  const fine = [7, 11, 17, 23];
  for (let i = 0; i < fine.length; i++) terms.push([fine[i], k.detail * 0.5 ** i * (0.5 + 0.5 * r()), r() * Math.PI * 2]);
  const total = terms.reduce((t, [, w]) => t + w, 0) || 1;
  return (angle: number) => { let s = 0; for (const [h, w, ph] of terms) s += w * Math.sin(h * angle + ph); return 1 + k.amp * (s / total); };
}

/** Where she may fly (metres): the box round it, and, on the island, its land (she flies over all of it, up to its coast). */
export interface Bounds {
  minX: number; maxX: number; minZ: number; maxZ: number;
  /** The island's land map (rules/land.ts); absent on the square map. */
  land?: LandMap;
  /** The lakes' water (rules/lakes.ts): a land map whose "land" is the lakes' water (+ on a lake); absent with no lakes. */
  lakes?: LandMap;
  /** The zoo's fences (rules/zooMap.ts): round every island, crossed only in the air. */
  fence?: import("./zooMap").ZooFence;
  /** The map's seed (the beach's width varies by it). */
  seed?: number;
}

/** The nearest point to (x, z) inside the bounds, `pad` metres in from the edge. */
export function keepIn(b: Bounds, x: number, z: number, pad = 0): { x: number; z: number } {
  const L = b.land;
  if (L) {
    let px = x, pz = z;
    // (stepped in along the land's slope: once is nearly always enough, a few times round a sharp corner)
    for (let k = 0; k < 4; k++) {
      const d = L.distAt(px, pz);
      if (d >= pad) return k ? { x: px, z: pz } : { x, z };
      const n = L.inward(px, pz);
      px += n.x * (pad - d + 0.01); pz += n.z * (pad - d + 0.01);
    }
    return { x: px, z: pz };
  }
  return { x: Math.min(b.maxX - pad, Math.max(b.minX + pad, x)), z: Math.min(b.maxZ - pad, Math.max(b.minZ + pad, z)) };
}

/** Is (x, z) inside the bounds, more than `pad` metres in from the edge? */
export function isInside(b: Bounds, x: number, z: number, pad = 0): boolean {
  if (b.land) return b.land.distAt(x, z) > pad;
  return x > b.minX + pad && x < b.maxX - pad && z > b.minZ + pad && z < b.maxZ - pad;
}

/** A point `beyond` metres past the edge nearest (x, z): where a creature running off the map makes for. */
export function exitPoint(b: Bounds, x: number, z: number, beyond: number): { x: number; z: number } {
  if (b.land) { const s = b.land.shore(x, z); return { x: s.x + s.nx * beyond, z: s.z + s.nz * beyond }; }
  const edges = [[b.minX - beyond, z, x - b.minX], [b.maxX + beyond, z, b.maxX - x], [x, b.minZ - beyond, z - b.minZ], [x, b.maxZ + beyond, b.maxZ - z]];
  const e = edges.reduce((m, q) => (q[2] < m[2] ? q : m));
  return { x: e[0], z: e[1] };
}

/** The island's soft edge, on her velocity at (x, z): within `push` metres of the coast her speed outward is held under a
 *  share of `max` falling to nothing at the coast, and in the outer half of that band a drift of up to `drift` m/s takes her
 *  back in. On the square map, unchanged. */
export function softEdge(b: Bounds, x: number, z: number, vx: number, vz: number, max: number, push: number, drift: number): { vx: number; vz: number } {
  const L = b.land;
  if (!L || push <= 0) return { vx, vz };
  const d = L.distAt(x, z);
  if (d > push) return { vx, vz };
  const w = L.inward(x, z), nx = -w.x, nz = -w.z, k = Math.min(1, Math.max(0, (push - d) / push));
  const out = vx * nx + vz * nz, allowed = (1 - k) * max - drift * Math.max(0, 2 * k - 1);
  if (out <= allowed) return { vx, vz };
  return { vx: vx - nx * (out - allowed), vz: vz - nz * (out - allowed) };
}

/** The beach round the island (Ed, 2026-10-06; the tuning's `beach`): the sand from about `width` metres in from the coast (the
 *  edge of her flight), the sea from `out` metres past it, all the way round (lake shores too, when there are lakes). Its width
 *  varies along the coast (Ed, 2026-10-06: "The beach can be more irregularly shaped"; the tuning's beach.vary): wide bays,
 *  narrow stretches, rocky ones where it nearly vanishes, by its own seeded noise along each loop of coast. */
export interface Beach {
  land: LandMap; width: number; out: number;
  /** Each land-map sample's sand width (m) and how rocky (0 to 1), its nearest coast's; and the way to that point of the coast
   *  from it (m, x and z interleaved): the ground shader's texture. */
  sand: Float32Array; rocky: Float32Array; toCoast: Float32Array;
  /** The sand's width (m) at (x, z), its nearest coast's, eased between the land map's samples. */
  sandAt(x: number, z: number): number;
  /** How rocky the beach is at (x, z), its nearest coast's, 0 to 1 (its narrowest stretches: rocks among the shells). */
  rockyAt(x: number, z: number): number;
  /** The nearest point of the coast to (x, z), eased between the land map's samples (as the ground shader has it: toCoast). */
  coastAt(x: number, z: number, out?: { x: number; z: number }): { x: number; z: number };
  /** The sand's width and how rocky, `s` metres round loop `loop` of the coast. */
  sandAlong(loop: number, s: number): number;
  rockyAlong(loop: number, s: number): number;
  /** How far (x, z) is past where the sand starts (negative inland). */
  intoSand(x: number, z: number): number;
  /** How far (x, z) is past where the sea starts (negative on land). */
  intoSea(x: number, z: number): number;
}
/** The beach's width knobs (the tuning's beach.vary): amp, how far it strays from `width` (as a power of e: 0.8 gives
 *  about 0.45 to 2.2 times); harmonics, how many bays and narrows round a loop of coast; rocky, below how far down the noise
 *  (0 to 1) a stretch turns rocky, narrowing to rockyWidth metres; min, the narrowest it ever is. */
export interface BeachVary { amp: number; harmonics: number; rocky: number; rockyWidth: number; min: number }
type BeachKnobs = { on: boolean; width: number; shore: number; vary?: BeachVary };
const beaches = new WeakMap<LandMap, { knobs: BeachKnobs; seed: number; beach: Beach }>();
/** The beach round these bounds' island (made once for its land map and tuning, then remembered: the witch asks every step). */
export function beachOf(b: Bounds, t: { beach?: BeachKnobs }): Beach | null {
  const L = b.land, B = t.beach;
  if (!L || !B?.on) return null;
  const had = beaches.get(L), seed = b.seed ?? 0;
  if (had && had.knobs === B && had.seed === seed) return had.beach; // (nothing made a step)
  const beach = makeBeach(L, seed, B);
  beaches.set(L, { knobs: B, seed, beach });
  return beach;
}
/** The sand's width along a loop of coast (N samples evenly round it) and how rocky each stretch is: `width` times e to the
 *  amp times a seeded smooth noise round the loop (low harmonics: bays and narrows), the lowest stretches rocky, narrowing to
 *  rockyWidth; never under min. */
export function sandWidths(seed: number, width: number, V: BeachVary | undefined, N = 128): { sand: Float32Array; rocky: Float32Array } {
  const sand = new Float32Array(N).fill(width), rocky = new Float32Array(N);
  if (!V || V.amp <= 0) return { sand, rocky };
  const r = rng(seed * 9173 + 71), terms: [number, number, number][] = [];
  for (let h = 0; h < Math.max(1, Math.round(V.harmonics)); h++) terms.push([2 + h, 0.4 + r(), r() * Math.PI * 2]);
  const raw = new Float32Array(N);
  let lo = Infinity, hi = -Infinity;
  for (let k = 0; k < N; k++) { const a = -Math.PI + (k / N) * Math.PI * 2; let s = 0; for (const [h, w, ph] of terms) s += w * Math.sin(h * a + ph); raw[k] = s; lo = Math.min(lo, s); hi = Math.max(hi, s); }
  const smooth = (u: number) => u * u * (3 - 2 * u);
  for (let k = 0; k < N; k++) {
    const n = hi > lo ? ((raw[k] - lo) / (hi - lo)) * 2 - 1 : 0; // (-1 at its narrowest, 1 at its widest)
    const rk = smooth(Math.max(0, Math.min(1, (-n - V.rocky) / Math.max(1e-3, 1 - V.rocky)))) ;
    rocky[k] = rk;
    const w = width * Math.exp(V.amp * n);
    sand[k] = Math.max(V.min, w + (Math.min(w, V.rockyWidth) - w) * rk);
  }
  return { sand, rocky };
}
/** How far round a loop of coast the beach's width is sampled (m): its bays come round about the same size on any loop. */
const SAND_STEP = 24;
function makeBeach(L: LandMap, seed: number, B: BeachKnobs): Beach {
  // Each loop's sand by its own noise (the sea's coast seeded by the map, a lake's shore by its place among the loops).
  const per = L.loops.map((loop, i) => {
    const N = Math.max(16, Math.round(loop.length / SAND_STEP)), V = B.vary && { ...B.vary, harmonics: Math.max(1, Math.round(B.vary.harmonics * Math.min(1, loop.length / 3800))) };
    return { N, ...sandWidths(seed + i * 101, B.width, V, N) };
  });
  const lookup = (A: "sand" | "rocky") => (loop: number, s: number) => {
    const P = per[loop], len = L.loops[loop].length, u = ((((s / len) % 1) + 1) % 1) * P.N, i = Math.floor(u), f = u - i, X = P[A];
    return X[i % P.N] + (X[(i + 1) % P.N] - X[i % P.N]) * f;
  };
  const sandAlong = lookup("sand"), rockyAlong = lookup("rocky");
  // Every sample's, by its nearest coast.
  const N = L.cols * L.rows, sand = new Float32Array(N), rocky = new Float32Array(N), toCoast = new Float32Array(N * 2);
  for (let k = 0; k < N; k++) {
    const sg = L.seg[k];
    if (sg < 0) { sand[k] = B.width; continue; }
    // (at the point of its stretch nearest the sample)
    const loop = L.segLoop[sg], q = L.segAt[sg], P = L.loops[loop].pts, n = P.length / 2, r = (q + 1) % n, x = L.x0 + (k % L.cols) * L.step, z = L.z0 + Math.floor(k / L.cols) * L.step;
    const ax = P[q * 2], az = P[q * 2 + 1], dx = P[r * 2] - ax, dz = P[r * 2 + 1] - az, l2 = dx * dx + dz * dz, u = l2 > 0 ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2)) : 0;
    const s = L.loops[loop].at[q] + u * Math.sqrt(l2);
    sand[k] = sandAlong(loop, s); rocky[k] = rockyAlong(loop, s); toCoast[k * 2] = ax + dx * u - x; toCoast[k * 2 + 1] = az + dz * u - z;
  }
  const ease = (A: Float32Array) => (x: number, z: number) => {
    const u = (x - L.x0) / L.step, v = (z - L.z0) / L.step;
    const iu = Math.max(0, Math.min(L.cols - 2, Math.floor(u))), iv = Math.max(0, Math.min(L.rows - 2, Math.floor(v)));
    const fu = Math.max(0, Math.min(1, u - iu)), fv = Math.max(0, Math.min(1, v - iv)), k = iv * L.cols + iu;
    return (A[k] * (1 - fu) + A[k + 1] * fu) * (1 - fv) + (A[k + L.cols] * (1 - fu) + A[k + L.cols + 1] * fu) * fv;
  };
  const sandAt = ease(sand), rockyAt = ease(rocky);
  const coastAt = (x: number, z: number, out = { x: 0, z: 0 }) => {
    const u = (x - L.x0) / L.step, v = (z - L.z0) / L.step;
    const iu = Math.max(0, Math.min(L.cols - 2, Math.floor(u))), iv = Math.max(0, Math.min(L.rows - 2, Math.floor(v)));
    const fu = Math.max(0, Math.min(1, u - iu)), fv = Math.max(0, Math.min(1, v - iv)), k = iv * L.cols + iu, C = L.cols, T = toCoast;
    const e = (o: number) => (T[k * 2 + o] * (1 - fu) + T[(k + 1) * 2 + o] * fu) * (1 - fv) + (T[(k + C) * 2 + o] * (1 - fu) + T[(k + C + 1) * 2 + o] * fu) * fv;
    out.x = x + e(0); out.z = z + e(1);
    return out;
  };
  return { land: L, width: B.width, out: B.shore, sand, rocky, toCoast, sandAt, rockyAt, coastAt, sandAlong, rockyAlong,
    intoSand: (x, z) => sandAt(x, z) - L.distAt(x, z), intoSea: (x, z) => -L.distAt(x, z) - B.shore };
}
