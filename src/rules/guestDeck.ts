import type { Game, Witch } from "./game";
import type { Deck } from "./treehouse";
import { wakeOf } from "./wakeUp";
import { roomAccessFor } from "./houseRooms";

export interface GuestDeckHooks { roomAccessFor: typeof roomAccessFor }
const defaultAccess: GuestDeckHooks = { roomAccessFor };
/** Movement-only visit view: bedrooms are shared for beds and dressing. Solo floors stay locked. */
export function guestDeck(deck: Deck | null, game: Game, witch: Witch, access: GuestDeckHooks = defaultAccess): Deck | null {
  const floor = deck?.house?.rooms;
  if (!floor || game.witches.length < 2 || game.witches[witch.id] !== witch) return deck;
  let rooms = floor;
  for (const visitor of game.witches) {
    const assignment = wakeOf(game, visitor);
    if (visitor.id > 0 && assignment?.player === visitor.id && ["bedroom2", "bedroom3"].includes(assignment.room ?? "")) {
      for (const room of ["bedroom2", "bedroom3"]) rooms = access.roomAccessFor(rooms, visitor.id, { player: visitor.id, room });
      break;
    }
  }
  if (rooms === floor) return deck;
  return { ...deck!, house: { ...deck!.house!, rooms } };
}
