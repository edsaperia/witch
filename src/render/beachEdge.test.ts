// The woods' edge at the beach (render/beachEdge.ts): its bushes hug the ground shader's scalloped line, in rows, grass at its
// foot, the odd palm and a few strays out on the sand; the same plants however she comes to them.
import { describe, expect, it } from "vitest";
import { beachOf } from "../rules/mapShape";
import { makeLand } from "../rules/land";
import { edgePlants, scallop, vnoise } from "./beachEdge";

// A round island 1000 m across with a 60 m beach; the same with its width varying along the coast (rules/mapShape.ts sandWidths:
// wide bays, narrows to 6 m).
const R = 1000, W = 60;
const land = makeLand((x, z) => Math.hypot(x, z) < R, { minX: -R, maxX: R, minZ: -R, maxZ: R }, 4);
const beach = beachOf({ ...land.box, land, seed: 1 }, { beach: { on: true, width: W, shore: 0 } })!;
const varied = beachOf({ ...land.box, land, seed: 1 }, { beach: { on: true, width: W, shore: 0, vary: { amp: 0.8, harmonics: 7, rocky: 0.7, rockyWidth: 10, min: 6 } } })!;
/** How far past the sand's scalloped line (m) toward the sea (x, z) is, on beach `b`. */
const past = (b: typeof beach, p: { x: number; z: number }) => { const c = b.land.shore(p.x, p.z); return b.intoSand(p.x, p.z) - scallop(c.x, c.z, b.sandAt(p.x, p.z)); };

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
    // most of the bushes within a few metres of the line (spilling onto the sand, rows behind it), the grass at its foot
    expect(shrubs.filter(p => past(beach, p) > -9 && past(beach, p) < 2.5).length / shrubs.length).toBeGreaterThan(0.9);
    expect(grass.every(p => past(beach, p) > -0.3 && past(beach, p) < 2.3)).toBe(true);
    expect(P.filter(p => past(beach, p) > 2.5).length).toBeGreaterThan(2); // strays out on the sand
    expect(P.every(p => Math.hypot(p.x, p.z) < R - 1)).toBe(true); // never in the sea
  });
  it("follows the sand's width along the coast, never into the sea or the decorations' ground", () => {
    const clear = 16;
    for (const a0 of [0, 0.02, 0.04, 0.06, 0.1, 1.3, 2.9]) {
      const at = R - 30, P = edgePlants(varied, at * Math.cos(a0), at * Math.sin(a0), [], clear);
      expect(P.length).toBeGreaterThan(100);
      for (const p of P) {
        const w = varied.sandAt(p.x, p.z), d = past(varied, p);
        expect(Math.hypot(p.x, p.z)).toBeLessThan(R - 1.5); // (out of the sea, even where it's 6 m wide)
        expect(varied.intoSand(p.x, p.z)).toBeLessThan(clear - 1.5); // (short of where the shells and prints lie)
        expect(d).toBeLessThan(w * 0.6 + 5); // (and short of the middle of a narrow stretch)
        if (p.kind === "shrub" && d < -2) expect(d).toBeGreaterThan(-9.5); // (the rows behind the line, wherever it runs)
      }
    }
    expect(Math.abs(scallop(12.3, 4.5, 6))).toBeLessThan(Math.abs(scallop(12.3, 4.5, 60)) + 1e-9); // (scalloped less where it's narrow)
  });
  it("puts the same plants in the same places wherever she comes from", () => {
    const a = edgePlants(beach, R - W, 0).map(p => `${p.x.toFixed(2)},${p.z.toFixed(2)},${p.kind}`);
    const b = new Set(edgePlants(beach, (R - W) * Math.cos(0.05), (R - W) * Math.sin(0.05)).map(p => `${p.x.toFixed(2)},${p.z.toFixed(2)},${p.kind}`));
    const shared = a.filter(k => b.has(k)).length;
    expect(shared).toBeGreaterThan(a.length * 0.5); // (she moved 47 m along: the overlap's plants are the same)
  });
});
