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
  // The witch on screen (pixels: centre x, y, half width, half height) and her distance from the
  // camera, so whatever stands in front of her can fade; uOcc: fade opacity, soft edge (share of her size),
  // the height (m) above which a thing counts as tall, on (1) or off (0).
  uWitch: { value: new THREE.Vector4(0, 0, 0, 0) },
  uWitchDepth: { value: 0 },
  uOcc: { value: new THREE.Vector4(0.38, 6, 2.5, 1) },
  // The party's canopy uplight: the nearest partified areas (centre x, z, reach, fade-in) and their
  // colours; uUplight: strength, pulse, edge (m), the beat's phase (radians).
  uParty: { value: Array.from({ length: 16 }, () => new THREE.Vector4()) },
  uPartyCol: { value: Array.from({ length: 16 }, () => new THREE.Vector3()) },
  uPartyCount: { value: 0 },
  uUplight: { value: new THREE.Vector4() },
};

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform float uWitchDepth;
uniform vec4 uOcc;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec4 iFlags; // flip, top half, just appeared (debug), glow (0-1: white)
varying vec2 vUv;
varying vec3 vWorld;
varying vec4 vFlags;
varying float vFront;
void main() {
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(iPos, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
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
uniform float uDebugCull, uIsScenery, uAppear;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
uniform float uFlat; // lies flat on the ground (a court's decal): never stands in front of her
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec4 vFlags;
varying float vFront;
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
  // The witch's see-through silhouette: where she is hidden, a flat tint in her glow colour.
  if (uSilhouette.a > 0.0) { gl_FragColor = vec4(uSilhouette.rgb, uSilhouette.a); return; }
  // Things standing in front of the witch fade (smoothly) where they cover her: left out of the
  // opaque pass there and drawn in a second, see-through pass after her.
  // A soft circle round her body, a little bigger than her sprite: fully see-through at the
  // centre, easing smoothly to opaque at the edge (uOcc.y: how far the edge reaches, a share of it).
  float e = length(gl_FragCoord.xy - uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
  float occl = uFlat > 0.5 ? 0.0 : uOcc.w * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
  if (uFadePass > 0.5 ? occl <= 0.001 : occl > 0.001) discard;
  float alpha = uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0;
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a hole round the witch, which closes as she rises; its edge a smooth fade
    // (Ed: no dithering), or dithered steps with ?fx=pixel.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = max(smoothstep(uCutout.z - uCutout.w, uCutout.z, d), uTopFade);
    if (uSmooth > 0.5) { if (shown < 0.004) discard; alpha *= shown; }
    else if (bayer(gl_FragCoord.xy) >= shown) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, alpha); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, alpha); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), alpha); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  vec3 col = min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25);
  if (vFlags.y > 0.5 && uPartyCount > 0) {
    // Crowns over a party catch a faint glow from below, on their undersides and lower edges.
    vec3 up = vec3(0.0);
    for (int i = 0; i < 16; i++) {
      if (i >= uPartyCount) break;
      float d = length(vWorld.xz - uParty[i].xy), r = uParty[i].z;
      if (d > r) continue;
      float k = (0.35 + 0.65 * (1.0 - smoothstep(0.0, r * 0.5, d))) * (1.0 - smoothstep(r - uUplight.z, r, d)) * uParty[i].w;
      up = max(up, uPartyCol[i] * k);
    }
    float under = clamp(0.45 - N.y * 0.75, 0.0, 1.0);
    col += up * uUplight.x * (1.0 + uUplight.y * sin(uUplight.w)) * under;
  }
  gl_FragColor = vec4(haze(min(vec3(1.0), col), vWorld), alpha);
}
void main() {
  shade();
  // Glowing white (a party animal evolving), by vFlags.w.
  if (vFlags.w > 0.0 && uSilhouette.a <= 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vFlags.w);
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld) * uAppear; // and a set just drawn fades in
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;

export interface SpriteInstance { x: number; y: number; z: number; frame: Frame; flip: boolean; top?: boolean; fresh?: boolean; /** Drawn this much bigger (1 if left out). */ scale?: number; /** Glowing white, 0 to 1 (an evolving party animal). */ glow?: number }

export class SpriteBatch {
  readonly mesh: THREE.Mesh;
  /** Every mesh to add to the scene: the batch itself, plus its see-through pass (things in
   *  front of the witch, faded) or, for the witch, her silhouette where she's hidden. */
  readonly meshes: THREE.Mesh[];
  private geo: THREE.InstancedBufferGeometry;
  private pos: THREE.InstancedBufferAttribute;
  private size: THREE.InstancedBufferAttribute;
  private uvs: THREE.InstancedBufferAttribute;
  private flags: THREE.InstancedBufferAttribute;
  private capacity = 0;
  count = 0;

