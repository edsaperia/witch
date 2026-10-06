// The map's shape (Ed, 2026-10-06: "The map as a whole should be circular rather than square, with
// a buffer zone with no runestones around the edge"): where she may fly, as a box (the square map,
// ?shape=square) or a circle round home (the circular one), and the helpers that keep a point in it.
// The circle's edge is soft: over its last `push` metres her outward speed eases to nothing and a
// little drift takes her back in. Its coast isn't a perfect circle (Ed, 2026-10-06: "The island
// shouldn't be a totally perfect circle; make the coast slightly irregular"): every edge round home
// (the playable areas', the buffer's, her flight's) is its radius times the coast at that angle (makeCoast; map.coast).

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

/** Where she may fly (metres): the box round it, and, on the circular map, the circle itself. */
export interface Bounds {
  minX: number; maxX: number; minZ: number; maxZ: number;
  /** The circular map's flight circle (centre and round radius, metres; its edge at an angle r times coast(angle)); absent on the square map. */
  circle?: { x: number; z: number; r: number; coast?: (angle: number) => number; /** The map's seed (the beach's width varies by it). */ seed?: number };
}

/** The flight edge's radius (metres) in the direction of (x, z) from the circle's centre. */
export function edgeRadius(c: NonNullable<Bounds["circle"]>, x: number, z: number): number {
  return c.coast ? c.r * c.coast(Math.atan2(z - c.z, x - c.x)) : c.r;
}

/** The nearest point to (x, z) inside the bounds, `pad` metres in from the edge. */
export function keepIn(b: Bounds, x: number, z: number, pad = 0): { x: number; z: number } {
  if (b.circle) {
    const c = b.circle, dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz), r = edgeRadius(c, x, z) - pad;
    return d <= r || d < 1e-9 ? { x, z } : { x: c.x + (dx / d) * r, z: c.z + (dz / d) * r };
  }
  return { x: Math.min(b.maxX - pad, Math.max(b.minX + pad, x)), z: Math.min(b.maxZ - pad, Math.max(b.minZ + pad, z)) };
}

/** Is (x, z) inside the bounds, more than `pad` metres in from the edge? */
export function isInside(b: Bounds, x: number, z: number, pad = 0): boolean {
  if (b.circle) return Math.hypot(x - b.circle.x, z - b.circle.z) < edgeRadius(b.circle, x, z) - pad;
  return x > b.minX + pad && x < b.maxX - pad && z > b.minZ + pad && z < b.maxZ - pad;
}

/** A point `beyond` metres past the edge nearest (x, z): where a creature running off the map makes for. */
export function exitPoint(b: Bounds, x: number, z: number, beyond: number): { x: number; z: number } {
  if (b.circle) {
    const c = b.circle, dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz) || 1, r = edgeRadius(c, x, z) + beyond;
    return { x: c.x + (dx / d) * r, z: c.z + (dz / d) * r };
  }
  const edges = [[b.minX - beyond, z, x - b.minX], [b.maxX + beyond, z, b.maxX - x], [x, b.minZ - beyond, z - b.minZ], [x, b.maxZ + beyond, b.maxZ - z]];
  const e = edges.reduce((m, q) => (q[2] < m[2] ? q : m));
  return { x: e[0], z: e[1] };
}

/** The circle's soft edge, on her velocity at (x, z): within `push` metres of the edge her speed
 *  outward is held under a share of `max` falling to nothing at the edge, and in the outer half of
 *  that band a drift of up to `drift` m/s takes her back in. On the square map, unchanged. */
export function softEdge(b: Bounds, x: number, z: number, vx: number, vz: number, max: number, push: number, drift: number): { vx: number; vz: number } {
  const c = b.circle;
  if (!c || push <= 0) return { vx, vz };
  const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz), r = edgeRadius(c, x, z);
  if (d < r - push || d < 1e-9) return { vx, vz };
  const nx = dx / d, nz = dz / d, k = Math.min(1, (d - (r - push)) / push);
  const out = vx * nx + vz * nz, allowed = (1 - k) * max - drift * Math.max(0, 2 * k - 1);
  if (out <= allowed) return { vx, vz };
  return { vx: vx - nx * (out - allowed), vz: vz - nz * (out - allowed) };
}

/** The edge of her flight at `angle` (radians, as atan2(z - centre z, x - centre x)): its radius
 *  from the circle's middle, the round radius times the coast there (edgeRadius); the beach follows it. */
export function edgeAt(b: Bounds, angle: number): number {
  const c = b.circle;
  return !c ? Infinity : c.coast ? c.r * c.coast(angle) : c.r;
}

/** How many samples of the edge round the beach keeps (the ground shader's uCoast). */
export const COAST_SAMPLES = 128;

