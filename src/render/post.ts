// After the scene is drawn: a gentle bloom on bright, glowing things (the witch's glow, magic,
// flowers, eye glints), and a tilt-shift blur toward the top and bottom of the screen so the
// forest looks like a miniature (Ed, 2026-10-03, after Transistor and Octopath Traveler).
//
// The scene is always drawn at the low resolution (window size / pixel size). The tilt-shift
// runs either "before" the pixels are scaled up (blurring whole art pixels, at low resolution)
// or "after" (on the scaled-up image, at full resolution, so the pixel edges themselves blur).
import * as THREE from "three";
import { gradeInto, moodOf } from "./mood";
import { runSync, type Steps } from "./slices";
import { hsv2rgb } from "../../art/generator.js";
import { potionBloom, potionLevels, miniatureTilt } from "./potionEffects";
import { potionSettings } from "../rules/potionSettings";

/** The camera layer the house's own meshes are on as well as the scene's (its rooms, the Ent's art, her): drawn alone behind the
 *  enclosed rooms (Post.behind). */
export const HOUSE_LAYER = 1;

export interface PostTuning { light?: import("../rules/tuning").Tuning["light"];
  suspects: { effectsLayer: boolean; showBroken: boolean };
  bloom: { on: boolean; strength: number; threshold: number };
  tone: { black: number; gamma: number; ambient: number };
  tiltShift: { on: boolean; /** The share of the blur the sky takes (Ed, 2026-10-06: "lessen the tilt-shift effect until you can see the stars", "the stars don't have to be crisp, just perceptible"); 1 as the ground. */ skyBlur?: number; /** Her sigil stack kept out of it, sharp at any height (Ed, 2026-10-27: Post.sharp); default on. */ stackSharp?: boolean; strength: number; band: number; centre: number; /** Over the treetops (Ed, v160: stronger there), blended in by lift. */ treetop: { strength: number; band: number } };
}

const VERT = "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";

const BRIGHT = /* glsl */ `
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`;

const BLUR = /* glsl */ `
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`;

// The forest behind the treehouse's enclosed rooms (Ed, 2026-10-23: render.behind): black over the picture, opened from a point
// (the doorway she came through, uAt in uv; none: the whole picture at once) out to uR (in heights of the picture), uSoft its edge.
const VEIL = /* glsl */ `
uniform vec2 uAt; uniform float uR, uSoft, uAspect, uAll, uK; varying vec2 vUv;
void main() {
  float d = length((vUv - uAt) * vec2(uAspect, 1.0));
  float a = uAll > 0.5 ? 1.0 - uK : smoothstep(uR - uSoft, uR, d);
  gl_FragColor = vec4(0.0, 0.0, 0.0, a);
}`;

// Scene (sampled as whole low-res pixels), the smooth effects layer (sampled smoothly) and bloom.
/** How much of the grade her light's pool is spared at its centre (0 none, 1 all). */
const POOL_SPARE = 0.8;

