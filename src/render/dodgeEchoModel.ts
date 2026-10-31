/** Drawing-only pose history. Blink movement stays instantaneous; no poses or positions are invented in its hidden gap. */
export const ECHO_LIMIT = 3;
export const ECHO_SECONDS = 0.32;
const HISTORY_LIMIT = 12, HISTORY_SECONDS = 0.5, SAMPLE_SECONDS = 0.04, SPACING = 0.65;

export interface EchoPose<P> { x: number; y: number; z: number; pose: P }
interface Sample<P> extends EchoPose<P> { at: number }
export interface Echo<P> extends EchoPose<P> { born: number; alpha: number }
export interface EchoDash { at: number; until: number }

export class DodgeEchoHistory<P> {
  private history: Sample<P>[] = [];
  private echoes: Echo<P>[] = [];
  private world: object | null = null;
  private appearance: object | null = null;
  private time = -Infinity;
  private dash = -Infinity;
  private arrival: number | null = null;

  constructor(private clone: (pose: P) => P) {}
  reset(): void { this.history.length = 0; this.echoes.length = 0; this.world = this.appearance = null; this.time = -Infinity; this.dash = -Infinity; this.arrival = null; }

  update(world: object, appearance: object, time: number, dash: EchoDash, visible: EchoPose<P> | null, enabled: boolean): readonly Echo<P>[] {
    const epoch = world !== this.world || time < this.time;
    if (epoch) { this.reset(); this.dash = dash.at; }
    if (appearance !== this.appearance) { this.history.length = 0; this.echoes.length = 0; this.arrival = null; }
    this.world = world; this.appearance = appearance; this.time = time;
    this.history = this.history.filter(p => time - p.at <= HISTORY_SECONDS);
    this.echoes = this.echoes.filter(e => time >= e.born && time - e.born < ECHO_SECONDS);
    // Detect before capturing this frame: the first post-blink pose is not a departure pose.
    if (Number.isFinite(dash.at) && dash.at <= time && dash.at !== this.dash) {
      this.dash = dash.at; this.arrival = time - dash.at < ECHO_SECONDS ? dash.at : null;
      if (enabled && this.arrival !== null) {
        let last: Sample<P> | null = null, count = 0;
        for (let i = this.history.length - 1; i >= 0 && count < ECHO_LIMIT - 1; i--) {
          const p = this.history[i];
          if (p.at > dash.at || last && Math.hypot(p.x - last.x, p.z - last.z) < SPACING) continue;
          this.add(p, dash.at); last = p; count++;
        }
      }
    }
    if (this.arrival !== null && time - this.arrival >= ECHO_SECONDS) this.arrival = null;
    if (visible) {
      if (this.arrival !== null && time >= dash.until) {
        if (enabled) this.add(visible, this.arrival);
        this.arrival = null;
      }
      const last = this.history.at(-1);
      if (!last || time - last.at >= SAMPLE_SECONDS) {
        if (this.history.length >= HISTORY_LIMIT) this.history.shift();
        this.history.push({ ...visible, pose: this.clone(visible.pose), at: time });
      }
    }
    if (!enabled) { this.echoes.length = 0; this.arrival = null; return this.echoes; }
    for (const e of this.echoes) e.alpha = 0.24 * (1 - (time - e.born) / ECHO_SECONDS) ** 2;
    return this.echoes;
  }

  private add(p: EchoPose<P>, born: number): void {
    if (this.echoes.length >= ECHO_LIMIT) this.echoes.shift();
    this.echoes.push({ x: p.x, y: p.y, z: p.z, pose: this.clone(p.pose), born, alpha: 0.24 });
  }
}
