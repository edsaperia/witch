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
}

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
  return { zoomStep: s, zoom, tx: x, ty: y, tz: z, vx: 0, vy: 0, vz: 0, ax: 0, az: 0, lift: 0 };
}

/** One step of a critically damped spring toward `to`: no overshoot, no wobble. */
function spring(x: number, v: number, to: number, w: number, dt: number): [number, number] {
  const k = w * dt, e = Math.exp(-k), d = x - to, c = v + w * d;
  return [to + (d + c * dt) * e, (v - w * c * dt) * e];
}

/** Follow the witch: `target` is where she is, `vel` how fast she flies, `lift` her height (0-1). */
export function stepCamera(c: CameraState, zoomDelta: number, target: { x: number; y: number; z: number }, vel: { x: number; z: number }, lift: number, dt: number, t: Tuning): CameraState {
  const cam = t.camera, steps = Math.max(1, cam.zoomSteps);
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
  return { zoomStep, zoom, tx, ty, tz, vx, vy, vz, ax: nax, az: naz, lift: clamp(l, 0, 1), pull };
}

/** Where the camera is for the witch's lift (0 ground, 1 treetop) and the zoom. */
export function cameraPose(c: CameraState, lift: number, t: Tuning): CameraPose {
  const g = t.camera.ground, tt = t.camera.treetop, m = smoothstep(lift);
  const angle = lerp(lerp(g.angleIn, g.angleOut, c.zoom), lerp(tt.angleIn, tt.angleOut, c.zoom), m);
  const distance = lerp(lerp(g.distanceIn, g.distanceOut, c.zoom), lerp(tt.distanceIn, tt.distanceOut, c.zoom), m) * (1 + (c.pull ?? 0));
  const a = (angle * Math.PI) / 180;
  return { angle, distance, x: c.tx, y: c.ty + Math.sin(a) * distance, z: c.tz + Math.cos(a) * distance, tx: c.tx, ty: c.ty, tz: c.tz };
}
