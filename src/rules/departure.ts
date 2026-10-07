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
  const aTo = ang(to.x, to.z), toTo = sweep(af, aTo), toExit = sweep(af, s < 0 ? Math.PI / 2 : -Math.PI / 2);
  const ring = Math.min(toTo, toExit); // (round the ring, then off it, turning on round as it goes out)
  // From the front onto the ring, meeting it along it (the boot ring's own way on: rules/bootRing.ts), round it, then off it.
  const ap = ringApproach(map, rho, s, step, ring), span = s * (ap.at - af), pts = ap.pts.slice();
  const rest = Math.max(0, ring - span), nRing = Math.ceil((rest * rho) / step);
  for (let i = 1; i <= nRing; i++) pts.push(at(af + s * (span + (rest * i) / nRing), rho));
  // Off the ring along it (Ed, 2026-10-06: no right angle, no jog where it leaves), turning toward the objective no faster than
  // EXIT_TURN a metre, always outward (so never back over the ring: round the long way if it must), then straight on to it.
  const a0 = af + s * ring;
  let p = at(a0, rho), h = Math.atan2(-s * Math.sin(a0), s * Math.cos(a0)); // (heading along the ring, as it goes round)
  const out = Math.sign(Math.cos(h) * Math.cos(a0) - Math.sin(h) * Math.sin(a0)) || 1; // (the turn that heads away from home)
  for (let k = 0; k < 600; k++) {
    let diff = Math.atan2(to.z - p[1], to.x - p[0]) - h;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    if (Math.abs(diff) < 0.02) break;
    if (Math.sign(diff) !== out) diff += out * TAU;
    h += Math.max(-EXIT_TURN * step, Math.min(EXIT_TURN * step, diff));
    p = [p[0] + Math.cos(h) * step, p[1] + Math.sin(h) * step];
    pts.push(p);
    if (Math.hypot(to.x - p[0], to.z - p[1]) < step * 2) break;
  }
  for (let left = Math.hypot(to.x - p[0], to.z - p[1]), n = Math.ceil(left / step), i = 1; i <= n; i++) pts.push([p[0] + ((to.x - p[0]) * i) / n, p[1] + ((to.z - p[1]) * i) / n]);
  pts[pts.length - 1] = [to.x, to.z];
  // Smoothed (the ends held), kept off the ring.
  const push = (p: [number, number]) => { const ex = p[0] - d.x, ez = p[1] - d.z, l = Math.hypot(ex, ez) || 1; if (l < rho) { p[0] = d.x + (ex / l) * rho; p[1] = d.z + (ez / l) * rho; } };
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 1; i < pts.length - 1; i++) pts[i] = [(pts[i - 1][0] + 2 * pts[i][0] + pts[i + 1][0]) / 4, (pts[i - 1][1] + 2 * pts[i][1] + pts[i + 1][1]) / 4];
    for (let i = 1; i < pts.length - 1; i++) push(pts[i]);
  }
  return pts;
}

/** How fast the first line turns as it leaves the ring (radians a metre): a gentle curve, about 14 m round. */
const EXIT_TURN = (4 * Math.PI) / 180;

/** The way from the treehouse's front onto the ring of radius `rho` round home, turning `s` (-1 clockwise on the screen,
 *  1 the other way): leaving the front heading out and round, and meeting the ring along it, never at a right angle (Ed,
 *  2026-10-06: the line leaving the speaker circle "doesn't connect with the leyline around the dancefloor"; it ran straight out,
 *  then turned square onto the ring), over at most `most` radians round home. Its points (from the front), where round home it
 *  meets the ring, and its length. The boot ring's way on (rules/bootRing.ts) and the first line's (departureRoute) share it,
 *  so they're one path. With the front on the ring (or outside it), just the front, and a straight step to the ring. */
export function ringApproach(map: Pick<ForestMap, "dancefloor" | "treehouseFront">, rho: number, s: number, step: number, most = Math.PI): { pts: [number, number][]; at: number; length: number } {
  const d = map.dancefloor, f = map.treehouseFront, fr = Math.hypot(f.x - d.x, f.z - d.z), af = Math.atan2(f.x - d.x, f.z - d.z);
  const at = (a: number, r: number): [number, number] => [d.x + Math.sin(a) * r, d.z + Math.cos(a) * r];
  const pts: [number, number][] = [[f.x, f.z]];
  if (Math.abs(fr - rho) < 0.5) return { pts, at: af, length: 0 };
  if (fr > rho) { pts.push(at(af, rho)); return { pts, at: af, length: fr - rho }; }
  const span = Math.min(most, Math.max(0.35, (2.2 * (rho - fr)) / rho)), n = Math.max(4, Math.ceil((rho - fr + span * rho) / step));
  let length = 0;
  for (let i = 1; i <= n; i++) {
    const u = i / n, e = 1 - (1 - u) ** 2, p = at(af + s * span * u, fr + (rho - fr) * e), q = pts[pts.length - 1];
    length += Math.hypot(p[0] - q[0], p[1] - q[1]); pts.push(p);
  }
  return { pts, at: af + s * span, length };
}

/** How far the first line keeps from the dancefloor's middle: out past its ring of speakers by `avoid` metres. */
export const departureClear = (map: ForestMap, avoid: number) => speakerRadius(map.tuning) + map.tuning.dancefloor.speakers.footprint + avoid;
