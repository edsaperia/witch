// Witch art generator: the entry point for everything that draws and bakes the game's
// code-drawn sprites. A style object (the Witch Art Lab's knobs) goes in; sprites come out
// as an albedo canvas plus a normal map, for the deferred lighting pass to light.
// No page or DOM dependencies beyond making canvases: pass `makeCanvas(w, h)` where there
// is no `document` (the default uses document, else OffscreenCanvas).
// Parts: core.js (sprites, shapes, bake), creatures.js + babies.js (the bestiary),
// this file (the style's knobs, trees, bushes, the witch, a whole asset set).

import { defaultCanvas, rng, uni, pick, gauss, hash2, vnoise, hsv2rgb, M, EMISSIVE, Sprite, spline, band, tufts, polyMask, edgeVectors, rot, lerp2, bake } from "./core.js";
import { SPECIES, SPECIES_BY_ID, FEATURE_NAMES, speciesColours, critter, levelHeight } from "./creatures.js";
export { defaultCanvas, rng, uni, pick, gauss, hash2, vnoise, hsv2rgb, M, EMISSIVE, Sprite, spline, band, tufts, polyMask, edgeVectors, rot, lerp2, bake, SPECIES, SPECIES_BY_ID, FEATURE_NAMES, speciesColours, critter, levelHeight };

