// A night's set (rules/musicSet.ts; Ed, 2026-10-11): every wave noticeably different from the last, never the same genre
// twice running, the energy rising to the final wave with a breakdown each cycle, the first home night the hand-picked one,
// the palette by the absolute wave, and the same seed giving the same set.
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { checkSet, energyAt, isCurated, MUSIC_STYLE, nightStyle, planNight, stepChanges, type NightSet } from "./musicSet";
import { checkStyle, notesAt, type MusicStyle } from "./musicScore";
import { planBlock, type MusicCue } from "./musicPlan";
import { newGame } from "./game";
import { TUNING } from "./tuning";

const style = styleJson as unknown as MusicStyle;
// Keep the explicit 10–64-wave matrix and ten-area authored home integration: curated selection, palette progression and final climax depend on night size.
const SIZES = [10, 20, 30, 40, 50, 64];
const nights = (): NightSet[] => SIZES.flatMap(w => [1, 7, 42].flatMap(seed => ["", "fox", "home"].map(island => planNight(style, { seed, island, waves: w }))));

describe("a night's set", () => {
  it("is sound: every family's sections, patches and leads exist, and the night's style checks out", () => {
    expect(checkSet(style)).toEqual([]);
    expect(Object.keys(style.families!).length).toBeGreaterThanOrEqual(16);
    for (const n of nights().slice(0, 12)) expect(checkStyle(nightStyle(style, n))).toEqual([]);
  });

  it("changes at least two of genre, key, lead, bass, voice and density every wave (never the tempo: the gameplay's), and never the genre twice running", () => {
    for (const n of nights()) {
      expect(n.steps.length).toBe(n.waves + 1);
      for (let i = 1; i < n.steps.length; i++) {
        const ch = stepChanges(n.steps[i - 1], n.steps[i]);
        expect(ch.length, `${n.island} ${n.waves} seed ${n.seed} wave ${i}: ${ch}`).toBeGreaterThanOrEqual(2);
        expect(ch, `${n.island} ${n.waves} seed ${n.seed} wave ${i}`).toContain("genre");
      }
    }
  });

  it("rises to its climax on the final wave, a peak and a breakdown every cycle, each cycle's peak higher", () => {
    for (const n of nights()) {
      if (n.curated) continue;
      const S = n.steps, last = S[S.length - 1];
      expect(last.role).toBe("climax");
      expect(last.energy).toBe(1);
      for (const s of S.slice(0, -1)) expect(s.energy).toBeLessThan(1);
      expect(n.cycles).toBe(Math.max(1, Math.round(n.waves / 10)));
      expect(S.filter(s => s.role === "breakdown").length, `${n.waves} waves`).toBeGreaterThanOrEqual(n.cycles);
      // (each cycle's own peak higher than the last's)
      const peaks: number[] = [];
      for (let c = 0; c < n.cycles; c++) {
        const inCycle = S.filter(s => s.at >= c / n.cycles && s.at < (c + 1) / n.cycles && s.role === "peak");
        if (inCycle.length) peaks.push(Math.max(...inCycle.map(s => s.energy)));
      }
      for (let c = 1; c < peaks.length; c++) expect(peaks[c]).toBeGreaterThan(peaks[c - 1] - 1e-9);
      // gentle at first; breakdowns calm, a drop from the wave before, darker
      expect(S[0].energy).toBeLessThan(0.3);
      for (let i = 1; i < S.length; i++) if (S[i].role === "breakdown") {
        expect(style.families![S[i].family].calm, `${n.waves} wave ${i}`).toBe(true);
        expect(S[i].energy).toBeLessThan(S[i - 1].energy);
        expect(S[i].scale).not.toBe(style.scale);
      }
    }
    for (const C of [1, 2, 3, 6]) { expect(energyAt(0, C)).toBeLessThan(0.2); expect(energyAt(1, C)).toBeCloseTo(1, 6); }
  });

  it("deals its palette by the absolute wave: a 10-wave night stays early, home's 64 travels to the hard end", () => {
    const early = planNight(style, { seed: 3, island: "fox", waves: 10 }), F = style.families!;
    for (const s of early.steps) expect(F[s.family].palette[0], s.family).toBeLessThanOrEqual(0.1);
    const home = planNight(style, { seed: 3, island: "home", waves: 64 }), late = home.steps.slice(-12).map(s => s.family);
    expect(late.some(f => F[f].palette[0] >= 0.55), late.join()).toBe(true);
  });

  it("plans by the night's time: a long wave counts for more of the night", () => {
    const even = planNight(style, { seed: 9, island: "fox", waves: 20 });
    const lengths = Array.from({ length: 21 }, (_, i) => (i < 5 ? 4 : 1)); // (its first waves four times as long)
    const slow = planNight(style, { seed: 9, island: "fox", waves: 20, lengths });
    expect(slow.steps[4].at).toBeGreaterThan(even.steps[4].at + 0.2);
    expect(slow.steps.findIndex(s => s.role === "peak")).toBeLessThan(even.steps.findIndex(s => s.role === "peak"));
  });

  it("is the hand-picked set on the first home night, and the game plays it", () => {
    const n = planNight(style, { seed: 5, island: "home", waves: 10 });
    expect(n.curated).toBe(true);
    expect(n.steps.map(s => s.family)).toEqual(style.curated!.steps.map(c => c.family));
    expect(isCurated(style, { island: "home", waves: 20 })).toBe(false);
    expect(isCurated(style, { island: "fox", waves: 10 })).toBe(false);
    const g = newGame(11, { ...TUNING, map: { ...TUNING.map, islandAreas: 10, island: "home" } } as typeof TUNING); // (the game's own map: the home island; the tests' is the radius map)
    expect(g.map.island?.kind).toBe("home");
    expect(g.musicSet?.curated).toBe(true);
    expect(g.musicSet?.waves).toBe(10);
    expect(g.beat.segs.length).toBe(1); // (the tempo the gameplay's: Ed, "tempo is set by the gameplay")
    for (const a of nightStyle(style, g.musicSet).arc) expect(a.bpm).toBeUndefined();
  });

  it("is the same for the same seed, island and waves, and different for another seed", () => {
    expect(planNight(style, { seed: 12, island: "owl", waves: 30 })).toEqual(planNight(style, { seed: 12, island: "owl", waves: 30 }));
    const a = planNight(style, { seed: 12, island: "owl", waves: 30 }).steps.map(s => s.family).join();
    expect(planNight(style, { seed: 13, island: "owl", waves: 30 }).steps.map(s => s.family).join()).not.toBe(a);
    expect(planNight(style, { seed: 12, island: "fox", waves: 30 }).steps.map(s => s.family).join()).not.toBe(a);
  });

  it("plays: every wave's sections, its lead, singer and bass make notes in its key", () => {
    const n = planNight(style, { seed: 4, island: "home", waves: 64 }), st = nightStyle(style, n);
    expect(nightStyle(style, n)).toBe(st);
    expect(st.arc.length).toBe(65);
    const cue = (w: number): MusicCue => ({ waves: Array.from({ length: w }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 });
    for (let w = 0; w <= 64; w += 3) {
      const plans = [0, 16, 24].map(bar => planBlock(st, cue(w), bar));
      expect(plans[0].arc).toBe(w);
      expect(plans.map(p => p.section)).toEqual([st.arc[w].sections!.land, st.arc[w].sections!.breaks[0], st.arc[w].sections!.breakdown[0]]);
      let notes = 0, sung = 0, bass = 0;
      for (const p of plans) for (let s = 0; s < 8 * 16; s++) for (const e of notesAt(st, p, null, p.start * 16 + s, { seed: 7, siege: 0 })) {
        notes++;
        if (e.part === "sung") { sung++; expect(e.patch).toBe(st.arc[w].vocal); }
        if (st.parts[e.part]?.role === "bass" && st.arc[w].bass) { bass++; expect(e.patch).toBe(st.arc[w].bass); }
        expect(Number.isFinite(e.midi ?? 0)).toBe(true);
      }
      expect(notes, `wave ${w}`).toBeGreaterThan(50);
      if (st.arc[w].vocal === "none") expect(sung).toBe(0);
      expect(bass + sung >= 0).toBe(true);
    }
    expect(MUSIC_STYLE).toBe(styleJson);
  });
});
