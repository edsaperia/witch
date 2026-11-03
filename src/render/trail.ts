// The witch's flight trail (Ed, 2026-10-06: "The trail behind the witch as she flies is currently little 'puffs'. It should be
// more like a fading-out glow, similar to the leylines. Its length relates to her speed: 5 m on the ground and 20 m on the
// treetops. The glow should be the same as the current area colour."): a ribbon of glow along the way she has just flown, in the
// ley lines' look (a bright core, a soft halo, wisps drifting along it, added on), fading out along its length to nothing at
// its tail. Its length follows her speed, up to `trail.ground` metres at full speed on the ground and `trail.treetops` over the
// treetops, shrinking to nothing as she slows; its colour is the area she's flying over (its creature's neon, as the ley lines
// and the runestones use), eased as she crosses into the next, so a trail across a border runs from one colour into the other.
//
// The cooldown trail (Ed, 2026-11-03: "the trail is made of lots of little segments, and there are few colour sections from beginning
// to end, and you can see segments vanish one by one; so each colour section tells you if you have a dash ... We can have a 'buffer'
// section at the front, which is the trail that shows when you're just moving normally. Also this system has to work for when you have
// extra dashes, which should show as a longer trail with more sections"; "each segment could be just a single pixel, with a single
// pixel gap between"; "the number of small segments in each section relates to your speed, so it gets larger with buffs, and is
// larger in the treetop; but each section drains at the same rate"; "these dots should glow a little"), trail.steps on:
// - the buffer, nearest her broom: today's ribbon, by her speed, in the area's colour (as above), and no longer than that;
// - behind it, a section for each dash's worth (dash.cooldown seconds) of the shared counter (rules/cooldown.ts), front to back, each
//   one flat colour of her preset (render/trailColours.ts; chosen at the Broom station), drawn as a dotted line of the picture's own
//   pixels: `dot` pixels on, `gap` off, stepped along her path on the screen (so the dots never crawl or shimmer as she moves: each a
//   whole pixel apart from the last along the line's main axis), over a faint halo of the section's colour, each dot with a soft glow
//   under it (glow, glowSize). A section is `section` seconds times her top speed now long (her broom's parts, a speed spell and
//   Darters in; treetop speed over the treetops: so more dots with buffs and in the treetops), eased as that changes; each drains in
//   dash.cooldown seconds whatever its length, its dots going from the tail one at a time;
// - reading it: each section showing (a part-drained one too) is a dash she hasn't got; only the buffer, everything's ready (with the
//   bare broom's numbers a take-off needs the counter empty); a landing's 3 s over a room of 2 shows three. Where her room lets a
//   take-off go before the counter's empty (room > cooldown.rise), a small pixel ring marks where the tail must drain to, shown
//   exactly while the take-off is locked (`ring`).
// steps.on off: the ribbon exactly as before. Her path runs out (a fresh night, standing still): the line runs on straight behind her.
//
// One mesh, updated in place: her recent path in a fixed ring of points, the ribbon's vertices in fixed typed arrays, so
// nothing is made per frame.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL, placed } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import { sectionColours, trailPreset } from "./trailColours";

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
  /** Its brightness, and how it fades along its length (eased out: 1 - t^fade, squared; its width tapering with it). */
  bright: number;
  fade: number;
  /** Seconds its length takes to grow to a new speed's, and to shrink back; and its colour to change to a new area's. */
  grow: number;
  shrink: number;
  colourEase: number;
  /** The broom's little amber sparks as well (render/spellfx.ts). */
  sparks: boolean;
  /** One trail, one cooldown (Ed, 2026-10-15; rules/cooldown.ts): at least `cooldown` metres times the shared cooldown counter's
   *  share in use (full after a take-off or a landing, draining to nothing), and laid along her blink when she dodges; bySpeed
   *  off leaves only that (no length from her speed). */
  cooldown?: number;
  bySpeed?: boolean;
  /** The cooldown trail (above): on; a dot's and a gap's size (the picture's pixels); a section's length, seconds times her top speed
   *  (m/s) now; the take-off ring; the halo under the dotted line (0 none) and each dot's glow (its strength, 0 none, and its size,
   *  pixels across); the preset a witch who hasn't chosen one has (config/trail-colours.json). */
  steps?: TrailSteps;
}
export interface TrailSteps { on: boolean; dot: number; gap: number; section: number; ring: boolean; halo: number; glow: number; glowSize: number; preset: string }
export const STEPS_DEFAULT: TrailSteps = { on: true, dot: 1, gap: 1, section: 0.35, ring: true, halo: 0.12, glow: 0.35, glowSize: 5, preset: "warm" };

