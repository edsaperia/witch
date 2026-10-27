// Mock 7: the sigil itself made magical (no disc, no plain ring). Rank by colour plus one other cue. Each treatment draws a frame at
// loop time t (0..1) into three layers, in a unit frame round (0,0) (the glyph's box ±G): shade (dark, soft, under: readability on lit
// grass), glow (soft, added) and ink (crisp pixels).
const S = await import("/art/sigils.js");
const WHITE = [255, 255, 255], PLATE = [10, 8, 18], TAU = Math.PI * 2;
const RANK = [[170, 158, 210], [125, 205, 255], [255, 196, 80], [255, 252, 240]];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)), css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const G = .62, U = ([x, y]) => [(x - .5) * 2 * G, (y - .5) * 2 * G];
const glyphCache = new Map();
const glyph = (id, col) => { const k = id + col; if (!glyphCache.has(k)) { const c = document.createElement("canvas"); c.width = c.height = 256; S.drawSigil(c.getContext("2d"), id, { x: 0, y: 0, size: 256, level: null, colour: col, glow: false }); glyphCache.set(k, c); } return glyphCache.get(k); };
const drawGlyph = (g, id, col, k = 1) => g.drawImage(glyph(id, col), -G * k, -G * k, 2 * G * k, 2 * G * k);
// points along the strokes (spacing ~.03 unit) and the corners (ends and sharp turns)
const ptsCache = new Map();
function strokePts(id) { if (ptsCache.has(id)) return ptsCache.get(id); const out = [], corners = [];
  for (const s of S.sigilStrokes(id)) { const P = s.pts.map(U); if (s.dot || P.length === 1) { out.push(P[0]); corners.push(P[0]); continue; }
    corners.push(P[0], P[P.length - 1]);
    for (let i = 1; i < P.length; i++) { const [a, b] = [P[i - 1], P[i]], d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(d / .03)); for (let j = 0; j < n; j++) out.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]);
      if (i < P.length - 1) { const c = P[i + 1], a1 = Math.atan2(b[1] - a[1], b[0] - a[0]), a2 = Math.atan2(c[1] - b[1], c[0] - b[0]); let dd = Math.abs(a2 - a1); if (dd > Math.PI) dd = TAU - dd; if (dd > .7) corners.push(b); } } }
  const cs = []; for (const c of corners) if (!cs.some(q => Math.hypot(q[0] - c[0], q[1] - c[1]) < .09)) cs.push(c);
  const r = { pts: out, corners: cs }; ptsCache.set(id, r); return r; }
