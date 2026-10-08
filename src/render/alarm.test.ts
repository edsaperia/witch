// The soundsystem alarm's 🔇 (render/alarm.ts): drawn in pixels, a speaker and a cross, fitting inside the ring.
import { describe, expect, it } from "vitest";
import { MUTED } from "./alarm";

describe("the alarm's 🔇", () => {
  it("is a pixel speaker (#) and a cross (+), every row as wide, inside the ring's 26 px", () => {
    expect(new Set(MUTED.map(r => r.length)).size).toBe(1);
    expect(MUTED[0].length).toBeLessThanOrEqual(18);
    expect(MUTED.length).toBeLessThanOrEqual(18);
    const all = MUTED.join("");
    expect(all.split("#").length - 1).toBeGreaterThan(30);
    expect(all.split("+").length - 1).toBeGreaterThanOrEqual(8);
    expect(all.replace(/[.#+]/g, "")).toBe("");
  });
});
