// Sailing as one zoom (Ed, 2026-10-12: "you go to the map table, you select an island, and then you zoom into the map into the
// island you chose ... and you keep zooming until you're at the start position"): the sea chart flies in to the island's south
// coast (render/chart/seaChart.ts fly) and the game, loaded on that island (?island=X&arrive=1), carries the flight on from where
// the chart left it. A night is made once a page, so between them the page loads anew: this is what crosses over, in the tab's
// sessionStorage: the island, the world, when, the chart's last frame (shown while the night is made) and its camera in the
// game's terms (seaChart.ts FlightEnd).
import type { FlightEnd } from "../render/chart/seaChart";

export const ARRIVE_KEY = "witch.arrive";
/** A record older than this (ms) is stale: a reload long after, not the sail. */
export const ARRIVE_FRESH = 30_000;

export interface Arrival extends FlightEnd { v: 1; island: string; world: number; at: number }

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
const session = (): Store | null => { try { return sessionStorage; } catch { return null; } };

/** Keep the flight's end for the page about to load. */
export function writeArrival(island: string, world: number, end: FlightEnd, store: Store | null = session(), now = Date.now()): void {
  const a: Arrival = { v: 1, island, world, at: now, ...end };
  try { store?.setItem(ARRIVE_KEY, JSON.stringify(a)); } catch { // (too big for the storage: the camera alone, no still)
    try { store?.setItem(ARRIVE_KEY, JSON.stringify({ ...a, still: "" })); } catch { /* storage blocked */ }
  }
}

/** The flight's end for this island, if there's a fresh one; read once (it's forgotten as it's read). */
export function readArrival(island: string, store: Store | null = session(), now = Date.now()): Arrival | null {
  let a: Arrival | null = null;
  try { a = JSON.parse(store?.getItem(ARRIVE_KEY) ?? "null"); store?.removeItem(ARRIVE_KEY); } catch { return null; }
  if (!a || a.v !== 1 || a.island !== island || !(now - a.at >= 0 && now - a.at < ARRIVE_FRESH) || !a.cam) return null;
  return a;
}
