// Sailing in place (docs/plans/sail-without-reload.md, PR 5): the map table's sea chart starts the next night on the same page
// (app/night.ts startNight), not by loading it anew. Off by default till its tests pass in play (the tuning's sail.inPlace; PR 6
// turns it on): ?sail=inplace forces it on, ?sail=reload the old way. Here, the pure parts main.ts's sail uses: which way, the
// night's link, the knobs that link sets itself (kept from the carry), Back opening the pause menu, and the quiet fallback.

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
export const SAIL_DROPS = ["arrive", "wave", "cleared", "at", "mode", "zoom", "set", "found", "bot", "quest", "arena", "partyover"] as const;

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
