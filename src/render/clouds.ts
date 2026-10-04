// Real clouds over the forest (Ed, 2026-10-04: "actual 3d clouds that you only see in treetop mode
// that curve with the bend and reflect the ground light of what's beneath them. They're
// semi-translucent ... only appear from underneath ... Throw in some lightning").
//
// Each cloud has a place on the map and an altitude above the treetop camera, so it can never come
// between her and the camera: it only drops into view where the world's bend lowers it into the
// sky band over the bent horizon (its lower edge behind the earth). They're seeded per cell of a
// grid that drifts with a shared wind, so a few are always about, the same ones each time. Each is a
// few soft puffs (camera-facing quads, one instanced draw, pixel art at the low resolution),
// translucent so stars show through, moonlit grey-blue with a silver rim on the moon's side and lit
// from below by what's beneath it: the colours of the partified areas under it (pulsing on the
// beat), campfires and lanterns faintly. Now and then one flickers with lightning inside, sometimes
// with a forked bolt dropping toward the horizon and a faint flash on the forest.
import * as THREE from "three";
import { hash2 } from "../rules/random";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL, bendPoint, groundHeight } from "./height";
import { LIGHT_UNIFORMS, MAX_LIGHTS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";

export interface CloudTuning { count: number; altitude: number; speed: number; opacity: number; partyGlow: number }
export interface LightningTuning { every: number; flashes: number; ground: number }

const CELL = 260; // metres: at most one cloud a cell
const PUFFS = 7;
const MAX = 120; // puffs drawn at most

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight; // strength, pulse, edge, the beat's phase
uniform vec4 uLightPos[${MAX_LIGHTS}], uLightCol[${MAX_LIGHTS}];
uniform int uLightCount;
uniform vec4 uCloud; // opacity, party glow, the flashing cloud's id, its flash (0 to 1)
attribute vec3 iPos;   // the puff's middle (world, altitude in y)
attribute vec2 iSize;  // its width and height (metres)
attribute vec4 iSeed;  // a random number, its cloud's id, where it sits across the cloud (0 to 1), its cloud's middle x
attribute vec2 iUnder; // the ground under its cloud's middle (x, z)
varying vec2 vUv;
varying vec4 vSeed;
varying vec3 vUp;
varying float vFlash;
${HEIGHT_VERT_GLSL}
void main() {
  vUv = uv; vSeed = iSeed;
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  gl_Position = clipOf(w);
  // What's beneath it lights its underside: partified areas (in their colours, pulsing on the beat),
  // and campfires, lanterns and the like, faintly.
  vec3 up = vec3(0.0);
  for (int i = 0; i < 16; i++) {
    if (i >= uPartyCount) break;
    float d = length(iUnder - uParty[i].xy), r = uParty[i].z;
    up = max(up, uPartyCol[i] * (1.0 - smoothstep(r * 0.5, r * 1.8, d)) * uParty[i].w);
  }
  float beat = pow(0.5 + 0.5 * cos(uUplight.w), 6.0);
  up *= uCloud.y * (0.7 + 0.6 * beat);
  for (int i = 0; i < ${MAX_LIGHTS}; i++) {
    if (i >= uLightCount) break;
    float d = length(iUnder - uLightPos[i].xz);
    if (d < 90.0) up += uLightCol[i].rgb * uLightCol[i].w * (1.0 - d / 90.0) * 0.25;
  }
  vUp = up;
  vFlash = abs(iSeed.y - uCloud.z) < 0.5 ? uCloud.w : 0.0;
}`;

const FRAG = /* glsl */ `
uniform vec3 uMoon, uMoonDir;
uniform vec4 uCloud;
varying vec2 vUv;
varying vec4 vSeed;
varying vec3 vUp;
varying float vFlash;
float ch(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float cn(vec2 p) { vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f); return mix(mix(ch(i), ch(i + vec2(1, 0)), u.x), mix(ch(i + vec2(0, 1)), ch(i + vec2(1, 1)), u.x), u.y); }
void main() {
  // A soft lumpy puff, flatter underneath.
  vec2 q = (vUv - vec2(0.5, 0.45)) * vec2(1.0, vUv.y < 0.45 ? 2.2 : 1.4);
  float n = cn(vUv * 5.0 + vSeed.x * 37.0) * 0.6 + cn(vUv * 11.0 + vSeed.x * 91.0) * 0.4;
  float a = smoothstep(0.5, 0.32, length(q) + (n - 0.5) * 0.3);
  if (a < 0.02) discard;
  float below = clamp(1.0 - vUv.y * 1.6, 0.0, 1.0); // its underside, toward the ground
  vec3 c = vec3(0.07, 0.08, 0.12) + uMoon * 0.12;
  // A silver rim on the moon's side.
  float side = uMoonDir.x < 0.0 ? 1.0 - vUv.x : vUv.x;
  c += uMoon * 0.5 * smoothstep(0.55, 0.95, side) * smoothstep(0.25, 0.85, vUv.y) * (1.0 - a * 0.5);
  // What's beneath it, brightest underneath.
  c += vUp * (0.45 + 1.1 * below);
  // Lightning inside: a bright lilac-white wash, strongest in the middle.
  c += vec3(0.85, 0.85, 1.0) * vFlash * (1.0 - length(q) * 1.2);
  gl_FragColor = vec4(c, a * uCloud.x * (0.75 + 0.25 * n));
}`;

const BOLT_VERT = /* glsl */ `
${HEIGHT_VERT_GLSL}
void main() { gl_Position = clipOf(position); }`;
const BOLT_FRAG = /* glsl */ `
uniform float uBolt;
void main() { gl_FragColor = vec4(vec3(0.85, 0.85, 1.0) * uBolt, 1.0); }`;

interface Cloud { id: number; x: number; z: number; y: number; r: number; seed: number }

export class Clouds {
  readonly mesh: THREE.Mesh;
  readonly bolt: THREE.LineSegments;
  private geo = new THREE.InstancedBufferGeometry();
  private pos: THREE.InstancedBufferAttribute;
  private size: THREE.InstancedBufferAttribute;
  private seed: THREE.InstancedBufferAttribute;
  private under: THREE.InstancedBufferAttribute;
  private u: Record<string, THREE.IUniform>;
  private boltU = { value: 0 };
  private visible: Cloud[] = [];
  private storm = { next: -1, at: -1, cloud: -1, bolt: false, flashes: 3 };
  private amb = new THREE.Vector3();
  private ambTaken = false;
  /** Clouds and puffs drawn this frame (for the debug overlay). */
  count = 0;

  constructor(private T: CloudTuning, private L: LightningTuning, private seedBase: number) {
    const quad = new THREE.PlaneGeometry(1, 1);
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.geo.setAttribute("uv", quad.getAttribute("uv"));
    const make = (k: number) => { const a = new THREE.InstancedBufferAttribute(new Float32Array(MAX * k), k); a.setUsage(THREE.DynamicDrawUsage); return a; };
    this.pos = make(3); this.size = make(2); this.seed = make(4); this.under = make(2);
    this.geo.setAttribute("iPos", this.pos); this.geo.setAttribute("iSize", this.size); this.geo.setAttribute("iSeed", this.seed); this.geo.setAttribute("iUnder", this.under);
    this.geo.instanceCount = 0;
    this.u = {
      ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp,
      uParty: SPRITE_UNIFORMS.uParty, uPartyCol: SPRITE_UNIFORMS.uPartyCol, uPartyCount: SPRITE_UNIFORMS.uPartyCount, uUplight: SPRITE_UNIFORMS.uUplight,
      uLightPos: LIGHT_UNIFORMS.uLightPos, uLightCol: LIGHT_UNIFORMS.uLightCol, uLightCount: LIGHT_UNIFORMS.uLightCount,
      uMoon: LIGHT_UNIFORMS.uMoon, uMoonDir: LIGHT_UNIFORMS.uMoonDir,
      uCloud: { value: new THREE.Vector4(T.opacity, T.partyGlow, -1, 0) },
    };
    this.mesh = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, transparent: true, depthWrite: false }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9.5; // over the sky, behind the forest at the horizon (depth tested)
    this.mesh.visible = false;
    this.bolt = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.ShaderMaterial({ vertexShader: BOLT_VERT, fragmentShader: BOLT_FRAG, uniforms: { ...HEIGHT_UNIFORMS, uBolt: this.boltU }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.bolt.frustumCulled = false;
    this.bolt.renderOrder = 9.6;
    this.bolt.visible = false;
  }

  /** The cloud seeded in drift cell (i, j), if any, where it is now. */
  private cloud(i: number, j: number, dx: number, dz: number): Cloud | null {
    const s = this.seedBase + 7717;
    if (hash2(i, j, s) >= Math.min(0.9, this.T.count / 12)) return null;
    return {
      id: ((i * 73856093) ^ (j * 19349663)) & 0xffff,
      x: (i + 0.2 + 0.6 * hash2(i, j, s + 1)) * CELL + dx, z: (j + 0.2 + 0.6 * hash2(i, j, s + 2)) * CELL + dz,
      y: this.T.altitude * (0.85 + 0.3 * hash2(i, j, s + 3)), r: 45 + 55 * hash2(i, j, s + 4), seed: hash2(i, j, s + 5),
    };
  }

  /** Each frame: the clouds round where the camera looks, if there's a bend (none on the ground). */
  update(time: number, camera: THREE.Camera, witchOnScreen: THREE.Vector4, width: number, height: number): void {
    const B = HEIGHT_UNIFORMS.uBend.value, on = B.x > 1e-6 && this.T.count > 0;
    this.mesh.visible = on;
    if (!on) { this.bolt.visible = false; this.endFlash(); this.count = 0; return; }
    // The drift: a shared wind, slow.
    const dx = time * this.T.speed * 0.8, dz = time * this.T.speed * 0.35;
    const F = HEIGHT_UNIFORMS.uBendFwd.value, cx = B.y + F.x * 450, cz = B.z + F.y * 450, R = 520;
    const P = this.pos.array as Float32Array, S = this.size.array as Float32Array, E = this.seed.array as Float32Array, U = this.under.array as Float32Array;
    const v = new THREE.Vector3(), list: Cloud[] = [];
    let n = 0;
    for (let j = Math.floor((cz - dz - R) / CELL); j <= Math.floor((cz - dz + R) / CELL); j++)
      for (let i = Math.floor((cx - dx - R) / CELL); i <= Math.floor((cx - dx + R) / CELL); i++) {
        const c = this.cloud(i, j, dx, dz);
        if (!c) continue;
        // Never near her or the near view: only ahead, and never over her on screen.
        const ahead = (c.x - B.y) * F.x + (c.z - B.z) * F.y;
        if (ahead < 200) continue;
        const p = bendPoint(v.set(c.x, c.y + groundHeight(c.x, c.z), c.z)).project(camera);
        if (p.z > 1) continue;
        const sx = (p.x + 1) / 2 * width, sy = (p.y + 1) / 2 * height;
        if (Math.abs(sx - witchOnScreen.x) < witchOnScreen.z * 4 + 20 && Math.abs(sy - witchOnScreen.y) < witchOnScreen.w * 4 + 20) continue;
        list.push(c);
        for (let k = 0; k < PUFFS && n < MAX; k++) {
          const a = hash2(c.id, k, 11), b = hash2(c.id, k, 12), across = k / (PUFFS - 1);
          const w = c.r * (0.7 + 0.6 * b), h = w * 0.55;
          P.set([c.x + (across - 0.5) * c.r * 2.2 + (a - 0.5) * 18, c.y + groundHeight(c.x, c.z) + (b - 0.5) * 10 - Math.abs(across - 0.5) * 14, c.z + (a - 0.5) * 30], n * 3);
          S.set([w, h], n * 2);
          E.set([hash2(c.id, k, 13), c.id, across, c.x], n * 4);
          U.set([c.x, c.z], n * 2);
          n++;
        }
      }
    this.visible = list;
    this.count = n;
    this.geo.instanceCount = n;
    for (const a of [this.pos, this.size, this.seed, this.under]) { a.needsUpdate = true; a.clearUpdateRanges(); a.addUpdateRange(0, n * a.itemSize); }
    this.lightning(time);
  }

  /** Now and then a cloud in view flickers with lightning: a few quick flashes, sometimes a forked
   *  bolt toward the horizon, and (lightning.ground) a faint flash on the forest. */
  private lightning(time: number): void {
    const L = this.L, st = this.storm, u = this.u.uCloud.value as THREE.Vector4;
    if (L.every <= 0) return;
    if (st.next < 0) st.next = time + L.every * (0.5 + hash2(Math.floor(time), 3, this.seedBase));
    if (st.at < 0 && time >= st.next && this.visible.length) {
      const k = Math.floor(hash2(Math.floor(time * 10), 5, this.seedBase) * this.visible.length);
      st.at = time; st.cloud = k; st.bolt = hash2(Math.floor(time * 10), 7, this.seedBase) < 0.4;
      st.flashes = Math.max(1, Math.round(L.flashes + (hash2(Math.floor(time * 10), 9, this.seedBase) - 0.5) * 1.5));
      st.next = time + L.every * (0.5 + hash2(Math.floor(time * 10), 11, this.seedBase));
      if (st.bolt) this.makeBolt(this.visible[k], time);
    }
    let flash = 0;
    if (st.at >= 0) {
      const t = time - st.at, i = Math.floor(t / 0.13);
      if (i >= st.flashes) { st.at = -1; this.bolt.visible = false; }
      else flash = Math.max(0, 1 - (t - i * 0.13) / 0.07) * (i === 0 ? 1 : 0.75);
    }
    const c = st.at >= 0 ? this.visible[st.cloud] : undefined;
    u.z = c ? c.id : -1; u.w = flash;
    this.boltU.value = flash;
    this.bolt.visible = st.at >= 0 && st.bolt && flash > 0;
    // The faint flash on the forest: the ambient light lifted for the flash.
    if (!this.ambTaken) { this.amb.copy(LIGHT_UNIFORMS.uAmb.value); this.ambTaken = true; }
    LIGHT_UNIFORMS.uAmb.value.copy(this.amb).addScalar(flash * L.ground * 0.12);
  }

  private endFlash(): void { if (this.ambTaken) LIGHT_UNIFORMS.uAmb.value.copy(this.amb); }

  /** A forked pixel bolt from under the cloud down toward the ground beyond the horizon. */
  private makeBolt(c: Cloud, time: number): void {
    const pts: number[] = [], seg = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) => pts.push(x0, y0, z0, x1, y1, z1);
    let x = c.x, y = c.y + groundHeight(c.x, c.z) - 8, z = c.z;
    const steps = 9, drop = (c.y - 10) / steps, s = Math.floor(time * 100);
    for (let k = 0; k < steps; k++) {
      const nx = x + (hash2(s, k, 21) - 0.5) * 22, ny = y - drop, nz = z + (hash2(s, k, 22) - 0.5) * 6;
      seg(x, y, z, nx, ny, nz);
      if (k === 3 || k === 6) seg(nx, ny, nz, nx + (hash2(s, k, 23) - 0.5) * 40, ny - drop * 1.2, nz); // a fork
      x = nx; y = ny; z = nz;
    }
    const geo = this.bolt.geometry;
    geo.dispose();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  }
}
