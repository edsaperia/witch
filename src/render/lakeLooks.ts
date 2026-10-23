// Biome lakes in play (MOCK, Ed 2026-10-23: "We should make the biome lakes in game"; docs/backlog/journey.md "Lakes by biome"):
// `?lakelook=<look>` draws every lake on the island in one look, so each can be judged in the game's own view. The looks are
// the sea chart's (app/chartOutlines.worker.ts LOOK_IDS), drawn by the ground shader (LAKE_LOOKS_GLSL) on the lakes' own map,
// all but the north's: a craggy glacier with ice peaks (Ed: "something that looks less walkable-on"), a mesh of its own
// (glacierMesh). Looks only: the rules' lakes are unchanged.
import * as THREE from "three";
import type { Bounds } from "../rules/mapShape";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

/** The looks by number, as the chart's (LOOK_IDS), the north's ice the glacier. */
export const MOCK_LOOKS = ["water", "glacier", "lava", "oasis", "sinkhole", "tarn", "tar", "rust", "lily"] as const;

/** ?lakelook=: the look every lake takes (0, plain water, without it). */
export function mockLakeLook(): number {
  const v = typeof location === "undefined" ? null : new URLSearchParams(location.search).get("lakelook");
  const i = v ? MOCK_LOOKS.indexOf(v as (typeof MOCK_LOOKS)[number]) : -1;
  return Math.max(0, i);
}

/** GLSL (the ground's fragment shader, after hash, vnoise, the light and the lakes' uniforms): each look's shore (lakeShore,
 *  the area's floor turned to it) and water (lakeWater, the colour drawn). */
