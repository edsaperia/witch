// The attack look's atlas (config/attack-look.json; the gallery mock, previews/ed/spell-gallery): every element's parts, baked once
// at load into one texture of art pixels (16 a metre), for render/leash/attackLook.ts's pool to draw. Each element's parts are
// drawn in its palette of four (dark, mid, bright, hot) and again in grey (the same steps, for a party animal's neon to tint), so
// a palette is new colours, never new art:
//
//   core      what flies (a bolt's, a lob's): 4 frames, at an adult's size (a) and a legend's (l)
//   bit       what an impact throws and a trail leaves: 3 shapes (small to big), 2 frames each
//   beam      a beam's beads, strung along it: 3 shapes, 2 frames each
//   mark      what a hit leaves on the ground (seen from above), and area: 2 smaller tiles scattered over a quake's or pulse's ground
//
// and, in neutral white and dark, the danger frame's pieces (every wild attack's warning, whatever its element: Ed, 2026-10-27,
// "composability and telegraphing"): warn (a white pixel pair in a dark edge, strung into dashes), pip and pipOff (a delayed
// blast's countdown), bracket (a lock-on's corner, 4 turns), tick (a wind-up's "!"), chev (a lane's chevron), hatch (the shrinking
// safe circle's outside) and flash (the "now" star, 3 frames); and the side effects' motifs (by shape, never colour: slow chains,
// stun stars, knockback shockwave, confuse spiral), white, for the element's colour to tint. Slot 0 is a soft dot (the glyph
// shader's pixel-disc rule looks for it there) and px a solid white pixel.
import { hash2 } from "./core.js";

export const ATTACK_LOOK_PPM = 16;
export const ATLAS_SIZE = 768;
const GREY = [[92, 92, 92], [156, 156, 156], [218, 218, 218], [255, 255, 255]], GREY_ACCENT = [140, 140, 140];
const WHITE = [255, 255, 255], INK = [16, 12, 20];
/** Each part's cell size (art pixels) and how many shapes and frames it has. */
export const PARTS = { coreA: 16, coreL: 24, bit: 9, beam: 12, mark: 32, area: 16, cores: 4, bits: 3, bitFrames: 2, beams: 3, beamFrames: 2, areas: 2 };

const hex = s => { const n = parseInt(s.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

/** A small RGBA canvas of art pixels. */
class Cell {
  constructor(w, h) { this.w = w; this.h = h; this.d = new Uint8ClampedArray(w * h * 4); }
  put(x, y, c, a = 255) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h || a <= 0) return;
    const i = (y * this.w + x) * 4;
    this.d[i] = c[0]; this.d[i + 1] = c[1]; this.d[i + 2] = c[2]; this.d[i + 3] = Math.max(this.d[i + 3], Math.min(255, a));
  }
  disc(cx, cy, r, c, a = 255) { for (let y = Math.floor(cy - r - 1); y <= cy + r + 1; y++) for (let x = Math.floor(cx - r - 1); x <= cx + r + 1; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) this.put(x, y, c, a); }
  ring(cx, cy, r, c, a = 255, flat = 1, gap = 0) { const n = Math.max(12, Math.round(r * 7)); for (let i = 0; i < n; i++) { if (gap && i % gap === 0) continue; const t = (i / n) * Math.PI * 2; this.put(cx + Math.cos(t) * r, cy + Math.sin(t) * r * flat, c, a); } }
  line(x0, y0, x1, y1, c, a = 255) { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))) || 1; for (let i = 0; i <= n; i++) this.put(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, c, a); }
  /** a dark edge round every lit pixel (the solid parts' outline: they read on lit grass) */
  outline(c, a = 200) {
    const src = this.d.slice();
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      if (src[(y * this.w + x) * 4 + 3]) continue;
      let near = false;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < this.w && Y < this.h && src[(Y * this.w + X) * 4 + 3] > 100) near = true; }
      if (near) this.put(x, y, c, a);
    }
  }
}

