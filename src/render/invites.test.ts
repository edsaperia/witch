// Her 💌s in the treehouse (render/invites.ts letterAt; Ed's playtest, 2026-10-25: "When you invite while you're in the treehouse,
// the invites come from a place where the witch isn't"): the oak's rooms are drawn on the Ent's plane, slid with her, so she's drawn
// metres from her place in the rules and 22 m up; a letter leaves her hand where she's drawn, and anywhere else is drawn as it was.
import { describe, expect, it } from "vitest";
import { HAND, letterAt, lobHeight, type HerOffset } from "./invites";

/** A ground with hills: what the heights under a point do to it shouldn't matter. */
const ground = (x: number, z: number) => 5 + 3 * Math.sin(x / 17) + 2 * Math.cos(z / 23);

describe("a 💌 in the treehouse", () => {
  // (in the bedroom, south of the Terrace: drawn 63 m north of the rules' place, her feet 40.7 m up in the world)
  const O: HerOffset = { on: true, x: 0, y: 40.7, z: 63.4 };
  const her = { x: 3145.4, z: 2723.5 }, drawn = { x: her.x + O.x, z: her.z + O.z };

  it("leaves her hand as drawn: over her drawn feet by her hand's height, in the world", () => {
    const [x, y, z] = letterAt(O, her.x, lobHeight(0, 30, 0.4), her.z, ground);
    expect(x).toBeCloseTo(drawn.x);
    expect(z).toBeCloseTo(drawn.z);
    expect(y + ground(x, z)).toBeCloseTo(O.y + HAND); // (the height given is over the ground there: placed() adds it back)
  });

  it("flies on from there as the rules fly it, on the house's floor, never down at the ground 22 m below", () => {
    for (const flown of [0, 5, 12, 29]) {
      const L = { x: her.x + flown * 0.6, z: her.z - flown * 0.8 }, h = lobHeight(flown, 30, 0.4);
      const [x, y, z] = letterAt(O, L.x, h, L.z, ground);
      expect([x - drawn.x, z - drawn.z].map(n => +n.toFixed(6))).toEqual([+(L.x - her.x).toFixed(6), +(L.z - her.z).toFixed(6)]);
      expect(y + ground(x, z)).toBeCloseTo(O.y + h);
      expect(y + ground(x, z)).toBeGreaterThan(O.y - 0.01);
    }
  });

  it("outside the house, is drawn where the rules have it", () => {
    expect(letterAt({ on: false, x: 9, y: 40, z: 9 }, 10, 1.3, 20, ground)).toEqual([10, 1.3, 20]);
    expect(letterAt(undefined, 10, 1.3, 20, ground)).toEqual([10, 1.3, 20]);
  });
});
