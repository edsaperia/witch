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
// They glow neon (Ed): a near-white core line in a coloured halo, each species in its own neon.
// Each creature level has a frame that grows (Ed: "for each level of creature, the sigil is more
// impressive"): bigger, thicker, brighter, then rings, then ornament, as a function of level.
// Renderers: SVG and canvas (crisp, any size, neon, with a draw-on), a pixel glyph (12-24 px, for
// carving), and a neon pixel field: on the ground (foreshortened by the camera's pitch) as the
// leashing rune, or upright as the floating form in the leash stack over the witch's head.
// The leash stack: a chain of springs that sways and trails behind her as she flies.
import { hash2 } from "./core.js";
import { SPECIES } from "./creatures.js";

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
  // the fen's newt: a crest waving along the spine, legs as bent ticks, spots on the belly
  newt: [stave(.24), wave(.5, .3, .06, .07, 1.5), ...pair(L([.5, .42], [.32, .38], [.26, .48]), L([.5, .64], [.32, .6], [.26, .7])), FOOT, ...pair(D(.4, .56))],
  // the heronry's heron: the stave its long legs, a kinked S-neck, a dagger bill with an end dot, a plume, folded wings
  heron: [stave(.34), L([.5, .34], [.64, .24], [.5, .12]), L([.5, .12], [.18, .17]), D(.18, .17), L([.52, .1], [.78, .05]), ...pair(L([.5, .46], [.3, .56], [.36, .66])), FOOT],
  // a shining star at the tail end: a ring with rays
  glowworm: [stave(.4), A(.5, .27, .1, 90, 450), ...rays(.5, .27, .15, .25, [0, 60, 120, 180, 240, 300]), FOOT],
  // eight legs round a body, hanging from a thread
  spider: [L([.5, .05], [.5, .3]), stave(.5), A(.5, .4, .11, -90, 270), ...pair(...[-150, -170, 170, 150].map(a => L([.5 + .12 * Math.cos(a * Math.PI / 180), .4 + .12 * Math.sin(a * Math.PI / 180)], [.5 + .28 * Math.cos(a * Math.PI / 180), .4 + .28 * Math.sin(a * Math.PI / 180)], [.5 + .32 * Math.cos(a * Math.PI / 180), .4 + .28 * Math.sin(a * Math.PI / 180) + .1]))), FOOT, D(.5, .05)],
  // a curled sleeper: a big ring round the stave, a closed eye, round ears
  dormouse: [stave(.12), A(.5, .46, .24, -60, 250), ...pair(A(.34, .16, .08, 90, -180)), bow([.56, .38], [.7, .38], -.4), FOOT],
  // great curved mandibles, and the split wing cases
  beetle: [stave(.36), ...pair(A(.66, .26, .2, 160, 250)), bow([.5, .38], [.5, .82], .25), bow([.5, .38], [.5, .82], -.25), FOOT],
};

// ---- neon: a colour per species, kept as a palette slot ----
// The palette; recolour by changing an entry (or passing `colour` to any renderer).
export const NEON = { pink: [255, 64, 200], cyan: [50, 235, 255], acid: [175, 255, 45], violet: [165, 95, 255], orange: [255, 135, 35], lemon: [255, 238, 70], red: [255, 55, 95], mint: [70, 255, 175], blue: [70, 145, 255], magenta: [235, 70, 255] };
// Each species' slot, given in the order of the area types they live in (areas.js), ten apart,
// so area types near each other in the list never share a colour.
export const SIGIL_NEON = { heron: "blue", badger: "pink", boar: "cyan", snail: "acid", fox: "violet", ram: "orange", woodlouse: "lemon", hedgehog: "red", squirrel: "mint", wolf: "blue", stag: "magenta", stoat: "pink", snake: "cyan", hare: "acid", owl: "violet", bear: "orange", toad: "lemon", otter: "red", lynx: "mint", elk: "blue", raven: "magenta", bat: "pink", mole: "cyan", beaver: "acid", beetle: "violet", moth: "orange", marten: "lemon", salamander: "red", glowworm: "mint", spider: "blue", dormouse: "magenta", newt: "acid" };
export const sigilColour = id => NEON[SIGIL_NEON[id]] || NEON.cyan;
const WHITE = [255, 255, 250], toward = (c, w, k) => c.map((v, j) => Math.round(v + (w[j] - v) * k));
const rgb = c => `rgb(${c.join(",")})`;

