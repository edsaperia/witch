// The measured output (Ed, round 16: "Is there a way for the game to know if anything is being sent to the speakers or
// not?"): what actually leaves the game for the speakers, measured, beside the music engine's own account of what it
// scheduled (musicEngine.stats). An analyser taps every node that reaches the context's destination (the music's
// master, the legend circle's layer, the sound effects' limiter: summed, as the destination sums them) and, a few
// times a second, reads the level of what played since the last read. Silence while the mix says the music should be
// heard is an episode: over MIN_EPISODE seconds, it goes in the playtest log (L) with where she was and the nearest
// stall. It also watches the context: its state, its latencies, and its clock against the page's (a stalled audio
// thread). It measures what the game hands the browser: it can't see the device's volume, the OS mixer or whether
// speakers are plugged in.
//
// The mic check (Ed: "I could play sound out loud, and the game could listen to the microphone while I play
// perhaps?"; debug only, ?micCheck=1): the game's output and the microphone (no echo cancelling, noise suppression or
// gain control, so the browser doesn't cancel the game out) side by side in short blocks on the audio thread, their
// envelopes compared with a lag search of 0 to MAX_LAG seconds for the device's latency. A drop to room level that
// the output doesn't have is a dropout after the game (the OS, the device, Bluetooth); the output silent while the mic
// hears it loud is the sanity check the other way. Nothing is recorded or kept but the levels.
// Browser-side, outside the rules; the trackers below are pure, for the tests.

/** Below this the output counts as silent (dBFS). */
export const SILENT_DB = -60;
/** The shortest silence (or mic episode) worth logging (s). */
export const MIN_EPISODE = 0.3;
/** The device latency the mic check allows for (s). */
export const MAX_LAG = 0.3;

export const dbfs = (rms: number): number => (rms > 1e-10 ? 20 * Math.log10(rms) : -200);

export interface SilenceEpisode { /** When it started and how long it lasted (s, the tracker's clock). */ start: number; dur: number }

/** Silence while the music should be heard, as episodes: fed each read with the time, the level and whether it's expected. */
export class SilenceTracker {
  private from = -1;
  private last = -1;
  constructor(private threshold = SILENT_DB, private min = MIN_EPISODE) {}
  /** How long the output has been silent while expected, now (0 if not). */
  silentFor(t: number): number { return this.from < 0 ? 0 : t - this.from; }
  /** One read: the level at t; an episode once it ends, if long enough. */
  feed(t: number, db: number, expected: boolean): SilenceEpisode | null {
    const silent = expected && db < this.threshold;
    let done: SilenceEpisode | null = null;
    // (each read measures what played since the one before, as far back as the analyser holds: a silence runs from the
    // last loud read to the last silent one)
    if (silent && this.from < 0) this.from = this.last >= 0 ? Math.max(this.last, t - 0.3) : t;
    else if (!silent && this.from >= 0) {
      if (this.last - this.from >= this.min) done = { start: this.from, dur: this.last - this.from };
      this.from = -1;
    }
    this.last = t;
    return done;
  }
}

/** The lag (in blocks, 0 to maxLag) at which the mic's envelope best follows the output's, and how well (Pearson r). */
export function envelopeLag(out: ArrayLike<number>, mic: ArrayLike<number>, maxLag: number): { lag: number; corr: number } {
  const n = Math.min(out.length, mic.length);
  let best = { lag: 0, corr: -1 };
  for (let L = 0; L <= maxLag; L++) {
    const m = n - L;
    if (m < 8) break;
    let sa = 0, sb = 0;
    for (let i = 0; i < m; i++) { sa += out[i]; sb += mic[i + L]; }
    const ma = sa / m, mb = sb / m;
    let ab = 0, aa = 0, bb = 0;
    for (let i = 0; i < m; i++) { const a = out[i] - ma, b = mic[i + L] - mb; ab += a * b; aa += a * a; bb += b * b; }
    const r = aa > 1e-9 && bb > 1e-9 ? ab / Math.sqrt(aa * bb) : 0;
    if (r > best.corr) best = { lag: L, corr: r };
  }
  return best;
}

