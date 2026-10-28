// The ground cover's drawing (rules/groundcover.ts): tiny tufts round the witch in one instanced
// draw, in ground mode only. Each grid cell's tufts are worked out once, a few cells a frame,
// nearest first, and kept; the batch is rebuilt as she moves. In the vertex shader they sway in
// the same wind as the trees and part round the witch and nearby creatures; they fade out in an
// ordered dither towards the edge of their radius. The tufts are the art's own (art/tufts.js,
// bakeTufts: each area's kinds in its palette, with their shares), lit by their normal maps; each
// sways by its sway mask (rigid pebbles, litter and mushrooms stay still).
import * as THREE from "three";
import { BAYER_GLSL, PIXEL_SNAP_GLSL, VALUE_NOISE_GLSL, WIND_GUST_GLSL } from "./shaders";
import * as Art from "../../art/generator.js";
import { LOOKS } from "../rules/map";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import type { Tuning } from "../rules/tuning";
import { tuftSpan, tuftsInCell, TUFT_KINDS, type Tuft } from "../rules/groundcover";
import { hash2 } from "../rules/random";
import { atlasFromPixels, atlasGlsl, atlasUniforms, setAtlasUniforms, type Atlas, type Baked } from "./atlas";
import { packSteps, type AtlasPixels } from "./artBuild";
import { runSync, type Steps } from "./slices";
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
attribute vec4 iUv;         // its frame in the tuft atlas, in atlas pixels: x, y (top), width, height
attribute vec3 iPx;         // its size in art pixels (w, h), and how much it sways (from its sway mask)
attribute float iOpen;      // how open the ground is there: where the canopy is
uniform vec4 uCanopy;       // the ground's canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing;     // clearingSize, clearingFalloff
uniform vec3 uMoonDir;
uniform float uTime;
varying vec4 vRect; // its frame (atlas pixels)
varying vec2 vLocal; // where in it, in its own pixels (0 to width, 0 to height down from its top)
varying vec3 vWorld;
varying float vMoonK;
${HEIGHT_VERT_GLSL}
${VALUE_NOISE_GLSL}${WIND_GUST_GLSL}${PIXEL_SNAP_GLSL}void main() {
  float s = iTuft.z * uGrass.x;
  vec3 base = onGround(vec3(iTuft.x, 0.0, iTuft.y)); // on the rolling ground
  // Round a placed sigil the cover is trampled: none under the middle of its rune, flattened short over the rest of it and
  // just beyond, so the floor keeps its own tone round the rune (Ed, 2026-10-09: "There is still a dark patch underneath placed
  // sigils": cleared out to past the rune, the bare floor under the cover showed, unlit and near black, a band behind them).
  float trod = 1.0;
  for (int k = 0; k < 8; k++) {
    if (uClear[k].w < 0.5) continue;
    float d = length(base.xz - uClear[k].xy), r = uClear[k].z;
    s *= smoothstep(r * 0.35, r * 0.6, d);
    trod = min(trod, mix(0.3, 1.0, smoothstep(r, r + 1.2, d)));
  }
  vec3 w = base + uRight * (position.x * iPx.x * s) + uUp * (position.y * iPx.y * s * trod);
  float top = uv.y * iPx.z, hgt = iPx.y * s * trod; // rigid tufts (pebbles, litter) don't sway or part
  // The same wind as the trees, stronger for their size.
  vec2 q = base.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
  float gust = windGust(q);
  w += uRight * top * hgt * uGrass.y * (gust * 0.8 + sin(uWind.w * 2.3 + base.x * 0.7 + base.z * 0.4) * 0.3) * step(0.0001, uWind.x);
  // Parting round the witch and creatures: the top pushed away and down.
  for (int k = 0; k < 4; k++) {
    if (uPart[k].w < 0.5) continue;
    vec2 d = base.xz - uPart[k].xy;
    float r = length(d);
    if (r < uPart[k].z && r > 1e-3) { float a = (1.0 - r / uPart[k].z) * uGrass.z; w.xz += d / r * top * hgt * a; w.y -= top * hgt * a * 0.5; }
  }
  float u = iTuft.w > 0.5 ? 1.0 - uv.x : uv.x;
  vRect = iUv; vLocal = vec2(u * iUv.z, (1.0 - uv.y) * iUv.w);
  vWorld = w;
  // In the canopy's dappled shade as the ground under it is (Ed, 2026-10-04): the ground's own
  // canopy layer, worked out once at the tuft's root.
  vMoonK = 1.0;
  if (uCanopy.x > 0.0) {
    vec2 p = vec2(iTuft.x, iTuft.y), cq = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(cq / 2.6) * 0.6 + vnoise(cq / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (iOpen - uClearing.x) / max(0.01, uClearing.y));
    vMoonK = 1.0 - uCanopy.x * smoothstep(-0.07, 0.07, cover - leaves);
  }
  gl_Position = clipOf(w);
  gl_Position.xy += pixelSnap(clipOf(base)) * gl_Position.w;
}`;

const FRAG = /* glsl */ `
${atlasGlsl("uTufts", "uTuftN")}
uniform vec2 uTuftSize; // the atlas, in pixels
uniform vec3 uRight, uUp, uFacing;
uniform vec4 uFade; // centre x, z, radius, how much shows (0 in the treetops)
varying vec4 vRect;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vMoonK;
${LIGHT_GLSL}
${BAYER_GLSL}void main() {
  // Its texel picked in its own pixels and sampled at that texel's centre (the bench, 2026-10-13: as fractions of the atlas, which texel
  // a fragment landed on shifted with the atlas's height, so a new area's tufts moved every tuft's pixels everywhere)
  vec2 vUv = (vRect.xy + clamp(floor(vLocal), vec2(0.0), vRect.zw - 1.0) + 0.5) / uTuftSize;
  vec4 m = albedoAt(vUv);
  if (m.a < 0.5) discard;
  // Fading out towards the edge of the cover, and as she rises, in an ordered dither.
  float k = (1.0 - smoothstep(uFade.z * 0.7, uFade.z, length(vWorld.xz - uFade.xy))) * uFade.w;
  if (k < 0.999 && bayer4(gl_FragCoord.xy) > k) discard;
  vec4 n = normalAt(vUv);
  vec3 N = normalize(uRight * ((n.r * 255.0 - 128.0) / 127.0) - uUp * ((n.g * 255.0 - 128.0) / 127.0) + uFacing * n.b);
  gl_FragColor = vec4(haze(glowPool(min(vec3(1.0), m.rgb * nightLightShaded(N, vWorld, vMoonK) * 1.25), vWorld), vWorld), 1.0);
}`;

/** A cell's key in GrassView's cells: a small integer (cells within CELL0 of the origin, far beyond any map). */
const CELL0 = 16384, CELLS = 32768;
/** Tufts a block: each cell in reach holds whole blocks of the buffers (one or two: a cell is at most 81 tufts, more by a pond). */
const BLOCK = 32;
const cellKey = (ci: number, cj: number) => (ci + CELL0) * CELLS + (cj + CELL0);

/** Each area type's tufts as drawn, by the page's style, the type and the biome (GrassView.tufts): a few hundred tiny canvases a
 *  biome, so an island in a biome met before draws none again. */
const TUFT_KEPT = new Map<string, { kind: string; weight: number; sway: number; sprite: Baked }[]>();
/** The tufts' art for every area type, drawn and packed (GrassView.tufts). */
export interface TuftArt { kinds: { frame: number; upTo: number; sway: number }[][]; rushes: ({ frame: number; sway: number } | undefined)[]; pixels: AtlasPixels }

export class GrassView {
  readonly mesh: THREE.Mesh;
  private geo: THREE.InstancedBufferGeometry;
  private tuft: THREE.InstancedBufferAttribute;
  private uvA: THREE.InstancedBufferAttribute;
  private pxA: THREE.InstancedBufferAttribute;
  /** The tuft art: every area type's tufts in one atlas; per type, its frames, their shares (running total) and sways. */
  private atlas: Atlas;
  private atlasW = 1; private atlasH = 1; // its size in pixels
  private kinds: { frame: number; upTo: number; sway: number }[][] = [];
  /** Each area's rushes (or any area's), for the reeds that ring ponds. */
  private rushes: ({ frame: number; sway: number } | undefined)[] = [];
  private open!: THREE.InstancedBufferAttribute;
  private cells = new Map<number, Tuft[]>(); // (by cellKey: a small integer, no string a cell a frame)
  /** The blocks of the buffers each cell in reach holds (BLOCK tufts each), the free ones, the most ever used, and how many fit. */
  private held = new Map<number, number[]>();
  private free: number[] = [];
  private top = 0;
  private maxBlocks: number;
  private mat: THREE.ShaderMaterial;
  private lastCi = NaN; private lastCj = NaN;
  /** Tufts drawn, and milliseconds spent working out cells, this frame (for the debug overlay and perf). */
  stats = { tufts: 0, buildMs: 0 };

  /** forest: for the tufts round trunks, rocks and ponds; ground: the ground material's uniforms, for its canopy shade. */
  constructor(private map: ForestMap, private t: Tuning, metresPerPixel: number, style: object, private forest?: Forest, ground?: Record<string, THREE.IUniform>, made: TuftArt = runSync(GrassView.tufts(style))) {
    const cap = t.groundCover.cap;
    this.maxBlocks = Math.floor(cap / BLOCK);
    this.kinds = made.kinds; this.rushes = made.rushes;
    this.atlas = atlasFromPixels(made.pixels, "ground");
    const img = this.atlas.albedo.image as { width: number; height: number }; this.atlasW = img.width; this.atlasH = img.height;
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
        ...atlasUniforms(this.atlas, "uTufts", "uTuftN"), uTuftSize: { value: new THREE.Vector2(this.atlasW, this.atlasH) }, uPart: { value: Array.from({ length: 4 }, () => new THREE.Vector4()) }, uClear: { value: Array.from({ length: 8 }, () => new THREE.Vector4()) },
        uGrass: { value: new THREE.Vector4(metresPerPixel, t.groundCover.sway, t.groundCover.part, 0) }, uFade: { value: new THREE.Vector4() },
        uCanopy: ground?.uCanopy ?? { value: new THREE.Vector4() }, uClearing: ground?.uClearing ?? { value: new THREE.Vector2(1, 1) } },
      // its pixels marked in the stencil's second bit (scenery's is the first, sprites.ts), so the placed sigils show through it (render/leash.ts)
      stencilWrite: true, stencilRef: 2, stencilWriteMask: 2, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp,
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 0.25; // after the ground, with the scenery
  }

  /** The art's tufts for every area type (#34), drawn and packed (render/slices.ts: a step an area type, View.build's grass), with
   *  how much each sways: the mean of its sway mask over its drawn pixels (0 for pebbles and litter, most for long grass and rushes).
   *  In the style's biome (art/flora/biomes.js) only the area types in `own` (the island's: all, if not given), the rest as they
   *  always are; each type's drawing kept by its biome (TUFT_KEPT), so a night on another island draws only what it hasn't yet. */
  static *tufts(style: object, own?: ReadonlySet<number>): Steps<TuftArt> {
    const sprites: Baked[] = [], kinds: TuftArt["kinds"] = [], rushes: TuftArt["rushes"] = [];
    const { biome, ...plain } = style as { biome?: string }, styleKey = JSON.stringify(plain);
    yield "tufts";
    for (let t = 0; t < LOOKS.length; t++) { // (the area types and home's meadow)
      const type = LOOKS[t], b = biome && (!own || own.has(t)) ? biome : undefined, key = `${styleKey}|${type.id}|${b ?? ""}`;
      let kept = TUFT_KEPT.get(key);
      if (!kept) {
        yield;
        const list = Art.bakeTufts(type.id, b ? { ...plain, biome: b } : plain) as { kind: string; weight: number; A: Baked["A"]; N: Baked["N"]; S: Baked["A"]; w: number; h: number }[];
        kept = list.map(b => {
          const px = (b.S.getContext("2d") as CanvasRenderingContext2D).getImageData(0, 0, b.w, b.h).data;
          let sum = 0, n = 0;
          for (let i = 0; i < px.length; i += 4) if (px[i + 3] > 0) { sum += px[i]; n++; }
          return { kind: b.kind, weight: b.weight, sway: n ? Math.min(1, (sum / n / 255) * 2) : 0, sprite: { A: b.A, N: b.N, w: b.w, h: b.h } };
        });
        TUFT_KEPT.set(key, kept);
      }
      let upTo = 0;
      kinds.push(kept.map(b => {
        sprites.push(b.sprite);
        upTo += b.weight;
        const k = { frame: sprites.length - 1, upTo, sway: b.sway };
        if (b.kind === "rushes") rushes[kinds.length] = k;
        return k;
      }));
    }
    const anyRushes = rushes.find(r => r);
    for (let i = 0; i < LOOKS.length; i++) rushes[i] ??= anyRushes;
    yield "tuftAtlas";
    return { kinds, rushes, pixels: yield* packSteps(sprites, 512) };
  }

  /** The tufts drawn again (View.setGame: an island in another biome, art/flora/biomes.js): the new atlas in, the old freed. Call it
   *  with setMap, which empties every block, so nothing is drawn from the old frames. */
  setArt(made: TuftArt): void {
    const old = this.atlas;
    this.kinds = made.kinds; this.rushes = made.rushes;
    this.atlas = atlasFromPixels(made.pixels, "ground");
    const img = this.atlas.albedo.image as { width: number; height: number }; this.atlasW = img.width; this.atlasH = img.height;
    const u = this.mat.uniforms;
    setAtlasUniforms(u, this.atlas, "uTufts", "uTuftN"); (u.uTuftSize.value as THREE.Vector2).set(this.atlasW, this.atlasH);
    old.albedo.dispose(); old.normal.dispose();
  }

  /** Another night's map (View.setGame): its tufts worked out afresh, every block emptied and free, and the canopy's and
   *  clearings' uniforms its ground's. (The tufts' art, by area type, is the page's, drawn again only for another biome: setArt.) */
  setMap(map: ForestMap, forest: Forest | undefined, ground?: Record<string, THREE.IUniform>): void {
    this.map = map; this.forest = forest;
    this.cells.clear(); this.held.clear(); this.free = []; this.top = 0; this.lastCi = NaN; this.lastCj = NaN;
    for (const a of [this.tuft, this.uvA, this.pxA, this.open]) { (a.array as Float32Array).fill(0); a.clearUpdateRanges(); a.needsUpdate = true; }
    this.geo.instanceCount = 0;
    this.stats = { tufts: 0, buildMs: 0 };
    const u = this.mat.uniforms;
    u.uCanopy = ground?.uCanopy ?? { value: new THREE.Vector4() }; u.uClearing = ground?.uClearing ?? { value: new THREE.Vector2(1, 1) };
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
    const C = tuftSpan(G.cell, G.spacing), ci0 = Math.floor((x - G.radius) / C), ci1 = Math.floor((x + G.radius) / C), cj0 = Math.floor((z - G.radius) / C), cj1 = Math.floor((z + G.radius) / C);
    // Nothing to do while every cell in reach is made and she is in the same cell (most frames): no list, no sort.
    if (ci0 === this.lastCi && cj0 === this.lastCj) {
      let missing = false;
      for (let cj = cj0; cj <= cj1 && !missing; cj++) for (let ci = ci0; ci <= ci1; ci++)
        if (Math.hypot((ci + 0.5) * C - x, (cj + 0.5) * C - z) < G.radius + C && !this.cells.has(cellKey(ci, cj))) { missing = true; break; }
      if (!missing) { this.stats.buildMs = 0; return; }
    }
    const want: [number, number, number][] = [];
    for (let cj = cj0; cj <= cj1; cj++) for (let ci = ci0; ci <= ci1; ci++) {
      const d = Math.hypot((ci + 0.5) * C - x, (cj + 0.5) * C - z);
      if (d < G.radius + C) want.push([ci, cj, d]);
    }
    want.sort((a, b) => a[2] - b[2]);
    const t0 = performance.now();
    let built = false;
    for (const [ci, cj] of want) {
      const k = cellKey(ci, cj);
      if (this.cells.has(k)) continue;
      if (performance.now() - t0 > G.budgetMs) break;
      this.cells.set(k, tuftsInCell(this.map, ci, cj, G.cell, G.spacing, G.density, this.forest));
      built = true;
    }
    this.stats.buildMs = performance.now() - t0;
    if (!built && ci0 === this.lastCi && cj0 === this.lastCj) return;
    this.lastCi = ci0; this.lastCj = cj0;
    // Forget cells well out of reach.
    if (this.cells.size > want.length * 3) for (const k of this.cells.keys()) { const a = Math.floor(k / CELLS) - CELL0, b = (k % CELLS) - CELL0; if (Math.hypot((a + 0.5) * C - x, (b + 0.5) * C - z) > G.radius * 2 + C) this.cells.delete(k); }
    // Each cell's tufts keep their own blocks of the buffers while it's in reach (phase 2: the cover was rewritten and sent
    // whole, nearest first, every time she crossed a cell): a cell newly in reach is written into free blocks and only those
    // go to the GPU; one gone out of reach has its blocks emptied (size 0) and freed. Nearest cells first: when the buffers
    // are full, a nearer cell takes the farthest one's blocks. (The tufts are cut out, not blended: their order draws the same.)
    const dist = new Map<number, number>();
    for (const [ci, cj, d] of want) dist.set(cellKey(ci, cj), d);
    for (const k of [...this.held.keys()]) if (!dist.has(k)) this.release(k);
    for (const [ci, cj, d] of want) {
      const k = cellKey(ci, cj), list = this.cells.get(k);
      if (!list || this.held.has(k)) continue;
      const need = Math.max(1, Math.ceil(list.length / BLOCK));
      while (this.free.length + (this.maxBlocks - this.top) < need) { // full: the farthest held cell, if farther, gives way
        let far = -1, fd = d;
        for (const h of this.held.keys()) { const hd = dist.get(h) ?? Infinity; if (hd > fd) { fd = hd; far = h; } }
        if (far < 0) break;
        this.release(far);
      }
      if (this.free.length + (this.maxBlocks - this.top) < need) continue;
      const blocks: number[] = [];
      for (let i = 0; i < need; i++) blocks.push(this.free.length ? this.free.pop()! : this.top++);
      this.held.set(k, blocks);
      this.write(list, blocks);
    }
    this.geo.instanceCount = this.top * BLOCK;
    let n = 0;
    for (const k of this.held.keys()) n += this.cells.get(k)?.length ?? 0;
    this.stats.tufts = n;
  }

  /** A cell's tufts into its blocks (the rest of its last block emptied), those blocks marked to send. */
  private write(list: Tuft[], blocks: number[]): void {
    const T = this.tuft.array as Float32Array, U = this.uvA.array as Float32Array, P = this.pxA.array as Float32Array, O = this.open.array as Float32Array, F = this.atlas.frames;
    for (let b = 0; b < blocks.length; b++) {
      const at = blocks[b] * BLOCK;
      for (let i = 0; i < BLOCK; i++) {
        const n = at + i, f = list[b * BLOCK + i];
        // Which of its area's tufts, by their shares, seeded from where it stands. (Reeds ringing a pond: the area's rushes, or any area's.)
        const ks = f && this.kinds[f.type], roll = f ? hash2(Math.round(f.x * 64), Math.round(f.z * 64), 1107) * (ks[ks.length - 1]?.upTo ?? 1) : 0;
        const kd = f && ((TUFT_KINDS[f.kind] === "reeds" ? this.rushes[f.type] : undefined) ?? ks.find(k => roll <= k.upTo) ?? ks[ks.length - 1]);
        if (!f || !kd) { T[n * 4 + 2] = 0; continue; } // (an empty slot: no size, nothing drawn)
        const fr = F[kd.frame];
        T[n * 4] = f.x; T[n * 4 + 1] = f.z; T[n * 4 + 2] = f.size; T[n * 4 + 3] = f.flip ? 1 : 0;
        U[n * 4] = Math.round(fr.uv[0] * this.atlasW); U[n * 4 + 1] = Math.round(fr.uv[1] * this.atlasH); U[n * 4 + 2] = fr.w; U[n * 4 + 3] = fr.h; // (its frame in atlas pixels)
        P[n * 3] = fr.w; P[n * 3 + 1] = fr.h; P[n * 3 + 2] = kd.sway;
        O[n] = f.open;
      }
      for (const a of [this.tuft, this.uvA, this.pxA, this.open]) { a.addUpdateRange(at * a.itemSize, BLOCK * a.itemSize); a.needsUpdate = true; }
    }
  }

  /** A cell out of reach (or giving way): its blocks emptied, sent (sizes only) and freed. */
  private release(k: number): void {
    const blocks = this.held.get(k);
    if (!blocks) return;
    const T = this.tuft.array as Float32Array;
    for (const b of blocks) {
      for (let i = 0; i < BLOCK; i++) T[(b * BLOCK + i) * 4 + 2] = 0;
      this.tuft.addUpdateRange(b * BLOCK * 4, BLOCK * 4); this.tuft.needsUpdate = true;
      this.free.push(b);
    }
    this.held.delete(k);
  }
}
