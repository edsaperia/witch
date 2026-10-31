import type { Game, Witch } from "../../rules/game";
import type { WakeStart } from "../../rules/wakeUp";
import type { HouseObject } from "../../rules/houseRooms";
import { attachGuest, detachGuest } from "./membership";

/** Exact reviewed PR1553 contract (6547169176); bind exports after they land, never copy wake code. */
export interface WakeTarget { player: number; room: string }
export interface GuestRoomHooks {
  startWakeFor(game: Game, time: number, options: WakeStart, witch: Witch, placement: WakeTarget): boolean;
  bedFor(room: string): HouseObject | undefined;
  doorFor(room: string): HouseObject | undefined;
}
export const guestBedrooms = ["bedroom2", "bedroom3"] as const;
export interface GuestArrivalOptions {
  room: typeof guestBedrooms[number];
  rooms: GuestRoomHooks;
  /** Host-approved equipment only; never clone the host's equipped possessions or trust guest inventory. */
  equipment(game: Game): Witch;
}

/** No layout constants or host-bedroom fallback. This adapter cannot be mounted until the room hooks exist. */
export function guestArrival(options: GuestArrivalOptions) {
  if (!guestBedrooms.includes(options.room)) throw new Error("A guest bedroom must be assigned.");
  let attached: Game | null = null;
  return {
    attach(game: Game): void {
      if (attached || game.witches.length !== 1) throw new Error("A guest is already visiting.");
      if (!options.rooms.bedFor(options.room) || !options.rooms.doorFor(options.room)) throw new Error("This island's guest bedroom isn't ready.");
      const guest = options.equipment(game);
      attachGuest(game, guest, (source, witch) => options.rooms.startWakeFor(source, source.herTime, { yesterday: true }, witch, { player: 1, room: options.room }));
      attached = game;
    },
    detach(game: Game): void {
      if (attached !== game) return;
      attached = null; detachGuest(game, options.room);
    },
  };
}
