// Biome lakes in play (Ed, 2026-10-23: "We should make the biome lakes in game"; docs/backlog/journey.md "Lakes by biome"): each
// lake on the island in the look the sea chart gives it (rules/lakeLooks.ts lakesOf: its island's biomes by its bearing, seeded by
// the lake), drawn by the ground shader (LAKE_LOOKS_GLSL) from the lakes' own map and a map of their looks (lakeLookTexture), all
// but the north's: a craggy glacier with ice peaks (Ed: "something that looks less walkable-on"), a mesh of its own (glacierMesh),
// and the hot springs' steam (steamVents, for render/smoke.ts). Looks only: every lake plays as water (rules/lakes.ts).
// `?lakelook=<look>` draws every lake in one look (the tools' shots: tools/lakes/looks.cjs).
import * as THREE from "three";
import { LOOK_IDS, lakesOf, mapBiome, zooLakeLook, type LakeLook } from "../rules/lakeLooks";
import type { ZooLayout } from "../rules/zooMap";
import type { LandMap } from "../rules/land";
import type { ForestMap } from "../rules/map";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

/** ?lakelook=: the look every lake takes (null: each its own). "glacier" is the north's ice. */
function forcedLook(): LakeLook | null {
  const v = typeof location === "undefined" ? null : new URLSearchParams(location.search).get("lakelook");
  const l = (v === "glacier" ? "ice" : v) as LakeLook | null;
  return l && LOOK_IDS.includes(l) ? l : null;
}
/** A valid forced look must retain the complete shader, including an explicitly forced water look. */
export const hasForcedLakeLook = (): boolean => forcedLook() !== null;

/** A map's lakes and their looks: `lake` each sample of the lakes' map's lake (-1 ashore), `looks` each lake's, and `near` each
 *  sample's look (LOOK_IDS: its lake's, or ashore the nearest lake's within RIM metres; 0 none). Made once a map. */
export interface LakeLooks { L: LandMap; lake: Int32Array; looks: LakeLook[]; near: Uint8Array; any: Set<LakeLook> }
/** How far onto the shore a lake's look reaches (m): its widest rim (LAKE_LOOKS_GLSL lakeRim) and a sample to spare. */
const RIM = 14;
const MADE = new WeakMap<ForestMap, LakeLooks | null>();
export function lakeLooksOf(map: ForestMap): LakeLooks | null {
  if (MADE.has(map)) return MADE.get(map)!;
  const L = map.bounds.lakes ?? null;
  let out: LakeLooks | null = null;
  if (L) {
    const island = map.island, made = lakesOf(L, island?.seed ?? 0, mapBiome(island, map.tuning)), force = forcedLook();
    let looks = force ? made.looks.map(() => force) : made.looks;
    // (the zoo, rules/zooMap.ts: each lake an undiscovered island, in that island's biome's look, Ed 2026-10-26)
    const Z = map.zoo?.layout;
    if (Z && !force) looks = zooLakeLooks(L, made.lake, made.looks.length, Z, map.tuning.map?.world ?? 0);
    const n = L.cols * L.rows, near = new Uint8Array(n), steps = new Uint8Array(n).fill(255), queue: number[] = [], reach = Math.ceil(RIM / L.step);
    for (let i = 0; i < n; i++) if (made.lake[i] >= 0) { near[i] = LOOK_IDS.indexOf(looks[made.lake[i]]); steps[i] = 0; queue.push(i); }
    // (ashore: the nearest lake's, by steps across the grid)
    for (let q = 0; q < queue.length; q++) {
      const i = queue[q], c = i % L.cols;
      if (steps[i] >= reach) continue;
      for (const j of [c > 0 ? i - 1 : -1, c < L.cols - 1 ? i + 1 : -1, i - L.cols, i + L.cols]) if (j >= 0 && j < n && steps[j] === 255) { steps[j] = steps[i] + 1; near[j] = near[i]; queue.push(j); }
    }
    out = { L, lake: made.lake, looks, near, any: new Set(looks) };
  }
  MADE.set(map, out);
  return out;
}

/** The looks' map for the ground shader: each sample's look (LOOK_IDS) in r, read whole (nearest), on the lakes' map's grid. */
export function lakeLookTexture(k: LakeLooks): THREE.DataTexture {
  const t = new THREE.DataTexture(k.near, k.L.cols, k.L.rows, THREE.RedFormat, THREE.UnsignedByteType);
  t.magFilter = t.minFilter = THREE.NearestFilter; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.unpackAlignment = 1; t.needsUpdate = true;
  return t;
}

