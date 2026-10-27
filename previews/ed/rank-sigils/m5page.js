// Mock 5: rank sigils brainstorm (baby 0, youth 1, adult 2, legend 3). Each concept draws, in a unit frame (the plate's radius 1 round
// (0,0)): plate(g, rank) the backing's path (filled dark under it), ink(g, rank, col) the marks, glyph scale gs(rank).
const S = await import("/art/sigils.js");
const WHITE = [255, 255, 255], PLATE = [12, 9, 20], D2R = Math.PI / 180;
const IRON = [120, 112, 135], SILVER = [205, 215, 235], GOLD = [255, 196, 64], MOONW = [236, 246, 255];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)), css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const glyphCache = new Map();
const glyph = (id, col) => { const k = id + col; if (!glyphCache.has(k)) { const c = document.createElement("canvas"); c.width = c.height = 256; S.drawSigil(c.getContext("2d"), id, { x: 0, y: 0, size: 256, level: null, colour: col, glow: false }); glyphCache.set(k, c); } return glyphCache.get(k); };
const circle = (g, r, x = 0, y = 0) => { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); };
const ring = (g, r, w) => { g.lineWidth = w; circle(g, r); g.stroke(); };
const star = (g, x, y, r, pts = 5, inner = .45) => { g.beginPath(); for (let i = 0; i < pts * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / pts, rr = i % 2 ? r * inner : r; g.lineTo(x + rr * Math.cos(a), y + rr * Math.sin(a)); } g.closePath(); g.fill(); };
const moon = (g, x, y, r, phase, col) => { // phase 0 new (outline), 1 crescent, 2 half, 3 full
  g.fillStyle = g.strokeStyle = css(col);
  if (phase === 0) { g.lineWidth = r * .35; circle(g, r * .85, x, y); g.stroke(); return; }
  g.save(); circle(g, r, x, y); g.clip(); circle(g, r, x, y); g.fill();
  if (phase < 3) { g.fillStyle = css(PLATE); if (phase === 1) { circle(g, r * .95, x - r * .55, y); g.fill(); } else { g.fillRect(x - r, y - r, r, 2 * r); } }
  g.restore();
};
const metal = r => [IRON, SILVER, GOLD, MOONW][r];
const legendRim = g => { g.strokeStyle = css(GOLD); ring(g, .78, .1); g.strokeStyle = css(MOONW); ring(g, .92, .09); g.lineWidth = .08; for (let i = 0; i < 12; i++) { const a = i * 30 * D2R; g.beginPath(); g.moveTo(1.0 * Math.cos(a), 1.0 * Math.sin(a)); g.lineTo(1.18 * Math.cos(a), 1.18 * Math.sin(a)); g.stroke(); } };
const C = {};
const def = (key, label, note, o) => { C[key] = { key, label, note, plate: (g) => circle(g, 1), gs: () => .56, ...o }; };
def("moonmark", "1 · Moon mark", "a moon over the glyph: new, crescent, half, full", {
  ink(g, r, col) { g.strokeStyle = css(col); ring(g, .88, .09); moon(g, 0, -.9, .27, r, r === 3 ? MOONW : col); } });
def("stars", "2 · Stars", "0–3 stars along the top, like rank stars; legend gold", {
  ink(g, r, col) { g.strokeStyle = css(col); ring(g, .88, .09); if (r === 3) ring(g, .72, .06); g.fillStyle = css(r === 3 ? GOLD : col); const n = r; for (let i = 0; i < n; i++) { const a = (-90 + (i - (n - 1) / 2) * 40) * D2R; star(g, .9 * Math.cos(a), .9 * Math.sin(a), .2); } } });
def("candles", "3 · Candles", "0–3 lit candles stood on the ring", {
  ink(g, r, col) { g.strokeStyle = css(col); ring(g, .88, .09); for (let i = 0; i < r; i++) { const a = (-90 + (i - (r - 1) / 2) * 38) * D2R, x = .88 * Math.cos(a), y = .88 * Math.sin(a); g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2); g.fillStyle = css(mix(col, WHITE, .6)); g.fillRect(-.06, -.24, .12, .2); g.fillStyle = css(r === 3 ? GOLD : [255, 210, 120]); g.beginPath(); g.ellipse(0, -.33, .06, .1, 0, 0, Math.PI * 2); g.fill(); g.restore(); } } });
