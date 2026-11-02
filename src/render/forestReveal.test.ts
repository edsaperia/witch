// The forest behind the treehouse as the island loads (render/forestReveal.ts; Ed, 2026-11-02: after waking the forest was black,
// then all there at once; through the telescope a dark forest was suddenly lit).
import { describe, expect, it } from "vitest";
import { forestShown, newForestReveal, stepForestReveal, type ForestReveal, type RevealPlace } from "./forestReveal";

const T = { on: true, fade: 0.6, reveal: 20 };
const FRAME = 1 / 60;

/** `secs` of her clock at 60 drawn frames a second from `s.at` (0 when not stepped yet), the forest's share eased after each. */
function run(s: ForestReveal, place: RevealPlace | ((t: number) => RevealPlace), ready: boolean | ((t: number) => boolean), secs: number): number[] {
  const out: number[] = [];
  const stepped = Number.isFinite(s.at), t0 = stepped ? s.at : 0, n = Math.round(secs / FRAME);
  for (let i = stepped ? 1 : 0; i <= n; i++) {
    const t = t0 + i * FRAME;
    stepForestReveal(s, typeof place === "function" ? place(t) : place, typeof ready === "function" ? ready(t) : ready, t, T);
    out.push(forestShown(s.k));
  }
  return out;
}
/** The largest change between one frame and the next. */
const biggestStep = (a: number[]): number => a.reduce((m, v, i) => (i ? Math.max(m, Math.abs(v - a[i - 1])) : m), 0);

describe("the forest's reveal behind the house", () => {
  it("is black in the house till the island's ready, then fades in over the tuning's 20 s from that moment, no faster", () => {
    const s = newForestReveal();
    const before = run(s, "house", false, 30); // (a slow load: 30 s of her clock after waking, still black)
    expect(before.every(v => v === 0)).toBe(true);
    const after = run(s, "house", true, 25);
    expect(after[0]).toBeLessThan(0.001);
    expect(after[Math.round(5 / FRAME)]).toBeLessThan(0.2); // (eased in)
    expect(after[Math.round(10 / FRAME)]).toBeCloseTo(0.5, 2); // (half way at half time)
    expect(after[Math.round(19 / FRAME)]).toBeLessThan(1);
    expect(after[Math.round(20 / FRAME) + 1]).toBe(1);
    expect(biggestStep(after)).toBeLessThan(0.002); // (no frame's change more than a sixtieth of 20 s's ease at its steepest)
  });

  it("through the telescope before the island's ready: the forest stays dark (no popping in under the mist), and reveals with the house", () => {
    const s = newForestReveal();
    run(s, "house", false, 3);
    const scoped = run(s, "scope", false, 10);
    expect(scoped.every(v => v === 0)).toBe(true);
    const after = run(s, "scope", true, 21);
    expect(after[Math.round(10 / FRAME)]).toBeCloseTo(0.5, 2);
    expect(after.at(-1)).toBe(1);
    expect(biggestStep(after)).toBeLessThan(0.002);
  });

  it("looking through the telescope mid-reveal, and putting it down, carries on the same reveal rather than snapping or starting again", () => {
    const s = newForestReveal();
    run(s, "house", false, 2);
    // ready at 2 s; the telescope from 7 s to 12 s, then the house again
    const place = (t: number): RevealPlace => (t >= 7 && t < 12 ? "scope" : "house");
    const seen = run(s, place, true, 24);
    const plain = newForestReveal();
    run(plain, "house", false, 2);
    const steady = run(plain, "house", true, 24);
    expect(seen.length).toBe(steady.length);
    for (let i = 0; i < seen.length; i++) expect(seen[i]).toBeCloseTo(steady[i], 9);
  });

  it("the island ready while she's at the telescope: the house shows the same partly revealed forest after it, not the whole of it", () => {
    const s = newForestReveal();
    run(s, "house", false, 2);
    run(s, "scope", false, 4); // (before: through the telescope at 0.6 s's fade, the forest was all there by now, and stayed)
    run(s, "scope", true, 4);
    const back = run(s, "house", true, 1);
    expect(back[0]).toBeGreaterThan(0.02); expect(back[0]).toBeLessThan(0.15); // (4 s of 20 eased)
    expect(biggestStep(back)).toBeLessThan(0.002);
  });

  it("lifting off before the island's ready brings it back from where she left over the fade, and it doesn't go dark again once ready", () => {
    const s = newForestReveal();
    run(s, "house", false, 2);
    const out = run(s, "out", false, 1);
    expect(s.out).toBe(true);
    expect(out.at(-1)).toBe(1);
    run(s, "out", true, 1);
    const landed = run(s, "house", true, 2); // (back in the house after it's ready: as it was)
    expect(landed.every(v => v === 1)).toBe(true);
  });

  it("lifting off mid-reveal carries the reveal on", () => {
    const s = newForestReveal();
    run(s, "house", false, 1);
    run(s, "house", true, 5);
    const k = s.k, out = run(s, "out", true, 1);
    expect(s.out).toBe(false);
    expect(s.k).toBeCloseTo(k + 1 / 20, 3);
    expect(biggestStep(out)).toBeLessThan(0.002);
  });

  it("counts at most a tenth of a second for a drawn frame, so a stall or frames not drawn don't skip the reveal on", () => {
    const s = newForestReveal();
    stepForestReveal(s, "house", false, 0, T);
    stepForestReveal(s, "house", true, 1, T);
    stepForestReveal(s, "house", true, 30, T); // (a 29 s stall)
    expect(s.island).toBeCloseTo(0.2 / 20, 9); // (two frames: a tenth of a second each)
  });

  it("a new night's clock (her clock gone back to 0) starts dark in the house, not where the last night left it", () => {
    const s = newForestReveal();
    run(s, "house", false, 1);
    run(s, "house", true, 25);
    expect(s.k).toBe(1);
    stepForestReveal(s, "house", false, 0.5, T); // (the next night, her clock from 0, the island not ready)
    expect(s.k).toBe(0);
    expect(s.island).toBe(0);
  });

  it("is off with the dark: the whole picture always", () => {
    const s = newForestReveal();
    stepForestReveal(s, "house", false, 0, { ...T, on: false });
    stepForestReveal(s, "scope", false, 1, { ...T, on: false });
    expect(s.k).toBe(1);
  });
});
