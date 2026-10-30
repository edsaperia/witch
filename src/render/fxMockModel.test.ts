import { describe, expect, it } from "vitest";
import { frostPalette, mockEnvelope, mockFrost, mockLightSlots, MOCK_FORMS, MOCK_INTENSITIES } from "./fxMockModel";
describe("stage-zero magic mock", () => {
  it("covers the four forms at three strengths", () => {
    expect(MOCK_FORMS).toEqual(["bolt", "burst", "beam", "aura"]);
    expect(MOCK_INTENSITIES).toEqual([0.25, 0.6, 1]);
  });
  it("eases the blast and lets the tree thaw before the next blast", () => {
    expect(mockEnvelope(0)).toBe(0);
    expect(mockEnvelope(0.175)).toBeCloseTo(0.5);
    expect(mockEnvelope(1)).toBe(1);
    expect(mockEnvelope(3)).toBe(0);
    expect(mockFrost(0)).toBe(0);
    expect(mockFrost(1)).toBe(1);
    expect(mockFrost(5)).toBe(0.5);
    expect(mockFrost(6)).toBe(0);
    expect(mockFrost(9)).toBe(mockFrost(1));
  });
  it("never displaces world lights or exceeds either cap", () => {
    expect(mockLightSlots(12, 20, 14)).toBe(6);
    expect(mockLightSlots(18, 20, 14)).toBe(2);
    expect(mockLightSlots(24, 20, 14)).toBe(0);
  });
  it("keeps the original row and alpha codes in the frost row", () => {
    const p = new Uint8Array(1024); p.set([40, 90, 30, 254], 4);
    const rows = frostPalette(p);
    expect(rows.slice(0, 1024)).toEqual(p);
    expect(rows[1031]).toBe(254);
    expect(rows[1027]).toBe(0);
    expect(rows[1029]).toBeGreaterThan(rows[1028]);
  });
});