/** The shared counter as the cooldown trail reads it (rules/cooldown.ts), her clock's seconds: what's in it, its room, a dash's worth
 *  (dash.cooldown), a take-off's (cooldown.rise) and a landing's (riseCooldown) amounts; and her top speed now (m/s, buffs in). */
export interface TrailCounter { left: number; room: number; dash: number; rise: number; landing: number; top: number }
/** The camera and the picture's size in its own pixels (render/view.ts width, height), for the dots' pixel grid. */
export interface TrailScreen { camera: THREE.Camera; w: number; h: number }
/** What the cooldown trail shows (pure: the tests read it). */
export interface TrailReading { sections: number; ready: number; takeOffLocked: boolean; ring: boolean; dots: number; dotsBySection: number[] }

/** The sections showing: each dash's worth in the counter, a part-drained one too. */
export const sectionsShowing = (left: number, dash: number): number => (dash > 0 ? Math.max(0, Math.ceil(left / dash - 1e-6)) : 0);
/** The sections her colours are spread over: the most the counter can hold (its room, or a take-off's or a landing's amount over it). */
export const sectionsMost = (c: Pick<TrailCounter, "room" | "dash" | "rise" | "landing">): number => sectionsShowing(Math.max(c.room, c.rise, c.landing), c.dash);
/** Whether the take-off ring is wanted: a take-off can go before the counter's empty, and can't yet. */
export const ringWanted = (c: Pick<TrailCounter, "left" | "room" | "rise">): boolean => c.room - c.rise > 1e-9 && c.left > c.room - c.rise + 1e-9;
/** The ring's 16 pixels round its middle (a 3-pixel circle). */
const RING_PX: readonly (readonly [number, number])[] = [[3, 0], [-3, 0], [0, 3], [0, -3], [3, 1], [3, -1], [-3, 1], [-3, -1], [1, 3], [-1, 3], [1, -3], [-1, -3], [2, 2], [2, -2], [-2, 2], [-2, -2]];
/** The ring's colour: warm white (hers). */
const RING_RGB = [1, 0.94, 0.78];

export const TRAIL_DEFAULT: TrailTuning = { on: true, ground: 5, treetops: 20, from: 0.15, curve: 1, width: [1, 1.7], bright: 1, fade: 2, grow: 0.25, shrink: 0.6, colourEase: 0.6, sparks: true, cooldown: 24, bySpeed: true };

const DYNAMIC = ["position", "aDir", "aT", "aS", "aCol"];
/** Points of her path kept (enough for the longest trail at its spacing). */
const CAP = 192;
/** The cooldown trail's dots and the ring's pixels at most. */
const DOTS = 4096;
/** The sections' colours the shader holds at most (more: the last repeats). */
const SECS = 12;