// ================= the style genome =================
export const KNOBS = [
  { k: "ambientHue", g: "Night light", label: "Twilight hue", min: 0, max: 1, step: 0.01, v: 0.68, hue: true },
  { k: "ambient", g: "Night light", label: "Twilight brightness", min: 0.05, max: 0.6, step: 0.01, v: 0.22 },
  { k: "moon", g: "Night light", label: "Moonlight", min: 0, max: 1, step: 0.01, v: 0.3 },
  { k: "moonHue", g: "Night light", label: "Moon hue", min: 0, max: 1, step: 0.01, v: 0.58, hue: true },
  { k: "glowHue", g: "Night light", label: "Witch glow hue", min: 0, max: 1, step: 0.01, v: 0.13, hue: true },
  { k: "glowSat", g: "Night light", label: "Witch glow colour", min: 0, max: 1, step: 0.01, v: 0.35 },
  { k: "glowRadius", g: "Night light", label: "Witch glow reach", min: 30, max: 200, step: 5, v: 110 },
  { k: "glowPower", g: "Night light", label: "Witch glow strength", min: 0.3, max: 2.5, step: 0.05, v: 1.4 },
  { k: "bands", g: "Shading", label: "Light steps", min: 2, max: 7, step: 1, v: 4 },
  { k: "dither", g: "Shading", label: "Dithering", min: 0, max: 1, step: 0.05, v: 0.35 },
  { k: "round", g: "Shading", label: "Roundness", min: 0.2, max: 1.5, step: 0.05, v: 0.9 },
  { k: "outline", g: "Shading", label: "Plant outline", options: ["none", "dark", "tinted"], v: "none" },
  { k: "cOutline", g: "Shading", label: "Creature outline", options: ["dark", "tinted", "none"], v: "dark" },
  { k: "shafts", g: "Night light", label: "Moonbeams", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "areaContrast", g: "Colour", label: "Difference between areas", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "sat", g: "Colour", label: "Saturation", min: 0.2, max: 1.3, step: 0.01, v: 0.9 },
  { k: "leafHue", g: "Colour", label: "Leaf hue", min: 0, max: 1, step: 0.01, v: 0.3, hue: true },
  { k: "leafVariety", g: "Colour", label: "Leaf colour variety", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "trunkHue", g: "Colour", label: "Bark hue", min: 0, max: 1, step: 0.01, v: 0.07, hue: true },
  { k: "groundHue", g: "Colour", label: "Ground hue", min: 0, max: 1, step: 0.01, v: 0.27, hue: true },
  { k: "groundVal", g: "Colour", label: "Ground brightness", min: 0.15, max: 0.7, step: 0.01, v: 0.4 },
  { k: "pixel", g: "Shading", label: "Pixel size", min: 1, max: 5, step: 1, v: 2 },
  { k: "treeSize", g: "Trees", label: "Tree height", min: 0.5, max: 1.5, step: 0.05, v: 0.85 },
  { k: "crownWidth", g: "Trees", label: "Crown width", min: 1, max: 4, step: 0.1, v: 3 },
  { k: "clearing", g: "Trees", label: "Clearing size", min: 0, max: 1, step: 0.05, v: 0.55 },
  { k: "depth", g: "Map", label: "Border detail (fractal layers)", min: 0, max: 6, step: 1, v: 4 },
  { k: "areaScale", g: "Map", label: "Area size (screens)", min: 0.6, max: 2, step: 0.05, v: 1 },
  { k: "areaTypes", g: "Map", label: "Area types", min: 4, max: 30, step: 1, v: 30 },
  { k: "density", g: "Trees", label: "Foliage density", min: 0.2, max: 1, step: 0.05, v: 0.55 },
  { k: "clump", g: "Trees", label: "Clumpiness", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "gnarl", g: "Trees", label: "Gnarliness", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "roots", g: "Trees", label: "Roots", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "bark", g: "Trees", label: "Bark texture", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "trees", g: "Trees", label: "Tree density", min: 0.2, max: 2, step: 0.05, v: 1 },
  { k: "wBroad", g: "Tree mix", label: "Gnarled broadleaf", min: 0, max: 1, step: 0.05, v: 0.8 },
  { k: "wFir", g: "Tree mix", label: "Fir", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "wWillow", g: "Tree mix", label: "Willow", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "wBirch", g: "Tree mix", label: "Birch", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "wPalm", g: "Tree mix", label: "Tree fern", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "wFlat", g: "Tree mix", label: "Flat-crowned", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "bushes", g: "Undergrowth", label: "Bushes and shrubs", min: 0, max: 120, step: 1, v: 55 },
  { k: "bushSize", g: "Undergrowth", label: "Bush size", min: 0.5, max: 1.8, step: 0.05, v: 1 },
  { k: "flowers", g: "Undergrowth", label: "Flowers", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "cSat", g: "Creatures", label: "Creature saturation", min: 0.1, max: 1, step: 0.01, v: 0.6 },
  { k: "cVal", g: "Creatures", label: "Creature brightness", min: 0.4, max: 1, step: 0.01, v: 0.85 },
  { k: "head", g: "Creatures", label: "Baby head size", min: 0.3, max: 0.6, step: 0.01, v: 0.44 },
  { k: "eye", g: "Creatures", label: "Eye size", min: 0.5, max: 2, step: 0.05, v: 1 },
  { k: "legs", g: "Creatures", label: "Leg length", min: 0.5, max: 1.8, step: 0.05, v: 1 },
  { k: "long", g: "Creatures", label: "Body length", min: 0.7, max: 1.5, step: 0.05, v: 1 },
  { k: "size", g: "Creatures", label: "Baby size (px)", min: 5, max: 14, step: 1, v: 8 },
  { k: "growth", g: "Creatures", label: "Legend vs baby height", min: 5, max: 25, step: 1, v: 20 },
  { k: "magicHue", g: "Creatures", label: "Magic glow hue", min: 0, max: 1, step: 0.01, v: 0.5, hue: true },
  { k: "fur", g: "Creatures", label: "Stripes and spots", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "cloakHue", g: "Witch", label: "Cloak hue", min: 0, max: 1, step: 0.01, v: 0.72, hue: true },
  { k: "hairHue", g: "Witch", label: "Hair hue", min: 0, max: 1, step: 0.01, v: 0.01, hue: true },
];
export const GROUPS = ["Night light", "Shading", "Colour", "Trees", "Tree mix", "Undergrowth", "Map", "Creatures", "Witch"];
export function defaultStyle() { const s = {}; KNOBS.forEach(k => s[k.k] = k.v); return s; }
export function mutate(style, strength, groups, seed) {
  const r = rng(seed), s = { ...style };
  for (const k of KNOBS) {
    if (!groups.has(k.g) || k.k === "pixel") continue;
    if (k.options) { if (r() < strength * 0.35) s[k.k] = pick(r, k.options); continue; }
    if (r() > 0.35 + strength * 0.6) continue;
    let v = s[k.k] + gauss(r) * (k.max - k.min) * strength * 0.35;
    if (k.hue) v = ((v % 1) + 1) % 1;
    v = Math.min(k.max, Math.max(k.min, v));
    if (k.step >= 1) v = Math.round(v);
    s[k.k] = +v.toFixed(3);
  }
  return s;
}

