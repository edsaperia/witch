// How an attack feels on screen (Ed, 2026-10-06: "Work on making creature attack visuals better"): the view's part of a
// blow, read from the rules' state each frame and writing nothing back. A wind-up crouches the attacker (the anticipation),
// its lunge stretches it (the snappy strike), the blow squashes the one it hits and springs it back past its shape, and a
// knock-back throws it up in a short tumble, over once, landing with a squash. Squash and stretch are drawn in whole art
// pixels (sprites.ts rounds them: one pixel scale on screen). A party, not a fight to the death: nobody is hurt,
// they're bowled over and bounce back up. Timings and sizes are the tuning's attackFx knobs. Allocation-free: callers
// pass a Feel to fill, and the wind-up starts are kept per fight object (a WeakMap, so they go with it).
import type { Creature } from "../rules/creatures";
import type { Tuning } from "../rules/tuning";

export interface Feel {
  /** Width and height multipliers (squash and stretch), about its feet. */ sx: number; sy: number;
  /** Lifted this many metres (a tumble's arc). */ hop: number;
  /** Turned over (a tumble's spin, drawn as a flip). */ flip: boolean;
  /** Winding up, 0..1 (the rig's crouch). */ crouch: number;
  /** Mid-lunge (the rig stretches out as in a charge). */ lunging: boolean;
}
export const newFeel = (): Feel => ({ sx: 1, sy: 1, hop: 0, flip: false, crouch: 0, lunging: false });

export type AttackFx = Tuning["attackFx"];
export const ATTACK_FX_DEFAULT: AttackFx = { windupSquash: 0.12, windupMax: 0.6, lungeStretch: 0.14, squash: 0.24, squashSecs: 0.34, tumbleKnock: 20, tumbleHeight: 0.9, tumbleSecs: 0.5, turnFrom: 0.3, turnTo: 0.7 };

const windups = new WeakMap<object, { until: number; from: number }>();

/** A creature's attack feel at time (seconds), into out. */
export function attackFeel(c: Creature, time: number, T: AttackFx | undefined, out: Feel): Feel {
  const k = T ?? ATTACK_FX_DEFAULT;
  out.sx = 1; out.sy = 1; out.hop = 0; out.flip = false; out.crouch = 0; out.lunging = false;
  // the wind-up: crouching lower and wider as it nears the blow (its start remembered when its windupUntil changes)
  const f = c.fight;
  if (f && f.windupUntil > time) {
    let w = windups.get(f);
    if (!w || w.until !== f.windupUntil) windups.set(f, (w = { until: f.windupUntil, from: time }));
    const len = Math.min(k.windupMax, Math.max(0.05, w.until - w.from)), p = 1 - Math.max(0, w.until - time) / len;
    out.crouch = Math.max(0, Math.min(1, p)); const e = out.crouch * out.crouch;
    out.sy *= 1 - k.windupSquash * e; out.sx *= 1 + k.windupSquash * 0.7 * e;
  }
  // the strike: stretched out along its lunge
  if (f?.lunge && f.lunge.left > 0.05) { out.lunging = true; out.sx *= 1 + k.lungeStretch; out.sy *= 1 - k.lungeStretch * 0.5; }
  // hit: squashed flat, then springing back past its shape and settling (a damped bounce)
  if (c.hurtAt !== undefined && time >= c.hurtAt && time - c.hurtAt < k.squashSecs) {
    const t = (time - c.hurtAt) / k.squashSecs, amp = k.squash * Math.exp(-3 * t) * Math.cos(t * Math.PI * 2.5);
    out.sy *= 1 - amp; out.sx *= 1 + amp * 0.8;
  }
  // knocked back hard: a tumble, up in an arc and over, landing with a squash
  // (its throw's speed at the blow, from what's left of it: the rules ease it off as e^-10t, combat.ts stepKnock)
  const knock = c.hurtAt !== undefined ? Math.hypot(c.kx ?? 0, c.kz ?? 0) * Math.exp(10 * Math.max(0, time - c.hurtAt)) : 0;
  if (c.hurtAt !== undefined && knock > k.tumbleKnock && time - c.hurtAt < k.tumbleSecs) {
    const t = (time - c.hurtAt) / k.tumbleSecs;
    out.hop = Math.sin(t * Math.PI) * k.tumbleHeight * Math.min(1.5, knock / 60);
    out.flip = t > k.turnFrom && t < k.turnTo; // over once, on its back mid-air: one slow beat, never a strobe (the art director, #193)
    if (t > 0.85) { const l = (t - 0.85) / 0.15; out.sy *= 1 - 0.25 * Math.sin(l * Math.PI); out.sx *= 1 + 0.2 * Math.sin(l * Math.PI); }
  }
  return out;
}
