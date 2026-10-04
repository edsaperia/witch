// The ley lines (Ed, 2026-10-04): a glowing chain through the runestones in wave order
// (rules/leylines.ts), from the previous wave's stone through the current one to the next and on:
// six links, each fainter than the one before. Wispy and magical, never ruler-straight: each link
// wanders along the low ground between its stones (the hills' valleys), and a shimmer flows along
// it from the earlier stone to the later, so the order reads at a glance. On the ground it runs
// knee-high through the forest; rising, it lifts over the canopy so it reads from the treetops,
// where she navigates, bending with the world; there a faint glow also shows through the leaves
// (never through the bent earth). When a wave fires the chain moves on a link, each link easing
// into its new brightness.
//
// One instanced-free ribbon mesh for the whole chain, rebuilt only when the chain changes (a link
// routed a frame, so no frame does all six); two draws a frame.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import type { LeyStone } from "../rules/leylines";

export interface LeyTuning {
  on: boolean;
  /** Links in the chain (stones − 1). */
  links: number;
  /** Each link's brightness as a share of the one before. */
  fade: number;
  /** The first link's brightness. */
  brightness: number;
  /** Ribbon width (m) on the ground and over the treetops. */
  width: number[];
  /** Height (m) over the ground on the ground, and over the treetops' canopy. */
  height: number[];
  /** How far (share of a link's length, at most 80 m) it may stray sideways to find low ground. */
  valley: number;
  /** The shimmer's speed (m/s) and spacing (m) along the line. */
  flow: number[];
}

const STEP = 8; // metres between route points

const VERT = /* glsl */ `
attribute vec2 aDir;     // the route's direction on the ground here
attribute float aSide;   // -1, +1: the ribbon's two edges
attribute float aS;      // metres along its link from the earlier stone
attribute float aT;      // 0 to 1 along its link
attribute float aLink;   // which link (0 the first: the brightest)
attribute vec3 aCol;
uniform vec2 uLeyWidth, uLeyHeight;
uniform float uLift, uTime, uGlowPass;
varying float vSide, vS, vT, vLink, vSeen;
varying vec3 vCol;
${HEIGHT_VERT_GLSL}
void main() {
  vec2 side = vec2(-aDir.y, aDir.x);
  float w = mix(uLeyWidth.x, uLeyWidth.y, uLift) * (uGlowPass > 0.5 ? 3.0 : 1.0);
  // Wispy: the line drifts a little side to side as it goes, slowly.
  float drift = sin(aS * 0.11 + uTime * 0.6 + aLink * 1.7) * 0.6 + sin(aS * 0.037 - uTime * 0.23) * 1.2;
  vec2 xz = position.xz + side * (drift * sin(3.14159 * aT) + aSide * w * 0.5);
  vec3 p = onGround(vec3(xz.x, mix(uLeyHeight.x, uLeyHeight.y, uLift), xz.y));
  vSeen = uGlowPass > 0.5 ? overBend(p) : 1.0; // (seen through the leaves, never through the earth)
  vSide = aSide; vS = aS; vT = aT; vLink = aLink; vCol = aCol;
  gl_Position = clipOf(p);
}`;

const FRAG = /* glsl */ `
uniform float uTime, uGlowPass, uBright, uFade, uShift, uLift;
uniform vec2 uFlow;
varying float vSide, vS, vT, vLink, vSeen;
varying vec3 vCol;
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  if (vSeen < 0.5) discard;
  float across = 1.0 - abs(vSide), core = across * across * across;
  // The shimmer: bright heads travelling from the earlier stone to the later, each trailing off behind.
  float f = fract(vS / uFlow.y - uTime * uFlow.x / uFlow.y), pulse = pow(f, 7.0) * (1.0 - smoothstep(0.96, 1.0, f));
  // Wisps: the glow thins and thickens along the line, drifting with the flow.
  float wisp = 0.55 + 0.45 * ln(vS * 0.09 - uTime * 0.8 + vLink * 13.0);
  // Into each stone softly; each link fainter than the one before (easing to its new place after a wave).
  float ends = smoothstep(0.0, 0.05, vT) * smoothstep(1.0, 0.95, vT);
  float link = uBright * pow(uFade, max(0.0, vLink + uShift));
  float a = uGlowPass > 0.5 ? 0.18 * across * across * wisp * uLift : (core * (0.45 + 1.4 * pulse) + 0.25 * across * pulse) * wisp;
  gl_FragColor = vec4(vCol * a * link * ends, 1.0);
}`;

export class LeyLines {
  readonly meshes: THREE.Mesh[];
  private geo = new THREE.BufferGeometry();
  private u: Record<string, THREE.IUniform>;
  private key = "";
  private chain: LeyStone[] = [];
  /** The routes being worked out for a new chain (a link a frame), then swapped in whole. */
  private pending: { key: string; chain: LeyStone[]; colours: THREE.Vector3[]; routes: [number, number][][] } | null = null;
  private shiftFrom = 0;

