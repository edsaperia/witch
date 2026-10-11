// The "Night won" card's words (rules/win.ts; Ed, 2026-10-10, 2026-10-11): the islands the night's woken legends showed (each
// legend's kind, its island to find on the sea chart, part C), and those an enraged legend kept to itself. Text only for now;
// the sigils and island outlines come with the art (art4).
import type { WinState } from "../rules/win";

const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const list = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** "Islands found: the Elk's, the Heron's. The Ram's stayed hidden (its legend was still angry)." */
export function wonText(w: Pick<WinState, "found" | "lost">): string {
  const found = w.found.map(k => `the ${title(k)}'s`), lost = w.lost.map(k => `the ${title(k)}'s`);
  const a = found.length ? `Island${found.length > 1 ? "s" : ""} found: ${list(found)}.` : "No new islands this time.";
  const b = lost.length ? ` ${title(list(lost))} stayed hidden: ${lost.length > 1 ? "their legends were" : "its legend was"} still angry.` : "";
  return a + b;
}
