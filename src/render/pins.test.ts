// A pin's target as drawn (render/pins.ts pinSpot): a world point as it is; a house object on the house's floor, and in the house
// moved as she is (View.herOffset), so a pin over the wardrobe sits on the wardrobe as drawn (Ed, 2026-10-26).
import { describe, expect, it } from "vitest";
import { pinSpot } from "./pins";
import { generateMap } from "../rules/map";
import { TUNING } from "../rules/tuning";
import { HOUSE_ROOMS, objectWorld } from "../rules/houseRooms";
import { deckOf } from "../rules/treehouse";

describe("a pin's target as drawn", () => {
  const map = generateMap(123, TUNING), flat = () => 0, off = { on: false, x: 0, y: 0, z: 0 };
  const o = HOUSE_ROOMS.objects.find(q => q.id === "wardrobe")!, deck = deckOf(map, TUNING)!, at = objectWorld(o, deck);
  it("a world point as it is, its top its height", () => {
    expect(pinSpot({ x: 10, z: 20, top: 2 }, map, TUNING, off, flat)).toEqual({ x: 10, z: 20, top: 2 });
  });
  it("a house object on the house's floor, its own height over it, while she's outside", () => {
    expect(pinSpot({ object: "wardrobe" }, map, TUNING, off, flat)).toEqual({ x: at.x, z: at.z, top: o.h + deck.h });
  });
  it("in the house, moved as she's drawn: slid with her, its top over her drawn floor", () => {
    const her = { on: true, x: 3, y: 30, z: -40 };
    const s = pinSpot({ object: "wardrobe" }, map, TUNING, her, flat)!;
    expect(s.x).toBeCloseTo(at.x + 3, 9); expect(s.z).toBeCloseTo(at.z - 40, 9); expect(s.top).toBeCloseTo(30 + o.h, 9);
  });
  it("nothing for an object the house hasn't", () => expect(pinSpot({ object: "no-such-thing" }, map, TUNING, off, flat)).toBeNull());
});
