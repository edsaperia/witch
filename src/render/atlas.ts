// Atlas pixels (from artBuild.ts) turned into a pair of textures, an albedo and a normal map,
// so a whole set of sprites draws as one instanced batch.
import * as THREE from "three";
import { groundOf, packPixels, type AtlasPixels, type Baked, type Frame, type FrameGround } from "./artBuild";
import { gpuKind, type GpuKind } from "./gpuLedger";

export type { Baked, Frame, FrameGround };
export { groundOf };
export interface Atlas { albedo: THREE.DataTexture; normal: THREE.DataTexture; frames: Frame[]; /** each frame's ground (witches' atlases), or null */ grounds?: (FrameGround | null)[] }

/** Whether the atlases keep their pixels on the page after the GPU has them (`?pixels=keep`: the full smoke test reads them for its
 *  floating check). Otherwise each page's albedo and normal pixels are let go once uploaded: the churn hunt at Ed's spot
 *  (2026-10-13) found 360 MB of them held, growing 70 MB a minute as art was baked ahead, and that growth of memory outside
 *  the JavaScript heap is what made the browser stop for its big collections (100 ms and more), not the frames' own garbage. */
let keepPixels = false;
export function keepAtlasPixels(keep: boolean): void { keepPixels = keep; }
const freePixels = (t: THREE.Texture): void => { if (!keepPixels) (t.image as { data: Uint8Array | null }).data = null; t.onUpdate = null; }; // (once: three.js calls it after each upload)

function texture(data: Uint8Array, w: number, h: number): THREE.DataTexture {
  const t = new THREE.DataTexture(data, w, h, THREE.RGBAFormat, THREE.UnsignedByteType);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.flipY = false;
  t.colorSpace = THREE.NoColorSpace;
  t.needsUpdate = true;
  t.onUpdate = freePixels;
  return t;
}

/** `kind`: the GPU ledger's row for its pages (render/gpuLedger.ts). */
export function atlasFromPixels(p: AtlasPixels, kind: GpuKind = "props"): Atlas {
  return { albedo: gpuKind(texture(p.albedo, p.width, p.height), kind), normal: gpuKind(texture(p.normal, p.width, p.height), kind), frames: p.frames };
}

/** A stand-in until a set arrives from the art workers (fast start (b): the start's own art is drawn off the page): `n` frames,
 *  each one transparent pixel, so whatever frame is asked for draws nothing. */
export function placeholderAtlas(n: number): Atlas {
  const px = new Uint8Array(4), frame = { uv: [0, 0, 0, 0] as [number, number, number, number], w: 1, h: 1, pad: 0 };
  return { albedo: texture(px, 1, 1), normal: texture(new Uint8Array(4), 1, 1), frames: Array.from({ length: n }, () => frame), grounds: [] };
}
export const packAtlas = (sprites: Baked[], width = 2048): Atlas => atlasFromPixels(packPixels(sprites, width));
