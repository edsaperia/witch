// A dressing station's panel (Ed, 2026-10-21, the station menus; the mock, previews/ed/station-menus-mock on claude/ed-shots): it
// slides in from the left on E at a station and away on E again (the pad's ✕ opens it, ○ closes it: platform/bindings.ts), she standing still at it (main.ts, rules/stations.ts;
// Ed, 2026-10-26), over the live game.
// Its shelves (rules/wardrobe.ts) hold the things she owns, silhouettes for those still to find (no hint: Ed), each shelf's
// colour grid (5 rows: every colour hers), its fit sliders; and the Workshop's (Ed, 2026-10-22/23; docs/backlog/workshop.md): the bay's
// part cards (a slot's parts, the empty slot first, the unfound greyed), the sets' chips, the focused part's stats and "Her broom",
// fitted at once (onFit: main.ts puts them on her broom mid-night and keeps them, app/broomSave.ts); the lathe's colours and fit (no
// items); the pegboard's 3 × 3 biome board, read-only (its lines focus, nothing is chosen). The mouse points and clicks;
// the d-pad or the arrow keys move its focus, and only choosing (choose, platform/bindings.ts, or a click) puts what's in focus
// on her (Ed, 2026-10-28: "she should change only when I press the 'choose' button"; till then landing on an item wore it at once),
// so leaving without choosing leaves her as she was (the focus and the choices: ui/stationChoice.ts). Each change shows on her a
// beat later (onLook) and she turns to show it (onChange). Her room (ui/creator.ts) is the full-screen creator; this is only the stations'.
import * as Art from "../../art/generator.js";
import type { Style } from "../render/style";
import { bareHeadAt, CLOTH_COLS, CLOTH_ROWS, GRID_ROWS, shownItems, SKIN_COLS, skinSwatch, wear, wears, type Shelf, type WardrobeItem } from "../rules/wardrobe";
import { BOARD, partById, type Fitted } from "../rules/broomParts";
import type { Tuning } from "../rules/tuning";
import { broomColours, partCanvas } from "../render/workshopArt";
import { broomSummary, cardAt, itemAt, panelPad, partStats, partsFound, setChips, setsOf, spellLine, type Line } from "./stationLines";
import { PanelChoice } from "./stationChoice";
import { bindings } from "../platform/bindings";
import { classicPalette, cpuCanvas, slot, swatchAt } from "./creator";
import { SlideIn } from "./slideIn";
import { glyphOf, keycapHtml } from "./keyHint";

type Genome = Record<string, unknown> & { palette: Record<string, number[]> | null; accessories: Record<string, unknown> };
type Sprite = { A: HTMLCanvasElement; w: number; h: number };
const AXES = Art.WITCH_AXES as Record<string, unknown[]>;
const rgb = Art.hsv2rgb as (h: number, s: number, v: number) => number[];
const css = ([h, s, v]: number[]) => { const [r, g, b] = rgb(h, s, v); return `rgb(${r | 0},${g | 0},${b | 0})`; };
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

/** How long after the last change her look goes to the game (ms: a run of d-pad steps over the colours is one bake, not one a
 *  swatch). */
const LOOK_AFTER = 60;
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


/** A list card's live picture (ui/bagPreview.ts BagPreview): its element, run or stopped, freed. */
export interface Preview { readonly el: HTMLElement; run(on: boolean): void; /** the card in focus: full brightness, the others a little dimmed */ focus?(on: boolean): void; dispose(): void }

