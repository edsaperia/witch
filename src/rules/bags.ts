// Her bag's 💌 stats (Ed, 2026-10-29: "We should start with a choice of two bags; faster rate of fire but shorter range, and slower
// rate of fire but longer range"): a bag item's `invites` in config/wardrobe.json multiply the tuning's invites.cooldown and
// invites.range while she wears it (the Quick bag, the bum bag: 0.76 and 0.76, 0.42 s and 25 m on today's 0.55 s and 33 m; the
// Far bag, the satchel: 1.27 and 1.3, 0.7 s and 43 m); no bag, the tuning's own. Which she wears is her look's (bagOf), the page
// setting it on her spells (`spells.bag`, from her save; the stations change it mid-night: setBag), as her broom's parts are.
import { itemById, SHELVES, wears, type WardrobeItem } from "./wardrobe";
import type { Tuning } from "./tuning";

/** The bags with 💌 stats, in the bag shelf's order. */
export const BAGS: readonly WardrobeItem[] = (SHELVES.bag?.items ?? []).filter(i => i.invites);

/** The bag she wears in look `g` (its item id), or "" for none. */
export function bagOf(g: Record<string, unknown> | null | undefined): string {
  if (!g) return "";
  return BAGS.find(b => wears(g, b))?.id ?? "";
}

/** A bag's name and stat line, for a panel ("Quick bag: faster throws, shorter reach"), or "" for none. */
export function bagLine(id: string): string {
  const b = itemById(id);
  return b?.invites ? `${b.name}: ${b.stat ?? ""}` : "";
}

const cache = new WeakMap<Tuning, Map<string, Tuning>>();
/** The tuning with bag `id`'s 💌 stats on it (the same object for no bag, or one without any). */
export function bagTuning(t: Tuning, id: string | undefined): Tuning {
  const m = id ? itemById(id)?.invites : undefined;
  if (!m) return t;
  let by = cache.get(t);
  if (!by) cache.set(t, (by = new Map()));
  const hit = by.get(id!);
  if (hit) return hit;
  const I = { ...t.invites } as Record<string, unknown>;
  for (const [k, f] of Object.entries(m)) if (typeof I[k] === "number" && typeof f === "number") I[k] = (I[k] as number) * f; // (any of the 💌's numbers: the bags' weapon stats, Ed 2026-10-29)
  const out = { ...t, invites: I } as Tuning;
  by.set(id!, out);
  return out;
}

/** Her bag now (the stations, mid-night: main.ts). */
export function setBag(s: { bag?: string }, id: string): void { s.bag = id || undefined; }
