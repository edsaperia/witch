// The night lighting, as shader code shared by sprites and ground: the Art Lab's lighting pass
// (art/lighting.js) moved into 3D. Twilight ambient, moonlight from the upper left, moonbeams,
// and the witch's glow, each stepped into a few light bands with a little dithering.
import * as THREE from "three";
import { hsv2rgb } from "../../art/generator.js";
import type { Style } from "./style";

/** The most point lights shaded at once (the light budget in the tuning file may be lower). */
export const MAX_LIGHTS = 24;
/** The sleeping legends' clearings lit at once, the nearest (render/glades.ts). */
export const MAX_GLADES = 4;

export const LIGHT_UNIFORMS = {
  uAmb: { value: new THREE.Vector3() },
  uMoon: { value: new THREE.Vector3() },
  uMoonDir: { value: new THREE.Vector3(-0.45, 0.75, 0.5).normalize() },
  uMoonBeam: { value: new THREE.Vector3() },
  /** The moon's fill on upward faces: its colour times its strength (the mood's moonUp, moonUpHue, moonUpSat; 0 none), and in w
   *  the share every face gets whatever its normal (moonUpWrap). */
  uMoonUp: { value: new THREE.Vector4() },
  uBands: { value: 4 },
  uDither: { value: 0.35 },
  uShafts: { value: 0.3 },
  uShaftScale: { value: 1 },
  uGlowPos: { value: new THREE.Vector3() },
  uGlowRgb: { value: new THREE.Vector3() },
  uGlowR: { value: 8 },
  uGlowFalloff: { value: 2.5 },
  /** The share of uGlowR where the glow has fallen to dark (tuning glowNear). */
  uGlowNear: { value: 1 },
  uGlowPower: { value: 1.4 },
  /** Her glow's strength by height (tuning nightLight.treetopGlow, eased in as she rises): 1 on the ground. */
  uGlowDim: { value: 1 },
  // The twilight haze: the forest fades into it from near to far metres from the witch.
  uHazeCentre: { value: new THREE.Vector2() },
  uHazeRange: { value: new THREE.Vector2(70, 200) },
  uHazeColour: { value: new THREE.Vector3() },
  uTime: { value: 0 },
  // ?fx=smooth (1): haze and canopy dapple as smooth gradients; ?fx=pixel (0): dithered steps.
  uSmooth: { value: 1 },
  // Point lights in the forest (the dancefloor's circle, campfires, magic stones...): the
  // nearest few, as position + reach, and colour + strength. Count in uLightCount.
  uLightPos: { value: Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector4()) },
  uLightCol: { value: Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector4()) },
  uLightCount: { value: 0 },
  /** The legends' clearings (render/glades.ts): each one's centre x, z, radius and edge (0 to 1); how many; the twilight's
   *  colour; its pool's and its edge ring's strength. */
  uGlade: { value: Array.from({ length: MAX_GLADES }, () => new THREE.Vector4()) },
  uGladeCount: { value: 0 },
  uGladeRgb: { value: new THREE.Vector3() },
  uGladeLight: { value: new THREE.Vector2() },
  /** The forest's light outside a clearing while she's in one (1 as it is; the clearing's own twilight is never dimmed). */
  uDim: { value: 1 },
  /** Slowed time in a legend's circle (render/slowtime.ts): the circle's centre x, z, its radius, and how slowed the world
   *  outside is (0 normal to 1 at its slowest): outside, the world greys and cools; the circle's edge shimmers. */
  uSlow: { value: new THREE.Vector4() },
  /** Real time (s), for what keeps its pace while the world slows (uTime slows with it: render/slowtime.ts). */
  uRealTime: { value: 0 },
  // The disco ball: position (w: 1 when present), and spin, speck density, brightness, reach.
  uDisco: { value: new THREE.Vector4() },
  uDiscoParams: { value: new THREE.Vector4() },
  uDiscoColour: { value: new THREE.Vector3(1, 1, 1) },
  // The scenery budget (view.ts): scenery fades out between radius - fade and radius metres
  // from the haze centre (the witch). x: radius, y: fade.
  uScenery: { value: new THREE.Vector2(1e6, 1) },
  /** The party's over (render/partyOver.ts): home x, z, the switch-off front's distance from it (0: playing) and its width. */
  uPartyOver: { value: new THREE.Vector4(0, 0, 0, 30) },
};

