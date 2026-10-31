/** Coast compilation starts only on demand; the simple surface persists through linking and a visible fade. */
export class CoastReadiness {
  requested = false;
  linked = false;
  share = 0;
  fallbackMs = 0;
  private launched = false;
  private last: number | null = null;
  private fadeMs = 0;
  private fallbackShown = false;
  request(on: boolean, now: number): void { this.requested = on; this.last = on ? now : null; }
  launch(): boolean { if (!this.requested || this.launched) return false; this.launched = true; return true; }
  frame(now: number): number {
    if (!this.requested) return this.share;
    const dt = this.last === null ? 0 : Math.max(0, now - this.last); this.last = now;
    if (this.linked && !this.fallbackShown) { this.share = 1; return this.share; }
    if (!this.linked) this.fallbackShown = true;
    if (this.share < 1) this.fallbackMs += dt;
    if (this.linked) { this.fadeMs += Math.min(50, dt); this.share = Math.min(1, this.fadeMs / 800); }
    return this.share;
  }
}
