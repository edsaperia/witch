// What she can wear at the treehouse's dressing stations (Ed, 2026-10-21, the station menus; config/wardrobe.json says what each
// field is): each station's shelves, the items on them, which of them she owns (a first game's starting set, and anything found
// since: app/owned.ts keeps them), whether she's wearing one, and putting one on. Only items are
// found: every colour is hers from the start (Ed, "She starts with all the colour variants"). Pure: the genome in, a new one out.
import WARDROBE from "../../config/wardrobe.json";
import type { Slot } from "./broomParts";
import { homeStation } from "./clothesPile";
import { FANTASY_SKINS, HUMAN_SKINS } from "../../art/skinTones.js";
import { hsv2rgb } from "../../art/core.js";

/** A thing she can wear: what it sets on her genome (a dotted path for a part), and whether it's hers in a first game (the rest
 *  are found in the forest, as the other permanent upgrades are: Ed, 2026-10-21). */
export interface WardrobeItem { id: string; name: string; set: Record<string, string | number | boolean>; start?: boolean;
  /** a bag's 💌 stats: multipliers on the tuning's invites numbers (cooldown, range, homing...) while she wears it (rules/bags.ts) */ invites?: Record<string, number>;
  /** a bag's 💌 stats the tuning has at 0 (inaccuracy, bloom...): added on, not multiplied (rules/bags.ts) */ invitesAdd?: Record<string, number>;
  /** the words under its name on a panel's card ("faster throws, shorter reach") */ stat?: string;
  /** a toggle's short label, on its card in place of a picture (the basin's makeup: "Lips", "Eyes", "Blush") */ short?: string;
  /** a toggle's colour part (its shelf's colour grid's): choosing a colour for that part puts it on (lipstick and its lips) */ colour?: string }
/** A row of a station's panel: its items, its colour grid's parts and kind, its fit sliders (WITCH_AXES); or the Workshop's (Ed,
 *  2026-10-23; docs/backlog/workshop.md): a slot's broom-part cards, the sets' chips, the pegboard's 3 × 3 board. */
export interface Shelf { id: string; label: string; items: WardrobeItem[]; /** its items' live pictures (the bags firing: Ed, 2026-10-29), shown with the stat line for the one in focus only (Ed, 2026-11-07: "Show the stats line and firing preview only for the bag in focus") */ preview?: boolean;
  /** its items each on or off by itself, choosing a worn one taking it off (the basin's makeup: Ed, 2026-11-07, "lipstick colour, eyeshadow colour, blush on/off") */ toggle?: boolean;
  /** a button, not a choice: chosen, the panel plays it (the basin's "teeth": Ed, 2026-11-07, "a 'brush your teeth' button ... flavour only, no gameplay effect") */ action?: string; colour?: string[]; grid?: "cloth" | "skin"; fit?: string[]; always?: boolean; /** the part of her the camera zooms in on while it's chosen (camera.station.parts) */ frame?: string;
  /** the Workshop's bay: a row of part cards for this slot of her broom (rules/broomParts.ts), the empty slot first */ slot?: Slot;
  /** the bay: the sets' progress, a chip each */ sets?: boolean;
  /** the pegboard: the parts on the 3 × 3 biome map (broomParts.ts BOARD) */ board?: boolean;
  /** the Broom station's Trail row: her cooldown trail's colour presets, a tile each (render/trailColours.ts; Ed, 2026-11-03) */ trail?: boolean;
  /** to look at, nothing chosen (the pegboard: Ed, 2026-10-23, "its own read-only station menu; fitting stays at the bay") */ readOnly?: boolean }
type Genome = Record<string, unknown>;

const RAW = WARDROBE as unknown as { stations: Record<string, string[]>; shelves: Record<string, Omit<Shelf, "id">>; bareHead?: string[] };
export const SHELVES: Record<string, Shelf> = Object.fromEntries(Object.entries(RAW.shelves).map(([id, s]) => [id, { ...s, id }]));
export const ITEMS: WardrobeItem[] = Object.values(SHELVES).flatMap(s => s.items);
const BY_ID = new Map(ITEMS.map(i => [i.id, i]));
export const itemById = (id: string): WardrobeItem | undefined => BY_ID.get(id);