const VERT = /* glsl */ `
attribute vec2 aDir;
attribute float aSide, aT, aS;
attribute vec3 aCol;
uniform float uTrailWidth, uFade, uStep, uBuf;
varying float vSide, vT, vS;
varying vec3 vCol;
${HEIGHT_VERT_GLSL}
void main() {
  vec2 side = vec2(-aDir.y, aDir.x);
  // narrowing with its fade (the tail a thread, never a cut-off band), and a little at her broom
  float fade = 1.0 - pow(aT, uFade);
  float w = uTrailWidth * (0.15 + 0.85 * fade) * (0.6 + 0.4 * smoothstep(0.0, 0.08, aT));
  if (uStep > 0.5 && aS > uBuf + 0.001) w = uTrailWidth * 0.6; // (the cooldown trail's halo, behind the buffer: even)
  vec3 p = onGround(vec3(position.x + side.x * aSide * w * 0.5, position.y, position.z + side.y * aSide * w * 0.5));
  vSide = aSide; vT = aT; vS = aS; vCol = aCol;
  gl_Position = clipOf(p);
}`;

const FRAG = /* glsl */ `
uniform float uTime, uBright, uFade, uHead, uStep, uBuf, uSec, uDotEnd, uHalo;
uniform vec3 uSecCol[${SECS}];
varying float vSide, vT, vS;
varying vec3 vCol;
vec3 secCol(float i) {
  vec3 c = uSecCol[0];
  for (int k = 1; k < ${SECS}; k++) if (float(k) <= i) c = uSecCol[k];
  return c;
}
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  float across = 1.0 - abs(vSide), core = across * across * across, halo = across * across;
  // wisps: the glow thinning and thickening along it, drifting back from her (as the ley lines' do)
  float wisp = 0.72 + 0.28 * ln(vS * 0.3 + uTime * 1.6) * ln(vS * 0.11 - uTime * 0.7 + vSide * 0.6);
  if (uStep > 0.5 && vS > uBuf) { // the cooldown trail's sections: a faint halo of each one's colour, as far as its dots go
    float u = vS - uBuf;
    if (u > uDotEnd) discard;
    gl_FragColor = vec4(secCol(floor(u / max(0.001, uSec))) * halo * wisp * uHalo * uBright, 1.0);
    return;
  }
  // eased out: bright for its first third, then thinning quickly to nothing (the art director, #237)
  float f = 1.0 - pow(min(1.0, vT), uFade), fade = f * f;
  float a = (core * 0.9 + halo * 0.35) * wisp * fade * uBright;
  // the area's hue at its full value, never white: only its first metre, at the broom, goes near-white (#237)
  vec3 hue = vCol / max(0.001, max(vCol.r, max(vCol.g, vCol.b)));
  float head = 1.0 - smoothstep(0.0, uHead, vT);
  vec3 c = mix(hue, vec3(1.0), 0.65 * head * core) * a;
  float m = max(c.r, max(c.g, c.b)), cap = mix(0.82, 1.0, head);
  if (m > cap) c *= cap / m;
  gl_FragColor = vec4(c, 1.0);
}`;

