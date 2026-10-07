// Fireworks over a soundsystem when the wave reaches an area already cleared (Ed, 2026-10-07; the schedule is
// rules/fireworks.ts, started by the rules' waveCelebrate). Each shell climbs from the soundsystem's top as a gold spark
// trailing a few pixels, then bursts: a round peony, a tilted ring, a willow drooping gold, or a crackle of glitter, in the
// party's neons (some two-colour), each star a short streak of art pixels flashing white, then its colour, fading in steps
// at the end; seen from far off and from the treetops (never smaller than one of the canvas's pixels).
// Cheap: a fixed pool on the GPU. A show is written once, when its event comes (every rocket and star with its start, its
// velocity and its life; the vertex shader flies them, with drag and gravity), and nothing more until the next; a frame
// does no work and allocates nothing.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { PIXEL_SNAP_GLSL } from "./shaders";
import { Dirty } from "./dirty";
import { fireworkShells, showEnds, type Shell } from "../rules/fireworks";
import type { Tuning } from "../rules/tuning";
import type { ForestLight } from "./view";

/** Vertices in the pool (a few shows' worth: a show is about 2000), each streak's pixels, and a streak pixel's lag (s). */
const POOL = 6144, TRAIL = 3, LAG = 0.028;
/** Where a rocket leaves from (m over the ground: the soundsystem's top). */
const FROM_Y = 7;
/** Bursts lighting the ground at once (the latest kept), how long a flash lasts (s), its reach (m) and strength. */
const FLASHES = 12, FLASH_S = 0.9, FLASH_REACH = 40, FLASH_I = 1.6;

/** The party's neons for a burst (cyan, blue, violet, magenta, pink, gold, green), along a hue 0-1. */
const NEONS = [[0.3, 1, 1], [0.35, 0.55, 1], [0.7, 0.4, 1], [1, 0.3, 0.9], [1, 0.45, 0.6], [1, 0.82, 0.3], [0.45, 1, 0.5]];
const neon = (h: number, out: number[]) => { const c = NEONS[Math.floor(((h % 1) + 1) % 1 * NEONS.length) % NEONS.length]; out[0] = c[0]; out[1] = c[1]; out[2] = c[2]; };

const VERT = /* glsl */ `
attribute vec4 aFrom; // start (x, height over the ground, z) and when (s)
attribute vec4 aVel;  // velocity (m/s) and life (s)
attribute vec4 aLook; // colour, and its motion: 0 a rocket, 1 a star, 2 a willow's star, 3 a crackling star
attribute float aLag; // its pixel's place along the streak (0 its head)
uniform vec2 uRes;
uniform float uMpp, uNow;
varying vec4 vCol;
${HEIGHT_VERT_GLSL}${PIXEL_SNAP_GLSL}
float fh(float a, float b) { return fract(sin(a * 12.9898 + b * 78.233) * 43758.5453); }
void main() {
  float mode = aLook.w, t = uNow - aFrom.w - aLag * ${LAG.toFixed(3)}, k = t / aVel.w;
  if (t < 0.0 || k >= 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; vCol = vec4(0.0); return; }
  // A rocket climbs straight; a star slows in the air (drag) and falls, a willow's slower and further.
  float drag = mode < 0.5 ? 0.0 : mode > 1.5 && mode < 2.5 ? 2.6 : 1.7, grav = mode < 0.5 ? 0.0 : mode > 1.5 && mode < 2.5 ? 5.5 : 3.5;
  float d = drag > 0.0 ? (1.0 - exp(-drag * t)) / drag : t;
  vec3 p = aFrom.xyz + aVel.xyz * d; p.y -= 0.5 * grav * t * t;
  // Its light: a white flash as it bursts, then its colour; the last third fading in steps; a crackle's glitter flickering.
  vec3 c = aLook.rgb;
  float a = mode < 0.5 ? 0.8 : 1.0 * (1.0 - floor(max(0.0, k - 0.6) / 0.4 * 3.0) / 3.0);
  if (mode > 0.5 && k < 0.05) c = mix(mix(c, vec3(1.0), 0.55), c, k / 0.05); // (a touch of white as it bursts)
  if (mode > 0.5) { float r = min(1.0, k / 0.04); a *= r; } // (faint while they're all still together at the burst's heart: a shell's stars, added up, never bloom into one white blob)
  if (mode > 2.5 && k > 0.45) a *= step(0.45, fh(floor(uNow * 18.0), aFrom.x * 3.1 + aVel.x * 7.7 + aLag)) * 1.4;
  if (aLag > 0.5) a *= aLag > 1.5 ? 0.35 : 0.6; // (the streak's tail)
  vCol = vec4(c * a, 1.0);
  vec3 g = onGround(p);
  if (groundSeen(g) < 0.5) vCol = vec4(0.0); // (never through a hill or the bent horizon)
  vec4 c0 = clipOf(g);
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec4 c1 = clipOf(g + right * uMpp);
  gl_PointSize = max(1.0, floor(length((c1.xy / c1.w - c0.xy / c0.w) * 0.5 * uRes) + 0.5)); // (at least one of the canvas's pixels, px screen pixels across: from afar a burst stays separate stars, not a solid disc)
  gl_Position = c0;
  gl_Position.xy += pixelSnap(c0) * c0.w;
  if (mod(gl_PointSize, 2.0) < 0.5) gl_Position.xy += c0.w / uRes;
}`;

