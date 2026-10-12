// MOCKUP (not for merging; Ed, 2026-10-12: "Ground sigils shouldn't show on top of creatures' feet. Pixels are nicer - it's their
// glow that makes them hard to see, not the pixellation"): ?sigilGlow= tries ways of drawing every sigil glyph from the leash
// atlas (placed, happy runes, the ghost, a dropped flask, the treetop projection, her stack) legibly, on the pixel grid, in the
// world, under creatures as today:
//   today  as now: added on top of the ground (additive), a soft halo dot under each placed sigil and ready rune, blooming;
//   tight  no halo dot, and the glyph added at about half its brightness, under the bloom's threshold: no bloom round it;
//   ink    no halo dot; the glyph painted in its neon (not added: it holds its colour on bright ground) with a one-pixel dark
//          outline from the atlas's own pixels, so it reads against grass, light and dark alike;
//   state  ink, and states told apart by shape, not brightness: parked solid; ready to pick up solid with a ring of pixel dots
//          turning round it; happy but not yet ready hollow (its neon outline round dark strokes); the ghost hollow too.
import * as THREE from "three";
import { SLOT, SLOTS, VERT, type Instances } from "./glyphs";
import { LIGHT_GLSL } from "../lighting";

export type GlowMode = "today" | "tight" | "ink" | "state";
export const GLOW_MODE: GlowMode = (() => {
  try { const m = new URLSearchParams(location.search).get("sigilGlow"); return m === "tight" || m === "ink" || m === "state" ? m : "today"; } catch { return "today"; }
})();
/** Whether the soft halo dots under placed sigils and ready runes are drawn. */
export const HALOS = GLOW_MODE === "today";
/** How bright an added glyph is drawn (tight: under the bloom's threshold). */
export const ADD_BRIGHT = GLOW_MODE === "tight" ? 0.5 : 1;

/** The ink glyph: its own pixels in its colour (normal blending), a dark outline where a neighbouring atlas pixel is the glyph's;
 *  a negative alpha draws it hollow (the outline in its colour, the strokes dark). */
export const INK_FRAG = /* glsl */ `
uniform sampler2D uGlyphs;
uniform float uTexel;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
varying float vPix, vN;
${LIGHT_GLSL}
void main() {
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw) discard;
  bool hollow = vCol.a < 0.0;
  float A = abs(vCol.a), me = texture2D(uGlyphs, vUv).a, n = 0.0;
  for (int i = -1; i <= 1; i++) for (int j = -1; j <= 1; j++) n = max(n, texture2D(uGlyphs, vUv + vec2(float(i), float(j)) * uTexel).a);
  vec3 ink = vec3(0.03, 0.025, 0.06), neon = min(vCol.rgb, vec3(1.0));
  vec4 o;
  if (me > 0.5) o = hollow ? vec4(ink, 0.8 * A) : vec4(neon, A);
  else if (n > 0.5) o = hollow ? vec4(neon, A) : vec4(ink, 0.78 * A);
  else discard;
  gl_FragColor = vec4(haze(o.rgb, vWorld), o.a);
}`;

/** Whether an atlas rect is a sigil glyph (not the soft dot in slot 0, nor the solid square in the last slot). */
export function isGlyph(uv: number[]): boolean {
  const N = SLOT * SLOTS, x = Math.round(uv[0] * N), y = Math.round((1 - uv[1]) * N);
  return !(x === 0 && y === 0) && !(x === (SLOTS - 1) * SLOT && y === (SLOTS - 1) * SLOT);
}

/** The state of the runes being added now (state mode): their shape. */
export type InkState = "solid" | "hollow";

/** Routes `base`'s glyphs to `twin` (ink, state), dims them (tight), or leaves them (today); hollow ones by `state()`. */
export function inkHook(base: Instances, twin: Instances | null, state: () => InkState): void {
  if (GLOW_MODE === "today") return;
  const add = base.add.bind(base), begin = base.begin.bind(base), end = base.end.bind(base);
  base.begin = () => { begin(); twin?.begin(); };
  base.end = () => { end(); twin?.end(); };
  base.add = (x, y, z, size, uv, r, g, b, a, draw = 1, glow = false) => {
    if (!isGlyph(uv)) { add(x, y, z, size, uv, r, g, b, a, draw, glow); return; }
    if (GLOW_MODE === "tight" || !twin) { add(x, y, z, size, uv, r * ADD_BRIGHT, g * ADD_BRIGHT, b * ADD_BRIGHT, a, draw, glow); return; }
    twin.add(x, y, z, size, uv, r, g, b, GLOW_MODE === "state" && state() === "hollow" ? -a : a, draw, glow);
  };
}

/** An ink twin of a glyph material: the same vertex shader and settings, the ink fragment shader, normal blending. */
export function inkMaterial(from: THREE.ShaderMaterial, atlasPx: number): THREE.ShaderMaterial {
  const m = from.clone();
  m.vertexShader = VERT; m.fragmentShader = INK_FRAG;
  m.uniforms = { ...from.uniforms, uTexel: { value: 1 / atlasPx } };
  m.blending = THREE.NormalBlending;
  return m;
}
