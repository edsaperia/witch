import { describe, expect, it } from "vitest";
import { IRIS, atDecksFrom, koIris } from "./koIris";

const ko = { teleportAt: 10, inAt: 11.2 }, at = (u: number) => ko.teleportAt + u * 1.2;

describe("the hat-to-decks iris (Ed, 2026-10-07)", () => {
  it("plays only inside the teleport, with a hat, without reduced motion", () => {
    expect(koIris(ko, at(-0.01), true, false)).toBeNull();
    expect(koIris(ko, at(1), true, false)).toBeNull();
    expect(koIris(ko, at(0.3), false, false)).toBeNull();
    expect(koIris(ko, at(0.3), true, true)).toBeNull();
    expect(koIris(ko, at(0.3), true, false)).not.toBeNull();
  });
  it("closes onto the hat, turns it into a spinning record, cuts with a smear at the midpoint, and opens on her at the decks", () => {
    const L = (u: number) => koIris(ko, at(u), true, false)!;
    expect(L(0).r).toBeCloseTo(IRIS.from); expect(L(0).dark).toBeCloseTo(0); expect(L(0.2).dark).toBeCloseTo(1); expect(L(0).label).toBe(0);
    expect(L(IRIS.close).r).toBeCloseTo(IRIS.brim); expect(L(0.45).r).toBeCloseTo(IRIS.brim * IRIS.record); expect(L(0.45).labelR).toBeCloseTo(IRIS.brim); expect(L(0.45).label).toBeCloseTo(1); expect(L(0.45).on).toBe("hat");
    expect(L(0.5).on).toBe("her"); expect(L(0.5).smear).toBeCloseTo(1); expect(L(0.3).smear).toBe(0); expect(L(0.7).smear).toBe(0);
    expect(L(0.55).move).toBe(0); expect(L(0.9).move).toBe(1); expect(L(0.95).r).toBeGreaterThan(1); expect(L(0.95).label).toBe(0);
    // the record spins up and keeps turning, never backwards
    let last = -1; for (let u = 0; u < 1; u += 0.01) { const s = L(u).spin; expect(s).toBeGreaterThanOrEqual(last); last = s; }
    expect(L(0.55).spin).toBeGreaterThan(0.5);
    // it closes and opens without a jump
    for (let u = 0.01; u < 1; u += 0.01) expect(Math.abs(L(u).r - L(u - 0.01).r)).toBeLessThan(0.1); // (about a frame apart: the open speeds up to its end)
  });
  it("has her at her decks from the cut when it plays, as late in the teleport as before when it doesn't", () => {
    expect(atDecksFrom(ko, true)).toBeCloseTo(at(IRIS.cut));
    expect(atDecksFrom(ko, false)).toBeCloseTo(at(0.75));
  });
});