export class StationPanel {
  readonly root = document.createElement("div");
  /** Her look as it changes (a beat after the last change). */
  onLook: (g: Genome) => void = () => {};
  /** Something changed on her (she turns to show it). */
  onChange: () => void = () => {};
  /** A step changed her look (not her broom's parts): she twirls while it draws (render/spin.ts). */
  onDress: () => void = () => {};
  /** Her broom's parts changed at the bay (a card chosen: fitted at once). */
  onFit: (f: Fitted) => void = () => {};
  /** Back (platform/bindings.ts menu.back: E, the pad's circle) pressed while it's open: main.ts closes it (the pad's goes through padControls). */
  onBack: () => void = () => {};
  /** A list shelf's item's live picture, a bag firing (Ed, 2026-10-29: "The bag menu should also show little animations of each bag
   *  'firing'"; Juliet's BagPreview, main.ts sets it): made once an item, kept while the panel's open, run only while its card is on
   *  screen. Unset, the list's cards have none. */
  preview: ((item: string) => Preview | null) | null = null;
  private previews = new Map<string, Preview>();
  private seen: IntersectionObserver | null = null;
  private id: string | null = null;
  private shelves: Shelf[] = [];
  /** The focus and what's chosen (ui/stationChoice.ts): her look, what she owns, her broom's parts. */
  private c!: PanelChoice;
  private get g(): Genome { return this.c.g as Genome; }
  private set g(v: Genome) { this.c.g = v; }
  private get owned(): ReadonlySet<string> { return this.c.owned; }
  /** Tonight's find on loan (app/loan.ts), its card sparkling (Ed, 2026-10-24: no words, "sparkly somehow"), or null. */
  private loaned: string | null = null;
  private ws: WorkshopCtx | null = null;
  private banner = "";
  private st: Style;
  /** The focus (a line and a place along it: PanelChoice's), and what the mouse is over (it only highlights). */
  private get at(): { line: number; col: number } { return this.c.at; }
  private set at(v: { line: number; col: number }) { this.c.at = v; }
  private hover: { line: number; col: number } | null = null;
  private pointerIn = false;
  private padChoose = false;
  private padCard: -1 | 0 | 1 = 0;
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
      const title = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (title) { e.preventDefault(); this.navAt = 1; this.c.focus(+title.dataset.card!, 0); this.paint(); return; } // (a card's title: its first line in focus)
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-line]"); if (!t) return;
      e.preventDefault();
      const line = +t.dataset.line!, L = this.lines()[line];
      if (L?.kind === "fit") { const bar = t.querySelector<HTMLElement>(".bar") ?? t; const set = (x: number) => { const r = bar.getBoundingClientRect(); this.setFit(L.axis!, (x - r.left) / r.width); }; set(e.clientX); const mv = (m: PointerEvent) => set(m.clientX), up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); }; window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up); this.at = { line, col: 0 }; this.paint(); return; }
      this.c.focus(line, +t.dataset.col!); this.pick(); // (a click chooses: the pointer over it only highlights)
    });
    // The arrow keys move through the panel while it's open (Ed, 2026-10-21: "the arrow keys move through the panel at a station;
    // WASD still walks her"): taken before the game's input sees them.
    // Choose (Space or Enter by default: platform/bindings.ts) chooses what's in focus, and says when it's still to be found; moving
    // only moves the focus (Ed, 2026-10-28). Back (E by default) closes it (onBack: main.ts), a held one's repeats ignored.
    window.addEventListener("keydown", e => {
      if (!this.id) return;
      const d = menuDir(e.code), pick = bindings.keys("menu.choose").includes(e.code), back = bindings.keys("menu.back").includes(e.code);
      const card = e.code === "PageDown" || bindings.keys("menu.tabNext").includes(e.code) ? 1 : e.code === "PageUp" || bindings.keys("menu.tabPrev").includes(e.code) ? -1 : 0;
      if (!d && !pick && !back && !card) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (d) this.move(d[0], d[1]); else if (card) this.jump(card); else if (e.repeat) return; else if (pick) this.pick(); else this.onBack();
    }, true);
  }

  /** What she plays with (platform/input.ts device): its keys in the hint line, repainted as it changes. */
  private device: "keys" | "pad" | "touch" = "keys";
  setDevice(d: "keys" | "pad" | "touch"): void { if (d !== this.device) { this.device = d; if (this.id) this.paint(); } }
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
    this.id = station; this.shelves = shelves; this.banner = banner; this.ws = ws;
    this.c = new PanelChoice(shelves, clone(g), owned, ws?.found ?? new Set(), ws ? { ...ws.fitted } : null, {
      grid: s => ({ cols: s.grid === "skin" ? SKIN_COLS : CLOTH_COLS, rows: GRID_ROWS }),
      swatch: (s, col, row) => this.swatch(s, col, row),
      palette: g2 => ({ ...classicPalette(this.st), ...g2.palette }),
      fitOn: (a, g2) => !FIT_NEEDS[a] || FIT_NEEDS[a](g2 as Genome),
    });
    this.navAt = -1e9; this.hover = null;
    this.padChoose = true; // (the pad's use button that opened it is held: let go first, then a press chooses)
    const L = this.lines(), first = L.findIndex(l => l.kind === "items" || (l.kind === "cards" && !l.readOnly));
    const s0 = first >= 0 ? this.shelves[L[first].shelf] : null;
    const worn = !s0 ? 0 : s0.slot ? Math.max(0, Array.from({ length: L[first].n }, (_, c) => cardAt(s0, L[first], c)).indexOf(this.ws?.fitted[s0.slot] ?? null)) : shownItems(s0).findIndex(i => wears(this.g, i));
    if (s0?.list) { const at = L.findIndex(l => l.shelf === L[first].shelf && l.item === worn); this.at = { line: Math.max(first, at), col: 0 }; } // (a list: the line of what she wears)
    else this.at = { line: Math.max(0, first), col: Math.max(0, worn) };
    this.paint();
    this.slide.in(); // (another station's swapped in place: it's in already)
    this.root.classList.add("in"); // (a mark for the tools: tools/opening/shots.cjs)
    this.root.dataset.station = station; // (whose it is: the tools tell one station's panel from the last one's, tools/smoke/pause-on-top.cjs)
  }
  /** Slides it away (her look sent first, if a change was waiting). */
  close(): void {
    if (!this.id) return;
    if (this.lookTimer) this.lookNow();
    this.id = null; this.pointerIn = false; this.queue = [];
    this.seen?.disconnect(); this.seen = null; for (const p of this.previews.values()) p.dispose(); this.previews.clear(); // (no preview runs with the panel shut)
    this.slide.out();
    this.root.classList.remove("in");
    delete this.root.dataset.station;
  }
  /** The Workshop's state changed elsewhere (a part found, her broom changed): the panel follows. */
  setWorkshop(ws: WorkshopCtx): void {
    const changed = !!this.id && !!this.ws && JSON.stringify([...ws.found, ws.fitted, ws.tonight]) !== JSON.stringify([...this.ws.found, this.ws.fitted, this.ws.tonight]);
    if (this.ws) this.ws = ws;
    if (this.id && this.c && this.ws) { this.c.found = ws.found; this.c.fitted = { ...ws.fitted }; }
    if (changed) this.paint();
  }
  /** Her look changed elsewhere (her room, a hat put on): the panel's copy follows. */
  /** Tonight's loan (its id, or null): its card sparkles, the panel repainted if it's open and that changed. */
  setLoaned(id: string | null): void { if (id !== this.loaned) { this.loaned = id; if (this.id) this.paint(); } }
  setLook(g: Genome): void { if (this.id && JSON.stringify(g) !== JSON.stringify(this.g)) { this.g = clone(g); this.paint(); } }
  /** Each frame while open: the pad's d-pad or right stick moves, its bottom face button chooses (the left stick walks her, square closes it:
   *  platform/input.ts padControls leaves the rest of the pad to the panel). */
  update(time: number): void {
    if (!this.id) return;
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    let dir = "", choose = false, card: -1 | 0 | 1 = 0;
    for (const p of pads) { if (!p) continue; const P = panelPad(p.buttons.map(x => x.pressed), p.axes); choose ||= P.choose; card ||= P.card; dir = P.dir; if (dir) break; }
    if (choose && !this.padChoose) this.pick(); // (the pad's A or X: platform/input.ts leaves them to the panel while it's open)
    this.padChoose = choose;
    if (card && card !== this.padCard) this.jump(card); // (L1 and R1: the card before or after, once a press)
    this.padCard = card;
    if (!dir) { this.pad.held = ""; return; }
    if (dir !== this.pad.held) { this.pad = { held: dir, next: time + HOLD }; }
    else if (time >= this.pad.next) this.pad.next = time + REPEAT;
    else return;
    const [dx, dy] = PAD_DIRS[dir]; this.move(dx, dy);
  }

  // ---- what's on it ----
  /** The panel's lines, top to bottom (ui/stationLines.ts). */
  private lines(): Line[] { return this.c.lines(); }
  private found_(): ReadonlySet<string> { return this.ws?.found ?? new Set(); }
  private fitOn(axis: string): boolean { return !FIT_NEEDS[axis] || FIT_NEEDS[axis](this.g); }
  private partOf(s: Shelf): string { return this.c.partOf(s); }
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
  /** The focus moved (the d-pad, the arrows, the stick): nothing on her changes (Ed, 2026-10-28); a fit slider's ◀ ▶ moves it. */
  private move(dx: number, dy: number): void {
    const L = this.lines(); if (!L.length) return;
    this.navAt = 1; this.hover = null;
    const cur = L[Math.min(this.at.line, L.length - 1)];
    if (!dy && cur.kind === "fit") { const [lo, hi] = this.fitRange(cur.axis!); this.setFit(cur.axis!, (this.fitValue(cur.axis!) - lo) / (hi - lo) + dx * .1); return; }
    if (this.c.move(dx, dy)) this.paint();
  }
  /** The focus to the next card or the last (L1/R1, PageUp/PageDown): nothing on her changes. */
  private jump(dir: -1 | 1): void { this.navAt = 1; this.hover = null; if (this.c.jumpCard(dir)) this.paint(); }
  /** Choose what's in focus (confirm, a click): an owned item or a colour on her, the part the colours are for, a broom part fitted
   *  at the bay; a locked one says it's still to be found. */
  private pick(): void {
    const r = this.c.choose();
    if (r.look) this.change(r.look);
    if (r.fitted && this.ws) { this.ws = { ...this.ws, fitted: r.fitted }; this.onFit(r.fitted); this.onChange(); }
    this.paint();
  }
  private tried(at: { line: number; col: number }): boolean { const n = this.c.nope; return !!n && n.line === at.line && n.col === at.col; }
  private setFit(axis: string, share: number): void {
    if (!this.fitOn(axis)) return;
    const [lo, hi] = this.fitRange(axis), v = +(lo + Math.max(0, Math.min(1, share)) * (hi - lo)).toFixed(3);
    if (Math.abs(v - this.fitValue(axis)) < 1e-6) return;
    const g = clone(this.g), [p, k] = slot(axis);
    if (p) (g[p] as Record<string, unknown>)[k] = v; else g[k] = v;
    if (JSON.stringify(g) !== JSON.stringify(this.g)) this.change(g);
    this.paint();
  }
  private change(g: Genome): void {
    this.onDress(); // (a change chosen: she twirls while it draws)
    this.g = g;
    clearTimeout(this.lookTimer); this.lookTimer = window.setTimeout(() => this.lookNow(), LOOK_AFTER);
    this.onChange();
  }
  private lookNow(): void { clearTimeout(this.lookTimer); this.lookTimer = 0; this.onLook(clone(this.g)); }

  // ---- drawing ----
  /** The panel as cards (Ed, 2026-10-29: "different items should be on their own cards with clear titles, controls for each item
   *  should be together on the same card"): one a shelf, its title (what she has on in it) and all its lines together (its items or
   *  parts, its colours' parts and grid, its fit sliders; the Workshop's set chips with "Her broom" under them), stacked down the
   *  left half and scrolling; the card in focus lit, the detail of what's in focus at its foot. */
  private paint(): void {
    if (!this.id) return;
    const L = this.lines(); // (a fit slider comes and goes with what it shapes: the focus kept on a line that's there)
    if (this.at.line >= L.length) this.at = { line: Math.max(0, L.length - 1), col: 0 };
    const at = this.at;
    let html = this.banner ? `<div class="sp-banner">${esc(this.banner)}</div>` : "";
    html += `<div class="sp-head"><b>${esc(STATION_NAMES[this.id] ?? this.id)}</b><span>${this.found()}</span></div><div class="sp-body">`;
    let shelf = -1;
    const shut = (i: number) => { const s = this.shelves[i]; return `${s.sets && this.ws ? this.summary(this.ws) : ""}</div>`; };
    L.forEach((l, i) => {
      const s = this.shelves[l.shelf];
      if (l.shelf !== shelf) {
        if (shelf >= 0) html += shut(shelf);
        shelf = l.shelf;
        const worn = s.slot ? partById(this.ws?.fitted[s.slot])?.name ?? "Empty" : shownItems(s).find(it => wears(this.g, it))?.name;
        const note = s.always ? "every colour" : s.slot ? SLOT_ROLE[s.slot] : s.board ? "north up" : "";
        html += `<div class="sp-shelf${L[at.line]?.shelf === l.shelf ? " on" : ""}" data-shelf="${l.shelf}"><div class="sp-lab" data-card="${i}"><b>${esc(s.label)}</b>${worn ? `<span>${esc(worn)}</span>` : ""}${note ? `<em>${esc(note)}</em>` : ""}</div>`;
      }
      const f = (c: number) => at.line === i && at.col === c ? " focus" : "";
      if (l.kind === "items" && l.item !== undefined) { const it = itemAt(s, l, 0), own = this.owned.has(it.id), on = wears(this.g, it), stat = own ? statOf(it) : ""; html += `<div class="sp-card sp-listrow${own ? "" : " locked"}${on ? " worn" : ""}${it.id === this.loaned ? " loaned" : ""}${f(0)}" data-line="${i}" data-col="0">${none(it) ? `<i class="sp-none">∅</i>` : `<span class="sp-pic" data-thumb="${this.thumbKey(it, s)}"></span>`}<span class="sp-stat"><b>${own ? esc(it.name) : "🔒"}</b>${esc(stat)}</span>${own && !none(it) && this.preview ? `<span class="sp-preview" data-preview="${esc(it.id)}"></span>` : ""}${on ? `<b class="sp-tick">✓</b>` : ""}</div>`; }
      else if (l.kind === "items") html += `<div class="sp-row">${shownItems(s).map((it, c) => { const own = this.owned.has(it.id), stat = own ? statOf(it) : ""; return `<div class="sp-card${stat ? " sp-statcard" : ""}${own ? "" : " locked"}${wears(this.g, it) ? " worn" : ""}${it.id === this.loaned ? " loaned" : ""}${f(c)}" data-line="${i}" data-col="${c}">${none(it) ? `<i class="sp-none">∅</i>` : `<span data-thumb="${this.thumbKey(it, s)}"></span>`}${stat ? `<span class="sp-stat"><b>${esc(it.name)}</b>${esc(stat)}</span>` : ""}${wears(this.g, it) ? `<b class="sp-tick">✓</b>` : ""}${own ? "" : `<b class="sp-lock">🔒</b>`}</div>`; }).join("")}</div>`;
      else if (l.kind === "cards" && s.board) html += `<div class="sp-row sp-board">${Array.from({ length: l.n }, (_, c) => {
        const id = cardAt(s, l, c)!, cell = BOARD[(l.row ?? 0) * 3 + c], own = this.found_().has(id), tonight = !own && this.ws?.tonight === id;
        return `<div class="sp-cell${own ? "" : " locked"}${tonight ? " tonight" : ""}${id === this.loaned ? " loaned" : ""}${f(c)}" data-line="${i}" data-col="${c}"><small>${esc(cell.point)} · ${esc(cell.biome)}</small><span data-thumb="${this.partKey(id)}"></span><b>${own ? esc(partById(id)!.name) : "?"}</b></div>`;
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
    if (shelf >= 0) html += shut(shelf);
    html += `</div><div class="sp-foot">${footHtml(this.device)}</div>`;
    this.root.innerHTML = html;
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-thumb]")) this.thumbInto(el);
    this.placePreviews();
    this.paintDetail();
    const card = this.root.querySelector<HTMLElement>(".sp-shelf.on"), fo = this.root.querySelector<HTMLElement>(".focus");
    card?.scrollIntoView({ block: "nearest" }); fo?.scrollIntoView({ block: "nearest" }); // (the focused card whole where it fits, its focus always)
  }
  /** The list's live pictures into their cards (each made once and kept while the panel's open: the panel's HTML is rebuilt on every
   *  move), each run only while its card shows in the scrolling body (an IntersectionObserver), so ten bags cost the work of the two or
   *  three on screen. */
  private placePreviews(): void {
    const slots = this.root.querySelectorAll<HTMLElement>("[data-preview]");
    if (!slots.length || !this.preview) return;
    const body = this.root.querySelector<HTMLElement>(".sp-body");
    this.seen?.disconnect();
    this.seen = new IntersectionObserver(es => { for (const e of es) this.previews.get((e.target as HTMLElement).dataset.preview!)?.run(e.isIntersecting); }, { root: body, threshold: 0.1 });
    for (const slot of slots) {
      const id = slot.dataset.preview!;
      let p = this.previews.get(id);
      if (!p) { const made = this.preview(id); if (!made) continue; this.previews.set(id, (p = made)); }
      if (p.el.parentElement !== slot) slot.replaceChildren(p.el);
      p.focus?.(!!slot.closest(".focus"));
      this.seen.observe(slot); // (its first word, at once, runs it or stops it)
    }
  }
  private found(): string {
    if (this.shelves.some(q => q.slot || q.board)) return partsFound(this.found_());
    const all = this.shelves.flatMap(shownItems); return all.length ? `${all.filter(i => this.owned.has(i.id)).length} of ${all.length} found` : "";
  }
  /** "Her broom" (the bay): every number her parts change, bare → now, up green and down red, and her spell. */
  private summary(ws: WorkshopCtx): string {
    const rows = broomSummary(ws.fitted, ws.tuning);
    return `<div class="sp-sum"><div class="sp-sub">Her broom<em>bare → now</em></div>${rows.length ? rows.map(r => `<div class="${r.better ? "up" : "down"}"><span>${esc(r.name)}</span><b>${esc(r.from)} → ${esc(r.to)}</b></div>`).join("") : `<div><span>A bare broom</span><b>as it comes</b></div>`}<div class="${spellLine(ws.fitted).startsWith("none") ? "" : "up"}"><span>Spell (R)</span><b>${esc(spellLine(ws.fitted))}</b></div></div>`;
  }
  private paintDetail(): void {
    const at = this.hover ?? this.at, l = this.lines()[at.line];
    const card = l ? this.root.querySelector<HTMLElement>(`.sp-shelf[data-shelf="${l.shelf}"]`) : null; if (!card) return;
    let box = this.root.querySelector<HTMLElement>(".sp-detail");
    if (!box) { box = document.createElement("div"); }
    if (box.parentElement !== card) card.append(box); // (at the foot of the card it's about: its own controls together, Ed 2026-10-29)
    let title = "", text = "", locked = false, sub = "", stats: { name: string; from: string; to: string; better: boolean | null }[] = [];
    if (l) {
      const s = this.shelves[l.shelf];
      if (l.kind === "items") { const it = itemAt(s, l, at.col); locked = !this.owned.has(it.id); title = locked ? "🔒" : it.name; text = locked ? (this.tried(at) ? "Not found yet." : "") : wears(this.g, it) ? "Wearing." : "Hers: choose to wear it."; } // (a silhouette, nothing more: Ed, 2026-10-21; chosen anyway, it says it's not hers yet)
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
      else if (l.kind === "parts") { const p = s.colour![at.col]; title = `Colour: ${PART_NAMES[p] ?? p}`; text = p === this.partOf(s) ? "The colours below are for this." : "Choose it to colour it below."; }
      else if (l.kind === "grid") { const [sc, sr] = this.chosenSwatch(s); title = `${s.label}: colour`; text = sc === at.col && sr === l.row ? "Wearing." : "Every colour is hers: choose to put it on."; }
      else { const on = !FIT_NEEDS[l.axis!] || FIT_NEEDS[l.axis!](this.g); title = FIT_NAMES[l.axis!] ?? l.axis!; text = on ? "◀ ▶ or drag to change it." : "Put it on first."; }
    }
    box.className = `sp-detail${locked ? " locked" : ""}`;
    if (!title && !text && !stats.length) { box.remove(); return; }
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

// (WASD too: she stands still while it's open, the movement keys its buttons; Ed, 2026-10-26: "walking away shouldn't work - then
// we can use the movement keys as buttons in the menus")
const menuDir = (code: string): [number, number] | null => {
  for (const d of ["left", "right", "up", "down"] as const) if (bindings.keys(`menu.${d}`).includes(code)) return PAD_DIRS[d];
  return null;
};
/** The panel's hint line, keycaps and no words, three groups on the device she plays with (Ed, 2026-10-26: "hint line: trim it"):
 *  move (WASD; a pad's stick), choose (Space; ✕) and close (E; ○), as bound now (platform/bindings.ts). Enter and the arrows still work, unshown; on touch she taps
 *  what she wants, and the corner's keycap closes it (main.ts). */
export const footHtml = (device: "keys" | "pad" | "touch"): string =>
  device === "pad" ? `${keycapHtml(`pad:${bindings.pad("menu.up").find(p => p.startsWith("ls") || p.startsWith("rs")) ?? bindings.pad("menu.up")[0] ?? "?"}`)} · ${keycapHtml(glyphOf("menu.choose", "pad"))} · ${keycapHtml(glyphOf("menu.back", "pad"))}`
  : device === "touch" ? keycapHtml("TAP")
  : `${(["menu.up", "menu.left", "menu.down", "menu.right"] as const).map(id => keycapHtml(glyphOf(id, "keys"))).join("")} · ${keycapHtml(glyphOf("menu.choose", "keys"))} · ${keycapHtml(glyphOf("menu.back", "keys"))}`;
// (the keys and the pad as bound now, platform/bindings.ts: a remap shows here too, Ed 2026-10-28)
const PAD_DIRS: Record<string, [number, number]> = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const STATION_NAMES: Record<string, string> = { mirror: "Mirror", dressingTable: "Dressing table", wardrobe: "Wardrobe", cloakPegs: "Cloak pegs", shoeRack: "Shoe rack", bags: "Bags", broomBay: "The bay", lathe: "Broom", pegboard: "Pegboard" };
const ART_M = Art.M as Record<string, number>;
/** An item's stat line, on its card (Juliet's two bags, 2026-10-29: "faster throws, shorter reach"; config/wardrobe.json `stat`,
 *  rules/bags.ts), or "". */
const statOf = (it: WardrobeItem): string => { const s = (it as WardrobeItem & { stat?: unknown }).stat; return typeof s === "string" ? s : ""; };
const none = (it: WardrobeItem) => Object.values(it.set).every(v => v === false || v === 0 || v === "none");
const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const hash = (s: string) => { let x = 2166136261; for (let i = 0; i < s.length; i++) x = Math.imul(x ^ s.charCodeAt(i), 16777619); return (x >>> 0).toString(36); };

let cssDone = false;
/** The panel's look: the HUD's (index.html: --panel, --accent, --ink, --dim), down the left edge. */
function installCss(): void {
  if (cssDone) return; cssDone = true;
  const s = document.createElement("style");
  s.textContent = `
#station-panel { --ol: #0b0716; --gold: var(--accent, #e8b46a); position: fixed; left: 0; top: 0; bottom: 0; width: 50vw; z-index: 18; box-sizing: border-box; padding: 1.1em 1.4em 0.9em 1.4em; color: var(--ink, #e8e2f4); font: clamp(15px, 1.45vw, 26px)/1.35 ui-monospace, Menlo, Consolas, monospace; flex-direction: column; gap: .6em; user-select: none; text-shadow: -1px -1px 0 var(--ol), 1px -1px 0 var(--ol), -1px 1px 0 var(--ol), 1px 1px 0 var(--ol), 0 0 6px rgba(0,0,0,.9);
  background: linear-gradient(90deg, rgba(11,7,22,.72) 0%, rgba(11,7,22,.55) 80%, rgba(11,7,22,0) 100%); }
#station-panel .sp-banner { color: var(--gold); font-size: .9em; }
#station-panel .sp-head { display: flex; align-items: baseline; gap: .6em; }
#station-panel .sp-head b { font-size: 1.6em; color: var(--gold); letter-spacing: 1px; } #station-panel .sp-head span { margin-left: auto; font-size: .8em; opacity: .85; }
#station-panel .sp-body { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(232,180,106,.5) transparent; display: flex; flex-direction: column; gap: .75em; padding: 2px 4px 2px 2px; }
#station-panel .sp-shelf { flex: none; display: flex; flex-direction: column; gap: .5em; padding: .7em .9em .8em; border-radius: .7em; background: rgba(26,18,44,.88); box-shadow: inset 0 0 0 1px rgba(232,226,244,.16), 0 2px 10px rgba(0,0,0,.35); }
#station-panel .sp-shelf.on { background: rgba(38,26,62,.94); box-shadow: inset 0 0 0 2px rgba(232,180,106,.85), 0 2px 14px rgba(0,0,0,.45); }
#station-panel .sp-lab { display: flex; gap: .6em; align-items: baseline; cursor: pointer; }
#station-panel .sp-lab b { font-size: 1.15em; letter-spacing: .5px; } #station-panel .sp-shelf.on .sp-lab b { color: var(--gold); }
#station-panel .sp-lab span { font-size: .85em; opacity: .9; } #station-panel .sp-lab em { margin-left: auto; font-style: normal; font-size: .75em; opacity: .75; }
#station-panel .sp-sub { font-size: .8em; display: flex; gap: .5em; opacity: .9; } #station-panel .sp-sub em { margin-left: auto; font-style: normal; opacity: .75; }
#station-panel .sp-row { display: flex; flex-wrap: wrap; gap: .45em; }
#station-panel .sp-card { position: relative; width: 4.6em; height: 4.6em; border-radius: .5em; background: rgba(11,7,22,.55); box-shadow: inset 0 0 0 1px rgba(232,226,244,.14); display: grid; place-items: center; cursor: pointer; box-sizing: border-box; }
#station-panel .sp-card canvas { image-rendering: pixelated; width: auto; height: 4.2em; max-width: 4.3em; object-fit: contain; filter: drop-shadow(1px 0 0 var(--ol)) drop-shadow(-1px 0 0 var(--ol)) drop-shadow(0 1px 0 var(--ol)) drop-shadow(0 -1px 0 var(--ol)); }
#station-panel .sp-card.locked { cursor: default; } #station-panel .sp-card.locked canvas { filter: brightness(0) invert(.22) drop-shadow(1px 0 0 rgba(232,226,244,.5)) drop-shadow(-1px 0 0 rgba(232,226,244,.5)) drop-shadow(0 1px 0 rgba(232,226,244,.5)) drop-shadow(0 -1px 0 rgba(232,226,244,.5)); }
#station-panel .focus { outline: 3px solid #fff; outline-offset: 2px; box-shadow: 0 0 12px rgba(255,255,255,.75), inset 0 0 0 1px var(--ol); }
#station-panel .sp-card.worn:not(.focus) { outline: 2px solid rgba(232,180,106,.8); outline-offset: 1px; }
#station-panel .sp-none { font-style: normal; font-size: 1.8em; }
#station-panel .sp-tick { position: absolute; top: .15em; right: .15em; width: 1.2em; height: 1.2em; border-radius: 50%; background: var(--gold); color: #1a1430; font-size: .75em; display: grid; place-items: center; text-shadow: none; box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-lock { position: absolute; bottom: .1em; right: .2em; font-size: .9em; font-weight: normal; }
#station-panel .sp-parts { display: flex; gap: .5em; flex-wrap: wrap; } #station-panel .sp-parts span { display: inline-flex; gap: .4em; align-items: center; font-size: .9em; padding: .15em .6em; border-radius: 1em; cursor: pointer; background: rgba(11,7,22,.45); opacity: .85; }
#station-panel .sp-parts span.on { opacity: 1; color: var(--gold); box-shadow: inset 0 0 0 1px rgba(232,180,106,.7); } #station-panel .sp-parts i { width: .85em; height: .85em; border-radius: 50%; box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-grid { display: grid; gap: 2px; padding: 2px; background: var(--ol); border-radius: 4px; } #station-panel .sp-grid + .sp-grid { margin-top: calc(-.5em - 2px); }
#station-panel .sp-grid i { height: 1.45em; cursor: pointer; position: relative; display: block; }
#station-panel .sp-grid i.sel { outline: 3px solid var(--gold); outline-offset: 0; z-index: 1; } #station-panel .sp-grid i.sel::after { content: "✓"; position: absolute; inset: 0; display: grid; place-items: center; font-size: .8em; font-style: normal; color: #fff; text-shadow: 0 0 2px #000, 0 0 2px #000; } #station-panel .sp-grid i.focus { outline: 3px solid #fff; z-index: 2; box-shadow: 0 0 8px rgba(255,255,255,.85); }
#station-panel .sp-fit { display: flex; align-items: center; gap: .8em; padding: .25em .3em; border-radius: .4em; cursor: pointer; } #station-panel .sp-fit.off { opacity: .45; cursor: default; }
#station-panel .sp-fit span { width: 8em; font-size: .9em; } #station-panel .sp-fit .bar { position: relative; flex: 1; height: .35em; background: rgba(232,226,244,.55); border-radius: .2em; box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-fit .bar i { position: absolute; top: -.45em; width: .7em; height: 1.25em; margin-left: -.35em; border-radius: .2em; background: var(--gold); box-shadow: 0 0 0 1px var(--ol); }
#station-panel .sp-detail { padding: .45em .6em; border-radius: .45em; background: rgba(11,7,22,.5); } #station-panel .sp-detail h3 { margin: 0 0 .15em; font-size: 1em; font-weight: 600; } #station-panel .sp-detail p { margin: 0; font-size: .85em; opacity: .9; }
#station-panel .sp-listrow { width: 100%; height: auto; min-height: 5.2em; grid-template-columns: 4.4em 1fr auto; gap: .7em; padding: .35em .8em .35em .2em; justify-items: start; }
#station-panel .sp-listrow + .sp-listrow, #station-panel .sp-row + .sp-listrow { margin-top: -.1em; }
#station-panel .sp-listrow .sp-pic canvas { height: 4.2em; }
#station-panel .sp-preview { width: 12em; height: 6em; border-radius: .4em; overflow: hidden; background: rgba(11,7,22,.6); justify-self: end; }
#station-panel .sp-preview > * { width: 100%; height: 100%; display: block; image-rendering: pixelated; }
#station-panel .sp-statcard { width: auto; min-width: 13em; max-width: 100%; grid-template-columns: 4.4em 1fr; gap: .5em; padding: 0 .7em 0 .1em; justify-items: start; }
#station-panel .sp-stat { display: flex; flex-direction: column; font-size: .85em; line-height: 1.2; } #station-panel .sp-stat b { color: var(--gold); font-weight: 600; }
#station-panel .sp-wide { width: 6.4em; height: 3.8em; } #station-panel .sp-wide canvas { height: auto; width: auto; max-width: 5.9em; max-height: 3.3em; }
#station-panel .sp-board { flex-wrap: nowrap; gap: .45em; } #station-panel .sp-cell { flex: 1; position: relative; min-height: 6.2em; border: 1px solid rgba(232,226,244,.3); border-radius: .45em; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: .3em .2em; cursor: default; background: rgba(11,7,22,.5); }
#station-panel .sp-cell small { font-size: .65em; line-height: 1.15; text-align: center; text-transform: uppercase; letter-spacing: .5px; opacity: .85; } #station-panel .sp-cell b { font-size: .75em; font-weight: normal; text-align: center; }
#station-panel .sp-cell canvas { image-rendering: pixelated; max-width: 6.5em; max-height: 2.8em; width: auto; height: auto; filter: drop-shadow(1px 0 0 var(--ol)) drop-shadow(-1px 0 0 var(--ol)) drop-shadow(0 1px 0 var(--ol)) drop-shadow(0 -1px 0 var(--ol)); }
#station-panel .sp-cell.locked canvas { filter: brightness(0) invert(.12) drop-shadow(1px 0 0 rgba(232,226,244,.45)) drop-shadow(-1px 0 0 rgba(232,226,244,.45)) drop-shadow(0 1px 0 rgba(232,226,244,.45)) drop-shadow(0 -1px 0 rgba(232,226,244,.45)); }
#station-panel .sp-cell.tonight { border-color: rgba(255,214,120,.9); box-shadow: 0 0 10px rgba(255,214,120,.55), inset 0 0 8px rgba(255,214,120,.3); } #station-panel .sp-cell.tonight canvas { filter: brightness(0) invert(.12) drop-shadow(1px 0 0 #ffd678) drop-shadow(-1px 0 0 #ffd678) drop-shadow(0 1px 0 #ffd678) drop-shadow(0 -1px 0 #ffd678) drop-shadow(0 0 4px rgba(255,214,120,.9)); animation: sp-glow 1.6s ease-in-out infinite; }
@keyframes sp-glow { 50% { opacity: .65; } }
#station-panel .loaned { box-shadow: inset 0 0 12px rgba(255,236,190,.3); }
#station-panel .loaned::before, #station-panel .loaned::after { content: ""; position: absolute; width: 2px; height: 2px; background: #fff4d6; pointer-events: none; z-index: 1;
  box-shadow: 2px 0 0 #ffe2a0, -2px 0 0 #ffe2a0, 0 2px 0 #ffe2a0, 0 -2px 0 #ffe2a0, 4px 0 0 rgba(255,226,160,.6), -4px 0 0 rgba(255,226,160,.6), 0 4px 0 rgba(255,226,160,.6), 0 -4px 0 rgba(255,226,160,.6);
  animation: sp-glint 1.7s steps(5) infinite; }
#station-panel .loaned::before { top: 7px; left: 8px; } #station-panel .loaned::after { bottom: 9px; right: 7px; animation-delay: -.85s; }
@keyframes sp-glint { 0%, 100% { opacity: 0; transform: scale(.6); } 50% { opacity: 1; transform: scale(1); } }
#station-panel .sp-chips { display: flex; flex-wrap: wrap; gap: .45em; } #station-panel .sp-chips span { font-size: .85em; padding: .15em .7em; border-radius: 1em; border: 1px solid rgba(232,226,244,.35); opacity: .8; }
#station-panel .sp-chips span.some { opacity: .95; } #station-panel .sp-chips span.whole { opacity: 1; color: #1d1408; background: var(--gold); text-shadow: none; border-color: var(--gold); }
#station-panel .sp-detail h3 small { font-size: .8em; font-weight: normal; margin-left: .5em; opacity: .8; } #station-panel .sp-detail p.up, #station-panel .sp-sum .up b { color: #8fe39a; } #station-panel .sp-detail p.down, #station-panel .sp-sum .down b { color: #ff9a8a; }
#station-panel .sp-sum { padding: .45em .6em; border-radius: .45em; background: rgba(11,7,22,.5); font-size: .85em; display: flex; flex-direction: column; gap: .1em; } #station-panel .sp-sum > div:not(.sp-sub) { display: flex; gap: .5em; } #station-panel .sp-sum > div > b { margin-left: auto; font-weight: normal; }
#station-panel .sp-foot { font-size: .8em; display: flex; align-items: center; gap: .4em; flex-wrap: wrap; opacity: .9; }
#station-panel .sp-foot img.kc { transform: scale(1.4); margin: 0 .3em; }
`;
  document.head.append(s);
}
