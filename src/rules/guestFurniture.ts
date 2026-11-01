import type { Game, Witch } from "./game";
import type { HouseObject } from "./houseRooms";
import { wakeOf } from "./wakeUp";

/** Only the assigned visitor uses a guest room's furniture. Shared public stations stay shared. */
export function furnitureFor(game: Game, witch: Witch, object: HouseObject): boolean {
  const room = object.placement?.sourceRoom ?? object.room;
  const assignment = wakeOf(game, witch);
  const guestRoom = assignment?.player === witch.id && (assignment.room === "bedroom2" || assignment.room === "bedroom3") ? assignment.room : null;
  if (room === "bedroom2" || room === "bedroom3") return game.witches.length > 1 && guestRoom === room;
  // Assigned visitors have their own bedroom; other shared rooms remain available.
  if (guestRoom && (room === "bedroom" || object.id === "bed")) return false;
  return true;
}
