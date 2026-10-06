// The first ley line's way out from home (Ed, 2026-10-05; 2026-10-06): from the treehouse's front round
// the ring of speakers, never over the dancefloor, then off and looping round to the first objective.
// Its own module so rules/leyroute.ts (which keeps the line's route from crossing itself) and
// rules/leylines.ts can both use it. No drawing here.
import type { ForestMap } from "./map";
import { speakerRadius } from "./speakers";

/** The first line's way out from home (Ed, 2026-10-06: "The leyline shouldn't cross the dancefloor. After going around
 *  the speaker circle it should go off to the right and loop around to whatever direction it needs to go"; before, from
 *  2026-10-05, it ran due south straight across the floor): from the treehouse's front round the ring of speakers,
 *  `avoid` metres outside it (out to the front, if that's further), on the first objective's side (clockwise on the
 *  screen, off to the right, for one east of home; the other way round for one west of it), to the ring's east (or
 *  west) side, or sooner if the objective lies that way; then off the ring, heading out, looping on round the same way
 *  as it goes out to the objective. Points every `step` metres, from the front to `to`, none inside the ring. */
export function departureRoute(map: ForestMap, to: { x: number; z: number }, avoid: number, step: number): [number, number][] {
  const d = map.dancefloor, R = departureClear(map, avoid), f = map.treehouseFront, TAU = Math.PI * 2;
  // Angles round home: 0 south (+z, down the screen), PI/2 east (+x); clockwise on the screen is decreasing.
  const ang = (x: number, z: number) => Math.atan2(x - d.x, z - d.z), at = (a: number, r: number): [number, number] => [d.x + Math.sin(a) * r, d.z + Math.cos(a) * r];
  const s = to.x >= d.x ? -1 : 1, sweep = (a0: number, a1: number) => (((s * (a1 - a0)) % TAU) + TAU) % TAU;
  const fr = Math.hypot(f.x - d.x, f.z - d.z), rho = Math.max(R, fr), af = ang(f.x, f.z);
  const aTo = ang(to.x, to.z), rTo = Math.max(rho, Math.hypot(to.x - d.x, to.z - d.z)), toTo = sweep(af, aTo), toExit = sweep(af, s < 0 ? Math.PI / 2 : -Math.PI / 2);
  const ring = Math.min(toTo, toExit), loop = toTo - ring; // (round the ring, then on round as it goes out)
  const pts: [number, number][] = [[f.x, f.z]];
  if (fr < rho - 0.5) { const n = Math.ceil((rho - fr) / step); for (let i = 1; i <= n; i++) pts.push(at(af, fr + ((rho - fr) * i) / n)); }
  const nRing = Math.max(1, Math.ceil((ring * rho) / step));
  for (let i = 1; i <= nRing; i++) pts.push(at(af + (s * ring * i) / nRing, rho));
  // Off the ring: its distance from home easing out fast, then on to the objective's, while it turns on round by `loop`.
  const a0 = af + s * ring, len = Math.hypot(loop * (rho + rTo) * 0.5, rTo - rho), nOut = Math.max(4, Math.ceil(len / step));
  for (let i = 1; i <= nOut; i++) { const u = i / nOut, e = 1 - (1 - u) ** 2; pts.push(at(a0 + s * loop * u, rho + (rTo - rho) * e)); }
  pts[pts.length - 1] = [to.x, to.z];
  // Smoothed (the ends held), kept off the ring.
  const push = (p: [number, number]) => { const ex = p[0] - d.x, ez = p[1] - d.z, l = Math.hypot(ex, ez) || 1; if (l < rho) { p[0] = d.x + (ex / l) * rho; p[1] = d.z + (ez / l) * rho; } };
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 1; i < pts.length - 1; i++) pts[i] = [(pts[i - 1][0] + 2 * pts[i][0] + pts[i + 1][0]) / 4, (pts[i - 1][1] + 2 * pts[i][1] + pts[i + 1][1]) / 4];
    for (let i = 1; i < pts.length - 1; i++) push(pts[i]);
  }
  return pts;
}

/** How far the first line keeps from the dancefloor's middle: out past its ring of speakers by `avoid` metres. */
export const departureClear = (map: ForestMap, avoid: number) => speakerRadius(map.tuning) + map.tuning.dancefloor.speakers.footprint + avoid;
