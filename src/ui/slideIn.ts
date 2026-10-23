// A panel that slides in over the game as she comes near something in the treehouse and away as she leaves it (Ed, 2026-10-21 and
// 2026-10-23; rules/stations.ts, its nearness): the dressing stations' from the left (ui/stationPanel.ts), the tables' up from the
// bottom (the map table's sea chart: ui/chartOverlay.ts; the card table's to come). One timing for them all, agreed with Echo: in
// and out in SLIDE_MS, ease-out; once out, it's hidden (display none). How it looks (a border, a soft fade) is each panel's own.

/** How long a panel takes to slide in or out (ms). */
export const SLIDE_MS = 220;
/** The edge of the screen it slides from. */
export type SlideSide = "left" | "bottom";

const OUT: Record<SlideSide, string> = { left: "translateX(-105%)", bottom: "translateY(105%)" };

export class SlideIn {
  private timer = 0;
  private isIn = false;

  /** `el` is shown with `display` (default "block") while in or sliding. */
  constructor(readonly el: HTMLElement, readonly side: SlideSide, private display = "block") {
    el.style.transform = OUT[side];
    el.style.transition = `transform ${SLIDE_MS}ms ease-out`;
    el.style.display = "none";
  }

  /** In or sliding in. */
  get shown(): boolean { return this.isIn; }

  /** Slide in (from where it is: one sliding out turns back). */
  in(): void {
    if (this.isIn) return;
    this.isIn = true;
    clearTimeout(this.timer);
    if (this.el.style.display === "none") { this.el.style.display = this.display; void this.el.offsetWidth; } // (laid out where it starts, off the edge, before it moves)
    this.el.style.transform = "none";
  }

  /** Slide out; `done` once it's gone (hidden). */
  out(done?: () => void): void {
    if (!this.isIn) { done?.(); return; }
    this.isIn = false;
    this.el.style.transform = OUT[this.side];
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => { if (!this.isIn) { this.el.style.display = "none"; done?.(); } }, SLIDE_MS + 40);
  }
}
