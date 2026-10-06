// Area recipes (#119): an area type as data alone, one object each, so a new area type is a recipe and some tuning, no code.
// art/areas.js folds every recipe into the registries the game and the art read, as if it had been written there:
//   the area itself     id, name, creature (a species id), by, leaf (its plants' hue), floor ([kind, hue, sat, val]; the kind
//                       picks its ground genome, art/ground.js, and its tuft mix, art/tufts.js), text ({ floor, wall, small, big,
//                       set }: Ed's columns), wall, small, big (props, as art/areas.js P() and tree() write them), set (a set piece)
//   flags               sharesCreature (its creature may be another area's: Ed's rule is a creature of its own for every
//                       area, so a recipe says so if it breaks it), ponds (more moonlit ponds), wet (its paths run as streams and boardwalks), steep (a flight of stairs may
//                       stand at its clearing's edge), pathKinds (path kinds it suits besides those whose moods name it)
//   layout              how its trees and undergrowth stand (art/areas.js AREA_LAYOUTS: pattern, density, clump, glades, ...)
//   flora               its tree species and palette (art/flora/areas.js AREA_FLORA)
//   setPiece            [kind, text, size] for art/setpieces.js NEW_SET_PIECES, when it has no `set` of its own
//   settings            { treeDensity, groundCover } (config/area-types.json's numbers, which win when it names the area)
//   ground              its own ground genome over its floor kind's (art/ground.js)
// The creature a recipe names must be a species the game has (art/genome/species.js and the configs keyed by species).
import { FEN } from "./recipes/fen.js";
import { HERONRY } from "./recipes/heronry.js";
export const AREA_RECIPES = [FEN, HERONRY];

// What is missing from a recipe, if anything.
export function recipeProblems(R) {
  const out = [];
  for (const k of ["id", "name", "creature", "floor", "text", "layout"]) if (R[k] == null) out.push(k);
  if (R.floor && (!Array.isArray(R.floor) || R.floor.length !== 4)) out.push("floor");
  if (!R.set && !R.setPiece) out.push("set or setPiece");
  if (!(R.big?.length)) out.push("big");
  return out;
}
