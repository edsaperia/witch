import { expect, it } from "vitest";
import { plumeMask, pressureMask, PRESSURE_SECONDS, refractable, refractedPixel, RefractionEvents } from "./refractionMath";

it("protects a foreground surface at both the destination and proposed source pixel", () => {
  const effect = 0.6;
  expect(refractable(0.4, effect)).toBe(false);
  expect(refractable(0.8, effect) && refractable(0.3, effect)).toBe(false);
  expect(refractable(0.8, effect) && refractable(0.7, effect)).toBe(true);
  expect(refractable(NaN, effect)).toBe(false);
});
it("never samples outside the image and limits even overlapping contributions to two art pixels", () => {
  expect(refractedPixel(0, 0, -100, -Infinity, 320, 180)).toEqual([0, 0]);
  expect(refractedPixel(319, 179, 100, 100, 320, 180)).toEqual([319, 179]);
  expect(refractedPixel(50, 50, 20, -20, 320, 180)).toEqual([52, 48]);
  expect(refractedPixel(50, 50, 0.8, -0.8, 320, 180)).toEqual([51, 49]);
});
it("keeps plume and pressure masks local with a finite lifetime", () => {
  expect(plumeMask(0, 0)).toBe(1); expect(plumeMask(1, 0)).toBe(0); expect(plumeMask(4, 2)).toBe(0);
  expect(pressureMask(0.5, PRESSURE_SECONDS * 0.5)).toBeGreaterThan(0);
  expect(pressureMask(0, PRESSURE_SECONDS * 0.5)).toBe(0);
  expect(pressureMask(1, PRESSURE_SECONDS)).toBe(0);
  expect(pressureMask(0, -1)).toBe(0);
});
it("consumes held events once, resets on island replacement or time rewind, and freezes with its clock", () => {
  const events = new RefractionEvents(), world = {}, event = {};
  expect(events.begin(world, 1)).toBe(true); expect(events.take(event)).toBe(true);
  expect(events.begin(world, 1)).toBe(false); expect(events.take(event)).toBe(false);
  expect(events.begin(world, 1.01)).toBe(false); expect(events.take(event)).toBe(false);
  expect(events.begin({}, 1.01)).toBe(true); expect(events.take(event)).toBe(true);
  expect(events.begin(world, 0)).toBe(true); expect(events.take(event)).toBe(true);
});
