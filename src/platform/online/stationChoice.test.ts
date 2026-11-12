import { expect, it } from "vitest";
import { applyStationChoice, stationChoice } from "./stationChoice";
import { BAGS } from "../../rules/bags";
import { bareBroom, PARTS } from "../../rules/broomParts";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { setParts } from "../../rules/spells";
import { HAT_SPELLS } from "../../rules/spells";
import { PILE_SLOTS } from "../../rules/clothesPile";
it("copies only known station choices and rejects player/world/tuning fields", () => {
  const value = { kind: "broom", fitted: bareBroom() }, decoded = stationChoice(value);
  expect(decoded).toEqual(value); expect(decoded).not.toBe(value);
  expect(stationChoice({ kind: "bag", id: BAGS[0].id })).toEqual({ kind: "bag", id: BAGS[0].id });
  for (const bad of [null, [], { kind: "bag", id: "invented" }, { kind: "bag", id: BAGS[0].id, player: 0 }, { kind: "hat", id: "invented" }, { kind: "dress", station: "__proto__" }, { kind: "tuning", value: 999 }, { kind: "world", snapshot: {} }, { kind: "broom", fitted: { ...bareBroom(), extra: null } }, { kind: "broom", fitted: { tip: {}, chassis: null, exhaust: null } }]) expect(stationChoice(bad)).toBeNull();
});

it("reserves a worn hat until released, including competing sequential choices", () => {
  const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4;
  const g = newGame(123, t, 2), id = HAT_SPELLS.find(h => h.built && h.id !== "none")!.id;
  g.witches.forEach(w => { w.spells.hat = "none"; });
  expect(applyStationChoice(g, 0, { kind: "hat", id })).toBe(true);
  const before = structuredClone(g.witches[1]);
  expect(applyStationChoice(g, 1, { kind: "hat", id })).toBe(false); expect(g.witches[1]).toEqual(before);
  expect(applyStationChoice(g, 0, { kind: "hat", id: "none" })).toBe(true);
  expect(applyStationChoice(g, 1, { kind: "hat", id })).toBe(true);
  expect(applyStationChoice(g, 0, { kind: "hat", id })).toBe(false);
});

it("cannot fit the same shared broom part to both witches", () => {
  // Equipment exclusivity needs two witches and their shared house, not a large island.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning, 2), part = PARTS[0], fitted = { ...bareBroom(), [part.slot]: part.id };
  setParts(game.witches[0].spells, fitted);
  const before = structuredClone(game.witches[1].spells);
  expect(applyStationChoice(game, 1, { kind: "broom", fitted })).toBe(false);
  expect(game.witches[1].spells).toEqual(before);
  expect(applyStationChoice(game, 1, { kind: "broom", fitted: bareBroom() })).toBe(true);
  expect(game.witches[0].spells.parts).toEqual(fitted);
});

// Ed, 2026-11-11: "When I go to the wardrobe and put top/jacket on, trousers are put on too." A dressing choice names the shelf it was
// made on, so the shoe rack's Trousers put on only her trousers; an older message naming none puts on its station's piece, as before.
it("a dress or look message carries its shelf, checked; one without it is still taken", () => {
  expect(stationChoice({ kind: "dress", station: "shoeRack", shelf: "trousers" })).toEqual({ kind: "dress", station: "shoeRack", shelf: "trousers" });
  expect(stationChoice({ kind: "dress", station: "shoeRack" })).toEqual({ kind: "dress", station: "shoeRack" });
  for (const shelf of ["jacket", "invented", "__proto__", 3, null]) expect(stationChoice({ kind: "dress", station: "shoeRack", shelf }), String(shelf)).toBeNull();
  expect(stationChoice({ kind: "dress", station: "bedroom2ShoeRack", shelf: "shoes" })).toEqual({ kind: "dress", station: "bedroom2ShoeRack", shelf: "shoes" });
  const look = stationChoice({ kind: "look", station: "shoeRack", changes: {}, shelf: "trousers" });
  expect(look).toEqual({ kind: "look", station: "shoeRack", changes: {}, shelf: "trousers" });
  expect(stationChoice({ kind: "look", station: "shoeRack", changes: {} })).toEqual({ kind: "look", station: "shoeRack", changes: {} });
  expect(stationChoice({ kind: "look", station: "shoeRack", changes: {}, shelf: "top" })).toBeNull();
});

it("applied, a dress choice puts on its shelf's piece alone; without a shelf, its station's", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const pile = () => { const g = newGame(123, tuning); g.wake = { beat: "up", at: 0, snoozes: 0, open: true, mirror: false, events: [], pile: [...PILE_SLOTS], yesterday: true } as NonNullable<typeof g.wake>; return g; };
  let g = pile();
  expect(applyStationChoice(g, 0, stationChoice({ kind: "dress", station: "wardrobe", shelf: "jacket" })!)).toBe(true);
  expect(g.wake!.pile).toEqual(PILE_SLOTS.filter(s => s !== "top")); // (her trousers still in the pile)
  g = pile();
  expect(applyStationChoice(g, 0, stationChoice({ kind: "dress", station: "shoeRack", shelf: "trousers" })!)).toBe(true);
  expect(g.wake!.pile).toEqual(PILE_SLOTS.filter(s => s !== "trousers"));
  g = pile();
  expect(applyStationChoice(g, 0, stationChoice({ kind: "look", station: "shoeRack", changes: {}, shelf: "shoes" })!)).toBe(true);
  expect(g.wake!.pile).toEqual(PILE_SLOTS.filter(s => s !== "shoes"));
  g = pile();
  expect(applyStationChoice(g, 0, stationChoice({ kind: "dress", station: "shoeRack" })!)).toBe(true);
  expect(g.wake!.pile).toEqual(PILE_SLOTS.filter(s => s !== "shoes")); // (an older message: the shoe rack's own piece, as before)
});
