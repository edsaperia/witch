import { expect, it, vi } from "vitest";
import { refractionCoordinate } from "./refractionMath";

const size = [320, 180] as const;
const shapes = [[0.5, 0.5, 0.2, 0.2]];
const states = [[0.6, 0, Math.PI / 6, 2]]; // plume centre has one maximum leftward sample
it("OFF is exact identity after arbitrary potion wobble and performs zero depth reads", () => {
  const p = [0.517234, 0.481725] as const, depth = vi.fn(() => 0.9);
  expect(refractionCoordinate(p, size, shapes, states, 0, depth)).toBe(p);
  expect(depth).not.toHaveBeenCalled();
});
it("pixels outside every local form stay exact and do not read depth", () => {
  const p = [0.01, 0.01] as const, depth = vi.fn(() => 0.9);
  expect(refractionCoordinate(p, size, shapes, states, 1, depth)).toBe(p);
  expect(depth).not.toHaveBeenCalled();
});
it("samples and guards the post-potion destination, then the actual snapped source", () => {
  const p = [160.5 / 320, 90.5 / 180] as const, reads: (readonly [number, number])[] = [];
  const moved = refractionCoordinate(p, size, shapes, states, 1, q => { reads.push(q); return 0.9; });
  expect(moved).not.toEqual(p); expect(reads[0]).toBe(p); expect(reads[1]).toEqual(moved);
  expect(moved[0] * 320 % 1).toBeCloseTo(0.5); expect(moved[1] * 180 % 1).toBeCloseTo(0.5);
  const foregroundDestination = refractionCoordinate(p, size, shapes, states, 1, () => 0.4);
  expect(foregroundDestination).toBe(p);
  const foregroundSource = refractionCoordinate(p, size, shapes, states, 1, q => q === p ? 0.9 : 0.4);
  expect(foregroundSource).toBe(p);
});
it("protects foreground in a neighbouring scene texel participating in fractional potion sampling", () => {
  const p = [0.5, 0.5] as const;
  const depth = (q: readonly [number, number]) => q[0] < 0.5 ? 0.3 : 0.9;
  expect(depth(p)).toBe(0.9); // A nearest-only guard would miss the foreground mixed into this colour.
  expect(refractionCoordinate(p, size, shapes, states, 1, depth)).toBe(p);
});
it("keeps displaced source coordinates inside texel centres at every screen edge", () => {
  for (const p of [[0.5 / 320, 0.5 / 180], [319.5 / 320, 179.5 / 180], [0.499, 0.501]] as const) {
    const result = refractionCoordinate(p, size, [[p[0], p[1], 0.1, 0.1]], states, 1, () => 0.9);
    expect(result[0]).toBeGreaterThanOrEqual(0.5 / 320); expect(result[0]).toBeLessThanOrEqual(319.5 / 320);
    expect(result[1]).toBeGreaterThanOrEqual(0.5 / 180); expect(result[1]).toBeLessThanOrEqual(179.5 / 180);
    expect(Math.abs(result[0] - p[0]) * 320).toBeLessThanOrEqual(2.0001);
    expect(Math.abs(result[1] - p[1]) * 180).toBeLessThanOrEqual(2.0001);
  }
});
