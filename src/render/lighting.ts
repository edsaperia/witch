// The night lighting, as shader code shared by sprites and ground: the Art Lab's lighting pass
// (art/lighting.js) moved into 3D. Twilight ambient, moonlight from the upper left, moonbeams,
// and the witch's glow, each stepped into a few light bands with a little dithering.
import * as THREE from "three";
import { hsv2rgb } from "../../art/generator.js";
import type { Style } from "./style";

/** The most point lights shaded at once (the light budget in the tuning file may be lower). */
export const MAX_LIGHTS = 24;

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
  // The disco ball: position (w: 1 when present), and spin, speck density, brightness, reach.
  uDisco: { value: new THREE.Vector4() },
  uDiscoParams: { value: new THREE.Vector4() },
  uDiscoColour: { value: new THREE.Vector3(1, 1, 1) },
  // The scenery budget (view.ts): scenery fades out between radius - fade and radius metres
  // from the haze centre (the witch). x: radius, y: fade.
  uScenery: { value: new THREE.Vector2(1e6, 1) },
};

export type LightUniforms = typeof LIGHT_UNIFORMS;

/** Set the light colours from a style (the Art Lab's knobs). One set of uniforms is shared by
 *  every material, so this and the glow position update everything at once. */
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
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${MAX_LIGHTS}], uLightCol[${MAX_LIGHTS}];
uniform int uLightCount;
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour;
uniform vec2 uScenery;

// How much of a piece of scenery at P is drawn (1 well inside the scenery radius, 0 beyond it).
float sceneryFade(vec3 P) {
  return 1.0 - smoothstep(uScenery.x - uScenery.y, uScenery.x, length(P.xz - uHazeCentre));
}

// Fade toward the twilight haze with distance, in a few dithered steps so it stays pixel art.
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
  h *= h; // light through the middle distance, full only at the far edge
  if (uSmooth > 0.5) return mix(c, uHazeColour, h);
  float q = h * 4.0, fr = fract(q);
  q = floor(q) + (fr > (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.66 : 0.33) ? 1.0 : 0.0);
  return mix(c, uHazeColour, q / 4.0);
}

float lightStep(float f) {
  if (uSmooth > 0.5) return max(0.0, f); // smooth light: no bands, no dither
  float q = f * uBands;
  float fr = fract(q);
  if (uDither > 0.0 && abs(fr - 0.5) < uDither * 0.5) q += mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.5 : -0.5;
  return max(0.0, floor(q)) / uBands;
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
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower);
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
`;