// ---- level frames ----
// A creature level's frame, for any level number (0 baby, 1 young, 2 adult, 3 legend, and
// beyond): size steps first, then rings, then ornament. Ed: the young's ring is dotted, the
// adult's a full circle; the legend's double ring is banded with ticks and rayed.
//   metres: across on the ground (about 2, 3, 4, 5.5); core: the core line's thickness (x a
//   baby's); halo: its brightness (0..1); rings: how many; band: rune ticks between the outer two
//   rings; rays: short points outside the outer ring; shimmer: a slow sparkle.
export const SIGIL_LEVELS = ["baby", "young", "adult", "legend"];
export function sigilFrame(level = 0) {
  const L = Math.max(0, level);
  return { level: L, metres: 2 + L + Math.max(0, L - 2) * .5, core: 1 + .2 * L, halo: Math.min(1, .45 + .19 * L), rings: L >= 4 ? 3 : L >= 3 ? 2 : L >= 2 ? 1 : 0, dots: L >= 1 && L < 2 ? 12 : 0, band: L >= 3, rays: L >= 4 ? 8 : L >= 3 ? 4 : 0, shimmer: L >= 3 };
}

// ---- geometry: strokes as polylines, with their lengths ----
function polyline(s) {
  if (s.d) return { dot: true, pts: [s.d], len: SIGIL_DOT * 2 };
  let pts = s.l;
  if (s.a) {
    const [cx, cy, r, a0, a1] = s.a, n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 8));
    pts = Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  }
  let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return { dot: false, pts, len };
}
const timeline = (list, from = 0, to = 1) => { const total = list.reduce((a, s) => a + s.len, 0) || 1; let at = 0; for (const s of list) { s.start = from + (to - from) * at / total; at += s.len; s.end = from + (to - from) * at / total; } return list; };
// The sigil's own strokes in its unit box, each with its share of the draw-on (start, end in 0..1).
const sigilCache = new Map();
export function sigilStrokes(id) {
  if (!sigilCache.has(id)) sigilCache.set(id, timeline((SIGILS[id] || []).map(s => ({ ...polyline(s), w: SIGIL_STROKE, part: "sigil" }))));
  return sigilCache.get(id);
}
// Everything drawn for a creature of a level, in a "mark" box (unit square, the frame's full
// size): the frame (rings, band, rays: drawn first, in the first 15% of the draw-on), then the
// sigil, scaled into the middle. w: each stroke's width in mark units. level null: the bare sigil.
const markCache = new Map();
export function sigilMark(id, level = 0) {
  const key = id + ":" + level; if (markCache.has(key)) return markCache.get(key);
  const F = level === null ? null : sigilFrame(level), k = !F ? 1 : F.rings >= 2 ? .6 : F.rings || F.dots ? .66 : .8, o = (1 - k) / 2;
  const thick = F ? F.core : 1, ring = SIGIL_STROKE * .55 * ((F?.level ?? 0) < 3 ? 1 : Math.min(1.6, .8 + .25 * F.level)), frame = []; // an adult's ring at the normal line weight; the legend's heavier
  if (F) {
    const R = .44, circle = r => polyline({ a: [.5, .5, r, 90, 450] }); // from the front, round
    for (let i = 0; i < F.rings; i++) frame.push({ ...circle(R - i * .06), w: ring, part: "ring" });
    // a young creature's dotted circle: round dots spaced well apart, so they stay distinct on the ground and small in the stack
    for (let i = 0; i < F.dots; i++) { const a = (90 + i * 360 / F.dots) * Math.PI / 180; frame.push({ dot: true, pts: [[.5 + R * Math.cos(a), .5 + R * Math.sin(a)]], len: .05, r: .042, w: ring, part: "ring" }); }
    if (F.band && F.rings >= 2) for (let i = 0; i < 16; i++) { const a = (90 + i * 22.5) * Math.PI / 180, r0 = R - .06 + .014, r1 = R - .014; frame.push({ ...polyline({ l: [[.5 + r0 * Math.cos(a), .5 + r0 * Math.sin(a)], [.5 + r1 * Math.cos(a), .5 + r1 * Math.sin(a)]] }), w: ring * .8, part: "band" }); }
    for (let i = 0; i < F.rays; i++) { const a = (90 + i * 360 / F.rays) * Math.PI / 180, r0 = R + .02, r1 = .5 - ring / 2; frame.push({ ...polyline({ l: [[.5 + r0 * Math.cos(a), .5 + r0 * Math.sin(a)], [.5 + r1 * Math.cos(a), .5 + r1 * Math.sin(a)]] }), w: ring * 1.3, part: "ray" }); }
  }
  const gk = Math.min(1.25, thick); // the glyph thickens a little with level, never enough to clog (the rings carry the rest)
  const sig = sigilStrokes(id).map(s => ({ dot: s.dot, len: s.len * k, pts: s.pts.map(([x, y]) => [o + x * k, o + y * k]), w: s.w * k * gk, r: SIGIL_DOT * k * gk, part: "sigil" }));
  const out = { level, frame: F, k, strokes: [...timeline(frame, 0, frame.length ? .15 : 0), ...timeline(sig, frame.length ? .15 : 0, 1)] };
  markCache.set(key, out);
  return out;
}

