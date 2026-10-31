// The forest floor: one plane under the whole map, coloured per pixel in the shader from the
// Art Lab's ground recipe (noisy patches, each area's own tint, paler in clearings, a pale ring
// for the dancefloor), on the art's pixel grid so it reads as pixel art.
//
// Which area each spot belongs to comes from a data texture filled in small tiles near the
// camera (working the partition out for the whole map at once takes seconds on a phone).
import * as THREE from "three";
import { gpuKind } from "./gpuLedger";
import { BAYER_GLSL, VALUE_NOISE_GLSL } from "./shaders";
import { CARVING_SIZE, carvingMask } from "./legendCarving";
import { legendSigilStrokes } from "../../art/generator.js";
import type { FloorLook } from "./legendFloor";
import * as Art from "../../art/generator.js";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import { HOME_LOOK, LOOKS } from "../rules/map";
import { ZOO_CONFIG } from "../rules/zoo";
import { speakerRadius } from "../rules/speakers";
import type { Beach } from "../rules/mapShape";
import { lakeKnobs } from "../rules/lakes";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { LOADING_LIGHT_GLSL } from './loadingLight';
import { FX_UNIFORMS, FX_FIELD_GLSL } from "./fx/uniforms";
import { NATIVE_GLSL, nativeFxUniforms } from "./fx/native";
import { LAKE_LOOKS_GLSL, lakeLookTexture, lakeLooksOf } from "./lakeLooks";
import { groundKoi, groundPavementRadius, groundProgramDefines } from './groundRecipe';
import { CoastReadiness } from './coastReadiness';
import { materialProgramsReady } from './shaderDrawGate';
import { HEIGHT_GLSL, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import type { TilePixels } from "./artBuild";
import type { Style } from "./style";
import { later, runSync, settle, type Later, type Steps } from "./slices";
import { discoDrawn, pixelCanvas, type DiscoDrawn } from "./islandArt";
import type { ArtJob, ArtResult } from "./artBuild";
import { AREA_GLSL, AREA_TILE, AreaWindow, areaTexel } from "./areaWindow";

/** How much smaller her warm pool is on the open sand than on the forest floor (the beach's: render/ground.ts). */
const BEACH_POOL = 2.2;

/** The area texture's windows (render/areaWindow.ts): the near one at 2 texels a metre (as the whole map's was: a little under on the
 *  biggest maps), NEAR_TILES of its 32-texel tiles a side (1 km), moved NEAR_STEP tiles at a time, so it always holds 448 m round her, past the haze's far edge (the
 *  ground beyond it is all haze: lighting.ts haze; tuning haze.far 360 m, the spooky mood's 200); and the far one, for the
 *  telescope's view across the island (its haze at 1000 m), at 4 m a texel, FAR_TILES a side (2.6 km): 8 MB and 0.8 MB. */
const NEAR_TPM = 2, NEAR_TILES = 64, NEAR_STEP = 4, FAR_TPM = 0.25, FAR_TILES = 20, FAR_STEP = 2;
const FLOOR_COLS = 8;
const TYPE_SLOTS = Math.max(32, LOOKS.length); // a slot per area type and home's look (area recipes can add types)
const FLOOR_ROWS = Math.ceil(TYPE_SLOTS / FLOOR_COLS);
const FLOOR_VARIANTS = 4; // each type's floor: this many tiles side by side (art/areas.js FLOOR_VARIANTS), one picked per repeat of the tile

// The ground's grid: GRID metres a square, out to REACH metres round the witch (past the haze's
// far edge), its outermost ring stretched out to SKIRT metres; it follows her, snapped to its squares.
const GRID = 4, REACH = 400, SKIRT = 2000;

const VERT = /* glsl */ `
varying vec3 vWorld;
${HEIGHT_VERT_GLSL}
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  w.y += groundH(w.xz); // the rolling ground (height.ts)
  vWorld = w.xyz;
  gl_Position = clipOf(w.xyz);
}
`;

const FRAG = /* glsl */ `
${AREA_GLSL}
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[${TYPE_SLOTS}];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[${TYPE_SLOTS}];
uniform vec3 uTerrain[${TYPE_SLOTS}];        // each type's ground features: mounds, hollows, ridges (0 or 1)
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
uniform vec4 uCircle; // magic circle: hue, second hue, brightness (pulsing), rune band's turn (radians)
uniform vec4 uBeach; // the beach round the island: .x on (1) or off (0), .y how far past the coast the sea starts, .z half the land map's step (metres), .w the sand's grain
uniform vec4 uLandBox; // the land map's grid (rules/land.ts): its first sample's x, z, and 1 over its width and depth (metres)
uniform sampler2D uLand; // the land map: r, the signed distance to the coast (+ on land); g, the sand's width there; ba, the way to the nearest point of the coast (m; rules/mapShape.ts beachOf)
uniform vec4 uLake; // the lakes (rules/lakes.ts): .x on (1) or off, .y half their map's step (metres)
uniform vec4 uLakeBox; // the lakes' map's grid: its first sample's x, z, and 1 over its width and depth (metres)
uniform sampler2D uLakes; // the lakes' map: r, how far into a lake (+ on the water, - ashore)
uniform vec4 uKoi[8]; // the lakes with koi (rules/lakes.ts koiPonds): where they swim round, how far out (0: none), a seed and how many (seed + count / 10)
uniform float uKoiSize; // a koi's scale: its length (m) over the shape's 1.12 (koiScale: a baby creature's size)
uniform vec3 uMoonRoad; // the sky's moon on the screen (its x, a fraction from the left), the picture's width (px), 1 while it's up
// The sleeping legends' clearings near her (Ed, 2026-10-06; rules/map.ts legendClearings): middle x, z, radius, ring width;
// uLegendGlow: each one's ring brightening (0 to 1), when she stands in it.
uniform vec4 uLegendRings[6];
uniform float uLegendGlow[6];
uniform int uLegendRingCount;
// Their floors (Ed, 2026-10-06: weathered, mossy stone with the legend's sigil carved into it, covered so you can't see it
// clearly): uLegendCarve holds each nearby circle's carving mask, side by side (render/legendCarving.ts); uLegendFloor:
// on, overgrowth (0.5 as drawn; more covers more), the flagstones' size (metres); uLegendGlint: each one's grooves
// catching the light (0 off: the tuning's knob, only while its legend sleeps).
uniform sampler2D uLegendCarve;
// The zoo's undiscovered islands (rules/zooMap.ts; Ed, 2026-10-26: "the animal's sigil drawn faintly on the water"): the nearest
// four lakes' middles, the sigil's radius (0: none), and their sigils' masks side by side in uLakeCarve.
uniform vec4 uLakeSigil[4];
uniform sampler2D uLakeCarve;
uniform vec4 uLegendFloor;
uniform float uLegendGlint[6];
// Each one's character, by its area (render/legendFloor.ts): its stone (rgb; a: wet, puddles), its debris (rgb; a: shape,
// 0 leaves, 1 needles, 2 pebbles, 3 flowers), and its growth (x: litter, y: cover, z: 1 lichen and dry grass, 0 moss).
uniform vec4 uLegendStone[6];
uniform vec4 uLegendDebris[6];
uniform vec4 uLegendGrowth[6];

uniform vec4 uCanopy; // canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing; // clearingSize, clearingFalloff: where trees, and so canopy, begin
uniform vec4 uBlend; // ground blend: warp, fine (metres), band (metres), dither (0 or 1)
// The dancefloor's glass tiles (Ed, v160): the art's unlit floor (tiles, grout, rim) from above, the
// lit tile's look at intensities 1 to 3 side by side, and this frame's tiles from the engine
// (rgb, and intensity x 85 in alpha); geometry: metres a tile, art px a tile (pitch), the floor
// texture's size, the grid's origin in it (px); and the rim's outer radius (px).
uniform sampler2D uDiscoBase, uDiscoLit, uDiscoTiles;
uniform vec4 uDiscoGeom;
uniform float uDiscoRim;
// The plaza round the floor (Ed, 2026-10-04): rings of flagstones from the rim out past the speakers.
// uPave: inner and outer radius, course depth, stone length (metres); uPave2: ragged edge (metres),
// share of the outer stones missing, share mossy, the speakers' radius; on when uPave.y > 0.
uniform vec4 uPave, uPave2;
uniform vec4 uZooPlaza;       // the zoo's plaza (render/ground.ts plazaSigil): its middle (x, z), radius (m), on
uniform sampler2D uPlazaSigil; // the World Tree's sigil, its lines 1
uniform vec4 uZooStreet; // the zoo (rules/zooMap.ts): on, home's look (its streets), how far past the disc's coast its water falls off (m)
uniform vec3 uPaveStone, uPaveDark, uPaveMoss, uPaveGrout;
uniform vec3 uRelief; // the ground's relief: strength, scale (metres), shade
uniform float uHillShade; // the hills' slopes in the light, exaggerated this much
uniform float uBare;  // ?bare=2: a flat grey ground with contour lines (0.5 m) and a 10 m grid
varying vec3 vWorld;
${LIGHT_GLSL}
${FX_FIELD_GLSL}
${NATIVE_GLSL}
${HEIGHT_GLSL}
${VALUE_NOISE_GLSL}${BAYER_GLSL}vec3 hsv(float h, float s, float v) {
  vec3 k = clamp(abs(mod(fract(h) * 6.0 + vec3(0, 4, 2), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return clamp(v, 0.0, 1.0) * mix(vec3(1.0), k, clamp(s, 0.0, 1.0));
}
#ifdef GROUND_LAKES
#if defined(GROUND_LAKE_ICE) || defined(GROUND_LAKE_LAVA) || defined(GROUND_LAKE_OASIS) || defined(GROUND_LAKE_SINKHOLE) || defined(GROUND_LAKE_TARN) || defined(GROUND_LAKE_TAR) || defined(GROUND_LAKE_RUST) || defined(GROUND_LAKE_LILY)
${LAKE_LOOKS_GLSL}
#endif
/** How much of a zoo lake's sigil is under p (0 to 1): faint, its lines wavering with the water. */
float lakeSigil(vec2 p) {
  for (int i = 0; i < 4; i++) {
    vec4 S = uLakeSigil[i];
    if (S.z <= 0.0) continue;
    vec2 q = p - S.xy + vec2(sin(p.y * 0.35 + uTime * 0.8), sin(p.x * 0.3 + uTime * 0.7)) * 0.35; // (rippled)
    vec2 uv = q / S.z * 0.5 + 0.5;
    if (uv.x <= 0.0 || uv.x >= 1.0 || uv.y <= 0.0 || uv.y >= 1.0) continue;
    return texture2D(uLakeCarve, vec2((float(i) + uv.x) / 4.0, uv.y)).r;
  }
  return 0.0;
}
#endif
void main() {
  vec2 px = floor(vWorld.xz / uPixel);           // the art pixel this fragment is in
  vec2 p = (px + 0.5) * uPixel;                   // its centre, in metres
  // Wobble the lookup a little so area borders read as ragged, not as the texture's grid.
  vec2 j = vec2(vnoise(px / 5.0) - 0.5, vnoise(px / 5.0 + 17.0) - 0.5) * 0.9;
  // The beach and the sea (Ed, 2026-10-06; on only while she's near the edge: render/beach.ts).
  float shoreNear = 0.0; // (the forest floor near the sand: more moonlight, greener; Ed, 2026-10-06: "the forest still shows greens rather than black")
#ifdef GROUND_BEACH
  if (uBeach.x > 0.0) {
    // How many art pixels one screen pixel spans, across and down (taken here, in uniform flow: the branch is on a uniform): over 1 when the camera is far
    // back or low (the beach's, stargazing), where art-pixel-fine patterns would alias into stripes. The sand and sea draw on a
    // coarser grid instead (sandCell: the art pixel doubled until it's at least a screen pixel; Ed, 2026-10-12: "The beach is not
    // pixelated like everything else"), so their grain stays chunky and fixed to the world rather than fading to smooth.
    vec2 sandCell = exp2(ceil(log2(max(vec2(1.0), vec2(fwidth(vWorld.x), fwidth(vWorld.z)) / uPixel))));
    // (from the land map: how far past the coast this is (bd: + out to sea), where the sand starts (sand: its width in from the
    // coast) and the sea (shore); off the map's grid, the sea, deeper the further off)
    vec2 luv = (p - uLandBox.xy + uBeach.z) * uLandBox.zw, cuv = clamp(luv, vec2(0.0), vec2(1.0));
    vec4 land = texture2D(uLand, cuv);
    float bd = -land.r + length((luv - cuv) / uLandBox.zw), sandW = land.g, sand = -sandW, shore = uBeach.y;
    vec2 cpt = p + land.ba; // (the nearest point of the coast: the scallop and the waves' timing go by it, the same all the way in)
    // The woods' edge (Ed, 2026-10-06: "The transition between beach and forest looks odd", with a photo of a real beach forest):
    // no speckled band; a clean, scalloped line, the bushes along it (render/beach.ts) spilling over it, a strip of beach
    // grass on the woods' side, and on the sand a soft dappled shadow under them before the clean pale sand.
    float into = bd - sand - ((vnoise(cpt / 7.0 + 3.0) - 0.5) * 7.0 + (vnoise(cpt / 2.3 + 11.0) - 0.5) * 2.0) * clamp(sandW / 24.0, 0.3, 1.0); // metres past the line, sand side (scalloped less where the sand's narrow: render/beachEdge.ts scallop)
    shoreNear = 1.0 - smoothstep(0.0, 16.0, -into);
    // (the zoo's edge, Ed 2026-10-26: "all around the flagstones give way to water, which falls off the disc as a waterfall, and
    // behind that is space": past its lip, space, its stars fixed to the sky, not the ground; the fall is render/zooFences.ts)
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_ZOO_STREET)
    if (uZooStreet.x > 0.5 && bd > uZooStreet.z) {
      if (bd < uZooStreet.z + 55.0) discard; // (the water pouring over the lip shows here, curving down below: render/zooFences.ts ZooFall)
      vec3 V = normalize(vec3(p.x, vWorld.y, p.y) - cameraPosition);
      vec2 sc = floor(V.xz / max(0.05, -V.y + 0.3) * 90.0);
      float hs = fract(sin(dot(sc, vec2(12.9898, 78.233))) * 43758.5453);
      vec3 sp = vec3(0.016, 0.015, 0.035) + vec3(0.03, 0.03, 0.06) * vnoise(V.xz * 6.0);
      if (hs > 0.993) sp += vec3(0.55, 0.58, 0.7) * (0.6 + 0.4 * sin(uTime * 1.7 + hs * 80.0));
      gl_FragColor = vec4(sp, 1.0);
      return;
    }
#endif
    if (uZooStreet.x < 0.5 && into <= 0.0 && into > -2.6) {
      // The beach grass: a strip of tussocks, blades lighter and darker, sand showing through at its outer edge.
      vec2 bp = floor(px / vec2(1.0, 2.0));
      float hb = fract(sin(dot(bp, vec2(12.9898, 78.233))) * 43758.5453), tuft = vnoise(p / 1.3 + 41.0);
      vec3 gcol = mix(vec3(0.2, 0.31, 0.2), vec3(0.34, 0.45, 0.27), step(0.62, hb)) * (0.85 + 0.3 * tuft);
      if (into > -0.9 && tuft < 0.45 + into * 0.4) gcol = vec3(0.45, 0.44, 0.4); // (the sand between the outer tussocks)
      vec3 glit = max(nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, 1.0), vec3(0.24, 0.26, 0.3));
      gl_FragColor = vec4(haze(glowPool(min(vec3(1.0), gcol * glit * 1.2), vWorld), vWorld), 1.0);
      return;
    }
    if (into > 0.0) {
      px = floor(vWorld.xz / (uPixel * sandCell)) * sandCell; // (the sand and sea's art pixel, never finer than the screen's)
      // The water's edge: a calm wave running up the sand and back, every seven seconds or so.
      float lap = 0.5 + 0.5 * sin(uTime * 0.9 + vnoise(cpt / 60.0 + 7.0) * 6.0);
      float front = shore - 1.0 - 4.0 * lap;
      vec3 col;
      if (bd > front + uPixel * 1.5) {
        // The sea: calm, a moonlit deep blue-teal (Ed's playtest, 2026-10-06: "The sea is too dark"), the night sky mirrored
        // in it (its glow low down, its stars, the moon's road), rippling, swells catching the light.
        vec3 V = normalize(cameraPosition - vec3(p.x, vWorld.y, p.y));
        vec2 rip = vec2(vnoise(p * vec2(0.3, 1.1) + vec2(uTime * 0.35, 0.0)), vnoise(p * vec2(0.22, 0.8) + vec2(0.0, uTime * 0.27) + 19.0)) - 0.5;
        vec3 R = reflect(-V, normalize(vec3(rip.x * 0.035, 1.0, rip.y * 0.08)));
        float up = clamp(R.y, 0.0, 1.0);
        col = mix(uHazeColour * 0.9 + vec3(0.1, 0.17, 0.22), vec3(0.09, 0.18, 0.26), smoothstep(0.0, 0.3, up)); // (the sky's glow low down, the deep blue-teal over most of it)
        col *= 0.9 + 0.25 * (rip.x + 0.5); // (its ripples, lighter and darker)
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_ZOO_STREET)
        if (uZooStreet.x > 0.5) {
          // The zoo's edge pouring off the disc (the coordinator, 2026-10-26: "the water visibly curving over the lip, falling
          // streaks below it, and the space beyond"; from her height a fall beyond a far edge hides behind it, so the water shows
          // its own pour): lines of current racing out to the lip, faster as it nears, the surface darkening as it tips over and its
          // lines stretching down it, and a crisp white crest on the lip itself (the mist above it: render/zooFences.ts ZooFall).
          vec2 out2 = normalize(p - uZooPlaza.xy);
          float tang = dot(p - uZooPlaza.xy, vec2(-out2.y, out2.x)), toLip = uZooStreet.z - bd, k = 1.0 - smoothstep(0.0, 26.0, toLip);
          vec2 cellP = floor(vec2(tang, bd) / (uPixel * sandCell)) * uPixel * sandCell; // (whole art pixels)
          float lane = vnoise(vec2(cellP.x * 0.7, 3.0)), flow = fract(cellP.y * (0.18 - 0.1 * k) - uTime * (0.35 + 1.6 * k * k) + lane * 7.0);
          float streak = step(1.0 - (0.12 + 0.35 * k * k), flow) * step(0.42, lane);
          float tip = smoothstep(9.0, 0.0, toLip); // (the last metres: the surface bending down over the lip)
          col *= 1.0 - 0.45 * tip;
          col = mix(col, vec3(0.62, 0.76, 0.86), streak * (0.45 + 0.4 * k));
          float crest = step(toLip, uPixel * sandCell.y * 2.5);
          col = mix(col, vec3(0.9, 0.96, 1.0), crest * (0.75 + 0.25 * vnoise(vec2(tang * 0.8, uTime * 3.0))));
        } // (the zoo's lip)
#endif
        vec2 sc = floor(R.xz / max(0.08, R.y) * 26.0);
        float hs = fract(sin(dot(sc, vec2(12.9898, 78.233))) * 43758.5453);
        if (hs > 0.9965) col += vec3(0.42, 0.46, 0.56) * (0.55 + 0.45 * sin(uTime * 2.3 + hs * 90.0)); // a star
        vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
        float spec = dot(R, moon);
        if (spec > 0.993) col = mix(col, uMoon + vec3(0.25), 0.8);
        else if (spec > 0.975) col = mix(col, uMoon * 0.7, 0.3);
        else if (mod(px.y, 6.0) < 1.0 && vnoise(px / vec2(9.0, 2.0) + vec2(uTime * 0.3, 0.0)) > 0.75) col += vec3(0.09, 0.13, 0.15); // a swell catching the light
        // The moon's road (Ed, 2026-10-07: "glints as small bright pixel sparkles in a moon path"): straight down the water
        // under the moon the sky draws, narrow far off and widening toward her, single art pixels sparkle and go out,
        // thickest on its line and thinning off it, each lit for a moment at its own time; warm white with the moon's
        // colour in it. By the screen, not the grazing reflection: a stargazer's camera sits a few metres over the water.
        float far = length(p - cameraPosition.xz), off = (gl_FragCoord.x / max(1.0, uMoonRoad.y) - uMoonRoad.x) / (0.02 + 3.0 / max(8.0, far));
        float road = uMoonRoad.z * exp(-off * off * 2.0);
        float gh = fract(sin(dot(px, vec2(27.17, 113.9))) * 43758.5453), tw = fract(gh * 7.0 + uTime * (0.6 + gh * 0.9));
        float glint = gh > 0.995 - road * 0.3 && tw < 0.45 ? (tw < 0.15 ? 1.0 : 0.65) : 0.0; // (put on after the haze: a spark punches through)
        if (glint == 0.0 && road > 0.25 && mod(px.y, 3.0) < 1.0 && vnoise(px / vec2(5.0, 1.0) + vec2(uTime * 0.5, 0.0)) > 0.65) col += uMoon * 0.22 * road; // the road's broken shimmer
        if (bd < front + 1.0 + lap) col = mix(col, vec3(0.42, 0.66, 0.7), 0.4); // the shallows over the sand
        // Over the water the far haze is thinner (the north beach's sea reads on the horizon, its road with it, rather than
        // fading into the sky's glow).
        gl_FragColor = vec4(mix(mix(col, haze(col, vWorld), 0.45), uMoon * 0.35 + vec3(0.85, 0.86, 0.82), glint), 1.0);
        return;
      }
      // The sand: moonlit, not sunlit (Ed, 2026-10-06: "The beach is very bright for nighttime"): a muted, cool, pale grey-beige
      // about as bright as the lighter forest floors, grains and drifts; dark where the waves have wet it, with the moon's sheen
      // on it, and a touch brighter toward the water, catching the moonlight off it; a line of foam at the water's edge; shells
      // and pebbles here and there. Her warm pool on it (glowPool) keeps the sand's own brightness, so it never blows it out.
      float g = vnoise(px / vec2(8.0, 5.0)) * 0.6 + vnoise(px / 1.7) * 0.4;
      col = vec3(0.6, 0.58, 0.54) * (g < 0.35 ? 0.93 : g > 0.68 ? 1.04 : 1.0);
      col *= 1.0 + uBeach.w * (fract(sin(dot(px, vec2(7.13, 157.7))) * 43758.5453) - 0.5); // a grain cell by cell (the tuning's beach.grain)
      if (mod(px.x + floor(vnoise(px / 9.0) * 6.0), 9.0) < 1.0 && vnoise(px / vec2(3.0, 14.0)) > 0.7) col *= 0.94; // ripples the wind left
      float wet = shore - 6.0 + vnoise(cpt / 20.0 + 1.0) * 1.5;
      if (bd > wet) col = mix(col, vec3(0.3, 0.31, 0.32), smoothstep(wet, wet + 1.5, bd));
      // The wave's edge (Ed, 2026-10-07: "a soft foamy pixel line that laps in and out on the sand"): a broken crest of foam
      // pixels at the front, bubbles thinning behind it, and as the wave draws back a lace of foam left on the wet sand; in
      // the night's own foam colour (art2's #364), bubbles and lace.
      float fd = front - bd, ebb = cos(uTime * 0.9 + vnoise(cpt / 60.0 + 7.0) * 6.0); // (ebb > 0: running up; < 0: drawing back)
      float froth = vnoise(px / vec2(2.0, 1.0) + vec2(uTime * 0.7, 0.0)) * 0.65 + vnoise(px / 0.9 + 3.0) * 0.35;
      if (fd < uPixel * 1.5 && froth > 0.32) col = vec3(0.62, 0.68, 0.74); // the crest
      else if (fd < uPixel * 1.5) col = mix(col, vec3(0.62, 0.68, 0.74), 0.55);
      else if (fd < 1.2 && froth > 0.55 + fd * 0.25) col = mix(col, vec3(0.58, 0.63, 0.68), 0.7); // bubbles behind it
      else if (ebb < 0.0 && fd < 2.2 + 2.5 * lap && abs(fract(fd * 0.9 - lap * 2.0) - 0.5) < 0.08 && froth > 0.5) col = mix(col, vec3(0.5, 0.54, 0.58), 0.5); // the lace left as it draws back
      float sh = fract(sin(dot(floor(px / 2.0), vec2(41.3, 289.1))) * 43758.5453);
      if (sh > 0.993) col = mix(vec3(0.62, 0.6, 0.57), vec3(0.34, 0.33, 0.33), fract(sh * 13.0));
      vec3 lit = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, 1.0);
      lit += uMoon * 0.14 * smoothstep(wet - 18.0, wet, bd); // (toward the water, the moonlight off it)
      if (bd > wet && bd < front) lit += uMoon * (mod(px.x + px.y, 3.0) < 1.0 ? 0.12 : 0.0); // the wet sand's sheen
      // Under the bushes at the woods' edge, a soft dappled shadow (light can be smooth: Ed), and the sand's glow calmer near the
      // dark woods, so the step from sand to forest isn't harsh.
      float shade = (1.0 - smoothstep(0.0, 6.0, into)) * (0.7 + 0.3 * vnoise(p / 1.7 + 5.0));
      col *= 1.0 - 0.5 * shade;
      float calm = 0.82 + 0.18 * smoothstep(4.0, 22.0, into);
      // (her warm pool on the open sand a lantern's few metres, not the woods' wide one: no canopy breaks it up out here, Ed:
      // "a warm pool of a few metres on the sand"; glowPool reads only the distance across the ground, so the sand's is taken
      // BEACH_POOL times as far)
      vec3 poolAt = uGlowPos + (vWorld - uGlowPos) * vec3(${BEACH_POOL.toFixed(2)}, 1.0, ${BEACH_POOL.toFixed(2)});
      gl_FragColor = vec4(haze(glowPool(min(vec3(1.0), col * lit * 1.25 * calm), poolAt), vWorld), 1.0); // (lit as the forest floor is)
      return;
    }
  }
#endif
  vec4 area = areaAt(p + j);
  float open = area.a > 0.5 ? area.g : 1.0;
  int t = int(area.r * 255.0 + 0.5);
  // Which floor shows (Ed, v160: blend the ground textures): the area lookup warped in two
  // octaves, so borders meander instead of following the texture's grid, then a second lookup a
  // little way off; where the two disagree (near a border), each art pixel takes one or the other
  // by noise and an ordered dither, a speckled band of grass creeping into dirt. Visual only:
  // openness and ponds keep the plain lookup, and gameplay's partition is untouched.
  if (uBlend.x + uBlend.y > 0.0) {
    vec2 w1 = vec2(vnoise(p / 40.0), vnoise(p / 40.0 + 31.0)) - 0.5, w2 = vec2(vnoise(p / 6.0 + 7.0), vnoise(p / 6.0 + 53.0)) - 0.5;
    vec2 q = p + w1 * 2.0 * uBlend.x + w2 * 2.0 * uBlend.y;
    vec4 a1 = areaAt(q);
    vec2 off = (vec2(vnoise(px / 3.0 + 91.0), vnoise(px / 3.0 + 37.0)) - 0.5) * uBlend.z;
    vec4 a2 = areaAt(q + off);
    int t1 = int(a1.r * 255.0 + 0.5), t2 = int(a2.r * 255.0 + 0.5);
    if (a1.a > 0.5) t = t1;
    if (a2.a > 0.5 && t2 != t1) {
      float k = uBlend.w > 0.5 ? vnoise(px / 2.0) * 0.6 + bayer4(px) * 0.4 : vnoise(px / 2.0);
      if (k < 0.5) t = t2;
    }
  }
  vec3 c;
  if (area.a > 0.5 && uFloorReady[t] > 0.5) {
    // The area's floor tile, repeated on the art's pixel grid.
    // Which of its variants: a hash of which repeat of the tile this is, so the floor doesn't visibly repeat.
    vec2 cell = vec2(mod(float(t), ${FLOOR_COLS}.0), floor(float(t) / ${FLOOR_COLS}.0)), rep = floor(px / uTile), q = fract(rep * vec2(0.1031, 0.1030));
    q += dot(q, q.yx + 33.33);
    float variant = floor(fract((q.x + q.y) * q.x) * ${FLOOR_VARIANTS}.0);
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * vec2(uTile.x * ${FLOOR_VARIANTS}.0, uTile.y) + vec2(variant * uTile.x, 0.0) + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The ground's features (its type's terrain): low mounds lit on the moon's side and shaded on
  // the other, sunken hollows darker at the bottom, and ridges in long ripples. Shading only.
  if (area.a > 0.5) {
    vec3 T = uTerrain[t];
    if (T.x + T.y + T.z > 0.0) {
      vec2 md = normalize(uMoonDir.xz + vec2(1e-4));
      float k = 11.0, e = 1.5;
      float n0 = vnoise(p / k), gx = vnoise((p + vec2(e, 0.0)) / k) - n0, gz = vnoise((p + vec2(0.0, e)) / k) - n0;
      float slope = dot(vec2(gx, gz), md) / e * k;  // + where the ground faces the moon
      float bump = T.x * smoothstep(0.45, 0.75, n0) - T.y * smoothstep(0.5, 0.8, 1.0 - n0);
      c *= 1.0 + bump * slope * 0.45 - T.y * smoothstep(0.62, 0.9, 1.0 - n0) * 0.3;
      if (T.z > 0.0) c *= 1.0 + T.z * 0.14 * sin((p.x * 0.55 + p.y) / 4.0 + vnoise(p / 30.0) * 6.0);
    }
  }
  // The zoo's streets (Ed, 2026-10-26: "the sea are flagstone streets"; "The flagstones look like the ones around the dancefloor";
  // rules/zooMap.ts): home's ground, the plaza and every street out to the edge, laid in the dancefloor plaza's flagstones (its
  // stone, joints, moss and grain: uPave), in straight courses east to west, each course's joints staggered.
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_ZOO_STREET)
  if (uZooStreet.x > 0.5 && area.a > 0.5 && t == int(uZooStreet.y)) {
    float ci = floor(p.y / uPave.z), u = p.x / uPave.w + fract(sin(ci * 12.9898) * 43758.5453), si = floor(u);
    float depth = p.y - ci * uPave.z, arc = (u - si) * uPave.w;
    float h = fract(sin(dot(vec2(ci, si), vec2(12.9898, 78.233))) * 43758.5453);
    bool joint = depth < uPixel * 1.01 || arc < uPixel * 1.01;
    float grain = vnoise(px / 2.0) * 0.6 + vnoise(px / 0.7 + 11.0) * 0.4;
    if (joint) c = vnoise(px / 1.5 + 5.0) > 0.55 ? uPaveMoss * 0.7 : uPaveGrout;
    else {
      vec3 s = mix(uPaveStone, uPaveDark, h * 0.45);
      s *= grain < 0.3 ? 0.88 : grain > 0.72 ? 1.08 : 1.0;
      if (depth < uPixel * 2.01 || arc < uPixel * 2.01) s *= 1.12; // (the lit edge of the stone)
      if (h > 1.0 - uPave2.z && vnoise(p / 1.2 + h * 40.0) > 0.55) s = mix(s, uPaveMoss, 0.75);
      c = s;
    }
  }
  // The zoo's plaza (Ed, 2026-10-26: "Home appears as a stone plaza with the ent's sigil on it"; the coordinator, "clean, continuous
  // lines ... so the glow follows the strokes"; then Ed, "less strong and bright and thick, and be more weathered"): inside its ring
  // the flagstones paler, the World Tree's sigil carved in thin grooves of whole art pixels with a faint mint light in them, worn.
#endif
  float plazaLine = 0.0, plazaHalo = 0.0;
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_ZOO_PLAZA)
  if (uZooPlaza.w > 0.5) {
    vec2 q = p - uZooPlaza.xy;
    float d = length(q), R = uZooPlaza.z;
    if (d < R + 2.0) {
      if (d < R) c = mix(c, uPaveStone * 1.15, 0.6);
      vec2 cell = (floor(p / uPixel) + 0.5) * uPixel, uv = (cell - uZooPlaza.xy) / (R * 1.84) + 0.5;
      if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
        plazaLine = step(0.45, texture2D(uPlazaSigil, uv).r);
        float o = 0.5 / (R * 1.84);
        for (int k = 0; k < 8; k++) { float a = float(k) * 0.7854; plazaHalo += texture2D(uPlazaSigil, uv + vec2(cos(a), sin(a)) * o).r; }
        plazaHalo /= 8.0;
      }
      float ring = 1.0 - step(uPixel * 1.0, abs(d - R));
      plazaLine = max(plazaLine, ring);
      plazaHalo = max(plazaHalo, (1.0 - smoothstep(0.0, 1.0, abs(d - R))) * 0.4);
      // Weathered (Ed, 2026-10-26: "less strong and bright and thick, and be more weathered"): an old carving, faint light in its
      // grooves, broken in places (worn gaps, chips), moss and dirt over stretches of it, its light uneven along a line.
      float wear = vnoise(cell / 2.6 + 17.0), chip = hash(floor(p / uPixel) + 3.0), moss = vnoise(cell / 4.5 + 41.0);
      float keep = step(0.3, wear) * step(0.12, chip) * (1.0 - step(0.68, moss) * step(0.35, hash(floor(p / uPixel) + 9.0)));
      if (plazaLine > 0.0 && keep < 0.5) { c = moss > 0.62 ? mix(c, uPaveMoss, 0.7) : c * 0.78; } // (a groove filled with moss or dirt, dark)
      plazaLine *= keep * (0.45 + 0.55 * vnoise(cell / 7.0 + 5.0));
      plazaHalo *= 0.35 + 0.65 * smoothstep(0.25, 0.6, wear);
      if (d < R) c *= 1.0 - 0.18 * plazaHalo * (1.0 - step(0.01, plazaLine)); // (the stone darker round the grooves)
    }
  }
  // A sleeping legend's clearing: a soft ring of trodden earth set with pale stones marks its edge, the
  // floor inside a touch darker and mossier (worn smooth round the sleeper); its ring brightens while
  // she stands in it. (Its twilight and motes are the lighting's: render/mood.ts and friends.)
#endif
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_LEGENDS)
  for (int i = 0; i < 6; i++) {
    if (i >= uLegendRingCount) break;
    vec4 L = uLegendRings[i];
    float d = length(p - L.xy);
    if (d > L.z + 1.0) continue;
    float wob = (vnoise(p / 3.0) - 0.5) * 0.6, band = 1.0 - smoothstep(0.0, L.w * 0.5, abs(d + wob - (L.z - L.w * 0.5)));
    if (d < L.z - L.w) c = mix(c, c * vec3(0.86, 0.95, 0.9), 0.6);
    // Its floor: old flagstones, cracked, a few tilted or gone, the legend's sigil cut into them, and moss, grass and
    // litter over much of it, so the carving shows only in pieces; the stone fading into the clearing's earth toward
    // the rim. All seeded by where the circle lies.
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_LEGEND_FLOOR)
    if (uLegendFloor.x > 0.0 && d < L.z) {
      vec2 q = p - L.xy, s0 = fract(L.xy * 0.0173) * 97.0;
      float rr = d / L.z;
      vec2 g = q / uLegendFloor.z, gi = floor(g), gf = fract(g);
      float d1 = 9.0, d2 = 9.0; vec2 id = vec2(0.0), at = vec2(0.0);
      for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
        vec2 o = vec2(float(x), float(y)), cell = gi + o;
        vec2 jp = o + vec2(hash(cell + s0), hash(cell + s0 + 19.7)) * 0.8 + 0.1 - gf;
        float dd = length(jp);
        if (dd < d1) { d2 = d1; d1 = dd; id = cell; at = jp; } else if (dd < d2) d2 = dd;
      }
      float hs = hash(id + s0 + 3.1), joint = 1.0 - smoothstep(0.02, 0.1, d2 - d1);
      vec4 ST = uLegendStone[i], DB = uLegendDebris[i], GR = uLegendGrowth[i];
      vec3 stone = ST.rgb * (0.82 + 0.3 * hs) * (0.86 + 0.28 * vnoise(px * 0.9 + s0));
      stone = mix(stone, c * 1.25, 0.3); // (the area's own floor in it, so it sits in its palette)
      vec2 tilt = vec2(hash(id + s0 + 7.3), hash(id + s0 + 11.1)) - 0.5;
      stone *= 1.0 - dot(at, tilt) * 0.55 * step(0.62, hs); // tilted slabs: one side lit, one in shade
      float groove = 0.0, lip = 0.0;
      vec2 uv = q / (L.z * 0.9) * 0.5 + 0.5;
      if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
        vec2 cu = vec2((float(i) + uv.x) / 6.0, uv.y), sh = normalize(uMoonDir.xz + vec2(1e-4)) * 0.01;
        groove = texture2D(uLegendCarve, cu).r;
        lip = max(0.0, texture2D(uLegendCarve, cu - vec2(sh.x / 6.0, sh.y)).r - groove); // (the groove's lit far edge)
      }
      stone *= (1.0 - 0.65 * groove) * (1.0 + 0.4 * lip) * (1.0 - 0.55 * joint);
      // its area's debris strewn over the stone: leaves in small blobs, needles and reeds in streaks, pebbles in
      // clumps, flowers in bright specks
      float sz = DB.a < 0.5 ? 2.0 : DB.a < 1.5 ? 1.0 : DB.a < 2.5 ? 2.0 : 1.0;
      vec2 dc = floor(px / sz);
      float dh = hash(dc + s0 + 5.7), streak = DB.a > 0.5 && DB.a < 1.5 ? step(0.5, fract((px.x + px.y * (hash(dc + 2.0) > 0.5 ? 1.0 : -1.0)) * 0.5)) : 1.0;
      float lit = step(1.0 - GR.x * (DB.a > 2.5 ? 0.12 : 0.3), dh) * streak * (0.6 + 0.4 * vnoise(q / 1.5 + s0 + 9.0) * 1.6);
      stone = mix(stone, DB.rgb * (0.75 + 0.5 * hash(dc + 1.3)), clamp(lit, 0.0, 1.0));
      float m = vnoise(q / 2.6 + s0) * 0.65 + vnoise(q / 0.9 + s0 * 2.0) * 0.35;
      m += smoothstep(0.5, 1.0, rr) * 0.3 + joint * (GR.z > 0.5 ? 0.12 : 0.3) + (uLegendFloor.y - 0.5) + (GR.y - 0.5);
      float moss = smoothstep(0.42, 0.58, m);
      // moss in damp places (green, deep); lichen and dry grass in open ones (pale, patchy)
      vec3 growth = GR.z > 0.5
        ? mix(c * vec3(1.1, 1.05, 0.72), vec3(0.62, 0.64, 0.5), 0.25 * step(0.6, vnoise(px * 0.8 + s0)))
        : c * mix(vec3(0.78, 1.12, 0.74), vec3(0.95, 0.9, 0.72), step(0.7, vnoise(px * 0.6 + s0)));
      growth *= 0.85 + 0.3 * vnoise(px * 1.3);
      vec3 fl = mix(stone, growth, moss);
      // puddles in wet areas: in the missing slabs and the low places, dark with a little sky
      if (ST.a > 0.5) { float pud = smoothstep(0.7, 0.76, vnoise(q / 2.2 + s0 + 31.0)) * (1.0 - moss * 0.6); fl = mix(fl, vec3(0.07, 0.09, 0.12) + 0.05 * vnoise(px * 0.5 + s0), pud); }
      if (uLegendGlint[i] > 0.0) fl += vec3(0.3, 0.5, 0.55) * groove * (1.0 - moss) * uLegendGlint[i] * 0.3;
      float show = (1.0 - smoothstep(0.6, 0.95, rr + (vnoise(q / 1.7 + s0) - 0.5) * 0.25)) * (ST.a > 0.5 ? 1.0 : step(0.1, hs));
      c = mix(c, fl, show);
    }
#endif
    c *= 1.0 - 0.38 * band;
    vec2 sc = floor(px / 2.0);
    float h = fract(sin(dot(sc, vec2(12.9898, 78.233))) * 43758.5453);
    if (band > 0.55 && h > 0.84) c = mix(vec3(0.42, 0.44, 0.47), vec3(0.62, 0.64, 0.66), fract(h * 7.0)) * (0.8 + 0.4 * vnoise(px));
    if (uLegendGlow[i] > 0.0) c += vec3(0.35, 0.55, 0.6) * band * uLegendGlow[i] * 0.35;
  }
#endif
  // The dancefloor: the art's floor of glass tiles inside its stone rim; a lit tile glows in its
  // colour (unlit by the night: it is the light), the rest is lit like the ground.
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_DANCEFLOOR) || defined(GROUND_PAVEMENT)
  {
    vec2 fd = p - uFloor.xy;
    if (length(fd) / uDiscoGeom.x * uDiscoGeom.y < uDiscoRim) {
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_DANCEFLOOR)
      vec2 bpx = floor(fd / uDiscoGeom.x * uDiscoGeom.y + uDiscoGeom.z * 0.5);
      vec4 base = texture2D(uDiscoBase, (bpx + 0.5) / uDiscoGeom.z);
      vec2 g = bpx - uDiscoGeom.w, tile = floor(g / uDiscoGeom.y), tp = g - tile * uDiscoGeom.y - 1.0;
      if (tile.x >= 0.0 && tile.y >= 0.0 && tile.x < 32.0 && tile.y < 32.0 && tp.x >= 0.0 && tp.y >= 0.0 && tp.x < 14.0 && tp.y < 14.0) {
        vec4 cell = texture2D(uDiscoTiles, (tile + 0.5) / 32.0);
        float k = floor(cell.a * 3.0 + 0.5);
        if (k > 0.5) {
          vec3 look = texture2D(uDiscoLit, (vec2(tp.x + (k - 1.0) * 14.0, tp.y) + 0.5) / vec2(42.0, 14.0)).rgb;
          gl_FragColor = vec4(haze(look * cell.rgb * 1.25, vWorld), 1.0);
          return;
        }
      }
      if (base.a > 0.5) c = base.rgb;
#endif
    }
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_PAVEMENT)
    else if (uPave.y > 0.0) {
      // The plaza: courses of flagstones in rings round the floor, in the rim's stone, joints
      // staggered course to course; the speakers stand on a course of darker stone; moss on some,
      // grass in the joints, and the outer edge breaking up into the grass.
      float d = length(fd), ragged = (vnoise(p / 3.0) - 0.5) * uPave2.x;
      if (d < uPave.y + ragged) {
        float rr = d - uPave.x, ci = floor(rr / uPave.z), mid = uPave.x + (ci + 0.5) * uPave.z;
        float n = max(8.0, floor(6.2832 * mid / uPave.w)), u = atan(fd.y, fd.x) / 6.2832 + 0.5 + fract(sin(ci * 12.9898) * 43758.5453);
        float si = floor(u * n), arc = fract(u * n) * 6.2832 * mid / n, depth = rr - ci * uPave.z;
        float h = fract(sin(dot(vec2(ci, si), vec2(12.9898, 78.233))) * 43758.5453);
        bool kerb = abs(mid - uPave2.w) < uPave.z * 0.5;
        bool gone = d > uPave.y - uPave.z * 1.5 + ragged && h < uPave2.y;
        if (!gone) {
          bool joint = depth < uPixel * 1.01 || arc < uPixel * 1.01;
          float grain = vnoise(px / 2.0) * 0.6 + vnoise(px / 0.7 + 11.0) * 0.4;
          if (joint) c = vnoise(px / 1.5 + 5.0) > 0.55 ? uPaveMoss * 0.7 : uPaveGrout;
          else {
            vec3 s = mix(uPaveStone, uPaveDark, kerb ? 0.65 + h * 0.2 : h * 0.45);
            s *= grain < 0.3 ? 0.88 : grain > 0.72 ? 1.08 : 1.0;
            if (depth < uPixel * 2.01 || arc < uPixel * 2.01) s *= 1.12;      // the lit edge of the stone
            if (h > 1.0 - uPave2.z && vnoise(p / 1.2 + h * 40.0) > 0.55) s = mix(s, uPaveMoss, 0.75);
            c = s;
          }
        }
      }
    }
#endif
  }
#endif
  // Lakes (Ed, 2026-10-11, rules/lakes.ts): no beach, a small shore: the area's own floor running down into the water, darker
  // and wet over the last couple of metres, a pale line lapping at the edge; then shallows where the floor still shows under
  // the water, deepening to a lake blue lighter than the sea's, the night sky in it (its stars, the moon's glint) and ripples.
#ifdef GROUND_LAKES
  if (uLake.x > 0.0) {
    vec2 kuv = (p - uLakeBox.xy + uLake.y) * uLakeBox.zw;
    if (kuv.x > 0.0 && kuv.y > 0.0 && kuv.x < 1.0 && kuv.y < 1.0) {
      float ld = texture2D(uLakes, kuv).r + (vnoise(p / 5.0 + 23.0) - 0.5) * 1.4; // (+ on the water; its line wobbled a little)
      // a biome lake (Ed, 2026-10-23; render/lakeLooks.ts): its look's shore and water, the sea chart's look for it
#if defined(GROUND_LAKE_ICE) || defined(GROUND_LAKE_LAVA) || defined(GROUND_LAKE_OASIS) || defined(GROUND_LAKE_SINKHOLE) || defined(GROUND_LAKE_TARN) || defined(GROUND_LAKE_TAR) || defined(GROUND_LAKE_RUST) || defined(GROUND_LAKE_LILY)
      float LK = ld > -14.0 ? lakeLookAt(kuv) : 0.0;
      if (LK > 0.5 && ld > -lakeRim(LK)) {
        vec3 lit = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, 1.0);
        if (ld < (LK > 1.5 && LK < 2.5 ? -0.6 : 0.0)) c = lakeShore(LK, ld, p, c);
        else { float hz; vec3 w = lakeWater(LK, ld, p, px, c, lit, hz); w = mix(w, w * 1.25 + vec3(0.06, 0.08, 0.09), lakeSigil(p) * 0.4); w=nativeFxColour(fxTint(w,fxField(p))); gl_FragColor = vec4(mix(w, haze(w, vWorld), hz), 1.0); return; }
      }
#ifdef GROUND_LAKE_WATER
      else
#endif
#endif
#ifdef GROUND_LAKE_WATER
      if (ld > -2.6) {
        float lap = 0.5 + 0.5 * sin(uTime * 1.1 + vnoise(p / 30.0 + 5.0) * 6.0), front = 0.35 * lap - 0.1; // (the edge laps in and out)
        vec3 lit = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, 1.0);
        if (ld < front) {
          // the wet bank, and the foam's broken line at the water's edge
          c *= 1.0 - 0.4 * smoothstep(-2.6, front, ld);
          float froth = vnoise(px / vec2(2.0, 1.0) + vec2(uTime * 0.6, 0.0));
          if (front - ld < uPixel * 1.5 && froth > 0.5) c = mix(c, vec3(0.5, 0.6, 0.63) / max(vec3(0.2), lit), 0.4);
        } else {
          vec3 V = normalize(cameraPosition - vec3(p.x, vWorld.y, p.y));
          vec2 rip = vec2(vnoise(p * vec2(0.35, 1.2) + vec2(uTime * 0.3, 0.0)), vnoise(p * vec2(0.25, 0.9) + vec2(0.0, uTime * 0.22) + 19.0)) - 0.5;
          vec3 R = reflect(-V, normalize(vec3(rip.x * 0.03, 1.0, rip.y * 0.06)));
          float up = clamp(R.y, 0.0, 1.0), deep = smoothstep(front, front + 7.0, ld + (vnoise(p / 3.0 + 41.0) - 0.5) * 2.0);
          vec3 water = mix(uHazeColour * 0.9 + vec3(0.14, 0.24, 0.28), vec3(0.15, 0.28, 0.37), smoothstep(0.0, 0.3, up)); // (lighter than the sea's 0.09, 0.18, 0.26)
          water *= 0.92 + 0.2 * (rip.x + 0.5);
          water = mix(c * lit * vec3(0.62, 0.82, 1.0) * 1.1 + vec3(0.02, 0.05, 0.07), water, 0.12 + 0.88 * deep); // (the floor under the shallows, fading as it deepens)
          vec2 sc = floor(R.xz / max(0.08, R.y) * 26.0);
          float hs = fract(sin(dot(sc, vec2(12.9898, 78.233))) * 43758.5453);
          if (hs > 0.997 && deep > 0.5) water += vec3(0.4, 0.44, 0.52) * (0.55 + 0.45 * sin(uTime * 2.3 + hs * 90.0)); // a star
          vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
          float spec = dot(R, moon);
          if (spec > 0.993) water = mix(water, uMoon + vec3(0.25), 0.8);
          else if (spec > 0.975) water = mix(water, uMoon * 0.7, 0.3);
          else if (mod(px.y, 5.0) < 1.0 && vnoise(px / vec2(8.0, 2.0) + vec2(uTime * 0.3, 0.0)) > 0.76) water += vec3(0.08, 0.12, 0.14); // ripples catching the light
          // Koi (Ed, 2026-10-11; 2026-10-12: "large, similar to the size of a baby creature"): in some lakes a few, orange, white
          // and gold, patched, swimming slow rounds under the water.
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_KOI)
          for (int i = 0; i < 8; i++) {
            vec4 K = uKoi[i];
            if (K.z <= 0.0) break;
            vec2 q = p - K.xy;
            if (dot(q, q) > (K.z + uKoiSize) * (K.z + uKoiSize)) continue;
            float n = floor(fract(K.w) * 10.0 + 0.5);
            for (int f = 0; f < 7; f++) {
              if (float(f) >= n) break;
              float s = floor(K.w) * 0.731 + float(f) * 3.71, r = max(uKoiSize * 1.4, K.z * (0.2 + 0.6 * fract(s * 0.37))); // (in toward the middle: they keep together)
              r *= 1.0 + 0.12 * sin(uTime * 0.21 + s);
              float dirn = fract(s * 2.13) > 0.5 ? 1.0 : -1.0, a = s * 1.7 + dirn * uTime * (0.35 + 0.25 * fract(s * 1.31)) * uKoiSize / max(2.0, r); // (a bigger fish swims faster)
              vec2 fp = K.xy + vec2(cos(a), sin(a)) * r, hd = vec2(-sin(a), cos(a)) * dirn, d = p - fp;
              float u = dot(d, hd) / uKoiSize, v = dot(d, vec2(-hd.y, hd.x)) / uKoiSize;
              v += sin(uTime * 3.0 + s + u * 4.0) * 0.05 * (0.45 - u); // (its tail sways)
              bool bodyIn = (u / 0.42) * (u / 0.42) + (v / 0.19) * (v / 0.19) < 1.0, tail = u < -0.38 && u > -0.7 && abs(v) < (-u - 0.33) * 0.55;
              if (bodyIn || tail) {
                float kind = fract(s * 5.31), blot = vnoise((vec2(u, v) + s) * 4.0);
                vec3 kc = kind < 0.45 ? vec3(0.95, 0.42, 0.12) : kind < 0.8 ? vec3(0.92, 0.9, 0.84) : vec3(0.95, 0.75, 0.25);
                if (kind >= 0.45 && kind < 0.8 && blot > 0.55) kc = vec3(0.92, 0.32, 0.1); // (white with orange patches)
                if (kind < 0.45 && blot > 0.72) kc = vec3(0.92, 0.9, 0.84);
                if (kind < 0.25 && blot < 0.22) kc = vec3(0.08, 0.07, 0.07); // (a few black spots)
                water = mix(water, kc * (tail ? 0.75 : 0.95), 0.85 * deep);
              }
            }
          }
#endif
          if (ld < front + uPixel * 2.0 && mod(px.x + px.y, 2.0) < 1.0) water = mix(water, vec3(0.5, 0.6, 0.64), 0.25); // (the edge's thin shine, broken)
          water = mix(water, water * 1.25 + vec3(0.06, 0.08, 0.09), lakeSigil(p) * 0.4 * deep); // (a zoo lake's sigil, faint)
          gl_FragColor = vec4(mix(water, haze(water, vWorld), 0.6), 1.0);
          return;
        }
      }
#endif
    }
  }
#endif
  // Ponds: dark water mirroring the moon. The glint is a fake highlight from the view and a
  // moon mirrored into the sky ahead, so it slides as the camera moves, and shimmers.
  {
    if (area.a > 0.5 && area.b > 0.5) {
      vec3 V = normalize(cameraPosition - vec3(p.x, 0.0, p.y));
      vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
      vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
      float spec = dot(R, moon) + (vnoise(px * vec2(0.6, 2.5) + vec2(uTime * 1.5, 0.0)) - 0.5) * 0.05;
      vec3 water = vec3(0.045, 0.08, 0.088) * nightLight(vec3(0.0, 1.0, 0.0), vWorld) * 4.0; // dark, but water, not a hole (#235)
      if (spec > 0.985) water = vec3(0.92, 0.95, 1.0);
      else if (spec > 0.965) water = vec3(0.45, 0.55, 0.7);
      else if (mod(px.y, 4.0) < 1.0 && vnoise(px / 3.0 + uTime) > 0.62) water += vec3(0.06, 0.08, 0.12); // ripples
      // Never a rimless hole (the art director, #235): like the generated pools, a moonlit rim along the far shore (up the
      // screen), the sky's faint sheen across the far half, a dark muddy lip on the near and side banks, and a glint or two.
      vec2 at = p + j;
      float up1 = areaAt(at + vec2(0.0, -max(uPixel * 2.0, 0.3))).b, up2 = areaAt(at + vec2(0.0, -max(uPixel * 4.0, 0.6))).b;
      float far = areaAt(at + vec2(0.0, -1.3)).b;
      float lip = max(uPixel * 1.5, 0.25), side = min(min(areaAt(at + vec2(-lip, 0.0)).b, areaAt(at + vec2(lip, 0.0)).b), areaAt(at + vec2(0.0, lip)).b);
      vec3 rim = mix(vec3(0.6, 0.66, 0.74), uMoon, 0.25);
      if (spec <= 0.965) {
        if (far < 0.5 && mod(px.x + px.y, 2.0) < 1.0) water += vec3(0.05, 0.07, 0.11); // the sky in the far water
        float g = fract(sin(dot(floor(px / 2.0), vec2(41.3, 289.1))) * 43758.5453);
        if (g > 0.985 && sin(uTime * (1.5 + g * 40.0) + g * 90.0) > 0.6) water = vec3(0.75, 0.8, 0.88); // a glint
      }
      if (up1 < 0.5) water = rim; // the moonlit far shore
      else if (up2 < 0.5 && mod(px.x, 2.0) < 1.0) water = mix(water, rim, 0.5);
      else if (side < 0.5) water = vec3(0.07, 0.06, 0.05) * (0.6 + 0.8 * nightLight(vec3(0.0, 1.0, 0.0), vWorld)); // the muddy lip
      gl_FragColor = vec4(haze(nativeFxColour(fxTint(water, fxField(p))), vWorld), 1.0);
      return;
    }
  }
  float moonK = 1.0;
  if (uCanopy.x > 0.0) {
    // The canopy's shadow: a dappled layer at canopy height, cast along the moonlight onto the
    // ground, drifting with the wind; thinner where the canopy thins, in the clearings.
    vec2 q = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(q / 2.6) * 0.6 + vnoise(q / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (open - uClearing.x) / max(0.01, uClearing.y));
    moonK = 1.0 - uCanopy.x * smoothstep(-0.07, 0.07, cover - leaves);
  }
  // Fake relief (Ed, v171): two octaves of noise as a height; its slope tilts the ground's normal
  // so lights pick out rises and hollows, and the hollows are a little darker. Shading only.
  // The rolling ground's slope (height.ts), across 4 m so the 2 m samples read smooth.
  // Lit as if uHillShade times steeper (Ed, 2026-10-04: "can't identify the hills"): relief shading,
  // so gentle swells (which things can stand on upright) still read in the light.
  vec2 hg = vec2(groundH(p + vec2(2.0, 0.0)) - groundH(p - vec2(2.0, 0.0)), groundH(p + vec2(0.0, 2.0)) - groundH(p - vec2(0.0, 2.0))) / 4.0 * uHillShade;
  vec3 N = normalize(vec3(-hg.x, 1.0, -hg.y));
  if (uRelief.x > 0.0) {
    float S = uRelief.y, e = S * 0.25;
    float h0 = vnoise(p / S) * 0.7 + vnoise(p / (S * 0.37) + 13.0) * 0.3;
    float hx = vnoise((p + vec2(e, 0.0)) / S) * 0.7 + vnoise((p + vec2(e, 0.0)) / (S * 0.37) + 13.0) * 0.3;
    float hz = vnoise((p + vec2(0.0, e)) / S) * 0.7 + vnoise((p + vec2(0.0, e)) / (S * 0.37) + 13.0) * 0.3;
    N = normalize(vec3(-(hx - h0) / e * S * uRelief.x - hg.x, 1.0, -(hz - h0) / e * S * uRelief.x - hg.y));
    c *= 1.0 - uRelief.z * smoothstep(0.55, 0.2, h0);
  }
#if !defined(GROUND_SPECIALIZED) || defined(GROUND_BARE)
  if (uBare > 1.5) {
    // The bare view's plain ground: grey, a darker line where the height crosses each half metre
    // (the art pixel next door on the other side of it), and a faint 10 m grid.
    float hc = groundH(p), hx = groundH(p + vec2(uPixel, 0.0)), hz = groundH(p + vec2(0.0, uPixel));
    // Tinted by height (low ground cool and dark, high warm and light), so the swells read at a glance.
    c = mix(vec3(0.3, 0.36, 0.48), vec3(0.82, 0.76, 0.6), clamp(hc / 5.0 + 0.5, 0.0, 1.0));
    if (floor(hc / 0.5) != floor(hx / 0.5) || floor(hc / 0.5) != floor(hz / 0.5)) c = mod(floor(hc / 0.5 + 0.5), 5.0) < 0.5 ? vec3(0.02, 0.02, 0.04) : vec3(0.12, 0.1, 0.16); // every 2.5 m darkest
    if (mod(px.x, 10.0 / uPixel) < 1.0 || mod(px.y, 10.0 / uPixel) < 1.0) c *= 0.85;
  }
#endif
  if (shoreNear > 0.0) { moonK = mix(moonK, 1.0, shoreNear * 0.7); c = mix(c, c * vec3(0.95, 1.18, 1.0) * 1.2, shoreNear * 0.6); } // (by the sand, the woods' floor in more moonlight, greener)
  vec4 magicGround = fxField(p);
  c = fxTint(c, magicGround);
  vec3 light = nightLightShaded(N, vWorld, moonK);
  vec3 lit = glowPool(min(vec3(1.0), c * light * 1.25), vWorld);
  float charge = fxExtra(p).r;
  lit += vec3(0.1,0.15,0.22) * charge * (uFxCalm>0.5?0.5:0.65+0.15*sin(uFxTime*3.0));
  if (plazaLine + plazaHalo > 0.0) lit = mix(lit, vec3(0.36, 0.62, 0.52), plazaLine * 0.55) + vec3(0.04, 0.16, 0.11) * plazaHalo * (1.0 - plazaLine) * 0.4; // (the plaza's sigil, its own light)
  gl_FragColor = vec4(haze(lit, vWorld), 1.0); // (her pool in her light's colour)
}
`;

/** At full share this is the exact ground shader; the added dither only runs during coast handover. */
const BEACH_FRAG = FRAG.replace('void main() {', 'uniform float uCoastAppear;\nvoid main() {\n  if (uCoastAppear < 0.999 && bayer4(gl_FragCoord.xy) >= uCoastAppear) discard;');

/** Both real ground and precompile use this factory; no substitute shader or custom cache key. */
export const groundProgramMaterial = (defines: Record<string, string>, uniforms: Record<string, THREE.IUniform>) =>
  new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, defines, uniforms });

