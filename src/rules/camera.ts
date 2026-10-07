// The camera rig, as numbers: a fixed angle per mode, a distance from the witch, and zoom.
// The camera looks north (toward -z) and down; it always sits due south of what it looks at.
import { clamp, lerp, smoothstep } from "./random";
import type { Tuning } from "./tuning";

export interface CameraState {
  /** Zoom step chosen: 0 is fully in, zoomSteps - 1 fully out. */
  zoomStep: number;
  /** Zoom eased toward the chosen step, 0 (in) to 1 (out). */
  zoom: number;
  /** The point it looks at, eased after the witch. */
  tx: number;
  ty: number;
  tz: number;
  /** The spring's velocity, metres per second. */
  vx: number;
  vy: number;
  vz: number;
  /** The look-ahead offset, eased on its own so it never swings the view. */
  ax: number;
  az: number;
  /** Lift (0 ground, 1 treetop) as the camera has eased to it, for angle and distance. */
  lift: number;
  /** Drawn back with treetop speed: a share of the distance, eased. */
  pull?: number;
  /** The opening shot (Ed, v171): 1 while she sits on the treehouse, close in on her seat
   *  (camera.intro), running down to 0 over camera.intro.ease seconds once she leaves it. */
  intro?: number;
  /** Near the sea (Ed, 2026-10-06: "The transition to a lower angle and higher bend should be gradual as you approach the
   *  beach, over 200m until you're at stargazing at the edge of the sea"): 0 from beach.camera.approach metres from the
   *  water's edge to 1 at it, on the ground (eased); and lying down to stargaze, 0 to 1 (eased over beach.gazeEase seconds). */
  coast?: number;
  gaze?: number;
  /** How much the open sea lies behind the camera (0 to 1: the south coast, the camera always looking north). */
  seaBehind?: number;
  /** Her bearing round the coast from the map's middle (radians, 0 north, clockwise), for the stargazing table. */
  bearing?: number;
}

/** What the camera needs of the beach each step: how near the water she is (0 at beach.camera.approach metres, 1 at its
 *  edge) and whether she's lying stargazing. */
export interface CoastView { near: number; gazing: boolean; /** how much the open sea lies behind the camera, 0 to 1 */ seaBehind?: number; /** her bearing from the map's middle (radians, 0 north, clockwise) */ bearing?: number }

export interface CameraPose {
  /** Degrees below the horizontal. */
  angle: number;
  distance: number;
  x: number;
  y: number;
  z: number;
  /** What it looks at. */
  tx: number;
  ty: number;
  tz: number;
}

export function newCamera(t: Tuning, x: number, y: number, z: number): CameraState {
  const steps = Math.max(1, t.camera.zoomSteps), s = clamp(Math.round(t.camera.startZoom), 0, steps - 1);
  const zoom = steps > 1 ? s / (steps - 1) : 0;
  return { zoomStep: s, zoom, tx: x, ty: y, tz: z, vx: 0, vy: 0, vz: 0, ax: 0, az: 0, lift: 0, intro: 1 };
}

/** One step of a critically damped spring toward `to`: no overshoot, no wobble. */
function spring(x: number, v: number, to: number, w: number, dt: number): [number, number] {
  const k = w * dt, e = Math.exp(-k), d = x - to, c = v + w * d;
  return [to + (d + c * dt) * e, (v - w * c * dt) * e];
}

/** Follow the witch: `target` is where she is, `vel` how fast she flies, `lift` her height (0-1).
 *  While she's `seated`, it frames `focus` (her seat, as drawn) for the opening shot. */
export function stepCamera(c: CameraState, zoomDelta: number, target: { x: number; y: number; z: number }, vel: { x: number; z: number }, lift: number, dt: number, t: Tuning, seated = false, focus?: { x: number; y: number; z: number } | null, coast?: CoastView | null): CameraState {
  const cam = t.camera, steps = Math.max(1, cam.zoomSteps);
  const intro = seated ? (c.intro ?? 0) : Math.max(0, (c.intro ?? 0) - dt / Math.max(0.05, cam.intro.ease));
  if (seated && focus) target = focus;
  const zoomStep = clamp(c.zoomStep + Math.sign(zoomDelta), 0, steps - 1);
  const want = steps > 1 ? zoomStep / (steps - 1) : 0;
  // A small look-ahead in the direction of flight, capped, eased in and out slowly.
  let ax = vel.x * cam.lookAhead, az = vel.z * cam.lookAhead;
  const len = Math.hypot(ax, az);
  if (len > cam.lookAheadMax) { ax *= cam.lookAheadMax / len; az *= cam.lookAheadMax / len; }
  const ak = 1 - Math.exp(-cam.lookAheadEase * dt);
  const nax = c.ax + (ax - c.ax) * ak, naz = c.az + (az - c.az) * ak;
  const [tx, vx] = spring(c.tx, c.vx, target.x + nax, cam.follow, dt);
  const [ty, vy] = spring(c.ty, c.vy, target.y, cam.follow, dt);
  const [tz, vz] = spring(c.tz, c.vz, target.z + naz, cam.follow, dt);
  const zoom = c.zoom + (want - c.zoom) * (1 - Math.exp(-cam.zoomEase * dt));
  const l = c.lift + (lift - c.lift) * (1 - Math.exp(-cam.liftEase * dt));
  // Boosting in the treetops, it draws back a little (a few per cent), eased.
  const T = t.treetop, over = clamp((Math.hypot(vel.x, vel.z) - t.treetopSpeed) / Math.max(1, t.treetopSpeed * (T.boost - 1)), 0, 1);
  const pull = (c.pull ?? 0) + (T.cameraPull * over * smoothstep(l) - (c.pull ?? 0)) * (1 - Math.exp(-1.5 * dt));
  // By the sea: the coast eased with her (a second or so: it follows her distance, which changes smoothly anyway), lying down eased over gazeEase.
  const B = t.beach, ck = 1 - Math.exp(-2 * dt), gk = 1 - Math.exp((-3 * dt) / Math.max(0.05, B?.gazeEase ?? 1.5));
  let near = (c.coast ?? 0) + (coast0(coast) - (c.coast ?? 0)) * ck, gaze = (c.gaze ?? 0) + ((coast?.gazing ? 1 : 0) - (c.gaze ?? 0)) * gk;
  if (near < 1e-4) near = 0;
  if (gaze < 1e-4) gaze = 0; else if (gaze > 1 - 1e-4) gaze = 1;
  const seaBehind = coast ? clamp(coast.seaBehind ?? 0, 0, 1) : (c.seaBehind ?? 0); // (by bearing: changes only as slowly as she walks)
  const bearing = coast?.bearing ?? c.bearing;
  return { zoomStep, zoom, tx, ty, tz, vx, vy, vz, ax: nax, az: naz, lift: clamp(l, 0, 1), pull, intro, coast: near, gaze, seaBehind, bearing };
}
const coast0 = (v?: CoastView | null) => (v ? clamp(v.near, 0, 1) : 0);

