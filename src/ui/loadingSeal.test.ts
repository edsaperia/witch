import { describe, expect, it } from "vitest";
import { GAP, RIBBON, SEAL_H, SEAL_W, WORD_W, WORD_X, lightOrder, sigilKnot, sigilPieces, starsFor, wordStars } from "./loadingSeal.js";

type Star = { x: number; y: number; at?: number };
type Piece = Star & { poly: number[][]; band?: number[]; strand?: number };
const ranks = (v: number[]) => { const o = v.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]), r = new Array(v.length); o.forEach(([, i], k) => (r[i] = k)); return r as number[]; };
/** Spearman's rank correlation of two lists. */
const spearman = (a: number[], b: number[]) => {
  const ra = ranks(a), rb = ranks(b), n = a.length, m = (n - 1) / 2;
  let num = 0, da = 0, db = 0; for (let i = 0; i < n; i++) { num += (ra[i] - m) * (rb[i] - m); da += (ra[i] - m) ** 2; db += (rb[i] - m) ** 2; }
  return num / Math.sqrt(da * db);
};
// a word's points as the font would give them (src/ui/loadingScreen.js word()): a box of points, w × h font pixels
const fakeWord = (w: number, h: number) => { const pts: [number, number][] = []; for (let x = 0; x <= w; x += 20) for (const y of [0, h]) pts.push([x + 100, y + 50]); return { pts, x0: 100, x1: 100 + w, y0: 50, y1: 50 + h }; };
const inPoly = (poly: number[][], x: number, y: number) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
/** Whether a piece shows at (x, y). */
const covers = (p: Piece, x: number, y: number) => inPoly(p.poly, x, y) && (!p.band || (y >= p.band[0] && y <= p.band[1]));

// The loading screen's seal (Ed, 2026-11-05, his reference a Celtic-knot Tree of Life): the tree in the middle, its canopy and roots
// woven into the ring round it, solid ribbons over and under; COVEN and RUSH level either side; lit roughly left to right.
describe("the loading screen's seal", () => {
  const pieces: Piece[] = sigilPieces(), knot = sigilKnot();
  const shown = (x: number, y: number) => pieces.some(p => covers(p, x, y));

  it("is the tree in its knotted ring, inside the rim, the two big lobes either side of its trunk dark", () => {
    expect(pieces.length).toBeGreaterThan(100);
    expect(pieces.length).toBeLessThan(400);
    for (const p of pieces) for (const [x, y] of p.poly) expect(Math.hypot(x, y)).toBeLessThan(1.04); // (its rim, a ribbon edge a touch over, as in the reference)
    // the ring: ribbon all round the rim
    for (let deg = 0; deg < 360; deg += 10) {
      const a = deg * Math.PI / 180, hit = [0.8, 0.84, 0.88, 0.92, 0.96].some(r => shown(r * Math.sin(a), -r * Math.cos(a)));
      expect(hit, `${deg}°`).toBe(true);
    }
    // the trunk solid down the middle, the lobes either side of it dark
    for (let y = -0.2; y <= 0.4; y += 0.05) expect(shown(0, y), `trunk at ${y}`).toBe(true);
    for (const x of [-0.45, 0.45]) for (const y of [-0.1, 0.1, 0.3]) expect(shown(x, y), `lobe at ${x}, ${y}`).toBe(false);
    // left and right in balance (the reference's near-mirror)
    const left = pieces.filter(p => p.x < -0.1).length, right = pieces.filter(p => p.x > 0.1).length;
    expect(Math.abs(left - right) / (left + right)).toBeLessThan(0.15);
  });

  it("weaves: at every crossing the ribbon over runs on and the one under has a black gap", () => {
    expect(knot.crossings.length).toBeGreaterThan(15);
    for (const c of knot.crossings) {
      const under = c.over === c.a ? c.b : c.a;
      expect(pieces.some(p => p.strand === c.over && covers(p, c.x, c.y)), `over at ${c.x}, ${c.y}`).toBe(true);
      expect(pieces.some(p => p.strand === under && covers(p, c.x, c.y)), `under at ${c.x}, ${c.y}`).toBe(false);
    }
    // over and under in turn along the ribbons, but for a few the reference breaks
    expect(knot.conflicts).toBeLessThanOrEqual(8);
    expect(RIBBON).toBeGreaterThan(2 * GAP);
  });

  it("sets COVEN and RUSH level either side of it, clear of its rim, inside the seal", () => {
    const words = wordStars([fakeWord(900, 140), fakeWord(700, 140)]);
    const coven = words.filter(s => s.x < 0), rush = words.filter(s => s.x > 0);
    const mid = (v: number[]) => (Math.min(...v) + Math.max(...v)) / 2;
    expect(mid(coven.map(s => s.x))).toBeCloseTo(-WORD_X, 5);
    expect(mid(rush.map(s => s.x))).toBeCloseTo(WORD_X, 5);
    expect(mid(coven.map(s => s.y))).toBeCloseTo(0, 5);
    expect(mid(rush.map(s => s.y))).toBeCloseTo(0, 5);
    for (const s of words) { expect(Math.abs(s.x)).toBeGreaterThan(1.05); expect(Math.abs(s.x)).toBeLessThanOrEqual(SEAL_W); expect(Math.abs(s.y)).toBeLessThan(SEAL_H); }
    expect(WORD_X - WORD_W / 2).toBeGreaterThan(1);
  });

  it("lights roughly left to right, with some scatter, the heart (the trunk's middle) last", () => {
    const all = lightOrder<Star>([...sigilPieces(), ...wordStars([fakeWord(900, 140), fakeWord(700, 140)])]);
    const at = all.map(s => s.at!), xs = all.map(s => s.x);
    expect(new Set(at).size).toBe(all.length);
    const rho = spearman(at, xs);
    expect(rho).toBeGreaterThan(0.9); // (left to right)
    expect(rho).toBeLessThan(0.995); // (but not sorted: scattered)
    const last = all.find(s => s.at === all.length - 1)!;
    expect(Math.hypot(last.x, last.y)).toBeLessThan(1e-9);
    // sweep 0: plain random
    const flat = lightOrder<Star>(sigilPieces(), 0);
    expect(Math.abs(spearman(flat.map(s => s.at!), flat.map(s => s.x)))).toBeLessThan(0.2);
  });

  it("lights as many as the load's share, the heart only once it's finished", () => {
    const N = 1500;
    expect(starsFor(0, N, false)).toBe(0);
    expect(starsFor(0.6, N, false)).toBe(Math.floor(0.6 * (N - 1)));
    expect(starsFor(1, N, false)).toBe(N - 1);
    expect(starsFor(1, N, true)).toBe(N);
    expect(starsFor(0.3, N, true)).toBe(N);
    expect(starsFor(0.5, 0, false)).toBe(0);
    let prev = 0;
    for (let s = 0; s <= 1; s += 0.01) { const n = starsFor(s, N, false); expect(n).toBeGreaterThanOrEqual(prev); prev = n; }
  });
});
