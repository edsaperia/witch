// A dressing station's panel (Ed, 2026-10-21, the station menus; the mock, previews/ed/station-menus-mock on claude/ed-shots): it
// slides in from the left as she comes near a station and away as she walks off (main.ts, rules/stations.ts), over the live game.
// Its shelves (rules/wardrobe.ts) hold the things she owns, silhouettes for those still to find (no hint: Ed), each shelf's
// colour grid (5 rows: every colour hers), its fit sliders; and the Workshop's (Ed, 2026-10-22/23; docs/backlog/workshop.md): the bay's
// part cards (a slot's parts, the empty slot first, the unfound greyed), the sets' chips, the focused part's stats and "Her broom",
// fitted at once (onFit: main.ts puts them on her broom mid-night and keeps them, app/broomSave.ts); the lathe's colours and fit (no
// items); the pegboard's 3 × 3 biome board, read-only (its lines focus, nothing is chosen). The mouse points and clicks;
// the d-pad or the arrow keys move through it, each owned item or colour landed on going on her at once (Ed: "landing on an item
// wears it at once"); WASD and the left stick only ever walk her. Each change shows on her a beat later (onLook) and she turns to
// show it (onChange). Her room (ui/creator.ts) is the full-screen creator; this is only the stations'.
import * as Art from "../../art/generator.js";
import type { Style } from "../render/style";
import { bareHeadAt, CLOTH_COLS, CLOTH_ROWS, GRID_ROWS, shownItems, SKIN_COLS, skinSwatch, wear, wears, type Shelf, type WardrobeItem } from "../rules/wardrobe";
import { BOARD, partById, type Fitted } from "../rules/broomParts";
import type { Tuning } from "../rules/tuning";
import { broomColours, partCanvas } from "../render/workshopArt";
import { broomSummary, canChoose, cardAt, choose, panelPad, partStats, partsFound, setChips, setsOf, spellLine, stationLines, type Line } from "./stationLines";
import { classicPalette, cpuCanvas, slot, swatchAt } from "./creator";
import { SlideIn } from "./slideIn";

type Genome = Record<string, unknown> & { palette: Record<string, number[]> | null; accessories: Record<string, unknown> };
type Sprite = { A: HTMLCanvasElement; w: number; h: number };
const AXES = Art.WITCH_AXES as Record<string, unknown[]>;
const rgb = Art.hsv2rgb as (h: number, s: number, v: number) => number[];
const css = ([h, s, v]: number[]) => { const [r, g, b] = rgb(h, s, v); return `rgb(${r | 0},${g | 0},${b | 0})`; };
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

/** How long after the last change her look goes to the game (ms: a run of d-pad steps over the colours is one bake, not one a
 *  swatch). */
const LOOK_AFTER = 160;
/** The d-pad held: its first repeat after this many seconds, then one every REPEAT. */
const HOLD = .35, REPEAT = .11;
/** The fit sliders that only mean anything while what they shape is on (none at 0: the fit never puts it on). */
const FIT_NEEDS: Record<string, (g: Genome) => boolean> = { scarfLength: g => !!g.accessories.scarf, bagSize: g => !!g.accessories.satchel, backpackSize: g => Number(g.backpackSize) > 0 };
const FIT_NAMES: Record<string, string> = { hatHeight: "Height", hatBrim: "Brim", hatTilt: "Tilt", hatBand: "Band", cloakLength: "Cloak length", scarfLength: "Scarf length", bagSize: "Bag size", backpackSize: "Backpack size", broomLength: "Length", broomThickness: "Thickness", broomBend: "Bend", bristles: "Exhaust size" };
/** What each of her broom's slots does (docs/backlog/workshop.md: the tip steers, the chassis is the body, the exhaust is thrust). */
const SLOT_ROLE: Record<string, string> = { tip: "steering", chassis: "body", exhaust: "thrust" };
/** The Workshop's state the bay and the pegboard show (main.ts): the parts she's found, those on her broom, tonight's part to find
 *  (the night's find when it's a part, not yet taken: one's out there, never where) and the tuning her parts change. */
export interface WorkshopCtx { found: ReadonlySet<string>; fitted: Fitted; tonight: string | null; tuning: Tuning }
const PART_NAMES: Record<string, string> = { broom: "handle", bristles: "bristles", hat: "hat", plume: "plume" };
/** Where an item's picture is cut from her sprite (shares of its height; the broom's, her flying frame whole). */
const CROP: Record<string, [number, number]> = { hair: [.1, .52], face: [.16, .5], earrings: [.14, .5], jacket: [.33, .8], shoes: [.72, 1], cloak: [.1, 1], scarf: [.1, .8], bag: [.25, 1], backpack: [.1, 1] };


export class StationPanel {
  readonly root = document.createElement("div");
  /** Her look as it changes (a beat after the last change). */
  onLook: (g: Genome) => void = () => {};
  /** Something changed on her (she turns to show it). */
  onChange: () => void = () => {};
  /** Her broom's parts changed at the bay (a card chosen: fitted at once). */
  onFit: (f: Fitted) => void = () => {};
  private id: string | null = null;
  private shelves: Shelf[] = [];
  private g!: Genome;
  private owned = new Set<string>();
  /** Tonight's find on loan (app/loan.ts), its card sparkling (Ed, 2026-10-24: no words, "sparkly somehow"), or null. */
  private loaned: string | null = null;
  private ws: WorkshopCtx | null = null;
  private banner = "";
  private st: Style;
  /** The focus (a line and a place along it), the shelf whose colours are open, each shelf's chosen part, what the mouse is over. */
  private at = { line: 0, col: 0 };
  private part = new Map<string, string>();
  private hover: { line: number; col: number } | null = null;
  private pointerIn = false;
  /** A choice made on something still to be found (pick): its place, till the focus moves (paintDetail says so). */
  private nope: { line: number; col: number } | null = null;
  private padChoose = false;
  private navAt = -1e9;
  private lookTimer = 0;
  private slide: SlideIn;
  private pad = { held: "", next: 0 };
  private thumbs = new Map<string, HTMLCanvasElement>();
  private lastThumb = new Map<string, HTMLCanvasElement>();
  private queue: { key: string; make: () => HTMLCanvasElement }[] = [];
  private raf = 0;

