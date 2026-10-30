import { describe, expect, it, vi } from "vitest";
import { arrowPixels, screenAngle, StoneIndicator } from "./indicator";

describe("a fully faded pointer", () => {
  it("hides its distance from accessibility as well as sight, then restores it when visible", () => {
    const elements: { style: Record<string, string> }[] = [];
    vi.stubGlobal("document", { createElement: () => {
      const el = { style: {}, getContext: () => ({ createImageData: (w: number, h: number) => ({ data: new Uint8ClampedArray(w * h * 4) }) }) };
      elements.push(el); return el;
    } });
    try {
      const pointer = new StoneIndicator({ append: () => {} } as unknown as HTMLElement);
      pointer.fade(0);
      expect(elements.map(e => e.style.visibility)).toEqual(["hidden", "hidden"]);
      pointer.fade(.5);
      expect(elements.map(e => e.style.visibility)).toEqual(["visible", "visible"]);
      pointer.fade(0);
      expect(elements.map(e => e.style.visibility)).toEqual(["hidden", "hidden"]);
    } finally { vi.unstubAllGlobals(); }
  });
});

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

describe("the edge cues' layout (Ed, v1628: the 🎶 distance drawn twice, \"2018m m\")", () => {
  it("never lets two cues on the edge sit on one another, nudging the later one along the edge", async () => {
    const { edgeLayout } = await import("./indicator");
    edgeLayout.reset();
    const a = edgeLayout.claim(1500, 450, 0, 50), b = edgeLayout.claim(1500, 455, 0, 50), c = edgeLayout.claim(1502, 440, 0, 50);
    expect(a).toEqual({ x: 1500, y: 450 });
    for (const [p, q] of [[a, b], [a, c], [b, c]]) expect(Math.hypot(p.x - q.x, p.y - q.y)).toBeGreaterThanOrEqual(100 - 1e-9);
    expect(Math.abs(b.x - 1500)).toBeLessThan(1e-9); // (along the right edge: up or down it, not off it)
    edgeLayout.reset();
    expect(edgeLayout.claim(1500, 455, 0, 50)).toEqual({ x: 1500, y: 455 }); // (a new frame: nothing placed yet)
    expect(edgeLayout.claim(1500, 455, 0, 50, false)).toEqual({ x: 1500, y: 455 }); // (over its target on screen: not nudged)
  });
});

describe("a pointer near its subject, a map pin (Ed, 2026-10-26: \"it should float above that thing and point downwards\")", () => {
  it("points straight down at it, its tip under the ring", () => {
    const N = 40, px = arrowPixels(Math.PI / 2, N, 15, 20, 3.5);
    const tip = px.reduce((b, p) => (p[1] > b[1] ? p : b));
    expect(Math.abs(tip[0] + 0.5 - N / 2)).toBeLessThan(1);
    expect(tip[1] + 0.5 - N / 2).toBeGreaterThan(15);
  });
  it("sits beside another pin over the same spot, not on it", async () => {
    const { edgeLayout } = await import("./indicator");
    edgeLayout.reset();
    const a = edgeLayout.claim(600, 300, Math.PI / 2, 40), b = edgeLayout.claim(605, 302, Math.PI / 2, 40);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThanOrEqual(80 - 1e-9);
    expect(Math.abs(b.y - 302)).toBeLessThan(1e-9); // (side by side: across, not stacked)
  });
});
