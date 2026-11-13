// A hydra's heads take turns to spit (Ed, 2026-11-13: "it would be cool if the hydra did attacks with alternating heads"): which
// of its strike frames to show now (art/mesh/index.js meshGait's `strike`: for each head in turn, drawn back, drawn back again
// with the others swayed the other way, struck forward), read from the rules' spells each frame and writing nothing back.
// Through its wind-up the first head is drawn back, the others swaying; as each shot is born (rules/attacks/engine.ts gives a
// body its `head`) that head snaps forward; between shots the next head draws back. Nothing allocated.
import type { SpellState } from "../rules/attacks/engine";

/** How long a head stays struck forward after its shot (s), how fast the watchers sway (changes a second), and how long after a
 *  shot a head with another to come is still shown drawn back. */
export const STRIKE = { snap: 0.16, sway: 5, hold: 1 };

/** The strike frame for creature `id` at `time`, counted from its gait's strike.from, or -1 for none (it walks or stands as ever). */
export function headStrike(S: SpellState | undefined, id: number, time: number, K: { heads: number; each: number }): number {
  if (!S) return -1;
  const sway = Math.floor(time * STRIKE.sway) & 1;
  if (S.tells.has(id)) return sway; // (winding up: its first head drawn back)
  let head = -1, born = -Infinity;
  for (const b of S.bodies) if (b && b.source === id && b.head !== undefined && b.born > born && b.born <= time) { born = b.born; head = b.head; }
  if (head < 0 || time - born > STRIKE.hold) return -1;
  if (time - born < STRIKE.snap) return (head % K.heads) * K.each + (K.each - 1);
  // (another shot of this cast to come: the next head draws back)
  for (const p of S.pending) if (p.source === id && p.patternIndex !== undefined && p.depth === 0) return ((head + 1) % K.heads) * K.each + sway;
  return -1;
}
