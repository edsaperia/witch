import type { Game } from "../../rules/game";
import type { LeashEvent } from "../../rules/leash";
import { wakeOf, type WakeEvent } from "../../rules/wakeUp";

export interface HouseEvents { leash: LeashEvent[]; wake: WakeEvent[] }
/** Capture each received step before the next replay replaces its transient events; drain once per page frame. */
export function houseSteps() {
  let last = -1, count = 0, pending: HouseEvents = { leash: [], wake: [] };
  return {
    capture(game: Game, player: 0 | 1, tick: number) {
      if (!Number.isSafeInteger(tick) || tick < 0 || tick <= last) return;
      last = tick;
      const leash = game.leashEvents.filter(e => (e.kind === "house" || e.kind === "chart") && e.id === player), wake = wakeOf(game, game.witches[player])?.events ?? [];
      count += leash.length + wake.length;
      if (count > 128) throw new Error("Online house events were not consumed.");
      pending.leash.push(...structuredClone(leash)); pending.wake.push(...wake);
    },
    take(): HouseEvents { const events = pending; pending = { leash: [], wake: [] }; count = 0; return events; },
    clear() { last = -1; count = 0; pending = { leash: [], wake: [] }; },
  };
}