export class Ground {
  get programMaterial(): THREE.ShaderMaterial { return this.plain; }
  readonly mesh: THREE.Mesh;
  /** Always compiled at boot and retained across islands; no expensive lighting, effects, or individual lake bodies. */
  readonly loadingFallback: THREE.ShaderMaterial;
  readonly coastReadiness = new CoastReadiness();
  private coastSurface: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  private coastReadyMarked = false;
  private coastFullMarked = false;
  private disposed = false;
  private readonly beachDefines: Record<string, string>;
  /** The area texture's two windows round her (render/areaWindow.ts): the near one, and the far one for the telescope. */
  private near: AreaWindow;
  private far: AreaWindow;
  private initialised = false;
  private floorReady = new Array(TYPE_SLOTS).fill(0);
  private floors: THREE.DataTexture;
  private discoTiles = (t => { t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; return t; })(new THREE.DataTexture(new Uint8Array(32 * 32 * 4), 32, 32));
  private pendingFloors: [number, TilePixels][] = [];
  /** The nearby legend circles' carving masks, side by side (one slot a ring), and which species each slot holds. */
  /** The zoo's plaza's World Tree (its legendary sigil, whole), PLAZA_SIGIL square; a 1-pixel blank one off the zoo. */
  private plazaSigil: THREE.DataTexture;
  private lakeCarve = (t => { t.magFilter = t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; return t; })(new THREE.DataTexture(new Uint8Array(CARVING_SIZE * 4 * CARVING_SIZE * 4), CARVING_SIZE * 4, CARVING_SIZE));
  private lakeSlots: string[] = ["", "", "", ""];
  private carve = (t => { t.magFilter = t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; return t; })(new THREE.DataTexture(new Uint8Array(CARVING_SIZE * 6 * CARVING_SIZE * 4), CARVING_SIZE * 6, CARVING_SIZE));
  private carveSlots: (string | null)[] = new Array(6).fill(null);

