import { describe, expect, it } from "vitest";
import { SEAL_H, SEAL_W, WORD_H, WORD_W, WORD_X, WORD_Y, lightOrder, sigilKnot, sigilShapes, sigilStars, starsFor, wordStars } from "./loadingSeal.js";

type Star = { x: number; y: number; at?: number };
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

// The loading screen's seal (Ed, 2026-11-05: his Celtic-knot Tree of Life, then "now turn this design into dots that are stars, and put
// the words into gaps, as per my diagram"): the knot outlined in stars, widened, COVEN and RUSH in the big gaps either side of the
// trunk, level; lit roughly left to right.
describe("the loading screen's seal", () => {
  const SP = 0.024, stars: Star[] = sigilStars(SP), knot = sigilKnot();

  it("is the knot outlined in stars, inside the seal, all round its rim", () => {
    expect(stars.length).toBeGreaterThan(1500);
    expect(stars.length).toBeLessThan(3500);
    for (const s of stars) { expect(Math.abs(s.x)).toBeLessThanOrEqual(SEAL_W + 0.02); expect(Math.abs(s.y)).toBeLessThanOrEqual(SEAL_H + 0.02); }
    // stars all round its widened rim: in every 10° of it, out past three quarters of the way
    for (let deg = 0; deg < 360; deg += 10) {
      const hit = stars.some(s => { const u = s.x / SEAL_W, v = s.y / SEAL_H, a = (Math.atan2(u, -v) * 180 / Math.PI + 360) % 360; return a >= deg && a < deg + 10 && Math.hypot(u, v) > 0.75; });
      expect(hit, `${deg}°`).toBe(true);
    }
    // left and right in balance (the reference's near-mirror)
    const left = stars.filter(s => s.x < -0.1).length, right = stars.filter(s => s.x > 0.1).length;
    expect(Math.abs(left - right) / (left + right)).toBeLessThan(0.1);
  });

  it("spaces its stars apart, a line of them along each edge", () => {
    let near = Infinity;
    const grid = new Map<string, Star[]>(), k = (x: number, y: number) => `${Math.floor(x / 0.05)},${Math.floor(y / 0.05)}`;
    for (const s of stars) { const key = k(s.x, s.y); grid.set(key, [...(grid.get(key) ?? []), s]); }
    for (const s of stars) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (const q of grid.get(k(s.x + a * 0.05, s.y + b * 0.05)) ?? []) if (q !== s) near = Math.min(near, Math.hypot(q.x - s.x, q.y - s.y));
    expect(near).toBeGreaterThan(SP * 0.4);
    // each star has a neighbour about a spacing away (they're in lines, not scattered)
    const lonely = stars.filter(s => !stars.some(q => q !== s && Math.hypot(q.x - s.x, q.y - s.y) < SP * 1.6)).length;
    expect(lonely).toBeLessThanOrEqual(1); // (the heart, alone in the trunk's middle)
  });

  it("weaves: at every crossing the ribbon over runs on and the one under has a black gap", () => {
    const shapes = sigilShapes();
    expect(knot.crossings.length).toBeGreaterThan(15);
    for (const c of knot.crossings) {
      const under = c.over === c.a ? c.b : c.a;
      expect(shapes.some(p => p.strand === c.over && inPoly(p.poly, c.x, c.y)), `over at ${c.x}, ${c.y}`).toBe(true);
      expect(shapes.some(p => p.strand === under && inPoly(p.poly, c.x, c.y)), `under at ${c.x}, ${c.y}`).toBe(false);
    }
    expect(knot.conflicts).toBeLessThanOrEqual(10); // (over and under in turn along the ribbons, but for a few)
  });

  it("sets COVEN and RUSH level in the big gaps either side of the trunk, clear of the knot's stars", () => {
    const words = wordStars([fakeWord(900, 140), fakeWord(700, 140)]);
    const coven = words.filter(s => s.x < 0), rush = words.filter(s => s.x > 0);
    const mid = (v: number[]) => (Math.min(...v) + Math.max(...v)) / 2;
    expect(mid(coven.map(s => s.x))).toBeCloseTo(-WORD_X, 5);
    expect(mid(rush.map(s => s.x))).toBeCloseTo(WORD_X, 5);
    expect(mid(coven.map(s => s.y))).toBeCloseTo(WORD_Y, 5);
    expect(mid(rush.map(s => s.y))).toBeCloseTo(WORD_Y, 5);
    // each word as wide as it may be (the longer, COVEN, WORD_W across), and round it a margin, empty of the knot's stars
    expect(Math.max(...coven.map(s => s.x)) - Math.min(...coven.map(s => s.x))).toBeCloseTo(WORD_W, 5);
    for (const word of [coven, rush]) {
      const x0 = Math.min(...word.map(s => s.x)) - 0.05, x1 = Math.max(...word.map(s => s.x)) + 0.05, y0 = Math.min(...word.map(s => s.y)) - 0.05, y1 = Math.max(...word.map(s => s.y)) + 0.05;
      for (const s of stars) expect(s.x > x0 && s.x < x1 && s.y > y0 && s.y < y1, `${s.x}, ${s.y}`).toBe(false);
    }
    expect(WORD_H).toBeLessThan(0.4);
    // and the knot round each: stars just above, below and outside it
    for (const sx of [-1, 1]) {
      expect(stars.some(s => Math.abs(s.x - sx * WORD_X) < 0.1 && s.y < WORD_Y - WORD_H / 2 && s.y > -0.5)).toBe(true);
      expect(stars.some(s => Math.abs(s.x - sx * WORD_X) < 0.1 && s.y > WORD_Y + WORD_H / 2 && s.y < 0.6)).toBe(true);
      expect(stars.some(s => Math.abs(s.y - WORD_Y) < 0.1 && sx * s.x > WORD_X + WORD_W / 2 && sx * s.x < SEAL_W)).toBe(true);
    }
  });

  it("lights roughly left to right, with some scatter, the heart (the trunk's middle) last", () => {
    const all = lightOrder<Star>([...sigilStars(SP), ...wordStars([fakeWord(900, 140), fakeWord(700, 140)])]);
    const at = all.map(s => s.at!), xs = all.map(s => s.x);
    expect(new Set(at).size).toBe(all.length);
    const rho = spearman(at, xs);
    expect(rho).toBeGreaterThan(0.9); // (left to right)
    expect(rho).toBeLessThan(0.995); // (but not sorted: scattered)
    const last = all.find(s => s.at === all.length - 1)!;
    expect(Math.hypot(last.x, last.y)).toBeLessThan(1e-9);
    // sweep 0: plain random
    const flat = lightOrder<Star>(sigilStars(SP), 0);
    expect(Math.abs(spearman(flat.map(s => s.at!), flat.map(s => s.x)))).toBeLessThan(0.15);
  });

  it("lights as many stars as the load's share, the heart's only once it's finished", () => {
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
