// The sea chart as a view to mount anywhere (Echo, 2026-10-11: the treehouse's map table, "the world map is in the centre"; and
// chart.html, chartPage.ts): the world as a disc of night sea in 3D, drawn as the game is (render/chart/seaChart.ts; Ed,
// 2026-10-11: "show the map screen in the same way you show the island: pixellated, camera seeing it in 3D, your view moves
// around as you select islands"): home in the middle, every island at its kind's bearing on its phase's ring (chartLayout.ts
// islandAt) in its real outline (hotel, rules/islandShape.ts islandOutline: the land each grows to; made off the page's thread by
// chartOutlines.worker.ts, the chosen and nearest first, its round coast, islandCoast, shown till it comes), a sigil only on
// those she can travel to (Ed: "You can always see all the islands - you only see sigils on the ones that you can travel to"),
// big enough to read (Ed: "large enough that the animal sigils show clearly on the islands"); her voyages as glowing lines on
// the water; won islands ringed in gold.
//   Choose an island (tap or click it; arrow keys, the d-pad or the stick) and the camera glides to it and names it. Three modes:
// "sail" (between nights): choose it again, press Enter or the pad's A, or the Sail button, to sail there; Start over (after an
// are-you-sure) forgets it all. "look" (mid-night): the same, but no sailing and no starting over. "miniature" (the map table's
// model): no card, no buttons, no keys, the camera slowly circling. The save and what's unlocked are chartSave.ts's: this is
// the view. Its own canvas and renderer, inside `host`; the caller's loop calls update() (no requestAnimationFrame of its own).
import { islandCoast } from "../rules/islandShape";
import { coastSpec, homeIsland, isPlaceholder, islandOf, KIND_NAMES, knownKinds, REAL_KINDS } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import { islandSigil } from "../../art/sigils.js";
import { CHART_PIXEL, SeaChart, type ChartIsland } from "../render/chart/seaChart";
import { loadSave, newCampaign, unlocked, worldSeed, type ChartSave } from "./chartSave";
import { islandAt } from "./chartLayout";
import { stepTo } from "./chartNav";
import type { OutlineAsk, OutlineDone } from "./chartOutlines.worker";

export type ChartMode = "look" | "sail" | "miniature";
export interface ChartViewOptions {
  mode: ChartMode;
  /** What she's found, won and sailed (default: loadSave()). */
  save?: ChartSave;
  /** The world to show, if not the save's own (a shared link's ?world=): sailing carries it on (&world=). */
  world?: number;
  /** Sail mode: sail to an island (default: to ?island=<kind>, with &world= when `world` is given). */
  onSail?: (island: string) => void;
  /** Look and sail modes: a Close button and Esc. */
  onClose?: () => void;
  /** Miniature: its render size in art pixels (default: the host's size). */
  size?: { w: number; h: number };
  /** A note after the status line (chart.html's "showing everything"). */
  note?: string;
  /** The island chosen first (default: the one she was last on, her last voyage's end, else home). */
  start?: string;
  /** Count the uncharted placeholders in the status line (chart.html's ?chart=all). */
  countUncharted?: boolean;
}
export interface ChartView {
  /** Its canvas (for a miniature: draw it as a texture, THREE.CanvasTexture). */
  readonly canvas: HTMLCanvasElement;
  /** The scene, for tests and screenshots. */
  readonly chart: SeaChart;
  /** Its islands as drawn now. */
  islands(): ChartIsland[];
  /** A frame: its keys and pad, the camera, the sea. */
  update(dt: number, time: number): void;
  /** Fit it (CSS pixels; the default the host's size). */
  resize(cssW?: number, cssH?: number): void;
  /** Choose an island (null for none): the camera glides there and its card shows. */
  choose(id: string | null, instant?: boolean): void;
  /** Take it down: its listeners, its worker, its GPU resources and its DOM. */
  dispose(): void;
}

