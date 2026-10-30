// The outcome every player's persistence adapter receives. Storage and networking remain the page's job.
import type { Game } from "./game";
import type { FindKindId } from "./finds";
import { won } from "./win";

export interface SharedNightProgress {
  /** Chart discoveries become permanent when the existing solo finale settles. */
  islands: string[];
  /** Finds are eligible to be kept by the existing bed/sail settlement after a win. */
  finds: { kind: FindKindId; id: string }[];
}

/** Successful permanent unlocks belong to every witch, irrespective of who found them.
 * This does not write anyone's browser storage or decide temporary loan ownership. */
export function sharedNightProgress(g: Game, witchId: number): SharedNightProgress {
  if (!g.witches.some(W => W.id === witchId)) throw new RangeError("Unknown witch");
  const find = g.trunk;
  return {
    islands: won(g) && g.win?.settled ? [...g.win.found] : [],
    finds: won(g) && find?.found && find.item ? [{ kind: find.kind, id: find.item }] : [],
  };
}
