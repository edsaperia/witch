// The sigil carved into a sleeping legend's circle floor (Ed, 2026-10-06: "The floor of the legend circle can be
// weathered and mossy stone with the legend's sigil carved into it. It's covered by moss etc and so you can't see
// it clearly"): a square single-channel mask of the carving's grooves, 1 in a groove, 0 on the stone, the outer
// ring touching the edge. The ground shader cuts it into the floor's flagstones (render/ground.ts).
//
// The legend's own legendary sigil (golf's, art/sigils.js legendSigilMask: a double outer ring and a band of runes,
// a cell track, an inner rune band broken by three medallions, a great triangle, the animal in an octagon at the
// middle; runes and medallions seeded by species), drawn whole (tier 2) with its grooves at least CARVE_PX wide so
// they read cut into the stone. A species without one falls back to the stand-in below (the same parts, plainer).
import { legendSigilMask } from "../../art/generator.js";

/** The mask's side, pixels (the whole design, runes and cells, needs 150 or more). */
export const CARVING_SIZE = 256;
/** The thinnest groove, pixels. */
const CARVE_PX = 1.5;

const cache = new Map<string, Uint8Array>();

/** Each species' carving mask, CARVING_SIZE square, 0..255 a pixel (made once a species). */
export function carvingMask(species: string): Uint8Array {
  let m = cache.get(species);
  if (!m) cache.set(species, (m = drawSigil(species, CARVING_SIZE) ?? drawCarving(species, CARVING_SIZE)));
  return m;
}

/** Make the carvings of these species in idle time, one a time (so the first she comes near is already made: a carving is
 *  10-80 ms, Ed's playtest stalls of 2026-10-07). Those already made, or made meanwhile, are skipped. */
export function warmCarvings(species: readonly string[]): void {
  const todo = [...new Set(species)].filter(s => !cache.has(s));
  const idle = (f: () => void) => (typeof requestIdleCallback === "function" ? requestIdleCallback(f, { timeout: 2000 }) : setTimeout(f, 50));
  const next = () => { const s = todo.shift(); if (s === undefined) return; carvingMask(s); idle(next); };
  idle(next);
}

/** The legend's legendary sigil as grooves, or null if it has none. */
function drawSigil(species: string, n: number): Uint8Array | null {
  let f: Float32Array;
  try { f = (legendSigilMask as (id: string, size: number, o: { tier: number; minPx: number }) => Float32Array)(species, n, { tier: 2, minPx: CARVE_PX }); } catch { return null; }
  const out = new Uint8Array(n * n);
  let any = false;
  for (let i = 0; i < out.length; i++) { out[i] = Math.round(Math.max(0, Math.min(1, f[i])) * 255); if (out[i]) any = true; }
  return any ? out : null;
}

function seeded(s: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}

/** The distance from p to the segment ab (all in the unit square's coordinates). */
function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const vx = bx - ax, vy = by - ay, l = vx * vx + vy * vy || 1, t = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / l));
  return Math.hypot(px - ax - vx * t, py - ay - vy * t);
}

/** The stand-in (before the legendary sigils): rings, a rune band, three medallions on a triangle, seeded strokes in the middle. */
function drawCarving(species: string, n: number): Uint8Array {
  const r = seeded(species), out = new Uint8Array(n * n), w = 0.016; // (a groove about 2 px wide at 128)
  // the triangle's corners (the medallions' middles), turned by the species a little
  const turn = -Math.PI / 2 + (r() - 0.5) * 0.3, tri: [number, number][] = [0, 1, 2].map(k => [Math.cos(turn + (k * Math.PI * 2) / 3) * 0.62, Math.sin(turn + (k * Math.PI * 2) / 3) * 0.62]);
  // the middle: a handful of strokes, the animal's stand-in
  const strokes: [number, number, number, number][] = [];
  let x = (r() - 0.5) * 0.2, y = (r() - 0.5) * 0.2;
  for (let k = 0; k < 5 + Math.floor(r() * 4); k++) { const a = r() * Math.PI * 2, l = 0.12 + r() * 0.16, nx = Math.max(-0.3, Math.min(0.3, x + Math.cos(a) * l)), ny = Math.max(-0.3, Math.min(0.3, y + Math.sin(a) * l)); strokes.push([x, y, nx, ny]); x = nx; y = ny; }
  const runes = 18 + Math.floor(r() * 10), runeTilt = r();
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const px = ((i + 0.5) / n) * 2 - 1, py = ((j + 0.5) / n) * 2 - 1, d = Math.hypot(px, py), a = Math.atan2(py, px);
    let g = Infinity;
    g = Math.min(g, Math.abs(d - 0.97), Math.abs(d - 0.86)); // the outer rings, the rune band between
    // the rune band's marks: short strokes across it, every so often a pair
    const k = (((a / (Math.PI * 2)) * runes) % 1 + 1) % 1;
    if (d > 0.87 && d < 0.96) { const across = Math.abs(k - 0.5) * (Math.PI * 2 * d) / runes; g = Math.min(g, across + (((Math.floor((a / (Math.PI * 2)) * runes) * 7 + runeTilt * 10) | 0) % 3 === 0 ? 0.012 : 0)); }
    g = Math.min(g, Math.abs(d - 0.74)); // the inner ring
    for (let t = 0; t < 3; t++) { const [ax, ay] = tri[t], [bx, by] = tri[(t + 1) % 3]; g = Math.min(g, segDist(px, py, ax, ay, bx, by)); } // the inscribed triangle
    for (const [cx, cy] of tri) { const m = Math.hypot(px - cx, py - cy); g = Math.min(g, Math.abs(m - 0.11), Math.abs(m - 0.05)); } // the medallions
    for (const [ax, ay, bx, by] of strokes) g = Math.min(g, segDist(px, py, ax, ay, bx, by) - 0.004); // the middle
    const v = 1 - Math.max(0, Math.min(1, (g - w) / 0.012)); // (a soft edge, a pixel or so)
    out[j * n + i] = Math.round(v * 255);
  }
  return out;
}
