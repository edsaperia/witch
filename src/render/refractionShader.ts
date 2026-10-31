import { REFRACTION_LIMIT, REFRACTION_MAX_PIXELS } from "./refractionMath";

/** Inject after the composite's existing uLow declaration; no extra full-screen pass or render target. */
export const REFRACTION_GLSL = /* glsl */ `
uniform sampler2D uRefractionDepth;
uniform int uRefractionCount;
uniform vec4 uRefractionShape[${REFRACTION_LIMIT}]; // centre uv, half-width/height uv
uniform vec4 uRefractionState[${REFRACTION_LIMIT}]; // nearest depth, kind (plume/ring), clock/phase, art-pixel strength
vec2 refractScene(vec2 p) {
  if (uRefractionCount == 0) return p;
  float depth = texture2D(uRefractionDepth, p).r;
  float guardDepth = 0.0;
  vec2 offset = vec2(0.0);
  for (int i = 0; i < ${REFRACTION_LIMIT}; i++) {
    if (i >= uRefractionCount) break;
    vec4 shape = uRefractionShape[i], state = uRefractionState[i];
    if (depth < state.x) continue;
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
    if (mask > 0.0) guardDepth = max(guardDepth, state.x);
    offset += direction * mask * state.w;
  }
  // Whole art-pixel offsets and texel-centre clamps: never borrow a hidden/imaginary screen pixel.
  offset = floor(clamp(offset, vec2(-${REFRACTION_MAX_PIXELS.toFixed(1)}), vec2(${REFRACTION_MAX_PIXELS.toFixed(1)})) + 0.5);
  if (all(equal(offset, vec2(0.0)))) return p;
  vec2 at = clamp(p + offset / uLow, 0.5 / uLow, 1.0 - 0.5 / uLow);
  float sourceDepth = texture2D(uRefractionDepth, at).r;
  // Conservative source guard too: background heat cannot pull a foreground silhouette sideways.
  if (sourceDepth < guardDepth) return p;
  return at;
}
`;
