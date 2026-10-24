// The hats lying on the treehouse's hats' floor are drawn where they can be seen (Golf, 2026-10-24: they didn't show; render/houseRooms.ts).
// The rooms draw with no depth, in renderOrder: the hats were drawn with the floors, so their own piece of furniture, the rug, went
// over them; and the floor's label lay across their row. Wherever the house puts the hats' floor (front or back of the hub, near or
// far), the hats come after every piece of furniture of their half that could be their rug, before that half's near rails, and the
// label above them.
import { describe, expect, it } from "vitest";
import { HAT_TALL, ROOMS_ORDER, furnitureOrder, hatsOrder, tagHeight } from "./houseRooms";

describe("the hats on the hats' floor", () => {
  const spots = [-60, -30, -10, -3.5, -2.9, 0, 4, 12, 40, 90]; // (plan metres south of the hub: behind it and in front)
  it("draw after their own rug, wherever it stands, and before their half's near rails", () => {
    for (const dz of spots) {
      const rug = furnitureOrder(dz), hats = hatsOrder(dz, rug), behind = dz < -3;
      expect(hats, `dz ${dz}`).toBeGreaterThan(rug);
      expect(hats, `dz ${dz}`).toBeLessThan(behind ? ROOMS_ORDER.backNear : ROOMS_ORDER.frontNear);
      expect(hats, `dz ${dz}`).toBeGreaterThan(behind ? ROOMS_ORDER.back : ROOMS_ORDER.front); // (over the floors)
    }
  });
  it("with the rug not baked yet, still after any furniture of their half (and before its near rails)", () => {
    for (const dz of spots) {
      const hats = hatsOrder(dz, null), behind = dz < -3;
      for (const other of spots.filter(o => (o < -3) === behind)) expect(hats, `dz ${dz} over a piece at ${other}`).toBeGreaterThan(furnitureOrder(other));
      expect(hats).toBeLessThan(behind ? ROOMS_ORDER.backNear : ROOMS_ORDER.frontNear);
    }
  });
  it("have their label above them, not across their row", () => {
    expect(tagHeight("hats")).toBeGreaterThan(HAT_TALL);
    expect(tagHeight("pile")).toBe(1.6);
    expect(tagHeight("creator")).toBe(0.5);
  });
});
