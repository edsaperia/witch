// The afterparty (Ed, 2026-10-06: "the dance music stops ... We can have nice environmental music and sounds that match
// each area"): every area type has its own night, and the party's over read as the look reads it (render/partyOver.ts).
import { describe, expect, it } from "vitest";
import { AREA_TYPES } from "../../rules/map";
import { partyOverEase } from "../../rules/music";
import { AREA_NIGHTS, nightKind } from "./night";

describe("the afterparty's nights", () => {
  it("every area type has its night named, and a wet one unnamed is a wet night", () => {
    for (const a of AREA_TYPES) expect(AREA_NIGHTS[a.id], a.id).toBeDefined();
    for (const a of AREA_TYPES) if (a.wet) expect(["wet", "stream", "ravine"], a.id).toContain(nightKind(a.id, true));
    expect(nightKind("somewhere-new", true)).toBe("wet");
    expect(nightKind("somewhere-new")).toBe("wood");
    expect(nightKind("home")).toBe("home");
  });

  it("how far the party's over: nothing in a game without it, its own ease, or eased in from its start", () => {
    const at = (time: number, partyOver?: unknown) => ({ clock: { time }, ...(partyOver === undefined ? {} : { partyOver }) });
    expect(partyOverEase(at(100))).toBe(0);
    expect(partyOverEase(at(100, null))).toBe(0);
    expect(partyOverEase(at(100, 0.4))).toBeCloseTo(0.4);
    expect(partyOverEase(at(100, { ease: 2 }))).toBe(1);
    expect(partyOverEase(at(16, { at: 10 }), null, 12)).toBeCloseTo(0.5);
    expect(partyOverEase(at(16), 4, 12)).toBe(1); // (?partyover=4)
    expect(partyOverEase(at(16, { ease: Number.NaN }))).toBe(0);
  });
});
