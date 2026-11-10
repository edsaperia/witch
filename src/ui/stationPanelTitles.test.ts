import { expect, it } from "vitest";
import { stationTitle } from "./stationLines";
import { shelvesAt } from "../rules/wardrobe";

// A guests' bedroom's dressing furniture is headed, and holds, as its home namesake (Ed, 2026-11-07: "their wardrobe becomes a wardrobe
// rail (jacket, top), and their dressing table holds hair, sunglasses and earrings"; "Guests need basins and shoe racks").
it.each([
  ["bedroom2Wardrobe", "wardrobe"], ["bedroom3Wardrobe", "wardrobe"],
  ["bedroom2DressingTable", "dressingTable"], ["bedroom3DressingTable", "dressingTable"],
  ["bedroom2Basin", "basin"], ["bedroom3Basin", "basin"], ["bedroom2ShoeRack", "shoeRack"], ["bedroom3ShoeRack", "shoeRack"],
])("%s heading and shelves match %s", (guest, home) => {
  expect(stationTitle(guest)).toBe(stationTitle(home));
  expect(stationTitle(guest)).not.toBe(guest);
  expect(shelvesAt(guest)!.map(s => s.id)).toEqual(shelvesAt(home)!.map(s => s.id));
});
