// Witch art core: random numbers, noise, colour, the Sprite (a material and a normal per
// pixel), the shape toolkit the animals and trees are drawn with, and bake (sprite ->
// albedo + normal canvases). No page or DOM dependencies beyond making canvases.

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

// ================= colour =================
export function hsv2rgb(h, s, v) {
  h = ((h % 1) + 1) % 1; s = Math.max(0, Math.min(1, s)); v = Math.max(0, Math.min(1, v));
  const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const [r, g, b] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// ================= materials =================
// A sprite stores a material per pixel; a palette (material -> colour) makes it an image,
// so one drawing can be recoloured by any style.
export const M = {
  EMPTY: 0, BODY: 1, BELLY: 2, ACCENT: 3, EYE: 4, GLINT: 5, TRUNK: 6, LEAF: 7, LEAF2: 8, CLOTH: 9, SKIN: 10, HAIR: 11, BROOM: 12, STRAW: 13,
  BODY2: 14, BARK2: 15, FLOWER: 16, PUPIL: 17, MAGIC: 18, BARKD: 19,
  LINE: 20,    // interior outline, where one part overlaps another
  IRIS: 21,    // coloured part of an eye
  MAGIC2: 22,  // the bright core of a magical feature
  NOSE: 23,    // nose leather, mouth
  EAR: 24,     // inside of an ear
  BODY3: 25,   // the darkest fur: saddles, stripes, tips
  LEAF3: 26,   // the darkest leaves, inside a crown
  BARKL: 27,   // lit bark ridges
  HAT: 28, PHONES: 29, TOP: 30, JACKET: 31, JEANS: 32, SHOES: 33, // the witch's outfit parts
  WATER: 34,   // still water: the prototype draws reflections on it
  STONE: 35, STONED: 36, MOSS: 37, // hewn stone, its dark cracks and hollows, moss on it
  CRYSTAL: 38, // crystal, lit
  RUNE: 39,    // a carved rune's glow
  GLOW: 40,    // glowing crystal: a soundsystem's cones and the depths of its horns
  WOOD: 41,    // varnished wooden trim
};
// These glow: drawn at full colour by the lighting pass, whatever the light.
export const EMISSIVE = new Set([M.GLINT, M.FLOWER, M.MAGIC, M.MAGIC2, M.RUNE, M.GLOW]);

// ================= geometry: smooth outlines =================
// Points are [x, y] in sprite pixels. A closed outline is a list of control points; the
// curve passes through each one (Catmull-Rom), so an outline reads like an illustrator's path.
export function spline(pts, closed = true, per = 8) {
  const n = pts.length, out = [];
  if (n < 3) return pts.slice();
  const P = i => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const steps = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 1.5), per);
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(k => .5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
    }
  }
  if (!closed) out.push(pts[n - 1]);
  return out;
}
// A limb, tail or neck: a spine of [x, y, width] points becomes a closed outline with
// rounded ends. `cap` sets how round the ends are (0 = cut square).
export function band(spine, { cap = 1, capEnd = cap } = {}) {
  const L = [], R = [], n = spine.length;
  for (let i = 0; i < n; i++) {
    const a = spine[Math.max(0, i - 1)], b = spine[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const w = spine[i][2] / 2;
    L.push([spine[i][0] - dy * w, spine[i][1] + dx * w]); R.push([spine[i][0] + dy * w, spine[i][1] - dx * w]);
  }
  const end = (p, q, w, c) => { // a point beyond the end, so the spline rounds it off
    let dx = p[0] - q[0], dy = p[1] - q[1]; const l = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / l * w / 2 * c, p[1] + dy / l * w / 2 * c];
  };
  // a flat end still gets its middle point, or the smooth curve overshoots across it
  const pts = [...L, end(spine[n - 1], spine[n - 2], spine[n - 1][2], capEnd), ...R.reverse(), end(spine[0], spine[1], spine[0][2], cap)];
  return pts;
}
// Moves control points: `f([x, y], i) -> [x, y]`.
export const mapPts = (pts, f) => pts.map((p, i) => f(p, i));
export const rot = ([x, y], [cx, cy], a) => { const c = Math.cos(a), s = Math.sin(a); return [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]; };
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// A fur or feather edge: replaces the stretch between control points i0..i1 with a
// zigzag of `count` tufts sticking out by `amp` pixels.
export function tufts(pts, i0, i1, count, amp, out = 1) {
  const res = [];
  for (let i = 0; i < pts.length; i++) {
    res.push(pts[i]);
    if (i < i0 || i >= i1) continue;
    const a = pts[i], b = pts[(i + 1) % pts.length];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1;
    const nx = dy / l * out, ny = -dx / l * out; // left of travel; outlines run clockwise on screen
    for (let k = 1; k <= count; k++) {
      const t = (k - .5) / count, m = lerp2(a, b, t), tip = [m[0] + nx * amp - dx / l * amp * .5, m[1] + ny * amp - dy / l * amp * .5];
      res.push(lerp2(a, b, t - .45 / count), tip, lerp2(a, b, t + .35 / count));
    }
  }
  return res;
}

