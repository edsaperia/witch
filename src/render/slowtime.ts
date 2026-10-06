// Slowed time in a legend's circle (Ed, 2026-10-06): inside a sleeping or restless legend's circle, on the ground, the world
// slows to about a tenth while the witch moves as ever. The rules' time scale (`g.timeScale`, rules/slowTime.ts: easing between
// 1 and legendCircle.slow.scale) drives it; this is its look, eased with it:
//   - the world outside the circle greys and cools (lighting.ts slowGrade, on top of the clearing's darkening);
//   - what moves on its own (wind, water, flicker, smoke, motes, sparks) runs on the world's clock (`uTime`, the time the view
//     is drawn at), while the circle's own motes and its edge's shimmer keep hers (`uRealTime`, g.herTime);
//   - the circle's edge shimmers while slowed (lighting.ts gladeLight), and a 💌 leaving it bursts into pixel motes there.
// Cheap: one uniform; nothing allocated a frame.
import type { Tuning } from "../rules/tuning";

/** The slowest the rules slow the world to (the time scale the look is at its fullest at). */
export const slowest = (t: Tuning): number => Math.max(0, Math.min(0.99, t.legendCircle?.slow.scale ?? 0.1));

/** How slowed the world looks, 0 (as ever) to 1 (at its slowest `low`): eased with the time scale itself. */
export const slowAmount = (scale: number, low = 0.1): number =>
  Number.isFinite(scale) ? Math.max(0, Math.min(1, (1 - scale) / Math.max(1e-3, 1 - low))) : 0;
