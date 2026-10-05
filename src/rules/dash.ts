// The dash, a blink (Ed, 2026-10-05: "the witch's dodge should be more like 10 metres, and be a
// 'blink' - she vanishes and reappears in the direction of travel"): on the ground, she's gone from
// where she stood and is dash.distance metres on the way she's steering (or flying, or facing), all
// in one step; for dash.gone seconds after she isn't drawn and can't be hit, then dash.cooldown
// seconds before the next. She never lands in a trunk, a rock or a soundsystem: the blink is
// shortened to the furthest clear spot along its line. No drawing here.
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";

export interface DashState {
  /** Game time the current dash began, and ends. */
  at: number;
  until: number;
  /** Game time she can dash again. */
  readyAt: number;
  /** Its direction (unit). */
  dx: number;
  dz: number;
  /** Where she left and where she arrives (metres). */
  fromX: number;
  fromZ: number;
  toX: number;
  toZ: number;
  /** Set when it starts, until the step that puts her there. */
  pending?: boolean;
}

export const newDash = (): DashState => ({ at: -Infinity, until: -Infinity, readyAt: 0, dx: 1, dz: 0, fromX: 0, fromZ: 0, toX: 0, toZ: 0 });

/** Mid-blink: she's gone (not drawn, can't be hit). */
export const dashing = (d: DashState, time: number) => time >= d.at && time < d.until;

/** How far it has recharged: 0 just dashed, 1 ready (for the action bar). */
export function dashCharge(d: DashState, time: number): number {
  if (time >= d.readyAt) return 1;
  const total = d.readyAt - d.at;
  return total > 0 ? Math.max(0, Math.min(1, (time - d.at) / total)) : 1;
}

type Bounds = { minX: number; maxX: number; minZ: number; maxZ: number };

/** The dash button: blink if she's on the ground, off her seat and it's ready. `clear(x, z)` says
 *  whether she can stand there. Returns whether she did. */
export function startDash(d: DashState, w: WitchState, moveX: number, moveZ: number, time: number, t: Tuning, bounds: Bounds, clear: (x: number, z: number) => boolean = () => true): boolean {
  if (time < d.readyAt || w.mode !== "ground" || w.seated) return false;
  let dx = moveX, dz = moveZ, len = Math.hypot(dx, dz);
  if (len < 0.1) { dx = w.vx; dz = w.vz; len = Math.hypot(dx, dz); }
  if (len < 0.1) { dx = w.facing; dz = 0; len = 1; }
  const D = t.dash;
  d.dx = dx / len; d.dz = dz / len; d.at = time; d.until = time + D.gone; d.readyAt = time + D.cooldown;
  d.fromX = w.x; d.fromZ = w.z;
  // The furthest clear spot along the line, in half-metre steps back from the full distance.
  const inside = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  d.toX = w.x; d.toZ = w.z;
  for (let r = D.distance; r > 0; r -= 0.5) {
    const x = inside(w.x + d.dx * r, bounds.minX, bounds.maxX), z = inside(w.z + d.dz * r, bounds.minZ, bounds.maxZ);
    if (clear(x, z)) { d.toX = x; d.toZ = z; break; }
  }
  d.pending = true;
  return true;
}

/** The step a blink starts, she's where it lands, still moving as she was (so the camera's
 *  look-ahead doesn't swing), facing its way. */
export function applyDash(d: DashState, after: WitchState): WitchState {
  if (!d.pending) return after;
  d.pending = false;
  return { ...after, x: d.toX, z: d.toZ, facing: Math.abs(d.dx) > 0.2 ? (d.dx > 0 ? 1 : -1) : after.facing };
}
