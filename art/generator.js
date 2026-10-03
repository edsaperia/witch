// Witch art generator: everything that draws and bakes the game's code-drawn sprites.
// A style object (the Witch Art Lab's knobs) goes in; sprites come out as an albedo
// canvas plus a normal map, for the deferred lighting pass to light.
// No page or DOM dependencies beyond making canvases: pass `makeCanvas(w, h)` where
// there is no `document` (the default uses document, else OffscreenCanvas).

export function defaultCanvas(w, h) {
  if (typeof document !== "undefined") { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  return new OffscreenCanvas(w, h);
}

// ================= random and noise =================
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const uni = (r, a, b) => a + (b - a) * r();
export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
export function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r()); }
export function hash2(x, y, s) { let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 2147483647); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
export function vnoise(x, y, s) { // smooth value noise, for clumpy foliage
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

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

// ================= colour =================
export function hsv2rgb(h, s, v) {
  h = ((h % 1) + 1) % 1; s = Math.max(0, Math.min(1, s)); v = Math.max(0, Math.min(1, v));
  const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const [r, g, b] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// ================= sprites: material + normal per pixel =================
export const M = { EMPTY: 0, BODY: 1, BELLY: 2, ACCENT: 3, EYE: 4, GLINT: 5, TRUNK: 6, LEAF: 7, LEAF2: 8, CLOTH: 9, SKIN: 10, HAIR: 11, BROOM: 12, STRAW: 13, BODY2: 14, BARK2: 15, FLOWER: 16, PUPIL: 17, MAGIC: 18, BARKD: 19 };
export class Sprite {
  constructor(w, h, sx = 1) { this.sx = sx; this.w = Math.round(w * sx); this.h = h | 0; this.m = new Uint8Array(this.w * this.h); this.n = new Float32Array(this.w * this.h * 3); }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  get(x, y) { return this.inb(x, y) ? this.m[y * this.w + x] : 0; }
  put(x, y, v, nx = 0, ny = 0, nz = 1) { this.px(x * this.sx, y, v, nx, ny, nz); }
  px(x, y, v, nx = 0, ny = 0, nz = 1) { x |= 0; y |= 0; if (!this.inb(x, y)) return; const i = y * this.w + x; this.m[i] = v; this.n[i * 3] = nx; this.n[i * 3 + 1] = ny; this.n[i * 3 + 2] = nz; }
  // A rounded blob: each pixel's normal points out from the blob's centre.
  ellipse(cx, cy, rx, ry, v, opts = {}) {
    const { onlyOn, density = 1, noise = 0, seed = 0, round = 1 } = opts;
    cx *= this.sx; rx *= this.sx;
    for (let y = Math.max(0, Math.floor(cy - ry - 1)); y < Math.min(this.h, cy + ry + 1); y++)
      for (let x = Math.max(0, Math.floor(cx - rx - 1)); x < Math.min(this.w, cx + rx + 1); x++) {
        const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry, d2 = dx * dx + dy * dy;
        if (d2 > 1) continue;
        const i = y * this.w + x;
        if (onlyOn && !onlyOn.has(this.m[i])) continue;
        if (density < 1) {
          const nz = noise ? vnoise(x / 3.2, y / 3.2, seed) * noise + (1 - noise) * .5 : .5;
          if (hash2(x, y, seed + 77) > density * (0.4 + nz * 1.2) * (1.15 - d2 * .5)) continue;
        }
        const nx = dx * round, ny = dy * round, l = Math.hypot(nx, ny, Math.sqrt(Math.max(0, 1 - d2)) + .15);
        this.px(x, y, v, nx / l, ny / l, (Math.sqrt(Math.max(0, 1 - d2)) + .15) / l);
      }
  }
  // A limb: stamped discs, so trunks and branches read as cylinders.
  line(x0, y0, x1, y1, t0, t1, v, round = 1) {
    x0 *= this.sx; x1 *= this.sx;
    const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    for (let s = 0; s <= steps; s++) {
      const f = s / steps, x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f, r = Math.max(.5, (t0 + (t1 - t0) * f) / 2);
      for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) {
        const dx = (xx + .5 - x) / r, dy = (yy + .5 - y) / r;
        if (dx * dx + dy * dy > 1) continue;
        const nx = dx * round, l = Math.hypot(nx, dy * .3, 1);
        this.px(xx, yy, v, nx / l, dy * .3 / l, 1 / l);
      }
    }
  }
  tri(p, v) {
    let [[ax, ay], [bx, by], [cx, cy]] = p; ax *= this.sx; bx *= this.sx; cx *= this.sx; const s = (px, py, x1, y1, x2, y2) => (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
    const x0 = Math.max(0, Math.floor(Math.min(ax, bx, cx))), x1 = Math.min(this.w, Math.ceil(Math.max(ax, bx, cx))), y0 = Math.max(0, Math.floor(Math.min(ay, by, cy))), y1 = Math.min(this.h, Math.ceil(Math.max(ay, by, cy)));
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const px = x + .5, py = y + .5, d1 = s(px, py, ax, ay, bx, by), d2 = s(px, py, bx, by, cx, cy), d3 = s(px, py, cx, cy, ax, ay);
      if (!((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))) this.px(x, y, v, 0, -.2, .98);
    }
  }
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

// ================= creatures =================
// ================= the bestiary: 20 forest animals =================
// plan: body plan. hue/sat/val: base colour. Then shape numbers, and what the legendary form grows.
export const SPECIES = [
  { id: "wolf", name: "Wolf", plan: "quad", hue: .6, sat: .18, val: .78, bw: .34, bh: .2, leg: .27, legW: .065, head: .16, snout: .6, headUp: .9, ears: "point", tail: "up", legend: ["wings", "mane"] },
  { id: "fox", name: "Fox", plan: "quad", hue: .06, sat: .8, val: .9, bw: .3, bh: .17, leg: .2, legW: .055, head: .15, snout: .65, headUp: .8, ears: "big", tail: "bushy", belly: "white", legend: ["tails"] },
  { id: "badger", name: "Badger", plan: "quad", hue: .65, sat: .08, val: .45, bw: .42, bh: .18, leg: .1, legW: .08, head: .14, snout: .7, headUp: .1, ears: "round", tail: "short", face: "badger", legend: ["crystals"] },
  { id: "boar", name: "Boar", plan: "quad", hue: .07, sat: .75, val: .82, bw: .4, bh: .27, leg: .16, legW: .09, head: .2, snout: .6, headUp: .2, ears: "small", tail: "thin", stripes: true, tusks: true, ridge: true, legend: ["tusksBig"] },
  { id: "stag", name: "Stag", plan: "quad", hue: .08, sat: .5, val: .7, bw: .32, bh: .19, leg: .36, legW: .05, head: .13, snout: .5, headUp: 1.6, ears: "point", tail: "short", spots: true, antlers: "branch", legend: ["antlersGlow"] },
  { id: "hare", name: "Hare", plan: "quad", hue: .08, sat: .4, val: .72, bw: .26, bh: .2, leg: .18, legW: .06, head: .15, snout: .35, headUp: .9, ears: "long", tail: "puff", legend: ["jackalope"] },
  { id: "owl", name: "Owl", plan: "owl", hue: .09, sat: .45, val: .6, legend: ["eyesRing", "wings"] },
  { id: "bear", name: "Bear", plan: "quad", hue: .07, sat: .55, val: .42, bw: .42, bh: .3, leg: .17, legW: .11, head: .18, snout: .45, headUp: .5, ears: "round", tail: "short", legend: ["moss"] },
  { id: "hedgehog", name: "Hedgehog", plan: "hedgehog", hue: .08, sat: .4, val: .5, legend: ["crystals"] },
  { id: "squirrel", name: "Squirrel", plan: "quad", hue: .03, sat: .75, val: .75, bw: .22, bh: .17, leg: .12, legW: .05, head: .15, snout: .35, headUp: .8, ears: "tuft", tail: "squirrel", belly: "white", legend: ["starTail"] },
  { id: "toad", name: "Toad", plan: "toad", hue: .2, sat: .5, val: .55, legend: ["crown"] },
  { id: "otter", name: "Otter", plan: "quad", hue: .07, sat: .55, val: .45, bw: .44, bh: .15, leg: .09, legW: .07, head: .13, snout: .4, headUp: .5, ears: "round", tail: "long", belly: "white", legend: ["ribbons"] },
  { id: "lynx", name: "Lynx", plan: "quad", hue: .09, sat: .45, val: .75, bw: .3, bh: .19, leg: .26, legW: .07, head: .16, snout: .3, headUp: .8, ears: "tuft", tail: "short", spots: true, legend: ["mane"] },
  { id: "elk", name: "Elk", plan: "quad", hue: .07, sat: .55, val: .38, bw: .38, bh: .23, leg: .38, legW: .06, head: .16, snout: .8, headUp: 1.2, ears: "point", tail: "short", antlers: "palm", legend: ["antlersGlow", "moss"] },
  { id: "raven", name: "Raven", plan: "raven", hue: .68, sat: .35, val: .3, legend: ["wings", "eyesRing"] },
  { id: "bat", name: "Bat", plan: "bat", hue: .78, sat: .25, val: .45, legend: ["wingsBig"] },
  { id: "mole", name: "Mole", plan: "mole", hue: .7, sat: .15, val: .32, legend: ["crown"] },
  { id: "beaver", name: "Beaver", plan: "quad", hue: .06, sat: .6, val: .45, bw: .36, bh: .22, leg: .1, legW: .07, head: .16, snout: .35, headUp: .4, ears: "small", tail: "flat", teeth: true, legend: ["moss"] },
  { id: "stoat", name: "Stoat", plan: "quad", hue: .1, sat: .25, val: .92, bw: .42, bh: .11, leg: .11, legW: .05, head: .12, snout: .45, headUp: .7, ears: "round", tail: "long", legend: ["ribbons", "mane"] },
  { id: "beetle", name: "Stag beetle", plan: "beetle", hue: .78, sat: .5, val: .35, legend: ["horn", "crystals"] },
];
export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map(s => [s.id, s]));

export function speciesColours(sp, st) {
  const s = SPECIES_BY_ID[sp], v = st.cVal / .85, sat = st.cSat / .6;
  const body = hsv2rgb(s.hue, s.sat * sat * st.sat, s.val * v);
  const belly = s.belly === "white" || s.face === "badger" ? [236, 232, 222] : hsv2rgb(s.hue + .03, s.sat * .5 * sat, Math.min(1, s.val * v * 1.25));
  const magic = hsv2rgb(st.magicHue + s.hue * .3, .55, 1);
  return { [M.BODY]: body, [M.BODY2]: hsv2rgb(s.hue + .02, Math.min(1, s.sat * sat * 1.2 + .05), s.val * v * .62), [M.BELLY]: belly, [M.ACCENT]: s.id === "boar" || s.id === "stag" || s.id === "elk" ? [236, 226, 200] : hsv2rgb(s.hue + .05, s.sat * .6, Math.min(1, s.val * v * .5 + .25)), [M.MAGIC]: magic, [M.LEAF]: hsv2rgb(.3, .55, .55), [M.LEAF2]: hsv2rgb(.25, .5, .75), [M.EYE]: [24, 18, 30], [M.PUPIL]: [70, 40, 90], [M.GLINT]: [255, 255, 245] };
}

export function critter(spId, level, frame, st) {
  const S = SPECIES_BY_ID[spId] || SPECIES[0], r = rng(spId.length * 977 + level * 31 + spId.charCodeAt(0));
  const size = Math.round(st.size * Math.pow(Math.sqrt(st.growth), level));
  const W = Math.round(size * 1.9 + 14), H = Math.round(size * 1.7 + 12), sp = new Sprite(W, H);
  const rd = st.round, young = [1, .55, .25][level], legend = level === 2, has = f => legend && S.legend.includes(f);
  const cx = W / 2 - size * .1;
  let head = null; // {x, y, r}
  const lw = v => Math.max(1, v);

  if (S.plan === "quad") {
    const bw = size * S.bw * st.long * (1 - young * .12), bh = size * S.bh * (1 + young * .3), legLen = size * S.leg * st.legs * (1 - young * .35);
    const cy = H - legLen - bh * .65 - 1, legW = lw(size * S.legW);
    if (has("wings")) { for (let i = 0; i < 4; i++) sp.ellipse(cx - bw * (.1 + i * .25), cy - bh * (1.5 + i * .25) , bw * (.8 - i * .1), bh * (.7 - i * .08), M.MAGIC, { round: rd }); }
    if (has("tails")) for (let i = 0; i < 5; i++) { const a = Math.PI * (1.05 + i * .13); sp.line(cx - bw * .9, cy - bh * .1, cx - bw * .9 + Math.cos(a) * bw * 1.2, cy - bh * .1 + Math.sin(a) * bw * 1.1, size * .1, size * .05, i % 2 ? M.MAGIC : M.BODY, rd); sp.ellipse(cx - bw * .9 + Math.cos(a) * bw * 1.2, cy - bh * .1 + Math.sin(a) * bw * 1.1, size * .06, size * .06, M.BELLY, { round: rd }); }
    // tail
    const tx = cx - bw * .95, ty = cy - bh * .1;
    if (S.tail === "up") sp.line(tx, ty, tx - bw * .45, ty - bh * (1.1 + frame * .1), lw(size * .08), lw(size * .03), M.BODY, rd);
    else if (S.tail === "bushy" && !has("tails")) { sp.line(tx, ty, tx - bw * .7, ty + bh * .4, lw(size * .12), lw(size * .09), M.BODY, rd); sp.ellipse(tx - bw * .75, ty + bh * .45, size * .06 + 1, size * .05 + 1, M.BELLY, { round: rd }); }
    else if (S.tail === "squirrel") { for (let i = 0; i < 7; i++) { const f = i / 6; sp.ellipse(tx - bw * (.3 + Math.sin(f * 2.6) * .5), ty - bh * (f * 2.4), size * (.09 + .04 * Math.sin(f * 3)) + 1, size * .08 + 1, has("starTail") && i % 2 ? M.MAGIC : M.BODY, { round: rd }); } }
    else if (S.tail === "thin") sp.line(tx, ty - bh * .2, tx - bw * .25, ty + bh * .5, 1, 1, M.BODY, rd);
    else if (S.tail === "long") sp.line(tx, ty, tx - bw * .9, ty + bh * .6, lw(size * .06), 1, M.BODY, rd);
    else if (S.tail === "flat") sp.ellipse(tx - bw * .35, ty + bh * .55, bw * .4, bh * .2, M.BODY2, { round: rd });
    else if (S.tail === "puff") sp.ellipse(tx, ty - bh * .2, size * .06 + 1, size * .06 + 1, M.BELLY, { round: rd });
    else sp.ellipse(tx, ty - bh * .1, size * .04 + 1, size * .035 + 1, M.BODY, { round: rd });
    // legs, two frames of walk
    [cx - bw * .65, cx - bw * .4, cx + bw * .45, cx + bw * .7].forEach((lx, i) => {
      const ph = (i + frame) % 2, swing = (ph ? 1 : -1) * size * .05, lift = ph ? lw(size * .025) : 0;
      sp.line(lx, cy + bh * .2, lx + swing * .5, cy + bh * .2 + legLen * .55, legW * 1.3, legW, M.BODY, rd);
      sp.line(lx + swing * .5, cy + bh * .2 + legLen * .55, lx + swing, H - 1 - lift, legW, legW * .85, i < 2 ? M.BODY : M.BODY, rd);
    });
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    sp.ellipse(cx + bw * .45, cy - bh * .08, bw * .55, bh * 1.05, M.BODY, { round: rd });
    sp.ellipse(cx + bw * .1, cy + bh * .5, bw * .7, bh * .38, M.BELLY, { onlyOn: new Set([M.BODY]), round: rd });
    if (S.ridge && level >= 1) for (let i = 0; i < 5 + level * 3; i++) { const f = i / (4 + level * 3); sp.tri([[cx - bw * .7 + f * bw * 1.4, cy - bh * .85], [cx - bw * .62 + f * bw * 1.4, cy - bh * (1.25 + .15 * level)], [cx - bw * .5 + f * bw * 1.4, cy - bh * .85]], M.BODY2); }
    if (has("moss")) { for (let i = 0; i < 9; i++) sp.ellipse(cx - bw * .7 + i * bw * .18, cy - bh * (.95 + (i % 3) * .12), bw * .14, bh * .22, i % 3 ? M.LEAF : M.LEAF2, { round: rd, density: .9 }); for (let i = 0; i < 3; i++) { const x = cx - bw * .4 + i * bw * .4; sp.line(x, cy - bh, x, cy - bh * 2.1, 2, 1, M.BODY2, rd); sp.ellipse(x, cy - bh * 2.2, bw * .14, bh * .35, M.LEAF, { round: rd, density: .85 }); } }
    if (has("crystals")) for (let i = 0; i < 6; i++) { const x = cx - bw * .6 + i * bw * .25; sp.tri([[x - size * .03, cy - bh * .8], [x, cy - bh * (1.4 + (i % 2) * .4)], [x + size * .03, cy - bh * .8]], M.MAGIC); }
    if (has("ribbons")) for (let i = 0; i < 3; i++) for (let j = 0; j < 30; j++) { const f = j / 29; sp.put(cx - bw + f * bw * 2, cy - bh * (1.3 + i * .35) + Math.sin(f * 7 + i + frame) * bh * .25, M.MAGIC); }
    // neck and head
    const hr = size * S.head * (1 + young * .65) * (st.head / .44), hx = cx + bw * 1.05, hy = cy - bh * S.headUp;
    if (has("mane")) for (let i = 0; i < 7; i++) sp.ellipse(hx - hr * (.9 + i * .35), hy + hr * (.1 + i * .25), hr * .6, hr * .45, M.MAGIC, { round: rd });
    sp.line(cx + bw * .6, cy - bh * .2, hx, hy, hr * 1.3, hr * 1.1, M.BODY, rd);
    sp.ellipse(hx, hy, hr, hr * .9, M.BODY, { round: rd });
    const sl = hr * S.snout * (1 - young * .45);
    sp.ellipse(hx + hr * .7 + sl * .4, hy + hr * .25, sl * .9 + 1, hr * .48, S.face === "badger" ? M.BELLY : M.BODY, { round: rd });
    sp.put(hx + hr * .7 + sl * 1.25, hy + hr * .12, M.EYE);
    if (S.face === "badger") sp.line(hx - hr * .7, hy - hr * .75, hx + hr * .9, hy, lw(hr * .35), lw(hr * .2), M.BELLY, rd);
    if (S.teeth) sp.line(hx + hr * .7 + sl * 1.05, hy + hr * .55, hx + hr * .7 + sl * 1.05, hy + hr * .55 + lw(size * .04), lw(size * .025), lw(size * .025), M.BELLY, rd);
    if (S.tusks && level >= 1) { const t = lw(size * .025 * (level + .5)), up = has("tusksBig") ? 1.6 : .5; sp.line(hx + hr * .9, hy + hr * .5, hx + hr * (1.1 + up * .4), hy - hr * (.1 + up * .6), t, t * .6, M.ACCENT, rd); sp.line(hx + hr * (1.1 + up * .4), hy - hr * (.1 + up * .6), hx + hr * (.7 + up * .3), hy - hr * (.4 + up), t * .6, 1, M.ACCENT, rd); }
    // ears
    const E = S.ears;
    if (E === "point" || E === "big" || E === "tuft") { const k = E === "big" ? 1.4 : 1; sp.tri([[hx - hr * .65, hy - hr * .3], [hx - hr * .55, hy - hr * (1.45 + young * .3) * k], [hx - hr * .05, hy - hr * .7]], M.BODY); sp.tri([[hx - hr * .2, hy - hr * .5], [hx + hr * .05, hy - hr * (1.55 + young * .3) * k], [hx + hr * .45, hy - hr * .6]], M.BODY); if (E === "tuft") sp.line(hx + hr * .05, hy - hr * 1.55, hx + hr * .1, hy - hr * 2, 1, 1, M.BODY2, rd); }
    else if (E === "long") { sp.line(hx - hr * .3, hy - hr * .6, hx - hr * .8, hy - hr * 2.6, lw(hr * .45), lw(hr * .3), M.BODY, rd); sp.line(hx, hy - hr * .6, hx - hr * .2, hy - hr * 2.7, lw(hr * .45), lw(hr * .3), M.BODY, rd); }
    else if (E === "round") sp.ellipse(hx - hr * .45, hy - hr * .72, hr * .3, hr * .3, M.BODY, { round: rd });
    else sp.tri([[hx - hr * .5, hy - hr * .5], [hx - hr * .7, hy - hr * 1.15], [hx - hr * .1, hy - hr * .7]], M.BODY);
    // antlers
    const ant = S.antlers || (has("jackalope") ? "branch" : null);
    if (ant && (level >= 1 || has("jackalope"))) {
      const t = lw(size * .02), top = hy - hr * (1.6 + level * 1.1), mat = has("antlersGlow") ? M.MAGIC : M.ACCENT;
      if (ant === "palm") { sp.line(hx - hr * .2, hy - hr * .7, hx - hr * .6, top + hr * .6, t, t, mat, rd); sp.ellipse(hx - hr * 1.1, top + hr * .4, hr * (.8 + level * .4), hr * (.35 + level * .1), mat, { round: rd }); for (let k = 0; k < 4 + level * 2; k++) sp.line(hx - hr * (.4 + k * .35), top + hr * .2, hx - hr * (.5 + k * .38), top - hr * .25, 1, 1, mat, rd); }
      else { sp.line(hx - hr * .2, hy - hr * .7, hx - hr * .5, top, t, t * .7, mat, rd); for (let k = 1; k <= level + 1; k++) { const y = hy - hr * .7 + (top - hy + hr * .7) * k / (level + 1.5); sp.line(hx - hr * .35, y, hx - hr * (1 + k * .25), y - hr * .45, t * .8, t * .5, mat, rd); sp.line(hx - hr * .35, y, hx + hr * .3, y - hr * .55, t * .8, t * .5, mat, rd); } }
    }
    head = { x: hx, y: hy, r: hr };
    // markings
    if (size > 16 && (S.stripes || S.spots)) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (sp.get(x, y) !== M.BODY) continue;
      const mark = S.stripes ? Math.sin((x + y * .45) / (size * .045)) > .85 - st.fur * .5 && y < cy + bh * .3 : hash2(Math.floor(x / Math.max(2, size * .05)), Math.floor(y / Math.max(2, size * .05)), 9) < st.fur * .25 && y < cy + bh * .2;
      if (mark) { const i = (y * W + x) * 3; sp.put(x, y, M.BODY2, sp.n[i], sp.n[i + 1], sp.n[i + 2]); }
    }
  } else if (S.plan === "owl" || S.plan === "raven") {
    const owl = S.plan === "owl", bw = size * (owl ? .3 : .26), bh = size * (owl ? .42 : .3), cy = H - bh - size * .12 - 1;
    if (has("wings")) for (const side of [-1, 1]) for (let i = 0; i < 4; i++) sp.ellipse(cx + side * bw * (1.1 + i * .3), cy - bh * (.3 + i * .15), bw * .5, bh * (.7 - i * .1), M.MAGIC, { round: rd });
    for (const side of [-1, 1]) sp.line(cx + side * bw * .25, cy + bh * .8, cx + side * bw * .3 + frame * side, H - 1, lw(size * .04), lw(size * .03), M.ACCENT, rd);
    if (!owl) sp.tri([[cx - bw * .6, cy + bh * .2], [cx - bw * 1.8, cy + bh * .7], [cx - bw * .4, cy + bh * .7]], M.BODY);
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    sp.ellipse(cx + (owl ? 0 : bw * .2), cy + bh * .25, bw * .65, bh * .55, owl ? M.BELLY : M.BODY2, { onlyOn: new Set([M.BODY]), round: rd });
    sp.ellipse(cx - bw * .5, cy, bw * .5, bh * .7, M.BODY2, { onlyOn: new Set([M.BODY]), round: rd }); // folded wing
    const hr = size * (owl ? .24 : .17) * (1 + young * .5), hx = cx + (owl ? 0 : bw * .6), hy = cy - bh * .85;
    sp.ellipse(hx, hy, hr, hr * .9, M.BODY, { round: rd });
    if (owl) { sp.tri([[hx - hr * .9, hy - hr * .4], [hx - hr * 1.1, hy - hr * 1.4], [hx - hr * .4, hy - hr * .8]], M.BODY); sp.tri([[hx + hr * .9, hy - hr * .4], [hx + hr * 1.1, hy - hr * 1.4], [hx + hr * .4, hy - hr * .8]], M.BODY); sp.ellipse(hx, hy + hr * .1, hr * .75, hr * .6, M.BELLY, { round: rd, onlyOn: new Set([M.BODY]) }); }
    sp.tri([[hx + hr * (owl ? -.1 : .7), hy], [hx + hr * (owl ? .1 : 1.7), hy + hr * (owl ? .5 : .2)], [hx + hr * (owl ? .1 : .7), hy + hr * .4]], M.ACCENT);
    if (has("eyesRing")) for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; sp.put(cx + Math.cos(a) * bw * .5, cy + Math.sin(a) * bh * .4, M.MAGIC); sp.put(cx + Math.cos(a) * bw * .5 + 1, cy + Math.sin(a) * bh * .4, M.MAGIC); }
    head = { x: owl ? hx - hr * .1 : hx, y: hy, r: hr, two: owl };
  } else if (S.plan === "bat") {
    const bw = size * .16, bh = size * .2, cy = H * .45 + (frame ? -size * .05 : size * .05), span = has("wingsBig") ? 1.6 : 1;
    for (const side of [-1, 1]) for (let k = 0; k < 3; k++) { const ex = cx + side * size * (.25 + k * .17) * span, ey = cy - bh * (frame ? 1.2 : .2) + k * bh * .3; sp.tri([[cx + side * bw * .5, cy - bh * .3], [ex, ey], [cx + side * bw * .4 + side * k * size * .1 * span, cy + bh * .7]], has("wingsBig") && k === 1 ? M.MAGIC : M.BODY2); }
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    const hr = size * .13 * (1 + young * .5), hx = cx, hy = cy - bh * .9;
    sp.ellipse(hx, hy, hr, hr, M.BODY, { round: rd });
    sp.tri([[hx - hr * .8, hy - hr * .3], [hx - hr * .9, hy - hr * 1.6], [hx - hr * .2, hy - hr * .8]], M.BODY); sp.tri([[hx + hr * .8, hy - hr * .3], [hx + hr * .9, hy - hr * 1.6], [hx + hr * .2, hy - hr * .8]], M.BODY);
    head = { x: hx, y: hy, r: hr, two: true };
  } else if (S.plan === "toad") {
    const bw = size * .4, bh = size * .27, cy = H - bh - 1 - (frame ? size * .05 : 0);
    for (const side of [-1, 1]) sp.ellipse(cx + side * bw * .7, H - size * .08, bw * .35, size * .08, M.BODY2, { round: rd });
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd }); sp.ellipse(cx + bw * .2, cy + bh * .45, bw * .7, bh * .4, M.BELLY, { round: rd, onlyOn: new Set([M.BODY]) });
    for (let i = 0; i < 12; i++) sp.ellipse(cx + uni(r, -bw * .7, bw * .5), cy - bh * uni(r, .1, .7), size * .025 + .6, size * .025 + .6, M.BODY2, { round: rd, onlyOn: new Set([M.BODY]) });
    const hr = size * .17 * (1 + young * .3), hx = cx + bw * .55, hy = cy - bh * .55;
    sp.ellipse(hx, hy, hr * 1.2, hr * .8, M.BODY, { round: rd });
    sp.line(hx, hy + hr * .35, hx + hr * 1.1, hy + hr * .25, 1, 1, M.BODY2, rd);
    if (has("crown")) for (let i = 0; i < 5; i++) sp.tri([[hx - hr * .9 + i * hr * .4, hy - hr * .6], [hx - hr * .7 + i * hr * .4, hy - hr * 1.6], [hx - hr * .5 + i * hr * .4, hy - hr * .6]], M.MAGIC);
    head = { x: hx + hr * .2, y: hy - hr * .3, r: hr };
  } else if (S.plan === "hedgehog") {
    const bw = size * .36, bh = size * .24, cy = H - bh - size * .06 - 1;
    for (let i = 0; i < 4; i++) sp.line(cx - bw * .5 + i * bw * .33, cy + bh * .5, cx - bw * .5 + i * bw * .33 + ((i + frame) % 2 ? 1 : -1), H - 1, lw(size * .04), lw(size * .03), M.BELLY, rd);
    for (let i = 0; i < 26 + level * 20; i++) { const a = Math.PI * (1.02 + r() * .96), d = uni(r, .7, 1.25); const x0 = cx + Math.cos(a) * bw * .6, y0 = cy + Math.sin(a) * bh * .6; sp.line(x0, y0, cx + Math.cos(a) * bw * d * 1.25, cy + Math.sin(a) * bh * d * 1.4, lw(size * .04), 1, has("crystals") && i % 4 === 0 ? M.MAGIC : M.BODY2, rd); }
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd, onlyOn: new Set([0, M.BELLY]) });
    const hr = size * .14 * (1 + young * .4), hx = cx + bw * .85, hy = cy + bh * .15;
    sp.ellipse(hx, hy, hr, hr * .8, M.BELLY, { round: rd }); sp.ellipse(hx + hr * .9, hy + hr * .2, hr * .45, hr * .3, M.BELLY, { round: rd }); sp.put(hx + hr * 1.35, hy + hr * .1, M.EYE);
    head = { x: hx, y: hy, r: hr };
  } else if (S.plan === "mole") {
    const bw = size * .36, bh = size * .24, cy = H - bh - 1;
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd });
    const hx = cx + bw * .85, hy = cy + bh * .1, hr = size * .12;
    sp.ellipse(hx, hy, hr * 1.1, hr * .7, M.BODY, { round: rd }); sp.ellipse(hx + hr * 1.1, hy + hr * .1, hr * .4, hr * .3, M.ACCENT, { round: rd });
    for (let k = 0; k < 4; k++) sp.line(hx - hr * .2 + k * 1.2, cy + bh * .6, hx + hr * .2 + k * 1.5, H - 1 - (frame && k % 2 ? 1 : 0), 1, 1, M.ACCENT, rd); // digging claws
    if (has("crown")) for (let i = 0; i < 5; i++) sp.line(cx - bw * .6 + i * bw * .3, cy - bh * .8, cx - bw * .7 + i * bw * .33, cy - bh * (1.6 + (i % 2) * .5), lw(size * .03), 1, M.MAGIC, rd);
    head = { x: hx, y: hy - hr * .2, r: hr * .6, tiny: true };
  } else if (S.plan === "beetle") {
    const bw = size * .38, bh = size * .22, cy = H - bh - size * .1 - 1;
    for (let i = 0; i < 3; i++) for (const side of [0, 1]) { const lx = cx - bw * .5 + i * bw * .5, ph = (i + side + frame) % 2; sp.line(lx, cy + bh * .4, lx + (side ? 1 : -1) * size * .07 + (ph ? 1 : 0), H - 1, lw(size * .025), 1, M.BODY2, rd); }
    sp.ellipse(cx, cy, bw, bh, M.BODY, { round: rd }); sp.line(cx - bw, cy - bh * .1, cx + bw * .6, cy - bh * .1, 1, 1, M.BODY2, rd);
    const hx = cx + bw * .95, hy = cy + bh * .05, hr = size * .1;
    sp.ellipse(hx, hy, hr, hr * .8, M.BODY2, { round: rd });
    const mlen = size * (.15 + level * .12) * (has("horn") ? 1.5 : 1);
    for (const s2 of [-1, 1]) sp.line(hx + hr * .6, hy + s2 * hr * .2, hx + hr * .6 + mlen, hy - mlen * .5 + s2 * hr * .3, lw(size * .035), 1, has("horn") ? M.MAGIC : M.ACCENT, rd);
    if (has("crystals")) for (let i = 0; i < 5; i++) sp.ellipse(cx - bw * .6 + i * bw * .3, cy - bh * .4, size * .03 + 1, size * .03 + 1, M.MAGIC, { round: rd });
    head = { x: hx, y: hy - hr * .3, r: hr * .7, tiny: true };
  }
  // eyes: big and glinting on babies
  if (head) {
    const e = head.tiny ? 1 : level === 0 ? Math.max(1, Math.round(2 * st.eye)) : Math.max(1, Math.round(size * .045 * st.eye));
    const spots = head.two ? [[head.x - head.r * .4, head.y - head.r * .1], [head.x + head.r * .4, head.y - head.r * .1]] : [[head.x + head.r * .3, head.y - head.r * .25]];
    for (const [x0, y0] of spots) {
      const ex = Math.round(x0), ey = Math.round(y0);
      for (let dx = 0; dx < e; dx++) for (let dy = 0; dy < e; dy++) sp.put(ex - dx, ey + dy, M.EYE);
      if (e >= 3) for (let dx = 0; dx < Math.ceil(e / 2); dx++) for (let dy = 0; dy < Math.ceil(e / 2); dy++) sp.put(ex - e + 1 + dx, ey + e - 1 - dy, M.PUPIL);
      if (e >= 2) sp.put(ex, ey, M.GLINT);
    }
  }
  return sp;
}