export interface MicEpisode { kind: "dropout" | "unheard"; /** Its start (s, the tracker's clock) and length. */ start: number; dur: number; outDb: number; micDb: number; lag: number }

/** The mic check's judge: fed the output's and the mic's level (dB) block by block, finds dropouts after the game. */
export class MicJudge {
  /** The room's level: drops fast to the quietest the mic hears, creeps up slowly (dB). */
  floor = Infinity;
  /** The mic's level while the output is clearly audible (dB, eased). */
  heard = -Infinity;
  lag = 3;
  corr = 0;
  private outs: number[] = [];
  private mics: number[] = [];
  private run: { kind: MicEpisode["kind"]; start: number; n: number; out: number; mic: number } | null = null;
  constructor(private block: number, private audibleDb = -40) {}
  /** The envelopes kept for the lag search (dB, oldest first). */
  get envelopes(): { out: number[]; mic: number[] } { return { out: this.outs, mic: this.mics }; }
  /** Search the lag again (every half second or so). */
  relag(): void {
    const max = Math.round(MAX_LAG / this.block), r = envelopeLag(this.outs, this.mics, max);
    this.corr = r.corr;
    if (r.corr > 0.4) this.lag = r.lag;
  }
  /** One block at time t: its output and mic levels (dB). An episode once it ends, if long enough. */
  feed(t: number, outDb: number, micDb: number): MicEpisode | null {
    const keep = Math.ceil(2.5 / this.block);
    this.outs.push(outDb); this.mics.push(micDb);
    if (this.outs.length > keep) { this.outs.shift(); this.mics.shift(); }
    if (micDb > -150) this.floor = Math.min(micDb, this.floor === Infinity ? micDb : this.floor + 0.1 * this.block); // (0.1 dB a second up; digital zero is no microphone, not a room)
    const o = this.outs.length - 1 - this.lag, outThen = o >= 0 ? this.outs[o] : outDb; // (what the mic should be hearing now)
    if (outThen > this.audibleDb) this.heard = this.heard === -Infinity ? micDb : this.heard + (micDb - this.heard) * Math.min(1, this.block / 2);
    const clear = this.heard - this.floor > 12; // (the speakers clearly above the room: otherwise we can't tell)
    const kind: MicEpisode["kind"] | null =
      clear && outThen > this.audibleDb && micDb < this.floor + 6 ? "dropout"
      : outDb < SILENT_DB && outThen < SILENT_DB && micDb > this.floor + 15 && this.heard > -Infinity ? "unheard" : null;
    let done: MicEpisode | null = null;
    if (this.run && this.run.kind !== kind) {
      const dur = this.run.n * this.block;
      if (dur >= MIN_EPISODE) done = { kind: this.run.kind, start: this.run.start, dur, outDb: Math.round(this.run.out / this.run.n), micDb: Math.round(this.run.mic / this.run.n), lag: this.lag * this.block };
      this.run = null;
    }
    if (kind) { this.run ??= { kind, start: t, n: 0, out: 0, mic: 0 }; this.run.n++; this.run.out += outThen; this.run.mic += micDb; }
    return done;
  }
}

/** Something that reaches the destination, tapped (never altered). */
interface Tapped { node: AudioNode }

export interface MeterReading {
  /** The output's level over the last read (dBFS, rms and peak). */
  db: number;
  peak: number;
  state: string;
  /** The context's latencies (ms). */
  base: number;
  out: number;
  /** The context's clock against the page's over the last second (1: in step; under 1: the audio thread stalled). */
  clock: number;
  /** Silent while expected, now (s). */
  silentFor: number;
}

