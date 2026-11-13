// The Terrace as one with the house's rooms (render/terraceCut.ts; Ed, 2026-11-12: "this isn't required anymore since the treehouse
// is treated as one area"): walking from a room onto the Terrace and back changes neither the house's slide and the camera's
// following of her (houseSlideShare) nor the mood's area (houseMoodArea); ?terracecut=old keeps the old ramp to compare.
import { describe, expect, it } from "vitest";
import { houseMoodArea, houseSlideShare } from "./terraceCut";

describe("crossing between the Terrace and the house's rooms", () => {
  const across = [-12.5, -6, -1, -0.01, 0, 0.5, 1.5, 2.99, 3, 4, 30, 75]; // (m past the Terrace's ring: inside it, the 3 m band, the rooms)
  it("keeps the house's slide and the camera's following the same on either side", () => {
    for (const p of across) expect(houseSlideShare(p, 0, 0, false)).toBe(1);
  });
  it("still eases them with her rising and her getting up from the decks' seat", () => {
    expect(houseSlideShare(0, 1, 0, false)).toBe(0);
    expect(houseSlideShare(0, 0.5, 0, false)).toBeCloseTo(0.5);
    expect(houseSlideShare(0, 0, 1, false)).toBe(0);
    expect(houseSlideShare(0, 0, 0.5, false)).toBeCloseTo(0.5);
  });
  it("keeps the mood the house's on the Terrace and in every room", () => {
    for (const area of ["home", "thorn-scrub", "mossy-dell"]) expect(houseMoodArea(true, area, false)).toBe("home");
    expect(houseMoodArea(false, "thorn-scrub", false)).toBe("thorn-scrub");
  });
  it("?terracecut=old: the ramp over the 3 m past the ring and the forest's mood, as before", () => {
    expect(houseSlideShare(-1, 0, 0, true)).toBe(0);
    expect(houseSlideShare(1.5, 0, 0, true)).toBeCloseTo(0.5);
    expect(houseSlideShare(4, 0, 0, true)).toBe(1);
    expect(houseMoodArea(true, "thorn-scrub", true)).toBe("thorn-scrub");
  });
});
