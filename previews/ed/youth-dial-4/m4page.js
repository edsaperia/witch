// Berry dial mock 4 (Ed: the hybrid, witchy): the stack's bar of pieces beside the glyph (berries, moons, a vine), the floor's circle
// giving only the rank (baby, youth, adult, legend: a chalk circle or a wreath). Drawn in 2D at the game's sizes (art pixel 3 screen px).
const S = await import("/art/sigils.js");
const WHITE = [255, 255, 255], PLATE = [12, 9, 20], D2R = Math.PI / 180;
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)), css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const glyphCache = new Map();
const glyph = (id, col) => { const k = id + col; if (!glyphCache.has(k)) { const c = document.createElement("canvas"); c.width = c.height = 256; S.drawSigil(c.getContext("2d"), id, { x: 0, y: 0, size: 256, level: null, colour: col, glow: false }); glyphCache.set(k, c); } return glyphCache.get(k); };
const ring = (g, r, w) => { g.lineWidth = w; g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke(); };
// ---- the floor: rank only. Unit circle (radius 1) round (0,0), the backing disc under it.
const FLOORS = {
  chalk(g, rank, col) { // a chalk circle gaining detail with rank: one ring; a ring and four runes; two rings, runes between; a legend's moons and points
    const ink = rank === 3 ? mix(col, WHITE, .45) : col; g.strokeStyle = g.fillStyle = css(ink); g.lineCap = "round";
    if (rank === 0) { g.setLineDash([.38, .3]); ring(g, .9, .1); g.setLineDash([]); } else ring(g, .9, rank === 1 ? .13 : .1);
    if (rank >= 2) ring(g, .7, .08);
    const runes = rank === 1 ? 4 : rank >= 2 ? 8 : 0;
    for (let i = 0; i < runes; i++) { const a = (-90 + i * 360 / runes) * D2R, r0 = rank === 1 ? .68 : .7, r1 = rank === 1 ? 1.08 : .9; g.save(); g.rotate(a + Math.PI / 2);
      g.lineWidth = rank === 1 ? .12 : .08; g.beginPath(); g.moveTo(0, -r0); g.lineTo(0, -r1); if (rank >= 2 && i % 2) { g.moveTo(-.07, -(r0 + r1) / 2 + .05); g.lineTo(.07, -(r0 + r1) / 2 - .05); } g.stroke(); g.restore(); }
    if (rank === 3) for (let i = 0; i < 8; i++) { const a = (-90 + 22.5 + i * 45) * D2R; g.save(); g.rotate(a + Math.PI / 2); g.beginPath(); g.moveTo(-.09, -.92); g.lineTo(0, -1.12); g.lineTo(.09, -.92); g.closePath(); g.fill(); g.restore(); }
  },
  wreath(g, rank, col) { // a twig circle; leaves on it; a full wreath; a legend's wreath with berries and a crescent at its crown
    const ink = rank === 3 ? mix(col, WHITE, .4) : col; g.strokeStyle = g.fillStyle = css(ink); g.lineCap = "round";
    if (rank === 0) { g.setLineDash([.32, .14]); ring(g, .86, .08); g.setLineDash([]); return; }
    ring(g, .86, .07);
    const leaves = rank === 1 ? 6 : 16;
    for (let i = 0; i < leaves; i++) { const a = (-90 + (i + .5) * 360 / leaves) * D2R, out = i % 2 ? 1 : -1; g.save(); g.rotate(a); g.translate(.86 + out * .09, 0); g.rotate(out * .6);
      g.beginPath(); g.ellipse(0, 0, .085, .2, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
    if (rank === 3) { g.fillStyle = css(mix(col, WHITE, .75)); for (let i = 0; i < 6; i++) { const a = (-90 + 30 + i * 60) * D2R; g.beginPath(); g.arc(.86 * Math.cos(a), .86 * Math.sin(a), .1, 0, Math.PI * 2); g.fill(); }
      g.fillStyle = css(mix(col, WHITE, .75)); g.beginPath(); g.arc(0, -1.02, .22, 0, Math.PI * 2); g.fill(); g.globalCompositeOperation = "destination-out"; g.beginPath(); g.arc(.09, -1.08, .19, 0, Math.PI * 2); g.fill(); g.globalCompositeOperation = "source-over"; }
  },
};
function drawFloor(g, style, id, rank, opts = {}) {
  const col = S.sigilColour(id);
  if (opts.plate !== false) { g.fillStyle = css(PLATE); g.beginPath(); g.arc(0, 0, 1, 0, Math.PI * 2); g.fill(); }
  FLOORS[style](g, rank, col);
  const gr = .56; g.drawImage(glyph(id, rank === 3 ? mix(col, WHITE, .35) : col), -gr, -gr, 2 * gr, 2 * gr);
}
// crisp at w art px across (squashed for the ground): box-filtered, alpha thresholded, the backing disc see-through
function crispFloor(style, id, rank, w, squash, plateA = .62) {
  const H = 8, R = w / 2 * 1.0, pad = 3, W = w + 2 * pad, hh = Math.ceil(w * squash) + 2 * pad;
  const layer = plate => { const hc = document.createElement("canvas"); hc.width = W * H; hc.height = hh * H; const g = hc.getContext("2d");
    g.setTransform(R * H, 0, 0, R * squash * H, W * H / 2, hh * H / 2);
    if (plate) { g.fillStyle = "#fff"; g.beginPath(); g.arc(0, 0, 1, 0, Math.PI * 2); g.fill(); } else drawFloor(g, style, id, rank, { plate: false });
    const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(hc, 0, 0, W, hh); return l.getImageData(0, 0, W, hh); };
  const P = layer(true), I = layer(false), out = new ImageData(W, hh);
  for (let i = 0; i < I.data.length; i += 4) { const a = I.data[i + 3];
    if (a >= 100) { for (let j = 0; j < 3; j++) out.data[i + j] = Math.min(255, I.data[i + j] * 255 / a); out.data[i + 3] = 255; }
    else if (P.data[i + 3] >= 128) { out.data.set(PLATE, i); out.data[i + 3] = Math.round(255 * plateA); } }
  const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; lo.getContext("2d").putImageData(out, 0, 0); return lo;
}
// ---- the stack: the glyph (11 art px) and its bar. Pieces are pixel sprites: # the piece, s its stem, v the vine.
const BERRY = ["...s.", "..s..", ".###.", "#####", "#####", ".###."];
const MOON = [".###.", "#####", "#####", "#####", ".###."], CRESCENT = [".##..", "#....", "#....", "#....", ".##.."];
const LEAF_UP = ["..#", ".##", "##."], LEAF_DN = LEAF_UP.slice().reverse();
const BARS = {
  berry: { h: 6, layout: n => n > 8 ? Array.from({ length: n }, (_, i) => ({ x: (i >> 1) * 6 + (i & 1) * 3, y: (i & 1) * 7, row: i & 1 })) : Array.from({ length: n }, (_, i) => ({ x: i * 6, y: 3 })), spr: () => BERRY, rows: n => n > 8 ? 13 : 6 },
  moon: { h: 5, layout: n => n > 8 ? Array.from({ length: n }, (_, i) => ({ x: (i >> 1) * 6 + (i & 1) * 3, y: (i & 1) * 6 })) : Array.from({ length: n }, (_, i) => ({ x: i * 6, y: 3 })), spr: on => on ? MOON : CRESCENT },
  vine: { layout: n => Array.from({ length: n }, (_, i) => ({ x: i * 3, y: i % 2 ? 6 : 0, up: !(i % 2) })), spr: (on, p) => p.up ? LEAF_UP : LEAF_DN, vine: true },
};
function bare(id, px, col) { const lo = document.createElement("canvas"); lo.width = lo.height = px; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(glyph(id, col), 0, 0, px, px); const d = l.getImageData(0, 0, px, px); for (let i = 0; i < d.data.length; i += 4) { const a = d.data[i + 3]; if (a < 90) { d.data[i + 3] = 0; continue; } for (let j = 0; j < 3; j++) d.data[i + j] = Math.min(255, d.data[i + j] * 255 / a); d.data[i + 3] = 255; } l.putImageData(d, 0, 0); return lo; }
// st: { filled, ready, adult, fuse 0..1 }; n pieces. The adult: the bar gone, folded into a ring round the glyph (the floor's adult circle, small).
function stackSprite(bar, id, n, st, hpx = 11) {
  const col = S.sigilColour(id), lit = st.ready ? mix(col, WHITE, .45) : col, dim = mix(PLATE, col, .42), B = BARS[bar];
  const c = document.createElement("canvas"); c.width = 70; c.height = 15; const g = c.getContext("2d"); const cy = 7;
  const put = (spr, x, y, colour, stemC) => spr.forEach((row, yy) => [...row].forEach((ch, xx) => { if (ch === ".") return; g.fillStyle = css(ch === "s" ? stemC : colour); g.fillRect(x + xx, y + yy, 1, 1); }));
  const ringed = st.adult || (st.fuse || 0) > .66;
  if (ringed) { const o = 1; const ad = document.createElement("canvas"); ad.width = ad.height = hpx + 4; const a = ad.getContext("2d"); a.imageSmoothingEnabled = false;
    // the ring: a 1-px circle round the glyph
    const ringC = st.adult ? mix(col, WHITE, .2) : mix(col, WHITE, .7); const R = (hpx + 3) / 2, cx0 = R + .5; a.fillStyle = css(ringC);
    for (let y = 0; y < ad.height; y++) for (let x = 0; x < ad.width; x++) { const d = Math.hypot(x + .5 - cx0, y + .5 - cx0); if (d <= R + .5 && d > R - .6) a.fillRect(x, y, 1, 1); }
    a.drawImage(bare(id, hpx - 4, st.adult ? mix(col, WHITE, .3) : col), 4, 4); g.drawImage(ad, 0, cy - Math.floor(ad.height / 2)); void o; }
  else g.drawImage(bare(id, hpx, col), 1, cy - Math.floor(hpx / 2));
  if (st.adult) return trim(c);
  const f = st.fuse || 0, x0 = hpx + 3, pts = B.layout(n), squeeze = f > .33 ? 1 - (f - .33) * 1.5 : 1; if (f > .66) return trim(c);
  const yTop = cy - Math.floor((bar === "vine" ? 10 : n > 8 ? 13 : B.h) / 2);
  if (B.vine) { const last = pts[Math.max(0, st.filled - 1)]; for (let x = 0; x < (pts.at(-1).x + 3) * squeeze; x++) { g.fillStyle = css(f ? mix(col, WHITE, .5 + f * .4) : st.filled && x <= last.x + 2 ? mix(lit, PLATE, .25) : mix(dim, PLATE, .2)); g.fillRect(x0 + x, yTop + 4 + 1, 1, 1); } }
  pts.forEach((p, i) => { const on = i < st.filled, colour = f ? mix(col, WHITE, .5 + f * .4) : on ? lit : dim, stemC = on ? mix(lit, [110, 190, 80], .5) : mix(dim, PLATE, .2);
    put(B.spr(on || f > 0, p), x0 + Math.round(p.x * squeeze), yTop + (B.vine ? (p.up ? 2 : 6) : n > 8 ? p.y : 0), colour, B.vine ? colour : stemC); });
  return trim(c);
}
function trim(c) { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; let mx = 0; for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3]) mx = Math.max(mx, x); const o = document.createElement("canvas"); o.width = mx + 1; o.height = c.height; o.getContext("2d").drawImage(c, 0, 0); return o; }
window.M4 = { S, mix, css, drawFloor, crispFloor, stackSprite, FLOORS, BARS };
// Both sides (Ed: "horizontal things by the side of the sigil stack can go both directions perhaps"): the berries alternate right,
// left, right ... outward from the glyph, so the glyph stays centred over her head and the bar fills symmetrically. rows 2: each
// side in two staggered rows (shorter). Returns { c, cx } (the glyph's centre column).
function stackBoth(id, n, st, { rows = 1, hpx = 11 } = {}) {
  const col = S.sigilColour(id), lit = st.ready ? mix(col, WHITE, .45) : col, dim = mix(PLATE, col, .42), f = st.fuse || 0;
  const per = Math.ceil(n / 2), cols = rows === 2 ? Math.ceil(per / 2) : per, sideW = cols * 6 + (rows === 2 ? 3 : 0), W = 2 * (sideW + 2) + hpx + 4;
  const c = document.createElement("canvas"); c.width = W; c.height = 15; const g = c.getContext("2d"), cy = 7, gx = sideW + 2;
  const one = stackSprite("berry", id, n, { ...st, filled: 0 }, hpx); // the glyph (and the adult's ring) alone: drawn with no pieces
  if (st.adult || f > .66) { const s = stackSprite("berry", id, n, st, hpx); g.drawImage(s, gx, 0); return { c, cx: gx + Math.floor((hpx + 4) / 2) }; }
  g.drawImage(one, 0, 0, hpx + 2, 15, gx, 0, hpx + 2, 15);
  const squeeze = f > .33 ? 1 - (f - .33) * 1.5 : 1, yTop = cy - (rows === 2 ? 6 : 3);
  for (let i = 0; i < n; i++) { const right = i % 2 === 0, k = i >> 1, kc = rows === 2 ? k >> 1 : k, row = rows === 2 ? k & 1 : 0, off = Math.round((kc * 6 + row * 3) * squeeze);
    const x = right ? gx + hpx + 3 + off : gx - 2 - 5 - off, y = yTop + row * 7, on = i < st.filled, colour = f ? mix(col, WHITE, .5 + f * .4) : on ? lit : dim, stemC = on ? mix(lit, [110, 190, 80], .5) : mix(dim, PLATE, .2);
    BERRY.forEach((r, yy) => [...r].forEach((ch, xx) => { if (ch === ".") return; g.fillStyle = css(ch === "s" ? stemC : colour); g.fillRect(x + (right ? xx : 4 - xx), y + yy, 1, 1); })); }
  return { c, cx: gx + Math.floor(hpx / 2) + 1 };
}
window.M4.stackBoth = stackBoth;
