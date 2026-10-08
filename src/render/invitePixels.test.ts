// The 💌 drawn again in art pixels as it spins and lies flat (render/invites.ts turnedFrom; Ed, round 14: "Invitations should be pixellated").
import { describe, expect, it } from "vitest";
import { turnedFrom } from "./invites";

describe("a pixel emoji turned and scaled, nearest pixel", () => {
  const n = 9;
  it("is the sprite itself, pixel for pixel, unturned at full size", () => {
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) expect(turnedFrom(i, j, n, n, n, 1, 0, 1, 1)).toEqual([i, j]);
  });
  it("turns a quarter clockwise on the screen, as CSS's rotate does", () => {
    // Its top row comes round to the right-hand column.
    for (let i = 0; i < n; i++) expect(turnedFrom(n - 1, i, n, n, n, 0, 1, 1, 1)).toEqual([i, 0]);
  });
  it("lies flat by taking every other row at half height, never blending two", () => {
    for (let j = 0; j < 5; j++) { const p = turnedFrom(4, j, n, 5, n, 1, 0, 1, 0.5)!; expect(Number.isInteger(p[0]) && Number.isInteger(p[1])).toBe(true); expect(p[1]).toBe(Math.floor((j + 0.5 - 2.5) * 2 + 4.5)); }
  });
  it("leaves the corners a turned sprite doesn't reach empty", () => {
    const c = Math.cos(Math.PI / 4), s = Math.sin(Math.PI / 4), W = Math.round(2 * c * n);
    expect(turnedFrom(0, 0, W, W, n, c, s, 1, 1)).toBeNull();
  });
});
