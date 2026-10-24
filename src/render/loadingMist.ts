// The loading mist (Ed, 2026-10-24: "Mist sounds ideal, which rolls away when loading finishes. If loading starts with areas
// closer to the treehouse, this will look fine"; and "make the mist roll away progressively away from the treehouse instead of
// all at once"). While the island's trees are still being drawn (one set an area type, render/assets.ts), every area whose type
// isn't in lies under a low, glowing night mist thick enough that its missing trees don't show; when its art lands the mist rolls
// back off it outward from the treehouse (render/loadingFront.ts) and is gone for the night. A type drawn before the first frame
// she's seen (a revisit's, from the art cache) never has any.
//
// Drawn as a few sheets stacked over the island's ground (one instanced draw, each sheet following the rolling ground and the
// bend as everything does), in the smooth effects layer (post.ts), premultiplied, hidden behind whatever the scene drew in front
// by its depth; each pixel reads its area's type from the ground's area texture and that type's front. Its alpha in a few hard
// steps, the game's pixel look. Hidden altogether once every type's mist is gone, so it costs nothing after the load.
import * as THREE from "three";
import { VALUE_NOISE_GLSL } from "./shaders";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { cleared, fadeAt, frontAt, FRONT_CLEAR, type LoadingMistTuning, type TypeReach } from "./loadingFront";

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
uniform sampler2D uAreas, uDepth;
uniform vec4 uExtent;
uniform vec2 uLow;
uniform float uFront[${slots}], uFade[${slots}];
uniform vec4 uMist; // density, soft edge (m), noise size (m), the treehouse's x
uniform float uHouseZ, uGlow;
varying vec3 vWorld;
varying float vLayer;
${LIGHT_GLSL}
${VALUE_NOISE_GLSL}
void main() {
  if (gl_FragCoord.z > texture2D(uDepth, gl_FragCoord.xy / uLow).r) discard; // behind something the scene drew
  vec2 p = vWorld.xz;
  // Its area's type, from one look at the ground's area texture a few metres off by a hash (so where a cleared area meets a misted
  // one the mist breaks up over a few metres in pixels, not on the texture's grid), and that type's front: all before any noise,
  // so a cleared area costs a texture read (the frames' cost on a slow GPU: tools/mist/frames.cjs).
  vec2 j = fract(sin(vec2(dot(floor(p * 2.0), vec2(12.9898, 78.233)), dot(floor(p * 2.0), vec2(39.3468, 11.135)))) * 43758.5453) - 0.5;
  vec2 uv = (p + j * 12.0 - uExtent.xy) / uExtent.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) discard;
  vec4 area = texture2D(uAreas, uv);
  if (area.a < 0.5) discard; // (no area: the sea)
  int t = int(area.r * 255.0 + 0.5);
  float front = uFront[t];
  if (front >= ${FRONT_CLEAR.toFixed(1)}) discard;
  // The front: the mist beyond it, its edge rolling (noise on the distance from the house, drifting).
  float drift = uRealTime * 0.6;
  float n = vnoise((p + vec2(drift, drift * 0.4)) / uMist.z);
  float d = length(p - vec2(uMist.w, uHouseZ)) + (n - 0.5) * 2.0 * uMist.y;
  float beyond = smoothstep(front - uMist.y, front + uMist.y, d) * uFade[t];
  if (beyond <= 0.01) discard;
  // Each sheet's own billows (thicker low down), so the stack reads as a volume and its top as rolling cloud.
  float b = vnoise(p / (uMist.z * 0.7) + vLayer * 17.0 + vec2(0.0, drift * 0.3));
  float a = uMist.x * beyond * mix(1.0, 0.55, vLayer) * mix(0.45, 1.0, smoothstep(0.25, 0.75, b));
  a = floor(a * 6.0 + 0.5) / 6.0; // (in hard steps: the pixel look)
  if (a <= 0.01) discard;
  vec3 col = mix(uHazeColour * 2.2, uMoon * 0.95 + uAmb * 1.1, 0.55) + vec3(0.02, 0.05, 0.06) * (1.0 - vLayer); // (a faint glow low down)
  col *= 1.0 + 2.4 * beyond * (1.0 - beyond); // (its rolling edge lit a little brighter)
  col *= uGlow;
  gl_FragColor = vec4(col * a, a); // premultiplied
}`;

export class LoadingMist {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;
  private fronts: Float32Array;
  private fades: Float32Array;
  /** Each type's art landing, on the page's clock (s); a type drawn before the first frame is clear from the start. */
  private landed = new Map<number, number>();
  private first = true;
  /** Every type's mist gone. */
  done = false;

  constructor(private T: LoadingMistTuning, private reaches: Map<number, TypeReach>, house: { x: number; z: number }, extent: { minX: number; minZ: number; maxX: number; maxZ: number },
    areas: { value: THREE.Texture }, areaExtent: { value: THREE.Vector4 }, depth: THREE.Texture | null, low: THREE.Vector2, slots: number) {
    this.fronts = new Float32Array(slots).fill(FRONT_CLEAR);
    this.fades = new Float32Array(slots).fill(1);
    for (const t of reaches.keys()) if (t < slots) this.fronts[t] = frontAt(reaches.get(t), undefined, T);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: frag(slots),
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uAreas: areas, uExtent: areaExtent, uDepth: { value: depth }, uLow: { value: low },
        uFront: { value: this.fronts }, uFade: { value: this.fades }, uMist: { value: new THREE.Vector4(T.density, T.soft, T.size, house.x) }, uHouseZ: { value: house.z }, uTop: { value: T.height }, uGlow: { value: T.glow } },
      depthWrite: false, depthTest: false, transparent: true,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    // One sheet over the whole island (the telescope sees its far side), in steps fine enough for the bend and the hills.
    const w = extent.maxX - extent.minX, d = extent.maxZ - extent.minZ, steps = Math.min(160, Math.max(32, Math.round(Math.max(w, d) / 16)));
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

  /** A frame: the page's clock (s) and each type's art: 0 not in, 1 drawn, 2 from the art cache (a revisit's: clear at once, never rolled,
   *  as one drawn before the first frame). Returns whether any mist is still showing. */
  update(now: number, drawn: (t: number) => number): boolean {
    if (this.done) return false;
    let left = false;
    for (const [t, reach] of this.reaches) {
      if (t >= this.fronts.length || cleared(this.fronts[t])) continue;
      const k = this.landed.has(t) ? 0 : drawn(t);
      if (k) this.landed.set(t, this.first || k === 2 ? -1e9 : now); // (in before she's seen anything, or kept from a visit before: clear already)
      const at = this.landed.get(t);
      const since = at === undefined ? undefined : now - at;
      this.fronts[t] = frontAt(reach, since, this.T); this.fades[t] = fadeAt(since, this.T);
      if (!cleared(this.fronts[t])) left = true;
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

  dispose(): void { this.mesh.geometry.dispose(); this.mat.dispose(); }
}
