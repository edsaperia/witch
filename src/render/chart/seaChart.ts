// The sea chart in 3D (Ed, 2026-10-11: "Can you show the map screen in the same way you show the island: pixellated, camera
// seeing it in 3D, your view moves around as you select islands?"). The world is a disc of night sea, home in the middle and
// every island round it where the flat chart had it (app/chartLayout.ts islandAt), each a low landmass raised from its own
// coast (rules/islandShape.ts islandCoast through art/islands.js islandPoints, the one call the flat chart used, so a new land
// map swaps in). Drawn as the game is: at the low resolution of tuning.pixelSize, scaled up with whole pixels, through the
// game's own post pass (render/post.ts: bloom, the tilt-shift, the night grade); the camera tilted down looking north, as in
// the game, never turning, only gliding to the island chosen.
//   Islands she can sail to carry their sigil glowing on the land, as a placed sigil does on the ground; the rest are bare,
// dimmer land (the '?' placeholders dimmest); won ones ringed in gold on the water; her voyages run between them on the water
// as glowing lines with a current flowing along, as a ley line does. The view only: what's found, won and sailable comes from
// the page (app/chartPage.ts, from app/chartSave.ts).
import { edgeBand, moonAt, moonKnobs, type ChartKnobs } from "./moon";
import * as THREE from "three";
import { islandPoints } from "../../../art/islands.js";
import { sigilColour } from "../../../art/sigils.js";
import { sigilDetail } from "../../../art/sigilDetail.js";
import { Post, type PostTuning } from "../post";
import { CHART_SCALE, K, SIGIL_TIERS } from "./chartScale";
import { buildIslandMesh, RELIEF, type IslandMesh } from "./islandMesh";
export { CHART_SCALE };
/** Till an island's land comes, about how far it reaches (units) by its phase: its round coast drawn that big. */
const REACH = [8, 5.5, 8, 11, 13, 15];
const reachOf = (d: { id: string; phase: number }) => (d.id === "home" ? REACH[0] : REACH[Math.max(1, Math.min(5, d.phase))]);
/** A typical island's reach (units), for the zoom's limits. */
const TYPICAL_REACH = 11;
/** The camera's nearest (units): one island filling the screen and more (Ed, 2026-10-12: "the islands should be larger at full
 *  zoom"), its fine grid made for it (app/chartOutlines.worker.ts `detail`). */
const CLOSEST = TYPICAL_REACH * 2.3;

// The moon (Ed, 2026-10-12: "islands casting shadows from the moon orbiting the map screen"; #746: "have the moon rise over the
// North West edge of the map as you open the map screen"): as the chart opens the moon rises over its north-west edge, then goes
// slowly round it, low, and every island's real relief throws its shadow across the sea, away from it, and into its own valleys;
// the hills' shading follows it. Its knobs are the tuning's chart.moon (moonKnobs). The open sea looks back toward the moon through
// a height map of the whole chart, drawn top down once (and again when an island's land changes); each island's own ground,
// shallows and lakes through a tile of its own heights, as fine as its heightfield, so the shadows hold up close in.
const HMAP = 2048; // (the whole chart's height map, a side)
// How lit a point is by the moon (1 open, down to 1 - uShadow behind a hill): the heights between it and the moon, looked along
// toward it in `taps` steps (20 on an island, 16 on the open sea), closer together near; tanK scales the moon's slope (an island's tile is in its own, maybe squashed, heights).
const march = (name: string, h: string, taps: number) => /* glsl */ `
float ${name}(vec3 w, float tanK) {
  if (uShadow <= 0.0) return 1.0;
  float fl = max(length(uMoonV.xz), 1e-4); vec2 d = uMoonV.xz / fl; float tanE = uMoonV.y / fl * tanK;
  float reach = min(80.0, uTop / max(tanE, 0.05)), occ = 0.0;
  for (int i = 1; i <= ${taps}; i++) {
    float u = float(i) / ${taps}.0, t = reach * u * u + 0.06;
    float above = ${h}(w.xz + d * t) - (w.y + t * tanE) - 0.03;
    occ = max(occ, smoothstep(0.0, 0.05 + 0.05 * t, above));
  }
  return 1.0 - uShadow * occ;
}`;
/** The whole chart's: in world units, through its height map. */
const SHADOW_MAP = /* glsl */ `
uniform sampler2D uHMap; uniform float uHR, uHMax, uShadow; uniform vec3 uMoonV;
#define uTop uHMax
float hAtMap(vec2 p) { return texture2D(uHMap, p / (2.0 * uHR) + 0.5).r * uHMax; }
${march("moonLit", "hAtMap", 16)}`;
/** An island's own: in its local units, through its tile (x0, z0, 1 / step; samples across, down), nothing outside it. */
const SHADOW_TILE = /* glsl */ `
uniform sampler2D uTile; uniform vec4 uTileB; uniform vec2 uTileN; uniform float uTileMax, uYScale, uShadow; uniform vec3 uMoonV;
#define uTop uTileMax
float hAtTile(vec2 p) {
  vec2 c = (p - uTileB.xy) * uTileB.z;
  if (c.x < 0.0 || c.y < 0.0 || c.x > uTileN.x - 1.0 || c.y > uTileN.y - 1.0) return 0.0;
  return texture2D(uTile, (c + 0.5) / uTileN).r * uTileMax;
}
${march("moonLit", "hAtTile", 20)}`;

/** The chart's pixel (CSS pixels across one): finer than the game's, for the islands' and sigils' detail; still whole pixels. */
export const CHART_PIXEL = 2;
/** A sigil's width against its island's reach (Ed: "the sigils should be larger and more detailed"). */
const SIGIL_SHARE = 1.0;
/** A sigil's art by how many pixels it spans on screen (art/sigilDetail.js detailTier; Ed, 2026-10-12: "we don't need the circles
 *  around the rune; ideally we want more detailed versions of the rune itself"): the plain glyph while small, the carved bands,
 *  then the carved emblem; each texture about as many pixels as it shows, so it stays crisp. */
/** When the chart opens, a sigil spans this many art pixels, and at the furthest no fewer than this. */
const SIGIL_OPEN_PX = 96, SIGIL_MIN_PX = 16;
/** A typical sailable island's sigil (units), for the zoom's limits. */
const SIGIL_TYPICAL = TYPICAL_REACH * SIGIL_SHARE;
/** The smallest a sigil is drawn (units), so a small island's still reads. */
const SIGIL_FLOOR = 9;

/** An island's real land (app/chartOutlines.worker.ts): its coast's loops (x, z interleaved, metres from its home's middle; `sea`
 *  its coast, one loop for each piece of land, else a lake's shore), their box, and its ground on a grid (heights and colours). */
