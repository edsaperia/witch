// The find sets (Ed, 2026-11-03, the challenge areas: "when you clear it you get the find. Each phase and biome have different set of
// finds; when you have them all you get a flask instead."): every permanent upgrade (rules/finds.ts FIND_KINDS) belongs to one set,
// a biome's at one stage of her journey (early, mid or late islands: the island's place in her progression, not a night's phases).
// A challenge area's find is drawn from its island's set alone (setPick), over the set's finds she hasn't got; once she has the
// whole set the reward is a flask instead (rules/challenge.ts).
//
// Which set an island's is (islandSet): its biome (home's and a home kind's island temperate; any other its own kind's biome,
// art/areas/<id>/kind.json) and its stage, by its phase among the phases that biome's islands have: temperate's islands are home
// (phase 0) and the home and phase-1 kinds' (1, 2), every other biome's the phase-2, -3 and -4 kinds' (3, 4, 5); the first of
// them early, the second mid, the last late. The sets themselves are data, config/find-sets.json, each find as "<kind>:<item>".
// The current finds have no biome or stage of their own (only the broom parts sit on the Workshop's biome map, rules/broomParts.ts
// BOARD), so that file's deal is provisional, for Ed to change: see docs/notes/house.md "Find sets". No drawing here.
import RAW from "../../config/find-sets.json";
import { KINDS_TABLE } from "./kinds";
import { FIND_KINDS, type FindKindId, type Found } from "./finds";
import { hash2 } from "./random";

export type Band = "early" | "mid" | "late";
export const BANDS: readonly Band[] = ["early", "mid", "late"];
/** A set: its biome, its stage, and its finds in order (the draw's tickets). */
export interface FindSet { biome: string; band: Band; finds: { kind: FindKindId; item: string }[] }

const parse = (f: string): { kind: FindKindId; item: string } => { const i = f.indexOf(":"); return { kind: f.slice(0, i) as FindKindId, item: f.slice(i + 1) }; };
export const FIND_SETS: readonly FindSet[] = (RAW as { sets: { biome: string; band: Band; finds: string[] }[] }).sets.map(s => ({ biome: s.biome, band: s.band, finds: s.finds.map(parse) }));

/** The biome of a kind's island (home's, "home", temperate). */
export const biomeOf = (kind: string): string => (kind === "home" ? "temperate" : KINDS_TABLE[kind]?.biome ?? "temperate");

/** The island phases a biome's islands have, lowest first (home's phase 0 for temperate; each kind's island its kind's phase + 1). */
export function biomePhases(biome: string): number[] {
  const out = new Set<number>(biome === "temperate" ? [0] : []);
  for (const [, k] of Object.entries(KINDS_TABLE)) if (!k.placeholder && (k.biome ?? "temperate") === biome) out.add(k.phase + 1);
  return [...out].sort((a, b) => a - b);
}

/** An island's stage in her journey: its phase's place among its biome's islands' phases (the first early, the last late, any
 *  between mid; past the last, late). */
export function bandOf(biome: string, phase: number): Band {
  const P = biomePhases(biome), i = P.indexOf(phase);
  if (P.length < 2) return "early";
  if (i === 0 || phase < P[0]) return "early";
  if (i === P.length - 1 || phase > P[P.length - 1]) return "late";
  return "mid";
}

/** The set an island holds (by its kind, "home" for home, and phase), or null with none for it. */
export function islandSet(island: { kind: string; phase: number } | null | undefined, sets: readonly FindSet[] = FIND_SETS): FindSet | null {
  if (!island) return null;
  const biome = biomeOf(island.kind), band = bandOf(biome, island.phase);
  return sets.find(s => s.biome === biome && s.band === band) ?? null;
}

/** The set's finds she hasn't got. */
export const setLeft = (set: FindSet, found: Found) => set.finds.filter(f => !found[f.kind]?.has(f.item));

/** The challenge's find (the night's seed): one seeded draw over the set's finds she hasn't got, as the night's draw over all of
 *  them is (finds.ts nightPick); null once she has the whole set (the reward a flask instead). */
export function setPick(seed: number, found: Found, set: FindSet): { kind: FindKindId; item: string } | null {
  const left = setLeft(set, found);
  if (!left.length) return null;
  return left[Math.floor(hash2(seed, left.length, 8123) * left.length) % left.length];
}

/** Every find of every kind, as "<kind>:<item>" (for the sets' check: each in exactly one set). */
export const allFinds = (): string[] => FIND_KINDS.flatMap(k => k.items.map(i => `${k.id}:${i}`));
