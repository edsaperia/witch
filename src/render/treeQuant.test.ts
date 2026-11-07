import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { applyNormalPalette, dirOf, quantiseNormals, runToEnd, type PixelRect } from "./treeQuant";
import { stepTreeNormalDirs, treeDirsStatus, treeRects } from "./treeNormalDirs";
import type { TypeArt } from "./assets";

// The Tree normal maps choice's reduced settings (Ed, 2026-11-07: "can we try a low number (16? 32? 64?)"): a k-means palette of
// N directions per tree atlas, the sway code kept, and "full" the very bytes it had.
const W = 64, H = 48;
/** A plane of made-up normals: two trees' boxes and a bush's, each pixel a random direction facing the camera with a sway code,
 *  some pixels empty. */
function plane(seed = 7): Uint8Array {
  let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const N = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    if (rnd() < 0.2) continue; // (empty)
    const x = rnd() * 2 - 1, y = rnd() * 2 - 1, z = 0.2 + rnd(), l = Math.hypot(x, y, z);
    N.set([Math.round((x / l) * 127 + 128), Math.round((y / l) * 127 + 128), Math.round((z / l) * 255), Math.floor(rnd() * 256)], i * 4);
  }
  return N;
}
const TREES: PixelRect[] = [{ x: 0, y: 0, w: 20, h: 30 }, { x: 20, y: 0, w: 20, h: 18 }], BUSH: PixelRect = { x: 40, y: 0, w: 24, h: 20 };
const inside = (r: PixelRect, i: number) => { const x = i % W, y = Math.floor(i / W); return x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h; };
const dirsIn = (P: Uint8Array, rects: PixelRect[]) => { const d = new Set<number>(); for (let i = 0; i < W * H; i++) if (rects.some(r => inside(r, i)) && (P[i * 4] | P[i * 4 + 1] | P[i * 4 + 2] | P[i * 4 + 3])) d.add((P[i * 4] << 16) | (P[i * 4 + 1] << 8) | P[i * 4 + 2]); return d; };

describe("quantiseNormals", () => {
  for (const k of [64, 32, 16]) it(`cuts the trees' normals to ${k} directions at most, keeping the sway code and everything else`, () => {
    const N = plane(), before = N.slice(), q = runToEnd(quantiseNormals(N, W, TREES, k)), out = applyNormalPalette(N, q);
    expect(N).toEqual(before); // (the original untouched)
    expect(dirsIn(before, TREES).size).toBeGreaterThan(k);
    expect(q.pal.length).toBeLessThanOrEqual(k * 3);
    expect(dirsIn(out, TREES).size).toBeLessThanOrEqual(k);
    for (let i = 0; i < W * H; i++) {
      const o = i * 4, empty = !(before[o] | before[o + 1] | before[o + 2] | before[o + 3]);
      expect(out[o + 3]).toBe(before[o + 3]); // the alpha (the wind's sway code) exact
      if (empty || !TREES.some(r => inside(r, i))) expect([...out.subarray(o, o + 4)]).toEqual([...before.subarray(o, o + 4)]); // (empty pixels, and the bush's, as they were)
    }
    for (let c = 0; c < q.pal.length; c += 3) { const [x, y, z] = [(q.pal[c] - 128) / 127, (q.pal[c + 1] - 128) / 127, q.pal[c + 2] / 255]; expect(Math.hypot(x, y, z)).toBeCloseTo(1, 1); } // (the centres renormalised)
    // each pixel's new direction is near its old one: no worse than the palette's spread allows
    let err = 0, n = 0; for (let i = 0; i < W * H; i++) { const o = i * 4; if (!q.idx[i]) continue; const a = dirOf(before[o], before[o + 1], before[o + 2]), b = dirOf(out[o], out[o + 1], out[o + 2]); err += Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])); n++; }
    expect(err / n).toBeLessThan(k >= 32 ? 0.25 : 0.35); // (radians on average)
  });
  it("is deterministic", () => {
    const a = runToEnd(quantiseNormals(plane(), W, TREES, 16)), b = runToEnd(quantiseNormals(plane(), W, TREES, 16));
    expect(a.pal).toEqual(b.pal); expect(a.idx).toEqual(b.idx);
  });
});

describe("stepTreeNormalDirs", () => {
  it("cuts a loaded atlas's trees live, and full puts the original bytes back", () => {
    const N = plane(11), orig = N.slice(), tex = new THREE.DataTexture(N, W, H);
    const frame = (r: PixelRect) => ({ uv: [r.x / W, r.y / H, (r.x + r.w) / W, (r.y + r.h) / H] as [number, number, number, number], w: r.w, h: r.h });
    const art = { atlas: { normal: tex, indexed: new THREE.Vector2(0, 0), frames: [frame(TREES[0]), frame(TREES[1]), frame(BUSH)] }, layout: { big: [{ bot: 0, top: 1 }], small: [{ bot: 2, top: null }] } } as unknown as TypeArt;
    expect(treeRects(art, W, H)).toEqual(TREES);
    const data = () => (tex.image as { data: Uint8Array }).data;
    stepTreeNormalDirs(null, [art], 0);
    expect(data()).toBe(N); // (full, never cut: nothing done)
    let frames = 0;
    do stepTreeNormalDirs(null, [art], 32, 50); while (treeDirsStatus.pending && ++frames < 200);
    expect(treeDirsStatus.pending).toBe(0);
    expect(dirsIn(data(), TREES).size).toBeLessThanOrEqual(32);
    expect(dirsIn(data(), [BUSH])).toEqual(dirsIn(orig, [BUSH])); // (the bush's normals untouched)
    for (let i = 3; i < orig.length; i += 4) expect(data()[i]).toBe(orig[i]);
    const at32 = data().slice();
    stepTreeNormalDirs(null, [art], 0);
    expect(data()).toEqual(orig); // full: the original, byte for byte
    stepTreeNormalDirs(null, [art], -1);
    expect(data()).toEqual(orig); // off: the shader's flat light; the texture left as it is
    stepTreeNormalDirs(null, [art], 32);
    expect(treeDirsStatus.pending).toBe(0);
    expect(data()).toEqual(at32); // (kept: back in one frame)
    stepTreeNormalDirs(null, [art], 0);
    expect(data()).toEqual(orig);
  });
});
