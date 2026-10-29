import { describe, expect, it } from "vitest";
import { TUNING } from "../../rules/tuning";
import { toEvolve } from "../../rules/berries";
import { areaTopRanks, asleepLegend, crowned, dotAt, EMPTY_STONE, legendShine, rankColour, standScale, rankOf, rankSize, shownDots, sigilRankColour, stoneRank, youthDots, RANKS_DEFAULT } from "./ranks";
import { crownGlyph, LEGEND_CROWN_W } from "../../../art/generator.js";

describe("rank sigils", () => {
  it("a youth's dots are its berries to adult less the last (eaten at a placed sigil), read from the rules", () => {
    for (const species of ["snail", "fox", "bear"]) {
      const need = toEvolve(1, TUNING, species);
      expect(youthDots({ level: 1, species }, 0, TUNING)).toEqual({ n: Math.round(need) - 1, lit: 0 });
      expect(youthDots({ level: 1, species }, 99, TUNING).lit).toBe(Math.round(need) - 1); // (never more lit than it has)
    }
    // follows the berry tuning: a cost of 4 (Foxtrot's normal) is three dots
    const t = structuredClone(TUNING), d = youthDots({ level: 1, species: "fox" }, 2, t);
    expect(d.n).toBe(Math.round(toEvolve(1, t, "fox")) - 1);
    expect(d.lit).toBe(2);
  });
  it("at most two rows of four drawn, lit in proportion", () => {
    expect(shownDots({ n: 7, lit: 3 })).toEqual({ n: 7, lit: 3 });
    expect(shownDots({ n: 15, lit: 15 })).toEqual({ n: 8, lit: 8 });
    expect(shownDots({ n: 15, lit: 7 })).toEqual({ n: 8, lit: 3 });
  });
  it("only a youth has dots", () => {
    for (const level of [0, 2, 3] as const) expect(youthDots({ level, species: "fox" }, 3, TUNING).n).toBe(0);
  });
  it("two rows off to the right, at most four a row, the rows interlocking", () => {
    const pts = Array.from({ length: 8 }, (_, i) => dotAt(i, 8));
    expect(pts.every(p => p.x > 0.5)).toBe(true); // (right of the glyph)
    expect(new Set(pts.map(p => p.y)).size).toBe(2);
    expect(new Set(pts.map(p => p.x)).size).toBe(8); // (no two on top of each other)
    expect(Math.max(...pts.map(p => p.x))).toBeLessThan(0.66 + 4 * 0.3);
  });
  it("ranks: babies purple on either side; enemies three reds, friends three blues, each muted to vivid, the legend the most saturated (Ed, 2026-10-29)", () => {
    expect(rankOf({ level: 3 })).toBe(3);
    const hue = ([r, g, b]: number[]) => { const M = Math.max(r, g, b), m = Math.min(r, g, b), d = M - m || 1; const h = M === r ? ((g - b) / d) % 6 : M === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
    const sat = ([r, g, b]: number[]) => { const M = Math.max(r, g, b); return M ? (M - Math.min(r, g, b)) / M : 0; };
    expect(rankColour(TUNING, 0, true)).toEqual(rankColour(TUNING, 0, false)); // (a baby's the same whatever its side)
    const baby = hue(rankColour(TUNING, 0)), F = [1, 2, 3].map(k => rankColour(TUNING, k)), E = [1, 2, 3].map(k => rankColour(TUNING, k, false));
    expect(baby).toBeGreaterThan(255); expect(baby).toBeLessThan(290); // (purple)
    for (const c of E) { const h = hue(c); expect(h < 25 || h > 350).toBe(true); } // (red: no pink, magenta or purple)
    for (const c of F) { const h = hue(c); expect(h).toBeGreaterThan(200); expect(h).toBeLessThan(235); } // (blue: no turquoise, no purple)
    for (const L of [E, F]) { for (let i = 1; i < 3; i++) expect(sat(L[i])).toBeGreaterThan(sat(L[i - 1]) + 0.1); expect(sat(L[2])).toBeGreaterThan(0.9); } // (by intensity: the legend at the end, the most vivid)
    for (const c of [...E, ...F]) { const h = hue(c); expect(Math.abs(h - baby)).toBeGreaterThan(40); } // (the purple is the babies' alone)
    expect([0, 1, 2, 3].map(k => rankSize(TUNING, k))).toEqual([0.81, 0.9, 1, 1.35]); // (sizes by rank everywhere)
    expect(standScale(TUNING)).toBe(1.5); // (standing up, in her stack and over the stones, half again: Ed, 2026-10-29)
    expect(TUNING.leash.ranks?.on ?? RANKS_DEFAULT.on).toBe(true); // (the default since Ed, 2026-10-27; ?sigils=old off)
    expect(TUNING.leash.hex?.size).toBe(RANKS_DEFAULT.hex); // (their 6 m hex grid with them)
  });
  it("only a legend's sigil shines: a glint sweeping across it a while every period, each its own", () => {
    for (const r of [0, 1, 2]) expect(legendShine(r, 5, 1)).toBe(0);
    const S = Array.from({ length: 260 }, (_, i) => legendShine(3, i / 100));
    expect(S.every(v => v >= 1)).toBe(true); // (a legend's: never 0)
    const sweeping = S.filter(v => v > 1.5);
    expect(sweeping.length / S.length).toBeCloseTo(0.4, 1);
    expect(Math.min(...sweeping)).toBeLessThan(1.8); expect(Math.max(...sweeping)).toBeGreaterThan(3.2); // (from corner to corner, past each)
    expect(legendShine(3, 0.1, 0)).not.toBe(legendShine(3, 0.1, 1));
  });
  it("a rune stone takes its area's top rank among those home, not hers; unlit with nobody home", () => {
    const at = (cell: [number, number], level: 0 | 1 | 2 | 3, more = {}) => ({ cell, level, leashed: false, ...more });
    const top = areaTopRanks([
      at([0, 0], 0), at([0, 0], 1), at([0, 0], 3, { leashed: true }), // (her legend doesn't count)
      at([1, 0], 2), at([1, 0], 3), // (a legend home: yellow)
      at([3, 0], 2, { state: "happy" }), // (a friend now: only the hostile count)
      at([2, 0], 2, { gone: true }), at([2, 0], 1, { fleeUntil: 5 }), at([2, 0], 2, { dancing: true }), at([2, 0], 2, { travelling: true }),
    ]);
    expect(stoneRank(top, [0, 0])).toBe(1);
    expect(stoneRank(top, [1, 0])).toBe(3);
    expect(stoneRank(top, [2, 0])).toBe(EMPTY_STONE); // (everyone gone, fled, dancing or travelling)
    expect(stoneRank(top, [3, 0])).toBe(EMPTY_STONE);
    expect(stoneRank(top, [5, 5])).toBe(EMPTY_STONE);
  });
  it("a sleeping legend's sigil is the baby's purple, neutral; awake, its side's colour again (Ed, 2026-10-29)", () => {
    const purple = rankColour(TUNING, 0, false);
    expect(asleepLegend({ boss: true, legendState: "asleep" })).toBe(true);
    expect(sigilRankColour(TUNING, 3, false, true)).toEqual(purple);
    expect(sigilRankColour(TUNING, 3, false, true)).toEqual(rankColour(TUNING, 0, true)); // (the one purple, friend or enemy)
    for (const s of ["restless", "angry", "happy"]) expect(asleepLegend({ boss: true, legendState: s })).toBe(false);
    expect(asleepLegend({ legendState: "asleep" })).toBe(false); // (a legend's only)
    expect(sigilRankColour(TUNING, 3, false, false)).toEqual(rankColour(TUNING, 3, false));
    expect(sigilRankColour(TUNING, 3, true, false)).toEqual(rankColour(TUNING, 3, true));
  });
  it("every legend's sigil wears the one crown, no one else's; the crown reads at stack size", () => {
    expect(crowned({ level: 3 })).toBe(true);
    expect(crowned({ level: 1, boss: true })).toBe(true);
    for (const level of [0, 1, 2]) expect(crowned({ level })).toBe(false);
    const C = crownGlyph();
    expect(C.w).toBe(LEGEND_CROWN_W);
    const row = (y: number) => Array.from(C.m.subarray(y * C.w, (y + 1) * C.w));
    expect(row(0).filter(Boolean).length).toBeGreaterThan(0); // (the middle point, tallest)
    expect(row(0)[0]).toBe(0); expect(row(1)[0]).toBe(1); // (the side points start a row lower)
    expect(row(C.h - 2).some(Boolean)).toBe(false); // (the band apart under it)
    expect(row(C.h - 1).filter(Boolean).length).toBeGreaterThan(C.w / 2);
    const small = crownGlyph(10);
    expect(small.w).toBe(10); expect(small.m.some(Boolean)).toBe(true);
  });
});
