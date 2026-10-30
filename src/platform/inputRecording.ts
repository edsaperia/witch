// Local playtest tape. The multiplayer wire contract remains deliberately stricter and unchanged.
import { STEP, stepGame, type Controls, type Game } from "../rules/game";
import { MAX_STEP } from "../rules/clock";
import { replayGuest, replayStart, type ReplayFrame, type ReplayStart } from "./online/replay";
import type { SavedNight } from "../app/nightSave";

const MAX_BYTES = 16 * 1024 * 1024, MAX_EVENTS = 120_000;
const bytes = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).byteLength;
export const simulationStep = (game: Game): number => Math.round(game.herTime / STEP);
const numbers = new Set(["moveX", "moveZ", "zoom", "aimX", "aimZ"]);
const booleans = new Set(["toggleMode", "sigil", "place", "cycle", "cycleBack", "held", "inviteNearest", "talk", "fire", "pausePage", "framing", "happyNearest", "castParty", "autoTalk", "talkHeld", "nextWave", "pauseWaves", "feedNearest", "cycleSpeakers", "spell", "sigilHeld", "hatHold", "hat", "dash", "debug", "toggleAutoTalk"]);

/** Flat local controls only: preserve aim/zoom/framing exactly, without accepting executable callbacks or object graphs. */
export function localControls(value: unknown): Controls | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value);
  if (entries.length > 64) return null;
  const out: Record<string, unknown> = {};
  for (const [key, v] of entries) {
    if (["__proto__", "constructor", "prototype"].includes(key) || key.length > 64) return null;
    if (v === undefined) continue;
    if (numbers.has(key) ? typeof v !== "number" : booleans.has(key) ? typeof v !== "boolean" : key === "framePart" ? v !== null && typeof v !== "string" : true) return null;
    if (v !== null && typeof v !== "boolean" && typeof v !== "number" && typeof v !== "string") return null;
    if (typeof v === "number" && !Number.isFinite(v) || typeof v === "string" && v.length > 256) return null;
    out[key] = v;
  }
  if (typeof out.moveX !== "number" || typeof out.moveZ !== "number" || typeof out.toggleMode !== "boolean" || typeof out.zoom !== "number") return null;
  return out as unknown as Controls;
}
type LocalStart = ReplayStart & { focus?: Game["introFocus"] };
const localStart = (game: Game, build: string, tick: number): LocalStart => ({ ...replayStart(game, build, tick), focus: structuredClone(game.introFocus) });
export type RecordedEvent =
  | { kind: "frame"; fromStep: number; toStep: number; frame: ReplayFrame; focus?: Game["introFocus"] }
  | { kind: "checkpoint"; label: string; step: number; before: LocalStart; after: LocalStart };
export interface InputRecording {
  version: 1; build: string; seed: number; startingSave: SavedNight;
  start: Omit<LocalStart, "snapshot">; events: RecordedEvent[]; target: LocalStart;
  complete: boolean; failure?: string;
}

