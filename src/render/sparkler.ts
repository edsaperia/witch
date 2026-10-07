// The wave's pulse as a sparkler's burning tip (Ed, 2026-10-07: "the pulse should look like the flame on a sparkler. We expect
// them to move slowly along a line!"): the ley line ahead of it is the fuse, behind it spent (render/leylines.ts), and here the
// tip itself:
// - the hot spot: a small, intensely bright white-gold blob of art pixels, ragged and flickering;
// - the spray: short-lived sparks spitting off it every way, each a streak of a few art pixels cooling white to gold to red,
//   some arcing out and falling; a third of them pop, forking into two or three smaller sparks;
// - its light: a warm round glow on the ground, flickering with it.
// Cheap: a fixed pool of sparks on the GPU. Each is written once, when it's struck (where, when, which way, how long it lives),
// and the vertex shader flies it from there (a fork is struck with its parent, born later where the parent will be then); a
// frame only uploads the few just struck (render/dirty.ts) and allocates nothing. Its timing and place are the pulse's own.
import * as THREE from "three";
import { Dirty } from "./dirty";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { PIXEL_SNAP_GLSL } from "./shaders";
import type { LeyTip } from "./leyHead";

/** Sparks in the pool (each a streak of TRAIL art pixels). */
const SPARKS = 192, TRAIL = 6;
/** A streak's pixels this many art pixels apart along its flight (so each spark draws as a short unbroken line). */
const STEP = 1.1;
/** Sparks struck a second; the share that fork, and into how many. */
const RATE = 60, FORK = 0.4;
/** The tip's height over the ground (m), how hard sparks fall (m/s²); its light's radius (m) and strength. */
const TIP_Y = 1.4, GRAVITY = 14, GLOW_R = 3.2, GLOW_I = 0.2;
/** Art pixels across the hot spot. */
const SPOT_PX = 4;

const VERT = /* glsl */ `
attribute vec4 aFrom; // where it's struck (x, height, z) and when (s)
attribute vec4 aVel;  // its velocity (m/s) and how long it lives (s)
attribute vec2 aKind; // x: 0 a spark, 1 the hot spot; y: its pixel's place along the streak (0 its head)
uniform vec2 uRes;
uniform float uMpp, uNow, uGravity, uStrength, uSpot;
uniform vec3 uTip;
varying vec4 vCol;
varying float vKind, vN;
${HEIGHT_VERT_GLSL}${PIXEL_SNAP_GLSL}
void main() {
  vKind = aKind.x;
  vec3 p; float n = 1.0;
  if (aKind.x > 0.5) { p = uTip; n = uSpot; vCol = vec4(1.0, 0.92, 0.6, uStrength); }
  else {
    float t = uNow - aFrom.w - aKind.y * ${STEP.toFixed(2)} * uMpp / max(1.0, length(aVel.xyz)), k = t / aVel.w;
    if (t < 0.0 || k >= 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; vCol = vec4(0.0); return; }
    p = aFrom.xyz + aVel.xyz * t; p.y = max(0.04, p.y - 0.5 * uGravity * t * t);
    // Cooling as it flies, in steps (pixels): white, gold, orange, a last dull red; the streak's tail dimmer.
    // (Only a spark's first instants above the bloom's threshold, so the spray stays a spray of lines, not one glowing ball.)
    vec3 c = k < 0.2 ? vec3(0.95, 0.88, 0.62) : k < 0.5 ? vec3(0.95, 0.68, 0.26) : k < 0.8 ? vec3(0.8, 0.36, 0.1) : vec3(0.55, 0.16, 0.05);
    vCol = vec4(c * (1.0 - aKind.y / ${TRAIL}.0), uStrength); // (the streak fading to its tail)
  }
  vN = n;
  vec3 g = onGround(p);
  if (groundSeen(g) < 0.5) vCol.a = 0.0; // (never through a hill or the bent horizon)
  vec4 c0 = clipOf(g);
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec4 c1 = clipOf(g + right * uMpp);
  float cell = max(2.0, floor(length((c1.xy / c1.w - c0.xy / c0.w) * 0.5 * uRes) + 0.5)); // (at least two screen pixels an art pixel)
  gl_PointSize = n * cell;
  gl_Position = c0;
  gl_Position.xy += pixelSnap(c0) * c0.w; // on the pixel grid
  if (mod(gl_PointSize, 2.0) < 0.5) gl_Position.xy += c0.w / uRes;
}`;

