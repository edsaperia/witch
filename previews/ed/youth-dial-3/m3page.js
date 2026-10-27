// Berry dial mock 3: honeycomb and gem facets, drawn in 2D at the game's sizes (art pixel 3 screen px).
const S = await import("/art/sigils.js");
const SP = [["snail", 3, "light"], ["fox", 6, "normal"], ["bear", 12, "strong"]], WHITE = [255, 255, 255];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)), css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const PLATE = [12, 9, 20], D2R = Math.PI / 180;
const hex = (cx, cy, R, rot) => Array.from({ length: 6 }, (_, k) => [cx + R * Math.cos((rot + 60 * k) * D2R), cy + R * Math.sin((rot + 60 * k) * D2R)]);
const poly = (g, pts) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); };
// distance to a pointy-top hex's edge (circumradius R) at angle a (deg)
const hexR = (R, a) => { let n = ((a % 60) + 60) % 60; if (n > 30) n -= 60; return R * Math.cos(30 * D2R) / Math.cos(n * D2R); };
const ringPiece = (a0, a1, R0, R1) => { const pts = [], step = (a1 - a0) / 24; for (let a = a0; a <= a1 + 1e-6; a += step) pts.push(a); const cs = []; for (let k = -2; k < 8; k++) { const c = -90 + 60 * k; if (c > a0 && c < a1) cs.push(c); } const as = [...new Set([a0, ...cs, a1])].sort((x, y) => x - y);
  return [...as.map(a => [hexR(R1, a) * Math.cos(a * D2R), hexR(R1, a) * Math.sin(a * D2R)]), ...as.slice().reverse().map(a => [hexR(R0, a) * Math.cos(a * D2R), hexR(R0, a) * Math.sin(a * D2R)])]; };
