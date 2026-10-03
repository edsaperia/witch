// A batch of camera-facing sprites sharing one atlas, drawn as one instanced draw call.
// Each sprite stands on the ground at its base, faces the camera (tilted back toward it by
// spriteTilt), and is lit per pixel from its normal map. Tree tops carry a flag so the canopy
// can dither in and out as the witch rises and descends.
import * as THREE from "three";
import type { Atlas, Frame } from "./atlas";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

/** Shared by every sprite batch: the camera's right and (tilted) up, and the canopy fade. */
export const SPRITE_UNIFORMS = {
  uRight: { value: new THREE.Vector3(1, 0, 0) },
  uUp: { value: new THREE.Vector3(0, 1, 0) },
  uFacing: { value: new THREE.Vector3(0, 0, 1) },
  uTopFade: { value: 0 },
  // The hole in the canopy round the witch: her place on screen (pixels), radius and edge (pixels).
  uCutout: { value: new THREE.Vector4(0, 0, 0, 1) },
  // ?debug=cull: anything that has just appeared is tinted bright red.
  uDebugCull: { value: 0 },
  // The low-resolution picture's size in pixels: each sprite's base is snapped to its pixel grid.
  uRes: { value: new THREE.Vector2(1, 1) },
};

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform vec2 uRes;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec3 iFlags;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
void main() {
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags;
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  vec4 b = projectionMatrix * viewMatrix * vec4(iPos, 1.0);
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  gl_Position.xy += (snapped - ndc) * gl_Position.w;
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
${LIGHT_GLSL}
// 4x4 ordered dither, for fading the canopy in pixel-art style.
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void shade() {
  vec4 a = texture2D(uAlbedo, vUv);
  if (a.a < 0.5) discard;
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a dithered hole round the witch, which closes as she rises.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = smoothstep(uCutout.z - uCutout.w, uCutout.z, d);
    if (bayer(gl_FragCoord.xy) >= max(shown, uTopFade)) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, 1.0); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), 1.0); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(haze(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), vWorld), 1.0);
}
void main() {
  shade();
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld);
    if (k < 0.004) discard;
    gl_FragColor.a = k;
  }
}
`;

export interface SpriteInstance { x: number; y: number; z: number; frame: Frame; flip: boolean; top?: boolean; fresh?: boolean }

export class SpriteBatch {
  readonly mesh: THREE.Mesh;
  private geo: THREE.InstancedBufferGeometry;
  private pos: THREE.InstancedBufferAttribute;
  private size: THREE.InstancedBufferAttribute;
  private uvs: THREE.InstancedBufferAttribute;
  private flags: THREE.InstancedBufferAttribute;
  private capacity = 0;
  count = 0;

  /** metresPerPixel: world size of one art pixel. */
  constructor(readonly atlas: Atlas, readonly metresPerPixel: number, opts: { unlit?: boolean; onTop?: boolean; scenery?: boolean } = {}) {
    const quad = new THREE.PlaneGeometry(1, 1);
    quad.translate(0, 0.5, 0); // stand on the base
    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.pos = this.size = this.uvs = this.flags = undefined as never;
    this.grow(64);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...SPRITE_UNIFORMS, uAlbedo: { value: atlas.albedo }, uNormal: { value: atlas.normal }, uUnlit: { value: opts.unlit ? 1 : 0 }, uIsScenery: { value: opts.scenery ? 1 : 0 } },
      // Scenery blends where it fades out at the budget's edge. Custom blending, as three.js turns
      // normal blending off for opaque materials; it stays in the opaque pass, in its old order.
      ...(opts.scenery ? { blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor } : {}),
      depthTest: !opts.onTop, depthWrite: !opts.onTop,
    });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    if (opts.onTop) this.mesh.renderOrder = 10;
    if (opts.scenery) this.mesh.renderOrder = 0.5; // after the ground it fades over, before the shadows and mist
  }

  private grow(n: number): void {
    const cap = Math.max(n, this.capacity * 2);
    // Three.js caps an instanced draw at the instance count it saw the first time the geometry
    // was drawn; disposing it (which also frees the old buffers) makes it count again, or every
    // instance past the old capacity is silently not drawn.
    this.geo.dispose();
    const make = (k: number, old?: THREE.InstancedBufferAttribute) => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(cap * k), k);
      a.setUsage(THREE.DynamicDrawUsage);
      if (old) (a.array as Float32Array).set(old.array as Float32Array);
      return a;
    };
    this.pos = make(3, this.pos); this.size = make(2, this.size); this.uvs = make(4, this.uvs); this.flags = make(3, this.flags);
    this.geo.setAttribute("iPos", this.pos); this.geo.setAttribute("iSize", this.size);
    this.geo.setAttribute("iUv", this.uvs); this.geo.setAttribute("iFlags", this.flags);
    this.capacity = cap;
  }

  /** Replace every instance. */
  set(items: SpriteInstance[]): void {
    if (items.length > this.capacity) this.grow(items.length);
    const P = this.pos.array as Float32Array, S = this.size.array as Float32Array, U = this.uvs.array as Float32Array, F = this.flags.array as Float32Array;
    items.forEach((it, i) => {
      P[i * 3] = it.x; P[i * 3 + 1] = it.y; P[i * 3 + 2] = it.z;
      S[i * 2] = it.frame.w * this.metresPerPixel; S[i * 2 + 1] = it.frame.h * this.metresPerPixel;
      U.set(it.frame.uv, i * 4);
      F[i * 3] = it.flip ? 1 : 0; F[i * 3 + 1] = it.top ? 1 : 0; F[i * 3 + 2] = it.fresh ? 1 : 0;
    });
    for (const a of [this.pos, this.size, this.uvs, this.flags]) a.needsUpdate = true;
    this.count = items.length;
    this.geo.instanceCount = items.length;
    this.mesh.visible = items.length > 0;
  }

  /** Instances set but not drawn: three.js draws at most the count it last saw the buffers hold.
   *  Always 0 unless something is wrong; the view logs and counts it (stats.dropped). */
  get dropped(): number {
    const max = (this.geo as unknown as { _maxInstanceCount?: number })._maxInstanceCount;
    return max === undefined || !this.mesh.visible ? 0 : Math.max(0, this.count - max);
  }

  dispose(): void {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.atlas.albedo.dispose();
    this.atlas.normal.dispose();
  }
}
