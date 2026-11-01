import type { Game, Witch } from "../rules/game";
import { onTerrace, deckOf } from "../rules/treehouse";
import { onRoomFloor, roomAt } from "../rules/houseRooms";

/** Drawing membership is physical, including bedrooms locked in the canonical solo walking floor. */
export function witchRoomPass(game: Game, witch: Witch | undefined): boolean {
  const deck = deckOf(game.map, game.tuning), b = witch?.body;
  return !!(b?.perch && deck?.house?.rooms && !onTerrace(deck, b.x, b.z)
    && (roomAt(game.map.treehouse, b.x, b.z) || onRoomFloor(deck.house.rooms, b.x, b.z)));
}

export const witchRoomDepth = (inRoom: boolean) => ({ transparent: inRoom, depthTest: !inRoom, renderOrder: inRoom ? 19.95 : 10 });
