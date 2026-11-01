import { expect, it, vi } from "vitest";
import { newGame, STEP, stepGame, type Controls } from "../rules/game";
import { snapshotGame } from "../rules/nightSnapshot";
import { TUNING } from "../rules/tuning";
import { withGuestInputSteps, type GuestFrameTrace } from "../rules/onlineInputSteps";
import { enableGuestEffects, startGuestLetters } from "../rules/guestEffects";
import { captureNight } from "./nightSave";
import { restoreSettingsBase } from "./playerSettings";
import { pageMutation, pageFocus, recordedStep, recordingFor } from "./recordingHooks";
import { replayRecording } from "../platform/inputRecording";
import { captureComment, parseComment } from "./playtestComments";
import * as diagnostics from "../platform/caughtError";

const idle: Controls = { moveX: 0, moveZ: 0, zoom: 0, toggleMode: false };
function fixture(players = 1) {
  const t = structuredClone(TUNING); t.map!.islandAreas = 4;
  const game = newGame(123, t, players); game.clock.paused = false;
  restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
  const context = { build: "test", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } };
  return { game, context, capture: () => captureNight(game, context) };
}
it("the page hooks keep both players, explicit mutation boundaries and a comment replay to the saved state", () => {
  const { game, context, capture } = fixture(2);
  for (let i = 0; i < 40; i++) recordedStep(game, [{ ...idle, moveX: 1, aimX: 17, aimZ: 4 }, { ...idle, moveZ: -1, zoom: i === 4 ? 1 : 0 }], STEP, "test", capture);
  pageMutation(game, "finds: loan", () => { game.friendly.add("loan fixture"); });
  pageMutation(game, "settings: volume", () => { game.tuning.music.volume = 0.4; });
  pageFocus(game, { x: 3, y: 4, z: 5 });
  for (let i = 0; i < 20; i++) recordedStep(game, [idle, { ...idle, moveZ: 1 }], STEP * 0.6, "test", capture);
  pageMutation(game, "pause", () => { game.clock.paused = true; });
  const tape = recordingFor(game, "test", capture).export();
  const comment = captureComment(game, "both witches here", context, "?seed=123", {}, [], 1234, tape);
  const loaded = parseComment(JSON.stringify([{ comments: [comment] }]), "test");
  expect(snapshotGame(replayRecording(loaded.recording!, "test"))).toEqual(loaded.night.game);
  expect(tape.events.filter(e => e.kind === "frame")).toHaveLength(60);
  expect(tape.events.filter(e => e.kind === "checkpoint").map(e => e.label)).toEqual(["finds: loan", "settings: volume", "pause"]);
});
it("records actually consumed guest fixed-step inputs rather than the latest received frame input", () => {
  const { game, capture } = fixture(2);
  game.witches.forEach(w => { w.body.seated = false; w.body.perch = false; });
  enableGuestEffects(game);
  const x = game.witches[1].body.x;
  const r = recordingFor(game, "test", capture);
  for (let frame = 0; frame < 4; frame++) {
    const casts = frame === 0 ? [{ time: 0, aimX: 1, aimZ: 0, id: 0, first: 0 }] : [];
    casts.forEach(cast => startGuestLetters(game, cast));
    const trace: GuestFrameTrace = { steps: [], casts };
    withGuestInputSteps(game, original => {
      const sequence = frame * 2 + trace.steps.length;
      const consumed = { ...original, moveX: sequence < 4 ? 1 : 0, moveZ: 0 };
      trace.steps.push({ sequence, controls: consumed }); return consumed;
    }, () => recordedStep(game, [idle, idle], STEP * 2, "test", capture), trace);
  }
  const tape = r.export();
  expect(game.witches[1].body.x).toBeGreaterThan(x);
  expect(tape.events.filter(e => e.kind === "frame").every(e => e.frame.guestSteps?.length === 2)).toBe(true);
  expect(tape.events.some(e => e.kind === "frame" && e.frame.guestCasts?.length === 1)).toBe(true);
  expect(snapshotGame(replayRecording(tape, "test"))).toEqual(snapshotGame(game));
});
it("a diagnostic starting-save failure cannot prevent or duplicate the original simulation step", () => {
  const { game, capture } = fixture(), { game: reference } = fixture();
  // The page log may already own the diagnostic sink in a shared worker. Assert
  // the actual reporting boundary, independently of console-vs-journal routing.
  const report = vi.spyOn(diagnostics, "logCaughtError");
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {}); // Silence only the optional no-page fallback.
  try {
    const fail = () => { throw Error("fixture storage context unavailable"); };
    recordedStep(game, idle, STEP, "test", fail); stepGame(reference, idle, STEP);
    recordedStep(game, idle, STEP, "test", capture); stepGame(reference, idle, STEP);
    expect(snapshotGame(game)).toEqual(snapshotGame(reference));
    expect(report).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ message: "fixture storage context unavailable" }), "input recording unavailable");
  } finally { report.mockRestore(); warn.mockRestore(); }
});
