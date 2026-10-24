// Arriving on an island (Ed, 2026-10-12, the zoom-to-island plan: Charlie's chart side, PR 1, and this, the game's): the sea
// chart zooms in, flies the first leg and hands off over the open sea south of the island, saving its last frame and its camera
// in sessionStorage ("witch.arrive") before loading ./?island=X&arrive=1. The game shows that still while the night builds,
// then takes over at the same camera and flies the rest (Ed: "fly from the south end of the island, over the sea and over the
// forest, to give a taste of the terrain, before settling on the home area"; "make sure the camera path shows the dancefloor
// and the island legend under the Ent"), looking north the whole way, down to today's opening shot at her decks (Ed: "Land at
// the decks"). Any key skips to the end. Here: the flight's path from the chart's hand-off (app/arrival.ts reads it), in the camera's own terms
// (rules/camera.ts: a target, an angle down to it and a distance back). Pure: no clock, no page.
import type { ForestMap } from "./map";
import type { Tuning } from "./tuning";

/** What the chart hands over (app/arrival.ts, Charlie's: its record's FlightEnd): its camera, x and z metres from the island's
 *  dancefloor (x east, z south), height metres over the sea, pitch its tilt down (radians), fov vertical (degrees), speed m/s
 *  heading north as it hands over; the camera faces north. */
export interface Handoff { cam: { x: number; z: number; height: number; pitch: number; fov: number; speed?: number } }

/** A camera shot as the game's camera is posed (render/view/culling.ts poseCamera): looking north at (tx, ty, tz) from angle
 *  degrees above it and distance metres back; ty in the world's heights (not over the ground); fov degrees, vertical. */
export interface Shot { tx: number; ty: number; tz: number; angle: number; distance: number; fov: number }

/** The flight: its shots and the seconds at which it passes each (times[0] = 0). */
export interface ArrivePlan { keys: Shot[]; times: number[]; /** the target's speed north at the start (m/s): the chart's, carried on */ v0: number }

/** The arrival's knobs (the tuning's `arrive`). */
export type ArriveTuning = NonNullable<Tuning["arrive"]>;

/** Where the island's south coast is, due south of the dancefloor: its z (the last land walking south), or a stand-in for a map
 *  without a coast. */
export function southCoast(map: ForestMap): number {
  const d = map.dancefloor, land = map.bounds.land;
  if (!land) return d.z + 400;
  let z = d.z;
  for (let s = 0; s < 4000 && land.inside(d.x, z + 8); s += 8) z += 8;
  return z;
}

/** The hand-off as a shot: the chart's camera, its target where its line of sight meets the sea (or a long way out, near level). */
export function handoffShot(rec: Handoff, map: ForestMap): Shot {
  const d = map.dancefloor, p = Math.max(0.02, rec.cam.pitch), back = Math.min(1200, rec.cam.height / Math.sin(p));
  const x0 = d.x + rec.cam.x, z0 = d.z + rec.cam.z;
  return { tx: x0, ty: rec.cam.height - Math.sin(p) * back, tz: z0 - Math.cos(p) * back, angle: (p * 180) / Math.PI, distance: back, fov: rec.cam.fov };
}

/** The flight from the chart's hand-off to `end` (the game's own opening shot at her decks, or her in her bedroom): over the sea to the south coast and
 *  low over the forest north at `A.speed` m/s, then up to frame the dancefloor and the treehouse's spot (where the island's
 *  legend will carry the Ent) together, then down into `end`. `ground(x, z)`: the ground's height there. */
