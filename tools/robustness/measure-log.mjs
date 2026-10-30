// Serial rules-only fixture: no renderer/browser, not a substitute for Ed's representative night.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { openRules } from "../balance/lib.mjs";
const output = process.argv[2] ?? "previews/robustness-log-size.json";
const sourceSha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const sourceDirty = !!execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], { encoding: "utf8" }).trim();
const rules = await openRules();
try {
  const { newGame, STEP } = await rules.load("/src/rules/game.ts");
  const { TUNING } = await rules.load("/src/rules/tuning.ts");
  const { captureNight } = await rules.load("/src/app/nightSave.ts");
  const { restoreSettingsBase } = await rules.load("/src/app/playerSettings.ts");
  const { InputRecorder, replayRecording } = await rules.load("/src/platform/inputRecording.ts");
  const { snapshotGame } = await rules.load("/src/rules/nightSnapshot.ts");
  const { encodeLog, jsonBytes, packLog, unpackLog } = await rules.load("/src/platform/logCodec.ts");
  const { captureComment, encodeStoredComments, decodeStoredComments, parseCommentFile } = await rules.load("/src/app/playtestComments.ts");
  const tuning = structuredClone(TUNING); tuning.map.islandAreas = 4;
  const game = newGame(123, tuning); game.clock.paused = false;
  restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
  const context = { build: "fixture", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } };
  const recorder = new InputRecorder(game, "fixture", () => captureNight(game, context));
  const frames = Math.round(600 / STEP), start = performance.now();
  for (let i = 0; i < frames; i++) {
    const direction = Math.floor(i / 120) % 4;
    recorder.step({ moveX: direction === 0 ? 1 : direction === 2 ? -1 : 0, moveZ: direction === 1 ? 1 : direction === 3 ? -1 : 0, zoom: 0, toggleMode: false, aimX: 12.25, aimZ: -3.75, castParty: i === 0, fire: i % 300 < 30 }, STEP);
    if (i === Math.floor(frames / 2)) recorder.mutate("fixture: music setting", () => { game.tuning.music.volume = 0.2; });
  }
  recorder.mutate("fixture: pause", () => { game.clock.paused = true; });
  const tape = recorder.export();
  if (!tape.complete) throw Error(tape.failure ?? "Incomplete ten-minute fixture");
  const comment = captureComment(game, "Ten-minute serial rules fixture", context, "?seed=123", {}, [], 1, tape);
  const log = [{ seed: game.seed, build: "fixture", started: "fixture", samples: [], errors: [], comments: [comment], inputRecording: tape }];
  const packed = await packLog(log), decoded = await unpackLog(packed);
  const selected = await parseCommentFile(JSON.stringify(packed), "fixture");
  const stored = await encodeStoredComments([comment]), reloaded = await decodeStoredComments(stored);
  const replay = replayRecording(selected.recording, "fixture");
  const equal = JSON.stringify(snapshotGame(replay)) === JSON.stringify(snapshotGame(game));
  if (!equal || !isDeepStrictEqual(decoded, JSON.parse(JSON.stringify(log))) || !isDeepStrictEqual(reloaded, JSON.parse(JSON.stringify([comment])))) throw Error("Fixture compression/replay differs");
  const result = { sourceSha, sourceDirty, label: "Synthetic 10-minute rules fixture, not Ed's observed typical play", seed: 123, mapIslandAreas: 4, frames, simulatedHerSeconds: game.herTime, gameSeconds: game.clock.time, wave: game.party.wave, partyOver: !!game.partyOver, tapeComplete: tape.complete, replayEqual: equal, elapsedMs: Math.round(performance.now() - start), bytes: { rawTape: jsonBytes(tape), deltaTape: jsonBytes(encodeLog(tape)), rawLog: jsonBytes(log), deltaLog: jsonBytes(encodeLog(log)), encodedLog: jsonBytes(packed), nativeGzip: packed.encoding === "gzip" ? atob(packed.data).length : null, encodedCommentStore: jsonBytes(stored), rawComment: jsonBytes(comment) }, encoding: packed.encoding, representativeNightStillRequired: true };
  mkdirSync(dirname(output), { recursive: true }); writeFileSync(output, JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
} finally { await rules.close(); }