/** The colour grids (Ed, 2026-10-21: "Colour picker has only 5 rows"): 5 rows. Cloth (garments, hair, the hat, the broom) is 13
 *  across, the creator's 12 hues and its grey column, its rows these of the creator's 9 (ui/creator.ts swatchAt). Skin (Ed,
 *  2026-11-07: "skin tone range plus some fantasy tones"; art/skinTones.js) is 3 across, palest at the top: the Monk scale's ten
 *  human tones two to a row in order (Monk 1 and 2, 3 and 4 ... 9 and 10), then a fantasy tone each row (frost blue, lilac, ash
 *  grey, light green, night indigo: the light green her starting skin, Ed 2026-11-07, so its column is palest at the top but for it). */
export const GRID_ROWS = 5;
export const CLOTH_COLS = 13, CLOTH_ROWS = [1, 3, 4, 6, 8];
export const SKIN_COLS = 3;
/** A skin swatch (hue, saturation, value) at column `col`, row `row` (0 the palest): columns 0 and 1 the human tones, 2 the fantasy. */
export const skinSwatch = (col: number, row: number): number[] => [...(col < 2 ? HUMAN_SKINS[row * 2 + col] : FANTASY_SKINS[row])];
/** The skin swatch nearest a colour (by red, green and blue as the eye weighs them, as the panel ticks one): her saved skin is
 *  snapped to this on load (ui/creator.ts snapPalette), not to the cloth grid, so a skin from the dressing table stays hers. */
export function nearestSkin(c: number[]): number[] {
  const rgb = hsv2rgb as (h: number, s: number, v: number) => number[], [r0, g0, b0] = rgb(c[0], c[1], c[2]);
  let best = skinSwatch(0, 0), bd = Infinity;
  for (let row = 0; row < GRID_ROWS; row++) for (let col = 0; col < SKIN_COLS; col++) {
    const s = skinSwatch(col, row), [r, g, b] = rgb(s[0], s[1], s[2]), m = (r + r0) / 2;
    const d = (2 + m / 256) * (r - r0) ** 2 + 4 * (g - g0) ** 2 + (2 + (255 - m) / 256) * (b - b0) ** 2;
    if (d < bd) { bd = d; best = s; }
  }
  return best;
}

/** A station's shelves, top to bottom (config/house/'s object id), or null for one with none. */
export function shelvesAt(station: string): Shelf[] | null { // (the guests' bedrooms' furniture holds what their home namesakes do: Ed, 2026-11-07, "their wardrobe becomes a wardrobe rail (jacket, top), and their dressing table holds hair, sunglasses and earrings")
  const home = homeStation(station);
  const ids = RAW.stations[home];
  return ids ? ids.map(id => SHELVES[id]) : null;
}

/** A shelf's items as its panel shows them (all of them: the brooms that waited on the Workshop are its parts now). */
export const shownItems = (s: Shelf): WardrobeItem[] => s.items;
/** Whether a shelf's items row shows: two or more of them hers (Ed, 2026-10-23: "Don't show options where there's nothing to choose
 *  yet"), or any of them not found yet, shown as grey silhouettes (Ed, 2026-11-07: "they're good foreshadowing", so the unfound shoes
 *  and sunglasses show even while she has only one of that shelf); a toggle's with one (on or off is a choice). */
export const itemsToChoose = (s: Shelf, owned: ReadonlySet<string>): boolean => { const items = shownItems(s), mine = items.filter(i => owned.has(i.id)).length; return mine >= (s.toggle ? 1 : 2) || (mine < items.length && items.length >= 2); };
/** Whether she's drawn without her hat while `station`'s panel is open (its choices are on her head or face: Ed, 2026-10-23). */
export const bareHeadAt = (station: string): boolean => !!RAW.bareHead?.includes(homeStation(station));

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

/** Her genome with a toggle `item` taken off (a copy): each value it sets back to off (false, 0, "none"). */
export function unwear(g: Genome, item: WardrobeItem): Genome {
  const off = Object.fromEntries(Object.entries(item.set).map(([p, v]) => [p, typeof v === "boolean" ? false : typeof v === "number" ? 0 : "none"]));
  return wear(g, { ...item, set: off });
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