export function arrivePlan(rec: Handoff, map: ForestMap, A: ArriveTuning, ground: (x: number, z: number) => number, end: Shot, frameAt?: { x: number; z: number }, treeHeight?: number): ArrivePlan {
  const d = map.dancefloor, th = map.treehouse, fov = end.fov;
  const k0 = handoffShot(rec, map);
  // low over the land: aimed `ahead` metres north of the camera's ground point
  const low = (z: number): Shot => { const a = (A.low.angle * Math.PI) / 180, tz = z - Math.cos(a) * A.low.distance; return { tx: d.x, ty: ground(d.x, tz), tz, angle: A.low.angle, distance: A.low.distance, fov }; };
  const coast = southCoast(map), kf = low((coast + A.low.offshore + d.z) / 2 + A.low.distance * 0.5);
  // (low over the sea first only if the hand-off is out at sea: the chart's own hands over above the coast, high)
  const lows = k0.tz > coast + A.low.offshore + 20 ? [low(coast + A.low.offshore), kf] : [kf];
  // the frame: the dancefloor and the treehouse's spot together, from the south and up (or `frameAt`: the new opening's bedroom window)
  const fx = frameAt?.x ?? (d.x + th.x) / 2, fz = frameAt?.z ?? (d.z + th.z) / 2;
  const k3: Shot = { tx: fx, ty: ground(fx, fz) + A.frame.lift, tz: fz, angle: A.frame.angle, distance: A.frame.distance, fov };
  const tree = A.tree ? treeShot(map, A.tree, ground, fov, treeHeight ?? A.tree.height) : null;
  const keys = tree ? [k0, ...lows, k3, tree, end] : [k0, ...lows, k3, end];
  // the times: the legs down to the forest by their length at A.speed (at least the chart's own pace), the rise and the
  // settle their own seconds
  const cam = (s: Shot) => { const c = shotCamera(s); return c; };
  const pace = Math.max(1, A.speed, rec.cam.speed ?? 0);
  const leg = (a: Shot, b: Shot) => { const p = cam(a), q = cam(b); return Math.hypot(p.x - q.x, p.y - q.y, p.z - q.z) / pace; };
  const times = [0];
  for (let i = 1; i <= lows.length; i++) times.push(times[i - 1] + Math.max(A.minLeg, leg(keys[i - 1], keys[i])));
  times.push(times[times.length - 1] + A.rise);
  if (tree) times.push(times[times.length - 1] + A.tree!.time);
  times.push(times[times.length - 1] + A.settle);
  return { keys, times, v0: Math.max(0, rec.cam.speed ?? 0) };
}

/** The whole treehouse tree, from the south (Ed, 2026-10-24: "pan up to see the whole treehouse tree before we fly into her
 *  bedroom"): aimed at its middle, `height` metres tall from its foot (its art's, else the tuning's), `angle` degrees up, back far
 *  enough that it fills `fill` of the frame's height. */
export function treeShot(map: ForestMap, T: NonNullable<ArriveTuning["tree"]>, ground: (x: number, z: number) => number, fov: number, height: number): Shot {
  const th = map.treehouse, h = Math.max(1, height), distance = (h / Math.max(0.05, T.fill)) / (2 * Math.tan(((fov * Math.PI) / 180) / 2));
  return { tx: th.x, ty: ground(th.x, th.z) + h / 2, tz: th.z, angle: T.angle, distance, fov };
}

/** How far a spot is from the dive's view (Ed, 2026-10-24, the sail's transition: "we only really need the scenery south of the
 *  treehouse for the dive"): metres from its track over the land, due north from the south coast below the dancefloor (where the
 *  flight comes in low, looking north) to the frame over the dancefloor and the treehouse (arrivePlan's). For the art drawn first (render/view.ts
 *  prepare): the areas the dive will see, nearest first; the rest under the loading mist, after. */
export function diveReach(map: ForestMap, A: ArriveTuning): (x: number, z: number) => number {
  const track = diveTrack(map, A);
  return (x, z) => {
    let best = Infinity;
    for (const [ax, az, bx, bz] of track) {
      const vx = bx - ax, vz = bz - az, L = vx * vx + vz * vz, u = L > 0 ? Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / L)) : 0;
      const px = ax + vx * u, pz = az + vz * u, dx = x - px, dz = z - pz;
      best = Math.min(best, Math.hypot(dx, dz));
    }
    return best;
  };
}

/** The dive's track over the land (diveReach's): its legs, [x0, z0, x1, z1], from the sea off the south coast below the dancefloor
 *  north to the frame over the dancefloor and the treehouse, and on to the treehouse; the first seen first. */
export function diveTrack(map: ForestMap, A: ArriveTuning): [number, number, number, number][] {
  const d = map.dancefloor, th = map.treehouse, coast = southCoast(map), fx = (d.x + th.x) / 2, fz = (d.z + th.z) / 2;
  return [[d.x, coast + A.low.offshore, d.x, fz], [d.x, fz, fx, fz], [fx, fz, th.x, th.z]];
}

/** Whether a point (the world's metres) is on screen in shot `s` (a pinhole looking from shotCamera(s) at its target, `aspect` the
 *  screen's width over its height), `margin` times the frame's own size round it (1.2: a little before it's at the edge). */
export function inShot(s: Shot, p: { x: number; y: number; z: number }, aspect: number, margin = 1.2): boolean {
  const c = shotCamera(s);
  let fx = s.tx - c.x, fy = s.ty - c.y, fz = s.tz - c.z; const fl = Math.hypot(fx, fy, fz) || 1; fx /= fl; fy /= fl; fz /= fl;
  // right = forward × up (0, 1, 0); up' = right × forward
  let rx = -fz, rz = fx; const rl = Math.hypot(rx, rz) || 1; rx /= rl; rz /= rl;
  const ux = -rz * fy, uy = rz * fx - rx * fz, uz = rx * fy;
  const dx = p.x - c.x, dy = p.y - c.y, dz = p.z - c.z, depth = dx * fx + dy * fy + dz * fz;
  if (depth <= 0) return false;
  const t = Math.tan(((s.fov * Math.PI) / 180) / 2) * margin;
  return Math.abs((dx * ux + dy * uy + dz * uz) / depth) <= t && Math.abs((dx * rx + dz * rz) / depth) <= t * aspect;
}

