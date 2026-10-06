// The map's shape (Ed, 2026-10-06: "The map as a whole should be circular rather than square, with
// a buffer zone with no runestones around the edge"): where she may fly, as a box (the square map,
// ?shape=square) or a circle round home (the circular one), and the helpers that keep a point in it.
// The circle's edge is soft: over its last `push` metres her outward speed eases to nothing and a
// little drift takes her back in.

/** Where she may fly (metres): the box round it, and, on the circular map, the circle itself. */
export interface Bounds {
  minX: number; maxX: number; minZ: number; maxZ: number;
  /** The circular map's flight circle (centre and radius, metres); absent on the square map. */
  circle?: { x: number; z: number; r: number };
}

/** The nearest point to (x, z) inside the bounds, `pad` metres in from the edge. */
export function keepIn(b: Bounds, x: number, z: number, pad = 0): { x: number; z: number } {
  if (b.circle) {
    const c = b.circle, dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz), r = c.r - pad;
    return d <= r || d < 1e-9 ? { x, z } : { x: c.x + (dx / d) * r, z: c.z + (dz / d) * r };
  }
  return { x: Math.min(b.maxX - pad, Math.max(b.minX + pad, x)), z: Math.min(b.maxZ - pad, Math.max(b.minZ + pad, z)) };
}

/** Is (x, z) inside the bounds, more than `pad` metres in from the edge? */
export function isInside(b: Bounds, x: number, z: number, pad = 0): boolean {
  if (b.circle) return Math.hypot(x - b.circle.x, z - b.circle.z) < b.circle.r - pad;
  return x > b.minX + pad && x < b.maxX - pad && z > b.minZ + pad && z < b.maxZ - pad;
}

/** A point `beyond` metres past the edge nearest (x, z): where a creature running off the map makes for. */
export function exitPoint(b: Bounds, x: number, z: number, beyond: number): { x: number; z: number } {
  if (b.circle) {
    const c = b.circle, dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz) || 1, r = c.r + beyond;
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
  const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz);
  if (d < c.r - push || d < 1e-9) return { vx, vz };
  const nx = dx / d, nz = dz / d, k = Math.min(1, (d - (c.r - push)) / push);
  const out = vx * nx + vz * nz, allowed = (1 - k) * max - drift * Math.max(0, 2 * k - 1);
  if (out <= allowed) return { vx, vz };
  return { vx: vx - nx * (out - allowed), vz: vz - nz * (out - allowed) };
}
