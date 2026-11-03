import { describe, expect, it } from "vitest";
import { TUNING } from "../../rules/tuning";
import { toEvolve } from "../../rules/berries";
import { areaTopRanks, asleepLegend, crowned, dotAt, EMPTY_STONE, legendShine, rankColour, rankKnobs, standScale, rankOf, rankSize, shownDots, sigilRankColour, stoneRank, youthDots, RANKS_DEFAULT } from "./ranks";
import { crownGlyph, LEGEND_CROWN_W } from "../../../art/generator.js";
import { DANGER } from "./attackLook";
import attackLook from "../../../config/attack-look.json";
import { berryColour } from "../colourGrammar";
import { DECISION_LIST, applyKnobParams } from "../../ui/decisions";

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
  it("ranks: the party warm, the forest cold, each rank and side Ed's colour (Ed, 2026-11-03: \"the forest is cold, the party is warm\")", () => {
    expect(rankOf({ level: 3 })).toBe(3);
    const hue = ([r, g, b]: number[]) => { const M = Math.max(r, g, b), m = Math.min(r, g, b), d = M - m || 1; const h = M === r ? ((g - b) / d) % 6 : M === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
    const between = (h: number, lo: number, hi: number) => (lo <= hi ? h >= lo && h <= hi : h >= lo || h <= hi);
    const lightness = ([r, g, b]: number[]) => (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
    const F = [0, 1, 2, 3].map(k => rankColour(TUNING, k, true)), E = [0, 1, 2, 3].map(k => rankColour(TUNING, k, false));
    // hers: baby pink, youth red (a crimson), adult orange, legend gold
    expect(between(hue(F[0]), 300, 345) && lightness(F[0]) > 0.6).toBe(true); // (pink: rose, and light)
    expect(between(hue(F[1]), 335, 10)).toBe(true); // (red)
    expect(between(hue(F[2]), 20, 40)).toBe(true); // (orange)
    expect(between(hue(F[3]), 41, 55)).toBe(true); // (gold)
    // the wild's: youth purple, adult blue, legend turquoise; a baby's (his table leaves it open) a pale lilac, cold too
    expect(between(hue(E[1]), 255, 290)).toBe(true); // (purple)
    expect(between(hue(E[2]), 205, 235)).toBe(true); // (blue)
    expect(between(hue(E[3]), 165, 185)).toBe(true); // (turquoise)
    expect(between(hue(E[0]), 240, 280) && lightness(E[0]) > 0.75).toBe(true); // (a pale cold lilac)
    for (const c of F) expect(between(hue(c), 290, 60)).toBe(true); // (the party warm: pinks to golds)
    for (const c of E) expect(between(hue(c), 160, 290)).toBe(true); // (the forest cold: turquoise to purple)
    expect([0, 1, 2, 3].map(k => rankSize(TUNING, k))).toEqual([0.81, 0.9, 1, 1.35]); // (sizes by rank everywhere)
    expect(standScale(TUNING)).toBe(1.5); // (standing up, in her stack and over the stones, half again: Ed, 2026-10-29)
    expect(TUNING.leash.ranks?.on ?? RANKS_DEFAULT.on).toBe(true); // (the default since Ed, 2026-10-27; ?sigils=old off)
    expect(TUNING.leash.hex?.size).toBe(RANKS_DEFAULT.hex); // (their 6 m hex grid with them)
    expect(TUNING.colourGrammar).toBe("new"); // (the default)
    expect(TUNING.leash.ranks?.colours).toEqual(RANKS_DEFAULT.colours); expect(TUNING.leash.ranks?.enemy).toEqual(RANKS_DEFAULT.enemy); // (the code's fallback the same)
  });
  it("a youth's red is a crimson, apart from the warnings' pure red (Ed, 2026-11-03: \"red telegraphs are right; red does mean warning\")", () => {
    const warn = [230, 40, 40]; // (art/attackLook.js RED, render/leash/attackLook.ts DANGER, config danger.warn #e62828: unchanged)
    expect(DANGER.map(v => Math.round(v * 255))).toEqual(warn);
    expect(attackLook.danger.warn.toLowerCase()).toBe("#e62828");
    const youth = rankColour(TUNING, 1, true).map(v => v * 255);
    const lab = (c: number[]) => {
      const f = (u: number) => { u /= 255; return u > 0.04045 ? ((u + 0.055) / 1.055) ** 2.4 : u / 12.92; };
      const [r, g, b] = c.map(f), X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b, Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
      const k = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
      return [116 * k(Y) - 16, 500 * (k(X) - k(Y)), 200 * (k(Y) - k(Z))];
    };
    const hue = ([r, g, b]: number[]) => { const M = Math.max(r, g, b), m = Math.min(r, g, b), d = M - m || 1; const h = M === r ? ((g - b) / d) % 6 : M === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
    const [Ly, ay, by] = lab(youth), [Lw, aw, bw] = lab(warn);
    expect(Math.hypot(Ly - Lw, ay - aw, by - bw)).toBeGreaterThan(20); // (a plain difference, CIE76: about 29)
    expect(Lw - Ly).toBeGreaterThan(8); // (darker)
    expect(hue(youth)).toBeLessThan(350); expect(hue(youth)).toBeGreaterThan(335); // (toward rose: about 16 degrees off the warning's 0)
    for (const k of [0, 2, 3]) { const [L, a, b] = lab(rankColour(TUNING, k, true).map(v => v * 255)); expect(Math.hypot(L - Lw, a - aw, b - bw)).toBeGreaterThan(20); } // (no rank of hers a warning's red)
  });
  it("colourGrammar old brings back the colours before it exactly: the friends' purple and blues, the wild's purple and reds, cherry-red berries", () => {
    const t = { ...structuredClone(TUNING), colourGrammar: "old" as const };
    expect(rankKnobs(t).colours).toEqual([[180, 100, 255], [125, 145, 195], [55, 115, 220], [0, 135, 255]]);
    expect(rankKnobs(t).enemy).toEqual([[180, 100, 255], [190, 105, 100], [225, 45, 40], [255, 55, 15]]);
    expect(rankColour(t, 2, false)).toEqual([225 / 255, 45 / 255, 40 / 255]);
    expect(sigilRankColour(t, 3, false, true)).toEqual([180 / 255, 100 / 255, 255 / 255]); // (a sleeping legend the old purple)
    expect(berryColour(t)).toBe("#9e1024");
    expect(rankKnobs(t).sizes).toEqual(rankKnobs(TUNING).sizes); // (nothing else of the ranks changes)
    expect(berryColour(TUNING)).toBe(TUNING.berries.colour);
  });
  it("the pause page's Colours switch is the knob, new by default; old reloads the night with the old colours", () => {
    const d = DECISION_LIST.find(x => x.id === "colourGrammar")!;
    expect(d.label).toBe("Colours: party/forest (new) vs old");
    expect(d.apply).toEqual({ knob: "colourGrammar", reload: true });
    expect(d.default).toBe(TUNING.colourGrammar);
    const t = structuredClone(TUNING);
    applyKnobParams(t, new URLSearchParams("d_colourGrammar=old"));
    expect(rankKnobs(t).colours).toEqual([[180, 100, 255], [125, 145, 195], [55, 115, 220], [0, 135, 255]]);
    expect(berryColour(t)).toBe("#9e1024");
  });
  it("berries are a deep berry pink, not red (Ed, 2026-11-03: \"deep berry pink, instead of red\")", () => {
    const hex = berryColour(TUNING).replace("#", ""), c = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
    const M = Math.max(...c), m = Math.min(...c), d = M - m, h = M === c[0] ? (((c[1] - c[2]) / d) % 6) * 60 : 0, hue = (h + 360) % 360;
    expect(M).toBe(c[0]); // (red-led)
    expect(hue).toBeGreaterThan(310); expect(hue).toBeLessThan(335); // (pink: well off red's 0 and a youth's crimson)
    expect(c[2]).toBeGreaterThan(100); // (blue in it: a pink, not a red)
    expect((M + m) / 2).toBeLessThan(140); // (deep)
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
      at([4, 0], 2, { friendly: true }), at([4, 0], 0, { friendly: true }), // (a friendly area's, its legend's quest done: friends too, Ed 2026-11-02)
      at([2, 0], 2, { gone: true }), at([2, 0], 1, { fleeUntil: 5 }), at([2, 0], 2, { dancing: true }), at([2, 0], 2, { travelling: true }),
    ]);
    expect(stoneRank(top, [0, 0])).toBe(1);
    expect(stoneRank(top, [1, 0])).toBe(3);
    expect(stoneRank(top, [2, 0])).toBe(EMPTY_STONE); // (everyone gone, fled, dancing or travelling)
    expect(stoneRank(top, [3, 0])).toBe(EMPTY_STONE);
    expect(stoneRank(top, [4, 0])).toBe(EMPTY_STONE);
    expect(stoneRank(top, [5, 5])).toBe(EMPTY_STONE);
  });
  it("a sleeping legend's sigil is a wild baby's, neutral; awake, its side's colour again (Ed, 2026-10-29)", () => {
    const neutral = rankColour(TUNING, 0, false);
    expect(asleepLegend({ boss: true, legendState: "asleep" })).toBe(true);
    expect(sigilRankColour(TUNING, 3, false, true)).toEqual(neutral);
    expect(sigilRankColour(TUNING, 3, true, true)).toEqual(neutral); // (the one neutral, friend or enemy)
    for (const s of ["restless", "angry", "happy"]) expect(asleepLegend({ boss: true, legendState: s })).toBe(false);
    expect(asleepLegend({ legendState: "asleep" })).toBe(false); // (a legend's only)
    expect(sigilRankColour(TUNING, 3, false, false)).toEqual(rankColour(TUNING, 3, false));
    expect(sigilRankColour(TUNING, 3, true, false)).toEqual(rankColour(TUNING, 3, true));
  });
  it("every legend's sigil wears the one crown, no one else's; the crown reads at stack size", () => {
    expect(crowned({ level: 3 })).toBe(true);
    expect(crowned({ level: 1, boss: true })).toBe(true);
    for (const level of [0, 1, 2] as const) expect(crowned({ level })).toBe(false);
    const C = crownGlyph();
    expect(C.w).toBe(LEGEND_CROWN_W);
    const row = (y: number) => Array.from(C.m.subarray(y * C.w, (y + 1) * C.w));
    expect(row(0).filter(Boolean).length).toBeGreaterThan(0); // (the middle point, tallest)
    expect(row(0)[0]).toBe(0); expect(row(1)[0]).toBe(1); // (the side points start a row lower)
    const foot = row(C.h - 1); // (no band: its foot curving up in the middle, Ed, 2026-10-29)
    expect(foot[C.w / 2] || foot[C.w / 2 - 1]).toBe(0); expect(foot.some(Boolean)).toBe(true);
    expect(row(C.h - 2).every((v, x) => v || x === 0 || x === C.w - 1)).toBe(true); // (its body whole above the foot)
    const small = crownGlyph(10);
    expect(small.w).toBe(10); expect(small.m.some(Boolean)).toBe(true);
  });
});
