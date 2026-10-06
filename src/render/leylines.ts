// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a glowing line from the last runestone reached
// on to the next objectives (rules/leylines.ts; leyLines.ahead, 3), each section fainter than the
// one before, and back through the stones reached before it (leyLines.behind, 3), dimmer again
// (Ed, 2026-10-05: "six sections long, showing the next three and the past three runestones"). Wispy and magical, never ruler-straight: each link wanders
// along the low ground between its stones (the hills' valleys), and a shimmer flows along it toward
// the next stone, so the way reads at a glance. It stays on the ground in both modes (Ed: grounded):
// from the treetops it shows between the crowns, and a wide faint glow shows through them (never
// through the bent earth). When the next stone is reached the old line drains into it and the new
// one draws out from it toward the stone after.
//
// One ribbon mesh for the line, rebuilt only when it changes (a link routed a frame, so no frame
// does them all), and the old one while it drains; two draws each.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import { departureRoute, type LeyStone } from "../rules/leylines";
import type { ForestMap } from "../rules/map";

export interface LeyTuning {
  on: boolean;
  /** Sections on from the last stone reached, and back through the ones reached before it. */
  ahead: number;
  behind: number;
  /** The section just left behind's brightness as a share of the next one's (each before it fade times that). */
  behindBright: number;
  /** Each section's brightness as a share of the one before (nearer the last stone reached). */
  fade: number;
  /** The first link's brightness: a share of the first look (Ed: 0.3 of it). */
  brightness: number;
  /** Ribbon width (m) on the ground and over the treetops. */
  width: number[];
  /** Height (m) over the ground, on the ground and in the treetops (it stays on the ground: Ed, 2026-10-05). */
  height: number[];
  /** How far (share of a link's length, at most 80 m) it may stray sideways to find low ground. */
  valley: number;
  /** The shimmer's speed (m/s) and spacing (m) along the line. */
  flow: number[];
  /** The first line's way out from the treehouse (rules/leylines.ts departureRoute). */
  depart: { past: number; avoid: number };
}

const STEP = 8; // metres between route points
/** leyLines.brightness 1: the first look (v395); Ed, 2026-10-05: "about 30% as bright" (0.3). */
const BRIGHT = 4;

const VERT = /* glsl */ `
attribute vec2 aDir;     // the route's direction on the ground here
attribute float aSide;   // -1, +1: the ribbon's two edges
attribute float aS;      // metres along its link from the earlier stone
attribute float aT;      // 0 to 1 along its link
attribute float aLink;   // which link (0 the first, the oldest)
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
uniform float uTime, uGlowPass, uBright, uFade, uBehind, uShift, uLift, uCurrent, uOnlyFirst;
uniform vec2 uPulse; // the wave's pulse on the link from the last stone reached: x how far it's got (0-1, by arc length), y 1 when there's a wave clock
uniform vec2 uFlow;
uniform vec4 uReveal; // x: the first link gone before this far along (draining into its stone); y: link z shown only this far (drawing out); w: the whole line's strength
varying float vSide, vS, vT, vLink, vSeen;
varying vec3 vCol;
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  if (vSeen < 0.5) discard;
  if (uOnlyFirst > 0.5 && vLink > 0.5) discard;
  if (vLink < 0.5 && vT < uReveal.x) discard;
  bool drawing = abs(vLink - uReveal.z) < 0.5 && uReveal.y < 1.0;
  if (drawing && vT > uReveal.y) discard;
  float across = 1.0 - abs(vSide), core = across * across * across, halo = across * across;
  // The shimmer: bright heads travelling from the earlier stone to the later, each trailing off behind.
  float f = fract(vS / uFlow.y - uTime * uFlow.x / uFlow.y), pulse = pow(f, 7.0) * (1.0 - smoothstep(0.96, 1.0, f));
  // Wisps: the glow thins and thickens along the line, drifting with the flow.
  float wisp = 0.35 + 0.65 * ln(vS * 0.09 - uTime * 0.8 + vLink * 13.0) * ln(vS * 0.023 + uTime * 0.31 + vLink * 5.0 + vSide * 0.7);
  // Into each stone softly; each link fainter than the one before (easing to its new place after a wave).
  float ends = smoothstep(0.0, 0.05, vT) * smoothstep(1.0, 0.95, vT);
  // Its rank: 0 the section on from the last stone reached, 1 the one after, -1 the one just left
  // behind (easing to its new rank as she moves on).
  float r = vLink - uCurrent + uShift;
  float rank = r >= 0.0 ? pow(uFade, r) : mix(1.0, uBehind, min(1.0, -r)) * pow(uFade, max(0.0, -r - 1.0));
  float link = uBright * rank * mix(1.0, 0.8, uLift);
  // From the treetops the line is on the ground under the crowns: a wide faint glow shows through them.
  float a = uGlowPass > 0.5 ? 0.4 * halo * wisp * uLift : (core * (0.6 + 1.6 * pulse) + halo * (0.18 + 0.5 * pulse)) * wisp;
  // The wave's pulse (Ed, 2026-10-06: "the leyline between the last and next wave soundsystem should grow in intensity
  // in proportion to how much time is left before the next wave; so you can see the pulse travel along the leyline, and
  // the next soundsystem appears when it arrives"): on the link from the last stone reached, the stretch it has
  // travelled lit brighter than the stretch ahead, the whole link brightening toward the wave, a bright head at the pulse,
  // and a flash at the far stone as it arrives. vT runs by arc length, so it follows the route's curves.
  if (uPulse.y > 0.5 && abs(vLink - uCurrent) < 0.5) {
    float p = uPulse.x, behind = 1.0 - smoothstep(p - 0.01, p + 0.01, vT);
    link *= mix(0.55, 1.15, behind) * (0.6 + 0.9 * p);
    a += exp(-abs(vT - p) * 45.0) * (uGlowPass > 0.5 ? halo : core) * (1.2 + 2.0 * p);
    a += smoothstep(0.96, 1.0, p) * exp(-(1.0 - vT) * 30.0) * (uGlowPass > 0.5 ? halo : core) * 3.0;
  }
  // Drawing out toward the next stone: a bright tip leads it.
  if (drawing) a += exp(-abs(vT - uReveal.y) * 60.0) * (uGlowPass > 0.5 ? halo : core) * 2.5;
  gl_FragColor = vec4(vCol * a * link * ends * uReveal.w, 1.0);
}`;

