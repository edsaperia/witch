// Where the sea chart puts things (app/chartLayout.ts): home in the middle, each island on its phase's ring near its bearing,
// none overlapping its neighbours.
import { describe, expect, it } from "vitest";
import { BOX, islandAt, ringOf } from "./chartLayout";
import { coastSpec, islandOf, KIND_NAMES, KINDS } from "../rules/rosters";
import { islandCoast } from "../rules/islandShape";
import { TUNING } from "../rules/tuning";
/** An island's outline's furthest reach from its middle, on the chart (art/islands.js islandPath: radius 1 is .48 of the box). */
const reach = (k: string) => Math.max(...islandCoast(coastSpec(islandOf(k)!), TUNING.islands.coast).radii) * 0.48 * BOX;

describe("the sea chart's layout", () => {
  it("puts home in the middle and every island on its ring, within a few degrees of its bearing, clear of its neighbours", () => {
    expect(islandAt("home")).toEqual({ x: 0, y: 0 });
    expect(islandAt("dragon")).toBeNull();
    for (const k of KIND_NAMES) {
      const at = islandAt(k)!, i = islandOf(k)!;
      expect(Math.hypot(at.x, at.y)).toBeCloseTo(ringOf(i.phase), 9);
      const drawn = (Math.atan2(at.x, -at.y) * 180) / Math.PI, d = Math.abs(((drawn - KINDS[k].bearing) % 360 + 540) % 360 - 180);
      expect(d, k).toBeLessThan(15);
      expect(Math.hypot(at.x, at.y) + reach(k), k).toBeLessThan(1); // (inside the disc)
    }
    for (const a of KIND_NAMES) for (const b of KIND_NAMES) {
      if (a >= b || KINDS[a].phase !== KINDS[b].phase) continue;
      const p = islandAt(a)!, q = islandAt(b)!;
      expect(Math.hypot(p.x - q.x, p.y - q.y), `${a} and ${b}`).toBeGreaterThan((reach(a) + reach(b)) * 0.9); // (their coasts all but clear)
    }
  });
});