  /** maxTexture: the GPU's largest texture side (renderer.capabilities.maxTextureSize): the windows no bigger. */
  constructor(private map: ForestMap, private forest: Forest, st: Style, metresPerPixel: number, maxTexture = 4096, made: DiscoArt = runSync(discoArt(st, map.dancefloor.radius)).art) {
    this.plazaSigil = plazaSigil(!!map.zoo?.layout);
    const e = map.extent, w = e.maxX - e.minX, d = e.maxZ - e.minZ, cap = Math.floor(maxTexture / AREA_TILE);
    const window = (tpm: number, tiles: number, step: number) => new AreaWindow(Math.min(tiles, cap), tpm, step, { minX: e.minX, minZ: e.minZ, tilesX: Math.ceil((w * tpm) / AREA_TILE), tilesZ: Math.ceil((d * tpm) / AREA_TILE) }, (out, i, j, tpm) => this.areaTile(out, i, j, tpm));
    // (the near window's texels where the whole map's were: 2 a metre, or a little under on a map over 4080 m across, its texture held
    // to 8160 texels then; the same grid, so the area borders' blend reads the same texels: the bench's frames unchanged)
    this.near = window(Math.min(NEAR_TPM, ((Math.floor(8192 / AREA_TILE) - 1) * AREA_TILE) / Math.max(1, w, d)), NEAR_TILES, NEAR_STEP);
    this.far = window(FAR_TPM, FAR_TILES, FAR_STEP);
    const nearest = (t: THREE.DataTexture) => { t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true; return t; };
    this.floors = gpuKind(nearest(new THREE.DataTexture(new Uint8Array(64 * FLOOR_VARIANTS * FLOOR_COLS * 48 * FLOOR_ROWS * 4), 64 * FLOOR_VARIANTS * FLOOR_COLS, 48 * FLOOR_ROWS)), "ground");
    const floors = Array.from({ length: TYPE_SLOTS }, (_, i) => new THREE.Vector3(...(LOOKS[i]?.floor ?? [0.25, 0.45, 0.4])));
    const disco = discoLooks(made);
    const lakes = lakeUniforms(map, lakeKnobs(map.tuning).koi, koiScale(st, metresPerPixel)), pavement = paving(map, disco);
    const params = typeof location === 'undefined' ? new URLSearchParams() : new URLSearchParams(location.search);
    // The shader as two programs over one set of uniforms (the perf pass's fix C, 2026-10-23, tools/bench/ground.cjs: code a
    // pixel never runs still cost the ground a quarter to two fifths of its time on the cloud's renderer): the lakes' code only on
    // an island with lakes (fixed for the night), and the beach and sea's only in the second, drawn while the beach is on (setBeach).
    const defines = (beach: boolean) => groundProgramDefines(map, params, beach);
    this.beachDefines = defines(true);
    const mat = groundProgramMaterial(defines(false), {
        ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, ...FX_UNIFORMS, ...nativeFxUniforms("lake"),
        uAreas: { value: this.near.texture }, uAreasFar: { value: this.far.texture },
        uExtent: { value: this.near.extent }, uExtentFar: { value: this.far.extent },
        uAreaWin: { value: this.near.box }, uAreaWinFar: { value: this.far.box },
        uPixel: { value: metresPerPixel },
        uTypeFloor: { value: floors },
        uFloorReady: { value: this.floorReady },
        uTerrain: { value: Array.from({ length: TYPE_SLOTS }, (_, i) => { const tr = LOOKS[i]?.layout.terrain ?? []; return new THREE.Vector3(+tr.includes("mounds"), +tr.includes("hollows"), +tr.includes("ridges")); }) },
        uFloors: { value: this.floors },
        uTile: { value: new THREE.Vector2(64, 48) },
        uFloorsSize: { value: new THREE.Vector2(64 * FLOOR_VARIANTS * FLOOR_COLS, 48 * FLOOR_ROWS) },
        uSat: { value: st.sat },
        uFloor: { value: map.zoo?.layout ? new THREE.Vector3(1e7, 1e7, 0) : new THREE.Vector3(map.dancefloor.x, map.dancefloor.z, map.dancefloor.radius) }, // (the zoo has no dancefloor, nor its paving: Ed 2026-10-26)
        uCanopy: { value: new THREE.Vector4() },
        uCircle: { value: new THREE.Vector4() },
        uBeach: { value: new THREE.Vector4() },
        uLandBox: { value: new THREE.Vector4() },
        uLand: { value: null as THREE.DataTexture | null },
        uMoonRoad: { value: new THREE.Vector3() },
        ...lakes,
        uLegendRings: { value: Array.from({ length: 6 }, () => new THREE.Vector4()) },
        uLegendGlow: { value: new Array(6).fill(0) },
        uLegendRingCount: { value: 0 },
        uLegendCarve: { value: this.carve },
        uLakeSigil: { value: [0, 1, 2, 3].map(() => new THREE.Vector4()) }, uLakeCarve: { value: this.lakeCarve },
        uLegendFloor: { value: new THREE.Vector4(map.tuning.legendClearing.floor?.on ? 1 : 0, map.tuning.legendClearing.floor?.overgrowth ?? 0.5, map.tuning.legendClearing.floor?.slab ?? 1.3, 0) },
        uLegendGlint: { value: new Array(6).fill(0) },
        uLegendStone: { value: Array.from({ length: 6 }, () => new THREE.Vector4()) },
        uLegendDebris: { value: Array.from({ length: 6 }, () => new THREE.Vector4()) },
        uLegendGrowth: { value: Array.from({ length: 6 }, () => new THREE.Vector4()) },
        uClearing: { value: new THREE.Vector2(map.tuning.clearingSize, map.tuning.clearingFalloff) },
        uDiscoBase: { value: disco.base }, uDiscoLit: { value: disco.lit }, uDiscoTiles: { value: this.discoTiles },
        uDiscoGeom: { value: new THREE.Vector4(disco.tileM, disco.pitch, disco.size, disco.gridOrigin) }, uDiscoRim: { value: disco.rimOuter },
        ...pavement,
        uZooPlaza: { value: new THREE.Vector4(map.zoo?.layout?.home.x ?? 0, map.zoo?.layout?.home.z ?? 0, ZOO_CONFIG.plaza ?? 60, map.zoo?.layout ? 1 : 0) }, uPlazaSigil: { value: this.plazaSigil },
        uBare: { value: map.tuning.bare ?? 0 }, uHillShade: { value: map.tuning.ground.hills.shade ?? 1 },
        uRelief: { value: new THREE.Vector3(map.tuning.ground.relief.strength, map.tuning.ground.relief.scale, map.tuning.ground.relief.shade) },
        uBlend: { value: (B => (B.on ? new THREE.Vector4(B.warp, B.fine, B.band, B.dither ? 1 : 0) : new THREE.Vector4()))(map.tuning.groundBlend) },
    });
    const geo = new THREE.PlaneGeometry(REACH * 2, REACH * 2, (REACH * 2) / GRID, (REACH * 2) / GRID);
    geo.rotateX(-Math.PI / 2);
    const P = geo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < P.count; i++) { // the outermost ring: out to the skirt, flat (the hills end inside it)
      if (Math.abs(P.getX(i)) >= REACH - 0.01) P.setX(i, Math.sign(P.getX(i)) * SKIRT);
      if (Math.abs(P.getZ(i)) >= REACH - 0.01) P.setZ(i, Math.sign(P.getZ(i)) * SKIRT);
    }
    this.plain = mat;
    this.loadingFallback = new THREE.ShaderMaterial({ name: 'Loading ground and lake surfaces', vertexShader: VERT, uniforms: mat.uniforms, fragmentShader: `
varying vec3 vWorld;
${LOADING_LIGHT_GLSL}
uniform vec3 uTypeFloor[${TYPE_SLOTS}];
uniform vec4 uLake, uLakeBox;
uniform sampler2D uLakes, uLakeLooks;
uniform vec4 uBeach, uLandBox;
uniform sampler2D uLand;
void main() {
  vec3 c = max(uTypeFloor[0], vec3(0.18, 0.24, 0.15));
  vec2 uv = (vWorld.xz - uLakeBox.xy + uLake.y) * uLakeBox.zw;
  if (uLake.x > 0.0 && uv.x > 0.0 && uv.y > 0.0 && uv.x < 1.0 && uv.y < 1.0) {
    float d = texture2D(uLakes, uv).r;
    float kind = floor(texture2D(uLakeLooks, uv).r * 255.0 + 0.5);
    if (d > 0.0) c = kind > 1.5 && kind < 2.5 ? vec3(0.8, 0.2, 0.04) : kind > 0.5 && kind < 1.5 ? vec3(0.55, 0.7, 0.8) : vec3(0.08, 0.27, 0.38);
    else if (d > -1.5) c = vec3(0.36, 0.4, 0.3);
  }
  if (uBeach.x > 0.0) {
    vec2 luv = (vWorld.xz - uLandBox.xy + uBeach.z) * uLandBox.zw, cuv = clamp(luv, vec2(0.0), vec2(1.0));
    vec4 land = texture2D(uLand, cuv);
    float bd = -land.r + length((luv - cuv) / uLandBox.zw);
    if (bd > uBeach.y) c = vec3(0.09, 0.18, 0.26);
    else if (bd > -land.g) c = vec3(0.36, 0.37, 0.39);
  }
  gl_FragColor = vec4(loadingLight(c, vWorld), 1.0);
}` });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    // No beach material/twin exists until setBeach says the coast is actually in view.
    const fallbackTwin = new THREE.Mesh(geo, this.loadingFallback);
    fallbackTwin.name = 'Loading ground and lake surfaces'; fallbackTwin.visible = false; fallbackTwin.frustumCulled = false;
    this.mesh.add(fallbackTwin);
    this.follow((e.minX + e.maxX) / 2, (e.minZ + e.maxZ) / 2);
    try { performance.mark('ground:coast-constructed', { detail: { seed: map.seed, beachExists: this.beach !== null } }); } catch { /* no timeline */ }
  }

  /** Keep the grid round (x, z), snapped to its squares so the hills don't swim. */
  follow(x: number, z: number): void { this.mesh.position.set(Math.round(x / GRID) * GRID, 0, Math.round(z / GRID) * GRID); }

  /** This frame's dancefloor tiles: per tile r, g, b and intensity (0 to 3), row by row (rules/dancefloor.ts). */
  setFloorTiles(rgbi: Uint8Array): void {
    const d = this.discoTiles.image.data as Uint8Array;
    for (let i = 0; i < d.length; i += 4) { d[i] = rgbi[i]; d[i + 1] = rgbi[i + 1]; d[i + 2] = rgbi[i + 2]; d[i + 3] = Math.min(255, rgbi[i + 3] * 85); }
    this.discoTiles.needsUpdate = true;
  }

  /** The sleeping legends' clearings nearest her (up to 6): their middles, radii, ring widths, and each ring's brightening (0-1). */
  setLegendRings(rings: readonly { x: number; z: number; r: number; edge: number; glow?: number }[], count = rings.length): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, list = u.uLegendRings.value as THREE.Vector4[], glow = u.uLegendGlow.value as number[], n = Math.min(6, count);
    for (let i = 0; i < n; i++) { const c = rings[i]; list[i].set(c.x, c.z, c.r, c.edge); glow[i] = c.glow ?? 0; }
    u.uLegendRingCount.value = n;
  }

  /** Each nearby legend circle's floor: its carving's species (its mask copied into its slot only when that changes:
   *  lazily, for the nearest few) and its grooves' glint (0 off). */
  /** The zoo's undiscovered islands' sigils on their lakes (rules/zooMap.ts): up to four, the nearest; each its middle, the sigil's
   *  radius and its kind (its legend sigil's mask, render/legendCarving.ts). */
  setLakeSigils(items: readonly { x: number; z: number; r: number; species: string }[]): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, S = u.uLakeSigil.value as THREE.Vector4[], data = this.lakeCarve.image.data as Uint8Array, W = CARVING_SIZE * 4;
    for (let i = 0; i < 4; i++) {
      const f = items[i];
      if (!f) { S[i].set(0, 0, 0, 0); continue; }
      S[i].set(f.x, f.z, f.r, 1);
      if (this.lakeSlots[i] === f.species) continue;
      this.lakeSlots[i] = f.species;
      const m = carvingMask(f.species);
      for (let y = 0; y < CARVING_SIZE; y++) for (let x = 0; x < CARVING_SIZE; x++) { const v = m[y * CARVING_SIZE + x], o = (y * W + i * CARVING_SIZE + x) * 4; data[o] = data[o + 1] = data[o + 2] = v; data[o + 3] = 255; }
      this.lakeCarve.needsUpdate = true;
    }
  }
  setLegendFloors(floors: readonly { species: string; glint: number; look: FloorLook }[], count = floors.length): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, glint = u.uLegendGlint.value as number[], data = this.carve.image.data as Uint8Array, W = CARVING_SIZE * 6;
    const stone = u.uLegendStone.value as THREE.Vector4[], debris = u.uLegendDebris.value as THREE.Vector4[], growth = u.uLegendGrowth.value as THREE.Vector4[];
    for (let i = 0; i < Math.min(6, count); i++) {
      const f = floors[i], L = f.look;
      glint[i] = f.glint;
      stone[i].set(L.stone[0], L.stone[1], L.stone[2], L.wet ? 1 : 0);
      debris[i].set(L.debris[0], L.debris[1], L.debris[2], L.shape);
      growth[i].set(L.litter, L.cover, L.growth === "lichen" ? 1 : 0, 0);
      if (this.carveSlots[i] === f.species) continue;
      this.carveSlots[i] = f.species;
      const m = carvingMask(f.species);
      for (let y = 0; y < CARVING_SIZE; y++) for (let x = 0; x < CARVING_SIZE; x++) { const v = m[y * CARVING_SIZE + x], o = (y * W + i * CARVING_SIZE + x) * 4; data[o] = data[o + 1] = data[o + 2] = v; data[o + 3] = 255; }
      this.carve.needsUpdate = true;
    }
  }

  /** The magic circle: its two hues, brightness now, and the rune band's turn. */
  /** The beach and the sea (render/beach.ts): drawn only while given one (she's near the edge). */
  /** Where the sky draws the moon (rules/moon.ts x, a fraction across) and the picture's width (px): the sea's moon road under it. */
  moonRoad(x: number, widthPx: number, up: boolean): void { ((this.mesh.material as THREE.ShaderMaterial).uniforms.uMoonRoad.value as THREE.Vector3).set(x, widthPx, up ? 1 : 0); }
  setBeach(b: Beach | null): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, v = u.uBeach.value as THREE.Vector4;
    this.coastReadiness.request(!!b, performance.now());
    if (!b) { this.mesh.material = this.plain; if (this.coastSurface) this.coastSurface.visible = false; v.set(0, 0, 0, 0); return; }
    if (!this.beach) {
      this.beach = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: BEACH_FRAG, defines: this.beachDefines, uniforms: { ...u, uCoastAppear: { value: 0 } } });
      this.coastSurface = new THREE.Mesh(this.mesh.geometry, this.beach);
      this.coastSurface.name = 'Deferred coast surface'; this.coastSurface.frustumCulled = false; this.coastSurface.visible = false;
      this.coastSurface.renderOrder = this.mesh.renderOrder + 0.00001; this.mesh.add(this.coastSurface);
      performance.mark('ground:coast-requested');
    }
    this.mesh.material = this.coastReadiness.share === 1 ? this.beach : this.loadingFallback;
    const L = b.land;
    if (this.landFor !== b) {
      // (the land map's distances, the sand's widths and the way to the coast, as a half-float texture eased between its samples)
      this.landFor = b;
      this.landTex?.dispose();
      const N = L.cols * L.rows, data = new Uint16Array(N * 4), h = THREE.DataUtils.toHalfFloat;
      for (let k = 0; k < N; k++) { data[k * 4] = h(L.dist[k]); data[k * 4 + 1] = h(b.sand[k]); data[k * 4 + 2] = h(b.toCoast[k * 2]); data[k * 4 + 3] = h(b.toCoast[k * 2 + 1]); }
      const t = this.landTex = gpuKind(new THREE.DataTexture(data, L.cols, L.rows, THREE.RGBAFormat, THREE.HalfFloatType), "ground");
      t.magFilter = t.minFilter = THREE.LinearFilter; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
    }
    u.uLand.value = this.landTex;
    (u.uLandBox.value as THREE.Vector4).set(L.x0, L.z0, 1 / (L.step * L.cols), 1 / (L.step * L.rows));
    v.set(1, b.out, L.step / 2, v.w);
  }
  /** Called after BeachView.update, before scene submission. No unfinished coast program reaches a draw. */
  prepareCoast(renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): void {
    const surface = this.coastSurface, coast = this.coastReadiness;
    if (!coast.requested || !surface || !this.beach) return;
    if (coast.launch()) {
      // compileAsync discovers materials synchronously through visible objects, then polls KHR asynchronously.
      const was = surface.visible; surface.visible = true;
      let compiling: Promise<unknown>;
      try { compiling = renderer.compileAsync(surface, camera, scene); }
      catch (error) { compiling = Promise.reject(error); }
      finally { surface.visible = was; }
      void compiling.catch(error => { if (!this.disposed) console.error('Coast shader preparation failed; retaining continuous fallback', error); });
    }
    coast.linked = materialProgramsReady(renderer.properties.get(this.beach));
    if (coast.linked && !this.coastReadyMarked) { this.coastReadyMarked = true; performance.mark('ground:coast-ready', { detail: { fallbackMs: coast.fallbackMs } }); }
    const share = coast.frame(performance.now()); this.beach.uniforms.uCoastAppear.value = share;
    this.mesh.material = share === 1 ? this.beach : this.loadingFallback; surface.visible = share > 0 && share < 1;
    if (share === 1 && !this.coastFullMarked) { this.coastFullMarked = true; performance.mark('ground:coast-full', { detail: { fallbackMs: coast.fallbackMs } }); }
  }
  /** The sand's grain: how far each of its art pixels is lightened or darkened, at random (the tuning's beach.grain). */
  sandGrain(k: number): void { ((this.mesh.material as THREE.ShaderMaterial).uniforms.uBeach.value as THREE.Vector4).w = k; }
  private landFor: Beach | null = null;
  /** The ground's two programs (one set of uniforms): without the beach and sea, and with them. */
  private readonly plain: THREE.ShaderMaterial;
  private beach: THREE.ShaderMaterial | null = null;
  private landTex: THREE.DataTexture | null = null;

  setCircle(hue: number, hue2: number, brightness: number, turn: number): void {
    ((this.mesh.material as THREE.ShaderMaterial).uniforms.uCircle.value as THREE.Vector4).set(hue, hue2, brightness, turn);
  }

  /** The canopy shadow layer's settings (strength 0 turns it off). */
  setCanopyShadow(strength: number, height: number, cover: number, wind: number): void {
    ((this.mesh.material as THREE.ShaderMaterial).uniforms.uCanopy.value as THREE.Vector4).set(strength, height, cover, wind);
  }

  /** An area type's floor tile has been drawn: put it in the atlas (on the next fill). */
  setFloor(type: number, tile: TilePixels): void { this.pendingFloors.push([type, tile]); }

  private placeFloors(renderer: THREE.WebGLRenderer): void {
    for (const [type, tile] of this.pendingFloors) {
      const u = this.mesh.material as THREE.ShaderMaterial, size = u.uniforms.uTile.value as THREE.Vector2;
      const n = tile.w / size.x; // a strip of FLOOR_VARIANTS tiles, or a single tile (put in every variant's place)
      if ((n !== FLOOR_VARIANTS && n !== 1) || tile.h !== size.y) continue; // a tile of another size: keep the flat colour
      const t = new THREE.DataTexture(tile.albedo, tile.w, tile.h);
      t.needsUpdate = true;
      for (let v = 0; v < FLOOR_VARIANTS; v += n) renderer.copyTextureToTexture(t, this.floors, null, new THREE.Vector2((type % FLOOR_COLS) * size.x * FLOOR_VARIANTS + v * size.x, Math.floor(type / FLOOR_COLS) * size.y));
      t.dispose();
      this.floorReady[type] = 1;
    }
    this.pendingFloors = [];
  }

  /** Fill the area tiles over a rectangle of ground, nearest (x, z) first, for up to `budgetMs`.
   *  Returns how many there are still missing. */
  /** The dancefloor's pictures in its textures (drawn by an art worker while the build went on: discoSettle), before it's drawn. */
  setDisco(base: HTMLCanvasElement, lit: HTMLCanvasElement): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms;
    for (const [t, c] of [[u.uDiscoBase.value, base], [u.uDiscoLit.value, lit]] as [THREE.CanvasTexture, HTMLCanvasElement][]) { t.image = c; t.needsUpdate = true; }
  }

  /** The area texture's tiles in `rect` round (x, z) (render/areaWindow.ts: the near window), nearest first, for about `budgetMs`:
   *  how many are left. The far window (the telescope's) only with the time left once the near one's done, and not counted: the
   *  start and the tools wait for what's drawn round her, as before. */
  fill(renderer: THREE.WebGLRenderer, rect: { minX: number; maxX: number; minZ: number; maxZ: number }, x: number, z: number, budgetMs: number): number {
    if (!this.initialised) { renderer.initTexture(this.floors); this.initialised = true; }
    if (this.pendingFloors.length) this.placeFloors(renderer);
    const t0 = performance.now(), left = this.near.fill(renderer, rect, x, z, budgetMs), spare = budgetMs - (performance.now() - t0);
    if (!left && spare > 0) this.far.fill(renderer, rect, x, z, spare);
    return left;
  }

  /** Map tile (i, j)'s texels at `tpm` (render/areaWindow.ts areaTexel): each one's area look, openness and pond. */
  private areaTile(data: Uint8Array, i: number, j: number, tpm: number): void {
    const e = this.map.extent, tm = AREA_TILE / tpm, x0 = e.minX + i * tm, z0 = e.minZ + j * tm;
    // Ponds are part of the ground: every one is marked in the tile, so none can pop.
    const ponds = this.forest.lightsNear(x0 + tm / 2, z0 + tm / 2, tm / 2 + 6).filter(l => l.kind === "pond");
    for (let y = 0; y < AREA_TILE; y++) for (let x = 0; x < AREA_TILE; x++) {
      const wx = x0 + (x + 0.5) / tpm, wz = z0 + (y + 0.5) / tpm;
      const a = this.map.areaAt(wx, wz), o = (y * AREA_TILE + x) * 2;
      let pond = false;
      for (const p of ponds) if (Math.hypot(wx - p.x, wz - p.z) < 3 * p.size) pond = true;
      [data[o], data[o + 1]] = areaTexel(a.look, a.openness, pond);
    }
  }

  /** The area textures' GPU memory (bytes): for the debug overlay and the tools. */
  get areaBytes(): number { return this.near.bytes + this.far.bytes; }

  /** Let go of all of it: the area texture, the land's, the floors, the carvings, the dancefloor's looks and tiles and the lakes'
   *  map (the height field's texture is the HeightField's own, left alone). */
  /** The area textures' uniforms (render/areaWindow.ts AREA_GLSL: read them with areaAt), and how many looks the shaders' tables hold: for the layers
   *  that read the areas (render/loadingMist.ts). */
  get areaUniforms(): { uniforms: Record<string, THREE.IUniform>; slots: number } {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms;
    return { uniforms: Object.fromEntries(["uAreas", "uAreasFar", "uExtent", "uExtentFar", "uAreaWin", "uAreaWinFar"].map(k => [k, u[k]])), slots: TYPE_SLOTS };
  }

  dispose(): void {
    this.disposed = true;
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms;
    for (const k of ["uDiscoBase", "uDiscoLit", "uLakes", "uLakeLooks"]) (u[k]?.value as THREE.Texture | null)?.dispose();
    this.near.dispose(); this.far.dispose(); this.landTex?.dispose(); this.floors.dispose(); this.carve.dispose(); this.lakeCarve.dispose(); this.plazaSigil.dispose(); this.discoTiles.dispose();
    this.mesh.geometry.dispose(); this.plain.dispose(); this.beach?.dispose(); this.loadingFallback.dispose();
  }
}