/** The hot springs' steam (the rust pools': Ed, 2026-10-23, "more like Yellowstone hot springs"): a vent every SPACING metres
 *  over each one's deep water (x, z pairs), for the steam's puffs (render/smoke.ts, the tuning's lakes.steam). */
export function steamVents(k: LakeLooks, spacing = 28, inward = 9): Float32Array {
  const L = k.L, out: number[] = [], cell = Math.max(1, Math.round(spacing / L.step)), rust = new Set(k.looks.map((l, i) => (l === "rust" ? i : -1)).filter(i => i >= 0));
  if (!rust.size) return new Float32Array(0);
  for (let r = 0; r < L.rows; r += cell) for (let c = 0; c < L.cols; c += cell) {
    // (each block's deepest sample, if it's well into a hot spring)
    let best = -1, bd = inward;
    for (let rr = r; rr < Math.min(L.rows, r + cell); rr++) for (let cc = c; cc < Math.min(L.cols, c + cell); cc++) { const i = rr * L.cols + cc; if (rust.has(k.lake[i]) && L.dist[i] > bd) { bd = L.dist[i]; best = i; } }
    if (best >= 0) out.push(L.x0 + (best % L.cols) * L.step, L.z0 + Math.floor(best / L.cols) * L.step);
  }
  return new Float32Array(out);
}

/** GLSL (the ground's fragment shader, after hash, vnoise, the light and the lakes' uniforms): each look's shore (lakeShore,
 *  the area's floor turned to it) and water (lakeWater, the colour drawn). */
