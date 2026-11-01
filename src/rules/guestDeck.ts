import type { Game, Witch } from "./game";
import type { Deck } from "./treehouse";
import { wakeOf } from "./wakeUp";
import { roomAccessFor } from "./houseRooms";

export interface GuestDeckHooks { roomAccessFor: typeof roomAccessFor }
const defaultAccess: GuestDeckHooks = { roomAccessFor };
/** Movement-only deck view. Never replace the shared deck or share this guest floor with another witch. */
export function guestDeck(deck: Deck | null, game: Game, witch: Witch, access: GuestDeckHooks = defaultAccess): Deck | null {
  const floor = deck?.house?.rooms;
  if (!floor || game.witches.length < 2 || witch.id <= 0 || game.witches[witch.id] !== witch) return deck;
  const assignment = wakeOf(game, witch);
  if (!assignment || assignment.player !== witch.id || !["bedroom2", "bedroom3"].includes(assignment.room ?? "")) return deck;
  const rooms = access.roomAccessFor(floor, witch.id, { player: witch.id, room: assignment.room! });
  if (rooms === floor) return deck;
  return { ...deck!, house: { ...deck!.house!, rooms } };
}
