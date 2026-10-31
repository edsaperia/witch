import type { Game, Witch } from "../../rules/game";
import type { Deck } from "../../rules/treehouse";
import { wakeOf } from "../../rules/wakeUp";
import { guestAccess, type GuestAccessHooks } from "./guestAccess";

/** Movement-only deck view. Never replace the cached deck or share this guest floor with another witch. */
export function guestDeck(deck: Deck | null, game: Game, witch: Witch, access: GuestAccessHooks = guestAccess): Deck | null {
  const floor = deck?.house?.rooms;
  if (!floor || game.witches.length < 2 || witch.id <= 0 || game.witches[witch.id] !== witch) return deck;
  const assignment = wakeOf(game, witch);
  if (!assignment || assignment.player !== witch.id || !["bedroom2", "bedroom3"].includes(assignment.room ?? "")) return deck;
  const rooms = access.roomAccessFor(floor, witch.id, { player: witch.id, room: assignment.room! });
  if (rooms === floor) return deck;
  return { ...deck!, house: { ...deck!.house!, rooms } };
}
