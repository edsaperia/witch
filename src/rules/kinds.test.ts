// The kind table (config/kinds.json; Ed, 2026-10-11, docs/backlog/journey.md "Rosters"): every kind of today's area types,
// each with the phase it's introduced in and its island's bearing on the sea chart.
import { describe, expect, it } from "vitest";
import KINDS from "../../config/kinds.json";
import { AREA_TYPES } from "./map";

const kinds = (KINDS as { kinds: Record<string, { phase: number; bearing: number; dir: string }> }).kinds;

describe("the kind table", () => {
  it("has every area type's species once, and no other", () => {
    const species = AREA_TYPES.map(a => a.creature).sort();
    expect(Object.keys(kinds).sort()).toEqual(species);
  });
  it("introduces 10 at home, 10 in phase 1 and 12 in phase 2, each with a bearing 0 to 360", () => {
    const by = [0, 1, 2].map(p => Object.values(kinds).filter(k => k.phase === p).length);
    expect(by).toEqual([10, 10, 12]);
    for (const k of Object.values(kinds)) { expect(k.bearing).toBeGreaterThanOrEqual(0); expect(k.bearing).toBeLessThan(360); }
  });
});
