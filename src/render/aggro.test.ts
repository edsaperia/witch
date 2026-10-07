import { describe, expect, it } from "vitest";
import { aggroAmount, aggroGlow, readAggroGlow } from "./aggro";

describe("a wild area's rising aggro (Ed, 2026-10-07)", () => {
  it("rises from nothing as they notice her to full as they attack, more in a dangerous area", () => {
    expect(aggroAmount(0, 1)).toBe(0);
    expect(aggroAmount(1, 1)).toBeCloseTo(1);
    expect(aggroAmount(1, 0)).toBeCloseTo(0.4);
    expect(aggroAmount(0.5, 1)).toBeGreaterThan(aggroAmount(0.5, 0.2));
    let last = -1; for (let k = 0; k <= 1; k += 0.05) { const a = aggroAmount(k, 0.6); expect(a).toBeGreaterThanOrEqual(last); last = a; }
  });
  it("rides in the glow between a blink (-1) and a sleeping legend (under -1.5), and reads back", () => {
    for (const a of [0, 0.3, 0.7, 1]) { const g = aggroGlow(a); expect(g).toBeLessThan(-1.02); expect(g).toBeGreaterThan(-1.5); expect(readAggroGlow(g)).toBeCloseTo(a); }
    expect(readAggroGlow(-1)).toBeNull(); expect(readAggroGlow(-2)).toBeNull(); expect(readAggroGlow(0.5)).toBeNull();
  });
});