export interface ChartOutline { loops: { pts: ArrayLike<number>; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; /** its meshes, made with its ground off the page (render/chart/islandMesh.ts) */ mesh?: IslandMesh; /** its sigil's ink at each tier, drawn off the page with it */ sigils?: { px: number; ink: ArrayLike<number> }[]; ground?: { x0: number; z0: number; step: number; cols: number; rows: number; h: ArrayLike<number>; rgb: ArrayLike<number>; /** 0 land, 1 sea, 2 lake */ water?: ArrayLike<number>; /** a lake's water level (m, as h) */ level?: ArrayLike<number>; /** each sample's lake look (chartOutlines.worker.ts LOOK_IDS: 0 water, 1 ice, 2 lava, 3 oasis, 4 sinkhole, 5 tarn, 6 hot spring, 7 rust pool, 8 lily pond) */ looks?: ArrayLike<number> } }

export interface ChartIsland {
  id: string;
  /** Where on the flat chart (app/chartLayout.ts islandAt): x east, y south, the disc's radius 1. */
  x: number; y: number;
  /** Its phase (0 home), for its size on the chart. */
  phase: number;
  /** Its round coast (rules/islandShape.ts islandCoast radii), drawn until its real land comes. */
  radii: ArrayLike<number>;
  /** Its real land, once made. */
  outline?: ChartOutline;
  /** Her island to sail to (a sigil on it); found but not sailable, bare land; unknown, a '?' placeholder (dimmest). */
  sail: boolean; unknown: boolean; won: boolean;
  /** The sigil it carries (art/sigils.js id: a kind, or home's). */
  sigil: string;
}
export interface ChartVoyage { from: string; to: string }

/** Where a sail's flight hands over to the game (Ed, 2026-10-12: "you select an island, and then you zoom into the map into the
 *  island you chose ... and you keep zooming until you're at the start position"): the camera over the sea off the island's south
 *  coast, looking north at it, in the game's terms: metres from the island's dancefloor (x east, z south), its height above the
 *  sea (m), its tilt down (radians), its vertical field of view (degrees) and how fast it's moving north (m/s); and the last frame. */
export interface FlightEnd { cam: { x: number; z: number; height: number; pitch: number; fov: number; speed: number }; still: string }

export interface ChartTuning extends PostTuning { pixelSize: number; camera: { fov: number } }

const SEA_VERT = /* glsl */ `
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
// The night sea: deep blue, darker toward the rim, small moving ripples catching the moon in a glitter path toward it (the
// moon low in the north), the phases' rings faint on the water, and the rim where the sea pours off the world.
const SEA_FRAG = /* glsl */ `
uniform float uTime, uR, uRings; uniform vec3 uMoonDir; varying vec3 vW;
${SHADOW_MAP}
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
void main() {
  float r = length(vW.xz) / uR;
  vec3 deep = vec3(0.035, 0.06, 0.15), shal = vec3(0.07, 0.12, 0.27);
  vec3 c = mix(shal, deep, smoothstep(0.0, 1.0, r));
  float w = n(vW.xz * 0.35 + vec2(uTime * 0.25, uTime * 0.17)) * 0.6 + n(vW.xz * 0.9 - vec2(uTime * 0.31, -uTime * 0.2)) * 0.4;
  c += vec3(0.03, 0.05, 0.09) * w;
  // the moon's glitter: a band of bright ripples from the camera's side up toward the moon, in the north
  float band = exp(-pow(vW.x - uMoonDir.x * 40.0, 2.0) / 900.0);
  c += vec3(0.55, 0.6, 0.7) * band * step(0.93, w) * 0.8;
  c *= moonLit(vec3(vW.x, 0.0, vW.z), 1.0); // (the islands shadows on the water)
  // the phases' rings, faint (dashed round)
  float rp = length(vW.xz) / uRings; // (the rings by the islands' own radius, the empty band past them: #746)
  for (int p = 1; p <= 5; p++) { float rr = 0.02 + float(p) * 0.165; float d = abs(rp - rr);
    float dash = step(0.5, fract(atan(vW.z, vW.x) * 24.0 / 6.2832 * float(p)));
    c += vec3(0.05, 0.08, 0.16) * (1.0 - smoothstep(0.0, 0.004, d)) * dash; }
  // the rim: lighter where the water gathers to pour off
  c += vec3(0.12, 0.2, 0.32) * smoothstep(0.965, 1.0, r);
  gl_FragColor = vec4(c, 1.0);
}`;
// The sea pouring off the world's edge: a skirt below the rim, streaks running down, fading into space.
const FALL_FRAG = /* glsl */ `
uniform float uTime; varying vec2 vUv;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float a = vUv.x * 900.0, col = floor(a), streak = h(col), y = vUv.y;
  float run = fract(y * 3.0 + uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = smoothstep(0.0, 0.9, y);
  vec3 c = mix(vec3(0.05, 0.09, 0.2), vec3(0.45, 0.6, 0.85), lit) * fade;
  gl_FragColor = vec4(c, fade * (0.55 + 0.45 * lit));
}`;
// The sky past the world's edge: deep night, stars in a few sizes, a few twinkling, the moon low in the north (whole pixels:
// it's drawn at the low resolution).
const SKY_VERT = /* glsl */ `varying vec2 vNdc; void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); }`;
const SKY_FRAG = /* glsl */ `
uniform vec2 uRes; uniform float uTime; uniform vec2 uMoon; varying vec2 vNdc;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 px = floor((vNdc * 0.5 + 0.5) * uRes), uv = px / uRes;
  vec3 c = mix(vec3(0.02, 0.025, 0.06), vec3(0.06, 0.07, 0.16), smoothstep(1.0, 0.2, uv.y));
  float s = h(px); if (s > 0.9965) { float tw = 0.6 + 0.4 * sin(uTime * (1.0 + h(px + 3.0) * 3.0) + s * 40.0); c += vec3(0.75, 0.78, 0.9) * tw * (s > 0.9992 ? 1.3 : 0.7); }
  vec2 m = uMoon * uRes; float d = length(px - m), R = uRes.y * 0.045;
  if (d < R) { float lit = smoothstep(R, R * 0.2, length(px - m - vec2(R * 0.35, 0.0))); c = mix(vec3(0.85, 0.87, 0.8), vec3(0.18, 0.2, 0.28), 1.0 - lit); }
  else c += vec3(0.25, 0.28, 0.4) * exp(-(d - R) / (R * 1.6)) * 0.35;
  gl_FragColor = vec4(c, 1.0);
}`;
// A voyage's line on the water: a glowing current flowing from where she set out to where she went, as the ley line's.
const LINE_VERT = /* glsl */ `attribute float aAlong; varying float vAlong; varying vec2 vUv;
void main() { vAlong = aAlong; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const LINE_FRAG = /* glsl */ `
uniform float uTime; uniform vec3 uColour; varying float vAlong; varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
  float pulse = fract(vAlong * 0.08 - uTime * 0.6);
  float glow = smoothstep(0.0, 1.0, across) * (0.35 + 0.65 * smoothstep(0.75, 1.0, pulse));
  gl_FragColor = vec4(uColour * glow, glow);
}`;

// The islands' ground (island(): each its own material, with its tile): its colour relief-shaded as a painted map is (Ed, 2026-10-12, his close-up reference: the
// hills lit from the north-west, dark on their far sides) under the moon, the heights a little paler, a cool fill in the shadow.
// Its colours come as the worker's bytes, dimmed here (uDim) for how it stands: nothing made on the page as it arrives.
const GROUND_VERT = /* glsl */ `
varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`;
const GROUND_FRAG = /* glsl */ `
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise, uDim; varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
${SHADOW_TILE}
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * uDim * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  float sh = moonLit(vL, 1.0 / uYScale); c = c * sh + vec3(0.006, 0.01, 0.024) * (1.0 - sh); // (in a hill shadow: darker, a little bluer)
  gl_FragColor = vec4(c, 1.0);
}`;
// The shallows round an island (shallowMaterial): the sea pale and green-blue by the shore, fading into the deep (the reference's
// light coastal water), from each sample's depth.
const SHALLOW_VERT = /* glsl */ `
attribute float aDepth; varying float vD; varying vec3 vL;
void main() { vD = aDepth; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`;
const SHALLOW_FRAG = /* glsl */ `
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD; varying vec3 vL;
${SHADOW_TILE}
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a) * moonLit(vec3(vL.x, 0.0, vL.z), 1.0 / uYScale);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`;
/** The sea's shallows' colours, and a lake's (lighter than the sea, as in the game: about 0.15, 0.28, 0.37 against 0.09, 0.18,
 *  0.26; hotel, #711), each pale by its shore. */
const SEA_WATER = { deep: new THREE.Color(0.08, 0.2, 0.34), pale: new THREE.Color(0.22, 0.46, 0.52) }, LAKE_WATER = { deep: new THREE.Color(0.15, 0.28, 0.37), pale: new THREE.Color(0.3, 0.52, 0.56) };
/** How deep (m) a lake's shallows fade out to. */
// A lake by its island's biome (Ed, 2026-10-12: frozen in the cold, lava in the volcano, an oasis in the desert, a sinkhole in the
// jungle; chartOutlines.worker.ts LAKE_LOOKS, which picks each lake's, blending by bearing, and paints its rim on its shore): aLook 0 water (as the shallows), 1
// ice (pale, frost white by the shore, faint cracks), 2 lava (glowing and slowly churning, crusting dark by the shore), 3 an
// oasis (clear turquoise, pale sand under its edge), 4 a sinkhole (no water: a dry cliff-walled pit, which the ground draws); and the
// diagonals': 5 a glacial tarn (milky turquoise meltwater, ice floes by its edge), 6 a tar pit (glossy black tar with the moon's
// sheen on it, oil-slick rainbows drifting slowly over it, slow bubbles swelling and popping, bones half sunk by its edge), 7 a rust pool (a Yellowstone hot pool: rings from an orange rim through yellow, green and teal to a deep blue throat, a white lip), 8 a
// lily pond (green water under giant pads, a few flowers).
// A tar pit (Ed, 2026-10-13: in place of the hot spring, which looked like somewhere you could walk) reads as a sticky black
// trap: its sheen is the moon's light off a glossy surface (lit by where the camera looks from, its world place vW).
const LAKE_VERT = /* glsl */ `
attribute float aDepth, aLook; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
void main() {
  vD = aDepth; vLook = aLook; vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;
const LAKE_FRAG = /* glsl */ `
uniform float uDim, uTime, uScale; uniform vec3 uDeep, uPale; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
${SHADOW_TILE}
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
// round things scattered one to a cell (floes, pads): x how far inside the nearest (1 its middle, 0 its edge, below 0 outside), y its cell's own number
vec2 dots(vec2 p, float r) {
  vec2 i = floor(p), best = vec2(-1.0, 0.0);
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 c = i + vec2(x, y), o = c + 0.2 + 0.6 * vec2(h(c), h(c + 9.1)); float rr = r * (0.6 + 0.5 * h(c + 3.7)), k = 1.0 - length(p - o) / rr;
    if (k > best.x) best = vec2(k, h(c + 5.3));
  }
  return best;
}
void main() {
  float d = clamp(vD, 0.0, 1.0), a = pow(1.0 - d, 1.6); vec2 p = vP / uScale; // (p in about 30 m steps)
  vec3 c; int uLook = int(vLook + 0.5);
  if (uLook == 1) {
    float crack = smoothstep(0.035, 0.0, abs(n(p * 0.9) - 0.5)) * 0.5 + smoothstep(0.03, 0.0, abs(n(p * 2.1 + 7.0) - 0.5)) * 0.3;
    c = mix(vec3(0.3, 0.42, 0.52), vec3(0.6, 0.68, 0.76), a * a) + vec3(0.1, 0.12, 0.14) * crack * (1.0 - a);
    c *= 0.9 + 0.1 * n(p * 3.0);
  } else if (uLook == 2) {
    float t = uTime * 0.12, f = n(p * 0.8 + vec2(t, -t * 0.7)) * 0.6 + n(p * 2.3 - vec2(t * 1.3, t)) * 0.4;
    vec3 hot = mix(vec3(1.0, 0.36, 0.06), vec3(1.25, 0.86, 0.3), smoothstep(0.45, 0.8, f));
    float crust = max(smoothstep(0.35, 0.85, a), smoothstep(0.32, 0.18, f) * 0.85);
    c = mix(hot, vec3(0.1, 0.05, 0.04), crust);
    gl_FragColor = vec4(c * mix(1.0, uDim, 0.5), 1.0); return; // (it glows: dimmed less, and not by the night)
  } else if (uLook == 3) {
    c = mix(vec3(0.06, 0.36, 0.42), vec3(0.62, 0.78, 0.6), a * a) + vec3(0.05) * n(p * 2.0 + uTime * 0.05);
  } else if (uLook == 4) {
    c = mix(vec3(0.02, 0.055, 0.06), vec3(0.1, 0.26, 0.19), a * a * a);
  } else if (uLook == 5) {
    c = mix(vec3(0.36, 0.62, 0.62), vec3(0.62, 0.8, 0.78), a * a);
    vec2 f = dots(p * 3.0, 0.42); float floe = step(0.0, f.x) * step(0.35, a) * step(0.3, f.y + a * 0.6);
    c = mix(c, vec3(0.78, 0.86, 0.9) * (0.92 + 0.08 * f.x), floe);
  } else if (uLook == 6) { // (a tar pit: near-black, a glossy sheen, oil-slick rainbows drifting, slow bubbles, bones by its edge)
    float t = uTime * 0.02;
    vec2 q = p * 0.8 + (vec2(n(p * 0.5 + vec2(t, 2.0)), n(p * 0.5 - vec2(t, 7.0))) - 0.5) * 2.4; // (the swirls: p warped, slowly)
    vec2 e = vec2(0.04, 0.0); float g0 = n(q * 1.5), gx = n((q + e) * 1.5) - g0, gz = n((q + e.yx) * 1.5) - g0;
    vec3 N = normalize(vec3(-gx * 6.0, 1.0, -gz * 6.0)), V = normalize(cameraPosition - vW); // (its slow, heavy undulation)
    float spec = pow(max(dot(N, normalize(uMoonV + V)), 0.0), 30.0), fres = pow(1.0 - max(V.y, 0.0), 3.0);
    c = vec3(0.028, 0.025, 0.03) + vec3(0.12, 0.13, 0.16) * (0.5 * fres + 0.6 * smoothstep(0.5, 0.85, g0)); // (black, the sky's sheen at a slant and along its swells)
    float slick = smoothstep(0.44, 0.66, n(q * 0.6 + 13.0)) * smoothstep(0.02, 0.2, d); // (patches of oil, not at its very edge)
    vec3 rainbow = 0.5 + 0.5 * cos(6.2832 * (n(q * 1.3 - vec2(t * 3.0, 0.0)) * 2.0 + d * 0.6 + vec3(0.0, 0.33, 0.67)));
    c += rainbow * rainbow * slick * (0.36 + 0.2 * fres); // (squared: purer bands, as a film's)
    // the bubbles: a few cells each swelling a dome for most of its cycle, then a ring as it pops
    vec2 bc = floor(p * 0.8), bf = fract(p * 0.8) - 0.5 - (vec2(h(bc), h(bc + 4.1)) - 0.5) * 0.4;
    float ph = fract(uTime * (0.06 + 0.05 * h(bc + 8.3)) + h(bc + 2.9)), live = step(0.55, h(bc + 6.7)) * step(0.15, d), r = length(bf);
    float dome = step(ph, 0.86) * smoothstep(0.0, 0.86, ph) * 0.32, pop = step(0.86, ph) * (ph - 0.86) / 0.14;
    float inDome = live * step(r, dome);
    c = mix(c, vec3(0.03, 0.03, 0.035) + vec3(0.45, 0.45, 0.5) * smoothstep(0.45, 0.0, length(bf + vec2(0.35, 0.35) * dome) / max(dome, 1e-3)), inDome); // (a dome, lit up and to the left)
    c += live * step(0.0, dome - 0.02) * smoothstep(0.03, 0.0, abs(r - dome)) * vec3(0.2, 0.2, 0.24); // (its rim)
    c += live * pop * smoothstep(0.04, 0.0, abs(r - 0.06 - pop * 0.34)) * (1.0 - pop) * vec3(0.4, 0.4, 0.45);
    c += vec3(0.75, 0.78, 0.9) * spec * (1.0 - inDome * 0.5);
    // half-sunk bones by its edge: a rib cage's arcs, or a skull, pale and sparse
    vec2 kc = floor(p * 2.2), kf = fract(p * 2.2) - 0.5; float ko = h(kc + 1.7);
    if (ko > 0.88 && d < 0.22) {
      float arcs = 0.0; for (int k = 0; k < 3; k++) { vec2 o = kf - vec2(-0.18 + 0.18 * float(k), 0.08); arcs = max(arcs, smoothstep(0.07, 0.0, abs(length(o) - 0.16)) * step(o.y, 0.0)); }
      float skull = smoothstep(0.17, 0.12, length((kf - vec2(0.05, -0.05)) * vec2(1.0, 1.3)));
      c = mix(c, vec3(0.95, 0.9, 0.76) * (0.85 + 0.15 * n(kf * 9.0 + kc)), ko > 0.94 ? skull : arcs);
    }
    c = mix(c, vec3(0.07, 0.055, 0.045), smoothstep(0.05, 0.0, d)); // (its dull, sticky lip)
  } else if (uLook == 7) { // (Ed's reference, a Yellowstone pool from above: a deep blue throat, teal, green, a wide yellow and orange band, a white lip)
    float r = clamp(d + (n(p * 3.0) - 0.5) * 0.08, 0.0, 1.0);
    c = mix(vec3(0.95, 0.42, 0.06), vec3(1.0, 0.72, 0.12), smoothstep(0.08, 0.32, r));
    c = mix(c, vec3(0.42, 0.72, 0.22), smoothstep(0.32, 0.48, r));
    c = mix(c, vec3(0.08, 0.66, 0.64), smoothstep(0.46, 0.64, r));
    c = mix(c, vec3(0.03, 0.2, 0.42), smoothstep(0.78, 1.0, r));
    c = mix(c, vec3(0.92, 0.9, 0.84), smoothstep(0.07, 0.0, d)); // (the crusted white lip)
  } else if (uLook == 8) {
    c = mix(vec3(0.08, 0.22, 0.16), vec3(0.16, 0.34, 0.22), a);
    vec2 f = dots(p * 1.6, 0.55); float pad = step(0.0, f.x) * step(0.25, f.y);
    c = mix(c, vec3(0.26, 0.56, 0.22) * (0.75 + 0.35 * f.x), pad);
    c = mix(c, vec3(1.0, 0.66, 0.82), step(0.72, f.x) * step(0.7, f.y)); // (a flower on a few)
  } else c = mix(uDeep, uPale, a * a);
  gl_FragColor = vec4(c * uDim * moonLit(vL, 1.0 / uYScale), 1.0);
}`;
/** How far in from its shore (m) a special lake's edge reaches. */

/** One island's meshes and where it is. */
/** A sail's flight (fly): its legs' ends (the camera's focus, distance and tilt, in chart units) and their seconds; how far in. */
interface Flight { id: string; t: number; keys: { x: number; z: number; dist: number; pitch: number; at: number; ease: (u: number) => number }[]; done: (end: FlightEnd) => void; speed: number; floor: THREE.Group; size: number;
  /** the flight's own pace (1 its seconds), eased down while `hold` says the game isn't ready, and the wall's seconds since it set off */
  rate: number; wall: number; held?: boolean; hold?: FlyOptions["hold"]; slow: FlyOptions["slow"] }
/** A sail's flight's options (Ed, 2026-10-24, the sail's transition: "we can make the zoom into chart as slow as we need to so that
 *  the transition to the dive is smooth"): `hold` true while the next night isn't ready for the dive (its ground, the house, the
 *  shaders: main.ts), the flight easing down to `slow.rate` of its pace from the end of its glide in, for at most `slow.cap` seconds
 *  of the wall's (then on as ever), its pace easing over `slow.ease` seconds each way; `sea` metres: the hand-off that far out to sea
 *  off the south coast (negative: inland, as the first flight's 40), its camera `dist` metres back and tilted `pitchDeg` down. */
export interface FlyOptions { hold?: () => boolean; slow?: { rate: number; ease: number; cap: number }; sea?: number; dist?: number; pitchDeg?: number }
const smoothstep = (u: number) => u * u * (3 - 2 * u), easeIn = (u: number) => u * u;
/** The flight: the glide to frame the island (s), the swoop down and round to the sea off its south coast (s), then the run on north
 *  (s) `onward` metres, ending looking down just `inland` of the shore below its dancefloor (the camera `dist` m back, tilted `pitchDeg` down:
 *  the game's treetop view) and still moving north, for the game to carry on. */
const FLY = { frame: 1.6, swoop: 2.8, run: 1.2, dist: 600, pitchDeg: 50, onward: 60, inland: 40 };
/** How long (s) an island takes to rise out of the sea as its land arrives. */
const RISE = 0.9;

interface Isle { /** its heights' tile and its uniforms (once its real ground has come) */ tileU?: { uTile: { value: THREE.Texture }; uTileB: { value: THREE.Vector4 }; uTileN: { value: THREE.Vector2 }; uTileMax: { value: number }; uYScale: { value: number } }; d: ChartIsland; group: THREE.Group; /** its land, to pick (none till its land has come) */ pick?: THREE.Mesh; x: number; z: number; top: number; reach: number; /** when its land came (the time of that frame): it rises out of the sea for RISE seconds from then */ rose?: number; sigil?: THREE.Mesh; glow?: THREE.Mesh; tier?: number; size?: number }

/** A sigil as a white texture, `px` across, whole pixels, at a detail tier (art/sigilDetail.js): its ink as the worker drew it
 *  with the island, else drawn here. */
function sigilTexture(id: string, px = 24, tier = 0, drawn?: ArrayLike<number>): THREE.Texture {
  const ink = drawn ?? sigilDetail(id, px, { tier }), data = new Uint8Array(px * px * 4);
  for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) { const i = y * px + x, o = ((px - 1 - y) * px + x) * 4; if (ink[i]) data.set([255, 255, 255, 255], o); }
  const t = new THREE.DataTexture(data, px, px); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.needsUpdate = true;
  return t;
}
/** A soft round glow (for the sigils' halos and the selection ring's light). */
function glowTexture(): THREE.Texture {
  const n = 64, data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const d = Math.hypot(x + 0.5 - n / 2, y + 0.5 - n / 2) / (n / 2), a = Math.max(0, 1 - d) ** 2; data.set([255, 255, 255, Math.round(a * 255)], (y * n + x) * 4); }
  const t = new THREE.DataTexture(data, n, n); t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter; t.needsUpdate = true;
  return t;
}
type Loop = { pts: THREE.Vector2[]; sea: boolean };
/** An island's loops in its shape's units about its middle (shape y is -z, as the extrusion is laid flat), scaled to its reach on
 *  the chart; and the scale (units a metre) and middle (m) its real land was put there with. Its real outline's (every other
 *  point: a chart pixel is far coarser than its step), else its round coast's (art/islands.js islandPoints). */
function islandLoops(d: ChartIsland): { loops: Loop[]; k: number; cx: number; cz: number; reach: number } {
  const o = d.outline, want = reachOf(d);
  if (o && o.loops.some(l => l.sea)) {
    // (at the true scale, about its home's middle: the archipelago places that middle)
    const cx = 0, cz = 0, k = K;
    let far = 0;
    for (const l of o.loops) if (l.sea) for (let i = 0; i < l.pts.length; i += 2) far = Math.max(far, Math.hypot(l.pts[i] - cx, l.pts[i + 1] - cz));
    const out: Loop[] = [];
    for (const l of o.loops) {
      const n = l.pts.length / 2, by = n > 160 ? 2 : 1, pts: THREE.Vector2[] = [];
      for (let i = 0; i < n; i += by) pts.push(new THREE.Vector2((l.pts[i * 2] - cx) * k, -(l.pts[i * 2 + 1] - cz) * k));
      if (pts.length >= 3) out.push({ pts, sea: l.sea });
    }
    if (out.some(l => l.sea)) return { loops: out, k, cx, cz, reach: far * k };
  }
  const raw = (islandPoints(d.radii) as [number, number][]).map(([px, py]) => new THREE.Vector2(px - 0.5, -(py - 0.5)));
  const far = Math.max(...raw.map(p => p.length())), k = want / far;
  return { loops: [{ pts: raw.map(p => p.multiplyScalar(k)), sea: true }], k: 0, cx: 0, cz: 0, reach: want };
}
const tmp = new THREE.Vector3();
const col = (c: readonly number[], k = 1) => new THREE.Color((c[0] / 255) * k, (c[1] / 255) * k, (c[2] / 255) * k);

export class SeaChart {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera: THREE.PerspectiveCamera;
  private scene = new THREE.Scene();
  private post: Post;
  /** The post pass's own knobs: the bloom gentler in a small view (a map table's miniature), where it would wash the sigils out. */
  private postTuning: ChartTuning;
  private isles = new Map<string, Isle>();
  private lines: THREE.Mesh[] = [];
  private voyages: ChartVoyage[] = [];
  private uTime = { value: 0 };
  private glow = glowTexture();
  private skyU: Record<string, THREE.IUniform>;
  private ring: THREE.Mesh;
  private focus = new THREE.Vector3();
  private aim = new THREE.Vector3();
  /** How far the camera stands from what it looks at (units); `zoomTo` eases it. */
  private dist = 130;
  private distTo = 130;
  /** The camera's distance when the chart opens, and the furthest it goes, by the screen's height (resize). */
  private distOpen = 130;
  private distMax = 200;
  private sized = false;
  /** How steeply the camera looks down (radians from level). */
  private pitch = 0.95;
  selected: string | null = null;
  /** Circle the chosen island this fast (radians a second; the map table's miniature), 0 for the chart's still north-facing view. */
  orbit = 0;
  private yaw = 0;
  /** A sail's flight in progress (fly), else null. */
  private flight: Flight | null = null;
  get flying(): boolean { return !!this.flight; }
  private w = 1; private h = 1;

  constructor(readonly canvas: HTMLCanvasElement, readonly tuning: ChartTuning) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.camera = new THREE.PerspectiveCamera(tuning.camera.fov ?? 40, 1, 1, 4000);
    this.postTuning = { ...tuning, bloom: { ...tuning.bloom } };
    this.post = new Post(this.renderer, this.postTuning);
    this.scene.background = new THREE.Color(0x05060e);
    // the night's light: a cool moon from the north, a little sky all round
    this.scene.add(new THREE.HemisphereLight(0x7080c0, 0x182030, 2.6));
    const moon = new THREE.DirectionalLight(0xd0dcff, 3.2); moon.position.set(-30, 60, -90); this.scene.add(moon); this.moonLight = moon;
    // the sky past the rim
    const skyGeo = new THREE.BufferGeometry(); skyGeo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    this.skyU = { uRes: { value: new THREE.Vector2(1, 1) }, uTime: this.uTime, uMoon: { value: new THREE.Vector2(0.28, 0.88) } };
    const sky = new THREE.Mesh(skyGeo, new THREE.ShaderMaterial({ vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, uniforms: this.skyU, depthWrite: false, depthTest: true, depthFunc: THREE.LessEqualDepth }));
    sky.frustumCulled = false; sky.renderOrder = 9; this.scene.add(sky);
    // the sea, and the sea pouring off its rim (buildSea: again when the empty band round the islands changes)
    this.buildSea();
    // the selection: a bright ring on the water round the chosen island
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xa8dcff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.ring.position.y = 0.15; this.ring.visible = false; this.scene.add(this.ring);
  }

  /** An island's land out of the height map. */
  private unheight(g: THREE.Group): void { const hb = g.userData.hb as THREE.Mesh | undefined; if (!hb) return; this.hScene.remove(hb); this.hBodies = this.hBodies.filter(e => e.hb !== hb); this.markHeights(); }
  /** The chart's heights changed (an island's land came or went): the moon's shadow map drawn again once they stop coming for
   *  half a second, or two seconds after the first change at most (a 2048-square render each: islands now come one a frame, and
   *  drawing it a quarter second after each was a quarter second a time on a software renderer). */
  private markHeights(): void { if (!this.hDirty) this.hSince = this.now; this.hDirty = true; this.hDue = Math.min(this.hSince + 2, this.now + 0.5); }
  private hSince = 0;
  /** The last frame's time (s). */
  private now = 0;
  private hDue = 0;

  /** Every island and her voyages: the scene rebuilt (on load, and after a start over). */
  set(islands: ChartIsland[], voyages: ChartVoyage[]): void {
    for (const i of this.isles.values()) this.unheight(i.group);
    for (const i of this.isles.values()) this.scene.remove(i.group);
    for (const l of this.lines) this.scene.remove(l);
    this.isles.clear(); this.lines = [];
    for (const d of islands) this.isles.set(d.id, this.island(d));
    this.voyages = voyages;
    for (const v of voyages) { const a = this.isles.get(v.from), b = this.isles.get(v.to); if (a && b) this.lines.push(this.voyage(a, b)); }
    if (this.selected && !this.isles.has(this.selected)) this.selected = null;
  }

  /** An island's real outline has come: its land rebuilt in that shape (her voyages redrawn to its new shore). */
  reshape(id: string, outline: ChartOutline): void {
    const old = this.isles.get(id); if (!old) return;
    const fresh = !old.pick; // (its land's first coming: it rises out of the sea; a finer grid later swaps in where it stands. By the isle, not its record: the page writes the outline on the record before it calls)
    this.unheight(old.group); this.scene.remove(old.group);
    const isle = this.island({ ...old.d, outline });
    if (fresh) isle.rose = this.now;
    this.isles.set(id, isle);
    for (const l of this.lines) this.scene.remove(l);
    this.lines = this.voyages.flatMap(v => { const a = this.isles.get(v.from), b = this.isles.get(v.to); return a && b ? [this.voyage(a, b)] : []; });
  }

  /** An island: its land rising out of the sea (its real ground once made: its hills, each area's floor, its beaches, its lakes
   *  under the water; till then a low landmass raised from its round coast), a shelf of shallows round it; its sigil lying on
   *  it glowing if she can sail there; a gold ring on the water if won. */
  private island(d: ChartIsland): Isle {
    const g = new THREE.Group(), x = d.x * CHART_SCALE, z = d.y * CHART_SCALE;
    g.position.set(x, 0, z); this.scene.add(g);
    const { k, reach } = islandLoops(d);
    const dim = d.unknown ? 0.72 : d.sail ? 1 : 0.85;
    const G = d.outline?.ground;
    // Nothing drawn till its real land comes (Ed, 2026-10-13: no round coast in its place): each rises out of the sea as it arrives.
    if (!G || !(k > 0)) return { d, group: g, x, z, top: 1, reach };
    // Its real ground: a heightfield, each sample its height and colour, lit by the moon; its meshes made with it off the page
    // (render/chart/islandMesh.ts, in app/chartOutlines.worker.ts; here only wrapped), the colours its own by how it stands.
    const { cols, rows, step } = G, M = d.outline!.mesh ?? buildIslandMesh(G, k), colour = G.rgb instanceof Uint8Array ? G.rgb : Uint8Array.from(G.rgb);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(M.pos, 3)); geo.setAttribute("color", new THREE.BufferAttribute(colour, 3, true)); geo.setAttribute("normal", new THREE.BufferAttribute(M.normal, 3)); geo.setIndex(new THREE.BufferAttribute(M.idx, 1));
    // its own heights as a tile, for its shadows close in (SHADOW_TILE): each sample's height over the water, a byte of its highest
    const tex = new THREE.DataTexture(M.tile, cols, rows, THREE.RedFormat, THREE.UnsignedByteType);
    tex.unpackAlignment = 1; tex.minFilter = tex.magFilter = THREE.LinearFilter; tex.needsUpdate = true;
    const tileU: Isle["tileU"] = { uTile: { value: tex }, uTileB: { value: new THREE.Vector4(G.x0 * k, G.z0 * k, 1 / (step * k), 0) }, uTileN: { value: new THREE.Vector2(cols, rows) }, uTileMax: { value: M.tmax }, uYScale: { value: 1 } };
    const body = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: GROUND_VERT, fragmentShader: GROUND_FRAG, uniforms: { ...this.groundU, ...tileU, uDim: { value: dim } }, vertexColors: true }));
    const top = M.top;
    // the shallows: the water over every sample within reach of the shore, flat on the sea, by its depth
    const wg = new THREE.BufferGeometry();
    wg.setAttribute("position", new THREE.BufferAttribute(M.flat, 3)); wg.setAttribute("aDepth", new THREE.BufferAttribute(M.depth, 1)); wg.setIndex(new THREE.BufferAttribute(M.wi, 1));
const waterMat = (w: { deep: THREE.Color; pale: THREE.Color }, opaque: number) => new THREE.ShaderMaterial({ vertexShader: SHALLOW_VERT, fragmentShader: SHALLOW_FRAG, uniforms: { ...this.moonShared, ...tileU, uDim: { value: 0.6 + 0.4 * dim }, uOpaque: { value: opaque }, uDeep: { value: w.deep }, uPale: { value: w.pale } }, transparent: opaque < 1, depthWrite: opaque >= 1 });
    g.add(new THREE.Mesh(wg, waterMat(SEA_WATER, 0)));
    // the lakes: still water at each one's level, in its hollow, pale where it's shallow by its shore
    if (M.lakes) {
      const L = M.lakes, lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.BufferAttribute(L.lp, 3)); lg.setAttribute("aDepth", new THREE.BufferAttribute(L.ld, 1)); lg.setAttribute("aLook", new THREE.BufferAttribute(L.lk, 1)); lg.setIndex(new THREE.BufferAttribute(L.li, 1));
      g.add(new THREE.Mesh(lg, new THREE.ShaderMaterial({ vertexShader: LAKE_VERT, fragmentShader: LAKE_FRAG, uniforms: { ...this.moonShared, ...tileU, uDim: { value: 0.6 + 0.4 * dim }, uTime: this.uTime, uScale: { value: 30 * k }, uDeep: { value: LAKE_WATER.deep }, uPale: { value: LAKE_WATER.pale } } })));
    }
    g.add(body);
    { const hb = new THREE.Mesh(body.geometry, this.heightMat); hb.matrixAutoUpdate = false; hb.frustumCulled = false; this.hScene.add(hb); this.hBodies.push({ hb, body }); g.userData.hb = hb; this.markHeights(); }
    const isle: Isle = { d, group: g, pick: body, x, z, top, reach, tileU };
    if (d.outline?.sigils?.length) this.sigilInk.set(d.sigil, d.outline.sigils); // (its sigil's ink, drawn with it off the page)
    if (d.sail) { // its sigil, lying over the land and glowing as a placed sigil does, a halo of its light under it
      const c = sigilColour(d.sigil), s = Math.max(SIGIL_FLOOR, reach * SIGIL_SHARE);
      const sg = new THREE.Mesh(new THREE.PlaneGeometry(s, s).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: this.sigilArt(d.sigil, 0), color: col(c, 0.95), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      sg.position.y = top + 0.35; g.add(sg); isle.sigil = sg; isle.tier = 0; isle.size = s;
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(s * 1.6, s * 1.6).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: this.glow, color: col(c, 0.16), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      halo.position.y = top + 0.25; g.add(halo); isle.glow = halo;
    }
    if (d.won) { // won: a gold ring on the water round it
      const r = reach * 1.3;
      const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.95, r, 96).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe8b46a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.position.y = 0.12; g.add(ring);
    }
    return isle;
  }

  /** The islands' ground: each sample's own colour (its area's floor, the beach's sand), lit by the moon so the hills show, a
   *  little of the night's blue in the shadows; not the scene's lights, whose blue would drown the areas' colours. */
  // The moon (moonKnobs above): its way and its shadows' strength, shared by every material that takes its shadows; the whole
  // chart's heights, top down, for the open sea; when the chart opened (it rises again each time it does).
  private moonShared = { uShadow: { value: 0 }, uMoonV: { value: new THREE.Vector3(-0.3, 0.6, -0.9).normalize() } };
  private hmap = new THREE.WebGLRenderTarget(HMAP, HMAP, { depthBuffer: true, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: false });
  private moonU = { ...this.moonShared, uHMap: { value: this.hmap.texture }, uHR: { value: CHART_SCALE * 1.02 }, uHMax: { value: 8 } };
  private hScene = new THREE.Scene();
  private hBodies: { hb: THREE.Mesh; body: THREE.Object3D }[] = [];
  private hDirty = true;
  private moonLight: THREE.DirectionalLight | null = null;
  private moonT0 = 0;
  private moonLast: number | undefined;
  private moonP = new THREE.Vector3();
  private seaMoon = { value: new THREE.Vector3(-0.3, 0.6, -0.9) };
  /** A fixed bearing for the moon (degrees, 0 north, clockwise), risen; null (the default) for its way round. For previews. */
  stillMoon: number | null = null;
  // (each island's land drawn into the height map with its height as its colour: x across, z up the map, seen from below)
  private heightMat = new THREE.ShaderMaterial({
    vertexShader: "uniform float uHR, uHMax; varying float vY; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; gl_Position = vec4(w.x / uHR, w.z / uHR, -0.9 * clamp(w.y / uHMax, -1.0, 1.0), 1.0); }",
    fragmentShader: "uniform float uHMax; varying float vY; void main() { gl_FragColor = vec4(clamp(vY / uHMax, 0.0, 1.0), 0.0, 0.0, 1.0); }",
    uniforms: { uHR: this.moonU.uHR, uHMax: this.moonU.uHMax },
    side: THREE.DoubleSide,
  });
  /** The islands' ground's light (each island's material adds its tile): the moon, the hills' shade from it, how high is pale. */
  private groundU = { ...this.moonShared, uMoon: { value: new THREE.Vector3(-0.3, 0.6, -0.9).normalize() }, uShade: { value: new THREE.Vector3(-0.7, 0.45, -0.55).normalize() }, uRise: { value: 3 } };

  /** The moon this frame: where it is on its way (rising over the north-west edge as the chart opens, then round), the hills'
   *  light and shade and the shadows from it, its disc in the sky by its bearing; the sea again if the empty band changed, and
   *  the height map again if the land did (or flies). */
  private moonFrame(time: number): void {
    const t = this.tuning as unknown as { chart?: ChartKnobs }, m = moonKnobs(t);
    if (this.moonLast === undefined || time - this.moonLast > 1 || time < this.moonLast) this.moonT0 = time; // (opened again: it rises again)
    this.moonLast = time;
    const at = this.stillMoon !== null ? { bearing: this.stillMoon, height: m.height, risen: 1 } : moonAt(time - this.moonT0, m);
    const az = THREE.MathUtils.degToRad(at.bearing), el = THREE.MathUtils.degToRad(at.height);
    const v = this.moonShared.uMoonV.value.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
    this.moonShared.uShadow.value = m.shadow * at.risen; // (rising: the land comes out of the dark, its shadows long, shortening)
    this.groundU.uMoon.value.copy(v);
    this.groundU.uShade.value.set(Math.sin(az) * 0.8, 0.45, -Math.cos(az) * 0.8).normalize();
    this.seaMoon.value.copy(v);
    this.moonLight?.position.copy(v).multiplyScalar(100);
    // its disc: out past the rim, along its bearing at its height, hidden behind the world (the sky is drawn only where nothing is)
    const disc = this.skyU.uMoon.value as THREE.Vector2;
    if (!m.disc) disc.set(-1, -1);
    else {
      this.camera.updateMatrixWorld();
      const q = this.moonP.copy(v).multiplyScalar(this.seaR * 1.6).project(this.camera);
      if (q.z > 1 || q.z < -1) disc.set(-1, -1); else disc.set((q.x + 1) / 2, (q.y + 1) / 2);
    }
    if (edgeBand(t) !== this.band) this.buildSea();
    for (const i of this.isles.values()) if (i.tileU) i.tileU.uYScale.value = i.group.scale.y;
    if ((!this.hDirty || time < this.hDue) && !this.flight) return;
    this.hDirty = false;
    let top = 1;
    for (const { hb, body } of this.hBodies) {
      // (its land where it stands, not where it is on its way up out of the sea, or bobbing as the chosen one: its group's own height taken off)
      body.updateWorldMatrix(true, false); hb.matrix.copy(body.matrixWorld); hb.matrix.elements[13] -= body.parent?.position.y ?? 0; hb.matrixWorld.copy(hb.matrix);
      const g = (body as THREE.Mesh).geometry; if (!g.boundingBox) g.computeBoundingBox(); top = Math.max(top, g.boundingBox!.max.y);
    }
    this.moonU.uHMax.value = top * 1.05;
    const r = this.renderer, was = r.getRenderTarget(), col = r.getClearColor(new THREE.Color()), a = r.getClearAlpha();
    r.setRenderTarget(this.hmap); r.setClearColor(0x000000, 1); r.clear(); r.render(this.hScene, this.camera);
    r.setRenderTarget(was); r.setClearColor(col, a);
  }

  /** The sea and its rim pouring off, out to the islands' radius and the empty band past it (edgeBand); built again when that changes. */
  private sea: THREE.Mesh | null = null;
  private fall: THREE.Mesh | null = null;
  private band = -1;
  private seaR = CHART_SCALE * 1.02;
  private buildSea(): void {
    for (const m of [this.sea, this.fall]) if (m) { this.scene.remove(m); m.geometry.dispose(); (m.material as THREE.Material).dispose(); }
    this.band = edgeBand(this.tuning as unknown as { chart?: ChartKnobs });
    const R = (this.seaR = CHART_SCALE * 1.02 * (1 + this.band));
    this.moonU.uHR.value = R; this.markHeights();
    this.sea = new THREE.Mesh(new THREE.CircleGeometry(R, 160).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({ vertexShader: SEA_VERT, fragmentShader: SEA_FRAG, uniforms: { ...this.moonU, uTime: this.uTime, uR: { value: R }, uRings: { value: CHART_SCALE * 1.02 }, uMoonDir: this.seaMoon } }));
    this.fall = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.97, 40, 160, 1, true).translate(0, -20, 0), new THREE.ShaderMaterial({
      vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: FALL_FRAG, uniforms: { uTime: this.uTime }, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
    this.scene.add(this.sea, this.fall);
  }

  /** A sigil's art at a tier (SIGIL_TIERS), made once: from the ink its island brought (drawn off the page), else drawn here. */
  private sigilArts = new Map<string, THREE.Texture>();
  private sigilInk = new Map<string, { px: number; ink: ArrayLike<number> }[]>();
  private sigilArt(id: string, tier: number): THREE.Texture {
    const key = `${id}|${tier}`;
    let t = this.sigilArts.get(key);
    if (!t) { const drawn = this.sigilInk.get(id)?.[tier]; t = sigilTexture(id, SIGIL_TIERS[tier].px, tier, drawn && drawn.px === SIGIL_TIERS[tier].px ? drawn.ink : undefined); this.sigilArts.set(key, t); }
    return t;
  }

  /** A voyage's line on the water: a gentle curve from one island's shore to the other's, the current flowing along it. */
  private voyage(a: Isle, b: Isle): THREE.Mesh {
    const A = new THREE.Vector2(a.x, a.z), B = new THREE.Vector2(b.x, b.z), dir = B.clone().sub(A), len = dir.length(), n = new THREE.Vector2(-dir.y, dir.x).normalize();
    const mid = A.clone().add(B).multiplyScalar(0.5).add(n.multiplyScalar(len * 0.12));
    const N = 48, Wd = 0.9, pos: number[] = [], uv: number[] = [], along: number[] = [], idx: number[] = [];
    const at = (t: number) => { const u = 1 - t; return new THREE.Vector2(u * u * A.x + 2 * u * t * mid.x + t * t * B.x, u * u * A.y + 2 * u * t * mid.y + t * t * B.y); };
    const t0 = a.reach / len * 1.1, t1 = 1 - (b.reach / len) * 1.1; // (from shore to shore)
    for (let i = 0; i <= N; i++) {
      const t = t0 + (t1 - t0) * (i / N), p = at(t), q = at(Math.min(1, t + 0.01)), tg = q.sub(p).normalize(), side = new THREE.Vector2(-tg.y, tg.x).multiplyScalar(Wd);
      pos.push(p.x + side.x, 0.2, p.y + side.y, p.x - side.x, 0.2, p.y - side.y); uv.push(i / N, 0, i / N, 1); along.push(t * len, t * len);
      if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); geo.setAttribute("aAlong", new THREE.Float32BufferAttribute(along, 1)); geo.setIndex(idx);
    const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: LINE_VERT, fragmentShader: LINE_FRAG, uniforms: { uTime: this.uTime, uColour: { value: new THREE.Color(1, 0.72, 0.38) } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    this.scene.add(m);
    return m;
  }

  /** Back to as it was made, for the next opening (takeSeaChart): no islands or voyages, nothing chosen, no flight, the camera
   *  where it opens, the moon to rise again. What it has compiled stays: the islands' materials are taken out, not disposed. */
  reset(): void {
    this.set([], []);
    this.selected = null; this.flight = null; this.orbit = 0; this.yaw = 0; this.pitch = 0.95;
    this.focus.set(0, 0, 0); this.aim.set(0, 0, 0); this.sized = false; this.moonLast = undefined; this.stillMoon = null;
  }

  /** Let go of everything it holds on the GPU (its meshes, materials, textures, render targets and the context). */
  dispose(): void {
    this.scene.traverse(o => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      for (const mat of ([] as THREE.Material[]).concat((m.material as THREE.Material | THREE.Material[]) ?? [])) {
        for (const v of Object.values(mat)) if (v instanceof THREE.Texture) v.dispose();
        mat.dispose();
      }
    });
    this.glow.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  /** Sail to an island (Ed, 2026-10-12): the camera glides over to frame it while its sigil settles onto its dancefloor (a glow
   *  at its middle, where the chart's island has its dancefloor), swoops down and round to the sea off its south coast, its land
   *  easing to its true heights, and runs on north toward the coast; then `done` with the camera in the game's terms and the last
   *  frame, for the game to carry on from. False if it's not an island here. */
  fly(id: string, done: (end: FlightEnd) => void, o: FlyOptions = {}): boolean {
    const i = this.isles.get(id); if (!i) return false;
    this.select(id); this.orbit = 0; this.yaw = 0;
    const { keys, G } = this.flightKeys(i, o);
    // its dancefloor: a ring of party light at its middle (about the real one's size, a little more to show from up high)
    const floor = new THREE.Group(), y = G ? (() => { const r = Math.round(-G.z0 / G.step), c = Math.round(-G.x0 / G.step); return 0.06 + Math.max(0, G.h[r * G.cols + c] ?? 0) * K * RELIEF; })() : i.top;
    const disc = new THREE.Mesh(new THREE.CircleGeometry(1, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 0.5, 1.2), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(5, 5).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: this.glow, color: new THREE.Color(0.7, 0.4, 1), transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    floor.add(disc, halo); floor.position.y = y + 0.05; floor.scale.setScalar(22 * K); i.group.add(floor);
    this.flight = { id, t: 0, keys, done, speed: (FLY.onward * 2) / FLY.run, floor, size: i.size ?? 1, rate: 1, wall: 0, hold: o.hold, slow: o.slow };
    return true;
  }

  /** A flight's legs to island `i` (fly): from the camera now, framing it, swooping down to the sea off its south coast, and the run
   *  on north to the hand-off; and its heights' grid. */
  private flightKeys(i: Isle, o: FlyOptions): { keys: Flight["keys"]; G: NonNullable<ChartIsland["outline"]>["ground"] | undefined } {
    // the south coast below the dancefloor: the southmost land in the grid's columns round its middle, else its box
    const G = i.d.outline?.ground; let coast = i.d.outline ? i.d.outline.box.maxZ : i.reach / K;
    if (G) {
      // (walking south from the dancefloor down its own column to the first sea: the shore straight below it, not a cape beside it)
      const c0 = Math.round(-G.x0 / G.step);
      for (let r = Math.max(0, Math.round(-G.z0 / G.step)); r < G.rows; r++) if (!(G.h[r * G.cols + c0] > 0)) { coast = G.z0 + r * G.step; break; }
    }
    const pitch = THREE.MathUtils.degToRad(o.pitchDeg ?? FLY.pitchDeg), dist = (o.dist ?? FLY.dist) * K, z3 = i.z + (coast + (o.sea ?? -FLY.inland)) * K, z2 = z3 + FLY.onward * K;
    const keys: Flight["keys"] = [
      { x: this.focus.x, z: this.focus.z, dist: this.dist, pitch: this.pitch, at: 0, ease: smoothstep },
      { x: i.x, z: i.z, dist: Math.max(CLOSEST, i.reach * 4.2), pitch: 0.95, at: FLY.frame, ease: smoothstep },
      { x: i.x, z: z2, dist, pitch, at: FLY.frame + FLY.swoop, ease: smoothstep },
      { x: i.x, z: z3, dist, pitch, at: FLY.frame + FLY.swoop + FLY.run, ease: easeIn },
    ];
    return { keys, G };
  }

  /** Where a flight to `id` would hand over (fly's `done`'s camera, at its full pace), before it's flown: for the game to draw its
   *  first frames there ahead, under the chart (main.ts). Null if it's not an island here. */
  flightEnd(id: string, o: FlyOptions = {}): FlightEnd["cam"] | null {
    const i = this.isles.get(id); if (!i) return null;
    const e = this.flightKeys(i, o).keys.at(-1)!;
    return { x: 0, z: (e.z + Math.cos(e.pitch) * e.dist - i.z) / K, height: (Math.sin(e.pitch) * e.dist) / K, pitch: e.pitch, fov: this.camera.fov, speed: (FLY.onward * 2) / FLY.run };
  }
  /** Any key or tap during a flight: straight to its end. */
  skipFlight(): void { if (this.flight) { this.flight.t = this.flight.keys.at(-1)!.at; this.flight.rate = 1; this.flight.slow = undefined; this.flight.held = false; } }

  /** The flight's frame: the camera along its legs; the island's land easing to its true heights; its sigil settling. */
  private flyFrame(dt: number, time: number): void {
    const f = this.flight!, i = this.isles.get(f.id)!, end = f.keys.at(-1)!.at;
    // (its pace: down to slow.rate from the end of the glide in while the game isn't ready, for at most slow.cap seconds; eased)
    f.wall += dt;
    const S = f.slow, held = !!S && f.t >= f.keys[1].at && f.wall < S.cap && !!f.hold?.();
    // (held to its last second, it slows on into a hover short of the hand-off, the sea still moving under it, and goes on as it's ready)
    if (S) f.rate += ((held ? S.rate * Math.min(1, (end - f.t) / 1) : 1) - f.rate) * (1 - Math.exp(-dt / Math.max(0.01, S.ease)));
    f.held = held;
    f.t = Math.min(end, f.t + dt * f.rate);
    let n = 1; while (n < f.keys.length - 1 && f.t > f.keys[n].at) n++;
    const a = f.keys[n - 1], b = f.keys[n], u = b.ease(Math.min(1, Math.max(0, (f.t - a.at) / (b.at - a.at))));
    const L = (p: number, q: number) => p + (q - p) * u;
    this.focus.set(L(a.x, b.x), 0, L(a.z, b.z)); this.aim.copy(this.focus); this.dist = this.distTo = L(a.dist, b.dist); this.pitch = L(a.pitch, b.pitch);
    const lowered = smoothstep(Math.min(1, Math.max(0, (f.t - f.keys[1].at) / (f.keys[2].at - f.keys[1].at))));
    i.group.scale.y = 1 + (1 / RELIEF - 1) * lowered; // (the chart's heights are drawn five times over; the game's are true)
    const settle = smoothstep(Math.min(1, f.t / f.keys[1].at));
    if (i.sigil) { const s = 1 + ((60 * K) / f.size - 1) * settle; i.sigil.scale.set(s, 1, s); i.glow?.scale.set(s, 1, s); }
    f.floor.rotation.y = time * 0.6; (f.floor.children[0] as THREE.Mesh).scale.setScalar(0.9 + 0.1 * Math.sin(time * 6));
  }

  /** Choose an island: the camera glides to it; the ring goes round it. */
  select(id: string | null, instant = false): void {
    this.selected = id && this.isles.has(id) ? id : null;
    const i = this.selected ? this.isles.get(this.selected)! : null;
    this.aim.set(i ? i.x : 0, 0, i ? i.z : 0);
    if (instant) this.focus.copy(this.aim);
  }
  /** Nearer or further (a share of the default), within reason. */
  zoom(k: number): void { this.distTo = Math.max(CLOSEST, Math.min(this.distMax, this.distTo * k)); }

  /** The island under a point on the canvas (CSS pixels), or null. */
  pick(clientX: number, clientY: number): string | null {
    const r = this.canvas.getBoundingClientRect(), ndc = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const hit = ray.intersectObjects([...this.isles.values()].flatMap(i => (i.pick ? [i.pick] : [])), false)[0];
    if (hit) for (const [id, i] of this.isles) if (i.pick === hit.object) return id;
    // else the nearest island to where the ray meets the sea, if it's close (small islands are hard to tap)
    const p = new THREE.Vector3(); if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), p)) return null;
    let best: string | null = null, bd = Infinity;
    for (const [id, i] of this.isles) { const d = Math.hypot(i.x - p.x, i.z - p.z) - i.reach; if (d < bd) { bd = d; best = id; } }
    return bd < 6 ? best : null;
  }

  /** Where each island is on the screen (CSS pixels from the canvas's top left), for labels. */
  /** The moon's disc on screen (client pixels: its middle and radius), or null when it isn't drawn (behind the world, or no
   *  disc). As the sky shader draws it (SKY_FRAG: R = 0.045 of the height); for the map table's chart, which draws it again
   *  over its soft edge (Ed, 2026-10-23: "The chart has an orbiting moon; this is exempt from the fading out"). */
  moonDisc(): { x: number; y: number; r: number } | null {
    const d = this.skyU.uMoon.value as THREE.Vector2;
    if (d.x < 0 || d.x > 1 || d.y < 0 || d.y > 1) return null;
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + d.x * r.width, y: r.top + (1 - d.y) * r.height, r: 0.045 * r.height };
  }
  screenOf(id: string): { x: number; y: number } | null {
    const i = this.isles.get(id); if (!i) return null;
    const v = new THREE.Vector3(i.x, i.top, i.z).project(this.camera), r = this.canvas.getBoundingClientRect();
    return { x: ((v.x + 1) / 2) * r.width, y: ((1 - v.y) / 2) * r.height };
  }

  /** The size the canvas and the post pass were last made at (art pixels). */
  private made = { w: 0, h: 0 };
  /** Fit the canvas (CSS pixels): the scene at low resolution, scaled up with whole pixels. */
  resize(cssW: number, cssH: number): void {
    const p = CHART_PIXEL, w = Math.max(1, Math.ceil(cssW / p)), h = Math.max(1, Math.ceil(cssH / p));
    if (this.sized && w === this.w && h === this.h) return;
    this.w = w; this.h = h;
    // (the canvas and the post pass's targets only when their size changes: sized again, they're made again, seconds on a software
    // renderer, and the chart kept between openings opens at the size it was made at)
    if (this.made.w !== w || this.made.h !== h) { this.renderer.setSize(w, h, false); this.post.resize(w, h, w, h); this.made = { w, h }; }
    this.canvas.style.width = `${this.w * p}px`; this.canvas.style.height = `${this.h * p}px`;
    this.camera.aspect = this.w / this.h; this.camera.updateProjectionMatrix();
    (this.skyU.uRes.value as THREE.Vector2).set(this.w, this.h);
    this.postTuning.bloom.strength = this.tuning.bloom.strength * Math.max(0.3, Math.min(1, (this.h - 60) / 180));
    // how far the camera stands for a sigil to span so many art pixels across (a flat sigil keeps its width as it tilts away)
    const at = (px: number) => (SIGIL_TYPICAL * this.h) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * px);
    const was = this.distOpen;
    this.distOpen = at(SIGIL_OPEN_PX); this.distMax = at(SIGIL_MIN_PX);
    if (!this.sized) { this.dist = this.distTo = this.distOpen; this.sized = true; }
    else { this.distTo = Math.max(CLOSEST, Math.min(this.distMax, this.distTo * (this.distOpen / was))); this.dist = this.distTo; }
  }

  /** A frame: the camera eases toward the chosen island, the sea moves, the sigils pulse. */
  frame(dt: number, time: number): void {
    this.uTime.value = time; this.now = time;
    const k = 1 - Math.exp(-dt * 3.2);
    if (this.flight) this.flyFrame(dt, time);
    else { this.focus.lerp(this.aim, k); this.dist += (this.distTo - this.dist) * k; }
    // tilted down, looking north (-z), never turning (as the game's camera)
    this.yaw += dt * this.orbit;
    const back = Math.cos(this.pitch) * this.dist, sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    this.camera.position.set(this.focus.x + back * sy, this.focus.y + Math.sin(this.pitch) * this.dist, this.focus.z + back * cy);
    const ahead = this.orbit || this.flight ? 0 : this.dist * 0.035; // (the chosen island a little above the middle, clear of its card)
    this.camera.lookAt(this.focus.x, 0, this.focus.z + ahead);
    // the depth range round what it's looking at (from one island close in to the whole sea: a fixed range would lose the
    // precision to keep the rings and the shallows off the water)
    const near = Math.max(0.5, this.dist * 0.25), far = this.dist * 3 + 400;
    if (Math.abs(near - this.camera.near) > 0.01 || Math.abs(far - this.camera.far) > 1) { this.camera.near = near; this.camera.far = far; this.camera.updateProjectionMatrix(); }
    this.post.lift = 0; // (the ground's gentler tilt-shift: the sigils off the middle still read)
    for (const i of this.isles.values()) {
      const pulse = 0.85 + 0.15 * Math.sin(time * 1.6 + i.x * 0.1), chosen = i.d.id === this.selected;
      let fade = 1;
      if (i.sigil) {
        const m = i.sigil.material as THREE.MeshBasicMaterial;
        // its art by how big it shows (a texture about as many pixels as it spans)
        const px = (i.size! * this.h) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * this.camera.position.distanceTo(tmp.set(i.x, i.top, i.z)));
        fade = px > 220 ? Math.max(0, 1 - (px - 220) / 260) : 1; // (close in, it fades away: the land is the thing to see)
        m.opacity = pulse * fade;
        i.sigil.visible = fade > 0;
        let tier = 0; for (let t = 1; t < SIGIL_TIERS.length; t++) if (px >= SIGIL_TIERS[t].from) tier = t;
        if (tier !== i.tier) { i.tier = tier; m.map = this.sigilArt(i.d.sigil, tier); m.needsUpdate = true; }
      }
      if (i.glow) { (i.glow.material as THREE.MeshBasicMaterial).opacity = (chosen ? 0.85 : 0.7) * pulse * fade; i.glow.visible = i.sigil?.visible ?? true; }
      // Its land just come (Ed, 2026-10-13: each island "emerges from under the sea"): the whole island, shallows and all, rises from
      // under the water plane over RISE seconds, easing out, the sea hiding what's still below; its shadows drawn once it's up.
      let lift = 0;
      if (i.rose !== undefined) { const u = Math.min(1, (time - i.rose) / RISE), e = 1 - (1 - u) ** 3; lift = -(i.top + 0.6) * (1 - e); if (u >= 1) i.rose = undefined; }
      i.group.position.y = lift + (chosen ? Math.sin(time * 2) * 0.12 : 0);
    }
    const sel = this.selected ? this.isles.get(this.selected) : null;
    this.ring.visible = !!sel && !this.flight;
    if (sel) { const r = sel.reach * 1.6 * (1 + 0.04 * Math.sin(time * 3)); this.ring.position.set(sel.x, 0.15, sel.z); this.ring.scale.set(r, 1, r); (this.ring.material as THREE.MeshBasicMaterial).opacity = 0.7 + 0.3 * Math.sin(time * 3); }
    this.moonFrame(time);
    this.post.render(this.scene, this.camera);
    const f = this.flight;
    if (f && f.t >= f.keys.at(-1)!.at && !f.held) { // (landed: hand over, in the game's terms, with this frame)
      const i = this.isles.get(f.id)!, p = this.camera.position;
      this.flight = null;
      f.done({ cam: { x: (p.x - i.x) / K, z: (p.z - i.z) / K, height: p.y / K, pitch: this.pitch, fov: this.camera.fov, speed: f.speed * f.rate }, still: this.canvas.toDataURL("image/jpeg", 0.88) });
    }
  }
}

// The full chart's renderer, made once a page (the chart meshes job, 2026-10-19): a new WebGL context and the chart's shaders
// compiled were most of the wait between E at the map table and the chart showing (getContext, getExtension and the programs'
// links: 2 to 4 s on the cloud's software renderer, every time it opened). So the chart over the game and chart.html share one
// SeaChart, prepared ahead (prepareSeaChart: while the start screen shows) with a stand-in island of each kind drawn once, so
// every program it needs is linked; each opening takes it (takeSeaChart) and gives it back reset (releaseSeaChart). The map
// table's miniature keeps its own.
let pooled: { chart: SeaChart; busy: boolean; /** being prepared (taken meanwhile: the opening has it, the preparing stops) */ prep?: boolean } | null = null;
/** The page's full chart: its own canvas, taken until given back (a second while it's out: one of its own, disposed after). */
export function takeSeaChart(tuning: ChartTuning): SeaChart {
  if (pooled?.prep) { pooled.prep = false; return pooled.chart; } // (still busy: now the opening's)
  if (pooled && !pooled.busy) { pooled.busy = true; return pooled.chart; }
  if (pooled) return new SeaChart(document.createElement("canvas"), tuning);
  pooled = { chart: new SeaChart(document.createElement("canvas"), tuning), busy: true };
  return pooled.chart;
}
/** Give the chart back for the next opening (reset), or dispose it if it was a spare. */
export function releaseSeaChart(chart: SeaChart): void {
  if (pooled?.chart !== chart) { chart.dispose(); return; }
  chart.reset(); pooled.busy = false;
}
/** A stand-in island (a small heightfield with a lake of each look, sailable, won): its materials, drawn once, link the islands' programs. */
function standIn(id: string, x: number): ChartIsland {
  const cols = 9, rows = 9, n = cols * rows, h = new Float32Array(n), water = new Uint8Array(n), level = new Float32Array(n), looks = new Uint8Array(n), rgb = new Uint8Array(n * 3).fill(120);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c, d = Math.hypot(c - 4, r - 4); h[i] = d < 3.5 ? 40 - d * 8 : -20; if (d < 1.2) { water[i] = 2; level[i] = h[i] + 2; looks[i] = 1; } else if (h[i] <= 0) water[i] = 1; }
  const ground = { x0: -400, z0: -400, step: 100, cols, rows, h, rgb, water, level, looks };
  const loop = new Float32Array([-300, 0, 0, -300, 300, 0, 0, 300]);
  return { id, x, y: 0, phase: 1, radii: [1, 1, 1, 1], sail: true, unknown: false, won: true, sigil: "home", outline: { loops: [{ pts: loop, sea: true }], box: { minX: -300, maxX: 300, minZ: -300, maxZ: 300 }, ground, mesh: buildIslandMesh(ground, K) } };
}
/** Make the page's full chart ahead, and link its programs: drawn once, small, with two stand-in islands and a voyage between.
 *  In the background where the browser can (compileAsync), then one frame for the rest (the post pass, the moon's height map). */
export async function prepareSeaChart(tuning: ChartTuning): Promise<void> {
  if (pooled) return;
  const chart = takeSeaChart(tuning), mine = pooled!;
  mine.prep = true;
  try {
    chart.resize(innerWidth * 0.92 - 4, innerHeight * 0.92 - 4); // (the size it opens at over the game, ui/chartOverlay.ts: 4vw and 4vh in, inside a 2 px border; so not made again as it opens)
    chart.set([standIn("home", 0), standIn("standIn", 0.2)], [{ from: "home", to: "standIn" }]);
    const scenes = chart as unknown as { scene: THREE.Scene; hScene: THREE.Scene };
    await Promise.all([scenes.scene, scenes.hScene].map(sc => chart.renderer.compileAsync(sc, chart.camera))).catch(() => { /* (linked on first use, below) */ });
    if (!mine.prep) return; // (opened meanwhile: the chart's its now)
    chart.frame(1 / 60, 0); chart.frame(1 / 60, 3); // (the second once the moon's height map is due: its program too)
    for (const p of (chart.renderer.info as unknown as { programs?: { getUniforms(): unknown }[] }).programs ?? []) p.getUniforms(); // (each program's link waited for now, not on the chart's first frame)
  } finally {
    if (mine.prep) { mine.prep = false; releaseSeaChart(chart); performance.mark("witch:chart-prepared"); }
  }
}