/** The plaza round the floor (tuning dancefloor.paving), in the rim's stone (art/dancefloor.js DISCO_LOOK). */
function paving(map: ForestMap, disco: { tileM: number; pitch: number; rimOuter: number }) {
  const t = map.tuning, P = t.dancefloor.paving, L = Art.DISCO_LOOK as Record<string, number[]>, rgb = (c: number[]) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255);
  const inner = (disco.rimOuter * disco.tileM) / disco.pitch, R = speakerRadius(t);
  return {
    uPave: { value: new THREE.Vector4(inner, groundPavementRadius(map), P.course, P.stone) },
    uPave2: { value: new THREE.Vector4(P.ragged, P.missing, P.moss, R) },
    uZooStreet: { value: new THREE.Vector4(map.zoo?.layout ? 1 : 0, HOME_LOOK, ZOO_CONFIG.lip ?? 110, 0) }, // (the zoo laid out like the chart: its streets in this stone, its edge's lip)
    uPaveStone: { value: rgb(L.rim) }, uPaveDark: { value: rgb(L.rimDark) }, uPaveMoss: { value: rgb(L.moss) }, uPaveGrout: { value: rgb(L.grout) },
  };
}

// The dancefloor's looks from the art (art/dancefloor.js): the unlit floor with its rim, and the lit
// tile at its three intensities, white for the shader to tint; the tile grid sized to the floor's radius.
function discoLooks(art: DiscoArt) {
  const tex = (c: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(c); t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.flipY = false; t.colorSpace = THREE.NoColorSpace; return t; };
  return { base: tex(art.base), lit: tex(art.lit), tileM: art.tileM, pitch: art.pitch, size: art.size, gridOrigin: art.gridOrigin, rimOuter: art.rimOuter };
}

