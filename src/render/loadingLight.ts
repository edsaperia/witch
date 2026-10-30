/** Cheap boot-warmed surface light: visible ambient plus the witch's existing pool parameters. */
export const LOADING_LIGHT_GLSL = `
uniform vec3 uAmb, uMoon, uGlowPos, uGlowRgb;
uniform float uGlowR, uGlowNear, uGlowFalloff, uGlowPower, uGlowDim;
vec3 loadingLight(vec3 colour, vec3 P) {
  float radius = max(0.1, uGlowR * uGlowNear);
  float fall = pow(max(0.0, 1.0 - length(P.xz - uGlowPos.xz) / radius), uGlowFalloff);
  vec3 ambient = max(vec3(0.35), uAmb + uMoon * 0.75);
  return colour * ambient + uGlowRgb * fall * min(1.0, uGlowPower) * uGlowDim * 0.45;
}
`;
