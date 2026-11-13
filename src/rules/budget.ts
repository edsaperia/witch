// The scenery budget (Ed, 2026-10-03): gameplay is always drawn; scenery (trees, bushes, wall
// objects, set pieces, string lights) is drawn out to a radius round the witch, trimmed from the
// far edge inward and faded, never from list order. The radius follows the frame rate: it
// shrinks slowly while frames stay slow, grows back while there is headroom, and holds in
// between (the hysteresis), so it settles instead of swinging. Each move starts from rest (RADIUS_EASE).
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

/** Seconds over which the radius gets up to speed, once frames have been slow (or quick) for `sustain` (Ed, 2026-11-13, choosing
 *  from the follow-ups #1963 left: "scenery should fade rather than pop"). It set off at full speed, 40 m a second in and 15 out
 *  over a 40 m fade: a slow moment of three seconds (30 frames a second) took the edge in 65 m, everything there gone in a
 *  second, and the next six brought it back. From rest, the same moment moves it 13 m, and a machine that stays slow still gets
 *  the whole speed, 4 s on
 *  (Ed, 2026-10-26: "scenery is not gameplay critical so it's better to preserve framerate and draw fewer things"). */
export const RADIUS_EASE = 4;

/** One frame of `dt` real seconds. Frames over a quarter second (a hidden tab, a hitch, a very
 *  slow software renderer) say nothing about the scenery's cost and are skipped. `eased` (false under ?edgefade=old, as before):
 *  the radius starts each move from rest (RADIUS_EASE). */
export function stepBudget(b: SceneryBudget, dt: number, t: Tuning, eased = true): SceneryBudget {
  const s = t.scenery;
  if (!s.adaptive || !(dt > 0) || dt > 0.25) return b;
  const fps = b.fps + (1 / dt - b.fps) * Math.min(1, dt * 4); // about a quarter second's smoothing
  const slowFor = fps < s.fps - s.hysteresis ? b.slowFor + dt : 0;
  const fastFor = fps >= s.fps ? b.fastFor + dt : 0;
  const speed = (held: number) => (eased ? Math.min(1, (held - s.sustain) / RADIUS_EASE) : 1);
  let radius = b.radius;
  if (slowFor > s.sustain) radius -= s.shrink * speed(slowFor) * dt;
  else if (fastFor > s.sustain) radius += s.grow * speed(fastFor) * dt;
  radius = Math.min(t.haze.far, Math.max(Math.min(s.minRadius, t.haze.far), radius));
  return { radius, fps, slowFor, fastFor };
}
