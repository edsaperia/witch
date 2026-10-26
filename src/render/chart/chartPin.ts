// The sea chart's 🧭 (Ed, 2026-10-26: "the 🧭 to point at those islands on the chart"): the guidance pins' own pin (render/pins.ts
// look: the HUD's amber ring, the emoji in pixels, icons only) over an island she's found and not yet been to, its tip on the
// island; one island at a time (app/chartView.ts picks which). Off the canvas, it waits at the canvas's edge pointing the way.
// The chart's DOM only: where the island is comes from SeaChart.screenOf.
import { N, PIN_TIP, PixelCue, calm, paintPin } from "../indicator";
import { MAP } from "../view/guidance";

/** The HUD's one accent (render/view.ts HAT_INK), calmed as the guidance pins are. */
const AMBER = calm([232, 180, 106]);
const SCALE = 3;
/** How far in from the canvas's edge an off-screen island's pin waits (CSS pixels, its middle). */
const EDGE = (N * SCALE) / 2 + 6;

export class ChartPin {
  private cue: PixelCue;
  private angle = NaN;
  constructor(parent: HTMLElement = document.body) { this.cue = new PixelCue(parent, SCALE); this.cue.canvas.style.zIndex = "3"; } // (in the chart's own box: over its sea, under its cards)
  /** A frame: over `at` (the island on screen, CSS pixels from the canvas's top left; null hides it), the canvas at `box` (its client
   *  rectangle), bobbing gently with `time` (s). */
  update(at: { x: number; y: number } | null, box: { left: number; top: number; width: number; height: number }, time: number): void {
    if (!at) { this.cue.hide(); this.angle = NaN; return; }
    const lift = (PIN_TIP + 2) * SCALE + Math.sin(time * Math.PI) * 2; // (its tip just over the island's sigil, a bob every two seconds)
    const wantX = at.x, wantY = at.y - lift;
    const x = Math.max(EDGE, Math.min(box.width - EDGE, wantX)), y = Math.max(EDGE, Math.min(box.height - EDGE, wantY));
    const off = x !== wantX || y !== wantY, angle = off ? Math.atan2(at.y - y, at.x - x) : Math.PI / 2; // (off the canvas: toward it)
    if (!(Math.abs(angle - this.angle) <= 0.02)) { paintPin(this.cue, AMBER, "🧭", angle, MAP); this.angle = angle; } // (NaN: not painted yet)
    this.cue.place(box.left + x, box.top + y);
  }
  dispose(): void { this.cue.dispose(); }
}
