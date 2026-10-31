import { REFRACTION_LIMIT, REFRACTION_MAX_PIXELS } from "./refractionMath";

/** Inject after the composite's existing uLow declaration; no extra full-screen pass or render target. */
export const REFRACTION_GLSL = /* glsl */ `
uniform sampler2D uRefractionDepth;
uniform int uRefractionCount;
uniform vec4 uRefractionShape[${REFRACTION_LIMIT}]; // centre uv, half-width/height uv
uniform vec4 uRefractionState[${REFRACTION_LIMIT}]; // protected support depth, kind (plume/ring), clock/phase, art-pixel strength
float refractionDepthAt(vec2 p) {
  // Existing potion wobble can linearly sample four scene texels. Protect every participating foreground texel.
  vec2 cell = p * uLow - 0.5, nearest = floor(cell + 0.5);
  if (all(lessThan(abs(cell - nearest), vec2(0.0001)))) return texture2D(uRefractionDepth, p).r;
  vec2 base = floor(cell), lo = clamp((base + 0.5) / uLow, 0.5 / uLow, 1.0 - 0.5 / uLow);
  vec2 hi = clamp((base + 1.5) / uLow, 0.5 / uLow, 1.0 - 0.5 / uLow);
  return min(min(texture2D(uRefractionDepth, lo).r, texture2D(uRefractionDepth, vec2(hi.x, lo.y)).r),
             min(texture2D(uRefractionDepth, vec2(lo.x, hi.y)).r, texture2D(uRefractionDepth, hi).r));
}
vec2 refractScene(vec2 p) {
  if (uRefractionCount == 0) return p;
  float depth = -1.0;
  float guardDepth = 0.0;
  vec2 offset = vec2(0.0);
  for (int i = 0; i < ${REFRACTION_LIMIT}; i++) {
    if (i >= uRefractionCount) break;
    vec4 shape = uRefractionShape[i], state = uRefractionState[i];
    vec2 q = (p - shape.xy) / max(shape.zw, vec2(0.000001));
    float r = length(q), mask;
    vec2 direction;
    if (state.y < 0.5) {
      mask = max(0.0, 1.0 - dot(q, q)); mask *= mask;
      direction = vec2(sin(q.y * 11.0 - state.z * 3.0), 0.25 * sin(q.x * 9.0 + q.y * 6.0 - state.z * 2.0));
    } else {
      mask = max(0.0, 1.0 - abs(r - state.z) / 0.12); mask *= mask * (1.0 - state.z);
      direction = r > 0.00001 ? q / r : vec2(0.0);
    }
    if (mask <= 0.0) continue;
    if (depth < 0.0) depth = refractionDepthAt(p);
    if (depth < state.x) continue;
    guardDepth = max(guardDepth, state.x);
    offset += direction * mask * state.w;
  }
  // Whole art-pixel offsets and texel-centre clamps: never borrow a hidden/imaginary screen pixel.
  offset = floor(clamp(offset, vec2(-${REFRACTION_MAX_PIXELS.toFixed(1)}), vec2(${REFRACTION_MAX_PIXELS.toFixed(1)})) + 0.5);
  if (all(equal(offset, vec2(0.0)))) return p;
  vec2 at = (clamp(floor(p * uLow) + offset, vec2(0.0), uLow - 1.0) + 0.5) / uLow;
  // Potion wobble can supply a fractional p. Keep the final displacement bounded even when snapping it.
  if (any(greaterThan(abs(at - p) * uLow, vec2(${REFRACTION_MAX_PIXELS.toFixed(1)} + 0.0001)))) return p;
  float sourceDepth = refractionDepthAt(at);
  // Conservative source guard too: background heat cannot pull a foreground silhouette sideways.
  if (sourceDepth < guardDepth) return p;
  return at;
}
`;