interface LeySet { geo: THREE.BufferGeometry; meshes: THREE.Mesh[]; reveal: THREE.Vector4; current: { value: number }; onlyFirst: { value: number } }

/** How far the wave's pulse has got along the current link (0 at the last wave, 1 as the next arrives), from the party's
 *  own clock; null with no wave clock (waves off: paused, or no interval). */
export function leyPulse(left: number, interval: number, paused: boolean): number | null {
  if (paused || !(interval > 0) || interval >= 1e8) return null;
  return 1 - Math.min(1, Math.max(0, left) / interval);
}

/** The point a share t (0-1) of the way along a route by arc length: where the shader's vT = t lies (build's aT). */
export function arcPoint(pts: [number, number][], t: number): [number, number] {
  let total = 0;
  for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  let want = Math.max(0, Math.min(1, t)) * total;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (want <= l || i === pts.length - 1) { const k = l > 0 ? Math.min(1, want / l) : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]; }
    want -= l;
  }
  return pts[0];
}

export class LeyLines {
  readonly meshes: THREE.Mesh[];
  private u: Record<string, THREE.IUniform>;
  /** The line now, and the one before it while it drains away. */
  private cur: LeySet;
  private old: LeySet;
  private key = "";
  private chain: LeyStone[] = [];
  private current = 0;
  /** The routes being worked out for a new chain (a link a frame), then swapped in whole. */
  private pending: { key: string; chain: LeyStone[]; current: number; colours: THREE.Vector3[]; routes: [number, number][][] } | null = null;
  private shiftFrom = -Infinity;
  private advancedAt = -Infinity;
  /** On the last move on, whether the old line's oldest section dropped off the back (and so drains away). */
  private dropped = false;

  constructor(private T: LeyTuning, private ground: (x: number, z: number) => number, private map?: ForestMap) {
    this.u = {
      ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime,
      uLeyWidth: { value: new THREE.Vector2(T.width[0], T.width[1]) }, uLeyHeight: { value: new THREE.Vector2(T.height[0], T.height[1]) },
      uLift: { value: 0 }, uBright: { value: T.brightness * BRIGHT }, uFade: { value: T.fade }, uBehind: { value: T.behindBright },
      uShift: { value: 0 }, uFlow: { value: new THREE.Vector2(T.flow[0], T.flow[1]) }, uPulse: { value: new THREE.Vector2() },
    };
    this.cur = this.makeSet(); this.old = this.makeSet();
    this.meshes = [...this.cur.meshes, ...this.old.meshes];
  }