const COMPOSITE = /* glsl */ `
uniform vec4 uPotionStyle; // saturation boost, edges, edge threshold, edge upper threshold
uniform float uPotionBackground, uPotionTime;
uniform vec4 uPotionWobble; // amplitude in art pixels, speed, wave size, edge reach
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn, uKoDim, uBroken, uPotionFade; uniform vec4 uGrade, uPool, uIris, uIris2; uniform vec3 uGradeTint; varying vec2 vUv;
float edgeLuma(vec2 p) { return dot(texture2D(uScene, p).rgb, vec3(0.3, 0.55, 0.15)); }
float potionEdge(vec2 p) {
  vec2 d = 1.0 / uLow;
  float tl = edgeLuma(p + d * vec2(-1.0, 1.0)), tc = edgeLuma(p + d * vec2(0.0, 1.0)), tr = edgeLuma(p + d);
  float ml = edgeLuma(p + d * vec2(-1.0, 0.0)), mr = edgeLuma(p + d * vec2(1.0, 0.0));
  float bl = edgeLuma(p - d), bc = edgeLuma(p + d * vec2(0.0, -1.0)), br = edgeLuma(p + d * vec2(1.0, -1.0));
  return smoothstep(uPotionStyle.z, max(uPotionStyle.z + 0.001, uPotionStyle.w), length(vec2(tr + 2.0 * mr + br - tl - 2.0 * ml - bl, tl + 2.0 * tc + tr - bl - 2.0 * bc - br)));
}
float irisHash(float n) { return fract(sin(n * 91.345) * 47453.21); }
// The knockout's iris and its record at a pixel q from its centre (low-res pixels), over the picture's colour there.
vec3 irisShade(vec2 q, vec3 base) {
  float d = length(q), R = uIris.z * uLow.y;
  if (d > R) return base * (1.0 - uIris.w);
  if (uIris2.y <= 0.0) return base;
  float L = max(3.0, uIris2.w * uLow.y), a = fract(atan(q.y, q.x) / 6.2831853 - uIris2.x), sector = floor(a * 16.0) / 16.0;
  vec3 rec;
  if (d < 1.5) rec = vec3(0.04); // the spindle
  else if (d < L) { rec = vec3(1.0, 0.31, 0.78) * (0.82 + 0.18 * step(0.5, fract(sector * 2.0))); if (sector < 0.07 && d > L * 0.3) rec = vec3(1.0, 0.96, 0.9); } // the label, pink, its white mark turning
  else if (d < L + 1.0) rec = vec3(0.02); // the label's edge
  else { rec = vec3(0.08, 0.07, 0.1) + 0.06 * step(1.0, mod(floor(d), 3.0)); if (abs(fract(a + 0.25) - 0.5) < 0.05 || abs(fract(a + 0.75) - 0.5) < 0.05) rec += 0.2; } // the vinyl, its grooves, the light's sheen across it
  if (d > R - 1.0) rec = vec3(0.02); // its rim
  return mix(base, rec, uIris2.y);
}
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  if (uPotionWobble.x > 0.0 && uPotionWobble.w > 0.0) {
    float edge = smoothstep(1.0 - uPotionWobble.w, 1.0, max(abs(vUv.x * 2.0 - 1.0), abs(vUv.y * 2.0 - 1.0)));
    vec2 wave = sin(vec2(vUv.y, vUv.x) * (6.2831853 / uPotionWobble.z) + uPotionTime * uPotionWobble.y + vec2(0.0, 1.7));
    p = clamp(p + wave * edge * uPotionWobble.x / uLow, 0.5 / uLow, 1.0 - 0.5 / uLow);
  }
  vec3 c = texture2D(uScene, p).rgb;
  // (the circle hunt: a scene pixel that's not a number, infinite or negative shows red, magenta or yellow)
  if (uBroken > 0.5) { bool nan = !(c.r == c.r) || !(c.g == c.g) || !(c.b == c.b) || any(isnan(c)); if (nan) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; } if (any(isinf(c)) || max(c.r, max(c.g, c.b)) > 60000.0) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; } if (min(c.r, min(c.g, c.b)) < 0.0) { gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); return; } }
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  // The mood's grade (render/mood.ts; spooky): the dark and middle tones drained of colour toward
  // the grade's tint (deep blue-green, violet), the bright left as they are, so the party's lights and
  // her glow stay warm in a cold wood. x: amount, y: how much colour goes, z: the brightness above
  // which nothing is graded.
  if (uGrade.x > 0.0) {
    float l = dot(c, vec3(0.3, 0.55, 0.15));
    // Her light's pool spared (uPool: its centre and half-widths on screen; render/view.ts), so her warm light still shows
    // on a dark floor (the art director's round 3: in the fern forest "her light doesn't show").
    float pool = uPool.z > 0.0 ? 1.0 - smoothstep(0.35, 1.0, length((vUv - uPool.xy) / uPool.zw)) : 0.0;
    c = mix(c, mix(c, vec3(l), uGrade.y) * uGradeTint, uGrade.x * (1.0 - smoothstep(0.0, uGrade.z, l)) * (1.0 - ${POOL_SPARE.toFixed(2)} * pool));
  }
  c += texture2D(uBloom, uPotionWobble.x > 0.0 ? p : vUv).rgb * uBloomStrength;
  if (uPotionStyle.x != 0.0) c = max(vec3(0.0), mix(vec3(dot(c, vec3(0.3, 0.55, 0.15))), c, 1.0 + uPotionStyle.x));
  if (uPotionStyle.y > 0.0) {
    float edge = potionEdge(p);
    vec3 tint = 0.25 + 0.75 * (0.5 + 0.5 * cos(vec3(0.0, 2.1, 4.2) + (vUv.x + vUv.y) * 7.0));
    c = mix(c, c * uPotionBackground + tint * edge, uPotionStyle.y);
  }
  // Knocked down with her hat on (Ed, 2026-10-07): the rest of the screen dims, her spot and her hat floating down left lit
  // (round her light's pool, uPool, and well above it, where the hat starts).
  if (uKoDim > 0.0) { vec2 q = (vUv - uPool.xy - vec2(0.0, 0.06)) * vec2(uLow.x / uLow.y, 1.0); c *= 1.0 - uKoDim * smoothstep(0.12, 0.32, uPool.z > 0.0 ? length(q) : 9.0); } // (her spot lit: about a tenth of the screen's height round her, a little above her feet)
  // The iris (render/koIris.ts): uIris its centre on screen, its radius (a share of the screen's height) and how dark outside;
  // uIris2 the record's turn, how far it shows, the rewind smear, and its label's radius. All by whole low-res pixels, so it reads
  // at any px. The smear drags the picture (the record) backwards in bands of rows for a few frames at the cut.
  if (uIris.z > 0.0) {
    vec2 q = floor(vUv * uLow) + 0.5 - uIris.xy * uLow;
    if (uIris2.z > 0.0) {
      float row = floor(vUv.y * uLow.y / 3.0), sh = floor((3.0 + irisHash(row + floor(uIris2.x * 9.0)) * 14.0) * uIris2.z);
      vec3 s = vec3(0.0); for (int i = 0; i < 4; i++) s += irisShade(q + vec2(float(i) * sh, 0.0), c);
      c = s * 0.25;
      if (mod(floor(vUv.y * uLow.y), 2.0) < 1.0) c *= 1.0 - 0.3 * uIris2.z; // (scanlines, a tape winding back)
    } else c = irisShade(q, c);
  }
  gl_FragColor = vec4(min(c, vec3(1.0)) * (1.0 - uPotionFade), 1.0);
}`;