// ---- the concepts, in a unit frame: the plate a pointy-top hexagon of circumradius 1 round (0,0)
const CONCEPTS = {
  honeycomb: {
    cells(n) { // flat-top cells round the glyph, clockwise from the top
      if (n === 3) return [-90, 30, 150].map(a => ({ x: .7 * Math.cos(a * D2R), y: .7 * Math.sin(a * D2R), c: .27 }));
      if (n === 6) return [0, 1, 2, 3, 4, 5].map(k => { const a = -90 + 60 * k; return { x: .72 * Math.cos(a * D2R), y: .72 * Math.sin(a * D2R), c: .245 }; });
      const out = []; for (let k = 0; k < 6; k++) { const a = -90 + 60 * k, b = a + 30; out.push({ x: .77 * Math.cos(a * D2R), y: .77 * Math.sin(a * D2R), c: .19 }, { x: .667 * Math.cos(b * D2R), y: .667 * Math.sin(b * D2R), c: .19 }); } return out;
    },
    glyphR: n => n === 12 ? .5 : n === 6 ? .46 : .5,
    piece(g, n, i, grow = 1) { const c = this.cells(n)[i]; poly(g, hex(c.x, c.y, c.c * grow, 0)); },
  },
  gem: {
    glyphR: () => .58,
    piece(g, n, i, grow = 1) { const span = 360 / n, gap = (n === 12 ? 7 : n === 6 ? 8 : 9) * (1 - Math.min(1, grow - 1)), a0 = -90 - (n === 3 ? 60 : 0) + i * span; poly(g, ringPiece(a0 + gap / 2, a0 + span - gap / 2, .64, .97)); },
  },
};
// one sigil, unit frame → canvas transform already set. state: { filled, ready, adult, fuse (0..1), plate }
function drawUnit(g, concept, id, n, st, col, glyphCanvas) {
  const C = CONCEPTS[concept];
  if (st.plate !== false) { g.fillStyle = css(PLATE, 1); poly(g, hex(0, 0, 1, -90)); g.fill(); }
  const lit = st.ready ? mix(col, WHITE, .45) : col, dim = mix(PLATE, col, .38);
  if (st.adult) { // the solid hexagonal frame: the cells fused
    g.fillStyle = css(mix(col, WHITE, .15)); g.beginPath(); for (const [R, rev] of [[.97, 0], [.62, 1]]) { const p = hex(0, 0, R, -90); if (rev) p.reverse(); p.forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); } g.fill("evenodd");
    if (concept === "gem") { g.strokeStyle = css(mix(col, PLATE, .55)); g.lineWidth = .035; for (let k = 0; k < 6; k++) { const a = -90 + 60 * k; g.beginPath(); g.moveTo(.62 * Math.cos(a * D2R), .62 * Math.sin(a * D2R)); g.lineTo(.97 * Math.cos(a * D2R), .97 * Math.sin(a * D2R)); g.stroke(); } }
  } else {
    const f = st.fuse || 0; g.save(); if (f) { poly(g, hex(0, 0, .97, -90)); g.clip(); }
    for (let i = 0; i < n; i++) { const eaten = i < st.filled; g.fillStyle = css(f ? mix(col, WHITE, .2 + .5 * f) : eaten ? lit : dim); C.piece(g, n, i, 1 + f * (concept === "honeycomb" ? .7 : 1.2)); g.fill(); }
    if (f > .5) { g.globalAlpha = (f - .5) * 2; g.fillStyle = css(mix(col, WHITE, .5)); g.beginPath(); for (const [R, rev] of [[.97, 0], [.62, 1]]) { const p = hex(0, 0, R, -90); if (rev) p.reverse(); p.forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); } g.fill("evenodd"); g.globalAlpha = 1; }
    g.restore();
  }
  const gr = C.glyphR(n) * (st.adult ? 1.06 : 1); g.drawImage(glyphCanvas(st.adult ? mix(col, WHITE, .35) : col), -gr, -gr, 2 * gr, 2 * gr);
}
const glyphCache = new Map();
const glyph = id => col => { const k = id + col; if (!glyphCache.has(k)) { const c = document.createElement("canvas"); c.width = c.height = 256; S.drawSigil(c.getContext("2d"), id, { x: 0, y: 0, size: 256, level: null, colour: col, glow: false }); glyphCache.set(k, c); } return glyphCache.get(k); };
// a vector sigil at w×h px (h squashed for the ground), crisp: box-filtered then alpha thresholded, the plate's pixels kept see-through
function crisp(concept, id, n, st, w, squash, plateA = .62) {
  const H = 8, R = w / Math.sqrt(3), hh = Math.ceil(2 * R * squash) + 2, W = w + 2;
  const layer = plate => { const hc = document.createElement("canvas"); hc.width = W * H; hc.height = hh * H; const g = hc.getContext("2d");
    g.setTransform(R * H, 0, 0, R * squash * H, W * H / 2, hh * H / 2);
    if (plate) { g.fillStyle = "#fff"; M3.poly(g, M3.hex(0, 0, 1, -90)); g.fill(); } else drawUnit(g, concept, id, n, { ...st, plate: false }, S.sigilColour(id), glyph(id));
    const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(hc, 0, 0, W, hh); return l.getImageData(0, 0, W, hh); };
  const P = st.plate === false ? null : layer(true), I = layer(false), out = new ImageData(W, hh);
  for (let i = 0; i < I.data.length; i += 4) { const a = I.data[i + 3];
    if (a >= 110) { for (let j = 0; j < 3; j++) out.data[i + j] = Math.min(255, I.data[i + j] * 255 / a); out.data[i + 3] = 255; }
    else if (P && P.data[i + 3] >= 128) { out.data.set(PLATE, i); out.data[i + 3] = Math.round(255 * plateA); } }
  const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; lo.getContext("2d").putImageData(out, 0, 0); return lo;
}
// a young one's head in the stack: its glyph alone, as the game draws it today
function bare(id, px) { const lo = document.createElement("canvas"); lo.width = lo.height = px; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(glyph(id)(S.sigilColour(id)), 0, 0, px, px); const d = l.getImageData(0, 0, px, px); for (let i = 0; i < d.data.length; i += 4) { const a = d.data[i + 3]; if (a < 90) { d.data[i + 3] = 0; continue; } for (let j = 0; j < 3; j++) d.data[i + j] = Math.min(255, d.data[i + j] * 255 / a); d.data[i + 3] = 255; } l.putImageData(d, 0, 0); return lo; }
// ---- the stack: the glyph in its small hexagon, the pieces unfolded into a strip to its right (pixel sprites, art px)
const CELL = ["..#..", ".###.", "#####", "#####", ".###.", "..#.."];
const BAR = ["..###", "..###", "..###", ".###.", ".###.", ".###.", "###..", "###..", "###.."];
function stackSprite(concept, id, n, st, hpx = 11) {
  const col = S.sigilColour(id), lit = st.ready ? mix(col, WHITE, .45) : col, dim = mix(PLATE, col, .45);
  const hd = st.adult ? crisp(concept, id, 0, { adult: true, filled: 0 }, hpx - 1, 1, .85) : bare(id, hpx);
  let stripW = 0; const marks = [];
  if (!st.adult) {
    if (concept === "honeycomb") { for (let i = 0; i < n; i++) { const top = i % 2 === 0, x = Math.floor(i / 2) * 6 + (top ? 0 : 3); marks.push({ x, y: top ? 0 : 5, spr: CELL, on: i < st.filled || st.fuse }); stripW = Math.max(stripW, x + 5); } }
    else { for (let i = 0; i < n; i++) { const x = i * 4; marks.push({ x, y: 1, spr: BAR, on: i < st.filled || st.fuse }); stripW = Math.max(stripW, x + 5); } }
  }
  const c = document.createElement("canvas"); c.width = hd.width + (stripW ? stripW + 2 : 0); c.height = Math.max(hd.height, 12); const g = c.getContext("2d");
  g.drawImage(hd, 0, Math.round((c.height - hd.height) / 2));
  for (const m of marks) { g.fillStyle = css(st.fuse ? mix(col, WHITE, .3 + .5 * st.fuse) : m.on ? lit : dim); m.spr.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === "#") g.fillRect(hd.width + 1 + m.x + x, Math.round((c.height - 11) / 2) + m.y + y, 1, 1); })); }
  return c;
}
window.M3 = { S, SP, CONCEPTS, drawUnit, glyph, crisp, stackSprite, mix, css, PLATE, hex, poly };
