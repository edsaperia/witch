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
