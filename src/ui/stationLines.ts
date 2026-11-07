// What a station's panel holds, line by line (ui/stationPanel.ts draws it; Ed, 2026-10-21/23, the station menus): pure, so the
// lines, what can be chosen on them and the Workshop's numbers are tested without a page. A line is one focusable row: a shelf's
// items, its colours' parts, a row of its colour grid, a fit slider; and the Workshop's (Ed, 2026-10-22/23; docs/backlog/workshop.md):
// a slot's part cards at the bay (the empty slot first, then the slot's parts, the ones she hasn't found greyed, no hint), the sets'
// chips (their progress, lit when whole), and the pegboard's 3 × 3 board (read-only: fitting stays at the bay). The arrows and the
// d-pad move along a line (its n cells) and between lines. And the Broom station's Trail row (Ed, 2026-11-03): her cooldown trail's
// colour presets, a tile each (render/trailColours.ts).
import { BOARD, SETS, SLOTS, broomTuning, completeSet, emptySlot, fitPart, partById, partsFor, partsPull, setProgress, type BroomPart, type Fitted, type Slot } from "../rules/broomParts";
import { broomSpell } from "../rules/spells";
import { itemsToChoose, shownItems, type Shelf } from "../rules/wardrobe";
import type { Tuning } from "../rules/tuning";
import { homeStation } from "../rules/clothesPile";
import { bindings, type Bindings } from "../platform/bindings";
import { TRAIL_PRESETS } from "../render/trailColours";

/** How a shelf's item cards picture each item (Ed, 2026-11-02: "In treehouse stations: dressing, wardrobe, cloak, hat mirror: in the
 *  preview boxes on the menu, show the clothing item alone instead of a portrait of the witch"; art/witch.js witchCardSprite, drawn by
 *  ui/stationPanel.ts wearPicture): the dressing table's her head and shoulders, hat off ("for skin tone / hair / earrings / glasses,
 *  render her from shoulders to top of her head, without hat"); the shoe rack's her legs ("shoes should show her legs, thighs down");
 *  the cloak pegs' all of her from behind, hat off ("cloak should be shown 3/4 from the back, hat removed"); the wardrobe's top and
 *  the bags alone ("include shoes and bags (though bags also has animations - keep those)"). A shelf not here: her whole. */
export const CARD_SHOW: Readonly<Record<string, "bust" | "legs" | "back" | "jacket" | "bag">> = { hair: "bust", skin: "bust", face: "bust", earrings: "bust", shoes: "legs", cloak: "back", scarf: "back", jacket: "jacket", bag: "bag" };

/** Each station's panel's heading, by its home id (a guests' bedroom's piece by its home namesake's: rules/clothesPile.ts homeStation). */
export const STATION_NAMES: Readonly<Record<string, string>> = { basin: "Basin", mirror: "Mirror", dressingTable: "Dressing table", wardrobe: "Wardrobe", cloakPegs: "Cloak pegs", shoeRack: "Shoe rack", bags: "Bags", broomBay: "The bay", lathe: "Broom", pegboard: "Pegboard" };
export const stationTitle = (id: string): string => STATION_NAMES[homeStation(id)] ?? id;

/** One focusable line of the panel. `readOnly`: focus only, nothing chosen (the pegboard). */
export interface Line { shelf: number; kind: "items" | "parts" | "grid" | "fit" | "cards" | "chips" | "trail" | "action"; n: number; row?: number; axis?: string; readOnly?: boolean; /** an items line's first item (its index among the shown items): a shelf's items wrap ITEMS_PER_LINE to a line */ from?: number }
/** A shelf's item cards to a line (the bags' nine wrap onto a second line, so up and down go where they look). */
export const ITEMS_PER_LINE = 5;
/** What the lines are made with: what she owns (items) and has found (parts), and which fit sliders mean anything on her now. */
export interface LineCtx { owned: ReadonlySet<string>; fitOn(axis: string): boolean; grid(s: Shelf): { cols: number; rows: number } }

/** The panel's lines, top to bottom, every kind at once (Ed, 2026-10-23: no tabs): a shelf's items, its colours' parts (two or
 *  more) and its grid's rows, then its fit sliders; the Workshop's part cards, set chips and board. Nothing with no choice in it
 *  (Ed: "Don't show options where there's nothing to choose yet"): items only when two or more are hers, a fit slider only while
 *  what it shapes is on. (A slot's cards always show: its silhouettes say there's more to find, and the empty slot is a choice.) */
