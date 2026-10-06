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
  circle?: { x: number; z: number; r: number; coast?: (angle: number) => number };
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
