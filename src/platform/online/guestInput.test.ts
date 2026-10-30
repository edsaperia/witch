import { expect, it } from "vitest";
import { guestInput, wireControls } from "./guestInput";

it("keeps presses once while held movement survives consecutive host frames", () => {
  const input = guestInput();
  expect(input.accept({ sequence: 0, controls: { moveX: 1, dash: true } }, 0)).toBe(true);
  expect(input.sample(0)).toMatchObject({ moveX: 1, dash: true });
  expect(input.sample(16)).toMatchObject({ moveX: 1, dash: false });
  expect(input.sample(250)).toMatchObject({ moveX: 0, dash: false });
});

it("retains an edge when several packets arrive before a host frame", () => {
  const input = guestInput();
  input.accept({ sequence: 0, controls: { spell: true } }, 0);
  input.accept({ sequence: 1, controls: { moveZ: 1 } }, 1);
  expect(input.sample(2)).toMatchObject({ spell: true, moveZ: 1 });
  expect(input.accept({ sequence: 0, controls: { moveZ: -1 } }, 200)).toBe(false);
  expect(input.sample(251).moveZ).toBe(0);
});

it("rejects invalid axes without consuming sequence and excludes host debug/callback data", () => {
  const input = guestInput();
  for (const moveX of [NaN, Infinity, 2, "1"]) expect(input.accept({ sequence: 0, controls: { moveX } }, 0)).toBe(false);
  expect(input.accept({ sequence: 0, controls: { moveX: 1 } }, 0)).toBe(true);
  const c = wireControls({ nextWave: true, pauseWaves: true, sharedPlaced: {}, player: 0, fire: true });
  expect(c).toMatchObject({ fire: true });
  expect(c).not.toHaveProperty("nextWave"); expect(c).not.toHaveProperty("sharedPlaced");
  input.clear(); expect(input.sample(1).moveX).toBe(0);
});

it("accepts actual cursor displacement and bounds its aim without losing direction", () => {
  const c = wireControls({ aimX: 30, aimZ: 40 });
  expect(c?.aimX).toBeCloseTo(0.6); expect(c?.aimZ).toBeCloseTo(0.8);
  expect(wireControls({ aimX: Number.MAX_VALUE, aimZ: Number.MAX_VALUE })?.aimX).toBeCloseTo(Math.SQRT1_2);
  expect(wireControls({ aimX: NaN })).toBeNull();
});

it("tolerates a frame timestamp before packet arrival and neutralizes invalid clocks without throwing", () => {
  const input = guestInput(); input.accept({ sequence: 0, controls: { moveX: 1, dash: true } }, 100.5);
  expect(input.sample(100)).toMatchObject({ moveX: 1, dash: true });
  expect(input.sample(101)).toMatchObject({ moveX: 1, dash: false });
  expect(input.sample(NaN).moveX).toBe(0);
  expect(input.sample(350.5).moveX).toBe(0);
});