// Which pixels a closed polygon covers (pixel centres, even-odd rule).
export function polyMask(w, h, poly) {
  const m = new Uint8Array(w * h);
  let y0 = Infinity, y1 = -Infinity;
  for (const p of poly) { y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
  for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(h - 1, Math.ceil(y1)); y++) {
    const cy = y + .5, xs = [];
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > cy) !== (yj > cy)) xs.push(xi + (cy - yi) / (yj - yi) * (xj - xi));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2)
      for (let x = Math.max(0, Math.ceil(xs[k] - .5)); x <= Math.min(w - 1, Math.floor(xs[k + 1] - .5)); x++) m[y * w + x] = 1;
  }
  return m;
}

// For every pixel inside a mask: the vector to the nearest pixel outside it (8-point
// sequential Euclidean distance transform). Its direction is the way out, its length the depth.
export function edgeVectors(w, h, mask) {
  const INF = 1e4, vx = new Float32Array(w * h), vy = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) if (mask[i]) { vx[i] = INF; vy[i] = INF; }
  const d2 = i => vx[i] * vx[i] + vy[i] * vy[i];
  const test = (i, x, y, ox, oy) => {
    const nx = x + ox, ny = y + oy;
    let ax, ay;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) { ax = ox; ay = oy; }
    else { const j = ny * w + nx; ax = vx[j] + ox; ay = vy[j] + oy; }
    if (ax * ax + ay * ay < d2(i)) { vx[i] = ax; vy[i] = ay; }
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) { const i = y * w + x; if (!mask[i]) continue; test(i, x, y, -1, 0); test(i, x, y, 0, -1); test(i, x, y, -1, -1); test(i, x, y, 1, -1); }
    for (let x = w - 1; x >= 0; x--) { const i = y * w + x; if (mask[i]) test(i, x, y, 1, 0); }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) { const i = y * w + x; if (!mask[i]) continue; test(i, x, y, 1, 0); test(i, x, y, 0, 1); test(i, x, y, 1, 1); test(i, x, y, -1, 1); }
    for (let x = 0; x < w; x++) { const i = y * w + x; if (mask[i]) test(i, x, y, -1, 0); }
  }
  return { vx, vy };
}

// ================= sprites: material + normal per pixel =================
export class Sprite {
  constructor(w, h, sx = 1) {
    this.sx = sx; this.w = Math.round(w * sx); this.h = h | 0;
    this.m = new Uint8Array(this.w * this.h); this.n = new Float32Array(this.w * this.h * 3);
    this.g = new Uint8Array(this.w * this.h); // which group of parts drew each pixel (for interior outlines)
  }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  get(x, y) { x |= 0; y |= 0; return this.inb(x, y) ? this.m[y * this.w + x] : 0; }
  put(x, y, v, nx = 0, ny = 0, nz = 1) { this.px(x * this.sx, y, v, nx, ny, nz); }
  px(x, y, v, nx = 0, ny = 0, nz = 1) { x = Math.floor(x); y = Math.floor(y); if (!this.inb(x, y)) return; const i = y * this.w + x; this.m[i] = v; this.n[i * 3] = nx; this.n[i * 3 + 1] = ny; this.n[i * 3 + 2] = nz; }
  // Changes a pixel's material and keeps its normal.
  recolour(x, y, v) { x = Math.floor(x); y = Math.floor(y); if (this.inb(x, y) && this.m[y * this.w + x]) this.m[y * this.w + x] = v; }
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

