// The kinds table: every kind of creature (each an area type's species and a legend), with the phase it's introduced in (0 home:
// its island is phase 1; 1 phase 1; 2 phase 2) and its island's planned bearing on the sea chart, degrees clockwise from north
// (Ed, 2026-10-11, docs/backlog/journey.md 'Rosters' and 'Biomes by direction': north cold, south hot, east rocky, west jungle,
// the diagonals blending). `dir` is the bearing's compass point, for reading; `biome` the theme its island's direction suggests.
// Home 10, phase 1 10, phase 2 12: the easiest and most familiar at home, tougher and stranger later. Ed approved the 32 as
// drafted (2026-10-11). Home is green forests and mostly cute mammals, no flyers or insects (Ed, 2026-10-12): owl, toad and
// beetle swapped phase and bearing with marten, stoat and badger, so the chart's rings stay as they were. The rest (Ed,
// 2026-10-11: "We should generate all the islands. For islands where we haven't designed the creatures yet, use '?'";
// journey.md: 14 introduced in phase 3, 18 in phase 4, none in phase 5) are placeholders (unknown-NN, placeholder true): their
// islands have a seed, size and coast and show on the sea chart as '?', but no one sails there and they're never dealt or put
// on a playable island. Since the roster (Ed, 2026-10-23, docs/backlog/journey.md: 8 biomes of 6 kinds, one fantastic each, and
// 16 temperate; "rocky" renamed "volcanic" the same day) all 64 are designed and none is a placeholder: home 10, phase 1 6, then
// 16 a phase (docs/notes/island.md's table, made from the kinds' files by tools/docs/tables.mjs).
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