export type LightUniforms = typeof LIGHT_UNIFORMS;

/** Set the light colours from a style (the Art Lab's knobs). One set of uniforms is shared by
 *  every material, so this and the glow position update everything at once. */
/** How far her pool's ground takes her light's own colour at its centre (0 none, 1 all): glowPool. */
export const POOL_WARMTH = 0.95;
/** The most brightness her pool's ground takes from the floor (0 to 1): a bright floor (the party's lit grass) stays amber, not yellow-white (the art director's round 4). */
export const POOL_CAP = 0.55;
/** The least brightness of her pool's ground at its centre (0 to 1): a dark floor still shows her light. */
export const POOL_LIFT = 0.16;

export function applyStyleLight(st: Style, glowReach: number, metresPerArtPixel: number, ambientScale = 1, glowFalloff = 2.5, moonScale = 1): void {
  const v = (rgb: number[], k: number) => new THREE.Vector3(rgb[0] / 255 * k, rgb[1] / 255 * k, rgb[2] / 255 * k);
  LIGHT_UNIFORMS.uAmb.value.copy(v(hsv2rgb(st.ambientHue, 0.55, 1), st.ambient * ambientScale));
  LIGHT_UNIFORMS.uMoon.value.copy(v(hsv2rgb(st.moonHue, (st as { moonSat?: number }).moonSat ?? 0.35, 1), st.moon * moonScale));
  LIGHT_UNIFORMS.uMoonBeam.value.copy(v(hsv2rgb(st.moonHue, 0.35, 1), st.shafts * 0.25));
  LIGHT_UNIFORMS.uBands.value = st.bands;
  LIGHT_UNIFORMS.uDither.value = st.dither * 0.5;
  LIGHT_UNIFORMS.uShafts.value = st.shafts;
  LIGHT_UNIFORMS.uShaftScale.value = metresPerArtPixel * 2;
  LIGHT_UNIFORMS.uGlowRgb.value.copy(v(hsv2rgb(st.glowHue, st.glowSat, 1), 1));
  LIGHT_UNIFORMS.uGlowR.value = glowReach;
  LIGHT_UNIFORMS.uGlowFalloff.value = glowFalloff;
  LIGHT_UNIFORMS.uGlowPower.value = st.glowPower;
  LIGHT_UNIFORMS.uHazeColour.value.copy(v(hsv2rgb(st.ambientHue - 0.08, 0.55, 1), 0.16 * Math.sqrt(ambientScale)));
}