/** When (seconds into plan `p`) the first of `points` comes on screen (inShot, sampled every `step` s), or the flight's length if
 *  none does before it ends (Ed, 2026-10-24: "the treehouse doesn't have to be ready at the start of the dive - only once it's in
 *  view"; app/arrive.ts eases the dive short of this while they aren't ready). */
export function dueAt(p: ArrivePlan, points: { x: number; y: number; z: number }[], aspect: number, step = 0.05): number {
  const T = planLength(p);
  for (let s = 0; s < T; s += step) { const k = shotAt(p, s); if (points.some(q => inShot(k, q, aspect))) return s; }
  return T;
}

/** The dive's pace short of a piece due in view that isn't ready (the guard): full till `lead` seconds before `due`, then falling
 *  in proportion to zero at it, so the flight eases into a hover there rather than show it half-built. */
export const dueRate = (s: number, due: number, lead: number): number => Math.max(0, Math.min(1, (due - s) / Math.max(1e-3, lead)));

/** The flight's length (seconds). */
export const planLength = (p: ArrivePlan): number => p.times[p.times.length - 1];

/** The shot `s` seconds in: each of its numbers on a smooth curve through the keys (Catmull-Rom tangents by the keys' times,
 *  still at both ends), so the camera glides through them. */
export function shotAt(p: ArrivePlan, s: number): Shot {
  const { keys: K, times: T } = p, n = K.length;
  if (s <= 0) return { ...K[0] };
  if (s >= T[n - 1]) return { ...K[n - 1] };
  let i = 0; while (i < n - 2 && s > T[i + 1]) i++;
  const h = T[i + 1] - T[i], u = (s - T[i]) / h, u2 = u * u, u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
  // (at the start the aim carries on north at the chart's speed, v0; still at the end)
  const slope = (j: number, f: (k: Shot) => number, v0 = 0) => (j <= 0 ? v0 : j >= n - 1 ? 0 : (f(K[j + 1]) - f(K[j - 1])) / (T[j + 1] - T[j - 1]));
  const at = (f: (k: Shot) => number, v0 = 0) => h00 * f(K[i]) + h10 * h * slope(i, f, v0) + h01 * f(K[i + 1]) + h11 * h * slope(i + 1, f, v0);
  return { tx: at(k => k.tx), ty: at(k => k.ty), tz: at(k => k.tz, -p.v0), angle: at(k => k.angle), distance: Math.max(1, at(k => k.distance)), fov: at(k => k.fov) };
}

/** Where a shot's camera is (the world's metres): `distance` back from its target, `angle` up. */
export function shotCamera(s: Shot): { x: number; y: number; z: number } {
  const a = (s.angle * Math.PI) / 180;
  return { x: s.tx, y: s.ty + Math.sin(a) * s.distance, z: s.tz + Math.cos(a) * s.distance };
}

/** The flight's clock (Ed's playtest, 2026-10-12: "the screen froze for about ten seconds, and then cut straight to the witch on the
 *  decks"): the first frames after the camera jumps to the chart's hand-off are the night's heaviest (the ground, the hills and the
 *  forest made round a new spot), seconds each on a laptop, and a flight timed by the wall clock was over before it was drawn. So it
 *  waits ("warm", the chart's still still up) until `warm.frames` frames in a row come within `warm.ms` (or `warm.max` seconds
 *  pass), then flies on the frames' own time, each frame counting at most `maxStep` seconds: a stall holds the flight, never
 *  skips it. */
export interface FlightClock { phase: "warm" | "fly"; s: number; calm: number; since: number; last: number }
export const newFlightClock = (): FlightClock => ({ phase: "warm", s: 0, calm: 0, since: -1, last: -1 });

/** One frame at `now` (ms): the clock moved on; `faded` true on the frame the warm-up ends (the still to fade then). */
export function stepFlightClock(c: FlightClock, now: number, A: Pick<ArriveTuning, "warm" | "maxStep">): { faded: boolean } {
  const dt = c.last < 0 ? 0 : now - c.last;
  c.last = now;
  if (c.phase === "warm") {
    if (c.since < 0) c.since = now;
    c.calm = c.since !== now && dt <= A.warm.ms ? c.calm + 1 : 0;
    if (c.calm >= A.warm.frames || now - c.since >= A.warm.max * 1000) { c.phase = "fly"; return { faded: true }; }
    return { faded: false };
  }
  c.s += Math.min(A.maxStep, dt / 1000);
  return { faded: false };
}
