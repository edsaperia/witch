// The witch's flight trail (Ed, 2026-10-06: "The trail behind the witch as she flies is currently little 'puffs'. It should be
// more like a fading-out glow, similar to the leylines. Its length relates to her speed: 5 m on the ground and 20 m on the
// treetops. The glow should be the same as the current area colour."): a ribbon of glow along the way she has just flown, in the
// ley lines' look (a bright core, a soft halo, wisps drifting along it, added on), fading out along its length to nothing at
// its tail. Its length follows her speed, up to `trail.ground` metres at full speed on the ground and `trail.treetops` over the
// treetops, shrinking to nothing as she slows; its colour is the area she's flying over (its creature's neon, as the ley lines
// and the runestones use), eased as she crosses into the next, so a trail across a border runs from one colour into the other.
//
// One mesh, updated in place: her recent path in a fixed ring of points, the ribbon's vertices in fixed typed arrays, so
// nothing is made per frame.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";

export interface TrailTuning {
  on: boolean;
  /** Its length (m) at full speed on the ground and over the treetops. */
  ground: number;
  treetops: number;
  /** The share of her top speed it starts at (slower, none), and the curve from there to full length (1: straight). */
  from: number;
  curve: number;
  /** Its width (m) on the ground and over the treetops. */
  width: number[];
  /** Its brightness, and how quickly it fades along its length (the power of what's left). */
  bright: number;
  fade: number;
  /** Seconds its length takes to grow to a new speed's, and to shrink back; and its colour to change to a new area's. */
  grow: number;
  shrink: number;
  colourEase: number;
  /** The broom's little amber sparks as well (render/spellfx.ts). */
  sparks: boolean;
}

export const TRAIL_DEFAULT: TrailTuning = { on: true, ground: 5, treetops: 20, from: 0.15, curve: 1, width: [1, 2.6], bright: 1, fade: 1.6, grow: 0.25, shrink: 0.6, colourEase: 0.6, sparks: true };

const DYNAMIC = ["position", "aDir", "aT", "aS", "aCol"];
/** Points of her path kept (enough for the longest trail at its spacing). */
const CAP = 192;

const VERT = /* glsl */ `
attribute vec2 aDir;
attribute float aSide, aT, aS;
attribute vec3 aCol;
uniform float uTrailWidth;
varying float vSide, vT, vS;
varying vec3 vCol;
${HEIGHT_VERT_GLSL}
void main() {
  vec2 side = vec2(-aDir.y, aDir.x);
  // narrowing toward the tail, and a little at her broom
  float w = uTrailWidth * (1.0 - 0.55 * aT) * (0.6 + 0.4 * smoothstep(0.0, 0.08, aT));
  vec3 p = onGround(vec3(position.x + side.x * aSide * w * 0.5, position.y, position.z + side.y * aSide * w * 0.5));
  vSide = aSide; vT = aT; vS = aS; vCol = aCol;
  gl_Position = clipOf(p);
}`;

const FRAG = /* glsl */ `
uniform float uTime, uBright, uFade;
varying float vSide, vT, vS;
varying vec3 vCol;
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  float across = 1.0 - abs(vSide), core = across * across * across, halo = across * across;
  // wisps: the glow thinning and thickening along it, drifting back from her (as the ley lines' do)
  float wisp = 0.72 + 0.28 * ln(vS * 0.3 + uTime * 1.6) * ln(vS * 0.11 - uTime * 0.7 + vSide * 0.6);
  float fade = pow(max(0.0, 1.0 - vT), uFade);
  float a = (core * 0.9 + halo * 0.35) * wisp * fade;
  gl_FragColor = vec4(vCol * a * uBright, 1.0);
}`;

export class WitchTrail {
  readonly mesh: THREE.Mesh;
  /** Her path: x, y, z, and the colour there (r, g, b), newest at `head`. */
  private path = new Float32Array(CAP * 6);
  private count = 0;
  private head = -1;
  private pos: Float32Array;
  private dir: Float32Array;
  private side: Float32Array;
  private tt: Float32Array;
  private ss: Float32Array;
  private col: Float32Array;
  private geo = new THREE.BufferGeometry();
  private u = { uTime: LIGHT_UNIFORMS.uTime, uTrailWidth: { value: 0.5 }, uBright: { value: 1 }, uFade: { value: 1.6 } };
  /** Its length now (m), and its colour now (eased toward the area's). */
  private len = 0;
  private rgb = new THREE.Vector3(-1, 0, 0);
  private lastBlink = -Infinity;
  /** The ribbon's points written so far this frame. */
  private n = 0;
  /** Writes the ribbon's next point (its two edges' vertices): where, its direction on the ground, metres from her, colour. */
  private put = (vx: number, vy: number, vz: number, dx: number, dz: number, s: number, r: number, gg: number, b: number): void => {
    for (let k = 0; k < 2; k++) {
      const v = this.n * 2 + k;
      this.pos[v * 3] = vx; this.pos[v * 3 + 1] = vy; this.pos[v * 3 + 2] = vz;
      this.dir[v * 2] = dx; this.dir[v * 2 + 1] = dz;
      this.ss[v] = s; this.tt[v] = this.len > 0 ? Math.min(1, s / this.len) : 1;
      this.col[v * 3] = r; this.col[v * 3 + 1] = gg; this.col[v * 3 + 2] = b;
    }
    this.n++;
  };