// ---- an element's parts (P: its four colours, dark to hot; A: its accent) ----
function drawCore(c, kind, P, A, f, s) {
  const x = c.w / 2 - 0.5, y = c.h / 2 - 0.5;
  if (kind === "orb" || kind === "void") {
    c.disc(x, y, 2.6 * s, P[1]); c.disc(x, y, 1.7 * s, P[2]); c.disc(x + (f % 2 ? 0.4 : -0.3), y - 0.3, 0.8 * s, P[3]);
    if (f % 2) for (let k = 0; k < 4; k++) { const t = (k / 4) * Math.PI * 2 + f; c.put(x + Math.cos(t) * 3.2 * s, y + Math.sin(t) * 3.2 * s, P[2], 200); }
    if (kind === "void") { c.disc(x, y, 1.6 * s, P[0]); c.ring(x, y, 2.6 * s, P[2], 255, 1); c.ring(x, y, 3.2 * s, P[3], 140, 1, 3 + f); }
  } else if (kind === "shard") {
    const L = Math.round(4 * s);
    for (let k = -L; k <= L; k++) { const w = Math.max(0, Math.round((L - Math.abs(k)) * 0.45)); for (let q = -w; q <= w; q++) c.put(x + k, y + q, Math.abs(q) === w ? P[1] : k > L / 2 ? P[3] : P[2]); }
    c.put(x + L + 1, y, P[3]); if (f % 2) { c.put(x, y - 2 * s, P[3]); c.put(x - 1, y + 2 * s, P[3], 180); }
  } else if (kind === "droplet") {
    c.disc(x, y, 2.1 * s, P[1]); c.disc(x + 0.3, y - 0.3, 1.3 * s, P[2]); c.put(x + 0.8 * s, y - 0.9 * s, P[3]);
    for (let k = 1; k <= 2 * s; k++) c.put(x - 2.2 * s - k * 0.8, y + (f % 2 ? 0 : 0.5), k < s ? P[1] : P[0]);
  } else if (kind === "crescent") {
    for (let t = 0; t < 360; t += 12) { const a = (t * Math.PI) / 180; if (Math.cos(a) > -0.25) { c.put(x + Math.cos(a) * 3 * s, y + Math.sin(a) * 3 * s, P[2]); c.put(x + Math.cos(a) * 2.2 * s, y + Math.sin(a) * 2.2 * s, P[1]); } }
    c.put(x + 1, y, P[3]); c.put(x + 2.4 * s, y + (f - 1.5), P[3], 220);
  } else if (kind === "spark") {
    const pts = [[-4, 0], [-2, -2], [-0.5, 1.5], [1, -1], [2.5, 1], [4, 0]].map(([a, b], i) => [x + a * s, y + b * s * (i % 2 === f % 2 ? 1 : -0.7)]);
    for (let i = 0; i < pts.length - 1; i++) c.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], i % 2 ? P[2] : P[3]);
    c.disc(x, y, 1.2 * s, P[3]); c.ring(x, y, 2 * s, P[1], 200, 1, 2);
  } else if (kind === "rock") {
    c.disc(x, y, 2.3 * s, P[0]); c.disc(x - 0.5, y - 0.5, 1.6 * s, P[1]); c.put(x - 1, y - 1.2 * s, P[2]); c.put(x, y - 1.6 * s, P[3]);
    if (f % 2) c.put(x + 1.5 * s, y + 0.5, P[0]);
    c.outline(INK, 230); c.ring(x, y, 3.4 * s, P[3], 170, 1, 2 + f); // (its glowing edge: earth's core is solid, its edge lit)
  } else if (kind === "petal") {
    for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2 + f * 0.6; c.disc(x + Math.cos(a) * 2.2 * s, y + Math.sin(a) * 2.2 * s, 0.9 * s, P[1]); c.put(x + Math.cos(a) * 2.6 * s, y + Math.sin(a) * 2.6 * s, P[2]); }
    c.disc(x, y, 1 * s, P[3]); if (A) { c.put(x - 3.4 * s, y + 0.5, A); c.put(x - 2.8 * s, y + 1, A); }
  }
}

