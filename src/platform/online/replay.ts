import { stepGame, type Controls, type Game } from "../../rules/game";
import { restoreGame, snapshotGame, type NightSnapshot } from "../../rules/nightSnapshot";
import { wireControls } from "./guestInput";
import { withGuestInputSteps } from "../../rules/onlineInputSteps";
import { restoreGuestEffects, guestEffectsEnabled, pendingGuestEffects, queueGuestEffects, startGuestLetters, type GuestEffect, type GuestLetterCast } from "../../rules/guestEffects";

export interface ReplayStart {
  build: string;
  tick: number;
  snapshot: NightSnapshot;
  transient: { acc: number; paused: boolean; pending: Partial<Controls>; witches: { paused?: boolean; pending?: Partial<Controls> }[]; guestClaims?: boolean; guestEffects?: GuestEffect[] };
}
export interface ReplayFrame { tick: number; dt: number; inputs: Controls[]; guestSequence?: number; guestSteps?: { sequence: number; controls: Controls }[]; guestCasts?: GuestLetterCast[]; guestEffects?: GuestEffect[] }

/** A network handoff preserves input queues/accumulator; a disk resume deliberately clears them. */
export function replayStart(game: Game, build: string, tick: number): ReplayStart {
  return {
    build, tick, snapshot: snapshotGame(game),
    transient: structuredClone({ acc: game.acc, paused: game.clock.paused, pending: game.pending,
      ...(guestEffectsEnabled(game) ? { guestClaims: true, guestEffects: pendingGuestEffects(game) } : {}),
      witches: game.witches.map(w => ({ paused: w.paused, pending: w.pending })) }),
  };
}

export function replayGuest(start: ReplayStart, build: string, reuse?: Game, validateControls: (input: unknown) => Controls | null = wireControls) {
  if (start.build !== build || !Number.isSafeInteger(start.tick) || start.tick < 0) throw new Error("Incompatible online night");
  let game = restoreGame(start.snapshot);
  if (reuse) {
    if (reuse.seed !== game.seed) throw new Error("Online island changed during join");
    const { map, forest } = reuse;
    Object.assign(reuse, game, { map, forest }); game = reuse;
  }
  const t = start.transient;
  // stepGame consumes a fixed step within 1e-9 of its boundary, leaving a tiny negative remainder.
  // Preserve that exact remainder; rejecting it intermittently rejects a legitimate host snapshot.
  if (!t || !Number.isFinite(t.acc) || t.acc < -1e-9 || t.acc > 1 || typeof t.paused !== "boolean" || t.witches.length !== game.witches.length) throw new Error("Invalid online handoff");
  game.acc = t.acc; game.clock.paused = t.paused; game.pending = structuredClone(t.pending);
  if (t.guestClaims) restoreGuestEffects(game, t.guestEffects ?? []);
  game.witches.forEach((w, i) => {
    if (t.witches[i].paused === undefined) delete w.paused; else w.paused = t.witches[i].paused;
    if (t.witches[i].pending === undefined) delete w.pending; else w.pending = structuredClone(t.witches[i].pending);
  });
  let tick = start.tick;
  return {
    game,
    get tick() { return tick; },
    apply(frame: ReplayFrame): boolean {
      if (frame.tick !== tick + 1 || !Number.isFinite(frame.dt) || frame.dt < 0 || frame.dt > 0.25 || !Array.isArray(frame.inputs) || frame.inputs.length !== game.witches.length) return false;
      const inputs = frame.inputs.map(validateControls);
      if (inputs.some(c => c === null)) return false;
      if (frame.guestSequence !== undefined && (!Number.isSafeInteger(frame.guestSequence) || frame.guestSequence < -1)) return false;
      if ((frame.guestCasts?.length ?? 0) > 16 || (frame.guestEffects?.length ?? 0) > 64) return false;
      for (const cast of frame.guestCasts ?? []) {
        if (![cast.time, cast.aimX, cast.aimZ].every(Number.isFinite)) return false;
        startGuestLetters(game, cast);
      }
      queueGuestEffects(game, frame.guestEffects ?? []);
      if (frame.guestSteps) {
        if (frame.guestSteps.length > 16 || frame.guestSteps.some(step => !Number.isSafeInteger(step.sequence) || step.sequence < -1 || !validateControls(step.controls))) return false;
        let index = 0;
        withGuestInputSteps(game, () => {
          const step = frame.guestSteps![index++]; if (!step) throw Error("Guest physics steps lost their sequence");
          return validateControls(step.controls)!;
        }, () => stepGame(game, inputs as Controls[], frame.dt));
        if (index !== frame.guestSteps.length || index > 0 && frame.guestSequence !== frame.guestSteps[index - 1].sequence) return false;
      } else stepGame(game, inputs as Controls[], frame.dt);
      tick = frame.tick;
      return true;
    },
  };
}

/** Only controls representable by the public wire contract may drive a replicated night. */
export function replayHostStep(game: Game, inputs: readonly Controls[], dt: number, tick: number, advance: (game: Game, inputs: readonly Controls[], dt: number) => void = stepGame): ReplayFrame {
  const safe = inputs.map(wireControls);
  if (!Number.isSafeInteger(tick) || tick < 1 || !Number.isFinite(dt) || dt < 0 || dt > 0.25 || safe.length !== game.witches.length || safe.some(c => c === null)) throw new Error("Invalid online frame");
  const frame = { tick, dt, inputs: safe as Controls[] };
  advance(game, frame.inputs, dt);
  return frame;
}