// ================= trees =================
// Each tree returns {sp, crownY}: pixels that are trunk below crownY are the "bottom half".
function leafCluster(sp, cx, cy, rx, ry, st, seed, mat = M.LEAF) {
  sp.ellipse(cx, cy, rx, ry, mat, { density: st.density, noise: st.clump, seed, round: st.round });
  sp.ellipse(cx - rx * .2, cy - ry * .25, rx * .55, ry * .5, M.LEAF2, { density: st.density * .5, noise: st.clump, seed: seed + 9, onlyOn: new Set([mat]), round: st.round });
}
export function broadTree(r, st, s) {
  const W = Math.round(110 * s), H = Math.round(130 * s), sp = new Sprite(W, H, st.crownWidth || 1);
  const crownY = H * .5;
  function branch(x, y, ang, len, th, d) {
    const wob = (r() - .5) * st.gnarl * .9, a = ang + wob;
    const mx = x + Math.cos(a) * len * .5 + (r() - .5) * st.gnarl * len * .4, my = y + Math.sin(a) * len * .5;
    const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len;
    sp.line(x, y, mx, my, th, th * .85, M.TRUNK, st.round); sp.line(mx, my, ex, ey, th * .85, th * .7, M.TRUNK, st.round);
    if (d === 0 || len < 7) { leafCluster(sp, ex, ey - 2, len * uni(r, .8, 1.1) + 6 * s, len * uni(r, .55, .8) + 4 * s, st, (r() * 1e6) | 0); return; }
    const kids = r() < .4 ? 3 : 2;
    for (let i = 0; i < kids; i++) branch(ex, ey, ang + (i - (kids - 1) / 2) * uni(r, .45, .8) + (r() - .5) * .3, len * uni(r, .62, .78), th * .62, d - 1);
    if (d <= 2 && r() < .6) leafCluster(sp, ex, ey, len * .7, len * .45, st, (r() * 1e6) | 0);
  }
  const lean = (r() - .5) * st.gnarl * .9;
  sp.line(W / 2, H - 2, W / 2 - 9 * s, H - 1, 6 * s, 2, M.TRUNK, st.round); sp.line(W / 2, H - 2, W / 2 + 10 * s, H - 1, 6 * s, 2, M.TRUNK, st.round); // roots
  branch(W / 2, H - 3, -Math.PI / 2 + lean, H * .32, 9 * s, 3);
  return { sp, crownY };
}
export function firTree(r, st, s) {
  const W = Math.round(70 * s), H = Math.round(150 * s), sp = new Sprite(W, H, 1 + ((st.crownWidth || 1) - 1) * .35), tx = W / 2;
  sp.line(tx, H - 1, tx, 8, 5 * s, 1.5, M.TRUNK, st.round);
  const tiers = Math.round(uni(r, 8, 12));
  for (let i = 0; i < tiers; i++) {
    const f = i / (tiers - 1), y = 12 + f * (H * .78), len = (6 + f * 26) * s * uni(r, .8, 1.15);
    for (const side of [-1, 1]) {
      const ex = tx + side * len, ey = y + len * .25;
      sp.line(tx, y, ex, ey, 2, 1, M.TRUNK, st.round);
      for (let k = 0; k < 3; k++) { const t = .35 + k * .3; leafCluster(sp, tx + side * len * t, y + len * .25 * t + 1, len * .32 + 2, 3 + len * .08, st, (r() * 1e6) | 0); }
    }
  }
  return { sp, crownY: H * .14 };
}
export function willowTree(r, st, s) {
  const W = Math.round(120 * s), H = Math.round(120 * s), sp = new Sprite(W, H, st.crownWidth || 1), cx = W / 2;
  const crownY = H * .25, limbs = [];
  sp.line(cx, H - 2, cx - 12 * s, H - 1, 6 * s, 2, M.TRUNK, st.round); sp.line(cx, H - 2, cx + 13 * s, H - 1, 6 * s, 2, M.TRUNK, st.round);
  for (const side of [-1, 1]) { const ex = cx + side * uni(r, 14, 26) * s, ey = H * uni(r, .28, .38); sp.line(cx, H - 3, ex, ey, 11 * s, 5 * s, M.TRUNK, st.round); limbs.push([ex, ey]); }
  for (const [lx, ly] of limbs) leafCluster(sp, lx, ly - 4 * s, 26 * s, 13 * s, st, (r() * 1e6) | 0);
  // hanging strands
  for (let x = 6; x < W - 6; x += (1 + (r() < .4 ? 1 : 0)) / sp.sx) {
    const d = Math.abs(x - cx) / (W / 2);
    const top = H * .12 + d * d * H * .25 + r() * 6, len = H * uni(r, .35, .7) * (1 - d * .4);
    for (let y = top; y < top + len; y++) if (hash2(x, y | 0, 5) < st.density * 1.1) sp.put(x + Math.round(Math.sin(y * .15 + x) * .6), y, hash2(x, y | 0, 6) < .3 ? M.LEAF2 : M.LEAF, (x - cx) / W, .2, .95);
  }
  return { sp, crownY };
}
export function birchTree(r, st, s) {
  const W = Math.round(80 * s), H = Math.round(140 * s), sp = new Sprite(W, H, 1 + ((st.crownWidth || 1) - 1) * .5), cx = W / 2, lean = (r() - .5) * 10 * s;
  sp.line(cx, H - 1, cx + lean, 10, 4 * s, 2, M.BARK2, st.round);
  for (let y = 12; y < H - 2; y += uni(r, 4, 9)) { const f = 1 - y / H, x = cx + lean * f; sp.put(x + (r() < .5 ? 0 : 1), y, M.TRUNK); }
  for (let i = 0; i < 7; i++) {
    const f = uni(r, .05, .55), y = 10 + f * H, x = cx + lean * (1 - y / H), side = i % 2 ? 1 : -1, len = uni(r, 8, 20) * s;
    sp.line(x, y, x + side * len, y - len * .4, 2, 1, M.TRUNK, st.round);
    leafCluster(sp, x + side * len, y - len * .4, uni(r, 9, 15) * s, uni(r, 7, 11) * s, st, (r() * 1e6) | 0);
  }
  return { sp, crownY: H * .6 };
}
export function palmTree(r, st, s) {
  const W = Math.round(100 * s), H = Math.round(140 * s), sp = new Sprite(W, H, st.crownWidth || 1), bend = uni(r, -18, 18) * s;
  let px = W / 2, py = H - 1;
  const topX = W / 2 + bend, topY = H * .28;
  for (let i = 1; i <= 20; i++) { const f = i / 20, x = W / 2 + bend * f * f, y = H - 1 - (H - 1 - topY) * f; sp.line(px, py, x, y, 6 * s, 5 * s, M.TRUNK, st.round); px = x; py = y; }
  const fronds = Math.round(uni(r, 8, 11));
  for (let k = 0; k < fronds; k++) {
    const a = -Math.PI / 2 + (k / (fronds - 1) - .5) * Math.PI * 1.25, len = uni(r, 30, 44) * s;
    let x = topX, y = topY;
    for (let j = 0; j < len; j++) {
      const f = j / len, ang = a + (Math.cos(a) > 0 ? 1 : -1) * f * 1.1 * Math.abs(Math.cos(a));
      x += Math.cos(ang); y += Math.sin(ang) + f * .9;
      sp.put(x, y, M.LEAF, Math.cos(ang) * .3, -.3, .9);
      const leaflet = (1 - f) * 6 * s;
      for (let q = 1; q < leaflet; q++) if (hash2(x | 0, (y | 0) + q, k) < st.density + .3) { sp.put(x - Math.sin(ang) * q, y + Math.cos(ang) * q * .8 + q * .3, q > leaflet * .6 ? M.LEAF2 : M.LEAF, -Math.sin(ang) * .5, .3, .8); sp.put(x + Math.sin(ang) * q, y - Math.cos(ang) * q * .8 + q * .3, M.LEAF, Math.sin(ang) * .5, -.2, .85); }
    }
  }
  return { sp, crownY: topY + 4 };
}
export function flatTree(r, st, s) {
  const W = Math.round(130 * s), H = Math.round(110 * s), sp = new Sprite(W, H, st.crownWidth || 1), cx = W / 2;
  sp.line(cx, H - 2, cx - 8 * s, H - 1, 5 * s, 2, M.TRUNK, st.round); sp.line(cx, H - 2, cx + 9 * s, H - 1, 5 * s, 2, M.TRUNK, st.round);
  const lean = (r() - .5) * 14 * s * (st.gnarl + .3);
  sp.line(cx, H - 2, cx + lean, H * .45, 6 * s, 4 * s, M.TRUNK, st.round);
  for (const side of [-1, 1]) sp.line(cx + lean, H * .45, cx + lean + side * 22 * s, H * .3, 4 * s, 2, M.TRUNK, st.round);
  const layers = Math.round(uni(r, 2, 3));
  for (let i = 0; i < layers; i++) {
    const y = H * (.18 + i * .16), w = (55 - i * 8) * s * uni(r, .85, 1.1);
    for (let j = 0; j < 4; j++) leafCluster(sp, cx + lean + (j - 1.5) * w * .45 + uni(r, -4, 4), y + uni(r, -3, 3), w * .42, 9 * s, st, (r() * 1e6) | 0);
  }
  return { sp, crownY: H * .45 };
}
export const TREE_TYPES = [["wBroad", broadTree], ["wFir", firTree], ["wWillow", willowTree], ["wBirch", birchTree], ["wPalm", palmTree], ["wFlat", flatTree]];
export function chooseType(r, st) {
  const tot = TREE_TYPES.reduce((a, [k]) => a + st[k], 0) || 1; let x = r() * tot;
  for (const [k, f] of TREE_TYPES) { x -= st[k]; if (x <= 0) return f; }
  return broadTree;
}
export function treeColours(r, st, type) {
  const h = st.leafHue + (r() - .5) * st.leafVariety * .7 + (type === firTree ? .06 : 0);
  return { [M.TRUNK]: hsv2rgb(st.trunkHue, .45 * st.sat, .32), [M.BARKD]: hsv2rgb(st.trunkHue + .03, .5 * st.sat, .17), [M.BARK2]: [222, 220, 212], [M.LEAF]: hsv2rgb(h, .62 * st.sat, .62), [M.LEAF2]: hsv2rgb(h - .05, .55 * st.sat, .82) };
}