export function stationLines(shelves: readonly Shelf[], ctx: LineCtx): Line[] {
  const out: Line[] = [];
  shelves.forEach((s, i) => {
    if (s.slot) out.push({ shelf: i, kind: "cards", n: 1 + partsFor(s.slot).length });
    if (s.board) for (let r = 0; r < 3; r++) out.push({ shelf: i, kind: "cards", n: 3, row: r, readOnly: true });
    if (s.sets) out.push({ shelf: i, kind: "chips", n: SETS.length, readOnly: true });
    if (s.trail) out.push({ shelf: i, kind: "trail", n: TRAIL_PRESETS.length }); // (her trail's colours, a preset a tile: Ed, 2026-11-03)
    if (itemsToChoose(s, ctx.owned)) {
      const items = shownItems(s);
      for (let k = 0; k < items.length; k += ITEMS_PER_LINE) out.push({ shelf: i, kind: "items", n: Math.min(ITEMS_PER_LINE, items.length - k), ...(k ? { from: k } : {}), ...(s.readOnly ? { readOnly: true } : {}) });
    }
    if (s.colour) {
      if (s.colour.length > 1) out.push({ shelf: i, kind: "parts", n: s.colour.length });
      const { cols, rows } = ctx.grid(s);
      for (let r = 0; r < rows; r++) out.push({ shelf: i, kind: "grid", n: cols, row: r });
    }
    for (const a of s.fit ?? []) if (ctx.fitOn(a)) out.push({ shelf: i, kind: "fit", n: 1, axis: a });
    if (s.action) out.push({ shelf: i, kind: "action", n: 1 }); // (the basin's Teeth button: Ed, 2026-11-07)
  });
  return out;
}

/** The item on an items line's place: the line's `col`th (its first the line's `from`). */
export const itemAt = (s: Shelf, l: Line, col: number) => shownItems(s)[(l.from ?? 0) + col];
/** The panel's height as its lines would draw it, in its type's em (ui/stationPanel.ts's CSS: each card's title and padding, an
 *  items line's cards, a grid row, a fit slider...), with the tallest detail box at a card's foot: the no-scroll rule's estimate
 *  (Ed, 2026-11-07: "no station menu is taller than the screen at 1280×720"; src/ui/stationFit.test.ts, beside the panel measured
 *  in the built game by tools/stations/check.cjs). Rough by a line or so: the DOM measure is the judge. */
export const LINE_EM: Record<Line["kind"], number> = { items: 4 + 0.35, parts: 1.55 + 0.35, grid: 0.74 + 0.11, fit: 1.6 + 0.35, cards: 3.8 + 0.35, chips: 1.6 + 0.35, trail: 4 + 0.35, action: 1.75 + 0.35 };
/** A card's own (its title, its padding, the gap to the next), the panel's heading, foot and padding (the rest of the screen's height at
 *  1280×720: its body is 601 px of 720 there), and the tallest detail box (two lines). */
export const CARD_EM = 1.55 + 1.0 + 0.5, HEAD_EM = 4.8, FOOT_EM = 1.6, DETAIL_EM = 3.0;
export function panelEm(shelves: readonly Shelf[], lines: readonly Line[], detail = DETAIL_EM): number {
  const cards = new Set(lines.map(l => l.shelf)).size;
  return HEAD_EM + FOOT_EM + cards * CARD_EM + lines.reduce((a, l) => a + (l.kind === "items" && shelves[l.shelf].toggle ? 1.9 + 0.35 : LINE_EM[l.kind]), 0) + detail;
}
/** The part on a cards line's cell: the bay's slot (null, the empty slot, first; then its parts) or the pegboard's cell (row by
 *  row from the north-west). */
export function cardAt(s: Shelf, l: Line, col: number): string | null {
  if (s.slot) return col === 0 ? null : partsFor(s.slot)[col - 1]?.id ?? null;
  if (s.board) return BOARD[(l.row ?? 0) * 3 + col]?.part ?? null;
  return null;
}
/** Whether a card can be chosen: at the bay, the empty slot or a part she's found (an unfound one is a silhouette: no choosing,
 *  no hint); never on a read-only line. */
export const canChoose = (s: Shelf, l: Line, col: number, found: ReadonlySet<string>): boolean => {
  if (l.readOnly || !s.slot) return false;
  const id = cardAt(s, l, col);
  return id === null || found.has(id);
};
/** Her broom with a bay card chosen: the part fitted in its slot, or the slot emptied (∅). */
export const choose = (f: Fitted, slot: Slot, id: string | null): Fitted => (id ? fitPart(f, id) : emptySlot(f, slot));