  constructor(private T: TrailTuning = TRAIL_DEFAULT) {
    const V = (CAP + 1) * 2;
    this.pos = new Float32Array(V * 3); this.dir = new Float32Array(V * 2); this.side = new Float32Array(V);
    this.tt = new Float32Array(V); this.ss = new Float32Array(V); this.col = new Float32Array(V * 3);
    for (let i = 0; i < V; i++) this.side[i] = i % 2 ? 1 : -1;
    const idx = new Uint16Array(CAP * 6);
    for (let i = 0; i < CAP; i++) { const b = i * 2; idx.set([b, b + 1, b + 2, b + 1, b + 3, b + 2], i * 6); }
    const g = this.geo;
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aDir", new THREE.BufferAttribute(this.dir, 2).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aSide", new THREE.BufferAttribute(this.side, 1));
    g.setAttribute("aT", new THREE.BufferAttribute(this.tt, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aS", new THREE.BufferAttribute(this.ss, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aCol", new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    g.setDrawRange(0, 0);
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, ...this.u },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    }));
    this.mesh.frustumCulled = false; this.mesh.renderOrder = 12;
  }

  /** Forgets her path (a blink, a teleport home): the trail starts again from where she is. */
  reset(): void { this.count = 0; this.head = -1; this.len = 0; }

  /** x, y, z: where her broom's bristles are (y: metres over the ground); speed (m/s) and her top speed now; lift: 0 on the
   *  ground to 1 over the treetops; area: the colour (0..1) of the area she's over; blinkAt: her last blink's time. */
  update(x: number, y: number, z: number, speed: number, top: number, lift: number, area: THREE.Vector3, time: number, dt: number, blinkAt: number): void {
    const T = this.T;
    this.mesh.visible = T.on;
    if (!T.on) return;
    if (blinkAt !== this.lastBlink) { this.lastBlink = blinkAt; if (Number.isFinite(blinkAt)) this.reset(); }
    // its colour: eased toward the area's
    if (this.rgb.x < 0) this.rgb.copy(area);
    else this.rgb.lerp(area, 1 - Math.exp(-Math.max(0, dt) / Math.max(0.01, T.colourEase)));
    // its length: by her speed, growing quickly and shrinking more slowly
    const share = Math.min(1, Math.max(0, (speed / Math.max(1, top) - T.from) / Math.max(0.01, 1 - T.from)));
    const want = (T.ground + (T.treetops - T.ground) * lift) * Math.pow(share, T.curve);
    this.len += (want - this.len) * (1 - Math.exp(-Math.max(0, dt) / Math.max(0.01, want > this.len ? T.grow : T.shrink)));
    // her path: a point when she has moved far enough from the last (closer together for a short trail)
    const P = this.path, gap = Math.max(0.15, Math.min(1, this.len / 60));
    const last = this.head * 6;
    if (this.count === 0 || Math.hypot(x - P[last], z - P[last + 2]) >= gap) {
      this.head = (this.head + 1) % CAP; this.count = Math.min(CAP, this.count + 1);
      const o = this.head * 6;
      P[o] = x; P[o + 1] = y; P[o + 2] = z; P[o + 3] = this.rgb.x; P[o + 4] = this.rgb.y; P[o + 5] = this.rgb.z;
    }
    // the ribbon: from her broom back along her path until it's as long as it should be
    let s = 0, px = x, pz = z;
    this.n = 0;
    const put = this.put;
    if (this.len > 0.05 && this.count > 0) {
      put(x, y, z, 0, 1, 0, this.rgb.x, this.rgb.y, this.rgb.z);
      for (let i = 0; i < this.count && this.n <= CAP; i++) {
        const o = ((this.head - i + CAP) % CAP) * 6, qx = P[o], qz = P[o + 2], d = Math.hypot(qx - px, qz - pz);
        if (d < 1e-4) continue;
        const dx = (px - qx) / d, dz = (pz - qz) / d;
        if (this.n === 1) { this.dir[0] = dx; this.dir[1] = dz; this.dir[2] = dx; this.dir[3] = dz; } // (her end faces the way she's going)
        if (s + d >= this.len) { // the tail: part of the way to this point
          const f = (this.len - s) / d, ox = this.path[o + 1];
          s = this.len;
          put(px + (qx - px) * f, y + (ox - y) * f, pz + (qz - pz) * f, dx, dz, s, P[o + 3], P[o + 4], P[o + 5]);
          break;
        }
        s += d; px = qx; pz = qz;
        put(qx, P[o + 1], qz, dx, dz, s, P[o + 3], P[o + 4], P[o + 5]);
      }
    }
    const g = this.geo;
    g.setDrawRange(0, this.n > 1 ? (this.n - 1) * 6 : 0);
    for (const k of DYNAMIC) (g.getAttribute(k) as THREE.BufferAttribute).needsUpdate = true;
    this.u.uTrailWidth.value = T.width[0] + (T.width[1] - T.width[0]) * lift;
    this.u.uBright.value = T.bright * 3;
    this.u.uFade.value = T.fade;
    void time;
  }
}
