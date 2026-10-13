import { describe, expect, it } from "vitest";
import { trunkCut } from "./trunkCut";

// rows of pixel counts, top to bottom, of a frame 10 rows high
const rows = (n: number, from: number, to: number, per = 4) => Array.from({ length: n }, (_, y) => (y >= from && y <= to ? per : 0));

describe("trunkCut", () => {
  it("cuts where the crown's share of pixels lies above, when the trunk reaches that high", () => {
    expect(trunkCut(rows(10, 0, 3), rows(10, 2, 9), 0.85)).toBe(4 / 10);
  });
  it("never cuts above the trunk's own top, so its fade ends on the trunk (Ed, 2026-10-13)", () => {
    // the crown's bulk ends at row 3, the trunk only starts at row 6: the old cut (row 4) faded over empty rows 4 and 5
    expect(trunkCut(rows(10, 0, 3), rows(10, 6, 9), 0.85)).toBe(6 / 10);
  });
  it("is undefined with no crown", () => {
    expect(trunkCut(rows(10, 0, -1), rows(10, 6, 9), 0.85)).toBeUndefined();
  });
});
