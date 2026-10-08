// A travelling party animal's leash drawn as its route (render/leash.ts), eased between re-plans (Ed, 2026-10-06: "When I
// am moving in treetop mode while I have animals leashed, their travel paths (denoted by the leash dots) jump around as
// the path is updated. Can we make this transition smoother?"). The rules re-plan a route every time its target moves
// `travel.replan` metres (rules/travel.ts), three times a second at treetop speed, and a new plan can bend round an area's
// middle on the other side. Drawing only: the creature still walks the newest plan.
//
// The shape is kept as its sideways bend from the straight line between its two ends, sampled at N evenly spaced points
// by arc length, and eased toward each new plan's bend over `tau` seconds. The ends are where they are now (the creature,
// its leash point), so the line never lags behind them; only the bend glides.

/** Samples along a route (arc length 0 to 1). */
export const ROUTE_SAMPLES = 48;

export interface RouteShape { bend: Float32Array; at: number }

type P = { x: number; z: number };

/** The bend of `way` from its chord, at ROUTE_SAMPLES + 1 points evenly spaced along its arc length (x, z pairs). */
export function bendOf(way: readonly P[], out: Float32Array = new Float32Array((ROUTE_SAMPLES + 1) * 2)): Float32Array {
  const n = way.length, a = way[0], b = way[n - 1];
  let total = 0;
  for (let i = 1; i < n; i++) total += Math.hypot(way[i].x - way[i - 1].x, way[i].z - way[i - 1].z);
  let seg = 1, segStart = 0, segLen = n > 1 ? Math.hypot(way[1].x - a.x, way[1].z - a.z) : 0;
  for (let k = 0; k <= ROUTE_SAMPLES; k++) {
    const t = k / ROUTE_SAMPLES, s = t * total;
    while (seg < n - 1 && segStart + segLen < s) { segStart += segLen; seg++; segLen = Math.hypot(way[seg].x - way[seg - 1].x, way[seg].z - way[seg - 1].z); }
    const p = way[seg - 1] ?? a, q = way[seg] ?? b, u = segLen > 1e-9 ? Math.min(1, Math.max(0, (s - segStart) / segLen)) : 0;
    const x = p.x + (q.x - p.x) * u, z = p.z + (q.z - p.z) * u;
    out[k * 2] = x - (a.x + (b.x - a.x) * t); out[k * 2 + 1] = z - (a.z + (b.z - a.z) * t);
  }
  return out;
}

/** Eases `shape` toward `way`'s bend (a new shape the first time) at `time`, over `tau` seconds, and returns the line to
 *  draw: its ends exactly `way`'s, its bend the eased one. */
export function easeRoute(shape: RouteShape | undefined, way: readonly P[], time: number, tau: number, scratch?: Float32Array): { shape: RouteShape; line: P[] } {
  const target = bendOf(way, scratch);
  if (!shape) shape = { bend: Float32Array.from(target), at: time };
  else {
    const dt = Math.max(0, Math.min(0.25, time - shape.at)), k = tau > 0 ? 1 - Math.exp(-dt / tau) : 1;
    for (let i = 0; i < target.length; i++) shape.bend[i] += (target[i] - shape.bend[i]) * k;
    shape.at = time;
  }
  const a = way[0], b = way[way.length - 1], line: P[] = [];
  for (let k = 0; k <= ROUTE_SAMPLES; k++) { const t = k / ROUTE_SAMPLES; line.push({ x: a.x + (b.x - a.x) * t + shape.bend[k * 2], z: a.z + (b.z - a.z) * t + shape.bend[k * 2 + 1] }); }
  return { shape, line };
}
