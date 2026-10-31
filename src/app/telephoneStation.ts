import type { Game } from "../rules/game";
import { HOUSE_ROOMS, objectAt } from "../rules/houseRooms";
import { telephone, type TelephoneOptions } from "./telephone";

/** The ordinary station's lifetime/input seam. Call admission stays off until the actual guest/save hooks are bound. */
export function telephoneStation(options: Pick<TelephoneOptions, "storage" | "loadIdentity" | "menu" | "socket">) {
  const phone = telephone({ ...options, callsEnabled: false,
    connected: async () => { throw new Error("Calls aren't available in this build yet."); }, message: () => {}, departed: () => {},
  });
  let night: Game | null = null, object: string | null = null;
  const close = () => { void phone.show(false); };
  return {
    get open() { return phone.open; },
    get object() { return phone.open ? object : null; },
    get state() { return phone.state; },
    use(game: Game, id: string): void {
      if (game.witches[0].ko || HOUSE_ROOMS.objects.find(o => o.id === id)?.use.kind !== "telephone") return;
      night = game; object = id; void phone.show(!phone.open);
    },
    /** Also closes before sailing/replacement, knockout or leaving the telephone's reach; never mutates a game/save. */
    frame(game: Game | null, now: number): void {
      if (phone.open && (!game || night !== game || game.witches[0].ko || !game.witch.perch || objectAt(game.map.treehouse, game.witch.x, game.witch.z)?.use.kind !== "telephone")) close();
      if (phone.open) phone.pollPad(typeof navigator !== "undefined" && navigator.getGamepads ? [...navigator.getGamepads()].find(p => p) ?? null : null, now);
    },
    close,
    dispose: phone.dispose,
  };
}