  constructor(style: Style, pixel = 3) {
    this.st = { ...style, pixel } as Style;
    this.root.id = "station-panel";
    installCss();
    document.body.append(this.root);
    this.slide = new SlideIn(this.root, "left", "flex"); // (in and out as the tables' are: ui/slideIn.ts)
    this.root.addEventListener("pointerenter", () => { this.pointerIn = true; });
    this.root.addEventListener("pointerleave", () => { this.pointerIn = false; if (this.hover) { this.hover = null; this.paintDetail(); } });
    this.root.addEventListener("pointerover", e => { const t = (e.target as HTMLElement).closest<HTMLElement>("[data-line]"); const at = t && { line: +t.dataset.line!, col: +t.dataset.col! }; if (at && (at.line !== this.hover?.line || at.col !== this.hover?.col)) { this.hover = at; this.paintDetail(); } });
    this.root.addEventListener("pointerdown", e => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-line]"); if (!t) return;
      e.preventDefault();
      const line = +t.dataset.line!, L = this.lines()[line];
      if (L?.kind === "fit") { const bar = t.querySelector<HTMLElement>(".bar") ?? t; const set = (x: number) => { const r = bar.getBoundingClientRect(); this.setFit(L.axis!, (x - r.left) / r.width); }; set(e.clientX); const mv = (m: PointerEvent) => set(m.clientX), up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); }; window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up); this.at = { line, col: 0 }; this.paint(); return; }
      this.go(line, +t.dataset.col!);
    });
    // The arrow keys move through the panel while it's open (Ed, 2026-10-21: "the arrow keys move through the panel at a station;
    // WASD still walks her"): taken before the game's input sees them.
    // Enter, Space or E chooses what's in focus (Ed's playtest, 2026-10-23: "I can't select them, I can only move the selector
    // around"): landing on an owned item already wears it; choosing does too, and says when it's still to be found.
    window.addEventListener("keydown", e => {
      if (!this.id) return;
      const d = ARROWS[e.code], pick = CHOOSE.has(e.code);
      if (!d && !pick) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (d) this.move(d[0], d[1]); else if (!e.repeat) this.pick();
    }, true);
  }

  /** The station whose panel is open, or null. */
  get station(): string | null { return this.id; }
  /** She's choosing: the pointer's over the panel, or she moved through it since she last walked (main.ts: the camera eases in). */
  get choosing(): boolean { return !!this.id && (this.pointerIn || this.navAt > 0); }
  /** The part of her the row in focus is about (config/wardrobe.json frame: the camera zooms in on it, camera.station.parts). */
  get framePart(): string | null { if (!this.id) return null; const l = this.lines()[this.at.line]; return (l ? this.shelves[l.shelf].frame : this.shelves.find(s => s.frame)?.frame) ?? null; }
  /** She's drawn without her hat while this station's open (its choices are on her head or face: Ed, 2026-10-23). */
  get bareHead(): boolean { return !!this.id && bareHeadAt(this.id); }
  /** She walked: not choosing till the pointer or the d-pad is back in the panel. */
  walked(): void { this.navAt = -1e9; }

  /** Slides `station`'s panel in (another's swapped for it) with her look, what she owns and (the Workshop's) her broom's parts. */
  open(station: string, shelves: Shelf[], g: Genome, owned: Set<string>, banner = "", ws: WorkshopCtx | null = null): void {
    this.id = station; this.shelves = shelves; this.g = clone(g); this.owned = owned; this.banner = banner; this.ws = ws;
    this.navAt = -1e9; this.hover = null;
    this.padChoose = true; // (the pad's use button that opened it is held: let go first, then a press chooses)
    const L = this.lines(), first = L.findIndex(l => l.kind === "items" || (l.kind === "cards" && !l.readOnly));
    const s0 = first >= 0 ? this.shelves[L[first].shelf] : null;
    const worn = !s0 ? 0 : s0.slot ? Math.max(0, Array.from({ length: L[first].n }, (_, c) => cardAt(s0, L[first], c)).indexOf(this.ws?.fitted[s0.slot] ?? null)) : shownItems(s0).findIndex(i => wears(this.g, i));
    this.at = { line: Math.max(0, first), col: Math.max(0, worn) };
    this.paint();
    this.slide.in(); // (another station's swapped in place: it's in already)
    this.root.classList.add("in"); // (a mark for the tools: tools/opening/shots.cjs)
  }
  /** Slides it away (her look sent first, if a change was waiting). */
  close(): void {
    if (!this.id) return;
    if (this.lookTimer) this.lookNow();
    this.id = null; this.pointerIn = false; this.queue = [];
    this.slide.out();
    this.root.classList.remove("in");
  }
  /** The Workshop's state changed elsewhere (a part found, her broom changed): the panel follows. */
  setWorkshop(ws: WorkshopCtx): void { if (this.id && this.ws && JSON.stringify([...ws.found, ws.fitted, ws.tonight]) !== JSON.stringify([...this.ws.found, this.ws.fitted, this.ws.tonight])) { this.ws = ws; this.paint(); } else if (this.ws) this.ws = ws; }
  /** Her look changed elsewhere (her room, a hat put on): the panel's copy follows. */
  /** Tonight's loan (its id, or null): its card sparkles, the panel repainted if it's open and that changed. */
  setLoaned(id: string | null): void { if (id !== this.loaned) { this.loaned = id; if (this.id) this.paint(); } }
  setLook(g: Genome): void { if (this.id && JSON.stringify(g) !== JSON.stringify(this.g)) { this.g = clone(g); this.paint(); } }
  /** Each frame while open: the pad's d-pad or right stick moves, its bottom or left face button chooses (the left stick walks her:
   *  platform/input.ts padControls leaves the rest of the pad to the panel). */
  update(time: number): void {
    if (!this.id) return;
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    let dir = "", choose = false;
    for (const p of pads) { if (!p) continue; const P = panelPad(p.buttons.map(x => x.pressed), p.axes); choose ||= P.choose; dir = P.dir; if (dir) break; }
    if (choose && !this.padChoose) this.pick(); // (the pad's A or X: platform/input.ts leaves them to the panel while it's open)
    this.padChoose = choose;
    if (!dir) { this.pad.held = ""; return; }
    if (dir !== this.pad.held) { this.pad = { held: dir, next: time + HOLD }; }
    else if (time >= this.pad.next) this.pad.next = time + REPEAT;
    else return;
    const [dx, dy] = PAD_DIRS[dir]; this.move(dx, dy);
  }

  // ---- what's on it ----
  /** The panel's lines, top to bottom (ui/stationLines.ts). */
  private lines(): Line[] {
    return stationLines(this.shelves, { owned: this.owned, fitOn: a => this.fitOn(a), grid: s => ({ cols: s.grid === "skin" ? SKIN_COLS : CLOTH_COLS, rows: GRID_ROWS }) });
  }
  private found_(): ReadonlySet<string> { return this.ws?.found ?? new Set(); }
  private fitOn(axis: string): boolean { return !FIT_NEEDS[axis] || FIT_NEEDS[axis](this.g); }
  private partOf(s: Shelf): string { const p = this.part.get(s.id); return p && s.colour!.includes(p) ? p : s.colour![0]; }
  private colourOf(part: string): number[] { return { ...classicPalette(this.st), ...this.g.palette }[part] ?? [.07, .5, .45]; }
  private swatch(s: Shelf, col: number, row: number): number[] { return s.grid === "skin" ? skinSwatch(col, row) : swatchAt(col, CLOTH_ROWS[row]); }
  /** The swatch nearest her colour for `s`'s chosen part (column, row of its 5), by red, green and blue as the eye weighs them. */
  private chosenSwatch(s: Shelf): [number, number] {
    const c = this.colourOf(this.partOf(s)), [r0, g0, b0] = rgb(c[0], c[1], c[2]), cols = s.grid === "skin" ? SKIN_COLS : CLOTH_COLS;
    let best: [number, number] = [0, 0], bd = Infinity;
    for (let col = 0; col < cols; col++) for (let row = 0; row < GRID_ROWS; row++) {
      const [h, s2, v] = this.swatch(s, col, row), [r, g, b] = rgb(h, s2, v), m = (r + r0) / 2;
      const d = (2 + m / 256) * (r - r0) ** 2 + 4 * (g - g0) ** 2 + (2 + (255 - m) / 256) * (b - b0) ** 2;
      if (d < bd) { bd = d; best = [col, row]; }
    }
    return best;
  }
  private fitValue(axis: string): number { const [p, k] = slot(axis); return Number(p ? (this.g[p] as Record<string, unknown>)[k] : this.g[k]); }
  private fitRange(axis: string): [number, number] { const [lo, hi] = AXES[axis] as number[]; return [axis in FIT_NEEDS ? Math.max(lo, .25) : lo, hi]; }

  // ---- moving and choosing ----
  private move(dx: number, dy: number): void {
    const L = this.lines(); if (!L.length) return;
    this.navAt = 1; this.hover = null;
    let { line, col } = this.at;
    const cur = L[Math.min(line, L.length - 1)];
    if (dy) {
      const next = Math.max(0, Math.min(L.length - 1, line + dy));
      if (next === line) return;
      const to = L[next];
      // from a shelf's items to its grid and back: the same share of the way along
      col = cur.n > 1 && to.n > 1 && cur.kind !== to.kind ? Math.round(col / (cur.n - 1) * (to.n - 1)) : Math.min(col, to.n - 1);
      line = next;
    } else if (cur.kind === "fit") { const [lo, hi] = this.fitRange(cur.axis!); this.setFit(cur.axis!, (this.fitValue(cur.axis!) - lo) / (hi - lo) + dx * .1); return; }
    else { col = Math.max(0, Math.min(cur.n - 1, col + dx)); if (col === this.at.col) return; }
    this.go(line, col);
  }
  /** Choose what's in focus (Enter, Space, E, the pad's A or X): as landing on it, and a locked one says it's still to be found. */
  private pick(): void {
    const l = this.lines()[this.at.line]; if (!l) return;
    const s = this.shelves[l.shelf], locked = l.kind === "items" ? !this.owned.has(shownItems(s)[this.at.col].id) : l.kind === "cards" && !!s.slot && !!this.ws && !canChoose(s, l, this.at.col, this.found_());
    this.nope = locked ? this.at : null;
    this.go(this.at.line, this.at.col);
  }
  private tried(at: { line: number; col: number }): boolean { return !!this.nope && this.nope.line === at.line && this.nope.col === at.col; }
  /** Focus a place, and choose what's there (an owned item or a colour on her, a part to colour, a broom part fitted at the bay;
   *  a read-only line, the pegboard's, only focuses). */
  private go(line: number, col: number): void {
    const L = this.lines(), l = L[line]; if (!l) return;
    const s = this.shelves[l.shelf];
    this.at = { line, col };
    if (l.kind === "items") {
      const it = shownItems(s)[col];
      if (this.owned.has(it.id) && !wears(this.g, it)) this.change(wear(this.g, it) as Genome);
    } else if (l.kind === "parts") this.part.set(s.id, s.colour![col]);
    else if (l.kind === "grid") { const part = this.partOf(s), c = this.swatch(s, col, l.row!); this.change({ ...this.g, palette: { ...classicPalette(this.st), ...this.g.palette, [part]: c } }); }
    else if (l.kind === "cards" && s.slot && this.ws && canChoose(s, l, col, this.found_())) {
      const id = cardAt(s, l, col);
      if (this.ws.fitted[s.slot] !== id) { this.ws = { ...this.ws, fitted: choose(this.ws.fitted, s.slot, id) }; this.onFit(this.ws.fitted); this.onChange(); }
    }
    this.paint();
  }
  private setFit(axis: string, share: number): void {
    if (!this.fitOn(axis)) return;
    const [lo, hi] = this.fitRange(axis), v = +(lo + Math.max(0, Math.min(1, share)) * (hi - lo)).toFixed(3);
    if (Math.abs(v - this.fitValue(axis)) < 1e-6) return;
    const g = clone(this.g), [p, k] = slot(axis);
    if (p) (g[p] as Record<string, unknown>)[k] = v; else g[k] = v;
    this.change(g); this.paint();
  }
  private change(g: Genome): void {
    this.g = g;
    clearTimeout(this.lookTimer); this.lookTimer = window.setTimeout(() => this.lookNow(), LOOK_AFTER);
    this.onChange();
  }
  private lookNow(): void { clearTimeout(this.lookTimer); this.lookTimer = 0; this.onLook(clone(this.g)); }

  // ---- drawing ----
  private paint(): void {
    if (!this.id) return;
    const L = this.lines(); // (a fit slider comes and goes with what it shapes: the focus kept on a line that's there)
    if (this.at.line >= L.length) this.at = { line: Math.max(0, L.length - 1), col: 0 };
    const at = this.at;
    let html = this.banner ? `<div class="sp-banner">${esc(this.banner)}</div>` : "";
    html += `<div class="sp-head"><b>${esc(STATION_NAMES[this.id] ?? this.id)}</b><span>${this.found()}</span></div><div class="sp-body">`;
    let shelf = -1;
    L.forEach((l, i) => {
      const s = this.shelves[l.shelf];
      if (l.shelf !== shelf) {
        if (shelf >= 0) html += `</div>`;
        shelf = l.shelf;
        const worn = s.slot ? partById(this.ws?.fitted[s.slot])?.name : shownItems(s).find(it => wears(this.g, it))?.name;
        const note = s.always ? "every colour" : s.slot ? SLOT_ROLE[s.slot] : s.board ? "north up" : "";
        html += `<div class="sp-shelf${L[at.line]?.shelf === l.shelf ? " on" : ""}"><div class="sp-lab">${esc(s.label)}${worn ? `<span> · ${esc(worn)}</span>` : ""}${note ? `<em>${esc(note)}</em>` : ""}</div>`;
      }
      const f = (c: number) => at.line === i && at.col === c ? " focus" : "";
      if (l.kind === "items") html += `<div class="sp-row">${shownItems(s).map((it, c) => { const own = this.owned.has(it.id); return `<div class="sp-card${own ? "" : " locked"}${wears(this.g, it) ? " worn" : ""}${it.id === this.loaned ? " loaned" : ""}${f(c)}" data-line="${i}" data-col="${c}">${none(it) ? `<i class="sp-none">∅</i>` : `<span data-thumb="${this.thumbKey(it, s)}"></span>`}${wears(this.g, it) ? `<b class="sp-tick">✓</b>` : ""}${own ? "" : `<b class="sp-lock">🔒</b>`}</div>`; }).join("")}</div>`;
      else if (l.kind === "cards" && s.board) html += `<div class="sp-row sp-board">${Array.from({ length: l.n }, (_, c) => {
        const id = cardAt(s, l, c)!, cell = BOARD[(l.row ?? 0) * 3 + c], own = this.found_().has(id), tonight = !own && this.ws?.tonight === id;
        return `<div class="sp-cell${own ? "" : " locked"}${tonight ? " tonight" : ""}${id === this.loaned ? " loaned" : ""}${f(c)}" data-line="${i}" data-col="${c}"><small>${esc(cell.point)}<br>${esc(cell.biome)}</small><span data-thumb="${this.partKey(id)}"></span><b>${own ? esc(partById(id)!.name) : "?"}</b></div>`;
      }).join("")}</div>`;
      else if (l.kind === "cards") html += `<div class="sp-row">${Array.from({ length: l.n }, (_, c) => {
        const id = cardAt(s, l, c), own = id === null || this.found_().has(id), on = (this.ws?.fitted[s.slot!] ?? null) === id;
        return `<div class="sp-card sp-wide${own ? "" : " locked"}${on ? " worn" : ""}${id !== null && id === this.loaned ? " loaned" : ""}${f(c)}" data-line="${i}" data-col="${c}">${id === null ? `<i class="sp-none">∅</i>` : `<span data-thumb="${this.partKey(id)}"></span>`}${on ? `<b class="sp-tick">✓</b>` : ""}${own ? "" : `<b class="sp-lock">🔒</b>`}</div>`;
      }).join("")}</div>`;
      else if (l.kind === "chips") html += `<div class="sp-chips">${setChips(this.ws?.fitted ?? { tip: null, chassis: null, exhaust: null }).map((x, c) => `<span class="${x.whole ? "whole" : x.fitted ? "some" : ""}${f(c)}" data-line="${i}" data-col="${c}">${x.whole ? "✦ " : ""}${esc(x.name)} ${x.fitted}/${x.of} · ${esc(x.spell)}</span>`).join("")}</div>`;
      else if (l.kind === "parts") html += `<div class="sp-parts">${s.colour!.map((p, c) => `<span class="${p === this.partOf(s) ? "on" : ""}${f(c)}" data-line="${i}" data-col="${c}"><i style="background:${css(this.colourOf(p))}"></i>${esc(PART_NAMES[p] ?? p)}</span>`).join("")}</div>`;
      else if (l.kind === "grid") { const [sc, sr] = this.chosenSwatch(s); html += `<div class="sp-grid" style="grid-template-columns:repeat(${l.n},1fr)">${Array.from({ length: l.n }, (_, c) => `<i class="${sc === c && sr === l.row ? "sel" : ""}${f(c)}" data-line="${i}" data-col="${c}" style="background:${css(this.swatch(s, c, l.row!))}"></i>`).join("")}</div>`; }
      else if (l.kind === "fit") { const [lo, hi] = this.fitRange(l.axis!), on = !FIT_NEEDS[l.axis!] || FIT_NEEDS[l.axis!](this.g), v = Math.max(0, Math.min(1, (this.fitValue(l.axis!) - lo) / (hi - lo))); html += `<div class="sp-fit${on ? "" : " off"}${f(0)}" data-line="${i}" data-col="0"><span>${esc(FIT_NAMES[l.axis!] ?? l.axis!)}</span><div class="bar"><i style="left:${(v * 100).toFixed(1)}%"></i></div></div>`; }
    });
    if (shelf >= 0) html += `</div>`;
    html += `</div><div class="sp-detail"></div>${this.shelves.some(q => q.slot) && this.ws ? this.summary(this.ws) : ""}<div class="sp-foot"><span class="k">🖱</span> click or <span class="k">← ↑ → ↓</span> <span class="k">✥</span> to wear · <span class="k">E</span> <span class="k">Enter</span> <span class="k">Ⓐ</span> choose · walk away to close</div>`;
    this.root.innerHTML = html;
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-thumb]")) this.thumbInto(el);
    this.paintDetail();
    this.root.querySelector<HTMLElement>(".focus")?.scrollIntoView({ block: "nearest" });
  }
  private found(): string {
    if (this.shelves.some(q => q.slot || q.board)) return partsFound(this.found_());
    const all = this.shelves.flatMap(shownItems); return all.length ? `${all.filter(i => this.owned.has(i.id)).length} of ${all.length} found` : "";
  }
  /** "Her broom" (the bay): every number her parts change, bare → now, up green and down red, and her spell. */
  private summary(ws: WorkshopCtx): string {
    const rows = broomSummary(ws.fitted, ws.tuning);
    return `<div class="sp-sum"><div class="sp-lab">Her broom<em>bare → now</em></div>${rows.length ? rows.map(r => `<div class="${r.better ? "up" : "down"}"><span>${esc(r.name)}</span><b>${esc(r.from)} → ${esc(r.to)}</b></div>`).join("") : `<div><span>A bare broom</span><b>as it comes</b></div>`}<div class="${spellLine(ws.fitted).startsWith("none") ? "" : "up"}"><span>Spell (R)</span><b>${esc(spellLine(ws.fitted))}</b></div></div>`;
  }
  private paintDetail(): void {
    const box = this.root.querySelector<HTMLElement>(".sp-detail"); if (!box) return;
    const at = this.hover ?? this.at, l = this.lines()[at.line];
    let title = "", text = "", locked = false, sub = "", stats: { name: string; from: string; to: string; better: boolean | null }[] = [];
    if (l) {
      const s = this.shelves[l.shelf];
      if (l.kind === "items") { const it = shownItems(s)[at.col]; locked = !this.owned.has(it.id); title = locked ? "🔒" : it.name; text = locked ? (this.tried(at) ? "Not found yet." : "") : wears(this.g, it) ? "Wearing." : "Hers."; } // (a silhouette, nothing more: Ed, 2026-10-21; chosen anyway, it says it's not hers yet)
      else if (l.kind === "cards" && s.board) {
        const id = cardAt(s, l, at.col)!, cell = BOARD[(l.row ?? 0) * 3 + at.col], own = this.found_().has(id), where = `${cell.point.toLowerCase()} · ${cell.biome.toLowerCase()}`;
        if (own) { title = partById(id)!.name; text = `${where}. ${setsOf(id).map(n => `${n} set`).join(", ")}. Fit it at the bay.`; }
        else if (this.ws?.tonight === id) { title = "A glowing outline"; text = `${where}. One lies on tonight's island: a wreck somewhere in its woods. The board never says where; the telescope shows its outline in the stars.`; }
        else { title = "?"; text = `${where}. Still to find.`; locked = true; }
      } else if (l.kind === "cards") {
        const id = cardAt(s, l, at.col), p = partById(id);
        if (!p) { title = "Empty"; text = `Nothing in the ${s.slot}: the bare broom's.`; }
        else if (!this.found_().has(p.id)) { title = "🔒"; locked = true; if (this.tried(at)) text = "Not found yet."; } // (unfound: a silhouette, no hint)
        else { title = p.name; sub = `${p.slot}${setsOf(p.id).length ? ` · ${setsOf(p.id).join(", ")} set${setsOf(p.id).length > 1 ? "s" : ""}` : ""}`; stats = this.ws ? partStats(p.id, this.ws.tuning) : []; text = this.ws?.fitted[p.slot] === p.id ? "On her broom." : "Choose it to fit it."; }
      } else if (l.kind === "chips") { const x = setChips(this.ws?.fitted ?? { tip: null, chassis: null, exhaust: null })[at.col]; title = `${x.name} · ${x.spell}`; text = x.whole ? `Whole: R casts ${x.spell}.` : `${x.fitted} of its ${x.of} parts on her broom.`; }
      else if (l.kind === "parts") { title = `Colour: ${PART_NAMES[s.colour![at.col]] ?? s.colour![at.col]}`; text = "Every colour is hers."; }
      else if (l.kind === "grid") { title = `${s.label}: colour`; text = "Every colour is hers."; }
      else { const on = !FIT_NEEDS[l.axis!] || FIT_NEEDS[l.axis!](this.g); title = FIT_NAMES[l.axis!] ?? l.axis!; text = on ? "◀ ▶ or drag to change it." : "Put it on first."; }
    }
    box.className = `sp-detail${locked ? " locked" : ""}`;
    box.innerHTML = `<h3>${esc(title)}${sub ? `<small>${esc(sub)}</small>` : ""}</h3>${stats.map(r => `<p class="${r.better ? "up" : "down"}">${r.better ? "▲" : "▼"} ${esc(r.name)} ${esc(r.from)} → ${esc(r.to)}</p>`).join("")}<p>${esc(text)}</p>`;
  }

  // ---- the items' pictures: her, as she is, with each one on (baked a few a frame, kept by look) ----
  private thumbKey(it: WardrobeItem, s: Shelf): string { return `${s.id}:${it.id}:${hash(JSON.stringify(wear(this.g, it)))}`; }
  /** A broom part's picture (the bay's and the pegboard's cards: render/workshopArt.ts), in her broom's colours. */
  private partKey(id: string): string { const c = broomColours(this.st, this.g); return `part:${id}:${hash(JSON.stringify([c[ART_M.BROOM], c[ART_M.STRAW]]))}`; }
  private thumbInto(el: HTMLElement): void {
    const key = el.dataset.thumb!, c = this.thumbs.get(key);
    if (c) { el.replaceChildren(c); return; }
    const was = this.lastThumb.get(key.slice(0, key.lastIndexOf(":"))); if (was) el.replaceChildren(was); // (the last one shown, till the new one's baked)
    if (!this.queue.some(q => q.key === key)) {
      const [sid, iid] = key.split(":"), s = this.shelves.find(q => q.id === sid), it = s?.items.find(i => i.id === iid);
      if (sid === "part" && partById(iid)) { const g = this.g; this.queue.push({ key, make: () => partCanvas(this.st, broomColours(this.st, g), iid, { fit: 58 }).c }); }
      else if (s && it) this.queue.push({ key, make: () => wearPicture(this.st, this.g, it, s.id) });
    }
    if (!this.raf) this.raf = requestAnimationFrame(() => this.bakeSome());
  }
  private bakeSome(): void {
    this.raf = 0;
    const t0 = performance.now();
    while (this.queue.length && performance.now() - t0 < 8) {
      const q = this.queue.shift()!, c = q.make();
      if (this.thumbs.size > 240) this.thumbs.delete(this.thumbs.keys().next().value!);
      this.thumbs.set(q.key, c); this.lastThumb.set(q.key.slice(0, q.key.lastIndexOf(":")), c);
      const el = this.root.querySelector<HTMLElement>(`[data-thumb="${q.key}"]`); if (el) el.replaceChildren(c);
    }
    if (this.queue.length) this.raf = requestAnimationFrame(() => this.bakeSome());
  }

}

