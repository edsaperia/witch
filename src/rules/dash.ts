// The dash, a blink (Ed, 2026-10-05: "the witch's dodge should be more like 10 metres, and be a
// 'blink' - she vanishes and reappears in the direction of travel"): on the ground, she's gone from
// where she stood and is dash.distance metres on the way she's steering (or flying, or facing), all
// in one step; for dash.gone seconds after she isn't drawn and can't be hit, then dash.cooldown
// seconds before the next. She never lands in a trunk, a rock or a soundsystem: the blink is
// shortened to the furthest clear spot along its line. No drawing here.
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";
import { keepIn, type Bounds } from "./mapShape";

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
  /** A press waits until this game time for the dash to be ready (dash.buffer): pressed a moment
   *  early, mid-landing or mid-stagger, it still blinks. */
  bufferUntil?: number;
  /** Blinks ready (Hare's Dash bursts: more than one, recharging one at a time, dash.cooldown
   *  each), and when the next comes back (Infinity when full). */
  charges: number;
  chargeAt: number;
}

export const newDash = (): DashState => ({ at: -Infinity, until: -Infinity, readyAt: 0, dx: 1, dz: 0, fromX: 0, fromZ: 0, toX: 0, toZ: 0, charges: 1, chargeAt: Infinity });

/** Charges back, one every dash.cooldown seconds, up to `max`. */
export function rechargeDash(d: DashState, time: number, max: number, cooldown: number): void {
  if (d.charges > max) d.charges = max;
  while (d.charges < max && time >= d.chargeAt) { d.charges++; d.chargeAt += cooldown; }
  if (d.charges >= max) d.chargeAt = Infinity;
  else if (d.chargeAt === Infinity) d.chargeAt = time + cooldown;
  if (d.charges < 1) d.readyAt = Math.max(d.readyAt, d.chargeAt);
}

/** How long a blink keeps her gone (dash.gone; with committed strikes on, long enough to blink through a lunge: dodge.a.gone). */
export const blinkGone = (t: Tuning): number => (t.dodge?.a.on ? Math.max(t.dash.gone, t.dodge.a.gone) : t.dash.gone);

/** Mid-blink: she's gone (not drawn, can't be hit). */
export const dashing = (d: DashState, time: number) => time >= d.at && time < d.until;

/** How far it has recharged: 0 just dashed, 1 ready (for the action bar). */
export function dashCharge(d: DashState, time: number): number {
  if (time >= d.readyAt) return 1;
  const total = d.readyAt - d.at;
  return total > 0 ? Math.max(0, Math.min(1, (time - d.at) / total)) : 1;
}


/** The dash button: blink if she's on the ground, off her seat and it's ready, toward the cursor
 *  (`aimX`, `aimZ`: the ground under it from her, metres; 0, 0 with none) or, with none, the way she
 *  steers. `clear(x, z)` says whether she can stand there. Returns whether she did. */
export function startDash(d: DashState, w: WitchState, moveX: number, moveZ: number, time: number, t: Tuning, bounds: Bounds, clear: (x: number, z: number) => boolean = () => true, max = 1, chain = 0, aimX = 0, aimZ = 0, gate?: boolean): boolean {
  // (gate given: the shared cooldown decides (rules/cooldown.ts), the charges don't count; chain still keeps a burst's blinks apart)
  if (gate === undefined) rechargeDash(d, time, max, t.dash.cooldown);
  const ready = gate === undefined ? time >= d.readyAt && d.charges >= 1 : gate && time >= d.readyAt;
  if (!ready || w.mode !== "ground" || w.seated || w.perch) return false; // (no blinking off the treehouse deck)
  let dx = moveX, dz = moveZ, len = Math.hypot(dx, dz);
  const al = Math.hypot(aimX, aimZ);
  // The way she's moving (Ed, 2026-10-11: on the pad and on keyboard and mouse, not the way she's aiming): her
  // steering; standing still, the way she's facing (up or down the screen by her heading, else left or right).
  // toCursor (off; Ed's playtest, 2026-10-06, before): toward the ground under the cursor, the way she faces when it's on her.
  if (t.dash.toCursor && al > 0) { if (al >= t.dash.aimDead) { dx = aimX; dz = aimZ; len = al; } else { dx = w.facing; dz = 0; len = 1; } }
  if (len < 0.1) { const v = w.heading === "up" || w.heading === "down"; dx = v ? 0 : w.facing; dz = !v ? 0 : w.heading === "up" ? -1 : 1; len = 1; }
  const D = t.dash;
  d.dx = dx / len; d.dz = dz / len; d.at = time; d.until = time + blinkGone(t);
  if (gate === undefined) {
    if (d.charges >= max) d.chargeAt = time + D.cooldown;
    d.charges--;
    d.readyAt = d.charges >= 1 ? time + chain : d.chargeAt;
  } else d.readyAt = time + chain;
  d.fromX = w.x; d.fromZ = w.z;
  // The furthest clear spot along the line, in half-metre steps back from the full distance.
  d.toX = w.x; d.toZ = w.z;
  for (let r = D.distance; r > 0; r -= 0.5) {
    const { x, z } = keepIn(bounds, w.x + d.dx * r, w.z + d.dz * r);
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
