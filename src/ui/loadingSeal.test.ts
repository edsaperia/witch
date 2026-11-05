import { describe, expect, it } from "vitest";
import { FORK, RING_R, RING_X, SEAL_H, SEAL_W, lightOrder, starsFor, treeStars, treeStrokes, wordStars } from "./loadingSeal.js";

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

// The loading screen's seal (Ed's sketch, 2026-11-05): the World Tree's trunk down the middle, its branches and roots sweeping round
// into two rings either side, COVEN and RUSH level in them; its stars lit roughly left to right.
describe("the loading screen's seal", () => {
  const stars: Star[] = treeStars();

  it("is the tree in two rings either side of its trunk, inside the seal's bounds", () => {
    expect(stars.length).toBeGreaterThan(1000);
    expect(stars.length).toBeLessThan(2000);
    for (const s of stars) { expect(Math.abs(s.x)).toBeLessThanOrEqual(SEAL_W + 0.01); expect(Math.abs(s.y)).toBeLessThanOrEqual(SEAL_H + 0.01); }
    const left = stars.filter(s => s.x < -0.1).length, right = stars.filter(s => s.x > 0.1).length;
    expect(Math.abs(left - right) / (left + right)).toBeLessThan(0.05); // (freehand, but balanced)
    for (const cx of [-RING_X, RING_X]) { // each ring's band all round it
      for (let deg = -150; deg <= 150; deg += 30) {
        const a = deg * Math.PI / 180, x = cx + Math.sign(cx) * RING_R * Math.cos(a), y = RING_R * Math.sin(a);
        expect(Math.min(...stars.map(s => Math.hypot(s.x - x, s.y - y)))).toBeLessThan(0.06);
      }
    }
    // the trunk: stars down the middle from the crown's fork to the roots'
    for (let y = -FORK; y <= FORK; y += 0.05) expect(stars.some(s => Math.abs(s.x) < 0.02 && Math.abs(s.y - y) < 0.03)).toBe(true);
    expect(treeStrokes().every(p => p.length >= 2)).toBe(true);
  });

  it("spaces its stars apart", () => {
    let near = Infinity;
    for (let i = 0; i < stars.length; i++) for (let j = i + 1; j < stars.length; j++) near = Math.min(near, Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y));
    expect(near).toBeGreaterThanOrEqual(0.01);
  });

  it("sets COVEN and RUSH level, each centred in its ring", () => {
    const words = wordStars([fakeWord(900, 140), fakeWord(700, 140)]);
    const coven = words.filter(s => s.x < 0), rush = words.filter(s => s.x > 0);
    const mid = (v: number[]) => (Math.min(...v) + Math.max(...v)) / 2;
    expect(mid(coven.map(s => s.x))).toBeCloseTo(-RING_X, 5);
    expect(mid(rush.map(s => s.x))).toBeCloseTo(RING_X, 5);
    expect(mid(coven.map(s => s.y))).toBeCloseTo(0, 5);
    expect(mid(rush.map(s => s.y))).toBeCloseTo(0, 5);
    for (const s of words) expect(Math.hypot(Math.abs(s.x) - RING_X, s.y)).toBeLessThan(RING_R - 0.2); // (clear of the band)
  });

  it("lights roughly left to right, with some scatter, the heart's star last", () => {
    const all = lightOrder([...treeStars(), ...wordStars([fakeWord(900, 140), fakeWord(700, 140)])]);
    const at = all.map(s => s.at!), xs = all.map(s => s.x);
    expect(new Set(at).size).toBe(all.length);
    const rho = spearman(at, xs);
    expect(rho).toBeGreaterThan(0.9); // (left to right)
    expect(rho).toBeLessThan(0.995); // (but not sorted: scattered)
    const last = all.find(s => s.at === all.length - 1)!;
    expect(Math.hypot(last.x, last.y)).toBe(Math.min(...all.map(s => Math.hypot(s.x, s.y))));
    // sweep 0: plain random
    const flat = lightOrder(treeStars(), 0);
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