/** A picture of her (genome `g`) wearing `it`, cut to the part it's worn on (its shelf `shelf`'s; a broom, her whole flying
 *  frame): the panel's cards. */
export function wearPicture(st: Style, g: Record<string, unknown>, it: WardrobeItem, shelf: string): HTMLCanvasElement {
  const look = (Art.genomeLook as (g: unknown) => { look: object; outfit: object | null })(wear(g, it));
  const colours = (Art.witchColours as (st: Style, o?: object, x?: object) => object)(st, look.outfit ?? undefined, look.outfit ? { styleHues: false } : undefined);
  const broom = shelf === "broom";
  const sp = (Art.witchSprite as (st: Style, o: object) => unknown)(st, broom ? { look: look.look, frame: 0 } : { look: look.look, pose: "stand", frame: 0, heading: "towards" });
  const b = (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown, mk: typeof cpuCanvas) => Sprite)(sp, colours, st, (st as unknown as { cOutline: unknown }).cOutline, cpuCanvas);
  const [y0, y1] = broom ? [0, 1] : CROP[shelf] ?? [0, 1];
  const sy = Math.floor(b.h * y0), sh = Math.max(1, Math.ceil(b.h * y1) - sy), sw = broom ? b.w : Math.min(b.w, Math.ceil(b.w * .62));
  const out = document.createElement("canvas"); out.width = sw; out.height = sh;
  out.getContext("2d")!.drawImage(b.A, 0, sy, sw, sh, 0, 0, sw, sh);
  return out;
}

