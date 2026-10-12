// Bubbles' tails point at their speakers' heads (Ed, 2026-10-12): where a creature's head is in its sprite (render/artBuild.ts headPoint).
import { describe, expect, it } from "vitest";
import { headPoint } from "./artBuild";
import * as Art from "../../art/generator.js";
import STYLE from "../../config/style.json";

const M = Art.M as Record<string, number>;
const sprite = (w: number, h: number, put: (x: number, y: number) => number) => Array.from({ length: w * h }, (_, i) => put(i % w, Math.floor(i / w)));

describe("a creature's head in its sprite", () => {
  it("is the middle of its eyes where they show", () => {
    const m = sprite(20, 10, (x, y) => (y >= 2 && x >= 2 && x < 18 ? (y === 3 && (x === 14 || x === 16) ? M.EYE : M.BODY) : 0));
    expect(headPoint(m, 20, 10)).toEqual([15.5, 3.5]);
  });
  it("turned away (no eyes), the middle of its topmost rows", () => {
    const m = sprite(20, 20, (x, y) => (y >= 10 ? M.BODY : y >= 4 && x >= 12 && x < 16 ? M.BODY : 0));
    const [x, y] = headPoint(m, 20, 20)!;
    expect(x).toBeCloseTo(14, 6); // (columns 12 to 15)
    expect(y).toBeGreaterThanOrEqual(4); expect(y).toBeLessThan(8);
  });
  it("nothing drawn, nowhere", () => { expect(headPoint(new Array(9).fill(0), 3, 3)).toBeUndefined(); });
  it("on every species' baked frames, inside the sprite", () => {
    for (const id of ["fox", "heron", "snail", "bat", "stag"]) for (const level of [0, 3]) {
      const sp = Art.critter(id, level, 0, { ...Art.defaultStyle(), ...(STYLE as { style: object }).style }, "towards") as { m: ArrayLike<number>; w: number; h: number };
      const p = headPoint(sp.m, sp.w, sp.h)!;
      expect(p[0]).toBeGreaterThan(0); expect(p[0]).toBeLessThan(sp.w);
      expect(p[1]).toBeGreaterThan(0); expect(p[1]).toBeLessThan(sp.h * 0.75); // (in its upper part)
    }
  });
});
