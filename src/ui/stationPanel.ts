// A dressing station's panel (Ed, 2026-10-21, the station menus; the mock, previews/ed/station-menus-mock on claude/ed-shots): it
// slides in from the left as she comes near a station and away as she walks off (main.ts, rules/stations.ts), over the live game.
// Its shelves (rules/wardrobe.ts) hold the things she owns, silhouettes for those still to find (no hint: Ed), each shelf's
// colour grid (5 rows: every colour hers), its fit sliders and the broom's power. The mouse points and clicks;
// the d-pad or the arrow keys move through it, each owned item or colour landed on going on her at once (Ed: "landing on an item
// wears it at once"); WASD and the left stick only ever walk her. Each change shows on her a beat later (onLook) and she turns to
// show it (onChange). Her room (ui/creator.ts) is the full-screen creator; this is only the stations'.
import * as Art from "../../art/generator.js";
import type { Style } from "../render/style";
import { CLOTH_COLS, CLOTH_ROWS, GRID_ROWS, SKIN_COLS, skinSwatch, wear, wears, type Shelf, type WardrobeItem } from "../rules/wardrobe";
import { BROOM_SPELLS } from "../rules/spells";
import { classicPalette, cpuCanvas, slot, swatchAt } from "./creator";

type Genome = Record<string, unknown> & { palette: Record<string, number[]> | null; accessories: Record<string, unknown> };
type Sprite = { A: HTMLCanvasElement; w: number; h: number };
const AXES = Art.WITCH_AXES as Record<string, unknown[]>;
const rgb = Art.hsv2rgb as (h: number, s: number, v: number) => number[];
const css = ([h, s, v]: number[]) => { const [r, g, b] = rgb(h, s, v); return `rgb(${r | 0},${g | 0},${b | 0})`; };
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

/** How long the panel takes to slide (ms), and how long after the last change her look goes to the game (ms: a run of d-pad
 *  steps over the colours is one bake, not one a swatch). */
const SLIDE_MS = 220, LOOK_AFTER = 160;
/** The d-pad held: its first repeat after this many seconds, then one every REPEAT. */
const HOLD = .35, REPEAT = .11;
/** The fit sliders that only mean anything while what they shape is on (none at 0: the fit never puts it on). */
const FIT_NEEDS: Record<string, (g: Genome) => boolean> = { scarfLength: g => !!g.accessories.scarf, bagSize: g => !!g.accessories.satchel, backpackSize: g => Number(g.backpackSize) > 0 };
const FIT_NAMES: Record<string, string> = { hatHeight: "Height", hatBrim: "Brim", hatTilt: "Tilt", hatBand: "Band", cloakLength: "Cloak length", scarfLength: "Scarf length", bagSize: "Bag size", backpackSize: "Backpack size", broomLength: "Length", broomThickness: "Thickness", broomBend: "Bend", bristles: "Bristles" };
const PART_NAMES: Record<string, string> = { broom: "handle", bristles: "bristles", hat: "hat", plume: "plume" };
/** Where an item's picture is cut from her sprite (shares of its height; the broom's, her flying frame whole). */
const CROP: Record<string, [number, number]> = { hair: [.1, .52], face: [.16, .5], earrings: [.14, .5], jacket: [.33, .8], shoes: [.72, 1], cloak: [.1, 1], scarf: [.1, .8], bag: [.25, 1], backpack: [.1, 1] };

/** One focusable line of the panel: a shelf's items, its colour parts, a row of its grid, a fit slider, or its powers. */
interface Line { shelf: number; kind: "items" | "parts" | "grid" | "fit" | "power"; n: number; row?: number; axis?: string }

export class StationPanel {
  readonly root = document.createElement("div");
  /** Her look as it changes (a beat after the last change). */
  onLook: (g: Genome) => void = () => {};
  /** Something changed on her (she turns to show it). */
  onChange: () => void = () => {};
  /** The broom's power chosen. */
  onPower: (broom: string) => void = () => {};
  private id: string | null = null;
  private shelves: Shelf[] = [];
  private g!: Genome;
  private owned = new Set<string>();
  private broom = "none";
  private banner = "";
  private st: Style;
  /** The focus (a line and a place along it), the shelf whose colours are open, each shelf's chosen part, what the mouse is over. */
  private at = { line: 0, col: 0 };
  private openShelf = 0;
  private part = new Map<string, string>();
  private hover: { line: number; col: number } | null = null;
  private pointerIn = false;
  private navAt = -1e9;
  private lookTimer = 0;
  private slideTimer = 0;
  private pad = { held: "", next: 0 };
  private thumbs = new Map<string, HTMLCanvasElement>();
  private lastThumb = new Map<string, HTMLCanvasElement>();
  private queue: { key: string; item: WardrobeItem; shelf: Shelf }[] = [];
  private raf = 0;

