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
  | { kind: "focus"; step: number; tick: number; before?: Game["introFocus"]; after?: Game["introFocus"] }
  | { kind: "checkpoint"; label: string; step: number; before: LocalStart; after: LocalStart };
type FrameEvent = Extract<RecordedEvent, { kind: "frame" }>;
interface FrameRun { first: FrameEvent; count: number; delta: number; serialized: number; sent: number; paused: boolean }
type RetainedEvent = FrameRun | Exclude<RecordedEvent, FrameEvent>;
const copyFocus = (focus: Game["introFocus"]): Game["introFocus"] => focus && ({ x: focus.x, y: focus.y, z: focus.z });
const sameFocus = (a: Game["introFocus"], b: Game["introFocus"]): boolean => a === undefined ? b === undefined : !!b && a.x === b.x && a.y === b.y && a.z === b.z;
const validFocus = (v: Game["introFocus"]): boolean => v === undefined || !!v && [v.x, v.y, v.z].every(Number.isFinite);
const neutral: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const integerWidth = (n: number): number => n < 10 ? 1 : Math.floor(Math.log10(n)) + 1;
/** Compare borrowed controls without allocating entries/copies on every unchanged frame. */
function sameControls(value: Controls, saved: Controls): boolean {
  let count = 0, previous = 0, own = 0;
  for (const key in value) if (Object.hasOwn(value, key)) {
    if (++own > 64 || key.length > 64 || key === "__proto__" || key === "constructor" || key === "prototype") return false;
    if ((value as unknown as Record<string, unknown>)[key] === undefined) continue;
    if ((value as unknown as Record<string, unknown>)[key] !== (saved as unknown as Record<string, unknown>)[key]) return false;
    count++;
  }
  for (const key in saved) if (Object.hasOwn(saved, key)) previous++;
  return count === previous;
}
function expandFrame(run: FrameRun, index: number): FrameEvent {
  const first = run.first, fromStep = first.fromStep + index * run.delta;
  return { ...first, fromStep, toStep: fromStep + run.delta, frame: { ...first.frame, tick: first.frame.tick + index } };
}
export interface InputRecording {
  version: 1; build: string; seed: number; startingSave: SavedNight;
  start: Omit<LocalStart, "snapshot">; events: RecordedEvent[]; target: LocalStart;
  complete: boolean; failure?: string;
}

