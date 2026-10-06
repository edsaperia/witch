// Atlas pixels (from artBuild.ts) turned into a pair of textures, an albedo and a normal map,
// so a whole set of sprites draws as one instanced batch.
import * as THREE from "three";
import { packPixels, type AtlasPixels, type Baked, type Frame } from "./artBuild";

export type { Baked, Frame };
/** Where a witch frame's ground is (the art's `ground` and `shadow` anchors, art/witch.js liftShadow): the point under her on the
 *  model's ground and her shadow's size there, in the sprite's pixels. */
export interface FrameGround { x: number; y: number; w: number; d: number }
/** A witch sprite's ground from its anchors (art/witch.js liftShadow), or null. */
export function groundOf(anchors?: Record<string, number[]> | null): FrameGround | null {
  const g = anchors?.ground, s = anchors?.shadow;
  return g ? { x: g[0], y: g[1], w: s?.[0] ?? 0, d: s?.[1] ?? 0 } : null;
}
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

export const packAtlas = (sprites: Baked[], width = 2048): Atlas => atlasFromPixels(packPixels(sprites, width));
