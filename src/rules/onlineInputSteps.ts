import type { Controls, Game } from "./game";
import type { GuestEffect, GuestLetterCast } from "./guestEffects";

export interface GuestFrameTrace { steps: { sequence: number; controls: Controls; motion?: boolean; catchUp?: boolean }[]; casts?: GuestLetterCast[]; effects?: GuestEffect[] }
const traces = new WeakMap<Game, GuestFrameTrace>();
export const guestFrameTrace = (game: Game) => traces.get(game);

/** Frame-scoped transport adapter. Solo has no sampler; the world still advances exactly once. */
const samplers = new WeakMap<Game, (controls: Controls) => Controls>();
const catchUps = new WeakMap<Game, (controls: Controls) => Controls[]>();
const waiting = new WeakSet<Game>();
/** A missing transport quantum holds the guest actor, including its momentum. */
export const holdGuestMotion = (game: Game) => { waiting.add(game); };
export const guestMotionReady = (game: Game) => !waiting.has(game);
/** catchUp, when given, supplies extra older guest quanta for a fixed step, applied before its own (a drained backlog). */
export function withGuestInputSteps<T>(game: Game, sample: (controls: Controls) => Controls, advance: () => T, trace?: GuestFrameTrace, catchUp?: (controls: Controls) => Controls[]): T {
  if (samplers.has(game)) throw Error("Nested guest input sampler");
  samplers.set(game, sample);
  if (catchUp) catchUps.set(game, catchUp);
  if (trace) traces.set(game, trace);
  try { return advance(); } finally { samplers.delete(game); catchUps.delete(game); traces.delete(game); waiting.delete(game); }
}
/** Called once per fixed step before guestInputStep: each returned quantum is a whole guest step of her own clock and locomotion. */
export const guestCatchUpSteps = (game: Game, controls: Controls): Controls[] => catchUps.get(game)?.(controls) ?? [];
export const guestInputStep = (game: Game, controls: Controls): Controls => {
  waiting.delete(game);
  return samplers.get(game)?.(controls) ?? controls;
};