// ================= undergrowth =================
export function bush(r, st) {
  const s = st.bushSize, kind = pick(r, ["round", "round", "fern", "grass", "shrub"]);
  const W = Math.round(34 * s), H = Math.round(26 * s), sp = new Sprite(W, H);
  if (kind === "round" || kind === "shrub") {
    for (let i = 0; i < 4; i++) leafCluster(sp, W / 2 + uni(r, -8, 8) * s, H - 7 * s + uni(r, -4, 2) * s, uni(r, 6, 10) * s, uni(r, 5, 8) * s, { ...st, density: Math.min(1, st.density + .25) }, (r() * 1e6) | 0);
    if (kind === "shrub" || r() < st.flowers) for (let i = 0; i < 18 * st.flowers + 3; i++) { const x = W / 2 + uni(r, -11, 11) * s, y = H - uni(r, 4, 16) * s; if (sp.get(x | 0, y | 0)) sp.put(x, y, M.FLOWER); }
  } else if (kind === "fern") {
    for (let k = 0; k < 7; k++) {
      const a = -Math.PI / 2 + (k / 6 - .5) * 2.4; let x = W / 2, y = H - 1;
      for (let j = 0; j < 14 * s; j++) { x += Math.cos(a) * .9; y += Math.sin(a) * .9 + j * .06; sp.put(x, y, M.LEAF, Math.cos(a) * .4, -.2, .9); if (j % 2) sp.put(x, y - 1, M.LEAF2, 0, -.5, .85); }
    }
  } else {
    for (let k = 0; k < 16 * s; k++) { const x0 = W / 2 + uni(r, -12, 12) * s, h = uni(r, 5, 14) * s, lean = uni(r, -3, 3); for (let j = 0; j < h; j++) sp.put(x0 + lean * j / h, H - 1 - j, j > h * .6 ? M.LEAF2 : M.LEAF, lean * .1, -.3, .9); }
  }
  const c = treeColours(r, st, null); c[M.FLOWER] = hsv2rgb(r(), .55, .95);
  return { sp, colours: c };
}

