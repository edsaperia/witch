// Creature sigils (Ed: "a magical symbol for each type of creature. They can be fairly abstract
// but evoke the animal"). Each is the creature's name written in the forest's magic: a stave
// sigil's structure (a central stave, written bottom to top, with marks stacked along it) plus one
// or two features that evoke the animal, drawn as monoline strokes. One family: the same stroke
// weight, the same terminals (end dots, crossbars, crescents) and, under every stave, the same
// crescent foot. Kin to the rune glyphs (core.js, runeGlyph): bold, angular-to-open, few marks.
//
// Main use (Ed): the leashing rune, written on the ground under a creature, seen from the game's
// camera 30-40° down, so squashed to about half its height. So: strong verticals, open curves,
// well-spaced marks, no fine horizontal hatching and no tiny closed loops.
//
// Data: strokes in a unit box (x right, y down, both 0..1), in writing order, each drawn from
// its first point to its last:
//   { l: [[x, y], ...] }             a polyline
//   { a: [cx, cy, r, from, to] }     an arc, angles in degrees (0 right, 90 down), from -> to
//   { d: [x, y] }                    an end dot (a filled disc)
// Renderers: SVG and canvas paths (crisp, any size, with a draw-on), a pixel glyph (12-24 px,
// for carving and the bestiary at small sizes), and the ground form (foreshortened by the
// camera's pitch, with a faint outer ring, a draw-on and a pulse).
import { hsv2rgb } from "./core.js";
import { SPECIES, SPECIES_BY_ID } from "./creatures.js";

export const SIGIL_STROKE = .07;  // stroke width, in the unit box
export const SIGIL_DOT = .048;    // end-dot radius
export const SIGIL_DRAW_TIME = .6; // seconds for the draw-on

// ---- building blocks ----
const L = (...pts) => ({ l: pts }), A = (cx, cy, r, from, to) => ({ a: [cx, cy, r, from, to] }), D = (x, y) => ({ d: [x, y] });
const stave = (top, bottom = .86) => L([.5, bottom], [.5, top]); // written upwards
const FOOT = A(.5, .76, .13, 25, 155);                            // the crescent under every stave
const mirror = s => s.l ? { l: s.l.map(([x, y]) => [1 - x, y]) } : s.a ? { a: [1 - s.a[0], s.a[1], s.a[2], 180 - s.a[3], 180 - s.a[4]] } : { d: [1 - s.d[0], s.d[1]] };
const pair = (...ss) => ss.flatMap(s => [s, mirror(s)]); // a left stroke and its mirror
// an arc through two points, bulging by k (sagitta / chord; positive bulges to the left of p0 -> p1)
function bow(p0, p1, k) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], c = Math.hypot(dx, dy), h = k * c, r = (c * c / 4 + h * h) / (2 * Math.abs(h));
  const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, nx = dy / c, ny = -dx / c, off = (r - Math.abs(h)) * Math.sign(h);
  const cx = mx - nx * off, cy = my - ny * off, a0 = Math.atan2(p0[1] - cy, p0[0] - cx) * 180 / Math.PI;
  let a1 = Math.atan2(p1[1] - cy, p1[0] - cx) * 180 / Math.PI;
  // go the short way round when the bulge is small, the long way when it is more than half a circle
  let sweep = a1 - a0; while (sweep > 180) sweep -= 360; while (sweep < -180) sweep += 360;
  return A(cx, cy, r, a0, a0 + sweep);
}
const wave = (x0, y0, y1, amp, turns, n = 24) => L(...Array.from({ length: n + 1 }, (_, i) => [x0 + amp * Math.sin(i / n * turns * 2 * Math.PI), y0 + (y1 - y0) * i / n]));
const spiral = (cx, cy, r0, r1, turns, start = 0, n = 40) => L(...Array.from({ length: n + 1 }, (_, i) => { const t = i / n, a = (start + t * turns * 360) * Math.PI / 180, r = r0 + (r1 - r0) * t; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }));
const rays = (cx, cy, r0, r1, angles) => angles.map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return L([cx + r0 * c, cy + r0 * s], [cx + r1 * c, cy + r1 * s]); });

