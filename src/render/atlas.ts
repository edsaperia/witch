// Atlas pixels (from artBuild.ts) turned into a pair of textures, an albedo and a normal map,
// so a whole set of sprites draws as one instanced batch.
import * as THREE from "three";
import { packPixels, type AtlasPixels, type Baked, type Frame } from "./artBuild";

export type { Baked, Frame };
export interface Atlas { albedo: THREE.DataTexture; normal: THREE.DataTexture; frames: Frame[] }

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
