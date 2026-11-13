// A legend's circle sized to fit it (Ed, 2026-10-26: "Legend circles need to be larger. Often legends don't fit in them"). Each
// species' legend as drawn, asleep (its nap: how a wild legend lies in its circle) and awake, in metres, is measured from the art
// by tools/legends/footprint.mjs into config/legend-footprints.json. A legend lies at the back of its circle, `back` x r north of
// its middle (Ed, 2026-11-12: "Legends should sleep at the back of their circles, so you can stand in the circle before them"; the
// back is the side furthest from the camera, which looks north; `top` x r before, and with ?legendspot=old); there the circle is
// r x sqrt(1 - back²) across either way, and its sleeping body, half its width, must fit inside that with `fit.margin` metres to
// spare (the margin keeps it off the ring of trodden earth, `edge` metres inside the radius). So its radius is the least that does, never smaller than the circle it
// had before (the tuning's species table, else `radius`), and never more than `fit.max` (beyond about that a circle can't be
// placed in its area clear of the runestones: rules/map.ts).
import RAW from "../../config/legend-footprints.json";
import type { Tuning } from "./tuning";

/** A species' legend as drawn: [width, height] in metres, asleep and awake; `front`: how far its nap draws below its ground line
 *  (m; 0 for a kind drawn as a mesh, whose ground is its sprite's bottom row: art/mesh). */
export interface LegendSize { asleep: [number, number]; awake: [number, number]; front?: number }

export const LEGEND_SIZES = (RAW as unknown as { species: Record<string, LegendSize> }).species;

type Clearing = Tuning["legendClearing"];

/** Her on the screen before a sleeping legend (Ed, 2026-11-13, of the mole whose paw and the bear whose muzzle still covered her:
 *  "fix the others"). The circle's camera looks down at CIRCLE_ANGLE degrees (camera.circle.angle; legendFit.test.ts holds the two
 *  together), so what stands a metre tall, or is drawn a metre below its ground line, covers LAY metres of the ground's depth on
 *  the screen. HER: her height as drawn, hat and all (m). */
export const CIRCLE_ANGLE = 20, LAY = 1 / Math.tan((CIRCLE_ANGLE * Math.PI) / 180), HER = 3;

/** How far north of her a sleeping legend's spot must be for none of its drawn pixels to be over her on the circle's camera (m):
 *  what it draws below its ground line, and her own height above hers, laid over the ground between them. */
export function reachOf(species: string): number {
  return ((LEGEND_SIZES[species]?.front ?? 0) + HER) * LAY;
}

/** The radius a species' legend needs (m), before the cap: for its sleeping body to fit where it lies, `back` x r north of the
 *  middle, with the margin; and, if that is not yet far enough back for her to stand at the middle clear of its drawn pixels
 *  (reachOf: a nap drawn far below its ground line), for it to fit, with the margin, that far back. */
export function radiusToFit(species: string, LC: Clearing): number {
  const s = LEGEND_SIZES[species];
  if (!s) return 0;
  const half = s.asleep[0] / 2 + (LC.fit?.margin ?? 0), b = backOf(LC), r = half / Math.sqrt(Math.max(0.05, 1 - b * b));
  return b > LC.top ? Math.max(r, Math.hypot(reachOf(species), half)) : r;
}

/** How far back a sleeping legend lies, as a share of its circle's radius: `back` (never less than the old `top`). */
export const backOf = (LC: Clearing): number => Math.max(LC.top, LC.back ?? LC.top);

/** How far north of its circle's middle a species' sleeping legend lies, as a share of the radius r (Ed, 2026-11-12: "Legends
 *  should sleep at the back of their circles, so you can stand in the circle before them"): `back`, or further if she couldn't
 *  otherwise stand at the middle clear of its drawn pixels (reachOf); unless its sleeping width would cross the circle's edge
 *  there (a circle capped or squeezed smaller than its legend needs): then as far back as it fits inside the circle (on the ring
 *  of trodden earth if it must be: a full-size circle keeps it `fit.margin` off), and never further forward than `top` (where it
 *  lay before), so the front stays as open as it was. */
export function spotShare(species: string, r: number, LC: Clearing): number {
  const b = backOf(LC), s = LEGEND_SIZES[species];
  if (b <= LC.top || !s || !(r > 0)) return LC.top;
  const q = s.asleep[0] / 2 / r, fits = q < 1 ? Math.sqrt(1 - q * q) : 0;
  return Math.max(LC.top, Math.min(Math.max(b, reachOf(species) / r), fits));
}

/** Where a species' legend sleeps in its circle of middle (x, z) and radius r: spotShare x r north (-z) of the middle. */
export function legendSpot(species: string, x: number, z: number, r: number, LC: Clearing): { x: number; z: number } {
  return { x, z: z - r * spotShare(species, r, LC) };
}

/** A species' legend circle's radius (m): what fits its legend, never less than it had before, never more than the cap: `max`
 *  if given (a legend area's, legendClearing.fit.areaMax; the zoo's), else the tuning's fit.max (in an area with a runestone). */
export function legendRadius(species: string, LC: Clearing, max = LC.fit?.max ?? Infinity): number {
  const before = LC.species[species] ?? LC.radius;
  return Math.max(before, Math.min(max, radiusToFit(species, LC)));
}

/** How far a species' sleeping legend reaches past its circle of radius r (m; 0 or less: it fits), at its place (spotShare). */
export function overflow(species: string, r: number, LC: Clearing): number {
  const s = LEGEND_SIZES[species];
  if (!s) return -Infinity;
  const k = spotShare(species, r, LC);
  return s.asleep[0] / 2 - r * Math.sqrt(Math.max(0, 1 - k * k));
}