// ---- the thirty sigils ----
// Each comment says what evokes the animal.
export const SIGILS = {
  // pointed ears as a V, and a crescent moon beside the stave (the howl)
  wolf: [stave(.3), L([.28, .08], [.5, .3], [.72, .08]), A(.5, .55, .2, -55, 55), FOOT, D(.5 + .2 * Math.cos(-55 * Math.PI / 180), .55 + .2 * Math.sin(-55 * Math.PI / 180))],
  // tall narrow ears, and a brush of a tail curling out to the right
  fox: [stave(.34), L([.36, .06], [.5, .34], [.64, .06]), A(.67, .66, .17, 180, -80), D(.67 + .17 * Math.cos(-80 * Math.PI / 180), .66 + .17 * Math.sin(-80 * Math.PI / 180)), FOOT],
  // the striped face: two strong stripes beside the stave under a brow bar
  badger: [stave(.1), L([.24, .3], [.76, .3]), ...pair(L([.33, .14], [.33, .56])), FOOT, ...pair(D(.24, .3))],
  // two tusk crescents curling up from the snout, and a bristled crown
  boar: [stave(.16), ...pair(A(.36, .24, .15, 45, 180)), ...rays(.5, .16, 0, .1, [-130, -90, -50]), FOOT],
  // antlers branching into tines
  stag: [stave(.42), ...pair(L([.5, .42], [.34, .26], [.3, .06]), L([.335, .25], [.16, .2]), L([.32, .15], [.18, .07])), FOOT],
  // two long ears as a fork with round tips, and a round tail
  hare: [stave(.44), ...pair(L([.5, .44], [.4, .34], [.38, .06])), A(.62, .66, .09, 180, 540), FOOT, ...pair(D(.38, .06))],
  // two ringed eyes on the stave, and ear tufts
  owl: [stave(.44), ...pair(A(.33, .3, .13, 0, 360), L([.24, .18], [.18, .05])), FOOT, ...pair(D(.33, .3))],
  // a broad brow with two round ears, and three claw marks
  bear: [stave(.24), L([.24, .3], [.76, .3]), ...pair(A(.3, .3, .09, 180, 360)), ...pair(L([.36, .5], [.32, .62])), FOOT],
  // a hump of spines: a half circle with rays
  hedgehog: [stave(.52), A(.5, .52, .2, 180, 360), ...rays(.5, .52, .22, .34, [-160, -125, -90, -55, -20]), FOOT],
  // a great tail curling round over the back, an ear tick
  squirrel: [stave(.2), L([.5, .2], [.4, .08]), A(.66, .4, .16, 100, -200), D(.66 + .16 * Math.cos(-200 * Math.PI / 180), .4 + .16 * Math.sin(-200 * Math.PI / 180)), FOOT],
  // two bulging eyes on a wide mouth, legs splayed down
  toad: [stave(.42), L([.16, .54], [.24, .42], [.76, .42], [.84, .54]), ...pair(A(.34, .3, .1, 0, 360)), FOOT, ...pair(D(.16, .54))],
  // a sleek body curving through the water, head up, a ripple below
  otter: [stave(.24), A(.5, .5, .28, -100, 100), D(.5 + .28 * Math.cos(-100 * Math.PI / 180), .5 + .28 * Math.sin(-100 * Math.PI / 180)), bow([.18, .64], [.36, .64], .3), FOOT],
  // pointed ears with long tufts, a short tail tick
  lynx: [stave(.32), L([.26, .2], [.5, .32], [.74, .2]), ...pair(L([.26, .2], [.26, .06])), L([.5, .68], [.66, .62]), FOOT, ...pair(D(.26, .06))],
  // broad palmate antlers as two cups, and the bell under the chin
  elk: [stave(.3), ...pair(L([.5, .3], [.42, .2]), A(.3, .16, .12, 0, 180), L([.18, .16], [.14, .06])), L([.5, .44], [.6, .52]), FOOT],
  // a beak to the left with an eye, wings as a chevron
  raven: [stave(.14), L([.5, .14], [.3, .22]), L([.18, .56], [.5, .38], [.82, .56]), FOOT, D(.58, .17), ...pair(D(.18, .56))],
  // a crescent head and scalloped wings
  bat: [stave(.3), A(.5, .16, .14, 20, 160), ...pair(L([.5, .38], [.12, .26]), bow([.12, .26], [.24, .46], -.25), bow([.24, .46], [.38, .5], -.3), bow([.38, .5], [.5, .52], -.3)), FOOT],
  // a digging hand: a cup with spread claws, and a snout tick
  mole: [stave(.44), A(.5, .3, .16, 0, 180), ...rays(.5, .3, .19, .3, [-160, -125, -55, -20]), L([.5, .14], [.5, .04]), FOOT],
  // two front teeth under a bar, and the flat paddle tail as a diamond
  beaver: [stave(.36), L([.32, .2], [.68, .2]), ...pair(L([.44, .2], [.44, .34])), L([.5, .56], [.68, .66], [.5, .76], [.32, .66], [.5, .56]), FOOT],
  // a slender bounding arch, its tail tip dark (a big dot)
  stoat: [stave(.18), A(.5, .44, .24, 180, 360), L([.5, .18], [.6, .08]), FOOT, ...pair(D(.26, .44))],
  // a spiral shell on a stem, eye stalks
  snail: [stave(.52), spiral(.5, .33, .03, .2, 1.6, 90), L([.66, .2], [.76, .06]), FOOT, D(.76, .06)],
  // horns curling out and down
  ram: [stave(.24), ...pair(A(.36, .24, .14, 0, -250)), FOOT, ...pair(D(.36 + .14 * Math.cos(-250 * Math.PI / 180), .24 + .14 * Math.sin(-250 * Math.PI / 180)))],
  // stacked shell plates, feelers
  woodlouse: [stave(.24), A(.5, .52, .22, 205, 335), A(.5, .66, .24, 205, 335), A(.5, .38, .2, 205, 335), ...pair(L([.5, .24], [.32, .06])), FOOT],
  // a stave wound by an S, a forked tongue
  snake: [stave(.16), wave(.5, .82, .2, .2, 1.25), L([.5, .2], [.5, .11]), ...pair(L([.5, .11], [.42, .045])), FOOT],
  // paired wing triangles, curling feelers
  moth: [stave(.2), ...pair(L([.5, .3], [.16, .18], [.24, .5], [.5, .4]), L([.5, .5], [.3, .64], [.5, .66]), A(.38, .16, .12, 0, -110)), FOOT],
  // round ears on a pointed face, and a long tail sweeping left
  marten: [stave(.32), L([.3, .2], [.5, .32], [.7, .2]), ...pair(A(.3, .14, .07, 90, -180)), A(.28, .56, .22, 0, 150), D(.28 + .22 * Math.cos(150 * Math.PI / 180), .56 + .22 * Math.sin(150 * Math.PI / 180)), FOOT],
  // a flame at the head, legs as bent ticks along the spine, spots
  salamander: [stave(.3), bow([.5, .3], [.5, .06], .35), bow([.5, .3], [.5, .06], -.35), ...pair(L([.5, .42], [.32, .38], [.26, .48]), L([.5, .64], [.32, .6], [.26, .7])), FOOT, ...pair(D(.38, .52))],
  // a shining star at the tail end: a ring with rays
  glowworm: [stave(.4), A(.5, .27, .1, 90, 450), ...rays(.5, .27, .15, .25, [0, 60, 120, 180, 240, 300]), FOOT],
  // eight legs round a body, hanging from a thread
  spider: [L([.5, .05], [.5, .3]), stave(.5), A(.5, .4, .11, -90, 270), ...pair(...[-150, -170, 170, 150].map(a => L([.5 + .12 * Math.cos(a * Math.PI / 180), .4 + .12 * Math.sin(a * Math.PI / 180)], [.5 + .28 * Math.cos(a * Math.PI / 180), .4 + .28 * Math.sin(a * Math.PI / 180)], [.5 + .32 * Math.cos(a * Math.PI / 180), .4 + .28 * Math.sin(a * Math.PI / 180) + .1]))), FOOT, D(.5, .05)],
  // a curled sleeper: a big ring round the stave, a closed eye, round ears
  dormouse: [stave(.12), A(.5, .46, .24, -60, 250), ...pair(A(.34, .16, .08, 90, -180)), bow([.56, .38], [.7, .38], -.4), FOOT],
  // great curved mandibles, and the split wing cases
  beetle: [stave(.36), ...pair(A(.66, .26, .2, 160, 250)), bow([.5, .38], [.5, .82], .25), bow([.5, .38], [.5, .82], -.25), FOOT],
};