export const LIGHT_GLSL = /* glsl */ `
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform vec4 uMoonUp;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${MAX_LIGHTS}], uLightCol[${MAX_LIGHTS}];
uniform vec4 uGlade[${MAX_GLADES}];
uniform int uGladeCount;
uniform vec3 uGladeRgb;
uniform vec2 uGladeLight;
uniform float uDim;
uniform vec4 uSlow;
uniform float uRealTime;
uniform int uLightCount;
uniform vec4 uPartyOver;
// The party's over: how far switched off a party light at P is (0 on, 1 off), the front rippling out from home.
float partyOff(vec3 P) { if (uPartyOver.z <= 0.0) return 0.0; return smoothstep(0.0, 1.0, (uPartyOver.z - distance(P.xz, uPartyOver.xy)) / uPartyOver.w); }
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour;
uniform vec2 uScenery;

// How much of a piece of scenery at P is drawn (1 well inside the scenery radius, 0 beyond it).
float sceneryFade(vec3 P) {
  return 1.0 - smoothstep(uScenery.x - uScenery.y, uScenery.x, length(P.xz - uHazeCentre));
}

// Fade toward the twilight haze with distance, in a few dithered steps so it stays pixel art.
// Time slowed outside a legend's circle (Ed, 2026-10-06; render/slowtime.ts): the world beyond its edge greys and cools,
// as it eases to a crawl; inside, as it is.
vec3 slowGrade(vec3 c, vec3 P) {
  if (uSlow.w <= 0.0) return c;
  float k = uSlow.w * smoothstep(uSlow.z - 0.5, uSlow.z + 1.5, length(P.xz - uSlow.xy));
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  return mix(c, mix(c, vec3(l), 0.75) * vec3(0.86, 0.95, 1.12), k);
}
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
  h *= h; // light through the middle distance, full only at the far edge
  if (uSmooth > 0.5) return slowGrade(mix(c, uHazeColour * uDim, h), P);
  float q = h * 4.0, fr = fract(q);
  q = floor(q) + (fr > (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.66 : 0.33) ? 1.0 : 0.0);
  return slowGrade(mix(c, uHazeColour * uDim, q / 4.0), P);
}

float lightStep(float f) {
  if (uSmooth > 0.5) return max(0.0, f); // smooth light: no bands, no dither
  float q = f * uBands;
  float fr = fract(q);
  if (uDither > 0.0 && abs(fr - 0.5) < uDither * 0.5) q += mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.5 : -0.5;
  return max(0.0, floor(q)) / uBands;
}

// A sleeping legend's clearing (render/glades.ts; Ed: "lit with an eerie twilight"): a cool pool filling the circle,
// soft at its edge, and a ring at the edge that brightens with the clearing's edge (the witch inside, a sigil put down).
vec3 gladeLight(vec3 P) {
  vec3 l = vec3(0.0);
  for (int i = 0; i < ${MAX_GLADES}; i++) {
    if (i >= uGladeCount) break;
    vec4 G = uGlade[i];
    float d = length(P.xz - G.xy);
    if (d > G.z * 1.2) continue;
    float pool = 1.0 - smoothstep(G.z * 0.45, G.z, d), q = (d - G.z) / (G.z * 0.07), ring = exp(-q * q);
    l += uGladeRgb * (pool * uGladeLight.x + ring * (0.25 + 0.75 * G.w) * uGladeLight.y);
  }
  // Slowed time: its circle's edge shimmers, so the boundary of the magic reads (a ring of light flickering round it).
  if (uSlow.w > 0.0) {
    vec2 v = P.xz - uSlow.xy;
    float q = (length(v) - uSlow.z) / 0.6, a = atan(v.y, v.x);
    l += uGladeRgb * uSlow.w * exp(-q * q) * (0.35 + 0.65 * (0.5 + 0.5 * sin(a * 23.0 + uRealTime * 5.0)) * (0.5 + 0.5 * sin(a * 7.0 - uRealTime * 3.1)));
  }
  return l;
}

// N: world normal; P: world position; moonK: how much moonlight gets through (a shadow lowers
// it; the witch's own glow is never shadowed). Returns the light falling on that pixel.
vec3 nightLightShaded(vec3 N, vec3 P, float moonK) {
  vec3 l = uAmb * mix(1.0, moonK, 0.5) + uMoon * moonK * lightStep(max(0.0, dot(N, uMoonDir)));
  // The moon's fill from the open sky on whatever faces up (the art director's round 2: "dark should
  // still be legible"): canopy tops and open ground catch it, the undersides and the shade don't.
  // Wrapped (round 3): a crown's regular bumps lit by their own normals alone made a lattice of bright dots.
  l += uMoonUp.rgb * (moonK * mix(max(0.0, N.y), 1.0, uMoonUp.w));
  if (uShafts > 0.0 && moonK > 0.99) {
    // Moonbeams: diagonal bands across the world, as the lab draws them across the screen.
    float s = mod(P.x / uShaftScale + P.z * 0.9 / uShaftScale, 150.0);
    if (uSmooth > 0.5) l += uMoonBeam * smoothstep(0.0, 6.0, s) * (1.0 - smoothstep(28.0, 34.0, s)); // soft-edged beams
    else {
      float chk = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0);
      if (s < 34.0 && (chk > 0.5 || (s > 4.0 && s < 30.0))) l += uMoonBeam;
    }
  }
  // The witch's glow (Ed, v147: "should fall off faster"; round 11: "a bit flat, it should fall off
  // closer"): full under her, falling off with the distance along the ground as
  // (1 - d/(reach × near))^falloff, a bright centre dropping quickly to dark at near of the reach;
  // lit from a source above her, so there's no hot spot under her.
  vec3 v = uGlowPos - P;
  float dg = length(v.xz), gr = uGlowR * uGlowNear;
  if (dg < gr) {
    float ndl = max(0.0, dot(N, normalize(v + vec3(0.0, 1e-4, 0.0)))) * 0.35 + 0.65;
    float fall = pow(1.0 - dg / gr, uGlowFalloff);
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower) * uGlowDim;
  }
  for (int i = 0; i < ${MAX_LIGHTS}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    float ndl = max(0.0, dot(N, lv / max(ld, 1e-4))) * 0.7 + 0.3;
    float fall = 1.0 - ld / reach;
    l += uLightCol[i].rgb * min(1.0, ndl * fall * fall * uLightCol[i].w);
  }
  l = l * uDim + gladeLight(P); // (inside a clearing the forest goes dark: Ed, 2026-10-06; render/glades.ts)
  if (uDisco.w > 0.5) {
    // The disco ball's specks: a grid of spots on a sphere round the ball, turning with it,
    // thrown onto whatever stands nearby.
    vec3 dv = P - uDisco.xyz;
    float dd = length(dv);
    if (dd < uDiscoParams.w && dd > 0.5) {
      vec3 dir = dv / dd;
      float az = atan(dir.z, dir.x) + uTime * uDiscoParams.x, el = asin(clamp(dir.y, -1.0, 1.0));
      vec2 g = vec2(az * 9.0, el * 9.0);
      vec2 cell = floor(g), f = fract(g) - 0.5;
      float pick = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
      float spot = 0.18 * (1.0 - dd / uDiscoParams.w * 0.5);
      if (pick < uDiscoParams.y && dot(f, f) < spot * spot) l += uDiscoColour * uDiscoParams.z * (1.0 - dd / uDiscoParams.w);
    }
  }
  return l;
}
vec3 nightLight(vec3 N, vec3 P) { return nightLightShaded(N, P, 1.0); }
// Her pool in her light's own colour (the art director, round 3: "a lime glow sits on the ground at the front of home's
// dancefloor"): her warm light times green grass came out lime, the brightest thing at home and off its palette. Within her
// pool, the lit ground's colour (col) is pulled toward her light's hue at the same brightness, most at its centre. And on a
// dark floor (the fern forest's litter: "her light doesn't show") it's never darker than POOL_LIFT there, so her pool reads.
vec3 glowPool(vec3 col, vec3 P) {
  vec3 v = uGlowPos - P;
  float dg = length(v.xz), gr = uGlowR * uGlowNear;
  if (dg >= gr || uGlowPower <= 0.0) return col;
  vec3 Y = vec3(0.3, 0.55, 0.15);
  float fall = pow(1.0 - dg / gr, uGlowFalloff) * min(1.0, uGlowPower) * uGlowDim;
  vec3 warm = max(min(dot(col, Y), ${POOL_CAP.toFixed(3)}), ${POOL_LIFT.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${POOL_WARMTH.toFixed(2)} * fall);
}
`;
