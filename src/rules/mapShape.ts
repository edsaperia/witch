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

/** The edge of her flight at `angle` (radians, as atan2(z - centre z, x - centre x)): its radius
 *  from the circle's middle. A circle for now; the irregular coast (Ed, 2026-10-06: "slightly
 *  irregular, not a perfect circle") will give its own radius here, and the beach follows it. */
export function edgeAt(b: Bounds, angle: number): number {
  void angle;
  return b.circle ? b.circle.r : Infinity;
}

/** How many samples of the edge round the beach keeps (the ground shader's uCoast). */
export const COAST_SAMPLES = 128;

/** The beach round the circular map (Ed, 2026-10-06; the tuning's `beach`): the sand from `width`
 *  metres inside her flight's edge, the sea from `out` metres past it, following the edge round
 *  (edgeAt, sampled COAST_SAMPLES times and eased between, as the ground shader has it). */
export interface Beach {
  x: number; z: number; width: number; out: number;
  /** The edge's radius at each sample round (from angle -pi, every 2 pi / COAST_SAMPLES). */
  coast: Float32Array;
  /** The edge's least and greatest radius anywhere round. */
  edgeMin: number; edgeMax: number;
  /** The edge's radius at `angle`, between its samples. */
  edge(angle: number): number;
  /** How far (x, z) is past where the sand starts (negative inland; nearer the middle than edgeMin - width less exactly, only ever negative enough). */
  intoSand(x: number, z: number): number;
  /** How far (x, z) is past where the sea starts (negative on land, likewise). */
  intoSea(x: number, z: number): number;
}
const beaches = new WeakMap<Bounds, { r: number; width: number; shore: number; beach: Beach }>();
/** The beach round these bounds (made once for them and their tuning, then remembered: the witch asks every step). */
export function beachOf(b: Bounds, t: { beach?: { on: boolean; width: number; shore: number } }): Beach | null {
  const c = b.circle, B = t.beach;
  if (!c || !B?.on) return null;
  const had = beaches.get(b);
  if (had && had.r === c.r && had.width === B.width && had.shore === B.shore && had.beach.x === c.x && had.beach.z === c.z) return had.beach; // (nothing made a step)
  const beach = makeBeach(b, c, B);
  beaches.set(b, { r: c.r, width: B.width, shore: B.shore, beach });
  return beach;
}
function makeBeach(b: Bounds, c: NonNullable<Bounds["circle"]>, B: { width: number; shore: number }): Beach {
  const N = COAST_SAMPLES, coast = new Float32Array(N);
  for (let k = 0; k < N; k++) coast[k] = edgeAt(b, -Math.PI + (k / N) * Math.PI * 2);
  let edgeMin = Infinity, edgeMax = 0;
  for (const r of coast) { edgeMin = Math.min(edgeMin, r); edgeMax = Math.max(edgeMax, r); }
  const edge = (a: number) => { const u = ((a + Math.PI) / (Math.PI * 2)) * N, i = Math.floor(u), f = u - i, i0 = ((i % N) + N) % N; return coast[i0] + (coast[(i0 + 1) % N] - coast[i0]) * f; };
  const past = (x: number, z: number, off: number) => {
    const dx = x - c.x, dz = z - c.z, d2 = dx * dx + dz * dz, lo = edgeMin + off;
    if (lo > 0 && d2 < lo * lo) return Math.sqrt(d2) - lo; // (quickly: well inside the nearest the edge comes)
    return Math.sqrt(d2) - edge(Math.atan2(dz, dx)) - off;
  };
  return { x: c.x, z: c.z, width: B.width, out: B.shore, coast, edgeMin, edgeMax, edge,
    intoSand: (x, z) => past(x, z, -B.width), intoSea: (x, z) => past(x, z, B.shore) };
}
