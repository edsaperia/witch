// The forest floor: one plane under the whole map, coloured per pixel in the shader from the
// Art Lab's ground recipe (noisy patches, each area's own tint, paler in clearings, a pale ring
// for the dancefloor), on the art's pixel grid so it reads as pixel art.
//
// Which area each spot belongs to comes from a data texture filled in small tiles near the
// camera (working the partition out for the whole map at once takes seconds on a phone).
import * as THREE from "three";
import { BAYER_GLSL, VALUE_NOISE_GLSL } from "./shaders";
import * as Art from "../../art/generator.js";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import { LOOKS } from "../rules/map";
import { speakerRadius } from "../rules/speakers";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_GLSL, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import type { TilePixels } from "./artBuild";
import type { Style } from "./style";

const TEXELS_PER_METRE = 2;
const TILE = 32; // texels
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
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[${TYPE_SLOTS}];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[${TYPE_SLOTS}];
uniform vec3 uTerrain[${TYPE_SLOTS}];        // each type's ground features: mounds, hollows, ridges (0 or 1)
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
uniform vec4 uCircle;
uniform vec4 uSweeps[4]; // partifying areas: the front's origin x, z, its radius, strength
// The sleeping legends' clearings near her (Ed, 2026-10-06; rules/map.ts legendClearings): middle x, z, radius, ring width;
// uLegendGlow: each one's ring brightening (0 to 1), when she stands in it.
uniform vec4 uLegendRings[6];
uniform float uLegendGlow[6];
uniform int uLegendRingCount;
uniform int uSweepCount; // magic circle: hue, second hue, brightness (pulsing), rune band's turn (radians)

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
uniform vec3 uPaveStone, uPaveDark, uPaveMoss, uPaveGrout;
uniform vec3 uRelief; // the ground's relief: strength, scale (metres), shade
uniform float uHillShade; // the hills' slopes in the light, exaggerated this much
uniform float uBare;  // ?bare=2: a flat grey ground with contour lines (0.5 m) and a 10 m grid
varying vec3 vWorld;
${LIGHT_GLSL}
${HEIGHT_GLSL}
${VALUE_NOISE_GLSL}${BAYER_GLSL}vec3 hsv(float h, float s, float v) {
  vec3 k = clamp(abs(mod(fract(h) * 6.0 + vec3(0, 4, 2), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return clamp(v, 0.0, 1.0) * mix(vec3(1.0), k, clamp(s, 0.0, 1.0));
}
void main() {
  vec2 px = floor(vWorld.xz / uPixel);           // the art pixel this fragment is in
  vec2 p = (px + 0.5) * uPixel;                   // its centre, in metres
  // Wobble the lookup a little so area borders read as ragged, not as the texture's grid.
  vec2 j = vec2(vnoise(px / 5.0) - 0.5, vnoise(px / 5.0 + 17.0) - 0.5) * 0.9;
  vec4 area = texture2D(uAreas, (p + j - uExtent.xy) / uExtent.zw);
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
    vec4 a1 = texture2D(uAreas, (q - uExtent.xy) / uExtent.zw);
    vec2 off = (vec2(vnoise(px / 3.0 + 91.0), vnoise(px / 3.0 + 37.0)) - 0.5) * uBlend.z;
    vec4 a2 = texture2D(uAreas, (q + off - uExtent.xy) / uExtent.zw);
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
  // A sleeping legend's clearing: a soft ring of trodden earth set with pale stones marks its edge, the
  // floor inside a touch darker and mossier (worn smooth round the sleeper); its ring brightens while
  // she stands in it. (Its twilight and motes are the lighting's: render/mood.ts and friends.)
  for (int i = 0; i < 6; i++) {
    if (i >= uLegendRingCount) break;
    vec4 L = uLegendRings[i];
    float d = length(p - L.xy);
    if (d > L.z + 1.0) continue;
    float wob = (vnoise(p / 3.0) - 0.5) * 0.6, band = 1.0 - smoothstep(0.0, L.w * 0.5, abs(d + wob - (L.z - L.w * 0.5)));
    if (d < L.z - L.w) c = mix(c, c * vec3(0.86, 0.95, 0.9), 0.6);
    c *= 1.0 - 0.38 * band;
    vec2 sc = floor(px / 2.0);
    float h = fract(sin(dot(sc, vec2(12.9898, 78.233))) * 43758.5453);
    if (band > 0.55 && h > 0.84) c = mix(vec3(0.42, 0.44, 0.47), vec3(0.62, 0.64, 0.66), fract(h * 7.0)) * (0.8 + 0.4 * vnoise(px));
    if (uLegendGlow[i] > 0.0) c += vec3(0.35, 0.55, 0.6) * band * uLegendGlow[i] * 0.35;
  }
  // The dancefloor: the art's floor of glass tiles inside its stone rim; a lit tile glows in its
  // colour (unlit by the night: it is the light), the rest is lit like the ground.
  {
    vec2 fd = p - uFloor.xy;
    if (length(fd) / uDiscoGeom.x * uDiscoGeom.y < uDiscoRim) {
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
    } else if (uPave.y > 0.0) {
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
  }
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
      vec2 at = p + j - uExtent.xy;
      float up1 = texture2D(uAreas, (at + vec2(0.0, -max(uPixel * 2.0, 0.3))) / uExtent.zw).b, up2 = texture2D(uAreas, (at + vec2(0.0, -max(uPixel * 4.0, 0.6))) / uExtent.zw).b;
      float far = texture2D(uAreas, (at + vec2(0.0, -1.3)) / uExtent.zw).b;
      float lip = max(uPixel * 1.5, 0.25), side = min(min(texture2D(uAreas, (at + vec2(-lip, 0.0)) / uExtent.zw).b, texture2D(uAreas, (at + vec2(lip, 0.0)) / uExtent.zw).b), texture2D(uAreas, (at + vec2(0.0, lip)) / uExtent.zw).b);
      vec3 rim = mix(vec3(0.6, 0.66, 0.74), uMoon, 0.25);
      if (spec <= 0.965) {
        if (far < 0.5 && mod(px.x + px.y, 2.0) < 1.0) water += vec3(0.05, 0.07, 0.11); // the sky in the far water
        float g = fract(sin(dot(floor(px / 2.0), vec2(41.3, 289.1))) * 43758.5453);
        if (g > 0.985 && sin(uTime * (1.5 + g * 40.0) + g * 90.0) > 0.6) water = vec3(0.75, 0.8, 0.88); // a glint
      }
      if (up1 < 0.5) water = rim; // the moonlit far shore
      else if (up2 < 0.5 && mod(px.x, 2.0) < 1.0) water = mix(water, rim, 0.5);
      else if (side < 0.5) water = vec3(0.07, 0.06, 0.05) * (0.6 + 0.8 * nightLight(vec3(0.0, 1.0, 0.0), vWorld)); // the muddy lip
      gl_FragColor = vec4(haze(water, vWorld), 1.0);
      return;
    }
  }
  // The party arriving: a front of glowing runes sweeping across the area, a soft glow behind it.
  for (int i = 0; i < 4; i++) {
    if (i >= uSweepCount) break;
    float d = length(p - uSweeps[i].xy), front = uSweeps[i].z, k = uSweeps[i].w;
    if (k <= 0.0 || d > front + 3.0) continue;
    if (abs(d - front) < 2.2) {
      vec2 cell = floor(px / 3.0);
      if (fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453) > 0.55 && mod(px.x + px.y, 3.0) < 2.0) {
        vec3 col = mod(cell.x + cell.y, 2.0) > 0.5 ? hsv(uCircle.x, 0.7, 1.0) : hsv(uCircle.y, 0.7, 1.0);
        gl_FragColor = vec4(haze(col * k, vWorld), 1.0);
        return;
      }
    }
    if (d < front) c += hsv(uCircle.x, 0.6, 0.18) * k * (1.0 - smoothstep(0.0, 1.0, (front - d) / 30.0));
  }
  float moonK = 1.0;
  if (uCanopy.x > 0.0) {
    // The canopy's shadow: a dappled layer at canopy height, cast along the moonlight onto the
    // ground, drifting with the wind; thinner where the canopy thins, in the clearings.
    vec2 q = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(q / 2.6) * 0.6 + vnoise(q / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (open - uClearing.x) / max(0.01, uClearing.y));
    float edge = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.03 : -0.03;
    if (uSmooth > 0.5) moonK = 1.0 - uCanopy.x * smoothstep(-0.07, 0.07, cover - leaves);
    else if (leaves + edge < cover) moonK = 1.0 - uCanopy.x;
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
  if (uBare > 1.5) {
    // The bare view's plain ground: grey, a darker line where the height crosses each half metre
    // (the art pixel next door on the other side of it), and a faint 10 m grid.
    float hc = groundH(p), hx = groundH(p + vec2(uPixel, 0.0)), hz = groundH(p + vec2(0.0, uPixel));
    // Tinted by height (low ground cool and dark, high warm and light), so the swells read at a glance.
    c = mix(vec3(0.3, 0.36, 0.48), vec3(0.82, 0.76, 0.6), clamp(hc / 5.0 + 0.5, 0.0, 1.0));
    if (floor(hc / 0.5) != floor(hx / 0.5) || floor(hc / 0.5) != floor(hz / 0.5)) c = mod(floor(hc / 0.5 + 0.5), 5.0) < 0.5 ? vec3(0.02, 0.02, 0.04) : vec3(0.12, 0.1, 0.16); // every 2.5 m darkest
    if (mod(px.x, 10.0 / uPixel) < 1.0 || mod(px.y, 10.0 / uPixel) < 1.0) c *= 0.85;
  }
  vec3 light = nightLightShaded(N, vWorld, moonK);
  gl_FragColor = vec4(haze(glowPool(min(vec3(1.0), c * light * 1.25), vWorld), vWorld), 1.0); // (her pool in her light's colour)
}
`;

export class Ground {
  readonly mesh: THREE.Mesh;
  private texture: THREE.DataTexture;
  /** One tile's texels, filled on the CPU and copied into the texture. */
  private tile = new Uint8Array(TILE * TILE * 4);
  private filled: Uint8Array;
  private tilesX: number;
  private tilesZ: number;
  private initialised = false;
  private floorReady = new Array(TYPE_SLOTS).fill(0);
  private floors: THREE.DataTexture;
  private discoTiles = (t => { t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; return t; })(new THREE.DataTexture(new Uint8Array(32 * 32 * 4), 32, 32));
  private pendingFloors: [number, TilePixels][] = [];

  constructor(private map: ForestMap, private forest: Forest, st: Style, metresPerPixel: number) {
    const e = map.extent, w = e.maxX - e.minX, d = e.maxZ - e.minZ;
    const W = Math.ceil((w * TEXELS_PER_METRE) / TILE) * TILE, H = Math.ceil((d * TEXELS_PER_METRE) / TILE) * TILE;
    this.tilesX = W / TILE; this.tilesZ = H / TILE;
    this.filled = new Uint8Array(this.tilesX * this.tilesZ);
    const nearest = (t: THREE.DataTexture) => { t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true; return t; };
    this.texture = nearest(new THREE.DataTexture(new Uint8Array(W * H * 4), W, H));
    this.floors = nearest(new THREE.DataTexture(new Uint8Array(64 * FLOOR_VARIANTS * FLOOR_COLS * 48 * FLOOR_ROWS * 4), 64 * FLOOR_VARIANTS * FLOOR_COLS, 48 * FLOOR_ROWS));
    const floors = Array.from({ length: TYPE_SLOTS }, (_, i) => new THREE.Vector3(...(LOOKS[i]?.floor ?? [0.25, 0.45, 0.4])));
    const disco = discoLooks(st, map.dancefloor.radius);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS,
        uAreas: { value: this.texture },
        uExtent: { value: new THREE.Vector4(e.minX, e.minZ, W / TEXELS_PER_METRE, H / TEXELS_PER_METRE) },
        uPixel: { value: metresPerPixel },
        uTypeFloor: { value: floors },
        uFloorReady: { value: this.floorReady },
        uTerrain: { value: Array.from({ length: TYPE_SLOTS }, (_, i) => { const tr = LOOKS[i]?.layout.terrain ?? []; return new THREE.Vector3(+tr.includes("mounds"), +tr.includes("hollows"), +tr.includes("ridges")); }) },
        uFloors: { value: this.floors },
        uTile: { value: new THREE.Vector2(64, 48) },
        uFloorsSize: { value: new THREE.Vector2(64 * FLOOR_VARIANTS * FLOOR_COLS, 48 * FLOOR_ROWS) },
        uSat: { value: st.sat },
        uFloor: { value: new THREE.Vector3(map.dancefloor.x, map.dancefloor.z, map.dancefloor.radius) },
        uCanopy: { value: new THREE.Vector4() },
        uCircle: { value: new THREE.Vector4() },
        uSweeps: { value: Array.from({ length: 4 }, () => new THREE.Vector4()) },
        uSweepCount: { value: 0 },
        uLegendRings: { value: Array.from({ length: 6 }, () => new THREE.Vector4()) },
        uLegendGlow: { value: new Array(6).fill(0) },
        uLegendRingCount: { value: 0 },
        uClearing: { value: new THREE.Vector2(map.tuning.clearingSize, map.tuning.clearingFalloff) },
        uDiscoBase: { value: disco.base }, uDiscoLit: { value: disco.lit }, uDiscoTiles: { value: this.discoTiles },
        uDiscoGeom: { value: new THREE.Vector4(disco.tileM, disco.pitch, disco.size, disco.gridOrigin) }, uDiscoRim: { value: disco.rimOuter },
        ...paving(map, disco),
        uBare: { value: map.tuning.bare ?? 0 }, uHillShade: { value: map.tuning.ground.hills.shade ?? 1 },
        uRelief: { value: new THREE.Vector3(map.tuning.ground.relief.strength, map.tuning.ground.relief.scale, map.tuning.ground.relief.shade) },
        uBlend: { value: (B => (B.on ? new THREE.Vector4(B.warp, B.fine, B.band, B.dither ? 1 : 0) : new THREE.Vector4()))(map.tuning.groundBlend) },
      },
    });
    const geo = new THREE.PlaneGeometry(REACH * 2, REACH * 2, (REACH * 2) / GRID, (REACH * 2) / GRID);
    geo.rotateX(-Math.PI / 2);
    const P = geo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < P.count; i++) { // the outermost ring: out to the skirt, flat (the hills end inside it)
      if (Math.abs(P.getX(i)) >= REACH - 0.01) P.setX(i, Math.sign(P.getX(i)) * SKIRT);
      if (Math.abs(P.getZ(i)) >= REACH - 0.01) P.setZ(i, Math.sign(P.getZ(i)) * SKIRT);
    }
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.follow((e.minX + e.maxX) / 2, (e.minZ + e.maxZ) / 2);
  }

  /** Keep the grid round (x, z), snapped to its squares so the hills don't swim. */
  follow(x: number, z: number): void { this.mesh.position.set(Math.round(x / GRID) * GRID, 0, Math.round(z / GRID) * GRID); }

  /** This frame's dancefloor tiles: per tile r, g, b and intensity (0 to 3), row by row (rules/dancefloor.ts). */
  setFloorTiles(rgbi: Uint8Array): void {
    const d = this.discoTiles.image.data as Uint8Array;
    for (let i = 0; i < d.length; i += 4) { d[i] = rgbi[i]; d[i + 1] = rgbi[i + 1]; d[i + 2] = rgbi[i + 2]; d[i + 3] = Math.min(255, rgbi[i + 3] * 85); }
    this.discoTiles.needsUpdate = true;
  }

  /** The fronts of light sweeping across areas as the party arrives (up to 4). */
  setSweeps(sweeps: { x: number; z: number; radius: number; strength: number }[]): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, list = u.uSweeps.value as THREE.Vector4[];
    sweeps.slice(0, 4).forEach((w, i) => list[i].set(w.x, w.z, w.radius, w.strength));
    u.uSweepCount.value = Math.min(4, sweeps.length);
  }

  /** The sleeping legends' clearings nearest her (up to 6): their middles, radii, ring widths, and each ring's brightening (0-1). */
  setLegendRings(rings: readonly { x: number; z: number; r: number; edge: number; glow?: number }[]): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, list = u.uLegendRings.value as THREE.Vector4[], glow = u.uLegendGlow.value as number[];
    rings.slice(0, 6).forEach((c, i) => { list[i].set(c.x, c.z, c.r, c.edge); glow[i] = c.glow ?? 0; });
    u.uLegendRingCount.value = Math.min(6, rings.length);
  }

  /** The magic circle: its two hues, brightness now, and the rune band's turn. */
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
  fill(renderer: THREE.WebGLRenderer, rect: { minX: number; maxX: number; minZ: number; maxZ: number }, x: number, z: number, budgetMs: number): number {
    if (!this.initialised) { renderer.initTexture(this.texture); renderer.initTexture(this.floors); this.initialised = true; }
    if (this.pendingFloors.length) this.placeFloors(renderer);
    const e = this.map.extent, tm = TILE / TEXELS_PER_METRE;
    const i0 = Math.max(0, Math.floor((rect.minX - e.minX) / tm)), i1 = Math.min(this.tilesX - 1, Math.floor((rect.maxX - e.minX) / tm));
    const j0 = Math.max(0, Math.floor((rect.minZ - e.minZ) / tm)), j1 = Math.min(this.tilesZ - 1, Math.floor((rect.maxZ - e.minZ) / tm));
    const cx = (x - e.minX) / tm, cz = (z - e.minZ) / tm, todo: [number, number, number][] = [];
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++)
      if (!this.filled[j * this.tilesX + i]) todo.push([i, j, (i + 0.5 - cx) ** 2 + (j + 0.5 - cz) ** 2]);
    todo.sort((a, b) => a[2] - b[2]);
    const t0 = performance.now();
    let done = 0;
    for (const [i, j] of todo) {
      if (done > 0 && performance.now() - t0 > budgetMs) break;
      this.fillTile(renderer, i, j);
      done++;
    }
    return todo.length - done;
  }

  private fillTile(renderer: THREE.WebGLRenderer, i: number, j: number): void {
    const e = this.map.extent, data = this.tile, tm = TILE / TEXELS_PER_METRE;
    const x0 = e.minX + i * tm, z0 = e.minZ + j * tm;
    // Ponds are part of the ground: every one is marked in the tile, so none can pop.
    const ponds = this.forest.lightsNear(x0 + tm / 2, z0 + tm / 2, tm / 2 + 6).filter(l => l.kind === "pond");
    for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) {
      const wx = x0 + (x + 0.5) / TEXELS_PER_METRE, wz = z0 + (y + 0.5) / TEXELS_PER_METRE;
      const a = this.map.areaAt(wx, wz), o = (y * TILE + x) * 4;
      let pond = 0;
      for (const p of ponds) if (Math.hypot(wx - p.x, wz - p.z) < 3 * p.size) pond = 255;
      data[o] = a.look; data[o + 1] = Math.round(a.openness * 255); data[o + 2] = pond; data[o + 3] = 255;
    }
    // Copied from a texture three.js has never seen, so it's a plain texSubImage2D from these bytes:
    // one it had uploaded went through framebuffers (copyTexSubImage2D), which waits on the GPU's
    // queued work, up to hundreds of ms a tile (Ed, 2026-10-06: occasional half-second freezes).
    renderer.copyTextureToTexture(new THREE.DataTexture(this.tile, TILE, TILE), this.texture, null, new THREE.Vector2(i * TILE, j * TILE));
    this.filled[j * this.tilesX + i] = 1;
  }

  dispose(): void { this.texture.dispose(); this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose(); }
}

/** The plaza round the floor (tuning dancefloor.paving), in the rim's stone (art/dancefloor.js DISCO_LOOK). */
function paving(map: ForestMap, disco: { tileM: number; pitch: number; rimOuter: number }) {
  const t = map.tuning, P = t.dancefloor.paving, L = Art.DISCO_LOOK as Record<string, number[]>, rgb = (c: number[]) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255);
  const inner = (disco.rimOuter * disco.tileM) / disco.pitch, R = speakerRadius(t), outer = R + t.dancefloor.speakers.footprint + P.beyond;
  return {
    uPave: { value: new THREE.Vector4(inner, P.on ? outer : 0, P.course, P.stone) },
    uPave2: { value: new THREE.Vector4(P.ragged, P.missing, P.moss, R) },
    uPaveStone: { value: rgb(L.rim) }, uPaveDark: { value: rgb(L.rimDark) }, uPaveMoss: { value: rgb(L.moss) }, uPaveGrout: { value: rgb(L.grout) },
  };
}

// The dancefloor's looks from the art (art/dancefloor.js): the unlit floor with its rim, and the lit
// tile at its three intensities, white for the shader to tint; the tile grid sized to the floor's radius.
function discoLooks(st: Style, radius: number) {
  const tex = (c: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(c); t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.flipY = false; t.colorSpace = THREE.NoColorSpace; return t; };
  const fb = Art.discoFloorBase() as { sp: unknown; size: number; pitch: number; gridOrigin: number; rimOuter: number };
  const base = (Art.bake(fb.sp, { ...Art.discoColours(3), ...Art.discoRimColours() }, st, "none") as { A: HTMLCanvasElement }).A;
  const lit = document.createElement("canvas");
  lit.width = 42; lit.height = 14;
  const g = lit.getContext("2d")!;
  for (let k = 1; k <= 3; k++) g.drawImage((Art.bake(Art.discoTileSprite("lit", { level: k }), Art.discoColours(k), st, "none") as { A: HTMLCanvasElement }).A, (k - 1) * 14, 0);
  return { base: tex(base), lit: tex(lit), tileM: radius / (Art.DISCO_RADIUS as number), pitch: fb.pitch, size: fb.size, gridOrigin: fb.gridOrigin, rimOuter: fb.rimOuter };
}