  constructor(style: Style, pixel = 3) {
    this.st = { ...style, pixel } as Style;
    this.root.id = "station-panel";
    installCss();
    document.body.append(this.root);
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
    window.addEventListener("keydown", e => {
      const d = ARROWS[e.code]; if (!this.id || !d) return;
      e.preventDefault(); e.stopImmediatePropagation();
      this.move(d[0], d[1]);
    }, true);
  }

  /** The station whose panel is open, or null. */
  get station(): string | null { return this.id; }
  /** She's choosing: the pointer's over the panel, or she moved through it since she last walked (main.ts: the camera eases in). */
  get choosing(): boolean { return !!this.id && (this.pointerIn || this.navAt > 0); }
  /** She walked: not choosing till the pointer or the d-pad is back in the panel. */
  walked(): void { this.navAt = -1e9; }

  /** Slides `station`'s panel in (another's swapped for it) with her look, what she owns and her broom's power. */
  open(station: string, shelves: Shelf[], g: Genome, owned: Set<string>, broom: string, banner = ""): void {
    const swap = !!this.id && this.id !== station;
    clearTimeout(this.slideTimer);
    this.id = station; this.shelves = shelves; this.g = clone(g); this.owned = owned; this.broom = broom; this.banner = banner;
    this.openShelf = Math.max(0, shelves.findIndex(s => s.items.length > 0));
    this.navAt = -1e9; this.hover = null;
    const L = this.lines(), first = L.findIndex(l => l.kind === "items");
    const worn = first >= 0 ? this.shelves[L[first].shelf].items.findIndex(i => wears(this.g, i)) : 0;
    this.at = { line: Math.max(0, first), col: Math.max(0, worn) };
    this.paint();
    this.root.style.display = "flex";
    if (!swap) { this.root.classList.remove("in"); void this.root.offsetWidth; }
    this.root.classList.add("in");
  }
  /** Slides it away (her look sent first, if a change was waiting). */
  close(): void {
    if (!this.id) return;
    if (this.lookTimer) this.lookNow();
    this.id = null; this.pointerIn = false; this.queue = [];
    this.root.classList.remove("in");
    this.slideTimer = window.setTimeout(() => { if (!this.id) this.root.style.display = "none"; }, SLIDE_MS + 40);
  }
  /** Her look changed elsewhere (her room, a hat put on): the panel's copy follows. */
  setLook(g: Genome): void { if (this.id && JSON.stringify(g) !== JSON.stringify(this.g)) { this.g = clone(g); this.paint(); } }
  /** Each frame while open: the pad's d-pad (the left stick walks her: platform/input.ts leaves the d-pad to the panel). */
  update(time: number): void {
    if (!this.id) return;
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    let dir = "";
    for (const p of pads) { if (!p) continue; const b = (i: number) => !!p.buttons[i]?.pressed; dir = b(12) ? "up" : b(13) ? "down" : b(14) ? "left" : b(15) ? "right" : ""; if (dir) break; }
    if (!dir) { this.pad.held = ""; return; }
    if (dir !== this.pad.held) { this.pad = { held: dir, next: time + HOLD }; }
    else if (time >= this.pad.next) this.pad.next = time + REPEAT;
    else return;
    const [dx, dy] = PAD_DIRS[dir]; this.move(dx, dy);
  }