/** The output analyser and the context's health: read() from the frame, a few times a second. */
export class OutputMeter {
  private an: AnalyserNode | null = null;
  private buf: Float32Array<ArrayBuffer> | null = null;
  private taps: Tapped[] = [];
  private ctx: AudioContext | null = null;
  private lastRead = -1;
  private clockAt = { wall: -1, ctx: 0 };
  private silence = new SilenceTracker();
  readonly reading: MeterReading = { db: -200, peak: -200, state: "none", base: 0, out: 0, clock: 1, silentFor: 0 };
  /** Episodes of silence while expected, and of the audio clock stalling, so far. */
  silences = 0;
  clockStalls = 0;
  /** The mic check, when on (?micCheck=1). */
  mic: MicCheck | null = null;
  /** Called with each silence episode (s on the page clock). */
  onSilence: ((e: SilenceEpisode & { db: number }) => void) | null = null;

  /** The nodes that reach the destination now (the music and sound effects are rebuilt now and then: re-tapped). */
  tap(ctx: AudioContext | null, nodes: (AudioNode | null | undefined)[]): void {
    if (!ctx) return;
    if (ctx !== this.ctx) { this.ctx = ctx; this.an = ctx.createAnalyser(); this.an.fftSize = 16384; this.buf = new Float32Array(this.an.fftSize); this.taps = []; }
    const want = nodes.filter((n): n is AudioNode => !!n);
    if (want.length === this.taps.length && want.every((n, i) => this.taps[i].node === n)) return;
    for (const t of this.taps) if (!want.includes(t.node)) try { t.node.disconnect(this.an!); } catch { /* gone */ }
    for (const n of want) if (!this.taps.some(t => t.node === n)) n.connect(this.an!);
    this.taps = want.map(node => ({ node }));
    this.mic?.retap(want);
  }

  /** A read (at most every `every` seconds): `expected` is whether the music should be heard now. */
  read(nowMs: number, expected: boolean, every = 0.1): MeterReading {
    const r = this.reading, ctx = this.ctx, t = nowMs / 1000;
    if (!ctx || !this.an || !this.buf) return r;
    if (this.lastRead >= 0 && t - this.lastRead < every) return r;
    const since = this.lastRead < 0 ? every : t - this.lastRead;
    this.lastRead = t;
    r.state = ctx.state;
    r.base = Math.round((ctx.baseLatency ?? 0) * 1000);
    r.out = Math.round(((ctx as AudioContext & { outputLatency?: number }).outputLatency ?? 0) * 1000);
    // the context's clock against the page's, a second at a time
    if (this.clockAt.wall < 0 || ctx.state !== "running") this.clockAt = { wall: t, ctx: ctx.currentTime };
    else if (t - this.clockAt.wall >= 1) {
      r.clock = Math.round(((ctx.currentTime - this.clockAt.ctx) / (t - this.clockAt.wall)) * 100) / 100;
      if (r.clock < 0.8) this.clockStalls++;
      this.clockAt = { wall: t, ctx: ctx.currentTime };
    }
    // what played since the last read (as much of it as the analyser holds)
    this.an.getFloatTimeDomainData(this.buf);
    const n = Math.max(256, Math.min(this.buf.length, Math.round(since * ctx.sampleRate)));
    let e = 0, p = 0;
    for (let i = this.buf.length - n; i < this.buf.length; i++) { const v = this.buf[i]; e += v * v; if (Math.abs(v) > p) p = Math.abs(v); }
    r.db = Math.round(dbfs(Math.sqrt(e / n)) * 10) / 10;
    r.peak = Math.round(dbfs(p) * 10) / 10;
    const ep = this.silence.feed(t, ctx.state === "running" ? r.db : -200, expected);
    r.silentFor = this.silence.silentFor(t);
    if (ep) { this.silences++; this.onSilence?.({ ...ep, db: r.db }); }
    this.mic?.judge();
    return r;
  }

  /** The debug overlay's line. */
  line(): string {
    const r = this.reading, m = this.mic;
    return `audio  out ${r.db <= -199 ? "-inf" : r.db.toFixed(0)} dBFS (peak ${r.peak <= -199 ? "-inf" : r.peak.toFixed(0)})  ${r.state}  lat ${r.base}+${r.out} ms  clock ${r.clock.toFixed(2)}`
      + (r.silentFor > 0 ? `  SILENT ${r.silentFor.toFixed(1)} s` : "") + `  silences ${this.silences}`
      + (this.clockStalls ? `  clock stalls ${this.clockStalls}` : "")
      + (m ? `\nmic    ${m.status}` : "");
  }

