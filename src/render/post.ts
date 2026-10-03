// After the scene is drawn: a gentle bloom on bright, glowing things (the witch's glow, magic,
// flowers, eye glints), and a tilt-shift blur toward the top and bottom of the screen so the
// forest looks like a miniature (Ed, 2026-10-03, after Transistor and Octopath Traveler).
//
// The scene is always drawn at the low resolution (window size / pixel size). The tilt-shift
// runs either "before" the pixels are scaled up (blurring whole art pixels, at low resolution)
// or "after" (on the scaled-up image, at full resolution, so the pixel edges themselves blur).
import * as THREE from "three";

export interface PostTuning {
  bloom: { on: boolean; strength: number; threshold: number };
  tone: { black: number; gamma: number; ambient: number };
  tiltShift: { on: boolean; where: "before" | "after"; strength: number; band: number; centre: number };
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
const COMPOSITE = /* glsl */ `
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`;

// One direction of the tilt-shift: the blur grows with distance from the sharp band.
const TILT = /* glsl */ `
uniform sampler2D uSrc; uniform vec2 uTexel, uDir; uniform float uStrength, uBand, uCentre; varying vec2 vUv;
void main() {
  float d = max(0.0, abs(vUv.y - uCentre) - uBand * 0.5) / max(0.05, 0.5 - uBand * 0.5);
  float r = uStrength * smoothstep(0.0, 1.0, d);
  if (r < 0.35) { gl_FragColor = texture2D(uSrc, vUv); return; }
  vec3 c = vec3(0.0); float w = 0.0;
  for (int i = -6; i <= 6; i++) {
    float t = float(i) / 6.0, k = exp(-t * t * 2.0);
    c += texture2D(uSrc, vUv + uDir * uTexel * t * r).rgb * k; w += k;
  }
  gl_FragColor = vec4(c / w, 1.0);
}`;

function target(w: number, h: number, filter: THREE.MagnificationTextureFilter, depth = false): THREE.WebGLRenderTarget {
  const t = new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), { minFilter: filter, magFilter: filter, depthBuffer: depth, generateMipmaps: false });
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
  // The smooth effects layer (?fx=smooth): mist as soft alpha, blurred, scaled up linearly.
  private fx = target(1, 1, THREE.LinearFilter);
  private fxB = target(1, 1, THREE.LinearFilter);
  /** What goes into the smooth effects layer; null for none. */
  fxScene: THREE.Scene | null = null;
  private quad: THREE.Mesh;
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private mats: Record<string, THREE.ShaderMaterial>;
  private low = new THREE.Vector2(1, 1);
  private out = new THREE.Vector2(1, 1);

  constructor(private renderer: THREE.WebGLRenderer, readonly tuning: PostTuning) {
    this.scene = target(1, 1, THREE.LinearFilter, true);
    // The scene's depth, so the effects layer hides behind what stands in front of it.
    this.scene.depthTexture = new THREE.DepthTexture(1, 1);
    this.fx.texture.format = THREE.RGBAFormat;
    const m = (frag: string, uniforms: Record<string, THREE.IUniform>) => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
    this.mats = {
      bright: m(BRIGHT, { uScene: { value: null }, uThreshold: { value: 0.6 } }),
      blur: m(BLUR, { uSrc: { value: null }, uStep: { value: new THREE.Vector2() } }),
      composite: m(COMPOSITE, { uScene: { value: null }, uBloom: { value: null }, uLow: { value: new THREE.Vector2() }, uBloomStrength: { value: 0 }, uBlack: { value: 0 }, uGamma: { value: 1 }, uFx: { value: null }, uFxOn: { value: 0 } }),
      tilt: m(TILT, { uSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uDir: { value: new THREE.Vector2() }, uStrength: { value: 0 }, uBand: { value: 0.4 }, uCentre: { value: 0.5 } }),
    };
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mats.composite);
    this.quad.frustumCulled = false;
  }

  /** Whether the canvas holds the full-resolution image (tilt-shift after the upscale). */
  get fullResolution(): boolean { return this.tuning.tiltShift.on && this.tuning.tiltShift.where === "after"; }

  /** lowW x lowH: the scene; outW x outH: the canvas. */
  /** The low resolution, shared with shaders that read the scene's depth. */
  get lowSize(): THREE.Vector2 { return this.low; }

  resize(lowW: number, lowH: number, outW: number, outH: number): void {
    this.low.set(lowW, lowH);
    this.fx.setSize(lowW, lowH); this.fxB.setSize(lowW, lowH);
    this.out.set(outW, outH);
    this.scene.setSize(lowW, lowH);
    const bw = Math.max(1, Math.round(lowW / 2)), bh = Math.max(1, Math.round(lowH / 2));
    this.bright.setSize(bw, bh); this.bloomB.setSize(bw, bh);
    const tw = this.fullResolution ? outW : lowW, th = this.fullResolution ? outH : lowH;
    this.a.setSize(tw, th); this.b.setSize(tw, th);
  }

  private pass(name: string, to: THREE.WebGLRenderTarget | null, set: (u: Record<string, THREE.IUniform>) => void): void {
    const mat = this.mats[name];
    set(mat.uniforms);
    this.quad.material = mat;
    this.renderer.setRenderTarget(to);
    this.renderer.render(this.quad, this.cam);
  }

  render(scene: THREE.Scene, camera: THREE.Camera): void {
    const r = this.renderer, t = this.tuning;
    r.setRenderTarget(this.scene);
    r.render(scene, camera);

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
      const fw = this.fx.width, fh = this.fx.height;
      this.pass("blur", this.fxB, u => { u.uSrc.value = this.fx.texture; u.uStep.value.set(0.6 / fw, 0); });
      this.pass("blur", this.fx, u => { u.uSrc.value = this.fxB.texture; u.uStep.value.set(0, 0.6 / fh); });
    }
    const tilt = t.tiltShift.on && t.tiltShift.strength > 0;
    this.pass("composite", tilt ? this.a : null, u => {
      u.uScene.value = this.scene.texture; u.uBloom.value = this.bright.texture; u.uLow.value.copy(this.low); u.uBloomStrength.value = bloomOn ? t.bloom.strength : 0;
      u.uBlack.value = t.tone.black; u.uGamma.value = t.tone.gamma;
      u.uFx.value = this.fx.texture; u.uFxOn.value = fxOn ? 1 : 0;
    });
    if (!tilt) return;
    // The blur radius is given in low-res pixels; after the upscale it covers the same ground.
    const w = this.a.width, h = this.a.height, scale = this.fullResolution ? this.out.y / this.low.y : 1;
    const common = (u: Record<string, THREE.IUniform>) => {
      u.uTexel.value.set(1 / w, 1 / h); u.uStrength.value = t.tiltShift.strength * scale; u.uBand.value = t.tiltShift.band; u.uCentre.value = 1 - t.tiltShift.centre;
    };
    this.pass("tilt", this.b, u => { common(u); u.uSrc.value = this.a.texture; u.uDir.value.set(1, 0); });
    this.pass("tilt", null, u => { common(u); u.uSrc.value = this.b.texture; u.uDir.value.set(0, 1); });
  }
}
