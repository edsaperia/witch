// The audio watchdog (Ed, round 13: "the music stops after about two minutes ... it crackles a
// little and then goes quiet"): once a second it looks at the sound as it leaves for the speakers,
// and mends what has gone wrong rather than leave the run silent:
//  - the context suspended or interrupted (the browser, a device change) while the game plays:
//    resumed, at once on its statechange and again each second until it runs;
//  - the music's output silent while it should be heard (its volume up, the game playing) for
//    `quietFor` seconds, or anything non-finite in it (a filter blown up, a limiter latched on a
//    NaN): the music rebuilt afresh;
//  - anything non-finite in the sound effects' output: the sound effects rebuilt afresh.
// Each mend is reported (the playtest log keeps them: L saves it). Browser-side, outside the rules.
export interface AudioTap {
  /** The node whose output reaches the speakers (tapped, never altered). */
  readonly output: AudioNode;
}

/** What the watchdog looks at: the context, and the music and sound effects as they are now. */
export interface WatchedAudio {
  ctx: AudioContext | null;
  music: AudioTap | null;
  sfx: AudioTap | null;
  /** Whether the music should be heard now (the game playing, its volume up). */
  musicExpected: boolean;
  /** Whether sound should be running at all (the game started and not frozen). */
  wanted: boolean;
}

export type AudioMend = "resumed" | "music-silent" | "music-nonfinite" | "sfx-nonfinite";

interface Probe { node: AudioNode; an: AnalyserNode; buf: Float32Array<ArrayBuffer> }

export class AudioWatchdog {
  private probes = new Map<"music" | "sfx", Probe>();
  private quiet = 0;
  private hooked: AudioContext | null = null;
  /** Mends so far (for the debug overlay and the live check). */
  readonly mends: { at: number; what: AudioMend }[] = [];

  constructor(
    private watch: () => WatchedAudio,
    private mend: (what: AudioMend) => void,
    private quietFor = 3,
  ) {}

  /** Once a second (any more often is wasted). */
  check(): void {
    const w = this.watch(), ctx = w.ctx;
    if (!ctx) return;
    if (this.hooked !== ctx) {
      this.hooked = ctx;
      ctx.addEventListener("statechange", () => { const n = this.watch(); if (n.wanted && n.ctx === ctx && ctx.state !== "running") this.fix("resumed", () => void ctx.resume().catch(() => {})); });
    }
    if (!w.wanted) { this.quiet = 0; return; }
    if (ctx.state !== "running") { this.fix("resumed", () => void ctx.resume().catch(() => {})); return; }
    const m = this.read("music", ctx, w.music), s = this.read("sfx", ctx, w.sfx);
    if (s && !s.finite) this.fix("sfx-nonfinite");
    if (m && !m.finite) { this.quiet = 0; this.fix("music-nonfinite"); return; }
    this.quiet = m && w.musicExpected && m.rms < 1e-6 ? this.quiet + 1 : 0;
    if (this.quiet >= this.quietFor) { this.quiet = 0; this.fix("music-silent"); }
  }

  private fix(what: AudioMend, then?: () => void): void {
    this.mends.push({ at: this.hooked?.currentTime ?? 0, what });
    if (this.mends.length > 50) this.mends.shift();
    then?.();
    this.mend(what);
  }

  /** The tapped output's rms over the last analyser frame, and whether every sample is finite. */
  private read(key: "music" | "sfx", ctx: AudioContext, tap: AudioTap | null): { rms: number; finite: boolean } | null {
    let p = this.probes.get(key);
    if (!tap) { if (p) { try { p.node.disconnect(p.an); } catch { /* gone */ } this.probes.delete(key); } return null; }
    if (!p || p.node !== tap.output) {
      if (p) try { p.node.disconnect(p.an); } catch { /* gone */ }
      const an = ctx.createAnalyser();
      an.fftSize = 2048;
      tap.output.connect(an);
      p = { node: tap.output, an, buf: new Float32Array(an.fftSize) };
      this.probes.set(key, p);
      return null; // (its first frame next time)
    }
    p.an.getFloatTimeDomainData(p.buf);
    let sq = 0, finite = true;
    for (const x of p.buf) { if (!Number.isFinite(x)) { finite = false; break; } sq += x * x; }
    return { rms: finite ? Math.sqrt(sq / p.buf.length) : 0, finite };
  }
}
