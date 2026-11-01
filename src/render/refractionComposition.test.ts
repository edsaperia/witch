import { expect, it, vi } from "vitest";
import { refractionCoordinate, REFRACTION_DEPTH_EPSILON } from "./refractionMath";

const size = [320, 180] as const;
const shapes = [[0.5, 0.5, 0.2, 0.2]];
const states = [[0.6, 0, Math.PI / 6, 2]]; // plume centre has one maximum leftward sample
it("OFF is exact coordinate identity before potion wobble and performs zero depth reads", () => {
  const p = [0.517234, 0.481725] as const, depth = vi.fn(() => 0.9);
  expect(refractionCoordinate(p, size, shapes, states, 0, depth)).toBe(p);
  expect(depth).not.toHaveBeenCalled();
});
it("pixels outside every local form stay exact and do not read depth", () => {
  const p = [0.01, 0.01] as const, depth = vi.fn(() => 0.9);
  expect(refractionCoordinate(p, size, shapes, states, 1, depth)).toBe(p);
  expect(depth).not.toHaveBeenCalled();
});
it("samples and guards the base quantized destination, then the actual snapped source before potion wobble", () => {
  const p = [160.5 / 320, 90.5 / 180] as const, reads: (readonly [number, number])[] = [];
  const moved = refractionCoordinate(p, size, shapes, states, 1, q => { reads.push(q); return 0.9; });
  expect(moved).not.toEqual(p); expect(reads[0]).toEqual(p); expect(reads[9]).toEqual(moved);
  expect(moved[0] * 320 % 1).toBeCloseTo(0.5); expect(moved[1] * 180 % 1).toBeCloseTo(0.5);
  const foregroundDestination = refractionCoordinate(p, size, shapes, states, 1, () => 0.4);
  expect(foregroundDestination).toBe(p);
  const foregroundSource = refractionCoordinate(p, size, shapes, states, 1, q => q[0] === p[0] && q[1] === p[1] ? 0.9 : 0.4);
  expect(foregroundSource).toBe(p);
});
it("protects an adjacent thin foreground texel at both destination and displaced source", () => {
  const p = [160.5 / 320, 90.5 / 180] as const;
  const foreground = (column: number, row: number) => (q: readonly [number, number]) => Math.floor(q[0] * 320) === column && Math.floor(q[1] * 180) === row ? 0.4 : 0.9;
  expect(refractionCoordinate(p, size, shapes, states, 1, foreground(161, 91))).toBe(p);
  // The unconstrained offset is two texels left: column157 is outside the destination halo but inside the source halo.
  expect(refractionCoordinate(p, size, shapes, states, 1, foreground(157, 90))).toBe(p);
  expect(refractionCoordinate(p, size, shapes, states, 1, foreground(156, 90))).not.toEqual(p);
});
it("does not refract a surface within the existing DEPTH24 quantisation uncertainty", () => {
  const p = [160.5 / 320, 90.5 / 180] as const;
  expect(refractionCoordinate(p, size, shapes, states, 1, () => states[0][0] + REFRACTION_DEPTH_EPSILON / 2)).toBe(p);
});
it("also protects neighbouring foreground when a diagnostic caller supplies a fractional coordinate", () => {
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