// The cooldown trail's dots and the ring (above): each a square of whole pixels where the CPU stepped it (aPix, the picture's pixels),
// drawn over the scenery (its world point only placing it); the glow pass the same points bigger, soft and faint, under them.
const DOT_VERT = /* glsl */ `
attribute vec2 aPix;
attribute vec3 aCol;
uniform vec2 uRes;
uniform float uSize;
varying vec3 vCol;
${HEIGHT_VERT_GLSL}
void main() {
  vec4 c = clipOf(onGround(position));
  gl_Position = vec4((aPix / uRes * 2.0 - 1.0) * c.w, c.z, c.w);
  gl_PointSize = uSize;
  vCol = aCol;
}`;
const DOT_FRAG = /* glsl */ `
uniform float uGlow;
varying vec3 vCol;
void main() {
  if (uGlow > 0.0) { // the glow: soft, faint, round
    float r = length(gl_PointCoord - 0.5) * 2.0, a = 1.0 - smoothstep(0.0, 1.0, r);
    gl_FragColor = vec4(vCol * a * a * uGlow, 1.0);
  } else gl_FragColor = vec4(vCol, 1.0);
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
  private u = { uTime: LIGHT_UNIFORMS.uTime, uTrailWidth: { value: 0.5 }, uBright: { value: 1 }, uFade: { value: 2 }, uHead: { value: 0.2 },
    uStep: { value: 0 }, uBuf: { value: 0 }, uSec: { value: 1 }, uDotEnd: { value: 0 }, uHalo: { value: 0 }, uSecCol: { value: Array.from({ length: SECS }, () => new THREE.Vector3(1, 1, 1)) } };
  /** The cooldown trail's dots (and the ring's pixels), and their glow under them: one buffer, two draws. */
  readonly dots: THREE.Points;
  readonly glow: THREE.Points;
  private dotPos = new Float32Array(DOTS * 3);
  private dotPix = new Float32Array(DOTS * 2);
  private dotCol = new Float32Array(DOTS * 3);
  private dotGeo = new THREE.BufferGeometry();
  private du = { uRes: { value: new THREE.Vector2(1, 1) }, uSize: { value: 1 }, uGlow: { value: 0 } };
  private gu = { uRes: this.du.uRes, uSize: { value: 5 }, uGlow: { value: 0.35 } };
  /** The shared counter this frame (null: none, the old trail), the camera and picture for the dots, and her trail colours. */
  counter: TrailCounter | null = null;
  screen: TrailScreen | null = null;
  preset: string | null = null;
  /** What it showed last (the tests and the contact sheet read it). */
  reading: TrailReading = { sections: 0, ready: 0, takeOffLocked: false, ring: false, dots: 0, dotsBySection: [] };
  /** A section's length now (m, eased toward her top speed's), and the way her path last ran (for running on past its end). */
  private secLen = -1;
  private lastDx = 0;
  private lastDz = 1;
  private nDots = 0;
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
    const d = this.dotGeo;
    d.setAttribute("position", new THREE.BufferAttribute(this.dotPos, 3).setUsage(THREE.DynamicDrawUsage));
    d.setAttribute("aPix", new THREE.BufferAttribute(this.dotPix, 2).setUsage(THREE.DynamicDrawUsage));
    d.setAttribute("aCol", new THREE.BufferAttribute(this.dotCol, 3).setUsage(THREE.DynamicDrawUsage));
    d.setDrawRange(0, 0);
    const points = (u: object, additive: boolean) => new THREE.Points(d, new THREE.ShaderMaterial({
      vertexShader: DOT_VERT, fragmentShader: DOT_FRAG, uniforms: { ...HEIGHT_UNIFORMS, ...u },
      // (over the scenery, no depth test, as her sigils' glyphs are: it's her counter, read at a glance; under the trees it went
      // missing in bits, a section's worth behind a crown)
      transparent: true, depthWrite: false, depthTest: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    }));
    this.glow = points(this.gu, true); this.dots = points(this.du, false);
    for (const [o, r] of [[this.glow, 29], [this.dots, 30]] as const) { o.frustumCulled = false; o.renderOrder = r; o.visible = false; this.mesh.add(o); }
  }

  /** Forgets her path (a blink, a teleport home): the trail starts again from where she is. */
  reset(): void { this.count = 0; this.head = -1; this.len = 0; }
  /** Another night (View.setGame): no path, and its colour taken afresh. */
  newNight(): void { this.reset(); this.rgb.set(-1, 0, 0); this.lastBlink = -Infinity; this.n = 0; this.geo.setDrawRange(0, 0); this.secLen = -1; this.nDots = 0; this.dotGeo.setDrawRange(0, 0); }

  /** A point added to her path. */
  private point(x: number, y: number, z: number): void {
    const P = this.path;
    this.head = (this.head + 1) % CAP; this.count = Math.min(CAP, this.count + 1);
    const o = this.head * 6;
    P[o] = x; P[o + 1] = y; P[o + 2] = z; P[o + 3] = this.rgb.x; P[o + 4] = this.rgb.y; P[o + 5] = this.rgb.z;
  }

  /** x, y, z: where her broom's bristles are (y: metres over the ground); speed (m/s) and her top speed now; lift: 0 on the
   *  ground to 1 over the treetops; area: the colour (0..1) of the area she's over; blinkAt: her last blink's time, and blink
   *  its line (where she left and where she landed); cool: the shared cooldown counter's share in use, 0 to 1 (rules/cooldown.ts). */
  update(x: number, y: number, z: number, speed: number, top: number, lift: number, area: THREE.Vector3, time: number, dt: number, blinkAt: number, blink: { fromX: number; fromZ: number; toX: number; toZ: number } | null = null, cool = 0): void {
    const T = this.T;
    this.mesh.visible = T.on;
    if (!T.on) return;
    // its colour: eased toward the area's
    if (this.rgb.x < 0) this.rgb.copy(area);
    else this.rgb.lerp(area, 1 - Math.exp(-Math.max(0, dt) / Math.max(0.01, T.colourEase)));
    if (blinkAt !== this.lastBlink) {
      this.lastBlink = blinkAt;
      // A blink (Ed, 2026-10-15: the trail "should also appear when she dodges"): the ribbon laid along its line, from where she
      // left to where she landed, on from her path before it; without the line (a teleport home), her path starts again from here.
      if (Number.isFinite(blinkAt)) {
        if (blink && ((T.cooldown ?? 0) > 0 || (T.steps?.on && this.counter))) {
          const d = Math.hypot(blink.toX - blink.fromX, blink.toZ - blink.fromZ), n = Math.max(1, Math.ceil(d / 0.5));
          for (let i = 0; i <= n; i++) { const k = i / n; this.point(blink.fromX + (blink.toX - blink.fromX) * k, y, blink.fromZ + (blink.toZ - blink.fromZ) * k); }
        } else this.reset();
      }
    }
    const S = T.steps, C = this.counter;
    if (S?.on && C) { this.stepped(x, y, z, speed, top, lift, dt, { ...STEPS_DEFAULT, ...S }, C); return; }
    this.dots.visible = this.glow.visible = false; this.u.uStep.value = 0;
    this.reading = { sections: 0, ready: 0, takeOffLocked: false, ring: false, dots: 0, dotsBySection: [] };
    // its length: by her speed, growing quickly and shrinking more slowly; and at least the cooldown counter's share of
    // trail.cooldown metres (Ed, 2026-10-15: "its length shows one shared cooldown counter"), at once, draining with it
    const share = T.bySpeed ?? true ? Math.min(1, Math.max(0, (speed / Math.max(1, top) - T.from) / Math.max(0.01, 1 - T.from))) : 0;
    const want = (T.ground + (T.treetops - T.ground) * lift) * Math.pow(share, T.curve);
    this.len += (want - this.len) * (1 - Math.exp(-Math.max(0, dt) / Math.max(0.01, want > this.len ? T.grow : T.shrink)));
    this.len = Math.max(this.len, (T.cooldown ?? 0) * Math.min(1, Math.max(0, cool)));
    // her path: a point when she has moved far enough from the last (closer together for a short trail)
    const P = this.path, gap = Math.max(0.15, Math.min(1, this.len / 60));
    const last = this.head * 6;
    if (this.count === 0 || Math.hypot(x - P[last], z - P[last + 2]) >= gap) this.point(x, y, z);
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
    this.u.uBright.value = T.bright * 1.7;
    this.u.uFade.value = T.fade;
    this.u.uHead.value = this.len > 0.01 ? Math.min(1, 1 / this.len) : 1; // (its first metre)
    void time;
  }

  /** The cooldown trail (above): the buffer by her speed, then the counter's sections as dots. */
  private stepped(x: number, y: number, z: number, speed: number, top: number, lift: number, dt: number, S: TrailSteps, C: TrailCounter): void {
    const T = this.T, ease = (now: number, want: number) => now + (want - now) * (1 - Math.exp(-Math.max(0, dt) / Math.max(0.01, want > now ? T.grow : T.shrink)));
    // the buffer: by her speed, as before (and only that)
    const share = T.bySpeed ?? true ? Math.min(1, Math.max(0, (speed / Math.max(1, top) - T.from) / Math.max(0.01, 1 - T.from))) : 0;
    this.len = ease(this.len, (T.ground + (T.treetops - T.ground) * lift) * Math.pow(share, T.curve));
    // a section: her top speed now times `section` seconds, eased as that changes; the counter's sections behind the buffer
    const wantSec = Math.max(0.5, C.top * S.section);
    this.secLen = this.secLen < 0 ? wantSec : ease(this.secLen, wantSec);
    const dash = Math.max(1e-3, C.dash), left = Math.max(0, C.left), sec = this.secLen, cool = (left / dash) * sec, buf = this.len, total = buf + cool;
    const shown = sectionsShowing(left, dash), most = Math.max(shown, sectionsMost(C));
    // her path: a point when she has moved far enough from the last
    const P = this.path, gap = Math.max(0.15, Math.min(1, total / 60)), last = this.head * 6;
    if (this.count === 0 || Math.hypot(x - P[last], z - P[last + 2]) >= gap) this.point(x, y, z);
    // the ribbon, from her broom back along her path (on straight past its end) to the last section's tail; t across the buffer only
    const saved = this.len;
    this.len = Math.max(buf, 1e-3); // (put's t: 0 at her broom to 1 at the buffer's end)
    let s = 0, px = x, pz = z, py = y, dx = this.lastDx, dz = this.lastDz;
    this.n = 0;
    const put = this.put;
    if (total > 0.05) {
      put(x, y, z, dx, dz, 0, this.rgb.x, this.rgb.y, this.rgb.z);
      let first = true;
      for (let i = 0; i < this.count && this.n < CAP && s < total; i++) {
        const o = ((this.head - i + CAP) % CAP) * 6, qx = P[o], qz = P[o + 2], d = Math.hypot(qx - px, qz - pz);
        if (d < 1e-4) continue;
        dx = (px - qx) / d; dz = (pz - qz) / d;
        if (first) { first = false; this.dir[0] = dx; this.dir[1] = dz; this.dir[2] = dx; this.dir[3] = dz; this.lastDx = dx; this.lastDz = dz; }
        if (s + d >= total) { const f = (total - s) / d; s = total; put(px + (qx - px) * f, py + (P[o + 1] - py) * f, pz + (qz - pz) * f, dx, dz, s, P[o + 3], P[o + 4], P[o + 5]); break; }
        s += d; px = qx; pz = qz; py = P[o + 1];
        put(qx, py, qz, dx, dz, s, P[o + 3], P[o + 4], P[o + 5]);
      }
      if (s < total - 1e-4 && this.n <= CAP) { const r = total - s; s = total; put(px - dx * r, py, pz - dz * r, dx, dz, s, this.rgb.x, this.rgb.y, this.rgb.z); } // (on straight past her path's end)
    }
    this.len = saved;
    const g = this.geo;
    g.setDrawRange(0, this.n > 1 ? (this.n - 1) * 6 : 0);
    for (const k of DYNAMIC) (g.getAttribute(k) as THREE.BufferAttribute).needsUpdate = true;
    // the sections' colours: her preset's, spread over the most sections the counter can hold
    const cols = sectionColours(trailPreset(this.preset ?? S.preset).colours, most), U = this.u.uSecCol.value;
    for (let i = 0; i < SECS; i++) { const c = cols[Math.min(i, cols.length - 1)] ?? [255, 255, 255]; U[i].set(c[0] / 255, c[1] / 255, c[2] / 255); }
    // the dots, stepped along the line on the screen, and the ring
    const ringOn = S.ring && ringWanted(C), ringAt = buf + (Math.max(0, C.room - C.rise) / dash) * sec;
    const dotEnd = this.layDots(buf, sec, cool, shown, cols, S, ringOn ? ringAt : -1);
    const locked = C.left > Math.max(0, C.room - C.rise) + 1e-9;
    this.reading = { sections: shown, ready: Math.max(0, Math.round(C.room / dash) - shown), takeOffLocked: locked, ring: ringOn, dots: this.reading.dots, dotsBySection: this.reading.dotsBySection };
    this.u.uStep.value = 1; this.u.uBuf.value = buf; this.u.uSec.value = sec; this.u.uDotEnd.value = dotEnd; this.u.uHalo.value = S.halo;
    this.u.uTrailWidth.value = T.width[0] + (T.width[1] - T.width[0]) * lift;
    this.u.uBright.value = T.bright * 1.7;
    this.u.uFade.value = T.fade;
    this.u.uHead.value = buf > 0.01 ? Math.min(1, 1 / buf) : 1;
    this.du.uSize.value = Math.max(1, Math.round(S.dot)); this.gu.uSize.value = Math.max(1, S.glowSize); this.gu.uGlow.value = S.glow;
    this.dots.visible = this.nDots > 0; this.glow.visible = this.nDots > 0 && S.glow > 0;
  }

  /** Lays the sections' dots: from each section's start, stepped along the ribbon's line as drawn on the screen (its points projected
   *  as the shaders place them: render/height.ts placed), `dot + gap` pixels at a time along the line's main axis, so each lands a whole
   *  number of pixels from the last (no crawl, no shimmer); each dot while it's within the counter's `cool` metres; and the ring's
   *  pixels at `ringAt` metres (negative: none). Returns how far the last dot is past the buffer (m). Without a screen (the tests),
   *  the dots are laid at the same pitch in metres, `dot + gap` art pixels' worth (1/16 m). */
  private layDots(buf: number, sec: number, cool: number, shown: number, cols: readonly (readonly number[])[], S: TrailSteps, ringAt: number): number {
    const SC = this.screen, dot = Math.max(1, Math.round(S.dot)), pitch = dot + Math.max(0, Math.round(S.gap)), n = this.n, SS = this.ss, Q = this.pos;
    const w = SC?.w ?? 1, h = SC?.h ?? 1, X = this.sx, Y = this.sy, v = this.v;
    if (SC && n > 1) {
      SC.camera.updateMatrixWorld(); this.du.uRes.value.set(w, h);
      for (let i = 0; i < n; i++) { placed(v.set(Q[i * 6], Q[i * 6 + 1], Q[i * 6 + 2])).project(SC.camera); X[i] = (v.x * 0.5 + 0.5) * w; Y[i] = (v.y * 0.5 + 0.5) * h; }
    }
    let k = 0, end = 0;
    const by: number[] = [];
    /** A dot at segment i's f (its world point for its depth), at pixel (px, py), in colour c. */
    const add = (i: number, f: number, px: number, py: number, c: readonly number[]) => {
      if (k >= DOTS) return;
      const a = i * 6, b = Math.min(n - 1, i + 1) * 6;
      for (let e = 0; e < 3; e++) this.dotPos[k * 3 + e] = Q[a + e] + (Q[b + e] - Q[a + e]) * f;
      const o = (dot - 1) / 2; // (an odd square's middle a pixel's, an even one's a corner)
      this.dotPix[k * 2] = Math.round(px - o - 0.5) + 0.5 + o; this.dotPix[k * 2 + 1] = Math.round(py - o - 0.5) + 0.5 + o;
      this.dotCol[k * 3] = c[0]; this.dotCol[k * 3 + 1] = c[1]; this.dotCol[k * 3 + 2] = c[2];
      k++;
    };
    /** The segment and fraction `m` metres from her broom lies on. */
    const seg = (m: number): [number, number] => {
      let i = 0;
      while (i < n - 2 && SS[(i + 1) * 2] < m) i++;
      const sa = SS[i * 2], sb = SS[(i + 1) * 2];
      return [i, sb > sa ? Math.max(0, Math.min(1, (m - sa) / (sb - sa))) : 0];
    };
    if (n > 1) for (let j = 0; j < shown; j++) {
      const a = buf + j * sec, lim = buf + Math.min((j + 1) * sec, cool), c = cols[Math.min(j, cols.length - 1)] ?? [255, 255, 255], rgb = [c[0] / 255, c[1] / 255, c[2] / 255];
      let count = 0;
      if (lim <= a) { by.push(0); continue; }
      if (!SC) { for (let m = a; m < lim - 1e-9; m += pitch / 16) { const [i, f] = seg(m); add(i, f, 0, 0, rgb); end = Math.max(end, m - buf); count++; } by.push(count); continue; }
      // the first dot at the section's start; then on along the line in steps of under a quarter of a pixel, a dot each time the
      // line is `pitch` pixels from the last on its main axis
      let [i0, f0] = seg(a);
      let lx = X[i0] + (X[i0 + 1] - X[i0]) * f0, ly = Y[i0] + (Y[i0 + 1] - Y[i0]) * f0;
      add(i0, f0, lx, ly, rgb); end = Math.max(end, a - buf); count++;
      let pxv = lx, pyv = ly, pm = a, pi = i0, pf = f0;
      walk: for (let i = i0; i < n - 1; i++) {
        const sa = SS[i * 2], sb = SS[(i + 1) * 2], len = Math.max(Math.abs(X[i + 1] - X[i]), Math.abs(Y[i + 1] - Y[i])), subs = Math.max(1, Math.ceil(len * 4));
        for (let t = 1; t <= subs; t++) {
          const f = t / subs;
          if (i === i0 && f <= f0) continue;
          const m = sa + (sb - sa) * f;
          if (m >= lim) break walk;
          const cx = X[i] + (X[i + 1] - X[i]) * f, cy = Y[i] + (Y[i + 1] - Y[i]) * f;
          const dc = Math.max(Math.abs(cx - lx), Math.abs(cy - ly));
          if (dc >= pitch) {
            const dp = Math.max(Math.abs(pxv - lx), Math.abs(pyv - ly)), u = dc > dp ? (pitch - dp) / (dc - dp) : 1;
            const nx = pxv + (cx - pxv) * u, ny = pyv + (cy - pyv) * u, nm = pm + (m - pm) * u, nf = pi === i ? pf + (f - pf) * u : f;
            // (exactly `pitch` on the main axis from the last: rounding then lands it a whole number of pixels on)
            const main = Math.abs(nx - lx) >= Math.abs(ny - ly), qx = main ? lx + Math.sign(nx - lx) * pitch : nx, qy = main ? ny : ly + Math.sign(ny - ly) * pitch;
            add(i, nf, qx, qy, rgb); end = Math.max(end, nm - buf); count++;
            lx = qx; ly = qy;
          }
          pxv = cx; pyv = cy; pm = m; pi = i; pf = f;
        }
      }
      by.push(count);
    }
    const dots = k;
    if (ringAt >= 0 && n > 1) {
      const [i, f] = seg(ringAt);
      const rx = SC ? X[i] + (X[i + 1] - X[i]) * f : 0, ry = SC ? Y[i] + (Y[i + 1] - Y[i]) * f : 0;
      for (const [ox, oy] of RING_PX) add(i, f, rx + ox * dot, ry + oy * dot, RING_RGB);
    }
    this.nDots = k;
    this.reading = { ...this.reading, dots, dotsBySection: by };
    this.dotGeo.setDrawRange(0, k);
    for (const nm of ["position", "aPix", "aCol"]) (this.dotGeo.getAttribute(nm) as THREE.BufferAttribute).needsUpdate = true;
    return dots ? end + 0.75 / 16 : 0;
  }
  private sx = new Float32Array(CAP + 2);
  private sy = new Float32Array(CAP + 2);
  private v = new THREE.Vector3();
}
