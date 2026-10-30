import { describe, expect, it } from "vitest";
import { partySheetFrame, partySheetKey } from "./partySheet";
import { artCacheKey } from "./artCache";
import type { ArtJob } from "./artBuild";

describe("party sheet identity", () => {
  const gear = { collar: [1, 0, 1], hat: 0, glasses: "round", shoes: "boots" };
  const job = { kind: "party", id: "creature-123", species: "fox", level: 2, gear, style: {} } as Extract<ArtJob, { kind: "party" }>;
  it("shares the cache across creature ids but separates species, outfit, age and style", () => {
    const key = artCacheKey(job, "style", { party: "art" });
    expect(key).not.toBeNull(); expect(key).not.toContain("creature-123");
    expect(artCacheKey({ ...job, id: "another" }, "style", { party: "art" })).toBe(key);
    expect(partySheetKey("fox", 2, { ...gear })).toBe(partySheetKey("fox", 2, gear));
    for (const change of [{ species: "wolf" }, { level: 1 }, ...[{ collar: null }, { hat: 1 }, { glasses: null }, { shoes: null }].map(g => ({ gear: { ...gear, ...g } }))])
      expect(artCacheKey({ ...job, ...change } as ArtJob, "style", { party: "art" })).not.toBe(key);
    expect(artCacheKey(job, "new-style", { party: "art" })).not.toBe(key);
    expect(artCacheKey(job, "style", { party: "new-art" })).not.toBe(key);
    for (const level of [-1, 4, NaN, 1.5]) expect(artCacheKey({ ...job, level } as ArtJob, "style", { party: "art" })).toBeNull();
  });
  it("keeps both facings and wraps all walk-cycle lengths within the single-age sheet", () => {
    for (const n of [2, 3, 4, 6]) for (const away of [false, true]) for (let f = -n; f <= n * 3; f++) {
      const frame = partySheetFrame(f, away, n);
      expect(frame).toBeGreaterThanOrEqual(away ? n : 0);
      expect(frame).toBeLessThan(away ? n * 2 : n);
      expect(partySheetFrame(f + n, away, n)).toBe(frame);
    }
  });
});
