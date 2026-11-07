// The creator's looks (ui/looks.ts): every pleasing random witch (Randomise; the preset looks went, Ed 2026-10-08) is a valid witch by the generator's rules,
// and a harmonious palette keeps its roles (a dark hat so the band shows, every colour in range).
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { HUMAN_SKINS } from "../../art/skinTones.js";
import { SCHEMES, harmonyPalette, pleasingWitch } from "./looks";

const problems = (g: unknown) => (Art.witchGenomeProblems as (g: unknown) => string[])(g);
const rng = (seed: number) => { let a = seed >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; };

describe("the creator's looks", () => {
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
  // Ed, 2026-11-07: "skin tone range plus some fantasy tones": a random witch (Randomise, the generator, a party witch) is one of
  // the Monk scale's ten human tones, never a fantasy one (those are the dressing table's: art/skinTones.js)
  it("gives every random witch one of the ten human skin tones, and over many seeds most of them", () => {
    const human = HUMAN_SKINS.map(c => c.join()), seen = { looks: new Set<string>(), gen: new Set<string>(), party: new Set<string>() };
    for (let s = 1; s < 200; s++) {
      seen.looks.add(harmonyPalette(rng(s)).skin.join());
      seen.gen.add(((Art.witchGenome as (s: number) => { palette: Record<string, number[]> })(s)).palette.skin.join());
      seen.party.add(((Art.partyWitch as (s: number, o?: object) => { outfit: Record<string, number[]> })(s, { outfit: "goth" })).outfit.skin.join());
    }
    for (const [who, set] of Object.entries(seen)) { for (const c of set) expect(human, who).toContain(c); expect(set.size, who).toBeGreaterThanOrEqual(8); }
  });
});
