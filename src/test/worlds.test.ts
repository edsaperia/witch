import { expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { SMALL_WORLD_RADIUS, largestShippedWorld, largestWorldTuning, smallWorldTuning } from "./worlds";
import { REAL_KINDS, islandOf } from "../rules/rosters";
import { generateMap } from "../rules/map";

it("shrinks only a cloned test map without mutating shared production/test tuning", () => {
  const original = JSON.stringify(TUNING), t = smallWorldTuning(TUNING, "Event cue timing is independent of world extent.");
  expect(t).not.toBe(TUNING);
  expect(t.map).not.toBe(TUNING.map);
  expect(t.map).toMatchObject({ radius: SMALL_WORLD_RADIUS, islandAreas: 0, island: "", found: [] });
  expect(t.fight).toBe(TUNING.fight);
  expect(JSON.stringify(TUNING)).toBe(original);
});
it("requires an answerable reason rather than silently choosing a small world", () => {
  expect(() => smallWorldTuning(TUNING, " ")).toThrow("one-line reason");
});
it("keeps largest-shipped-world area diversity coverage separate from small logic fixtures", () => {
  // Largest world: area variety and map growth can affect which art is requested and drawn.
  const fixture = largestShippedWorld(), map = generateMap(fixture.seed, largestWorldTuning(TUNING));
  expect(fixture.areas).toBeGreaterThanOrEqual(Math.max(...REAL_KINDS.map(kind => islandOf(kind)!.size)));
  expect(fixture.found).toHaveLength(REAL_KINDS.length);
  expect(map.cells.length).toBeGreaterThanOrEqual(fixture.areas);
  expect(new Set(map.cells.map(([x, z]) => map.typeOf(x, z))).size).toBeGreaterThanOrEqual(fixture.areaKinds);
});
