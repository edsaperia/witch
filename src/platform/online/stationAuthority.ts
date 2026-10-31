import type { Game } from "../../rules/game";
import { HOUSE_ROOMS, fromObject, hasRooms } from "../../rules/houseRooms";
import { deckOf } from "../../rules/treehouse";
import type { StationChoice } from "./stationChoice";

export interface StationOwnership { bags: ReadonlySet<string>; hats: ReadonlySet<string>; parts: ReadonlySet<string> }
/** Host-owned collections are supplied by the normal page; no visitor inventory or localStorage is read here. */
export function stationAuthority(owned: (game: Game) => StationOwnership) {
  return (game: Game, player: 0 | 1, choice: StationChoice): boolean => {
    const witch = game.witches[player]; if (!witch) return false;
    const body = witch.body;
    if (witch.id !== player || witch.ko || !body.perch || body.mode !== "ground" || body.seated) return false;
    const deck = deckOf(game.map, game.tuning);
    if (!deck || !hasRooms(deck)) return false;
    const id = choice.kind === "bag" ? "bags" : choice.kind === "hat" ? "hats" : choice.kind === "broom" ? "lathe" : choice.station;
    const object = HOUSE_ROOMS.objects.find(o => o.id === id);
    if (!object || fromObject(object, deck, body.x, body.z) > HOUSE_ROOMS.reach) return false;
    const collection = owned(game);
    if (choice.kind === "bag") return choice.id === "" || collection.bags.has(choice.id);
    if (choice.kind === "hat") return choice.id === "none" || collection.hats.has(choice.id) && !game.witches.some(other => other !== witch && other.spells.hat === choice.id);
    if (choice.kind === "broom") return Object.values(choice.fitted).every(part => part === null || collection.parts.has(part))
      && !game.witches.some(other => other !== witch && Object.values(choice.fitted).some(part => part !== null && Object.values(other.spells.parts ?? {}).includes(part)));
    return object.use.kind === "creator";
  };
}
