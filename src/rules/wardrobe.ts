// What she can wear at the treehouse's dressing stations (Ed, 2026-10-21, the station menus; config/wardrobe.json says what each
// field is): each station's shelves, the items on them, which of them she owns (a first game's starting set, and anything found
// since: app/owned.ts keeps them), whether she's wearing one, and putting one on. Only items are
// found: every colour is hers from the start (Ed, "She starts with all the colour variants"). Pure: the genome in, a new one out.
import WARDROBE from "../../config/wardrobe.json";
import type { Slot } from "./broomParts";
import { isDressingTable } from "./clothesPile";

/** A thing she can wear: what it sets on her genome (a dotted path for a part), and whether it's hers in a first game (the rest
 *  are found in the forest, as the other permanent upgrades are: Ed, 2026-10-21). */
export interface WardrobeItem { id: string; name: string; set: Record<string, string | number | boolean>; start?: boolean;
  /** a bag's 💌 stats: multipliers on the tuning's invites numbers (cooldown, range, homing...) while she wears it (rules/bags.ts) */ invites?: Record<string, number>;
  /** a bag's 💌 stats the tuning has at 0 (inaccuracy, bloom...): added on, not multiplied (rules/bags.ts) */ invitesAdd?: Record<string, number>;
  /** the words under its name on a panel's card ("faster throws, shorter reach") */ stat?: string }
/** A row of a station's panel: its items, its colour grid's parts and kind, its fit sliders (WITCH_AXES); or the Workshop's (Ed,
 *  2026-10-23; docs/backlog/workshop.md): a slot's broom-part cards, the sets' chips, the pegboard's 3 × 3 board. */
export interface Shelf { id: string; label: string; items: WardrobeItem[]; /** its items as a vertical list, one a line, moved down to choose (Ed, 2026-10-29, the bags: "a vertical list you move down to select") */ list?: boolean; colour?: string[]; grid?: "cloth" | "skin"; fit?: string[]; always?: boolean; /** the part of her the camera zooms in on while it's chosen (camera.station.parts) */ frame?: string;
  /** the Workshop's bay: a row of part cards for this slot of her broom (rules/broomParts.ts), the empty slot first */ slot?: Slot;
  /** the bay: the sets' progress, a chip each */ sets?: boolean;
  /** the pegboard: the parts on the 3 × 3 biome map (broomParts.ts BOARD) */ board?: boolean;
  /** to look at, nothing chosen (the pegboard: Ed, 2026-10-23, "its own read-only station menu; fitting stays at the bay") */ readOnly?: boolean }
type Genome = Record<string, unknown>;

const RAW = WARDROBE as unknown as { stations: Record<string, string[]>; shelves: Record<string, Omit<Shelf, "id">>; bareHead?: string[] };
export const SHELVES: Record<string, Shelf> = Object.fromEntries(Object.entries(RAW.shelves).map(([id, s]) => [id, { ...s, id }]));
export const ITEMS: WardrobeItem[] = Object.values(SHELVES).flatMap(s => s.items);
const BY_ID = new Map(ITEMS.map(i => [i.id, i]));
export const itemById = (id: string): WardrobeItem | undefined => BY_ID.get(id);

/** The colour grids (Ed, 2026-10-21: "Colour picker has only 5 rows"): 5 rows, dark to pale. Cloth (garments, hair, the hat, the
 *  broom) is 13 across, the creator's 12 hues and its grey column, its rows these of the creator's 9 (ui/creator.ts swatchAt);
 *  skin is 6 across, five undertones, rosy to golden, and a fantasy lilac. */
export const GRID_ROWS = 5;
export const CLOTH_COLS = 13, CLOTH_ROWS = [1, 3, 4, 6, 8];
const SKIN_HUES = [.03, .05, .07, .09, .11, .75], SKIN_TONES = [[.96, .22], [.84, .3], [.68, .4], [.5, .48], [.34, .52]];
export const SKIN_COLS = SKIN_HUES.length;
/** A skin swatch (hue, saturation, value) at column `col`, row `row` (0 the palest). */
export const skinSwatch = (col: number, row: number): number[] => { const [v, s] = SKIN_TONES[row]; return [SKIN_HUES[col], col === SKIN_COLS - 1 ? +(s * .8).toFixed(3) : s, v]; };

/** A station's shelves, top to bottom (config/house/'s object id), or null for one with none. */
export function shelvesAt(station: string): Shelf[] | null {
  const home = station === "bedroom2Wardrobe" || station === "bedroom3Wardrobe" ? "wardrobe"
    : isDressingTable(station) ? "dressingTable" : station;
  const ids = RAW.stations[home];
  return ids ? ids.map(id => SHELVES[id]) : null;
}

/** A shelf's items as its panel shows them (all of them: the brooms that waited on the Workshop are its parts now). */
export const shownItems = (s: Shelf): WardrobeItem[] => s.items;
/** Whether a shelf's items give her a choice: two or more of them hers (Ed, 2026-10-23: "Don't show options where there's nothing
 *  to choose yet"; the row appears once there's something to choose). */
export const itemsToChoose = (s: Shelf, owned: ReadonlySet<string>): boolean => shownItems(s).filter(i => owned.has(i.id)).length >= 2;
/** Whether she's drawn without her hat while `station`'s panel is open (its choices are on her head or face: Ed, 2026-10-23). */
export const bareHeadAt = (station: string): boolean => !!RAW.bareHead?.includes(isDressingTable(station) ? "dressingTable" : station);

const get = (g: Genome, path: string): unknown => path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown> | null | undefined)?.[k], g);
/** Whether she has `item` on: every value it sets is hers (a number: hers above 0 when its is, none when its is 0). */
export function wears(g: Genome, item: WardrobeItem): boolean {
  return Object.entries(item.set).every(([p, v]) => { const now = get(g, p); return typeof v === "number" ? (Number(now) > 0) === (v > 0) : now === v; });
}
/** Her genome with `item` on (a copy; a number she already has above 0 kept, so its fit stays). */
export function wear(g: Genome, item: WardrobeItem): Genome {
  const out = JSON.parse(JSON.stringify(g)) as Genome;
  for (const [p, v] of Object.entries(item.set)) {
    const keys = p.split("."), last = keys.pop()!;
    let o = out as Record<string, unknown>;
    for (const k of keys) o = (o[k] ??= {}) as Record<string, unknown>;
    if (typeof v === "number" && v > 0 && Number(o[last]) > 0) continue;
    o[last] = v;
  }
  return out;
}

/** The items she owns in a first game. */
export const STARTING_SET: readonly string[] = ITEMS.filter(i => i.start).map(i => i.id);
/** What she owns: the starting set, what this browser has kept (`saved`), and anything she's wearing (a look from before the
 *  stations, or from her room, isn't taken off her). */
export function ownedOf(saved: readonly string[] | null, g: Genome | null): Set<string> {
  const own = new Set([...STARTING_SET, ...(saved ?? []).filter(id => BY_ID.has(id))]);
  if (g) for (const i of ITEMS) if (wears(g, i)) own.add(i.id);
  return own;
}


/** The shelf an item is on, and the stations (house objects' ids) whose panels show that shelf, first first. */
export const shelfOf = (id: string): Shelf | undefined => Object.values(SHELVES).find(s => s.items.some(i => i.id === id));
export const stationsShowing = (shelf: string): string[] => Object.entries(RAW.stations).filter(([, ids]) => ids.includes(shelf)).map(([k]) => k);