  // ---- what's on it ----
  /** The panel's lines, top to bottom: a shelf's items (or powers), then, if its colours are open (a shelf with no items always,
   *  else the one last chosen in), its parts (two or more) and the grid's 5 rows, then its fit sliders. */
  private lines(): Line[] {
    const out: Line[] = [];
    this.shelves.forEach((s, i) => {
      if (s.items.length) out.push({ shelf: i, kind: "items", n: s.items.length });
      if (s.power) out.push({ shelf: i, kind: "power", n: this.powers().length });
      if (s.colour && (!s.items.length || i === this.openShelf)) {
        if (s.colour.length > 1) out.push({ shelf: i, kind: "parts", n: s.colour.length });
        const cols = s.grid === "skin" ? SKIN_COLS : CLOTH_COLS;
        for (let r = 0; r < GRID_ROWS; r++) out.push({ shelf: i, kind: "grid", n: cols, row: r });
      }
      for (const a of s.fit ?? []) out.push({ shelf: i, kind: "fit", n: 1, axis: a });
    });
    return out;
  }
  private powers() { return BROOM_SPELLS.filter(x => x.built); }
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
  /** Focus a place, and choose what's there (an owned item or a colour on her, a part to colour, a power). */
  private go(line: number, col: number): void {
    const L = this.lines(), l = L[line]; if (!l) return;
    const s = this.shelves[l.shelf];
    this.at = { line, col };
    if (l.kind === "items") {
      const it = s.items[col];
      if (s.colour && this.openShelf !== l.shelf) { this.openShelf = l.shelf; this.at.line = this.lines().findIndex(q => q.shelf === l.shelf && q.kind === "items"); }
      if (this.owned.has(it.id) && !wears(this.g, it)) this.change(wear(this.g, it) as Genome);
    } else if (l.kind === "parts") this.part.set(s.id, s.colour![col]);
    else if (l.kind === "grid") { const part = this.partOf(s), c = this.swatch(s, col, l.row!); this.change({ ...this.g, palette: { ...classicPalette(this.st), ...this.g.palette, [part]: c } }); }
    else if (l.kind === "power") { const p = this.powers()[col]; if (p && p.id !== this.broom) { this.broom = p.id; this.onPower(p.id); this.onChange(); } }
    this.paint();
  }
  private setFit(axis: string, share: number): void {
    if (FIT_NEEDS[axis] && !FIT_NEEDS[axis](this.g)) return;
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
    const L = this.lines(), at = this.at;
    let html = this.banner ? `<div class="sp-banner">${esc(this.banner)}</div>` : "";
    html += `<div class="sp-head"><b>${esc(STATION_NAMES[this.id] ?? this.id)}</b><span>${this.found()}</span></div><div class="sp-body">`;
    let shelf = -1;
    L.forEach((l, i) => {
      const s = this.shelves[l.shelf];
      if (l.shelf !== shelf) {
        if (shelf >= 0) html += `</div>`;
        shelf = l.shelf;
        const worn = s.items.find(it => wears(this.g, it));
        html += `<div class="sp-shelf${L[at.line]?.shelf === l.shelf ? " on" : ""}"><div class="sp-lab">${esc(s.label)}${worn ? `<span> · ${esc(worn.name)}</span>` : ""}${s.always ? `<em>every colour</em>` : ""}</div>`;
      }
      const f = (c: number) => at.line === i && at.col === c ? " focus" : "";
      if (l.kind === "items") html += `<div class="sp-row">${s.items.map((it, c) => { const own = this.owned.has(it.id); return `<div class="sp-card${own ? "" : " locked"}${wears(this.g, it) ? " worn" : ""}${f(c)}" data-line="${i}" data-col="${c}">${none(it) ? `<i class="sp-none">∅</i>` : `<span data-thumb="${this.thumbKey(it, s)}"></span>`}${wears(this.g, it) ? `<b class="sp-tick">✓</b>` : ""}${own ? "" : `<b class="sp-lock">🔒</b>`}</div>`; }).join("")}</div>`;
      else if (l.kind === "power") html += `<div class="sp-row sp-powers">${this.powers().map((p, c) => `<div class="sp-power${p.id === this.broom ? " worn" : ""}${f(c)}" data-line="${i}" data-col="${c}">${esc(p.id === "none" ? "Plain" : p.name)}</div>`).join("")}</div>`;
      else if (l.kind === "parts") html += `<div class="sp-parts">${s.colour!.map((p, c) => `<span class="${p === this.partOf(s) ? "on" : ""}${f(c)}" data-line="${i}" data-col="${c}"><i style="background:${css(this.colourOf(p))}"></i>${esc(PART_NAMES[p] ?? p)}</span>`).join("")}</div>`;
      else if (l.kind === "grid") { const [sc, sr] = this.chosenSwatch(s); html += `<div class="sp-grid" style="grid-template-columns:repeat(${l.n},1fr)">${Array.from({ length: l.n }, (_, c) => `<i class="${sc === c && sr === l.row ? "sel" : ""}${f(c)}" data-line="${i}" data-col="${c}" style="background:${css(this.swatch(s, c, l.row!))}"></i>`).join("")}</div>`; }
      else if (l.kind === "fit") { const [lo, hi] = this.fitRange(l.axis!), on = !FIT_NEEDS[l.axis!] || FIT_NEEDS[l.axis!](this.g), v = Math.max(0, Math.min(1, (this.fitValue(l.axis!) - lo) / (hi - lo))); html += `<div class="sp-fit${on ? "" : " off"}${f(0)}" data-line="${i}" data-col="0"><span>${esc(FIT_NAMES[l.axis!] ?? l.axis!)}</span><div class="bar"><i style="left:${(v * 100).toFixed(1)}%"></i></div></div>`; }
    });
    if (shelf >= 0) html += `</div>`;
    html += `</div><div class="sp-detail"></div><div class="sp-foot"><span class="k">🖱</span> click <span class="k">← ↑ → ↓</span> or <span class="k">✥</span> move · walk away to close</div>`;
    this.root.innerHTML = html;
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-thumb]")) this.thumbInto(el);
    this.paintDetail();
    this.root.querySelector<HTMLElement>(".focus")?.scrollIntoView({ block: "nearest" });
  }
  private found(): string { const all = this.shelves.flatMap(s => s.items); return all.length ? `${all.filter(i => this.owned.has(i.id)).length} of ${all.length} found` : ""; }
  private paintDetail(): void {
    const box = this.root.querySelector<HTMLElement>(".sp-detail"); if (!box) return;
    const at = this.hover ?? this.at, l = this.lines()[at.line];
    let title = "", text = "", locked = false;
    if (l) {
      const s = this.shelves[l.shelf];
      if (l.kind === "items") { const it = s.items[at.col]; locked = !this.owned.has(it.id); title = locked ? "🔒" : it.name; text = locked ? "" : wears(this.g, it) ? "Wearing." : "Hers."; } // (a silhouette, nothing more: Ed, 2026-10-21)
      else if (l.kind === "power") { const p = this.powers()[at.col]; title = p.id === "none" ? "Plain broom" : p.name; text = p.line; }
      else if (l.kind === "parts") { title = `Colour: ${PART_NAMES[s.colour![at.col]] ?? s.colour![at.col]}`; text = "Every colour is hers."; }
      else if (l.kind === "grid") { title = `${s.label}: colour`; text = "Every colour is hers."; }
      else { const on = !FIT_NEEDS[l.axis!] || FIT_NEEDS[l.axis!](this.g); title = FIT_NAMES[l.axis!] ?? l.axis!; text = on ? "◀ ▶ or drag to change it." : "Put it on first."; }
    }
    box.className = `sp-detail${locked ? " locked" : ""}`;
    box.innerHTML = `<h3>${esc(title)}</h3><p>${esc(text)}</p>`;
  }

  // ---- the items' pictures: her, as she is, with each one on (baked a few a frame, kept by look) ----
  private thumbKey(it: WardrobeItem, s: Shelf): string { return `${s.id}:${it.id}:${hash(JSON.stringify(wear(this.g, it)))}`; }
  private thumbInto(el: HTMLElement): void {
    const key = el.dataset.thumb!, c = this.thumbs.get(key);
    if (c) { el.replaceChildren(c); return; }
    const was = this.lastThumb.get(key.slice(0, key.lastIndexOf(":"))); if (was) el.replaceChildren(was); // (the last one shown, till the new one's baked)
    if (!this.queue.some(q => q.key === key)) {
      const [sid, iid] = key.split(":"), s = this.shelves.find(q => q.id === sid), it = s?.items.find(i => i.id === iid);
      if (s && it) this.queue.push({ key, item: it, shelf: s });
    }
    if (!this.raf) this.raf = requestAnimationFrame(() => this.bakeSome());
  }
  private bakeSome(): void {
    this.raf = 0;
    const t0 = performance.now();
    while (this.queue.length && performance.now() - t0 < 8) {
      const q = this.queue.shift()!, c = this.bake(q.item, q.shelf);
      if (this.thumbs.size > 240) this.thumbs.delete(this.thumbs.keys().next().value!);
      this.thumbs.set(q.key, c); this.lastThumb.set(q.key.slice(0, q.key.lastIndexOf(":")), c);
      const el = this.root.querySelector<HTMLElement>(`[data-thumb="${q.key}"]`); if (el) el.replaceChildren(c);
    }
    if (this.queue.length) this.raf = requestAnimationFrame(() => this.bakeSome());
  }
  private bake(it: WardrobeItem, s: Shelf): HTMLCanvasElement { return wearPicture(this.st, this.g, it, s.id); }

}

