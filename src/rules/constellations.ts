// Tonight's find written in the stars (Ed, 2026-10-22: "Instead of a crystal ball, the hint should be written in the stars as a
// constellation seen through the telescope in the direction of the item!"; "With all permanent upgrades, there's one per night,
// and it's hinted through the telescope"; his answers to the mock, previews/ed/starfield-mock): the night's find's outline traced
// in 7 to 10 stars (rules/finds.ts nightFind: today a wearable; broom parts, hats and bags to come, any item id an outline here),
// standing about 35° up at its bearing from the treehouse, there all night and gone once she's found it. Seen only through the telescope (render/view/camera.ts); its stars
// a little brighter than their neighbours, faint dotted lines between them fading in once she holds the view on it (render/sky.ts).
// Here, the outlines and where tonight's stands: drawing only, nothing in the rules reads it.
import type { NightFind } from "./finds";

/** An outline: its stars (degrees across the sky from its middle: x to the right, y up) and the lines joining them (by index). */
export interface Outline { stars: [number, number][]; lines: [number, number][] }

/** The outlines by item id, about 12 to 17° across: every findable wearable's (rules/finds.ts FINDABLE) so far. */
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
  backpack: { stars: [[-3.5, 4], [3.5, 4], [4, -5], [-4, -5], [-3.5, 1], [3.5, 1], [0, 6.5]], lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [0, 6], [6, 1]] },
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