/** A look's own core (a body's look tag), flying right, turning by its frame: an acorn, a pinecone, a log, a pebble, a can, a leaf,
 *  a spike, a feather, an icicle, a rolling ball; s its size (1 an adult's, 1.6 a legend's). */
function drawLookCore(c, kind, P, f, s) {
  const x = c.w / 2 - 0.5, y = c.h / 2 - 0.5, t = (f / 4) * Math.PI * 2, ca = Math.cos(t), sa = Math.sin(t);
  const rot = (u, v) => [x + u * ca - v * sa, y + u * sa + v * ca]; // (tumbling)
  if (kind === "acorn") { // a nut under its cap and stalk, tumbling
    for (let v = -2; v <= 2; v += 0.5) for (let u = -1.6; u <= 1.6; u += 0.5) { const q = (u * u) / 2.6 + ((v - 0.4) * (v - 0.4)) / 4.4; if (q <= 1) c.put(...rot(u * s, v * s), q > 0.6 ? P[1] : u < 0 ? P[3] : P[2]); }
    for (let u = -2; u <= 2; u += 0.5) { c.put(...rot(u * s, -1.6 * s), P[0]); c.put(...rot(u * 0.8 * s, -2.1 * s), P[1]); }
    c.put(...rot(0.3 * s, -2.8 * s), P[0]);
  } else if (kind === "pinecone") { // scales in rows
    for (let v = -3; v <= 3; v++) { const w = Math.max(0.5, 2 - Math.abs(v + 0.5) * 0.45) * s; for (let u = -w; u <= w; u += 0.5) c.put(...rot(u, v * s * 0.8), (Math.round(u * 2) + v) % 2 ? P[1] : v < 0 ? P[2] : P[0]); }
    c.put(...rot(0, -3.4 * s), P[3]);
  } else if (kind === "log") { // a log rolling end-on and along: bark, its rings at the end
    for (let u = -4; u <= 4; u += 0.5) for (let v = -1.6; v <= 1.6; v += 0.5) c.put(x + u * s, y + v * s, Math.abs(v) > 1.1 ? P[0] : (Math.round(u + f) % 3 ? P[1] : P[0]));
    c.disc(x + 4 * s, y, 1.7 * s, P[2]); c.ring(x + 4 * s, y, 1 * s, P[1]); c.put(x + 4 * s, y, P[3]); c.outline([16, 12, 20], 220);
  } else if (kind === "pebble") { // a smooth stone, skimming: a glint turning round it
    c.disc(x, y, 1.8 * s, P[1]); c.disc(x - 0.4, y - 0.4, 1.1 * s, P[2]); c.put(...rot(1.2 * s, -0.6 * s), P[3]); c.put(x + 0.8, y + 1.2 * s, P[0]); c.outline([16, 12, 20], 220);
  } else if (kind === "can") { // a tin can, tumbling: its side, its rim
    for (let u = -1.8; u <= 1.8; u += 0.5) for (let v = -2.4; v <= 2.4; v += 0.5) c.put(...rot(u * s, v * s), Math.abs(v) > 1.9 ? P[3] : Math.abs(u) > 1.3 ? P[0] : (Math.round(v * 2) % 3 ? P[1] : P[2]));
    c.outline([16, 12, 20], 220);
  } else if (kind === "leaf") { // a leaf, fluttering: its blade and midrib
    for (let u = -3; u <= 3; u += 0.5) { const w = (1.6 - (u * u) / 6) * s * (f % 2 ? 0.7 : 1); for (let v = -w; v <= w; v += 0.5) c.put(...rot(u * s, v), v < 0 ? P[2] : P[1]); c.put(...rot(u * s, 0), P[3]); }
    c.put(...rot(-3.6 * s, 0.3), P[0]);
  } else if (kind === "spike") { // a spike or a beak, point first
    const L = Math.round(4.5 * s); for (let k = -L; k <= L; k++) { const w = Math.max(0, Math.round(((L - k) / (2 * L)) * 2.2 * s)); for (let q = -w; q <= w; q++) c.put(x + k, y + q, q === -w ? P[3] : q === w ? P[0] : k > L / 2 ? P[2] : P[1]); }
    c.put(x + L + 1, y, P[3]); if (f % 2) c.put(x + L, y - 1, P[3]);
  } else if (kind === "feather") { // a feather gliding: its vane, its quill
    for (let u = -4; u <= 4; u += 0.5) { const w = (1.8 - Math.abs(u + 0.5) * 0.35) * s; for (let v = -w; v <= w; v += 0.5) if ((Math.round(u * 2) + Math.round(v * 2)) % 3) c.put(x + u * s, y + v + (f % 2 ? 0.3 * Math.sin(u) : 0), v < 0 ? P[2] : P[1]); c.put(x + u * s, y, P[3]); }
    c.put(x - 4.6 * s, y, P[0]);
  } else if (kind === "icicle") { // a long shard of ice, point first, glinting
    const L = Math.round(5 * s); for (let k = -L; k <= L; k++) { const w = Math.max(0, Math.round(((L - k) / (2 * L)) * 1.8 * s)); for (let q = -w; q <= w; q++) c.put(x + k, y + q, q === -w ? P[3] : k > 0 ? P[2] : P[1]); }
    c.put(x + ((f * 3) % (2 * L)) - L, y - 1, P[3]);
  } else if (kind === "roll") { // curled up, rolling: plates turning round
    c.disc(x, y, 2.4 * s, P[1]); for (let k = 0; k < 4; k++) { const a = t + (k * Math.PI) / 2; c.line(x, y, x + Math.cos(a) * 2.4 * s, y + Math.sin(a) * 2.4 * s, P[0]); } c.ring(x, y, 2.4 * s, P[2], 255, 1); c.put(x - 1, y - 1.4 * s, P[3]); c.outline([16, 12, 20], 230);
  }
}

