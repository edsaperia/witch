// The bestiary's book (Ed, 2026-10-19: "E on the bestiary book opens the zoo (?zoo) over the game, mid-night. Closing it returns to
// the night where she was"; rules/houseRooms.ts, the "house" event's "book"): the zoo, the game's own page with ?zoo, in a frame
// over the night, the night paused under it. Closing it (its × or Esc) takes the frame away and the night goes on where she was.
// Her way out inside it (its little treehouse, or flying off its edge: app/zooExit.ts) asks the night's page to close it the same way.
// The page's side (the frame, the pause) is handed in, so the opening and closing is tested without one (zooOverlay.test.ts).
import { ZOO_EXIT_MESSAGE } from "./zooExit";

/** What the overlay needs of the page: a frame showing `url` over the game (and how to take it away), and the night's pause. */
export interface ZooHost {
  mount(url: string, close: () => void): { remove(): void };
  pause(on: boolean): void;
}

export class ZooOverlay {
  private shown: { remove(): void } | null = null;
  constructor(private readonly host: ZooHost, private readonly url: string) {}
  get isOpen(): boolean { return !!this.shown; }
  /** The zoo over the night (once: a second press while it's up does nothing). */
  open(): void {
    if (this.shown) return;
    this.host.pause(true);
    this.shown = this.host.mount(this.url, () => this.close());
  }
  /** Back to the night, where she was. */
  close(): void {
    if (!this.shown) return;
    this.shown.remove(); this.shown = null;
    this.host.pause(false);
  }
}

/** The zoo's address beside this page's: this build's own page with ?zoo (straight in, no bedroom: main.ts). */
export const zooUrl = (href: string): string => { const u = new URL(href); u.search = "?zoo=1"; u.hash = ""; return u.toString(); };

/** The page's side: a full-window frame over the game with a close button, Esc closing it too. */
export function domZooHost(pause: (on: boolean) => void): ZooHost {
  return {
    pause,
    mount(url, close) {
      const wrap = document.createElement("div");
      wrap.id = "zoo-over";
      wrap.style.cssText = "position:fixed;inset:0;z-index:40;background:#0b0912";
      const frame = document.createElement("iframe");
      frame.src = url; frame.title = "The zoo";
      frame.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
      const x = document.createElement("button");
      x.type = "button"; x.textContent = "× Back to the night"; x.title = "Back to the night (Esc)";
      x.style.cssText = "position:absolute;right:12px;top:12px;z-index:1;font:inherit;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.4);background:rgba(20,14,32,.85);color:#f0e6ff;cursor:pointer";
      x.addEventListener("click", close);
      const esc = (e: KeyboardEvent) => { if (e.code === "Escape") { e.stopPropagation(); e.preventDefault(); close(); } };
      window.addEventListener("keydown", esc, { capture: true });
      frame.addEventListener("load", () => { try { frame.contentWindow?.addEventListener("keydown", esc, { capture: true }); } catch { /* (another origin: the button's there) */ } });
      // (the zoo's own way out, its little treehouse or its edge: app/zooExit.ts)
      const left = (e: MessageEvent) => { if (e.source === frame.contentWindow && e.origin === location.origin && (e.data as { type?: string } | null)?.type === ZOO_EXIT_MESSAGE) close(); };
      window.addEventListener("message", left);
      wrap.append(frame, x); document.body.append(wrap);
      return { remove() { window.removeEventListener("keydown", esc, { capture: true }); window.removeEventListener("message", left); wrap.remove(); } };
    },
  };
}