/** The dancefloor's looks drawn (discoLooks), for a Ground. */
export interface DiscoArt { base: HTMLCanvasElement; lit: HTMLCanvasElement; tileM: number; pitch: number; size: number; gridOrigin: number; rimOuter: number }

/** The dancefloor's looks, by style (the same on every island: the page's, a later island's ground takes them as they are). */
const DISCO = new WeakMap<Style, DiscoDrawn>();
/** The art job for them. */
export const discoJob = (st: Style): ArtJob => ({ kind: "disco", id: "floor", style: st });

/** The dancefloor's looks for a Ground (discoArt): their grid now; their pictures now if they're kept or drawn here, else (sliced)
 *  drawn by an art worker while the build goes on, put in by the build's last step (`later`: Ground.setDisco). */
export function* discoArt(st: Style, radius: number, art?: (job: ArtJob) => Promise<ArtResult>): Steps<{ art: DiscoArt; later: Later<DiscoDrawn> | null }> {
  yield "disco";
  const kept = DISCO.get(st);
  if (kept) return { art: discoOf(kept, radius), later: null };
  const l = yield* later<DiscoDrawn>(
    () => art ? art(discoJob(st)).then(r => ({ ...r.disco!, base: pixelCanvas(r.disco!.base), lit: pixelCanvas(r.disco!.lit) })) : Promise.reject(new Error("here")),
    () => discoDrawn(st));
  if (l.got) { DISCO.set(st, l.value!); return { art: discoOf(l.value!, radius), later: null }; }
  // (meanwhile: blank pictures in the textures the drawn ones go into; nothing's drawn before they're in)
  const fb = Art.discoFloorBase() as { size: number; pitch: number; gridOrigin: number; rimOuter: number }, blank = () => { const c = document.createElement("canvas"); c.width = c.height = 1; return c; };
  return { art: discoOf({ base: blank(), lit: blank(), pitch: fb.pitch, size: fb.size, gridOrigin: fb.gridOrigin, rimOuter: fb.rimOuter, radius: Art.DISCO_RADIUS as number }, radius), later: l };
}
/** The worker's drawing in its place (discoArt's `later`), kept for the page. */
export function* discoSettle(st: Style, ground: Ground, l: Later<DiscoDrawn>): Steps {
  const d = yield* settle(l);
  DISCO.set(st, d);
  ground.setDisco(d.base as HTMLCanvasElement, d.lit as HTMLCanvasElement);
}
const discoOf = (d: DiscoDrawn, radius: number): DiscoArt => ({ base: d.base as HTMLCanvasElement, lit: d.lit as HTMLCanvasElement, tileM: radius / d.radius, pitch: d.pitch, size: d.size, gridOrigin: d.gridOrigin, rimOuter: d.rimOuter });

