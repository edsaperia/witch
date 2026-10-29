// The night's deal of area types (Ed, 2026-10-28: "keep the route changing, shuffle the creatures and area types, retain the area
// shapes"): an island's shapes (its areas, lakes, coast and legend areas) are its world's, every night the same; its roster's area
// types (each with its creature, flora, recipe, scenes and set piece) are dealt onto them each night along that night's route
// (rules/leyroute.ts), so that the island's own kind is the first area the waves reach ("Always first") and no kind is in two areas
// one after the other ("The same creature shouldn't appear two waves in a row"). The roster itself (how many areas of each kind:
// rules/rosters.ts) is the island's; only the places move. Home has no kind of its own, so only the second rule holds there.
import { rng } from "./random";

/** Types for the route's areas in order (`deck`: the island's types, one an area, any order), the island's own kind first where
 *  it has one, no kind twice in a row; the best of a few seeded deals by `score` (higher better: the legends paired, rules/map.ts),
 *  the first deal kept on a tie. A deck no order can deal that way (one kind on more than half the areas) is dealt with as few
 *  repeats side by side as it can, and `ok` false. */
export function dealAlongRoute(deck: readonly number[], kindOf: (type: number) => string, own: string | null, seed: number, score?: (types: number[]) => number, tries = 8): { types: number[]; ok: boolean } {
  const r = rng(seed * 7717 + 31), n = deck.length;
  let best: number[] | null = null, bestScore = -Infinity;
  for (let t = 0, made = 0; t < tries * 8 && made < tries; t++) {
    const types = dealOnce(deck, kindOf, own, r);
    if (!types) continue;
    made++;
    const s = score ? score(types) : 0;
    if (!best || s > bestScore) { best = types; bestScore = s; }
    if (!score) break;
  }
  if (best) return { types: best, ok: true };
  // (no order keeps them apart: the deck as it is, the own kind first)
  const rest = [...deck], i = own ? rest.findIndex(x => kindOf(x) === own) : -1, first = i >= 0 ? rest.splice(i, 1) : [];
  return { types: [...first, ...rest].slice(0, n), ok: false };
}

/** One seeded deal, or null where it ran into a dead end. Each step takes a type left in the deck whose kind isn't the last one's:
 *  one whose areas left would otherwise be too many to keep apart (more than half of those still to deal), else one at random by
 *  how many it has left. */
function dealOnce(deck: readonly number[], kindOf: (type: number) => string, own: string | null, r: () => number): number[] | null {
  const left = new Map<number, number>();
  for (const t of deck) left.set(t, (left.get(t) ?? 0) + 1);
  const out: number[] = [], n = deck.length;
  // (kinds, not types: a kind's areas are all one type on an island by roster, but count them by kind all the same)
  const kindLeft = (k: string) => { let c = 0; for (const [t, m] of left) if (kindOf(t) === k) c += m; return c; };
  for (let i = 0; i < n; i++) {
    const last = i ? kindOf(out[i - 1]) : null, rem = n - i;
    let pick: number | undefined;
    if (i === 0 && own) pick = [...left.keys()].find(t => kindOf(t) === own && left.get(t)! > 0);
    if (pick === undefined) {
      const cands = [...left].filter(([t, m]) => m > 0 && kindOf(t) !== last);
      if (!cands.length) return null;
      const forced = cands.find(([t]) => kindLeft(kindOf(t)) * 2 > rem);
      if (forced) pick = forced[0];
      else {
        let x = r() * cands.reduce((a, [, m]) => a + m, 0);
        for (const [t, m] of cands) { pick = t; if ((x -= m) < 0) break; }
      }
    }
    out.push(pick!);
    left.set(pick!, left.get(pick!)! - 1);
  }
  return out;
}

/** Where the rules break along a route of kinds, if anywhere (the tests' check): the own kind not first, a kind twice in a row. */
export function dealProblems(kinds: readonly string[], own: string | null): string[] {
  const out: string[] = [];
  if (own && kinds.length && kinds[0] !== own) out.push(`first is ${kinds[0]}, not ${own}`);
  for (let i = 1; i < kinds.length; i++) if (kinds[i] === kinds[i - 1]) out.push(`${kinds[i]} at waves ${i} and ${i + 1}`);
  return out;
}

/** Each of `kinds` (the night's legends, in order: the early quest's first) matched to a legend area of its own beside one of its
 *  areas, as many as can be (augmenting paths): `beside(kind)` the legend areas beside its areas, the better first. */
export function matchLegendAreas(kinds: readonly string[], beside: (kind: string) => string[]): Map<string, string> {
  const slotOf = new Map<string, string>(), kindAt = new Map<string, string>();
  const tryKind = (k: string, seen: Set<string>): boolean => {
    for (const s of beside(k)) {
      if (seen.has(s)) continue;
      seen.add(s);
      const other = kindAt.get(s);
      if (other === undefined || tryKind(other, seen)) { kindAt.set(s, k); slotOf.set(k, s); return true; }
    }
    return false;
  };
  for (const k of kinds) tryKind(k, new Set());
  return slotOf;
}
