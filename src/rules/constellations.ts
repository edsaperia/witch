// Tonight's find written in the stars (Ed, 2026-10-22: "Instead of a crystal ball, the hint should be written in the stars as a
// constellation seen through the telescope in the direction of the item!"; "With all permanent upgrades, there's one per night,
// and it's hinted through the telescope"; his answers to the mock, previews/ed/starfield-mock): the night's find's outline traced
// in 7 to 10 stars (rules/finds.ts nightFind: a wearable or a broom part; hats and records to come, any item id an outline here),
// standing about 35° up at its bearing from the treehouse, there all night and gone once she's found it. Seen only through the telescope (render/view/camera.ts); its stars
// a little brighter than their neighbours, faint dotted lines between them fading in once she holds the view on it (render/sky.ts).
// Here, the outlines and where tonight's stands: drawing only, nothing in the rules reads it.
import { RECORD_FINDS } from "./records";
import type { NightFind } from "./finds";

/** An outline: its stars (degrees across the sky from its middle: x to the right, y up) and the lines joining them (by index). */
export interface Outline { stars: [number, number][]; lines: [number, number][] }

/** The outlines by item id, about 12 to 17° across: every item in the finds pool's (rules/finds.ts FIND_KINDS: the wearables and the broom parts). */
export const OUTLINES: Record<string, Outline> = {
  "hair-mohawk": { stars: [[-3, -4], [3, -4], [4, 0], [-4, 0], [-2.5, 2], [-1, 4.5], [1, 5], [2.5, 2.5]], lines: [[0, 1], [1, 2], [3, 0], [3, 4], [4, 5], [5, 6], [6, 7], [7, 2]] },
  shades: { stars: [[-6, 1], [-2, 1], [-2.5, -2], [-5.5, -2], [2, 1], [6, 1], [5.5, -2], [2.5, -2], [-8.5, 2], [8.5, 2]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [1, 4], [0, 8], [5, 9]] },
  "top-sequins": { stars: [[-2, 5], [2, 5], [-5, 4], [5, 4], [-6.5, -3], [6.5, -3], [-3.5, -5], [3.5, -5], [0, 0.5]], lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [2, 6], [3, 7], [6, 7]] },
  "top-cape": { stars: [[-2, 5], [2, 5], [-3.5, 3.5], [3.5, 3.5], [-6, -5], [-2, -6], [2, -6], [6, -5]], lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 7], [4, 5], [5, 6], [6, 7]] },
  "top-mesh": { stars: [[-4, 4], [4, 4], [-4, -4], [4, -4], [0, 0], [-1.5, 3], [1.5, 3]], lines: [[0, 5], [5, 6], [6, 1], [0, 2], [1, 3], [2, 3], [2, 4], [4, 1], [3, 4], [4, 0]] },
  "cloak-long": { stars: [[-1.5, 7], [1.5, 7], [0, 6], [-4, 0], [4, 0], [-5.5, -7], [0, -7.5], [5.5, -7]], lines: [[0, 1], [0, 3], [1, 4], [3, 5], [4, 7], [5, 6], [6, 7]] },
  "cloak-hooded": { stars: [[0, 8], [-2.5, 5], [2.5, 5], [-4, 3], [4, 3], [-5, -6], [0, -6.5], [5, -6]], lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 7], [5, 6], [6, 7]] },
  "shoes-chunky": { stars: [[-6, -2], [6, -2], [6.5, 0], [2, 1], [-1, 3], [-4, 3.5], [-6, 1], [0, -2]], lines: [[0, 7], [7, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]] },
  bumbag: { stars: [[-3, 1], [3, 1], [3.5, -2], [-3.5, -2], [-8, 2], [8, 2], [0, -0.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5]] },
  tote: { stars: [[-4, 2], [4, 2], [3, -5], [-3, -5], [-2.5, 6], [2.5, 6], [-1.5, 2], [1.5, 2]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [6, 4], [4, 5], [5, 7]] },
  duffel: { stars: [[-7, 0], [-5, 2.5], [5, 2.5], [7, 0], [5, -2.5], [-5, -2.5], [-2, 5], [2, 5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 6], [6, 7], [7, 2]] },
  briefcase: { stars: [[-5, 2], [5, 2], [5, -4], [-5, -4], [-1.5, 2], [-1.5, 4], [1.5, 4], [1.5, 2], [-5, -1], [5, -1]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [8, 9]] },
  clutch: { stars: [[-6, 1.5], [6, 1.5], [6, -1.5], [-6, -1.5], [-6, 0.5], [0, -0.5], [6, 0.5], [0, 1.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6]] },
  messenger: { stars: [[-5, 2], [5, 2], [5, -4], [-5, -4], [-5, -0.5], [5, -0.5], [-3, 7], [3, 7]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [0, 6], [6, 7], [7, 1]] },
  ...Object.fromEntries(RECORD_FINDS.map(id => [id, { stars: [[-5, 5], [5, 5], [5, -5], [-5, -5], [2, 4], [8, 0], [2, -4], [3, 0]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6]] }])), // (a record half out of its sleeve: every one alike)
  backpack: { stars: [[-3.5, 4], [3.5, 4], [4, -5], [-4, -5], [-3.5, 1], [3.5, 1], [0, 6.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [0, 6], [6, 1]] },
  // The broom parts (the Workshop, Ed 2026-10-23: rules/broomParts.ts, found in wrecks): each part's own shape.
  missile: { stars: [[0, 7], [-2.5, 3], [2.5, 3], [-2.5, -4], [2.5, -4], [-5, -7], [5, -7], [-2.5, 1], [2.5, 1]], lines: [[0, 1], [0, 2], [1, 7], [7, 3], [2, 8], [8, 4], [3, 5], [4, 6], [7, 8]] }, // (a nose cone, its band, its fins)
  curl: { stars: [[-7, -6], [-3.5, -2.5], [0, 1], [3, 4], [5.5, 6], [7, 3.5], [5.5, 1.5], [3.5, 2.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]] }, // (a stick rolled up at its end)
  horse: { stars: [[-1, -7], [-1, 0], [0, 3], [1.5, 6], [4.5, 5], [6.5, 3], [5.5, 1.5], [2.5, 3], [-2, 4.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 2], [3, 8]] }, // (a horse's head on its stick, its mane)
  fairing: { stars: [[-7, 0], [-4, 2], [3, 2], [7, 0], [3, -2], [-4, -2], [4.5, 5], [1.5, 2.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 6], [6, 7]] }, // (a long fairing, its windscreen up)
  ladder: { stars: [[-2, -7], [2, -7], [-2, -2], [2, -2], [-2, 3], [2, 3], [-2, 7], [2, 7]], lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [0, 1], [2, 3], [4, 5], [6, 7]] }, // (two rails and rungs)
  canoe: { stars: [[-7, 2.5], [-5, -1], [-2, -2.5], [2, -2.5], [5, -1], [7, 2.5], [-3, 1], [3, 1]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 7], [7, 5]] }, // (a hull, its gunwales)
  nozzles: { stars: [[-4.5, 3], [-1, 3], [-1, -1], [-4.5, -1], [1, 3], [4.5, 3], [4.5, -1], [1, -1], [-2.75, -5], [2.75, -5]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [3, 8], [2, 8], [7, 9], [6, 9]] }, // (two nozzles, their flames)
  twigs: { stars: [[0, 7], [-1, 2.5], [1, 2.5], [-5.5, -6], [-2, -7], [2, -7], [5.5, -6]], lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [1, 2]] }, // (a bundle bound at the top, fanning out)
  oar: { stars: [[0, 8], [0, 2], [-2, 0], [2, 0], [-2.5, -5], [2.5, -5], [0, -7.5]], lines: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6]] }, // (a handle and its blade)
  // The hats (Ed, 2026-10-23: hats found like the rest, rules/finds.ts): each hat's spell, as its chip's icon draws it (render/hatIcons.ts).
  helmet: { stars: [[-5, 0], [-4, 3], [-1.5, 5], [1.5, 5], [4, 3], [5, 0], [-6.5, -1], [6.5, -1], [0, -4.5]], lines: [[6, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 7], [0, 8], [8, 5]] }, // (a dome, its rim, its strap)
  healing: { stars: [[0, 6], [5.2, 3], [5.2, -3], [0, -6], [-5.2, -3], [-5.2, 3], [0, 2.5], [0, -2.5], [-2.5, 0], [2.5, 0]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [6, 7], [8, 9]] }, // (a ring, a cross in it)
  harvest: { stars: [[1, 7.5], [0, 3.5], [-3, 1], [3, 1], [0, -1.5], [-2.5, -4.5], [2.5, -4.5], [0, -7]], lines: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 7], [6, 7]] }, // (a bunch of berries on its stem)
  dowsing: { stars: [[0, -4.5], [0, 1], [-5, 7], [5, 7], [-3.5, -7], [3.5, -7], [0, -7.5]], lines: [[0, 1], [1, 2], [1, 3], [4, 6], [6, 5]] }, // (a forked hazel stick over a ripple)
  sentry: { stars: [[-3.5, 4], [3.5, 4], [-2.5, -7], [2.5, -7], [0, 7.5], [-3, -1.5], [3, -1.5]], lines: [[0, 1], [0, 5], [5, 2], [1, 6], [6, 3], [0, 4], [4, 1], [5, 6]] }, // (a lookout on its posts)
  bramble: { stars: [[-6.5, -7], [-4, -3], [-1, -2.5], [1, 1], [4, 0.5], [3, 5], [6, 7.5], [-3, 0], [2.5, -1.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 7], [3, 8]] }, // (a cane, its thorns)
  slingshot: { stars: [[0, -7.5], [0, -1], [-4, 5], [4, 5], [-4.5, 7.5], [4.5, 7.5], [0, 3]], lines: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [2, 6], [6, 3]] }, // (a fork, its sling)
  gathering: { stars: [[0, 0], [1.5, 1.5], [-0.5, 3], [-3, 1.5], [-3, -2], [0.5, -4], [4.5, -2.5], [5.5, 2.5], [2, 6.5], [-4, 6.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]] }, // (a spiral, drawing in)
  mine: { stars: [[0, 0], [0, 7], [5, 5], [7, 0], [5, -5], [0, -7], [-5, -5], [-7, 0], [-5, 5]], lines: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]] }, // (a burst)
  lullaby: { stars: [[1, 7], [-3, 5.5], [-5, 1.5], [-4.5, -3], [-1.5, -6], [2.5, -6.5], [-1, -2.5], [-1.5, 2], [5, 2]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]] }, // (a crescent moon, a star by it)
  cyclone: { stars: [[-7, 7], [7, 7], [-4.5, 3.5], [4.5, 3], [-2.5, 0], [2.5, -0.5], [-1, -4], [1, -7.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]] }, // (a funnel, its zigzag)
  nursing: { stars: [[0, -6.5], [-5.5, 0], [-5, 3.5], [-2.5, 5.5], [0, 3.5], [2.5, 5.5], [5, 3.5], [5.5, 0]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]] }, // (a heart)
  edgeseer: { stars: [[-7.5, 0], [-3.5, 3.5], [3.5, 3.5], [7.5, 0], [3.5, -3.5], [-3.5, -3.5], [0, 0]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] }, // (an eye, its pupil)
  routeseer: { stars: [[-6.5, -7], [-3, -4], [-4.5, 0.5], [0, 2.5], [4, 1.5], [6.5, 6.5], [3.5, 6], [6.5, 3.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [5, 7]] }, // (a winding way, its arrow)
};

/** How high (degrees) a constellation's middle stands. */
export const CONSTELLATION_UP = 35;

/** A star of tonight's constellation in the sky: its bearing (degrees clockwise from north) and elevation (degrees up). */
export interface SkyStar { bearing: number; elevation: number }

/** The night's find's constellation (its outline at its bearing: rules/finds.ts nightFind), or null: nothing to find tonight
 *  (or found), or an item with no outline. */
export function constellationFor(find: NightFind | null): { item: string; bearing: number; elevation: number; stars: SkyStar[]; lines: [number, number][] } | null {
  if (!find) return null;
  const O = OUTLINES[find.item];
  if (!O) return null;
  const bearing = find.bearing;
  // (across the sky by its own degrees: a star x° to the side at elevation e is x / cos e degrees of bearing round)
  const stars = O.stars.map(([x, y]) => { const e = CONSTELLATION_UP + y; return { bearing: (bearing + x / Math.cos((e * Math.PI) / 180) + 360) % 360, elevation: e }; });
  return { item: find.item, bearing, elevation: CONSTELLATION_UP, stars, lines: O.lines };
}
