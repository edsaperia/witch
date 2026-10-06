// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a glowing line through every wave's runestone,
// the whole route the whole time (Ed, 2026-10-06; rules/leylines.ts, rules/leyroute.ts), brightest
// on from the last stone reached, each section ahead fainter than the one before and the ones
// behind dimmer again, down to leyLines.far. Wispy and magical, never ruler-straight: each link wanders
// along the low ground between its stones (the hills' valleys), and a shimmer flows along it toward
// the next stone, so the way reads at a glance. It stays on the ground in both modes (Ed: grounded):
// from the treetops it shows between the crowns, and a wide faint glow shows through them (never
// through the bent earth). When the next stone is reached the sections brighten and dim to their
// new places.
//
// One ribbon mesh for the whole line, rebuilt only when the route changes (its links routed a
// couple of milliseconds' worth a frame; moving on along it only sets a uniform); two draws,
// nothing allocated a frame.
import type { PartyState } from "../rules/party";
import { pulseProgress } from "../rules/leypulse";
import { bootPath } from "../rules/bootRing";
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import { departureRoute, type LeyStone } from "../rules/leylines";
import { polylinesMeet } from "../rules/crossing";
import type { ForestMap } from "../rules/map";

export interface LeyTuning {
  on: boolean;
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
  /** Its pixel core (Ed, round 14): half-width on the ground and over the treetops, then its half-bright rim on each, metres. */
  core?: number[];
  /** The faintest a section gets, ahead and behind, as a share of the next one's (Ed, 2026-10-06: the whole route always shows). */
  far: number[];
  /** The first line's way out from the treehouse (rules/leylines.ts departureRoute). */
  depart: { avoid: number };
}