export const LAKE_LOOKS_GLSL = /* glsl */ `
uniform float uLakeLook;
// cells(q): the nearest and second-nearest of a jittered grid's points (distances), the nearest's id, and its bearing from q
vec4 cells(vec2 q) {
  vec2 i = floor(q), f = fract(q); float d1 = 9.0, d2 = 9.0, id = 0.0, an = 0.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y)), o = vec2(hash(i + g), hash(i + g + 17.31)), r = g + o - f; float d = dot(r, r);
    if (d < d1) { d2 = d1; d1 = d; id = hash(i + g + 3.7); an = atan(r.y, r.x); } else if (d < d2) d2 = d;
  }
  return vec4(sqrt(d1), sqrt(d2), id, an);
}
float lakeAt(vec2 q) { return texture2D(uLakes, (q - uLakeBox.xy + uLake.y) * uLakeBox.zw).r; }
// how far round its shore each look reaches (m)
float lakeRim(float L) { return L < 0.5 ? 2.6 : L < 1.5 ? 6.0 : L < 2.5 ? 7.0 : L < 3.5 ? 8.0 : L < 4.5 ? 5.0 : L < 5.5 ? 6.0 : L < 6.5 ? 5.0 : L < 7.5 ? 10.0 : 6.0; }
// the shore: the area's floor c turned to the look's, toward the water (k 0 at the rim's edge, 1 at the water)
vec3 lakeShore(float L, float ld, vec2 p, vec3 c) {
  float k = smoothstep(-lakeRim(L), 0.0, ld), n = vnoise(p / 1.3), n2 = vnoise(p / 4.0 + 7.0);
  if (L < 1.5) return mix(c, vec3(0.74, 0.8, 0.86) * (0.9 + 0.15 * n), clamp(k * 1.3 - 0.3 + (n2 - 0.5) * 0.6, 0.0, 0.95)); // frost and old snow
  if (L < 2.5) { vec3 s = mix(vec3(0.09, 0.075, 0.07), vec3(0.17, 0.12, 0.1), n); if (n > 0.86 && k > 0.5) s = vec3(0.5, 0.12, 0.03); return mix(c, s, clamp(k * 1.4 - 0.1 + (n2 - 0.5) * 0.5, 0.0, 1.0)); } // scorched ground, embers
  if (L < 3.5) { vec3 s = mix(vec3(0.8, 0.7, 0.5), vec3(0.9, 0.8, 0.58), n); vec3 g = mix(vec3(0.2, 0.4, 0.14), vec3(0.3, 0.5, 0.18), n); float gr = smoothstep(0.45, 0.2, k) * step(0.45, n2); return mix(c, mix(s, g, gr), clamp(k * 1.6, 0.0, 1.0)); } // sand, a green fringe
  if (L < 4.5) { vec3 s = mix(vec3(0.14, 0.26, 0.1), vec3(0.24, 0.34, 0.16), n); if (k > 0.82) s = mix(vec3(0.28, 0.27, 0.24), vec3(0.18, 0.18, 0.16), n); return mix(c, s, clamp(k * 1.5, 0.0, 1.0)); } // jungle up to a rock lip
  if (L < 5.5) { vec4 v = cells(p / 0.7); vec3 s = mix(vec3(0.42, 0.44, 0.46), vec3(0.58, 0.6, 0.62), v.z) * (v.y - v.x < 0.08 ? 0.6 : 1.0); return mix(c, s, clamp(k * 1.5 + (n2 - 0.5) * 0.5, 0.0, 1.0)); } // grey scree
  if (L < 6.5) { vec3 s = mix(vec3(0.05, 0.045, 0.04), vec3(0.12, 0.1, 0.08), n); if (fract(n * 13.0) < 0.06) s = vec3(0.3, 0.3, 0.32); return mix(c, s, clamp(k * 1.5 + (n2 - 0.5) * 0.6, 0.0, 1.0)); } // black, sticky, glossy specks
  if (L < 7.5) { vec3 s = mix(vec3(0.86, 0.82, 0.74), vec3(0.94, 0.9, 0.84), n); float st = vnoise(vec2(p.x * 1.6, ld * 0.25) + 3.0); if (st > 0.62) s = mix(s, vec3(0.72, 0.38, 0.16), smoothstep(0.62, 0.8, st) * k); return mix(c, s, clamp(k * 1.3 + (n2 - 0.5) * 0.4, 0.0, 1.0)); } // pale crust, rust streaks
  vec3 s = mix(vec3(0.16, 0.3, 0.1), vec3(0.32, 0.42, 0.16), step(0.5, vnoise(vec2(p.x * 3.0, p.y * 0.4)))); return mix(c, s, clamp(k * 1.5, 0.0, 1.0)); // reeds
}
// the moon's glint and a star or two on a surface of reflection R (gloss: how sharp)
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
// the water: the colour drawn (lit, before the haze), and how much haze it takes
vec3 lakeWater(float L, float ld, vec2 p, vec2 px, vec3 c, vec3 lit, out float hz) {
  vec3 V = normalize(cameraPosition - vec3(p.x, vWorld.y, p.y));
  vec2 rip = vec2(vnoise(p * vec2(0.35, 1.2) + vec2(uTime * 0.3, 0.0)), vnoise(p * vec2(0.25, 0.9) + vec2(0.0, uTime * 0.22) + 19.0)) - 0.5;
  vec3 R = reflect(-V, normalize(vec3(rip.x * 0.03, 1.0, rip.y * 0.06)));
  float lum = dot(lit, vec3(0.33));
  hz = 0.6;
  if (L < 1.5) { // the glacier's foot (the mesh stands on it): snow and blue ice, crevassed
    float n = vnoise(p / 2.5), cr = abs(vnoise(p / vec2(9.0, 3.0) + 5.0) - 0.5);
    vec3 a = mix(vec3(0.7, 0.8, 0.88), vec3(0.42, 0.62, 0.78), smoothstep(0.3, 0.7, n));
    if (cr < 0.035) a = vec3(0.12, 0.26, 0.42);
    return a * lit * 0.6;
  }
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
  if (L < 3.5) { // an oasis: clear, turquoise over sand in the shallows, deep blue in the middle, caustics on the sand
    float deep = smoothstep(0.0, 22.0, ld + (vnoise(p / 6.0 + 41.0) - 0.5) * 6.0);
    vec4 v = cells(p / 1.6 + vec2(uTime * 0.12, uTime * 0.07));
    vec3 sand = vec3(0.72, 0.62, 0.42) * lit * 1.4 + vec3(0.05, 0.1, 0.09) * smoothstep(0.12, 0.0, v.y - v.x);
    vec3 w = mix(vec3(0.12, 0.5, 0.46), vec3(0.05, 0.28, 0.36), deep) * (0.7 + lum * 0.9);
    vec3 col = mix(sand * vec3(0.6, 0.95, 0.9), w, 0.35 + 0.65 * deep);
    return lakeGlint(col, R, 1.0);
  }
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
      col = mix(rock, vec3(0.12, 0.3, 0.1), vine) * lit * 1.5 * dark;
      if (fract(t / 2.4 + vnoise(q * 0.4) * 0.83) < 0.08) col *= 0.6; // (the strata's ledges)
    } else {
      float inPool = smoothstep(18.0, 26.0, lakeAt(q) + (vnoise(q / 9.0) - 0.5) * 10.0);
      vec4 cv = cells(q / 3.5); vec3 floorc = mix(vec3(0.08, 0.2, 0.07), vec3(0.2, 0.36, 0.12), cv.z) * (cv.y - cv.x < 0.1 ? 0.6 : 1.0) * lit * 1.6 * dark; // (the jungle on its floor: crowns from above)
      vec3 pool = lakeGlint(vec3(0.02, 0.06, 0.06), R, 0.6) * 0.8;
      col = mix(floorc, pool, inPool);
    }
    col = mix(col, vec3(0.34, 0.4, 0.42) * (0.4 + lum), mist); // (the mist that hangs in it)
    hz = 0.3;
    return col;
  }
  if (L < 5.5) { // a glacial tarn: milky turquoise meltwater, ice chunks floating at its edge
    float deep = smoothstep(0.0, 10.0, ld);
    vec3 col = mix(vec3(0.24, 0.5, 0.5), vec3(0.13, 0.34, 0.38), deep) * (0.6 + lum * 0.9);
    col = lakeGlint(col, R, 0.5);
    vec4 v = cells(p / 2.3 + vec2(uTime * 0.01, 0.0));
    float r = 0.42 * (1.0 - smoothstep(1.0, 9.0, ld)) * step(0.3, v.z);
    if (v.x < r) col = mix(vec3(0.62, 0.72, 0.8), vec3(0.8, 0.88, 0.94), step(0.6, fract(v.w * 0.5 + 0.3))) * lit * 1.15;
    else if (v.x < r + 0.07 && r > 0.0) col *= 0.55; // (its shadow in the water)
    return col;
  }
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
  if (L < 7.5) { // a rust pool: red-orange mineral water in terraces of pale crust stepping down to it
    float lv = ld + (vnoise(p / 4.0) - 0.5) * 1.4, tier = floor(lv / 2.6), f = fract(lv / 2.6);
    vec3 col = mix(vec3(0.68, 0.34, 0.12), vec3(0.42, 0.12, 0.05), clamp(tier / 4.0, 0.0, 1.0)) * (0.6 + lum * 0.9);
    if (f < 0.16 && tier < 4.0) col = mix(vec3(0.82, 0.76, 0.66), vec3(0.92, 0.86, 0.76), vnoise(p * 2.0)) * lit * 1.6; // (each terrace's rim)
    else if (f < 0.26 && tier < 4.0) col *= 0.75;
    return lakeGlint(col, R, 0.7);
  }
  // a lily pond: dark water under giant lily pads, a few flowers
  vec3 col = lakeGlint(vec3(0.03, 0.07, 0.05) * (0.6 + lum), R, 0.8);
  vec4 v = cells(p / 2.6);
  float r = 0.26 + 0.14 * fract(v.z * 7.0), a = mod(v.w - v.z * 6.283 + 3.1416, 6.283) - 3.1416;
  if (v.z > 0.22 && ld > 0.6 && v.x < r && abs(a) > 0.28) {
    vec3 pad = mix(vec3(0.16, 0.36, 0.12), vec3(0.24, 0.46, 0.16), step(0.5, v.z));
    if (v.x > r - 0.05) pad *= 1.25;
    if (fract((v.w + 3.1416) * 8.0 / 6.283) < 0.12) pad *= 0.8;
    col = pad * lit * 1.6;
    if (v.z > 0.82 && v.x < 0.1) col = v.x < 0.04 ? vec3(1.0, 0.85, 0.35) : vec3(0.98, 0.6, 0.78) * (0.7 + lum); // (a flower, faintly bright)
  } else if (v.z > 0.22 && v.x < r + 0.05 && v.x >= r) col *= 0.6;
  return col;
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
 *  ridges, crags and a few high peaks. */
export function glacierHeight(x: number, z: number, d: number, seed: number, peak = 20): number {
  if (d <= 0) return 0;
  const ridged = (s: number, k: number) => { const n = 1 - Math.abs(2 * vnoise(x / s, z / s, seed + k) - 1); return n * n; };
  const r = ridged(42, 1) * 0.62 + ridged(15, 2) * 0.28 + ridged(5, 3) * 0.1;
  const rise = Math.min(1, d / 14) ** 0.8;
  return rise * (1.5 + 3.5 * ridged(4, 4) + peak * Math.pow(Math.max(0, r - 0.25) / 0.75, 2.2)); // (broken seracs between the peaks: nowhere flat to stand)
}

/** The glacier over every lake (null with none): non-indexed (each face its own, so it draws faceted). */
export function glacierMesh(bounds: Bounds, seed: number, mpp: number, peak = 20): THREE.Mesh | null {
  const L = bounds.lakes;
  if (!L) return null;
  const B = L.box, cell = 2.5, cols = Math.ceil((B.maxX - B.minX) / cell) + 3, rows = Math.ceil((B.maxZ - B.minZ) / cell) + 3;
  const x0 = B.minX - cell, z0 = B.minZ - cell;
  const H = new Float32Array(cols * rows), D = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    // (a jittered grid, so the facets aren't in rows)
    const jx = (vnoise(c * 7.3, r * 3.1, seed + 9) - 0.5) * cell * 0.7, jz = (vnoise(c * 2.9, r * 6.7, seed + 11) - 0.5) * cell * 0.7;
    const x = x0 + c * cell + jx, z = z0 + r * cell + jz, i = r * cols + c, rough = L.roughDistAt(x, z);
    const d = rough < -2 * L.step - 8 ? rough : L.distAt(x, z); // (well ashore: the rough distance will do)
    D[i] = d; H[i] = glacierHeight(x, z, d, seed, peak);
  }
  const pos: number[] = [];
  const at = (c: number, r: number) => {
    const jx = (vnoise(c * 7.3, r * 3.1, seed + 9) - 0.5) * cell * 0.7, jz = (vnoise(c * 2.9, r * 6.7, seed + 11) - 0.5) * cell * 0.7;
    return [x0 + c * cell + jx, H[r * cols + c], z0 + r * cell + jz];
  };
  for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
    const i = r * cols + c;
    if (Math.max(D[i], D[i + 1], D[i + cols], D[i + cols + 1]) < -0.5) continue; // (ashore)
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
