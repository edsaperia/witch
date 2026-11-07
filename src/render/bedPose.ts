// Her in her bed (the wake-up, rules/wakeUp.ts), as drawn: which of her poses (art/witch.js inBed, bedStretch) and how high, on its
// mattress. Hers (render/view/witch.ts) and a friend's (render/remoteWitch.ts, platform/online/otherWitches.ts) alike.
import type { Game, Witch } from "../rules/game";
import { bedOf } from "../rules/wakeUp";
import { bedSeat } from "../../art/furniture.js";

/** Her pose in her bed (the wake-up, rules/wakeUp.ts), or null, up: "inBed", sitting up in it (asleep, dreaming, her alarm ringing, a
 *  snooze; `asleep`, put to bed before her wake-up starts: View.asleepInBed), and "bedStretch", stretching as she gets up, there still
 *  (art/witch.js). Ed's playtest of v7645, 2026-11-07, "Is this meant to be the witch lying in bed?": they were the decks' seat's sit
 *  (her legs hanging from a seat's height) and the sigil's lift (standing, crouching, a toss), drawn from the floor in the middle of
 *  the bed, so she stood upright in it. */
export const inBedPose = (wake: { open: boolean; beat: string } | undefined, asleep: boolean): "inBed" | "bedStretch" | null =>
  wake && !wake.open && wake.beat !== "up" ? (wake.beat === "stretch" ? "bedStretch" : "inBed") : asleep ? "inBed" : null;
/** How high she's drawn in her bed (m over the floor): sat on its mattress (art/furniture.js bedSeat), in the bed she's in (rules/wakeUp.ts
 *  bedOf); 0 without one. Her bed poses (inBedPose) sit on the ground under her, so they're drawn this much up. */
export function bedLift(g: Game, W: Witch = g.witches[0]): number {
  const bed = bedOf(g, W);
  return bed ? bedSeat(bed.h) : 0; // (the guests' beds are home's, drawn alike: art/furniture.js)
}
/** How much of her own glow and its lift is off her own sprite, before the knob's share (witch.bedGlow; Ed, 2026-11-07, on #1908: "fix
 *  the glow in #1908 first": in bed her white nightie clipped to white under them). 1 in bed, taken at once as she's put there (under
 *  the loading screen or the sleep's veil, as her pose is: nothing seen to change); over the stretch eased to half; then, up beside the
 *  bed, back to 0 over its last half second at HUSH_BACK a second, so nothing pops. `was` the last frame's, `dt` the frame's seconds;
 *  `stretched` the share of the stretch gone (0 to 1). */
export function bedHush(pose: "inBed" | "bedStretch" | null, stretched: number, was: number, dt: number): number {
  if (pose === "inBed") return 1;
  const want = pose === "bedStretch" ? 1 - 0.5 * Math.min(1, Math.max(0, stretched)) : 0;
  return want >= was ? want : Math.max(want, was - HUSH_BACK * dt);
}
/** How fast her glow comes back once she's out of bed (a share a second). */
export const HUSH_BACK = 1;
