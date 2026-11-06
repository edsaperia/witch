// A sail's flight on the sea chart over the game (app/chartView.ts; Ed, 2026-11-06: "Remove the ability to skip the zoom. But you
// can press circle to close the map and stop the sail while it's happening"; and "Both the zoom and the dive are loading screens;
// they shouldn't be skippable because loading must happen"): nothing pressed during the flight skips it. The chart's back (the
// pad's circle, at a table E, else Esc) puts the chart down and the sail with it, the night she's on going on as it was, till the
// sail is committed: from the end of the flight's first leg, the glide in to frame the island (SeaChart.flightFramed), the next
// night is made under it (the night she's leaving recorded and ended: main.ts departFromChart), so from there it flies on to the
// hand-off whatever's pressed. A flight with no night made under it (the chart page's, or one the chart can't hand over from)
// commits at its hand-off.

/** What a press does while the flight flies: the chart's back stops the sail ("cancel") while it isn't committed; anything else,
 *  and the back once it is, nothing. A key's auto-repeat is never a press. */
export type FlightPress = "cancel" | "none";

export class ChartSail {
  /** The next night being made under the flight, or handed over: no stopping it now. */
  committed = false;
  /** `early`: the next night is made under the flight (main.ts departFromChart), committing at the end of its first leg. */
  constructor(readonly island: string, readonly early: boolean) {}

  /** A frame of the flight (`framed`: past its first leg): true on the one frame it commits, the night to be made from then on. */
  frame(framed: boolean): boolean {
    if (this.committed || !this.early || !framed) return false;
    this.committed = true;
    return true;
  }

  /** The flight's end, handing over: committed whatever it was. */
  handOver(): void { this.committed = true; }

  /** A press during the flight: `back`, the chart's back (put down); `repeat`, a held key's auto-repeat. */
  press(back: boolean, repeat = false): FlightPress { return back && !repeat && !this.committed ? "cancel" : "none"; }
}
