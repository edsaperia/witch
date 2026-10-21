// The telescope in the crow's nest (Ed, 2026-10-21; docs/backlog/treehouse.md, the crow's nest: "a view of its own, panning round
// the island 360°"; his answers to the mock, previews/ed/telescope-mock: just the view, true to the island, nothing marked and no
// new rule; the whole island, its far side a cheaper forest; full screen with a soft vignette; time at the house's tenth). E at the
// telescope looks through it, E or Esc leaves; while she looks she stands still and the night runs on slowly round her. The game's
// own camera never turns: the telescope is a view of its own (render/view/camera.ts). Here, the pure part: where it points and how
// far it's zoomed, stepped by her controls, and the aim that follows from them. Drawing only: nothing in the rules reads it.
import type { Tuning } from "./tuning";

export type TelescopeTuning = NonNullable<Tuning["telescope"]>;

/** Where the telescope points: its bearing (degrees clockwise from north, where the game's camera looks), and its zoom (0 wide, 1 close). */
export interface Telescope { heading: number; zoom: number }

/** The telescope as she first looks: north, the game's own way, wide. */
export const newTelescope = (): Telescope => ({ heading: 0, zoom: 0 });

/** A bearing in [0, 360). */
export const wrapBearing = (deg: number): number => ((deg % 360) + 360) % 360;

/** Its field of view (degrees) at `zoom`: wide to close, evenly in magnification. */
export function telescopeFov(T: TelescopeTuning, zoom: number): number {
  const z = Math.min(1, Math.max(0, zoom));
  return T.fovWide * Math.pow(T.fovClose / T.fovWide, z);
}

/** Its magnification at `zoom` (×1 wide), for the readout. */
export const telescopeMagnification = (T: TelescopeTuning, zoom: number): number => T.fovWide / telescopeFov(T, zoom);

/** One step of her controls: left and right pan (slower the closer it's zoomed, so the view moves alike on screen), up and down
 *  zoom (the wheel and the zoom keys a step each: `zoom` as the controls give it, positive out). `moveZ` is the stick's: negative
 *  is up the screen, so in. */
export function stepTelescope(s: Telescope, c: { moveX: number; moveZ: number; zoom?: number }, dt: number, T: TelescopeTuning): Telescope {
  const pan = T.pan * (telescopeFov(T, s.zoom) / T.fovWide);
  const zoom = Math.min(1, Math.max(0, s.zoom - c.moveZ * T.zoomRate * dt - (c.zoom ?? 0) * T.zoomStep));
  return { heading: wrapBearing(s.heading + c.moveX * pan * dt), zoom };
}

/** How far out (m, along the ground) the middle of the view looks at `zoom`: nearer wide, the far forest close. */
export const telescopeAim = (T: TelescopeTuning, zoom: number): number => T.aimWide + (T.aimClose - T.aimWide) * Math.min(1, Math.max(0, zoom));

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
