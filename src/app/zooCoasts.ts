// The zoo's islands in their real shapes (Ed, 2026-10-26: "Are the zoo areas the same shape as the islands on the map? The outer
// ones look too round for that to be true"; "We already know the real coastline shapes, can't we reuse them in the zoo without
// calculating anything?"): each island's coast as the sea chart made it, read back from what the chart's worker keeps in this
// browser (app/chartCache.ts coastKey, under the chart's own keys, never the zoo page's: its tuning is its own), before the zoo's
// map is made, and handed to the rules with the zoo's tuning (rules/zooMap.ts ZooLayoutKnobs.coasts). Read for at most `ms`: an
// island not kept yet (a new build, a private window, the chart not made ahead) is round, as the chart shows one it hasn't made,
// and the chart's worker is set making the missing ones for the zoo's next opening (app/chartWarm.ts). Nothing recalculated here.
import { KIND_NAMES } from "../rules/rosters";
import { cacheGet, coastKey } from "./chartCache";

let held: Record<string, number[]> | null = null;

/** The coasts read for this page's zoo (null: none read). */
export const zooCoastsHeld = (): Record<string, number[]> | null => held;

/** Read every island's kept coast for `world`, waiting at most `ms`; what came is held for the zoo's tuning and returned, with the
 *  kinds still missing. */
export async function readZooCoasts(world: number, ms = 400, kinds: readonly string[] = KIND_NAMES): Promise<{ coasts: Record<string, number[]>; missing: string[] }> {
  const coasts: Record<string, number[]> = {};
  const all = Promise.all(kinds.map(async k => { const c = await cacheGet<number[]>(coastKey(k, world)); if (c && c.length >= 12) coasts[k] = c; }));
  await Promise.race([all, new Promise(r => setTimeout(r, ms))]);
  held = { ...coasts };
  return { coasts: held, missing: kinds.filter(k => !held![k]) };
}
