// The challenge circle's size by the island's roster (Ed, 2026-11-03: "there are the same number of columns as creature types, and the
// sigils are on top of the columns, one type per column"; "128 animal pack is the ultimate challenge ... Also the area will have to be
// big to fit a huge circle"): one column a kind, `spacing` metres apart along its edge, so its radius is the larger of the tuning's
// `radius` (36 m) and kinds x spacing / 2 pi (about 6 kinds on a 10-area island and 26 on a 50-area one keep 36 m; the late home's
// 64, about 76 m). What scales with it (the dancefloor and the carved sigil fill the circle; here, its clearing's margin and the
// spell's reach) grows by the same share. Kept apart from rules/challenge.ts so the map (rules/map.ts) can size the challenge area's
// claim without importing the rules that import it. No drawing here.
import type { Tuning } from "./tuning";

/** The knobs this reads (the tuning's `challenge`), with their defaults. */
export const CIRCLE_DEFAULT = { radius: 36, margin: 3, castReach: 5, spacing: 7.5 };

/** The circle for an island of `kinds` roster kinds: its radius (m), its clearing's margin past the edge (m), how near its middle
 *  the spell is cast (m), and the share they've grown by over the tuning's (1 at `radius` and below). */
export function challengeCircle(kinds: number, t: Pick<Tuning, "challenge">): { radius: number; margin: number; castReach: number; scale: number } {
  const C = { ...CIRCLE_DEFAULT, ...t.challenge }, spacing = Math.max(0.1, C.spacing ?? CIRCLE_DEFAULT.spacing);
  const radius = Math.max(C.radius, (Math.max(0, kinds) * spacing) / (2 * Math.PI)), scale = C.radius > 0 ? radius / C.radius : 1;
  return { radius, margin: C.margin * scale, castReach: C.castReach * scale, scale };
}
