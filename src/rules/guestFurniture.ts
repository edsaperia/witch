import type { Game, Witch } from "./game";
import type { HouseObject } from "./houseRooms";
import { BROOM_STATIONS, hasBroom } from "./kit";

const GUEST_ROOMS = ["bedroom2", "bedroom3"];
/** Whether an object is one of the guests' bedrooms' (by the room it was made for, wherever Ed's layout puts it). */
export const inGuestRoom = (object: HouseObject): boolean => GUEST_ROOMS.includes(object.placement?.sourceRoom ?? object.room);

/** A visit is on: a guest has woken in (been assigned) one of the guests' bedrooms. Then their furniture works for everyone and is
 *  drawn uncovered (render/houseFurniture.ts furnitureState); otherwise (solo) it waits under its dust sheets. The game's own state
 *  (each witch's wake), so the same on every peer. */
export function guestRoomsOpen(game: Pick<Game, "wake" | "witches">): boolean {
  return game.witches.length > 1 && game.witches.some((w, i) => {
    const a = i === 0 ? game.wake : w.wake;
    return w.id > 0 && a?.player === w.id && GUEST_ROOMS.includes(a.room ?? "");
  });
}

/** Ed: beds and dressing furniture are shared. In solo the guests' bedrooms are open (Ed, 2026-11-03) but their furniture doesn't work. */
export function furnitureFor(game: Pick<Game, "wake" | "witches">, witch: Witch, object: HouseObject): boolean {
  if (BROOM_STATIONS.includes(object.id) && !hasBroom(witch)) return false; // (the broom's modding stations only while she carries it: Ed, 2026-11-07, option B)
  return !inGuestRoom(object) || guestRoomsOpen(game);
}

/** In solo, E at a guest's bedroom's piece only says it waits (Ed, 2026-11-03: "Bedrooms 2 and 3: open and usable in solo, but still
 *  have dust sheets on the furniture"), under the name its placeholder always had. */
const WAITING = { kind: "say", line: "Waiting for its witch." } as const;
const placeholders = new WeakMap<HouseObject, HouseObject>(), idle = new WeakMap<HouseObject, HouseObject>();
/** The object as E finds it now: itself, or in solo a guest's bedroom's working piece as its dust-sheeted placeholder (one object a
 *  piece, made once). */
export function houseObjectFor(game: Pick<Game, "wake" | "witches">, object: HouseObject, witch: Pick<Witch, "kit"> | undefined = game.witches[0]): HouseObject {
  // (a broom modding station while she has no broom: only to look at, no glow, no prompt, E nothing; Ed, 2026-11-07, "The modding
  // stations only light up and open while she is carrying her broom")
  if (BROOM_STATIONS.includes(object.id) && witch && !hasBroom(witch)) { let s = idle.get(object); if (!s) idle.set(object, s = { ...object, use: { kind: "scenery" } }); return s; }
  if (object.use.kind === "say" || !inGuestRoom(object) || guestRoomsOpen(game)) return object;
  let p = placeholders.get(object);
  if (!p) placeholders.set(object, p = { ...object, label: object.use.kind === "bed" ? "A bare bed frame" : "Something under a dust sheet", use: WAITING });
  return p;
}
