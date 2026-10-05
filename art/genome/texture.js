// Witch creature surface texture (Ed, 2026-10-05: "best artwork over speed"; issue #119): so a big
// body stops reading as a smooth ball with contour lines round it. Three things, all genome data
// (a species' `texture`, its template's by default) the art pass can tune:
//   - stamps: the body's pixels gathered into small cells shaped by its kind (fur: strokes running
//     back and down the body; feathers: scallops; scales: a diamond lattice; plates: segments across
//     the body; shell: bands round its whorl; bristles: long thin spines), each cell sharing one
//     normal, so the game's stepped light breaks along tufts and strokes, not smooth contours;
//   - tones: three or four chosen tones by a fixed light from above and in front (a lifted top, the
//     body, a dark core shadow), decided cell by cell so their edges break up in clusters, never a
//     dither; and seams, dark lines where cells meet (a feather's lower edge, a scale's, a plate's);
//   - lumps: small displacements on the body's volumes (shoulders, haunches, ruffs), shaggier with age.
// Detail grows with level: a baby's cells are big and soft and its seams gone; a legend's small, many
// and contrasting. A style with texture 0 (?texture=0) draws every creature as before.
import { M, rng } from "../core.js";

export const TEXTURE_KINDS = ["fur", "feathers", "scales", "plates", "shell", "bristles", "smooth"];
// size: a cell's size in art pixels at young; stretch: how long a cell runs along the grain to across
// it; flatten: how far a cell's pixels share its normal (0 none, 1 all); contrast: how far cells' tones
// stray from the light's; seam: how much of a cell's lower edge is drawn dark; lumps: the body's
// bumpiness (model units, at young); tones: 3 or 4 (a lifted top, the body, its shade, a core shadow).
export const TEXTURE_DEFAULT = { kind: "fur", size: 4, stretch: 2.6, flatten: .75, contrast: .2, seam: .45, lumps: .004, tones: 4 };
const TEXTURE_KIND_DEFAULTS = {
  fur: {}, // strokes back and down the body, a few dark partings between them
  feathers: { size: 4, stretch: 1.1, seam: .8, lumps: .002 },
  scales: { size: 3, stretch: 1, seam: .7, lumps: .001, flatten: .8 },
  plates: { size: 4, stretch: 1, seam: .9, lumps: 0, flatten: .85, contrast: .2 },
  shell: { size: 3, stretch: 1, seam: .7, lumps: 0, flatten: .8 },
  bristles: { size: 2.5, stretch: 4, seam: .6, contrast: .4, lumps: .003 },
  smooth: { size: 6, stretch: 1, seam: 0, contrast: .1, lumps: .001, flatten: .5 },
};
// By level (baby, young, adult, legend): cell size, contrast and seams, and lumps.
const TEXTURE_LEVEL = { size: [1.8, 1, 1.15, 1.45], contrast: [.45, 1, 1.15, 1.3], seam: [0, .8, 1, 1.15], lumps: [.5, 1, 1.3, 1.6] };

// The materials a texture works on (fur, feathers, scales: the body and its markings) and their tone
// steps, lightest first: a pixel moves along its own row.
const TEX_ROWS = [[M.BODYL, M.BODY, M.BODY2, M.BODY3], [M.BELLY, M.BELLY, M.ACCENT, M.ACCENT]];
const texStep = new Map(); TEX_ROWS.forEach(row => row.forEach((m, i) => { if (!texStep.has(m)) texStep.set(m, { row, i }); }));
const TEX_MATS = new Set([M.BODY, M.BODY2, M.BODY3, M.BELLY]);

// A species' texture: its kind's defaults under its template's (or its genome's own) settings.
export function textureOf(S) {
  const t = { ...TEXTURE_DEFAULT, ...(S.texture || {}) };
  return { ...TEXTURE_DEFAULT, ...TEXTURE_KIND_DEFAULTS[t.kind], ...(S.texture || {}) };
}
export const textureOn = st => !st || st.texture !== 0;

