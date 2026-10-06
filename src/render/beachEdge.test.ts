// The woods' edge at the beach (render/beachEdge.ts): its bushes hug the ground shader's scalloped line, in rows, grass at its
// foot, the odd palm and a few strays out on the sand; the same plants however she comes to them.
import { describe, expect, it } from "vitest";
import type { Beach } from "../rules/mapShape";
import { edgePlants, scallop, vnoise } from "./beachEdge";

// A round island 1000 m across with a 60 m beach.
const R = 1000, W = 60;
const beach = { x: 0, z: 0, width: W, out: 0, edgeMin: R, edgeMax: R, coast: new Float32Array(8).fill(R), edge: () => R, sandAt: () => W, intoSand: (x: number, z: number) => Math.hypot(x, z) - (R - W), intoSea: (x: number, z: number) => Math.hypot(x, z) - R } as unknown as Beach;
const lineAt = (x: number, z: number) => { const a = Math.atan2(z, x); return R - W + scallop(a * R, W); };
// The same with its width varying round (rules/mapShape.ts sandWidths): bays to 100 m, narrows to 6 m.
const sandAt = (a: number) => 6 + 94 * (0.5 + 0.5 * Math.sin(a * 40));
const varied = { ...beach, sandAt, intoSand: (x: number, z: number) => Math.hypot(x, z) - (R - sandAt(Math.atan2(z, x))) } as unknown as Beach;

describe("the woods' edge at the beach", () => {
  it("noises as the ground shader's does: 0 to 1, smooth", () => {
    for (let i = 0; i < 200; i++) { const v = vnoise(i * 0.37, i * 0.11); expect(v).toBeGreaterThanOrEqual(0); expect(v).toBeLessThanOrEqual(1); }
    expect(Math.abs(vnoise(3.1, 2) - vnoise(3.11, 2))).toBeLessThan(0.05);
  });
  it("lines the scalloped edge with shrubs and grass, the odd palm, a few strays on the sand", () => {
    const P = edgePlants(beach, R - W, 0), shrubs = P.filter(p => p.kind === "shrub"), grass = P.filter(p => p.kind === "grass"), palms = P.filter(p => p.kind === "palm");
    expect(shrubs.length).toBeGreaterThan(200);
    expect(grass.length).toBeGreaterThan(100);
    expect(palms.length).toBeGreaterThan(3); expect(palms.length).toBeLessThan(shrubs.length / 6);
    const past = (p: { x: number; z: number }) => Math.hypot(p.x, p.z) - lineAt(p.x, p.z);
    // most of the bushes within a few metres of the line (spilling onto the sand, rows behind it), the grass at its foot
    expect(shrubs.filter(p => past(p) > -9 && past(p) < 2.5).length / shrubs.length).toBeGreaterThan(0.9);
    expect(grass.every(p => past(p) > 0 && past(p) < 2)).toBe(true);
    expect(P.filter(p => past(p) > 2.5).length).toBeGreaterThan(2); // strays out on the sand
    expect(P.every(p => Math.hypot(p.x, p.z) < R - 1)).toBe(true); // never in the sea
  });
  it("follows the sand's width round the coast, never into the sea or the decorations' ground", () => {
    const clear = 16;
    for (const a0 of [0, 0.02, 0.04, 0.06, 0.1]) {
      const at = R - 30, P = edgePlants(varied, at * Math.cos(a0), at * Math.sin(a0), [], clear);
      expect(P.length).toBeGreaterThan(100);
      for (const p of P) {
        const a = Math.atan2(p.z, p.x), w = sandAt(a), line = R - w + scallop(a * R, w), past = Math.hypot(p.x, p.z) - line;
        expect(Math.hypot(p.x, p.z)).toBeLessThan(R - 1.9); // (out of the sea, even where it's 6 m wide)
        expect(varied.intoSand(p.x, p.z)).toBeLessThan(clear - 2); // (short of where the shells and prints lie)
        expect(past).toBeLessThan(w * 0.6 + 4.6); // (and short of the middle of a narrow stretch)
        if (p.kind === "shrub" && past < -2) expect(past).toBeGreaterThan(-9); // (the rows behind the line, wherever it runs)
      }
    }
    expect(Math.abs(scallop(12.3, 6))).toBeLessThan(Math.abs(scallop(12.3, 60)) + 1e-9); // (scalloped less where it's narrow)
  });
  it("puts the same plants in the same places wherever she comes from", () => {
    const a = edgePlants(beach, R - W, 0).map(p => `${p.x.toFixed(2)},${p.z.toFixed(2)},${p.kind}`);
    const b = new Set(edgePlants(beach, (R - W) * Math.cos(0.05), (R - W) * Math.sin(0.05)).map(p => `${p.x.toFixed(2)},${p.z.toFixed(2)},${p.kind}`));
    const shared = a.filter(k => b.has(k)).length;
    expect(shared).toBeGreaterThan(a.length * 0.5); // (she moved 47 m along: the overlap's plants are the same)
  });
});