export class InputRecorder {
  private tick = 0;
  private events: RecordedEvent[] = [];
  private size: number;
  private complete = true;
  private failure?: string;
  private nested = 0;
  private readonly start: Omit<LocalStart, "snapshot">;
  private readonly startingSave: SavedNight;
  constructor(private game: Game, private build: string, capture: () => SavedNight, private persist?: (kind: string, payload: unknown) => void) {
    this.startingSave = capture();
    const { snapshot: _snapshot, ...start } = localStart(game, build, 0); this.start = start;
    this.size = bytes(this.startingSave) + bytes(start);
    this.record("recording:start", { version: 1, build, seed: game.seed, startingSave: this.startingSave, start });
    if (this.size > MAX_BYTES) this.fail("Starting save exceeds the input recording limit");
  }
  private record(kind: string, payload: unknown): void { try { this.persist?.(kind, payload); } catch { /* Logging cannot change a simulation step. */ } }
  private fail(message: string): void { this.complete = false; this.failure ??= message; this.record("recording:incomplete", { message }); }
  private append(event: RecordedEvent): void {
    if (!this.complete) return;
    this.size += bytes(event);
    if (this.events.length >= MAX_EVENTS || this.size > MAX_BYTES) { this.fail("Input recording reached its retention limit"); return; }
    this.events.push(event);
    this.record("recording:event", { seed: this.game.seed, event });
  }
  /** Record the actual caller's controls, then run the unchanged stepGame implementation with its original arguments. */
  step(controls: Controls | readonly Controls[], dt: number): void {
    const inputs = (Array.isArray(controls) ? controls : this.game.witches.map((_, i) => i ? { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false } : controls as Controls)).map(localControls);
    const fromStep = simulationStep(this.game), tick = ++this.tick;
    const focus = structuredClone(this.game.introFocus); // The renderer's camera anchor is a local per-frame input, omitted by disk saves.
    if (inputs.some(c => c === null) || !Number.isFinite(dt)) this.fail("An input could not be represented losslessly");
    try { stepGame(this.game, controls, dt); }
    catch (error) { this.fail("A recorded simulation frame threw before completion"); throw error; }
    // stepGame itself clamps dt to MAX_STEP, including bot/fight-speed frames. Keep the effective value used by the same rules.
    this.append({ kind: "frame", fromStep, toStep: simulationStep(this.game), frame: { tick, dt: Math.min(MAX_STEP, Math.max(0, dt)), inputs: inputs as Controls[] }, focus });
  }
  /** Checkpoints are declared before a page mutation, never invented after a failed comparison. Nested changes share one boundary. */
  mutate<T>(label: string, action: () => T): T {
    if (this.nested || !this.complete) return action();
    let before: LocalStart;
    try { before = localStart(this.game, this.build, this.tick); } catch { this.fail("A checkpoint could not be captured"); return action(); }
    const step = simulationStep(this.game);
    this.nested++;
    try { return action(); }
    finally {
      this.nested--;
      if (before.tick !== this.tick) this.fail("A page checkpoint contained simulation frames; split its boundaries");
      else try { this.append({ kind: "checkpoint", label, step, before, after: localStart(this.game, this.build, this.tick) }); }
      catch { this.fail("A checkpoint could not be captured"); }
    }
  }
  export(): InputRecording {
    return structuredClone({ version: 1, build: this.build, seed: this.game.seed, startingSave: this.startingSave, start: this.start,
      events: this.events, target: localStart(this.game, this.build, this.tick), complete: this.complete, ...(this.failure ? { failure: this.failure } : {}) });
  }
}

const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
/** Same replayGuest/stepGame path as multiplayer, with an explicit local validator. A mismatch fails BEFORE crossing a checkpoint. */
export function replayRecording(recording: InputRecording, build: string): Game {
  if (!recording || recording.version !== 1 || recording.build !== build || recording.seed !== recording.startingSave?.game.seed || !recording.complete || !Array.isArray(recording.events) || recording.events.length > MAX_EVENTS || bytes(recording) > MAX_BYTES * 2) throw Error("Invalid or incomplete input recording");
  const guest = (start: LocalStart) => {
    if (start.focus !== undefined && (!start.focus || ![start.focus.x, start.focus.y, start.focus.z].every(Number.isFinite))) throw Error("Invalid recorded camera anchor");
    const r = replayGuest(start, build, undefined, localControls); r.game.introFocus = structuredClone(start.focus); return r;
  };
  let replay = guest({ ...recording.start, snapshot: recording.startingSave.game });
  for (const event of recording.events) {
    if (event.kind === "frame") {
      if (event.focus !== undefined && (!event.focus || ![event.focus.x, event.focus.y, event.focus.z].every(Number.isFinite))) throw Error("Invalid recorded camera anchor");
      replay.game.introFocus = structuredClone(event.focus);
      if (simulationStep(replay.game) !== event.fromStep || !replay.apply(event.frame) || simulationStep(replay.game) !== event.toStep) throw Error("Input replay simulation-step mismatch");
    } else if (event.kind === "checkpoint") {
      if (typeof event.label !== "string" || !event.label || simulationStep(replay.game) !== event.step || !equal(localStart(replay.game, build, replay.tick), event.before)) throw Error(`Input replay diverged before checkpoint: ${event.label}`);
      if (event.after.tick !== replay.tick || event.after.build !== build || event.after.snapshot.seed !== recording.seed) throw Error("Invalid checkpoint boundary");
      replay = guest(event.after);
    } else throw Error("Unknown replay event");
  }
  if (!equal(localStart(replay.game, build, replay.tick), recording.target)) throw Error("Input replay diverged at its target moment");
  return replay.game;
}