const STYLE = `
.chart-view { position: absolute; inset: 0; overflow: hidden; background: #05060e; color: #e8e2f4; font: 14px/1.4 ui-monospace, "SF Mono", Menlo, Consolas, monospace; touch-action: none; --dim: #9a93b4; --panel: rgba(10, 9, 22, .78); --accent: #e8b46a; }
.chart-view canvas { position: absolute; left: 0; top: 0; display: block; image-rendering: pixelated; image-rendering: crisp-edges; cursor: pointer; }
.chart-view .top { position: absolute; left: 0; right: 0; top: 0; padding: max(10px, env(safe-area-inset-top)) 16px 8px; text-align: center; pointer-events: none; background: linear-gradient(#05060ecc, #05060e00); }
.chart-view h1 { margin: 0; font-size: 16px; letter-spacing: .14em; }
.chart-view .status { color: var(--dim); font-size: 12px; min-height: 1.4em; }
.chart-view .bottom { position: absolute; left: 0; right: 0; bottom: 0; padding: 8px 16px max(12px, env(safe-area-inset-bottom)); display: flex; flex-direction: column; align-items: center; gap: 8px; pointer-events: none; }
.chart-view .bottom > * { pointer-events: auto; }
.chart-view .card { background: var(--panel); border: 1px solid #3a2f5c; border-radius: 8px; padding: 8px 14px; min-width: min(320px, 100%); max-width: 100%; box-sizing: border-box; text-align: center; }
.chart-view .name { font-size: 16px; font-weight: bold; }
.chart-view .phase, .chart-view .state { color: var(--dim); font-size: 12px; }
.chart-view .bar { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.chart-view button, .chart-view a.btn { font: inherit; font-size: 13px; color: #e8e2f4; background: var(--panel); border: 1px solid #3a2f5c; border-radius: 6px; padding: 8px 14px; min-height: 36px; box-sizing: border-box; cursor: pointer; text-decoration: none; }
.chart-view button:hover, .chart-view a.btn:hover, .chart-view button:focus-visible, .chart-view a.btn:focus-visible { border-color: var(--accent); outline: none; }
.chart-view a.btn.sail { border-color: var(--accent); color: var(--accent); margin-top: 6px; display: inline-block; }
.chart-view [hidden] { display: none !important; }
.chart-view .hint, .chart-view .world { color: var(--dim); font-size: 11px; text-align: center; }
.chart-view .new-world { align-items: center; background: var(--panel); border: 1px solid #3a2f5c; border-radius: 8px; padding: 8px 10px; }
.chart-view .new-seed { font: inherit; font-size: 13px; color: #e8e2f4; background: #14112a; border: 1px solid #3a2f5c; border-radius: 6px; padding: 8px; width: 14em; max-width: 50vw; }`;

