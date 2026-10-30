// The sea chart as a view to mount anywhere (Echo, 2026-10-11: the treehouse's map table, "the world map is in the centre"; and
// chart.html, chartPage.ts): the world as a disc of night sea in 3D, drawn as the game is (render/chart/seaChart.ts; Ed,
// 2026-10-11: "show the map screen in the same way you show the island: pixellated, camera seeing it in 3D, your view moves
// around as you select islands"): home in the middle, every island at its kind's bearing on its phase's ring (chartLayout.ts
// islandAt) in its real outline (hotel, rules/islandShape.ts islandOutline: the land each grows to; made off the page's thread by
// chartOutlines.worker.ts, in phase order and the nearest the chosen first within a phase, its round coast, islandCoast, shown till it comes), a sigil only on
// those she can travel to (Ed: "You can always see all the islands - you only see sigils on the ones that you can travel to"),
// big enough to read (Ed: "large enough that the animal sigils show clearly on the islands"); her voyages as glowing lines on
// the water; won islands ringed in gold.
//   Choose an island (tap or click it; arrow keys, the d-pad or the stick) and the camera glides to it and names it. Three modes:
// "sail" (between nights): choose it again, press Enter or the pad's A, or the Sail button, to sail there (Start over is gone:
// Ed, 2026-10-23); at a table (the Atrium's map table: `table`), the aiming keys choose and the use button sails; over a night, the island she's on is "Back to the party" (or the afterparty): choosing it closes
// the chart and the night goes on as it was, never a new one (Ed, 2026-10-21; app/sail.ts chartChoice). "look" (mid-night): the same, but no sailing. "miniature" (the map table's
// model): no card, no buttons, no keys, the camera slowly circling. The save and what's unlocked are chartSave.ts's: this is
// the view. Its own canvas and renderer, inside `host`; the caller's loop calls update() (no requestAnimationFrame of its own).
import { islandCoast } from "../rules/islandShape";
import { coastSpec, homeIsland, isPlaceholder, islandOf, KIND_NAMES, knownKinds, REAL_KINDS } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import { islandSigil } from "../../art/sigils.js";
import { CHART_PIXEL, releaseSeaChart, SeaChart, takeSeaChart, type ChartIsland, type FlightEnd, type FlyOptions } from "../render/chart/seaChart";
import { loadSave, unlocked, unvisited, type ChartSave } from "./chartSave";
import { unlockAll } from "./debugUnlock";
import { ChartPin } from "../render/chart/chartPin";
import { islandAt } from "./chartLayout";
import { stepTo } from "./chartNav";
import type { OutlineAsk, OutlineDone } from "./chartOutlines.worker";
import { writeArrival } from "./arrival";
import { chartOrder, islandPhase, OUTLINE_STEP } from "./chartWarm";
import { chartChoice, chartOpensOn, type ChartHere } from "./sail";
import { bindings, type ActionId } from "../platform/bindings";
import { chartHint, type HintDevice } from "../ui/deviceHints";

export type ChartMode = "look" | "sail" | "miniature";
/** Where the chart's flight hands over to the game's dive (the tuning's arrive.handoff; Ed, 2026-10-24: "maybe it comes from further
 *  away across the sea?"), or one of the variants by name for one load, ?dive=near|far|skim: near, the first flight's (just inland
 *  of the south coast, high); far, a long way out to sea, the dive coming in across the water; skim, as far and low over it. */
