// GLSL chunks used by more than one shader (issue #122), each the very text its users had written
// out by hand, so a shader that takes one compiles to what it was. The bend and height lift stay in
// height.ts (HEIGHT_GLSL, HEIGHT_VERT_GLSL) and the light in lighting.ts (LIGHT_GLSL), as before.

/** A smooth value noise on a unit grid (0 to 1), with its cell hash: hash(p), vnoise(p). Vertex or fragment. */
export const VALUE_NOISE_GLSL = /* glsl */ `
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`;

/** An ordered (Bayer) threshold on the art's pixel grid, 0 to 1: bayer4(p), built from bayer2. */
export const BAYER_GLSL = /* glsl */ `
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`;

/** The wind's gusts travelling across the forest (Ed, v171), 0 to 1 at q (in gust cells): windGust(q). Trees and tufts sway by the same one. */
export const WIND_GUST_GLSL = /* glsl */ `
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`;

/** How far to move a vertex (in clip space, times its w) so the thing whose base projects to b
 *  sits on the pixel grid, moving a whole pixel at a time: pixelSnap(b). Needs uniform vec2 uRes. */
export const PIXEL_SNAP_GLSL = /* glsl */ `
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`;