/** The lakes' map (rules/lakes.ts) for the ground shader: how far into a lake, as a half-float texture eased between its samples;
 *  and their koi. */
function lakeUniforms(map: ForestMap, share: number, koiSize: number): Record<string, THREE.IUniform> {
  const bounds = map.bounds, L = bounds.lakes;
  const koi = { value: Array.from({ length: 8 }, () => new THREE.Vector4()) };
  if (!L) return { uLake: { value: new THREE.Vector4() }, uLakeBox: { value: new THREE.Vector4() }, uLakes: { value: null }, uLakeLooks: { value: null }, uKoi: koi, uKoiSize: { value: koiSize } };
  // (koi only in the plain water: render/lakeLooks.ts, the biome lakes' looks)
  const K = lakeLooksOf(map)!;
  groundKoi(map, share).forEach((k, i) => koi.value[i].set(k.x, k.z, k.r, k.seed + k.count / 10));
  const N = L.cols * L.rows, data = new Uint16Array(N), h = THREE.DataUtils.toHalfFloat;
  for (let k = 0; k < N; k++) data[k] = h(Math.max(-60, Math.min(60, L.dist[k])));
  const t = gpuKind(new THREE.DataTexture(data, L.cols, L.rows, THREE.RedFormat, THREE.HalfFloatType), "ground");
  t.magFilter = t.minFilter = THREE.LinearFilter; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
  return { uLake: { value: new THREE.Vector4(1, L.step / 2, 0, 0) }, uLakeBox: { value: new THREE.Vector4(L.x0, L.z0, 1 / (L.step * L.cols), 1 / (L.step * L.rows)) }, uLakes: { value: t }, uLakeLooks: { value: lakeLookTexture(K) }, uKoi: koi, uKoiSize: { value: koiSize } };
}