const STEP = 8; // metres between route points
/** Milliseconds a frame spent routing a new line's links (the whole route: about two hundred). */
const ROUTE_MS = 2;
/** How tame a link is drawn when its wander would meet another's (a share of its usual wander; 0 its own way). */
const TAME = [1, 0.5, 0.2, 0];
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
varying float vSide, vS, vT, vLink, vSeen, vW;
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
  vSide = aSide; vS = aS; vT = aT; vLink = aLink; vCol = aCol; vW = w;
  gl_Position = clipOf(p);
}`;

const FRAG = /* glsl */ `
uniform float uTime, uGlowPass, uBright, uFade, uBehind, uShift, uLift, uCurrent, uStrength;
uniform vec2 uFar; // the faintest a section gets, ahead and behind (the whole route always shows)
uniform vec2 uGrow; // the line drawn only this far (x, in links along the route from its start) while y is 1: Ed's reveal, growing out from the treehouse
uniform vec2 uPulse; // the wave's pulse on the link from the last stone reached: x how far it's got (0-1, by arc length), y 1 when there's a wave clock
uniform vec2 uFlow;
uniform vec4 uCore; // its pixel core's half-width and rim (metres) on the ground and over the treetops
uniform float uMpp; // metres per art pixel
varying float vSide, vS, vT, vLink, vSeen, vW;
varying vec3 vCol;
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  if (vSeen < 0.5) discard;
  float along = vLink + vT; // links along the route from its start
  if (uGrow.y > 0.5 && along > uGrow.x) discard;
  float across = 1.0 - abs(vSide), halo = across * across;
  // Ed, round 14: "the leyline and pulse are not pixelated. Lighting effects can be non-pixel but they should be lighting
  // objects that are pixels"; and "the leyline is too faint". On the ground the line itself is pixels: a hard core a whole
  // number of art pixels across and a half-bright rim round it, its brightness worked out per art pixel along it in a few
  // flat steps; round it, the smooth glow it casts (light). From the treetops, the glow through the crowns stays smooth.
  float sq = (floor(vS / uMpp) + 0.5) * uMpp;                                // along, at its art pixel's middle
  float off = floor(abs(vSide) * 0.5 * vW / uMpp);                            // art pixels from its middle
  float coreN = floor(mix(uCore.x, uCore.y, uLift) / uMpp + 0.5), rimN = max(1.0, floor(mix(uCore.z, uCore.w, uLift) / uMpp + 0.5));
  float solid = off < coreN ? 1.0 : off < coreN + rimN ? 0.5 : 0.0;
  float sAt = uGlowPass > 0.5 ? vS : sq;
  // The shimmer: bright heads travelling from the earlier stone to the later, each trailing off behind.
  float f = fract(sAt / uFlow.y - uTime * uFlow.x / uFlow.y), pulse = pow(f, 7.0) * (1.0 - smoothstep(0.96, 1.0, f));
  // Wisps: the glow thins and thickens along the line, drifting with the flow.
  float wisp = 0.35 + 0.65 * ln(sAt * 0.09 - uTime * 0.8 + vLink * 13.0) * ln(sAt * 0.023 + uTime * 0.31 + vLink * 5.0);
  // Into each stone softly; each link fainter than the one before (easing to its new place after a wave).
  float ends = smoothstep(0.0, 0.05, vT) * smoothstep(1.0, 0.95, vT);
  // Its rank: 0 the section on from the last stone reached, 1 the one after, -1 the one just left
  // behind (easing to its new rank as she moves on).
  float r = vLink - uCurrent + uShift;
  float rank = r >= 0.0 ? max(pow(uFade, r), uFar.x) : max(mix(1.0, uBehind, min(1.0, -r)) * pow(uFade, max(0.0, -r - 1.0)), uFar.y);
  float link = uBright * rank * mix(1.0, 0.8, uLift);
  // The core's own brightness, in flat steps (a quarter at a time); the glow it casts, smooth.
  float lvl = floor((0.7 + 0.3 * wisp + 1.4 * pulse) * 4.0 + 0.5) / 4.0;
  float glow = halo * (0.15 + 0.35 * pulse) * wisp;
  float a = uGlowPass > 0.5 ? 0.4 * halo * wisp * uLift : solid * lvl + glow;
  // The wave's pulse (Ed, 2026-10-06: "the leyline between the last and next wave soundsystem should grow in intensity
  // in proportion to how much time is left before the next wave; so you can see the pulse travel along the leyline, and
  // the next soundsystem appears when it arrives"): on the link from the last stone reached, the stretch it has
  // travelled lit brighter than the stretch ahead, the whole link brightening toward the wave, a bright head at the pulse,
  // and a flash at the far stone as it arrives. vT runs by arc length, so it follows the route's curves. Its head, like the
  // line, is pixels (stepped, on the core and rim) with its glow round it.
  if (uPulse.y > 0.5 && abs(vLink - uCurrent) < 0.5) {
    float p = uPulse.x, behind = 1.0 - step(p, vT);
    link *= mix(0.35, 1.3, behind) * (0.45 + 1.2 * p);
    float head = exp(-abs(vT - p) * 25.0), arrive = smoothstep(0.96, 1.0, p) * exp(-(1.0 - vT) * 30.0);
    if (uGlowPass > 0.5) a += (head * (2.5 + 3.5 * p) + arrive * 3.0) * halo;
    else a += floor((head * (2.5 + 3.5 * p) + arrive * 3.0) * solid * 3.0) / 3.0 + (head + arrive) * glow * 2.0;
  }
  // Growing out (Ed): a bright tip leads it, pixels with a glow.
  if (uGrow.y > 0.5) { float tip = exp(-abs(along - uGrow.x) * 30.0); a += uGlowPass > 0.5 ? tip * halo * 2.0 : floor(tip * solid * 2.0 * 3.0) / 3.0 + tip * glow * 2.0; }
  gl_FragColor = vec4(vCol * a * link * ends * uStrength, 1.0);
}`;

interface LeySet { geo: THREE.BufferGeometry; meshes: THREE.Mesh[]; current: { value: number } }

/** The pulse's place along the current link for the shader (0-1), or null for none: the HUD's wave pointer's own
 *  (rules/leypulse.ts pulseProgress, so the two agree), but none while home boots up (Ed, 2026-10-06: "during boot up
 *  phase, there's no leyline") or with no wave clock (?wave=off: paused, or no interval). */
export function shaderPulse(p: PartyState, map: ForestMap, time: number): number | null {
  const iv = map.tuning.party.interval;
  if (p.paused || !(iv > 0) || iv >= 1e8 || time < p.bootUntil) return null;
  return pulseProgress(p, map, time);
}

/** How far the line is drawn, in links along the whole route from the treehouse, or null for all of it (Ed, 2026-10-06:
 *  "before that, during boot up phase, there's no leyline ... Then the leyline appears, starting at the treehouse, moving
 *  three times (adjustable) the speed on the pulse (so it reaches runestone 3 by the time the first wave finishes)"): none
 *  until home has booted; then the tip runs at `reveal` links a wave, reaching the `reveal`th stone as the first wave
 *  lands and going on at that pace (so no stone pops on at once), until it has drawn the whole route; with no wave
 *  clock, all of it once booted. rules/leypulse.ts leyReachTimes says when it reaches each stone, at the same pace. */
export function leyReveal(p: PartyState, map: ForestMap, time: number, reveal: number): number | null {
  if (p.spellAt === null || time < p.bootUntil) return 0;
  const k = shaderPulse(p, map, time);
  return k === null ? null : reveal * (p.wave + k);
}

export class LeyLines {
  readonly meshes: THREE.Mesh[];
  private u: Record<string, THREE.IUniform>;
  /** The line now. */
  private cur: LeySet;
  private key = NaN;
  private chain: LeyStone[] = [];
  private current = 0;
  /** The routes being worked out for a new chain (a link a frame), then swapped in whole. */
  private pending: { key: number; chain: LeyStone[]; current: number; colours: THREE.Vector3[]; routes: [number, number][][] } | null = null;
  private shiftFrom = -Infinity;

  constructor(private T: LeyTuning, private ground: (x: number, z: number) => number, private map?: ForestMap) {
    this.u = {
      ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime,
      uLeyWidth: { value: new THREE.Vector2(T.width[0], T.width[1]) }, uLeyHeight: { value: new THREE.Vector2(T.height[0], T.height[1]) },
      uLift: { value: 0 }, uBright: { value: T.brightness * BRIGHT }, uFade: { value: T.fade }, uBehind: { value: T.behindBright },
      uShift: { value: 0 }, uFar: { value: new THREE.Vector2(T.far[0], T.far[1]) }, uFlow: { value: new THREE.Vector2(T.flow[0], T.flow[1]) },
      uPulse: { value: new THREE.Vector2() }, uGrow: { value: new THREE.Vector2() },
      uCore: { value: new THREE.Vector4(...(T.core ?? [0.3, 0.6, 0.15, 0.3])) }, uMpp: { value: map ? 1 / (map.tuning.artPixelsPerMetre * (2 / map.tuning.pixelSize)) : 0.1 },
    };
    this.cur = this.makeSet();
    this.ringSet = this.makeSet({ uPulse: { value: this.ringPulse }, uGrow: { value: this.ringGrow }, uStrength: this.ringStrength });
    if (map) this.build(this.ringSet.geo, [new THREE.Vector3(1, 0.7, 0.42), new THREE.Vector3(1, 0.7, 0.42)], [bootPath(map).path]);
    this.meshes = [...this.cur.meshes, ...this.ringSet.meshes];
  }

  /** The drawn route of the line's links (each from one stone to the next). */
  private routes: [number, number][][] = [];
  /** The link from the last stone reached on to the next, as drawn (the wave pointer follows its pulse along it:
   *  rules/leypulse.ts); null before the line is routed. */
  currentLink(): readonly (readonly [number, number])[] | null { return this.T.on ? this.routes[this.current] ?? null : null; }

  /** The line's brightness times k (the mood's leyBright). */
  scale(k: number): void { this.u.uBright.value = this.T.brightness * BRIGHT * k; }

  /** The wave's pulse on the current link: how far it's got (0-1), or null for none (leyPulse). */
  pulse(p: number | null): void { this.u.uPulse.value.set(p ?? 0, p === null ? 0 : 1); }
  /** How far the line is drawn, in links along the route from its start (leyReveal), or null for all of it. */
  grow(links: number | null): void { this.u.uGrow.value.set(links ?? 0, links === null ? 0 : 1); }

  /** The boot's ring (rules/bootRing.ts; Ed, 2026-10-06): one path from the treehouse's front round the home ring, its
   *  own pulse and reveal (shares of the path), drawn while the boot runs and faint round the speakers after. */
  private ringSet: LeySet;
  private ringPulse = new THREE.Vector2();
  private ringGrow = new THREE.Vector2();
  /** The ring: its pulse (a share of the path, or null for none), how far it's drawn (a share), its strength (0 hides it). */
  ring(pulse: number | null, line: number, strength: number, colour?: THREE.Vector3): void {
    this.ringPulse.set(pulse ?? 0, pulse === null ? 0 : 1); this.ringGrow.set(line, 1); this.ringStrength.value = strength;
    for (const m of this.ringSet.meshes) m.visible = this.T.on && strength > 0.001 && line > 0;
    if (colour && !this.ringColoured) { this.ringColoured = true; const a = this.ringSet.geo.getAttribute("aCol") as THREE.BufferAttribute | undefined; if (a) { for (let i = 0; i < a.count; i++) a.setXYZ(i, colour.x, colour.y, colour.z); a.needsUpdate = true; } }
  }
  private ringColoured = false;
  private ringStrength = { value: 1 };

  private makeSet(extra: Record<string, THREE.IUniform> = {}): LeySet {
    const geo = new THREE.BufferGeometry(), current = { value: 0 };
    const make = (glow: boolean, order: number) => {
      const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...this.u, uGlowPass: { value: glow ? 1 : 0 }, uCurrent: current, uStrength: { value: 1 }, ...extra },
        transparent: true, depthWrite: false, depthTest: !glow, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }));
      m.frustumCulled = false; m.renderOrder = order; m.visible = false;
      return m;
    };
    return { geo, meshes: [make(false, 13), make(true, 14)], current };
  }

  /** chain: the stones in wave order and which is the last reached (rules/leylines.ts leyChain);
   *  key: changes when it does; colourOf: a stone's glow colour; lift: 0 on the ground to 1 over the treetops. */
  update(key: number, chain: () => { stones: LeyStone[]; current: number }, colourOf: (s: LeyStone) => THREE.Vector3, time: number, lift: number): void {
    if (this.T.on && key !== this.key && this.pending?.key !== key) {
      const c = chain(), was = this.chain;
      // The same line (the route's, Ed 2026-10-06: it covers every wave the whole time), only moved
      // on along it: no new routes, the sections just brighten and dim to their new places.
      if (!this.pending && was.length === c.stones.length && c.stones.every((s, i) => s.cell[0] === was[i].cell[0] && s.cell[1] === was[i].cell[1])) {
        if (c.current !== this.current) this.shiftFrom = time;
        this.key = key; this.current = c.current; this.cur.current.value = c.current;
      } else this.pending = { key, chain: c.stones, current: c.current, colours: c.stones.map(colourOf), routes: [] };
    }
    // Route links for up to ROUTE_MS a frame (each kept from meeting those before it); when all are, swap the new line in.
    if (this.pending) {
      const P = this.pending, t0 = performance.now();
      while (P.routes.length < P.chain.length - 1 && performance.now() - t0 < ROUTE_MS) { const k = P.routes.length; P.routes.push(this.routeTame(P.chain, P.routes, k)); }
      if (P.routes.length >= P.chain.length - 1) {
        const was = this.chain[this.current + 1];
        if (was && P.chain[P.current] && P.chain[P.current].cell.join() === was.cell.join()) this.shiftFrom = time; // (moved on)
        this.build(this.cur.geo, P.colours, P.routes);
        this.routes = P.routes;
        this.cur.current.value = P.current;
        this.key = P.key; this.chain = P.chain; this.current = P.current; this.pending = null;
      }
    }
    const on = this.T.on && this.chain.length > 1;
    for (const m of this.cur.meshes) m.visible = on;
    this.u.uLift.value = lift;
    this.u.uShift.value = Math.max(0, 1 - (time - this.shiftFrom) / 1.5);
  }


  /** Link k's route, as wandering as it can be without meeting the links routed before it (Ed,
   *  2026-10-06: the line never crosses itself; rules/leyroute.ts keeps the stones' own straight
   *  ways apart, so where wanders would meet, the link is drawn tamer, down to straight, and if it
   *  still meets one, that one is drawn straight too). */
  private routeTame(chain: LeyStone[], routes: [number, number][][], k: number): [number, number][] {
    let r: [number, number][] = [];
    for (const wander of TAME) {
      r = this.route(chain[k], chain[k + 1], k, wander);
      if (!routes.some(q => polylinesMeet(q, r))) return r;
    }
    routes.forEach((q, j) => { if (!chain[j].depart && polylinesMeet(q, r)) routes[j] = this.route(chain[j], chain[j + 1], j, 0); });
    return r;
  }

  /** A link's route from stone a to b: a gently wandering line along the low ground between them
   *  (`wander` of its usual way off the straight; 0 straight). */
  private route(a: LeyStone, b: LeyStone, k: number, wander = 1): [number, number][] {
    // From the treehouse at the start: due south out of its front, then round to the first objective.
    if (a.depart && this.map) return departureRoute(this.map, b, this.T.depart.avoid, STEP / 2);
    const dx = b.x - a.x, dz = b.z - a.z, L = Math.hypot(dx, dz) || 1, ux = dx / L, uz = dz / L, px = -uz, pz = ux;
    const n = Math.max(2, Math.ceil(L / STEP)), W = Math.min(80, L * this.T.valley) * wander, off = new Float64Array(n + 1);
    if (W > 0) for (let i = 1; i < n; i++) {
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
      pts.push(i === n ? [b.x, b.z] : [a.x + dx * t + px * o, a.z + dz * t + pz * o]);
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
