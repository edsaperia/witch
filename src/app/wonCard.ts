// The "Night won" card's words (rules/win.ts; Ed, 2026-10-10, 2026-10-11, 2026-10-18): the islands found tonight, each by a
// legend's quest done this night (its kind, its island to find on the sea chart, part C). Winning alone finds none (Ed,
// 2026-10-18: "Just winning an island does not unlock more islands"). Text only for now.
import type { WinState } from "../rules/win";

const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const list = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** "Islands found tonight: the Elk's, the Heron's." or "No islands found tonight: a legend shows you its island when you do its quest." */
export function wonText(w: Pick<WinState, "found">): string {
  const found = w.found.map(k => `the ${title(k)}'s`);
  return found.length ? `Island${found.length > 1 ? "s" : ""} found tonight: ${list(found)}.` : "No islands found tonight: a legend shows you its island when you do its quest.";
}
