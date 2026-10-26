// What the treehouse hides of the forest (the perf pass, 2026-10-23, Ed's laptop: from the decks and the balcony #1024's denser
// woods round home were shaded in full under the Ent and then covered by it, about half the frame): the Ent's own solid pixels'
// depth, drawn first at the scene's size, reduced to a chain of levels each holding the farthest depth of the 2 x 2 below it, all in
// one texture (HIZ_UNIFORMS). The sprites' vertex shader (render/sprites.ts) leaves a scenery quad undrawn when its nearest point
// is behind every occluder pixel its rectangle on screen could touch: each of its pixels would have failed the depth test against
// the Ent anyway, so the picture is the same to the pixel. Only the Ent (its solid pass, which writes depth); never the house's
// floors, which write none (what's under them still sets the depth the mist is laid by). Built only while the camera is near
// the house; off (uHizOn 0) everywhere else.
import * as THREE from "three";

/** The camera layer the occluders are on, besides the scene's own. */
export const HIZ_LAYER = 4;
/** How many levels at most (the scene's size halved each time). */
const MAX_LEVELS = 9;

/** The chain: its texture (level 0 at its left, the others stacked in a column to its right), level 0's size, and where each
 *  level sits in it (x, y, w, h in texels, levels 0 to 8; unused levels 0). uHizOn 1 while it's built for this frame. */
export const HIZ_UNIFORMS = {
  uHiz: { value: null as THREE.Texture | null },
  uHizOn: { value: 0 },
  uHizSize: { value: new THREE.Vector2(1, 1) },
  uHizLevels: { value: 0 },
  uHizAt: { value: Array.from({ length: MAX_LEVELS }, () => new THREE.Vector4()) },
};

/** GLSL (the sprites' vertex shader): whether a rectangle of the screen (pixels, its corners) at window depth `near` and beyond
 *  is wholly behind the occluders: its texels at the coarsest level a cell of which covers it, at most 2 x 2. */
export const HIZ_GLSL = /* glsl */ `
uniform sampler2D uHiz;
uniform float uHizOn, uHizLevels;
uniform vec2 uHizSize;
uniform vec4 uHizAt[${MAX_LEVELS}];
bool hizHidden(vec2 lo, vec2 hi, float near) {
  if (uHizOn < 0.5) return false;
  lo = clamp(lo, vec2(0.0), uHizSize - 1.0); hi = clamp(hi, vec2(0.0), uHizSize - 1.0);
  float span = max(hi.x - lo.x, hi.y - lo.y) + 1.0;
  int L = int(ceil(log2(max(span, 1.0))));
  if (float(L) > uHizLevels - 1.0) return false;
  vec4 at = uHizAt[0];
  for (int i = 0; i < ${MAX_LEVELS}; i++) if (i == L) at = uHizAt[i];
  float cell = exp2(float(L));
  vec2 a = min(floor(lo / cell), at.zw - 1.0), b = min(floor(hi / cell), at.zw - 1.0);
  vec2 ts = vec2(textureSize(uHiz, 0));
  float far = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = vec2(i == 0 ? a.x : b.x, j == 0 ? a.y : b.y);
    far = max(far, texelFetch(uHiz, ivec2(at.xy + c), 0).r);
  }
  return near > far;
}`;

/** The same chain and the same lookup on the CPU (hiz.test.ts holds them to every pixel; the shaders above are these, line for line):
 *  the levels from a depth map (w x h, row 0 at the bottom), each the farthest of the 2 x 2 under it (an odd edge's last row or
 *  column folded into the texel before it is left as its own texel, as the halving rounds up). */
