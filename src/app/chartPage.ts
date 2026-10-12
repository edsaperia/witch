// The sea chart's page (chart.html; wave 2, part C; Ed, docs/backlog/journey.md "The world and the sea chart"): the chart view
// (chartView.ts mountChart) in sail mode, filling the page. ?chart=all shows everything, for testing; ?world= shows a shared
// link's world (golf, #685), its islands' links carrying it on.
import { allSave, worldSeed } from "./chartSave";
import { mountChart } from "./chartView";

const params = new URLSearchParams(location.search), showAll = params.get("chart") === "all" || params.has("all");
const linkWorld = params.get("world");
const view = mountChart(document.body, {
  mode: "sail",
  save: showAll ? allSave() : undefined,
  world: linkWorld ? worldSeed(linkWorld) : undefined,
  start: showAll ? "home" : undefined,
  countUncharted: showAll,
  note: showAll ? "showing everything (?chart=all)" : undefined,
});
addEventListener("resize", () => view.resize());
let last = performance.now();
const loop = (now: number) => { const dt = Math.min(0.1, (now - last) / 1000); last = now; view.update(dt, now / 1000); requestAnimationFrame(loop); };
requestAnimationFrame(loop);
// (for the screenshots: window.chart)
(window as unknown as { chart: unknown }).chart = { chart: view.chart, choose: view.choose, islands: view.islands, view, mountChart };
