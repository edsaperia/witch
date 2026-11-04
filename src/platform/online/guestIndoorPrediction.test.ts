import { expect, it } from "vitest";
import { newGame, STEP, stepGame, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { startWakeFor } from "../../rules/wakeUp";
import { guestPrediction } from "./guestPrediction";
import { roomAt, HOUSE_ROOMS } from "../../rules/houseRooms";

it("compares each ordinary indoor movement quantum against the real host rules without a latency harness", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning, 2); game.clock.paused = false;
  const W = game.witches[1]; W.time = 0;
  startWakeFor(game, 0, { yesterday: true }, W, { player: 1, room: "bedroom2" });
  W.wake!.open = true; W.wake!.beat = "up";
  Object.assign(W.body, { x: game.map.treehouse.x + 8, z: game.map.treehouse.z - 45, vx: 0, vz: 0, seated: false, perch: true });
  const errors: number[] = [], prediction = guestPrediction(game, 1, e => errors.push(e.size));
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  for (let n = 0; n < 120; n++) {
    const c = { ...idle, moveX: n < 30 ? 1 : n < 60 ? -1 : 0, moveZ: n >= 60 && n < 90 ? 1 : 0 };
    prediction.input(n, c, STEP);
    stepGame(game, [idle, c], STEP);
    prediction.reconcile(n);
  }
  expect(Math.max(...errors)).toBeLessThan(.000001);
});

it("retains already-emitted movement when ordinary walking crosses a room boundary", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning, 2); game.clock.paused = false;
  const W = game.witches[1]; W.time = 0;
  startWakeFor(game, 0, { yesterday: true }, W, { player: 1, room: "bedroom2" });
  W.wake!.open = true; W.wake!.beat = "up";
  const room = HOUSE_ROOMS.shape.trunk.find(r => r.id === "boudoir")!;
  Object.assign(W.body, { x: game.map.treehouse.x + room.x, z: game.map.treehouse.z + room.z, vx: 0, vz: 0, seated: false, perch: true });
  const errors: { sequence: number; size: number; reason: string }[] = [], prediction = guestPrediction(game, 1, e => errors.push(e));
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, moving = { ...idle, moveX: -1, moveZ: 1 };
  for (let n = 0; n < 3; n++) prediction.input(n, moving, STEP);
  let crossed = false, previous = roomAt(game.map.treehouse, W.body.x, W.body.z)?.id;
  for (let n = 0; n < 160; n++) {
    stepGame(game, [idle, moving], STEP);
    const current = roomAt(game.map.treehouse, W.body.x, W.body.z)?.id;
    prediction.reconcile(n);
    if (current !== previous) {
      crossed = true;
      console.log(JSON.stringify({ evidence: "indoor-room-boundary", step: n, from: previous, to: current, correction: errors.at(-1), pending: prediction.pending }));
      expect(prediction.pending).toBe(2);
      expect(errors.at(-1)!.size).toBeLessThan(.001);
    }
    previous = current; prediction.input(n + 3, moving, STEP);
  }
  expect(crossed).toBe(true);
});
