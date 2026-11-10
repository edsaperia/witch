// The letters' reach (Ed, 2026-11-09: "it feels like animals move faster than invitations so it's hard to land a hit. And ranges
// feel small"): faster and longer letters, a wider homing reach, and `?invites=old` flying the old ones to A/B.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { OLD_LETTERS, withOldLetters } from "./invites";
import { tuningFromLink } from "../app/linkParams";

describe("the letters' reach", () => {
  it("flies faster and further, homing from further off, with the turn rate and cone unchanged", () => {
    const I = TUNING.invites;
    expect([I.speed, I.range, I.homingRange]).toEqual([45, 42, 14]);
    expect([I.homing, I.homingCone]).toEqual([120, 30]);
    // (outruns her on the ground and animals running in a fight, which the old 31.2 did by less)
    expect(I.speed).toBeGreaterThan(TUNING.groundSpeed);
    // A letter reaches its full range sooner than before though it goes further: 0.93 s, was 1.06 s.
    expect(I.range / I.speed).toBeCloseTo(0.933, 3);
    expect(OLD_LETTERS.range / OLD_LETTERS.speed).toBeCloseTo(1.058, 3);
  });
  it("?invites=old flies the old letters and changes nothing else; other values keep the new ones", () => {
    const old = tuningFromLink(new URLSearchParams("invites=old")).tuning, plain = tuningFromLink(new URLSearchParams()).tuning;
    expect([old.invites.speed, old.invites.range, old.invites.homingRange]).toEqual([31.2, 33, 10]);
    expect(old.invites).toEqual({ ...plain.invites, speed: 31.2, range: 33, homingRange: 10 });
    expect({ ...old, invites: plain.invites }).toEqual(plain);
    expect(old.combatWaiting).toEqual(plain.combatWaiting); // (the waiting distance held in both)
    expect(tuningFromLink(new URLSearchParams("invites=new")).tuning.invites).toEqual(plain.invites);
    expect(withOldLetters(TUNING.invites)).toEqual({ ...TUNING.invites, ...OLD_LETTERS });
    expect(TUNING.invites.speed).toBe(45); // (the file's own object untouched)
  });
});
