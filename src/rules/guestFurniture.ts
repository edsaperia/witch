import type { Game, Witch } from "./game";
import type { HouseObject } from "./houseRooms";
import { wakeOf } from "./wakeUp";

/** Ed: beds and dressing furniture are shared. Solo guest rooms stay closed. */
export function furnitureFor(game: Game, _witch: Witch, object: HouseObject): boolean {
  const room = object.placement?.sourceRoom ?? object.room;
  if (room === "bedroom2" || room === "bedroom3") {
    return game.witches.length > 1 && game.witches.some(w => { const a = wakeOf(game, w); return w.id > 0 && a?.player === w.id && ["bedroom2", "bedroom3"].includes(a.room ?? ""); });
  }
  return true;
}
