// Hidden as the animals are (Ed, 2026-10-19: "envelopes are hidden by scenery", "This also includes 'invite amount' rings"): the 💌s
// and the invite rings are DOM pixel art over the canvas (render/invites.ts), so the depth that hides an animal behind a trunk or a
// crown never touched them. Each one asks here instead, with a probe: a small invisible quad where it is, drawn into the scene with
// a WebGL2 occlusion query at render order PROBE_ORDER. That is after everything solid (the opaque pass: trees, rocks, scenery, the
// animals themselves) and the smoke, and before the see-through passes round her (render/sprites.ts, 10.9 and on), so the depth it
// meets is exactly the depth an animal meets: hidden behind a trunk, a crown or a rock, and showing through her cut-away where an
// animal does. The answers come back a frame or two later (no stall: read only once available) and are eased, so nothing flickers
// as a letter crosses a trunk's edge. Without WebGL2 queries nothing is ever hidden (as before).
//
// Ed, 2026-11-05: smoke no longer dims indicators. Ordinary scenery depth still hides them.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

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

interface Probe { mesh: THREE.Mesh; u: THREE.Vector4; key: string; used: number; shown: number; answer: number; pending: WebGLQuery[]; /** answered since it took its key */ heard: boolean }

export class OcclusionProbes {
  private gl: WebGL2RenderingContext | null;
  private pool: Probe[] = [];
  private byKey = new Map<string, Probe>();
  private geo = new THREE.PlaneGeometry(1, 1);
  private frame = 0;
  private lastTime = -1;
  /** ?occlusion=off: nothing hidden, to compare. */
  on = true;
  constructor(private scene: THREE.Scene, renderer: THREE.WebGLRenderer, private camera: THREE.Camera) {
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
      p.key = key; p.shown = 1; p.answer = 1; p.heard = false;
      this.byKey.set(key, p);
    }
    p.u.set(x, y, z, half);
    p.used = this.frame;
    p.mesh.visible = true;
  }

  /** Another night (View.setGame): every probe let go of its key (those waiting on a query are taken again once it's answered). */
  reset(): void {
    for (const p of this.pool) { p.key = ""; p.mesh.visible = false; p.shown = 1; p.answer = 1; p.heard = false; }
    this.byKey.clear(); this.lastTime = -1;
  }

  /** Whether every probe in use has had an answer back (for the checks: tools/occlusion). */
  get settled(): boolean { return this.pool.every(p => !p.key || p.heard); }

  /** How much of it shows (0 hidden to 1 seen), eased; 1 for anything never asked about. */
  shown(key: string): number { const p = this.on ? this.byKey.get(key) : undefined; return p ? p.shown : 1; }

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
      if (p.used < this.frame - 1) p.mesh.visible = false; // (not asked about last frame: not drawn)
      if (this.frame - p.used > FORGET * 60 && !p.pending.length) { this.byKey.delete(p.key); p.key = ""; }
    }
  }

  private make(): Probe {
    const u = new THREE.Vector4();
    const px = new THREE.Vector2(2, 2);
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uProbe: { value: u }, uPx: { value: px } },
      transparent: true, depthTest: true, depthWrite: false, colorWrite: false });
    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.frustumCulled = false; mesh.renderOrder = PROBE_ORDER; mesh.visible = false;
    const p: Probe = { mesh, u, key: "", used: -1, shown: 1, answer: 1, pending: [], heard: false };
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
