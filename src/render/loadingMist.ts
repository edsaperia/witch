// The loading mist (Ed, 2026-10-24: "Mist sounds ideal, which rolls away when loading finishes. If loading starts with areas
// closer to the treehouse, this will look fine"; and "make the mist roll away progressively away from the treehouse instead of
// all at once"). While the island's trees are still being drawn (one set an area type, render/assets.ts), every area whose type
// isn't in lies under a low, glowing night mist thick enough that its missing trees don't show; when its art lands the mist rolls
// back off it outward from the treehouse (render/loadingFront.ts) and is gone for the night. A type drawn before the first frame
// she's seen (a revisit's, from the art cache) never has any. Ed, the same day: "Maybe we can cheaply make the mist look awesome.
// Maybe it should also appear over the water and burn off there too": the sea round the island lies under it too, thinning out
// to sea, and burns off last, as its own front once the land's all in (so a dive in from the sea comes over it, and the island
// comes out of the mist before the water does); its top sheets catch the moon, its billows curl as they drift, a slow shimmer
// passes over it, its rolling front's edge is lit, and a few pixels of that edge glitter as it burns off.
//
// Drawn as a few sheets stacked over the island's ground (one instanced draw, each sheet following the rolling ground and the
// bend as everything does), in the smooth effects layer (post.ts), premultiplied, hidden behind whatever the scene drew in front
// by its depth; each pixel reads its area's type from the ground's area texture and that type's front. Its alpha in a few hard
// steps, the game's pixel look. Hidden altogether once every type's mist is gone, so it costs nothing after the load.
import * as THREE from "three";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { cleared, fadeAt, frontAt, FRONT_CLEAR, FRONT_FULL, type LoadingMistTuning, type TypeReach } from "./loadingFront";
import { AREA_GLSL } from "./areaWindow";

const VERT = /* glsl */ `
attribute float aLayer; // 0 the lowest sheet .. 1 the top
uniform float uTop;
varying vec3 vWorld;
varying float vLayer;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = onGround((modelMatrix * vec4(position.x, mix(0.6, uTop, aLayer), position.z, 1.0)).xyz);
  vWorld = w; vLayer = aLayer;
  gl_Position = clipOf(w);
}`;

