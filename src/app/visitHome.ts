import type { Game } from "../rules/game";
import { HOUSE_ROOMS, objectFront } from "../rules/houseRooms";

/** Only after a confirmed visitor's own fresh night has finished preparation. Solo never calls this. */
export function visitHome(game: Game): string | null {
  const phone = HOUSE_ROOMS.objects.find(object => object.id === "telephone");
  if (!phone || game.witches.length !== 1) return null;
  const at = objectFront(phone, game.map.treehouse), W = game.witches[0];
  Object.assign(W.body, at, { vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false });
  delete W.body.falling;
  // This is the return from a visit, not another alarm/stretch sequence in bed.
  if (game.wake) Object.assign(game.wake, { open: true, beat: "up", at: game.herTime, pile: [], events: [] });
  game.prev.witches = [{ ...at, lift: 0 }];
  return phone.id;
}

export function leaveVisit(active: boolean, hangUp: () => void, thaw: () => void): boolean {
  if (!active) return false;
  hangUp(); thaw(); return true;
}
