// Witch creature palettes (#79, stage 2): colour moves out of the bake. A sprite is baked once into
// a material mask (which material each pixel is, and whether it's an outline), and its colours come
// from a palette row at draw time: one RGBA per material (the alpha 254 for the glowing ones, as the
// lighting pass expects), then one per material for an outline pixel beside it (a third of it). So a colour variant costs a palette row, not a rebake.
// paintMask does on the CPU exactly what the sprite shader does (PALETTE_GLSL): paintMask(mask,
// paletteRow(colours)) is pixel for pixel bake(sp, colours).A.
// A species' palette is a ramp of five shades of its coat (BODY3 darkest, BODY2, BODY, BELLY, and
// ACCENT for horns and hooves) worked out from one colour, plus its fixed eyes, nose and magic; a
// variant swaps the coat for one of the curated PALETTE_VARIANTS (or any hue, sat, val).
import { M, EMISSIVE } from "../core.js";
import { SPECIES_BY_ID, speciesColours } from "../creatures.js";

export const PALETTE_SIZE = 64, PALETTE_ROW = PALETTE_SIZE * 2; // materials 0..63 (M goes to 51); a row is their colours, then their outline colours
const OUTLINE_DARK = [22, 18, 30];

// A sprite's material mask: mat (its material, or for an outline pixel the material it outlines)
// and kind (0 empty, 1 drawn, 2 an outline tinted from its material, 3 the fixed dark outline), as
// bake would draw it with that outline mode.
export function bakeMask(sp, outlineMode = "tint") {
  const { w, h } = sp, mat = new Uint8Array(w * h), kind = new Uint8Array(w * h), outline = outlineMode === "none" ? null : outlineMode === "dark" ? "dark" : "tint";
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, m = sp.m[i];
    if (m) { mat[i] = m; kind[i] = 1; continue; }
    if (!outline) continue;
    const nb = [sp.get(x + 1, y), sp.get(x - 1, y), sp.get(x, y + 1), sp.get(x, y - 1)].find(v => v);
    if (!nb) continue;
    mat[i] = nb; kind[i] = outline === "dark" ? 3 : 2;
  }
  return { w, h, mat, kind, outline: outlineMode };
}

// A palette row, from a colours table (material -> [r, g, b]) as bake reads it: RGBA per material (a
// missing colour magenta; LINE, if it has none, BODY2 darkened, as bake falls back to), then the
// outline colour beside each (a third of its colour, black for one without).
export function paletteRow(colours, outlineMode = "tint") {
  const row = new Uint8Array(PALETTE_ROW * 4);
  for (let m = 1; m < PALETTE_SIZE; m++) {
    let c = colours[m];
    if (m === M.LINE && !c) c = outlineMode === "dark" ? OUTLINE_DARK : (colours[M.BODY2] || [0, 0, 0]).map(v => v * .55 | 0);
    c = c || [255, 0, 255];
    row.set([c[0], c[1], c[2], EMISSIVE.has(m) ? 254 : 255], m * 4);
    const o = (colours[m] || [0, 0, 0]).map(v => v * .35 | 0);
    row.set([o[0], o[1], o[2], 255], (PALETTE_SIZE + m) * 4);
  }
  return row;
}

// The albedo a mask makes with a palette row, as an RGBA array (what the shader draws).
export function paintPixels(mask, row) {
  const { w, h, mat, kind } = mask, out = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const k = kind[i]; if (!k) continue;
    const o = i * 4, p = (k === 2 ? PALETTE_SIZE + mat[i] : mat[i]) * 4;
    if (k < 3) { out[o] = row[p]; out[o + 1] = row[p + 1]; out[o + 2] = row[p + 2]; out[o + 3] = row[p + 3]; }
    else { out[o] = OUTLINE_DARK[0]; out[o + 1] = OUTLINE_DARK[1]; out[o + 2] = OUTLINE_DARK[2]; out[o + 3] = 255; }
  }
  return out;
}
// ... onto a canvas.
export function paintMask(mask, row, makeCanvas) {
  const c = makeCanvas(mask.w, mask.h), g = c.getContext("2d"), img = g.createImageData(mask.w, mask.h);
  img.data.set(paintPixels(mask, row)); g.putImageData(img, 0, 0);
  return c;
}
// The mask as an image for the GPU: red the material, green the kind, alpha where drawn.
export function maskPixels(mask) {
  const out = new Uint8ClampedArray(mask.w * mask.h * 4);
  for (let i = 0; i < mask.w * mask.h; i++) if (mask.kind[i]) { out[i * 4] = mask.mat[i]; out[i * 4 + 1] = mask.kind[i]; out[i * 4 + 3] = 255; }
  return out;
}

// The sprite shader's lookup: the mask's texel names a material and a kind; the palette texture
// (PALETTE_ROW wide, a row per palette) gives the colour, an outline's from the row's second half.
export const PALETTE_GLSL = `
uniform sampler2D uMask, uPalette; uniform float uRow, uRows;
vec4 paletteColour(vec2 uv) {
  vec4 k = texture2D(uMask, uv);
  if (k.a < .5) return vec4(0.);
  float kind = floor(k.g * 255. + .5);
  if (kind > 2.5) return vec4(22., 18., 30., 255.) / 255.;
  float m = floor(k.r * 255. + .5) + (kind > 1.5 ? ${PALETTE_SIZE}. : 0.);
  return texture2D(uPalette, vec2((m + .5) / ${PALETTE_ROW}., (uRow + .5) / uRows));
}`;

// Curated coat colours for variants (no free hue noise: each a hand-picked colour whose ramp reads).
export const PALETTE_VARIANTS = {
  frost: { name: "Frost", hue: .58, sat: .16, val: .95, belly: "white" },
  ember: { name: "Ember", hue: .02, sat: .85, val: .72 },
  shadow: { name: "Shadow", hue: .74, sat: .28, val: .24 },
  gold: { name: "Gold", hue: .12, sat: .72, val: .88 },
  moss: { name: "Moss", hue: .27, sat: .5, val: .46 },
  rose: { name: "Rose", hue: .93, sat: .42, val: .82 },
  ash: { name: "Ash", hue: .6, sat: .04, val: .55 },
};
// A species' colours in a variant (a PALETTE_VARIANTS key or { hue, sat, val, belly }), gear as speciesColours.
export function variantColours(id, st, variant, gear = null) {
  const S = SPECIES_BY_ID[id], v = typeof variant === "string" ? PALETTE_VARIANTS[variant] : variant;
  if (!v) return speciesColours(id, st, gear);
  return speciesColours({ ...S, hue: v.hue, sat: v.sat, val: v.val, belly: v.belly ?? S.belly }, st, gear);
}
