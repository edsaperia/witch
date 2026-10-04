// The dash (Ed, 2026-10-04): on the ground, a quick burst of dash.distance metres over
// dash.duration seconds, the way she's steering (or facing, if she isn't), then dash.cooldown
// seconds before the next. No invulnerability (Ed: "you should be hittable while you dash, then
// you have to dash in the right direction"): it's for getting out of a shot's path. No drawing here.
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
}

export const newDash = (): DashState => ({ at: -Infinity, until: -Infinity, readyAt: 0, dx: 1, dz: 0 });

export const dashing = (d: DashState, time: number) => time < d.until;

/** How far it has recharged: 0 just dashed, 1 ready (for the action bar). */
export function dashCharge(d: DashState, time: number): number {
  if (time >= d.readyAt) return 1;
  const total = d.readyAt - d.at;
  return total > 0 ? Math.max(0, Math.min(1, (time - d.at) / total)) : 1;
}

/** The dash button: dash if she's on the ground, off her seat and it's ready. Returns whether she did. */
export function startDash(d: DashState, w: WitchState, moveX: number, moveZ: number, time: number, t: Tuning): boolean {
  if (time < d.readyAt || w.mode !== "ground" || w.seated) return false;
  let dx = moveX, dz = moveZ, len = Math.hypot(dx, dz);
  if (len < 0.1) { dx = w.vx; dz = w.vz; len = Math.hypot(dx, dz); }
  if (len < 0.1) { dx = w.facing; dz = 0; len = 1; }
  const D = t.dash;
  d.dx = dx / len; d.dz = dz / len; d.at = time; d.until = time + D.duration; d.readyAt = time + D.cooldown;
  return true;
}

/** During a dash, she moves along it at distance / duration instead of flying (from where she
 *  was before this step), kept inside the map. */
export function applyDash(d: DashState, before: WitchState, after: WitchState, time: number, dt: number, t: Tuning, bounds: { minX: number; maxX: number; minZ: number; maxZ: number }): WitchState {
  if (!dashing(d, time)) return after;
  const v = t.dash.distance / Math.max(0.01, t.dash.duration), step = dt;
  const x = Math.min(bounds.maxX, Math.max(bounds.minX, before.x + d.dx * v * step)), z = Math.min(bounds.maxZ, Math.max(bounds.minZ, before.z + d.dz * v * step));
  return { ...after, x, z, vx: d.dx * v, vz: d.dz * v, facing: Math.abs(d.dx) > 0.2 ? (d.dx > 0 ? 1 : -1) : after.facing };
}
