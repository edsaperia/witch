import { describe, expect, it } from "vitest";
import { stepTo } from "./chartNav";

describe("the sea chart's arrow keys (chartNav)", () => {
  const pts = [{ id: "home", x: 0, y: 0 }, { id: "n", x: 0.02, y: -0.3 }, { id: "far-n", x: 0, y: -0.6 }, { id: "e", x: 0.3, y: 0.05 }, { id: "ne", x: 0.25, y: -0.25 }];
  it("steps to the nearest island that way, north up the screen", () => {
    expect(stepTo(pts, "home", 0, -1)).toBe("n");
    expect(stepTo(pts, "home", 1, 0)).toBe("e");
    expect(stepTo(pts, "n", 0, -1)).toBe("far-n");
  });
  it("prefers the one straight ahead over a nearer one off to the side, and finds none where there's none", () => {
    expect(stepTo([{ id: "a", x: 0, y: 0 }, { id: "side", x: 0.2, y: -0.25 }, { id: "ahead", x: 0, y: -0.33 }], "a", 0, -1)).toBe("ahead");
    expect(stepTo(pts, "home", -1, 0)).toBeNull();
    expect(stepTo(pts, "nowhere", 0, -1)).toBeNull();
  });
});
