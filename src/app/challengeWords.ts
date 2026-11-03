// What the challenge area says under the clock (rules/challenge.ts ChallengeEvent; app/hud.ts found), in plain player words.
import type { ChallengeEvent } from "../rules/challenge";

export function challengeWords(e: ChallengeEvent): string {
  if (e.kind === "ready") return "challenge: every animal won over · cast the music spell on the circle";
  if (e.kind === "cleared") return e.reward === "flask" ? "challenge cleared · you have this island's whole set: a flask instead" : "challenge cleared · its find is yours";
  return "the challenge circle has gone dark · the night is over";
}
