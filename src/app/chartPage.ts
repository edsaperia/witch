// The sea chart's page (chart.html; wave 2, part C; Ed, docs/backlog/journey.md "The world and the sea chart"): the world as a
// disc of night sea in 3D, drawn as the game is (render/chart/seaChart.ts; Ed, 2026-10-11: "show the map screen in the same way
// you show the island: pixellated, camera seeing it in 3D, your view moves around as you select islands"): home in the middle,
// every island at its kind's bearing on its phase's ring (chartLayout.ts islandAt) in its real outline (hotel, rules/islandShape.ts
// islandOutline: the land each grows to; made off the page's thread by chartOutlines.worker.ts, the chosen and nearest first, its
// round coast, islandCoast, shown till it comes), a sigil only on those she can travel to (Ed: "You can always see all the islands - you only
// see sigils on the ones that you can travel to"); her voyages as glowing lines on the water; won islands ringed in gold.
// Choose an island (tap or click it; arrow keys, the d-pad or the stick) and the camera glides to it and names it; choose it
// again, press Enter or the pad's A, or the Sail button, to sail there (?island=<kind>). Start over (after an are-you-sure)
// forgets it all; ?chart=all shows everything, for testing. The save and what's unlocked are chartSave.ts's: this is the view.
import { islandCoast } from "../rules/islandShape";
import { coastSpec, homeIsland, isPlaceholder, islandOf, KIND_NAMES, knownKinds, REAL_KINDS } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import { islandSigil } from "../../art/sigils.js";
import { SeaChart, type ChartIsland } from "../render/chart/seaChart";
import { allSave, loadSave, newCampaign, unlocked, worldSeed } from "./chartSave";
import { islandAt } from "./chartLayout";
import { stepTo } from "./chartNav";
import type { OutlineAsk, OutlineDone } from "./chartOutlines.worker";

const params = new URLSearchParams(location.search), showAll = params.get("chart") === "all" || params.has("all");
let save = showAll ? allSave() : loadSave();
// The world (golf, #685; Ed, 2026-10-11): the campaign's own seed, or ?world= for this look (shared links); the islands' links carry it on.
const linkWorld = params.get("world"), worldNow = () => (linkWorld ? worldSeed(linkWorld) : save.world);
const sailHref = (island: string) => `./?island=${island}${linkWorld ? `&world=${worldNow()}` : ""}`;
const $ = (id: string) => document.getElementById(id)!;
const canvas = $("chart") as HTMLCanvasElement;
const chart = new SeaChart(canvas, TUNING as unknown as ConstructorParameters<typeof SeaChart>[1]);
let islands: ChartIsland[] = [];

/** Every island, always: home and each found with its sigil, sailable; the rest bare land, the placeholders dimmest. */
function build(): void {
  const open = new Set(unlocked(save)), won = new Set(save.won), w = worldNow();
  const one = (id: string, radii: ArrayLike<number>, sigil: string): ChartIsland => {
    const at = islandAt(id, w)!, unknown = isPlaceholder(id);
    return { id, x: at.x, y: at.y, radii, sail: open.has(id) && !unknown, unknown, won: won.has(id), sigil };
  };
  islands = [one("home", islandCoast(coastSpec(homeIsland(w, knownKinds(save.found))), TUNING.map?.coast).radii, islandSigil("home"))];
  for (const k of KIND_NAMES) islands.push(one(k, islandCoast(coastSpec(islandOf(k, w)!), TUNING.islands?.coast).radii, k));
  chart.set(islands, save.voyages);
  const n = save.found.filter(k => !isPlaceholder(k)).length;
  $("status").textContent = `${n ? `${n} of ${REAL_KINDS.length} islands found${showAll ? ` (and ${KIND_NAMES.length - REAL_KINDS.length} not yet charted)` : ""}` : "wake legends at home to find their islands"}${save.won.length ? ` · ${save.won.length} won` : ""}${showAll ? " · showing everything (?chart=all)" : ""}`;
  outlines();
  $("world").textContent = `World seed: ${w}${linkWorld ? " (from the link)" : ""}`;
  ($("home") as HTMLAnchorElement).href = sailHref("home");
}

// The real outlines, made in a worker (seconds each for the big islands, about a minute for them all): the chosen island and
// those nearest it first, each swapped in as it comes; on a phone or a laptop alike, the page never waits on them.
let worker: Worker | null = null;
const OUTLINE_STEP = 32; // (metres between the land's samples: the chart's pixels are far coarser)
function outlines(): void {
  if (!worker) {
    try { worker = new Worker(new URL("./chartOutlines.worker.ts", import.meta.url), { type: "module" }); } catch { return; }
    worker.onmessage = (e: MessageEvent<OutlineDone>) => {
      const o = e.data, isl = islands.find(i => i.id === o.id);
      if (!isl || o.world !== worldNow()) return;
      isl.outline = o; chart.reshape(o.id, o);
    };
  }
  const from = islands.find(i => i.id === (chart.selected ?? save.voyages.at(-1)?.to ?? "home")) ?? islands[0];
  const ids = [...islands].sort((a, b) => Math.hypot(a.x - from.x, a.y - from.y) - Math.hypot(b.x - from.x, b.y - from.y)).map(i => i.id);
  const ask: OutlineAsk = { world: worldNow(), found: [...save.found], ids, step: OUTLINE_STEP };
  worker.postMessage(ask);
}

