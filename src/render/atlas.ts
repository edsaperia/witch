// Atlas pixels (from artBuild.ts) turned into a pair of textures, an albedo and a normal map,
// so a whole set of sprites draws as one instanced batch.
import * as THREE from "three";
import { groundOf, packPixels, type AtlasPixels, type Baked, type Frame, type FrameGround } from "./artBuild";
import { indexPlane, PALETTE_SIZE, planeBytes } from "./palette";
import { gpuKind, type GpuKind } from "./gpuLedger";
import { frostPalette } from "./fx/palette";

export type { Baked, Frame, FrameGround };
export { groundOf };
/** An atlas's textures: its albedo and normal planes, each either one byte a pixel (R8, an index) with its palette (256 by 1,
 *  RGBA) or RGBA as drawn with no palette (render/palette.ts); `indexed` says which (x the albedo, y the normal), as the shaders'
 *  uIndexed takes it (render/sprites.ts ATLAS_GLSL). */
export interface Atlas { albedo: THREE.DataTexture; normal: THREE.DataTexture; albedoPal: THREE.DataTexture; normalPal: THREE.DataTexture; indexed: THREE.Vector2; frames: Frame[]; /** each frame's ground (witches' atlases), or null */ grounds?: (FrameGround | null)[] }

/** Whether the atlases keep their pixels on the page after the GPU has them (`?pixels=keep`: the full smoke test reads them for its
 *  floating check). Otherwise each page's albedo and normal pixels are let go once uploaded: the churn hunt at Ed's spot
 *  (2026-10-13) found 360 MB of them held, growing 70 MB a minute as art was baked ahead, and that growth of memory outside
 *  the JavaScript heap is what made the browser stop for its big collections (100 ms and more), not the frames' own garbage. */
let keepPixels = false;
export function keepAtlasPixels(keep: boolean): void { keepPixels = keep; }
const freePixels = (t: THREE.Texture): void => { if (!keepPixels) (t.image as { data: Uint8Array | null }).data = null; t.onUpdate = null; }; // (once: three.js calls it after each upload)

/** An RGBA plane, or (red) an index plane: R8, its rows packed tight (three.js uploads it with texStorage2D, one level). */
function texture(data: Uint8Array, w: number, h: number, red = false): THREE.DataTexture {
  const t = new THREE.DataTexture(data, w, h, red ? THREE.RedFormat : THREE.RGBAFormat, THREE.UnsignedByteType);
  if (red) t.unpackAlignment = 1;
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.flipY = false;
  t.colorSpace = THREE.NoColorSpace;
  t.needsUpdate = true;
  t.onUpdate = freePixels;
  return t;
}

/** A palette's texture (its pixels kept: a kilobyte, and the CPU's readers of an atlas need it to read its indices). */
function paletteTexture(pal: Uint8Array): THREE.DataTexture {
  // Row zero and its alpha codes stay exact; row one is the temporary frost albedo.
  const t = new THREE.DataTexture(frostPalette(pal), PALETTE_SIZE, 2, THREE.RGBAFormat, THREE.UnsignedByteType);
  t.magFilter = t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false; t.flipY = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
  return t;
}
/** The palette bound for a plane that has none (RGBA): never read (uIndexed 0), one for every atlas. */
let noPalette: THREE.DataTexture | null = null;
const none = (): THREE.DataTexture => (noPalette ??= paletteTexture(new Uint8Array(PALETTE_SIZE * 4)));
/** One plane alone (outside a sprite atlas: the attack look's), indexed where it can be: its texture (R8 or RGBA, nearest), its
 *  palette (or the shared stand-in, never read) and whether it's indexed; the palette let go with it. */
export function indexedTexture(rgba: Uint8Array, w: number, h: number, kind: GpuKind): { tex: THREE.DataTexture; pal: THREE.DataTexture; indexed: boolean } {
  const ix = indexPlane(rgba), [tex, pal] = plane(ix?.idx ?? rgba, ix?.pal ?? null, w, h, kind);
  return { tex, pal, indexed: !!ix };
}