  // ---- the illustrator's method: a closed smooth outline, filled ----
  // `pts` are control points of a closed outline (already in this sprite's pixels).
  // The fill's normals come from the distance to its edge, so it reads as a rounded mass:
  // flat in the middle, turning away at the rim. Options:
  //   group: parts in the same group merge; where a part covers another group's pixels,
  //          its rim there is drawn as an interior outline (when `line` is on)
  //   line:  draw that interior outline (M.LINE)
  //   depth: how far in (pixels) the surface keeps turning; default: the part's own thickness
  //   round: how strongly normals turn (the style's Roundness)
  //   onlyOn: a set of materials it may cover (a marking painted onto fur)
  //   keepNormals: recolour only (markings)
  //   tilt: [x, y] leans the whole surface, e.g. a face turned slightly up
  shape(pts, mat, o = {}) { return this.fillMask(polyMask(this.w, this.h, spline(pts, true, o.per || 6)), mat, o); }
  // The same for an open-ended limb: see band().
  limb(spine, mat, o = {}) { return this.shape(band(spine, o), mat, o); }
  fillMask(mask, mat, { group = 1, line = false, depth = 0, round = 1, onlyOn = null, keepNormals = false, tilt = [0, 0], lineMat = M.LINE } = {}) {
    const { w, h } = this;
    if (onlyOn) for (let i = 0; i < w * h; i++) if (mask[i] && !onlyOn.has(this.m[i])) mask[i] = 0;
    const { vx, vy } = edgeVectors(w, h, mask);
    let R = depth;
    if (!R) { // cartoon modelling: the rim turns away, the middle stays broad and flat
      for (let i = 0; i < w * h; i++) if (mask[i]) R = Math.max(R, Math.hypot(vx[i], vy[i]));
      R = Math.max(1.5, Math.min(R * .9, 2.5 + R * .35));
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x; if (!mask[i]) continue;
      if (keepNormals) { this.m[i] = mat; continue; }
      const d = Math.hypot(vx[i], vy[i]), t = Math.min(1, Math.max(0, (d - .5) / R));
      const slope = Math.min(2.6, (1 - t) / Math.sqrt(Math.max(.02, 1 - (1 - t) * (1 - t)))) * round;
      let nx = vx[i] / (d || 1) * slope + tilt[0], ny = vy[i] / (d || 1) * slope + tilt[1];
      const l = Math.hypot(nx, ny, 1);
      this.m[i] = mat; this.n[i * 3] = nx / l; this.n[i * 3 + 1] = ny / l; this.n[i * 3 + 2] = 1 / l;
    }
    if (line && !keepNormals) {
      const lines = [];
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x; if (!mask[i]) continue;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= w || Y >= h) continue;
          const j = Y * w + X;
          if (!mask[j] && this.m[j] && this.g[j] !== group && this.m[j] !== lineMat) { lines.push(i); break; }
        }
      }
      for (const i of lines) this.m[i] = lineMat;
    }
    if (!keepNormals) for (let i = 0; i < w * h; i++) if (mask[i]) this.g[i] = group;
    return mask;
  }
  // Paints a material over pixels already drawn, keeping their normals (markings, bellies).
  mark(pts, mat, onlyOn, o = {}) { return this.fillMask(polyMask(this.w, this.h, spline(pts, true, 6)), mat, { ...o, onlyOn: new Set(onlyOn), keepNormals: true }); }
  // A hand-drawn pixel grid: rows of characters, `key` maps a character to a material.
  // Normals come from the grid's own silhouette, so it lights like the drawn sprites.
  grid(rows, key, ox = 0, oy = 0, { round = 1, flipX = false } = {}) {
    const gw = Math.max(...rows.map(r => r.length)), mask = new Uint8Array(this.w * this.h), mats = new Map();
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      const m = key[ch]; if (!m) return;
      const X = ox + (flipX ? gw - 1 - x : x), Y = oy + y; if (!this.inb(X, Y)) return;
      mask[Y * this.w + X] = 1; mats.set(Y * this.w + X, m);
    }));
    this.fillMask(mask, M.BODY, { round, depth: 2.5 });
    for (const [i, m] of mats) this.m[i] = m;
  }
}

// ================= sprite -> albedo + normal images =================
// Albedo alpha 254 marks a glowing pixel for the lighting pass. N is the normal map,
// NF the same for the sprite mirrored (facing left).
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
    let c = colours[m];
    if (m === M.LINE && !c) c = outline === "tint" || !outline ? (colours[M.BODY2] || [0, 0, 0]).map(v => v * .55 | 0) : outline;
    c = c || [255, 0, 255];
    a.data.set([...c, EMISSIVE.has(m) ? 254 : 255], o);
    const nx = sp.n[i * 3], ny = sp.n[i * 3 + 1], nz = sp.n[i * 3 + 2];
    n.data.set([nx * 127 + 128, ny * 127 + 128, nz * 255, 255], o);
    nf.data.set([-nx * 127 + 128, ny * 127 + 128, nz * 255, 255], o);
  }
  A.getContext("2d").putImageData(a, 0, 0); N.getContext("2d").putImageData(n, 0, 0); NF.getContext("2d").putImageData(nf, 0, 0);
  return { A, N, NF, w, h };
}
