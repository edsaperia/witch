import { expect, it } from "vitest";
import { easeCameraLift } from "./camera";

it.each([[0, 10, 3.5], [10, 0, 9.4]])("holds and eases hill clearance at the original 60 Hz rate", (start, need, first) => {
  expect(easeCameraLift(start, need, 0)).toBe(start);
  const one = easeCameraLift(start, need, 1 / 60);
  expect(one).toBeCloseTo(first);
  expect(easeCameraLift(one, need, 1 / 60)).toBeCloseTo(easeCameraLift(start, need, 1 / 30));
});
