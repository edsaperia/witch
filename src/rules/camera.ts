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
  return { zoomStep: s, zoom, tx: x, ty: y, tz: z };
}

export function stepCamera(c: CameraState, zoomDelta: number, target: { x: number; y: number; z: number }, dt: number, t: Tuning): CameraState {
  const steps = Math.max(1, t.camera.zoomSteps);
  const zoomStep = clamp(c.zoomStep + Math.sign(zoomDelta), 0, steps - 1);
  const want = steps > 1 ? zoomStep / (steps - 1) : 0;
  const zk = 1 - Math.exp(-8 * dt), fk = 1 - Math.exp(-t.camera.follow * dt);
  return {
    zoomStep,
    zoom: c.zoom + (want - c.zoom) * zk,
    tx: c.tx + (target.x - c.tx) * fk,
    ty: c.ty + (target.y - c.ty) * fk,
    tz: c.tz + (target.z - c.tz) * fk,
  };
}

/** Where the camera is for the witch's lift (0 ground, 1 treetop) and the zoom. */
export function cameraPose(c: CameraState, lift: number, t: Tuning): CameraPose {
  const g = t.camera.ground, tt = t.camera.treetop, m = smoothstep(lift);
  const angle = lerp(lerp(g.angleIn, g.angleOut, c.zoom), lerp(tt.angleIn, tt.angleOut, c.zoom), m);
  const distance = lerp(lerp(g.distanceIn, g.distanceOut, c.zoom), lerp(tt.distanceIn, tt.distanceOut, c.zoom), m);
  const a = (angle * Math.PI) / 180;
  return { angle, distance, x: c.tx, y: c.ty + Math.sin(a) * distance, z: c.tz + Math.cos(a) * distance, tx: c.tx, ty: c.ty, tz: c.tz };
}
