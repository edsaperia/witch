// The hero dancefloor (Ed: "a magic disco floor with colour-changing squares that change to draw a
// variety of different magical shapes, changing to the music" ... "we should have a system to light
// squares rather than just an art asset"). A round floor of square glass tiles, 32 x 32 with a circle
// mask (30 tiles across), each about 0.9 m, inside a carved stone rim. This module is the data and the
// looks the prototype's tile-lighting engine uses; the engine does the animating and the layering.
//
// Data:
//   discoPatterns(): the pattern library. Each { id, name, kind, level, beats, fpb, palette, frames, key, area? }:
//     kind: "shape" (a figure that holds and pulses), "loop" (motion that repeats), "fill" (texture for
//       between shapes), "area" (an area's own shape, from its creature's sigil; area: the area's id),
//       "boot" (the switch-on sequence at game start).
//     level: 1 (simple, calm) to 4 (full rave), so the engine can suit patterns to the party's intensity.
//     beats: its length in beats (whole); fpb: frames per beat (1, 2 or 4); frames.length = beats * fpb.
//     palette: 2 to 4 names from the party's neon (NEON in sigils.js); frames: Uint8Array(32 * 32) each,
//       row by row, 0 = off and k = palette[k - 1]. Cells outside the circle are always 0. key: its fullest frame.
//   DISCO_TRANSITIONS: wipe, iris, dissolve and burst, each { id, beats, onBar, desc }; discoTransition(id, t)
//     gives the 32 x 32 mask at progress t (0 = all the old pattern, 1 = all the new; 2 = the bright edge).
//   discoCompose(...): a reference of how the layers combine (pattern, transition, the witch's glow, the
//     party's intensity), used by the Art Lab and the previews; the prototype's engine is the real one.
// Looks (sprites at 16 px per metre, ground space, seen from above): discoTileSprite("unlit" | "lit", { level })
//   (lit at intensities 1 to 3, white glass the engine tints with a cell's neon), discoGroutSprite, the stone rim
//   as a strip that repeats every DISCO_RIM.period px along the circumference (discoRimStrip), and the whole
//   unlit floor (discoFloorBase) with tiles, grout and rim, for the engine to draw under the lit tiles.
import { M, Sprite, hash2, runeGlyph } from "./core.js";
import { NEON, SIGIL_NEON, sigilGlyph } from "./sigils.js";
import { AREAS } from "./areas.js";

export const DISCO_GRID = 32;
export const DISCO_RADIUS = 15;         // tiles from the centre: 30 across
export const DISCO_TILE_METRES = .9;
const DC = DISCO_GRID / 2;
export const discoInside = (x, y) => (x + .5 - DC) ** 2 + (y + .5 - DC) ** 2 <= DISCO_RADIUS * DISCO_RADIUS;
export const DISCO_MASK = Uint8Array.from({ length: DISCO_GRID * DISCO_GRID }, (_, i) => discoInside(i % DISCO_GRID, (i / DISCO_GRID) | 0) ? 1 : 0);