const FRAG = /* glsl */ `
uniform float uFlick;
varying vec4 vCol;
varying float vKind, vN;
float h2(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233)) + uFlick * 91.7) * 43758.5453); }
void main() {
  if (vCol.a <= 0.0) discard;
  if (vKind < 0.5) { gl_FragColor = vCol; return; } // a spark: one art pixel
  // The hot spot: a white core, gold round it, its edge ragged and flickering, a spike now and then.
  vec2 q = floor(gl_PointCoord * vN) - (vN - 1.0) * 0.5;
  float r = (vN - 1.0) * 0.5, d = length(q);
  bool core = d <= 1.0, ring = d <= r - 0.9, edge = d <= r + 0.3 && h2(q) > 0.5;
  bool spike = (q.x == 0.0 || q.y == 0.0) && max(abs(q.x), abs(q.y)) <= r && h2(vec2(sign(q.x), sign(q.y))) > 0.7;
  if (!(core || ring || edge || spike)) discard;
  vec3 c = core ? vec3(1.0) : ring ? vec3(1.0, 0.95, 0.72) : vec3(1.0, 0.78, 0.32);
  gl_FragColor = vec4(c, vCol.a);
}`;

const GLOW_VERT = /* glsl */ `
varying vec2 vLocal;
${HEIGHT_VERT_GLSL}
void main() { vLocal = position.xz * 2.0; gl_Position = clipOf(onGround((modelMatrix * vec4(position, 1.0)).xyz)); }`;
const GLOW_FRAG = /* glsl */ `
uniform vec3 uColour;
uniform float uStrength;
varying vec2 vLocal;
void main() {
  float r = length(vLocal);
  if (r > 1.0) discard;
  float a = (1.0 - r) * (1.0 - r) * uStrength;
  gl_FragColor = vec4(uColour * a, 1.0);
}`;

export class Sparkler {
  readonly meshes: THREE.Object3D[];
  private geo = new THREE.BufferGeometry();
  private from: THREE.BufferAttribute;
  private vel: THREE.BufferAttribute;
  private dirtyFrom = new Dirty();
  private dirtyVel = new Dirty();
  private points: THREE.Points;
  private glow: THREE.Mesh;
  private glowU = { uColour: { value: new THREE.Vector3(1, 0.72, 0.36) }, uStrength: { value: 0 } };
  private u = { uNow: { value: 0 }, uGravity: { value: GRAVITY }, uStrength: { value: 1 }, uSpot: { value: SPOT_PX }, uTip: { value: new THREE.Vector3() }, uFlick: { value: 0 } };
  /** The next slot to strike into (a ring: the oldest goes first), and when the last spark went out. */
  private next = 0;
  private liveTill = -Infinity;
  private last: { x: number; z: number; time: number; links: number; on: boolean } = { x: 0, z: 0, time: 0, links: 0, on: false };
  private owed = 0;
  private seed = 7;

