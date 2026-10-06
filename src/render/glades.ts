// The sleeping legends' clearings (Ed, 2026-10-06: "Sleeping legends should be in a small circular clearing, where they
// sit near the top of the circle. This magical clearing should be lit with an eerie twilight with glowing motes rising in
// it."). Art builder 1 places the clearings (their centres and radii); this draws their light: a cool twilight pool that
// fills the circle and falls off at its edge (lighting.ts, nightLightShaded: every lit surface takes it), a ring at the
// edge that brightens with the clearing's `edge` (the witch inside it, or a quest sigil or relic put down in it), and
// glowing motes rising slowly from its floor. The nearest MAX_GLADES within reach only; the motes are a fixed pool of
// points placed wholly in the shader, so nothing is allocated per frame.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { dormant } from "../rules/game";
import type { GladeTuning } from "../rules/tuning";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_UNIFORMS, MAX_GLADES } from "./lighting";
import { hsvInto } from "./mood";

/** A clearing: its centre and radius (m) on the ground, and how bright its edge is (0 to 1: the witch inside, a sigil put down). */
export interface Glade { x: number; z: number; radius: number; edge: number }


const VERT = /* glsl */ `
attribute float aSeed;   // 0 to 1: this mote's own
attribute float aGlade;  // which clearing (0 to MAX_GLADES - 1)
uniform vec4 uGlade[${MAX_GLADES}];
uniform int uGladeCount;
uniform float uTime, uMoteRise, uMoteTop, uMoteSize;
varying float vA;
${HEIGHT_VERT_GLSL}
float gh(float n) { return fract(sin(n * 91.345 + aSeed * 47.13) * 43758.5453); }
void main() {
  int i = int(aGlade + 0.5);
  vA = 0.0;
  if (i >= uGladeCount) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; return; }
  vec4 G = uGlade[0];
  for (int k = 1; k < ${MAX_GLADES}; k++) if (k == i) G = uGlade[k];
  // Each mote its own spot in the circle (denser toward the middle), rising and drifting; a new spot each time round.
  float t = uTime * uMoteRise / uMoteTop + aSeed * 7.31, cyc = floor(t), up = fract(t);
  float ang = gh(cyc + 1.0) * 6.2832, rad = sqrt(gh(cyc + 2.0)) * G.z * 0.85;
  vec2 xz = G.xy + vec2(cos(ang), sin(ang)) * rad + vec2(sin(uTime * 0.5 + aSeed * 13.0), cos(uTime * 0.37 + aSeed * 7.0)) * 0.6 * up;
  vec3 p = onGround(vec3(xz.x, 0.2 + up * uMoteTop, xz.y));
  // In over the first stretch, out at the top; a slow twinkle.
  vA = smoothstep(0.0, 0.15, up) * (1.0 - smoothstep(0.6, 1.0, up)) * (0.65 + 0.35 * sin(uTime * 2.3 + aSeed * 40.0));
  gl_Position = clipOf(p);
  gl_PointSize = uMoteSize;
}`;

const FRAG = /* glsl */ `
uniform vec3 uMoteRgb;
varying float vA;
void main() {
  if (vA < 0.01) discard;
  gl_FragColor = vec4(uMoteRgb * vA, 1.0);
}`;

/** The clearings in play, written into `out` (its objects reused; returns how many): art builder 1's (the map's `glades`)
 *  where there are any, else one round each sleeping legend, the legend near the top of its circle. */
export function gladesOf(g: Game, T: GladeTuning, out: Glade[]): number {
  let n = 0;
  const put = (x: number, z: number, radius: number, edge: number) => { const o = out[n] ?? (out[n] = { x: 0, z: 0, radius: 0, edge: 0 }); o.x = x; o.z = z; o.radius = radius; o.edge = edge; n++; };
  // Art builder 1's clearings (#235: map.legendClearings, each { x, z, r, ... }), where the map has them.
  const mapped = (g.map as { legendClearings?: { x: number; z: number; r: number }[] }).legendClearings;
  if (mapped) { for (const c of mapped) put(c.x, c.z, c.r, 0); return n; }
  for (const id of g.legendIds ?? []) {
    const c = g.creatures[id];
    if (c && !c.gone && dormant(g, c)) put(c.x, c.z + T.radius * T.top, T.radius, 0);
  }
  return n;
}

/** How far into a clearing's light she is (0 to 1), eased linearly over `fade` seconds: toward 1 only while she's in a
 *  circle on the ground (Ed, 2026-10-06: "The lighting changes for the legend circles should only happen when you're in
 *  ground mode"), toward 0 otherwise, so landing in one or rising out of it eases both ways. */
export function easeInside(prev: number, inCircle: boolean, ground: boolean, dt: number, fade: number): number {
  const want = inCircle && ground ? 1 : 0;
  return Math.max(0, Math.min(1, prev + Math.sign(want - prev) * dt / Math.max(0.05, fade)));
}

