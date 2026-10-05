// The ground cover's drawing (rules/groundcover.ts): tiny tufts round the witch in one instanced
// draw, in ground mode only. Each grid cell's tufts are worked out once, a few cells a frame,
// nearest first, and kept; the batch is rebuilt as she moves. In the vertex shader they sway in
// the same wind as the trees and part round the witch and nearby creatures; they fade out in an
// ordered dither towards the edge of their radius. The tufts are the art's own (art/tufts.js,
// bakeTufts: each area's kinds in its palette, with their shares), lit by their normal maps; each
// sways by its sway mask (rigid pebbles, litter and mushrooms stay still).
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { LOOKS } from "../rules/map";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import type { Tuning } from "../rules/tuning";
import { tuftsInCell, TUFT_KINDS, type Tuft } from "../rules/groundcover";
import { hash2 } from "../rules/random";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { SPRITE_UNIFORMS } from "./sprites";

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform vec4 uWind;
uniform vec4 uPart[4];      // x, z, radius, on: where tufts part (the witch, creatures)
uniform vec4 uClear[8];     // x, z, radius, on: trampled flat round placed sigils (Ed, v233)
uniform vec4 uGrass;        // metres per art pixel, sway, part, (unused)
attribute vec4 iTuft;       // x, z, size, flip
attribute vec4 iUv;         // its frame in the tuft atlas
attribute vec3 iPx;         // its size in art pixels (w, h), and how much it sways (from its sway mask)
attribute float iOpen;      // how open the ground is there: where the canopy is
uniform vec4 uCanopy;       // the ground's canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing;     // clearingSize, clearingFalloff
uniform vec3 uMoonDir;
uniform float uTime, uSmooth;
varying vec2 vUv;
varying vec3 vWorld;
varying float vMoonK;
${HEIGHT_VERT_GLSL}
float gHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float gNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = gHash(i), b = gHash(i + vec2(1, 0)), c = gHash(i + vec2(0, 1)), d = gHash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
void main() {
  float s = iTuft.z * uGrass.x;
  vec3 base = onGround(vec3(iTuft.x, 0.0, iTuft.y)); // on the rolling ground
  // Round a placed sigil the cover is trampled: none over its rune, short and flattened just beyond.
  for (int k = 0; k < 8; k++) {
    if (uClear[k].w < 0.5) continue;
    s *= smoothstep(uClear[k].z, uClear[k].z + 1.2, length(base.xz - uClear[k].xy));
  }
  vec3 w = base + uRight * (position.x * iPx.x * s) + uUp * (position.y * iPx.y * s);
  float top = uv.y * iPx.z, hgt = iPx.y * s; // rigid tufts (pebbles, litter) don't sway or part
  // The same wind as the trees, stronger for their size.
  vec2 q = base.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  float gust = mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
  w += uRight * top * hgt * uGrass.y * (gust * 0.8 + sin(uWind.w * 2.3 + base.x * 0.7 + base.z * 0.4) * 0.3) * step(0.0001, uWind.x);
  // Parting round the witch and creatures: the top pushed away and down.
  for (int k = 0; k < 4; k++) {
    if (uPart[k].w < 0.5) continue;
    vec2 d = base.xz - uPart[k].xy;
    float r = length(d);
    if (r < uPart[k].z && r > 1e-3) { float a = (1.0 - r / uPart[k].z) * uGrass.z; w.xz += d / r * top * hgt * a; w.y -= top * hgt * a * 0.5; }
  }
  float u = iTuft.w > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vWorld = w;
  // In the canopy's dappled shade as the ground under it is (Ed, 2026-10-04): the ground's own
  // canopy layer, worked out once at the tuft's root.
  vMoonK = 1.0;
  if (uCanopy.x > 0.0) {
    vec2 p = vec2(iTuft.x, iTuft.y), cq = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = gNoise(cq / 2.6) * 0.6 + gNoise(cq / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (iOpen - uClearing.x) / max(0.01, uClearing.y));
    vMoonK = 1.0 - uCanopy.x * (uSmooth > 0.5 ? smoothstep(-0.07, 0.07, cover - leaves) : step(leaves, cover));
  }
  gl_Position = clipOf(w);
  vec4 b = clipOf(base);
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  gl_Position.xy += (snapped - ndc) * gl_Position.w;
}`;

const FRAG = /* glsl */ `
uniform sampler2D uTufts, uTuftN;
uniform vec3 uRight, uUp, uFacing;
uniform vec4 uFade; // centre x, z, radius, how much shows (0 in the treetops)
varying vec2 vUv;
varying vec3 vWorld;
varying float vMoonK;
${LIGHT_GLSL}
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
void main() {
  vec4 m = texture2D(uTufts, vUv);
  if (m.a < 0.5) discard;
  // Fading out towards the edge of the cover, and as she rises, in an ordered dither.
  float k = (1.0 - smoothstep(uFade.z * 0.7, uFade.z, length(vWorld.xz - uFade.xy))) * uFade.w;
  if (k < 0.999 && bayer4(gl_FragCoord.xy) > k) discard;
  vec4 n = texture2D(uTuftN, vUv);
  vec3 N = normalize(uRight * ((n.r * 255.0 - 128.0) / 127.0) - uUp * ((n.g * 255.0 - 128.0) / 127.0) + uFacing * n.b);
  gl_FragColor = vec4(haze(min(vec3(1.0), m.rgb * nightLightShaded(N, vWorld, vMoonK) * 1.25), vWorld), 1.0);
}`;

export class GrassView {
  readonly mesh: THREE.Mesh;
  private geo: THREE.InstancedBufferGeometry;
  private tuft: THREE.InstancedBufferAttribute;
  private uvA: THREE.InstancedBufferAttribute;
  private pxA: THREE.InstancedBufferAttribute;
  /** The tuft art: every area type's tufts in one atlas; per type, its frames, their shares (running total) and sways. */
  private atlas: Atlas;
  private kinds: { frame: number; upTo: number; sway: number }[][] = [];
  /** Each area's rushes (or any area's), for the reeds that ring ponds. */
  private rushes: ({ frame: number; sway: number } | undefined)[] = [];
  private open!: THREE.InstancedBufferAttribute;
  private cells = new Map<string, Tuft[]>();
  private mat: THREE.ShaderMaterial;
  private lastKey = "";
  /** Tufts drawn, and milliseconds spent working out cells, this frame (for the debug overlay and perf). */
  stats = { tufts: 0, buildMs: 0 };

  /** forest: for the tufts round trunks, rocks and ponds; ground: the ground material's uniforms, for its canopy shade. */
  constructor(private map: ForestMap, private t: Tuning, metresPerPixel: number, style: object, private forest?: Forest, ground?: Record<string, THREE.IUniform>) {
    const cap = t.groundCover.cap, sprites: Baked[] = [];
    // The art's tufts for every area type (#34), with how much each sways: the mean of its sway
    // mask over its drawn pixels (0 for pebbles and litter, most for long grass and rushes).
    for (const type of LOOKS) { // (the area types and home's meadow)
      const list = Art.bakeTufts(type.id, style) as { kind: string; weight: number; A: Baked["A"]; N: Baked["N"]; S: Baked["A"]; w: number; h: number }[];
      let upTo = 0;
      this.kinds.push(list.map(b => {
        sprites.push({ A: b.A, N: b.N, w: b.w, h: b.h });
        const px = (b.S.getContext("2d") as CanvasRenderingContext2D).getImageData(0, 0, b.w, b.h).data;
        let sum = 0, n = 0;
        for (let i = 0; i < px.length; i += 4) if (px[i + 3] > 0) { sum += px[i]; n++; }
        upTo += b.weight;
        const k = { frame: sprites.length - 1, upTo, sway: n ? Math.min(1, (sum / n / 255) * 2) : 0 };
        if (b.kind === "rushes") this.rushes[this.kinds.length] = k;
        return k;
      }));
    }
    const anyRushes = this.rushes.find(r => r);
    for (let i = 0; i < LOOKS.length; i++) this.rushes[i] ??= anyRushes;
    this.atlas = packAtlas(sprites, 512);
    this.geo = new THREE.InstancedBufferGeometry();
    const quad = new THREE.PlaneGeometry(1, 1).translate(0, 0.5, 0);
    this.geo.index = quad.index; this.geo.setAttribute("position", quad.getAttribute("position")); this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.tuft = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4); this.tuft.setUsage(THREE.DynamicDrawUsage);
    this.uvA = new THREE.InstancedBufferAttribute(new Float32Array(cap * 4), 4); this.uvA.setUsage(THREE.DynamicDrawUsage);
    this.pxA = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3), 3); this.pxA.setUsage(THREE.DynamicDrawUsage);
    this.open = new THREE.InstancedBufferAttribute(new Float32Array(cap), 1); this.open.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute("iTuft", this.tuft); this.geo.setAttribute("iUv", this.uvA); this.geo.setAttribute("iPx", this.pxA); this.geo.setAttribute("iOpen", this.open);
    this.geo.instanceCount = 0;
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uFacing: SPRITE_UNIFORMS.uFacing, uRes: SPRITE_UNIFORMS.uRes, uWind: SPRITE_UNIFORMS.uWind,
        uTufts: { value: this.atlas.albedo }, uTuftN: { value: this.atlas.normal }, uPart: { value: Array.from({ length: 4 }, () => new THREE.Vector4()) }, uClear: { value: Array.from({ length: 8 }, () => new THREE.Vector4()) },
        uGrass: { value: new THREE.Vector4(metresPerPixel, t.groundCover.sway, t.groundCover.part, 0) }, uFade: { value: new THREE.Vector4() },
        uCanopy: ground?.uCanopy ?? { value: new THREE.Vector4() }, uClearing: ground?.uClearing ?? { value: new THREE.Vector2(1, 1) } },
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 0.25; // after the ground, with the scenery
  }

  /** Bring the cover to the witch at (x, z): `shown` 0 in the treetops to 1 on the ground; `part`:
   *  where tufts part; `reach`: how far it shows (the canopy hole round her), up to groundCover.radius;
   *  `clear`: where no tufts grow (placed sigils' runes, the nearest eight). */
  update(x: number, z: number, shown: number, part: { x: number; z: number; r: number }[], reach = Infinity, clear: { x: number; z: number; r: number }[] = []): void {
    const G = { ...this.t.groundCover, radius: Math.max(8, Math.min(this.t.groundCover.radius, reach)) };
    this.mesh.visible = G.on && shown > 0.01 && G.density > 0;
    if (!this.mesh.visible) return;
    const u = this.mat.uniforms;
    (u.uFade.value as THREE.Vector4).set(x, z, G.radius, shown);
    (u.uPart.value as THREE.Vector4[]).forEach((v, i) => { const p = part[i]; if (p) v.set(p.x, p.z, p.r, 1); else v.set(0, 0, 0, 0); });
    const near = clear.map(c => ({ ...c, d: Math.hypot(c.x - x, c.z - z) })).filter(c => c.d < G.radius + c.r + 2).sort((a, b) => a.d - b.d);
    (u.uClear.value as THREE.Vector4[]).forEach((v, i) => { const p = near[i]; if (p) v.set(p.x, p.z, p.r, 1); else v.set(0, 0, 0, 0); });
    // Work out the cells in reach, nearest first, within a time budget; rebuild when she moves a cell.
    const C = G.cell, ci0 = Math.floor((x - G.radius) / C), ci1 = Math.floor((x + G.radius) / C), cj0 = Math.floor((z - G.radius) / C), cj1 = Math.floor((z + G.radius) / C);
    const want: [number, number, number][] = [];
    for (let cj = cj0; cj <= cj1; cj++) for (let ci = ci0; ci <= ci1; ci++) {
      const d = Math.hypot((ci + 0.5) * C - x, (cj + 0.5) * C - z);
      if (d < G.radius + C) want.push([ci, cj, d]);
    }
    want.sort((a, b) => a[2] - b[2]);
    const t0 = performance.now();
    let built = false;
    for (const [ci, cj] of want) {
      const k = ci + "," + cj;
      if (this.cells.has(k)) continue;
      if (performance.now() - t0 > G.budgetMs) break;
      this.cells.set(k, tuftsInCell(this.map, ci, cj, C, G.spacing, G.density, this.forest));
      built = true;
    }
    this.stats.buildMs = performance.now() - t0;
    const key = `${ci0},${cj0}`;
    if (!built && key === this.lastKey) return;
    this.lastKey = key;
    // Forget cells well out of reach.
    if (this.cells.size > want.length * 3) for (const k of this.cells.keys()) { const [a, b] = k.split(",").map(Number); if (Math.hypot((a + 0.5) * C - x, (b + 0.5) * C - z) > G.radius * 2 + C) this.cells.delete(k); }
    const T = this.tuft.array as Float32Array, U = this.uvA.array as Float32Array, P = this.pxA.array as Float32Array, cap = G.cap, F = this.atlas.frames;
    let n = 0;
    for (const [ci, cj] of want) {
      const list = this.cells.get(ci + "," + cj);
      if (!list) continue;
      for (const f of list) {
        if (n >= cap) break;
        if (Math.hypot(f.x - x, f.z - z) > G.radius + C) continue; // a cell's slack: it's rebuilt as she crosses cells
        // Which of its area's tufts, by their shares, seeded from where it stands.
        const ks = this.kinds[f.type], roll = hash2(Math.round(f.x * 64), Math.round(f.z * 64), 1107) * (ks[ks.length - 1]?.upTo ?? 1);
        // (Reeds ringing a pond: the area's rushes, or any area's.)
        const kd = (TUFT_KINDS[f.kind] === "reeds" ? this.rushes[f.type] : undefined) ?? ks.find(k => roll <= k.upTo) ?? ks[ks.length - 1];
        if (!kd) continue;
        const fr = F[kd.frame];
        T.set([f.x, f.z, f.size, f.flip ? 1 : 0], n * 4);
        U.set(fr.uv, n * 4);
        P.set([fr.w, fr.h, kd.sway], n * 3);
        (this.open.array as Float32Array)[n] = f.open;
        n++;
      }
    }
    this.geo.instanceCount = n;
    this.stats.tufts = n;
    for (const a of [this.tuft, this.uvA, this.pxA, this.open]) { a.needsUpdate = true; a.clearUpdateRanges(); a.addUpdateRange(0, n * a.itemSize); }
  }
}
