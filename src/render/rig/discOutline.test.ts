import { describe, it, expect } from "vitest";
import { stylisePixels } from "../../../art/stylise.js";

// A small square as the bake hands it to the pixel-art style: albedo, normal and mirrored normal maps.
function square(w: number, h: number) {
  const a = new Uint8ClampedArray(w * h * 4), n = new Uint8ClampedArray(w * h * 4), nf = new Uint8ClampedArray(w * h * 4);
  for (let y = 2; y < h - 2; y++) for (let x = 2; x < w - 2; x++) { const o = (y * w + x) * 4; a.set([150, 110, 80, 255], o); n.set([128, 128, 255, 255], o); nf.set([128, 128, 255, 255], o); }
  return { a, n, nf };
}
const filled = (a: Uint8ClampedArray) => { let k = 0; for (let i = 3; i < a.length; i += 4) if (a[i]) k++; return k; };

describe("the rig's discs carry no outline under the pixel-art styles (Ed, 2026-10-06: legs read better without)", () => {
  for (const mode of ["bold", "ref"]) it(mode, () => {
    const w = 10, h = 10, inner = (w - 4) * (h - 4);
    const lined = square(w, h); stylisePixels(lined.a, lined.n, lined.nf, w, h, mode);
    expect(filled(lined.a)).toBeGreaterThan(inner); // a sprite gets its outline round it
    const bare = square(w, h); stylisePixels(bare.a, bare.n, bare.nf, w, h, mode, { outline: false });
    expect(filled(bare.a)).toBe(inner); // a disc doesn't
  });
});