// One direction of the tilt-shift: the blur grows with distance from the sharp band.
const TILT = /* glsl */ `
uniform sampler2D uSrc, uDepth, uSharp; uniform vec2 uTexel, uDir; uniform float uStrength, uBand, uCentre, uSkyBlur, uSharpOn; varying vec2 vUv;
void main() {
  // The sky over the bend (nothing drawn there: the far plane) is blurred with everything else, as
  // the last pass over the finished, bent image (Ed, round 12: "the tilt shift effect has to be applied
  // after the bend shader").
  float d = max(0.0, abs(vUv.y - uCentre) - uBand * 0.5) / max(0.05, 0.5 - uBand * 0.5);
  // The sky (nothing drawn there: the far plane) takes only uSkyBlur of it, so its stars stay perceptible, softly.
  float r = uStrength * smoothstep(0.0, 1.0, d) * (texture2D(uDepth, vUv).r >= 0.99999 ? uSkyBlur : 1.0);
  // Her sigil stack (Post.sharp's mask) is left as drawn, and kept out of the blur round it, as if drawn over the blurred picture.
  bool sharp = uSharpOn > 0.5;
  if (r < 0.35 || (sharp && texture2D(uSharp, vUv).a > 0.5)) { gl_FragColor = texture2D(uSrc, vUv); return; }
  vec3 c = vec3(0.0); float w = 0.0;
  for (int i = -6; i <= 6; i++) {
    float t = float(i) / 6.0, k = exp(-t * t * 2.0);
    vec2 at = vUv + uDir * uTexel * t * r;
    if (sharp && texture2D(uSharp, at).a > 0.5) continue;
    c += texture2D(uSrc, at).rgb * k; w += k;
  }
  gl_FragColor = w > 0.0 ? vec4(c / w, 1.0) : texture2D(uSrc, vUv);
}`;

