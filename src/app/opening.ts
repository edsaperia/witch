// The new opening (Ed, 2026-10-20; previews/ed/opening-mock/NOTES.md on claude/ed-shots): the first load starts on the sea chart, only
// home unlocked in a first game (app/chartSave.ts unlocked: home and what she's found), its corner holding What's new and Options (the
// zoo's through the bestiary's book); choosing home dives on into the boot's own night (made under the chart) and into her bedroom
// in the treehouse, where she wakes (rules/wakeUp.ts: the wake-up, the curtains, the DJ intro at her decks); another island starts
// its night in place (app/night.ts startNight, as a sail does). Until the whole opening is proven it's off by default (the tuning's opening.chart);
// ?opening=chart turns it on for a load, ?opening=old keeps today's start (the bedroom as the loading cover), and ?sail=reload still
// loads the island's page as before.
export type OpeningWay = "chart" | "old";

/** The way this load opens: the link's ?opening=chart|old, else the tuning's opening.chart. */
export function openingWay(params: URLSearchParams, tuning: { opening?: { chart?: boolean } }): OpeningWay {
  const p = params.get("opening");
  if (p === "chart" || p === "old") return p;
  return tuning.opening?.chart ? "chart" : "old";
}

/** Whether this load opens on the chart: the opening's way is the chart, and the link is a plain start of the game. A link that
 *  names its night (?seed=, ?island=: a shared seed, a reload of an island), arrives from the chart (?arrive=1), starts a bot game
 *  (?bot=), skips the room (?creator=0: the tools, the smoke runs, the zoo) or opens the zoo keeps today's start. `link` is the
 *  page's link as it came, before the boot adds its own ?seed=. */
export function opensOnChart(link: URLSearchParams, tuning: { opening?: { chart?: boolean } }): boolean {
  if (openingWay(link, tuning) !== "chart") return false;
  for (const k of ["seed", "island", "arrive", "bot", "zoo"]) if (link.has(k)) return false;
  return link.get("creator") !== "0";
}

/** Whether the first load's chart, sailing to `island`, dives into the boot's own night rather than starting another: the boot's
 *  is home's (no ?island in its link), made and its art drawn under the chart, and never played; so the dive goes on into her
 *  bedroom there (rules/opening.ts wakeInBedroom) with no wait for a new island. Any other island sails in place as ever. */
export function divesHome(island: string, boot: { how: string; island: string }, played: boolean): boolean {
  return island === "home" && boot.how === "boot" && (boot.island === "" || boot.island === "home") && !played;
}
