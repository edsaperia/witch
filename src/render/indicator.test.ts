import { describe, expect, it } from "vitest";
import { arrowPixels, screenAngle } from "./indicator";

describe("the next-stone cue's arrow (Ed, v183: it pointed the wrong way)", () => {
  // Where the stone lies from the middle of the view, in the view's own terms (x right, y up):
  // the four corners and the four edge midpoints.
  const dirs: [number, number][] = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
  for (const [dx, dy] of dirs) it(`points toward a stone at (${dx}, ${dy})`, () => {
    const N = 40, px = arrowPixels(screenAngle(dx, dy), N, 15, 20, 3.5);
    expect(px.length).toBeGreaterThan(8);
    // Its tip (the pixel farthest out) on the side facing the stone: canvas y runs down, so up the view is negative y.
    const tip = px.reduce((b, p) => (Math.hypot(p[0] + 0.5 - N / 2, p[1] + 0.5 - N / 2) > Math.hypot(b[0] + 0.5 - N / 2, b[1] + 0.5 - N / 2) ? p : b));
    const tx = tip[0] + 0.5 - N / 2, ty = tip[1] + 0.5 - N / 2;
    if (dx) expect(Math.sign(tx)).toBe(Math.sign(dx)); else expect(Math.abs(tx)).toBeLessThan(2);
    if (dy) expect(Math.sign(ty)).toBe(-Math.sign(dy)); else expect(Math.abs(ty)).toBeLessThan(2);
  });
});
