// Page-owned mutations are explicit replay boundaries. No rules module imports this hook.
import { InputRecorder } from "../platform/inputRecording";
import type { Controls, Game } from "../rules/game";
import type { SavedNight } from "./nightSave";
import { stepGame } from "../rules/game";
import { logCaughtError } from "../platform/caughtError";
import { journalEntry } from "../platform/playtestJournal";
import { RECORD_INPUTS } from "../platform/diagnosticMode";
const recorders = new WeakMap<Game, InputRecorder>();
const unavailable = new WeakSet<Game>();
export function recordingFor(game: Game, build: string, capture: (game: Game) => SavedNight): InputRecorder {
  let r = recorders.get(game); if (!r) { r = new InputRecorder(game, build, () => capture(game), journalEntry, RECORD_INPUTS); recorders.set(game, r); } return r;
}
export function pageMutation<T>(game: Game, label: string, action: () => T): T {
  const r = recorders.get(game); return r ? r.mutate(label, action) : action();
}
/** The renderer changes only this local input: never snapshot the world to record three numbers. */
export function pageFocus(game: Game, focus: Game["introFocus"]): void {
  const r = recorders.get(game); if (r) r.setFocus(focus); else game.introFocus = focus;
}
export function recordedStep(game: Game, controls: Controls | readonly Controls[], dt: number, build: string, capture: (game: Game) => SavedNight): void {
  if (!RECORD_INPUTS || unavailable.has(game)) { stepGame(game, controls, dt); return; }
  let recorder: InputRecorder;
  try { recorder = recordingFor(game, build, capture); }
  catch (e) { unavailable.add(game); logCaughtError(e, "input recording unavailable"); stepGame(game, controls, dt); return; }
  recorder.step(controls, dt);
}