  /** Start the mic check (?micCheck=1): asks for the microphone once. */
  startMic(onEpisode: (e: MicEpisode) => void): void {
    if (this.mic || !this.ctx) return;
    this.mic = new MicCheck(this.ctx, onEpisode);
    this.mic.retap(this.taps.map(t => t.node));
  }
}

/** The mic check: the game's output and the microphone, block by block on the audio thread, judged on the page's. */
export class MicCheck {
  status = "asking for the microphone…";
  private judgeOf: MicJudge;
  private outMono: GainNode;
  private proc: ScriptProcessorNode;
  private blocks: [number, number][] = [];
  private t = 0;
  private lastLag = 0;
  private taps: AudioNode[] = [];
  private live = false;
  episodes = 0;
  constructor(private ctx: AudioContext, private onEpisode: (e: MicEpisode) => void) {
    const size = 1024;
    this.judgeOf = new MicJudge(size / ctx.sampleRate);
    // the output, mixed down to one channel, and the mic: side by side into one processor (one clock for both)
    const mono = (): GainNode => { const g = ctx.createGain(); g.channelCount = 1; g.channelCountMode = "explicit"; g.channelInterpretation = "speakers"; return g; };
    this.outMono = mono();
    const merge = ctx.createChannelMerger(2);
    this.outMono.connect(merge, 0, 0);
    this.proc = ctx.createScriptProcessor(size, 2, 1);
    merge.connect(this.proc);
    const silent = ctx.createGain(); silent.gain.value = 0; // (a processor runs only when it's connected on)
    this.proc.connect(silent); silent.connect(ctx.destination);
    this.proc.onaudioprocess = ev => {
      if (!this.live) return; // (nothing to judge till the microphone is there)
      const a = ev.inputBuffer.getChannelData(0), b = ev.inputBuffer.getChannelData(1);
      let ea = 0, eb = 0;
      for (let i = 0; i < a.length; i++) { ea += a[i] * a[i]; eb += b[i] * b[i]; }
      this.blocks.push([dbfs(Math.sqrt(ea / a.length)), dbfs(Math.sqrt(eb / b.length))]);
      if (this.blocks.length > 512) this.blocks.shift();
    };
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } })
      .then(stream => { const src = ctx.createMediaStreamSource(stream), m = mono(); src.connect(m); m.connect(merge, 0, 1); this.live = true; this.status = "listening"; })
      .catch(e => { this.status = `no microphone (${(e as Error).name})`; });
  }
  retap(nodes: AudioNode[]): void {
    for (const n of this.taps) if (!nodes.includes(n)) try { n.disconnect(this.outMono); } catch { /* gone */ }
    for (const n of nodes) if (!this.taps.includes(n)) n.connect(this.outMono);
    this.taps = nodes.slice();
  }
  /** The blocks since the last call, judged (from the meter's read). */
  judge(): void {
    const J = this.judgeOf, block = 1024 / this.ctx.sampleRate;
    for (const [o, m] of this.blocks.splice(0)) {
      const ep = J.feed(this.t, o, m);
      this.t += block;
      if (ep) { this.episodes++; this.onEpisode(ep); }
    }
    if (this.t - this.lastLag >= 0.5) { this.lastLag = this.t; J.relag(); }
    if (this.status === "listening" || this.status.startsWith("mic")) {
      const env = J.envelopes, mic = env.mic.length ? env.mic[env.mic.length - 1] : -200;
      this.status = `mic ${mic.toFixed(0)} dB  room ${Number.isFinite(J.floor) ? J.floor.toFixed(0) : "?"}  corr ${J.corr.toFixed(2)}  lag ${Math.round(J.lag * block * 1000)} ms  episodes ${this.episodes}`;
    }
  }
}
