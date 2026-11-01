// The kinds table: each creature kind, its introduction phase and its island bearing (clockwise from north).
// Current kind.json counts (Ed, 2026-10-31: "Game wins"): home 10, phase 1 6, then 16 each in phases 2, 3 and 4.
// All 64 are designed; none is a placeholder. Its own island is one phase after its introduction.
// `dir` is the compass point for reading; `biome` is the island theme. The roster (Ed, 2026-10-23) has 16 temperate
// kinds and 8 biomes of 6 kinds, one fantastic each; "rocky" became "volcanic" that day.
// Before that roster the counts were 10/10/12/14/18, the last 32 placeholders (unknown-NN).
//
// One line a file, so builders adding areas don't collide (Ed, 2026-10-13): an area's creature's line is its folder's
// art/areas/<id>/kind.json (`{ kind, slot, phase, bearing, dir, biome }`), a placeholder's config/kinds/<id>.json (`placeholder`
// true), gathered by slot into art/areas/index.js (AREA_FOLDER_KINDS, written by node tools/data.mjs areas index, so every
// bundler sees plain imports) and assembled here: a slot is a kind's place in the table, and the rosters and the sea chart hash
// by it (bearingOf, the rosters' deals), so it never moves; a new kind takes a placeholder's slot, and that placeholder's file
// goes. node tools/data.mjs areas check (in npm test) fails on a stale index or a slot missing or taken twice.
export interface KindInfo { phase: number; bearing: number; dir: string; /** the theme its island's direction suggests */ biome?: string; /** a kind not designed yet (Ed, 2026-10-11: shown as '?'): its island is on the sea chart only */ placeholder?: boolean }
export interface KindLine extends KindInfo { kind: string; slot: number }

import { AREA_FOLDER_KINDS } from "../../art/areas/index.js";

/** The table by slot (throws on a slot missing or taken twice, or a kind twice: the check names the file). */
export function assembleKinds(lines: KindLine[]): Record<string, KindInfo> {
  const sorted = [...lines].sort((a, b) => a.slot - b.slot), out: Record<string, KindInfo> = {};
  sorted.forEach((l, i) => {
    if (l.slot !== i) throw new Error(`kinds table: ${l.kind} has slot ${l.slot}, but ${i} comes next (slots run 0 to ${sorted.length - 1}, one kind each)`);
    if (out[l.kind]) throw new Error(`kinds table: ${l.kind} is in it twice`);
    const { kind, slot, ...info } = l; void slot;
    out[kind] = info;
  });
  return out;
}
export const KINDS_TABLE: Record<string, KindInfo> = assembleKinds(AREA_FOLDER_KINDS as KindLine[]);
/** Each kind's slot (the table is assembled in slot order). */
export const KIND_SLOTS: Record<string, number> = Object.fromEntries(Object.keys(KINDS_TABLE).map((k, i) => [k, i]));
/** The classic map's kinds: the first 32 slots, today's 32 when the journey began (all introduced before phase 3 then). By slot,
 *  not phase, since the roster moved some of them out to the biomes (Ed, 2026-10-23), so the classic map stays as it was. */
export const CLASSIC_SLOTS = 32;
