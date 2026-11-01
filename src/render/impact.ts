// A 💌 landing on a creature, felt (Ed, 2026-10-29, from his playtest: "invitation impacts feel unsatisfying"): the view's part
// only, timed by the night. The creature flashes white an instant and squashes a little, springing back (no
// flash and a gentler squash with reduce-flashing on: render/comfort.ts); the slot it fills pops in (render/invites.ts); and the
// 💌 that fills its ring holds the picture a few frames (a hitstop: main.ts keeps the last frame drawn, the rules run on). The
// thunk is the sound's (platform/audio/chimes.ts thunk). Knobs: the tuning's invites.impact.
import type { Tuning } from "../rules/tuning";
import { comfort } from "./comfort";

export type ImpactTuning = NonNullable<Tuning["invites"]["impact"]>;
export const IMPACT_DEFAULT: ImpactTuning = { flash: 0.07, squash: 0.08, gentle: 0.04, squashSecs: 0.22, pop: 0.45, popSecs: 0.3, hitstop: 0.07 };

type NightClock = { time: number };
/** When each creature last took a 💌 (game seconds), and the hitstop: asked for (seconds, armed once a frame has shown the
 *  blow), and held until (ms, performance.now). */
const impacts = new WeakMap<NightClock, Map<number, number>>();
let pending = 0, waits = 0, holdUntil = 0;

/** A 💌 landed on creature `id` just now. */
export function letterLanded(clock: NightClock, id: number): void {
  let landed = impacts.get(clock);
  if (!landed) { landed = new Map(); impacts.set(clock, landed); }
  landed.set(id, clock.time);
  if (landed.size > 256) for (const [k, t] of landed) if (clock.time - t > 2) landed.delete(k);
}

/** Its ring filled by that 💌: hold the picture `secs`, from the frame after next (so the flash it shows is the one held). */
export function ringFilled(secs: number): void {
  if (secs <= 0) return;
  pending = secs; waits = 1;
}

/** Whether the frame loop should keep the last picture now (ms, performance.now). */
export const holding = (ms: number): boolean => ms < holdUntil;

/** After a frame is drawn (ms): a hitstop asked for starts once the blow has been drawn. */
export function drew(ms: number): void {
  if (pending <= 0) return;
  if (waits > 0) { waits--; return; }
  holdUntil = ms + pending * 1000; pending = 0;
}

/** Creature `id`'s 💌 impact now: its white flash (0..1, added to its glow) and its squash (multipliers about its feet). */
export function impactOf(clock: NightClock, id: number, T: ImpactTuning | undefined, out: { flash: number; sx: number; sy: number }): typeof out {
  out.flash = 0; out.sx = 1; out.sy = 1;
  const at = impacts.get(clock)?.get(id);
  if (at === undefined) return out;
  const K = T ?? IMPACT_DEFAULT, d = clock.time - at;
  if (d < 0 || d > Math.max(K.flash, K.squashSecs)) return out;
  if (!comfort.reduceFlashing && d < K.flash) out.flash = 1 - d / K.flash;
  const amp = (comfort.reduceFlashing ? K.gentle : K.squash), t = d / K.squashSecs;
  if (t < 1) { const s = amp * Math.exp(-3 * t) * Math.cos(t * Math.PI * 2); out.sy = 1 - s; out.sx = 1 + s * 0.7; } // (down, springing back past its shape, settling)
  return out;
}

/** A ring slot's scale as it pops in, `d` seconds after it joined: small, overshooting by `pop`, settling at 1. */
export function popScale(d: number, T: ImpactTuning | undefined): number {
  const K = T ?? IMPACT_DEFAULT;
  if (d < 0 || d >= K.popSecs) return 1;
  const t = d / K.popSecs;
  return t < 0.3 ? 0.4 + (0.6 + K.pop) * (t / 0.3) : 1 + K.pop * Math.exp(-5 * (t - 0.3)) * Math.cos((t - 0.3) * Math.PI * 2.2);
}
