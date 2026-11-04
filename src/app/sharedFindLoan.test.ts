import { expect, it } from "vitest";
import type { Game } from "../rules/game";
import { FIND_KINDS } from "../rules/finds";
import { ITEMS, wear } from "../rules/wardrobe";
import { bareBroom, PARTS } from "../rules/broomParts";
import { WITCH_GENOME } from "../../art/witchGenome.js";
import { lend } from "./loan";
import { sharedFindLoan, withSharedFind, type PersonalKit } from "./sharedFindLoan";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { HOUSE_ROOMS, objectFront, addFloorHat, floorHats, hatSlots, useHats, syncFloorHats } from "../rules/houseRooms";
import { stationAuthority } from "../platform/online/stationAuthority";
import { applyStationChoice } from "../platform/online/stationChoice";
import { stepSigilButton } from "../rules/sigilButton";
const kit = (): PersonalKit => ({ look: structuredClone(WITCH_GENOME) as unknown as Record<string, unknown>, hat: "none", parts: bareBroom(), hats: [] });
const found = (kind: string, item: string, taken = true) => ({ trunk: { found: taken, kind, item } }) as Pick<Game, "trunk">;
it("keeps shared temporary hat/part grants subject to station equipment exclusivity", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning, 2), guest = game.witches[1], part = PARTS[0], hat = FIND_KINDS.find(k => k.id === "hat")!.items[0];
  const authority = stationAuthority(g => ({ bags: new Set(), hats: withSharedFind(g, "hat", new Set()), parts: withSharedFind(g, "part", new Set()) }));
  const at = (id: string) => Object.assign(guest.body, objectFront(HOUSE_ROOMS.objects.find(o => o.id === id)!, game.map.treehouse, .1), { perch: true, mode: "ground", seated: false });
  game.trunk = { ...game.trunk!, found: true, kind: "part", item: part.id };
  const fitted = { ...bareBroom(), [part.slot]: part.id }; game.witches[0].spells.parts = fitted; at("lathe");
  expect(authority(game, 1, { kind: "broom", fitted })).toBe(false); game.witches[0].spells.parts = bareBroom();
  expect(authority(game, 1, { kind: "broom", fitted })).toBe(true);
  game.trunk = { ...game.trunk!, found: true, kind: "hat", item: hat }; at("hats");
  game.witches[0].spells.hat = hat as typeof guest.spells.hat;
  expect(authority(game, 1, { kind: "hat", id: hat })).toBe(false); game.witches[0].spells.hat = "none";
  expect(authority(game, 1, { kind: "hat", id: hat })).toBe(true);
});
it("diagnostic: shared station hat cannot also be picked from the other witch's floor", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning, 2), hat = FIND_KINDS.find(k => k.id === "hat")!.items[0], guest = game.witches[1];
  addFloorHat(guest, hat); applyStationChoice(game, 0, { kind: "hat", id: hat });
  let duplicate = false;
  const pick = (slot: { x: number; z: number }) => {
    Object.assign(guest.body, slot, { perch: true, mode: "ground", seated: false });
    stepSigilButton(game, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, sigil: true }, guest, tuning, 1, 1 / 60, [], () => false, 0);
  };
  for (const slot of hatSlots(game.map.treehouse)) { pick(slot); duplicate ||= guest.spells.hat === hat && game.witches[0].spells.hat === hat; }
  expect(duplicate).toBe(false);
  game.witches[0].spells.hat = "none"; let pickedAfterRelease = false;
  for (const slot of hatSlots(game.map.treehouse)) { pick(slot); pickedAfterRelease ||= guest.spells.hat === hat; }
  expect(pickedAfterRelease).toBe(true);
});
it("diagnostic: revoked transient hat cannot be picked from a cached floor after loss", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), W = game.witches[0], hat = FIND_KINDS.find(k => k.id === "hat")!.items[0];
  W.hat.has = true; W.spells.hats = []; floorHats(W); W.spells.hats = [hat]; addFloorHat(W, hat); W.spells.hats = []; // Cached floor existed before the find and its later revocation.
  syncFloorHats(W); // Production return/rollback invokes the integrated owner API immediately after restoring ownership.
  let regained = false;
  for (const slot of hatSlots(game.map.treehouse)) { useHats(W, game.map.treehouse, slot.x, slot.z, 1, 2); regained ||= W.spells.hat === hat; }
  expect(regained).toBe(false);
});
it("exposes a taken registered find to both catalogues without mutating either original collection", () => {
  for (const kind of FIND_KINDS) {
    const game = found(kind.id, kind.items[0]), host = new Set<string>(), visitor = new Set<string>();
    expect(withSharedFind(game, kind.id, host)).toContain(kind.items[0]); expect(withSharedFind(game, kind.id, visitor)).toContain(kind.items[0]);
    expect(host.size).toBe(0); expect(visitor.size).toBe(0);
    expect(withSharedFind(found(kind.id, kind.items[0], false), kind.id, host).size).toBe(0);
  }
  expect(withSharedFind(found("wearable", "invented"), "wearable", new Set()).size).toBe(0);
});
it("strips shared equipment from saves and restores originals on loss/hang-up, preserving private pre-visit loan", () => {
  const base = kit(), part = PARTS[0], privatePart = PARTS.find(p => p.slot !== part.slot)!;
  const prior = lend("part", privatePart.id, base), original = { ...base, parts: { ...base.parts, [privatePart.slot]: privatePart.id } }, host = sharedFindLoan(), visitor = sharedFindLoan();
  host.begin(original, prior); visitor.begin(original, prior);
  const game = found("part", part.id); host.observe(game, original); visitor.observe(game, original);
  const fitted = { ...original, parts: { ...original.parts, [part.slot]: part.id } };
  expect(host.forSave(fitted).parts).toEqual(base.parts);
  expect(host.finish(false, fitted)).toEqual({ kit: original, loan: prior });
  expect(visitor.finish(false, fitted, true)).toEqual({ kit: original, loan: prior });
  expect(original.parts[privatePart.slot]).toBe(privatePart.id);
  visitor.begin(original, prior); visitor.observe(game, original);
  expect(visitor.finish(true, fitted, true)).toEqual({ kit: original, loan: prior });
});
it("rolls back a shared wardrobe/hat on loss and preserves a successful outfit without writing storage", () => {
  const original = kit(), item = ITEMS.find(i => i.set.cloak === "long")!, loans = sharedFindLoan();
  loans.begin(original, null); loans.observe(found("wearable", item.id), original);
  const worn = { ...original, look: wear(original.look!, item) };
  expect(loans.forSave(worn).look).toEqual(original.look); expect(loans.finish(false, worn).kit).toEqual(original);
  loans.begin(original, null); loans.observe(found("wearable", item.id), original); expect(loans.finish(true, worn).kit).toEqual(worn);
  const hat = FIND_KINDS.find(k => k.id === "hat")!.items[0];
  loans.begin(original, null); loans.observe(found("hat", hat), original);
  expect(loans.finish(false, { ...original, hat, hats: [hat] }).kit).toEqual(original);
});
