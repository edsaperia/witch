import { describe, expect, it } from "vitest";
import { hizHiddenRef, hizLevels } from "./hiz";

// A seeded random number generator (mulberry32), so a failure can be run again.
const rng = (seed: number) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

describe("the treehouse's occluders (render/hiz.ts)", () => {
  it("only ever calls a rectangle hidden when every pixel in it is behind the occluders (many sizes, maps and rectangles)", () => {
    let hidden = 0, tried = 0;
    for (let seed = 1; seed <= 60; seed++) {
      const r = rng(seed), w = 5 + Math.floor(r() * 300), h = 5 + Math.floor(r() * 200), d = new Float32Array(w * h).fill(1);
      // occluders: a few solid blobs (a house's shapes) at their own depths, over a cleared (far) background
      for (let k = 0; k < 6; k++) {
        const cx = r() * w, cy = r() * h, rx = 3 + r() * w * 0.4, ry = 3 + r() * h * 0.4, z = 0.3 + r() * 0.5;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 < 1) d[y * w + x] = Math.min(d[y * w + x], z);
      }
      const L = hizLevels(d, w, h);
      for (let q = 0; q < 400; q++) {
        const x0 = r() * w * 1.2 - w * 0.1, y0 = r() * h * 1.2 - h * 0.1, x1 = x0 + r() * 60, y1 = y0 + r() * 60, near = 0.3 + r() * 0.7;
        tried++;
        if (!hizHiddenRef(L, [x0, y0], [x1, y1], near)) continue;
        hidden++;
        // every texel the rectangle touches (on the screen) has an occluder nearer than its nearest point
        for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(h - 1, Math.floor(y1)); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(w - 1, Math.floor(x1)); x++)
          expect(d[y * w + x], `seed ${seed} rect ${q} at ${x},${y}`).toBeLessThan(near);
      }
    }
    expect(hidden).toBeGreaterThan(tried * 0.05); // (and it does hide some: the test sees the culling)
  });

  it("each level holds the farthest of what's under it, odd edges included", () => {
    const r = rng(7), w = 37, h = 23, d = new Float32Array(w * h).map(() => r());
    const L = hizLevels(d, w, h);
    for (let n = 1; n < L.length; n++) {
      const c = 2 ** n;
      for (let y = 0; y < L[n].h; y++) for (let x = 0; x < L[n].w; x++) {
        let f = 0;
        for (let yy = y * c; yy < Math.min(h, (y + 1) * c); yy++) for (let xx = x * c; xx < Math.min(w, (x + 1) * c); xx++) f = Math.max(f, d[yy * w + xx]);
        expect(L[n].d[y * L[n].w + x]).toBeGreaterThanOrEqual(f);
      }
    }
  });
});