def("chevrons", "4 · Broom chevrons", "0–3 bristle chevrons under the glyph, like sergeant's stripes", {
  gs: () => .5, ink(g, r, col) { g.strokeStyle = css(col); ring(g, .88, .09); g.strokeStyle = css(r === 3 ? GOLD : col); g.lineWidth = .1; g.lineCap = "round"; for (let i = 0; i < r; i++) { const y = .42 + i * .15; g.beginPath(); g.moveTo(-.3, y - .1); g.lineTo(0, y + .02); g.lineTo(.3, y - .1); g.stroke(); } } });
def("metal", "5 · Metal ring (colour)", "the ring's metal: iron, silver, gold, moon-white; the glyph keeps its species colour", {
  ink(g, r) { if (r === 3) { legendRim(g); return; } g.strokeStyle = css(metal(r)); ring(g, .86, r === 0 ? .08 : .14); } });
def("bright", "6 · Brightness", "no frame; the glyph dim → full → bright → white-hot with a halo", {
  gs: () => .7, ink(g, r, col) { if (r === 3) { g.strokeStyle = css(MOONW, .9); ring(g, .92, .06); } }, glyphCol: (r, col) => [mix(PLATE, col, .5), col, mix(col, WHITE, .35), mix(col, WHITE, .7)][r] });
def("size", "7 · Size", "same circle, bigger each rank (×0.6, 0.75, 0.9, 1.1)", {
  scale: r => [.6, .75, .9, 1.1][r], ink(g, r, col) { g.strokeStyle = css(r === 3 ? mix(col, WHITE, .5) : col); ring(g, .88, .1); } });
def("shape", "8 · Silhouette", "the plate's outline: small disc, disc, scalloped, star-burst", {
  plate(g, r) { if (r < 2) { circle(g, r ? 1 : .75); return; } g.beginPath(); const n = r === 2 ? 10 : 8; for (let i = 0; i <= n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n; const rr = r === 2 ? (i % 2 ? .9 : 1) : (i % 2 ? .78 : 1.08); g.lineTo(rr * Math.cos(a), rr * Math.sin(a)); } g.closePath(); },
  gs: r => r ? .56 : .45, ink(g, r, col) { g.strokeStyle = css(r === 3 ? mix(col, WHITE, .5) : col); g.lineWidth = .09; g.lineJoin = "round"; this.plate(g, r); g.save(); g.scale(.9, .9); g.stroke(); g.restore(); } });
def("runes", "9 · Rune band", "a band of runes filling: none, 4, 8, 8 with a second ring", {
  ink(g, r, col) { g.strokeStyle = css(r === 3 ? mix(col, WHITE, .5) : col); ring(g, .9, .08); const n = [0, 4, 8, 8][r]; g.lineWidth = .08; for (let i = 0; i < n; i++) { const a = (-90 + i * 360 / n) * D2R; g.save(); g.rotate(a); g.beginPath(); g.moveTo(.68, -.06); g.lineTo(.8, .06); g.moveTo(.68, .06); g.lineTo(.74, 0); g.stroke(); g.restore(); } if (r === 3) ring(g, .62, .06); } });
def("hat", "10 · Witch's hat", "a hat on the ring: none, outline, solid, solid with a star", {
  ink(g, r, col) { g.strokeStyle = css(col); ring(g, .86, .09); if (!r) return; g.fillStyle = g.strokeStyle = css(r === 3 ? MOONW : col); g.beginPath(); g.moveTo(-.38, -.78); g.lineTo(.38, -.78); g.lineTo(.08, -1.25); g.lineTo(.18, -1.32); g.lineTo(-.02, -1.3); g.closePath(); if (r === 1) { g.lineWidth = .07; g.stroke(); } else g.fill(); g.fillRect(-.48, -.82, .96, .1); if (r === 3) { g.fillStyle = css(GOLD); star(g, .02, -.98, .12); } } });
