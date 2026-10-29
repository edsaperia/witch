import { describe, expect, it } from "vitest";
import { cheerKind, cheerPose, type CheerPose } from "./cheer";

describe("a creature won over celebrates by its body (Ed, 2026-10-29: render/cheer.ts)", () => {
  it("hoppers jump-spin, four-legged roll over, flyers loop, the rest wiggle", () => {
    expect(["toad", "hare", "penguin"].map(cheerKind)).toEqual(["hop", "hop", "hop"]);
    expect(["wolf", "boar", "elephant"].map(cheerKind)).toEqual(["roll", "roll", "roll"]);
    expect(["bat", "moth", "owl", "raven"].map(cheerKind)).toEqual(["loop", "loop", "loop", "loop"]);
    expect(["snake", "beetle", "hedgehog", "snail"].map(cheerKind)).toEqual(["wiggle", "wiggle", "wiggle", "wiggle"]);
  });
  it("moves within its second and is itself again at either end", () => {
    const P: CheerPose = { y: 0, x: 0, sx: 1, sy: 1, flip: false };
    for (const kind of ["hop", "roll", "loop", "wiggle"] as const) {
      for (const k of [0, 1, 1.5]) expect(cheerPose(kind, k, P)).toEqual({ y: 0, x: 0, sx: 1, sy: 1, flip: false });
      let moved = 0;
      for (let i = 1; i < 20; i++) { const q = cheerPose(kind, i / 20, P); moved = Math.max(moved, Math.abs(q.y) + Math.abs(q.x) + Math.abs(1 - q.sy)); expect([q.x, q.y, q.sx, q.sy].every(Number.isFinite)).toBe(true); }
      expect(moved).toBeGreaterThan(0.1);
    }
    expect([0.4, 0.5, 0.6].some(k => cheerPose("roll", k, P).flip)).toBe(true); // (over on its back)
    expect(cheerPose("loop", 0.5, P).flip).toBe(true); // (upside down at the loop's top)
  });
});