const rnd = (i, k = 0) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const dot = (g, x, y, r, col, a = 1) => { g.fillStyle = css(col, a); g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); };
const blurred = (g, px, fn) => { g.save(); g.filter = `blur(${px}px)`; fn(); g.restore(); };
// shade under every treatment: the glyph's own shape, thickened and blurred dark (not a disc)
const shadeGlyph = (L, id, s) => blurred(L.shade, .06 * s, () => { for (const [dx, dy] of [[0, 0], [.03, 0], [-.03, 0], [0, .03], [0, -.03]]) { L.shade.save(); L.shade.translate(dx, dy); drawGlyph(L.shade, id, PLATE, 1.04); L.shade.restore(); } });
const T = {
  light: { label: "1 · Drawn in light", note: "the glyph as a glowing stroke; a soft aura in the rank colour, larger each rank, breathing",
    draw(L, id, r, t, s) { const c = RANK[r], br = .5 + .5 * Math.sin(TAU * t); shadeGlyph(L, id, s);
      const aura = [.03, .06, .09, .14][r] * s; blurred(L.glow, aura, () => { L.glow.globalAlpha = [.5, .7, .85, 1][r] * (.7 + .3 * br); drawGlyph(L.glow, id, c, 1.08); drawGlyph(L.glow, id, c, 1.08); });
      L.glow.globalAlpha = 1; drawGlyph(L.ink, id, mix(c, WHITE, r === 3 ? .5 : .15)); } },
  embers: { label: "2 · Embers", note: "burned in, motes rising off the strokes: more each rank (2, 4, 7, 11)",
    draw(L, id, r, t, s) { const c = RANK[r], P = strokePts(id).pts; shadeGlyph(L, id, s); drawGlyph(L.ink, id, c);
      const n = [2, 4, 7, 11][r]; for (let i = 0; i < n; i++) { const life = (t + i / n) % 1, p = P[Math.floor(rnd(i, r) * P.length)], x = p[0] + Math.sin(TAU * (life + rnd(i, 2))) * .06, y = p[1] - life * .7;
        const col = mix(WHITE, c, life), a = 1 - life * .8; dot(L.ink, x, y, .045 * (1 - life * .4), col, a > .5 ? 1 : 0); blurred(L.glow, .05 * s, () => dot(L.glow, x, y, .07, c, a * .8)); } } },
  orbit: { label: "3 · Orbiting sparks", note: "sparks circle the glyph on a tilted orbit (1, 2, 3, 4), a shimmer runs along the strokes",
    draw(L, id, r, t, s) { const c = RANK[r], P = strokePts(id).pts; shadeGlyph(L, id, s); drawGlyph(L.ink, id, c);
      const at = Math.floor(t * P.length); for (let k = -2; k <= 2; k++) { const p = P[(at + k + P.length) % P.length]; dot(L.ink, p[0], p[1], .045, mix(c, WHITE, .8 - Math.abs(k) * .2)); }
      const n = r + 1; for (let j = 0; j < n; j++) for (let tr = 0; tr < 4; tr++) { const a = TAU * (t + j / n) - tr * .16, x = Math.cos(a) * .86, y = Math.sin(a) * .5 - .05;
        const front = Math.sin(a) > -.2; if (!tr) blurred(L.glow, .05 * s, () => dot(L.glow, x, y, .1, c, .9)); dot(L.ink, x, y, .06 - tr * .012, mix(WHITE, c, tr / 4), front || tr ? 1 : .0); } } },
  circle: { label: "4 · Inscribed circle", note: "a faint circle of script (not a line): broken runic arcs, crescents for adults, stars for legends, turning slowly",
    draw(L, id, r, t, s) { const c = RANK[r], dim = mix(PLATE, c, .6); shadeGlyph(L, id, s); drawGlyph(L.ink, id, c);
      const arcs = [3, 4, 4, 6][r], rot = TAU * t / 6, g = L.ink; g.strokeStyle = css(dim); g.lineWidth = .04; g.lineCap = "round";
      for (let a = 0; a < arcs; a++) { const a0 = rot + TAU * a / arcs, span = TAU / arcs * .62; for (let k = 0; k < 6; k++) { const aa = a0 + span * k / 6, R = .84, up = k % 2 ? .07 : -.07; g.beginPath(); g.moveTo(R * Math.cos(aa), R * Math.sin(aa)); g.lineTo((R + up) * Math.cos(aa + span / 12), (R + up) * Math.sin(aa + span / 12)); g.lineTo(R * Math.cos(aa + span / 6), R * Math.sin(aa + span / 6)); g.stroke(); } }
      if (r >= 2) for (let q = 0; q < 4; q++) { const aa = rot + TAU * (q + .5) / 4 + TAU / arcs * .3, x = .84 * Math.cos(aa), y = .84 * Math.sin(aa); dot(g, x, y, .08, dim); dot(g, x + .035, y - .02, .07, PLATE, 1); }
      if (r === 3) for (let q = 0; q < 4; q++) { const aa = -TAU / 4 + TAU * q / 4, x = 1.0 * Math.cos(aa), y = 1.0 * Math.sin(aa); blurred(L.glow, .05 * s, () => dot(L.glow, x, y, .1, c, 1)); dot(g, x, y, .05, WHITE); } } },
  stars: { label: "5 · Constellation", note: "the glyph's corners as stars on faint lines, twinkling; the stars grow each rank",
    draw(L, id, r, t, s) { const c = RANK[r], C = strokePts(id).corners; shadeGlyph(L, id, s); drawGlyph(L.ink, id, mix(PLATE, c, .55), .98);
      C.forEach((p, i) => { const tw = .6 + .4 * Math.sin(TAU * (t * 2 + rnd(i, 5))), sz = [.035, .05, .065, .08][r] * (.8 + .4 * tw); dot(L.ink, p[0], p[1], sz, mix(c, WHITE, .3 * tw));
        if (r >= 2) { L.ink.fillStyle = css(mix(c, WHITE, .5)); L.ink.fillRect(p[0] - sz * 2.2, p[1] - sz * .35, sz * 4.4, sz * .7); L.ink.fillRect(p[0] - sz * .35, p[1] - sz * 2.2, sz * .7, sz * 4.4); }
        blurred(L.glow, .04 * s, () => dot(L.glow, p[0], p[1], sz * 2, c, .7 * tw)); }); } },
  wisps: { label: "6 · Wisps (mine)", note: "two or more ribbons of mist curl round the glyph and through it, like a spell being cast; thicker each rank",
    draw(L, id, r, t, s) { const c = RANK[r]; shadeGlyph(L, id, s); drawGlyph(L.ink, id, c);
      const n = [1, 2, 2, 3][r], w = [.05, .06, .08, .1][r]; for (let j = 0; j < n; j++) { const ph = TAU * (t + j / n); const pts = []; for (let k = 0; k <= 24; k++) { const u = k / 24, a = ph + u * TAU * .7, R = .55 + .3 * Math.sin(u * Math.PI); pts.push([R * Math.cos(a), R * Math.sin(a) * .8]); }
        blurred(L.glow, .035 * s, () => { L.glow.strokeStyle = css(c, .9); L.glow.lineWidth = w * 1.6; L.glow.lineCap = "round"; L.glow.beginPath(); pts.forEach((p, i) => i ? L.glow.lineTo(...p) : L.glow.moveTo(...p)); L.glow.stroke(); });
        const head = pts[pts.length - 1]; dot(L.ink, head[0], head[1], w * .9, mix(c, WHITE, .6)); } } },
};
// render one sigil frame: w art px across the unit frame's diameter, squash for the ground; returns {shade, glow, ink} canvases at art px
function render(key, id, r, t, w, squash = 1) {
  const H = 8, pad = Math.ceil(w * .35), W = w + 2 * pad, Hh = Math.ceil(w * squash) + 2 * pad, s = w / 2 * H;
  const mk = () => { const c = document.createElement("canvas"); c.width = W * H; c.height = Hh * H; const g = c.getContext("2d"); g.setTransform(s, 0, 0, s * squash, W * H / 2, Hh * H / 2); return c; };
  const hi = { shade: mk(), glow: mk(), ink: mk() }, L = { shade: hi.shade.getContext("2d"), glow: hi.glow.getContext("2d"), ink: hi.ink.getContext("2d") };
  T[key].draw(L, id, r, t, s); const out = {};
  for (const k of ["shade", "glow", "ink"]) { const lo = document.createElement("canvas"); lo.width = W; lo.height = Hh; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(hi[k], 0, 0, W, Hh);
    if (k === "ink") { const d = l.getImageData(0, 0, W, Hh); for (let i = 0; i < d.data.length; i += 4) { const a = d.data[i + 3]; if (a < 100) { d.data[i + 3] = 0; continue; } for (let j = 0; j < 3; j++) d.data[i + j] = Math.min(255, d.data[i + j] * 255 / a); d.data[i + 3] = 255; } l.putImageData(d, 0, 0); }
    if (k === "shade") { const d = l.getImageData(0, 0, W, Hh); for (let i = 0; i < d.data.length; i += 4) { d.data[i + 3] = Math.min(255, d.data[i + 3] * 1.1) * .85; } l.putImageData(d, 0, 0); }
    out[k] = lo; }
  out.w = W; out.h = Hh; return out;
}
// draw it onto g at (x, y) (its centre), scaled k (nearest)
function put(g, R, x, y, k = 1) { const X = Math.round(x - R.w * k / 2), Y = Math.round(y - R.h * k / 2); g.save(); g.imageSmoothingEnabled = false; g.drawImage(R.shade, X, Y, R.w * k, R.h * k); g.globalCompositeOperation = "lighter"; g.drawImage(R.glow, X, Y, R.w * k, R.h * k); g.globalCompositeOperation = "source-over"; g.drawImage(R.ink, X, Y, R.w * k, R.h * k); g.restore(); }
// the stack's moon row (mock 6) beside a glyph of half-width hw (art px)
const PH = { 0: [".#...", "#....", "#....", "#....", ".#..."], 1: [".##..", "##...", "#....", "##...", ".##.."], 2: [".##..", "###..", "###..", "###..", ".##.."], 3: [".###.", "####.", "####.", "####.", ".###."] };
function moons(g, cx, cy, hw, n, filled, { ready = false, fuse = 0 } = {}) { const per = Math.ceil(n / 2), col = RANK[1], lit = ready ? mix(col, WHITE, .5) : col, dim = mix(PLATE, col, .3), sq = fuse > .1 ? Math.max(0, 1 - (fuse - .1) * 1.8) : 1;
  for (let i = 0; i < n; i++) { const right = i % 2 === 0, k = i >> 1, ph = Math.max(0, 3 - Math.floor(k * 4 / per)), on = n - 1 - i < filled, colour = fuse ? mix(col, WHITE, .5 + fuse * .4) : on ? lit : dim, off = Math.round((1 + k * 6) * sq), x = right ? cx + hw + off : cx - hw - off - 5;
    if (sq <= 0) continue; g.fillStyle = css(colour); PH[ph].forEach((row, yy) => [...row].forEach((ch, xx) => { if (ch === "#") g.fillRect(x + (right ? xx : 4 - xx), cy - 2 + yy, 1, 1); })); } }
window.M7 = { T, RANK, render, put, moons, mix, css };
