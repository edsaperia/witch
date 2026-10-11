// The sea chart's page (chart.html; wave 2, part C; Ed, docs/backlog/journey.md "The world and the sea chart"): the world as a
// disc, home in the middle, every island in its outline (art/islands.js islandPath of rules/islandShape.ts islandCoast: the
// map's own coast) at its kind's bearing on its phase's ring, a sigil only on those she can travel to; the voyages as dotted
// lines; won islands starred. Click an island to sail
// there (?island=<kind>). Start over (after an are-you-sure) forgets it all; ?chart=all shows everything, for testing.
import { ISLAND_LOOK, islandPath } from "../../art/islands.js";
import { islandSigil, sigilArrival, sigilColour } from "../../art/sigils.js";
import { islandCoast } from "../rules/islandShape";
import { coastSpec, homeIsland, isPlaceholder, islandOf, KIND_NAMES, REAL_KINDS } from "../rules/rosters";
import { TUNING } from "../rules/tuning";
import { allSave, loadSave, newCampaign, unlocked, worldSeed } from "./chartSave";
import { BOX, islandAt, ringOf } from "./chartLayout";

const NS = "http://www.w3.org/2000/svg";
const params = new URLSearchParams(location.search), showAll = params.get("chart") === "all" || params.has("all");
let save = showAll ? allSave() : loadSave();
// The world (Ed, 2026-10-11): the campaign's own seed, or ?world= for this look (shared links); the islands' links carry it on.
const linkWorld = params.get("world"), worldNow = () => (linkWorld ? worldSeed(linkWorld) : save.world);
const sailTo = (island: string) => `./?island=${island}${linkWorld ? `&world=${worldNow()}` : ""}`;
const svg = document.getElementById("chart") as unknown as SVGSVGElement;
const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent: Element = svg): SVGElementTagNameMap[K] => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  parent.appendChild(e);
  return e;
};
const rgb = (c: readonly number[]) => `rgb(${c[0]},${c[1]},${c[2]})`;

/** A sigil as a little pixel image (its own glyph in its neon), `px` pixels across. */
function sigilImage(id: string, px = 16): string {
  const c = document.createElement("canvas"); c.width = c.height = px;
  const ctx = c.getContext("2d")!, img = ctx.createImageData(px, px), ink = sigilArrival(id, px), col = sigilColour(id);
  for (let i = 0; i < px * px; i++) if (ink[i] < Infinity) { img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2]; img.data[i * 4 + 3] = 255; }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function draw(): void {
  svg.replaceChildren();
  // the sea: the disc, its rim where the sea streams off into space, the phases' rings faint
  el("circle", { cx: 0, cy: 0, r: 1.02, fill: "#1a2550" });
  el("circle", { cx: 0, cy: 0, r: 1, fill: "#10183a", stroke: "#2a3c78", "stroke-width": 1.5, "vector-effect": "non-scaling-stroke" });
  for (let p = 1; p <= 5; p++) el("circle", { cx: 0, cy: 0, r: ringOf(p), fill: "none", stroke: "#1d2a58", "stroke-width": 1, "stroke-dasharray": "2 5", "vector-effect": "non-scaling-stroke" });
  for (const [t, x, y] of [["N", 0, -0.94], ["E", 0.94, 0], ["S", 0, 0.94], ["W", -0.94, 0]] as const) {
    const label = el("text", { x, y, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 0.05, fill: "#3b4c8a" });
    label.textContent = t;
  }
  // the voyages, under the islands
  for (const v of save.voyages) {
    const a = islandAt(v.from, worldNow()), b = islandAt(v.to, worldNow());
    if (a && b) el("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "rgba(232,180,106,.55)", "stroke-width": 1.5, "stroke-dasharray": "1 4", "stroke-linecap": "round", "vector-effect": "non-scaling-stroke" });
  }
  // Every island, always (Ed, 2026-10-11: "You can always see all the islands - you only see sigils on the ones that you can
  // travel to"): home and each island found in its outline with its sigil, sailable; the rest bare outlines, dimmer, no link
  // (the placeholders' too; under ?chart=all those show a '?').
  const open = new Set(unlocked(save)), won = new Set(save.won);
  const islands: { id: string; radii: Float32Array; sigil: string }[] = [];
  const w = worldNow();
  islands.push({ id: "home", radii: islandCoast(coastSpec(homeIsland(w)), TUNING.map?.coast).radii, sigil: islandSigil("home") });
  for (const k of KIND_NAMES) islands.push({ id: k, radii: islandCoast(coastSpec(islandOf(k, w)!), TUNING.islands?.coast).radii, sigil: k });
  for (const isl of islands) {
    const at = islandAt(isl.id, w)!, unknown = isPlaceholder(isl.id), sail = open.has(isl.id) && !unknown;
    const a = sail ? el("a", { href: sailTo(isl.id), class: "island", tabindex: 0 }) : el("g", { opacity: 0.55 });
    el("title", {}, a).textContent = sail ? `${isl.id === "home" ? "Home" : `The ${isl.id}'s island`}${won.has(isl.id) ? " (won)" : ""}: sail there` : unknown ? "Not yet charted" : "Not yet found";
    const g = el("g", { transform: `translate(${at.x - BOX / 2} ${at.y - BOX / 2}) scale(${BOX})` }, a);
    el("path", { d: islandPath(isl.radii), class: "land", fill: rgb(ISLAND_LOOK.land2), stroke: rgb(ISLAND_LOOK.sand), "stroke-width": 1.5, "vector-effect": "non-scaling-stroke" }, g);
    const s = isl.id === "home" ? 0.06 : 0.045;
    if (sail) el("image", { href: sigilImage(isl.sigil), x: at.x - s / 2, y: at.y - s / 2, width: s, height: s }, a);
    else if (unknown && showAll) { const q = el("text", { x: at.x, y: at.y, "text-anchor": "middle", "dominant-baseline": "central", "font-size": 0.05, "font-weight": "bold", fill: "#9a93b4" }, a); q.textContent = "?"; }
    if (won.has(isl.id)) { const star = el("text", { x: at.x + 0.045, y: at.y - 0.04, "font-size": 0.05, fill: "#e8b46a" }, a); star.textContent = "✦"; }
  }
  const n = save.found.filter(k => !isPlaceholder(k)).length;
  document.getElementById("status")!.textContent = `${n ? `${n} of ${REAL_KINDS.length} islands found${showAll ? ` (and ${KIND_NAMES.length - REAL_KINDS.length} not yet charted)` : ""}` : `wake legends at home to find their islands`}${save.won.length ? ` · ${save.won.length} won` : ""}${showAll ? " · showing everything (?chart=all)" : ""}`;
  document.getElementById("world")!.textContent = `World seed: ${w}${linkWorld ? " (from the link)" : ""}`;
  (document.getElementById("home") as HTMLAnchorElement).href = sailTo("home");
}

// Start over (Ed, 2026-10-11): a new campaign in a new world, its seed random or typed / pasted in, after an are-you-sure.
const panel = document.getElementById("new-world")!, field = document.getElementById("new-seed") as HTMLInputElement;
document.getElementById("start-over")!.addEventListener("click", () => { field.value = ""; panel.hidden = false; field.focus(); });
document.getElementById("new-cancel")!.addEventListener("click", () => { panel.hidden = true; });
document.getElementById("new-go")!.addEventListener("click", () => {
  if (!confirm("Start over in a new world? This forgets every island you've found and won.")) return;
  save = newCampaign(worldSeed(field.value));
  panel.hidden = true;
  if (showAll || linkWorld) location.search = ""; else draw();
});
draw();