// ---- vector: SVG and canvas, neon ----
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
// An SVG string: the neon halo under a near-white core. level: null (default) the bare sigil,
// or a creature level for its frame. progress below 1 draws it partly written.
export function sigilSVG(id, { size = 64, level = null, colour = sigilColour(id), glow = true, progress = 1 } = {}) {
  const M = sigilMark(id, level), fid = `sigil-glow-${id}-${level}`, halo = M.frame ? M.frame.halo : .7, core = toward(colour, WHITE, .72), lines = [];
  for (const s of M.strokes) {
    const pts = partial(s, progress); if (!pts) continue;
    lines.push(s.dot ? `<circle cx="${(pts[0][0] * 100).toFixed(2)}" cy="${(pts[0][1] * 100).toFixed(2)}" r="${(s.r * 100).toFixed(2)}" fill="CURRENT" stroke="none"/>` : `<polyline points="${pts.map(p => (p[0] * 100).toFixed(2) + "," + (p[1] * 100).toFixed(2)).join(" ")}" stroke-width="${(s.w * 100).toFixed(2)}"/>`);
  }
  const g = (col, scale, extra) => `<g fill="none" stroke="${rgb(col)}" stroke-linecap="round" stroke-linejoin="round"${extra}>${lines.join("").replaceAll("CURRENT", rgb(col)).replace(/stroke-width="([\d.]+)"/g, (_, w) => `stroke-width="${(+w * scale).toFixed(2)}"`)}</g>`;
  const filter = glow ? `<defs><filter id="${fid}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">${filter}${glow ? g(colour, 2.2, ` opacity="${halo.toFixed(2)}" filter="url(#${fid})"`) : ""}${g(glow ? core : colour, glow ? .62 : 1, "")}</svg>`;
}
// Draws a sigil on a canvas, neon: the mark box maps to (x, y, size, size). Transform the
// context first to lay it on a plane. level: null (default) the bare sigil, or a creature level.
export function drawSigil(ctx, id, { x = 0, y = 0, size = 64, level = null, colour = sigilColour(id), progress = 1, glow = true } = {}) {
  const M = sigilMark(id, level), halo = M.frame ? M.frame.halo : .7;
  ctx.save(); ctx.translate(x, y); ctx.scale(size, size); ctx.lineCap = "round"; ctx.lineJoin = "round";
  const pass = (col, wk, alpha, blur) => {
    ctx.globalAlpha = alpha; ctx.strokeStyle = ctx.fillStyle = rgb(col); ctx.shadowColor = rgb(colour); ctx.shadowBlur = blur;
    for (const s of M.strokes) {
      const pts = partial(s, progress); if (!pts) continue;
      ctx.beginPath();
      if (s.dot) { ctx.arc(pts[0][0], pts[0][1], s.r * (wk > 1 ? 1.5 : 1), 0, Math.PI * 2); ctx.fill(); continue; }
      ctx.lineWidth = s.w * wk; pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    }
  };
  if (glow) { pass(colour, 2.4, Math.min(halo, .7) * .55, size / 12); pass(toward(colour, WHITE, .72), .62, 1, size / 30); }
  else pass(colour, 1, 1, 0);
  ctx.restore();
}