function drawBit(c, kind, P, A, i, f) {
  const x = c.w / 2 - 0.5, y = c.h / 2 - 0.5, s = 1 + i * 0.5;
  if (kind === "flame") { // a tongue of flame, licking up
    const H = Math.round(2 + i * 2 + (f ? 1 : 0));
    for (let k = 0; k <= H; k++) { const w = Math.max(0, Math.round((1 - k / (H + 1)) * (1 + i * 0.7))), ox = f && k > H / 2 ? 1 : 0; for (let q = -w; q <= w; q++) c.put(x + q + ox, y + H / 2 - k, k > H * 0.7 ? P[3] : Math.abs(q) === w && w ? P[1] : P[2]); }
  } else if (kind === "shard") { // a splinter of ice, flying
    const L = 2 + i; for (let k = 0; k < L; k++) c.put(x - L / 2 + k, y + L / 2 - k, k === L - 1 ? P[3] : P[2]); c.put(x - L / 2, y + L / 2 + 1, P[1]); if (f) c.put(x + 1, y - L / 2 - 1, P[3]);
  } else if (kind === "droplet") {
    c.disc(x, y, 0.6 + 0.6 * s, P[1]); c.put(x, y - (f ? 1 : 0) - 0.5 * s, P[2]); c.put(x + 0.5, y - 0.5, P[3]); if (f) c.put(x, y + s + 0.5, P[1]);
  } else if (kind === "wisp") {
    for (let k = 0; k < 3 + i * 2; k++) c.put(x + Math.sin(k * 0.9 + f) * (1 + i * 0.5), y + 2 - k, k > 1 + i ? P[3] : P[2], 255 - k * 25);
  } else if (kind === "fork") {
    let X = x - 2 - i, Y = y; for (let k = 0; k < 3 + i; k++) { const nx = X + 1.5, ny = Y + (k % 2 === f ? -1.5 : 1.5); c.line(X, Y, nx, ny, k < 1 ? P[3] : P[2]); X = nx; Y = ny; }
  } else if (kind === "chunk") {
    c.disc(x, y, 0.7 + i * 0.6, P[f ? 1 : 0]); c.put(x - 0.5, y - 0.6 - i * 0.5, P[2]); c.put(x, y - 1 - i * 0.5, P[3]); c.outline(INK, 220);
  } else if (kind === "puff") {
    c.disc(x, y, 1 + i * 0.8, P[1]); c.disc(x + 0.4, y + 0.4, 0.6 + i * 0.5, P[0]); c.ring(x, y, 1.3 + i * 0.8, P[2], 190, 1, f ? 3 : 2);
  } else if (kind === "petal") {
    const col = i === 2 && A ? A : P[1]; c.disc(x, y, 1.1 + i * 0.4, col); c.put(x + (f ? 1 : -1), y - 0.5, i === 2 && A ? A : P[2]); c.put(x, y, P[3], 200);
  }
}

