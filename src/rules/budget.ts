// The scenery budget (Ed, 2026-10-03): gameplay is always drawn; scenery (trees, bushes, wall
// objects, set pieces, string lights) is drawn out to a radius round the witch, trimmed from the
// far edge inward and faded, never from list order. The radius follows the frame rate: it
// shrinks slowly while frames stay slow, grows back while there is headroom, and holds in
// between (the hysteresis), so it settles instead of swinging.
import type { Tuning } from "./tuning";

export interface SceneryBudget {
  /** Metres round the witch that scenery is drawn to. */
  radius: number;
  /** The frame rate, smoothed. */
  fps: number;
  /** How long frames have been slow, and how long there has been headroom (seconds). */
  slowFor: number;
  fastFor: number;
}

/** Start generous: the whole view, out to the haze's far edge. */
export const newBudget = (t: Tuning): SceneryBudget => ({ radius: t.haze.far, fps: t.scenery.fps, slowFor: 0, fastFor: 0 });

/** One frame of `dt` real seconds. Frames over a quarter second (a hidden tab, a hitch, a very
 *  slow software renderer) say nothing about the scenery's cost and are skipped. */
export function stepBudget(b: SceneryBudget, dt: number, t: Tuning): SceneryBudget {
  const s = t.scenery;
  if (!s.adaptive || !(dt > 0) || dt > 0.25) return b;
  const fps = b.fps + (1 / dt - b.fps) * Math.min(1, dt * 4); // about a quarter second's smoothing
  const slowFor = fps < s.fps - s.hysteresis ? b.slowFor + dt : 0;
  const fastFor = fps >= s.fps ? b.fastFor + dt : 0;
  let radius = b.radius;
  if (slowFor > s.sustain) radius -= s.shrink * dt;
  else if (fastFor > s.sustain) radius += s.grow * dt;
  radius = Math.min(t.haze.far, Math.max(Math.min(s.minRadius, t.haze.far), radius));
  return { radius, fps, slowFor, fastFor };
}