export const EMISSIVE = new Set([M.GLINT, M.FLOWER, M.MAGIC]);

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

// ================= sprite -> albedo + normal images =================
export function bake(sp, colours, st, outlineMode = st.outline, makeCanvas = defaultCanvas) {
  const { w, h } = sp, mk = () => makeCanvas(w, h);
  const A = mk(), N = mk(), NF = mk(), a = A.getContext("2d").createImageData(w, h), n = N.getContext("2d").createImageData(w, h), nf = NF.getContext("2d").createImageData(w, h);
  const outline = outlineMode === "none" ? null : outlineMode === "dark" ? [22, 18, 30] : "tint";
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, m = sp.m[i], o = i * 4;
    if (!m) {
      if (!outline) continue;
      const nb = [sp.get(x + 1, y), sp.get(x - 1, y), sp.get(x, y + 1), sp.get(x, y - 1)].find(v => v);
      if (!nb) continue;
      const c = outline === "tint" ? (colours[nb] || [0, 0, 0]).map(v => v * .35 | 0) : outline;
      a.data.set([...c, 255], o); n.data.set([128, 128, 255, 255], o); nf.data.set([128, 128, 255, 255], o);
      continue;
    }
    const c = colours[m] || [255, 0, 255];
    a.data.set([...c, EMISSIVE.has(m) ? 254 : 255], o);
    const nx = sp.n[i * 3], ny = sp.n[i * 3 + 1], nz = sp.n[i * 3 + 2];
    n.data.set([nx * 127 + 128, ny * 127 + 128, nz * 255, 255], o);
    nf.data.set([-nx * 127 + 128, ny * 127 + 128, nz * 255, 255], o);
  }
  A.getContext("2d").putImageData(a, 0, 0); N.getContext("2d").putImageData(n, 0, 0); NF.getContext("2d").putImageData(nf, 0, 0);
  return { A, N, NF, w, h };
}
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

