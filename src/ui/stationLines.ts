// What a station's panel holds, line by line (ui/stationPanel.ts draws it; Ed, 2026-10-21/23, the station menus): pure, so the
// lines, what can be chosen on them and the Workshop's numbers are tested without a page. A line is one focusable row: a shelf's
// items, its colours' parts, a row of its colour grid, a fit slider; and the Workshop's (Ed, 2026-10-22/23; docs/backlog/workshop.md):
// a slot's part cards at the bay (the empty slot first, then the slot's parts, the ones she hasn't found greyed, no hint), the sets'
// chips (their progress, lit when whole), and the pegboard's 3 × 3 board (read-only: fitting stays at the bay). The arrows and the
// d-pad move along a line (its n cells) and between lines.
import { BOARD, PARTS, SETS, SLOTS, broomTuning, completeSet, emptySlot, fitPart, partById, partsFor, partsPull, setProgress, type BroomPart, type Fitted, type Slot } from "../rules/broomParts";
import { broomSpell } from "../rules/spells";
import { itemsToChoose, shownItems, type Shelf } from "../rules/wardrobe";
import type { Tuning } from "../rules/tuning";
import { bindings, type Bindings } from "../platform/bindings";

/** One focusable line of the panel. `readOnly`: focus only, nothing chosen (the pegboard). */
export interface Line { shelf: number; kind: "items" | "parts" | "grid" | "fit" | "cards" | "chips"; n: number; row?: number; axis?: string; readOnly?: boolean; /** a list shelf's line: the one item it is (its index among the shown items) */ item?: number }
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
    if (itemsToChoose(s, ctx.owned)) {
      if (s.list) shownItems(s).forEach((_, k) => out.push({ shelf: i, kind: "items", n: 1, item: k })); // (a list: an item a line, up and down to choose)
      else out.push({ shelf: i, kind: "items", n: shownItems(s).length, ...(s.readOnly ? { readOnly: true } : {}) });
    }
    if (s.colour) {
      if (s.colour.length > 1) out.push({ shelf: i, kind: "parts", n: s.colour.length });
      const { cols, rows } = ctx.grid(s);
      for (let r = 0; r < rows; r++) out.push({ shelf: i, kind: "grid", n: cols, row: r });
    }
    for (const a of s.fit ?? []) if (ctx.fitOn(a)) out.push({ shelf: i, kind: "fit", n: 1, axis: a });
  });
  return out;
}

/** The item on an items line's place: a list's own one, or the row's `col`th. */
export const itemAt = (s: Shelf, l: Line, col: number) => shownItems(s)[l.item ?? col];
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
export const partsFound = (found: ReadonlySet<string>): string => `${PARTS.filter(p => found.has(p.id)).length} of ${PARTS.length} parts found`;
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