  /** The line's brightness times k (the mood's leyBright). */
  scale(k: number): void { this.u.uBright.value = this.T.brightness * BRIGHT * k; }

  /** The wave's pulse on the current link: how far it's got (0-1), or null for none (leyPulse). */
  pulse(p: number | null): void { this.u.uPulse.value.set(p ?? 0, p === null ? 0 : 1); }

  private makeSet(): LeySet {
    const geo = new THREE.BufferGeometry(), reveal = new THREE.Vector4(0, 1, -1, 1), current = { value: 0 }, onlyFirst = { value: 0 };
    const make = (glow: boolean, order: number) => {
      const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...this.u, uGlowPass: { value: glow ? 1 : 0 }, uReveal: { value: reveal }, uCurrent: current, uOnlyFirst: onlyFirst },
        transparent: true, depthWrite: false, depthTest: !glow, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }));
      m.frustumCulled = false; m.renderOrder = order; m.visible = false;
      return m;
    };
    return { geo, meshes: [make(false, 13), make(true, 14)], reveal, current, onlyFirst };
  }

  /** chain: the stones in wave order and which is the last reached (rules/leylines.ts leyChain);
   *  key: changes when it does; colourOf: a stone's glow colour; lift: 0 on the ground to 1 over the treetops. */
  update(key: string, chain: () => { stones: LeyStone[]; current: number }, colourOf: (s: LeyStone) => THREE.Vector3, time: number, lift: number): void {
    if (this.T.on && key !== this.key && this.pending?.key !== key) {
      const c = chain();
      this.pending = { key, chain: c.stones, current: c.current, colours: c.stones.map(colourOf), routes: [] };
    }
    // Route one link a frame; when all are, swap the new line in.
    if (this.pending) {
      const P = this.pending;
      if (P.routes.length < P.chain.length - 1) { const k = P.routes.length; P.routes.push(this.route(P.chain[k], P.chain[k + 1], k)); }
      if (P.routes.length >= P.chain.length - 1) {
        // Moved on (the last stone reached now the one the old line led to next): the new line's
        // newest section draws out toward its far stone, and the old line's oldest section, if it
        // has dropped off the back, drains into the stone after it; anything else (a new plan) just swaps.
        const key0 = (s: LeyStone) => s.cell.join(), was = this.chain[this.current + 1];
        const advanced = !!was && P.chain.length > 1 && key0(P.chain[P.current]) === key0(was);
        if (advanced) {
          const t = this.old; this.old = this.cur; this.cur = t; this.advancedAt = this.shiftFrom = time;
          this.old.onlyFirst.value = 1;
          this.dropped = this.chain.length > 1 && !P.chain.some(s => key0(s) === key0(this.chain[0]));
        } else this.advancedAt = -Infinity;
        this.build(this.cur.geo, P.colours, P.routes);
        this.cur.current.value = P.current; this.cur.onlyFirst.value = 0;
        this.key = P.key; this.chain = P.chain; this.current = P.current; this.pending = null;
      }
    }
    // The move on: the old line drains into its stone over a second; the new one draws out from
    // it toward the next stone, starting a moment later.
    const k = time - this.advancedAt, ease = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };
    const draining = k < 1.6 && this.dropped, links = Math.max(0, this.chain.length - 2), ahead = this.chain.length - 1 > this.current;
    this.old.reveal.set(ease(k / 1.1), 1, -1, 1 - ease((k - 0.9) / 0.7));
    this.cur.reveal.set(0, k < 0 || !Number.isFinite(k) || !ahead ? 1 : ease((k - 0.35) / 1.3), links, 1);
    const on = this.T.on && this.chain.length > 1;
    for (const m of this.cur.meshes) m.visible = on;
    for (const m of this.old.meshes) m.visible = on && draining;
    this.u.uLift.value = lift;
    this.u.uShift.value = Math.max(0, 1 - (time - this.shiftFrom) / 1.5);
  }

  /** A link's route from stone a to b: a gently wandering line along the low ground between them. */
  private route(a: LeyStone, b: LeyStone, k: number): [number, number][] {
    // From the treehouse at the start: due south out of its front, then round to the first objective.
    if (a.depart && this.map) return departureRoute(this.map, b, this.T.depart.past, this.T.depart.avoid, STEP / 2);
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

  private build(g: THREE.BufferGeometry, colours: THREE.Vector3[], routes: [number, number][][]): void {
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
