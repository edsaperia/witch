// The sea chart's new islands (Ed, 2026-10-26: the chart didn't show which islands are new): the ones she's found and not been to
// sparkle (ChartIsland fresh, app/chartView.ts build) and the 🧭 points at them one at a time, nearest first (chartPinQueue).
import { describe, expect, it } from "vitest";
import { chartPinQueue } from "./chartView";
import type { ChartIsland } from "../render/chart/seaChart";

const isl = (id: string, x: number, y: number, fresh = false): ChartIsland => ({ id, x, y, phase: 1, radii: [1], sail: true, unknown: false, won: false, fresh, sigil: id });

describe("the sea chart's 🧭", () => {
  const islands = [isl("home", 0, 0), isl("far", 300, 0, true), isl("near", 0, 40, true), isl("seen", 10, 10), isl("mid", -120, 0, true)];
  it("points at the new islands only, nearest the island she's on first", () => {
    expect(chartPinQueue(islands, "home")).toEqual(["near", "mid", "far"]);
    expect(chartPinQueue(islands, "far")).toEqual(["far", "near", "mid"]);
  });
  it("points at nothing when there's nothing new", () => {
    expect(chartPinQueue(islands.map(i => ({ ...i, fresh: false })), "home")).toEqual([]);
  });
});
