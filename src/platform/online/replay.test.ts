import { expect, it } from "vitest";
import { newGame, STEP, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { snapshotGame } from "../../rules/nightSnapshot";
import { replayGuest, replayHostStep, replayStart } from "./replay";

it("serializes a mid-frame handoff and replays authoritative two-witch inputs identically", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const host = newGame(123, tuning, 2);
  host.clock.paused = false; host.witches.forEach(w => { w.paused = false; });
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  replayHostStep(host, [{ ...idle, toggleMode: true }, idle], STEP * 0.4, 1);
  const start = JSON.parse(JSON.stringify(replayStart(host, "test-build", 1)));
  const guest = replayGuest(start, "test-build");
  for (let tick = 2; tick < 122; tick++) {
    const frame = replayHostStep(host, [{ ...idle, moveX: 1, pausePage: tick > 80 && tick < 90 }, { ...idle, moveZ: -1, pausePage: tick > 82 && tick < 92 }], STEP, tick);
    expect(guest.apply(JSON.parse(JSON.stringify(frame)))).toBe(true);
  }
  expect(snapshotGame(guest.game)).toEqual(snapshotGame(host));
  expect(guest.apply({ tick: 121, dt: STEP, inputs: [idle, idle] })).toBe(false);
  expect(guest.apply({ tick: 123, dt: STEP, inputs: [idle, idle] })).toBe(false);
  expect(() => replayGuest(start, "other-build")).toThrow("Incompatible");
  const builtMap = guest.game.map, builtForest = guest.game.forest, builtGame = guest.game;
  // A slow renderer can finish after the host advances; resync keeps its built island cache.
  const resynced = replayGuest(JSON.parse(JSON.stringify(replayStart(host, "test-build", 121))), "test-build", builtGame);
  expect(resynced.game).toBe(builtGame); expect(resynced.game.map).toBe(builtMap); expect(resynced.game.forest).toBe(builtForest);
  expect(snapshotGame(resynced.game)).toEqual(snapshotGame(host));
});

it("accepts the real fixed-step accumulator's tiny negative boundary remainder", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const host = newGame(123, tuning, 2); host.clock.paused = false;
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  replayHostStep(host, [idle, idle], STEP - 5e-10, 1);
  expect(host.acc).toBeLessThan(0);
  const guest = replayGuest(JSON.parse(JSON.stringify(replayStart(host, "boundary", 1))), "boundary");
  expect(guest.game.acc).toBe(host.acc);
  const frame = replayHostStep(host, [idle, idle], STEP, 2);
  expect(guest.apply(frame)).toBe(true);
  expect(snapshotGame(guest.game)).toEqual(snapshotGame(host));
});
