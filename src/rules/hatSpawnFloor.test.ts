// Every place a hat is laid in the treehouse is on its walkable floor (Ed's report, 2026-11-03: "First night hat spawn is hidden in
// the floor"): Ed's hat spawn points 1 to 15 (docs/notes/house.md, rules/housePlacement.ts), the classic house's hats' floor, and the
// first morning's hat itself, on spawn point 1 (rules/wakeUp.ts hatOnFloor); and the clothes pile's spot by her bed. The house has
// one floor, at the deck's height (rules/treehouse.ts), so on it is at its height; render/lyingHats.test.ts checks it's drawn there.
import { afterEach, describe, expect, it } from "vitest";
import { newGame as fullGame } from "./game";
import { TUNING } from "./tuning";
import { smallWorld } from "../test/worlds";
import { HOUSE_ROOMS, hatSlots, installEdLayout, objectWorld, onRoomFloor } from "./houseRooms";
import { deckOf } from "./treehouse";
import { startWake } from "./wakeUp";
import { wakeInBedroom } from "./opening";

const newGame = smallWorld(fullGame, "The treehouse's floor needs one real house, not distant islands.");

describe.each([["Ed's arrangement", true], ["the classic house", false]] as const)("in %s", (_, ed) => {
  afterEach(() => installEdLayout(false));
  // (a fresh game's: only the plain hat hers, as on Ed's report's link, set=spells.hats="")
  const house = () => { installEdLayout(ed); const t = structuredClone(TUNING); t.spells.hats = ""; const g = newGame(503187, t), d = deckOf(g.map, g.tuning)!; return { g, d, floor: d.house!.rooms! }; };

  it("every hat spawn point lies on the house's walkable floor (inside its rail)", () => {
    const { d, floor } = house(), slots = hatSlots(d);
    expect(slots.length).toBe(ed ? 15 : slots.length);
    expect(slots.length).toBeGreaterThan(0);
    slots.forEach((p, i) => expect(onRoomFloor(floor, p.x, p.z), `hat spawn point ${i + 1}`).toBe(true));
    if (ed) expect(HOUSE_ROOMS.layout!.hatPoints.map(p => p.id)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
  });

  it("the clothes pile's spot by her bed lies on the house's walkable floor", () => {
    const { d, floor } = house(), pile = HOUSE_ROOMS.objects.find(o => o.use.kind === "pile")!, p = objectWorld(pile, d);
    expect(onRoomFloor(floor, p.x, p.z)).toBe(true);
  });

  it("a game's first morning lays her hat on the walkable floor (in Ed's arrangement, on hat spawn point 1)", () => {
    const { g, d, floor } = house(), W = g.witches[0];
    expect(wakeInBedroom(g) && startWake(g, g.herTime)).toBe(true);
    const h = W.hat.down!;
    expect(h).not.toBeNull();
    expect(onRoomFloor(floor, h.x, h.z)).toBe(true);
    if (ed) expect(h).toMatchObject({ x: hatSlots(d)[0].x, z: hatSlots(d)[0].z });
  });
});