function target(w: number, h: number, filter: THREE.MagnificationTextureFilter, depth = false): THREE.WebGLRenderTarget {
  const t = new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), { minFilter: filter, magFilter: filter, depthBuffer: depth, stencilBuffer: depth, generateMipmaps: false });
  t.texture.colorSpace = THREE.NoColorSpace;
  return t;
}

export class Post {
  /** The scene is drawn into this, at low resolution. */
  readonly scene: THREE.WebGLRenderTarget;
  private bright = target(1, 1, THREE.LinearFilter);
  private bloomB = target(1, 1, THREE.LinearFilter);
  private a = target(1, 1, THREE.LinearFilter);
  private b = target(1, 1, THREE.LinearFilter);
  // The smooth effects layer: mist as soft alpha, blurred, scaled up linearly.
  private fx = target(1, 1, THREE.LinearFilter);
  private fxB = target(1, 1, THREE.LinearFilter);
  // The sharp mask: what's kept out of the tilt-shift (Post.sharp), its coverage at the scene's resolution.
  private sharpMask = target(1, 1, THREE.NearestFilter);
  /** Kept sharp through the tilt-shift (Ed, 2026-10-27: "stacks should not be affected by the tilt shift"): her sigil stack's meshes
   *  (render/leash.ts stackMask), each drawn again with its coverage material into the mask, when the blur is on and it has any. */
  sharp: { mesh: THREE.Mesh; mask: THREE.Material }[] = [];
  /** What goes into the smooth effects layer; null for none. */
  fxScene: THREE.Scene | null = null;
  private quad: THREE.Mesh;
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private mats: Record<string, THREE.ShaderMaterial>;
  private low = new THREE.Vector2(1, 1);
  private out = new THREE.Vector2(1, 1);
  /** The smooth effects layer's size: half the scene's (it is blurred and scaled up linearly anyway: overnight phase 2). */
  private fxRes = new THREE.Vector2(1, 1);