// ---- pixels ----
// For a point (u, v) of a box: the progress at which ink first reaches it, or Infinity.
function inkAt(strokes, u, v, half) {
  let best = Infinity;
  for (const s of strokes) {
    if (s.start >= best) break;
    if (s.dot) { if (Math.hypot(u - s.pts[0][0], v - s.pts[0][1]) < SIGIL_DOT + half - SIGIL_STROKE / 2) best = s.start; continue; }
    let run = 0;
    for (let i = 1; i < s.pts.length; i++) {
      const a = s.pts[i - 1], b = s.pts[i], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, l = Math.sqrt(l2);
      const t = l2 ? Math.max(0, Math.min(1, ((u - a[0]) * dx + (v - a[1]) * dy) / l2)) : 0;
      if (Math.hypot(u - a[0] - dx * t, v - a[1] - dy * t) < half) { const at = s.start + (run + t * l) / s.len * (s.end - s.start); if (at < best) best = at; }
      run += l;
    }
  }
  return best;
}
// True where the bare sigil has ink: for carving it into stone like runeGlyph(u, v, k, w); w
// is the stroke's half-width (default: the sigil's own).
export function sigilHit(id, u, v, w = SIGIL_STROKE / 2) { return inkAt(sigilStrokes(id), u, v, w) < Infinity; }
// A pixel glyph of the bare sigil, `size` px tall: { w, h, m }, m 1 where there is ink. Strokes
// are at least one pixel thick at any size. For carving and small icons.
export function sigilGlyph(id, size = 16, { progress = 1 } = {}) {
  const strokes = sigilStrokes(id), m = new Uint8Array(size * size), half = Math.max(SIGIL_STROKE / 2, .62 / size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (inkAt(strokes, (x + .5) / size, (y + .5) / size, half) <= progress) m[y * size + x] = 1;
  return { w: size, h: size, m };
}

// ---- the neon pixel field: on the ground, or floating upright ----
// A creature's sigil with its level's frame as neon pixels, `size` px across, squashed to
// `squash` of its height (sin of the camera's pitch on the ground; 1 upright). Precomputed once:
// each pixel's arrival in the draw-on and its distance from the nearest core line, so painting a
// frame is cheap. The core is at least 1 px thick both ways; the halo reaches 2-4 px past it.
export const GROUND_PITCH = 35 * Math.PI / 180;
export function sigilField(id, { level = 0, size = 64, squash = 1 } = {}) {
  const M = sigilMark(id, level), F = M.frame || sigilFrame(0), w = Math.ceil(size) + 4, h = Math.ceil(size * squash) + 4;
  // halo, in pixels past the core: the glyph's stays tight so its lines stay distinct at every level; the rings and ornament carry the extra glow
  const reach = 2 + 2 * F.halo, reachOf = kind => kind === 1 ? Math.min(2, reach) : reach + 1;
  const atCore = new Float32Array(w * h).fill(Infinity), atHalo = new Float32Array(w * h).fill(Infinity), fall = new Float32Array(w * h).fill(Infinity), part = new Uint8Array(w * h), haloPart = new Uint8Array(w * h);
  // segments in pixel space, each with its core radius and its place in the draw-on
  const segs = [];
  for (const s of M.strokes) {
    // the glyph's core lines stay thin in pixels, however big the mark, so its marks never run together
    const P = s.pts.map(([u, v]) => [2 + u * size, 2 + v * size * squash]), kind = s.part === "sigil" ? 1 : 2, core = Math.max(.6, Math.min((s.dot ? s.r : s.w / 2) * size, kind === 1 ? (s.dot ? 1.6 : 1) + .15 * F.level : Infinity));
    if (s.dot) { segs.push({ a: P[0], b: P[0], at0: s.start, at1: s.start, core, kind }); continue; }
    let run = 0;
    for (let i = 1; i < P.length; i++) { const l = Math.hypot(s.pts[i][0] - s.pts[i - 1][0], s.pts[i][1] - s.pts[i - 1][1]); segs.push({ a: P[i - 1], b: P[i], at0: s.start + run / s.len * (s.end - s.start), at1: s.start + (run + l) / s.len * (s.end - s.start), core, kind }); run += l; }
  }
  for (const g of segs) { // only the pixels near each segment
    const R = reachOf(g.kind), x0 = Math.max(0, Math.floor(Math.min(g.a[0], g.b[0]) - g.core - R)), x1 = Math.min(w - 1, Math.ceil(Math.max(g.a[0], g.b[0]) + g.core + R));
    const y0 = Math.max(0, Math.floor(Math.min(g.a[1], g.b[1]) - g.core - R)), y1 = Math.min(h - 1, Math.ceil(Math.max(g.a[1], g.b[1]) + g.core + R));
    const dx = g.b[0] - g.a[0], dy = g.b[1] - g.a[1], l2 = dx * dx + dy * dy;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const px = x + .5, py = y + .5, t = l2 ? Math.max(0, Math.min(1, ((px - g.a[0]) * dx + (py - g.a[1]) * dy) / l2)) : 0;
      // the core line is round in the plane it lies in: undo the squash to measure it
      const ex = px - g.a[0] - dx * t, ey = py - g.a[1] - dy * t, dPlane = Math.hypot(ex, ey / squash), dScreen = Math.hypot(ex, ey), at = g.at0 + (g.at1 - g.at0) * t, i = y * w + x;
      const inCore = dPlane <= g.core || dScreen <= .6, d = Math.max(0, Math.min(dScreen, dPlane) - g.core);
      if (inCore && at < atCore[i]) { atCore[i] = at; part[i] = g.kind; }
      if (d <= R && at < atHalo[i]) atHalo[i] = at;
      if (d / R < fall[i]) { fall[i] = d / R; haloPart[i] = g.kind; }
    }
  }
  return { id, level, frame: F, w, h, size, squash, reach, atCore, atHalo, fall, part, haloPart };
}
// The leashing rune on the ground: a sigilField foreshortened by the pitch, sized by its
// level's frame (metres) at pxPerMetre.
export function groundSigil(id, { level = 0, pxPerMetre = 16, pitch = GROUND_PITCH } = {}) { return sigilField(id, { level, size: sigilFrame(level).metres * pxPerMetre, squash: Math.sin(pitch) }); }
// The floating form, upright and facing the camera, for the leash stack over the witch's head:
// `px` across for a baby, larger for higher levels (the same frames, scaled down).
export function floatSigil(id, { level = 0, px = 16 } = {}) { return sigilField(id, { level, size: px * floatScale(level) }); }
const floatScale = level => Math.pow(sigilFrame(level).metres / 2, .6);
// A floating sigil's height in metres, for the leash stack (a baby's is tuning.size).
export const floatSize = (level, tuning = STACK_TUNING) => tuning.size * floatScale(level);

