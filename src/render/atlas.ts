// Atlas pixels (from artBuild.ts) turned into a pair of textures, an albedo and a normal map,
// so a whole set of sprites draws as one instanced batch.
import * as THREE from "three";
import { groundOf, packPixels, type AtlasPixels, type Baked, type Frame, type FrameGround } from "./artBuild";

export type { Baked, Frame, FrameGround };
export { groundOf };
export interface Atlas { albedo: THREE.DataTexture; normal: THREE.DataTexture; frames: Frame[]; /** each frame's ground (witches' atlases), or null */ grounds?: (FrameGround | null)[] }

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

export function atlasFromPixels(p: AtlasPixels): Atlas {
  return { albedo: texture(p.albedo, p.width, p.height), normal: texture(p.normal, p.width, p.height), frames: p.frames };
}

/** A stand-in until a set arrives from the art workers (fast start (b): the start's own art is drawn off the page): `n` frames,
 *  each one transparent pixel, so whatever frame is asked for draws nothing. */
export function placeholderAtlas(n: number): Atlas {
  const px = new Uint8Array(4), frame = { uv: [0, 0, 0, 0] as [number, number, number, number], w: 1, h: 1, pad: 0 };
  return { albedo: texture(px, 1, 1), normal: texture(new Uint8Array(4), 1, 1), frames: Array.from({ length: n }, () => frame), grounds: [] };
}
export const packAtlas = (sprites: Baked[], width = 2048): Atlas => atlasFromPixels(packPixels(sprites, width));
