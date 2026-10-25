// The opening (Ed, 2026-10-20; previews/ed/opening-mock/NOTES.md on claude/ed-shots): she wakes in her bedroom in the treehouse
// (rules/wakeUp.ts: the alarm, the clothes pile, the DJ intro at her decks). Ed, 2026-10-23: "When you start a fresh
// game, the first screen should be the witch waking up in her bedroom on the home island instead of the map": a plain load goes
// straight to home's night, asleep in the dark while it's made, and wakes there (the sea chart that came first till then is the
// treehouse's map table's alone now). On by default (the tuning's opening.bedroom); ?opening=old keeps the old start for a load
// (the character creator as the loading cover), ?opening=bedroom forces the wake-up.
export type OpeningWay = "bedroom" | "old";

/** The way this load opens: the link's ?opening=bedroom|old (chart, its old name, as bedroom), else the tuning's opening.bedroom. */
export function openingWay(params: URLSearchParams, tuning: { opening?: { bedroom?: boolean } }): OpeningWay {
  const p = params.get("opening");
  if (p === "bedroom" || p === "chart") return "bedroom";
  if (p === "old") return p;
  return tuning.opening?.bedroom ? "bedroom" : "old";
}

/** Whether a sail lands her asleep in her bed (Ed, 2026-10-25, his 2a: "a sail always ends with her asleep in bed"; in place or the
 *  island's link loaded anew, &arrive=1): the dive ends on her bedroom, she wakes there as after the bed (rules/wakeUp.ts, the shorter
 *  wake-up), dreaming first of a find on loan. Only ?opening=old (or the tuning's opening.bedroom off) keeps the old landing at her
 *  decks, the old start's. */
export function sailLandsInBed(params: URLSearchParams, tuning: { opening?: { bedroom?: boolean } }): boolean {
  return openingWay(params, tuning) === "bedroom";
}

/** Whether this load wakes in her bedroom: the opening's way is the bedroom's, and the link is a plain start of the game. A link
 *  that names its night (?seed=, ?island=: a shared seed, a reload of an island), arrives from the chart (?arrive=1), starts a bot
 *  game (?bot=), skips the room (?creator=0: the tools, the smoke runs) or opens the zoo keeps its own start. `link` is the page's
 *  link as it came, before the boot adds its own ?seed=. */
export function opensInBedroom(link: URLSearchParams, tuning: { opening?: { bedroom?: boolean } }): boolean {
  if (openingWay(link, tuning) !== "bedroom") return false;
  for (const k of ["seed", "island", "arrive", "bot", "zoo"]) if (link.has(k)) return false;
  return link.get("creator") !== "0";
}
