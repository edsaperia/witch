// The kind table (config/kinds.json; Ed, 2026-10-11, docs/backlog/journey.md "Rosters"): every kind of today's area types,
// each with the phase it's introduced in and its island's bearing on the sea chart.
import { describe, expect, it } from "vitest";
import KINDS from "../../config/kinds.json";
import { AREA_TYPES } from "./map";

const kinds = (KINDS as { kinds: Record<string, { phase: number; bearing: number; dir: string; placeholder?: boolean }> }).kinds;
const real = Object.fromEntries(Object.entries(kinds).filter(([, k]) => !k.placeholder));

describe("the kind table", () => {
  it("has every area type's species once, and no other", () => {
    const species = AREA_TYPES.map(a => a.creature).sort();
    expect(Object.keys(real).sort()).toEqual(species);
  });
  it("introduces 10 at home, 10 in phase 1, 12 in phase 2, then the placeholders' 14 in phase 3 and 18 in phase 4: 64, each with a bearing 0 to 360", () => {
    const by = [0, 1, 2, 3, 4, 5].map(p => Object.values(kinds).filter(k => k.phase === p).length);
    expect(by).toEqual([10, 10, 12, 14, 18, 0]);
    expect(Object.keys(kinds).length).toBe(64);
    for (const [id, k] of Object.entries(kinds)) if (k.placeholder) expect(k.phase, id).toBeGreaterThanOrEqual(3); // (only kinds from phase 3 on are placeholders, designed one by one)
    for (const k of Object.values(kinds)) { expect(k.bearing).toBeGreaterThanOrEqual(0); expect(k.bearing).toBeLessThan(360); }
  });
});
