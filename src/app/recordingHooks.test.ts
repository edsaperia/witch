import { expect, it, vi } from "vitest";
import { newGame, STEP, stepGame, type Controls } from "../rules/game";
import { snapshotGame } from "../rules/nightSnapshot";
import { TUNING } from "../rules/tuning";
import { captureNight } from "./nightSave";
import { restoreSettingsBase } from "./playerSettings";
import { pageMutation, recordedStep, recordingFor } from "./recordingHooks";
import { replayRecording } from "../platform/inputRecording";
import { captureComment, parseComment } from "./playtestComments";

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
  for (let i = 0; i < 20; i++) recordedStep(game, [idle, { ...idle, moveZ: 1 }], STEP * 0.6, "test", capture);
  pageMutation(game, "pause", () => { game.clock.paused = true; });
  const tape = recordingFor(game, "test", capture).export();
  const comment = captureComment(game, "both witches here", context, "?seed=123", {}, [], 1234, tape);
  const loaded = parseComment(JSON.stringify([{ comments: [comment] }]), "test");
  expect(snapshotGame(replayRecording(loaded.recording!, "test"))).toEqual(loaded.night.game);
  expect(tape.events.filter(e => e.kind === "frame")).toHaveLength(60);
  expect(tape.events.filter(e => e.kind === "checkpoint").map(e => e.label)).toEqual(["finds: loan", "settings: volume", "pause"]);
});
it("a diagnostic starting-save failure cannot prevent or duplicate the original simulation step", () => {
  const { game, capture } = fixture(), { game: reference } = fixture();
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const fail = () => { throw Error("fixture storage context unavailable"); };
  recordedStep(game, idle, STEP, "test", fail); stepGame(reference, idle, STEP);
  recordedStep(game, idle, STEP, "test", capture); stepGame(reference, idle, STEP);
  expect(snapshotGame(game)).toEqual(snapshotGame(reference)); expect(warn).toHaveBeenCalledOnce(); warn.mockRestore();
});
