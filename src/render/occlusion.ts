// Hidden as the animals are (Ed, 2026-10-19: "envelopes are hidden by scenery", "This also includes 'invite amount' rings"): the 💌s
// and the invite rings are DOM pixel art over the canvas (render/invites.ts), so the depth that hides an animal behind a trunk or a
// crown never touched them. Each one asks here instead, with a probe: a small invisible quad where it is, drawn into the scene with
// a WebGL2 occlusion query at render order PROBE_ORDER. That is after everything solid (the opaque pass: trees, rocks, scenery, the
// animals themselves) and the smoke, and before the see-through passes round her (render/sprites.ts, 10.9 and on), so the depth it
// meets is exactly the depth an animal meets: hidden behind a trunk, a crown or a rock, and showing through her cut-away where an
// animal does. The answers come back a frame or two later (no stall: read only once available) and are eased, so nothing flickers
// as a letter crosses a trunk's edge. Without WebGL2 queries nothing is ever hidden (as before).
//
// "Smoke also counts" (Ed): the smoke (render/smoke.ts) veils an animal behind it, soft and see-through, without writing depth, so
// no query sees it. Each probe's veil comes from a pass of its own instead: one texel a probe, adding up every puff in front of it
// by the smoke's own puff function (SMOKE_PUFF_GLSL: the very floats the smoke is drawn with), read back without waiting; a probe
// shows by (1 - its veil). Nothing else that hides animals is drawn over the world: the mist and ground fog are an effects layer
// laid over everything, the 💌s included, in the composite (render/post.ts).
import * as THREE from "three";
import { GROUND_SEEN_GLSL, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { SMOKE_PUFF_GLSL, type Smoke } from "./smoke";
import { SPRITE_UNIFORMS } from "./sprites";

/** Between the solid pass (and the smoke at 9.4) and the see-through passes round her (10.9, 11, 19.9). */
export const PROBE_ORDER = 10.5;
/** How fast a probe's shown share follows its answer (per second): about a tenth of a second in and out. */
const EASE = 12;
/** Probes unused this long are let go. */
const FORGET = 2;

const VERT = /* glsl */ `
uniform vec4 uProbe; // x, y (above the ground), z, half its size (the drawing's pixels: never smaller than a pixel, at any zoom)
uniform vec2 uPx;     // a pixel, in clip space (2 / the target's size)
${HEIGHT_VERT_GLSL}
void main() { vec4 c = clipOf(onGround(uProbe.xyz)); gl_Position = c + vec4(position.xy * 2.0 * uProbe.w * uPx * c.w, 0.0, 0.0); }`;
const FRAG = "void main() { gl_FragColor = vec4(0.0); }";

/** At most this many probes have a smoke veil worked out (one texel each); the nearest fires the smoke draws, and puffs a fire. */
const VEIL_PROBES = 64, VEIL_FIRES = 32, VEIL_PUFFS = 16;
const VEIL_VERT = "void main() { gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }";
const VEIL_FRAG = /* glsl */ `
uniform vec4 uProbes[${VEIL_PROBES}]; // x, y (above the ground), z, in use (1)
uniform vec4 uFires[${VEIL_FIRES}];
uniform int uFireCount;
uniform mat4 uViewProj;
uniform vec3 uRight, uUp;
uniform float uOpacity;
${SMOKE_PUFF_GLSL}
${GROUND_SEEN_GLSL}
vec4 clipW(vec3 w) { return uViewProj * vec4(bendW(w), 1.0); }
void main() {
  int i = int(gl_FragCoord.x);
  vec4 P = vec4(0.0);
  for (int j = 0; j < ${VEIL_PROBES}; j++) if (j == i) P = uProbes[j];
  if (P.w < 0.5) { gl_FragColor = vec4(0.0); return; }
  vec4 pc = clipW(onGround(P.xyz));
  vec2 pn = pc.xy / pc.w;
  float clear = 1.0; // how much of it gets through the puffs in front of it
  for (int f = 0; f < ${VEIL_FIRES}; f++) {
    if (f >= uFireCount) break;
    for (int k = 0; k < ${VEIL_PUFFS}; k++) {
      if (float(k) >= uPuffs) break;
      vec3 c; float size, a, t, s;
      smokePuff(uFires[f], float(k), c, size, a, t, s);
      if (a <= 0.0) continue;
      vec4 cc = clipW(c);
      if (cc.w <= 0.0 || cc.w >= pc.w) continue; // (behind it, or behind the camera: no veil)
      vec4 cr = clipW(c + uRight * size), cu = clipW(c + uUp * size);
      vec2 o = cc.xy / cc.w, er = cr.xy / cr.w - o, eu = cu.xy / cu.w - o, d = pn - o;
      float det = er.x * eu.y - er.y * eu.x;
      if (abs(det) < 1e-9) continue;
      vec2 q = vec2(d.x * eu.y - d.y * eu.x, er.x * d.y - er.y * d.x) / det; // (where it falls on the puff's quad, its side 1)
      // (the puff's own shape, its lumps taken at their mean: render/smoke.ts)
      clear *= 1.0 - smoothstep(0.5, 0.18, length(q)) * a * uOpacity * 0.85;
    }
  }
  gl_FragColor = vec4(1.0 - clear, 0.0, 0.0, 1.0);
}`;

interface Probe { mesh: THREE.Mesh; u: THREE.Vector4; key: string; used: number; shown: number; answer: number; veil: number; pending: WebGLQuery[]; /** answered since it took its key */ heard: boolean }

export class OcclusionProbes {
  private gl: WebGL2RenderingContext | null;
  private pool: Probe[] = [];
  private byKey = new Map<string, Probe>();
  private geo = new THREE.PlaneGeometry(1, 1);
  private frame = 0;
  private lastTime = -1;
  /** ?occlusion=off: nothing hidden, to compare. */
  on = true;
  /** The smoke's veil: its pass, target and what came back (r: the veil, a texel a probe in pool order). */
  private veilRt = new THREE.WebGLRenderTarget(VEIL_PROBES, 1, { depthBuffer: false, stencilBuffer: false, generateMipmaps: false });
  private veilBuf = new Uint8Array(VEIL_PROBES * 4);
  private veilBusy = false;
  private veilScene = new THREE.Scene();
  private veilCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private veilMat: THREE.ShaderMaterial | null = null;

  constructor(private scene: THREE.Scene, private renderer: THREE.WebGLRenderer, private camera: THREE.Camera, private smoke?: Smoke) {
    const gl = renderer.getContext();
    this.gl = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext ? gl : null;
  }

  /** Ask whether a point (y above the ground), `half` of the drawing's pixels each way round it, is seen this frame (any of it);
   *  its answer by `shown(key)`. */
  probe(key: string, x: number, y: number, z: number, half: number): void {
    if (!this.gl || !this.on) return;
    let p = this.byKey.get(key);
    if (!p) {
      p = this.pool.find(q => q.key === "" && !q.pending.length);
      if (!p) p = this.make();
      p.key = key; p.shown = 1; p.answer = 1; p.veil = 0; p.heard = false;
      this.byKey.set(key, p);
    }
    p.u.set(x, y, z, half);
    p.used = this.frame;
    p.mesh.visible = true;
  }

  /** Another night (View.setGame): every probe let go of its key (those waiting on a query are taken again once it's answered). */
  reset(): void {
    for (const p of this.pool) { p.key = ""; p.mesh.visible = false; p.shown = 1; p.answer = 1; p.veil = 0; p.heard = false; }
    this.byKey.clear(); this.lastTime = -1;
  }

  /** Whether every probe in use has had an answer back (for the checks: tools/occlusion). */
  get settled(): boolean { return this.pool.every(p => !p.key || p.heard); }

  /** How much of it shows (0 hidden to 1 seen), eased, its smoke's veil taken off; 1 for anything never asked about. */
  shown(key: string): number { const p = this.on ? this.byKey.get(key) : undefined; return p ? p.shown * (1 - p.veil) : 1; }

  /** Once a frame, before the scene is drawn: the answers that have come back, eased in; unused probes hidden, old ones let go. */
  update(time: number): void {
    const gl = this.gl, dt = this.lastTime < 0 ? 0 : Math.max(0, Math.min(0.1, time - this.lastTime));
    this.lastTime = time;
    this.frame++;
    if (!gl) return;
    for (const p of this.pool) {
      while (p.pending.length && gl.getQueryParameter(p.pending[0], gl.QUERY_RESULT_AVAILABLE)) {
        const q = p.pending.shift()!;
        p.answer = gl.getQueryParameter(q, gl.QUERY_RESULT) ? 1 : 0; p.heard = true;
        gl.deleteQuery(q);
      }
      if (!p.key) continue;
      p.shown += (p.answer - p.shown) * Math.min(1, dt * EASE);
      if (!this.smoke?.mesh.visible) p.veil += (0 - p.veil) * Math.min(1, dt * EASE);
      if (p.used < this.frame - 1) p.mesh.visible = false; // (not asked about last frame: not drawn)
      if (this.frame - p.used > FORGET * 60 && !p.pending.length) { this.byKey.delete(p.key); p.key = ""; }
    }
  }

  /** Once a frame, after the scene is drawn: the smoke's veil over every probe in use (one draw, a texel each), read back when the
   *  last one's in (never waiting on it), eased in as the queries' answers are. */
  veil(): void {
    const S = this.smoke;
    if (!this.gl || !this.on || !S || !S.mesh.visible || this.veilBusy) return;
    const fires = S.drawnFires();
    if (!fires.n) return;
    if (!this.veilMat) {
      const U = S.uniforms;
      this.veilMat = new THREE.ShaderMaterial({ vertexShader: VEIL_VERT, fragmentShader: VEIL_FRAG, depthTest: false, depthWrite: false,
        uniforms: { ...HEIGHT_UNIFORMS, uSmoke: U.uSmoke, uSmoke2: U.uSmoke2, uPuffs: U.uPuffs, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp,
          uProbes: { value: Array.from({ length: VEIL_PROBES }, () => new THREE.Vector4()) }, uFires: { value: Array.from({ length: VEIL_FIRES }, () => new THREE.Vector4()) },
          uFireCount: { value: 0 }, uViewProj: { value: new THREE.Matrix4() }, uOpacity: { value: (U.uSmoke3.value as THREE.Vector2).x } } });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.veilMat); quad.frustumCulled = false;
      this.veilScene.add(quad);
    }
    const u = this.veilMat.uniforms, P = u.uProbes.value as THREE.Vector4[], F = u.uFires.value as THREE.Vector4[], n = Math.min(fires.n, VEIL_FIRES);
    for (let i = 0; i < VEIL_PROBES; i++) { const p = this.pool[i]; if (p?.key && p.used === this.frame) P[i].set(p.u.x, p.u.y, p.u.z, 1); else P[i].set(0, 0, 0, 0); }
    for (let i = 0; i < n; i++) { const o = i * fires.stride; F[i].set(fires.a[o], fires.a[o + 1], fires.a[o + 2], fires.a[o + 3]); }
    u.uFireCount.value = n;
    (u.uViewProj.value as THREE.Matrix4).multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    const r = this.renderer, prev = r.getRenderTarget();
    r.setRenderTarget(this.veilRt);
    r.render(this.veilScene, this.veilCam);
    r.setRenderTarget(prev);
    this.veilBusy = true;
    const keys = this.pool.slice(0, VEIL_PROBES).map(p => p.key);
    r.readRenderTargetPixelsAsync(this.veilRt, 0, 0, VEIL_PROBES, 1, this.veilBuf).then(() => {
      this.veilBusy = false;
      keys.forEach((k, i) => { const p = this.pool[i]; if (k && p.key === k) p.veil += (this.veilBuf[i * 4] / 255 - p.veil) * 0.4; }); // (a readback a frame or two: eased over a few)
    }, () => { this.veilBusy = false; });
  }

  private make(): Probe {
    const u = new THREE.Vector4();
    const px = new THREE.Vector2(2, 2);
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uProbe: { value: u }, uPx: { value: px } },
      transparent: true, depthTest: true, depthWrite: false, colorWrite: false });
    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.frustumCulled = false; mesh.renderOrder = PROBE_ORDER; mesh.visible = false;
    const p: Probe = { mesh, u, key: "", used: -1, shown: 1, answer: 1, veil: 0, pending: [], heard: false };
    // (each probe's own draw between a query's begin and end: only the main view's, at most a few waiting)
    let q: WebGLQuery | null = null;
    mesh.onBeforeRender = (r, _s, cam) => {
      const gl = this.gl;
      if (!gl || cam !== this.camera || p.pending.length > 3) return;
      const t = r.getRenderTarget(), w = t ? t.width : gl.drawingBufferWidth, h = t ? t.height : gl.drawingBufferHeight;
      px.set(2 / Math.max(1, w), 2 / Math.max(1, h));
      q = gl.createQuery();
      if (q) gl.beginQuery(gl.ANY_SAMPLES_PASSED_CONSERVATIVE, q);
    };
    mesh.onAfterRender = () => {
      const gl = this.gl;
      if (!gl || !q) return;
      gl.endQuery(gl.ANY_SAMPLES_PASSED_CONSERVATIVE);
      p.pending.push(q); q = null;
    };
    this.scene.add(mesh);
    this.pool.push(p);
    return p;
  }
}
