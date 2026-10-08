import { describe, expect, it } from "vitest";
import { SLASH_H, SLASH_W, paintSlashes, slashPixels, slashState } from "./slashes";

// Her health as claw slashes (Ed, 2026-10-08): one per hit, the newest cutting in and draining as it heals.
const lit = (st: Parameters<typeof paintSlashes>[1]) => { const b = new Uint8ClampedArray(SLASH_W * SLASH_H * 4); paintSlashes(b, st); let n = 0; for (let i = 3; i < b.length; i += 4) if (b[i]) n++; return n; };

describe("the claw slashes", () => {
  it("are three torn strokes, the first longest, each inside the canvas and apart from the others", () => {
    const px = slashPixels();
    expect(px).toHaveLength(3);
    expect(px[0].length).toBeGreaterThan(px[1].length);
    expect(px[1].length).toBeGreaterThan(px[2].length);
    const seen = new Set<number>();
    for (const s of px) for (const p of s) {
      expect(p.x >= 0 && p.x < SLASH_W && p.y >= 0 && p.y < SLASH_H).toBe(true);
      expect(seen.has(p.y * SLASH_W + p.x)).toBe(false); seen.add(p.y * SLASH_W + p.x);
    }
    for (const s of px) expect(new Set(s.map(p => p.tone)).size).toBe(3); // (a hot core, the red, a torn dark edge)
  });
  it("shows one slash per hit taken, none while she's whole", () => {
    const full = { cut: 1, flash: 0, drained: 0 };
    expect(lit({ count: 0, ...full })).toBe(0);
    const one = lit({ count: 1, ...full }), two = lit({ count: 2, ...full }), three = lit({ count: 3, ...full });
    expect(one).toBeGreaterThan(20); expect(two).toBeGreaterThan(one); expect(three).toBeGreaterThan(two);
    expect(slashState({ hp: 3, repairAt: Infinity, hurtAt: -Infinity }, 3, 8, 5).count).toBe(0);
    expect(slashState({ hp: 1, repairAt: 20, hurtAt: 10 }, 3, 8, 15).count).toBe(2);
  });
  it("cuts the newest in with a flash, then drains it from its upper tip in step with the repair", () => {
    const h = { hp: 2, repairAt: 18, hurtAt: 10 }, T = 8;
    const a = slashState(h, 3, T, 10.03), b = slashState(h, 3, T, 11), c = slashState(h, 3, T, 14), d = slashState(h, 3, T, 17.9);
    expect(a.cut).toBeLessThan(1); expect(a.flash).toBeGreaterThan(0);
    expect(b.cut).toBe(1); expect(b.flash).toBe(0);
    expect(c.drained).toBeCloseTo(0.5, 2);
    expect(lit(d)).toBeLessThan(lit(c)); expect(lit(c)).toBeLessThan(lit(b));
  });
});