// ================= the witch (hand-drawn) =================
const WITCH_ROWS = [
  ".........HH.........", "........HHHH........", ".......HHHHHH.......", "......HHHHHHHH......", "....HHHHHHHHHHHH....",
  "........SSS.........", ".......SSESS........", ".......hSSSS........", "......hCCCC.........", ".....hhCCCCC........",
  ".....h.CCCCCC.......", ".......CCCCCCC......", ".......CCCCCCCC.....", "TTTT.BBBBBBBBBBBBBBB", "TTTTTBBBBBBBBBBBBBBB", "TTTT......CC.CC.....",
];
export function witchSprite() {
  const sp = new Sprite(WITCH_ROWS[0].length, WITCH_ROWS.length), key = { H: M.CLOTH, S: M.SKIN, E: M.EYE, h: M.HAIR, C: M.CLOTH, B: M.BROOM, T: M.STRAW };
  WITCH_ROWS.forEach((row, y) => [...row].forEach((ch, x) => key[ch] && sp.put(x, y, key[ch])));
  return sp;
}
export const witchColours = st => ({ [M.CLOTH]: hsv2rgb(st.cloakHue, .55, .6), [M.SKIN]: [240, 205, 170], [M.EYE]: [20, 14, 26], [M.HAIR]: hsv2rgb(st.hairHue, .7, .85), [M.BROOM]: hsv2rgb(st.trunkHue + .02, .55, .6), [M.STRAW]: [230, 190, 100] });

