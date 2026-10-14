// The sound's safety valve (Ed's mic test, 2026-10-07: "almost no sound at all, just occasional static": the audio thread
// under-ran for 155 s of 160): when the audio thread can't keep up, the sound sheds what costs it most, a step at a time,
// least missed first, and says so in the playtest log:
//   1: the beds (each area's ambience, home's meadow, the pond, the picnic, the sea; sfx.ts);
//   2: the music's stacked voices (every synth and sung note one oscillator, its tails shorter; musicEngine.ts);
//   3: the reverbs cut short and the delay off (musicEngine.ts).
// It reads the output meter's ClockWatch once a second: the browser's own under-run count where it has one (Chrome's
// playbackStats), the audio clock falling behind the page's for good (time lost, not a coarse clock's steps, which pay
// themselves back), and the music re-anchoring again and again (its engine's resyncs: Ed's v2186 logs, 279 in 320 s, from
// before the clock was watched). `?audio=lite` starts at the last step, `?audio=full` turns the valve off (to compare).
// Ed's logs (2026-10-14, v3492-v3668: shed 1 at t=0 and shed 2 within seconds in nearly every run, the full mix gone for the
// night): the sound's own start (the music built, the device opened) is a one-off loss, not an audio thread that can't keep
// up, so the first `grace` seconds after play starts are let pass and a fresh baseline taken after; lost time counts only
// while it's still growing (a one-off step never sheds); and after `calm` seconds with no under-run, loss or re-anchoring it
// steps back up one (a wave landing's burst costs a minute, not the night; the voice line's effects stay as shed, VoiceFx).
export const SHED_MAX = 3;

export const SHED_STEPS = ["", "beds off", "single voices", "short reverb, no delay"];

export class ShedValve {
  level: number;
  /** Whether it may shed (not with ?audio=full). */
  readonly on: boolean;
  private hist: { t: number; u: number | null; drift: number; resyncs: number }[] = [];
  private lastAt = -Infinity;
  /** The level it never steps back up past (?audio=lite's). */
  private readonly floor: number;
  /** Till when the start is let pass (page seconds), and when it last heard trouble. */
  graceUntil = -Infinity;
  private troubleAt = -Infinity;

  constructor(mode: string | null = null, private window = 5, private gap = 6, private events = 3, private lostMs = 150, private resyncs = 3, private grace = 10, private calm = 60) {
    this.level = this.floor = mode === "lite" ? SHED_MAX : 0;
    this.on = mode !== "full";
  }

  /** Play starts (`t` the page's time, s): the next `grace` seconds aren't counted (the sound's own start). */
  begin(t: number): void { this.graceUntil = t + this.grace; this.hist = []; }

  /** Once a second: `t` the page's time (s), `underruns` the browser's cumulative count (null: it doesn't say), `drift` the
   *  audio clock against the page's since it started running (ms, negative behind), `resyncs` the music's re-anchorings so
   *  far (musicEngine.stats). Gives the reason when it sheds a step. */
  feed(t: number, underruns: number | null, drift: number, resyncs = 0): string | null {
    if (t < this.graceUntil) { this.hist = []; return null; } // (the start: a fresh baseline after it)
    const H = this.hist, p = H[H.length - 1];
    H.push({ t, u: underruns, drift, resyncs });
    while (H.length > 1 && H[0].t < t - this.window) H.shift();
    if (!this.on) return null;
    if (p && ((p.u !== null && underruns !== null && underruns > p.u) || p.drift - drift >= this.lostMs / this.window || resyncs > p.resyncs)) this.troubleAt = t;
    if (this.level > this.floor && t - Math.max(this.lastAt, this.troubleAt) >= this.calm) { // (calm again: a step back)
      this.level--; this.lastAt = t; this.hist = [H[H.length - 1]];
      return `unshed to ${this.level} (${SHED_STEPS[this.level] || "the full mix"}): ${this.calm} s calm`;
    }
    if (this.level >= SHED_MAX || t - this.lastAt < this.gap || H.length < 2) return null;
    const a = H[0], b = H[H.length - 1], b1 = H[Math.max(0, H.length - 2)], b2 = H[Math.max(0, H.length - 3)], perS = this.lostMs / this.window / 2;
    let why: string | null = null;
    if (a.u !== null && b.u !== null && b.u - a.u >= this.events) why = `${b.u - a.u} under-runs in ${Math.round(b.t - a.t)} s`;
    else if (a.drift - b.drift >= this.lostMs && b1.drift - b.drift >= perS && b2.drift - b1.drift >= perS) why = `audio fell ${Math.round(a.drift - b.drift)} ms behind in ${Math.round(b.t - a.t)} s`; // (and still falling, two seconds running: a one-off step isn't the thread failing to keep up)
    else if (b.resyncs - a.resyncs >= this.resyncs) why = `the music re-anchored ${b.resyncs - a.resyncs} times in ${Math.round(b.t - a.t)} s`;
    if (!why) return null;
    this.level++; this.lastAt = t; this.hist = [H[H.length - 1]];
    return `shed ${this.level} (${SHED_STEPS[this.level]}): ${why}`;
  }
}
