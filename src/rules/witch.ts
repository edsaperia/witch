// The witch: where she is, how fast she flies, and her two modes. Ground mode is slower and
// under the trees; treetop mode is faster and above the canopy. One button rises or descends,
// which takes riseTime or descendTime: `lift` runs from 0 (ground) to 1 (treetop).
import { clamp, lerp, smoothstep } from "./random";
import type { Tuning } from "./tuning";

export type Mode = "ground" | "rising" | "treetop" | "descending";

export interface WitchState {
  x: number;
  z: number;
  vx: number;
  vz: number;
  /** 0 on the ground, 1 at the treetops; eased for height and speed. */
  lift: number;
  mode: Mode;
  /** 1 facing right (east), -1 facing left. */
  facing: 1 | -1;
  /** Turned away from the viewer: only while clearly flying up the screen (see facingAway). */
  away: boolean;
  /** Leaning into fast flight: above leanAt of the mode's top speed. */
  lean: boolean;
}

/** What the player asks for this frame: a direction (length up to 1) and button presses. */
export interface Intent {
  moveX: number;
  moveZ: number;
  /** Rise or descend was pressed this frame. */
  toggleMode: boolean;
}

/** Towards the viewer unless clearly heading up the screen (Ed, 2026-10-03): away only while the
 *  heading is within the away cone round straight up (entering at awayEnter degrees, leaving at
 *  awayLeave, so diagonals don't flicker) and moving faster than `minSpeed`. Sideways, downward
 *  or stopped: towards. For the witch and the creatures alike. */
export function facingAway(vx: number, vz: number, wasAway: boolean, minSpeed: number, t: Tuning): boolean {
  if (Math.hypot(vx, vz) < minSpeed || vz >= 0) return false;
  const angle = (Math.atan2(Math.abs(vx), -vz) * 180) / Math.PI; // 0 straight up the screen
  return angle < (wasAway ? t.facing.awayLeave : t.facing.awayEnter);
}

export const NO_INTENT: Intent = { moveX: 0, moveZ: 0, toggleMode: false };

export function newWitch(x: number, z: number): WitchState {
  return { x, z, vx: 0, vz: 0, lift: 0, mode: "ground", facing: 1, away: false, lean: false };
}

export const witchHeight = (w: WitchState, t: Tuning) => lerp(t.groundHeight, t.treetopHeight, smoothstep(w.lift));
export const witchMaxSpeed = (w: WitchState, t: Tuning) => lerp(t.groundSpeed, t.treetopSpeed, smoothstep(w.lift));
/** How much of the canopy shows: 0 in ground mode, 1 in treetop mode. */
export const canopyShown = (w: WitchState) => smoothstep(w.lift);

export function stepWitch(w: WitchState, intent: Intent, dt: number, t: Tuning, bounds: { minX: number; maxX: number; minZ: number; maxZ: number }): WitchState {
  let { mode, lift } = w;
  if (intent.toggleMode) mode = mode === "ground" || mode === "descending" ? "rising" : "descending";
  if (mode === "rising") { lift += dt / Math.max(1e-3, t.riseTime); if (lift >= 1) { lift = 1; mode = "treetop"; } }
  else if (mode === "descending") { lift -= dt / Math.max(1e-3, t.descendTime); if (lift <= 0) { lift = 0; mode = "ground"; } }

  let mx = intent.moveX, mz = intent.moveZ;
  const len = Math.hypot(mx, mz);
  if (len > 1) { mx /= len; mz /= len; }
  const max = lerp(t.groundSpeed, t.treetopSpeed, smoothstep(lift));
  const k = 1 - Math.exp(-lerp(t.groundAcceleration, t.acceleration, smoothstep(lift)) * dt);
  let vx = w.vx + (mx * max - w.vx) * k, vz = w.vz + (mz * max - w.vz) * k;
  let x = w.x + vx * dt, z = w.z + vz * dt;
  if (x < bounds.minX || x > bounds.maxX) { x = clamp(x, bounds.minX, bounds.maxX); vx = 0; }
  if (z < bounds.minZ || z > bounds.maxZ) { z = clamp(z, bounds.minZ, bounds.maxZ); vz = 0; }
  const facing: 1 | -1 = vx > 0.3 ? 1 : vx < -0.3 ? -1 : w.facing;
  const speed = Math.hypot(vx, vz), away = facingAway(vx, vz, w.away, Math.max(1, max * 0.15), t);
  return { x, z, vx, vz, lift, mode, facing, away, lean: speed > max * t.leanAt };
}
