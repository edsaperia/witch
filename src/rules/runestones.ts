// Which runestone each area stands (Ed, 2026-10-12, #716: "When maps are generated they should use every runestone variation
// before they repeat"): the art's forms (art/areas.js runestoneForm) dealt like a shuffled deck, by the map's seed, to its areas in
// order; only when every form is out is the deck shuffled again. Each stone is mirrored on its own coin toss, as scenes are.
import { hash2, rng } from "./random";

/** How many forms the art has (art/areas.js RUNESTONE_FORMS). */
export const RUNESTONE_FORMS = 20;

export interface Runestone { form: number; flip: boolean }

/** Each cell's stone, by its key ("cx,cy"), the cells dealt in the order given. */
export function dealRunestones(cells: readonly (readonly [number, number])[], seed: number, forms = RUNESTONE_FORMS): Map<string, Runestone> {
  const r = rng(seed * 7 + 901), out = new Map<string, Runestone>();
  let deck: number[] = [];
  for (const [cx, cy] of cells) {
    if (!deck.length) {
      deck = Array.from({ length: forms }, (_, i) => i);
      for (let i = forms - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    }
    out.set(`${cx},${cy}`, { form: deck.pop()!, flip: hash2(cx, cy, seed + 903) < 0.5 });
  }
  return out;
}
