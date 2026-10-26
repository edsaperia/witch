// Sailing in place (docs/plans/sail-without-reload.md, PRs 5 and 6): the map table's sea chart starts the next night on the same
// page (app/night.ts startNight), not by loading it anew, and so do the bed and the bot game's exit. On
// by default (the tuning's sail.inPlace): ?sail=reload the old way, ?sail=inplace forces it on. Here, the pure parts main.ts uses:
// which way, the night's link, the knobs that link sets itself (kept from the carry), the other ways' links and nights, Back
// opening the pause menu, and the quiet fallback.
import { parseSeed } from "../rules/map";
import { playableIsland } from "../rules/rosters";
import { newForestHref } from "./newForest";

/** The two ways to sail: the night started in place, or the page loaded anew on the island's link (as before). */
export type SailWay = "inplace" | "reload";

/** ?sail=inplace or ?sail=reload for this page, else the tuning's sail.inPlace. */
export function sailWay(params: URLSearchParams, tuning: { sail?: { inPlace?: boolean } }): SailWay {
  const p = params.get("sail");
  if (p === "inplace" || p === "reload") return p;
  return tuning.sail?.inPlace ? "inplace" : "reload";
}

/** What a sailed night's link leaves behind (the plan's A1, URL): the chart's own hand-off (arrive=1: in place the flight's end is
 *  passed in memory) and the repro link's and the debug switches' places (wave, cleared, at, mode, zoom, set, found, bot, quest,
 *  arena, partyover), so the next island never starts where a debug link put the last. */
export const SAIL_DROPS = ["arrive", "wave", "cleared", "at", "mode", "zoom", "set", "found", "bot", "quest", "arena", "partyover", "shot"] as const;

/** The link of the night sailed to: ?island=X&seed=S[&world=W], then the page's other switches as they were (?quick, ?sail,
 *  ?debug...), without SAIL_DROPS. */
export function sailParams(now: URLSearchParams, island: string, seed: number, world?: number): URLSearchParams {
  const out = new URLSearchParams({ island, seed: String(seed) });
  if (world != null) out.set("world", String(world));
  const drop = new Set<string>([...SAIL_DROPS, "island", "seed", "world"]);
  for (const [k, v] of now) if (!drop.has(k)) out.append(k, v);
  return out;
}

/** The island's link to load as before (ui/chartOverlay.ts): what the reload, and the fallback, go to. */
export function sailHref(island: string, seed: number, world: number | undefined, base: string): string {
  return new URL(`./?island=${island}&seed=${seed}&arrive=1${world != null ? `&world=${world}` : ""}`, base).href;
}

/** The knobs a night's link sets itself: its ?set= paths and its decisions' d_<id> (ui/decisions.ts), each of `list`'s knob; the
 *  sliders' carry from the last night (app/settings.ts carryKnobs) leaves these as the link has them. */
export function linkKnobs(params: URLSearchParams, list: readonly { id: string; apply: { knob?: string } }[]): Set<string> {
  const out = new Set((params.get("set") ?? "").split(";").map(p => p.split("=")[0]).filter(Boolean));
  for (const d of list) if (d.apply.knob && params.has(`d_${d.id}`)) out.add(d.apply.knob);
  return out;
}

/** The other ways to a new night (the plan's PR 6): the bed (the only way to the same island again: Ed, 2026-10-21, the party's-over
 *  card's Play again and A new forest "replace with the bed"), the bot game's exit. */
export type NightWay = "bed" | "bot";

/** The link each way loads as before (and falls back to): the bed this link with a fresh seed (app/newForest.ts), the bot game's
 *  exit this link without ?bot. */
export function nightHref(how: NightWay, href: string, random: () => number = Math.random): string {
  if (how === "bot") { const u = new URL(href); u.searchParams.delete("bot"); return u.toString(); }
  return newForestHref(href, random);
}

/** The night a way's link starts, as a fresh load of it would: its island, seed and world, and the link's switches whole (nothing
 *  flies in, the chart's hand-off read once). */
export function nightFromHref(how: NightWay, href: string): { how: NightWay; island: string; seed: number; world?: number; params: URLSearchParams } {
  const params = new URL(href).searchParams, seed = parseSeed(params.get("seed"));
  if (seed === null) throw new Error(`a new night in place: no seed in ${href}`); // (the boot always puts one in the link: loaded anew instead)
  return { how, island: params.get("island") ?? "", seed, world: params.has("world") ? Number(params.get("world")) : undefined, params };
}

/** Back after a sail in place (Ed's decision 1): each night sailed to pushes its link and then a guard entry with the same link;
 *  Back from the guard lands on the night's own entry (popstate), where the guard is pushed again and the pause menu opens, so
 *  nothing is lost and the URL stays the night's. A page never sailed from (its first load) leaves Back alone. */
export class BackGuard {
  /** A night sailed to in place: Back is the pause menu's from now on. */
  armed = false;
  private url = "";
  constructor(private readonly h: Pick<History, "pushState">, private readonly onBack: () => void) {}
  /** The night sailed to: its link pushed, then the guard on it. */
  sailed(url: string): void {
    this.url = url;
    this.h.pushState({ witch: "night" }, "", url);
    this.h.pushState({ witch: "guard" }, "", url);
    this.armed = true;
  }
  /** A popstate: armed, the guard pushed again (on the night's own link, whichever entry Back reached) and the pause menu opened;
   *  true if it was taken. */
  popped(): boolean {
    if (!this.armed) return false;
    this.h.pushState({ witch: "guard" }, "", this.url);
    this.onBack();
    return true;
  }
}

/** The sail in place, falling back quietly (Ed's decision 2): any throw on the way, and the page loads the island's link as
 *  before (`reload`, no message), the error told to `log` (the console and the playtest log). True if it sailed in place. */
export async function sailOrReload(inPlace: () => Promise<void>, href: string, reload: (href: string) => void, log: (e: unknown) => void = () => {}): Promise<boolean> {
  try { await inPlace(); return true; } catch (e) {
    try { log(e); } catch { /* the log's own trouble: still reload */ }
    reload(href);
    return false;
  }
}

/** The island a night is on, as the chart names it (the night's map.island: "home" or a kind's), or null for a night on no chart
 *  island (?island=20, ?phase=, the zoo). */
export function chartIsland(mapIsland: string | undefined): string | null {
  return mapIsland && playableIsland(mapIsland) ? mapIsland : null;
}

/** Where she is as the chart opens over a night (Ed, 2026-10-21: "choosing the same island after a night has ended shouldn't start a
 *  new night - going to bed does that"): the night's island and world, and its button's words. */
export interface ChartHere { island: string; world: number; label: string }

/** How the night stands as the chart opens over it: still on, won (the conga dancing on), or the party's over (the afterparty). */
export type NightState = "on" | "won" | "over";

/** The current island's button on the chart, in place of "Sail home" or "Sail there". */
export function stayLabel(state: NightState): string {
  return state === "over" ? "Back to the afterparty" : "Back to the party";
}

/** Choosing an island on a chart over a night: the island she's on (in the same world) never starts a new night, from any chart: it
 *  closes and she's back where she was ("stay"; only the treehouse's bed starts the same island again). Any other island sails. */
export function chartChoice(here: { island: string; world: number } | null | undefined, chosen: string, world: number): "stay" | "sail" {
  return here && here.island === chosen && here.world === world ? "stay" : "sail";
}
