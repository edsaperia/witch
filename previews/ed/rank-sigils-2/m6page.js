// Mock 6 (Ed: "Moon phases in the stack with the full moon in the centre being the sigil"; species colour dropped, rank by colour).
const S = await import("/art/sigils.js");
const WHITE = [255, 255, 255], PLATE = [12, 9, 20], D2R = Math.PI / 180;
// rank colours (moonlight): baby dim silver-lilac, youth pale moon-blue, adult warm gold, legend white-hot (with a halo)
const RANK = [[150, 140, 190], [125, 205, 255], [255, 196, 80], [255, 252, 240]];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)), css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const glyphCache = new Map();
const glyph = (id, col) => { const k = id + col; if (!glyphCache.has(k)) { const c = document.createElement("canvas"); c.width = c.height = 256; S.drawSigil(c.getContext("2d"), id, { x: 0, y: 0, size: 256, level: null, colour: col, glow: false }); glyphCache.set(k, c); } return glyphCache.get(k); };
const circle = (g, r, x = 0, y = 0) => { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); };
const ring = (g, r, w) => { g.lineWidth = w; circle(g, r); g.stroke(); };
const rays = (g, col, r0 = 1.02, r1 = 1.22) => { g.strokeStyle = css(col); g.lineWidth = .08; for (let i = 0; i < 12; i++) { const a = i * 30 * D2R; g.beginPath(); g.moveTo(r0 * Math.cos(a), r0 * Math.sin(a)); g.lineTo(r1 * Math.cos(a), r1 * Math.sin(a)); g.stroke(); } };
// ---- floor styles, unit frame (plate radius 1)
const FLOOR = {
  moon: { label: "A · Moon disc", note: "the sigil is a moon: a disc in the rank's colour, the glyph cut dark into it",
    draw(g, id, r) { const c = RANK[r], sc = r === 0 ? .78 : 1; g.save(); g.scale(sc, sc); g.fillStyle = css(r === 0 ? mix(PLATE, c, .7) : c); circle(g, .92); g.fill(); if (r === 3) rays(g, c); const gs = .6; g.drawImage(glyph(id, PLATE), -gs, -gs, 2 * gs, 2 * gs); g.restore(); } },
  ring: { label: "B · Ring + glyph", note: "today's dark plate; glyph and ring in the rank's colour (baby smaller, legend rays)",
    draw(g, id, r) { const c = RANK[r], sc = r === 0 ? .78 : 1; g.save(); g.scale(sc, sc); g.strokeStyle = css(c); ring(g, .86, r >= 2 ? .13 : .09); if (r === 3) rays(g, c); const gs = .56; g.drawImage(glyph(id, c), -gs, -gs, 2 * gs, 2 * gs); g.restore(); } },
  hat: { label: "C · Hat + rank colour", note: "B plus the witch's hat on adults and legends (hat + metal, recoloured)",
    draw(g, id, r) { FLOOR.ring.draw(g, id, r); if (r < 2) return; const c = RANK[r]; g.fillStyle = css(c); g.beginPath(); g.moveTo(-.4, -.8); g.lineTo(.4, -.8); g.lineTo(.1, -1.32); g.lineTo(.24, -1.4); g.lineTo(-.02, -1.38); g.closePath(); g.fill(); g.fillRect(-.52, -.86, 1.04, .12); } },
};
function crispFloor(style, id, r, w, squash, plateA = .62) {
  const H = 8, R = w / 2, pad = Math.ceil(w * .3), W = w + 2 * pad, hh = Math.ceil(w * squash) + 2 * pad;
  const layer = plate => { const hc = document.createElement("canvas"); hc.width = W * H; hc.height = hh * H; const g = hc.getContext("2d"); g.setTransform(R * H, 0, 0, R * squash * H, W * H / 2, hh * H / 2);
    if (plate) { g.fillStyle = "#fff"; circle(g, r === 0 ? .82 : 1.02); g.fill(); } else FLOOR[style].draw(g, id, r);
    const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; const l = lo.getContext("2d"); l.imageSmoothingEnabled = true; l.imageSmoothingQuality = "high"; l.drawImage(hc, 0, 0, W, hh); return l.getImageData(0, 0, W, hh); };
  const P = layer(true), I = layer(false), out = new ImageData(W, hh);
  for (let i = 0; i < I.data.length; i += 4) { const a = I.data[i + 3];
    if (a >= 100) { for (let j = 0; j < 3; j++) out.data[i + j] = Math.min(255, I.data[i + j] * 255 / a); out.data[i + 3] = 255; }
    else if (P.data[i + 3] >= 128) { out.data.set(PLATE, i); out.data[i + 3] = Math.round(255 * plateA); } }
  const lo = document.createElement("canvas"); lo.width = W; lo.height = hh; lo.getContext("2d").putImageData(out, 0, 0); return lo;
}
// ---- the stack. Moon sprites, 5×5, lit side toward the centre (drawn for a moon right of the sigil: lit on its left; mirrored on the left)
const PH = { // phase 0 thin crescent .. 3 gibbous
  0: [".#...", "#....", "#....", "#....", ".#..."],
  1: [".##..", "##...", "#....", "##...", ".##.."],
  2: [".##..", "###..", "###..", "###..", ".##.."],
  3: [".###.", "####.", "####.", "####.", ".###."] };
