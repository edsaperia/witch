// The loading mist (Ed, 2026-10-24: "Mist sounds ideal, which rolls away when loading finishes. If loading starts with areas
// closer to the treehouse, this will look fine"; and "make the mist roll away progressively away from the treehouse instead of
// all at once"). While the island is still being drawn, every area type's areas lie under a low, glowing night mist thick enough
// that what's missing doesn't show. Since Ed, 2026-11-06 ("Make sure things load and render before the mist disappears, and mist
// should fade away smoothly over a few seconds not vanish"), a type's mist holds till its areas' trees, stumps, campfires and
// creatures' plain look are loaded and drawn (render/view/mistReady.ts: a linked program and a frame drawn with it, not just the
// art arrived); then it rolls back off them outward from the treehouse (render/loadingFront.ts), each spot thinning away over the
// `fade` knob's seconds as the front passes, dithered, and is gone for the night. A type drawn before the first frame of a load (not
// a sail's) never has any. Ed, the same day in October: "Maybe we can cheaply make the mist look awesome. Maybe it should also appear
// over the water and burn off there too": the sea round the island lies under it too (and any ground not filled in yet: it reads as
// the sea), thinning out to sea, held till the ground's own program (the coast's sand and waves) is drawn and the ground in view
// filled (it used to wait for all the land: Ed, 2026-11-06, "Coast (waves, sand) is urgent because we cross it first"); its top
// sheets catch the moon, its billows curl as they drift, a slow shimmer passes over it, its going is lit at the middle of its fade,
// and a few pixels there glitter as it burns off.
//
// Drawn as a few sheets stacked over the island's ground (one instanced draw, each sheet following the rolling ground and the
// bend as everything does), in the smooth effects layer (post.ts), premultiplied, hidden behind whatever the scene drew in front
// by its depth; each pixel reads its area's type from the ground's area texture and that type's front. Its alpha in a few hard
// steps, the game's pixel look. Hidden altogether once every type's mist is gone, so it costs nothing after the load.
import * as THREE from "three";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { frontAt, goneAt, FRONT_CLEAR, type LoadingMistTuning, type TypeReach } from "./loadingFront";
import { BAYER_GLSL } from "./shaders";
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
uniform float uSince[${slots}], uNear[${slots}]; // each type's seconds since its mist began to go (under 0: not yet), its nearest ground (m from the treehouse)
uniform vec4 uMist; // density, soft edge (m), noise size (m), the treehouse's x
uniform vec4 uRoll; // the front's speed (m/s), its cap (s), the fade (s), gone after (s)
uniform vec4 uSea; // the sea's seconds since it began to go (under 0: not yet), its nearest (m), the island's reach (m), how far out to sea it lies (m)
uniform float uHouseZ, uGlow;
uniform vec4 uScope;    // through the telescope (scope): where its scenery was listed round (x, z), how far out it's drawn (m), on (1)
uniform vec3 uScopeWedge; // and the wedge it was listed in: its bearing's direction (x, z) and the cosine of its half width (-2: all round)
varying vec3 vWorld;
varying float vLayer;
${LIGHT_GLSL}
${BAYER_GLSL}
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
  float since, near, thin = 1.0;
  if (area.a < 0.5) { since = uSea.x; near = uSea.y; thin = 1.0 - smoothstep(uSea.z, uSea.z + uSea.w, home); }
  else { int t = int(area.r * 255.0 + 0.5); since = uSince[t]; near = uNear[t]; }
  // Through the telescope, over what its picture has no trees for yet (render/view/scenery.ts scopeCover): past how far its scenery
  // is drawn round her, or outside the wedge it was listed in (Ed, 2026-11-12: "be covered in mist").
  vec2 se = p - uScope.xy;
  float sd = length(se), sOut = uScope.w > 0.5 && sd > 30.0 && dot(se / max(sd, 1e-3), uScopeWedge.xy) < uScopeWedge.z ? 1.0 : 0.0;
  if ((since >= uRoll.w || thin <= 0.0) && uScope.w < 0.5) discard;
  // Going (render/loadingFront.ts mistLeft): rolling back from the house (noise on the distance from it, drifting), and where the
  // front has passed, thinning away over the fade's seconds.
  float drift = uRealTime * 0.6;
  float n = vnoise((p + vec2(drift, drift * 0.4)) / uMist.z);
  float beyond = since >= uRoll.w || thin <= 0.0 ? 0.0 : 1.0;
  if (since >= 0.0 && beyond > 0.0) {
    float wait = min(uRoll.y, max(0.0, (home + (n - 0.5) * 2.0 * uMist.y - (near - 2.0 * uMist.y)) / max(uRoll.x, 1e-3)));
    beyond = uRoll.z > 0.0 ? clamp(1.0 - (since - wait) / uRoll.z, 0.0, 1.0) : step(since, wait);
  }
  // (the scope's own edge soft and broken up by the same noise, as the loading front's)
  float cover = beyond * thin;
  if (uScope.w > 0.5) cover = max(cover, max(sOut, smoothstep(uScope.z - uMist.y, uScope.z + uMist.y, sd + (n - 0.5) * 2.0 * uMist.y)));
  if (beyond <= 0.01 && cover <= 0.01) discard;
  // Each sheet's own billows (thicker low down), so the stack reads as a volume and its top as rolling cloud; their field slowly
  // warped by a larger noise, so they curl and turn as they drift rather than slide.
  float w = vnoise(p / (uMist.z * 2.2) + vec2(uRealTime * 0.03, 0.0)) * 6.2832;
  vec2 q = p + vec2(cos(w), sin(w)) * uMist.z * 0.35 + vec2(0.0, drift * 0.3);
  float b = vnoise(q / (uMist.z * 0.7) + vLayer * 17.0);
  float a = uMist.x * cover * mix(1.0, 0.55, vLayer) * mix(0.45, 1.0, smoothstep(0.25, 0.75, b));
  a = floor(a * 6.0 + ((uScope.w > 0.5 ? cover : beyond) < 1.0 ? bayer4(gl_FragCoord.xy) : 0.5)) / 6.0; // (in hard steps: the pixel look; thinning, dithered between them, so it fades smoothly)
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
  /** Each type's seconds since its mist began to go (-1: not yet; past goneAt: gone), and its nearest ground, for the shader. */
  private sinces: Float32Array;
  private nears: Float32Array;
  /** When each type's mist began to go, on the page's clock (s); a type whose art was in before the first frame (not a sail's: its
   *  shaders made and its frames drawn under the loading screen) never had any. */
  private began = new Map<number, number>();
  private gone = new Set<number>();
  private first = true;
  /** The sea's mist (over the sea round the island, out `sea` metres past its furthest ground, and over any ground not filled in yet):
   *  its reach, and when it began to go (once the ground's program, the coast's sand and waves, is drawn and the ground in view is
   *  filled: render/view.ts seaReady). */
  private seaReach: TypeReach;
  private seaAt: number | undefined;
  private seaGone = false;
  private islandR: number;
  /** Every type's mist gone. */
  done = false;

  constructor(private T: LoadingMistTuning, private reaches: Map<number, TypeReach>, house: { x: number; z: number }, extent: { minX: number; minZ: number; maxX: number; maxZ: number },
    areas: Record<string, THREE.IUniform>, depth: THREE.Texture | null, low: THREE.Vector2, slots: number) {
    this.sinces = new Float32Array(slots).fill(1e6); // (no area of that type: nothing to cover)
    this.nears = new Float32Array(slots);
    for (const [t, r] of reaches) if (t < slots) { this.sinces[t] = -1; this.nears[t] = r.near; }
    let near = Infinity, far = 0;
    for (const r of reaches.values()) { near = Math.min(near, r.near); far = Math.max(far, r.far); }
    this.islandR = far; this.seaReach = { near: Number.isFinite(near) ? near : 0, far: far + Math.max(0, T.sea) };
    this.seaGone = !(T.sea > 0);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: frag(slots),
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, ...areas, uDepth: { value: depth }, uLow: { value: low },
        uNoise: { value: noiseTexture() }, uSince: { value: this.sinces }, uNear: { value: this.nears }, uRoll: { value: new THREE.Vector4() },
        uSea: { value: new THREE.Vector4(this.seaGone ? 1e6 : -1, this.seaReach.near, this.islandR, Math.max(1, T.sea)) }, uMist: { value: new THREE.Vector4(T.density, T.soft, T.size, house.x) }, uHouseZ: { value: house.z }, uTop: { value: T.height }, uGlow: { value: T.glow },
        uScope: { value: new THREE.Vector4() }, uScopeWedge: { value: new THREE.Vector3(0, -1, -2) } },
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

  /** A frame: the page's clock (s); whether each type's areas are ready (render/view.ts mistReady: its trees, stumps, campfires and
   *  creatures loaded and drawn), and the sea (seaReady); `before`, on the first frame only: a type in before she's seen anything
   *  (a load's, not a sail's: the loading screen made and drew it), clear from the start. A type's mist holds till it's ready, then
   *  goes (rolling back from the treehouse, thinning away over `fade` seconds: render/loadingFront.ts mistLeft), never in one
   *  frame. Returns whether any mist is still showing. */
  update(now: number, ready: (t: number) => boolean, seaReady: () => boolean, before: (t: number) => boolean = () => false): boolean {
    if (this.done) return false;
    const T = this.T, gone = (r: TypeReach | undefined) => goneAt(r, T);
    let left = false;
    for (const [t, reach] of this.reaches) {
      if (t >= this.sinces.length || this.gone.has(t)) continue;
      if (!this.began.has(t)) { if (this.first && before(t)) this.began.set(t, -1e9); else if (ready(t)) this.began.set(t, now); }
      const at = this.began.get(t), since = at === undefined ? -1 : now - at;
      this.sinces[t] = since;
      if (since >= gone(reach)) { this.gone.add(t); this.sinces[t] = 1e6; } else left = true;
    }
    if (!this.seaGone) {
      if (this.seaAt === undefined) { if (this.first && before(-1)) this.seaAt = -1e9; else if (seaReady()) this.seaAt = now; }
      const since = this.seaAt === undefined ? -1 : now - this.seaAt, S = this.mat.uniforms.uSea.value as THREE.Vector4;
      if (since >= gone(this.seaReach)) { this.seaGone = true; S.x = 1e6; } else { S.x = since; left = true; }
    }
    this.first = false;
    const u = this.mat.uniforms.uMist.value as THREE.Vector4; // (read every frame: the pause page's sliders change them live)
    u.x = T.density; u.y = T.soft; u.z = T.size;
    (this.mat.uniforms.uRoll.value as THREE.Vector4).set(T.speed, T.cap, T.fade, 1e5);
    this.mat.uniforms.uTop.value = T.height; this.mat.uniforms.uGlow.value = T.glow;
    if (!left) { this.done = true; this.mesh.visible = false; }
    return left;
  }

  /** Through the telescope (Ed, 2026-11-12: missing trees "should be loaded during the loading screen, or if not, be covered in
   *  mist"): the mist over what its picture has no trees for yet, round (x, z) past `reach` metres and outside the wedge `heading`
   *  ± `half` degrees (half 180 or more: all round); null, none (the telescope down). Drawn whether or not the loading's is done. */
  scope(s: { x: number; z: number; reach: number; heading: number; half: number } | null): void {
    const u = this.mat.uniforms, S = u.uScope.value as THREE.Vector4, W = u.uScopeWedge.value as THREE.Vector3;
    if (!s) S.w = 0;
    else {
      const h = (s.heading * Math.PI) / 180;
      S.set(s.x, s.z, s.reach, 1); W.set(Math.sin(h), -Math.cos(h), s.half >= 180 ? -2 : Math.cos((s.half * Math.PI) / 180));
    }
    this.mesh.visible = !this.done || !!s;
  }

  /** When type `t`'s mist began to go (the page's clock, s; -1e9 clear from the start), or undefined: not yet. For the log. */
  beganAt(t: number): number | undefined { return this.began.get(t); }
  /** When the sea's began to go (as beganAt). */
  get seaBeganAt(): number | undefined { return this.seaAt; }
  /** Each type's front now (m from the treehouse; FRONT_CLEAR gone): for the tools and the log. */
  frontOf(t: number): number { const at = this.began.get(t), r = this.reaches.get(t); return this.gone.has(t) || !r ? FRONT_CLEAR : frontAt(r, at === undefined ? undefined : Math.max(0, this.sinces[t]), this.T); }
  /** The sea's front now (m from the treehouse; FRONT_CLEAR gone). */
  get seaFrontNow(): number { const S = this.mat.uniforms.uSea.value as THREE.Vector4; return this.seaGone ? FRONT_CLEAR : frontAt(this.seaReach, this.seaAt === undefined ? undefined : Math.max(0, S.x), this.T); }

  dispose(): void { this.mesh.geometry.dispose(); this.mat.dispose(); }
}