// The lumps: every body volume a little bumpy (model3d's rough), more with age. m: a built model.
export function textureLumps(m, S, level, st) {
  if (!textureOn(st)) return;
  const T = textureOf(S), a = T.lumps * TEXTURE_LEVEL.lumps[level];
  if (!a) return;
  for (const q of m.parts) if (!q.extra && !q.rough && TEX_MATS.has(q.mat)) q.rough = a;
}

const texHash = (a, b, s) => { let h = (a * 374761393 + b * 668265263 + s * 2246822519) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

// The stamps, tones and seams on a drawn sprite (in place). seed: the species' (so a rig's pieces match).
export function textureSprite(sp, S, level, st, seed = 1) {
  if (!textureOn(st)) return sp;
  const T = textureOf(S), { w, h } = sp;
  if (T.kind === "smooth" && !T.contrast) return sp;
  // the style's detail (0: cel shapes, tones by the form with hard edges, no seams; 1: fine strokes and seams): the stylisation ladder's knob
  const D = Math.max(0, Math.min(1, st?.texDetail ?? 1));
  const L = TEXTURE_LEVEL, c = Math.max(1.5, T.size * L.size[level] * (1 + (1 - D) * 2)), contrast = T.contrast * L.contrast[level] * D, seam = T.seam * L.seam[level] * D;
  const lf = [-.35, -.75, .55], ll = Math.hypot(...lf); // the form light: above, in front, a little left (as the moon)
  const on = new Uint8Array(w * h);
  let cx = 0, cy = 0, n = 0;
  for (let i = 0; i < w * h; i++) if (TEX_MATS.has(sp.m[i])) { on[i] = 1; cx += i % w; cy += (i / w) | 0; n++; }
  if (n < 6) return sp;
  cx /= n; cy /= n;
  // ---- cells: each pixel to its nearest seed, by the kind's metric ----
  const G = Math.max(1, Math.round(c)), gw = Math.ceil(w / G) + 2, gh = Math.ceil(h / G) + 2;
  const seedAt = (gx, gy) => [gx * G + (texHash(gx, gy, seed) - .5) * G * .9, gy * G + (texHash(gy, gx, seed + 7) - .5) * G * .9 + (T.kind === "feathers" || T.kind === "scales" ? (gx & 1) * G * .5 : 0)];
  const cell = new Int32Array(w * h).fill(-1);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (!on[i]) continue;
    // the grain: back and down the body (fur, bristles: by the surface's slope); others: none
    const nx = sp.n[i * 3], ny = sp.n[i * 3 + 1];
    let dx = -.85, dy = .35;
    if (T.kind === "fur" || T.kind === "bristles") { const tx = -nx * ny, ty = 1 - ny * ny; dx = dx * .55 + tx * .45; dy = dy * .55 + ty * .45; }
    const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
    if (T.kind === "plates") { cell[i] = Math.floor((x - cx) / c + 1000) ; continue; } // segments across the body
    if (T.kind === "shell") { const r = Math.hypot(x - cx, (y - cy) * 1.2), a = Math.atan2(y - cy, x - cx); cell[i] = Math.floor((r + a / (Math.PI * 2) * c) / c + 1000); continue; } // bands round its whorl
    const gx0 = Math.floor(x / G), gy0 = Math.floor(y / G), R = T.stretch > 1.5 ? 2 : 1;
    let best = 1e9, bi = -1;
    for (let gy = gy0 - R; gy <= gy0 + R; gy++) for (let gx = gx0 - R; gx <= gx0 + R; gx++) {
      const [sx, sy] = seedAt(gx, gy), ox = x - sx, oy = y - sy;
      let d;
      if (T.kind === "scales") d = Math.abs(ox) + Math.abs(oy) * 1.3; // a diamond lattice
      else { const along = ox * dx + oy * dy, across = -ox * dy + oy * dx; d = (along / T.stretch) ** 2 + across * across; }
      if (T.kind === "feathers" && oy < 0) d *= .8; // a scallop: rounder below, overlapping the one above
      if (d < best) { best = d; bi = (gy + 4) * (gw + 8) + gx + 4; }
    }
    cell[i] = bi;
  }
  // ---- each cell's mean normal, and its tone ----
  const sum = new Map();
  for (let i = 0; i < w * h; i++) if (cell[i] >= 0) { let s = sum.get(cell[i]); if (!s) sum.set(cell[i], (s = [0, 0, 0, 0])); s[0] += sp.n[i * 3]; s[1] += sp.n[i * 3 + 1]; s[2] += sp.n[i * 3 + 2]; s[3]++; }
  const tone = new Map(), r = rng(seed * 31 + level);
  for (const [k, s] of sum) {
    const l = Math.hypot(s[0], s[1], s[2]) || 1; s[0] /= l; s[1] /= l; s[2] /= l;
    const lit = (s[0] * lf[0] + s[1] * lf[1] + s[2] * lf[2]) / ll, jit = (r() - .5) * 2 * contrast * .5;
    const v = lit + jit, steps = T.tones >= 4 ? [.78, .38, .02] : [.72, .2]; // lifted top, body, shade, core shadow
    tone.set(k, v > steps[0] ? -1 : v > steps[1] ? 0 : steps.length > 2 && v > steps[2] ? 1 : steps.length > 2 ? 2 : 1);
  }
  // ---- write: the cell's normal (flattened), its tone, and its seams ----
  const out = sp.m.slice();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, k = cell[i];
    if (k < 0) continue;
    const s = sum.get(k), f = T.flatten * D;
    let ax = sp.n[i * 3] * (1 - f) + s[0] * f, ay = sp.n[i * 3 + 1] * (1 - f) + s[1] * f, az = sp.n[i * 3 + 2] * (1 - f) + s[2] * f;
    const al = Math.hypot(ax, ay, az) || 1; sp.n[i * 3] = ax / al; sp.n[i * 3 + 1] = ay / al; sp.n[i * 3 + 2] = az / al;
    let t = tone.get(k);
    if (D < 1) { // cel: the tone by the pixel's own form, as far as the detail is low (big hard-edged shapes of light and shadow)
      const lit = (sp.n[i * 3] * lf[0] + sp.n[i * 3 + 1] * lf[1] + sp.n[i * 3 + 2] * lf[2]) / ll, steps = T.tones >= 4 ? [.78, .38, .02] : [.72, .2];
      const tp = lit > steps[0] ? -1 : lit > steps[1] ? 0 : steps.length > 2 && lit > steps[2] ? 1 : steps.length > 2 ? 2 : 1;
      if (texHash(i, k, seed) > D) t = tp;
    }
    // seams: the cell's lower (feathers, scales) or trailing (plates, shell) edge, or a parting between strokes (fur, bristles)
    const below = y + 1 < h ? cell[i + w] : -1, ahead = x + 1 < w ? cell[i + 1] : -1, lower = below >= 0 && below !== k, trailing = ahead >= 0 && ahead !== k;
    const other = T.kind === "plates" ? trailing : T.kind === "shell" || T.kind === "bristles" ? lower || trailing : lower; // fur's partings, a feather's or scale's lower edge, a plate's seam
    if (seam > 0 && other && texHash(k, k >> 7, seed + 3) < seam) t = Math.max(t, 0) + 1; // (a whole edge or none: a line, never speckle)
    const st0 = texStep.get(sp.m[i]);
    if (!st0 || !t) continue;
    if (t < 0 && sp.m[i] !== M.BODY) continue; // (only the body lifts: markings and the belly only darken)
    out[i] = st0.row[Math.max(0, Math.min(st0.row.length - 1, st0.i + t))];
  }
  sp.m.set(out);
  return sp;
}

// What's wrong with a texture setting, if anything.
export function textureProblems(id, t) {
  const out = [];
  if (!t) return out;
  if (t.kind && !TEXTURE_KINDS.includes(t.kind)) out.push(`${id}: texture ${t.kind} isn't one of ${TEXTURE_KINDS.join(", ")}`);
  for (const k of Object.keys(t)) if (!(k in TEXTURE_DEFAULT)) out.push(`${id}: no texture setting ${k}`);
  return out;
}
