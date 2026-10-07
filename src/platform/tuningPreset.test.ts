import { describe, expect, it } from "vitest";
import tuning from "../../config/tuning.json";
import combat from "../../config/combat.json";
import states from "../../config/states.json";
import preOvernight from "../../config/presets/pre-overnight.json";
import { applyPreset, TUNING_PRESET } from "./tuningPreset";

// (on copies: the tests share their modules, so the config files themselves are never touched)
const copy = <T>(o: T): T => JSON.parse(JSON.stringify(o));

describe("?tuning=pre-overnight: the old balance written over the config as it loads", () => {
  it("is off without the flag", () => {
    expect(TUNING_PRESET).toBeNull();
  });

  it("writes the preset's numbers over the configs, keeping what it doesn't hold", () => {
    const into = { tuning: copy(tuning), combat: copy(combat), states: copy(states) };
    expect(applyPreset("pre-overnight", into)).toBe(true);
    const P = preOvernight as unknown as { tuning: { population: unknown; invites: { hits: number[] }; party: { interval: number } }; combat: { levels: unknown } };
    expect(into.tuning.population).toMatchObject(P.tuning.population as object); // (keeping what it doesn't hold: population.byRoute, 2026-10-07)
    expect(into.tuning.invites.hits).toEqual(P.tuning.invites.hits);
    expect(into.tuning.party.interval).toBe(P.tuning.party.interval);
    expect(into.combat.levels).toEqual(P.combat.levels);
    expect(into.combat.levels).not.toEqual(combat.levels); // (the level gap: the old numbers differ)
    expect(into.tuning.camera).toEqual(tuning.camera); // (what the preset doesn't hold is the file's own)
    expect(applyPreset("no-such-preset", into)).toBe(false);
  });
});
