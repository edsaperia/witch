// The sea chart over the game (Ed, 2026-10-11: "The world map is in the centre" of the treehouse deck; rules/treehouse.ts): E at
// the deck's map table opens the chart's own view (app/chartView.ts mountChart, in sail mode) over the game, to sail from at any
// time (Ed: "Sail anytime"): its sail asks `onSail` (the game records the night, unwon if it's still on, then sails). Esc, the
// pad's B or Close shuts it; while it's open the game's own controls are held still (main.ts, chartOpen).
import { mountChart, type ChartView } from "../app/chartView";
import { stopWarmChart } from "../app/chartWarm";

let open: { wrap: HTMLDivElement; view: ChartView; raf: number } | null = null;

/** Open the chart over the game; `onSail` with the island's link when she sails; `world`, a world the game's link gave (?world=),
 *  carried on as chart.html's links do. Does nothing if it's already open. */
export function openChart(onSail: (href: string) => void, world?: number): void {
  if (open) return;
  stopWarmChart(); // (the chart's own worker makes what isn't kept yet)
  const wrap = document.createElement("div");
  wrap.id = "chart-overlay";
  wrap.style.cssText = "position:fixed;inset:4vh 4vw;z-index:50;border:2px solid #3a2f5c;border-radius:8px;overflow:hidden;background:#05060e;box-shadow:0 0 0 100vmax rgba(5,6,14,.55)";
  document.body.append(wrap);
  const view = mountChart(wrap, {
    mode: "sail", world,
    onSail: island => { closeChart(); onSail(new URL(`./?island=${island}&arrive=1${world != null ? `&world=${world}` : ""}`, location.href).href); },
    onFly: () => { wrap.style.inset = "0"; wrap.style.border = "0"; wrap.style.borderRadius = "0"; }, // (the flight fills the screen)
    onClose: closeChart,
  });
  let last = performance.now();
  const loop = (now: number) => { if (!open) return; const dt = Math.min(0.1, (now - last) / 1000); last = now; view.update(dt, now / 1000); open.raf = requestAnimationFrame(loop); };
  open = { wrap, view, raf: requestAnimationFrame(loop) };
  (window as unknown as { chart: unknown }).chart = { chart: view.chart, choose: view.choose, islands: view.islands, view }; // (as chart.html's: for the screenshots and timings)
  addEventListener("resize", fit);
}

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