const FRAG = /* glsl */ `
varying vec4 vCol;
void main() { if (vCol.r + vCol.g + vCol.b <= 0.0) discard; gl_FragColor = vCol; }`;

export class Fireworks {
  readonly mesh: THREE.Points;
  private geo = new THREE.BufferGeometry();
  private attrs: THREE.BufferAttribute[];
  private dirty = [new Dirty(), new Dirty(), new Dirty()];
  private arr: Float32Array[];
  private u = { uNow: { value: 0 } };
  private next = 0;
  private liveTill = -Infinity;
  private seed = 11;
  private rgb = [0, 0, 0];
  /** The soundsystems celebrated (by area key), and when: their lasers stay fully on from then (render/lasers.ts). */
  readonly celebrated = new Map<string, number>();
  /** The latest bursts (a ring), for their flashes of light on the ground below; and the lights handed out, made once. */
  private bursts: { t: number; x: number; z: number; rgb: THREE.Vector3 }[] = Array.from({ length: FLASHES }, () => ({ t: -1e9, x: 0, z: 0, rgb: new THREE.Vector3() }));
  private nextBurst = 0;
  private lightPool: ForestLight[] = Array.from({ length: FLASHES }, () => ({ x: 0, y: 0, z: 0, reach: 0, rgb: new THREE.Vector3(), strength: 0 }));
  private lightsOut: ForestLight[] = [];

  constructor(uRes: { value: THREE.Vector2 }, mpp: number) {
    const lag = new Float32Array(POOL);
    for (let i = 0; i < POOL; i++) lag[i] = i % TRAIL;
    const v4 = () => new THREE.BufferAttribute(new Float32Array(POOL * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.attrs = [v4(), v4(), v4()];
    this.arr = this.attrs.map(a => a.array as Float32Array);
    for (let i = 0; i < POOL; i++) { this.attrs[0].array[i * 4 + 3] = -1e4; this.attrs[1].array[i * 4 + 3] = 1; } // (all long out)
    this.geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(POOL * 3), 3)); // (unread: three.js wants one)
    this.geo.setAttribute("aFrom", this.attrs[0]); this.geo.setAttribute("aVel", this.attrs[1]); this.geo.setAttribute("aLook", this.attrs[2]);
    this.geo.setAttribute("aLag", new THREE.BufferAttribute(lag, 1));
    this.mesh = new THREE.Points(this.geo, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uRes, uMpp: { value: mpp }, ...this.u },
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.mesh.frustumCulled = false; this.mesh.renderOrder = 14; this.mesh.visible = false;
  }

  private rand(): number { this.seed = (this.seed * 16807) % 2147483647; return this.seed / 2147483647; }

  /** One streak (TRAIL pixels) into the pool: from (x, y, z) at t0, velocity, life, colour, motion. */
  private put(x: number, y: number, z: number, t0: number, vx: number, vy: number, vz: number, life: number, r: number, g: number, b: number, mode: number): void {
    const [F, V, L] = this.arr, i0 = this.next;
    for (let j = 0; j < TRAIL; j++) {
      const i = (i0 + j) * 4;
      F[i] = x; F[i + 1] = y; F[i + 2] = z; F[i + 3] = t0; V[i] = vx; V[i + 1] = vy; V[i + 2] = vz; V[i + 3] = life; L[i] = r; L[i + 1] = g; L[i + 2] = b; L[i + 3] = mode;
    }
    for (const d of this.dirty) { d.touch(i0); d.touch(i0 + TRAIL - 1); }
    this.next = (i0 + TRAIL) % (POOL - POOL % TRAIL);
  }

