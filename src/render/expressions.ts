// A creature's expression (Ed, 2026-10-05: "the eyebrows should be with the creature generator"),
// drawn by the creature generator as part of its face (art/genome/expressions.js): angry when a wave
// has enraged it, happy when it's a party animal or its area is friendly, dazed while stunned.
// #89's state machine has the same hook (render/looks.ts expression(c, time)); whichever lands
// second keeps one of them and draws the face this way, without the marks over the head.
import type { Creature } from "../rules/creatures";

export type Expression = "neutral" | "angry" | "happy" | "dazed";

export function expressionOf(c: Creature, time: number): Expression {
  if (c.stunUntil !== undefined && time < c.stunUntil) return "dazed";
  if (c.enraged) return "angry";
  if (c.leashed || c.friendly || c.guard) return "happy";
  return "neutral";
}