  /** metresPerPixel: world size of one art pixel. */
  constructor(readonly atlas: Atlas, readonly metresPerPixel: number, opts: { unlit?: boolean; onTop?: boolean; scenery?: boolean; fade?: boolean; flat?: boolean; silhouette?: { colour: THREE.Vector3; opacity: number } } = {}) {
    const quad = new THREE.PlaneGeometry(1, 1);
    quad.translate(0, 0.5, 0); // stand on the base
    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.pos = this.size = this.uvs = this.flags = undefined as never;
    this.grow(64);
    const uniforms = (extra: Record<string, THREE.IUniform>) => ({ ...LIGHT_UNIFORMS, ...SPRITE_UNIFORMS, uAlbedo: { value: atlas.albedo }, uNormal: { value: atlas.normal }, uUnlit: { value: opts.unlit ? 1 : 0 }, uIsScenery: { value: opts.scenery ? 1 : 0 }, uAppear: this.appearU, uFadePass: { value: 0 }, uFlat: { value: opts.flat ? 1 : 0 }, uSilhouette: { value: new THREE.Vector4(0, 0, 0, 0) }, ...extra });
    // Scenery blends where it fades out at the budget's edge. Custom blending, as three.js turns
    // normal blending off for opaque materials; it stays in the opaque pass, in its old order.
    const blend = opts.scenery ? { blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor } : {};
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({}), depthTest: !opts.onTop, depthWrite: !opts.onTop, ...blend });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    if (opts.onTop) this.mesh.renderOrder = 10;
    if (opts.scenery) this.mesh.renderOrder = 0.5; // after the ground it fades over, before the shadows and mist
    this.meshes = [this.mesh];
    if (opts.fade) {
      // Drawn after the witch (render order 10): the parts of tall things covering her, see-through.
      const fade = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uFadePass: { value: 1 } }), transparent: true, depthWrite: false }));
      fade.frustumCulled = false; fade.renderOrder = 11;
      this.meshes.push(fade);
    }
    if (opts.silhouette) {
      // Where she is hidden (behind something already drawn), a flat tint, so she's never lost.
      const c = opts.silhouette.colour, sil = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uSilhouette: { value: new THREE.Vector4(c.x, c.y, c.z, opts.silhouette.opacity) } }), transparent: true, depthWrite: false, depthFunc: THREE.GreaterDepth }));
      sil.frustumCulled = false; sil.renderOrder = 12;
      this.meshes.push(sil);
    }
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
    this.pos = make(3, this.pos); this.size = make(2, this.size); this.uvs = make(4, this.uvs); this.flags = make(4, this.flags);
    this.geo.setAttribute("iPos", this.pos); this.geo.setAttribute("iSize", this.size);
    this.geo.setAttribute("iUv", this.uvs); this.geo.setAttribute("iFlags", this.flags);
    this.capacity = cap;
  }

  /** Replace every instance. */
  /** Scenery batches: how far a set just drawn has faded in (0 to 1; the view eases it). */
  readonly appearU = { value: 1 };
  /** What was last set (for checks: the smoke test's floating-sprite check reads it). */
  items: SpriteInstance[] = [];

  set(items: SpriteInstance[]): void {
    this.items = items;
    if (items.length > this.capacity) this.grow(items.length);
    const P = this.pos.array as Float32Array, S = this.size.array as Float32Array, U = this.uvs.array as Float32Array, F = this.flags.array as Float32Array;
    items.forEach((it, i) => {
      P[i * 3] = it.x; P[i * 3 + 1] = it.y; P[i * 3 + 2] = it.z;
      const k = it.scale ?? 1;
      S[i * 2] = it.frame.w * this.metresPerPixel * k; S[i * 2 + 1] = it.frame.h * this.metresPerPixel * k;
      U.set(it.frame.uv, i * 4);
      F[i * 4] = it.flip ? 1 : 0; F[i * 4 + 1] = it.top ? 1 : 0; F[i * 4 + 2] = it.fresh ? 1 : 0; F[i * 4 + 3] = it.glow ?? 0;
    });
    for (const a of [this.pos, this.size, this.uvs, this.flags]) a.needsUpdate = true;
    this.count = items.length;
    this.geo.instanceCount = items.length;
    for (const m of this.meshes) m.visible = items.length > 0;
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
