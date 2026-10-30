// Local playtest tape. The multiplayer wire contract remains deliberately stricter and unchanged.
import { STEP, stepGame, type Controls, type Game } from "../rules/game";
import { MAX_STEP } from "../rules/clock";
import { replayGuest, replayStart, type ReplayFrame, type ReplayStart } from "./online/replay";
import type { SavedNight } from "../app/nightSave";

const MAX_BYTES = 16 * 1024 * 1024, MAX_EVENTS = 120_000;
const bytes = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).byteLength;
export const simulationStep = (game: Game): number => Math.round(game.herTime / STEP);

/** Flat local controls only: preserve aim/zoom/framing exactly, without accepting executable callbacks or object graphs. */
export function localControls(value: unknown): Controls | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value);
  if (entries.length > 64) return null;
  const out: Record<string, unknown> = {};
  for (const [key, v] of entries) {
    if (["__proto__", "constructor", "prototype"].includes(key) || key.length > 64) return null;
    if (v === undefined) continue;
    if (v !== null && typeof v !== "boolean" && typeof v !== "number" && typeof v !== "string") return null;
    if (typeof v === "number" && !Number.isFinite(v) || typeof v === "string" && v.length > 256) return null;
    out[key] = v;
  }
  if (typeof out.moveX !== "number" || typeof out.moveZ !== "number" || typeof out.toggleMode !== "boolean" || typeof out.zoom !== "number") return null;
  return out as unknown as Controls;
}
export type RecordedEvent =
  | { kind: "frame"; fromStep: number; toStep: number; frame: ReplayFrame }
  | { kind: "checkpoint"; label: string; step: number; before: ReplayStart; after: ReplayStart };
export interface InputRecording {
  version: 1; build: string; seed: number; startingSave: SavedNight;
  start: Omit<ReplayStart, "snapshot">; events: RecordedEvent[]; target: ReplayStart;
  complete: boolean; failure?: string;
}

export class InputRecorder {
  private tick = 0;
  private events: RecordedEvent[] = [];
  private size: number;
  private complete = true;
  private failure?: string;
  private nested = 0;
  private readonly start: Omit<ReplayStart, "snapshot">;
  private readonly startingSave: SavedNight;
  constructor(private game: Game, private build: string, capture: () => SavedNight) {
    this.startingSave = capture();
    const { snapshot: _snapshot, ...start } = replayStart(game, build, 0); this.start = start;
    this.size = bytes(this.startingSave) + bytes(start);
    if (this.size > MAX_BYTES) this.fail("Starting save exceeds the input recording limit");
  }
  private fail(message: string): void { this.complete = false; this.failure ??= message; }
  private append(event: RecordedEvent): void {
    if (!this.complete) return;
    this.size += bytes(event);
    if (this.events.length >= MAX_EVENTS || this.size > MAX_BYTES) { this.fail("Input recording reached its retention limit"); return; }
    this.events.push(event);
  }
  /** Record the actual caller's controls, then run the unchanged stepGame implementation with its original arguments. */
  step(controls: Controls | readonly Controls[], dt: number): void {
    const inputs = (Array.isArray(controls) ? controls : this.game.witches.map((_, i) => i ? { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false } : controls as Controls)).map(localControls);
    const fromStep = simulationStep(this.game), tick = ++this.tick;
    if (inputs.some(c => c === null) || !Number.isFinite(dt)) this.fail("An input could not be represented losslessly");
    try { stepGame(this.game, controls, dt); }
    catch (error) { this.fail("A recorded simulation frame threw before completion"); throw error; }
    // stepGame itself clamps dt to MAX_STEP, including bot/fight-speed frames. Keep the effective value used by the same rules.
    this.append({ kind: "frame", fromStep, toStep: simulationStep(this.game), frame: { tick, dt: Math.min(MAX_STEP, Math.max(0, dt)), inputs: inputs as Controls[] } });
  }
  /** Checkpoints are declared before a page mutation, never invented after a failed comparison. Nested changes share one boundary. */
  mutate<T>(label: string, action: () => T): T {
    if (this.nested || !this.complete) return action();
    const before = replayStart(this.game, this.build, this.tick), step = simulationStep(this.game);
    this.nested++;
    try { return action(); }
    finally {
      this.nested--;
      if (before.tick !== this.tick) this.fail("A page checkpoint contained simulation frames; split its boundaries");
      else this.append({ kind: "checkpoint", label, step, before, after: replayStart(this.game, this.build, this.tick) });
    }
  }
  export(): InputRecording {
    return structuredClone({ version: 1, build: this.build, seed: this.game.seed, startingSave: this.startingSave, start: this.start,
      events: this.events, target: replayStart(this.game, this.build, this.tick), complete: this.complete, ...(this.failure ? { failure: this.failure } : {}) });
  }
}

const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
/** Same replayGuest/stepGame path as multiplayer, with an explicit local validator. A mismatch fails BEFORE crossing a checkpoint. */
export function replayRecording(recording: InputRecording, build: string): Game {
  if (!recording || recording.version !== 1 || recording.build !== build || recording.seed !== recording.startingSave?.game.seed || !recording.complete || !Array.isArray(recording.events) || recording.events.length > MAX_EVENTS || bytes(recording) > MAX_BYTES * 2) throw Error("Invalid or incomplete input recording");
  let replay = replayGuest({ ...recording.start, snapshot: recording.startingSave.game }, build, undefined, localControls);
  for (const event of recording.events) {
    if (event.kind === "frame") {
      if (simulationStep(replay.game) !== event.fromStep || !replay.apply(event.frame) || simulationStep(replay.game) !== event.toStep) throw Error("Input replay simulation-step mismatch");
    } else if (event.kind === "checkpoint") {
      if (typeof event.label !== "string" || !event.label || simulationStep(replay.game) !== event.step || !equal(replayStart(replay.game, build, replay.tick), event.before)) throw Error(`Input replay diverged before checkpoint: ${event.label}`);
      if (event.after.tick !== replay.tick || event.after.build !== build || event.after.snapshot.seed !== recording.seed) throw Error("Invalid checkpoint boundary");
      replay = replayGuest(event.after, build, undefined, localControls);
    } else throw Error("Unknown replay event");
  }
  if (!equal(replayStart(replay.game, build, replay.tick), recording.target)) throw Error("Input replay diverged at its target moment");
  return replay.game;
}
