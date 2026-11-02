import { describe, expect, it } from "vitest";
import { Hold, holdFill } from "./hold";

// (Ed, 2026-11-02: "probably a 🗑️ next to each save file, hold to delete")
describe("hold to confirm", () => {
  const rig = (ms: number, reduced = false) => {
    let now = 0, frame: (() => void) | null = null;
    const fills: number[] = [], done: number[] = [];
    const hold = new Hold(ms, f => fills.push(f), () => done.push(now), () => now, () => reduced, f => { frame = f; return 1; }, () => { frame = null; });
    const at = (t: number) => { now = t; const f = frame; frame = null; f?.(); };
    return { hold, fills, done, at };
  };
  it("acts once held its full time, with the fill rising", () => {
    const { hold, fills, done, at } = rig(1200);
    hold.start(); at(300); at(600); hold.start(); at(1199);
    expect(done).toEqual([]); expect(fills.slice(0, 4)).toEqual([0, 0.25, 0.5, 1199 / 1200]);
    at(1200); expect(done).toEqual([1200]); expect(hold.held).toBe(false);
    at(5000); expect(done).toHaveLength(1);
  });
  it("let go sooner, nothing happens and the fill empties; a new press starts from nothing", () => {
    const { hold, fills, done, at } = rig(1500);
    hold.start(); at(1400); hold.cancel(); at(1600);
    expect(done).toEqual([]); expect(fills.at(-1)).toBe(0);
    hold.start(); at(2000); expect(done).toEqual([]); at(1600 + 1500); expect(done).toHaveLength(1);
  });
  it("with reduced motion the fill steps in quarters", () => {
    expect([0.1, 0.3, 0.74, 0.99].map(p => holdFill(p, true))).toEqual([0, 0.25, 0.5, 0.75]);
    expect(holdFill(0.3, false)).toBe(0.3); expect(holdFill(2, false)).toBe(1);
    const { hold, fills, at } = rig(1000, true);
    hold.start(); at(600); expect(fills.at(-1)).toBe(0.5);
  });
});