// ---- drawing on the grid: f(x, y) in tile units from the floor's centre (y down), returning a palette index ----
function discoFrame(f) {
  const fr = new Uint8Array(DISCO_GRID * DISCO_GRID);
  for (let j = 0; j < DISCO_GRID; j++) for (let i = 0; i < DISCO_GRID; i++) if (DISCO_MASK[j * DISCO_GRID + i]) fr[j * DISCO_GRID + i] = f(i + .5 - DC, j + .5 - DC) || 0;
  return fr;
}
const discoSeg = (x, y, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(x - a[0] - dx * t, y - a[1] - dy * t); };
const discoPoly = (x, y, P) => { let inside = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i][1] > y) !== (P[j][1] > y) && x < (P[j][0] - P[i][0]) * (y - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0]) inside = !inside; return inside; };
const discoAng = (x, y) => Math.atan2(y, x);
const discoWrap = a => ((a % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
const discoRot = (x, y, a) => [x * Math.cos(a) + y * Math.sin(a), -x * Math.sin(a) + y * Math.cos(a)];
const discoStar = (n, ro, ri, a0 = -Math.PI / 2, cx = 0, cy = 0) => Array.from({ length: n * 2 }, (_, k) => { const r = k % 2 ? ri : ro, a = a0 + k * Math.PI / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; });

// A pattern: frames from frameAt(k, n) (k the frame, n how many), each a function of (x, y).
function discoPattern(id, name, kind, level, beats, fpb, palette, frameAt, extra = {}) {
  const n = beats * fpb, frames = Array.from({ length: n }, (_, k) => discoFrame(frameAt(k, n))), lit = frames.map(f => f.reduce((a, v) => a + (v ? 1 : 0), 0));
  return { id, name, kind, level, beats, fpb, palette, frames, key: lit.indexOf(Math.max(...lit)), ...extra }; // key: its fullest frame, for contact sheets
}

// ================= the shapes =================
function discoPentagram() {
  const P = Array.from({ length: 5 }, (_, k) => [Math.cos(-Math.PI / 2 + k * 4 * Math.PI / 5) * 12, Math.sin(-Math.PI / 2 + k * 4 * Math.PI / 5) * 12]);
  return discoPattern("pentagram", "Pentagram", "shape", 2, 4, 2, ["violet", "magenta"], k => (x, y) => {
    const drawn = Math.min(5, k + 1.5), r = Math.hypot(x, y); // drawn stroke by stroke, then the colours swap on the beat
    for (let s = 0; s < 5; s++) if (s < drawn && discoSeg(x, y, P[s], P[(s + 1) % 5]) < .75) return k >= 4 && k % 2 ? 2 : 1;
    if (k >= 3 && Math.abs(r - 13.4) < .7) return k >= 4 && k % 2 ? 1 : 2;
  });
}
function discoMoon() { // a crescent waxing to full, a halo blinking on the beat
  return discoPattern("moon", "Waxing moon", "shape", 1, 8, 1, ["lemon", "cyan"], k => (x, y) => {
    const p = k / 7, r = Math.hypot(x, y), d = 21 * (1 - p) + .01;
    if (r < 10 && (p >= 1 || Math.hypot(x + d, y) > 10)) return 1;
    if (k % 2 === 0 && Math.abs(r - 12.5) < .6) return 2;
  });
}
function discoEye() { // an eye opening, looking round, blinking
  const open = [0, .25, .6, 1, 1, 1, 1, 1, 1, 1, .4, 0, .4, 1, 1, 1];
  return discoPattern("eye", "Opening eye", "shape", 2, 4, 4, ["mint", "violet", "magenta"], k => (x, y) => {
    const o = open[k], h = 7.5 * (1 - (x / 13.5) ** 2), look = Math.sin(k * .8) * 3;
    if (Math.abs(x) > 13.5) return;
    const edge = Math.abs(Math.abs(y) - o * h);
    if (edge < .6 || (o < .05 && Math.abs(y) < .6)) return 1;
    if (Math.abs(y) < o * h) { const d = Math.hypot(x - look, y); if (d < 2) return 3; if (d < 5) return 2; }
  });
}
function discoSpiral() { // two arms turning
  return discoPattern("spiral", "Turning spiral", "loop", 3, 4, 4, ["cyan", "pink"], (k, n) => (x, y) => {
    const r = Math.hypot(x, y), s = ((discoAng(x, y) - r * .42 + k / n * Math.PI * 2) / Math.PI + 4) % 2;
    if (r < 1.2) return; if (s < .42) return 1; if (s >= 1 && s < 1.42) return 2;
  });
}
function discoRipples() { // rings rolling out from the centre on the beat
  return discoPattern("ripples", "Ripples", "loop", 1, 4, 2, ["blue", "cyan", "mint"], (k, n) => (x, y) => {
    const r = Math.hypot(x, y), ph = (k / 2) % 1 * 5, ring = Math.floor((r - ph) / 5 + 10);
    if (((r - ph) % 5 + 5) % 5 < 1.25) return 1 + ring % 3;
  });
}
function discoRuneBand() { // a band of runes turning round the edge, a small pulsing ring at the heart
  return discoPattern("rune-band", "Rune band", "loop", 2, 8, 2, ["orange", "lemon"], (k, n) => (x, y) => {
    const r = Math.hypot(x, y);
    if (r > 10 && r < 14.5) { const s = ((discoAng(x, y) / (Math.PI * 2) + .5) * 9 + k / n * 9) % 9, u = s % 1, v = (r - 10.2) / 4.1; if (runeGlyph(u, v, Math.floor(s) + 5, .16)) return 1; }
    if (Math.abs(r - 9.5) < .5 || Math.abs(r - 14.6) < .45) return 2;
    if (Math.abs(r - (k % 2 ? 3 : 2)) < .6) return 2;
  });
}
function discoSun() { // a sun with turning rays
  return discoPattern("sun", "Sunburst", "shape", 3, 4, 2, ["lemon", "orange", "red"], (k, n) => (x, y) => {
    const r = Math.hypot(x, y), a = discoAng(x, y) + k / n * Math.PI / 3, w = (a / (Math.PI * 2) * 12 % 1 + 1) % 1, ray = Math.floor((a / (Math.PI * 2) + 1) * 12) % 2;
    if (r < 4.6) return 1;
    if (r > 6 && r < 14.5 && Math.abs(w - .5) < .2 * (1 - (r - 6) / 12)) return ray ? 2 : 3;
  });
}
function discoTriquetra() { // three interlaced arcs and a ring, the colours passed round
  const C = [0, 1, 2].map(i => { const a = -Math.PI / 2 + i * Math.PI * 2 / 3; return [Math.cos(a) * 5.6, Math.sin(a) * 5.6]; });
  return discoPattern("triquetra", "Triquetra", "shape", 2, 3, 1, ["acid", "cyan", "violet"], k => (x, y) => {
    for (let i = 0; i < 3; i++) { const d = Math.hypot(x - C[i][0], y - C[i][1]); if (Math.abs(d - 9.4) < .75 && C.some((c, j) => j !== i && Math.hypot(x - c[0], y - c[1]) < 9.4)) return 1 + (i + k) % 3; }
    if (Math.abs(Math.hypot(x, y) - 14.2) < .6) return 1 + (k + 1) % 3;
  });
}
function discoMushrooms() { // a fairy ring of mushrooms, bobbing in turn
  return discoPattern("mushroom-ring", "Mushroom ring", "shape", 1, 4, 2, ["red", "lemon", "acid"], k => (x, y) => {
    for (let m = 0; m < 8; m++) {
      const a = m * Math.PI / 4, cx = Math.cos(a) * 10, cy = Math.sin(a) * 10 - ((m + k) % 2 ? .8 : 0), dx = x - cx, dy = y - cy;
      if (dy < 0 && dx * dx / 7 + dy * dy / 4 < 1) return (Math.abs(dx - .8) < .5 && Math.abs(dy + 1) < .5) ? 2 : 1; // the cap, spotted
      if (dy >= 0 && dy < 2.3 && Math.abs(dx) < .7) return 2; // the stem
    }
    if (Math.hypot(x, y) < 1.2 && k % 2) return 3;
  });
}
function discoPaws() { // paw prints walking across, the newest bright, the last few fading
  const steps = Array.from({ length: 8 }, (_, s) => { const t = s / 7, side = s % 2 ? 1 : -1; return [-10.5 + t * 21 + side * 2.6, 9 - t * 18 + side * 2.6]; });
  const paw = (x, y, c) => { const dx = (x - c[0]) / 1.5, dy = (y - c[1]) / 1.5; if ((dx * dx) / 2.6 + ((dy - .6) ** 2) / 2 < 1) return true; return [[-1.6, -1.3], [-.55, -2.2], [.55, -2.2], [1.6, -1.3]].some(([tx, ty]) => Math.hypot(dx - tx, dy - ty) < .62); };
  return discoPattern("paws", "Paw prints", "loop", 2, 8, 1, ["acid", "mint"], k => (x, y) => {
    for (let s = k; s >= Math.max(0, k - 1); s--) if (paw(x, y, steps[s])) return s === k ? 1 : 2;
  });
}
function discoLightning() { // a bolt, flashing
  const B = [[-3, -14], [2, -6], [-2, -4], [4, 5], [0, 6], [5, 14]], fork = [[2, -6], [8, -2], [10, 1]], flash = [1, 0, 1, 1, 0, 0, 1, 0];
  return discoPattern("lightning", "Lightning", "shape", 4, 2, 4, ["lemon", "cyan"], k => (x, y) => {
    if (!flash[k]) return 0;
    for (let s = 0; s + 1 < B.length; s++) if (discoSeg(x, y, B[s], B[s + 1]) < (k === 0 ? 1.2 : .8)) return 1;
    for (let s = 0; s + 1 < fork.length; s++) if (discoSeg(x, y, fork[s], fork[s + 1]) < .6) return 2;
  });
}
function discoHeart() { // a heart beating twice a beat
  return discoPattern("heart", "Heart", "shape", 1, 2, 2, ["red", "pink"], k => (x, y) => {
    const sc = k % 2 ? 9.5 : 11.5, u = x / sc * 1.25, v = -(y + 1) / sc * 1.25, f = (u * u + v * v - 1) ** 3 - u * u * v ** 3;
    if (f <= 0) { const inner = (q => (q * q + (v / .8) ** 2 - 1) ** 3 - q * q * (v / .8) ** 3)(u / .8); return inner <= 0 ? 2 : 1; }
  });
}
function discoHand() { // an open hand, waving
  return discoPattern("hand", "Hand", "shape", 2, 4, 1, ["magenta", "pink"], k => (x, y) => {
    const [u, v] = discoRot(x, y, (k % 2 ? 1 : -1) * .15), F = [[-10, -5, -6, 1.5], [-5.6, -12, -4.2, -3], [-1.8, -13, -1.4, -3.5], [1.9, -12.5, 1.4, -3.5], [5.4, -10.5, 4.2, -3]];
    const e = (u / 5.6) ** 2 + ((v - 3) / 6.2) ** 2;
    if (e < 1) return Math.hypot(u, v - 3) < 2 ? 1 : e > .62 ? 1 : 2; // the palm, outlined, an eye in it
    for (const [x0, y0, x1, y1] of F) if (discoSeg(u, v, [x0, y0], [x1, y1]) < 1.05) return 1;
  });
}
function discoKey() { // a key, turning a quarter on each beat
  return discoPattern("key", "Key", "shape", 1, 4, 1, ["lemon", "orange"], k => (x, y) => {
    const [u, v] = discoRot(x, y, k * Math.PI / 2 * .25), d = Math.hypot(u + 6.5, v);
    if (d < 4.6 && d > 2.4) return 1; if (d <= 1.2) return 2;
    if (u > -2.2 && u < 10.5 && Math.abs(v) < .8) return 1;
    if ((u > 6.6 && u < 7.8 && v > 0 && v < 3.2) || (u > 9 && u < 10.5 && v > 0 && v < 2.4)) return 2;
  });
}
function discoHat() { // a witch's hat, its buckle twinkling
  const cone = [[-5.5, 4], [5.5, 4], [1.5, -6], [5.5, -12], [-1.5, -7]];
  return discoPattern("witch-hat", "Witch's hat", "shape", 1, 4, 1, ["violet", "acid", "lemon"], k => (x, y) => {
    if (Math.abs(y - 3.2) < 1.2 && Math.abs(x) < 4.6 && Math.abs(x - (k % 2 ? 0 : .5)) < 1) return 3; // the buckle
    if (Math.abs(y - 3.2) < 1.1 && Math.abs(x) < 5.2) return 2; // the band
    if (discoPoly(x, y, cone)) return 1;
    if ((x / 11) ** 2 + ((y - 5) / 2.2) ** 2 < 1) return 1; // the brim
  });
}
function discoRosette() { // a six-petalled flower, its petals lighting round in turn
  return discoPattern("rosette", "Rosette", "shape", 2, 4, 2, ["pink", "mint", "lemon"], (k, n) => (x, y) => {
    const r = Math.hypot(x, y); if (r < 2.6) return 3;
    for (let q = 0; q < 6; q++) { const a = q * Math.PI / 3 + k / n * Math.PI / 3, d = Math.hypot(x - Math.cos(a) * 8, y - Math.sin(a) * 8); if (d < 4.6) return d > 3.3 || q === k % 6 ? 1 : 2; }
  });
}
function discoStars() { // five little stars twinkling in turn
  const S = [[-7, -6], [6, -8], [8, 4], [-5, 8], [0, 0]];
  return discoPattern("stars", "Twinkling stars", "fill", 2, 4, 2, ["lemon", "cyan", "pink"], k => (x, y) => {
    for (let i = 0; i < S.length; i++) { if ((i + k) % 3 === 0) continue; const big = (i + k) % 2 ? 3.2 : 4.2; if (discoPoly(x, y, discoStar(5, big, big * .42, -Math.PI / 2, S[i][0], S[i][1]))) return 1 + i % 3; }
  });
}

// ================= loops and fills =================
const discoChecker = () => discoPattern("checker", "Checkerboard", "fill", 1, 2, 1, ["cyan", "magenta"], k => (x, y) => 1 + (Math.floor((x + 16) / 2) + Math.floor((y + 16) / 2) + k) % 2);
const discoSparkle = () => discoPattern("sparkle", "Sparkle", "fill", 3, 4, 4, ["lemon", "cyan", "pink"], k => (x, y) => { const h = hash2(Math.floor(x + 16), Math.floor(y + 16), 400 + k); return h < .09 ? 1 + Math.floor(h / .03) : 0; });
function discoSweep() { // a radar sweep, its trail fading
  return discoPattern("sweep", "Radar sweep", "loop", 3, 4, 4, ["acid", "mint"], (k, n) => (x, y) => {
    const behind = ((k / n * Math.PI * 2 - discoAng(x, y) - Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    if (behind < .3) return 1; if (behind < 1.1) return 2;
    if (Math.abs(Math.hypot(x, y) - 7) < .5) return 2;
  });
}
const discoWaves = () => discoPattern("waves", "Waves", "loop", 2, 4, 2, ["blue", "cyan", "violet"], (k, n) => (x, y) => { const w = y + Math.sin(x * .42 + k / n * Math.PI * 2) * 2.4, b = Math.floor((w + 16) / 4); return ((w + 16) % 4 + 4) % 4 < 1.6 ? 1 + b % 3 : 0; });
function discoKaleido() { // eightfold mirrored blobs, new on each beat
  return discoPattern("kaleidoscope", "Kaleidoscope", "loop", 4, 4, 1, ["magenta", "lemon", "cyan", "acid"], k => (x, y) => {
    let a = Math.abs(discoWrap(discoAng(x, y))) % (Math.PI / 4); if (a > Math.PI / 8) a = Math.PI / 4 - a;
    const r = Math.hypot(x, y), u = Math.cos(a) * r, v = Math.sin(a) * r, h = hash2(Math.floor(u / 2.2), Math.floor(v / 2.2), 77 + k);
    return h < .5 ? 1 + Math.floor(h * 8) % 4 : 0;
  });
}
const discoStrobe = () => discoPattern("strobe", "Strobe rings", "fill", 4, 1, 4, ["pink", "cyan"], k => (x, y) => { const r = Math.hypot(x, y); return k % 2 ? (Math.floor(r / 3) % 2 ? 1 : 2) : (Math.floor(r / 3) % 2 ? 0 : 1); });
function discoPulse() { // the whole floor breathing out from the centre in two colours
  return discoPattern("pulse", "Pulse", "fill", 4, 2, 4, ["violet", "pink"], k => (x, y) => { const r = Math.hypot(x, y), front = (k % 4 + 1) * 3.8; return r < front ? (r > front - 3.8 ? 1 : 2) : 0; });
}

// ================= the switch-on sequence =================
// At game start: a ring sweeps out from the centre, a radar arm checks each quadrant in its colour, a test grid
// and checks blink, then the whole floor flashes on and settles to a sparkle. 8 beats, 4 frames a beat.
function discoBoot() {
  const Q = (x, y) => (x < 0 ? 0 : 1) + (y < 0 ? 0 : 2);
  return discoPattern("switch-on", "Switch-on", "boot", 1, 8, 4, ["cyan", "pink", "lemon", "acid"], k => (x, y) => {
    const r = Math.hypot(x, y);
    if (k < 8) { const front = (k + 1) * 2; return r < front && r > front - 1.6 ? 1 : r < front - 1.6 && k > 5 ? 0 : 0; } // the sweep out
    if (k < 16) { const arm = (k - 8) / 8 * Math.PI * 2 - Math.PI / 2, behind = ((arm - discoAng(x, y)) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); return behind < (k - 8 + 1) / 8 * Math.PI * 2 ? 1 + Q(x, y) : 0; } // quadrant test
    if (k < 20) return (Math.floor(x + 16) % 4 === 0 || Math.floor(y + 16) % 4 === 0) ? 1 + (k % 2) * 2 : 0; // test grid
    if (k < 24) return (Math.floor(x + 16) + Math.floor(y + 16) + k) % 2 ? 2 : 0; // checks
    if (k < 28) return k % 2 ? 1 : 3; // all on, flashing
    return hash2(Math.floor(x + 16), Math.floor(y + 16), k) < .12 * (32 - k) ? 1 + Math.floor(hash2(Math.floor(x + 16), Math.floor(y + 16), 3) * 4) : 0; // settling
  });
}

// ================= each area's own shape: its creature's sigil, drawn on stroke by stroke then pulsing =================
const discoContrast = name => ({ lemon: "violet", acid: "magenta", mint: "pink", cyan: "orange", blue: "lemon" }[name] || "lemon");
function discoAreaPattern(A) {
  const neon = SIGIL_NEON[A.creature] || "cyan", G = 22, off = (DISCO_GRID - G) / 2;
  const glyphs = Array.from({ length: 8 }, (_, k) => sigilGlyph(A.creature, G, { progress: (k + 1) / 8 })), full = glyphs[7];
  const at = (g, x, y) => { const i = Math.floor(x + DC - off), j = Math.floor(y + DC - off); return i >= 0 && j >= 0 && i < G && j < G && g.m[j * G + i]; };
  const halo = (x, y) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => at(full, x + dx, y + dy));
  return discoPattern("area-" + A.id, A.name, "area", 2, 4, 4, [neon, discoContrast(neon)], k => (x, y) => {
    if (k < 8) return at(glyphs[k], x, y) ? 1 : 0; // drawn on, stroke by stroke
    if (at(full, x, y)) return 1;
    if (k % 2 && halo(x, y)) return 2; // then pulsing, a halo on the off-beats
    if (k % 4 === 0 && Math.abs(Math.hypot(x, y) - 14.3) < .55) return 2;
  }, { area: A.id, creature: A.creature });
}

let discoLib = null;
// The whole library, built once: the general patterns, the switch-on sequence, and one per area.
export function discoPatterns() {
  if (discoLib) return discoLib;
  const general = [discoPentagram, discoMoon, discoEye, discoSpiral, discoRipples, discoRuneBand, discoSun, discoTriquetra, discoMushrooms, discoPaws, discoLightning, discoHeart, discoHand, discoKey, discoHat, discoRosette, discoStars,
    discoChecker, discoSparkle, discoSweep, discoWaves, discoKaleido, discoStrobe, discoPulse].map(f => f());
  discoLib = [...general, discoBoot(), ...AREAS.map(discoAreaPattern)];
  return discoLib;
}
export const discoPatternById = id => discoPatterns().find(p => p.id === id);

// ================= transitions =================
export const DISCO_TRANSITIONS = [
  { id: "wipe", beats: 1, onBar: false, desc: "a straight edge sweeps across (angle in the options, default left to right), a bright line along it" },
  { id: "iris", beats: 1, onBar: false, desc: "a circle opens from the centre (or closes: in), a bright ring at its edge" },
  { id: "dissolve", beats: 2, onBar: false, desc: "tiles change over one by one in a fixed random order" },
  { id: "burst", beats: 1, onBar: true, desc: "on a bar line: the whole floor flashes in the new colour and the new pattern bursts out from the centre" },
];
// The mask at progress t (0..1): 0 shows the old pattern, 1 the new, 2 the transition's bright edge (the new pattern's
// first colour, at full). opts: { angle } for wipe (radians, 0 = left to right), { in: true } for an iris closing.
export function discoTransition(id, t, opts = {}) {
  const out = new Uint8Array(DISCO_GRID * DISCO_GRID), R = DISCO_RADIUS + .8;
  for (let j = 0; j < DISCO_GRID; j++) for (let i = 0; i < DISCO_GRID; i++) {
    const n = j * DISCO_GRID + i; if (!DISCO_MASK[n]) continue;
    const x = i + .5 - DC, y = j + .5 - DC;
    if (t >= 1) { out[n] = 1; continue; } if (t <= 0) continue;
    if (id === "wipe") { const a = opts.angle || 0, s = (x * Math.cos(a) + y * Math.sin(a)) / R, e = -1 + t * 2.2; out[n] = s < e - .1 ? 1 : s < e ? 2 : 0; }
    else if (id === "iris") { const r = Math.hypot(x, y) / R, e = opts.in ? 1 - t * 1.1 : t * 1.1; out[n] = opts.in ? (r > e + .08 ? 1 : r > e ? 2 : 0) : (r < e - .08 ? 1 : r < e ? 2 : 0); }
    else if (id === "dissolve") out[n] = hash2(i, j, 913) < t ? 1 : 0;
    else if (id === "burst") { const r = Math.hypot(x, y) / R; out[n] = t < .15 ? 2 : r < (t - .15) / .85 * 1.1 - .1 ? 1 : r < (t - .15) / .85 * 1.1 ? 2 : 0; }
  }
  return out;
}

// ================= how the layers combine (a reference for the engine; the Art Lab and previews use it) =================
// Returns per cell an RGB and an intensity 0..3 (0 off; 1 to 3 the lit tile's look). Layers, bottom to top:
//   the pattern (and, mid-transition, the next one through the mask), dimmed at low party levels;
//   the party's intensity: at level 1 lit cells sit at intensity 1, at 4 at 3, and a level-4 floor sparkles between;
//   the witch: the tiles round where she stands light in her own colour, brightest under her.
export function discoCompose({ pattern, frame = 0, next = null, nextFrame = 0, transition = null, t = 0, level = 2, witch = null, witchColour = NEON.lemon, beat = 0 }) {
  const cells = Array.from({ length: DISCO_GRID * DISCO_GRID }, () => null), mask = transition && next ? discoTransition(transition.id || transition, t, transition) : null;
  const base = Math.max(1, Math.min(3, Math.round(level * .75))), colour = (p, v) => NEON[p.palette[v - 1]] || NEON.cyan;
  for (let n = 0; n < cells.length; n++) {
    if (!DISCO_MASK[n]) continue;
    const m = mask ? mask[n] : 0, p = m ? next : pattern, f = m ? nextFrame : frame, v = p.frames[f % p.frames.length][n];
    if (m === 2) cells[n] = { rgb: colour(next, 1), level: 3 };
    else if (v) cells[n] = { rgb: colour(p, v), level: Math.min(3, base + (v === 1 && level >= 3 ? 1 : 0)) };
    else if (level >= 4 && hash2(n, beat, 51) < .03) cells[n] = { rgb: colour(p, 1 + (n % p.palette.length)), level: 1 };
  }
  if (witch) for (let n = 0; n < cells.length; n++) { // the witch's own glow, on top
    if (!DISCO_MASK[n]) continue; const d = Math.hypot((n % DISCO_GRID) - witch.x, ((n / DISCO_GRID) | 0) - witch.y);
    if (d < 2.6) cells[n] = { rgb: witchColour, level: d < 1 ? 3 : d < 1.9 ? 2 : 1 };
  }
  return cells;
}

// ================= the looks =================
export const DISCO_PPM = 16;                            // px per metre, like the ground textures
export const DISCO_TILE_PX = 14, DISCO_PITCH = 15;      // a tile and its grout: 15 px = 0.94 m
export const DISCO_RIM = { width: 22, period: 64 };     // the rim strip: 22 px (1.4 m) wide, repeating every 64 px
export const DISCO_LOOK = { glass: [24, 20, 40], glassLit: [52, 46, 80], rune: [40, 33, 64], grout: [12, 10, 18], rim: [92, 90, 100], rimDark: [44, 42, 54], rimRune: [140, 120, 255], moss: [70, 104, 58] };
// Colours for baking: the unlit glass (STONED, the faint inner rune LINE, the glint STONE), the lit glass in white
// for the engine to tint (GLINT the hot spot, MAGIC2 the bright bevel, GLOW the body, MAGIC the shaded bevel; all
// glowing), the grout (BARKD), and the rim's stone (BODY, BODY2 in discoRimColours), carved runes (RUNE, glowing faintly) and moss.
export function discoColours(level = 3) {
  const k = [0, .5, .75, 1][level], w = v => [Math.round(v * k), Math.round(v * k), Math.round(v * k)];
  return { [M.STONED]: DISCO_LOOK.glass, [M.LINE]: DISCO_LOOK.rune, [M.STONE]: DISCO_LOOK.glassLit, [M.BARKD]: DISCO_LOOK.grout,
    [M.GLINT]: w(255), [M.MAGIC2]: w(235), [M.GLOW]: w(200), [M.MAGIC]: w(140), [M.RUNE]: DISCO_LOOK.rimRune, [M.MOSS]: DISCO_LOOK.moss };
}
export const discoRimColours = () => ({ [M.BODY]: DISCO_LOOK.rim, [M.BODY2]: DISCO_LOOK.rimDark, [M.RUNE]: DISCO_LOOK.rimRune, [M.MOSS]: DISCO_LOOK.moss, [M.BARKD]: DISCO_LOOK.grout });

const DISCO_UP = [0, 0, 1];
// One tile, seen from above. "unlit": dark glass with a faint rune inside and a glint on its top-left edge.
// "lit": white glass at intensity level 1 to 3 (the engine tints it with the cell's neon): a bright bevel top-left,
// a shaded one bottom-right and a hot spot, so a lit square reads as a lit tile.
export function discoTileSprite(kind = "unlit", { level = 3, rune = 3 } = {}) {
  const N = DISCO_TILE_PX, sp = new Sprite(N, N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const e = Math.min(x, y, N - 1 - x, N - 1 - y), tl = x + y < N - 1;
    const nx = x === 0 ? -.5 : x === N - 1 ? .5 : 0, ny = y === 0 ? -.5 : y === N - 1 ? .5 : 0, n = [nx, ny, 1];
    if (kind === "unlit") {
      const u = (x - 2.5) / (N - 5), v = (y - 2.5) / (N - 5), r = u >= 0 && u <= 1 && v >= 0 && v <= 1 && runeGlyph(u, v, rune, .1);
      sp.px(x, y, e === 0 && tl ? M.STONE : r ? M.LINE : M.STONED, ...n);
    } else {
      const hot = Math.hypot(x - N * .38, y - N * .38) < N * .16;
      const m = e === 0 ? (tl ? M.MAGIC2 : M.MAGIC) : e === 1 && !tl ? M.MAGIC : hot && level >= 2 ? M.GLINT : M.GLOW;
      sp.px(x, y, m, ...n);
    }
  }
  return sp;
}
// The grout between tiles: one tile's pitch with the line along its top and left, so it repeats over the grid.
export function discoGroutSprite() {
  const P = DISCO_PITCH, sp = new Sprite(P, P);
  for (let i = 0; i < P; i++) { sp.px(i, 0, M.BARKD, ...DISCO_UP); sp.px(0, i, M.BARKD, ...DISCO_UP); }
  return sp;
}
// The stone rim as a straight strip (x along the circumference, y outwards from the floor's edge, both in px),
// repeating exactly every DISCO_RIM.period px: dressed blocks with dark joints, a carved rune on each block, moss in the joints.
export function discoRimStrip(len = DISCO_RIM.period * 2) {
  const { width: W, period: P } = DISCO_RIM, sp = new Sprite(len, W), block = P / 2;
  for (let y = 0; y < W; y++) for (let x = 0; x < len; x++) {
    const xp = x % P, bx = xp % block, b = Math.floor(xp / block), joint = bx === 0 || y === 0 || y === W - 1 || y === Math.round(W * .2);
    const u = (bx - block / 2 + 5.5) / 11, v = (y - W * .2 - 4) / (W * .8 - 8), carved = !joint && u >= 0 && u <= 1 && v >= 0 && v <= 1 && runeGlyph(u, v, 3 + b * 5, .11);
    const n = y === 1 ? [0, -.6, .8] : y === W - 2 ? [0, .6, .8] : bx === 1 ? [-.6, 0, .8] : bx === block - 1 ? [.6, 0, .8] : DISCO_UP;
    const mossy = joint && y > 0 && hash2(Math.floor(x / 2) % (P / 2), y, 7) < .35;
    sp.px(x, y, carved ? M.RUNE : mossy ? M.MOSS : joint ? M.BODY2 : (hash2(xp, y, 3) < .06 ? M.BODY2 : M.BODY), ...n); // its own stone materials, apart from the glass's
  }
  return sp;
}
// The whole unlit floor from above (the engine draws lit tiles over it): tiles on the grid's pitch, each with its own
// faint rune, cut by the circle at the edge (only those in DISCO_MASK light), grout between, and the rim wrapped round. { sp, size, centre, pitch, rimInner, rimOuter } in px.
export function discoFloorBase() {
  const P = DISCO_PITCH, grid = DISCO_GRID * P, Wr = DISCO_RIM.width, R0 = (DISCO_RADIUS + .5) * P, size = Math.ceil((R0 + Wr) * 2) + 2, c = size / 2, sp = new Sprite(size, size);
  const tiles = Array.from({ length: 8 }, (_, k) => discoTileSprite("unlit", { rune: 3 + k * 7 })), off = c - grid / 2, rim = discoRimStrip(DISCO_RIM.period), circ = 2 * Math.PI * (R0 + Wr / 2), reps = Math.round(circ / DISCO_RIM.period);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const dx = x + .5 - c, dy = y + .5 - c, r = Math.hypot(dx, dy);
    if (r < R0) { // a tile or its grout
      const gx = x - off, gy = y - off, i = Math.floor(gx / P), j = Math.floor(gy / P), tx = Math.floor(gx - i * P) - 1, ty = Math.floor(gy - j * P) - 1;
      if (i < 0 || j < 0 || i >= DISCO_GRID || j >= DISCO_GRID || tx < 0 || ty < 0 || tx >= DISCO_TILE_PX || ty >= DISCO_TILE_PX || r > R0 - 1) { sp.px(x, y, M.BARKD, ...DISCO_UP); continue; }
      const m = tiles[Math.floor(hash2(i, j, 17) * tiles.length)].get(tx, ty); sp.px(x, y, m, ...DISCO_UP); continue; // the tiles outside the mask are cut by the rim and never light
    }
    if (r < R0 + Wr) { // the rim, its strip wrapped round so its pattern repeats a whole number of times
      const s = ((Math.atan2(dy, dx) / (Math.PI * 2) + 1) % 1) * reps * DISCO_RIM.period, ry = Math.min(Wr - 1, Math.floor(r - R0));
      const m = rim.get(Math.floor(s) % DISCO_RIM.period, ry), i = (ry * rim.w + (Math.floor(s) % DISCO_RIM.period)) * 3, ca = dx / r, sa = dy / r, nu = rim.n[i], nv = rim.n[i + 1];
      sp.px(x, y, m, nu * -sa + nv * ca, nu * ca + nv * sa, rim.n[i + 2]);
    }
  }
  return { sp, size, centre: c, pitch: P, gridOrigin: off, rimInner: R0, rimOuter: R0 + Wr };
}
// A pattern's frame (or a composed set of cells) painted on a 2D canvas context from above, at `cell` px a tile:
// the unlit floor, then each lit tile tinted by its colour with a bevel and glow. For the Art Lab and previews.
export function discoPaint(g, cells, { x = 0, y = 0, cell = 8, glow = true } = {}) {
  const G = DISCO_GRID, s = cell, rgb = (c, k) => `rgb(${Math.round(c[0] * k)},${Math.round(c[1] * k)},${Math.round(c[2] * k)})`;
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    const n = j * G + i; if (!DISCO_MASK[n]) continue;
    const X = x + i * s, Y = y + j * s, c = cells[n];
    if (!c) { g.fillStyle = rgb(DISCO_LOOK.glass, 1); g.fillRect(X, Y, s - 1, s - 1); g.fillStyle = rgb(DISCO_LOOK.glassLit, 1); g.fillRect(X, Y, s - 1, 1); continue; }
    const k = [0, .55, .8, 1][c.level];
    if (glow && c.level >= 2) { g.fillStyle = rgb(c.rgb, .25 * k); g.fillRect(X - 1, Y - 1, s + 1, s + 1); }
    g.fillStyle = rgb(c.rgb, k * .82); g.fillRect(X, Y, s - 1, s - 1);
    g.fillStyle = rgb([255, 255, 255].map((w, q) => (w + c.rgb[q]) / 2), k); g.fillRect(X, Y, s - 1, 1); g.fillRect(X, Y, 1, s - 1);
    g.fillStyle = rgb(c.rgb, k * .5); g.fillRect(X + s - 2, Y + 1, 1, s - 2); g.fillRect(X + 1, Y + s - 2, s - 2, 1);
    if (s >= 6 && c.level >= 2) { g.fillStyle = rgb([255, 255, 255].map((w, q) => (w * 2 + c.rgb[q]) / 3), k); g.fillRect(X + Math.floor(s * .3), Y + Math.floor(s * .3), Math.max(1, Math.floor(s * .2)), Math.max(1, Math.floor(s * .2))); }
  }
}
// One frame of one pattern as cells (no transition, no witch): for contact sheets.
export const discoCells = (p, frame = 0, level = 3) => discoCompose({ pattern: p, frame, level });