/** A plane's texture and its palette (or the shared stand-in); the palette let go with its plane. */
function plane(data: Uint8Array, pal: Uint8Array | null | undefined, w: number, h: number, kind: GpuKind): [THREE.DataTexture, THREE.DataTexture] {
  const t = gpuKind(texture(data, w, h, !!pal), kind);
  if (!pal) return [t, none()];
  const p = gpuKind(paletteTexture(pal), kind);
  t.addEventListener("dispose", () => p.dispose());
  return [t, p];
}

/** `kind`: the GPU ledger's row for its pages (render/gpuLedger.ts). */
export function atlasFromPixels(p: AtlasPixels, kind: GpuKind = "props"): Atlas {
  const [albedo, albedoPal] = plane(p.albedo, p.albedoPal, p.width, p.height, kind), [normal, normalPal] = plane(p.normal, p.normalPal, p.width, p.height, kind);
  return { albedo, normal, albedoPal, normalPal, indexed: new THREE.Vector2(p.albedoPal ? 1 : 0, p.normalPal ? 1 : 0), frames: p.frames };
}

/** What an atlas's textures take on the GPU, in bytes (each plane as it's stored, its palette with it): what the memory budget
 *  counts for art. */
export function atlasBytes(a: Atlas): number {
  const size = (t: THREE.DataTexture) => { const i = t.image as { width?: number; height?: number } | null; return [i?.width ?? 0, i?.height ?? 0]; };
  const [w, h] = size(a.albedo), [nw, nh] = size(a.normal);
  return planeBytes(w, h, a.indexed.x > 0.5) + planeBytes(nw, nh, a.indexed.y > 0.5) + (a.indexed.x > 0.5 ? 1024 : 0) + (a.indexed.y > 0.5 ? 1024 : 0);
}

/** The shaders' side of an indexed atlas: its planes' samplers (`a` the albedo, `n` the normal), their palettes and uIndexed
 *  declared, and albedoAt / normalAt, each texel's colour as drawn (looked up in its palette where its plane is indexed). An R8
 *  texel reads back as its index / 255 exactly, so the lookup lands on its own entry, and the palette's colour is the very value
 *  the RGBA plane held. */
export const atlasGlsl = (a = "uAlbedo", n = "uNormal"): string => /* glsl */ `
uniform sampler2D ${a}, ${n}, ${a}Pal, ${n}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${a}, q); return uIndexed.x > 0.5 ? texelFetch(${a}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${n}, q); return uIndexed.y > 0.5 ? texelFetch(${n}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`;
/** Those uniforms for an atlas (its planes under the names atlasGlsl was given). */
export const atlasUniforms = (atlas: Atlas, a = "uAlbedo", n = "uNormal"): Record<string, THREE.IUniform> => ({ [a]: { value: atlas.albedo }, [n]: { value: atlas.normal }, [a + "Pal"]: { value: atlas.albedoPal }, [n + "Pal"]: { value: atlas.normalPal }, uIndexed: { value: atlas.indexed } });
/** Point a material's uniforms (from atlasUniforms) at another atlas. */
export function setAtlasUniforms(u: Record<string, THREE.IUniform>, atlas: Atlas, a = "uAlbedo", n = "uNormal"): void {
  u[a].value = atlas.albedo; u[n].value = atlas.normal; u[a + "Pal"].value = atlas.albedoPal; u[n + "Pal"].value = atlas.normalPal; u.uIndexed.value = atlas.indexed;
}

/** A stand-in until a set arrives from the art workers (fast start (b): the start's own art is drawn off the page): `n` frames,
 *  each one transparent pixel, so whatever frame is asked for draws nothing. */
export function placeholderAtlas(n: number): Atlas {
  const px = new Uint8Array(4), frame = { uv: [0, 0, 0, 0] as [number, number, number, number], w: 1, h: 1, pad: 0 };
  return { albedo: texture(px, 1, 1), normal: texture(new Uint8Array(4), 1, 1), albedoPal: none(), normalPal: none(), indexed: new THREE.Vector2(0, 0), frames: Array.from({ length: n }, () => frame), grounds: [] };
}
export const packAtlas = (sprites: Baked[], width = 2048): Atlas => atlasFromPixels(packPixels(sprites, width));