// ---- the Workshop's numbers ----
/** The numbers the parts change, as she feels them: a name, a unit, how it's written, and which way is better (1 more, -1 less). */
const STATS: Record<string, { name: string; unit: string; dp: number; better: 1 | -1 }> = {
  treetopSpeed: { name: "Treetop speed", unit: " m/s", dp: 0, better: 1 },
  "treetop.turnRate": { name: "Turning", unit: "°/s", dp: 0, better: 1 },
  "treetop.sharpTurnBleed": { name: "Boost lost in sharp turns", unit: "", dp: 1, better: -1 },
  "treetop.boost": { name: "Boost", unit: "", dp: 1, better: 1 },
  "treetop.boostTime": { name: "Boost builds over", unit: " s", dp: 1, better: -1 },
  "treetop.glideTime": { name: "Glide to a stop", unit: " s", dp: 1, better: -1 },
  acceleration: { name: "Treetop pick-up", unit: "", dp: 1, better: 1 },
  groundSpeed: { name: "Ground speed", unit: " m/s", dp: 1, better: 1 },
  groundAcceleration: { name: "Off the mark", unit: "", dp: 0, better: 1 },
  riseTime: { name: "Rise", unit: " s", dp: 2, better: -1 },
  descendTime: { name: "Come down", unit: " s", dp: 2, better: -1 },
  "cooldown.rise": { name: "Take-off cooldown", unit: " s", dp: 2, better: -1 },
  riseCooldown: { name: "Landing cooldown", unit: " s", dp: 2, better: -1 },
  "dash.distance": { name: "Blink", unit: " m", dp: 0, better: 1 },
  "dash.cooldown": { name: "Dodge recharge", unit: " s", dp: 1, better: -1 },
  "dash.charges": { name: "Dodges", unit: "", dp: 0, better: 1 },
  pull: { name: "Sigils' pull", unit: "", dp: 2, better: -1 },
};
const num = (t: unknown, path: string): number => path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], t) as number;
const fmt = (v: number, dp: number) => { const s = v.toFixed(dp); return dp ? s.replace(/\.?0+$/, "") : s; };
/** A number she feels, bare to now: its name, the two values written, and whether now's better (true), worse (false) or the same. */
export interface StatLine { key: string; name: string; from: string; to: string; better: boolean | null }
function statLine(key: string, base: Tuning, f: Fitted): StatLine | null {
  const S = STATS[key]; if (!S) return null;
  const a = key === "pull" ? 1 : num(base, key), b = key === "pull" ? partsPull(f) : num(broomTuning(base, f), key);
  if (typeof a !== "number" || typeof b !== "number") return null;
  const unit = key === "pull" || key === "treetop.boost" ? "×" : "";
  return { key, name: S.name, from: unit + fmt(a, S.dp) + S.unit, to: unit + fmt(b, S.dp) + S.unit, better: Math.abs(b - a) < 1e-9 ? null : (b - a) * S.better > 0 };
}
/** What a part does on its own, over the bare broom: each number it changes, up (better) or down (worse). */
export const partStats = (id: string, base: Tuning): StatLine[] => {
  const p = partById(id); if (!p) return [];
  return Object.keys(p.stats).map(k => statLine(k, base, fitPart({ tip: null, chassis: null, exhaust: null }, id))).filter((x): x is StatLine => !!x);
};
/** "Her broom": every number her fitted parts change, bare → now (the empty list: a bare broom). */
export const broomSummary = (f: Fitted, base: Tuning): StatLine[] => {
  const keys = new Set(SLOTS.flatMap(s => Object.keys(partById(f[s])?.stats ?? {})));
  return [...keys].map(k => statLine(k, base, f)).filter((x): x is StatLine => !!x && x.better !== null);
};
/** The sets as chips: name, pieces fitted of how many, its spell's name, whole or not ("Rocket 3/3 · Speed"). */
export const setChips = (f: Fitted): { id: string; name: string; fitted: number; of: number; spell: string; whole: boolean }[] =>
  setProgress(f).map(({ set, fitted }) => ({ id: set.id, name: set.name, fitted, of: set.pieces.length, spell: broomSpell(set.spell)?.name ?? set.spell, whole: fitted === set.pieces.length }));
/** The sets a part is in (its detail: "Rocket set"). */
export const setsOf = (id: string): string[] => SETS.filter(s => s.pieces.includes(id)).map(s => s.name);
/** Her broom's spell now, in words: the whole set's ("Speed, from the Rocket set"), or none. */
export const spellLine = (f: Fitted): string => { const s = completeSet(f); return s ? `${broomSpell(s.spell)?.name ?? s.spell} (the ${s.name} set)` : "none: no set whole"; };
/** How many of the parts she's found. */

export type { BroomPart };

/** A gamepad on a station's panel (Ed's playtest, 2026-10-23; his layout, 2026-10-28: "the left stick or d-pad moves the highlight",
 *  cross chooses, circle goes back): which way it moves the highlight (the menu's directions, platform/bindings.ts: the d-pad, or the
 *  left stick pushed past half way, by its strongest) and whether choose is held (main.ts closes it on back, through padControls). */
export function panelPad(buttons: readonly boolean[], axes: readonly number[], B: Bindings = bindings): { dir: "" | "up" | "down" | "left" | "right"; choose: boolean; card: -1 | 0 | 1 } {
  let dir: "" | "up" | "down" | "left" | "right" = "", best = 0.5;
  for (const d of ["up", "down", "left", "right"] as const) { const v = B.padValue(`menu.${d}`, buttons, axes); if (v >= best) { best = v + 1e-9; dir = d; } }
  // (L1 and R1, the menus' tabs: a station's card before or after, Ed 2026-10-29)
  const card = B.padHeld("menu.tabNext", buttons, axes) ? 1 : B.padHeld("menu.tabPrev", buttons, axes) ? -1 : 0;
  return { dir, choose: B.padHeld("menu.choose", buttons, axes), card };
}