/** The forest's light outside the clearing's own twilight (1 as it is), and the share of her glow left, at `inside`. */
export const clearingDim = (T: Pick<GladeTuning, "dark">, inside: number): number => 1 - T.dark * inside * inside * (3 - 2 * inside);
export const clearingGlow = (T: Pick<GladeTuning, "glowOff">, inside: number): number => 1 - T.glowOff * inside * inside * (3 - 2 * inside);

/** A clearing's key, by its place on the map (whole metres). */
export const gladeKey = (x: number, z: number): number => Math.round(x) * 100003 + Math.round(z);

export class Glades {
  readonly points: THREE.Points;
  private u: Record<string, THREE.IUniform>;
  private list: Glade[] = [];
  private near: Glade[] = [];
  /** Each clearing's eased edge, by gladeKey (so a clearing keeps its own as the nearest change). */
  private edges = new Map<number, number>();
  /** How far she's into a clearing (0 out, 1 in), eased over fade seconds; her glow's own power, to fade it from. */
  private inside = 0;
  private glowBase: number;

  constructor(private T: GladeTuning) {
    const n = MAX_GLADES * T.motes.per, seeds = new Float32Array(n), which = new Float32Array(n);
    for (let i = 0; i < n; i++) { seeds[i] = ((i * 0.618034) % 1 + (i % 7) * 0.013) % 1; which[i] = Math.floor(i / T.motes.per); }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aGlade", new THREE.BufferAttribute(which, 1));
    const rgb = new THREE.Vector3(); hsvInto(rgb, T.motes.hue, T.motes.sat, 1, T.motes.bright);
    this.u = {
      ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime, uGlade: LIGHT_UNIFORMS.uGlade, uGladeCount: LIGHT_UNIFORMS.uGladeCount,
      uMoteRise: { value: T.motes.rise }, uMoteTop: { value: T.motes.height }, uMoteSize: { value: Math.max(1, T.motes.size) },
      uMoteRgb: { value: rgb },
    };
    this.points = new THREE.Points(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.points.frustumCulled = false; this.points.renderOrder = 12;
    hsvInto(LIGHT_UNIFORMS.uGladeRgb.value, T.hue, T.sat, 1);
    LIGHT_UNIFORMS.uGladeLight.value.set(T.on ? T.light : 0, T.on ? T.edge : 0);
    this.glowBase = LIGHT_UNIFORMS.uGlowPower.value;
  }

  /** The nearest clearings to (wx, wz) into the light's uniforms. Its edge brightens, eased, with the witch inside it, with
   *  the map's own `edge` for it, or with `extraEdge` (art builder 1's hook: a quest sigil or relic put down in it, 0 to 1
   *  by gladeKey). No allocation: the list's objects are reused and the nearest kept by insertion. */
  update(g: Game, wx: number, wz: number, dt: number, ground: boolean, extraEdge?: (key: number) => number): void {
    const T = this.T, U = LIGHT_UNIFORMS, near = this.near;
    if (!T.on) { U.uGladeCount.value = 0; U.uDim.value = 1; this.points.visible = false; return; }
    const total = gladesOf(g, T, this.list);
    let n = 0;
    for (let j = 0; j < total; j++) {
      const c = this.list[j], d = (c.x - wx) ** 2 + (c.z - wz) ** 2;
      if (d > T.reach * T.reach) continue;
      let i = Math.min(n, MAX_GLADES - 1);
      if (n === MAX_GLADES && d >= (near[i].x - wx) ** 2 + (near[i].z - wz) ** 2) continue;
      while (i > 0 && d < (near[i - 1].x - wx) ** 2 + (near[i - 1].z - wz) ** 2) { near[i] = near[i - 1]; i--; }
      near[i] = c; if (n < MAX_GLADES) n++;
    }
    const k = 1 - Math.exp(-T.edgeEase * dt);
    for (let i = 0; i < n; i++) {
      const c = near[i], key = gladeKey(c.x, c.z), was = this.edges.get(key) ?? 0;
      const want = Math.max(ground && (wx - c.x) ** 2 + (wz - c.z) ** 2 < c.radius * c.radius ? 1 : 0, extraEdge?.(key) ?? 0, c.edge);
      const e = was + (want - was) * k;
      this.edges.set(key, e);
      U.uGlade.value[i].set(c.x, c.z, c.radius, e);
    }
    U.uGladeCount.value = n;
    this.points.visible = n > 0;
    // Inside one (Ed, 2026-10-06: "the rest of the forest should get darker. Maybe switch off the witch's glow"): the
    // forest's light and haze dim by `dark` and her glow goes by `glowOff`, both eased in and out over `fade` seconds.
    let inCircle = false;
    for (let i = 0; i < n; i++) if ((wx - near[i].x) ** 2 + (wz - near[i].z) ** 2 < near[i].radius * near[i].radius) inCircle = true;
    this.inside = easeInside(this.inside, inCircle, ground, dt, T.fade);
    U.uDim.value = clearingDim(T, this.inside);
    U.uGlowPower.value = this.glowBase * clearingGlow(T, this.inside);
  }
}
