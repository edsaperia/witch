// Her hats kept on this browser (app/hatSave.ts; Ed, 2026-10-23: the plain hat hers, every spell hat found).
import { describe, expect, it } from "vitest";
import { HATS_KEY, hatFound, hatsFrom, loadHats } from "./hatSave";

const store = (init: Record<string, string> = {}) => { const m = new Map(Object.entries(init)); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };

describe("her hats (app/hatSave.ts)", () => {
  it("start with none found, keep what she finds, and ignore what isn't a hat to find", () => {
    const s = store();
    expect(loadHats(s)).toEqual([]);
    expect(hatFound("sentry", s)).toEqual(["sentry"]);
    expect(hatFound("sentry", s)).toEqual(["sentry"]);
    expect(hatFound("none", s)).toEqual(["sentry"]);
    expect(loadHats(store({ [HATS_KEY]: '["mine","bogus"]' }))).toEqual(["mine"]);
    expect(loadHats(store({ [HATS_KEY]: "spoilt" }))).toEqual([]);
  });
  it("as this load's tuning: her save, ?hats=all or a list for one load, and a ?hat= worn counted as hers", () => {
    const s = store({ [HATS_KEY]: '["helmet"]' });
    expect(hatsFrom(new URLSearchParams(""), "none", s)).toBe("helmet");
    expect(hatsFrom(new URLSearchParams("hats=all"), "none", s)).toBe("*");
    expect(hatsFrom(new URLSearchParams("hats=lullaby,mine"), "none", s)).toBe("mine,lullaby"); // (in the hats' own order)
    expect(hatsFrom(new URLSearchParams("hat=cyclone"), "cyclone", s)).toBe("helmet,cyclone");
  });
});