// The glow colour of a creature's sigil: its own hue, bright.
export function sigilColour(id) {
  const s = SPECIES_BY_ID[id]; return hsv2rgb(s?.hue ?? .1, Math.min(.75, Math.max(.4, (s?.sat ?? .4) * 1.4)), 1);
}

// ---- geometry: every stroke as a polyline with its length ----
const sigilCache = new Map();
export function sigilStrokes(id) {
  if (sigilCache.has(id)) return sigilCache.get(id);
  const out = (SIGILS[id] || []).map(s => {
    if (s.d) return { dot: true, pts: [s.d], len: SIGIL_DOT * 2 };
    let pts = s.l;
    if (s.a) {
      const [cx, cy, r, a0, a1] = s.a, n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 8));
      pts = Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    }
    let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return { dot: false, pts, len };
  });
  let at = 0; for (const s of out) { s.start = at; at += s.len; }
  for (const s of out) { s.start /= at; s.end = s.start + s.len / at; }
  sigilCache.set(id, out);
  return out;
}

// ---- vector: SVG and canvas ----
// progress 0..1 draws the strokes in order, each from its start, as if being written.
function partial(s, p) { // the part of a stroke drawn at overall progress p: its points, or null
  if (p >= s.end) return s.pts;
  if (p <= s.start) return null;
  if (s.dot) return s.pts;
  let want = (p - s.start) / (s.end - s.start) * s.len; const pts = [s.pts[0]];
  for (let i = 1; i < s.pts.length; i++) {
    const a = s.pts[i - 1], b = s.pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (want <= d) { pts.push([a[0] + (b[0] - a[0]) * want / d, a[1] + (b[1] - a[1]) * want / d]); break; }
    pts.push(b); want -= d;
  }
  return pts;
}
export function sigilSVG(id, { size = 64, colour = sigilColour(id), glow = true, progress = 1 } = {}) {
  const c = `rgb(${colour.join(",")})`, w = +(SIGIL_STROKE * 100).toFixed(2), fid = `sigil-glow-${id}`, parts = [];
  for (const s of sigilStrokes(id)) {
    const pts = partial(s, progress); if (!pts) continue;
    parts.push(s.dot ? `<circle cx="${(pts[0][0] * 100).toFixed(2)}" cy="${(pts[0][1] * 100).toFixed(2)}" r="${(SIGIL_DOT * 100).toFixed(2)}" fill="${c}"/>` : `<polyline points="${pts.map(p => (p[0] * 100).toFixed(2) + "," + (p[1] * 100).toFixed(2)).join(" ")}"/>`);
  }
  const filter = glow ? `<defs><filter id="${fid}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">${filter}<g fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${glow ? ` filter="url(#${fid})"` : ""}>${parts.join("")}</g></svg>`;
}
// Draws a sigil on a canvas: the unit box maps to (x, y, size, size). Transform the context first
// to lay it on the ground (e.g. ctx.scale(1, sin(pitch)) about its centre).
export function drawSigil(ctx, id, { x = 0, y = 0, size = 64, colour = sigilColour(id), progress = 1, glow = size / 10 } = {}) {
  ctx.save();
  ctx.translate(x, y); ctx.scale(size, size);
  ctx.strokeStyle = ctx.fillStyle = `rgb(${colour.join(",")})`; ctx.lineWidth = SIGIL_STROKE; ctx.lineCap = "round"; ctx.lineJoin = "round";
  if (glow) { ctx.shadowColor = `rgb(${colour.join(",")})`; ctx.shadowBlur = glow; }
  for (const s of sigilStrokes(id)) {
    const pts = partial(s, progress); if (!pts) continue;
    ctx.beginPath();
    if (s.dot) { ctx.arc(pts[0][0], pts[0][1], SIGIL_DOT, 0, Math.PI * 2); ctx.fill(); continue; }
    pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  }
  ctx.restore();
}