/** How far the beach's view has come in (0 to 1): the coast's ramp on the ground (never over the treetops), or lying down. */
export function coastView(c: CameraState): { coast: number; gaze: number } {
  const m = smoothstep(c.lift);
  return { coast: smoothstep(c.coast ?? 0) * (1 - m), gaze: smoothstep(c.gaze ?? 0) };
}

/** The stargazing camera at bearing `b` (radians, 0 north, clockwise) round the coast (Ed, 2026-10-07: "move the camera
 *  further and lower to show off the moon reflecting on the water and the beach and the sky ... check in 12 different
 *  directions for a nice composition and smoothly interpolate between them"): beach.camera.bearings, a degrees-below-the-
 *  horizon angle, a distance, a look (metres over her) and a side (metres east the camera and its aim stand, out over
 *  the water on the east and west coasts, where the camera looking north would otherwise see only the sand: the shore runs
 *  up the picture, the sea beside it) and a bend (the share of the stargazing bend kept: none facing the open sea to the
 *  north, so the water isn't dropped below a horizon of sand; render/view/camera.ts) every 30 degrees from the north, joined by a closed Catmull-Rom spline (smooth all
 *  the way round). */
export function gazeAt(BC: NonNullable<NonNullable<Tuning["beach"]>["camera"]>, b: number): { angle: number; distance: number; look: number; side: number; bend: number } {
  const T = BC.bearings, n = T.angle.length, u = ((((b / (2 * Math.PI)) * n) % n) + n) % n, i = Math.floor(u), f = u - i;
  const at = (xs: number[]) => {
    const p0 = xs[(i + n - 1) % n], p1 = xs[i], p2 = xs[(i + 1) % n], p3 = xs[(i + 2) % n];
    return p1 + 0.5 * f * (p2 - p0 + f * (2 * p0 - 5 * p1 + 4 * p2 - p3 + f * (3 * (p1 - p2) + p3 - p0)));
  };
  return { angle: at(T.angle), distance: at(T.distance), look: at(T.look), side: T.side ? at(T.side) : 0, bend: T.bend ? at(T.bend) : 1 };
}

/** Where the camera is for the witch's lift (0 ground, 1 treetop) and the zoom. */
export function cameraPose(c: CameraState, lift: number, t: Tuning): CameraPose {
  const g = t.camera.ground, tt = t.camera.treetop, m = smoothstep(lift);
  let angle = lerp(lerp(g.angleIn, g.angleOut, c.zoom), lerp(tt.angleIn, tt.angleOut, c.zoom), m);
  // Over the treetops it zooms out with her speed (camera.speedZoom): faster flight, more ground on screen.
  const SZ = t.camera.speedZoom, fast = SZ && SZ.power > 0 ? Math.pow(Math.max(0.25, t.treetopSpeed / SZ.base), SZ.power) : 1;
  let distance = lerp(lerp(g.distanceIn, g.distanceOut, c.zoom), lerp(tt.distanceIn, tt.distanceOut, c.zoom) * fast, m) * (1 + (c.pull ?? 0));
  // The opening shot: closer and lower, easing out to the normal view as she leaves her seat.
  const k = smoothstep(c.intro ?? 0), I = t.camera.intro;
  angle = lerp(angle, I.angle, k); distance = lerp(distance, I.distance, k);
  // By the sea (beach.camera): lower toward its angle as she nears the water, and lower and closer still lying down to stargaze.
  const BC = t.beach?.camera;
  let look = 0, side = 0;
  if (BC) {
    const v = coastView(c), G = gazeAt(BC, c.bearing ?? 0);
    angle = lerp(angle, BC.angle, v.coast);
    angle = lerp(angle, G.angle, v.gaze); distance = lerp(distance, G.distance, v.gaze);
    look = G.look * v.gaze; // (aimed a little over her, so she lies low in the picture under the sky)
    side = G.side * v.gaze;
  }
  const a = (angle * Math.PI) / 180, ty = c.ty + look, tx = c.tx + side;
  return { angle, distance, x: tx, y: ty + Math.sin(a) * distance, z: c.tz + Math.cos(a) * distance, tx, ty, tz: c.tz };
}
