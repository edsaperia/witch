// The sea chart over the game (Ed, 2026-10-11: "The world map is in the centre" of the treehouse deck; rules/treehouse.ts): E at
// the deck's map table opens the chart's own view (app/chartView.ts mountChart, in sail mode) over the game, to sail from at any
// time (Ed: "Sail anytime"): its sail asks `onSail` (the game records the night, unwon if it's still on, then sails). Esc, the
// pad's B or Close shuts it; while it's open the game's own controls are held still (main.ts, chartOpen).
import { mountChart, type ChartView, type ChartViewOptions } from "../app/chartView";
import { sailHref } from "../app/sail";
import type { FlightEnd } from "../render/chart/seaChart";
import { stopWarmChart } from "../app/chartWarm";
import { prepareSeaChart } from "../render/chart/seaChart";
import { TUNING } from "../rules/tuning";

let open: { wrap: HTMLDivElement; view: ChartView; raf: number; opening: boolean } | null = null;

/** What she sailed to: the island, the night's seed, the world the link gave, and the chart's flight end (none if it couldn't fly). */
export interface Sailed { island: string; seed: number; world?: number; end?: FlightEnd }

/** Open the chart over the game; `onSail` with the island's link (to load) and what she sailed to (a night in place: app/sail.ts)
 *  when she sails; `world`, a world the game's link gave (?world=), carried on as chart.html's links do. Does nothing if it's
 *  already open. `o.opening`: the first load's chart (app/opening.ts): the whole screen, no Close (there's no night to go back to
 *  yet), the night's art warming under it (chartWarmsNight), and `o.corner`'s buttons in its top right corner. */
export function openChart(onSail: (href: string, sailed: Sailed) => void, world?: number, o: { opening?: boolean; corner?: ChartViewOptions["corner"]; noBake?: ChartViewOptions["noBake"] } = {}): void {
  if (open) return;
  performance.mark("chart:open");
  stopWarmChart(); // (the chart's own worker makes what isn't kept yet)
  const wrap = document.createElement("div");
  wrap.id = "chart-overlay";
  wrap.style.cssText = o.opening ? "position:fixed;inset:0;z-index:50;overflow:hidden;background:#05060e" : "position:fixed;inset:4vh 4vw;z-index:50;border:2px solid #3a2f5c;border-radius:8px;overflow:hidden;background:#05060e;box-shadow:0 0 0 100vmax rgba(5,6,14,.55)";
  document.body.append(wrap);
  const view = mountChart(wrap, {
    mode: "sail", world,
    onSail: (island, seed, end) => { closeChart(); onSail(sailHref(island, seed, world, location.href), { island, seed, world, end }); },
    onFly: () => { wrap.style.inset = "0"; wrap.style.border = "0"; wrap.style.borderRadius = "0"; }, // (the flight fills the screen)
    onClose: o.opening ? undefined : closeChart,
    corner: o.corner,
    noBake: o.noBake,
  });
  let last = performance.now();
  const loop = (now: number) => { if (!open) return; const dt = Math.min(0.1, (now - last) / 1000); last = now; view.update(dt, now / 1000); open.raf = requestAnimationFrame(loop); };
  open = { wrap, view, raf: requestAnimationFrame(loop), opening: !!o.opening };
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
  cancelAnimationFrame(open.raf);
  open.view.dispose(); open.wrap.remove();
  open = null;
  removeEventListener("resize", fit);
}

export const chartOpen = (): boolean => !!open;
/** The first load's chart is up (openChart's `opening`): the night under it is still being made, so its art isn't held (main.ts). */
export const chartWarmsNight = (): boolean => !!open?.opening;
