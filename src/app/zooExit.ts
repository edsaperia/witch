// Leaving the zoo (Ed, 2026-10-26: its little treehouse's "exit"; "If you fly off the edge of the map in the zoo you exit as well";
// rules/game.ts zooExit): a short fade, then back where she came from. In the bestiary book's frame over a night (app/zooOverlay.ts)
// the page tells the night's page, which closes the frame as its × and Esc do, and the night goes on where she was; on a ?zoo link
// with no night under it, the same page without the zoo's switches: the game's ordinary start.

/** The message the zoo's page sends the night's page round its frame. */
export const ZOO_EXIT_MESSAGE = "witch:zoo-exit";
/** The zoo's own switches, dropped on the way out of a ?zoo link. */
const ZOO_PARAMS = ["zoo", "all", "found", "world"];

/** Where leaving goes: the night under the frame, or this page without the zoo. */
export function zooExitTarget(href: string, inFrame: boolean): { kind: "frame" } | { kind: "go"; url: string } {
  if (inFrame) return { kind: "frame" };
  const u = new URL(href);
  for (const k of ZOO_PARAMS) u.searchParams.delete(k);
  u.hash = "";
  return { kind: "go", url: u.toString() };
}

/** Fade out over `fade` seconds, then leave (the page's side). */
export function leaveZoo(fade = 0.6): void {
  const veil = document.createElement("div");
  veil.style.cssText = `position:fixed;inset:0;z-index:60;background:#05040a;opacity:0;transition:opacity ${fade}s ease-in;pointer-events:none`;
  document.body.append(veil);
  requestAnimationFrame(() => { veil.style.opacity = "1"; });
  setTimeout(() => {
    let inFrame = false;
    try { inFrame = window.parent !== window && !!window.parent.document; } catch { inFrame = false; } // (another origin's frame: leave on our own)
    const to = zooExitTarget(location.href, inFrame);
    if (to.kind === "frame") window.parent.postMessage({ type: ZOO_EXIT_MESSAGE }, location.origin);
    else location.assign(to.url);
  }, fade * 1000);
}
