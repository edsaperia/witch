// The treehouse's dressing stations by nearness (Ed, 2026-10-21, after the new opening: "the customisation menus take me back to
// the old bedroom screen; instead I should see the menu slide in from the left when I go near the relevant object, and slide away
// when I walk away from it"). A station is a house object whose use is the creator (config/house/: the mirrors, the wardrobe,
// the cloak pegs, the shoe rack, the bags; the Workshop's bay, lathe and pegboard); she's at one within the house's reach of its edge, and stays at it
// till she's `slack` metres further off, so its panel doesn't flicker at the edge; one at a time, the nearest. Where an object is
// and whether there are rooms are houseRooms.ts's (fromObject, hasRooms), never worked out here, so a new plan for the rooms
// moves the stations' reach with them. Stations are known by their `use` alone. Since Ed's playtest of 2026-10-26 ("Menus should
// open when she presses E near an interactive object") the one she's at is lit with E over it (render/houseRooms.ts), and E there
// slides its panel in (main.ts, the rules' "house" event); walking off it slides it out. The rules don't change for it.
import type { Game } from "./game";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, fromObject, hasRooms, onRoomFloor, type HouseObject } from "./houseRooms";
import type { Tuning } from "./tuning";

/** How much further than the house's reach she can step before an open station's panel goes (m). */
export const STATION_SLACK = 0.8;

/** The uses whose panels come on E at them and go as she walks off: the dressing stations' (the creator: their panels slide in from the left, ui/stationPanel.ts)
 *  and the tables' (Ed, 2026-10-23: "'Tables' slide in from the bottom and have a soft edge (they're more diegetic)": the Atrium's
 *  map table's sea chart, ui/chartOverlay.ts; the card table's to come, docs/backlog/treehouse.md). */
export const STATION_USES: readonly HouseObject["use"]["kind"][] = ["creator"];
export const TABLE_USES: readonly HouseObject["use"]["kind"][] = ["chart"];

/** The station she's at, standing at (x, z) with `open` the one whose panel is open now (null for none): that one while she's
 *  within reach + slack of it, else the nearest station within reach, else null. `uses`: which objects count (the dressing
 *  stations by default; TABLE_USES for the tables). */
export function stationAt(at: { x: number; z: number }, x: number, z: number, open: string | null, H = HOUSE_ROOMS, slack = STATION_SLACK, uses: readonly string[] = STATION_USES): HouseObject | null {
  const is = (o: HouseObject) => uses.includes(o.use.kind);
  const cur = open ? H.objects.find(o => o.id === open && is(o)) : undefined;
  if (cur && fromObject(cur, at, x, z) <= H.reach + slack) return cur;
  let best: HouseObject | null = null, bd = H.reach;
  for (const o of H.objects) if (is(o)) { const d = fromObject(o, at, x, z); if (d <= bd) { bd = d; best = o; } }
  return best;
}

/** Her station in the game as it is: only on foot in the house (landed, off her decks, not knocked out), else null. `uses` as
 *  stationAt's. */
export function stationOf(g: Game, open: string | null, tuning: Tuning = g.tuning, uses: readonly string[] = STATION_USES): HouseObject | null {
  const w = g.witch, W = g.witches[0];
  if (!w.perch || w.mode !== "ground" || w.seated || W.ko) return null;
  const d = deckOf(g.map, tuning);
  if (!d || !hasRooms(d)) return null;
  return stationAt(d, w.x, w.z, open, HOUSE_ROOMS, STATION_SLACK, uses);
}
/** The table she's at (its thing slides up from the bottom: ui/chartOverlay.ts), as stationOf. */
export const tableOf = (g: Game, open: string | null, tuning: Tuning = g.tuning): HouseObject | null => stationOf(g, open, tuning, TABLE_USES);

/** Where her broom is while she's on foot in the house (Ed, 2026-10-23: "only while she's at the bay. otherwise she holds it when
 *  she's on the terrace"): resting on the Workshop's bay while she stands at it (`station`, the station she's at: stationOf), on the
 *  lathe while she's at the lathe, in her hand on the Terrace (the hub and its balcony: not in a room off it), and nowhere drawn
 *  in the other rooms ("none": she walks without it, as before). Off the house's floor (flying, outdoors), "none" too: then she's
 *  on it, drawn as ever. Drawing only (render/view/witch.ts, render/houseRooms.ts); the rules don't change for it. */
export type BroomWhere = "bay" | "lathe" | "held" | "none";
export function broomWhere(g: Game, station: string | null, tuning: Tuning = g.tuning): BroomWhere {
  const w = g.witch;
  if (!w.perch || w.mode !== "ground" || w.seated) return "none";
  const d = deckOf(g.map, tuning);
  if (!d || !hasRooms(d)) return "none";
  if (station === "broomBay") return "bay";
  if (station === "lathe") return "lathe";
  const inRoom = Math.hypot(w.x - d.x, w.z - d.z) > d.r && onRoomFloor(d.house!.rooms!, w.x, w.z);
  return inRoom ? "none" : "held";
}
