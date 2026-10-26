// The sea chart over the game (Ed, 2026-10-11: "The world map is in the centre" of the treehouse deck; rules/treehouse.ts): E at
// the deck's map table opens the chart's own view (app/chartView.ts mountChart, in sail mode) over the game, to sail from at any
// time (Ed: "Sail anytime"): its sail asks `onSail` (the game records the night, unwon if it's still on, then sails). Esc, the
// pad's B or Close shuts it; while it's open the game's own controls are held still (main.ts, chartOpen). At the Atrium's map table
// (Ed, 2026-10-23: "'Tables' slide in from the bottom and have a soft edge (they're more diegetic)", "It can fill the screen once
// risen"): `table`, it comes on E there (Ed's playtest, 2026-10-26; rules/stations.ts tableOf, main.ts), slides up from the bottom (ui/slideIn.ts) to fill
// the screen, no frame, its edges fading to the night held behind it; she moves and it slides away (app/chartView.ts `table`).
import { mountChart, type ChartView, type ChartViewOptions } from "../app/chartView";
import { sailHref } from "../app/sail";
import type { FlightEnd } from "../render/chart/seaChart";
import { stopWarmChart } from "../app/chartWarm";
import { prepareSeaChart } from "../render/chart/seaChart";
import { TUNING } from "../rules/tuning";
import { SlideIn } from "./slideIn";

/** A table's chart's soft edge (Ed: "Instead of a hard border at the edge it fades to transparent"): its top and sides fade to
 *  nothing over these, as it rises and once it fills the screen. */
const TABLE_FADE = { top: 72, side: 40 };
const tableMask = `linear-gradient(to bottom, transparent, #000 ${TABLE_FADE.top}px), linear-gradient(to right, transparent, #000 ${TABLE_FADE.side}px, #000 calc(100% - ${TABLE_FADE.side}px), transparent)`;

let open: { wrap: HTMLDivElement; view: ChartView; raf: number; slide?: SlideIn; moon?: HTMLCanvasElement } | null = null;
/** A table's chart sliding away (closeChart): gone once it's out, or at once if another opens meanwhile. */
let leaving: (() => void) | null = null;

/** What she sailed to: the island, the night's seed, the world the link gave, and the chart's flight end (none if it couldn't fly). */
export interface Sailed { island: string; seed: number; world?: number; end?: FlightEnd }

/** Open the chart over the game; `onSail` with the island's link (to load) and what she sailed to (a night in place: app/sail.ts)
 *  when she sails (`o.onDepart` first, as its flight sets off: the night in place made under it, app/chartView.ts); `world`, a world the game's link gave (?world=), carried on as chart.html's links do. Does nothing if it's
 *  already open. `o.here`: the island she's on: choosing it closes the chart as Close does (then `o.onStay`), never a sail (app/sail.ts chartChoice). */
