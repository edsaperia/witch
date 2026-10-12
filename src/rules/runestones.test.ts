import { describe, expect, it } from "vitest";
import { dealRunestones, RUNESTONE_FORMS } from "./runestones";
import * as Art from "../../art/generator.js";

const grid = (n: number) => Array.from({ length: n }, (_, i) => [i % 8, Math.floor(i / 8)] as const);

describe("runestones dealt without repeats (Ed, #716)", () => {
  it("matches the art's number of forms", () => expect(RUNESTONE_FORMS).toBe(Art.RUNESTONE_FORMS));
  it("on a 10-area map, no form repeats", () => {
    for (const seed of [1, 123, 4242]) {
      const forms = [...dealRunestones(grid(10), seed).values()].map(s => s.form);
      expect(new Set(forms).size).toBe(10);
    }
  });
  it("on a 50-area map, each form appears 2 or 3 times", () => {
    for (const seed of [1, 123, 4242]) {
      const count = new Map<number, number>();
      for (const s of dealRunestones(grid(50), seed).values()) count.set(s.form, (count.get(s.form) ?? 0) + 1);
      expect(count.size).toBe(RUNESTONE_FORMS);
      for (const n of count.values()) expect(n === 2 || n === 3).toBe(true);
    }
  });
  it("is the seed's own, and mirrors some", () => {
    const a = [...dealRunestones(grid(20), 1).values()], b = [...dealRunestones(grid(20), 2).values()];
    expect(a.map(s => s.form)).not.toEqual(b.map(s => s.form));
    expect(a.some(s => s.flip) && a.some(s => !s.flip)).toBe(true);
    expect([...dealRunestones(grid(20), 1).values()]).toEqual(a);
  });
});