const ARROWS: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
/** The keys and pad buttons (A, X) that choose what's in focus. */
const CHOOSE = new Set(["Enter", "NumpadEnter", "Space", "KeyE"]);
const PAD_DIRS: Record<string, [number, number]> = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const STATION_NAMES: Record<string, string> = { mirror: "Mirror", dressingTable: "Dressing table", wardrobe: "Wardrobe", cloakPegs: "Cloak pegs", shoeRack: "Shoe rack", bags: "Bags", broomBay: "The bay", lathe: "Lathe", pegboard: "Pegboard" };
const ART_M = Art.M as Record<string, number>;
const none = (it: WardrobeItem) => Object.values(it.set).every(v => v === false || v === 0 || v === "none");
const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const hash = (s: string) => { let x = 2166136261; for (let i = 0; i < s.length; i++) x = Math.imul(x ^ s.charCodeAt(i), 16777619); return (x >>> 0).toString(36); };

let cssDone = false;
/** The panel's look: the HUD's (index.html: --panel, --accent, --ink, --dim), down the left edge. */
function installCss(): void {
  if (cssDone) return; cssDone = true;
  const s = document.createElement("style");
  s.textContent = `
#station-panel { --ol: #0b0716; position: fixed; left: 0; top: 12px; bottom: 12px; width: min(330px, 40vw); z-index: 18; box-sizing: border-box; padding: 8px 12px 8px 16px; border: 1px solid rgba(232,180,106,.7); border-left: 0; border-radius: 0 12px 12px 0; box-shadow: 0 0 0 1px rgba(11,7,22,.75), inset 0 0 0 1px rgba(11,7,22,.75); color: var(--ink, #e8e2f4); font: 13px/1.35 ui-monospace, Menlo, Consolas, monospace; flex-direction: column; gap: 6px; user-select: none; text-shadow: -1px -1px 0 var(--ol), 1px -1px 0 var(--ol), -1px 1px 0 var(--ol), 1px 1px 0 var(--ol), 0 0 6px rgba(0,0,0,.9); }
#station-panel .sp-banner { color: var(--accent, #e8b46a); font-size: 12px; }
#station-panel .sp-head { display: flex; align-items: baseline; gap: 8px; }
#station-panel .sp-head b { font-size: 18px; color: var(--accent, #e8b46a); letter-spacing: 1px; } #station-panel .sp-head span { margin-left: auto; color: var(--ink, #e8e2f4); font-size: 11px; opacity: .85; }
#station-panel .sp-body { flex: 1; overflow-y: auto; scrollbar-width: none; display: flex; flex-direction: column; gap: 10px; }
#station-panel .sp-shelf { opacity: .82; } #station-panel .sp-shelf.on { opacity: 1; }
#station-panel .sp-lab { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--ink, #e8e2f4); margin-bottom: 3px; display: flex; gap: 4px; align-items: baseline; }
#station-panel .sp-shelf.on .sp-lab { color: var(--accent, #e8b46a); } #station-panel .sp-lab span { text-transform: none; letter-spacing: 0; color: var(--ink, #e8e2f4); }
#station-panel .sp-lab em { margin-left: auto; font-style: normal; text-transform: none; letter-spacing: 0; color: var(--ink, #e8e2f4); opacity: .8; }
#station-panel .sp-row { display: flex; flex-wrap: wrap; gap: 4px; }
#station-panel .sp-card { position: relative; width: 50px; height: 50px; border-radius: 8px; background: radial-gradient(closest-side, rgba(11,7,22,.55), rgba(11,7,22,0)); display: grid; place-items: center; cursor: pointer; box-sizing: border-box; }
#station-panel .sp-card canvas { image-rendering: pixelated; width: auto; height: 46px; max-width: 46px; object-fit: contain; filter: drop-shadow(1px 0 0 var(--ol)) drop-shadow(-1px 0 0 var(--ol)) drop-shadow(0 1px 0 var(--ol)) drop-shadow(0 -1px 0 var(--ol)); }
#station-panel .sp-card.locked { cursor: default; } #station-panel .sp-card.locked canvas { filter: brightness(0) invert(.22) drop-shadow(1px 0 0 rgba(232,226,244,.5)) drop-shadow(-1px 0 0 rgba(232,226,244,.5)) drop-shadow(0 1px 0 rgba(232,226,244,.5)) drop-shadow(0 -1px 0 rgba(232,226,244,.5)); }
#station-panel .focus { outline: 2px solid var(--accent, #e8b46a); outline-offset: 1px; box-shadow: 0 0 10px rgba(232,180,106,.6), inset 0 0 0 1px var(--ol); }
#station-panel .sp-card.worn:not(.focus) { outline: 1px solid rgba(232,180,106,.7); outline-offset: 1px; }
#station-panel .sp-none { font-style: normal; font-size: 22px; color: var(--ink, #e8e2f4); }
#station-panel .sp-tick { position: absolute; top: 1px; right: 1px; width: 14px; height: 14px; border-radius: 50%; background: var(--accent, #e8b46a); color: #1a1430; font-size: 9px; display: grid; place-items: center; text-shadow: none; box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-lock { position: absolute; bottom: 0; right: 1px; font-size: 11px; font-weight: normal; }
#station-panel .sp-parts { display: flex; gap: 6px; margin: 2px 0; } #station-panel .sp-parts span { display: inline-flex; gap: 5px; align-items: center; font-size: 11px; padding: 0 4px; border-radius: 10px; cursor: pointer; opacity: .8; }
#station-panel .sp-parts span.on { opacity: 1; color: var(--accent, #e8b46a); } #station-panel .sp-parts i { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-grid { display: grid; gap: 1px; padding: 1px; background: var(--ol); border-radius: 3px; width: fit-content; } #station-panel .sp-grid + .sp-grid { margin-top: -1px; }
#station-panel .sp-grid i { width: 17px; height: 9px; cursor: pointer; position: relative; display: block; }
#station-panel .sp-grid i.sel { outline: 2px solid var(--accent, #e8b46a); outline-offset: 0; z-index: 1; } #station-panel .sp-grid i.focus { outline: 2px solid #fff; z-index: 2; box-shadow: 0 0 6px rgba(255,255,255,.8); }
#station-panel .sp-fit { display: flex; align-items: center; gap: 10px; padding: 1px 2px; border-radius: 6px; cursor: pointer; } #station-panel .sp-fit.off { opacity: .45; cursor: default; }
#station-panel .sp-fit span { width: 100px; font-size: 12px; } #station-panel .sp-fit .bar { position: relative; flex: 1; height: 4px; background: rgba(232,226,244,.55); border-radius: 2px; box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-fit .bar i { position: absolute; top: -5px; width: 8px; height: 14px; margin-left: -4px; border-radius: 3px; background: var(--accent, #e8b46a); box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-detail { padding: 0 2px; min-height: 40px; } #station-panel .sp-detail h3 { margin: 0; font-size: 15px; font-weight: 600; } #station-panel .sp-detail p { margin: 0; font-size: 12px; opacity: .85; }
#station-panel .sp-wide { width: 72px; height: 40px; } #station-panel .sp-wide canvas { height: auto; width: auto; max-width: 66px; max-height: 34px; }
#station-panel .sp-board { flex-wrap: nowrap; gap: 4px; } #station-panel .sp-cell { flex: 1; position: relative; min-height: 78px; border: 1px solid rgba(232,226,244,.35); border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 3px 2px; cursor: default; background: radial-gradient(closest-side, rgba(11,7,22,.5), rgba(11,7,22,0)); }
#station-panel .sp-cell small { font-size: 9px; line-height: 1.1; text-align: center; text-transform: uppercase; letter-spacing: .5px; opacity: .85; } #station-panel .sp-cell b { font-size: 10px; font-weight: normal; text-align: center; }
#station-panel .sp-cell canvas { image-rendering: pixelated; max-width: 84px; max-height: 34px; width: auto; height: auto; filter: drop-shadow(1px 0 0 var(--ol)) drop-shadow(-1px 0 0 var(--ol)) drop-shadow(0 1px 0 var(--ol)) drop-shadow(0 -1px 0 var(--ol)); }
#station-panel .sp-cell.locked canvas { filter: brightness(0) invert(.12) drop-shadow(1px 0 0 rgba(232,226,244,.45)) drop-shadow(-1px 0 0 rgba(232,226,244,.45)) drop-shadow(0 1px 0 rgba(232,226,244,.45)) drop-shadow(0 -1px 0 rgba(232,226,244,.45)); }
#station-panel .sp-cell.tonight { border-color: rgba(255,214,120,.9); box-shadow: 0 0 10px rgba(255,214,120,.55), inset 0 0 8px rgba(255,214,120,.3); } #station-panel .sp-cell.tonight canvas { filter: brightness(0) invert(.12) drop-shadow(1px 0 0 #ffd678) drop-shadow(-1px 0 0 #ffd678) drop-shadow(0 1px 0 #ffd678) drop-shadow(0 -1px 0 #ffd678) drop-shadow(0 0 4px rgba(255,214,120,.9)); animation: sp-glow 1.6s ease-in-out infinite; }
@keyframes sp-glow { 50% { opacity: .65; } }
#station-panel .loaned { box-shadow: inset 0 0 12px rgba(255,236,190,.3); }
#station-panel .loaned::before, #station-panel .loaned::after { content: ""; position: absolute; width: 2px; height: 2px; background: #fff4d6; pointer-events: none; z-index: 1;
  box-shadow: 2px 0 0 #ffe2a0, -2px 0 0 #ffe2a0, 0 2px 0 #ffe2a0, 0 -2px 0 #ffe2a0, 4px 0 0 rgba(255,226,160,.6), -4px 0 0 rgba(255,226,160,.6), 0 4px 0 rgba(255,226,160,.6), 0 -4px 0 rgba(255,226,160,.6);
  animation: sp-glint 1.7s steps(5) infinite; }
#station-panel .loaned::before { top: 7px; left: 8px; } #station-panel .loaned::after { bottom: 9px; right: 7px; animation-delay: -.85s; }
@keyframes sp-glint { 0%, 100% { opacity: 0; transform: scale(.6); } 50% { opacity: 1; transform: scale(1); } }
#station-panel .sp-chips { display: flex; flex-wrap: wrap; gap: 4px; } #station-panel .sp-chips span { font-size: 11px; padding: 1px 7px; border-radius: 10px; border: 1px solid rgba(232,226,244,.35); opacity: .75; }
#station-panel .sp-chips span.some { opacity: .95; } #station-panel .sp-chips span.whole { opacity: 1; color: #1d1408; background: var(--accent, #e8b46a); text-shadow: none; border-color: var(--accent, #e8b46a); }
#station-panel .sp-detail h3 small { font-size: 11px; font-weight: normal; margin-left: 6px; opacity: .8; } #station-panel .sp-detail p.up, #station-panel .sp-sum .up b { color: #8fe39a; } #station-panel .sp-detail p.down, #station-panel .sp-sum .down b { color: #ff9a8a; }
#station-panel .sp-sum { padding: 4px 6px; border: 1px solid rgba(232,226,244,.25); border-radius: 6px; font-size: 12px; } #station-panel .sp-sum > div:not(.sp-lab) { display: flex; gap: 6px; } #station-panel .sp-sum > div > b { margin-left: auto; font-weight: normal; }
#station-panel .sp-foot { font-size: 11px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; opacity: .85; }
#station-panel .k { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 4px; background: rgba(11,7,22,.6); border: 1px solid rgba(232,226,244,.6); border-bottom-width: 2px; color: var(--ink, #e8e2f4); font-size: 10px; text-shadow: none; }
`;
  document.head.append(s);
}
