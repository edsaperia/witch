import { describe, expect, it } from "vitest";
import { inEffect, LADDER_KNOBS, newLadder, pending, RUNGS, setMode, stepLadder, type LadderState } from "./ladder";

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
    const s = run(newLadder(), 25, LADDER_KNOBS.settle + LADDER_KNOBS.downAfter);
    expect(s.rung).toBe(at("squeeze"));
    expect(inEffect(s, at("squeeze"))).toBe(true);
    // (the load rungs passed over are wanted from the next load, not in effect now)
    expect(inEffect(s, at("density90"))).toBe(false);
  });

  it("doesn't step down on a window or two, nor while settling", () => {
    expect(run(newLadder(), 25, LADDER_KNOBS.settle + LADDER_KNOBS.downAfter - 1).rung).toBe(0);
  });

  it("climbs back slowly when there's room, and only if the rung above fitted last time", () => {
    let s = run(newLadder(), 25, 5); // down to squeeze
    expect(s.rung).toBe(at("squeeze"));
    s = run(s, 8, LADDER_KNOBS.settle + LADDER_KNOBS.upAfter - 1);
    expect(s.rung).toBe(at("squeeze")); // (not yet)
    s = run(s, 8, 1);
    // (up past squeeze; full quality's cost was 25 ms, over the fit, so it stays wanting the load rungs above: nothing live left)
    expect(s.rung).toBe(at("squeeze") - 1);
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
    let s = run(newLadder(), 25, 5);
    expect(pending(s).adds).toEqual([]); // (none built yet: nothing pending)
    // (with the load rungs as if built, as at the next load)
    s = { ...newLadder(at("still")), loaded: at("still") };
    expect(RUNGS.filter((r, i) => r.when === "load" && r.built && inEffect(s, i))).toEqual(RUNGS.filter(r => r.when === "load" && r.built));
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
