// Exact useHats behavior before optional exclusivity, from1565 7fe78c557.
import type { Witch } from "./game";
import type { LeashEvent } from "./leash";
import { HOUSE_ROOMS, hatToTake, floorHats, reserveHatPoints } from "./houseRooms";
import { hatButton, leaveHat, wearing } from "./hat";
import { setLoadout } from "./spells";
import { reconcileHatPoints } from "./hatFloorPoints";
export function beforeUseHats(W: Witch, at: {x:number;z:number}, x: number, z: number, time: number, radius: number, reach = .9): LeashEvent | null {
  const h = hatToTake(W, at, x, z, radius, reach);
  if (!h) return null;
  if (h.slot !== undefined) {
    const hats = floorHats(W), took = hats[h.slot], worn = wearing(W.hat);
    if (!worn) leaveHat(W.hat, W.spells.hat);
    hats[h.slot] = worn && W.spells.hat !== "none" ? W.spells.hat : "";
    setLoadout(W.spells, took);
    if (HOUSE_ROOMS.layout?.hatPoints.length) reconcileHatPoints(W.house!, HOUSE_ROOMS.layout.hatPoints.length, new Set([W.spells.hat, ...W.hat.left.map(q => q.spell)]));
    return { kind: "hatPicked", id: W.id, x: h.x, z: h.z, at: time };
  }
  const own = HOUSE_ROOMS.layout ? hatButton(W.hat, h.x, h.z, 0, W.spells.hat) : hatButton(W.hat, x, z, radius, W.spells.hat);
  if (own === null) return null;
  if (own !== W.spells.hat) setLoadout(W.spells, own);
  reserveHatPoints(W, at);
  return { kind: "hatPicked", id: W.id, x, z, at: time };
}