const frag = (slots: number) => /* glsl */ `
uniform sampler2D uDepth;
${AREA_GLSL}
uniform vec2 uLow;
uniform float uFront[${slots}], uFade[${slots}];
uniform vec4 uMist; // density, soft edge (m), noise size (m), the treehouse's x
uniform vec4 uSea; // the sea's front (m from the treehouse), its fade, the island's reach (m), how far out to sea it lies (m)
uniform float uHouseZ, uGlow;
varying vec3 vWorld;
varying float vLayer;
${LIGHT_GLSL}
uniform sampler2D uNoise;
// Value noise from a small tiling texture (one read, eased between its cells by the sampler), not worked out a pixel at a time:
// on a slow GPU the hashing was most of the mist's cost (tools/mist/frames.cjs, timer queries round the effects layer).
float vnoise(vec2 p) { return texture2D(uNoise, p / ${NOISE}.0).r; }
// A cell's own random value, 0 to 1 (the texel's middle: no easing).
float cellHash(vec2 c) { return texture2D(uNoise, (c + 0.5) / ${NOISE}.0).r; }
void main() {
  if (gl_FragCoord.z > texture2D(uDepth, gl_FragCoord.xy / uLow).r) discard; // behind something the scene drew
  vec2 p = vWorld.xz;
  float home = length(p - vec2(uMist.w, uHouseZ));
  // Its area's type, from one look at the ground's area texture a few metres off by a hash (so where a cleared area meets a misted
  // one the mist breaks up over a few metres in pixels, not on the texture's grid), and that type's front: all before any noise,
  // so a cleared area costs a texture read (the frames' cost on a slow GPU: tools/mist/frames.cjs). Off the areas, the sea: its own
  // front, thinning out to sea.
  vec2 j = vec2(cellHash(floor(p * 2.0)), cellHash(floor(p * 2.0) + 31.0)) - 0.5;
  vec4 area = areaAt(p + j * 12.0); // (render/areaWindow.ts: nothing, the sea's, beyond the windows round her)
  float front, fade, thin = 1.0;
  if (area.a < 0.5) { front = uSea.x; fade = uSea.y; thin = 1.0 - smoothstep(uSea.z, uSea.z + uSea.w, home); }
  else { int t = int(area.r * 255.0 + 0.5); front = uFront[t]; fade = uFade[t]; }
  if (front >= ${FRONT_CLEAR.toFixed(1)} || thin <= 0.0) discard;
  // The front: the mist beyond it, its edge rolling (noise on the distance from the house, drifting).
  float drift = uRealTime * 0.6;
  float n = vnoise((p + vec2(drift, drift * 0.4)) / uMist.z);
  float beyond = smoothstep(front - uMist.y, front + uMist.y, home + (n - 0.5) * 2.0 * uMist.y) * fade;
  if (beyond <= 0.01) discard;
  // Each sheet's own billows (thicker low down), so the stack reads as a volume and its top as rolling cloud; their field slowly
  // warped by a larger noise, so they curl and turn as they drift rather than slide.
  float w = vnoise(p / (uMist.z * 2.2) + vec2(uRealTime * 0.03, 0.0)) * 6.2832;
  vec2 q = p + vec2(cos(w), sin(w)) * uMist.z * 0.35 + vec2(0.0, drift * 0.3);
  float b = vnoise(q / (uMist.z * 0.7) + vLayer * 17.0);
  float a = uMist.x * beyond * thin * mix(1.0, 0.55, vLayer) * mix(0.45, 1.0, smoothstep(0.25, 0.75, b));
  a = floor(a * 6.0 + 0.5) / 6.0; // (in hard steps: the pixel look)
  if (a <= 0.01) discard;
  // The low sheets the night's blue, a faint glow in them; the top's billows catching the moon.
  float lit = vLayer * smoothstep(0.45, 0.9, b);
  vec3 col = mix(uHazeColour * 2.0 + vec3(0.02, 0.05, 0.06), uMoon * 1.25 + uAmb, 0.35 + 0.55 * lit);
  float edge = beyond * (1.0 - beyond) * 4.0; // (1 in the middle of the rolling front)
  col += edge * vec3(0.32, 0.26, 0.46); // (the front's edge catching the light, pale violet)
  col *= 1.0 + 0.08 * sin(dot(p, vec2(0.021, 0.013)) - uRealTime * 0.7); // (a slow shimmer passing over)
  col = floor(col * uGlow * 8.0 + 0.5) / 8.0; // (its light in hard steps too)
  // As it burns off, a few pixels of the top sheet's edge glitter, each a moment.
  float spark = step(0.985, cellHash(floor(p * 0.75) + floor(uRealTime * 6.0) * vec2(17.0, 29.0))) * step(0.3, edge) * step(0.99, vLayer);
  gl_FragColor = vec4(col * a + spark * vec3(0.9, 0.85, 1.0), a); // premultiplied (the glitter added on)
}`;

/** The noise texture's side (texels: one a noise cell, tiling). */
const NOISE = 64;
let noiseTex: THREE.DataTexture | null = null;
/** The value noise's cells, made once (seeded: the same everywhere). */
function noiseTexture(): THREE.DataTexture {
  if (noiseTex) return noiseTex;
  const d = new Uint8Array(NOISE * NOISE * 4);
  let s = 0x9e3779b9;
  for (let i = 0; i < NOISE * NOISE; i++) { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; d[i * 4] = (s >>> 0) & 255; d[i * 4 + 3] = 255; }
  const t = (noiseTex = new THREE.DataTexture(d, NOISE, NOISE));
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.magFilter = t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
  return t;
}

export class LoadingMist {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;
  private fronts: Float32Array;
  private fades: Float32Array;
  /** Each type's art landing, on the page's clock (s); a type drawn before the first frame is clear from the start. */
  private landed = new Map<number, number>();
  private first = true;
  /** The sea's mist: its reach (from the island's near ground to `sea` past its furthest), and when the last of the land's art
   *  landed (its front sets off then: the island comes out of the mist first, then the sea clears). */
  private seaReach: TypeReach;
  private seaAt: number | undefined;
  private seaFront = FRONT_CLEAR;
  private islandR: number;
  /** Every type's mist gone. */
  done = false;