function drawBeam(c, kind, P, A, i, f) {
  const x = c.w / 2 - 0.5, y = c.h / 2 - 0.5;
  if (kind === "flame") { // a burning band, tongues licking up off it
    c.disc(x, y + 1, 2.4, P[1]); c.disc(x, y + 1, 1.4, P[2]);
    const H = 3 + i + f; for (let k = 0; k < H; k++) c.put(x + (i - 1) + (f && k > 1 ? 1 : 0), y - k, k > H - 2 ? P[3] : P[2]);
    c.put(x + 2 - i, y - 1 - f, P[2]);
  } else if (kind === "crystal") { // crystal segments
    for (let k = -3; k <= 3; k++) { const w = 3 - Math.abs(k); for (let q = -w; q <= w; q++) c.put(x + k, y + q, Math.abs(q) === w ? P[1] : k > 0 ? P[3] : P[2]); }
    if ((f + i) % 2) c.put(x + 1, y - 3, P[3]);
  } else if (kind === "drip") { // a dripping band
    c.disc(x, y, 2.2, P[1]); c.disc(x, y - 0.5, 1.2, P[2]); c.put(x + 0.6, y - 1, P[3]);
    for (let k = 1; k <= 2 + i + f; k++) c.put(x + (i - 1), y + 2 + k, k > 2 ? P[0] : P[1]);
  } else if (kind === "ripple") { // soft rippling light
    for (let k = -4; k <= 4; k++) { const yy = y + Math.sin((k + f * 2 + i) * 0.9) * 1.5; c.put(x + k, yy, P[2]); c.put(x + k, yy + 1, P[1], 160); }
    c.put(x, y + Math.sin((f * 2 + i) * 0.9) * 1.5, P[3]);
  } else if (kind === "fork") { // forked jitter
    let X = x - 5, Y = y + (i - 1); for (let k = 0; k < 5; k++) { const nx = X + 2, ny = y + ((k + i + f) % 2 ? -2 : 2) * (k % 3 ? 1 : 0.5); c.line(X, Y, nx, ny, k % 2 ? P[2] : P[3]); X = nx; Y = ny; }
    if (f) c.line(x, y, x + 1, y - 3 - i, P[2]);
  } else if (kind === "stone") { // stony: chunks rolled along
    c.disc(x, y, 2 + (i % 2), P[0]); c.disc(x - 0.6, y - 0.6, 1.3, P[1]); c.put(x - 1, y - 1.6, P[2]); c.put(x + (f ? 1 : -1), y - 2.2, P[3]); c.outline(INK, 230);
  } else if (kind === "smoke") { // smoky
    c.disc(x, y, 2.6 + i * 0.4, P[1]); c.disc(x + 0.5, y + 0.6, 1.6, P[0]); c.ring(x, y, 3 + i * 0.4, P[2], 200, 1, 2 + f);
  } else if (kind === "petal") { // petals along it
    c.disc(x, y, 1.4, P[1]); c.put(x, y, P[3]);
    for (let k = 0; k < 3; k++) { const a = k * 2.1 + f + i; c.put(x + Math.cos(a) * 3, y + Math.sin(a) * 2.5, k === 2 && A ? A : P[2]); c.put(x + Math.cos(a) * 3.8, y + Math.sin(a) * 3, P[1], 200); }
  }
}

