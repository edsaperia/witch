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

/** A species' legend as drawn: [width, height] in metres, asleep and awake. */
export interface LegendSize { asleep: [number, number]; awake: [number, number] }

export const LEGEND_SIZES = (RAW as unknown as { species: Record<string, LegendSize> }).species;

type Clearing = Tuning["legendClearing"];

/** The radius a species' legend needs (m) for its sleeping body to fit where it lies, with the margin; before the cap. */
export function radiusToFit(species: string, LC: Clearing): number {
  const s = LEGEND_SIZES[species];
  if (!s) return 0;
  const half = s.asleep[0] / 2 + (LC.fit?.margin ?? 0), b = backOf(LC);
  return half / Math.sqrt(Math.max(0.05, 1 - b * b));
}

/** How far back a sleeping legend lies, at most, as a share of its circle's radius: `back` (never less than the old `top`). */
export const backOf = (LC: Clearing): number => Math.max(LC.top, LC.back ?? LC.top);

/** How far north of its circle's middle a species' sleeping legend lies, as a share of the radius r (Ed, 2026-11-12: "Legends
 *  should sleep at the back of their circles, so you can stand in the circle before them"): `back`, unless its sleeping width
 *  would cross the ring there (a circle capped or squeezed smaller than its legend needs): then as far back as it fits with
 *  `fit.margin` to spare, and never further forward than `top` (where it lay before), so the front stays as open as it was. */
export function spotShare(species: string, r: number, LC: Clearing): number {
  const b = backOf(LC), s = LEGEND_SIZES[species];
  if (b <= LC.top || !s || !(r > 0)) return LC.top;
  const q = (s.asleep[0] / 2 + (LC.fit?.margin ?? 0)) / r, fits = q < 1 ? Math.sqrt(1 - q * q) : 0;
  return Math.min(b, Math.max(LC.top, fits));
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