// Spreading roots at the base, and bark: dark crevices running along the trunk.
export function finishTree(t, st, r) {
  const { sp } = t, s = sp.sx, baseX = (() => { for (let x = 0; x < sp.w; x++) for (let y = sp.h - 1; y > sp.h - 4; y--) if (sp.get(x, y) === M.TRUNK || sp.get(x, y) === M.BARK2) return x; return sp.w / 2; })();
  let minX = sp.w, maxX = 0; for (let x = 0; x < sp.w; x++) if (sp.get(x, sp.h - 2) === M.TRUNK || sp.get(x, sp.h - 3) === M.TRUNK) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
  if (maxX >= minX && st.roots > 0) {
    const cx = (minX + maxX) / 2, n = Math.round(2 + st.roots * 4);
    for (let i = 0; i < n; i++) {
      const side = i % 2 ? 1 : -1, len = (6 + r() * 18) * st.roots * (sp.h / 110) + 3, th = Math.max(1.5, (maxX - minX) * .35);
      sp.line(cx / s + side * th * .3 / s, sp.h - 4 - r() * 3, (cx + side * len) / s, sp.h - 1 - r() * 2, th, 1, M.TRUNK, st.round);
    }
  }
  if (st.bark > 0) for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    if (sp.get(x, y) !== M.TRUNK) continue;
    if (vnoise(x / 1.4, y / 5, 21) > 1 - st.bark * .45 || hash2(x, y, 4) < st.bark * .08) { const i = (y * sp.w + x) * 3; sp.px(x, y, M.BARKD, sp.n[i], sp.n[i + 1], sp.n[i + 2]); }
  }
  return t;
}
export function splitTree(t) { // bottom = trunk below the crown line; top = everything else
  const { sp, crownY } = t, top = new Sprite(sp.w, sp.h), bot = new Sprite(sp.w, sp.h);
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x, m = sp.m[i]; if (!m) continue;
    const dst = (m === M.TRUNK || m === M.BARK2 || m === M.BARKD) && y >= crownY ? bot : top;
    dst.put(x, y, m, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]);
  }
  return { top, bot };
}

// ================= per-style assets =================
// Each area has its own leaf colour and its own kind of tree; "Difference between areas" sets how far apart.
export function areaStyle(st, world, area) {
  const r = rng(world.forestSeed * 31 + area * 977 + 5), d = st.areaContrast;
  const s = { ...st, leafHue: st.leafHue + [0, 1, -1][area] * d * uni(r, .12, .3) };
  const weights = TREE_TYPES.map(([k]) => k), fav = pick(r, weights);
  for (const k of weights) s[k] = k === fav ? st[k] + d * 2 : st[k] * (1 - d * .8);
  return s;
}
// K scales world sizes (trees, bushes) to the pixel size: 2 / pixel in the lab.
export function buildAssets(st, world, { K = 2 / (st.pixel || 2), makeCanvas = defaultCanvas } = {}) {
  const bk = (sp, col, outline) => bake(sp, col, st, outline, makeCanvas);
  const r = rng(world.forestSeed), trees = [];
  for (let i = 0; i < 12; i++) {
    const area = Math.floor(i / 4), ar = rng(world.forestSeed * 31 + area), ast = areaStyle(st, world, area);
    const tr = rng(world.forestSeed * 13 + i), f = chooseType(ar, ast), t = finishTree(f(tr, ast, st.treeSize * K * uni(tr, .85, 1.15)), ast, tr), col = treeColours(tr, ast, f), parts = splitTree(t);
    trees.push({ whole: bk(t.sp, col), top: bk(parts.top, col), bot: bk(parts.bot, col) });
  }
  const bushes = [];
  for (let i = 0; i < 12; i++) { const b = bush(rng(world.forestSeed * 7 + i * 3), { ...areaStyle(st, world, Math.floor(i / 4)), bushSize: st.bushSize * K }); bushes.push(bk(b.sp, b.colours)); }
  const creatures = world.kinds.map(kind => [0, 1, 2].map(level => [0, 1].map(frame => bk(critter(kind, level, frame, st), speciesColours(kind, st), st.cOutline))));
  return { trees, bushes, creatures, witch: bk(witchSprite(), witchColours(st)) };
}