export function openChart(onSail: (href: string, sailed: Sailed) => void, world?: number, o: { here?: ChartViewOptions["here"]; onStay?: () => void; table?: ChartViewOptions["table"]; onDepart?: (sailed: Sailed, at: FlightEnd["cam"] | null) => Promise<void> } = {}): void {
  if (open) return;
  leaving?.(); // (the last table's chart still sliding away: gone now, its chart free for this one)
  performance.mark("chart:open");
  stopWarmChart(); // (the chart's own worker makes what isn't kept yet)
  const wrap = document.createElement("div");
  wrap.id = "chart-overlay";
  wrap.style.cssText = o.table ? "position:fixed;inset:0;z-index:50;overflow:hidden"
    : "position:fixed;inset:4vh 4vw;z-index:50;border:2px solid #3a2f5c;border-radius:8px;overflow:hidden;background:#05060e;box-shadow:0 0 0 100vmax rgba(5,6,14,.55)";
  document.body.append(wrap);
  const slide = o.table ? new SlideIn(wrap, "bottom") : undefined;
  // At a table, the chart in a layer of its own with the soft edge, and the moon drawn again over it, unfaded (Ed, 2026-10-23:
  // "The chart has an orbiting moon; this is exempt from the fading out"): its disc copied from the chart's picture each frame.
  let host: HTMLDivElement = wrap, moon: HTMLCanvasElement | undefined;
  if (o.table) {
    host = document.createElement("div");
    host.style.cssText = `position:absolute;inset:0;-webkit-mask-image:${tableMask};-webkit-mask-composite:source-in;mask-image:${tableMask};mask-composite:intersect`;
    moon = document.createElement("canvas");
    moon.style.cssText = "position:absolute;left:0;top:0;pointer-events:none;z-index:4;display:none";
    wrap.append(host, moon);
  }
  if (o.table) document.getElementById("house-tags")?.style.setProperty("visibility", "hidden"); // (the room's labels: not through its soft edge)
  const view = mountChart(host, {
    mode: "sail", world,
    onSail: (island, seed, end) => { closeChart(); onSail(sailHref(island, seed, world, location.href), { island, seed, world, end }); },
    onFly: () => { wrap.style.inset = "0"; wrap.style.border = "0"; wrap.style.borderRadius = "0"; host.style.maskImage = host.style.webkitMaskImage = "none"; if (moon) moon.style.display = "none"; }, // (the flight fills the screen, edge to edge)
    onDepart: o.onDepart ? (island, seed, at) => o.onDepart!({ island, seed, world }, at) : undefined, // (the next night made under the flight: main.ts)
    onClose: closeChart,
    here: o.here,
    onStay: () => { closeChart(); o.onStay?.(); }, // (as Close: the night held behind it goes on as it was, main.ts)
    table: o.table,
  });
  let last = performance.now();
  const loop = (now: number) => { if (!open) return; const dt = Math.min(0.1, (now - last) / 1000); last = now; view.update(dt, now / 1000); if (!open) return; if (moon && host.style.maskImage !== "none") drawMoon(moon, view, wrap); open.raf = requestAnimationFrame(loop); }; // (closed by its own frame: a flight handing over to a night made under it)
  open = { wrap, view, raf: requestAnimationFrame(loop), slide, moon };
  slide?.in();
  performance.mark("chart:mounted");
  (window as unknown as { chart: unknown }).chart = { chart: view.chart, choose: view.choose, islands: view.islands, view }; // (as chart.html's: for the screenshots and timings)
  addEventListener("resize", fit);
}

/** The chart's moon over its soft edge: its disc (and a hair round it) copied from the chart's picture (kept: preserveDrawingBuffer)
 *  into `c`, clipped round, where the sky draws it; nothing when it isn't drawn. */
function drawMoon(c: HTMLCanvasElement, view: ChartView, wrap: HTMLElement): void {
  const d = view.chart.moonDisc(), src = view.canvas;
  if (!d || !src.width) { c.style.display = "none"; return; }
  const box = wrap.getBoundingClientRect(), sr = src.getBoundingClientRect(), k = src.width / Math.max(1, sr.width), r = d.r + 1.5, s = Math.ceil(r * 2);
  if (c.width !== s) { c.width = s; c.height = s; c.style.width = c.style.height = `${s}px`; }
  c.style.display = ""; c.style.left = `${d.x - r - box.left}px`; c.style.top = `${d.y - r - box.top}px`;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, s, s); g.save(); g.beginPath(); g.arc(r, r, r, 0, Math.PI * 2); g.clip();
  g.imageSmoothingEnabled = false;
  g.drawImage(src, (d.x - r - sr.left) * k, (d.y - r - sr.top) * k, s * k, s * k, 0, 0, s, s);
  g.restore();
}

/** Make the chart's renderer and link its shaders ahead (render/chart/seaChart.ts prepareSeaChart), so E at the map table opens
 *  it without the wait: a new WebGL context and its programs were seconds of it. */
export const prepareChart = (): Promise<void> => prepareSeaChart(TUNING as unknown as Parameters<typeof prepareSeaChart>[0]);

const fit = () => open?.view.resize();

/** Close the chart, if open. */
export function closeChart(): void {
  if (!open) return;
  const o = open;
  open = null; // (closed at once: the night goes on; a table's chart slides away over it, then goes)
  removeEventListener("resize", fit);
  const gone = () => { if (leaving !== gone && o.slide) return; leaving = null; cancelAnimationFrame(o.raf); o.view.dispose(); o.wrap.remove(); };
  document.getElementById("house-tags")?.style.removeProperty("visibility");
  if (!o.slide) { gone(); return; }
  leaving = gone;
  o.slide.out(gone);
}

export const chartOpen = (): boolean => !!open;
