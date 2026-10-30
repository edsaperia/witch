// Serial Node allocation/CPU diagnostic, not a browser house-render benchmark.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { openRules } from "../balance/lib.mjs";
const rules = await openRules();
try {
  const gameModule = await rules.load("/src/rules/game.ts");
  const clock = await rules.load("/src/rules/clock.ts");
  const replay = await rules.load("/src/platform/online/replay.ts");
  const { TUNING } = await rules.load("/src/rules/tuning.ts");
  const { captureNight } = await rules.load("/src/app/nightSave.ts");
  const { snapshotGame } = await rules.load("/src/rules/nightSnapshot.ts");
  const { restoreSettingsBase } = await rules.load("/src/app/playerSettings.ts");
  const { LogRecords } = await rules.load("/src/platform/logRecords.ts");
  const { PlaytestJournal } = await rules.load("/src/platform/playtestJournal.ts");
  const after = await rules.load("/src/platform/inputRecording.ts");
  let measuredRuleMs = 0;
  const measuredAfter = {};
  const measuredGame = { ...gameModule, stepGame: (game, controls, dt) => {
    const start = performance.now();
    try { return gameModule.stepGame(game, controls, dt); }
    finally { measuredRuleMs += performance.now() - start; }
  } };
  const measuredSource = ts.transpileModule(readFileSync("src/platform/inputRecording.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function("require", "exports", measuredSource)(name => ({ "../rules/game": measuredGame, "../rules/clock": clock, "./online/replay": replay })[name], measuredAfter);
  const beforeSha = "b44751e690c440df05a55055900441e5019e1221";
  const source = execFileSync("git", ["show", `${beforeSha}:src/platform/inputRecording.ts`], { encoding: "utf8" });
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const before = {}, imports = { "../rules/game": gameModule, "../rules/clock": clock, "./online/replay": replay };
  new Function("require", "exports", compiled)(name => { if (!(name in imports)) throw Error(`Unexpected import ${name}`); return imports[name]; }, before);
  const rows = [];
  for (const [label, module] of [["before", before], ["after", after]]) {
    const tuning = structuredClone(TUNING); tuning.map.islandAreas = 4;
    const game = gameModule.newGame(123, tuning); game.clock.paused = false;
    restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
    const records = new LogRecords(), context = { build: "fixture", t: 0, island: "home" };
    let writes = 0, stringifyCalls = 0, cloneCalls = 0;
    const recorder = new module.InputRecorder(game, "fixture", () => captureNight(game, { build: "fixture", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } }), (kind, value) => { writes++; records.add("debug", kind, value, context); });
    const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    recorder.step(idle, gameModule.STEP); // one retained input shape, outside measured hot stretch
    const stringify = JSON.stringify, clone = globalThis.structuredClone, firstWrites = writes;
    JSON.stringify = (...args) => { stringifyCalls++; return stringify(...args); };
    globalThis.structuredClone = (...args) => { cloneCalls++; return clone(...args); };
    const start = performance.now();
    try { for (let i = 0; i < 1851; i++) recorder.step(idle, gameModule.STEP); }
    finally { JSON.stringify = stringify; globalThis.structuredClone = clone; }
    const elapsedMs = performance.now() - start, synchronousWrites = writes - firstWrites;
    const tape = recorder.export();
    const replayed = module.replayRecording(tape, "fixture");
    const replayEqual = JSON.stringify(snapshotGame(replayed)) === JSON.stringify(snapshotGame(game));
    if (!tape.complete || !replayEqual) throw Error(`${label}: incomplete or different replay`);
    rows.push({ label, frames: 1851, elapsedMs, stringifyCalls, cloneCalls, synchronousJournalRecords: synchronousWrites, drainedJournalRecords: writes, tapeEvents: tape.events.length, replayEqual });
  }
  // A separate production-map scripted-input comparison includes the real journal
  // batching/record budgets, with an in-memory store in place of native IndexedDB.
  const trace = Array.from({ length: 900 }, (_, i) => ({ moveX: i < 300 ? 1 : Math.cos(i / 40), moveZ: i < 300 ? 0 : Math.sin(i / 40), toggleMode: false, zoom: 0, aimX: 12.25 + i / 100, aimZ: -3.75, autoTalk: false, fire: i % 120 < 20 }));
  const normal = [];
  let expected;
  for (const recorded of [false, true]) {
    const game = gameModule.newGame(123, structuredClone(TUNING)); game.clock.paused = false;
    restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
    const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    gameModule.stepGame(game, { ...idle, moveX: 1, castParty: true }, gameModule.STEP);
    // Named debug-wave preparation, bounded by the actual end-of-night state.
    let guard = 0;
    while (game.party.wave < 3 && !game.partyOver && !game.win && guard++ < 30) {
      gameModule.stepGame(game, { ...idle, nextWave: true }, gameModule.STEP);
      for (let i = 0; i < 180 && !game.over; i++) gameModule.stepGame(game, idle, gameModule.STEP);
    }
    const journal = new PlaytestJournal("/fixture", "fixture", `normal-${recorded}`, "fixture", { list: async () => [], append: async () => {}, read: async () => [], prune: async () => {} }, { read: () => null, write: () => {} });
    await journal.ready;
    const recorder = recorded ? new measuredAfter.InputRecorder(game, "fixture", () => captureNight(game, { build: "fixture", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } }), (kind, value, owner) => journal.append(kind, value, { context: owner })) : null;
    measuredRuleMs = 0;
    const start = performance.now();
    for (const input of trace) if (recorder) recorder.step(input, gameModule.STEP); else gameModule.stepGame(game, input, gameModule.STEP);
    const hotMs = performance.now() - start, ruleMs = measuredRuleMs, drainStart = performance.now();
    recorder?.flushJournal(); // TS-private seam intentionally used only by this diagnostic.
    await journal.flush();
    const drainMs = performance.now() - drainStart;
    const snapshot = JSON.stringify(snapshotGame(game));
    if (!recorded) expected = snapshot;
    else if (snapshot !== expected || JSON.stringify(snapshotGame(after.replayRecording(recorder.export(), "fixture"))) !== snapshot) throw Error("Production-map trace differs or fails replay");
    normal.push({ recorded, frames: trace.length, mapIslandAreas: game.tuning.map.islandAreas, creatures: game.creatures.length, worldSeconds: game.clock.time, playerSeconds: game.herTime, wave: game.party.wave, spellAt: game.party.spellAt, hotMs, drainMs, ...(recorded ? { measuredRuleMs: ruleMs, recorderJournalUsPerFrame: (hotMs - ruleMs + drainMs) * 1000 / trace.length } : {}), totalUsPerFrame: (hotMs + drainMs) * 1000 / trace.length });
    await journal.close();
  }
  const result = { label: "Serial Node diagnostics: production-map scripted trace (actual phase/wave reported), not Ed's observed typical-night capacity or renderer/GC/native-IDB/browser proof; per-frame overhead directly subtracts timed rules work, includes journal drain and timer instrumentation", beforeSha, afterHead: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), dirty: !!execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], { encoding: "utf8" }).trim(), rows, productionMapTrace: normal };
  const json = JSON.stringify(result, null, 2) + "\n";
  writeFileSync(process.argv[2] ?? "previews/robustness-recorder-measure.json", json); console.log(json);
} finally { await rules.close(); }
