// The treehouse's dressing stations by nearness (Ed, 2026-10-21, after the new opening: "the customisation menus take me back to
// the old bedroom screen; instead I should see the menu slide in from the left when I go near the relevant object, and slide away
// when I walk away from it"). A station is a house object whose use is the creator (config/house.json: the mirrors, the wardrobe,
// the cloak pegs, the shoe rack, the bags, the broom stand); she's at one within the house's reach of its edge, and stays at it
// till she's `slack` metres further off, so its panel doesn't flicker at the edge; one at a time, the nearest. No E: the page
// (main.ts, ui/creator.ts dock) slides its panel in and out as this changes. The rules don't change for it.
import type { Game } from "./game";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, type HouseObject } from "./houseRooms";
import type { Tuning } from "./tuning";

/** How much further than the house's reach she can step before an open station's panel goes (m). */
export const STATION_SLACK = 0.8;

const isStation = (o: HouseObject) => o.use.kind === "creator";
/** How far (x, z) is from an object's footprint (0 on it), the hub's centre at `at`. */
const fromObject = (o: HouseObject, at: { x: number; z: number }, x: number, z: number) =>
  Math.hypot(Math.max(0, Math.abs(x - (at.x + o.x)) - o.w / 2), Math.max(0, Math.abs(z - (at.z + o.z)) - o.d / 2));

/** The station she's at, standing at (x, z) with `open` the one whose panel is open now (null for none): that one while she's
 *  within reach + slack of it, else the nearest station within reach, else null. */
export function stationAt(at: { x: number; z: number }, x: number, z: number, open: string | null, H = HOUSE_ROOMS, slack = STATION_SLACK): HouseObject | null {
  const cur = open ? H.objects.find(o => o.id === open && isStation(o)) : undefined;
  if (cur && fromObject(cur, at, x, z) <= H.reach + slack) return cur;
  let best: HouseObject | null = null, bd = H.reach;
  for (const o of H.objects) if (isStation(o)) { const d = fromObject(o, at, x, z); if (d <= bd) { bd = d; best = o; } }
  return best;
}

/** Her station in the game as it is: only on foot in the house (landed, off her decks, not knocked out), else null. */
export function stationOf(g: Game, open: string | null, tuning: Tuning = g.tuning): HouseObject | null {
  const w = g.witch, W = g.witches[0];
  if (!w.perch || w.mode !== "ground" || w.seated || W.ko) return null;
  const d = deckOf(g.map, tuning);
  if (!d?.house?.rooms.length) return null;
  return stationAt(d, w.x, w.z, open);
}
