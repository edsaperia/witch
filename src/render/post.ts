// After the scene is drawn: a gentle bloom on bright, glowing things (the witch's glow, magic,
// flowers, eye glints), and a tilt-shift blur toward the top and bottom of the screen so the
// forest looks like a miniature (Ed, 2026-10-03, after Transistor and Octopath Traveler).
//
// The scene is always drawn at the low resolution (window size / pixel size). The tilt-shift
// runs either "before" the pixels are scaled up (blurring whole art pixels, at low resolution)
// or "after" (on the scaled-up image, at full resolution, so the pixel edges themselves blur).
import * as THREE from "three";
import { moodOf } from "./mood";
import { hsv2rgb } from "../../art/generator.js";

export interface PostTuning { light?: import("../rules/tuning").Tuning["light"];
  bloom: { on: boolean; strength: number; threshold: number };
  tone: { black: number; gamma: number; ambient: number };
  tiltShift: { on: boolean; /** The share of the blur the sky takes (Ed, 2026-10-06: "lessen the tilt-shift effect until you can see the stars", "the stars don't have to be crisp, just perceptible"); 1 as the ground. */ skyBlur?: number; strength: number; band: number; centre: number; /** Over the treetops (Ed, v160: stronger there), blended in by lift. */ treetop: { strength: number; band: number } };
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

// Scene (sampled as whole low-res pixels), the smooth effects layer (sampled smoothly) and bloom.
/** How much of the grade her light's pool is spared at its centre (0 none, 1 all). */
const POOL_SPARE = 0.8;

const COMPOSITE = /* glsl */ `
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn, uKoDim, uAggro; uniform vec4 uGrade, uPool, uIris, uIris2; uniform vec3 uGradeTint; varying vec2 vUv;
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
  vec3 c = texture2D(uScene, p).rgb;
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
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
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
  // A wild area's rising aggro (rules/wildWatch.ts aggroOf, render/aggro.ts): the screen's edges reddening as its animals make up
  // their minds (Ed, 2026-10-07), by whole low-res pixels.
  if (uAggro > 0.0) { vec2 q = ((floor(vUv * uLow) + 0.5) / uLow - 0.5) * vec2(uLow.x / uLow.y, 1.0); c += vec3(0.42, 0.03, 0.03) * uAggro * smoothstep(0.38, 0.95, length(q)); } // (added, not mixed: the night's dark edges still redden)
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`;

// One direction of the tilt-shift: the blur grows with distance from the sharp band.
const TILT = /* glsl */ `
uniform sampler2D uSrc, uDepth; uniform vec2 uTexel, uDir; uniform float uStrength, uBand, uCentre, uSkyBlur; varying vec2 vUv;
void main() {
  // The sky over the bend (nothing drawn there: the far plane) is blurred with everything else, as
  // the last pass over the finished, bent image (Ed, round 12: "the tilt shift effect has to be applied
  // after the bend shader").
  float d = max(0.0, abs(vUv.y - uCentre) - uBand * 0.5) / max(0.05, 0.5 - uBand * 0.5);
  // The sky (nothing drawn there: the far plane) takes only uSkyBlur of it, so its stars stay perceptible, softly.
  float r = uStrength * smoothstep(0.0, 1.0, d) * (texture2D(uDepth, vUv).r >= 0.99999 ? uSkyBlur : 1.0);
  if (r < 0.35) { gl_FragColor = texture2D(uSrc, vUv); return; }
  vec3 c = vec3(0.0); float w = 0.0;
  for (int i = -6; i <= 6; i++) {
    float t = float(i) / 6.0, k = exp(-t * t * 2.0);
    c += texture2D(uSrc, vUv + uDir * uTexel * t * r).rgb * k; w += k;
  }
  gl_FragColor = vec4(c / w, 1.0);
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
      composite: m(COMPOSITE, { uScene: { value: null }, uBloom: { value: null }, uLow: { value: new THREE.Vector2() }, uBloomStrength: { value: 0 }, uKoDim: { value: 0 }, uAggro: { value: 0 }, uBlack: { value: 0 }, uGamma: { value: 1 }, uFx: { value: null }, uFxOn: { value: 0 }, uGrade: { value: new THREE.Vector4() }, uPool: { value: new THREE.Vector4() }, uIris: { value: new THREE.Vector4() }, uIris2: { value: new THREE.Vector4() }, uGradeTint: { value: new THREE.Vector3(1, 1, 1) } }),
      tilt: m(TILT, { uSrc: { value: null }, uDepth: { value: null }, uTexel: { value: new THREE.Vector2() }, uDir: { value: new THREE.Vector2() }, uStrength: { value: 0 }, uBand: { value: 0.4 }, uCentre: { value: 0.5 }, uSkyBlur: { value: 1 } }),
    };
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mats.composite);
    this.quad.frustumCulled = false;
  }

  /** How far the witch is risen (0 ground, 1 treetops): the tilt-shift blends from the ground's to the treetops'. */
  lift = 0;
  /** Her light's pool on screen (0 to 1, y up): its centre and half-widths, spared from the grade (z 0: none). */
  get pool(): THREE.Vector4 { return this.mats.composite.uniforms.uPool.value; }
  /** The knockout's iris (render/koIris.ts): centre x, y (0-1 on screen), radius (a share of its height), dark outside; and the record's turn, how far it shows, the smear, its label's radius. */
  get iris(): THREE.Vector4 { return this.mats.composite.uniforms.uIris.value; }
  get iris2(): THREE.Vector4 { return this.mats.composite.uniforms.uIris2.value; }
  /** How much the screen dims round her while she's knocked down with her hat floating off (0 none: render/view/witch.ts). */
  set koDim(k: number) { this.mats.composite.uniforms.uKoDim.value = k; }
  /** The screen edges' red as a wild area's aggro rises (0 none; render/aggro.ts). */
  set aggro(k: number) { this.mats.composite.uniforms.uAggro.value = k; }

  /** lowW x lowH: the scene; outW x outH: the canvas. */
  /** The low resolution, shared with shaders that read the scene's depth. */
  get lowSize(): THREE.Vector2 { return this.low; }
  /** The smooth effects layer's size, for its shaders' depth lookups (render/mist.ts). */
  get fxSize(): THREE.Vector2 { return this.fxRes; }

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
  }

  private pass(name: string, to: THREE.WebGLRenderTarget | null, set: (u: Record<string, THREE.IUniform>) => void): void {
    const mat = this.mats[name];
    set(mat.uniforms);
    this.quad.material = mat;
    this.renderer.setRenderTarget(to);
    this.renderer.render(this.quad, this.cam);
  }

  /** The last frame's scene render on the CPU (ms): three.js walking the scene, its uploads and GL calls; the rest of the
   *  view's "draw" part is these passes after it (the ?perf=1 HUD: app/perfHud.ts). */
  sceneMs = 0;

  render(scene: THREE.Scene, camera: THREE.Camera): void {
    const r = this.renderer, t = this.tuning;
    r.setRenderTarget(this.scene);
    const t0 = performance.now();
    r.render(scene, camera);
    this.sceneMs = performance.now() - t0;

    // Bloom: the bright parts, at half resolution, blurred twice each way.
    const bloomOn = t.bloom.on && t.bloom.strength > 0;
    if (bloomOn) {
      const bw = this.bright.width, bh = this.bright.height;
      this.pass("bright", this.bright, u => { u.uScene.value = this.scene.texture; u.uThreshold.value = t.bloom.threshold; });
      for (let i = 0; i < 2; i++) {
        this.pass("blur", this.bloomB, u => { u.uSrc.value = this.bright.texture; u.uStep.value.set(1 / bw, 0); });
        this.pass("blur", this.bright, u => { u.uSrc.value = this.bloomB.texture; u.uStep.value.set(0, 1 / bh); });
      }
    }
    // The smooth effects layer, over a clear background, then a small blur each way.
    const fxOn = !!this.fxScene;
    if (this.fxScene) {
      const col = r.getClearColor(new THREE.Color()), alpha = r.getClearAlpha();
      r.setRenderTarget(this.fx);
      r.setClearColor(0x000000, 0);
      r.clear();
      r.render(this.fxScene, camera);
      r.setClearColor(col, alpha);
      const lw = this.low.x, lh = this.low.y; // (its blur as wide on screen as before, at the scene's resolution)
      this.pass("blur", this.fxB, u => { u.uSrc.value = this.fx.texture; u.uStep.value.set(0.6 / lw, 0); });
      this.pass("blur", this.fx, u => { u.uSrc.value = this.fxB.texture; u.uStep.value.set(0, 0.6 / lh); });
    }
    const tilt = t.tiltShift.on && t.tiltShift.strength > 0;
    this.pass("composite", tilt ? this.a : null, u => {
      u.uScene.value = this.scene.texture; u.uBloom.value = this.bright.texture; u.uLow.value.copy(this.low); u.uBloomStrength.value = bloomOn ? t.bloom.strength : 0;
      u.uBlack.value = t.tone.black; u.uGamma.value = t.tone.gamma;
      u.uFx.value = this.fx.texture; u.uFxOn.value = fxOn ? 1 : 0;
      this.setGrade(u);
    });
    if (!tilt) return;
    // The blur at the low resolution, before the browser scales the picture up.
    const w = this.a.width, h = this.a.height;
    const common = (u: Record<string, THREE.IUniform>) => {
      const T = t.tiltShift, k = Math.max(0, Math.min(1, this.lift)), k2 = k * k * (3 - 2 * k);
      u.uDepth.value = this.scene.depthTexture; u.uTexel.value.set(1 / w, 1 / h); u.uStrength.value = T.strength + (T.treetop.strength - T.strength) * k2; u.uBand.value = T.band + (T.treetop.band - T.band) * k2; u.uCentre.value = 1 - T.centre;
      u.uSkyBlur.value = T.skyBlur ?? 1;
    };
    this.pass("tilt", this.b, u => { common(u); u.uSrc.value = this.a.texture; u.uDir.value.set(1, 0); });
    this.pass("tilt", null, u => { common(u); u.uSrc.value = this.b.texture; u.uDir.value.set(0, 1); });
  }

  /** The grade's tint (a colour of luma 1), for the area moods to ease (render/mood.ts AreaMoods). */
  get gradeTint(): THREE.Vector3 { return this.mats.composite.uniforms.uGradeTint.value; }

  /** The mood's grade (render/mood.ts) into the composite's uniforms; its tint worked out when the mood changes, not every frame. */
  private gradeOf: object | null | undefined;
  private setGrade(u: Record<string, THREE.IUniform>): void {
    const M = moodOf(this.tuning);
    if (M === this.gradeOf) return;
    this.gradeOf = M;
    if (M?.grade) {
      // The tint, at the brightness it leaves: a colour of luma 1, so the grade shifts hue, not level.
      const [r, g, b] = hsv2rgb(M.gradeHue, M.gradeSat, 1).map((x: number) => x / 255), l = 0.3 * r + 0.55 * g + 0.15 * b;
      u.uGrade.value.set(M.grade, M.gradeDesat, M.gradePivot, 0); u.uGradeTint.value.set(r / l, g / l, b / l);
    } else u.uGrade.value.set(0, 0, 1, 0);
  }
}