export const LAKE_LOOKS_GLSL = /* glsl */ `
uniform sampler2D uLakeLooks; // each sample's look (LOOK_IDS), on the lakes' map's grid (render/lakeLooks.ts lakeLookTexture)
// cells(q): the nearest and second-nearest of a jittered grid's points (distances), the nearest's id, and its bearing from q
#if defined(GROUND_LAKE_LAVA) || defined(GROUND_LAKE_OASIS) || defined(GROUND_LAKE_SINKHOLE) || defined(GROUND_LAKE_TARN) || defined(GROUND_LAKE_TAR) || defined(GROUND_LAKE_LILY)
vec4 cells(vec2 q) {
  vec2 i = floor(q), f = fract(q); float d1 = 9.0, d2 = 9.0, id = 0.0, an = 0.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y)), o = vec2(hash(i + g), hash(i + g + 17.31)), r = g + o - f; float d = dot(r, r);
    if (d < d1) { d2 = d1; d1 = d; id = hash(i + g + 3.7); an = atan(r.y, r.x); } else if (d < d2) d2 = d;
  }
  return vec4(sqrt(d1), sqrt(d2), id, an);
}
#endif
#if defined(GROUND_LAKE_SINKHOLE)
float lakeAt(vec2 q) { return texture2D(uLakes, (q - uLakeBox.xy + uLake.y) * uLakeBox.zw).r; }
#endif
float lakeLookAt(vec2 kuv) { return floor(texture2D(uLakeLooks, kuv).r * 255.0 + 0.5); }
// how far round its shore each look reaches (m)
float lakeRim(float L) { return L < 0.5 ? 2.6 : L < 1.5 ? 6.0 : L < 2.5 ? 7.0 : L < 3.5 ? 8.0 : L < 4.5 ? 5.0 : L < 5.5 ? 6.0 : L < 6.5 ? 5.0 : L < 7.5 ? 10.0 : 6.0; }
// the shore: the area's floor c turned to the look's, toward the water (k 0 at the rim's edge, 1 at the water)
vec3 lakeShore(float L, float ld, vec2 p, vec3 c) {
  float k = smoothstep(-lakeRim(L), 0.0, ld), n = vnoise(p / 1.3), n2 = vnoise(p / 4.0 + 7.0);
#ifdef GROUND_LAKE_ICE
  if (L < 1.5) return mix(c, vec3(0.74, 0.8, 0.86) * (0.9 + 0.15 * n), clamp(k * 1.3 - 0.3 + (n2 - 0.5) * 0.6, 0.0, 0.95)); // frost and old snow
#endif
#ifdef GROUND_LAKE_LAVA
  if (L < 2.5) { vec3 s = mix(vec3(0.09, 0.075, 0.07), vec3(0.17, 0.12, 0.1), n); if (n > 0.86 && k > 0.5) s = vec3(0.5, 0.12, 0.03); return mix(c, s, clamp(k * 1.4 - 0.1 + (n2 - 0.5) * 0.5, 0.0, 1.0)); } // scorched ground, embers
#endif
#ifdef GROUND_LAKE_OASIS
  if (L < 3.5) { vec3 s = mix(vec3(0.8, 0.7, 0.5), vec3(0.9, 0.8, 0.58), n); vec3 g = mix(vec3(0.2, 0.4, 0.14), vec3(0.3, 0.5, 0.18), n); float gr = smoothstep(0.45, 0.2, k) * step(0.45, n2); return mix(c, mix(s, g, gr), clamp(k * 1.6, 0.0, 1.0)); } // sand, a green fringe
#endif
#ifdef GROUND_LAKE_SINKHOLE
  if (L < 4.5) { vec3 s = mix(vec3(0.14, 0.26, 0.1), vec3(0.24, 0.34, 0.16), n); if (k > 0.82) s = mix(vec3(0.28, 0.27, 0.24), vec3(0.18, 0.18, 0.16), n); return mix(c, s, clamp(k * 1.5, 0.0, 1.0)); } // jungle up to a rock lip
#endif
#ifdef GROUND_LAKE_TARN
  if (L < 5.5) { vec4 v = cells(p / 0.7); vec3 s = mix(vec3(0.42, 0.44, 0.46), vec3(0.58, 0.6, 0.62), v.z) * (v.y - v.x < 0.08 ? 0.6 : 1.0); return mix(c, s, clamp(k * 1.5 + (n2 - 0.5) * 0.5, 0.0, 1.0)); } // grey scree
#endif
#ifdef GROUND_LAKE_TAR
  if (L < 6.5) { vec3 s = mix(vec3(0.05, 0.045, 0.04), vec3(0.12, 0.1, 0.08), n); if (fract(n * 13.0) < 0.06) s = vec3(0.3, 0.3, 0.32); return mix(c, s, clamp(k * 1.5 + (n2 - 0.5) * 0.6, 0.0, 1.0)); } // black, sticky, glossy specks
#endif
#ifdef GROUND_LAKE_RUST
  if (L < 7.5) { // a hot spring's travertine: pale terraces stepping down to it, orange-brown runoff streaking them (Mammoth Hot Springs)
    float st = fract(ld / 2.2 + (vnoise(p / 3.0) - 0.5) * 0.5); vec3 s = mix(vec3(0.84, 0.8, 0.72), vec3(0.94, 0.9, 0.82), n) * (st > 0.85 ? 1.12 : st < 0.2 ? 0.78 : 1.0);
    float run = vnoise(vec2(p.x * 0.9 + p.y * 0.3, ld * 0.35) + 3.0); if (run > 0.55) s = mix(s, mix(vec3(0.72, 0.4, 0.16), vec3(0.55, 0.3, 0.14), n), smoothstep(0.55, 0.75, run) * (0.4 + 0.6 * k));
    return mix(c, s, clamp(k * 1.3 + (n2 - 0.5) * 0.4, 0.0, 1.0)); }
#endif
#ifdef GROUND_LAKE_LILY
  vec3 s = mix(vec3(0.16, 0.3, 0.1), vec3(0.32, 0.42, 0.16), step(0.5, vnoise(vec2(p.x * 3.0, p.y * 0.4)))); return mix(c, s, clamp(k * 1.5, 0.0, 1.0)); // reeds
#else
  return c;
#endif
}
// the moon's glint and a star or two on a surface of reflection R (gloss: how sharp)
#if defined(GROUND_LAKE_OASIS) || defined(GROUND_LAKE_SINKHOLE) || defined(GROUND_LAKE_TARN) || defined(GROUND_LAKE_TAR) || defined(GROUND_LAKE_RUST) || defined(GROUND_LAKE_LILY)
vec3 lakeGlint(vec3 col, vec3 R, float gloss) {
  vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
  float spec = dot(R, moon);
  if (spec > 1.0 - 0.007 / gloss) return mix(col, uMoon + vec3(0.25), 0.8 * gloss);
  if (spec > 1.0 - 0.025 / gloss) return mix(col, uMoon * 0.7, 0.3 * gloss);
  vec2 sc = floor(R.xz / max(0.08, R.y) * 26.0);
  float hs = fract(sin(dot(sc, vec2(12.9898, 78.233))) * 43758.5453);
  if (hs > 1.0 - 0.003 * gloss) col += vec3(0.4, 0.44, 0.52) * gloss * (0.55 + 0.45 * sin(uTime * 2.3 + hs * 90.0));
  return col;
}
#endif
// the water: the colour drawn (lit, before the haze), and how much haze it takes
vec3 lakeWater(float L, float ld, vec2 p, vec2 px, vec3 c, vec3 lit, out float hz) {
  vec3 V = normalize(cameraPosition - vec3(p.x, vWorld.y, p.y));
  vec2 rip = vec2(vnoise(p * vec2(0.35, 1.2) + vec2(uTime * 0.3, 0.0)), vnoise(p * vec2(0.25, 0.9) + vec2(0.0, uTime * 0.22) + 19.0)) - 0.5;
  vec3 R = reflect(-V, normalize(vec3(rip.x * 0.03, 1.0, rip.y * 0.06)));
  float lum = dot(lit, vec3(0.33));
  hz = 0.6;
#ifdef GROUND_LAKE_ICE
  if (L < 1.5) { // the glacier's foot (the mesh stands on it): snow and blue ice, crevassed
    float n = vnoise(p / 2.5), cr = abs(vnoise(p / vec2(9.0, 3.0) + 5.0) - 0.5);
    vec3 a = mix(vec3(0.7, 0.8, 0.88), vec3(0.42, 0.62, 0.78), smoothstep(0.3, 0.7, n));
    if (cr < 0.035) a = vec3(0.12, 0.26, 0.42);
    return a * lit * 0.6;
  }
#endif
#ifdef GROUND_LAKE_LAVA
  if (L < 2.5) { // lava: a black crust broken into plates, molten in the cracks and along the shore, pulsing
    vec2 q = p / 5.5 + vec2(uTime * 0.025, uTime * 0.015);
    vec4 v = cells(q + (vec2(vnoise(p / 7.0), vnoise(p / 7.0 + 9.0)) - 0.5) * 0.6);
    float rg = smoothstep(0.25, 0.75, vnoise(p / 22.0 + 3.0)); // (where it's molten, where crusted over)
    float crack = (1.0 - smoothstep(0.015, 0.03 + 0.2 * rg, v.y - v.x)) * (0.35 + 0.65 * rg);
    float margin = 1.0 - smoothstep(0.0, 2.2 + 1.5 * vnoise(p / 5.0 + uTime * 0.05), ld);
    float hot = max(crack, margin) * (0.72 + 0.28 * sin(uTime * 1.4 + v.z * 40.0 + vnoise(p / 8.0) * 6.0));
    hot = max(hot, smoothstep(0.7, 0.95, vnoise(p / 3.0 + vec2(0.0, uTime * 0.1))) * rg); // (welling up through the plates)
    hot = floor(hot * 5.0 + 0.5) / 5.0;
    vec3 crust = mix(vec3(0.07, 0.05, 0.05), vec3(0.15, 0.09, 0.07), v.z * 0.6 + 0.4 * vnoise(p / 1.4)) * lit * 1.8 + vec3(0.06, 0.012, 0.0) * (1.0 - v.x);
    vec3 glow = hot < 0.3 ? vec3(0.45, 0.05, 0.02) : hot < 0.65 ? vec3(1.0, 0.32, 0.04) : hot < 0.9 ? vec3(1.15, 0.6, 0.12) : vec3(1.3, 1.05, 0.55);
    hz = 0.2;
    return mix(crust, glow, smoothstep(0.05, 0.3, hot));
  }
#endif
#ifdef GROUND_LAKE_OASIS
  if (L < 3.5) { // an oasis: clear, turquoise over sand in the shallows, deep blue in the middle, caustics on the sand
    float deep = smoothstep(0.0, 22.0, ld + (vnoise(p / 6.0 + 41.0) - 0.5) * 6.0);
    vec4 v = cells(p / 1.6 + vec2(uTime * 0.12, uTime * 0.07));
    vec3 sand = vec3(0.72, 0.62, 0.42) * lit * 1.4 + vec3(0.05, 0.1, 0.09) * smoothstep(0.12, 0.0, v.y - v.x);
    vec3 w = mix(vec3(0.12, 0.5, 0.46), vec3(0.05, 0.28, 0.36), deep) * (0.7 + lum * 0.9);
    vec3 col = mix(sand * vec3(0.6, 0.95, 0.9), w, 0.35 + 0.65 * deep);
    return lakeGlint(col, R, 1.0);
  }
#endif
#ifdef GROUND_LAKE_SINKHOLE
  if (L < 4.5) { // a sinkhole (a jungle tiankeng): sheer walls dropping to a dark pool far below, the far wall seen down the shaft
    const float D = 26.0;
    vec3 S = vec3(p.x, vWorld.y, p.y), dir = normalize(S - cameraPosition);
    float run = 1.0 / max(0.08, -dir.y), t0 = 0.0, hit = -1.0;
    for (int k = 1; k <= 10; k++) {
      float t = D * float(k) / 10.0;
      if (lakeAt(S.xz + dir.xz * t * run) < 0.4) { hit = t; break; }
      t0 = t;
    }
    if (hit > 0.0) for (int k = 0; k < 4; k++) { float m = 0.5 * (t0 + hit); if (lakeAt(S.xz + dir.xz * m * run) < 0.4) hit = m; else t0 = m; }
    float t = hit > 0.0 ? hit : D;
    vec2 q = S.xz + dir.xz * t * run;
    float dark = mix(1.0, 0.3, pow(t / D, 0.8)), mist = smoothstep(0.5, 1.0, t / D) * 0.22;
    vec3 col;
    if (hit > 0.0) {
      float band = floor((t + (vnoise(q * 0.4) - 0.5) * 2.0) / 2.4);
      vec3 rock = mix(vec3(0.34, 0.31, 0.27), vec3(0.22, 0.2, 0.18), fract(band * 0.618));
      float vine = smoothstep(D * 0.75, D * 0.1, t) * step(0.42, vnoise(vec2((q.x + q.y) * 0.9, t * 0.18)));
      col = mix(rock, vec3(0.12, 0.3, 0.1), vine) * (lit * 1.8 + 0.05) * dark;
      if (fract(t / 2.4 + vnoise(q * 0.4) * 0.83) < 0.08) col *= 0.6; // (the strata's ledges)
    } else {
      float inPool = smoothstep(18.0, 26.0, lakeAt(q) + (vnoise(q / 9.0) - 0.5) * 10.0);
      vec4 cv = cells(q / 3.5); vec3 floorc = mix(vec3(0.08, 0.2, 0.07), vec3(0.2, 0.36, 0.12), cv.z) * (cv.y - cv.x < 0.1 ? 0.6 : 1.0) * (lit * 1.8 + 0.06) * dark; // (the jungle on its floor: crowns from above)
      if (hash(floor(q / 1.2)) > 0.985) floorc += vec3(0.25, 0.9, 0.6) * (0.5 + 0.5 * sin(uTime * 1.7 + hash(floor(q / 1.2) + 3.0) * 30.0)); // (glow-worms down there)
      vec3 pool = lakeGlint(vec3(0.02, 0.06, 0.06), R, 0.6) * 0.8;
      col = mix(floorc, pool, inPool);
    }
    col = mix(col, vec3(0.34, 0.4, 0.42) * (0.4 + lum), mist); // (the mist that hangs in it)
    hz = 0.3;
    return col;
  }
#endif
#ifdef GROUND_LAKE_TARN
  if (L < 5.5) { // a glacial tarn: milky turquoise meltwater crowded with ice (Ed, 2026-10-23: "bigger and more ice chunks"), thickest at its edge
    float deep = smoothstep(0.0, 10.0, ld), edge = 1.0 - smoothstep(2.0, 30.0, ld);
    vec3 col = mix(vec3(0.24, 0.5, 0.5), vec3(0.13, 0.34, 0.38), deep) * (0.6 + lum * 0.9);
    col = lakeGlint(col, R, 0.5);
    vec4 v = cells(p / 4.5 + vec2(uTime * 0.012, uTime * 0.004));
    float d = v.x * (1.0 + 0.07 * sin(v.w * 3.0 + v.z * 20.0)); // (lumpy, not round)
    float r = (0.2 + 0.22 * edge + 0.12 * fract(v.z * 5.0)) * step(0.2 - 0.12 * edge, v.z);
    if (r > 0.0 && d < r) col = mix(vec3(0.62, 0.72, 0.8), vec3(0.82, 0.9, 0.95), step(0.55, fract(v.w * 0.5 + 0.3))) * lit * 1.15 * (d > r - 0.04 ? 0.85 : 1.0);
    else if (r > 0.0 && d < r + 0.09) col = mix(col, vec3(0.42, 0.66, 0.68) * (0.6 + lum), 0.6); // (its foot under the water, pale)
    else if (r > 0.0 && d < r + 0.12) col *= 0.6;
    return col;
  }
#endif
#ifdef GROUND_LAKE_TAR
  if (L < 6.5) { // a tar pit: glossy black, slow bubbles, oil-slick rainbows
    vec3 col = vec3(0.02, 0.018, 0.022);
    float n = vnoise(p / 7.0 + uTime * 0.01), band = abs(fract(n * 3.0 + vnoise(p / 2.0) * 0.3) - 0.5);
    if (band < 0.07) col += hsv(fract(n * 4.0 + p.x * 0.01), 0.75, 0.22) * (1.0 - band / 0.07);
    vec4 v = cells(p / 4.0);
    float ph = fract(uTime * 0.12 + v.z * 7.0), r = 0.08 + ph * 0.32;
    if (v.z > 0.4 && ph < 0.75 && abs(v.x - r) < 0.035) col += vec3(0.14, 0.13, 0.12) * (1.0 - ph); // (a bubble's ring spreading)
    if (v.z > 0.4 && ph < 0.2 && v.x < 0.1) col = vec3(0.16, 0.15, 0.15); // (and its dome)
    return lakeGlint(col, R, 1.6);
  }
#endif
#ifdef GROUND_LAKE_RUST
  if (L < 7.5) { // a hot spring (Ed, 2026-10-23: "more like Yellowstone hot springs"; Grand Prismatic): a deep blue eye ringed by
    // pale green, yellow, orange and rust mats out to its shore, rings wobbling, mottled; steam drifting over the hot middle
    float lv = ld + (vnoise(p / 6.0) - 0.5) * 2.5, mot = 0.9 + 0.2 * vnoise(p / 1.4);
    vec3 col = lv < 2.0 ? vec3(0.46, 0.2, 0.1) : lv < 4.5 ? vec3(0.74, 0.36, 0.1) : lv < 7.0 ? vec3(0.86, 0.6, 0.14) : lv < 9.5 ? vec3(0.84, 0.78, 0.3) : lv < 11.5 ? vec3(0.46, 0.64, 0.44) : mix(vec3(0.16, 0.52, 0.62), vec3(0.05, 0.2, 0.46), smoothstep(12.0, 26.0, lv));
    col *= mot * (0.5 + lum * 0.9);
    if (fract(lv / 2.5) < 0.1 && lv < 11.5) col *= 0.82; // (the mats' fine rings)
    col = lakeGlint(col, R, 0.8);
    float wisp = smoothstep(0.42, 0.75, vnoise(p / 9.0 + uTime * vec2(0.09, 0.05)) * vnoise(p / 3.5 - uTime * vec2(0.12, 0.03)) * 1.6) * smoothstep(5.0, 16.0, lv);
    col = mix(col, vec3(0.62, 0.66, 0.7) * (0.45 + lum), wisp * 0.45);
    return col;
  }
#endif
#ifdef GROUND_LAKE_LILY
  // a lily pond: dark water under giant lily pads, a few flowers
  vec3 col = lakeGlint(vec3(0.03, 0.07, 0.05) * (0.6 + lum), R, 0.8);
  vec4 v = cells(p / 5.0);
  float r = 0.26 + 0.14 * fract(v.z * 7.0), a = mod(v.w - v.z * 6.283 + 3.1416, 6.283) - 3.1416;
  if (v.z > 0.4 && ld > 0.6 && v.x < r && abs(a) > 0.28) {
    vec3 pad = mix(vec3(0.16, 0.36, 0.12), vec3(0.24, 0.46, 0.16), step(0.5, v.z));
    if (v.x > r - 0.05) pad *= 1.25;
    if (fract((v.w + 3.1416) * 8.0 / 6.283) < 0.12) pad *= 0.8;
    col = pad * lit * 1.6;
    if (v.z > 0.8 && v.x < 0.08) col = v.x < 0.04 ? vec3(1.0, 0.85, 0.35) : vec3(0.98, 0.6, 0.78) * (0.7 + lum); // (a flower, faintly bright)
  } else if (v.z > 0.4 && v.x < r + 0.04 && v.x >= r) col *= 0.6;
  return col;
#else
  return c;
#endif
}
`;

