import { expect, it, vi } from "vitest";
import { newGame, stepGame, STEP, type Controls } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { snapshotGame } from "../rules/nightSnapshot";
import { captureNight } from "../app/nightSave";
import { restoreSettingsBase } from "../app/playerSettings";
import { InputRecorder, localControls, replayRecording, type InputRecording } from "./inputRecording";
import { packLog, unpackLog } from "./logCodec";

function fixture(persist?: (kind: string, payload: unknown, context: { build: string; t: number; island: string }) => void) {
  const t = structuredClone(TUNING); t.map!.islandAreas = 4;
  const game = newGame(123, t); game.clock.paused = false;
  restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
  const capture = () => captureNight(game, { build: "test", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } });
  return { game, recorder: new InputRecorder(game, "test", capture, persist) };
}
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
it("keeps a ten-minute paused tape exact without expanding paused frames into the crash journal", () => {
  vi.useFakeTimers();
  try {
    const streamed: { kind: string; payload: unknown }[] = [];
    const { game, recorder } = fixture((kind, payload) => streamed.push({ kind, payload }));
    recorder.mutate("pause", () => { game.clock.paused = true; });
    const before = snapshotGame(game);
    for (let second = 0; second < 600; second++) {
      for (let frame = 0; frame < 60; frame++) recorder.step(idle, 1 / 60);
      vi.advanceTimersByTime(1000);
    }
    const tape = recorder.export();
    expect(tape.complete).toBe(true); expect(tape.events.filter(e => e.kind === "frame")).toHaveLength(36_000);
    expect(streamed.filter(e => e.kind === "recording:paused")).toHaveLength(1);
    expect(streamed.filter(e => e.kind === "recording:event").every(e => (e.payload as { event: { kind: string } }).event.kind !== "frame")).toBe(true);
    expect(snapshotGame(game)).toEqual(before);
    expect(snapshotGame(replayRecording(tape, "test"))).toEqual(before);
    expect(vi.getTimerCount()).toBe(0);
  } finally { vi.useRealTimers(); }
});
it("records a scripted fractional-frame run, retains local aim/zoom/framing, and replays to the identical paused moment", async () => {
  const streamed: { kind: string; payload: unknown }[] = [];
  const { game, recorder } = fixture((kind, payload) => streamed.push({ kind, payload: structuredClone(payload) }));
  recorder.step({ ...idle, toggleMode: true, aimX: 12.25, aimZ: -3.75, zoom: 1, framing: true, framePart: "hat" }, STEP * 0.4);
  for (let i = 0; i < 60; i++) recorder.step({ ...idle, moveX: 1, moveZ: i % 2 ? 1 : 0, aimX: 25, aimZ: -4, zoom: i === 9 ? -1 : 0, fire: i > 20 }, STEP);
  recorder.mutate("settings: music volume", () => { game.tuning.music.volume = 0.2; });
  recorder.mutate("view: opening camera anchor", () => { game.introFocus = { x: 3, y: 4, z: 5 }; });
  for (let i = 0; i < 30; i++) recorder.step({ ...idle, moveZ: -1 }, STEP);
  recorder.mutate("pause", () => { game.clock.paused = true; });
  const tape = JSON.parse(JSON.stringify(recorder.export()));
  expect(streamed[0]).toMatchObject({ kind: "recording:start", payload: { build: "test", seed: 123, startingSave: tape.startingSave } });
  expect(streamed.slice(1).map(row => (row.payload as { event: unknown }).event)).toEqual(tape.events);
  const first = tape.events[0]; expect(first.frame.inputs[0]).toMatchObject({ aimX: 12.25, aimZ: -3.75, zoom: 1, framing: true, framePart: "hat" });
  expect(first.fromStep).toBe(0); expect(first.toStep).toBe(0);
  const decoded = await unpackLog(await packLog({ recording: tape })) as { recording: InputRecording };
  expect(decoded.recording).toEqual(tape);
  const replayed = replayRecording(decoded.recording, "test");
  expect(snapshotGame(replayed)).toEqual(snapshotGame(game)); expect(replayed.acc).toBe(game.acc); expect(replayed.pending).toEqual(game.pending);
  expect(() => replayRecording(tape, "other")).toThrow();
});
it("rejects divergence before a labelled checkpoint instead of using it to repair the replay", () => {
  const { game, recorder } = fixture(); recorder.step(idle, STEP);
  game.friendly.add("unrecorded page mutation");
  recorder.mutate("known setting", () => { game.tuning.music.volume = 0.3; });
  expect(() => replayRecording(recorder.export(), "test")).toThrow(/before checkpoint/);
});
it("rejects executable/nested controls without changing the wire default or normalizing local aim", () => {
  expect(localControls({ ...idle, aimX: 200, aimZ: -100 })).toMatchObject({ aimX: 200, aimZ: -100 });
  expect(localControls({ ...idle, rune: () => null })).toBeNull(); expect(localControls({ ...idle, aimX: NaN })).toBeNull();
  expect(localControls({ ...idle, fire: "yes" })).toBeNull(); expect(localControls({ ...idle, rune: "not a function" })).toBeNull();
});
it("replays the intro seat ease-off and changing camera anchors without render-path world snapshots", async () => {
  const streamed: { event: unknown }[] = [];
  const { game, recorder } = fixture((kind, payload) => { if (kind === "recording:event") streamed.push(payload as { event: unknown }); });
  recorder.mutate("opening: starting seat", () => { game.witch.seated = true; });
  expect(game.witch.seated).toBe(true);
  for (let i = 0; i < 40; i++) {
    recorder.step({ ...idle, moveZ: -1 }, STEP); // Original input leaves the starting seat while the view eases its camera anchor.
    const stringify = vi.spyOn(JSON, "stringify"), clone = vi.spyOn(globalThis, "structuredClone");
    try {
      const focus = { x: i, y: 2, z: 3 }; recorder.setFocus(focus); focus.x = -100;
      // Only tiny anchor events are encoded: no snapshot, full-game JSON or clone.
      expect(stringify.mock.calls.every(([event]) => event?.kind === "focus")).toBe(true);
      expect(clone).not.toHaveBeenCalled();
    } finally { stringify.mockRestore(); clone.mockRestore(); }
    // Mutating a renderer's borrowed object cannot change the retained input.
    game.introFocus!.x = i;
  }
  recorder.mutate("pause", () => { game.clock.paused = true; });
  expect(game.witch.seated).toBeFalsy(); // The rules clear the optional flag on leaving the seat.
  const tape = recorder.export();
  expect(tape.events.filter(e => e.kind === "focus")).toHaveLength(40);
  expect(streamed.map(row => row.event)).toEqual(tape.events);
  const decoded = await unpackLog(await packLog({ recording: tape })) as { recording: InputRecording };
  expect(decoded.recording).toEqual(tape);
  expect(snapshotGame(replayRecording(decoded.recording, "test"))).toEqual(snapshotGame(game));
  const wrong = structuredClone(tape), focus = wrong.events.find(e => e.kind === "focus")!;
  if (focus.kind === "focus") focus.tick++;
  expect(() => replayRecording(wrong, "test")).toThrow(/before camera anchor/);
  const wrongAnchor = structuredClone(tape), anchor = wrongAnchor.events.find(e => e.kind === "focus")!;
  if (anchor.kind === "focus") anchor.before = { x: 999, y: 2, z: 3 };
  expect(() => replayRecording(wrongAnchor, "test")).toThrow(/before camera anchor/);
  // Camera events cannot repair unrelated, undeclared world mutations.
  game.witches[0].health.hp -= 1;
  recorder.setFocus({ x: 90, y: 2, z: 3 });
  expect(() => replayRecording(recorder.export(), "test")).toThrow(/target moment/);
});
it("retains unchanged frames without hot-path serialization/cloning, drains bounded journal batches and exports the exact ordered stream", () => {
  vi.useFakeTimers();
  try {
    const streamed: { kind: string; payload: unknown }[] = [];
    const { game, recorder } = fixture((kind, payload) => streamed.push({ kind, payload: structuredClone(payload) }));
    recorder.step(idle, STEP);
    const stringify = vi.spyOn(JSON, "stringify"), clone = vi.spyOn(globalThis, "structuredClone");
    for (let i = 0; i < 300; i++) recorder.step(idle, STEP);
    expect(stringify).not.toHaveBeenCalled(); expect(clone).not.toHaveBeenCalled();
    stringify.mockRestore(); clone.mockRestore();
    expect(streamed).toHaveLength(1); // start only: diagnostic encoding waits until the simulation task yields.
    vi.advanceTimersByTime(100);
    expect(streamed.filter(row => row.kind === "recording:event")).toHaveLength(128);
    // Grow a partly drained run, then seal it with a checkpoint. Neither its old
    // prefix nor the transition can be lost or journalled twice.
    for (let i = 0; i < 10; i++) recorder.step({ ...idle }, STEP);
    recorder.mutate("pause", () => { game.clock.paused = true; });
    const tape = recorder.export();
    expect(tape.events.filter(event => event.kind === "frame")).toHaveLength(311);
    expect(streamed.slice(1).map(row => (row.payload as { event: unknown }).event)).toEqual(tape.events);
    expect(snapshotGame(replayRecording(tape, "test"))).toEqual(snapshotGame(game));
    expect(vi.getTimerCount()).toBe(0);
  } finally { vi.restoreAllMocks(); vi.useRealTimers(); }
});
it("still enforces the raw expanded byte/event cap when a long unchanged run is compact in memory", () => {
  const { recorder } = fixture();
  for (let i = 0; i < 120_001; i++) recorder.step(idle, 0);
  const tape = recorder.export();
  expect(tape.complete).toBe(false); expect(tape.failure).toMatch(/retention limit/);
  expect(tape.events.length).toBeLessThanOrEqual(120_000);
  const retainedBytes = new TextEncoder().encode(JSON.stringify(tape.startingSave)).length
    + new TextEncoder().encode(JSON.stringify(tape.start)).length
    + tape.events.reduce((sum, event) => sum + new TextEncoder().encode(JSON.stringify(event)).length, 0);
  expect(retainedBytes).toBeLessThanOrEqual(16 * 1024 * 1024);
});
it("keeps deferred records owned by their original game after another night can become current", () => {
  vi.useFakeTimers();
  try {
    const owners: { build: string; t: number; island: string }[] = [];
    const { game, recorder } = fixture((kind, _payload, owner) => { if (kind === "recording:event") owners.push(owner); });
    game.tuning.map!.island = "fox";
    recorder.step(idle, STEP);
    const other = fixture(); other.game.tuning.map!.island = "bear"; other.game.clock.time = 900;
    vi.advanceTimersByTime(100);
    expect(owners).toEqual([{ build: "test", t: game.clock.time, island: "fox" }]);
    expect(vi.getTimerCount()).toBe(0);
  } finally { vi.useRealTimers(); }
});
it("labels an explicitly disabled profile tape incomplete and preserves its simulation actions without journal writes", () => {
  const { game } = fixture(), { game: reference } = fixture();
  const persist = vi.fn();
  const recorder = new InputRecorder(game, "test", () => captureNight(game, { build: "test", params: "", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } }), persist, false);
  recorder.step(idle, STEP);
  stepGame(reference, idle, STEP);
  expect(snapshotGame(game)).toEqual(snapshotGame(reference));
  expect(recorder.export()).toMatchObject({ complete: false, events: [], failure: "Input recording disabled by recording=0 for profiling" });
  expect(persist).not.toHaveBeenCalled();
});
