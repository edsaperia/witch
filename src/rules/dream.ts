// Where a sleeping legend's dream points (Ed, 2026-10-05): at the runestone of the nearest area of
// the type whose creature it dreams of, explored or not; steady, not following any one animal.
// (A stone stands at an area's soundsystem spot, or home's dancefloor: as rules/leylines.ts.)
import { AREA_TYPES, type ForestMap } from "./map";
import type { Cell } from "./partition";
import type { Creature } from "./creatures";
import type { PartyState } from "./party";

/** A sleeping legend's restlessness, 0 calm to 1 about to wake angry (Ed, #87: restless while its
 *  area has none of its kind). One place to read it from; the rules' own value lands with #87,
 *  till then whatever is set on the creature (0 if nothing is). */
export const restlessness = (c: Creature): number => Math.max(0, Math.min(1, (c as Creature & { restlessness?: number }).restlessness ?? 0));

/** Whether a legend's quest can still be done, so its dream shows: while it sleeps (Ed, 2026-10-06:
 *  "at any time the legend is sleeping, not just before the soundsystem is made"). The rules set the
 *  flag every step (rules/legends.ts); till then, its quest isn't done. */
export const questOpen = (_party: PartyState, c: Creature): boolean => {
  const flag = (c as Creature & { questOpen?: boolean }).questOpen;
  return flag ?? (!!c.quest && c.quest.done === undefined);
};

/** The runestone of the nearest area (its centre, by site) whose type's creature is `species`,
 *  from (x, z); null if the map has none. */
export function dreamStone(map: ForestMap, species: string, x: number, z: number): { cell: Cell; x: number; z: number } | null {
  let best: Cell | null = null, bd = Infinity;
  for (let i = 0; i < map.n; i++) for (let j = 0; j < map.n; j++) {
    if (AREA_TYPES[map.typeOf(i, j)].creature !== species) continue;
    const s = map.siteOf(i, j), d = Math.hypot(s.x - x, s.z - z);
    if (d < bd) { bd = d; best = [i, j]; }
  }
  if (!best) return null;
  const home = best[0] === map.centreCell[0] && best[1] === map.centreCell[1], s = home ? map.dancefloor : map.soundsystemSpot(best[0], best[1]);
  return { cell: best, x: s.x, z: s.z };
}
