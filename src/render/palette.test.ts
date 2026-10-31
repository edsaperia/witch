import { describe, expect, it } from "vitest";
import { channelAt, expandPlane, indexPlane, PALETTE_SIZE, planeBytes } from "./palette";
import { rng } from "../rules/random";

/** A plane of `n` pixels drawn from `values` (RGBA words), seeded. */
function plane(n: number, values: number[][], seed = 1): Uint8Array {
  const r = rng(seed), out = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) out.set(values[Math.floor(r() * values.length)], i * 4);
  return out;
}

describe("atlas planes as palette indices (render/palette.ts)", () => {
  it("gives back every pixel exactly, the alpha codes and a normal's sway code on a rigid pixel too", () => {
    const values = [[0, 0, 0, 0], [12, 200, 40, 255], [12, 200, 40, 254], [12, 200, 40, 253], [128, 128, 255, 0], [128, 128, 255, 37], [255, 255, 255, 255]];
    const rgba = plane(5000, values), p = indexPlane(rgba)!;
    expect(p).not.toBeNull();
    expect(p.idx.length).toBe(5000);
    expect(p.pal.length).toBe(PALETTE_SIZE * 4);
    expect(expandPlane(p.idx, p.pal)).toEqual(rgba);
    for (let i = 0; i < 5000; i += 97) for (let c = 0; c < 4; c++) expect(channelAt(p.idx, p.pal, i, c)).toBe(rgba[i * 4 + c]);
  });
  it("keeps index 0 for transparent, even in a plane with none", () => {
    const p = indexPlane(plane(64, [[1, 2, 3, 255], [4, 5, 6, 255]]))!;
    expect([...p.pal.subarray(0, 4)]).toEqual([0, 0, 0, 0]);
    expect(Math.min(...p.idx)).toBeGreaterThan(0);
  });
  it("takes 255 colours besides transparent, and leaves a plane with more as RGBA (null)", () => {
    const colours = (k: number) => Array.from({ length: k }, (_, i) => [i, 255 - i, (i * 7) & 255, 255]);
    const fits = plane(20000, [[0, 0, 0, 0], ...colours(255)]), over = plane(20000, [[0, 0, 0, 0], ...colours(256)]);
    const f = indexPlane(fits)!;
    expect(new Set(f.idx).size).toBe(256);
    expect(expandPlane(f.idx, f.pal)).toEqual(fits);
    expect(indexPlane(over)).toBeNull();
  });
  it("reads a plane that isn't on a 4-byte boundary", () => {
    const buf = new Uint8Array(4 * 10 + 1), rgba = buf.subarray(1);
    rgba.set(plane(10, [[9, 8, 7, 255], [0, 0, 0, 0]]));
    expect(expandPlane(indexPlane(rgba)!.idx, indexPlane(rgba)!.pal)).toEqual(rgba);
  });
  it("counts an indexed plane a quarter of RGBA's bytes and its palette", () => {
    expect(planeBytes(2048, 1024, false)).toBe(2048 * 1024 * 4);
    expect(planeBytes(2048, 1024, true)).toBe(2048 * 1024 + 1024);
  });
});
