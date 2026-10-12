// The detailed sigils (Ed, 2026-10-12, for the sea chart's island runes: "we don't need the circles around the rune; ideally we
// want more detailed versions of the rune itself, which is the animal shape design as already chosen but embellished with more
// details", with a reference sheet of Norse emblems: each animal a bold, crisp shape with knotwork, spirals and inner lines
// carved into it). Made from the sigil's own strokes (art/sigils.js), so it stays recognisably the same rune, in tiers by how big
// it shows:
//   0  the plain glyph (sigilArrival): it reads down to about 12 px;
//   1  carved bands: every stroke a broad band with a groove cut down its middle (two lines, as the reference's ribbons), the
//      animal's extra detail added (LEGEND_DETAIL), the end dots rings;
//   2  knotwork: where bands cross, the later passes under the earlier (a gap cut round the one on top), the ends finished in
//      carved spiral knobs, and the shapes the strokes close in (a face, a body, a shell) filled with carved lines echoing
//      their outline, as the reference's bodies are.
// sigilDetail(id, size, { tier }) gives a size × size mask, 1 where there's ink, 0 where it's carved away or empty: white, to
// colour as the sigil's neon. No circle at any tier.
import { SIGIL_DOT, SIGIL_STROKE, sigilArrival, sigilDetailStrokes } from "./sigils.js";

/** The tier for a sigil `px` across on screen (the plain glyph below 64 px, carved bands to 128, knotwork past). */
export const detailTier = px => (px >= 128 ? 2 : px >= 64 ? 1 : 0);
/** The bands' width and their groove's (unit box), by tier. */
/** The detailed sigil's margin in its box (unit box). */
const INSET = .055;
/** At most this many spiral knobs on a sigil, on its longest open lines. */
const MAX_KNOBS = 4;
const BAND = [0, SIGIL_STROKE * 1.55, SIGIL_STROKE * 1.45], GROOVE = [0, SIGIL_STROKE * .42, SIGIL_STROKE * .36];

function segDist(u, v, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, t = l2 ? Math.max(0, Math.min(1, ((u - a[0]) * dx + (v - a[1]) * dy) / l2)) : 0;
  return Math.hypot(u - a[0] - dx * t, v - a[1] - dy * t);
}
const polyDist = (u, v, s) => (s.dot ? Math.hypot(u - s.pts[0][0], v - s.pts[0][1]) : s.pts.slice(1).reduce((d, b, i) => Math.min(d, segDist(u, v, s.pts[i], b)), Infinity));

const cache = new Map();
export function sigilDetail(id, size = 128, { tier = detailTier(size) } = {}) {
  const key = `${id}|${size}|${tier}`;
  if (cache.has(key)) return cache.get(key);
  const out = new Uint8Array(size * size);
  if (tier <= 0) { const at = sigilArrival(id, size); for (let i = 0; i < at.length; i++) out[i] = at[i] < Infinity ? 1 : 0; cache.set(key, out); return out; }
  // (drawn a little in from the box's edge: the bands are broader than the plain strokes)
  const S = sigilDetailStrokes(id, tier).map(s => ({ ...s, pts: s.pts.map(([x, y]) => [INSET + x * (1 - 2 * INSET), INSET + y * (1 - 2 * INSET)]) })), W = BAND[tier] / 2, G = GROOVE[tier] / 2, px = 1 / size;
  const knobR = W * 1.12, dotR = Math.max(SIGIL_DOT * 1.5, W * 1.1);
  // each open line's two ends (knobs at tier 2), not where it meets another line or closes on itself
  const ends = [];
  if (tier >= 2) for (const s of S) {
    if (s.dot || s.pts.length < 2) continue;
    const a = s.pts[0], b = s.pts[s.pts.length - 1];
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < W) continue; // (a closed ring)
    for (const [p, q] of [[a, s.pts[1]], [b, s.pts[s.pts.length - 2]]]) {
      if (S.some(o => o !== s && polyDist(p[0], p[1], o) < W * 1.6)) continue; // (joined to another line)
      ends.push({ p, dir: Math.atan2(p[1] - q[1], p[0] - q[0]), len: s.len });
    }
  }
  // (a few, on the longest lines: the reference's spirals finish the main sweeps, not every tick)
  ends.sort((a, b) => b.len - a.len).splice(MAX_KNOBS);
  // per pixel: the first stroke whose band covers it ("on top"), its distance, and whether another band covers it too
  const top = new Int16Array(size * size).fill(-1), dTop = new Float32Array(size * size), dMin = new Float32Array(size * size), under = new Uint8Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) * px, v = (y + .5) * px, i = y * size + x;
    let best = Infinity, n = 0;
    for (let k = 0; k < S.length; k++) {
      const s = S[k], d = polyDist(u, v, s), r = s.dot ? dotR : W;
      best = Math.min(best, d - r);
      if (d < r) { if (top[i] < 0) { top[i] = k; dTop[i] = s.dot ? d / dotR : d / W; } n++; }
    }
    dMin[i] = best; under[i] = n > 1 ? 1 : 0;
  }
  // the shapes the strokes close in: what the outside can't reach (tier 2: filled with lines echoing their outline)
  const inside = new Uint8Array(size * size);
  if (tier >= 2) {
    const seen = new Uint8Array(size * size), stack = [];
    for (let x = 0; x < size; x++) for (const y of [0, size - 1]) stack.push(y * size + x);
    for (let y = 0; y < size; y++) for (const x of [0, size - 1]) stack.push(y * size + x);
    while (stack.length) {
      const i = stack.pop();
      if (seen[i] || top[i] >= 0) continue;
      seen[i] = 1; const x = i % size, y = (i / size) | 0;
      if (x > 0) stack.push(i - 1); if (x < size - 1) stack.push(i + 1); if (y > 0) stack.push(i - size); if (y < size - 1) stack.push(i + size);
    }
    for (let i = 0; i < size * size; i++) if (!seen[i] && top[i] < 0) inside[i] = 1;
    // (a pocket too small to carve, under a few bands across, stays empty)
  }
  const period = W * 1.25, gap = W * .5, edge = Math.max(px * 1.2, W * .22);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) * px, v = (y + .5) * px, i = y * size + x, k = top[i];
    let ink = 0;
    if (k >= 0) {
      const s = S[k], d = dTop[i];
      ink = 1;
      if (s.dot) { if (d > .38 && d < .62) ink = 0; } // a ring carved in each dot
      else if (d * W < Math.max(G, px * .6)) ink = 0; // the groove down the band's middle
      if (tier >= 2 && under[i] && !s.dot && (1 - d) * W < edge) ink = 0; // the band on top, cut free where it crosses another
    } else if (inside[i]) { // a closed shape: solid, set in from its outline, with lines echoing the outline carved into it
      const d = dMin[i];
      if (d > gap && (d - gap) % period > period * .34) ink = 1;
    }
    // the ends: a round knob with a spiral carved in it
    for (const e of ends) {
      const c = [e.p[0] + Math.cos(e.dir) * W * .35, e.p[1] + Math.sin(e.dir) * W * .35], dx = u - c[0], dy = v - c[1], r = Math.hypot(dx, dy);
      if (r >= knobR) continue;
      const a = (Math.atan2(dy, dx) - e.dir + Math.PI * 4) % (Math.PI * 2), t = r / knobR, turn = (t * 1.6 - a / (Math.PI * 2) + 4) % 1; // (an Archimedean spiral of about 1.6 turns)
      ink = t > .9 || turn < .55 ? 1 : 0;
      if (t < .14) ink = 1;
      break;
    }
    out[i] = ink;
  }
  cache.set(key, out);
  return out;
}
