// A legend's circle sized to fit it (Ed, 2026-10-26: "Legend circles need to be larger. Often legends don't fit in them"). Each
// species' legend as drawn, asleep (its nap: how a wild legend lies in its circle) and awake, in metres, is measured from the art
// by tools/legends/footprint.mjs into config/legend-footprints.json. A legend lies `top` x r north of its circle's middle (the
// floor open in front of it); there the circle is r x sqrt(1 - top²) across either way, and its sleeping body, half its width,
// must fit inside that with `fit.margin` metres to spare. So its radius is the least that does, never smaller than the circle it
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
  const half = s.asleep[0] / 2 + (LC.fit?.margin ?? 0);
  return half / Math.sqrt(Math.max(0.05, 1 - LC.top * LC.top));
}

/** A species' legend circle's radius (m): what fits its legend, never less than it had before, never more than the cap: `max`
 *  if given (a legend area's, legendClearing.fit.areaMax; the zoo's), else the tuning's fit.max (in an area with a runestone). */
export function legendRadius(species: string, LC: Clearing, max = LC.fit?.max ?? Infinity): number {
  const before = LC.species[species] ?? LC.radius;
  return Math.max(before, Math.min(max, radiusToFit(species, LC)));
}

/** How far a species' sleeping legend reaches past its circle of radius r (m; 0 or less: it fits), at its place `top` x r north. */
export function overflow(species: string, r: number, LC: Clearing): number {
  const s = LEGEND_SIZES[species];
  if (!s) return -Infinity;
  return s.asleep[0] / 2 - r * Math.sqrt(Math.max(0, 1 - LC.top * LC.top));
}