/** The beach round the circular map (Ed, 2026-10-06; the tuning's `beach`): the sand from about `width`
 *  metres inside her flight's edge, the sea from `out` metres past it, following the edge round
 *  (edgeAt, sampled COAST_SAMPLES times and eased between, as the ground shader has it). Its width
 *  varies round the coast (Ed, 2026-10-06: "The beach can be more irregularly shaped"; the tuning's
 *  beach.vary): wide bays, narrow stretches, rocky ones where it nearly vanishes, by its own seeded noise. */
export interface Beach {
  x: number; z: number; width: number; out: number;
  /** The edge's radius at each sample round (from angle -pi, every 2 pi / COAST_SAMPLES). */
  coast: Float32Array;
  /** The sand's width (metres in from the edge) at each sample round, as `coast`. */
  sand: Float32Array;
  /** The sand's width at `angle`, between its samples. */
  sandAt(angle: number): number;
  /** How rocky the beach is at `angle`, 0 to 1 (its narrowest stretches: rocks among the shells). */
  rockyAt(angle: number): number;
  /** The edge's least and greatest radius anywhere round. */
  edgeMin: number; edgeMax: number;
  /** The edge's radius at `angle`, between its samples. */
  edge(angle: number): number;
  /** How far (x, z) is past where the sand starts, in its own direction from the middle (negative inland), exactly. */
  intoSand(x: number, z: number): number;
  /** How far (x, z) is past where the sea starts (negative on land), exactly. */
  intoSea(x: number, z: number): number;
}
/** The beach's width knobs (the tuning's beach.vary): amp, how far it strays from `width` (as a power of e: 0.8 gives
 *  about 0.45 to 2.2 times); harmonics, how many bays and narrows round the coast; rocky, below how far down the noise
 *  (0 to 1) a stretch turns rocky, narrowing to rockyWidth metres; min, the narrowest it ever is. */
export interface BeachVary { amp: number; harmonics: number; rocky: number; rockyWidth: number; min: number }
type BeachKnobs = { on: boolean; width: number; shore: number; vary?: BeachVary };
const beaches = new WeakMap<Bounds, { r: number; knobs: BeachKnobs; coast?: (angle: number) => number; beach: Beach }>();
/** The beach round these bounds (made once for them and their tuning, then remembered: the witch asks every step). */
export function beachOf(b: Bounds, t: { beach?: BeachKnobs }): Beach | null {
  const c = b.circle, B = t.beach;
  if (!c || !B?.on) return null;
  const had = beaches.get(b);
  if (had && had.r === c.r && had.knobs === B && had.coast === c.coast && had.beach.x === c.x && had.beach.z === c.z) return had.beach; // (nothing made a step)
  const beach = makeBeach(b, c, B);
  beaches.set(b, { r: c.r, knobs: B, coast: c.coast, beach });
  return beach;
}
/** The sand's width round the coast (sampled as the coast is) and how rocky each stretch is: `width` times e to the
 *  amp times a seeded smooth noise round the circle (low harmonics: bays and narrows), the lowest stretches rocky,
 *  narrowing to rockyWidth; never under min. */
export function sandWidths(seed: number, width: number, V: BeachVary | undefined, N = COAST_SAMPLES): { sand: Float32Array; rocky: Float32Array } {
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
function makeBeach(b: Bounds, c: NonNullable<Bounds["circle"]>, B: BeachKnobs): Beach {
  const N = COAST_SAMPLES, coast = new Float32Array(N);
  for (let k = 0; k < N; k++) coast[k] = edgeAt(b, -Math.PI + (k / N) * Math.PI * 2);
  const { sand, rocky } = sandWidths(c.seed ?? 0, B.width, B.vary);
  let edgeMin = Infinity, edgeMax = 0;
  for (const r of coast) { edgeMin = Math.min(edgeMin, r); edgeMax = Math.max(edgeMax, r); }
  const at = (A: Float32Array) => (a: number) => { const u = ((a + Math.PI) / (Math.PI * 2)) * N, i = Math.floor(u), f = u - i, i0 = ((i % N) + N) % N; return A[i0] + (A[(i0 + 1) % N] - A[i0]) * f; };
  const edge = at(coast), sandAt = at(sand), rockyAt = at(rocky);
  // Measured along its own direction from the middle, always (no shortcut by edgeMin: inland that gave the right sign
  // but not the distance, flattening a ring of hills and cutting paths well inside the sand).
  const past = (x: number, z: number, off: number, inSand: boolean) => {
    const dx = x - c.x, dz = z - c.z, a = Math.atan2(dz, dx);
    return Math.hypot(dx, dz) - edge(a) - (inSand ? -sandAt(a) : off);
  };
  return { x: c.x, z: c.z, width: B.width, out: B.shore, coast, sand, sandAt, rockyAt, edgeMin, edgeMax, edge,
    intoSand: (x, z) => past(x, z, 0, true), intoSea: (x, z) => past(x, z, B.shore, false) };
}