  constructor(private T: LoadingMistTuning, private reaches: Map<number, TypeReach>, house: { x: number; z: number }, extent: { minX: number; minZ: number; maxX: number; maxZ: number },
    areas: Record<string, THREE.IUniform>, depth: THREE.Texture | null, low: THREE.Vector2, slots: number) {
    this.fronts = new Float32Array(slots).fill(FRONT_CLEAR);
    this.fades = new Float32Array(slots).fill(1);
    for (const t of reaches.keys()) if (t < slots) this.fronts[t] = frontAt(reaches.get(t), undefined, T);
    let near = Infinity, far = 0;
    for (const r of reaches.values()) { near = Math.min(near, r.near); far = Math.max(far, r.far); }
    this.islandR = far; this.seaReach = { near: Number.isFinite(near) ? near : 0, far: far + Math.max(0, T.sea) };
    this.seaFront = T.sea > 0 ? FRONT_FULL : FRONT_CLEAR;
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: frag(slots),
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, ...areas, uDepth: { value: depth }, uLow: { value: low },
        uNoise: { value: noiseTexture() }, uFront: { value: this.fronts }, uFade: { value: this.fades }, uSea: { value: new THREE.Vector4(this.seaFront, 1, this.islandR, Math.max(1, T.sea)) }, uMist: { value: new THREE.Vector4(T.density, T.soft, T.size, house.x) }, uHouseZ: { value: house.z }, uTop: { value: T.height }, uGlow: { value: T.glow } },
      depthWrite: false, depthTest: false, transparent: true,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    // One sheet over the whole island (the telescope sees its far side) and the sea round it, in steps fine enough for the bend and
    // the hills.
    const sea = Math.max(0, T.sea), w = extent.maxX - extent.minX + 2 * sea, d = extent.maxZ - extent.minZ + 2 * sea, steps = Math.min(40, Math.max(16, Math.round(Math.max(w, d) / 64)));
    const base = new THREE.PlaneGeometry(w, d, steps, steps).rotateX(-Math.PI / 2), geo = new THREE.InstancedBufferGeometry();
    geo.setIndex(base.getIndex()); geo.setAttribute("position", base.getAttribute("position"));
    const n = Math.max(1, Math.round(T.layers)), layer = new Float32Array(n);
    for (let i = 0; i < n; i++) layer[i] = n > 1 ? i / (n - 1) : 0;
    geo.setAttribute("aLayer", new THREE.InstancedBufferAttribute(layer, 1));
    geo.instanceCount = n;
    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.position.set((extent.minX + extent.maxX) / 2, 0, (extent.minZ + extent.maxZ) / 2);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 3; // (over the low mist)
  }

  /** A frame: the page's clock (s) and whether each type's art is in. A type in before the first frame (a revisit's, from the art
   *  cache) has no mist; one that lands later rolls back as any does, from the cache or not (cleared at once, mist on screen would
   *  vanish: the dive, where the sail's bake ahead fills the cache as she flies in). Returns whether any mist is still showing. */
  update(now: number, drawn: (t: number) => boolean): boolean {
    if (this.done) return false;
    let left = false;
    for (const [t, reach] of this.reaches) {
      if (t >= this.fronts.length || cleared(this.fronts[t])) continue;
      if (!this.landed.has(t) && drawn(t)) this.landed.set(t, this.first ? -1e9 : now); // (in before she's seen anything: clear already)
      const at = this.landed.get(t);
      const since = at === undefined ? undefined : now - at;
      this.fronts[t] = frontAt(reach, since, this.T); this.fades[t] = fadeAt(since, this.T);
      if (!cleared(this.fronts[t])) left = true;
    }
    // The sea: once the land's all in (or with no sea mist), its own front out from the treehouse; in before the first frame, clear.
    if (!cleared(this.seaFront)) {
      if (this.seaAt === undefined && !left) this.seaAt = this.first ? -1e9 : now;
      const since = this.seaAt === undefined ? undefined : now - this.seaAt;
      this.seaFront = frontAt(this.seaReach, since, this.T);
      const S = this.mat.uniforms.uSea.value as THREE.Vector4;
      S.x = this.seaFront; S.y = fadeAt(since, this.T);
      if (!cleared(this.seaFront)) left = true;
    }
    this.first = false;
    const u = this.mat.uniforms.uMist.value as THREE.Vector4; // (read every frame: the pause page's sliders change them live)
    u.x = this.T.density; u.y = this.T.soft; u.z = this.T.size;
    this.mat.uniforms.uTop.value = this.T.height; this.mat.uniforms.uGlow.value = this.T.glow;
    if (!left) { this.done = true; this.mesh.visible = false; }
    return left;
  }

  /** Each type's front now (m from the treehouse; FRONT_CLEAR gone): for the tools and the log. */
  frontOf(t: number): number { return this.fronts[t] ?? FRONT_CLEAR; }
  /** The sea's front now (m from the treehouse; FRONT_CLEAR gone). */
  get seaFrontNow(): number { return this.seaFront; }

  dispose(): void { this.mesh.geometry.dispose(); this.mat.dispose(); }
}