// ---- pixels ----
// For a point (u, v) of the unit box: the overall progress at which ink first reaches it (when
// it is within half a stroke, plus `fat`, of a stroke), or Infinity. Also how near the stroke's
// middle it is (1 at the centre line, 0 at the edge), for a bright core.
function inkAt(strokes, u, v, half) {
  let best = Infinity, core = 0;
  for (const s of strokes) {
    if (s.start >= best) break; // strokes are in order: later ones arrive later
    if (s.dot) { const d = Math.hypot(u - s.pts[0][0], v - s.pts[0][1]); if (d < SIGIL_DOT + half - SIGIL_STROKE / 2) { best = s.start; core = 1 - d / (SIGIL_DOT + half - SIGIL_STROKE / 2); } continue; }
    let run = 0;
    for (let i = 1; i < s.pts.length; i++) {
      const a = s.pts[i - 1], b = s.pts[i], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, l = Math.sqrt(l2);
      const t = l2 ? Math.max(0, Math.min(1, ((u - a[0]) * dx + (v - a[1]) * dy) / l2)) : 0, d = Math.hypot(u - a[0] - dx * t, v - a[1] - dy * t);
      if (d < half) { const at = s.start + (run + t * l) / s.len * (s.end - s.start); if (at < best) { best = at; core = 1 - d / half; } }
      run += l;
    }
  }
  return [best, core];
}
// True where the sigil has ink: for carving it into stone like runeGlyph(u, v, k, w); w is the
// stroke's half-width (default: the sigil's own).
export function sigilHit(id, u, v, w = SIGIL_STROKE / 2) { return inkAt(sigilStrokes(id), u, v, w)[0] < Infinity; }