// A glacier on a lake's water (the north's: Ed, 2026-10-23, "a craggy glacier with ice peaks"): a faceted mesh rising from the
// shore into ridged, jagged peaks, its height above the ground (the lake's level), lifted and bent as the world is.
const GLACIER_VERT = /* glsl */ `
varying vec3 vWorld;
varying float vUp;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = onGround((modelMatrix * vec4(position, 1.0)).xyz);
  vWorld = w; vUp = position.y;
  gl_Position = clipOf(w);
}`;
const GLACIER_FRAG = /* glsl */ `
varying vec3 vWorld;
varying float vUp;
uniform float uPix;
${LIGHT_GLSL}
float h1(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
void main() {
  vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  if (N.y < 0.0) N = -N;
  vec2 px = floor(vWorld.xz / uPix);
  float steep = 1.0 - N.y;
  vec3 a = mix(vec3(0.86, 0.92, 0.97), vec3(0.5, 0.72, 0.86), smoothstep(0.25, 0.55, steep));
  a = mix(a, vec3(0.2, 0.4, 0.62), smoothstep(0.6, 0.85, steep) * (1.0 - smoothstep(6.0, 14.0, vUp)));
  if (fract(vUp / 3.0 + h1(floor(vWorld.xz / 6.0)) * 0.3) < 0.07 && steep > 0.4) a *= 0.82; // (layered ice in the faces)
  vec3 l = nightLightShaded(N, vWorld, 1.0);
  float lit = clamp(dot(N, normalize(vec3(uMoonDir.x, max(0.3, uMoonDir.y), uMoonDir.z))), 0.0, 1.0);
  vec3 col = a * l * (0.48 + 0.75 * floor(lit * 3.0 + 0.5) / 3.0); // (the moonlit faces bright, the rest in blue shade: three steps)
  col = floor(col * 16.0 + 0.5) / 16.0; // (in steps, as the art is)
  if (N.y > 0.7 && h1(px + floor(uTime * 2.0)) > 0.992) col += vec3(0.35, 0.4, 0.45); // (a glint on the snow)
  gl_FragColor = vec4(haze(col, vWorld), 1.0);
}`;