export function hizLevels(depth: Float32Array, w: number, h: number): { w: number; h: number; d: Float32Array }[] {
  const out = [{ w, h, d: depth }];
  for (let n = 1; n < MAX_LEVELS; n++) {
    const s = out[n - 1];
    if (s.w <= 2 && s.h <= 2) break;
    const lw = Math.max(1, Math.ceil(s.w / 2)), lh = Math.max(1, Math.ceil(s.h / 2)), d = new Float32Array(lw * lh), mx = s.w - 1, my = s.h - 1;
    for (let y = 0; y < lh; y++) for (let x = 0; x < lw; x++) {
      let f = 0;
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
        const px = 2 * x, py = 2 * y;
        if ((i === 2 && px + 2 !== mx) || (j === 2 && py + 2 !== my)) continue;
        f = Math.max(f, s.d[Math.min(py + j, my) * s.w + Math.min(px + i, mx)]);
      }
      d[y * lw + x] = f;
    }
    out.push({ w: lw, h: lh, d });
  }
  return out;
}
/** hizHidden on the CPU. */
export function hizHiddenRef(levels: { w: number; h: number; d: Float32Array }[], lo: [number, number], hi: [number, number], near: number): boolean {
  const W = levels[0].w, H = levels[0].h, cl = (v: number, m: number) => Math.min(Math.max(v, 0), m - 1);
  const l = [cl(lo[0], W), cl(lo[1], H)], h = [cl(hi[0], W), cl(hi[1], H)];
  const span = Math.max(h[0] - l[0], h[1] - l[1]) + 1, L = Math.ceil(Math.log2(Math.max(span, 1)));
  if (L > levels.length - 1) return false;
  const lv = levels[L], cell = 2 ** L;
  const ax = Math.min(Math.floor(l[0] / cell), lv.w - 1), ay = Math.min(Math.floor(l[1] / cell), lv.h - 1), bx = Math.min(Math.floor(h[0] / cell), lv.w - 1), by = Math.min(Math.floor(h[1] / cell), lv.h - 1);
  let far = 0;
  for (const y of [ay, by]) for (const x of [ax, bx]) far = Math.max(far, lv.d[y * lv.w + x]);
  return near > far;
}

const VERT = "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
// Level 0 from the depth buffer; each next level the farthest of the 2 x 2 under each texel (at an odd edge, the last row or
// column taken in too).
const COPY = /* glsl */ `uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }`;
const REDUCE = /* glsl */ `
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`;
const PLACE = /* glsl */ `uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }`;

