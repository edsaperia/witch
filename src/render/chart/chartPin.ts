// The sea chart's 🧭 (Ed, 2026-10-26: "the 🧭 to point at those islands on the chart"): the guidance pins' own pin (render/pins.ts
// look: the HUD's amber ring, the emoji in pixels, icons only) over an island she's found and not yet been to, its tip on the
// island; one for each such island (app/chartView.ts). Off the canvas, it waits at the canvas's edge pointing the way.
// The chart's DOM only: where the island is comes from SeaChart.screenOf.
import { pinFade } from "./chartPinPlace";
import { MAP, N, PIN_TIP, PixelCue, calm, paintPin } from "../indicator";

/** The HUD's one accent (render/view.ts HAT_INK), calmed as the guidance pins are. */
const AMBER = calm([232, 180, 106]);
const SCALE = 3;
/** Screen pixels between the island's highest drawn point and the pin's tip. */
const GAP = 4;

/** How far in from the canvas's edge an off-screen island's pin waits (CSS pixels, its middle). */
const EDGE = (N * SCALE) / 2 + 6;

export class ChartPin {
  private cue: PixelCue;
  private angle = NaN;
  /** How much it shows (0 to 1), eased toward 0 while its island is the one chosen (Ed, 2026-10-26: "While the pointed island is
   *  selected, the pointer fades out"), back to 1 when another is. */
  shown = 1;
  constructor(parent: HTMLElement = document.body) { this.cue = new PixelCue(parent, SCALE); this.cue.canvas.style.zIndex = "3"; } // (in the chart's own box: over its sea, under its cards)
  /** A frame: its tip just over `at` (the island's highest drawn point on screen, islandTop: CSS pixels from the canvas's top left;
   *  null hides it), the canvas at `box` (its client rectangle), bobbing gently with `time` (s); `want` 0 while its island's the
   *  one chosen (it fades out over about a quarter second), 1 otherwise; `dt` the frame's seconds. */
  update(at: { x: number; y: number } | null, box: { left: number; top: number; width: number; height: number }, time: number, want = 1, dt = 0): void {
    this.shown = pinFade(this.shown, want, dt);
    if (!at || this.shown <= 0) { this.cue.hide(); this.angle = NaN; return; }
    this.cue.canvas.style.opacity = `${this.shown}`;
    const lift = PIN_TIP * SCALE + GAP + Math.abs(Math.sin(time * Math.PI)) * 3; // (its tip clear of the island's top, bobbing up off it, never down onto it)
    const wantX = at.x, wantY = at.y - lift;
    const x = Math.max(EDGE, Math.min(box.width - EDGE, wantX)), y = Math.max(EDGE, Math.min(box.height - EDGE, wantY));
    const off = x !== wantX || y !== wantY, angle = off ? Math.atan2(at.y - y, at.x - x) : Math.PI / 2; // (off the canvas: toward it)
    if (!(Math.abs(angle - this.angle) <= 0.02)) { paintPin(this.cue, AMBER, "🧭", angle, MAP); this.angle = angle; } // (NaN: not painted yet)
    this.cue.place(box.left + x, box.top + y);
  }
  dispose(): void { this.cue.dispose(); }
}
