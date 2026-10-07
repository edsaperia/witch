import { describe, expect, it, vi } from "vitest";
import preOvernight from "../../config/presets/pre-overnight.json";

describe("?tuning=pre-overnight: the old balance written over the config as it loads", () => {
  it("leaves the numbers alone without the flag, and plays the preset's with it", async () => {
    vi.resetModules();
    vi.stubGlobal("location", { search: "" });
    await import("./tuningPreset");
    const plain = (await import("../rules/tuning")).TUNING;
    expect(plain.party.interval).toBeGreaterThan(0);

    vi.resetModules();
    vi.stubGlobal("location", { search: "?tuning=pre-overnight" });
    const { TUNING_PRESET } = await import("./tuningPreset");
    expect(TUNING_PRESET).toBe("pre-overnight");
    const { TUNING } = await import("../rules/tuning"), { COMBAT } = await import("../rules/combat");
    const P = preOvernight as unknown as { tuning: { population: unknown; invites: { hits: number[] }; party: { interval: number } }; combat: { levels: unknown } };
    expect(TUNING.population).toEqual(P.tuning.population);
    expect(TUNING.invites.hits).toEqual(P.tuning.invites.hits);
    expect(TUNING.party.interval).toBe(P.tuning.party.interval);
    expect(COMBAT.levels).toEqual(P.combat.levels);
    expect(TUNING.camera).toBeDefined(); // (and what the preset doesn't hold is the file's own)
    vi.unstubAllGlobals();
  });
});
