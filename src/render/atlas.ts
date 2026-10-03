// Packs baked sprites (an albedo canvas and a normal-map canvas each, from art/generator.js's
// bake) into one pair of textures, so a whole set of sprites draws as one instanced batch.
import * as THREE from "three";

export interface Baked { A: HTMLCanvasElement | OffscreenCanvas; N: HTMLCanvasElement | OffscreenCanvas; w: number; h: number }

/** Where a sprite sits in its atlas: u0, vTop, u1, vBottom, and its size in art pixels. */
export interface Frame { uv: [number, number, number, number]; w: number; h: number }

export interface Atlas { albedo: THREE.DataTexture; normal: THREE.DataTexture; frames: Frame[] }

function pixels(c: HTMLCanvasElement | OffscreenCanvas, w: number, h: number): Uint8ClampedArray {
  const ctx = c.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  return ctx.getImageData(0, 0, w, h).data;
}

function texture(data: Uint8Array, w: number, h: number): THREE.DataTexture {
  const t = new THREE.DataTexture(data, w, h, THREE.RGBAFormat, THREE.UnsignedByteType);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.flipY = false;
  t.colorSpace = THREE.NoColorSpace;
  t.needsUpdate = true;
  return t;
}

/** Shelf-pack the sprites; row 0 of the texture is the top of the image. */
export function packAtlas(sprites: Baked[], width = 2048): Atlas {
  const pad = 1, place: { x: number; y: number }[] = [];
  let x = 0, y = 0, rowH = 0, W = 0;
  for (const s of sprites) {
    if (x + s.w + pad > width) { x = 0; y += rowH + pad; rowH = 0; }
    place.push({ x, y });
    x += s.w + pad; rowH = Math.max(rowH, s.h); W = Math.max(W, x);
  }
  const H = Math.max(1, y + rowH);
  W = Math.max(1, W);
  const a = new Uint8Array(W * H * 4), n = new Uint8Array(W * H * 4);
  const frames: Frame[] = sprites.map((s, i) => {
    const p = place[i], pa = pixels(s.A, s.w, s.h), pn = pixels(s.N, s.w, s.h);
    for (let row = 0; row < s.h; row++) {
      const src = row * s.w * 4, dst = ((p.y + row) * W + p.x) * 4;
      a.set(pa.subarray(src, src + s.w * 4), dst);
      n.set(pn.subarray(src, src + s.w * 4), dst);
    }
    return { uv: [p.x / W, p.y / H, (p.x + s.w) / W, (p.y + s.h) / H], w: s.w, h: s.h };
  });
  return { albedo: texture(a, W, H), normal: texture(n, W, H), frames };
}