/** A ground mark (big: a hit's; small: one of an area's tiles, k its shape), drawn from straight above. */
function drawMark(c, kind, P, A, k) {
  const x = c.w / 2 - 0.5, y = c.h / 2 - 0.5, R = c.w * 0.42, h = (n, s) => hash2(n, k, s);
  if (kind === "scorch") { c.disc(x, y, R * 0.75, P[0], 150); c.ring(x, y, R * 0.75, P[0], 230); c.ring(x, y, R * 0.55, P[1], 200, 1, 3); for (let i = 0; i < 6 + k; i++) c.put(x + (h(i, 1) - 0.5) * R, y + (h(i, 2) - 0.5) * R, P[i % 3 ? 2 : 3]); }
  else if (kind === "rime") { for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + k; c.line(x, y, x + Math.cos(a) * R, y + Math.sin(a) * R, P[2], 220); c.put(x + Math.cos(a) * R * 0.6 + 1, y + Math.sin(a) * R * 0.6, P[3]); } c.ring(x, y, R * 0.4, P[1], 200); }
  else if (kind === "puddle") { c.disc(x, y, R * 0.8, P[0], 220); c.disc(x - 1, y - 1, R * 0.55, P[1], 200); for (let i = 0; i < 3; i++) c.ring(x + (h(i, 3) - 0.5) * R, y + (h(i, 4) - 0.5) * R, 1 + i * 0.5, P[2], 230); c.put(x - R * 0.3, y - R * 0.3, P[3]); }
  else if (kind === "halo") { c.ring(x, y, R * 0.85, P[1], 220); c.ring(x, y, R * 0.6, P[2], 200, 1, 3); c.ring(x, y, R * 0.3, P[3], 160, 1, 2); }
  else if (kind === "char") { for (let i = 0; i < 5; i++) { const a = i * 1.26 + k; let X = x, Y = y; for (let s = 0; s < 4; s++) { const nx = X + Math.cos(a) * R * 0.25 + (h(i, s) - 0.5) * 2, ny = Y + Math.sin(a) * R * 0.25 + (h(i, s + 9) - 0.5) * 2; c.line(X, Y, nx, ny, s < 2 ? P[1] : P[0], 230); X = nx; Y = ny; } } c.disc(x, y, 1.5, P[2]); }
  else if (kind === "cracks") { c.disc(x, y, R * 0.35, P[0], 200); for (let i = 0; i < 6; i++) { const a = i * 1.05 + k + h(i, 5); let X = x, Y = y; for (let s = 0; s < 4; s++) { const nx = X + Math.cos(a) * R * 0.25 + (h(i, s) - 0.5) * 2, ny = Y + Math.sin(a) * R * 0.25 + (h(i, s + 7) - 0.5) * 2; c.line(X, Y, nx, ny, P[0], 240); if (s === 1) c.put(nx + 1, ny, P[2], 230); X = nx; Y = ny; } } }
  else if (kind === "pool") { c.disc(x, y, R * 0.8, P[0], 210); c.ring(x, y, R * 0.8, P[2], 220, 1, 3); c.disc(x + 1, y + 1, R * 0.4, [0, 0, 0], 120); }
  else if (kind === "flowers") { for (let i = 0; i < 7; i++) { const X = x + (h(i, 1) - 0.5) * R * 1.6, Y = y + (h(i, 2) - 0.5) * R * 1.6; if (A) { c.put(X, Y + 1, A); c.put(X - 1, Y + 1, A, 200); } c.put(X, Y, P[i % 2 ? 1 : 2]); c.put(X + 1, Y, P[2]); c.put(X, Y - 1, P[2]); c.put(X - 1, Y, P[1]); c.put(X, Y + 0.01, P[3]); } }
}