  constructor(uRes: { value: THREE.Vector2 }, mpp: number) {
    // One vertex per streak pixel, and the hot spot last.
    const n = SPARKS * TRAIL + 1, kind = new Float32Array(n * 2);
    for (let s = 0; s < SPARKS; s++) for (let j = 0; j < TRAIL; j++) kind[(s * TRAIL + j) * 2 + 1] = j;
    kind[(n - 1) * 2] = 1;
    this.from = new THREE.BufferAttribute(new Float32Array(n * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.vel = new THREE.BufferAttribute(new Float32Array(n * 4), 4).setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < n; i++) { this.from.array[i * 4 + 3] = -1e4; this.vel.array[i * 4 + 3] = 1; } // (all long out)
    this.geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3)); // (unread: three.js wants one)
    this.geo.setAttribute("aFrom", this.from);
    this.geo.setAttribute("aVel", this.vel);
    this.geo.setAttribute("aKind", new THREE.BufferAttribute(kind, 2));
    this.points = new THREE.Points(this.geo, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uRes, uMpp: { value: mpp }, ...this.u },
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, // (light: a fading streak adds less, never darkens)
    }));
    this.points.frustumCulled = false; this.points.renderOrder = 15; this.points.visible = false;
    this.glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 6, 6).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
      vertexShader: GLOW_VERT, fragmentShader: GLOW_FRAG, uniforms: { ...HEIGHT_UNIFORMS, ...this.glowU },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
    }));
    this.glow.frustumCulled = false; this.glow.renderOrder = 12; this.glow.visible = false;
    this.meshes = [this.glow, this.points];
  }

  private rand(): number { this.seed = (this.seed * 16807) % 2147483647; return this.seed / 2147483647; }

  /** Strike one spark (its streak's pixels share it) at (x, y, z) at time t: speed s m/s, any way round, up by up. */
  private strike(x: number, y: number, z: number, t: number, s: number, up: number, life: number): void {
    const a = this.rand() * Math.PI * 2, e = (this.rand() * 2 - 1) * 0.9, c = Math.cos(e);
    const vx = Math.cos(a) * c * s, vz = Math.sin(a) * c * s, vy = Math.sin(e) * s + up;
    const F = this.from.array as Float32Array, V = this.vel.array as Float32Array, i0 = this.next * TRAIL;
    for (let j = 0; j < TRAIL; j++) { const i = (i0 + j) * 4; F[i] = x; F[i + 1] = y; F[i + 2] = z; F[i + 3] = t; V[i] = vx; V[i + 1] = vy; V[i + 2] = vz; V[i + 3] = life; }
    this.dirtyFrom.touch(i0); this.dirtyFrom.touch(i0 + TRAIL - 1); this.dirtyVel.touch(i0); this.dirtyVel.touch(i0 + TRAIL - 1);
    this.next = (this.next + 1) % SPARKS;
    this.liveTill = Math.max(this.liveTill, t + life + 0.1);
    // A pop: two or three smaller sparks from where it will be partway through its life.
    if (s > 6 && this.rand() < FORK) {
      const at = life * (0.35 + 0.35 * this.rand()), fx = x + vx * at, fz = z + vz * at, fy = Math.max(0.04, y + vy * at - 0.5 * GRAVITY * at * at);
      for (let k = 2 + (this.rand() < 0.4 ? 1 : 0); k > 0; k--) this.strike(fx, fy, fz, t + at, 3 + this.rand() * 2.5, 0.5, 0.08 + this.rand() * 0.12);
    }
  }

  /** Each frame: where the pulse is (null: none), the time, and how far it's faded (the party's over). Only the sparks struck
   *  since the last frame go up to the GPU. */
  update(tip: LeyTip | null, time: number, strength = 1): void {
    const on = !!tip && strength > 0.001, L = this.last;
    this.u.uNow.value = time; this.u.uStrength.value = strength;
    // A flicker twenty times a second: the hot spot's size and ragged edge, and its light.
    const step = Math.floor(time * 20), fl = Math.sin(step * 12.9898) * 43758.5453 - Math.floor(Math.sin(step * 12.9898) * 43758.5453);
    this.u.uFlick.value = fl;
    if (tip && on) {
      const dt = L.on && time > L.time ? Math.min(0.1, time - L.time) : 0;
      this.owed += dt * RATE;
      for (; this.owed >= 1; this.owed--) {
        const kind = this.rand();
        // Most short and fast; some arcing out slower and longer, falling to the ground.
        if (kind < 0.85) this.strike(tip.x, TIP_Y, tip.z, time - this.rand() * dt, 12 + this.rand() * 10, 0.6, 0.08 + this.rand() * 0.12);
        else this.strike(tip.x, TIP_Y, tip.z, time - this.rand() * dt, 4 + this.rand() * 3, 4, 0.45 + this.rand() * 0.3);
      }
      // Reaching a stone: a burst.
      if (L.on && Math.floor(tip.links) > Math.floor(L.links) && tip.links - L.links < 0.5) for (let i = 0; i < 32; i++) this.strike(tip.x, TIP_Y, tip.z, time, 8 + this.rand() * 8, 3, 0.3 + this.rand() * 0.4);
      L.x = tip.x; L.z = tip.z; L.links = tip.links;
      this.u.uTip.value.set(tip.x, TIP_Y, tip.z);
      this.u.uSpot.value = fl < 0.3 ? SPOT_PX - 1 : fl > 0.85 ? SPOT_PX + 2 : SPOT_PX;
      this.glow.position.set(tip.x, 0.1, tip.z); this.glow.scale.setScalar(GLOW_R * 2 * (0.9 + 0.2 * fl)); this.glow.scale.y = 1;
      this.glowU.uStrength.value = GLOW_I * (0.8 + 0.4 * fl) * strength;
    } else this.owed = 0;
    L.on = on; L.time = time;
    this.u.uSpot.value = on ? this.u.uSpot.value : 0; // (the hot spot hidden with no pulse: a zero-sized point)
    this.glow.visible = on;
    this.points.visible = on || time < this.liveTill;
    this.dirtyFrom.flush(this.from); this.dirtyVel.flush(this.vel);
  }
}
