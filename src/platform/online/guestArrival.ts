import type { Game, Witch } from "../../rules/game";
import { startWakeFor, bedFor, doorFor, type WakeTarget } from "../../rules/wakeUp";
import { attachGuest, detachGuest } from "./membership";

/** Released PR1553 exports, directly bound after normal prototype merge. No copied wake implementation. */
export type { WakeTarget };
export interface GuestRoomHooks {
  startWakeFor: typeof startWakeFor;
  bedFor: typeof bedFor;
  doorFor: typeof doorFor;
}
export const guestBedrooms = ["bedroom2", "bedroom3"] as const;
export interface GuestArrivalOptions {
  room: typeof guestBedrooms[number];
  rooms?: GuestRoomHooks;
  /** Host-approved equipment only; never clone the host's equipped possessions or trust guest inventory. */
  equipment(game: Game): Witch;
}

/** No layout constants or host-bedroom fallback. Equipment and room access remain caller-owned. */
export function guestArrival(options: GuestArrivalOptions) {
  if (!guestBedrooms.includes(options.room)) throw new Error("A guest bedroom must be assigned.");
  let attached: Game | null = null;
  const rooms = options.rooms ?? { startWakeFor, bedFor, doorFor };
  return {
    attach(game: Game): void {
      if (attached || game.witches.length !== 1) throw new Error("A guest is already visiting.");
      if (!rooms.bedFor(options.room) || !rooms.doorFor(options.room)) throw new Error("This island's guest bedroom isn't ready.");
      const guest = options.equipment(game);
      attachGuest(game, guest, (source, witch) => rooms.startWakeFor(source, source.herTime, { yesterday: true }, witch, { player: 1, room: options.room }));
      attached = game;
    },
    detach(game: Game): void {
      if (attached !== game) return;
      attached = null; detachGuest(game, options.room);
    },
  };
}