  /** canopy: how high the treetops are (m), which it rises over. */
  constructor(private T: LeyTuning, private ground: (x: number, z: number) => number, canopy: number) {
    this.u = {
      ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime,
      uLeyWidth: { value: new THREE.Vector2(T.width[0], T.width[1]) }, uLeyHeight: { value: new THREE.Vector2(T.height[0], canopy + T.height[1]) },
      uLift: { value: 0 }, uGlowPass: { value: 0 }, uBright: { value: T.brightness }, uFade: { value: T.fade },
      uShift: { value: 0 }, uFlow: { value: new THREE.Vector2(T.flow[0], T.flow[1]) },
    };
    const make = (glow: boolean, order: number) => {
      const m = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...this.u, uGlowPass: { value: glow ? 1 : 0 } },
        transparent: true, depthWrite: false, depthTest: !glow, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }));
      m.frustumCulled = false; m.renderOrder = order; m.visible = false;
      return m;
    };
    this.meshes = [make(false, 13), make(true, 14)];
  }

  /** chain: the stones in wave order; key: changes when it does; colourOf: a stone's glow colour;
   *  lift: 0 on the ground to 1 over the treetops. */
  update(key: string, chain: () => LeyStone[], colourOf: (s: LeyStone) => THREE.Vector3, time: number, lift: number): void {
    const on = this.T.on && (this.chain.length > 1 || !!this.pending);
    if (this.T.on && key !== this.key && this.pending?.key !== key) {
      const c = chain();
      this.pending = { key, chain: c, colours: c.map(colourOf), routes: [] };
    }
    // Route one link a frame; when all are, swap the new chain in.
    if (this.pending) {
      const P = this.pending;
      if (P.routes.length < P.chain.length - 1) { const k = P.routes.length; P.routes.push(this.route(P.chain[k], P.chain[k + 1], k)); }
      if (P.routes.length >= P.chain.length - 1) {
        const advanced = this.chain.length > 1 && P.chain.length > 1 && this.chain[1] && P.chain[0].cell.join() === this.chain[1].cell.join();
        this.build(P.colours, P.routes);
        this.key = P.key; this.chain = P.chain; this.pending = null;
        if (advanced) this.shiftFrom = time; // each link eases from its old brightness to its new
      }
    }
    for (const m of this.meshes) m.visible = on && this.chain.length > 1;
    this.u.uLift.value = lift;
    this.u.uShift.value = Math.max(0, 1 - (time - this.shiftFrom) / 1.5);
  }

  /** A link's route from stone a to b: a gently wandering line along the low ground between them. */
  private route(a: LeyStone, b: LeyStone, k: number): [number, number][] {
    const dx = b.x - a.x, dz = b.z - a.z, L = Math.hypot(dx, dz) || 1, ux = dx / L, uz = dz / L, px = -uz, pz = ux;
    const n = Math.max(2, Math.ceil(L / STEP)), W = Math.min(80, L * this.T.valley), off = new Float64Array(n + 1);
    for (let i = 1; i < n; i++) {
      const t = i / n, bx = a.x + dx * t, bz = a.z + dz * t;
      let best = 0, bh = Infinity;
      for (let o = -W; o <= W + 1e-6; o += W / 6) {
        const h = this.ground(bx + px * o, bz + pz * o) + Math.abs(o) * 0.04; // (a little loath to stray)
        if (h < bh) { bh = h; best = o; }
      }
      off[i] = best;
    }
    // Smoothed into a gentle curve, held to its stones at the ends, with a little wander of its own.
    for (let pass = 0; pass < 4; pass++) for (let i = 1; i < n; i++) off[i] = (off[i - 1] + 2 * off[i] + off[i + 1]) / 4;
    const pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, env = Math.sin(Math.PI * t), o = off[i] * env + Math.sin(t * Math.PI * 2.3 + k * 1.9 + a.x * 0.01) * W * 0.12 * env;
      pts.push([a.x + dx * t + px * o, a.z + dz * t + pz * o]);
    }
    return pts;
  }

  private build(colours: THREE.Vector3[], routes: [number, number][][]): void {
    const pos: number[] = [], dir: number[] = [], side: number[] = [], s: number[] = [], tt: number[] = [], link: number[] = [], col: number[] = [], idx: number[] = [];
    routes.forEach((pts, k) => {
      const ca = colours[k], cb = colours[k + 1], lens = [0];
      for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const total = lens[lens.length - 1] || 1;
      pts.forEach((p, i) => {
        const q0 = pts[Math.max(0, i - 1)], q1 = pts[Math.min(pts.length - 1, i + 1)], l = Math.hypot(q1[0] - q0[0], q1[1] - q0[1]) || 1;
        const t = lens[i] / total, base = pos.length / 3;
        for (const sd of [-1, 1]) {
          pos.push(p[0], 0, p[1]); dir.push((q1[0] - q0[0]) / l, (q1[1] - q0[1]) / l); side.push(sd);
          s.push(lens[i]); tt.push(t); link.push(k);
          col.push(ca.x + (cb.x - ca.x) * t, ca.y + (cb.y - ca.y) * t, ca.z + (cb.z - ca.z) * t);
        }
        if (i > 0) idx.push(base - 2, base - 1, base, base - 1, base + 1, base);
      });
    });
    const g = this.geo;
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aDir", new THREE.Float32BufferAttribute(dir, 2));
    g.setAttribute("aSide", new THREE.Float32BufferAttribute(side, 1));
    g.setAttribute("aS", new THREE.Float32BufferAttribute(s, 1));
    g.setAttribute("aT", new THREE.Float32BufferAttribute(tt, 1));
    g.setAttribute("aLink", new THREE.Float32BufferAttribute(link, 1));
    g.setAttribute("aCol", new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
  }
}