/** A koi's scale in the shader (Ed, 2026-10-12: "large, similar to the size of a baby creature"): as long as a baby creature is
 *  drawn tall, about BABY_PX art pixels (art/creatures3d.js drawHeight1) times the style's creatureScale, at the art pixel's
 *  metres; over the shape's own length (1.12). About 4.2 m at today's numbers. */
const BABY_PX = 30;
export const koiScale = (st: Style, metresPerPixel: number): number => (BABY_PX * ((st as { creatureScale?: number }).creatureScale ?? 1) * metresPerPixel) / 1.12;

/** The zoo's plaza's sigil mask, PLAZA_SIGIL square, its lines 1: the World Tree's legendary circle (art/sigils.js legendSigilStrokes,
 *  its rings and runes whole) round the plain World Tree (its own sigil's strokes, without the legend's extra detail, at half the
 *  legend's width: at full width and detail its crown fills in, a blob from her height; the coordinator, 2026-10-26). */
const PLAZA_SIGIL = 512;
type Stroke = { kind: string; dot: boolean; pts: [number, number][]; w: number; r: number };
function plazaSigil(zoo: boolean): THREE.DataTexture {
  const n = zoo ? PLAZA_SIGIL : 1, px = new Uint8Array(n * n * 4);
  if (zoo) {
    const S = legendSigilStrokes as (id: string, o: { tier: number }) => Stroke[];
    const strokes = [...S("worldTree", { tier: 2 }).filter(s => s.kind !== "animal").map(s => ({ ...s, w: s.w * 0.5, r: s.r * 0.7 })), ...S("worldTree", { tier: 0 }).filter(s => s.kind === "animal").map(s => ({ ...s, w: s.w * 0.25, r: s.r * 0.45 }))]; // (half as thick: Ed, 2026-10-26)
    const m = new Float32Array(n * n);
    for (const st of strokes) {
      const half = st.dot ? st.r * n : Math.max(1, (st.w * n) / 2), P = st.pts.map(([x, y]) => [x * n, y * n]);
      const segs = st.dot ? [[P[0], P[0]]] : P.slice(1).map((b, k) => [P[k], b]);
      for (const [a, b] of segs) {
        const x0 = Math.max(0, Math.floor(Math.min(a[0], b[0]) - half - 1)), x1 = Math.min(n - 1, Math.ceil(Math.max(a[0], b[0]) + half + 1));
        const y0 = Math.max(0, Math.floor(Math.min(a[1], b[1]) - half - 1)), y1 = Math.min(n - 1, Math.ceil(Math.max(a[1], b[1]) + half + 1));
        const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          const qx = x + 0.5, qy = y + 0.5, t = l2 ? Math.max(0, Math.min(1, ((qx - a[0]) * dx + (qy - a[1]) * dy) / l2)) : 0;
          const v = Math.max(0, Math.min(1, half + 0.5 - Math.hypot(qx - a[0] - dx * t, qy - a[1] - dy * t))), k = y * n + x;
          if (v > m[k]) m[k] = v;
        }
      }
    }
    for (let k = 0; k < n * n; k++) { const v = Math.round(m[k] * 255); px[k * 4] = px[k * 4 + 1] = px[k * 4 + 2] = v; px[k * 4 + 3] = 255; }
  }
  const t = new THREE.DataTexture(px, n, n);
  t.magFilter = t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.flipY = false; t.needsUpdate = true;
  return t;
}
