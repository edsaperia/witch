import { describe, expect, it } from "vitest";
import { SPIN, spinAt, spinFacing, spinStep, type Spin } from "./spin";

/** Steps a spin through time, a 60th of a second at a time, the look ready from `readyAt` on: when it ends. */
function endOf(s: Spin, readyAt: number, steps: number[] = []): number {
  let cur: Spin | null = s;
  for (let t = s.from; t < 10; t += 1 / 60) {
    if (steps.some(x => Math.abs(x - t) < 1 / 120)) cur = spinStep(cur, t);
    cur = cur && spinAt(cur, t, t >= readyAt);
    if (!cur) return t;
  }
  return Infinity;
}

describe("her twirl at a dressing station", () => {
  it("lasts at least a beat, ending facing us at a turn's end", () => {
    const end = endOf(spinStep(null, 0), 0);
    expect(end).toBeGreaterThanOrEqual(SPIN.min - 1e-6);
    expect(spinFacing(end - 1e-3 + 1e-3).heading).toBe("down");
  });
  it("carries on till the new look is in", () => {
    const end = endOf(spinStep(null, 0), 1.3);
    expect(end).toBeGreaterThanOrEqual(1.3);
    expect(end).toBeLessThan(1.3 + SPIN.turn + 0.05);
  });
  it("never past its cap", () => {
    const end = endOf(spinStep(null, 0), Infinity);
    expect(end).toBeLessThan(SPIN.cap + SPIN.turn + 0.05);
  });
  it("another step mid-spin carries the one spin on, not a second", () => {
    const s = spinStep(null, 0), t = spinStep(s, 0.3);
    expect(t.from).toBe(0);
    expect(t.last).toBe(0.3);
    expect(endOf(s, 0, [0.4])).toBeGreaterThanOrEqual(0.4 + SPIN.min - 1e-6);
  });
  it("turns through front, sides and back", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) { const f = spinFacing((i + 0.5) * SPIN.turn / 6); seen.add(`${f.heading}:${f.side}:${f.flip}`); }
    expect(seen.size).toBe(6);
    expect(spinFacing(0).heading).toBe("down");
    expect(spinFacing(SPIN.turn / 2).heading).toBe("up");
  });
});