def("moonplate", "11 · Moonlit plate", "the dark plate lit like the moon behind the glyph: crescent, half, full, full with a halo", {
  plate(g, r) { circle(g, 1); },
  ink(g, r, col) { const lit = mix(PLATE, r === 3 ? MOONW : col, r === 3 ? .55 : .5); g.fillStyle = css(lit); g.save(); circle(g, .97); g.clip();
    if (r === 0) { g.beginPath(); g.arc(0, 0, .97, Math.PI * .5, Math.PI * 1.5); g.arc(.42, 0, 1.06, -1.98, 1.98, true); g.closePath(); g.fill(); }
    else if (r === 1) g.fillRect(-1, -1, 1, 2); else { circle(g, 1); g.fill(); } g.restore();
    g.strokeStyle = css(r === 3 ? MOONW : col); ring(g, .92, .08);
    if (r === 3) { g.strokeStyle = css(MOONW, .85); g.lineWidth = .08; for (let i = 0; i < 12; i++) { const a = i * 30 * D2R; g.beginPath(); g.moveTo(1.04 * Math.cos(a), 1.04 * Math.sin(a)); g.lineTo(1.22 * Math.cos(a), 1.22 * Math.sin(a)); g.stroke(); } } },
  glyphCol: (r, col) => r === 3 ? mix(col, PLATE, .1) : mix(col, WHITE, r >= 1 ? .45 : .2) });
def("metalstars", "12 · Metal + stars", "combined: iron, silver ★, gold ★★, moon-white ★★★", {
  ink(g, r, col) { g.strokeStyle = css(metal(r)); ring(g, .86, .13); g.fillStyle = css(metal(r)); for (let i = 0; i < r; i++) { const a = (-90 + (i - (r - 1) / 2) * 40) * D2R; star(g, .86 * Math.cos(a), .86 * Math.sin(a), .22); } } });
def("hatmetal", "13 · Hat + metal", "the ring's metal (iron, silver, gold, moon-white); adults and legends wear the witch's hat", {
  ink(g, r, col) { const m = metal(r); if (r === 3) legendRim(g); else { g.strokeStyle = css(m); ring(g, .86, r === 0 ? .08 : .13); } if (r < 2) return; g.fillStyle = css(m);
    g.beginPath(); g.moveTo(-.4, -.8); g.lineTo(.4, -.8); g.lineTo(.1, -1.32); g.lineTo(.24, -1.4); g.lineTo(-.02, -1.38); g.closePath(); g.fill(); g.fillRect(-.52, -.86, 1.04, .12);
    if (r === 3) { g.fillStyle = css(GOLD); star(g, .02, -1.02, .13); } } });
function drawRank(g, key, id, r, { plate = true } = {}) {
  const K = C[key], col = S.sigilColour(id), sc = K.scale ? K.scale(r) : 1; g.save(); g.scale(sc, sc);
  if (plate) { g.fillStyle = css(PLATE); K.plate(g, r); g.fill(); }
  K.ink(g, r, col); const gs = K.gs(r), gc = K.glyphCol ? K.glyphCol(r, col) : r === 3 ? mix(col, WHITE, .3) : col;
  g.drawImage(glyph(id, gc), -gs, -gs, 2 * gs, 2 * gs);
  g.restore();
}
// crisp at w art px (the unit radius's diameter) on the ground: box-filtered, alpha thresholded, the backing see-through
function crisp(key, id, r, w, squash = 1, plateA = .62) {
  const H = 8, R = w / 2, pad = Math.ceil(w * .3), W = w + 2 * pad, hh = Math.ceil(w * squash) + 2 * pad;
  const layer = plate => { const hc = document.createElement("canvas"); hc.width = W * H; hc.height = hh * H; const g = hc.getContext("2d");
    g.setTransform(R * H, 0, 0, R * squash * H, W * H / 2, hh * H / 2);
    if (plate) { const K = C[key], sc = K.scale ? K.scale(r) : 1; g.scale(sc, sc); g.fillStyle = "#fff"; K.plate(g, r); g.fill(); } else drawRank(g, key, id, r, { plate: false });
    const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(hc, 0, 0, W, hh); return l.getImageData(0, 0, W, hh); };
  const P = layer(true), I = layer(false), out = new ImageData(W, hh);
  for (let i = 0; i < I.data.length; i += 4) { const a = I.data[i + 3];
    if (a >= 100) { for (let j = 0; j < 3; j++) out.data[i + j] = Math.min(255, I.data[i + j] * 255 / a); out.data[i + 3] = 255; }
    else if (P.data[i + 3] >= 128) { out.data.set(PLATE, i); out.data[i + 3] = Math.round(255 * plateA); } }
  const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; lo.getContext("2d").putImageData(out, 0, 0); return lo;
}
window.M5 = { S, C, drawRank, crisp, mix, css, glyph, PLATE, WHITE };