const DISC = [".###.", "#####", "#####", "#####", ".###."];
// the head: the sigil as a full moon (disc in the rank's colour, the glyph dark on it), px across; flare: brighter and a halo
function moonHead(id, r, px, { flare = 0, ghost = false } = {}) {
  const pad = 3, W = px + 2 * pad, c = document.createElement("canvas"); c.width = c.height = W; const g = c.getContext("2d");
  const H = 8, hc = document.createElement("canvas"); hc.width = hc.height = W * H; const h = hc.getContext("2d"); h.setTransform(px / 2 * H, 0, 0, px / 2 * H, W * H / 2, W * H / 2);
  const col = flare ? mix(RANK[r], WHITE, flare) : RANK[r]; h.fillStyle = css(ghost ? mix(PLATE, col, .5) : col); circle(h, 1); h.fill();
  if (r === 3 || flare > .5) { h.strokeStyle = css(col); h.lineWidth = .14; for (let i = 0; i < 8; i++) { const a = i * 45 * D2R; h.beginPath(); h.moveTo(1.18 * Math.cos(a), 1.18 * Math.sin(a)); h.lineTo(1.45 * Math.cos(a), 1.45 * Math.sin(a)); h.stroke(); } }
  const gs = .66; h.drawImage(glyph(id, PLATE), -gs, -gs, 2 * gs, 2 * gs);
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high"; g.drawImage(hc, 0, 0, W, W); const d = g.getImageData(0, 0, W, W);
  for (let i = 0; i < d.data.length; i += 4) { const a = d.data[i + 3]; if (a < 110) { d.data[i + 3] = 0; continue; } for (let j = 0; j < 3; j++) d.data[i + j] = Math.min(255, d.data[i + j] * 255 / a); d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); return c;
}
// a stack row. n pieces (youth only), filled eaten; order "in" (outer crescents first, waxing toward the sigil) or "out"; fuse 0..1
function stackRow(id, r, { n = 0, filled = 0, ready = false, order = "in", fuse = 0, px = 13 } = {}) {
  const per = Math.ceil(n / 2), sideW = r === 1 && fuse < .7 ? per * 6 + 1 : 0, head = moonHead(id, fuse > .7 ? 2 : r, r === 0 ? px - 4 : px, { flare: fuse > .4 ? Math.min(1, (fuse - .4) * 2.5) : ready ? .25 : 0 }), W = head.width + 2 * sideW, Hh = head.height;
  const c = document.createElement("canvas"); c.width = W; c.height = Hh; const g = c.getContext("2d"); g.drawImage(head, sideW, 0);
  if (sideW) { const col = RANK[1], lit = ready ? mix(col, WHITE, .5) : col, dim = mix(PLATE, col, .3), cy = Math.floor(Hh / 2) - 2, squeeze = fuse > .2 ? 1 - (fuse - .2) * 1.6 : 1;
    // piece i: side (alternate R, L), k its slot outward from the sigil (0 next to it); phase by k: gibbous next to the sigil, thin at the end
    for (let i = 0; i < n; i++) { const right = i % 2 === 0, slot = i >> 1, k = slot, ph = Math.max(0, 3 - Math.floor(k * 4 / per)), on = order === "in" ? n - 1 - i < filled : i < filled;
      const colour = fuse ? mix(col, WHITE, .5 + fuse * .4) : on ? lit : dim, spr = PH[ph], off = Math.round((2 + k * 6) * squeeze), x = right ? sideW + head.width - 3 + off : sideW + 3 - off - 5;
      g.fillStyle = css(colour); spr.forEach((row, yy) => [...row].forEach((ch, xx) => { if (ch === "#") g.fillRect(x + (right ? xx : 4 - xx), cy + yy, 1, 1); })); } }
  return { c, cx: sideW + Math.floor(head.width / 2) };
}
window.M6 = { S, RANK, FLOOR, crispFloor, stackRow, moonHead, mix, css };
