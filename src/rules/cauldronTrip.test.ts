import { expect, it } from "vitest";
import { newMirrorFloorTrip, stepTrip, tripStrength } from "./cauldronTrip";

it("fades Mirror Floor in/out and clears it completely after 90 simulation seconds", () => {
  let trip = newMirrorFloorTrip();
  expect(tripStrength(trip)).toBe(0);
  stepTrip(trip, 1.5);
  expect(tripStrength(trip)).toBeCloseTo(0.5);
  stepTrip(trip, 1.5);
  expect(tripStrength(trip)).toBe(1);
  stepTrip(trip, 85.5);
  expect(tripStrength(trip)).toBeCloseTo(0.5);
  expect(stepTrip(trip, 1.5)).toBeUndefined();
  expect(tripStrength(undefined)).toBe(0);
});

it("allocates a separate trip clock for every witch", () => {
  const a = newMirrorFloorTrip(), b = newMirrorFloorTrip();
  stepTrip(a, 30);
  expect(b.elapsed).toBe(0);
  expect(a.elapsed).toBe(30);
});