function vnoise(x: number, z: number, seed: number): number {
  const h = (i: number, j: number) => { let v = Math.imul(i ^ seed, 0x27d4eb2d) ^ Math.imul(j + 0x165667b1, 0x85ebca6b); v ^= v >>> 15; v = Math.imul(v, 0x2c1b3c6d); v ^= v >>> 12; return (v >>> 0) / 4294967296; };
  const i = Math.floor(x), j = Math.floor(z), fx = x - i, fz = z - j, ux = fx * fx * (3 - 2 * fx), uz = fz * fz * (3 - 2 * fz);
  const a = h(i, j), b = h(i + 1, j), c = h(i, j + 1), d = h(i + 1, j + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

/** How high the glacier stands (m above the lake's level) at (x, z), `d` metres in from its shore: rising from the shore into
 *  ridges, crags and a few high peaks (Ed, 2026-10-23: "as shown", about the treetops), eased under `cap` (her treetop flight
 *  over a lake: #1016, she can't come down there, so she never goes through the ice). */
export function glacierHeight(x: number, z: number, d: number, seed: number, peak = 20, cap = 20): number {
  if (d <= 0) return 0;
  const ridged = (s: number, k: number) => { const n = 1 - Math.abs(2 * vnoise(x / s, z / s, seed + k) - 1); return n * n; };
  const r = ridged(42, 1) * 0.62 + ridged(15, 2) * 0.28 + ridged(5, 3) * 0.1;
  const rise = Math.min(1, d / 14) ** 0.8;
  const h = rise * (1.5 + 3.5 * ridged(4, 4) + peak * Math.pow(Math.max(0, r - 0.25) / 0.75, 2.2)); // (broken seracs between the peaks: nowhere flat to stand)
  const knee = cap * 0.75;
  return h <= knee ? h : knee + (cap - knee) * (1 - Math.exp(-(h - knee) / (cap - knee)));
}

/** The glacier over every north lake (null with none): non-indexed (each face its own, so it draws faceted), its peaks under
 *  `cap` metres. */
export function glacierMesh(k: LakeLooks, seed: number, mpp: number, cap: number, peak = 20): THREE.Mesh | null {
  const L = k.L, ice = k.looks.map(l => l === "ice");
  if (!ice.some(Boolean)) return null;
  // (the box round the ice lakes alone)
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < k.lake.length; i++) if (k.lake[i] >= 0 && ice[k.lake[i]]) { const x = L.x0 + (i % L.cols) * L.step, z = L.z0 + Math.floor(i / L.cols) * L.step; minX = Math.min(minX, x); maxX = Math.max(maxX, x); minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); }
  const iceAt = (x: number, z: number) => { const c = Math.round((x - L.x0) / L.step), r = Math.round((z - L.z0) / L.step); if (c < 0 || r < 0 || c >= L.cols || r >= L.rows) return false; const i = r * L.cols + c, j = k.lake[i]; return j >= 0 ? ice[j] : LOOK_IDS[k.near[i]] === "ice"; };
  const cell = 2.5, pad = L.step * 2, cols = Math.ceil((maxX - minX + pad * 2) / cell) + 2, rows = Math.ceil((maxZ - minZ + pad * 2) / cell) + 2;
  const x0 = minX - pad, z0 = minZ - pad;
  const H = new Float32Array(cols * rows), D = new Float32Array(cols * rows), I = new Uint8Array(cols * rows);
  const jit = (c: number, r: number) => [(vnoise(c * 7.3, r * 3.1, seed + 9) - 0.5) * cell * 0.7, (vnoise(c * 2.9, r * 6.7, seed + 11) - 0.5) * cell * 0.7]; // (a jittered grid, so the facets aren't in rows)
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const [jx, jz] = jit(c, r), x = x0 + c * cell + jx, z = z0 + r * cell + jz, i = r * cols + c, rough = L.roughDistAt(x, z);
    const d = rough < -2 * L.step - 8 ? rough : L.distAt(x, z); // (well ashore: the rough distance will do)
    D[i] = d; I[i] = iceAt(x, z) ? 1 : 0; H[i] = I[i] ? glacierHeight(x, z, d, seed, peak, cap) : 0;
  }
  const pos: number[] = [];
  const at = (c: number, r: number) => { const [jx, jz] = jit(c, r); return [x0 + c * cell + jx, H[r * cols + c], z0 + r * cell + jz]; };
  for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
    const i = r * cols + c;
    if (Math.max(D[i], D[i + 1], D[i + cols], D[i + cols + 1]) < -0.5 || !(I[i] || I[i + 1] || I[i + cols] || I[i + cols + 1])) continue; // (ashore, or another lake)
    const a = at(c, r), b = at(c + 1, r), e = at(c, r + 1), f = at(c + 1, r + 1);
    pos.push(...a, ...e, ...b, ...b, ...e, ...f);
  }
  if (!pos.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  const mat = new THREE.ShaderMaterial({ vertexShader: GLACIER_VERT, fragmentShader: GLACIER_FRAG, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uPix: { value: mpp } } });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.name = "glacier";
  return mesh;
}

/** The zoo's lakes' looks (rules/zooMap.ts): each lake (by its samples' middle) its nearest island's biome lake. */
function zooLakeLooks(L: LandMap, lake: Int32Array, count: number, Z: ZooLayout, world: number): LakeLook[] {
  const sx = new Float64Array(count), sz = new Float64Array(count), sn = new Float64Array(count);
  for (let i = 0; i < lake.length; i++) { const k = lake[i]; if (k < 0) continue; sx[k] += L.x0 + (i % L.cols) * L.step; sz[k] += L.z0 + Math.floor(i / L.cols) * L.step; sn[k]++; }
  const out: LakeLook[] = [];
  for (let k = 0; k < count; k++) {
    const x = sx[k] / Math.max(1, sn[k]), z = sz[k] / Math.max(1, sn[k]);
    let best = Z.islands[0], bd = Infinity;
    for (const I of Z.islands) { const d = (I.x - x) ** 2 + (I.z - z) ** 2; if (d < bd) { bd = d; best = I; } }
    out.push(best ? zooLakeLook(best.kind, world) : "water");
  }
  return out;
}