/** The chosen island's card: its name, phase and how it stands; the Sail button if she can go. */
function choose(id: string | null, instant = false): void {
  chart.select(id, instant);
  if (id && worker && !islands.find(i => i.id === id)?.outline) worker.postMessage({ first: id } satisfies OutlineAsk);
  const isl = islands.find(i => i.id === id);
  const card = $("card"), sail = $("sail") as HTMLAnchorElement;
  if (!isl) { card.hidden = true; return; }
  card.hidden = false;
  const phase = id === "home" ? 0 : islandOf(id!, worldNow())?.phase ?? 0;
  $("name").textContent = id === "home" ? "Home" : isl.unknown ? "Uncharted waters" : isl.sail ? `The ${id}'s island` : "An island not yet found";
  $("phase").textContent = id === "home" ? "the Ent's island, the middle of the world" : `phase ${phase}`;
  $("state").textContent = isl.unknown ? "not yet charted" : isl.won ? "won" : isl.sail ? (save.played.includes(id!) ? "played, not yet won" : "found: you can sail there") : "wake its legend to find it";
  sail.hidden = !isl.sail;
  sail.href = sailHref(id!);
}
const sailTo = (id: string | null) => { const isl = islands.find(i => i.id === id); if (isl?.sail) location.href = sailHref(id!); };

// Pointer: tap or click an island to choose it, again to sail; drag nothing (the camera only follows the choice); the wheel
// or a pinch zooms.
const pointers = new Map<number, { x: number; y: number }>();
let pinch = 0, downAt: { x: number; y: number } | null = null;
canvas.addEventListener("pointerdown", e => { pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); downAt = { x: e.clientX, y: e.clientY }; if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); } });
canvas.addEventListener("pointermove", e => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2) { const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch > 0 && d > 0) chart.zoom(pinch / d); pinch = d; downAt = null; }
});
const up = (e: PointerEvent) => {
  const tap = pointers.size === 1 && downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) < 8;
  pointers.delete(e.pointerId); if (pointers.size < 2) pinch = 0;
  if (!tap) return;
  const id = chart.pick(e.clientX, e.clientY);
  if (id && id === chart.selected) sailTo(id); else if (id) choose(id);
};
canvas.addEventListener("pointerup", up);
canvas.addEventListener("pointercancel", e => { pointers.delete(e.pointerId); pinch = 0; });
canvas.addEventListener("wheel", e => { e.preventDefault(); chart.zoom(Math.exp(e.deltaY * 0.0015)); }, { passive: false });
$("zoom-in").addEventListener("click", () => chart.zoom(0.75));
$("zoom-out").addEventListener("click", () => chart.zoom(1.33));

// Keys: the arrows step island to island, Enter or Space sails, + and - zoom.
const step = (dx: number, dy: number) => { const next = stepTo(islands, chart.selected ?? "home", dx, dy); if (next) choose(next); };
addEventListener("keydown", e => {
  if ((e.target as HTMLElement)?.closest?.("input")) return; // (typing a seed)
  if ((e.target as HTMLElement)?.closest?.("button, a") && (e.key === "Enter" || e.key === " ")) return; // (a focused button's own)
  const dir: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
  if (dir[e.key]) { e.preventDefault(); step(...dir[e.key]); }
  else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sailTo(chart.selected); }
  else if (e.key === "+" || e.key === "=") chart.zoom(0.8);
  else if (e.key === "-" || e.key === "_") chart.zoom(1.25);
});

// A gamepad: the d-pad or the left stick steps (repeating while held), A sails, the shoulders zoom.
let padWait = 0;
function pad(dt: number): void {
  const p = [...(navigator.getGamepads?.() ?? [])].find(g => g?.connected); if (!p) return;
  padWait -= dt;
  const b = (i: number) => !!p.buttons[i]?.pressed, ax = p.axes[0] ?? 0, ay = p.axes[1] ?? 0;
  const dx = b(15) ? 1 : b(14) ? -1 : Math.abs(ax) > 0.5 ? Math.sign(ax) : 0, dy = b(13) ? 1 : b(12) ? -1 : Math.abs(ay) > 0.5 ? Math.sign(ay) : 0;
  if ((dx || dy) && padWait <= 0) { step(dx, dy); padWait = 0.28; } else if (!dx && !dy) padWait = 0;
  if (b(0) && padWait <= 0) { sailTo(chart.selected); padWait = 0.5; }
  if (b(4)) chart.zoom(1 + dt); if (b(5)) chart.zoom(1 - dt * 0.8);
}

// Start over (golf, #685; Ed, 2026-10-11): a new campaign in a new world, its seed random or typed / pasted in, after an are-you-sure.
const panel = $("new-world"), field = $("new-seed") as HTMLInputElement;
$("start-over").addEventListener("click", () => { field.value = ""; panel.hidden = false; field.focus(); });
$("new-cancel").addEventListener("click", () => { panel.hidden = true; });
$("new-go").addEventListener("click", () => {
  if (!confirm("Start over in a new world? This forgets every island you've found and won.")) return;
  save = newCampaign(worldSeed(field.value));
  panel.hidden = true;
  if (showAll || linkWorld) location.search = ""; else { build(); choose("home"); }
});

const fit = () => chart.resize(innerWidth, innerHeight);
addEventListener("resize", fit);
fit(); build();
// first, the island she was last on (her last voyage's end), else home
choose(showAll ? "home" : save.voyages.at(-1)?.to ?? "home", true);
let last = performance.now();
const loop = (now: number) => { const dt = Math.min(0.1, (now - last) / 1000); last = now; pad(dt); chart.frame(dt, now / 1000); requestAnimationFrame(loop); };
requestAnimationFrame(loop);
// (for the screenshots: window.chart)
(window as unknown as { chart: unknown }).chart = { chart, choose, islands: () => islands };