// A pixel glyph `size` px tall: { w, h, m } with m 2 for a stroke's bright core, 1 for its edge,
// 0 for none. Strokes are at least one pixel thick at any size.
export function sigilGlyph(id, size = 16, { progress = 1 } = {}) {
  const strokes = sigilStrokes(id), w = size, h = size, m = new Uint8Array(w * h), half = Math.max(SIGIL_STROKE / 2, .62 / size);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const [at, core] = inkAt(strokes, (x + .5) / size, (y + .5) / size, half);
    if (at <= progress) m[y * w + x] = core > .45 || size < 16 ? 2 : 1;
  }
  return { w, h, m };
}

// ---- on the ground ----
// The leashing rune, written on the ground under a creature and seen from the game's camera
// `pitch` radians down (default 35°), so squashed to sin(pitch) of its height. diameter: across,
// in pixels (the faint ring's size; the sigil fills most of it). Precomputed once per size: each
// pixel's arrival time, so a frame is only a comparison. ring: a faint magic circle round it.
export const GROUND_PITCH = 35 * Math.PI / 180;
export function groundSigil(id, { diameter = 64, pitch = GROUND_PITCH, ring = true } = {}) {
  const f = Math.sin(pitch), w = Math.ceil(diameter) + 2, h = Math.ceil(diameter * f) + 2, cx = w / 2, cy = h / 2;
  const strokes = sigilStrokes(id), S = diameter * .74; // the sigil's box inside the ring
  const at = new Float32Array(w * h).fill(Infinity), core = new Uint8Array(w * h);
  // in the unit box, one pixel is 1/S across and 1/(S f) down: strokes at least a pixel thick both ways
  const half = Math.max(SIGIL_STROKE / 2, .6 / (S * f));
  const ringR = diameter / 2 - 1, ringW = Math.max(1, diameter * .012);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const gx = x + .5 - cx, gy = (y + .5 - cy) / f, i = y * w + x; // back onto the ground plane
    const u = gx / S + .5, v = gy / S + .5;
    if (u > -.1 && u < 1.1 && v > -.1 && v < 1.1) { const [a, c] = inkAt(strokes, u, v, half); if (a < Infinity) { at[i] = a * .85 + .15; core[i] = c > .45 ? 2 : 1; continue; } }
    if (ring) { // the ring draws first (in the first 15%), round from the front; ticks every 45°
      const sx = x + .5 - cx, sy = y + .5 - cy, e = Math.hypot(sx / ringR, sy / (ringR * f)) || 1e-6;
      const grad = Math.hypot(sx / (ringR * ringR * e), sy / (ringR * ringR * f * f * e)) || 1, dist = Math.abs(e - 1) / grad; // pixels from the ellipse
      const ang = (Math.atan2(gy, gx) * 180 / Math.PI + 270) % 360, r = Math.hypot(gx, gy);
      const tick = r > ringR * .86 && r < ringR - ringW && Math.abs(((ang + 22.5) % 45) - 22.5) * Math.PI / 180 * r < .6 / f;
      if (dist < ringW / 2 + .15 || tick) { at[i] = ang / 360 * .15; core[i] = 0; }
    }
  }
  return { id, w, h, at, core, diameter, pitch };
}
// Paints a ground sigil at time t seconds since it began: the draw-on over SIGIL_DRAW_TIME,
// then a glow that pulses. Writes RGBA into a canvas (alpha 254: it glows, draw it unlit) and
// returns it; the ring is faint, the stroke cores bright.
export function paintGroundSigil(g, t, { colour = sigilColour(g.id), canvas, makeCanvas = (w, h) => Object.assign(document.createElement("canvas"), { width: w, height: h }) } = {}) {
  const c = canvas || makeCanvas(g.w, g.h), ctx = c.getContext("2d"), img = ctx.createImageData(g.w, g.h), d = img.data;
  // pulse: 0..1, rising and falling every 1.6 s once it is written; it brightens the strokes
  const p = Math.min(1, t / SIGIL_DRAW_TIME), pulse = t < SIGIL_DRAW_TIME ? 0 : .5 - .5 * Math.cos((t - SIGIL_DRAW_TIME) * Math.PI * 2 / 1.6);
  const white = [255, 255, 245];
  for (let i = 0; i < g.at.length; i++) {
    const a = g.at[i]; if (!(a <= p)) continue;
    const fresh = p < 1 ? Math.max(0, 1 - (p - a) * 8) : 0; // the pen's tip is brightest
    let col, alpha;
    if (g.core[i] === 0) { col = colour; alpha = 90 + 50 * pulse; }
    else { const k = (g.core[i] === 2 ? .5 : .1) + .3 * pulse; col = colour.map((v, j) => v + (white[j] - v) * Math.min(1, k + fresh)); alpha = 254; }
    d.set([col[0], col[1], col[2], alpha | 0], i * 4);
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export const SIGIL_IDS = SPECIES.map(s => s.id);