  constructor(private renderer: THREE.WebGLRenderer, readonly tuning: PostTuning) {
    this.scene = target(1, 1, THREE.LinearFilter, true);
    // The scene's depth, so the effects layer hides behind what stands in front of it.
    // (With a stencil: scenery marks its pixels in it, so the ley line shows through the trees: leylines.ts.)
    this.scene.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedInt248Type);
    this.scene.depthTexture.format = THREE.DepthStencilFormat;
    this.fx.texture.format = THREE.RGBAFormat;
    const m = (frag: string, uniforms: Record<string, THREE.IUniform>) => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
    this.mats = {
      bright: m(BRIGHT, { uScene: { value: null }, uThreshold: { value: 0.6 } }),
      blur: m(BLUR, { uSrc: { value: null }, uStep: { value: new THREE.Vector2() } }),
      veil: Object.assign(m(VEIL, { uAt: { value: new THREE.Vector2(0.5, 0.5) }, uR: { value: 0 }, uSoft: { value: 0.15 }, uAspect: { value: 1 }, uAll: { value: 0 }, uK: { value: 0 } }), { transparent: true, blending: THREE.NormalBlending }),
      composite: m(COMPOSITE, { uScene: { value: null }, uBloom: { value: null }, uLow: { value: new THREE.Vector2() }, uBloomStrength: { value: 0 }, uKoDim: { value: 0 }, uBlack: { value: 0 }, uGamma: { value: 1 }, uFx: { value: null }, uFxOn: { value: 0 }, uBroken: { value: 0 }, uGrade: { value: new THREE.Vector4() }, uPool: { value: new THREE.Vector4() }, uIris: { value: new THREE.Vector4() }, uIris2: { value: new THREE.Vector4() }, uGradeTint: { value: new THREE.Vector3(1, 1, 1) } }),
      tilt: m(TILT, { uSrc: { value: null }, uDepth: { value: null }, uTexel: { value: new THREE.Vector2() }, uDir: { value: new THREE.Vector2() }, uStrength: { value: 0 }, uBand: { value: 0.4 }, uCentre: { value: 0.5 }, uSkyBlur: { value: 1 }, uSharp: { value: null }, uSharpOn: { value: 0 } }),
    };
    this.mats.composite.uniforms.uPotionFade = { value: 0 };
    this.mats.composite.uniforms.uPotionStyle = { value: new THREE.Vector4() };
    this.mats.composite.uniforms.uPotionBackground = { value: .035 };
    this.mats.composite.uniforms.uPotionTime = { value: 0 };
    this.mats.composite.uniforms.uPotionWobble = { value: new THREE.Vector4() };
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mats.composite);
    this.quad.frustumCulled = false;
  }

  /** How far the witch is risen (0 ground, 1 treetops): the tilt-shift blends from the ground's to the treetops'. */
  lift = 0;
  /** Temporary local bloom boost; normal settings are untouched. */
  potionGlow = 0;
  potionCanopy = 0;
  potionVertigo = 0;
  potionMiniature = 0;
  potionEdges = 0;
  potionWobble = 0;
  potionTime = 0;
  /** How much of the tilt-shift's blur is on (0 none, 1 all): none in the treehouse (render/view.ts houseTilt). */
  tilt = 1;
  /** Her light's pool on screen (0 to 1, y up): its centre and half-widths, spared from the grade (z 0: none). */
  get pool(): THREE.Vector4 { return this.mats.composite.uniforms.uPool.value; }
  /** The knockout's iris (render/koIris.ts): centre x, y (0-1 on screen), radius (a share of its height), dark outside; and the record's turn, how far it shows, the smear, its label's radius. */
  get iris(): THREE.Vector4 { return this.mats.composite.uniforms.uIris.value; }
  get iris2(): THREE.Vector4 { return this.mats.composite.uniforms.uIris2.value; }
  /** How much the screen dims round her while she's knocked down with her hat floating off (0 none: render/view/witch.ts). */
  set koDim(k: number) { this.mats.composite.uniforms.uKoDim.value = k; }
  set potionFade(k: number) { this.mats.composite.uniforms.uPotionFade.value = Math.max(0, Math.min(1, k)); }

  /** The scene's own target (View.warmDraws draws into it ahead). */
  get sceneTarget(): THREE.WebGLRenderTarget { return this.scene; }
  /** lowW x lowH: the scene; outW x outH: the canvas. */
  /** The low resolution, shared with shaders that read the scene's depth. */
  get lowSize(): THREE.Vector2 { return this.low; }
  /** The smooth effects layer's size, for its shaders' depth lookups (render/mist.ts). */
  get fxSize(): THREE.Vector2 { return this.fxRes; }

  /** Its targets' sizes (pixels), for the debug info (app/repro.ts): the scene, the smooth effects layer, the bloom's and the output. */
  sizes(): { scene: [number, number]; fx: [number, number]; bloom: [number, number]; out: [number, number] } {
    return { scene: [this.scene.width, this.scene.height], fx: [this.fx.width, this.fx.height], bloom: [this.bright.width, this.bright.height], out: [this.out.x, this.out.y] };
  }
  resize(lowW: number, lowH: number, outW: number, outH: number): void {
    this.low.set(lowW, lowH);
    const fw = Math.max(1, Math.round(lowW / 2)), fh = Math.max(1, Math.round(lowH / 2));
    this.fxRes.set(fw, fh);
    this.fx.setSize(fw, fh); this.fxB.setSize(fw, fh);
    this.out.set(outW, outH);
    this.scene.setSize(lowW, lowH);
    const bw = Math.max(1, Math.round(lowW / 2)), bh = Math.max(1, Math.round(lowH / 2));
    this.bright.setSize(bw, bh); this.bloomB.setSize(bw, bh);
    this.a.setSize(lowW, lowH); this.b.setSize(lowW, lowH);
    this.sharpMask.setSize(lowW, lowH);
  }

  /** The forest behind the house's enclosed rooms (Ed, 2026-10-23: "when you're inside the treehouse in an enclosed room (i.e. not
   *  the terrace) the forest behind the tree should be black"; render/view.ts behindHouse): 1 the picture as ever; 0 the house alone
   *  (camera layer HOUSE_LAYER: its rooms, the Ent's art, her) over black, the rest of the scene not drawn at all; between, the
   *  forest coming back from `behindAt` (a point on the picture, uv: the doorway she came through) outward, or the whole picture
   *  at once with no point (the telescope). */
  behind = 1;
  behindAt: THREE.Vector2 | null = null;
  private drawScene(scene: THREE.Scene, camera: THREE.Camera): void {
    const r = this.renderer, K = this.behind;
    if (K >= 1) { r.render(scene, camera); return; }
    const mask = camera.layers.mask, ac = r.autoClear;
    if (K <= 0) {
      const col = r.getClearColor(this.clear), alpha = r.getClearAlpha();
      camera.layers.set(HOUSE_LAYER); r.setClearColor(0x000000, 1);
      r.render(scene, camera);
      r.setClearColor(col, alpha); camera.layers.mask = mask;
      return;
    }
    // (part way: the whole scene, black over what isn't yet revealed, then the house again over that)
    r.render(scene, camera);
    const target = r.getRenderTarget(), w = target?.width ?? 1, h = target?.height ?? 1, aspect = w / h, at = this.behindAt;
    // (the reveal's radius: from nothing to the picture's farthest corner from its point, in picture heights)
    const far = at ? Math.max(...[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => Math.hypot((x - at.x) * aspect, y - at.y))) : 0, soft = 0.15;
    r.autoClear = false;
    this.pass("veil", target, u => { u.uAll.value = at ? 0 : 1; u.uK.value = K; u.uAt.value.copy(at ?? u.uAt.value); u.uAspect.value = aspect; u.uSoft.value = soft; u.uR.value = K * (far + soft); });
    r.clearDepth();
    camera.layers.set(HOUSE_LAYER);
    r.render(scene, camera);
    camera.layers.mask = mask; r.autoClear = ac;
  }
  private readonly clear = new THREE.Color();

  private pass(name: string, to: THREE.WebGLRenderTarget | null, set: (u: Record<string, THREE.IUniform>) => void): void {
    const mat = this.mats[name];
    set(mat.uniforms);
    this.quad.material = mat;
    this.renderer.setRenderTarget(to);
    this.renderer.render(this.quad, this.cam);
  }

  /** Its passes' programs made now, in the background where the GL can (KHR_parallel_shader_compile): they're on a quad of their own,
   *  not in the scene, so the scene's compile never made them, and the first frame's first pass waited on its link (the cloud's
   *  software renderer, 2026-10-21: 3.4 s in the composite's logs). */
  compile(): Promise<unknown> {
    const s = new THREE.Scene();
    for (const m of Object.values(this.mats)) { const q = new THREE.Mesh(this.quad.geometry, m); q.frustumCulled = false; s.add(q); }
    return this.renderer.compileAsync(s, this.cam);
  }

  /** The last frame's scene render on the CPU (ms): three.js walking the scene, its uploads and GL calls; the rest of the
   *  view's "draw" part is these passes after it (the ?perf=1 HUD: app/perfHud.ts). */
  sceneMs = 0;

  render(scene: THREE.Scene, camera: THREE.Camera): void { runSync(this.renderSteps(scene, camera)); }
  /** render as steps (render/slices.ts): a pass a step, for the start's first frame drawn ahead (View.warmDraws). */
  *renderSteps(scene: THREE.Scene, camera: THREE.Camera, toCanvas = true): Steps {
    const out = toCanvas ? null : this.b; // (drawn ahead: its last pass into a target, never the canvas, whose picture stays as it was)
    const r = this.renderer, t = this.tuning;
    r.setRenderTarget(this.scene);
    const t0 = performance.now();
    this.drawScene(scene, camera);
    this.sceneMs = performance.now() - t0;
    yield;

    // Bloom: the bright parts, at half resolution, blurred twice each way.
    const bloom = potionBloom(t.bloom.threshold, t.bloom.on ? t.bloom.strength : 0, this.potionGlow);
    const bloomOn = bloom.strength > 0;
    if (bloomOn) {
      const bw = this.bright.width, bh = this.bright.height;
      this.pass("bright", this.bright, u => { u.uScene.value = this.scene.texture; u.uThreshold.value = bloom.threshold; });
      yield;
      for (let i = 0; i < 2; i++) {
        this.pass("blur", this.bloomB, u => { u.uSrc.value = this.bright.texture; u.uStep.value.set(1 / bw, 0); });
        this.pass("blur", this.bright, u => { u.uSrc.value = this.bloomB.texture; u.uStep.value.set(0, 1 / bh); });
        yield;
      }
    }
    // The smooth effects layer, over a clear background, then a small blur each way.
    const fxOn = !!this.fxScene && t.suspects.effectsLayer; // (tuning suspects: the circle bug's toggles)
    if (this.fxScene) {
      const col = r.getClearColor(new THREE.Color()), alpha = r.getClearAlpha();
      r.setRenderTarget(this.fx);
      r.setClearColor(0x000000, 0);
      r.clear();
      r.render(this.fxScene, camera);
      r.setClearColor(col, alpha);
      yield;
      const lw = this.low.x, lh = this.low.y; // (its blur as wide on screen as before, at the scene's resolution)
      this.pass("blur", this.fxB, u => { u.uSrc.value = this.fx.texture; u.uStep.value.set(0.6 / lw, 0); });
      this.pass("blur", this.fx, u => { u.uSrc.value = this.fxB.texture; u.uStep.value.set(0, 0.6 / lh); });
      yield;
    }
    const effectiveTilt = miniatureTilt(t.tiltShift, this.potionMiniature);
    const tilt = (effectiveTilt.on && effectiveTilt.strength > 0 || this.potionVertigo > 0) && this.tilt > 0;
    this.pass("composite", tilt ? this.a : out, u => {
      u.uScene.value = this.scene.texture; u.uBloom.value = this.bright.texture; u.uLow.value.copy(this.low); u.uBloomStrength.value = bloomOn ? bloom.strength : 0;
      const levels = potionLevels(t.tone.black, t.tone.gamma, this.potionCanopy);
      u.uBlack.value = levels.black; u.uGamma.value = levels.gamma;
      const edges = potionSettings('aurora-outlines'), wobble = potionSettings('trip-indicator');
      u.uPotionStyle.value.set(levels.saturation - 1, this.potionEdges * edges.strength, edges.edgeLow, edges.edgeHigh);
      u.uPotionBackground.value = edges.background;
      u.uPotionTime.value = this.potionTime;
      u.uPotionWobble.value.set(wobble.strength * this.potionWobble, wobble.speed, wobble.waveSize, wobble.reach);
      u.uFx.value = this.fx.texture; u.uFxOn.value = fxOn ? 1 : 0; u.uBroken.value = t.suspects.showBroken ? 1 : 0;
      this.setGrade(u);
    });
    if (!tilt) return;
    yield;
    const sharpOn = this.drawSharp(camera);
    // The blur at the low resolution, before the browser scales the picture up.
    const w = this.a.width, h = this.a.height;
    const common = (u: Record<string, THREE.IUniform>) => {
      const T = effectiveTilt, k = Math.max(0, Math.min(1, this.lift)), k2 = k * k * (3 - 2 * k);
      u.uDepth.value = this.scene.depthTexture; u.uTexel.value.set(1 / w, 1 / h); u.uStrength.value = (T.strength + (T.treetop.strength - T.strength) * k2) * this.tilt; u.uBand.value = T.band + (T.treetop.band - T.band) * k2; u.uCentre.value = 1 - T.centre;
      if (!T.on) u.uStrength.value = 0;
      const vertigo = potionSettings('vertigo');
      u.uStrength.value += vertigo.blur * this.potionVertigo * this.tilt;
      u.uBand.value *= 1 + (vertigo.band - 1) * this.potionVertigo;
      u.uSkyBlur.value = T.skyBlur ?? 1;
      u.uSharp.value = this.sharpMask.texture; u.uSharpOn.value = sharpOn ? 1 : 0;
    };
    this.pass("tilt", this.b, u => { common(u); u.uSrc.value = this.a.texture; u.uDir.value.set(1, 0); });
    yield;
    this.pass("tilt", out === this.b ? this.a : out, u => { common(u); u.uSrc.value = this.b.texture; u.uDir.value.set(0, 1); });
  }

  /** The sharp mask drawn (Post.sharp); false when there's nothing to keep sharp (no stack, or tiltShift.stackSharp off). */
  private drawSharp(camera: THREE.Camera): boolean {
    const live = this.tuning.tiltShift.stackSharp !== false ? this.sharp.filter(s => s.mesh.visible && ((s.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount ?? 0) > 0) : [];
    if (!live.length) return false;
    const r = this.renderer, ac = r.autoClear, col = r.getClearColor(this.clear), alpha = r.getClearAlpha();
    r.setRenderTarget(this.sharpMask); r.setClearColor(0x000000, 0); r.clear(true, false, false);
    r.autoClear = false;
    for (const s of live) { const m = s.mesh.material; s.mesh.material = s.mask; r.render(s.mesh, camera); s.mesh.material = m; } // (each mesh on its own: not the whole scene walked again)
    r.autoClear = ac; r.setClearColor(col, alpha);
    return true;
  }

  /** The grade's tint (a colour of luma 1), for the area moods to ease (render/mood.ts AreaMoods). */
  get gradeTint(): THREE.Vector3 { return this.mats.composite.uniforms.uGradeTint.value; }

  /** The mood's grade (render/mood.ts) into the composite's uniforms: its strength and the rest every frame (the pause page's
   *  Spooky grade slider sets it in place), its tint worked out when the mood changes, not every frame. */
  private gradeOf: object | null | undefined;
  private setGrade(u: Record<string, THREE.IUniform>): void {
    const M = moodOf(this.tuning);
    gradeInto(u.uGrade.value, M);
    if (M === this.gradeOf) return;
    this.gradeOf = M;
    if (M) {
      // The tint, at the brightness it leaves: a colour of luma 1, so the grade shifts hue, not level.
      const [r, g, b] = hsv2rgb(M.gradeHue, M.gradeSat, 1).map((x: number) => x / 255), l = 0.3 * r + 0.55 * g + 0.15 * b;
      u.uGradeTint.value.set(r / l, g / l, b / l);
    }
  }
}
