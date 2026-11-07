// A station panel's focus and choices, apart from its drawing (ui/stationPanel.ts draws it), so they're tested without a page.
// Ed, 2026-10-28: "at the moment she changes every time I move the selector. Instead she should change only when I press the 'choose'
// button": moving (the d-pad, the right stick, the arrows, WASD, the mouse over it) only moves the focus; choosing (confirm,
// platform/bindings.ts menu.choose, or a click) puts what's in focus on her (an owned item, a colour, the part the colours are for, a broom part
// at the bay); leaving without choosing leaves her as she was. A fit slider is the one line ◀ ▶ changes: that's the slider itself.
import { GRID_ROWS, shownItems, unwear, wear, wears, type Shelf } from "../rules/wardrobe";
import { hsv2rgb } from "../../art/core.js";
import type { Fitted } from "../rules/broomParts";
import { canChoose, cardAt, choose, itemAt, stationLines, type Line } from "./stationLines";
import { TRAIL_PRESETS, TRAIL_PRESET_DEFAULT } from "../render/trailColours";

export type Genome = Record<string, unknown> & { palette: Record<string, number[]> | null; accessories: Record<string, unknown> };
export interface At { line: number; col: number }

/** What a choice changed: her look, her broom's parts, or nothing (an unfound one: not found yet). */
export interface Chosen { look?: Genome; fitted?: Fitted; /** her trail's colour preset (the Broom station's Trail row) */ trail?: string; /** a button pressed (the basin's "teeth") */ action?: string; unfound: boolean }

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
  /** A choice made on something not found yet: its place, till the focus moves (the panel says "Not found yet."). */
  nope: At | null = null;
  /** Her trail's colour preset now (the Broom station's Trail row: render/trailColours.ts). */
  trail = TRAIL_PRESET_DEFAULT;

  constructor(public shelves: Shelf[], public g: Genome, public owned: ReadonlySet<string>, public found: ReadonlySet<string>, public fitted: Fitted | null, private ctx: ChoiceCtx, public awaitingDress = false) {}

  /** Her saved outfit may still be in the morning pile, rather than on her. */
  wears(item: Parameters<typeof wears>[1]): boolean { return !this.awaitingDress && wears(this.g, item); }

  /** The panel's lines, top to bottom (ui/stationLines.ts). */
  lines(): Line[] { return stationLines(this.shelves, { owned: new Set(this.owned), fitOn: a => this.ctx.fitOn(a, this.g), grid: s => this.ctx.grid(s) }); }

  /** The part `s`'s colours are for. */
  partOf(s: Shelf): string { const p = this.part.get(s.id); return p && s.colour!.includes(p) ? p : s.colour![0]; }

  /** The swatch of `s`'s grid nearest her colour for its chosen part (column, row of its 5), by red, green and blue as the eye
   *  weighs them: the one marked worn. */
  chosenSwatch(s: Shelf): [number, number] {
    const rgb = hsv2rgb as (h: number, s: number, v: number) => number[], c = this.ctx.palette(this.g)[this.partOf(s)] ?? [.07, .5, .45], [r0, g0, b0] = rgb(c[0], c[1], c[2]), { cols } = this.ctx.grid(s);
    let best: [number, number] = [0, 0], bd = Infinity;
    for (let col = 0; col < cols; col++) for (let row = 0; row < GRID_ROWS; row++) {
      const [h, s2, v] = this.ctx.swatch(s, col, row), [r, g, b] = rgb(h, s2, v), m = (r + r0) / 2;
      const d = (2 + m / 256) * (r - r0) ** 2 + 4 * (g - g0) ** 2 + (2 + (255 - m) / 256) * (b - b0) ** 2;
      if (d < bd) { bd = d; best = [col, row]; }
    }
    return best;
  }

  /** Where the focus starts as the panel opens (Ed, 2026-11-07: "a panel opens focused on what she's wearing"): on its first card,
   *  the item she has on (the line it's on), the part on her broom in that slot, or her colour's swatch in its grid; else the top. */
  opening(): At {
    const L = this.lines(); if (!L.length) return { line: 0, col: 0 };
    const shelf = L[0].shelf, s = this.shelves[shelf], mine = L.map((l, i) => ({ l, i })).filter(({ l }) => l.shelf === shelf);
    const items = mine.filter(({ l }) => l.kind === "items");
    if (items.length && !s.toggle) {
      const k = shownItems(s).findIndex(it => wears(this.g, it));
      const at = items.find(({ l }) => k >= (l.from ?? 0) && k < (l.from ?? 0) + l.n);
      if (at) return { line: at.i, col: k - (at.l.from ?? 0) };
    }
    const cards = mine.find(({ l }) => l.kind === "cards" && !l.readOnly);
    if (cards && s.slot && this.fitted) { const c = Array.from({ length: cards.l.n }, (_, col) => cardAt(s, cards.l, col)).indexOf(this.fitted[s.slot]); return { line: cards.i, col: Math.max(0, c) }; }
    if (s.colour && mine.some(({ l }) => l.kind === "grid")) { const [col, row] = this.chosenSwatch(s), at = mine.find(({ l }) => l.kind === "grid" && l.row === row); if (at) return { line: at.i, col }; }
    return { line: mine[0].i, col: 0 };
  }

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

  /** The focus to the next card (`dir` 1) or the last (-1): its first line (Ed, 2026-10-29: each item kind its own card; the pad's
   *  L1/R1, PageUp/PageDown). Back from inside a card goes to its own first line first. False if it didn't move. */
  jumpCard(dir: -1 | 1): boolean {
    const L = this.lines(); if (!L.length) return false;
    const line = Math.min(this.at.line, L.length - 1), shelf = L[line].shelf, first = (sh: number) => L.findIndex(l => l.shelf === sh);
    let to = -1;
    if (dir > 0) to = L.findIndex((l, i) => i > line && l.shelf !== shelf);
    else if (first(shelf) < line) to = first(shelf);
    else { const prev = [...L.slice(0, line)].reverse().find(l => l.shelf !== shelf); to = prev ? first(prev.shelf) : -1; }
    if (to < 0) return false;
    this.focus(to, Math.min(this.at.col, L[to].n - 1));
    return true;
  }

  /** The focus put on a place (the mouse, a move): nothing on her changes. */
  focus(line: number, col: number): void { this.at = { line, col }; this.nope = null; }

  /** Choose what's in focus: an owned item or a colour on her, the part the colours are for, a broom part at the bay; a toggle on or
   *  off (the basin's makeup); a button (the basin's teeth). One not found yet (an item or part) changes nothing and is marked (`nope`);
   *  a read-only line (the pegboard, the chips) only focuses. */
  choose(): Chosen {
    const L = this.lines(), l = L[this.at.line];
    if (!l) return { unfound: false };
    const s = this.shelves[l.shelf], col = this.at.col;
    if (l.kind === "items") {
      const it = itemAt(s, l, col);
      if (!this.owned.has(it.id)) { this.nope = { ...this.at }; return { unfound: true }; }
      this.nope = null;
      if (s.toggle) return this.set((this.wears(it) ? unwear(this.g, it) : wear(this.g, it)) as Genome); // (on, or off again)
      if (this.wears(it)) return { unfound: false };
      return this.set(wear(this.g, it) as Genome);
    }
    this.nope = null;
    if (l.kind === "action") return { action: s.action, unfound: false };
    if (l.kind === "parts") { this.part.set(s.id, s.colour![col]); return { unfound: false }; }
    if (l.kind === "trail") { const id = TRAIL_PRESETS[col]?.id; if (!id || id === this.trail) return { unfound: false }; this.trail = id; return { trail: id, unfound: false }; } // (cosmetic, every preset hers)
    if (l.kind === "grid") {
      const part = this.partOf(s), g = { ...this.g, palette: { ...this.ctx.palette(this.g), [part]: this.ctx.swatch(s, col, l.row!) } } as Genome;
      const on = s.toggle ? s.items.find(it => it.colour === part && this.owned.has(it.id) && !wears(g, it)) : undefined; // (a colour for her lips puts her lipstick on)
      return this.set(on ? wear(g, on) as Genome : g);
    }
    if (l.kind === "cards" && s.slot && this.fitted) {
      if (!canChoose(s, l, col, this.found)) { this.nope = { ...this.at }; return { unfound: true }; }
      const id = cardAt(s, l, col);
      if (this.fitted[s.slot] === id) return { unfound: false };
      this.fitted = choose(this.fitted, s.slot, id);
      return { fitted: this.fitted, unfound: false };
    }
    return { unfound: false };
  }

  private set(g: Genome): Chosen {
    if (!this.awaitingDress && JSON.stringify(g) === JSON.stringify(this.g)) return { unfound: false };
    this.awaitingDress = false;
    this.g = g;
    return { look: g, unfound: false };
  }
}
