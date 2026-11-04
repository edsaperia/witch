// Where the sea chart puts things (app/chartLayout.ts): home in the middle, the islands packed over the disc by the archipelago
// (rules/archipelago.ts), each roughly at its bearing and its phase's distance, each in its own patch; and the rings they sat on
// before (ringAt), each on its phase's ring near its bearing, none overlapping its neighbours.
import { describe, expect, it } from "vitest";
import { BOX, islandAt, ringAt, ringOf } from "./chartLayout";
import { worldOf } from "../rules/rosters";
import { patchAt } from "../rules/archipelago";
import { coastSpec, islandOf, KIND_NAMES, KINDS } from "../rules/rosters";
import { islandCoast } from "../rules/islandShape";
import { TUNING } from "../rules/tuning";
/** An island's outline's furthest reach from its middle, on the chart (art/islands.js islandPath: radius 1 is .48 of the box). */
const reach = (k: string) => Math.max(...islandCoast(coastSpec(islandOf(k)!), TUNING.islands.coast).radii) * 0.48 * BOX;

describe("the sea chart's layout", () => {
  it("keeps each chart island inside the disc and outside every other island's patch", () => {
    for (const world of [0, 1, 2]) {
      expect(islandAt("home", world)).toEqual({ x: 0, y: 0 });
      expect(islandAt("dragon", world)).toBeNull();
      const W = worldOf(world);
      for (const k of KIND_NAMES) {
        const at = islandAt(k, world)!, d = Math.hypot(at.x, at.y);
        expect(d, k).toBeLessThan(1);
      }
      // its own patch: every island's middle is in none of the others'
      for (const [a, pa] of W.islands) for (const [b, pb] of W.islands) {
        if (a === b) continue;
        const dx = (pa.x - pb.x) * W.metres, dz = (pa.y - pb.y) * W.metres;
        expect(Math.hypot(dx, dz), `${a} in ${b}'s patch`).toBeGreaterThan(patchAt(pb.patch, Math.atan2(dz, dx)));
      }
      // U1 reports original bearing/radius/quadrant distributions for these same three worlds.
    }
  });

  it("kept the rings it had (ringAt): home in the middle and every island on its ring, within a few degrees of its bearing, clear of its neighbours", () => {
    expect(ringAt("home")).toEqual({ x: 0, y: 0 });
    expect(ringAt("dragon")).toBeNull();
    for (const k of KIND_NAMES) {
      const at = ringAt(k)!, i = islandOf(k)!;
      expect(Math.hypot(at.x, at.y)).toBeCloseTo(ringOf(i.phase), 9);
      const drawn = (Math.atan2(at.x, -at.y) * 180) / Math.PI, d = Math.abs(((drawn - KINDS[k].bearing) % 360 + 540) % 360 - 180);
      expect(d, k).toBeLessThan(15);
      expect(Math.hypot(at.x, at.y) + reach(k), k).toBeLessThan(1); // (inside the disc)
    }
    for (const a of KIND_NAMES) for (const b of KIND_NAMES) {
      if (a >= b || KINDS[a].phase !== KINDS[b].phase) continue;
      const p = ringAt(a)!, q = ringAt(b)!;
      expect(Math.hypot(p.x - q.x, p.y - q.y), `${a} and ${b}`).toBeGreaterThan((reach(a) + reach(b)) * 0.9); // (their coasts all but clear)
    }
  });
});
