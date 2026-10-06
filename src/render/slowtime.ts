// Slowed time in a legend's circle (Ed, 2026-10-06): inside a sleeping or restless legend's circle, on the ground, the world
// outside slows to about a tenth while the witch moves as ever. The rules' time scale (`g.timeScale`, the prototype builder's:
// easing between 1 and about 0.1) drives it; this is its look, eased with it:
//   - the world outside the circle greys and cools (lighting.ts slowGrade, on top of the clearing's darkening);
//   - what moves on its own out there (wind, water, flicker, smoke, motes, sparks) slows: they run on a world clock that
//     advances at the time scale (`uTime`), while the circle's own motes and its edge's shimmer keep real time (`uRealTime`);
//   - the circle's edge shimmers while slowed (lighting.ts gladeLight).
// Cheap: one uniform, one clock; nothing allocated a frame.
import type { Game } from "../rules/game";

/** The slowest the rules slow the world to (the time scale the look is at its fullest at). */
export const SLOWEST = 0.1;

/** The rules' time scale now: 1 as ever (also before the rules have one). */
export const timeScaleOf = (g: Game): number => {
  const s = (g as { timeScale?: number }).timeScale;
  return typeof s === "number" && Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 1;
};

/** How slowed the world looks, 0 (as ever) to 1 (at its slowest): eased with the time scale itself. */
export const slowAmount = (scale: number): number => Math.max(0, Math.min(1, (1 - scale) / (1 - SLOWEST)));

/** A clock that runs at the world's pace: real seconds times the time scale. */
export class WorldClock {
  t = 0;
  private last = NaN;
  /** Advance to real time `time` at `scale`; returns the world's time. */
  step(time: number, scale: number): number {
    const dt = Number.isNaN(this.last) ? 0 : Math.max(0, Math.min(0.25, time - this.last));
    this.last = time;
    this.t += dt * scale;
    return this.t;
  }
}
