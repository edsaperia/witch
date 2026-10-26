// The telescope in the crow's nest (Ed, 2026-10-21; docs/backlog/treehouse.md, the crow's nest: "a view of its own, panning round
// the island 360°"; his answers to the mock, previews/ed/telescope-mock: just the view, true to the island, nothing marked and no
// new rule; the whole island, its far side a cheaper forest; full screen with a soft vignette; time at the house's tenth). E at the
// telescope looks through it, E or Esc leaves; while she looks she stands still and the night runs on slowly round her. The game's
// own camera never turns: the telescope is a view of its own (render/view/camera.ts). It tilts up to the stars (Ed, 2026-10-22:
// "The telescope should be able to tilt up and down so you can look at the stars"): ▲ ▼ from the forest to about 80° up, the
// zoom on the wheel, Z and X and the gamepad's shoulder buttons. Here, the pure part: where it points, how high and how far it's
// zoomed, stepped by her controls. Drawing only: nothing in the rules reads it.
import type { Tuning } from "./tuning";

export type TelescopeTuning = NonNullable<Tuning["telescope"]>;

/** Where the telescope points: its bearing (degrees clockwise from north, where the game's camera looks), its elevation (degrees
 *  up; below 0, down at the forest) and its zoom (0 wide, 1 close). */
export interface Telescope { heading: number; elevation: number; zoom: number }

/** How far down (degrees) it looks at its lowest: at the forest aimWide metres out from the eye, over the bend. */
export const telescopeFloor = (T: TelescopeTuning): number => -telescopePitch(T.eye, T.aimWide, T.bend);

/** The telescope as she first looks: north, the game's own way, down at the forest, wide. */
export const newTelescope = (T: TelescopeTuning): Telescope => ({ heading: 0, elevation: telescopeFloor(T), zoom: 0 });

/** A bearing in [0, 360). */
export const wrapBearing = (deg: number): number => ((deg % 360) + 360) % 360;

/** Its field of view (degrees) at `zoom`: wide to close, evenly in magnification. */
export function telescopeFov(T: TelescopeTuning, zoom: number): number {
  const z = Math.min(1, Math.max(0, zoom));
  return T.fovWide * Math.pow(T.fovClose / T.fovWide, z);
}

/** Its magnification at `zoom` (×1 wide), for the readout. */
export const telescopeMagnification = (T: TelescopeTuning, zoom: number): number => T.fovWide / telescopeFov(T, zoom);

/** One step of her controls: left and right pan, up and down tilt (both slower the closer it's zoomed, so the view moves alike on
 *  screen; `moveZ` is the stick's, negative up the screen, so up), the wheel, the zoom keys and the shoulder buttons zoom a step
 *  each (`zoom` as the controls give it, positive out). */
export function stepTelescope(s: Telescope, c: { moveX: number; moveZ: number; zoom?: number }, dt: number, T: TelescopeTuning): Telescope {
  const k = telescopeFov(T, s.zoom) / T.fovWide;
  const elevation = Math.min(T.tiltMax, Math.max(telescopeFloor(T), s.elevation - c.moveZ * T.tilt * k * dt));
  const zoom = Math.min(1, Math.max(0, s.zoom - (c.zoom ?? 0) * T.zoomStep));
  return { heading: wrapBearing(s.heading + c.moveX * T.pan * k * dt), elevation, zoom };
}

/** Turned straight by `dHeading` and `dElevation` degrees (the mouse: Ed, 2026-10-23, "look around with aiming keys"), the
 *  elevation kept between its floor and tiltMax. */
export function turnTelescope(s: Telescope, dHeading: number, dElevation: number, T: TelescopeTuning): Telescope {
  return { ...s, heading: wrapBearing(s.heading + dHeading), elevation: Math.min(T.tiltMax, Math.max(telescopeFloor(T), s.elevation + dElevation)) };
}

/** The pitch (degrees down) from an eye `eye` metres up to the ground `aim` metres out, over ground bent by `bend` (dropping
 *  bend × d² at d metres: render/height.ts): what the view tilts down by so its middle lands there. */
export const telescopePitch = (eye: number, aim: number, bend: number): number => (Math.atan((eye + bend * aim * aim) / Math.max(1, aim)) * 180) / Math.PI;

/** The eight points of the compass, for the readout. */
const POINTS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
export const compassPoint = (deg: number): string => POINTS[Math.round(wrapBearing(deg) / 45) % 8];

/** Where the moon shows in the telescope (Ed's answer: "the moon placed by bearing"): the game's camera always looks north, its
 *  moon at `moonX` across the screen (rules/moon.ts, 0 to 1), so the moon stands at that bearing round north, the game's view
 *  `spread` degrees across; in the telescope's view, `heading` and `fov` (horizontal, degrees), its x across the screen (0 to 1,
 *  outside it off the screen). */
export function moonInView(moonX: number, heading: number, fovX: number, spread: number): number {
  const bearing = (moonX - 0.5) * spread, off = ((bearing - heading + 540) % 360) - 180;
  return 0.5 + off / Math.max(1, fovX);
}

/** Where the moon stands in the sky the telescope looks at (Ed's playtest, v4522: "The moon does not stay the same height in the sky
 *  as you move the telescope around"): a direction, not a place on the screen. Its bearing as above; its elevation (degrees) from its
 *  place in the game's sky band (rules/moon.ts y, from `low`, behind the far forest, to `high`): on the horizon at the band's foot,
 *  rising to `height` at its top (the sea chart's moon's, chart.moon.height). */
export const moonInSky = (moon: { x: number; y: number }, spread: number, low: number, high: number, height: number): { bearing: number; elevation: number } =>
  ({ bearing: wrapBearing((moon.x - 0.5) * spread), elevation: height * Math.min(1, Math.max(0, (moon.y - low) / Math.max(1e-6, high - low))) });

/** The direction at `bearing` (degrees from north, clockwise) and `elevation` (degrees up) as a unit vector in the world's axes
 *  (x east, y up, z south), as render/sky.ts reads the sky. */
export function skyDirection(bearing: number, elevation: number): [number, number, number] {
  const a = (bearing * Math.PI) / 180, e = (elevation * Math.PI) / 180;
  return [Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e)];
}

/** Where a direction in the sky falls in the telescope's view (`heading` degrees from north, `pitch` degrees down, `fov` its vertical
 *  field of view in degrees, `aspect` its width over its height): x and y across the picture (0 to 1, from the left and the bottom),
 *  as render/sky.ts shades it (its look()), or null behind the view. */
export function skyOnScreen(dir: readonly [number, number, number], heading: number, pitch: number, fov: number, aspect: number): { x: number; y: number } | null {
  const a = (heading * Math.PI) / 180, p = (pitch * Math.PI) / 180, s = Math.sin(a), c = Math.cos(a);
  const F = [s * Math.cos(p), -Math.sin(p), -c * Math.cos(p)], R = [c, 0, s], U = [s * Math.sin(p), Math.cos(p), -c * Math.sin(p)];
  const dot = (v: number[]) => v[0] * dir[0] + v[1] * dir[1] + v[2] * dir[2];
  const f = dot(F), ty = Math.tan((fov * Math.PI) / 360);
  if (f <= 1e-6) return null;
  return { x: 0.5 + (dot(R) / f / (ty * aspect)) * 0.5, y: 0.5 + (dot(U) / f / ty) * 0.5 };
}
