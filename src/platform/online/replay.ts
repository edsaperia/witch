import { stepGame, type Controls, type Game } from "../../rules/game";
import { restoreGame, snapshotGame, type NightSnapshot } from "../../rules/nightSnapshot";
import { wireControls } from "./guestInput";

export interface ReplayStart {
  build: string;
  tick: number;
  snapshot: NightSnapshot;
  transient: { acc: number; paused: boolean; pending: Partial<Controls>; witches: { paused?: boolean; pending?: Partial<Controls> }[] };
}
export interface ReplayFrame { tick: number; dt: number; inputs: Controls[] }

/** A network handoff preserves input queues/accumulator; a disk resume deliberately clears them. */
export function replayStart(game: Game, build: string, tick: number): ReplayStart {
  return {
    build, tick, snapshot: snapshotGame(game),
    transient: structuredClone({ acc: game.acc, paused: game.clock.paused, pending: game.pending,
      witches: game.witches.map(w => ({ paused: w.paused, pending: w.pending })) }),
  };
}

export function replayGuest(start: ReplayStart, build: string, reuse?: Game) {
  if (start.build !== build || !Number.isSafeInteger(start.tick) || start.tick < 0) throw new Error("Incompatible online night");
  let game = restoreGame(start.snapshot);
  if (reuse) {
    if (reuse.seed !== game.seed) throw new Error("Online island changed during join");
    const { map, forest } = reuse;
    Object.assign(reuse, game, { map, forest }); game = reuse;
  }
  const t = start.transient;
  if (!t || !Number.isFinite(t.acc) || t.acc < 0 || t.acc > 1 || typeof t.paused !== "boolean" || t.witches.length !== game.witches.length) throw new Error("Invalid online handoff");
  game.acc = t.acc; game.clock.paused = t.paused; game.pending = structuredClone(t.pending);
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
      const inputs = frame.inputs.map(wireControls);
      if (inputs.some(c => c === null)) return false;
      stepGame(game, inputs as Controls[], frame.dt); tick = frame.tick;
      return true;
    },
  };
}

/** Only controls representable by the public wire contract may drive a replicated night. */
export function replayHostStep(game: Game, inputs: readonly Controls[], dt: number, tick: number): ReplayFrame {
  const safe = inputs.map(wireControls);
  if (!Number.isSafeInteger(tick) || tick < 1 || !Number.isFinite(dt) || dt < 0 || dt > 0.25 || safe.length !== game.witches.length || safe.some(c => c === null)) throw new Error("Invalid online frame");
  const frame = { tick, dt, inputs: safe as Controls[] };
  stepGame(game, frame.inputs, dt);
  return frame;
}
