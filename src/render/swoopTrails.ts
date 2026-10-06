// The party witches' swoop trails (Ed, 2026-10-06: "Party-witch swoops should get the same following glow that you have, but
// it should be bright and multicoloured."): while a party witch swoops (rules/partyWitches.ts) she leaves a ribbon of glow in
// her trail's look (render/trail.ts: a bright core, a soft halo, wisps drifting along it, added on), brighter and wider, in
// rainbow colours running along it and shifting over time, each witch starting at her own hue, so a crowd of swoops reads as
// fireworks rising out of the canopy and arcing back down. It fades in as she lifts off (by her height over the first liftFade
// metres) and every stretch of it fades out life seconds after she passed, so it trails out behind her as she lands.
//
// Unlike her own trail, a swoop is mostly straight up and down, so the ribbon is 3D: its width turns to face the camera.
// One mesh for all of them, updated in place: a pool of `slots` rings of points, the ribbons' vertices and their index in
// fixed typed arrays, so nothing is made per frame; past `slots` swooping at once, the rest go without.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import type { PartyWitch } from "../rules/partyWitches";

export interface SwoopTrailTuning {
  on: boolean;
  /** Seconds each stretch of it lasts after she passed; its width (m); its brightness. */
  life: number;
  width: number;
  bright: number;
  /** Turns of the colour wheel a second, and per metre along it. */
  hueSpeed: number;
  hueSpread: number;
  /** Metres over the ground it takes to fade in as she lifts off. */
  liftFade: number;
  /** At most this many trails at once. */
  slots: number;
}

export const SWOOP_TRAIL_DEFAULT: SwoopTrailTuning = { on: true, life: 1.4, width: 1.8, bright: 2.2, hueSpeed: 0.3, hueSpread: 0.015, liftFade: 3, slots: 96 };

/** Points of a path kept per trail. */
const N = 40;
/** How far (m) she moves before the next point. */
const GAP = 0.8;
const DYNAMIC = ["position", "aDir", "aT", "aA", "aHue"];

const VERT = /* glsl */ `
attribute vec3 aDir;
attribute float aSide, aT, aA, aHue;
uniform float uWidth;
varying float vSide, vA, vHue, vS;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 p = onGround(position);
  // across the ribbon: square to its way and to the camera, so a climb straight up still shows its width
  vec3 side = cross(aDir, normalize(cameraPosition - p));
  float l = length(side);
  side = l > 1e-4 ? side / l : vec3(1.0, 0.0, 0.0);
  float w = uWidth * (0.25 + 0.75 * (1.0 - aT)) * (0.6 + 0.4 * smoothstep(0.0, 0.06, aT));
  p += side * aSide * w * 0.5;
  vSide = aSide; vA = aA; vHue = aHue; vS = aT;
  gl_Position = clipOf(p);
}`;

const FRAG = /* glsl */ `
uniform float uTime, uBright, uHueSpeed;
varying float vSide, vA, vHue, vS;
float lh(float p) { return fract(sin(p * 127.1) * 43758.5453); }
float ln(float p) { float i = floor(p), f = fract(p); return mix(lh(i), lh(i + 1.0), f * f * (3.0 - 2.0 * f)); }
vec3 hsv(float h) { return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); }
void main() {
  float across = 1.0 - abs(vSide), core = across * across * across, halo = across * across;
  float wisp = 0.75 + 0.25 * ln(vS * 9.0 + uTime * 2.0 + vHue * 13.0);
  float a = (core * 0.95 + halo * 0.4) * wisp * vA * uBright;
  vec3 hue = hsv(fract(vHue + uTime * uHueSpeed));
  // a white-hot core near her, the colour everywhere else
  float head = 1.0 - smoothstep(0.0, 0.12, vS);
  vec3 c = mix(hue, vec3(1.0), (0.3 + 0.5 * head) * core) * a;
  float m = max(c.r, max(c.g, c.b));
  if (m > 1.0) c /= m;
  gl_FragColor = vec4(c, 1.0);
}`;

/** live: she's swooping now (else it only trails out). */
interface Slot { id: number; head: number; count: number; hue: number; live: boolean }

export class SwoopTrails {
  readonly mesh: THREE.Mesh;
  private slots: Slot[] = [];
  private byId = new Map<number, Slot>();
  /** Every slot's ring of points: x, y (over the ground), z, time, fade-in. */
  private pts: Float32Array;
  private pos: Float32Array;
  private dir: Float32Array;
  private tt: Float32Array;
  private aa: Float32Array;
  private hue: Float32Array;
  private idx: Uint16Array;
  private geo = new THREE.BufferGeometry();
  private u = { uTime: LIGHT_UNIFORMS.uTime, uWidth: { value: 1.8 }, uBright: { value: 2.2 }, uHueSpeed: { value: 0.3 } };
  /** Trails drawn last frame (for the debug overlay and the perf check). */
  drawn = 0;

