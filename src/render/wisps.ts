// Will-o'-the-wisps (Ed, 2026-10-07, eerie forest): a few faint, slow lights drifting between the trees of the wild areas,
// fading in and out, never in an area the party has reached and rarer the nearer the party is. Drawing only: where they
// are is worked out from the map and the party (a seeded chance per square of ground near her), never stored in the
// rules. A fixed pool of points, two to a wisp (a small core and a faint halo), placed and moved wholly in the shader from
// a uniform list of anchors refreshed a few times a second, so nothing is allocated per frame.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { cellKey } from "../rules/party";
import type { WispTuning } from "../rules/tuning";
import { hash2 } from "../rules/random";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import { hsvInto } from "./mood";


export const MAX_WISPS = 24;

/** How likely a wild square at (x, z) is to hold a wisp, given how far it is (m) from the party's nearest area. */
export function wispChance(T: WispTuning, partyDist: number): number {
  const k = Math.max(0, Math.min(1, (partyDist - T.partyNear) / Math.max(1, T.partyFar - T.partyNear)));
  return T.chance * k * k * (3 - 2 * k);
}

const VERT = /* glsl */ `
attribute float aWisp;   // which wisp (0 to MAX_WISPS - 1)
attribute float aHalo;   // 0 its core, 1 its halo
uniform vec4 uWisp[${MAX_WISPS}];
uniform int uWispCount;
uniform float uTime, uDrift, uPeriod, uLow, uHigh, uSize, uHalo;
varying float vA;
varying float vHalo;
${HEIGHT_VERT_GLSL}
void main() {
  int i = int(aWisp + 0.5);
  vA = 0.0; vHalo = aHalo;
  if (i >= uWispCount) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; return; }
  vec4 W = uWisp[0];
  for (int k = 1; k < ${MAX_WISPS}; k++) if (k == i) W = uWisp[k];
  float s = W.z, t = uTime;
  // Wandering slowly round its spot, never straight: two slow sways at odd rates; bobbing a little.
  vec2 xz = W.xy + vec2(sin(t * 0.11 + s * 6.3) + 0.5 * sin(t * 0.27 + s * 2.1), cos(t * 0.09 + s * 9.1) + 0.5 * cos(t * 0.23 + s * 4.7)) * uDrift * 0.67;
  float y = mix(uLow, uHigh, fract(s * 7.13)) + sin(t * 0.41 + s * 5.0) * 0.35;
  vec3 p = onGround(vec3(xz.x, y, xz.y));
  // Fading in, lingering, fading out, then gone a while: each its own cycle; a slow flicker while it shows.
  float life = fract(t / uPeriod + s);
  vA = W.w * smoothstep(0.0, 0.2, life) * (1.0 - smoothstep(0.5, 0.7, life)) * (0.7 + 0.3 * sin(t * 2.7 + s * 31.0));
  gl_Position = clipOf(p);
  gl_PointSize = aHalo > 0.5 ? uHalo : uSize;
}`;

const FRAG = /* glsl */ `
uniform vec3 uRgb;
varying float vA;
varying float vHalo;
void main() {
  if (vA < 0.01) discard;
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r = dot(q, q);
  if (r > 1.0) discard;
  // The halo a faint stepped ring round the core (pixel art: two steps, no gradient).
  float a = vHalo > 0.5 ? (r < 0.45 ? 0.32 : 0.14) : 1.0;
  gl_FragColor = vec4(uRgb * vA * a, 1.0);
}`;

export class Wisps {
  readonly points: THREE.Points;
  private u: Record<string, THREE.IUniform>;
  private anchors: THREE.Vector4[];
  private nextAt = -1;
  private partySites: { x: number; z: number }[] = [];
  private partyCount = -1;

  constructor(private T: WispTuning) {
    const n = MAX_WISPS * 2, which = new Float32Array(n), halo = new Float32Array(n);
    for (let i = 0; i < n; i++) { which[i] = i >> 1; halo[i] = i & 1; }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aWisp", new THREE.BufferAttribute(which, 1));
    geo.setAttribute("aHalo", new THREE.BufferAttribute(halo, 1));
    this.anchors = Array.from({ length: MAX_WISPS }, () => new THREE.Vector4());
    const rgb = new THREE.Vector3(); hsvInto(rgb, T.hue, T.sat, 1, T.bright);
    this.u = {
      ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uRealTime, uWisp: { value: this.anchors }, uWispCount: { value: 0 },
      uDrift: { value: T.drift }, uPeriod: { value: Math.max(1, T.period) }, uLow: { value: T.height[0] }, uHigh: { value: T.height[1] },
      uSize: { value: Math.max(1, T.size) }, uHalo: { value: Math.max(1, T.halo) }, uRgb: { value: rgb },
    };
    this.points = new THREE.Points(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.points.frustumCulled = false; this.points.renderOrder = 12;
  }

  /** The wisps round (wx, wz), refreshed four times a second (on her clock, ht): every square of ground within reach that
   *  isn't the party's own, by its seeded chance, the nearest first. */
  update(g: Game, wx: number, wz: number, ht: number): void {
    const T = this.T;
    if (!T.on) { this.points.visible = false; return; }
    if (ht < this.nextAt) return;
    this.nextAt = ht + 0.25;
    // The partified areas' middles (made again only when the party spreads).
    if (g.party.areas.size !== this.partyCount) {
      this.partyCount = g.party.areas.size; this.partySites.length = 0;
      for (const a of g.party.areas.values()) { const s = g.map.siteOf(a.cell[0], a.cell[1]); this.partySites.push({ x: s.x, z: s.z }); }
    }
    const C = T.cell, R = T.reach, i0 = Math.floor((wx - R) / C), i1 = Math.floor((wx + R) / C), j0 = Math.floor((wz - R) / C), j1 = Math.floor((wz + R) / C);
    let n = 0;
    for (let i = i0; i <= i1 && n < MAX_WISPS; i++) for (let j = j0; j <= j1 && n < MAX_WISPS; j++) {
      // its spot somewhere in its square, by its own seed
      const x = (i + 0.15 + 0.7 * hash2(i, j, 811)) * C, z = (j + 0.15 + 0.7 * hash2(i, j, 812)) * C;
      if ((x - wx) ** 2 + (z - wz) ** 2 > R * R) continue;
      let d = Infinity;
      for (const s of this.partySites) d = Math.min(d, Math.hypot(s.x - x, s.z - z));
      if (hash2(i, j, 813) >= wispChance(T, d)) continue;
      if (g.party.areas.has(cellKey(g.map.areaAt(x, z).cell))) continue; // (never in the party's own ground)
      this.anchors[n++].set(x, z, hash2(i, j, 814), 0.55 + 0.45 * hash2(i, j, 815));
    }
    this.u.uWispCount.value = n;
    this.points.visible = n > 0;
  }
}
