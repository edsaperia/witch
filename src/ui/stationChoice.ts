// A station panel's focus and choices, apart from its drawing (ui/stationPanel.ts draws it), so they're tested without a page.
// Ed, 2026-10-28: "at the moment she changes every time I move the selector. Instead she should change only when I press the 'choose'
// button": moving (the d-pad, the right stick, the arrows, WASD, the mouse over it) only moves the focus; choosing (confirm,
// platform/menuButtons.ts, or a click) puts what's in focus on her (an owned item, a colour, the part the colours are for, a broom part
// at the bay); leaving without choosing leaves her as she was. A fit slider is the one line ◀ ▶ changes: that's the slider itself.
import { shownItems, wear, wears, type Shelf } from "../rules/wardrobe";
import type { Fitted } from "../rules/broomParts";
import { canChoose, cardAt, choose, stationLines, type Line } from "./stationLines";

export type Genome = Record<string, unknown> & { palette: Record<string, number[]> | null; accessories: Record<string, unknown> };
export interface At { line: number; col: number }

/** What a choice changed: her look, her broom's parts, or nothing (a locked one: still to be found). */
export interface Chosen { look?: Genome; fitted?: Fitted; locked: boolean }

/** What the choices need from the page: the shelves' colour grids' sizes and swatches, and her whole palette as it is now. */
export interface ChoiceCtx {
  grid(s: Shelf): { cols: number; rows: number };
  swatch(s: Shelf, col: number, row: number): number[];
  palette(g: Genome): Record<string, number[]>;
  /** Whether a fit slider means anything now (what it shapes is on). */
  fitOn(axis: string, g: Genome): boolean;
}

export class PanelChoice {
  /** The focus: a line and a place along it. */
  at: At = { line: 0, col: 0 };
  /** Each shelf's part the colours are for (its first, till another's chosen). */
  readonly part = new Map<string, string>();
  /** A choice made on something still to be found: its place, till the focus moves (the panel says "Not found yet."). */
  nope: At | null = null;

  constructor(public shelves: Shelf[], public g: Genome, public owned: ReadonlySet<string>, public found: ReadonlySet<string>, public fitted: Fitted | null, private ctx: ChoiceCtx) {}

  /** The panel's lines, top to bottom (ui/stationLines.ts). */
  lines(): Line[] { return stationLines(this.shelves, { owned: new Set(this.owned), fitOn: a => this.ctx.fitOn(a, this.g), grid: s => this.ctx.grid(s) }); }

  /** The part `s`'s colours are for. */
  partOf(s: Shelf): string { const p = this.part.get(s.id); return p && s.colour!.includes(p) ? p : s.colour![0]; }

  /** The focus moved by (dx, dy): along a line, or to the next line (the same share of the way along, from a shelf's items to its
   *  grid and back). Nothing on her changes. False if it didn't move. A fit line's ◀ ▶ is the panel's (its slider), not here. */
  move(dx: number, dy: number): boolean {
    const L = this.lines(); if (!L.length) return false;
    let { line, col } = this.at;
    const cur = L[Math.min(line, L.length - 1)];
    if (dy) {
      const next = Math.max(0, Math.min(L.length - 1, line + dy));
      if (next === line) return false;
      const to = L[next];
      col = cur.n > 1 && to.n > 1 && cur.kind !== to.kind ? Math.round(col / (cur.n - 1) * (to.n - 1)) : Math.min(col, to.n - 1);
      line = next;
    } else { col = Math.max(0, Math.min(cur.n - 1, col + dx)); if (col === this.at.col) return false; }
    this.focus(line, col);
    return true;
  }

  /** The focus put on a place (the mouse, a move): nothing on her changes. */
  focus(line: number, col: number): void { this.at = { line, col }; this.nope = null; }

  /** Choose what's in focus: an owned item or a colour on her, the part the colours are for, a broom part at the bay. A locked one
   *  (an item or part still to be found) changes nothing and is marked (`nope`); a read-only line (the pegboard, the chips) only focuses. */
  choose(): Chosen {
    const L = this.lines(), l = L[this.at.line];
    if (!l) return { locked: false };
    const s = this.shelves[l.shelf], col = this.at.col;
    if (l.kind === "items") {
      const it = shownItems(s)[col];
      if (!this.owned.has(it.id)) { this.nope = { ...this.at }; return { locked: true }; }
      this.nope = null;
      if (wears(this.g, it)) return { locked: false };
      return this.set(wear(this.g, it) as Genome);
    }
    this.nope = null;
    if (l.kind === "parts") { this.part.set(s.id, s.colour![col]); return { locked: false }; }
    if (l.kind === "grid") return this.set({ ...this.g, palette: { ...this.ctx.palette(this.g), [this.partOf(s)]: this.ctx.swatch(s, col, l.row!) } });
    if (l.kind === "cards" && s.slot && this.fitted) {
      if (!canChoose(s, l, col, this.found)) { this.nope = { ...this.at }; return { locked: true }; }
      const id = cardAt(s, l, col);
      if (this.fitted[s.slot] === id) return { locked: false };
      this.fitted = choose(this.fitted, s.slot, id);
      return { fitted: this.fitted, locked: false };
    }
    return { locked: false };
  }

  private set(g: Genome): Chosen {
    if (JSON.stringify(g) === JSON.stringify(this.g)) return { locked: false };
    this.g = g;
    return { look: g, locked: false };
  }
}
