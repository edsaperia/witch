// Where the sea chart puts things (app/chartLayout.ts): home in the middle, each island on its phase's ring near its bearing,
// none overlapping its neighbours.
import { describe, expect, it } from "vitest";
import { BOX, islandAt, ringOf } from "./chartLayout";
import { islandOf, KIND_NAMES, KINDS } from "../rules/rosters";

describe("the sea chart's layout", () => {
  it("puts home in the middle and every island on its ring, within a few degrees of its bearing, clear of its neighbours", () => {
    expect(islandAt("home")).toEqual({ x: 0, y: 0 });
    expect(islandAt("dragon")).toBeNull();
    for (const k of KIND_NAMES) {
      const at = islandAt(k)!, i = islandOf(k)!;
      expect(Math.hypot(at.x, at.y)).toBeCloseTo(ringOf(i.phase), 9);
      const drawn = (Math.atan2(at.x, -at.y) * 180) / Math.PI, d = Math.abs(((drawn - KINDS[k].bearing) % 360 + 540) % 360 - 180);
      expect(d, k).toBeLessThan(15);
      expect(Math.hypot(at.x, at.y) + BOX / 2).toBeLessThan(1); // (inside the disc)
    }
    for (const a of KIND_NAMES) for (const b of KIND_NAMES) {
      if (a >= b || KINDS[a].phase !== KINDS[b].phase) continue;
      const p = islandAt(a)!, q = islandAt(b)!, size = Math.sqrt(islandOf(a)!.size / 64) * 0.96 * BOX;
      expect(Math.hypot(p.x - q.x, p.y - q.y), `${a} and ${b}`).toBeGreaterThan(size);
    }
  });
});
