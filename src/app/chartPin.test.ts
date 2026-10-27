// The sea chart's new islands (Ed, 2026-10-26: the chart didn't show which islands are new): the ones she's found and not been to
// sparkle (ChartIsland fresh, app/chartView.ts build) and each has its own 🧭 (Ed, 2026-10-26: "you see one per unvisited island").
import { describe, expect, it } from "vitest";
import { chartPinIslands } from "./chartView";
import type { ChartIsland } from "../render/chart/seaChart";
import { islandTop, pinFade } from "../render/chart/chartPinPlace";

const isl = (id: string, x: number, y: number, fresh = false): ChartIsland => ({ id, x, y, phase: 1, radii: [1], sail: true, unknown: false, won: false, fresh, sigil: id });

describe("the sea chart's 🧭", () => {
  const islands = [isl("home", 0, 0), isl("far", 300, 0, true), isl("near", 0, 40, true), isl("seen", 10, 10), isl("mid", -120, 0, true)];
  it("one for each new island and no other, nearest the island she's on first", () => {
    expect(chartPinIslands(islands, "home")).toEqual(["near", "mid", "far"]);
    expect(chartPinIslands(islands, "far")).toEqual(["far", "near", "mid"]);
  });
  it("points at nothing when there's nothing new", () => {
    expect(chartPinIslands(islands.map(i => ({ ...i, fresh: false })), "home")).toEqual([]);
  });
});

describe("the chart's 🧭 stands clear of its island and fades while it's chosen (Ed, 2026-10-26)", () => {
  // (a camera looking north and down: further north (-z) is higher on the screen, higher up (y) is higher too)
  const project = (x: number, y: number, z: number) => ({ x: 480 + x * 2, y: 300 + z * 1.5 - y * 2 });
  it("over the island's highest drawn point, not its middle", () => {
    const at = islandTop(project, 10, 4, 0, 30);
    expect(at.x).toBe(500);
    expect(at.y).toBeCloseTo(300 - 30 * 1.5 - 8, 5); // (its far, north edge at its top's height)
    expect(at.y).toBeLessThan(project(10, 4, 0).y);
  });
  it("fades out over about a quarter second while its island's chosen, and back when another is", () => {
    let s = 1;
    for (let i = 0; i < 4; i++) s = pinFade(s, 0, 1 / 60);
    expect(s).toBeLessThan(1); expect(s).toBeGreaterThan(0.3);
    for (let i = 0; i < 60; i++) s = pinFade(s, 0, 1 / 60);
    expect(s).toBe(0);
    for (let i = 0; i < 60; i++) s = pinFade(s, 1, 1 / 60);
    expect(s).toBe(1);
  });
});