  /** A shell: its rocket, then its burst's stars. */
  private shell(s: Shell, sx: number, sz: number): void {
    const rise = s.burst - s.launch, c = this.rgb;
    { const b = this.bursts[this.nextBurst]; this.nextBurst = (this.nextBurst + 1) % FLASHES; neon(s.hue, c); if (s.kind === "willow") { c[0] = 1; c[1] = 0.72; c[2] = 0.3; } b.t = s.burst; b.x = s.x; b.z = s.z; b.rgb.set(c[0], c[1], c[2]); }
    this.put(sx, FROM_Y, sz, s.launch, (s.x - sx) / rise, (s.height - FROM_Y) / rise, (s.z - sz) / rise, rise, 1, 0.8, 0.45, 0);
    // (Fewer when the finale's go up together: so many add up to a white blob from afar.)
    const n = Math.round((s.kind === "ring" ? 40 : s.kind === "crackle" ? 36 : s.kind === "willow" ? 48 : 54) * (s.finale ? 0.8 : 1));
    // A ring lies tilted: its plane's normal.
    const ta = this.rand() * Math.PI * 2, tilt = 0.5 + this.rand() * 0.6, nx = Math.sin(tilt) * Math.cos(ta), ny = Math.cos(tilt), nz = Math.sin(tilt) * Math.sin(ta);
    for (let i = 0; i < n; i++) {
      let dx: number, dy: number, dz: number;
      if (s.kind === "ring") {
        // Round the ring's plane: any vector across the normal, turned by i.
        const a = (i / n) * Math.PI * 2, ux = ny, uy = -nx, uz = 0, ul = Math.hypot(ux, uy, uz) || 1, vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux;
        const vl = Math.hypot(vx, vy, vz) || 1;
        dx = Math.cos(a) * ux / ul + Math.sin(a) * vx / vl; dy = Math.cos(a) * uy / ul + Math.sin(a) * vy / vl; dz = Math.cos(a) * uz / ul + Math.sin(a) * vz / vl;
      } else {
        // Evenly round a sphere (a golden spiral), jittered.
        const y = 1 - (2 * (i + 0.5)) / n, r = Math.sqrt(1 - y * y), a = i * 2.39996 + this.rand() * 0.3;
        dx = Math.cos(a) * r; dy = y; dz = Math.sin(a) * r;
      }
      const willow = s.kind === "willow", crackle = s.kind === "crackle", drag = willow ? 2.6 : 1.7;
      const speed = s.radius * drag * (0.92 + this.rand() * 0.16), life = willow ? 2.6 + this.rand() * 0.5 : crackle ? 1.5 + this.rand() * 0.5 : 1.3 + this.rand() * 0.5;
      if (willow) { c[0] = 1; c[1] = 0.72; c[2] = 0.3; } else neon(s.hue2 >= 0 && i % 2 ? s.hue2 : s.hue, c);
      if (crackle) { c[0] = c[0] * 0.5 + 0.5; c[1] = c[1] * 0.5 + 0.5; c[2] = c[2] * 0.5 + 0.5; }
      this.put(s.x, s.height, s.z, s.burst, dx * speed, dy * speed, dz * speed, life, c[0], c[1], c[2], willow ? 2 : crackle ? 3 : 1);
    }
  }

  /** Each frame: start a show for each celebration this frame (the rules' waveCelebrate), and fly them. */
  update(events: readonly { kind: string }[], time: number, t: Tuning): void {
    for (const e of events) {
      if (e.kind !== "waveCelebrate") continue;
      const c = e as unknown as { key: string; x: number; z: number; at: number };
      if (!this.celebrated.has(c.key)) this.celebrated.set(c.key, c.at);
      const shells = fireworkShells(c.x, c.z, c.at, t);
      for (const s of shells) this.shell(s, c.x, c.z);
      this.liveTill = Math.max(this.liveTill, showEnds(shells));
    }
    this.u.uNow.value = time;
    this.mesh.visible = time < this.liveTill;
    for (let i = 0; i < 3; i++) this.dirty[i].flush(this.attrs[i]);
  }

  /** This frame's flashes: each burst lights the ground round it in its colour, a sharp flash fading over FLASH_S (so from the
   *  ground, under the canopy where the sky can't be seen, the show still reads). The same objects each frame. */
  lights(time: number): ForestLight[] {
    const out = this.lightsOut; out.length = 0;
    for (let i = 0; i < FLASHES; i++) {
      const b = this.bursts[i], k = (time - b.t) / FLASH_S;
      if (k < 0 || k >= 1) continue;
      const L = this.lightPool[out.length];
      L.x = b.x; L.y = 2; L.z = b.z; L.reach = FLASH_REACH; L.rgb.copy(b.rgb); L.strength = FLASH_I * (1 - k) * (1 - k); // (low: it lights the ground round the soundsystem)
      out.push(L);
    }
    return out;
  }
}