export const DIVES: Record<string, FlyOptions> = { near: { sea: -40, dist: 600, pitchDeg: 50 }, far: { sea: 420, dist: 520, pitchDeg: 38 }, skim: { sea: 520, dist: 360, pitchDeg: 24 } };
const diveOptions = (): FlyOptions => {
  const named = typeof location === "undefined" ? null : new URLSearchParams(location.search).get("dive");
  return (named && DIVES[named]) || TUNING.arrive?.handoff || {};
};
/** The testing toggle's key (this browser): sail to any island with a creature. */
const SAIL_ANY = "witch.chart.sailAnywhere";
export interface ChartViewOptions {
  mode: ChartMode;
  /** What she's found, won and sailed (default: loadSave()). */
  save?: ChartSave;
  /** The world to show, if not the save's own (a shared link's ?world=): sailing carries it on (&world=). */
  world?: number;
  /** Sail mode: sail to an island, once the chart has flown in to it (default: to ?island=<kind>&arrive=1, with &world= when
   *  `world` is given). The flight's end is in sessionStorage for the game to carry on from (app/arrival.ts), and given here
   *  too (`end`, none if the chart couldn't fly) for a night started in place (app/sail.ts). */
  onSail?: (island: string, seed: number, end?: FlightEnd) => void;
  /** Sail mode: the flight in to the island has begun (the chart over the game fills the screen for it). */
  onFly?: () => void;
  /** Sail mode, a sail in place (Ed, 2026-10-24, the sail's transition: "Never a frozen frame"): the next night made under the chart
   *  as it flies, from the moment the island is chosen, with the night's seed and where the flight will hand over (`at`, for its
   *  first frames to be drawn there ahead); resolves once it's ready for the dive. The flight slows to wait for it (seaChart.ts
   *  FlyOptions, the tuning's arrive.hold), then `onSail` as ever. */
  onDepart?: (island: string, seed: number, at: FlightEnd["cam"] | null) => Promise<void>;
  /** Look and sail modes: a Close button and Esc. */
  onClose?: () => void;
  /** Sail mode over a night (the map table's, the cards'): the island she's on, and its button's words ("Back to the party"):
   *  choosing it never sails (app/sail.ts chartChoice), but asks `onStay` (default onClose). */
  here?: ChartHere;
  /** The island she's on chosen: back to the night as it was. */
  onStay?: () => void;
  /** Miniature: its render size in art pixels (default: the host's size). */
  size?: { w: number; h: number };
  /** A note after the status line (chart.html's "showing everything"). */
  note?: string;
  /** The island chosen first (default: the one she was last on, her last voyage's end, else home). */
  start?: string;
  /** Count the uncharted placeholders in the status line (chart.html's ?chart=all). */
  countUncharted?: boolean;
  /** Buttons in the top right corner (the first load's chart: What's new, Options and the zoo; app/opening.ts). */
  corner?: { label: string; title?: string; onClick: () => void }[];
  /** Sail mode at a table (Ed, 2026-10-23: the Atrium's map table, its chart sliding up by nearness, ui/chartOverlay.ts): the
   *  movement keys choose too (she stands still at it: Ed, 2026-10-26, "walking away shouldn't work - then we can use the movement
   *  keys as buttons in the menus"), as the aiming keys (the arrows, WASD, the d-pad, either stick, the mouse); Space or Enter (the
   *  pad's cross) held sails; the use button (E, the pad's square) or the pad's circle puts it away (`onLeave`; Esc pauses over it, platform/freeze.ts taking it first), as E brought
   *  it up (Ed, 2026-10-26: "E should also close, and we can have spacebar to select"). No
   *  title, Sail home or zoom buttons (the wheel and the shoulders zoom); the testing toggle in the top right; the island she's on
   *  says so, with no button (going to bed starts the next night there). */
  table?: { onLeave: () => void };
  /** Islands not to draw or map ahead (app/landingBake.ts, app/mapPrep.ts): the first load's home, whose night is already made under the chart (app/opening.ts divesHome), the work would be thrown away and its workers would starve the night's own art. */
  noBake?: (island: string) => boolean;
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
.chart-view.flying .top, .chart-view.flying .bottom { visibility: hidden; }
.chart-view .card { background: var(--panel); border: 1px solid #3a2f5c; border-radius: 8px; padding: 8px 14px; min-width: min(320px, 100%); max-width: 100%; box-sizing: border-box; text-align: center; }
.chart-view .name { font-size: 16px; font-weight: bold; }
.chart-view .phase, .chart-view .state { color: var(--dim); font-size: 12px; }
.chart-view .bar { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.chart-view button, .chart-view a.btn { font: inherit; font-size: 13px; color: #e8e2f4; background: var(--panel); border: 1px solid #3a2f5c; border-radius: 6px; padding: 8px 14px; min-height: 36px; box-sizing: border-box; cursor: pointer; text-decoration: none; }
.chart-view .sail-any { border-style: dashed; color: var(--dim); }
.chart-view .sail-any[aria-pressed="true"] { color: #e8e2f4; border-color: var(--accent); background: #3a2a14; }
.chart-view button:hover, .chart-view a.btn:hover, .chart-view button:focus-visible, .chart-view a.btn:focus-visible { border-color: var(--accent); outline: none; }
.chart-view a.btn.sail { border-color: var(--accent); color: var(--accent); margin-top: 6px; display: inline-block; }
.chart-view [hidden] { display: none !important; }
.chart-view .hint, .chart-view .world { color: var(--dim); font-size: 11px; text-align: center; }
.chart-view .hold-ring { position: absolute; width: 58px; height: 58px; margin: -29px 0 0 -29px; border-radius: 50%; pointer-events: none; z-index: 3; box-shadow: 0 0 0 3px rgba(20,14,32,.7) inset; -webkit-mask: radial-gradient(circle, transparent 21px, #000 22px); mask: radial-gradient(circle, transparent 21px, #000 22px); }
.chart-view .corner { position: absolute; right: 12px; top: max(10px, env(safe-area-inset-top)); display: flex; gap: 8px; z-index: 2; }
`;

const HTML = `
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="corner"></div>
<div class="hold-ring" hidden></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="sail-any" aria-pressed="false" title="Testing: sail to any island with a creature, found or not (the save isn't changed)">🧪 Test: sail anywhere</button><button class="close">Close</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;


/** Mount the sea chart in `host` (which it fills: give it a size and a position). */
/** The islands the chart's 🧭s point at, one each: the new ones (ChartIsland fresh), nearest `from` (the island she's on) first. */
export function chartPinIslands(islands: readonly ChartIsland[], from: string): string[] {
  const o = islands.find(i => i.id === from) ?? { x: 0, y: 0 };
  return islands.filter(i => i.fresh).sort((a, b) => Math.hypot(a.x - o.x, a.y - o.y) - Math.hypot(b.x - o.x, b.y - o.y)).map(i => i.id);
}

export function mountChart(host: HTMLElement, opts: ChartViewOptions): ChartView {
  const mode = opts.mode, mini = mode === "miniature", sailing = mode === "sail";
  if (!document.getElementById("chart-view-style")) { const st = document.createElement("style"); st.id = "chart-view-style"; st.textContent = STYLE; document.head.append(st); }
  const root = document.createElement("div");
  root.className = "chart-view"; root.innerHTML = HTML; host.append(root);
  const $ = <T extends HTMLElement = HTMLElement>(c: string) => root.querySelector(`.${c}`) as T;
  // The full chart draws on the page's one prepared SeaChart (render/chart/seaChart.ts takeSeaChart: no new context or shaders to
  // wait for as it opens); the map table's miniature on its own.
  const chart = mini ? new SeaChart(root.querySelector("canvas")!, TUNING as unknown as ConstructorParameters<typeof SeaChart>[1]) : takeSeaChart(TUNING as unknown as ConstructorParameters<typeof SeaChart>[1]);
  const canvas = chart.canvas;
  if (!mini) { canvas.setAttribute("aria-label", "The sea chart"); root.querySelector("canvas")!.replaceWith(canvas); }
  const listening = new AbortController(), on = { signal: listening.signal }; // (the canvas outlives this view: its listeners go with it)
  if (mini) { $("top").hidden = true; $("bottom").hidden = true; }
  for (const b of opts.corner ?? []) { const el = document.createElement("button"); el.textContent = b.label; if (b.title) el.title = b.title; el.addEventListener("click", () => b.onClick(), on); $("corner").append(el); }
  $("sail").hidden = true;
  const table = sailing ? opts.table : undefined;
  let left = false; // (at a table, put away: it slides off and takes no more input meanwhile)
  const leave = () => { if (left) return; left = true; holdEnd(); table!.onLeave(); };
  // Sailing from a table is a hold (Ed, 2026-10-23: "You have to hold the button to select a new island to sail to (ring
  // fills)"): Space or Enter (the pad's cross) or the mouse held on an island, its ring filling (the bed's,
  // render/houseRooms.ts) over the tuning's chart.sailHold seconds; let go early and nothing happens. A click only chooses.
  const HOLD_S = (TUNING as unknown as { chart?: { sailHold?: number } }).chart?.sailHold ?? 1.2;
  let hold: { id: string; from: number; at: { x: number; y: number } | null; by: "pointer" | "key" | "pad" } | null = null;
  const sailable = (id: string | null) => !!id && !isHere(id) && !!islands.find(i => i.id === id)?.sail;
  const holdStart = (id: string | null, by: "pointer" | "key" | "pad", at: { x: number; y: number } | null = null) => {
    if (!table || left || hold || !sailable(id) || chart.flying) return;
    hold = { id: id!, from: performance.now(), at, by };
  };
  function holdEnd(by?: "pointer" | "key" | "pad"): void { if (hold && (!by || hold.by === by)) { hold = null; $("hold-ring").hidden = true; } }
  function holdFrame(): void {
    if (!hold) return;
    if (hold.id !== chart.selected) { holdEnd(); return; } // (chosen another meanwhile: start again)
    const f = Math.min(1, (performance.now() - hold.from) / 1000 / Math.max(0.05, HOLD_S)), ring = $("hold-ring"), r = root.getBoundingClientRect();
    const at = hold.at ?? chart.screenOf(hold.id) ?? { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    ring.hidden = false; ring.style.left = `${at.x - r.left}px`; ring.style.top = `${at.y - r.top}px`;
    ring.style.background = `conic-gradient(rgba(255,214,140,.95) ${f * 360}deg, rgba(20,14,32,.6) 0deg)`;
    if (f >= 1) { const id = hold.id; holdEnd(); sailTo(id); }
  }
  ($("home") as HTMLElement).hidden = !sailing || !!table; $("sail-any").hidden = !sailing; $("close").hidden = !opts.onClose || !!table;
  if (table) { root.classList.add("table"); $("top").hidden = true; $("world").hidden = true; $("zoom-in").hidden = true; $("zoom-out").hidden = true; $("corner").append($("sail-any")); }
  let hintDevice: HintDevice = "keys";
  const hint = $("hint");
  const showHint = () => { const text = chartHint(hintDevice, !!table, sailing); if (hint.textContent !== text) hint.textContent = text; };
  const useDevice = (device: HintDevice) => { hintDevice = device; showHint(); };
  showHint();
  root.addEventListener("pointerdown", e => useDevice(e.pointerType === "touch" ? "touch" : "keys"), on);
  root.addEventListener("pointermove", e => { if (e.pointerType === "mouse") useDevice("keys"); }, on);

  if (mini) chart.orbit = 0.12;
  let save = opts.save ?? loadSave(), islands: ChartIsland[] = [];
  // A 🧭 over each island she's found and not been to (Ed, 2026-10-26: "you see one per unvisited island"; render/chart/chartPin.ts),
  // till she's been there. Not on the map table's miniature.
  const pins = new Map<string, ChartPin>();
  let sailAny = (() => { try { return localStorage.getItem(SAIL_ANY) === "1"; } catch { return false; } })();
  const worldNow = () => opts.world ?? save.world;
  /** The island she's on (in the world shown): choosing it takes her back to the night, not a new one. */
  const isHere = (id: string | null) => !!id && chartChoice(opts.here, id, worldNow()) === "stay";
  const sailHref = (island: string) => `./?island=${island}${opts.world != null ? `&world=${worldNow()}` : ""}`;
  // Sailing: the chart flies in to the island (Ed, 2026-10-12: "you zoom into the map into the island you chose"), then sails,
  // its flight's end kept for the game to carry on from (app/arrival.ts); any key or tap skips to the end.
  // The night's seed is chosen as the island is (app/landingBake.ts): its area types drawn ahead while she looks and flies in.
  // And its map (Ed, 2026-10-19, option 4: app/mapPrep.ts): made in a worker with that seed while she flies, for the page to take.
  let bake: { island: string; job: Promise<import("./landingBake").LandingBake | null>; map: Promise<{ done: Promise<unknown>; stop(): void } | null> } | null = null;
  // (the transition review, 2026-10-19: it starts as the chart opens, for the island she's likeliest to sail to, and follows what she
  // chooses; each island keeps its night's seed for the chart's whole visit, so what was drawn for it before a change of mind is
  // still hers when she comes back to it)
  const seeds = new Map<string, number>();
  const dive = diveOptions(); // (where its flights hand over: the tuning's, or ?dive='s)
  const seedOf = (id: string) => { let s = seeds.get(id); if (s === undefined) { s = Math.floor(Math.random() * 1000000); seeds.set(id, s); } return s; };
  const bakeFor = (id: string | null) => {
    if (!sailing || mini || bake?.island === id) return;
    void bake?.job.then(b => b?.stop());
    void bake?.map.then(m => m?.stop());
    if (!id || !islands.find(i => i.id === id)?.sail || opts.noBake?.(id) || isHere(id)) { bake = null; return; } // (the island she's on: never sailed to from here)
    const job = import("./landingBake").then(m => m.bakeLanding(id, opts.world, seedOf(id))).catch(() => null);
    bake = { island: id, job, map: job.then(b => (b ? import("./mapPrep").then(m => m.startMapPrep(id, opts.world, b.seed)) : null)).catch(() => null) };
  };
  /** Where she'll likely sail: her last voyage's island, else the nearest she's found, else home (her first game). */
  const likely = (): string => {
    const last = save.voyages.at(-1)?.to, can = (id: string | undefined) => !!id && !!islands.find(i => i.id === id)?.sail;
    if (can(last)) return last!;
    const home = islands.find(i => i.id === "home"), found = islands.filter(i => i.id !== "home" && save.found.includes(i.id) && i.sail);
    found.sort((a, b) => Math.hypot(a.x - (home?.x ?? 0), a.y - (home?.y ?? 0)) - Math.hypot(b.x - (home?.x ?? 0), b.y - (home?.y ?? 0)));
    return found[0]?.id ?? "home";
  };
  // The night made under the chart as it flies (onDepart): the island and seed it's for, and whether it's ready for the dive.
  let departed: { island: string; seed: number; ready: boolean } | null = null;
  const depart = async (id: string) => {
    const b = bake?.island === id ? await bake.job : null, seed = b?.seed ?? seedOf(id);
    await b?.settle();
    const m = bake?.island === id ? await bake.map : null; // (its map, made in a worker: the night takes it, as go's does)
    if (m) await Promise.race([m.done, new Promise(res => setTimeout(res, 8000))]);
    const d: NonNullable<typeof departed> = departed = { island: id, seed, ready: false };
    performance.mark("chart:depart");
    try { await opts.onDepart!(id, seed, chart.flightEnd(id, dive)); } finally { d.ready = true; performance.mark("chart:ready"); }
  };
  const go = async (id: string, end?: FlightEnd) => {
    performance.mark("chart:flown");
    if (departed?.island === id) { performance.mark("chart:go"); opts.onSail?.(id, departed.seed, end); return; } // (made already, under the flight)
    const b = bake?.island === id ? await bake.job : null, seed = b?.seed ?? seedOf(id);
    await b?.settle(); // (what's drawn, written before the page goes)
    // (its map, if it's still being made: the page would only make it again, on its main thread; never more than 8 s)
    const m = bake?.island === id ? await bake.map : null;
    if (m) await Promise.race([m.done, new Promise(res => setTimeout(res, 8000))]);
    performance.mark("chart:go"); // (?timing=1: main.ts carries this page's steps to the next as it sails, app/timing.ts)
    if (opts.onSail) opts.onSail(id, seed, end); else location.href = `${sailHref(id)}&seed=${seed}&arrive=1`;
  };
  const sailTo = (id: string | null) => {
    const isl = islands.find(i => i.id === id);
    if (!sailing || chart.flying) return;
    if (isHere(id)) { if (!table) (opts.onStay ?? opts.onClose)?.(); return; } // (no flight, no sail: the night as it was; found or not, she's there)
    if (!isl?.sail) return;
    const w = worldNow();
    performance.mark("chart:sail");
    bakeFor(id); // (sailing straight there: drawn through the flight)
    const early = !!opts.onDepart && !!opts.onSail && chart.flightEnd(id!, dive) !== null;
    const hold = early ? { hold: () => departed?.island !== id || !departed.ready, slow: TUNING.arrive?.hold } : {};
    if (!chart.fly(id!, end => { writeArrival(id!, w, end); void go(id!, end); }, { ...dive, ...hold })) { void go(id!); return; }
    if (early) void depart(id!);
    root.classList.add("flying");
    opts.onFly?.();
    requestAnimationFrame(() => resize());
  };

  // The real islands (seconds each for the big ones to make, about a minute for them all; their meshes made with them,
  // render/chart/islandMesh.ts, so the page only wraps what comes): the worker sends those this browser keeps (app/chartCache.ts:
  // made ahead in the night, app/chartWarm.ts, or on an earlier visit) straight away, by phase, earliest first, and within a
  // phase the chosen island and those nearest it first (Ed, 2026-10-19), then makes the rest, each rising out of the sea as it comes (nothing stands in for one till then: Ed, 2026-10-13). The
  // map table's miniature asks only for what's kept (nothing is ever made while she's at the deck) and asks again every few
  // seconds while any is missing, as the night's warm fills the cache.
  // What comes is held (`waiting`) and wrapped on the page one island a frame, the one she needs most first (rank: chartOrder), so
  // the chart moves smoothly as they rise (the chart meshes job, 2026-10-19: a warm open had all 65 wrapped back to back, a frame
  // of 20 s and more on a software renderer).
  let worker: Worker | null = null, poll: ReturnType<typeof setInterval> | null = null;
  const waiting = new Map<string, OutlineDone>();
  let rank = new Map<string, number>();
  const ranked = () => { const from = islands.find(i => i.id === (chart.selected ?? "home")) ?? islands[0]; rank = new Map(chartOrder(islands, from ?? { x: 0, y: 0 }).map((id, n) => [id, n])); };
  const apply = (o: OutlineDone) => {
    const isl = islands.find(i => i.id === o.id);
    if (!isl || o.world !== worldNow()) return;
    if (((waiting.get(o.id) ?? isl.outline) as OutlineDone | undefined)?.detail && !o.detail) return; // (the close-up's fine grid stays)
    waiting.set(o.id, o);
  };
  /** This frame's island: the waiting one ranked first (the chosen island's close-up before anything), wrapped. */
  function wrapOne(): void {
    if (!waiting.size) return;
    let best: OutlineDone | null = null, bestN = Infinity;
    for (const o of waiting.values()) { const n = o.id === chart.selected && o.detail ? -1 : rank.get(o.id) ?? 1e9; if (n < bestN) { bestN = n; best = o; } }
    waiting.delete(best!.id);
    const isl = islands.find(i => i.id === best!.id);
    if (!isl || best!.world !== worldNow()) return;
    isl.outline = best!; chart.reshape(best!.id, best!);
    { const n = islands.filter(i => i.outline).length; if (n === 1) performance.mark("chart:island1"); if (n === islands.length) performance.mark("chart:islands"); } // (app/timing.ts)
  }
  const make = (): Worker | null => {
    if (!worker) {
      try { worker = new Worker(new URL("./chartOutlines.worker.ts", import.meta.url), { type: "module" }); } catch { return null; }
      worker.onmessage = (e: MessageEvent<OutlineDone>) => apply(e.data);
    }
    return worker;
  };
  /** An island's fine grid for the close zoom: kept, or made (the worker given the world first if it's new). */
  function detail(id: string): void {
    const fresh = !worker, wk = make();
    if (fresh) wk?.postMessage({ world: worldNow(), found: [...save.found], ids: [], step: OUTLINE_STEP } satisfies OutlineAsk);
    wk?.postMessage({ detail: id } satisfies OutlineAsk);
  }
  function outlines(): void {
    const w = worldNow(), found = [...save.found];
    const from = islands.find(i => i.id === (chart.selected ?? save.voyages.at(-1)?.to ?? "home")) ?? islands[0];
    const ids = chartOrder(islands.filter(i => !i.outline && !waiting.has(i.id)), from); // (home and hers first, then by phase, earliest first, the nearest the chosen first within one: Ed, 2026-10-19)
    if (!ids.length) { if (poll) { clearInterval(poll); poll = null; } return; }
    make()?.postMessage({ world: w, found, ids, step: OUTLINE_STEP, cacheOnly: mini } satisfies OutlineAsk);
    if (mini && !poll) poll = setInterval(outlines, 4000);
  }

  /** Every island, always: home and each found with its sigil, sailable; the rest bare land, the placeholders dimmest. */
  function build(): void {
    const open = new Set(sailAny || unlockAll() ? ["home", ...REAL_KINDS] : unlocked(save)) /* (or the pause page's Unlock everything: app/debugUnlock.ts) */, won = new Set(save.won), w = worldNow(), fresh = new Set(unvisited(save, opts.here?.island));
    const one = (id: string, radii: ArrayLike<number>, sigil: string): ChartIsland => {
      const at = islandAt(id, w)!, unknown = isPlaceholder(id);
      return { id, x: at.x, y: at.y, phase: islandPhase(id, w), radii, sail: open.has(id) && !unknown, unknown, won: won.has(id), fresh: open.has(id) && !unknown && fresh.has(id), sigil };
    };
    islands = [one("home", islandCoast(coastSpec(homeIsland(w, knownKinds(save.found))), TUNING.map?.coast).radii, islandSigil("home"))];
    for (const k of KIND_NAMES) islands.push(one(k, islandCoast(coastSpec(islandOf(k, w)!), TUNING.islands?.coast).radii, k));
    chart.set(islands, save.voyages);
    for (const p of pins.values()) p.dispose();
    pins.clear();
    if (!mini) for (const id of chartPinIslands(islands, opts.here?.island ?? save.voyages.at(-1)?.to ?? "home")) pins.set(id, new ChartPin(root));
    waiting.clear(); ranked();
    outlines();
    const n = save.found.filter(k => !isPlaceholder(k)).length;
    $("status").textContent = `${n ? `${n} of ${REAL_KINDS.length} islands found${opts.countUncharted ? ` (and ${KIND_NAMES.length - REAL_KINDS.length} not yet charted)` : ""}` : "do a legend's quest and win the night to find its island"}${save.won.length ? ` · ${save.won.length} won` : ""}${opts.note ? ` · ${opts.note}` : ""}`;
    $("world").textContent = `World seed: ${w}${opts.world != null && opts.world !== save.world ? " (from the link)" : ""}`;
    ($("home") as HTMLAnchorElement).href = sailHref("home");
    $("home").textContent = isHere("home") ? opts.here!.label : "Sail home";
  }

  /** The chosen island's card: its name, phase and how it stands; the Sail button if she can go. */
  function choose(id: string | null, instant = false, aim = true): void {
    chart.select(id, instant); ranked();
    if (aim) bakeFor(id); // (her choice: drawn ahead; the chart's own first selection isn't hers, likely() is)
    if (id && worker && !islands.find(i => i.id === id)?.outline && !waiting.has(id)) worker.postMessage({ first: id } satisfies OutlineAsk);
    // and its fine grid for the close zoom, made next (only the chosen island's: about 0.5 to 2 s)
    if (id && !mini && !((waiting.get(id) ?? islands.find(i => i.id === id)?.outline) as OutlineDone | undefined)?.detail) detail(id);
    const isl = islands.find(i => i.id === id), card = $("card"), sail = $<HTMLAnchorElement>("sail");
    if (!isl || mini) { card.hidden = true; return; }
    card.hidden = false;
    const phase = id === "home" ? 0 : islandOf(id!, worldNow())?.phase ?? 0;
    $("name").textContent = id === "home" ? "Home" : isl.unknown ? "Uncharted waters" : isl.sail ? `The ${id}'s island` : "An island not yet found";
    $("phase").textContent = id === "home" ? "the Ent's island, the middle of the world" : `phase ${phase}`;
    $("state").textContent = (isHere(id) ? "you're here · " : "") + (isl.unknown ? "not yet charted" : isl.won ? "won" : isl.sail ? (id !== "home" && !save.found.includes(id!) ? "not found yet: 🧪 testing, you can sail there" : save.played.includes(id!) ? "played, not yet won" : "found: you can sail there") : "do its legend's quest in a night you win to find it");
    sail.hidden = !sailing || !(isl.sail || isHere(id)) || (!!table && isHere(id)); // (at a table: she's there, nothing to do: the bed starts the next night)
    sail.href = sailHref(id!);
    sail.textContent = isHere(id) ? opts.here!.label : table ? "Hold to sail" : "Sail there";
  }
  $("sail").addEventListener("click", e => { e.preventDefault(); if (!table) sailTo(chart.selected); }); // (at a table it's held: below)
  if (table) { // (its button held, the ring on it, as the use button: touch has no other way)
    const btn = $("sail");
    btn.addEventListener("pointerdown", e => { e.preventDefault(); const r = btn.getBoundingClientRect(); holdStart(chart.selected, "pointer", { x: r.left + r.width / 2, y: r.top + r.height / 2 }); }, on);
    for (const ev of ["pointerup", "pointerleave", "pointercancel"]) btn.addEventListener(ev, () => holdEnd("pointer"), on);
  }
  $("home").addEventListener("click", e => { e.preventDefault(); choose("home", true); sailTo("home"); });
  $("close").addEventListener("click", () => opts.onClose?.());

  // Pointer: tap or click an island to choose it, again to sail; the wheel or a pinch zooms. (Not the miniature: it's a model.)
  const pointers = new Map<number, { x: number; y: number }>();
  let pinch = 0, downAt: { x: number; y: number } | null = null;
  if (!mini) {
    canvas.addEventListener("pointerdown", e => {
      if (table && !left && !chart.flying && e.isPrimary) { const id = chart.pick(e.clientX, e.clientY); if (id) { if (id !== chart.selected) choose(id); holdStart(id, "pointer", { x: e.clientX, y: e.clientY }); } } pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); downAt = { x: e.clientX, y: e.clientY }; if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); } }, on);
    canvas.addEventListener("pointermove", e => {
      if (hold?.by === "pointer" && hold.at && Math.hypot(e.clientX - hold.at.x, e.clientY - hold.at.y) > 12) holdEnd("pointer"); // (a drag, not a hold)
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) { const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch > 0 && d > 0) chart.zoom(pinch / d); pinch = d; downAt = null; }
    }, on);
    canvas.addEventListener("pointerup", e => {
      holdEnd("pointer");
      if (left) return;
      if (chart.flying) { pointers.delete(e.pointerId); chart.skipFlight(); return; }
      const tap = pointers.size === 1 && downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) < 8;
      pointers.delete(e.pointerId); if (pointers.size < 2) pinch = 0;
      if (!tap) return;
      const id = chart.pick(e.clientX, e.clientY);
      if (table) return; // (at a table a click only chooses, on the way down; sailing is the hold)
      if (id && id === chart.selected) sailTo(id); else if (id) choose(id);
    }, on);
    canvas.addEventListener("pointercancel", e => { pointers.delete(e.pointerId); pinch = 0; holdEnd("pointer"); }, on);
    canvas.addEventListener("wheel", e => { e.preventDefault(); chart.zoom(Math.exp(e.deltaY * 0.0015)); }, { passive: false, ...on });
    $("zoom-in").addEventListener("click", () => chart.zoom(0.75));
    $("zoom-out").addEventListener("click", () => chart.zoom(1.33));
  }

  // Keys: the arrows step island to island, Enter or Space sails, + and - zoom, Esc closes.
  const step = (dx: number, dy: number) => { const next = stepTo(islands, chart.selected ?? "home", dx, dy); if (next) choose(next); };
  const onKey = (e: KeyboardEvent) => {
    useDevice("keys");
    if (chart.flying) { e.preventDefault(); chart.skipFlight(); return; } // (any key: on to the end of the flight)
    if ((e.target as HTMLElement)?.closest?.("input")) return; // (typing a seed)
    if ((e.target as HTMLElement)?.closest?.("button, a") && (e.key === "Enter" || e.key === " ")) return; // (a focused button's own)
    const dir: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
    if (left) return;
    if (table && (e.code === "KeyE" || e.key === "Escape")) { e.preventDefault(); if (!e.repeat) leave(); return; } // (E again, or Esc: it's put away; not the E that brought it up, still held)
    if (dir[e.key]) { e.preventDefault(); step(...dir[e.key]); }
    else if (table && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); if (!e.repeat) holdStart(chart.selected, "key"); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sailTo(chart.selected); }
    else if (e.key === "+" || e.key === "=") chart.zoom(0.8);
    else if (e.key === "-" || e.key === "_") chart.zoom(1.25);
    else if (e.key === "Escape" && opts.onClose) { e.preventDefault(); opts.onClose(); }
  };
  if (!mini) addEventListener("keydown", onKey);
  const onKeyUp = (e: KeyboardEvent) => { if (table && (e.key === "Enter" || e.key === " ")) holdEnd("key"); };
  if (table) addEventListener("keyup", onKeyUp);

  // A gamepad, as bound (platform/bindings.ts, Ed's layout 2026-10-28): the menu's directions step (the d-pad or the left stick,
  // repeating while held), choose (cross) sails, back (circle) closes or puts it down, its zoom (the triggers) zooms.
  let padWait = 0, chooseWas = true, padButtons: boolean[] = []; // (choose: held, as the use button that brought the chart up is cross too, till it's let go)
  function pad(dt: number): void {
    const p = [...(navigator.getGamepads?.() ?? [])].find(g => g?.connected); if (!p) return;
    const pressed = p.buttons.map(b => b.pressed);
    if (pressed.some((b, i) => b && !padButtons[i]) || p.axes.some(a => Math.abs(a) > 0.5)) useDevice("pad");
    padButtons = pressed;
    padWait -= dt;
    if (chart.flying) { if (p.buttons.some(x => x.pressed)) chart.skipFlight(); return; }
    if (left) return;
    const buttons = p.buttons.map(x => x.pressed), held = (id: ActionId) => bindings.padHeld(id, buttons, p.axes);
    const dx = held("menu.right") ? 1 : held("menu.left") ? -1 : 0, dy = held("menu.down") ? 1 : held("menu.up") ? -1 : 0;
    if ((dx || dy) && padWait <= 0) { step(dx, dy); padWait = 0.28; } else if (!dx && !dy) padWait = 0;
    const choose = held("menu.choose") && !chooseWas;
    if (!held("menu.choose")) chooseWas = false;
    if (table) { if (held("menu.choose") && !chooseWas) holdStart(chart.selected, "pad"); else holdEnd("pad"); } // (at a table choose held sails, as Space)
    else if (choose && padWait <= 0) { sailTo(chart.selected); padWait = 0.5; }
    if (held("menu.back") && padWait <= 0) { if (table) leave(); else if (opts.onClose) opts.onClose(); padWait = 0.5; }
    if (held("menu.zoomOut")) chart.zoom(1 + dt); if (held("menu.zoomIn")) chart.zoom(1 - dt * 0.8);
  }

  // Testing (Ed, 2026-10-12: "please give a button that lets me go to island even if I haven't unlocked them yet"): every island
  // with a creature sailable, found or not; the '?' islands still not. Only what she can sail to: the save isn't touched (nothing
  // found, no voyages). Kept on this browser (both the chart page and the map table's).
  const showSailAny = () => { const b = $("sail-any"); b.setAttribute("aria-pressed", String(sailAny)); b.textContent = sailAny ? "🧪 Test: sailing anywhere (on)" : "🧪 Test: sail anywhere"; };
  showSailAny();
  $("sail-any").addEventListener("click", () => {
    sailAny = !sailAny; try { localStorage.setItem(SAIL_ANY, sailAny ? "1" : "0"); } catch { /* storage blocked */ }
    showSailAny(); const was = chart.selected; build(); choose(was);
  });


  const resize = (cssW?: number, cssH?: number) => {
    if (mini && opts.size) { const p = CHART_PIXEL; chart.resize(opts.size.w * p, opts.size.h * p); return; }
    chart.resize(cssW ?? (root.clientWidth || host.clientWidth || innerWidth), cssH ?? (root.clientHeight || host.clientHeight || innerHeight));
  };
  // The islands are laid out after the first frames are drawn: the archipelago (rules/archipelago.ts) is worked out once a world,
  // about a second, the first time an island's place is asked for; till then the sea and the sky, and a word that it's coming.
  resize();
  $("status").textContent = "charting the sea…";
  let disposed = false;
  setTimeout(() => {
    if (disposed) return;
    build();
    choose(chartOpensOn(opts.start, opts.here, worldNow(), save.voyages.at(-1)?.to), true, false); // (the island she's on, however it's opened: app/sail.ts)
    bakeFor(likely()); // (the next island's trees drawn ahead from the moment the chart opens: app/landingBake.ts)
  }, 50);

  return {
    canvas, chart,
    islands: () => islands,
    update(dt, time) { if (!mini) { pad(dt); showHint(); } holdFrame(); wrapOne(); chart.frame(dt, time); const box = canvas.getBoundingClientRect(); for (const [id, p] of pins) p.update(!chart.flying && !left ? chart.screenTopOf(id) : null, box, time, id === chart.selected ? 0 : 1, dt); }, // (each 🧭 over its island's top, never on it; faded while its island's the one chosen)
    resize, choose,
    dispose() {
      disposed = true; waiting.clear();
      removeEventListener("keydown", onKey); removeEventListener("keyup", onKeyUp);
      if (poll) { clearInterval(poll); poll = null; }
      worker?.terminate(); worker = null;
      listening.abort();
      for (const p of pins.values()) p.dispose();
      if (mini) chart.dispose(); else releaseSeaChart(chart); // (the full chart kept for the next opening)
      root.remove();
    },
  };
}
