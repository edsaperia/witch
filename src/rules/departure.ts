// The first ley line's way out from home (Ed, 2026-10-05): from the treehouse's front due south
// across the dancefloor, then round to the first objective. Its own module so rules/party.ts (which
// keeps the line's route from crossing itself) and rules/leylines.ts can both use it. No drawing here.
import type { ForestMap } from "./map";
import { speakerRadius } from "./speakers";

/** The first line's way out from home (Ed, 2026-10-05: "The treehouse should be 5m due north of the
 *  dance floor ... The ley line leads from it south across the dancefloor and then towards the first
 *  speaker"): from the treehouse's front due south, straight across the dancefloor and through its
 *  ring of speakers, on `past` metres beyond the ring (`avoid` metres outside it), then a smooth
 *  curve to the first objective's soundsystem, that stretch kept outside the ring. Points every
 *  `step` metres, from the front to `to`. */
export function departureRoute(map: ForestMap, to: { x: number; z: number }, past: number, avoid: number, step: number): [number, number][] {
  const d = map.dancefloor, R = departureClear(map, avoid), f = map.treehouseFront;
  // The straight run south: across the floor to past metres beyond the far side of the ring.
  const dx = f.x - d.x, far = Math.abs(dx) < R ? d.z + Math.sqrt(R * R - dx * dx) : f.z, len = Math.max(step, far + past - f.z);
  const pts: [number, number][] = [];
  for (let s = 0; s < len; s += step) pts.push([f.x, f.z + s]);
  pts.push([f.x, f.z + len]);
  const [px, pz] = pts[pts.length - 1], L = Math.hypot(to.x - px, to.z - pz);
  // Then a curve leaving south, bending toward the objective's side, to the objective.
  const side = Math.sign(to.x - px) || 1, m = Math.min(45, L * 0.5);
  const c1: [number, number] = [px + side * m * 0.35, pz + m * 0.8];
  const ux = to.x - c1[0], uz = to.z - c1[1], ul = Math.hypot(ux, uz) || 1, m2 = Math.min(40, ul * 0.4);
  const c2: [number, number] = [to.x - (ux / ul) * m2, to.z - (uz / ul) * m2];
  const n = Math.max(4, Math.ceil((L + m) / step)), curve: [number, number][] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n, a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, e = t ** 3;
    curve.push([a * px + b * c1[0] + c * c2[0] + e * to.x, a * pz + b * c1[1] + c * c2[1] + e * to.z]);
  }
  // Off the ring after the crossing: anything inside pushed out round it, then smoothed (the ends held), and again.
  const push = (p: [number, number]) => { const ex = p[0] - d.x, ez = p[1] - d.z, l = Math.hypot(ex, ez) || 1; if (l < R) { p[0] = d.x + (ex / l) * R; p[1] = d.z + (ez / l) * R; } };
  for (let pass = 0; pass < 6; pass++) {
    curve.forEach(push);
    for (let i = 0; i < curve.length - 1; i++) { const a = i ? curve[i - 1] : [px, pz], b = curve[i + 1]; curve[i] = [(a[0] + 2 * curve[i][0] + b[0]) / 4, (a[1] + 2 * curve[i][1] + b[1]) / 4]; }
  }
  curve.forEach(push);
  return [...pts, ...curve];
}

/** How far the first line keeps from the dancefloor's middle: out past its ring of speakers by `avoid` metres. */
export const departureClear = (map: ForestMap, avoid: number) => speakerRadius(map.tuning) + map.tuning.dancefloor.speakers.footprint + avoid;