export class InputRecorder {
  private tick = 0;
  private events: RetainedEvent[] = [];
  private eventCount = 0;
  private journalIndex = 0;
  private journalTimer?: ReturnType<typeof setTimeout>;
  private size: number;
  private complete = true;
  private failure?: string;
  private nested = 0;
  private readonly start: Omit<LocalStart, "snapshot">;
  private readonly startingSave: SavedNight;
  constructor(private game: Game, private build: string, capture: () => SavedNight, private persist?: (kind: string, payload: unknown, context: { build: string; t: number; island: string }) => void, enabled = true) {
    this.startingSave = capture();
    const { snapshot: _snapshot, ...start } = localStart(game, build, 0); this.start = start;
    this.size = bytes(this.startingSave) + bytes(start);
    if (!enabled) { this.complete = false; this.failure = "Input recording disabled by recording=0 for profiling"; this.persist = undefined; return; }
    this.record("recording:start", { version: 1, build, seed: game.seed, startingSave: this.startingSave, start });
    if (this.size > MAX_BYTES) this.fail("Starting save exceeds the input recording limit");
  }
  private record(kind: string, payload: unknown): void {
    try { this.persist?.(kind, payload, { build: this.build, t: this.game.clock.time, island: this.game.tuning.map?.island || "home" }); }
    catch { /* Logging cannot change a simulation step. */ }
  }
  private fail(message: string): void { this.complete = false; this.failure ??= message; this.record("recording:incomplete", { message }); }
  private append(event: RecordedEvent): void {
    if (!this.complete) return;
    this.size += bytes(event);
    if (this.eventCount >= MAX_EVENTS || this.size > MAX_BYTES) { this.fail("Input recording reached its retention limit"); return; }
    this.eventCount++;
    this.events.push(event.kind === "frame" ? { first: event, count: 1, delta: event.toStep - event.fromStep, serialized: bytes(event), sent: 0, paused: !!this.game.clock.paused } : event);
    this.scheduleJournal();
  }
  private scheduleJournal(): void {
    if (!this.persist || this.journalTimer !== undefined) return;
    this.journalTimer = setTimeout(() => { this.journalTimer = undefined; this.flushJournal(128); }, 100);
  }
  /** Encoding/cloning/storage work is outside the simulation task, in bounded batches.
   * Export explicitly drains it so a user-requested download contains every event. */
  private flushJournal(limit = Infinity): void {
    if (this.journalTimer !== undefined) { clearTimeout(this.journalTimer); this.journalTimer = undefined; }
    if (!this.persist) return;
    while (this.journalIndex < this.events.length && limit > 0) {
      const item = this.events[this.journalIndex];
      if ("first" in item) {
        // The replay tape retains every exact frame. The crash journal only needs
        // one diagnostic boundary for a no-step pause, not 120 durable rows/sec.
        if (item.paused && item.delta === 0) {
          if (!item.sent) this.record("recording:paused", { seed: this.game.seed, step: item.first.fromStep, firstTick: item.first.frame.tick });
          item.sent = item.count; limit--;
        }
        while (item.sent < item.count && limit-- > 0) this.record("recording:event", { seed: this.game.seed, event: expandFrame(item, item.sent++) });
        // The last run can grow before the next flush: keep its cursor until sealed.
        if (item.sent < item.count || this.journalIndex === this.events.length - 1) break;
      } else { this.record("recording:event", { seed: this.game.seed, event: item }); limit--; }
      this.journalIndex++;
    }
    const last = this.events[this.journalIndex];
    if (last && (!("first" in last) || last.sent < last.count || this.journalIndex < this.events.length - 1)) this.scheduleJournal();
  }
  /** Record the actual caller's controls, then run the unchanged stepGame implementation with its original arguments. */
  step(controls: Controls | readonly Controls[], dt: number): void {
    if (!this.complete) { stepGame(this.game, controls, dt); return; }
    const last = this.events.at(-1), run = last && "first" in last ? last : undefined;
    const effective = Math.min(MAX_STEP, Math.max(0, dt)), fromStep = simulationStep(this.game), tick = this.tick + 1;
    const focusNow = this.game.introFocus, focusWas = run?.first.focus;
    let same = !!run && run.paused === !!this.game.clock.paused && Number.isFinite(dt) && run.first.frame.dt === effective && run.first.frame.inputs.length === this.game.witches.length && (!Array.isArray(controls) || controls.length === run.first.frame.inputs.length)
      && (focusNow === undefined ? focusWas === undefined : !!focusWas && focusNow.x === focusWas.x && focusNow.y === focusWas.y && focusNow.z === focusWas.z);
    if (same) for (let i = 0; i < this.game.witches.length; i++) {
      const input = Array.isArray(controls) ? controls[i] : i ? neutral : controls as Controls;
      if (!input || !sameControls(input, run!.first.frame.inputs[i])) { same = false; break; }
    }
    if (same && fromStep === run!.first.fromStep + run!.count * run!.delta) {
      this.tick = tick;
      try { stepGame(this.game, controls, dt); }
      catch (error) { this.fail("A recorded simulation frame threw before completion"); throw error; }
      const toStep = simulationStep(this.game);
      if (toStep - fromStep === run!.delta) {
        // Exact expanded JSON byte accounting: only these integer widths change.
        this.size += run!.serialized + integerWidth(tick) + integerWidth(fromStep) + integerWidth(toStep)
          - integerWidth(run!.first.frame.tick) - integerWidth(run!.first.fromStep) - integerWidth(run!.first.toStep);
        if (this.eventCount >= MAX_EVENTS || this.size > MAX_BYTES) this.fail("Input recording reached its retention limit");
        else { run!.count++; this.eventCount++; if (!run!.paused || run!.delta !== 0) this.scheduleJournal(); }
        return;
      }
      // Fractional frames can cross a different number of fixed steps with the same
      // controls/dt. Preserve that boundary; never run the simulation a second time.
      this.append({ ...run!.first, fromStep, toStep, frame: { ...run!.first.frame, tick } });
      return;
    }
    const inputs = (Array.isArray(controls) ? controls : this.game.witches.map((_, i) => i ? { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false } : controls as Controls)).map(localControls);
    this.tick = tick;
    const focus = structuredClone(this.game.introFocus); // The renderer's camera anchor is a local per-frame input, omitted by disk saves.
    if (inputs.some(c => c === null) || !Number.isFinite(dt)) this.fail("An input could not be represented losslessly");
    try { stepGame(this.game, controls, dt); }
    catch (error) { this.fail("A recorded simulation frame threw before completion"); throw error; }
    // stepGame itself clamps dt to MAX_STEP, including bot/fight-speed frames. Keep the effective value used by the same rules.
    this.append({ kind: "frame", fromStep, toStep: simulationStep(this.game), frame: { tick, dt: Math.min(MAX_STEP, Math.max(0, dt)), inputs: inputs as Controls[] }, focus });
  }
  /** A local render input changes three numbers, not the world; retain its exact ordered boundary. */
  setFocus(focus: Game["introFocus"]): void {
    const before = this.game.introFocus;
    if (this.complete && !this.nested && !sameFocus(before, focus)) {
      if (!validFocus(focus)) this.fail("A camera anchor could not be represented losslessly");
      else this.append({ kind: "focus", step: simulationStep(this.game), tick: this.tick, before: copyFocus(before), after: copyFocus(focus) });
    }
    this.game.introFocus = focus;
  }
  /** Checkpoints are declared before page mutations. Nested changes share one strict whole-game boundary. */
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
    this.flushJournal();
    const events = this.events.flatMap<RecordedEvent>(item => "first" in item ? Array.from({ length: item.count }, (_, i) => expandFrame(item, i)) : [item]);
    return structuredClone({ version: 1, build: this.build, seed: this.game.seed, startingSave: this.startingSave, start: this.start,
      events, target: localStart(this.game, this.build, this.tick), complete: this.complete, ...(this.failure ? { failure: this.failure } : {}) });
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
    } else if (event.kind === "focus") {
      if (event.tick !== replay.tick || event.step !== simulationStep(replay.game) || !validFocus(event.before) || !validFocus(event.after) || !sameFocus(replay.game.introFocus, event.before)) throw Error("Input replay diverged before camera anchor");
      replay.game.introFocus = copyFocus(event.after);
    } else if (event.kind === "checkpoint") {
      if (typeof event.label !== "string" || !event.label || simulationStep(replay.game) !== event.step || !equal(localStart(replay.game, build, replay.tick), event.before)) throw Error(`Input replay diverged before checkpoint: ${event.label}`);
      if (event.after.tick !== replay.tick || event.after.build !== build || event.after.snapshot.seed !== recording.seed) throw Error("Invalid checkpoint boundary");
      replay = guest(event.after);
    } else throw Error("Unknown replay event");
  }
  if (!equal(localStart(replay.game, build, replay.tick), recording.target)) throw Error("Input replay diverged at its target moment");
  return replay.game;
}
