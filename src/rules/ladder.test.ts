import { describe, expect, it } from "vitest";
import { inEffect, LADDER_KNOBS, loadEffects, newLadder, pending, retryAfter, RUNGS, setMode, stepLadder, type LadderState } from "./ladder";

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

  it("goes to the bottom live rung, then wants px 4 from the next load, and no further", () => {
    const s = run(newLadder(), 60, 200);
    expect(s.rung).toBe(at("px4"));
    expect(inEffect(s, at("cap30"))).toBe(true);
    expect(pending(s).adds).toEqual([at("density90"), at("density80"), at("px4")]);
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
  it("doesn't step down on a spike, a stall or a load that a skip window breaks up", () => {
    const K = LADDER_KNOBS;
    let s = run(newLadder(), 5, K.settle + 1);
    // (two slow windows, a skipped one (a pause, a hidden tab, a hitch over 250 ms), two slow again: never three in a row)
    s = run(s, 30, K.downAfter - 1);
    s = stepLadder(s, 30, 16.7, 1, true);
    s = run(s, 30, K.downAfter - 1);
    expect(s.rung).toBe(0);
    // (the frames just after a skip settle: a load's compiles and uploads aren't counted)
    s = run(s, 5, 5);
    s = stepLadder(s, 30, 16.7, 1, true);
    s = run(s, 30, K.settle);
    expect(s.rung).toBe(0);
    s = run(s, 30, K.downAfter); // (but slow after settling is slow)
    expect(s.rung).toBe(at("farDither"));
  });

  it("climbs back once the room is real, though a spike pushed it down: retried after a while, longer each time it's left", () => {
    const K = LADDER_KNOBS;
    // (a few seconds' spike at the cut-away's soft fade pushes it down to the solid crowns, its cost remembered as 25 ms)
    let s = run(newLadder(at("still")), 25, K.settle + K.downAfter);
    expect(s.rung).toBe(at("hardCut"));
    // (then 4.4 ms of 16.7, as in Ed's playtest: not straight back, as the soft fade didn't fit last time...)
    s = run(s, 4.4, K.settle + K.upAfter + 5);
    expect(s.rung).toBe(at("hardCut"));
    // (...but once its retry's come, it is, and on up to full quality)
    s = run(s, 4.4, K.retry);
    expect(s.rung).toBeLessThan(at("hardCut"));
    s = run(s, 4.4, 4 * (K.settle + K.upAfter + 1));
    expect(s.rung).toBe(0);
    expect(s.locked).toBe(false);
  });

  it("a rung that really doesn't fit is tried again less and less often", () => {
    const K = LADDER_KNOBS;
    let s = newLadder(at("hardCut"));
    s = { ...s, left: s.left.map((_, i) => (i === at("still") ? 1 : 0)) };
    expect(retryAfter(s, at("still"))).toBe(K.retry);
    s = { ...s, left: s.left.map((_, i) => (i === at("still") ? 3 : 0)) };
    expect(retryAfter(s, at("still"))).toBe(4 * K.retry);
    s = { ...s, left: s.left.map((_, i) => (i === at("still") ? 10 : 0)) };
    expect(retryAfter(s, at("still"))).toBe(K.retryMax);
    // (the soft fade costs 20 ms, the solid crowns 10: each retry at it is slow and back down, the waits between longer)
    let t = newLadder(at("still")), ups = 0;
    const T = 1200;
    for (let k = 0; k < T; k++) { const b = t.rung; t = stepLadder(t, t.rung < at("hardCut") ? 20 : 10, 16.7); if (t.rung < b) ups++; }
    expect(t.left[at("still")]).toBe(ups + 1);
    expect(ups).toBeLessThanOrEqual(4); // (60 + 120 + 240 + 480 s: about four tries in 20 minutes, not twenty)
    expect(ups).toBeGreaterThanOrEqual(2);
  });

  it("on frame time (no GPU timer), a frame keeping up with the refresh isn't slow, and only missed frames step down", () => {
    const K = LADDER_KNOBS, ft = (s: LadderState, ms: number, n: number) => { for (let i = 0; i < n; i++) s = stepLadder(s, ms, 16.7, 1, false, K, false); return s; };
    expect(ft(newLadder(), 16.7, 60).rung).toBe(0);
    expect(ft(newLadder(at("hardCut")), 16.7, K.settle + K.upAfter + 1).rung).toBeLessThan(at("hardCut")); // (and climbs while it keeps up)
    expect(ft(newLadder(), 25, K.settle + K.downAfter).rung).toBe(at("farDither"));
  });
});
