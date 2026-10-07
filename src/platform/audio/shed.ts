// The sound's safety valve (Ed's mic test, 2026-10-07: "almost no sound at all, just occasional static": the audio thread
// under-ran for 155 s of 160): when the audio thread can't keep up, the sound sheds what costs it most, a step at a time,
// least missed first, and says so in the playtest log:
//   1: the beds (each area's ambience, home's meadow, the pond, the picnic, the sea; sfx.ts);
//   2: the music's stacked voices (every synth and sung note one oscillator, its tails shorter; musicEngine.ts);
//   3: the reverbs cut short and the delay off (musicEngine.ts).
// It reads the output meter's ClockWatch once a second: the browser's own under-run count where it has one (Chrome's
// playbackStats), and otherwise the audio clock falling behind the page's for good (time lost, not a coarse clock's
// steps, which pay themselves back). It never steps back up within a load. `?audio=lite` starts at the last step,
// `?audio=full` turns the valve off (to compare).
export const SHED_MAX = 3;

export const SHED_STEPS = ["", "beds off", "single voices", "short reverb, no delay"];

export class ShedValve {
  level: number;
  /** Whether it may shed (not with ?audio=full). */
  readonly on: boolean;
  private hist: { t: number; u: number | null; drift: number }[] = [];
  private lastAt = -Infinity;

  constructor(mode: string | null = null, private window = 5, private gap = 6, private events = 3, private lostMs = 150) {
    this.level = mode === "lite" ? SHED_MAX : 0;
    this.on = mode !== "full";
  }

  /** Once a second: `t` the page's time (s), `underruns` the browser's cumulative count (null: it doesn't say), `drift` the
   *  audio clock against the page's since it started running (ms, negative behind). Gives the reason when it sheds a step. */
  feed(t: number, underruns: number | null, drift: number): string | null {
    const H = this.hist;
    H.push({ t, u: underruns, drift });
    while (H.length > 1 && H[0].t < t - this.window) H.shift();
    if (!this.on || this.level >= SHED_MAX || t - this.lastAt < this.gap || H.length < 2) return null;
    const a = H[0], b = H[H.length - 1];
    let why: string | null = null;
    if (a.u !== null && b.u !== null && b.u - a.u >= this.events) why = `${b.u - a.u} under-runs in ${Math.round(b.t - a.t)} s`;
    else if (a.drift - b.drift >= this.lostMs) why = `audio fell ${Math.round(a.drift - b.drift)} ms behind in ${Math.round(b.t - a.t)} s`;
    if (!why) return null;
    this.level++; this.lastAt = t; this.hist = [H[H.length - 1]];
    return `shed ${this.level} (${SHED_STEPS[this.level]}): ${why}`;
  }
}