// ---- the danger frame's pieces and the motifs ----
const NEUTRAL = {
  warn: [4, c => { c.disc(1.5, 1.5, 2.1, INK, 235); c.put(1, 1, WHITE); c.put(2, 1, WHITE); c.put(1, 2, WHITE); c.put(2, 2, WHITE); }],
  pip: [5, c => { c.disc(2, 2, 2.4, INK, 235); c.disc(2, 2, 1.2, WHITE); }],
  pipOff: [5, c => { c.disc(2, 2, 2.4, INK, 200); c.ring(2, 2, 1.4, [120, 120, 130], 200); }],
  tick: [11, c => { const o = 3; for (let y = 0; y < 11; y++) for (let x = 0; x < 5; x++) c.put(o + x, y, INK, 235); for (let y = 1; y < 7; y++) { c.put(o + 2, y, WHITE); if (y < 6) { c.put(o + 1, y, WHITE); c.put(o + 3, y, WHITE); } } for (let x = 1; x < 4; x++) c.put(o + x, 9, WHITE); }],
  chev: [7, c => { for (let k = 0; k < 4; k++) { c.put(3 + k - 3, 3 - k, WHITE); c.put(3 + k - 3, 3 + k, WHITE); } c.outline(INK, 230); }],
  hatch: [16, c => { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if ((x + y) % 6 < 2) c.put(x, y, INK, 255); else c.put(x, y, INK, 90); }],
};
for (let q = 0; q < 4; q++) NEUTRAL["bracket" + q] = [8, c => { const fx = q & 1 ? -1 : 1, fy = q & 2 ? -1 : 1, X = q & 1 ? 6 : 1, Y = q & 2 ? 6 : 1; for (let k = 0; k < 5; k++) { c.put(X + fx * k, Y, WHITE); c.put(X, Y + fy * k, WHITE); } c.outline(INK, 235); }];
for (let f = 0; f < 3; f++) NEUTRAL["flash" + f] = [13, c => { const x = 6, y = 6, L = 2 + f * 2; for (let k = -L; k <= L; k++) { c.put(x + k, y, WHITE); c.put(x, y + k, WHITE); } if (f) for (let k = -L + 2; k <= L - 2; k++) { c.put(x + k, y + k, WHITE, 180); c.put(x + k, y - k, WHITE, 180); } c.disc(x, y, 1 + f * 0.5, WHITE); }];
// the motifs, white (the element's colour tints them): slow's chain (links, turning), stun's star, knockback's shock arc, confuse's spiral
for (let f = 0; f < 4; f++) NEUTRAL["chain" + f] = [10, c => { for (let k = 0; k < 2; k++) { const x = 3 + k * 4, y = 5 + (k + f) % 2; c.ring(x, y, 2.2, WHITE, 255, k === f % 2 ? 0.55 : 1); } c.outline(INK, 160); }];
for (let f = 0; f < 2; f++) NEUTRAL["star" + f] = [7, c => { const x = 3, y = 3; for (let k = -2; k <= 2; k++) { c.put(x + k, y, WHITE); c.put(x, y + k, WHITE); } if (f) { c.put(x - 1, y - 1, WHITE); c.put(x + 1, y + 1, WHITE); c.put(x + 1, y - 1, WHITE); c.put(x - 1, y + 1, WHITE); } }];
for (let f = 0; f < 3; f++) NEUTRAL["shock" + f] = [14, c => { const r = 3 + f * 2; for (let t = -50; t <= 50; t += 8) { const a = (t * Math.PI) / 180; c.put(7 - r * 0.6 + Math.cos(a) * r, 7 + Math.sin(a) * r, WHITE); c.put(7 - r * 0.6 + Math.cos(a) * (r - 1), 7 + Math.sin(a) * (r - 1), WHITE, 160); } c.line(1, 4, 4 - f, 4, WHITE, 200); c.line(1, 10, 4 - f, 10, WHITE, 200); }];
for (let f = 0; f < 4; f++) NEUTRAL["spiral" + f] = [11, c => { for (let k = 0; k < 26; k++) { const a = k * 0.42 + f * (Math.PI / 2), r = k * 0.19; c.put(5 + Math.cos(a) * r, 5 + Math.sin(a) * r, WHITE, 140 + k * 4); } }];

