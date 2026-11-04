// The challenge circle's statues' look (rules/challengeStatues.ts; Ed, 2026-11-04: "grey statues, all facing the centre of the
// circle"; "The wild creatures should somehow look like they're not invitable"): stone ones drawn from their wild art, still, in a
// batch of their own tinted toward the stone colour (challenge.statues.grey, `tint` of the way: render/sprites.ts uTint, its shading
// kept), no eyeshine, blink, idle quirk or rig; as they wake "all the animals glow red" (the wild watch's red over them, render/aggro.ts,
// rising over the wake-up's bars to challenge.statues.red, easing out as they wake); and their sigils on the columns grey while
// stone, "the sigils start glowing" as they wake, from grey to their wild colours on the beat (render/challenge.ts).
import * as THREE from "three";
import type { Creature } from "../rules/creatures";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import { challengeOf } from "../rules/challenge";
import { wakeK } from "../rules/challengeStatues";
import { beatAt } from "../rules/beat";

/** The stone batches' tint (shared, set from the tuning each frame: setStatueTint): the stone colour and how far toward it. */
export const STATUE_TINT = { value: new THREE.Vector4(0.6, 0.6, 0.63, 0.9) };
export function setStatueTint(t: Tuning): void {
  const S = challengeOf(t).statues, c = S.grey;
  STATUE_TINT.value.set(c[0] ?? 0.6, c[1] ?? 0.6, c[2] ?? 0.63, Math.max(0, Math.min(1, S.tint)));
}

/** How a creature's drawn as a statue: stone (the stone batch: still and grey) or walking back to its post (itself), and its red as
 *  they wake (0 to challenge.statues.red); null for one that isn't a statue. */
export function statueLook(g: Pick<Game, "challenge" | "beat" | "clock" | "tuning">, c: Pick<Creature, "statue">): { stone: boolean; red: number } | null {
  if (!c.statue) return null;
  return { stone: c.statue === "stone", red: (wakeK(g) ?? 0) * Math.max(0, challengeOf(g.tuning).statues.red) };
}

/** A column's sigil's colour (render/challenge.ts): `wild` (its rank's wild colour) once they're awake, or with no statues; grey
 *  (the stone colour, dimmed) while they're stone; waking, from grey toward `wild` as the wake-up goes, brighter on each beat. */
export function statueSigilColour(g: Pick<Game, "challenge" | "beat" | "clock" | "tuning">, wild: readonly [number, number, number]): [number, number, number] {
  const st = g.challenge?.statues;
  if (!st || st.phase === "awake") return [wild[0], wild[1], wild[2]];
  const S = challengeOf(g.tuning).statues, grey = [S.grey[0] * 0.8, S.grey[1] * 0.8, S.grey[2] * 0.8], k = wakeK(g) ?? 0;
  if (k <= 0) return [grey[0], grey[1], grey[2]];
  const b = beatAt(g.beat, g.clock.time), pulse = Math.pow(1 - (b - Math.floor(b)), 3), m = Math.min(1, k * (0.75 + 0.25 * pulse) + 0.15 * pulse);
  return [grey[0] + (wild[0] - grey[0]) * m, grey[1] + (wild[1] - grey[1]) * m, grey[2] + (wild[2] - grey[2]) * m];
}