/** A picture of her (genome `g`) wearing `it`, cut to the part it's worn on (its shelf `shelf`'s; a broom, her whole flying
 *  frame): the panel's cards, and the crystal ball's silhouette (ui/crystalBall.ts). */
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
const PAD_DIRS: Record<string, [number, number]> = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const STATION_NAMES: Record<string, string> = { mirror: "Mirror", dressingTable: "Dressing table", wardrobe: "Wardrobe", cloakPegs: "Cloak pegs", shoeRack: "Shoe rack", bags: "Bags", broomStand: "Broom stand" };
const none = (it: WardrobeItem) => Object.values(it.set).every(v => v === false || v === 0 || v === "none");
const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const hash = (s: string) => { let x = 2166136261; for (let i = 0; i < s.length; i++) x = Math.imul(x ^ s.charCodeAt(i), 16777619); return (x >>> 0).toString(36); };

let cssDone = false;
/** The panel's look: the HUD's (index.html: --panel, --accent, --ink, --dim), down the left edge. */
function installCss(): void {
  if (cssDone) return; cssDone = true;
  const s = document.createElement("style");
  s.textContent = `
#station-panel { position: fixed; left: 0; top: 16px; bottom: 16px; width: min(380px, 42vw); z-index: 18; display: none; box-sizing: border-box; padding: 12px 14px 10px; background: var(--panel, rgba(14,11,28,.86)); color: var(--ink, #e8e2f4); border: 1px solid rgba(232,180,106,.45); border-left: 0; border-radius: 0 12px 12px 0; box-shadow: 6px 0 24px rgba(0,0,0,.5); font: 13px/1.35 ui-monospace, Menlo, Consolas, monospace; transform: translateX(-105%); transition: transform ${SLIDE_MS}ms ease-out; flex-direction: column; gap: 8px; user-select: none; }
#station-panel.in { transform: none; }
#station-panel .sp-banner { margin: -12px -14px 0; padding: 7px 14px; border-radius: 0 12px 0 0; background: linear-gradient(90deg, rgba(232,180,106,.28), rgba(232,180,106,.05)); border-bottom: 1px solid rgba(232,180,106,.45); color: var(--accent, #e8b46a); font-size: 12px; }
#station-panel .sp-head { display: flex; align-items: baseline; gap: 8px; padding-bottom: 5px; border-bottom: 1px solid rgba(232,226,244,.12); }
#station-panel .sp-head b { font-size: 18px; color: var(--accent, #e8b46a); letter-spacing: 1px; } #station-panel .sp-head span { margin-left: auto; color: var(--dim, #9a93b4); font-size: 11px; }
#station-panel .sp-body { flex: 1; overflow-y: auto; scrollbar-width: thin; padding-right: 4px; display: flex; flex-direction: column; gap: 9px; }
#station-panel .sp-shelf { opacity: .68; } #station-panel .sp-shelf.on { opacity: 1; }
#station-panel .sp-lab { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--dim, #9a93b4); margin-bottom: 4px; display: flex; gap: 4px; align-items: baseline; }
#station-panel .sp-shelf.on .sp-lab { color: var(--ink, #e8e2f4); } #station-panel .sp-lab span { text-transform: none; letter-spacing: 0; }
#station-panel .sp-lab em { margin-left: auto; font-style: normal; text-transform: none; letter-spacing: 0; color: rgba(232,180,106,.6); }
#station-panel .sp-row { display: flex; flex-wrap: wrap; gap: 6px; }
#station-panel .sp-card { position: relative; width: 54px; height: 54px; border-radius: 7px; background: rgba(255,255,255,.06); border: 1px solid rgba(232,226,244,.14); display: grid; place-items: center; overflow: hidden; cursor: pointer; box-sizing: border-box; }
#station-panel .sp-card canvas { max-width: 48px; max-height: 48px; image-rendering: pixelated; width: auto; height: 48px; object-fit: contain; }
#station-panel .sp-card.locked { background: rgba(0,0,0,.35); border-style: dashed; cursor: default; } #station-panel .sp-card.locked canvas { filter: brightness(0) invert(.18); }
#station-panel .sp-card.worn { background: rgba(232,180,106,.13); }
#station-panel .focus { outline: 2px solid var(--accent, #e8b46a); outline-offset: 1px; box-shadow: 0 0 12px rgba(232,180,106,.45); }
#station-panel .sp-none { font-style: normal; font-size: 22px; color: var(--dim, #9a93b4); }
#station-panel .sp-tick { position: absolute; top: 2px; right: 3px; width: 14px; height: 14px; border-radius: 50%; background: var(--accent, #e8b46a); color: #1a1430; font-size: 9px; display: grid; place-items: center; }
#station-panel .sp-lock { position: absolute; bottom: 1px; right: 2px; font-size: 10px; font-weight: normal; }
#station-panel .sp-powers .sp-power { padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(232,226,244,.2); background: rgba(255,255,255,.06); cursor: pointer; font-size: 12px; }
#station-panel .sp-power.worn { background: rgba(232,180,106,.2); border-color: rgba(232,180,106,.6); }
#station-panel .sp-parts { display: flex; gap: 6px; margin: 4px 0 2px; } #station-panel .sp-parts span { display: inline-flex; gap: 5px; align-items: center; font-size: 11px; padding: 1px 8px; border-radius: 10px; border: 1px solid rgba(232,226,244,.3); color: var(--dim, #9a93b4); cursor: pointer; }
#station-panel .sp-parts span.on { border-color: var(--accent, #e8b46a); color: var(--ink, #e8e2f4); } #station-panel .sp-parts i { width: 10px; height: 10px; border-radius: 50%; }
#station-panel .sp-grid { display: grid; gap: 2px; margin-top: 2px; } #station-panel .sp-grid i { height: 14px; border-radius: 2px; border: 1px solid rgba(0,0,0,.4); cursor: pointer; position: relative; }
#station-panel .sp-grid i.sel { outline: 2px solid var(--accent, #e8b46a); outline-offset: 0; z-index: 1; } #station-panel .sp-grid i.focus { outline: 2px solid #fff; z-index: 2; box-shadow: 0 0 8px rgba(255,255,255,.6); }
#station-panel .sp-fit { display: flex; align-items: center; gap: 10px; padding: 3px 6px; border-radius: 6px; cursor: pointer; } #station-panel .sp-fit.off { opacity: .4; cursor: default; }
#station-panel .sp-fit span { width: 104px; font-size: 12px; } #station-panel .sp-fit .bar { position: relative; flex: 1; height: 6px; background: rgba(255,255,255,.14); border-radius: 3px; }
#station-panel .sp-fit .bar i { position: absolute; top: -5px; width: 10px; height: 16px; margin-left: -5px; border-radius: 3px; background: var(--accent, #e8b46a); }
#station-panel .sp-detail { padding: 8px 10px; border-radius: 8px; background: rgba(255,255,255,.05); border: 1px solid rgba(232,226,244,.1); min-height: 52px; }
#station-panel .sp-detail.locked { border-style: dashed; } #station-panel .sp-detail h3 { margin: 0 0 2px; font-size: 14px; font-weight: 600; } #station-panel .sp-detail p { margin: 0; color: var(--dim, #9a93b4); font-size: 12px; }
#station-panel .sp-foot { font-size: 11px; color: var(--dim, #9a93b4); display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
#station-panel .k { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 4px; background: rgba(255,255,255,.12); border: 1px solid rgba(232,226,244,.35); border-bottom-width: 2px; color: var(--ink, #e8e2f4); font-size: 10px; }
`;
  document.head.append(s);
}
