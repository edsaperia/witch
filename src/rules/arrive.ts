// Arriving on an island (Ed, 2026-10-12, the zoom-to-island plan: Charlie's chart side, PR 1, and this, the game's): the sea
// chart zooms in, flies the first leg and hands off over the open sea south of the island, saving its last frame and its camera
// in sessionStorage ("witch.arrive") before loading ./?island=X&arrive=1. The game shows that still while the night builds,
// then takes over at the same camera and flies the rest (Ed: "fly from the south end of the island, over the sea and over the
// forest, to give a taste of the terrain, before settling on the home area"; "make sure the camera path shows the dancefloor
// and the island legend under the Ent"), looking north the whole way, down to today's opening shot at her decks (Ed: "Land at
// the decks"). Any key skips to the end. Here: reading the hand-off record and the flight's path, as the camera's own terms
// (rules/camera.ts: a target, an angle down to it and a distance back). Pure: no clock, no page.
import type { ForestMap } from "./map";
import type { Tuning } from "./tuning";

/** The sessionStorage key the chart writes the hand-off to. */
export const ARRIVE_KEY = "witch.arrive";

/** The chart's hand-off (Charlie's PR 1): its last frame and its camera, x and z metres from the island's dancefloor (x east, z
 *  south), height metres over the sea, pitch its tilt down (radians), fov vertical (degrees); the camera faces north. */
export interface ArriveRecord {
  v: 1; island: string; world?: number; at: number; still: string;
  cam: { x: number; z: number; height: number; pitch: number; fov: number };
}

/** The record, if `raw` is one for this `island` made within `maxAge` seconds of `now` (ms), else null. */
export function readArrival(raw: string | null, island: string, now: number, maxAge: number): ArriveRecord | null {
  if (!raw) return null;
  let r: ArriveRecord;
  try { r = JSON.parse(raw) as ArriveRecord; } catch { return null; }
  const c = r?.cam, num = (n: unknown) => typeof n === "number" && Number.isFinite(n);
  if (!r || r.v !== 1 || r.island !== island || !num(r.at) || typeof r.still !== "string" || !c) return null;
  if (!num(c.x) || !num(c.z) || !num(c.height) || !num(c.pitch) || !num(c.fov)) return null;
  if (now - r.at > maxAge * 1000 || now < r.at - 5000) return null; // (stale, or from a clock that's ahead: ignore it)
  return r;
}

/** A camera shot as the game's camera is posed (render/view/culling.ts poseCamera): looking north at (tx, ty, tz) from angle
 *  degrees above it and distance metres back; ty in the world's heights (not over the ground); fov degrees, vertical. */
export interface Shot { tx: number; ty: number; tz: number; angle: number; distance: number; fov: number }

/** The flight: its shots and the seconds at which it passes each (times[0] = 0). */
export interface ArrivePlan { keys: Shot[]; times: number[] }

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

/** The flight from the chart's hand-off to `end` (the game's own opening shot at her decks): over the sea to the south coast and
 *  low over the forest north at `A.speed` m/s, then up to frame the dancefloor and the treehouse's spot (where the island's
 *  legend will carry the Ent) together, then down into `end`. `ground(x, z)`: the ground's height there. */
export function arrivePlan(rec: ArriveRecord, map: ForestMap, A: ArriveTuning, ground: (x: number, z: number) => number, end: Shot): ArrivePlan {
  const d = map.dancefloor, th = map.treehouse, fov = end.fov;
  // the hand-off: the chart's camera, its target where its line of sight meets the sea (or a long way out, near level)
  const p = Math.max(0.02, rec.cam.pitch), back = Math.min(1200, rec.cam.height / Math.sin(p));
  const x0 = d.x + rec.cam.x, z0 = d.z + rec.cam.z;
  const k0: Shot = { tx: x0, ty: rec.cam.height - Math.sin(p) * back, tz: z0 - Math.cos(p) * back, angle: (p * 180) / Math.PI, distance: back, fov: rec.cam.fov };
  // low over the land: aimed `ahead` metres north of the camera's ground point
  const low = (z: number): Shot => { const a = (A.low.angle * Math.PI) / 180, tz = z - Math.cos(a) * A.low.distance; return { tx: d.x, ty: ground(d.x, tz), tz, angle: A.low.angle, distance: A.low.distance, fov }; };
  const coast = southCoast(map), k1 = low(coast + A.low.offshore), k2 = low((coast + A.low.offshore + d.z) / 2 + A.low.distance * 0.5);
  // the frame: the dancefloor and the treehouse's spot together, from the south and up
  const fx = (d.x + th.x) / 2, fz = (d.z + th.z) / 2;
  const k3: Shot = { tx: fx, ty: ground(fx, fz) + A.frame.lift, tz: fz, angle: A.frame.angle, distance: A.frame.distance, fov };
  const keys = [k0, k1, k2, k3, end];
  // the times: the low legs by their length at A.speed, the rise and the settle their own seconds
  const cam = (s: Shot) => ({ x: s.tx, z: s.tz + Math.cos((s.angle * Math.PI) / 180) * s.distance });
  const leg = (a: Shot, b: Shot) => Math.hypot(cam(a).x - cam(b).x, cam(a).z - cam(b).z) / Math.max(1, A.speed);
  const t1 = Math.max(A.minLeg, leg(k0, k1)), t2 = t1 + Math.max(A.minLeg, leg(k1, k2)), t3 = t2 + A.rise, t4 = t3 + A.settle;
  return { keys, times: [0, t1, t2, t3, t4] };
}

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
  const slope = (j: number, f: (k: Shot) => number) => (j <= 0 || j >= n - 1 ? 0 : (f(K[j + 1]) - f(K[j - 1])) / (T[j + 1] - T[j - 1]));
  const at = (f: (k: Shot) => number) => h00 * f(K[i]) + h10 * h * slope(i, f) + h01 * f(K[i + 1]) + h11 * h * slope(i + 1, f);
  return { tx: at(k => k.tx), ty: at(k => k.ty), tz: at(k => k.tz), angle: at(k => k.angle), distance: Math.max(1, at(k => k.distance)), fov: at(k => k.fov) };
}

/** Where a shot's camera is (the world's metres): `distance` back from its target, `angle` up. */
export function shotCamera(s: Shot): { x: number; y: number; z: number } {
  const a = (s.angle * Math.PI) / 180;
  return { x: s.tx, y: s.ty + Math.sin(a) * s.distance, z: s.tz + Math.cos(a) * s.distance };
}
