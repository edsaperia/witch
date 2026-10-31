// A pin's target as drawn (render/pins.ts pinSpot): a world point as it is; a house object on the house's floor, and in the house
// moved as she is (View.herOffset), so a pin over the wardrobe sits on the wardrobe as drawn (Ed, 2026-10-26).
import { describe, expect, it } from "vitest";
import { pinSpot } from "./pins";
import { drawnTop } from "./houseFurniture";
import { generateMap } from "../rules/map";
import { TUNING as gameTuning } from "../rules/tuning";
import { smallWorldTuning } from "../test/worlds";
const TUNING = smallWorldTuning(gameTuning, "House pin offsets use one treehouse and synthetic heights, independent of island extent.");
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
  it("a house object's top as drawn once its art's made (render/houseRooms.ts marks \"<id>.top\"), so the pin clears it (Ed, 2026-10-26: \"the pointer should be not overlapping with the item\"); its config height till then, or when the target sets its own", () => {
    const tops = (id: string) => (id === "wardrobe" ? { x: 5, y: 9, z: 7 } : null), hilly = () => 2;
    expect(pinSpot({ object: "wardrobe" }, map, TUNING, off, hilly, tops)).toEqual({ x: 5, z: 7, top: 7 }); // (over the ground there)
    expect(pinSpot({ object: "bed" }, map, TUNING, off, flat, tops)?.top).toBe(HOUSE_ROOMS.objects.find(q => q.id === "bed")!.h + deck.h);
    expect(pinSpot({ object: "wardrobe", top: 1 }, map, TUNING, off, flat, tops)).toEqual({ x: at.x, z: at.z, top: 1 + deck.h });
  });
  it("nothing for an object the house hasn't", () => expect(pinSpot({ object: "no-such-thing" }, map, TUNING, off, flat)).toBeNull());
  it("a piece's top as drawn is its highest pixel, at the middle of its pixels' width (render/houseFurniture.ts drawnTop)", () => {
    const w = 6, h = 5, px = new Uint8Array(w * h * 4), on = (x: number, y: number) => { px[(y * w + x) * 4 + 3] = 255; };
    on(2, 1); on(4, 1); on(1, 3); on(5, 4);
    expect(drawnTop(px, w, h)).toEqual({ x: 3.5, y: 1 }); // (rows 1 to 4; columns 1 to 5)
    expect(drawnTop(new Uint8Array(w * h * 4), w, h)).toEqual({ x: 3, y: 0 });
  });
});