// Paints a field at t seconds after its draw-on began: the strokes trace in order over
// SIGIL_DRAW_TIME with a bright, flickering pen tip, then glow and pulse (legends shimmer).
// Writes into a canvas (made with makeCanvas, or the one given) and returns it. Every pixel glows:
// draw it unlit, additively ("lighter") for the bloom. progress overrides the draw-on.
export function paintSigilField(g, t, { colour = sigilColour(g.id), canvas, progress, makeCanvas = (w, h) => Object.assign(document.createElement("canvas"), { width: w, height: h }) } = {}) {
  const c = canvas || makeCanvas(g.w, g.h), ctx = c.getContext("2d"), img = ctx.createImageData(g.w, g.h), d = img.data;
  const p = progress ?? Math.min(1, t / SIGIL_DRAW_TIME), written = p >= 1, F = g.frame;
  const pulse = written ? .5 - .5 * Math.cos((t - SIGIL_DRAW_TIME) * Math.PI * 2 / 1.6) : 0;
  const flicker = written ? 1 : .82 + .18 * hash2(Math.floor(t * 30), 7, 3); // a faint flicker while it is written
  const core = toward(colour, WHITE, .62 + .2 * pulse), haloK = F.halo * (.75 + .25 * pulse) * flicker;
  for (let i = 0; i < g.atHalo.length; i++) {
    if (!(g.atHalo[i] <= p)) continue;
    const tip = written ? 0 : Math.max(0, 1 - (p - g.atCore[i]) * 10);
    const sh = F.shimmer && written ? .86 + .14 * Math.sin(t * 2.4 - ((i % g.w) + Math.floor(i / g.w) * 1.7) * .12) : 1; // a slow wave of light across it
    if (g.atCore[i] <= p) {
      const col = g.part[i] === 2 ? toward(colour, WHITE, .35 + .2 * pulse) : toward(core, WHITE, tip);
      d.set([col[0], col[1], col[2], Math.round(255 * Math.min(1, (g.part[i] === 2 ? .8 : 1) * flicker * sh))], i * 4);
    } else {
      const f = Math.max(0, 1 - g.fall[i]), k = g.haloPart[i] === 1 ? Math.min(haloK, .6) : haloK; // soft falloff; the glyph's own halo capped
      d.set([colour[0], colour[1], colour[2], Math.round(255 * f * f * k * sh)], i * 4);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// ---- the leash stack ----
// Leashed creatures' sigils float above the witch's head (Ed): newest at the bottom, just above
// her head, pushing the others up; placing takes the bottom one (last in, first out) and the rest
// settle down. The stack is a chain of springs: each sigil follows the one below with lag and
// damping, so it sways gently when she is still and teeters behind her when she flies fast,
// overshooting a little when she stops or turns; higher sigils lag and swing more; rising and
// descending tilt it too.
// World units are metres: x right, y up, z towards the camera. Positions given back are offsets
// from her head.
export const SIGIL_TRANSITION_TIME = .4;
export const STACK_TUNING = {
  size: .55,       // a baby's floating sigil, metres tall (higher levels larger: floatSize)
  gap: .1,         // metres between one sigil and the next
  stiffness: 70,   // how hard each sigil is pulled to its place above the one below (per second²)
  damping: 7,      // how fast a swing dies away (per second); below 2·√stiffness it overshoots
  trail: .09,      // how far behind it leans per metre per second of her speed (metres)
  growth: .45,     // how much more each sigil higher up lags, trails and sways
  idleSway: .05,   // the gentle sway when she is still (metres)
  idleRate: .35,   // its rate (cycles per second)
  maxLean: .5,     // the furthest a sigil leans from the one below, as a share of their spacing
};
export class SigilStack {
  constructor(tuning = {}) { this.tuning = { ...STACK_TUNING, ...tuning }; this.items = []; this.head = [0, 0, 0]; this.vel = [0, 0, 0]; this.time = 0; this.seed = 0; }
  // A new sigil joins at the bottom (newest), lifting off from `from` (a world point, e.g. the
  // ground rune it was picked up from) or appearing just above her head.
  push(id, level = 0, from) {
    const size = floatSize(level, this.tuning), start = from ? [...from] : [this.head[0], this.head[1] + size / 2, this.head[2]];
    this.items.unshift({ id, level, size, pos: start, vel: [0, 0, 0], phase: hash2(this.seed++, 3, 11) * Math.PI * 2, enter: from ? 0 : 1, from: from ? [...from] : null });
    return this.items[0];
  }
  // Takes the bottom sigil to place it: returns { id, level, pos } (where it was, in the world).
  place() { const it = this.items.shift(); return it ? { id: it.id, level: it.level, pos: [...it.pos] } : null; }
  get length() { return this.items.length; }
  // Advances by dt seconds. Give her head's world position (`head`), or her velocity (`velocity`,
  // metres per second, which moves the head).
  update(dt, { head, velocity } = {}) {
    const T = this.tuning;
    if (!(dt > 0)) { // no time passed: just move to the head (the first call places the stack)
      if (head) { const d = head.map((x, j) => x - this.head[j]); this.head = [...head]; for (const it of this.items) it.pos = it.pos.map((x, j) => x + d[j]); }
      return;
    }
    const steps = Math.ceil(dt / (1 / 120)), h = dt / steps;
    const newHead = head ? [...head] : this.head.map((v, j) => v + (velocity?.[j] ?? 0) * dt);
    let v = head ? newHead.map((x, j) => (x - this.head[j]) / dt) : [...(velocity || [0, 0, 0])];
    const sp = Math.hypot(...v); if (sp > 40) v = v.map(x => x * 40 / sp); // a jump (a teleport) is not a flight
    for (let s = 0; s < steps; s++) {
      this.time += h;
      const hp = this.head.map((x, j) => x + (newHead[j] - x) * (s + 1) / steps);
      this.items.forEach((it, i) => {
        const below = i === 0 ? hp : this.items[i - 1].pos, belowVel = i === 0 ? v : this.items[i - 1].vel, g = 1 + T.growth * i;
        const spacing = (i === 0 ? T.gap : this.items[i - 1].size / 2 + T.gap) + it.size / 2;
        const sway = Math.sin(this.time * Math.PI * 2 * T.idleRate + it.phase) * T.idleSway * g, sway2 = Math.cos(this.time * Math.PI * 2 * T.idleRate * .8 + it.phase) * T.idleSway * .5 * g;
        // its place: above the one below, leaning back against her motion (rising pulls it down too)
        let lean = [-v[0] * T.trail * g + sway, -v[1] * T.trail * g * .6, -v[2] * T.trail * g + sway2];
        const ll = Math.hypot(lean[0], lean[2]), cap = T.maxLean * spacing; if (ll > cap) lean = [lean[0] * cap / ll, lean[1], lean[2] * cap / ll];
        const target = [below[0] + lean[0], below[1] + Math.max(spacing * .5, spacing + lean[1]), below[2] + lean[2]];
        const k = T.stiffness / g;
        for (let j = 0; j < 3; j++) { const a = k * (target[j] - it.pos[j]) - T.damping * (it.vel[j] - belowVel[j]); it.vel[j] += a * h; it.pos[j] += it.vel[j] * h; }
        if (it.enter < 1) it.enter = Math.min(1, it.enter + h / SIGIL_TRANSITION_TIME);
      });
    }
    this.head = newHead; this.vel = v;
  }
  // Where each sigil is, bottom (newest) first: { id, level, size (metres tall), offset (from her head; its centre), tilt
  // (radians, leaning from the one below; positive to the right), enter (0..1 of its lift-off) }.
  layout() {
    return this.items.map((it, i) => {
      const below = i === 0 ? this.head : this.items[i - 1].pos, dx = it.pos[0] - below[0], dy = it.pos[1] - below[1];
      return { id: it.id, level: it.level, size: it.size, offset: it.pos.map((x, j) => x - this.head[j]), tilt: Math.atan2(dx, Math.max(.05, dy)), enter: it.enter };
    });
  }
}
// The lift-off and set-down transitions (each SIGIL_TRANSITION_TIME), for t from 0 to 1:
//   rise: 0 on the ground .. 1 in its place in the stack (ease it along a gentle arc);
//   upright: 0 lying flat (the ground rune) .. 1 standing, facing the camera (squash the
//   ground form's height from sin(pitch) to 1 as it peels up); scale: 0 the ground rune's size ..
//   1 the floating size; draw: how much of the ground rune is drawn (the set-down writes itself).
export function liftOff(t) { const e = Math.min(1, Math.max(0, t)), s = e * e * (3 - 2 * e); return { rise: s, upright: Math.min(1, e * 1.6), scale: s, draw: 1 }; }
export function setDown(t) { const e = Math.min(1, Math.max(0, t)), drop = Math.min(1, e / .55), s = drop * drop; return { rise: 1 - s, upright: 1 - Math.min(1, drop * 1.2), scale: 1 - s, draw: Math.max(0, (e - .45) / .55) }; }

export const SIGIL_IDS = SPECIES.map(s => s.id);
