import { describe, expect, it } from "vitest";
import { VOICES as voices } from "../platform/audio/voices";
import { AREA_TYPES } from "./map";

const V = voices as unknown as { families: Record<string, Record<string, unknown>>; species: Record<string, { family?: string }> };

describe("creature voices (config/creature-voices.json and each art/creatures/<id>/creature.js voice)", () => {
  it("gives every creature in the game a call family that exists", () => {
    for (const t of AREA_TYPES) {
      const sp = V.species[t.creature];
      expect(sp, t.creature).toBeTruthy();
      expect(V.families[sp.family ?? ""], `${t.creature}'s family ${sp.family}`).toBeTruthy();
    }
  });
  it("names only real families, and keeps its numbers sane", () => {
    for (const [name, sp] of Object.entries(V.species)) expect(V.families[sp.family ?? ""], name).toBeTruthy();
    for (const [name, f] of Object.entries({ ...V.families, ...V.species }) as [string, Record<string, unknown>][]) {
      for (const k of ["pitch", "formants", "glide", "dur", "gap"]) if (k in f) expect(f[k] as number, `${name}.${k}`).toBeGreaterThan(0);
      if ("noise" in f) expect(f.noise as number).toBeLessThanOrEqual(1);
    }
  });
});
