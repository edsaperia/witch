// Dark-coated legends lit enough to read at night (Ed, 2026-10-07: "lift the night body light only for legends whose
// coats are dark enough to vanish at night", by a measured rule rather than a list, so new species follow it).
import * as Art from "../../art/generator.js";
import type { Style } from "./style";

const lum = (c: number[]) => (0.3 * c[0] + 0.55 * c[1] + 0.15 * c[2]) / 255;
const coat = new Map<string, number>();

/** A species' coat luminance, 0 to 1: its body colour as the art bakes it (art/creatures.js speciesColours). */
export function coatLuminance(species: string, style: Style): number {
  let L = coat.get(species);
  if (L === undefined) { const c = (Art.speciesColours as (sp: string, st: Style) => Record<number, number[]>)(species, style)[(Art.M as Record<string, number>).BODY]; L = c ? lum(c) : 1; coat.set(species, L); }
  return L;
}

/** Its light floor at night (wildLegends.seen): floor, or for a coat so dark that floor times its luminance is under
 *  `dark`, raised to dark over its luminance (so its floored look reaches dark), at most `liftMax`. */
export function legendFloor(floor: number, L: number, dark = 0, liftMax = 1): number {
  if (!(dark > 0) || floor * L >= dark) return floor;
  return Math.min(Math.max(floor, liftMax), dark / Math.max(L, 1e-3));
}
