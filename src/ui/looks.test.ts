// The creator's looks (ui/looks.ts): every preset and every pleasing random witch is a valid witch by the generator's rules,
// and a harmonious palette keeps its roles (a dark hat so the band shows, every colour in range).
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { LOOKS, SCHEMES, harmonyPalette, lookGenome, pleasingWitch } from "./looks";

const problems = (g: unknown) => (Art.witchGenomeProblems as (g: unknown) => string[])(g);
const rng = (seed: number) => { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; };

describe("the creator's looks", () => {
  it("has a handful of presets, each a valid witch, none alike", () => {
    expect(LOOKS.length).toBeGreaterThanOrEqual(5);
    const seen = new Set<string>();
    for (const L of LOOKS) { const g = lookGenome(L.id); expect(problems(g), L.id).toEqual([]); seen.add(JSON.stringify(g)); }
    expect(seen.size).toBe(LOOKS.length);
  });
  it("randomises pleasing witches within the generator's limits", () => {
    for (let s = 1; s < 40; s++) expect(problems(pleasingWitch(s)), `seed ${s}`).toEqual([]);
  });
  it("keeps a harmonious palette's roles in every scheme", () => {
    for (const scheme of SCHEMES) for (let s = 1; s < 30; s++) {
      const p = harmonyPalette(rng(s), scheme);
      for (const [k, c] of Object.entries(p)) expect(c.every(v => v >= 0 && v <= 1), `${scheme} ${k}`).toBe(true);
      expect(p.hat[2]).toBeLessThan(p.jacket[2]); // the hat dark, so its glowing band shows
      expect(p.top[1]).toBeLessThan(.2);           // the top a light near-neutral
    }
  });
});
