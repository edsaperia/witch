// The Terrace as one with the house's rooms (Ed, 2026-11-12: "there is a camera transition (I think) when going onto the terrace of
// the treehouse; this isn't required anymore since the treehouse is treated as one area"; the house one room: Ed, 2026-11-03, "can we
// join it all into one room"). Measured walking from the parlour onto the Terrace (tools/house/terrace-walk.cjs): over the 3 m past
// the Terrace's ring the camera swung some 10 m along the ground and 2 m up and back down in about 20 frames, as the house's slide
// (render/view/witch.ts houseShiftOf) and the camera's following of where she's drawn (View.houseCam) eased between "on the Terrace"
// (neither) and "in a room" (both); and on the way the mood (render/mood.ts) eased from the forest's under the room to home's. Now the
// slide and the camera's following are whole wherever she stands on the house's floor, eased only by her rising (the take-off, the
// landing) and her getting up from her decks' seat; and in the house the mood is home's. `?terracecut=old`: as before, to compare.

/** Whether the link asks for the Terrace's edge as it was (`?terracecut=old`, to compare). */
export const TERRACE_CUT_OLD = typeof location !== "undefined" && new URLSearchParams(location.search).get("terracecut") === "old";

const clamp01 = (k: number) => Math.min(1, Math.max(0, k));

/** The share (0 to 1) of the house's slide up the Ent's plane (View.houseShift) and of the camera's following where she's drawn
 *  (View.houseCam), on foot in the house: `past` how far (m) she stands past the Terrace's ring (deck.r round its middle; inside it,
 *  negative), `lift` her lift (0 on foot, 1 up in the treetops), `seat` her share of the decks' seat as drawn (View.seatK). `old`: the
 *  ramp over the 3 m past the ring, as before ?terracecut=old (and no easing by lift or seat: the camera's had it from her own). */
export function houseSlideShare(past: number, lift: number, seat: number, old = TERRACE_CUT_OLD): number {
  if (old) return clamp01(past / 3);
  const s = clamp01(seat);
  return (1 - clamp01(lift)) * (1 - s * s * (3 - 2 * s));
}

/** The mood's area (render/mood.ts AreaMoods) where she is: in the house (`inHouse`: on its floor, or rising off it or coming down
 *  onto it), home's, as on the Terrace, never the forest's under a room; else `area`, the one under her. `old`: `area` always. */
export const houseMoodArea = (inHouse: boolean, area: string, old = TERRACE_CUT_OLD): string => (inHouse && !old ? "home" : area);