export class Hiz {
  private depth = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true, stencilBuffer: false });
  private levels: THREE.WebGLRenderTarget[] = [];
  private atlas = new THREE.WebGLRenderTarget(1, 1, { type: THREE.FloatType, format: THREE.RedFormat, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: false });
  private quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private copy: THREE.ShaderMaterial;
  private reduce: THREE.ShaderMaterial;
  private place: THREE.ShaderMaterial;
  private size = { w: 0, h: 0 };
  /** Off where the GL can't draw into float textures. */
  readonly ok: boolean;

  constructor(renderer: THREE.WebGLRenderer) {
    this.depth.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
    const m = (frag: string, u: Record<string, THREE.IUniform>) => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms: u, depthTest: false, depthWrite: false });
    this.copy = m(COPY, { uSrc: { value: null } });
    this.reduce = m(REDUCE, { uSrc: { value: null }, uSrcSize: { value: new THREE.Vector2() } });
    this.place = m(PLACE, { uSrc: { value: null }, uAt: { value: new THREE.Vector2() } });
    this.quad.frustumCulled = false;
    this.ok = renderer.capabilities.isWebGL2 && !!renderer.extensions.get("EXT_color_buffer_float");
  }

  private resize(w: number, h: number): void {
    if (w === this.size.w && h === this.size.h) return;
    this.size = { w, h };
    this.depth.setSize(w, h);
    for (const t of this.levels) t.dispose();
    this.levels = [];
    let lw = w, lh = h, y = 0, n = 0;
    const at = HIZ_UNIFORMS.uHizAt.value;
    for (; n < MAX_LEVELS; n++) {
      const t = new THREE.WebGLRenderTarget(lw, lh, { type: THREE.FloatType, format: THREE.RedFormat, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: false });
      this.levels.push(t);
      at[n].set(n === 0 ? 0 : w, n === 0 ? 0 : y, lw, lh);
      if (n > 0) y += lh;
      if (lw <= 2 && lh <= 2) { n++; break; }
      lw = Math.max(1, Math.ceil(lw / 2)); lh = Math.max(1, Math.ceil(lh / 2));
    }
    for (let k = n; k < MAX_LEVELS; k++) at[k].set(0, 0, 0, 0);
    HIZ_UNIFORMS.uHizLevels.value = n;
    this.atlas.setSize(w + Math.ceil(w / 2), Math.max(h, y));
    HIZ_UNIFORMS.uHizSize.value.set(w, h);
  }

  /** Build it for this frame from what's on HIZ_LAYER (w x h: the scene's own size), or switch it off (`on` false). */
  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, w: number, h: number, on: boolean): void {
    HIZ_UNIFORMS.uHizOn.value = 0;
    if (!on || !this.ok || w < 1 || h < 1) return;
    this.resize(w, h);
    const r = renderer, mask = camera.layers.mask, was = r.getRenderTarget(), ac = r.autoClear, col = r.getClearColor(new THREE.Color()), alpha = r.getClearAlpha();
    camera.layers.set(HIZ_LAYER);
    r.setRenderTarget(this.depth); r.setClearColor(0x000000, 0); r.autoClear = true;
    r.render(scene, camera);
    camera.layers.mask = mask;
    const pass = (mat: THREE.ShaderMaterial, to: THREE.WebGLRenderTarget) => { this.quad.material = mat; r.setRenderTarget(to); r.render(this.quad, this.cam); };
    this.copy.uniforms.uSrc.value = this.depth.depthTexture; pass(this.copy, this.levels[0]);
    for (let k = 1; k < this.levels.length; k++) {
      const s = this.levels[k - 1];
      this.reduce.uniforms.uSrc.value = s.texture; this.reduce.uniforms.uSrcSize.value.set(s.width, s.height); pass(this.reduce, this.levels[k]);
    }
    // (each level into its place in the one texture the sprites read)
    r.setRenderTarget(this.atlas); r.setClearColor(0x000000, 0); r.clear();
    r.autoClear = false;
    const at = HIZ_UNIFORMS.uHizAt.value;
    // (by the atlas's own viewport, in its texels: the renderer's setViewport is the canvas's, scaled by the pixel ratio, and
    // what it's left at is what every later draw to the canvas uses)
    this.levels.forEach((t, k) => {
      const a = at[k];
      this.place.uniforms.uSrc.value = t.texture; this.place.uniforms.uAt.value.set(a.x, a.y);
      this.atlas.viewport.set(a.x, a.y, a.z, a.w); r.setRenderTarget(this.atlas); this.quad.material = this.place; r.render(this.quad, this.cam);
    });
    this.atlas.viewport.set(0, 0, this.atlas.width, this.atlas.height);
    r.autoClear = ac; r.setClearColor(col, alpha); r.setRenderTarget(was);
    HIZ_UNIFORMS.uHiz.value = this.atlas.texture;
    HIZ_UNIFORMS.uHizOn.value = 1;
  }

  /** Its passes' programs made ahead (View.compileAll, in the Bedroom), not on its first build by the treehouse (the boot freeze,
   *  2026-10-25: 6 s on the cloud's renderer, its three programs linked at first use in the first frame there). */
  compile(r: THREE.WebGLRenderer): Promise<unknown> {
    return Promise.all([this.copy, this.reduce, this.place].map(m => { const q = new THREE.Mesh(this.quad.geometry, m); q.frustumCulled = false; return r.compileAsync(q, this.cam); }));
  }

  dispose(): void {
    this.depth.dispose(); this.atlas.dispose(); for (const t of this.levels) t.dispose();
    this.copy.dispose(); this.reduce.dispose(); this.place.dispose(); this.quad.geometry.dispose();
  }
}