/** Every cell to bake: [name, width, height, draw(cell)]. */
export function atlasCells(cfg) {
  const out = [["dot", 32, 32, c => { for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const r = Math.hypot(x - 15.5, y - 15.5) / 16; if (r < 1) c.put(x, y, WHITE, Math.round(255 * (1 - r) ** 2)); } }], ["px", 4, 4, c => { for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) c.put(x, y, WHITE); }]];
  for (const [id, [w, draw]] of Object.entries(NEUTRAL)) out.push([id, w, w, draw]);
  for (const [id, e] of Object.entries(cfg.elements)) for (const v of ["c", "g"]) {
    const P = v === "c" ? e.palette.map(hex) : GREY, A = e.accent ? (v === "c" ? hex(e.accent) : GREY_ACCENT) : null, n = `${id}.${v}.`;
    for (let f = 0; f < PARTS.cores; f++) { out.push([`${n}core.a.${f}`, PARTS.coreA, PARTS.coreA, c => drawCore(c, e.core, P, A, f, 1)]); out.push([`${n}core.l.${f}`, PARTS.coreL, PARTS.coreL, c => drawCore(c, e.core, P, A, f, 1.6)]); }
    for (let i = 0; i < PARTS.bits; i++) for (let f = 0; f < PARTS.bitFrames; f++) out.push([`${n}bit.${i}.${f}`, PARTS.bit, PARTS.bit, c => drawBit(c, e.bits, P, A, i, f)]);
    for (let i = 0; i < PARTS.beams; i++) for (let f = 0; f < PARTS.beamFrames; f++) out.push([`${n}beam.${i}.${f}`, PARTS.beam, PARTS.beam, c => drawBeam(c, e.beam, P, A, i, f)]);
    out.push([`${n}mark`, PARTS.mark, PARTS.mark, c => drawMark(c, e.mark, P, A, 0)]);
    for (let i = 0; i < PARTS.areas; i++) out.push([`${n}area.${i}`, PARTS.area, PARTS.area, c => drawMark(c, e.area, P, A, i + 1)]);
  }
  for (const [id, L] of Object.entries(cfg.looks ?? {})) for (const v of L.palette ? ["c", "g"] : ["g"]) {
    const P = v === "c" ? L.palette.map(hex) : GREY;
    for (let f = 0; f < PARTS.cores; f++) { out.push([`look.${id}.${v}.core.a.${f}`, PARTS.coreA, PARTS.coreA, c => drawLookCore(c, L.core, P, f, 1)]); out.push([`look.${id}.${v}.core.l.${f}`, PARTS.coreL, PARTS.coreL, c => drawLookCore(c, L.core, P, f, 1.6)]); }
  }
  return out;
}

/** The atlas: every cell packed in shelves (2 px apart, so none bleeds into the next), the soft dot first at the top left.
 *  rgba is size × size, row 0 at the top; cells[name] = [x, y, w, h] in pixels. */
export function attackLookAtlas(cfg, size = ATLAS_SIZE) {
  const rgba = new Uint8ClampedArray(size * size * 4), cells = /** @type {Record<string, number[]>} */ ({}), pad = 2;
  let x = 0, y = 0, row = 0;
  const all = atlasCells(cfg), [first, ...rest] = all; // (the soft dot first, in its corner; the rest tallest first, packing tighter)
  rest.sort((a, b) => b[2] - a[2] || b[1] - a[1]);
  for (const [name, w, h, draw] of [first, ...rest]) {
    if (x + w > size) { x = 0; y += row + pad; row = 0; }
    if (y + h > size) throw new Error(`attack look atlas: no room for ${name} in ${size}×${size}`);
    const c = new Cell(w, h); draw(c);
    for (let j = 0; j < h; j++) rgba.set(c.d.subarray(j * w * 4, (j + 1) * w * 4), ((y + j) * size + x) * 4);
    cells[name] = [x, y, w, h];
    x += w + pad; row = Math.max(row, h);
    if (name === "dot") x = Math.max(x, 40); // (nothing else in the glyph shader's soft-dot corner)
  }
  return { size, rgba, cells };
}
