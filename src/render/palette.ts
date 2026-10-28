// Atlas pixels as palette indices (Ed, 2026-10-26, from web research: "store the generated pixel art as palette indices"): a plane
// of RGBA pixels with at most 256 different values becomes one byte a pixel (its value's place in a palette) and the palette
// itself, 256 RGBA entries; the sprite shaders look each texel's colour up (render/sprites.ts albedoAt), so what they draw is
// exactly what the RGBA plane gave. Lossless by construction: every value is kept as it is, its alpha codes too (eyes 253, glows
// 254, the sway code in a normal map's alpha). Index 0 is always fully transparent (0, 0, 0, 0). A plane with more values (the
// trees' normal maps: their 3D normals and sway codes, about 100 000 values an atlas) stays RGBA. No Three.js: it runs in the art
// workers, where the atlases are packed (render/artBuild.ts packSteps).

/** Entries in a palette (its texture is this wide, one row). */
export const PALETTE_SIZE = 256;

/** A plane as indices: `idx` one byte a pixel, `pal` PALETTE_SIZE RGBA entries (unused ones zero). */
export interface IndexedPlane { idx: Uint8Array; pal: Uint8Array }

/** The plane's indices and palette, or null if it has more than PALETTE_SIZE values (transparent counted, always index 0). */
export function indexPlane(rgba: Uint8Array): IndexedPlane | null {
  if (rgba.byteOffset % 4) rgba = rgba.slice();
  const n = rgba.length >> 2, px = new Uint32Array(rgba.buffer, rgba.byteOffset, n), idx = new Uint8Array(n);
  const seen = new Map<number, number>([[0, 0]]), pal = new Uint8Array(PALETTE_SIZE * 4);
  let last = 0, lastI = 0; // (runs of one value are common: empty space, flat normals)
  for (let i = 0; i < n; i++) {
    const v = px[i];
    if (v !== last) {
      let k = seen.get(v);
      if (k === undefined) {
        k = seen.size;
        if (k >= PALETTE_SIZE) return null;
        seen.set(v, k);
        pal.set(rgba.subarray(i * 4, i * 4 + 4), k * 4);
      }
      last = v; lastI = k;
    }
    idx[i] = lastI;
  }
  return { idx, pal };
}

/** A plane back as RGBA (the checks, and anything that reads an atlas's pixels on the CPU). */
export function expandPlane(idx: Uint8Array, pal: Uint8Array): Uint8Array {
  const out = new Uint8Array(idx.length * 4);
  for (let i = 0; i < idx.length; i++) { const k = idx[i] * 4; out[i * 4] = pal[k]; out[i * 4 + 1] = pal[k + 1]; out[i * 4 + 2] = pal[k + 2]; out[i * 4 + 3] = pal[k + 3]; }
  return out;
}

/** One pixel's channel (0 r, 1 g, 2 b, 3 a) of a plane, indexed (with its palette) or RGBA. */
export const channelAt = (plane: Uint8Array, pal: Uint8Array | null | undefined, i: number, c: number): number => (pal ? pal[plane[i] * 4 + c] : plane[i * 4 + c]);

/** What a plane takes on the GPU, in bytes: a byte a pixel and its palette, or four a pixel. */
export const planeBytes = (w: number, h: number, indexed: boolean): number => (indexed ? w * h + PALETTE_SIZE * 4 : w * h * 4);