const HTML = `
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="start-over">Start over</button><button class="close">Close</button></div>
  <div class="new-world bar" hidden><label>New world's seed <input class="new-seed" placeholder="blank: a random one" autocomplete="off"></label><button class="new-go">Start</button><button class="new-cancel">Cancel</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;

/** The outlines' land sampled every so many metres: the chart's pixels are far coarser. */
const OUTLINE_STEP = 32;

/** Mount the sea chart in `host` (which it fills: give it a size and a position). */
export function mountChart(host: HTMLElement, opts: ChartViewOptions): ChartView {
  const mode = opts.mode, mini = mode === "miniature", sailing = mode === "sail";
  if (!document.getElementById("chart-view-style")) { const st = document.createElement("style"); st.id = "chart-view-style"; st.textContent = STYLE; document.head.append(st); }
  const root = document.createElement("div");
  root.className = "chart-view"; root.innerHTML = HTML; host.append(root);
  const $ = <T extends HTMLElement = HTMLElement>(c: string) => root.querySelector(`.${c}`) as T;
  const canvas = root.querySelector("canvas")!;
  if (mini) { $("top").hidden = true; $("bottom").hidden = true; }
  $("sail").hidden = true;
  ($("home") as HTMLElement).hidden = !sailing; $("start-over").hidden = !sailing; $("close").hidden = !opts.onClose;
  $("hint").textContent = sailing
    ? "Tap an island to look at it, again to sail · arrows / stick to choose, Enter / A to sail · sigils: islands you can sail to · gold rings: won"
    : "Tap an island to look at it · arrows / stick to choose · sigils: islands you can sail to · gold rings: won";

  const chart = new SeaChart(canvas, TUNING as unknown as ConstructorParameters<typeof SeaChart>[1]);
  if (mini) chart.orbit = 0.12;
  let save = opts.save ?? loadSave(), islands: ChartIsland[] = [];
  const worldNow = () => opts.world ?? save.world;
  const sailHref = (island: string) => `./?island=${island}${opts.world != null ? `&world=${worldNow()}` : ""}`;
  const sailTo = (id: string | null) => {
    const isl = islands.find(i => i.id === id);
    if (!sailing || !isl?.sail) return;
    if (opts.onSail) opts.onSail(id!); else location.href = sailHref(id!);
  };

  // The real outlines, made in a worker (seconds each for the big islands, about a minute for them all): the chosen island and
  // those nearest it first, each swapped in as it comes; the page never waits on them.
  let worker: Worker | null = null;
  function outlines(): void {
    if (!worker) {
      try { worker = new Worker(new URL("./chartOutlines.worker.ts", import.meta.url), { type: "module" }); } catch { return; }
      worker.onmessage = (e: MessageEvent<OutlineDone>) => {
        const o = e.data, isl = islands.find(i => i.id === o.id);
        if (!isl || o.world !== worldNow()) return;
        if ((isl.outline as OutlineDone | undefined)?.detail && !o.detail) return; // (the close-up's fine grid stays)
        isl.outline = o; chart.reshape(o.id, o);
      };
    }
    const from = islands.find(i => i.id === (chart.selected ?? save.voyages.at(-1)?.to ?? "home")) ?? islands[0];
    const ids = [...islands].sort((a, b) => Math.hypot(a.x - from.x, a.y - from.y) - Math.hypot(b.x - from.x, b.y - from.y)).map(i => i.id);
    worker.postMessage({ world: worldNow(), found: [...save.found], ids, step: OUTLINE_STEP } satisfies OutlineAsk);
  }

  /** Every island, always: home and each found with its sigil, sailable; the rest bare land, the placeholders dimmest. */
  function build(): void {
    const open = new Set(unlocked(save)), won = new Set(save.won), w = worldNow();
    const one = (id: string, radii: ArrayLike<number>, sigil: string): ChartIsland => {
      const at = islandAt(id, w)!, unknown = isPlaceholder(id);
      return { id, x: at.x, y: at.y, phase: id === "home" ? 0 : islandOf(id, w)?.phase ?? 1, radii, sail: open.has(id) && !unknown, unknown, won: won.has(id), sigil };
    };
    islands = [one("home", islandCoast(coastSpec(homeIsland(w, knownKinds(save.found))), TUNING.map?.coast).radii, islandSigil("home"))];
    for (const k of KIND_NAMES) islands.push(one(k, islandCoast(coastSpec(islandOf(k, w)!), TUNING.islands?.coast).radii, k));
    chart.set(islands, save.voyages);
    outlines();
    const n = save.found.filter(k => !isPlaceholder(k)).length;
    $("status").textContent = `${n ? `${n} of ${REAL_KINDS.length} islands found${opts.countUncharted ? ` (and ${KIND_NAMES.length - REAL_KINDS.length} not yet charted)` : ""}` : "wake legends at home to find their islands"}${save.won.length ? ` · ${save.won.length} won` : ""}${opts.note ? ` · ${opts.note}` : ""}`;
    $("world").textContent = `World seed: ${w}${opts.world != null && opts.world !== save.world ? " (from the link)" : ""}`;
    ($("home") as HTMLAnchorElement).href = sailHref("home");
  }

  /** The chosen island's card: its name, phase and how it stands; the Sail button if she can go. */
  function choose(id: string | null, instant = false): void {
    chart.select(id, instant);
    if (id && worker && !islands.find(i => i.id === id)?.outline) worker.postMessage({ first: id } satisfies OutlineAsk);
    // and its fine grid for the close zoom, made next (only the chosen island's: about 0.5 to 2 s)
    if (id && worker && !mini && !(islands.find(i => i.id === id)?.outline as OutlineDone | undefined)?.detail) worker.postMessage({ detail: id } satisfies OutlineAsk);
    const isl = islands.find(i => i.id === id), card = $("card"), sail = $<HTMLAnchorElement>("sail");
    if (!isl || mini) { card.hidden = true; return; }
    card.hidden = false;
    const phase = id === "home" ? 0 : islandOf(id!, worldNow())?.phase ?? 0;
    $("name").textContent = id === "home" ? "Home" : isl.unknown ? "Uncharted waters" : isl.sail ? `The ${id}'s island` : "An island not yet found";
    $("phase").textContent = id === "home" ? "the Ent's island, the middle of the world" : `phase ${phase}`;
    $("state").textContent = isl.unknown ? "not yet charted" : isl.won ? "won" : isl.sail ? (save.played.includes(id!) ? "played, not yet won" : "found: you can sail there") : "wake its legend to find it";
    sail.hidden = !sailing || !isl.sail;
    sail.href = sailHref(id!);
  }
  $("sail").addEventListener("click", e => { if (opts.onSail) { e.preventDefault(); sailTo(chart.selected); } });
  $("home").addEventListener("click", e => { if (opts.onSail) { e.preventDefault(); opts.onSail("home"); } });
  $("close").addEventListener("click", () => opts.onClose?.());

  // Pointer: tap or click an island to choose it, again to sail; the wheel or a pinch zooms. (Not the miniature: it's a model.)
  const pointers = new Map<number, { x: number; y: number }>();
  let pinch = 0, downAt: { x: number; y: number } | null = null;
  if (!mini) {
    canvas.addEventListener("pointerdown", e => { pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); downAt = { x: e.clientX, y: e.clientY }; if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); } });
    canvas.addEventListener("pointermove", e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) { const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch > 0 && d > 0) chart.zoom(pinch / d); pinch = d; downAt = null; }
    });
    canvas.addEventListener("pointerup", e => {
      const tap = pointers.size === 1 && downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) < 8;
      pointers.delete(e.pointerId); if (pointers.size < 2) pinch = 0;
      if (!tap) return;
      const id = chart.pick(e.clientX, e.clientY);
      if (id && id === chart.selected) sailTo(id); else if (id) choose(id);
    });
    canvas.addEventListener("pointercancel", e => { pointers.delete(e.pointerId); pinch = 0; });
    canvas.addEventListener("wheel", e => { e.preventDefault(); chart.zoom(Math.exp(e.deltaY * 0.0015)); }, { passive: false });
    $("zoom-in").addEventListener("click", () => chart.zoom(0.75));
    $("zoom-out").addEventListener("click", () => chart.zoom(1.33));
  }

  // Keys: the arrows step island to island, Enter or Space sails, + and - zoom, Esc closes.
  const step = (dx: number, dy: number) => { const next = stepTo(islands, chart.selected ?? "home", dx, dy); if (next) choose(next); };
  const onKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement)?.closest?.("input")) return; // (typing a seed)
    if ((e.target as HTMLElement)?.closest?.("button, a") && (e.key === "Enter" || e.key === " ")) return; // (a focused button's own)
    const dir: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
    if (dir[e.key]) { e.preventDefault(); step(...dir[e.key]); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sailTo(chart.selected); }
    else if (e.key === "+" || e.key === "=") chart.zoom(0.8);
    else if (e.key === "-" || e.key === "_") chart.zoom(1.25);
    else if (e.key === "Escape" && opts.onClose) { e.preventDefault(); opts.onClose(); }
  };
  if (!mini) addEventListener("keydown", onKey);

  // A gamepad: the d-pad or the left stick steps (repeating while held), A sails, B closes, the shoulders zoom.
  let padWait = 0;
  function pad(dt: number): void {
    const p = [...(navigator.getGamepads?.() ?? [])].find(g => g?.connected); if (!p) return;
    padWait -= dt;
    const b = (i: number) => !!p.buttons[i]?.pressed, ax = p.axes[0] ?? 0, ay = p.axes[1] ?? 0;
    const dx = b(15) ? 1 : b(14) ? -1 : Math.abs(ax) > 0.5 ? Math.sign(ax) : 0, dy = b(13) ? 1 : b(12) ? -1 : Math.abs(ay) > 0.5 ? Math.sign(ay) : 0;
    if ((dx || dy) && padWait <= 0) { step(dx, dy); padWait = 0.28; } else if (!dx && !dy) padWait = 0;
    if (b(0) && padWait <= 0) { sailTo(chart.selected); padWait = 0.5; }
    if (b(1) && padWait <= 0 && opts.onClose) { opts.onClose(); padWait = 0.5; }
    if (b(4)) chart.zoom(1 + dt); if (b(5)) chart.zoom(1 - dt * 0.8);
  }

  // Start over (golf, #685; Ed, 2026-10-11): a new campaign in a new world, its seed random or typed / pasted in, after an are-you-sure.
  const panel = $("new-world"), field = $<HTMLInputElement>("new-seed");
  $("start-over").addEventListener("click", () => { field.value = ""; panel.hidden = false; field.focus(); });
  $("new-cancel").addEventListener("click", () => { panel.hidden = true; });
  $("new-go").addEventListener("click", () => {
    if (!confirm("Start over in a new world? This forgets every island you've found and won.")) return;
    save = newCampaign(worldSeed(field.value));
    panel.hidden = true;
    if (opts.world != null || opts.save) location.search = ""; else { build(); choose("home"); }
  });

  const resize = (cssW?: number, cssH?: number) => {
    if (mini && opts.size) { const p = CHART_PIXEL; chart.resize(opts.size.w * p, opts.size.h * p); return; }
    chart.resize(cssW ?? (root.clientWidth || host.clientWidth || innerWidth), cssH ?? (root.clientHeight || host.clientHeight || innerHeight));
  };
  resize(); build();
  choose(opts.start ?? save.voyages.at(-1)?.to ?? "home", true);

  return {
    canvas, chart,
    islands: () => islands,
    update(dt, time) { if (!mini) pad(dt); chart.frame(dt, time); },
    resize, choose,
    dispose() {
      removeEventListener("keydown", onKey);
      worker?.terminate(); worker = null;
      chart.dispose();
      root.remove();
    },
  };
}