  constructor(private T: SwoopTrailTuning = SWOOP_TRAIL_DEFAULT) {
    const S = Math.max(1, Math.min(160, Math.floor(T.slots))), V = S * (N + 1) * 2;
    for (let i = 0; i < S; i++) this.slots.push({ id: -1, head: -1, count: 0, hue: 0, live: false });
    this.pts = new Float32Array(S * N * 5);
    this.pos = new Float32Array(V * 3); this.dir = new Float32Array(V * 3);
    this.tt = new Float32Array(V); this.aa = new Float32Array(V); this.hue = new Float32Array(V);
    const side = new Float32Array(V);
    for (let i = 0; i < V; i++) side[i] = i % 2 ? 1 : -1;
    this.idx = new Uint16Array(S * N * 6);
    const g = this.geo;
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aDir", new THREE.BufferAttribute(this.dir, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aSide", new THREE.BufferAttribute(side, 1));
    g.setAttribute("aT", new THREE.BufferAttribute(this.tt, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aA", new THREE.BufferAttribute(this.aa, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aHue", new THREE.BufferAttribute(this.hue, 1).setUsage(THREE.DynamicDrawUsage));
    g.setIndex(new THREE.BufferAttribute(this.idx, 1).setUsage(THREE.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, ...this.u },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    }));
    this.mesh.frustumCulled = false; this.mesh.renderOrder = 12;
  }

  private set(base: number, head: number, x: number, y: number, z: number, time: number, fade: number): void {
    const P = this.pts, q = (base + ((head + N) % N)) * 5;
    P[q] = x; P[q + 1] = y; P[q + 2] = z; P[q + 3] = time; P[q + 4] = fade;
  }

  /** lift: how high (m) over her feet the trail runs (her broom). */
  update(list: readonly PartyWitch[], time: number, lift = 0.6): void {
    const T = this.T;
    this.mesh.visible = T.on;
    if (!T.on) return;
    const life = Math.max(0.1, T.life), P = this.pts;
    for (const s of this.slots) s.live = false;
    // her newest point while she swoops (a slot taken as she lifts off, if one's free)
    for (const w of list) {
      const swooping = w.state === "floor" && w.activity === "swoop" && w.y > 0.05;
      let s = this.byId.get(w.id);
      if (!swooping) continue;
      if (!s) {
        s = this.slots.find(q => q.id < 0);
        if (!s) continue;
        s.id = w.id; s.head = -1; s.count = 0; s.hue = (w.id * 0.618034) % 1; this.byId.set(w.id, s);
      }
      s.live = true;
      // the newest point follows her; once it's GAP from the one before, it stays and a new one starts
      const base = this.slots.indexOf(s) * N, y = w.y + lift, fade = Math.min(1, w.y / Math.max(0.1, T.liftFade));
      if (s.count > 0) this.set(base, s.head, w.x, y, w.z, time, fade);
      const h = (base + ((s.head + N) % N)) * 5, b = (base + ((s.head - 1 + N) % N)) * 5;
      if (s.count < 2 || Math.hypot(P[h] - P[b], P[h + 1] - P[b + 1], P[h + 2] - P[b + 2]) >= GAP) {
        s.head = (s.head + 1) % N; s.count = Math.min(N, s.count + 1); this.set(base, s.head, w.x, y, w.z, time, fade);
      }
    }
    // the ribbons: each slot's points, newest first, while they're younger than life; a slot whose last is older is let go
    let v = 0, ix = 0;
    this.drawn = 0;
    for (let si = 0; si < this.slots.length; si++) {
      const s = this.slots[si];
      if (s.id < 0) continue;
      const base = si * N, newest = (base + s.head) * 5;
      if (s.count === 0 || time - P[newest + 3] > life) { if (!s.live) { this.byId.delete(s.id); s.id = -1; } continue; }
      const first = v;
      let along = 0, px = 0, py = 0, pz = 0;
      for (let i = 0; i < s.count; i++) {
        const q = (base + ((s.head - i + N) % N)) * 5, age = (time - P[q + 3]) / life;
        if (age > 1) break;
        const x = P[q], y = P[q + 1], z = P[q + 2];
        if (i > 0) along += Math.hypot(x - px, y - py, z - pz);
        // its way here: from this point toward the newer one (the newest, from the one before it)
        let dx: number, dy: number, dz: number;
        if (i > 0) { dx = px - x; dy = py - y; dz = pz - z; }
        else if (s.count > 1) { const r = (base + ((s.head - 1 + N) % N)) * 5; dx = x - P[r]; dy = y - P[r + 1]; dz = z - P[r + 2]; }
        else { dx = 0; dy = 1; dz = 0; }
        const d = Math.hypot(dx, dy, dz) || 1, f = 1 - age;
        for (let k = 0; k < 2; k++, v++) {
          this.pos[v * 3] = x; this.pos[v * 3 + 1] = y; this.pos[v * 3 + 2] = z;
          this.dir[v * 3] = dx / d; this.dir[v * 3 + 1] = dy / d; this.dir[v * 3 + 2] = dz / d;
          this.tt[v] = age; this.aa[v] = f * f * P[q + 4]; this.hue[v] = s.hue + along * T.hueSpread;
        }
        px = x; py = y; pz = z;
      }
      const n = (v - first) / 2;
      for (let i = 0; i + 1 < n; i++) { const b = first + i * 2; this.idx[ix++] = b; this.idx[ix++] = b + 1; this.idx[ix++] = b + 2; this.idx[ix++] = b + 1; this.idx[ix++] = b + 3; this.idx[ix++] = b + 2; }
      if (n > 1) this.drawn++;
    }
    const g = this.geo;
    g.setDrawRange(0, ix);
    for (const k of DYNAMIC) (g.getAttribute(k) as THREE.BufferAttribute).needsUpdate = true;
    const I = g.getIndex()!; I.needsUpdate = true; I.clearUpdateRanges?.(); I.addUpdateRange?.(0, ix);
    this.u.uWidth.value = T.width; this.u.uBright.value = T.bright; this.u.uHueSpeed.value = T.hueSpeed;
  }
}
