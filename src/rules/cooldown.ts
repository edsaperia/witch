// One shared cooldown for her dodge and her take-off (Ed, 2026-10-15: "One trail, one cooldown. ... Its length shows one
// shared cooldown counter for dodge and take-off (the two contribute different amounts to it)"): a counter in seconds on her
// clock, draining a second a second. A dodge adds dash.cooldown seconds, a take-off cooldown.rise, a landing riseCooldown (so
// she still can't rise straight after landing: Ed, 2026-10-11, #649). The counter has room for dash.charges dodges
// (dash.charges × dash.cooldown seconds, more with Hare's Dash bursts and the Double blink broom): an action goes when the
// counter is at or under that room less its own amount, so two dodges go straight off and the third waits a second, as
// before; an amount bigger than the room (a landing's 3 s) needs the counter empty. The trail she leaves (render/trail.ts)
// is as long as the counter is full. With cooldown.shared off, the dodge's charges and the rise cooldown run apart as before.
import type { Tuning } from "./tuning";

export interface CoolState {
  /** Seconds till the counter is empty (on her clock). */
  left: number;
}

/** A new game starts a dodge's worth in (as the charges did: one blink in hand at the start, the second a cooldown later). */
export const newCool = (left = 0): CoolState => ({ left });

/** Seconds till the next action of `amount` may go (0: now). */
export const coolWait = (c: CoolState, amount: number, room: number): number => Math.max(0, c.left - Math.max(0, room - amount));

/** A step of her clock: the counter drains a second a second. */
export function stepCool(c: CoolState, dt: number): void {
  c.left = Math.max(0, c.left - Math.max(0, dt));
}

/** The counter's room (seconds): `charges` dodges' worth. */
export const coolRoom = (t: Tuning, charges: number): number => Math.max(0, charges) * t.dash.cooldown;

/** Whether an action adding `amount` seconds may go: the counter at or under the room less the amount (an amount over the
 *  room needs it empty). */
export const coolReady = (c: CoolState, amount: number, room: number): boolean => c.left <= Math.max(0, room - amount) + 1e-9;

/** The action taken: its amount added, up to the room (or the amount itself if bigger; never lowered). */
export function coolSpend(c: CoolState, amount: number, room: number): void {
  c.left = Math.max(c.left, Math.min(c.left + amount, Math.max(room, amount)));
}

/** How near the next action of `amount` is: 1 ready, 0 just spent (the aim reticle's recharge arc). */
export function coolCharge(c: CoolState, amount: number, room: number): number {
  const at = Math.max(0, room - amount);
  return c.left <= at + 1e-9 ? 1 : amount > 0 ? Math.max(0, Math.min(1, 1 - (c.left - at) / amount)) : 0;
}

/** The share of the counter in use, 0 empty to 1 full (the trail's length). */
export const coolShare = (c: CoolState, room: number): number => (room > 0 ? Math.min(1, c.left / room) : c.left > 0 ? 1 : 0);
