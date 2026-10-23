// The sea chart over the game (Ed, 2026-10-11: "The world map is in the centre" of the treehouse deck; rules/treehouse.ts): E at
// the deck's map table opens the chart's own view (app/chartView.ts mountChart, in sail mode) over the game, to sail from at any
// time (Ed: "Sail anytime"): its sail asks `onSail` (the game records the night, unwon if it's still on, then sails). Esc, the
// pad's B or Close shuts it; while it's open the game's own controls are held still (main.ts, chartOpen). At the Atrium's map table
// (Ed, 2026-10-23: "'Tables' slide in from the bottom and have a soft edge (they're more diegetic)", "It can fill the screen once
// risen"): `table`, it comes by nearness (rules/stations.ts tableOf, main.ts), slides up from the bottom (ui/slideIn.ts) to fill
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

let open: { wrap: HTMLDivElement; view: ChartView; raf: number; opening: boolean; slide?: SlideIn } | null = null;
/** A table's chart sliding away (closeChart): gone once it's out, or at once if another opens meanwhile. */
let leaving: (() => void) | null = null;

/** What she sailed to: the island, the night's seed, the world the link gave, and the chart's flight end (none if it couldn't fly). */
export interface Sailed { island: string; seed: number; world?: number; end?: FlightEnd }

/** Open the chart over the game; `onSail` with the island's link (to load) and what she sailed to (a night in place: app/sail.ts)
 *  when she sails; `world`, a world the game's link gave (?world=), carried on as chart.html's links do. Does nothing if it's
 *  already open. `o.opening`: the first load's chart (app/opening.ts): the whole screen, no Close (there's no night to go back to
 *  yet), the night's art warming under it (chartWarmsNight), and `o.corner`'s buttons in its top right corner. `o.here`: the
 *  island she's on: choosing it closes the chart as Close does (then `o.onStay`), never a sail (app/sail.ts chartChoice). */
export function openChart(onSail: (href: string, sailed: Sailed) => void, world?: number, o: { opening?: boolean; corner?: ChartViewOptions["corner"]; noBake?: ChartViewOptions["noBake"]; here?: ChartViewOptions["here"]; onStay?: () => void; table?: ChartViewOptions["table"] } = {}): void {
  if (open) return;
  leaving?.(); // (the last table's chart still sliding away: gone now, its chart free for this one)
  performance.mark("chart:open");
  stopWarmChart(); // (the chart's own worker makes what isn't kept yet)
  const wrap = document.createElement("div");
  wrap.id = "chart-overlay";
  wrap.style.cssText = o.opening ? "position:fixed;inset:0;z-index:50;overflow:hidden;background:#05060e"
    : o.table ? `position:fixed;inset:0;z-index:50;overflow:hidden;-webkit-mask-image:${tableMask};-webkit-mask-composite:source-in;mask-image:${tableMask};mask-composite:intersect`
    : "position:fixed;inset:4vh 4vw;z-index:50;border:2px solid #3a2f5c;border-radius:8px;overflow:hidden;background:#05060e;box-shadow:0 0 0 100vmax rgba(5,6,14,.55)";
  document.body.append(wrap);
  const slide = o.table ? new SlideIn(wrap, "bottom") : undefined;
  if (o.table) document.getElementById("house-tags")?.style.setProperty("visibility", "hidden"); // (the room's labels: not through its soft edge)
  const view = mountChart(wrap, {
    mode: "sail", world,
    onSail: (island, seed, end) => { closeChart(); onSail(sailHref(island, seed, world, location.href), { island, seed, world, end }); },
    onFly: () => { wrap.style.inset = "0"; wrap.style.border = "0"; wrap.style.borderRadius = "0"; wrap.style.maskImage = wrap.style.webkitMaskImage = "none"; }, // (the flight fills the screen, edge to edge)
    onClose: o.opening ? undefined : closeChart,
    here: o.here,
    onStay: () => { closeChart(); o.onStay?.(); }, // (as Close: the night held behind it goes on as it was, main.ts)
    corner: o.corner,
    noBake: o.noBake,
    table: o.table,
  });
  let last = performance.now();
  const loop = (now: number) => { if (!open) return; const dt = Math.min(0.1, (now - last) / 1000); last = now; view.update(dt, now / 1000); open.raf = requestAnimationFrame(loop); };
  open = { wrap, view, raf: requestAnimationFrame(loop), opening: !!o.opening, slide };
  slide?.in();
  performance.mark("chart:mounted");
  (window as unknown as { chart: unknown }).chart = { chart: view.chart, choose: view.choose, islands: view.islands, view }; // (as chart.html's: for the screenshots and timings)
  addEventListener("resize", fit);
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
/** The first load's chart is up (openChart's `opening`): the night under it is still being made, so its art isn't held (main.ts). */
export const chartWarmsNight = (): boolean => !!open?.opening;
