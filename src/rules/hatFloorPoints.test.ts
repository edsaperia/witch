import { describe, expect, it } from "vitest";
import { reconcileHatPoints, spawnAtLowestEmpty, type HatFloorPointsState } from "./hatFloorPoints";

describe("ordered hat spawn occupancy", () => {
  it("uses the lowest empty numbered point, independent of spell order, skipping occupied points", () => {
    const s: HatFloorPointsState = { hats: ["lullaby", "", "healing"] };
    expect(spawnAtLowestEmpty(s, "mine", 4)).toBe(1);
    expect(spawnAtLowestEmpty(s, "dowsing", 4)).toBe(3);
    expect(s.hats).toEqual(["lullaby", "mine", "healing", "dowsing"]);
  });
  it("retains overflow on a full floor and fills a vacated point without duplicating hats", () => {
    const s: HatFloorPointsState = { hats: ["a", "b"] };
    expect(spawnAtLowestEmpty(s, "c", 2)).toBeNull(); expect(spawnAtLowestEmpty(s, "c", 2)).toBeNull();
    expect(s.hatOverflow).toEqual(["c"]);
    s.hats![0] = ""; reconcileHatPoints(s, 2);
    expect(s.hats).toEqual(["c", "b"]); expect(s.hatOverflow).toEqual([]);
  });
  it("skips points occupied by actual dropped hats, then reuses them after pickup", () => {
    const s: HatFloorPointsState = { hats: ["", ""], hatReserved: [0] };
    expect(spawnAtLowestEmpty(s, "found", 2)).toBe(1);
    expect(spawnAtLowestEmpty(s, "returned", 2)).toBeNull();
    s.hatReserved = []; reconcileHatPoints(s, 2);
    expect(s.hats).toEqual(["returned", "found"]);
  });
  it("loads legacy and new JSON saves, retains physical indices and gaps, and supports returned hats", () => {
    const legacy: HatFloorPointsState = JSON.parse('{"hats":["","old","","last"]}');
    reconcileHatPoints(legacy, 4); expect(legacy.hats).toEqual(["", "old", "", "last"]);
    const loaded: HatFloorPointsState = JSON.parse(JSON.stringify(legacy));
    expect(spawnAtLowestEmpty(loaded, "returned", 4)).toBe(0);
    expect(loaded.hats).toEqual(["returned", "old", "", "last"]);
    expect(spawnAtLowestEmpty(loaded, "old", 4)).toBe(1);
  });
  it("never loses hats when capacity shrinks or grows, and excludes hats worn or lying elsewhere", () => {
    const s: HatFloorPointsState = { hats: ["worn", "a", "b", "b", "away", "c"] };
    reconcileHatPoints(s, 2, new Set(["worn", "away"]));
    expect(s.hats).toEqual(["b", "a"]); expect(s.hatOverflow).toEqual(["c"]);
    reconcileHatPoints(s, 4); expect(s.hats).toEqual(["b", "a", "c", ""]);
    expect([...s.hats!, ...s.hatOverflow!].filter(Boolean).sort()).toEqual(["a", "b", "c"]);
  });
});
