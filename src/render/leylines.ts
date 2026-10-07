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
import { LeyHead, type LeyTip } from "./leyHead";
import { SPRITE_UNIFORMS, metresPerArtPixel } from "./sprites";
import { LIGHT_UNIFORMS } from "./lighting";
import { departureRoute, type LeyStone } from "../rules/leylines";
import { polylinesMeet } from "../rules/crossing";
import { curveLink, stoneWays, tightestTurn, wayThrough } from "../rules/leycurve";
import { routeOf } from "../rules/party";
import { leyRadius } from "../rules/leyroute";
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
/** How far round her (m) the line shows through the trees (not beyond: there the hill test can't be trusted). */
const NEAR = 110;
/** Metres between the drawn ribbon's points. */
const FINE = 2;
/** A polyline with points put in so none is more than `step` from the next. */
export function fine(pts: [number, number][], step: number): [number, number][] {
  const out: [number, number][] = [];
  pts.forEach((p, i) => {
    if (i > 0) {
      const q = pts[i - 1], n = Math.ceil(Math.hypot(p[0] - q[0], p[1] - q[1]) / step);
      for (let k = 1; k < n; k++) out.push([q[0] + ((p[0] - q[0]) * k) / n, q[1] + ((p[1] - q[1]) * k) / n]);
    }
    out.push(p);
  });
  return out;
}
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
attribute float aLen;    // its link's length (m)
attribute vec3 aCol;
uniform vec2 uLeyWidth, uLeyHeight;
uniform float uLift, uTime, uGlowPass, uThrough;
uniform vec3 uNear; // where she is (x, z) and how far round her the line shows through the trees (m)
varying float vSide, vS, vT, vLink, vSeen, vW, vLen;
varying vec3 vCol;
${HEIGHT_VERT_GLSL}
void main() {
  vec2 side = vec2(-aDir.y, aDir.x);
  float w = mix(uLeyWidth.x, uLeyWidth.y, uLift) * (uGlowPass > 0.5 ? 3.0 : 1.0);
  // Wispy: the line drifts a little side to side as it goes, slowly.
  float drift = sin(aS * 0.11 + uTime * 0.6 + aLink * 1.7) * 0.6 + sin(aS * 0.037 - uTime * 0.23) * 1.2; // (leyDrift, for the head)
  vec2 xz = position.xz + side * (drift * sin(3.14159 * aT) + aSide * w * 0.5);
  vec3 p = onGround(vec3(xz.x, mix(uLeyHeight.x, uLeyHeight.y, uLift), xz.y));
  vSeen = uGlowPass > 0.5 ? groundSeen(p) : 1.0; // (seen through the leaves, never through the earth: the bend's horizon or a hill)
  // Seen through the trees (the third pass, Ed 2026-10-06: "I should be able to see it along its entire length"), but never
  // through a hill: hidden where the ground rises over its line of sight to the camera.
  // Only near her (Ed, 2026-10-06: "Leylines can be seen through the earth"): further off, a ridge between two of the hill
  // test's samples let a stretch the earth hides show through the trees in front of it, floating dashes; there it's hidden
  // like anything on the ground (from the treetops, its glow shows the whole way, and the 🎶 points to the next stone).
  if (uThrough > 0.5) {
    vSeen = length(p.xz - uNear.xy) < uNear.z ? groundSeen(p) : 0.0;
  }
  vSide = aSide; vS = aS; vT = aT; vLink = aLink; vCol = aCol; vW = w; vLen = aLen;
  gl_Position = clipOf(p);
}`;

const FRAG = /* glsl */ `
uniform float uTime, uGlowPass, uBright, uFade, uBehind, uShift, uLift, uCurrent, uStrength;
uniform vec2 uFar; // the faintest a section gets, ahead and behind (the whole route always shows)
uniform vec2 uGrow; // the line drawn only this far (x, in links along the route from its start) while y is 1: Ed's reveal, growing out from the treehouse
uniform vec2 uPulse; // the wave's pulse on the link from the last stone reached: x how far it's got (0-1, by arc length), y 1 when there's a wave clock
uniform vec2 uFlow;
uniform vec2 uSketch; // y 1: all of it drawn (to uGrow) as the sketch, unlit (while home boots: the way out, not yet lit)
uniform vec4 uCore; // its pixel core's half-width and rim (metres) on the ground and over the treetops
uniform float uMpp; // metres per art pixel
varying float vSide, vS, vT, vLink, vSeen, vW, vLen;
varying vec3 vCol;
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  if (vSeen < 0.5) discard;
  float along = vLink + vT; // links along the route from its start
  // Growing (Ed, 2026-10-06: "a better design for the front of the leyline"): written on pixel by pixel, the end at a whole art
  // pixel along it; tipD, metres behind the front (on its own link; further back, more).
  float tipD = uGrow.y > 0.5 ? (uGrow.x - vLink) * vLen - (floor(vS / uMpp) + 0.5) * uMpp : 1e6;
  if (tipD < 0.0) discard;
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
  // Unbroken through the stones (Ed, 2026-10-06: "I should be able to see it along its entire length").
  float ends = 1.0;
  // Its rank: 0 the section on from the last stone reached, 1 the one after, -1 the one just left
  // behind (easing to its new rank as she moves on). (With fade, behindBright and far all 1, the default since
  // Ed's "along its entire length", every section is as bright as the next.)
  float r = vLink - uCurrent + uShift;
  float rank = r >= 0.0 ? max(pow(uFade, r), uFar.x) : max(mix(1.0, uBehind, min(1.0, -r)) * pow(uFade, max(0.0, -r - 1.0)), uFar.y);
  float link = uBright * rank * mix(1.0, 0.8, uLift);
  // Lit, or not yet (Ed, 2026-10-06: "Before and after the pulse look too similar"). Behind the pulse the line is lit: full
  // width, solid, saturated, glowing softly, its shimmer flowing on toward the front, brightest just behind the pulse. Ahead of
  // it (drawn, not yet lit) it's a sketch, a promise: a thin dashed line of art pixels in a dim, cool, greyed version of its
  // colour, with no glow. The pulse (its pixel head: render/leyHead.ts) lights it as it passes.
  float pAlong = uSketch.y > 0.5 ? -1.0 : uPulse.y > 0.5 ? uCurrent + uPulse.x : 1e6;
  if (along > pAlong) {
    float grey = dot(vCol, vec3(0.3, 0.59, 0.11));
    vec3 cool = mix(vec3(grey), vec3(0.55, 0.68, 1.0) * grey * 1.3, 0.55);
    // (From the treetops, a faint cool glow along it, so it still reads there.)
    if (uGlowPass > 0.5) { gl_FragColor = vec4(cool * 0.12 * halo * uLift * uStrength, 1.0); return; }
    float dash = mod(floor(vS / uMpp), 4.0) < 3.0 ? 1.0 : 0.0, thin = off < max(1.0, floor(coreN * 0.5)) ? 1.0 : 0.0;
    if (dash * thin < 0.5) discard;
    gl_FragColor = vec4(min(cool * 0.75 * uBright * uStrength, vec3(0.7)), 1.0);
    return;
  }
  float litD = pAlong > 1e5 ? 1e6 : (pAlong - along) * vLen; // metres behind the pulse (on its own link)
  // The core's own brightness, the same all along it but for the shimmer's heads, in flat steps (a quarter at a time);
  // the glow it casts, smooth and wispy.
  float lvl = floor((1.0 + 1.4 * pulse) * 4.0 + 0.5) / 4.0;
  float glow = halo * (0.15 + 0.35 * pulse) * wisp;
  // Just written, the ink a little brighter, settling to the line's own over ten metres or so (in steps, pixels); its glow
  // eased in over the last few metres behind the head, so the wide glow never ends on a hard edge across it.
  float ink = exp(-tipD / 10.0), soft = smoothstep(0.0, 8.0, tipD);
  lvl = floor((lvl + 0.35 * ink + 0.4 * exp(-litD / 8.0)) * 4.0 + 0.5) / 4.0;
  float a = uGlowPass > 0.5 ? 0.4 * halo * wisp * uLift * soft : solid * lvl + glow * soft;
  // The wave's pulse (Ed, 2026-10-06: "the leyline between the last and next wave soundsystem should grow in intensity
  // in proportion to how much time is left before the next wave; so you can see the pulse travel along the leyline, and
  // the next soundsystem appears when it arrives"): on the link from the last stone reached, a bright head at the pulse,
  // brighter toward the wave, and a flash at the far stone as it arrives; the line itself as bright as everywhere else
  // (Ed, 2026-10-06: the whole line visible, "at the same brightness end to end, apart from the pulse's own glow"). vT runs by arc length, so it follows the route's curves. Its head, like the
  // line, is pixels (stepped, on the core and rim) with its glow round it.
  if (uPulse.y > 0.5 && abs(vLink - uCurrent) < 0.5) {
    // (In metres, not shares of its link: on a link hundreds of metres long a share's glow ran tens of metres, a long
    // blown-out wedge: Ed, 2026-10-06, "a better design for the front of the leyline".)
    float p = uPulse.x, pd = abs(sAt - p * vLen);
    float head = exp(-pd / 4.0), arrive = smoothstep(0.96, 1.0, p) * exp(-max(0.0, vLen - sAt) / 5.0);
    if (uGlowPass > 0.5) a += (head * (0.8 + 1.0 * p) + arrive) * halo * 0.6;
    else a += floor((head * (1.0 + 1.2 * p) + arrive) * solid * 3.0) / 3.0 + (head + arrive) * glow;
  }
  // (Its front, a pixel spark with its own small light, is render/leyHead.ts.)
  // Never past white (the bloom took a blown-out line for a glare), each pass a little under.
  gl_FragColor = vec4(min(vCol * a * link * ends * uStrength, vec3(0.9)), 1.0);
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
  readonly meshes: THREE.Object3D[];
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
      uPulse: { value: new THREE.Vector2() }, uGrow: { value: new THREE.Vector2() }, uSketch: { value: new THREE.Vector2() }, uNear: { value: new THREE.Vector3(0, 0, NEAR) },
      uCore: { value: new THREE.Vector4(...(T.core ?? [0.3, 0.6, 0.15, 0.3])) }, uMpp: { value: map ? metresPerArtPixel(map.tuning) : 0.1 },
    };
    this.cur = this.makeSet();
    this.ringSet = this.makeSet({ uPulse: { value: this.ringPulse }, uGrow: { value: this.ringGrow }, uStrength: this.ringStrength, uSketch: { value: new THREE.Vector2() } }); // (never the sketch: lit behind its own pulse)
    if (map) this.build(this.ringSet.geo, [new THREE.Vector3(1, 0.7, 0.42), new THREE.Vector3(1, 0.7, 0.42)], [bootPath(map).path]);
    const mpp = this.u.uMpp.value as number;
    this.head = new LeyHead(SPRITE_UNIFORMS.uRes, mpp);
    this.heads = [this.head, new LeyHead(SPRITE_UNIFORMS.uRes, mpp, 5, 0.6), new LeyHead(SPRITE_UNIFORMS.uRes, mpp), new LeyHead(SPRITE_UNIFORMS.uRes, mpp, 5, 0.6)];
    this.meshes = [...this.cur.meshes, ...this.ringSet.meshes, ...this.heads.flatMap(h => h.meshes)];
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
  grow(links: number | null): void { this.u.uGrow.value.set(links ?? 0, links === null ? 0 : 1); this.growTo = links; }

  /** The boot's ring (rules/bootRing.ts; Ed, 2026-10-06): one path from the treehouse's front round the home ring, its
   *  own pulse and reveal (shares of the path), drawn while the boot runs and faint round the speakers after. */
  private ringSet: LeySet;
  private ringPulse = new THREE.Vector2();
  private ringGrow = new THREE.Vector2();
  /** The ring: its pulse (a share of the path, or null for none), how far it's drawn (a share), its strength (0 hides it). */
  ring(pulse: number | null, line: number, strength: number, colour?: THREE.Vector3): void {
    this.ringPulse.set(pulse ?? 0, pulse === null ? 0 : 1); this.ringGrow.set(line, 1); this.ringStrength.value = strength;
    for (const m of this.ringSet.meshes) m.visible = this.T.on && strength > 0.001 && line > 0;
    if (colour && !this.ringColoured) { this.ringColoured = true; const a = this.ringSet.geo.getAttribute("aCol") as THREE.BufferAttribute | undefined; if (a) { for (let i = 0; i < a.count; i++) a.setXYZ(i, colour.x, colour.y, colour.z); a.needsUpdate = true; } for (const L of this.ringDrawn) { L.from = colour.clone(); L.to = colour.clone(); } }
    this.ringLive = this.T.on && strength > 0.001 && line > 0 ? { pulse, line, strength } : null;
  }
  private ringColoured = false;
  /** The ring while it's drawn: its pulse and how far it's drawn (shares of its path), its strength; null when not. */
  private ringLive: { pulse: number | null; line: number; strength: number } | null = null;
  private ringDrawn: DrawnLink[] = [];
  /** Home booting (Ed, 2026-10-06: "The leyline leaving the speaker circle seems to be not visible"): the line's first link
   *  drawn as the sketch (unlit), so the way out of the ring always reads, before the line itself grows out. */
  /** Where she is, each frame: the line shows through the trees only near her. */
  near(x: number, z: number): void { this.u.uNear.value.set(x, z, NEAR); }
  sketch(on: boolean): void { this.u.uSketch.value.set(0, on ? 1 : 0); }
  private ringStrength = { value: 1 };

  private makeSet(extra: Record<string, THREE.IUniform> = {}): LeySet {
    const geo = new THREE.BufferGeometry(), current = { value: 0 };
    // The line where it's in view; the same line where the trees hide it (behind what's drawn, where that is scenery:
    // its stencil mark, sprites.ts), so it shows along its whole length, at the same brightness, but never over the witch,
    // a creature or a hill; and, from the treetops, its wide glow through the crowns.
    const make = (glow: boolean, order: number, through = false) => {
      const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...this.u, uGlowPass: { value: glow ? 1 : 0 }, uThrough: { value: through ? 1 : 0 }, uCurrent: current, uStrength: { value: 1 }, ...extra },
        transparent: true, depthWrite: false, depthTest: !glow, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
        ...(through ? { depthFunc: THREE.GreaterDepth, stencilWrite: true, stencilRef: 1, stencilFunc: THREE.EqualStencilFunc, stencilFail: THREE.KeepStencilOp, stencilZFail: THREE.KeepStencilOp, stencilZPass: THREE.KeepStencilOp } : {}),
      }));
      m.frustumCulled = false; m.renderOrder = order; m.visible = false;
      return m;
    };
    return { geo, meshes: [make(false, 13), make(false, 13, true), make(true, 14)], current };
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
      r = this.route(chain[k], chain[k + 1], k, wander, chain);
      if (!routes.some(q => polylinesMeet(q, r))) return r;
    }
    routes.forEach((q, j) => { if (!chain[j].depart && polylinesMeet(q, r)) routes[j] = this.route(chain[j], chain[j + 1], j, 0, chain); });
    return r;
  }

  /** A link's way from stone a to b before it wanders: the route's curve through its stones (Ed, 2026-10-06: "can we give
   *  leylines a maximum curvature so they don't kink like this?"; rules/leycurve.ts, rules/leyroute.ts), or, for a chain
   *  off the route, a curve of the same kind through them. */
  private baseOf(chain: LeyStone[], k: number): [number, number][] {
    const a = chain[k], b = chain[k + 1], R = this.map ? leyRadius(this.map) : 30;
    if (this.map) {
      this.routeLinks ??= new Map((routeOf(this.map).links.slice(1)).map(l => [`${l[0][0]},${l[0][1]}>${l[l.length - 1][0]},${l[l.length - 1][1]}`, l as [number, number][]]));
      const l = this.routeLinks.get(`${a.x},${a.z}>${b.x},${b.z}`);
      if (l) return l;
    }
    const p = (s: LeyStone | undefined): [number, number] | null => (s ? [s.x, s.z] : null);
    const depart = k === 1 && chain[0].depart && this.map ? departureRoute(this.map, b, this.T.depart.avoid, STEP / 2) : null;
    const ha = depart ? stoneWays(depart, [[a.x, a.z]])[0] : wayThrough(p(chain[k - 1]), [a.x, a.z], [b.x, b.z]);
    return curveLink([a.x, a.z], ha, [b.x, b.z], wayThrough([a.x, a.z], [b.x, b.z], p(chain[k + 2])), R, 4);
  }
  private routeLinks: Map<string, [number, number][]> | null = null;

  /** A link's route from stone a to b: a gently wandering line along the low ground beside its curve (`wander` of its
   *  usual way off it; 0 the curve itself), leaving and reaching its stones along the curve, and never turning tighter
   *  than the curve may (leyLines.minRadius: the wander tamed till it doesn't). */
  private route(a: LeyStone, b: LeyStone, k: number, wander = 1, chain = this.pending?.chain ?? this.chain): [number, number][] {
    // From the treehouse at the start: due south out of its front, then round to the first objective.
    if (a.depart && this.map) return departureRoute(this.map, b, this.T.depart.avoid, STEP / 2);
    const base = fine(this.baseOf(chain, k), STEP), n = base.length - 1, R = this.map ? leyRadius(this.map) : 30;
    let L = 0;
    for (let i = 1; i <= n; i++) L += Math.hypot(base[i][0] - base[i - 1][0], base[i][1] - base[i - 1][1]);
    const nrm = base.map((_, i) => { const q0 = base[Math.max(0, i - 1)], q1 = base[Math.min(n, i + 1)], l = Math.hypot(q1[0] - q0[0], q1[1] - q0[1]) || 1; return [-(q1[1] - q0[1]) / l, (q1[0] - q0[0]) / l]; });
    for (let tame = wander; ; tame = tame > 0.05 ? tame / 2 : 0) {
      const W = Math.min(80, L * this.T.valley) * tame, off = new Float64Array(n + 1);
      if (W > 0) for (let i = 1; i < n; i++) {
        let best = 0, bh = Infinity;
        for (let o = -W; o <= W + 1e-6; o += W / 6) {
          const h = this.ground(base[i][0] + nrm[i][0] * o, base[i][1] + nrm[i][1] * o) + Math.abs(o) * 0.04; // (a little loath to stray)
          if (h < bh) { bh = h; best = o; }
        }
        off[i] = best;
      }
      // Smoothed into a gentle curve, held to its stones at the ends (along the curve there: sin², so it leaves and
      // reaches each stone the way the curve does, no corner), with a little wander of its own.
      for (let pass = 0; pass < 4; pass++) for (let i = 1; i < n; i++) off[i] = (off[i - 1] + 2 * off[i] + off[i + 1]) / 4;
      const pts: [number, number][] = base.map((q, i) => {
        const t = i / n, env = Math.sin(Math.PI * t) ** 2, o = off[i] * env + Math.sin(t * Math.PI * 2.3 + k * 1.9 + a.x * 0.01) * W * 0.12 * env;
        return i === n ? [b.x, b.z] : [q[0] + nrm[i][0] * o, q[1] + nrm[i][1] * o];
      });
      if (W <= 0 || tightestTurn(pts, 6) >= R * 0.95) return pts;
    }
  }

  private build(g: THREE.BufferGeometry, colours: THREE.Vector3[], routes: [number, number][][]): void {
    // Every FINE metres at most, each point laid on the ground (the shader's onGround), so it hugs the hills between its route
    // points (8 m apart, a straight ribbon between them sank into every crest: Ed, "I don't think I can see it along its whole length").
    routes = routes.map(pts => fine(pts, FINE));
    const pos: number[] = [], dir: number[] = [], side: number[] = [], s: number[] = [], tt: number[] = [], link: number[] = [], len: number[] = [], col: number[] = [], idx: number[] = [];
    const drawn: DrawnLink[] = [];
    routes.forEach((pts, k) => {
      const ca = colours[k], cb = colours[k + 1], lens = [0];
      for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const total = lens[lens.length - 1] || 1;
      drawn.push({ pts, lens, total, from: ca, to: cb ?? ca });
      pts.forEach((p, i) => {
        const q0 = pts[Math.max(0, i - 1)], q1 = pts[Math.min(pts.length - 1, i + 1)], l = Math.hypot(q1[0] - q0[0], q1[1] - q0[1]) || 1;
        const t = lens[i] / total, base = pos.length / 3;
        for (const sd of [-1, 1]) {
          pos.push(p[0], 0, p[1]); dir.push((q1[0] - q0[0]) / l, (q1[1] - q0[1]) / l); side.push(sd);
          s.push(lens[i]); tt.push(t); link.push(k); len.push(total);
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
    g.setAttribute("aLen", new THREE.Float32BufferAttribute(len, 1));
    g.setAttribute("aCol", new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    if (g === this.cur.geo) this.drawn = drawn; else this.ringDrawn = drawn;
  }

  /** The line's links as drawn (each its points, their distances along it, its length, and its two stones' colours). */
  private drawn: DrawnLink[] = [];
  /** How far the line is drawn (links), as last given to grow(); null for all of it. */
  private growTo: number | null = null;
  /** Its front, a pixel spark (render/leyHead.ts); and the heads of its pulse, and the boot ring's front and pulse. */
  readonly head: LeyHead;
  private heads: LeyHead[];
  private tipColours = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  /** The front as last drawn (for tools), or null. */
  tip: LeyTip | null = null;

  /** Each frame after grow(): the front of the line, where it's drawn to, for its head (none with the whole line drawn, or
   *  none yet). beats: the beat clock, for its pulse; strength: how far it's faded (the party's over). */
  front(time: number, beats: number, strength = 1): LeyTip | null {
    const g = this.growTo, D = this.drawn, on = this.T.on, sketch = this.u.uSketch.value.y > 0.5, P = this.u.uPulse.value;
    // The front of the line (none drawn while it's all shown, or as the sketch), and its pulse (lighting it as it passes).
    const tip = on && !sketch && g !== null && g > 0 && g < D.length ? this.pointAt(D, g, time, 0) : null;
    const pulse = on && !sketch && P.y > 0.5 && g !== null ? this.pointAt(D, Math.min(g, this.current + P.x), time, 1) : null;
    // The boot's ring: its front and its pulse, while it boots.
    const R = this.ringLive, ringOn = !!R && R.pulse !== null;
    const ringTip = ringOn && R!.line < 1 ? this.pointAt(this.ringDrawn, R!.line, time, 2) : null;
    const ringPulse = ringOn ? this.pointAt(this.ringDrawn, R!.pulse!, time, 3) : null;
    [tip, pulse, ringTip, ringPulse].forEach((t, i) => this.heads[i].update(t, time, beats, i >= 2 ? strength * (R?.strength ?? 0) : strength));
    this.tip = tip;
    return tip;
  }

  /** The point `links` along drawn links D (on the line as the shader draws it, its slow sideways drift too), its colour toward
   *  the next stone's as it nears it; a pulse's, whiter. */
  private pointAt(D: DrawnLink[], links: number, time: number, slot: number): LeyTip | null {
    if (!D.length || !(links >= 0)) return null;
    const k = Math.min(D.length - 1, Math.floor(links)), L = D[k], f = Math.max(0, Math.min(1, links - k)), want = f * L.total;
    let i = 1;
    while (i < L.lens.length - 1 && L.lens[i] < want) i++;
    const a = L.pts[i - 1], b = L.pts[i], seg = L.lens[i] - L.lens[i - 1] || 1, u = (want - L.lens[i - 1]) / seg;
    const dx = b[0] - a[0], dz = b[1] - a[1], dl = Math.hypot(dx, dz) || 1, d = leyDrift(want, f, k, time);
    const c = this.tipColours[slot].copy(L.from).lerp(L.to, 0.4 + 0.6 * f);
    if (slot % 2 === 1) c.lerp(WHITE, 0.35);
    return { x: a[0] + dx * u + (-dz / dl) * d, z: a[1] + dz * u + (dx / dl) * d, colour: c, links };
  }
}

const WHITE = new THREE.Vector3(1, 1, 1);

/** A drawn link: its points, the distance along it to each, its length, and its stones' colours. */
interface DrawnLink { pts: [number, number][]; lens: number[]; total: number; from: THREE.Vector3; to: THREE.Vector3 }

/** The line's slow sideways drift (m) at s metres along link k, t of the way along it, as the vertex shader has it. */
export function leyDrift(s: number, t: number, k: number, time: number): number {
  return (Math.sin(s * 0.11 + time * 0.6 + k * 1.7) * 0.6 + Math.sin(s * 0.037 - time * 0.23) * 1.2) * Math.sin(Math.PI * t);
}
