import { describe, expect, it } from "vitest";
import { inEffect, LADDER_KNOBS, loadEffects, newLadder, pending, RUNGS, setMode, stepLadder, type LadderState } from "./ladder";

const at = (id: string) => RUNGS.findIndex(r => r.id === id);
/** `n` one-second windows at `ms` against a 16.7 ms budget. */
const run = (s: LadderState, ms: number, n: number, budget = 16.7) => { for (let i = 0; i < n; i++) s = stepLadder(s, ms, budget); return s; };

describe("the quality ladder", () => {
  it("starts at full quality with nothing in effect", () => {
    const s = newLadder();
    expect(s.rung).toBe(0);
    expect(RUNGS.some((_, i) => inEffect(s, i))).toBe(false);
  });

  it("steps down after a few slow windows, past rungs not built and load rungs, to the next live rung", () => {
    // (settle 2 s, then 3 slow windows)
    const s = run(newLadder(at("farDither")), 25, LADDER_KNOBS.settle + LADDER_KNOBS.downAfter);
    expect(s.rung).toBe(at("squeeze")); // (from the far edge's dither, past density and the blend: load rungs)
    expect(inEffect(s, at("squeeze"))).toBe(true);
    // (the load rungs passed over are wanted from the next load, not in effect now)
    expect(inEffect(s, at("density90"))).toBe(false);
  });

  it("doesn't step down on a window or two, nor while settling", () => {
    expect(run(newLadder(), 25, LADDER_KNOBS.settle + LADDER_KNOBS.downAfter - 1).rung).toBe(0);
  });

  it("climbs back slowly when there's room, and only if the rung above fitted last time", () => {
    let s = run(newLadder(at("squeeze")), 25, 5); // down to still
    expect(s.rung).toBe(at("still"));
    s = run(s, 8, LADDER_KNOBS.settle + LADDER_KNOBS.upAfter);
    expect(s.rung).toBe(at("still")); // (not yet)
    s = run(s, 8, 1);
    // (up past still; squeeze's cost was 25 ms, over the fit, so it isn't tried again: it stays)
    expect(s.rung).toBe(at("still"));
    s = { ...s, cost: s.cost.map(() => NaN) };
    s = run(s, 8, LADDER_KNOBS.upAfter);
    expect(s.rung).toBe(at("squeeze"));
  });

  it("stops climbing for the night after it keeps flipping", () => {
    let s = newLadder(at("still"));
    for (let k = 0; k < 4; k++) { s = run(s, 30, 6); s = { ...s, cost: s.cost.map(() => NaN) }; s = run(s, 5, 14); }
    expect(s.locked).toBe(true);
    const r = s.rung;
    expect(run(s, 5, 30).rung).toBe(r);
  });

  it("goes to the bottom live rung and no further", () => {
    const s = run(newLadder(), 60, 200);
    expect(s.rung).toBe(at("cap30"));
  });

  it("marks load rungs passed over as pending, and drops them when climbing back over", () => {
    // (down from the far edge's dither to the squeeze, over the density and the blend: wanted from the next load, not in effect now)
    let s = run(newLadder(at("farDither")), 25, LADDER_KNOBS.settle + LADDER_KNOBS.downAfter);
    expect(s.rung).toBe(at("squeeze"));
    expect(pending(s)).toEqual({ adds: [at("density90")], drops: [] }); // (the blend's not built: passed over)
    // (loaded there, as at the next load: in effect, and nothing pending)
    s = { ...newLadder(at("still")), loaded: at("still") };
    expect(inEffect(s, at("density90"))).toBe(true);
    expect(inEffect(s, at("density80"))).toBe(false);
    expect(pending(s)).toEqual({ adds: [], drops: [] });
    // (climbing back over them: dropped from the next load, but in effect till then)
    for (let k = 0; k < 3; k++) s = run(s, 8, LADDER_KNOBS.settle + LADDER_KNOBS.upAfter + 1); // (still, the squeeze, the far edge)
    expect(s.rung).toBeLessThan(at("density90"));
    expect(pending(s).drops).toEqual([at("density90")]);
    expect(inEffect(s, at("density90"))).toBe(true);
  });

  it("makes a night with the load rungs in effect at its rung", () => {
    expect(loadEffects(0)).toEqual({ density: 1, blend: null, px: null });
    expect(loadEffects(at("density90"))).toEqual({ density: 0.9, blend: null, px: null });
    expect(loadEffects(at("still"))).toEqual({ density: 0.9, blend: null, px: null }); // (the blend's not built)
    expect(loadEffects(at("density80"))).toEqual({ density: 0.8, blend: null, px: null }); // (×0.8 in all, not 0.9 × 0.8)
    expect(loadEffects(at("px4"))).toEqual({ density: 0.8, blend: null, px: 4 });
  });

  it("does nothing pinned or off; off is full quality", () => {
    const p = setMode(newLadder(), "pinned", at("still"));
    expect(run(p, 5, 30).rung).toBe(at("still"));
    expect(run(p, 60, 30).rung).toBe(at("still"));
    const o = setMode(newLadder(at("still")), "off");
    expect(o.rung).toBe(0);
    expect(run(o, 60, 30).rung).toBe(0);
  });

  it("ignores windows marked skip and nonsense times", () => {
    let s = newLadder();
    for (let i = 0; i < 30; i++) s = stepLadder(s, 40, 16.7, 1, true);
    s = run(s, NaN, 30);
    expect(s.rung).toBe(0);
  });
});
