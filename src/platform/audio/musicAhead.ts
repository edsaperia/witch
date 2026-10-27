// The music drawn ahead (Ed, 2026-10-27, from his audio test: "render the music ahead, so main-thread stalls can't silence
// it"; docs/notes/music.md "Music ahead"): the engine's main notes drawn a bar at a time on an OfflineAudioContext (its notes
// queued on the page's thread in a few ms, rendered off it) into stems (musicEngine.ts MusicSink), and each bar queued on the
// audio clock seconds before it's heard, through the live engine's own buses (its reverbs, delay, low-pass, limiter, the voice
// line's effects, the knockdown's gate), its bus automation played on them as it's queued. A hitch on the page's thread then
// never reaches the beat, the bass or the melody: what's queued plays on. Live, as ever: the hooks' parts (a siege, a party
// area, an angry legend near: they answer the game at once), a legend's clearing layer, and the whole music while it can't be
// drawn ahead (the world slowed in the treehouse or a legend's clearing, the party's tape stopping, the FOF or tract singer,
// the pause page's Music Lab), from a bar line, back to ahead from a later one. `?music=live` the old way (app/sound.ts).
// What changes the bars to come (a wave, a section, the boot's layers, a knockdown, the style, the shed's level) drops those
// not yet heard, to be drawn again from the first.
import { timeAt, type BeatClock } from "../../rules/beat";
import { bootLayers, Conductor, formClock, type MusicCue } from "../../rules/musicPlan";
import { MusicEngine, type MusicSink } from "./musicEngine";

/** How far ahead (s) the bars are queued; the first drawn ahead begins at least START in (the live engine's own schedule
 *  ahead is up to 2 s after a hitch); TAIL: what rings past a bar (a note's release, the longest 1.4 s). */
const AHEAD = 6, START = 2.5, TAIL = 2.5;
/** Bars rendering at once, at most. */
const RENDERING = 2;

type Ev = { kind: "tone"; f0: number; f1: number; t: number; dur: number } | { kind: "duck"; t: number; depth: number; sps: number } | { kind: "gate"; open: boolean; t: number }
  | { kind: "fx"; part: string; fx: "pure" | "dark"; t: number } | { kind: "release"; part: string; t: number }
  | { kind: "swell"; part: string; rec: AudioBuffer; rate: number; t: number; swell: number; peak: number };

interface Bar {
  bar: number;
  /** Its music time (s: game time as the music has it) and length; its renderer (the next carries on from it). */
  g: number; dur: number; renderer: MusicEngine;
  /** What its notes hang on (sigOf): drawn again only if that changes. */
  sig: string;
  events: Ev[];
  state: "rendering" | "queued" | "dropped";
  src?: AudioBufferSourceNode;
  asked: number;
}

/** What of a cue the bars drawn ahead hang on (the hooks' levels and a legend's clearing are live's). */
const cueKey = (c: MusicCue): string => JSON.stringify({ ...c, siege: 0, party: 0, legend: 0, circle: undefined });
const styleIds = new WeakMap<object, number>();
let styleNext = 0;

export class MusicAhead {
  /** Bars drawn and how (the stall test and the playtest log read it): rendered, arrived too late to be heard whole, dropped
   *  (the music changed), the time rendering took in all (ms), how far ahead the queue reaches now (s). */
  readonly stats = { rendered: 0, late: 0, dropped: 0, renderMs: 0, queuedAhead: 0 };
  /** What of the cue changed, the last few times the bars were dropped (the playtest log's). */
  readonly changed: string[] = [];
  private lastCue: Record<string, unknown> = {};
  private bars = new Map<number, Bar>();
  private key = "";
  private on = false;
  private next = 0;
  private anchor = NaN;

  constructor(private engine: MusicEngine, private ctx: AudioContext) {
    // (the next night, the sail's or the bed's: its timeline anchored afresh, the old night's bars, queued or still rendering, let
    // go at once, not at the next frame: a sail plays none till it lands, and a bar arriving meanwhile had no time to start at)
    engine.onNewTimeline = () => this.stopAll();
  }

  /** Whether it's drawing ahead now. */
  get drawing(): boolean { return this.on; }

  /** Each frame, before the engine's: `allowed`, whether it may draw ahead now (the world at full speed, the voice a recording,
   *  no lab), the queue filled to AHEAD seconds. */
  update(cue: MusicCue, clock: BeatClock, playing: boolean, allowed: boolean): void {
    const E = this.engine, now = this.ctx.currentTime;
    if (!playing || !E.anchored) { this.stopAll(now); return; }
    if (!allowed) { this.handBack(now, clock); return; }
    // the timeline moved (a jump, a pause, a new run): everything queued is wrong; started afresh
    const anchor = E.anchorAt;
    if (this.on && Math.abs(anchor - this.anchor) > 0.002) this.stopAll(now);
    this.anchor = anchor;
    const k = `${cueKey(cue)}|${this.styleId()}|${E.seed}|${E.shed}`;
    if (this.on && k !== this.key) {
      // (the cue moves often, its boot's bar with the beat before the spell, say: only the bars whose notes it changes are dropped)
      let first = Infinity;
      for (const B of this.bars.values()) if (B.state !== "dropped" && E.audioAt(B.g) > now + 0.05 && B.sig !== this.sigOf(cue, B.bar)) first = Math.min(first, B.bar);
      if (Number.isFinite(first)) {
        const was = this.lastCue, why = Object.keys({ ...was, ...cue }).filter(f => !["siege", "party", "legend", "circle"].includes(f) && JSON.stringify(was[f]) !== JSON.stringify((cue as unknown as Record<string, unknown>)[f]));
        this.changed.push(why.join(",") || "style/seed/shed"); if (this.changed.length > 8) this.changed.shift();
        this.dropFrom(now, clock, first);
      }
    }
    this.key = k; this.lastCue = { ...cue } as unknown as Record<string, unknown>;
    if (!this.on) {
      // the first bar drawn ahead: far enough in for the live engine's schedule and its render; live plays till then
      let b = Math.ceil(this.barAt(E.musicTime(now), clock));
      while (E.audioAt(timeAt(clock, b * 4)) < now + START) b++;
      E.handoff = { from: Math.max(E.audioAt(timeAt(clock, b * 4)), Number.isFinite(E.handoff.to) ? E.handoff.to : -Infinity), to: Infinity };
      this.next = b; this.on = true; this.bars.clear();
    }
    let rendering = 0;
    for (const B of this.bars.values()) if (B.state === "rendering") rendering++;
    while (rendering < RENDERING && E.audioAt(timeAt(clock, this.next * 4)) < now + AHEAD) { this.render(this.next, cue, clock); this.next++; rendering++; }
    this.stats.queuedAhead = Math.max(0, E.audioAt(timeAt(clock, this.next * 4)) - now);
    for (const [b, B] of this.bars) if (B.state !== "rendering" && E.audioAt(B.g + B.dur) + TAIL < now) this.bars.delete(b); // (heard and rung out)
  }

  /** The game's beat moved on by `lost` seconds to where the music is (rules/beat.ts shiftBeat; the engine's shifted with it):
   *  the bars queued the same on the audio clock, their music times in the game's new reckoning. */
  shiftTime(lost: number): void {
    for (const B of this.bars.values()) B.g -= lost;
    if (this.on) this.anchor = this.engine.anchorAt;
  }

  /** The bar holding music time `g` (fractional). */
  private barAt(g: number, clock: BeatClock): number {
    let lo = Math.floor(g / 4) - 64, hi = lo + 256; // (a bar's at least 0.5 s: 4 beats at 480 bpm)
    while (timeAt(clock, lo * 4) > g) lo -= 64;
    while (timeAt(clock, hi * 4) <= g) hi += 64;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (timeAt(clock, m * 4) <= g) lo = m; else hi = m; }
    return lo + (g - timeAt(clock, lo * 4)) / Math.max(1e-6, timeAt(clock, (lo + 1) * 4) - timeAt(clock, lo * 4));
  }

  /** What bar `b`'s notes hang on in `cue`: its block's plan (and the next's, for a fill), the boot's layers over it, its form,
   *  a knockdown over it; the style, seed and shed in the key already. */
  private sigOf(cue: MusicCue, b: number): string {
    const S = this.engine.style, C = new Conductor(S);
    return JSON.stringify([C.plan(cue, b), (b + 1) % S.blockBars === 0 ? C.plan(cue, b + 1) : null, bootLayers(cue, b), bootLayers(cue, b + 1), formClock(S, cue, b), (cue.knockdowns ?? []).filter(k => k.at < b + 1 && Math.ceil(k.back - 1e-3) > b), cue.victory !== undefined && b >= cue.victory - (cue.victory % S.blockBars), cue.knockedOut]);
  }

  private styleId(): number {
    const s = this.engine.style as object;
    let id = styleIds.get(s);
    if (id === undefined) styleIds.set(s, id = ++styleNext);
    return id;
  }

  /** Bar `b` drawn: its notes queued on a renderer (carrying on from the bar before's), rendered off the page's thread. */
  private render(b: number, cue: MusicCue, clock: BeatClock): void {
    const E = this.engine, sr = this.ctx.sampleRate, g = timeAt(clock, b * 4), dur = timeAt(clock, (b + 1) * 4) - g;
    const oc = new OfflineAudioContext(9, Math.ceil(sr * (dur + TAIL)), sr), merge = oc.createChannelMerger(9);
    merge.connect(oc.destination);
    // the stems: the parts the kick ducks, the rest, the reverb's send and the delay's, a stereo pair each; the voice line, mono
    const pair = (i: number) => { const n = oc.createGain(), sp = oc.createChannelSplitter(2); n.channelCount = 2; n.channelCountMode = "explicit"; n.connect(sp); sp.connect(merge, 0, 2 * i); sp.connect(merge, 1, 2 * i + 1); return n; };
    const voice = oc.createGain(); voice.channelCount = 1; voice.channelCountMode = "explicit"; voice.connect(merge, 0, 8);
    const events: Ev[] = [];
    const sink: MusicSink = {
      duck: pair(0), dry: pair(1), reverb: pair(2), delay: pair(3), voice: () => voice,
      tone: (f0, f1, t, d) => events.push({ kind: "tone", f0, f1, t, dur: d }),
      duckAt: (t, depth, sps) => events.push({ kind: "duck", t, depth, sps }),
      gate: (open, t) => events.push({ kind: "gate", open, t }),
      fxChain: (part, fx, t) => events.push({ kind: "fx", part, fx, t }),
      fxRelease: (part, t) => events.push({ kind: "release", part, t }),
      fxSwell: (part, rec, rate, t, swell, peak) => events.push({ kind: "swell", part, rec, rate, t, swell, peak }),
    };
    const r = new MusicEngine(oc, oc.destination, E.style, E.seed, oc.destination, sink);
    r.setRecordings(E.recorded); r.shed = E.shed;
    const prev = this.bars.get(b - 1);
    if (prev && prev.state !== "dropped") r.carryFrom(prev.renderer, g - prev.g);
    r.renderAhead({ ...cue, siege: 0, party: 0, legend: 0, circle: undefined }, g, dur, clock);
    const B: Bar = { bar: b, g, dur, renderer: r, sig: this.sigOf(cue, b), events, state: "rendering", asked: performance.now() };
    this.bars.set(b, B);
    void oc.startRendering().then(buf => this.arrive(B, buf), () => { B.state = "dropped"; });
  }

  /** A bar rendered: queued on the audio clock through the live buses (if it's still wanted), its automation played on them. */
  private arrive(B: Bar, buf: AudioBuffer): void {
    this.stats.renderMs += performance.now() - B.asked;
    if (B.state === "dropped" || this.bars.get(B.bar) !== B) return;
    const E = this.engine, c = this.ctx, now = c.currentTime, at = E.audioAt(B.g);
    if (!Number.isFinite(at)) { B.state = "dropped"; return; } // (no timeline to place it on: never started at NaN)
    this.stats.rendered++;
    if (at < now) this.stats.late++;
    if (at + B.dur < now) { B.state = "dropped"; return; } // (the whole bar past: the hitch was longer than the queue)
    const bus = E.bus, sung = E.style.form?.sung.part, voiceIn = sung ? E.voiceIn(sung) : null;
    const src = c.createBufferSource(), sp = c.createChannelSplitter(9), nodes: AudioNode[] = [sp];
    src.buffer = buf; src.connect(sp);
    [bus.duck, bus.dry, bus.reverb, bus.delay].forEach((d, i) => { const m = c.createChannelMerger(2); sp.connect(m, 2 * i, 0); sp.connect(m, 2 * i + 1, 1); m.connect(d); nodes.push(m); });
    if (voiceIn) sp.connect(voiceIn, 8);
    src.onended = () => { for (const n of nodes) try { n.disconnect(); } catch { /* gone */ } };
    if (at >= now) src.start(at); else src.start(now, now - at);
    for (const e of B.events) {
      const t = at + e.t;
      if (e.kind === "tone") bus.tone(e.f0, e.f1, t, e.dur);
      else if (e.kind === "duck") { if (t >= now) bus.duckAt(t, e.depth, e.sps); }
      else if (e.kind === "gate") bus.gate(e.open, Math.max(now, t));
      else if (e.kind === "fx") bus.fxChain?.(e.part, e.fx, t);
      else if (e.kind === "release") bus.fxRelease?.(e.part, Math.max(now, t));
      else bus.fxSwell?.(e.part, e.rec, e.rate, t, e.swell, e.peak);
    }
    B.src = src; B.state = "queued";
  }

  /** The bars not yet heard (from `now`) dropped, to be drawn again from the first of them: the music they hang on changed. */
  private dropFrom(now: number, clock: BeatClock, from = -Infinity): void {
    const E = this.engine;
    let first = Infinity;
    for (const B of this.bars.values()) {
      if (B.state === "dropped" || B.bar < from || E.audioAt(B.g) <= now + 0.05) continue;
      first = Math.min(first, B.bar); B.state = "dropped"; this.stats.dropped++;
      try { B.src?.stop(); } catch { /* not started */ }
    }
    if (!Number.isFinite(first)) return;
    for (const [b, B] of this.bars) if (B.state === "dropped") this.bars.delete(b);
    const cut = E.audioAt(timeAt(clock, first * 4));
    if (Number.isFinite(cut)) E.cancelBusFrom(cut + 1e-4);
    this.next = first;
  }

  /** Back to live from a bar line far enough in for the live engine's schedule (the world slowing, a lab opened): the bars
   *  from there dropped, the engine playing everything from it. */
  private handBack(now: number, clock: BeatClock): void {
    if (!this.on) return;
    const E = this.engine;
    let b = Math.ceil(this.barAt(E.musicTime(now), clock));
    while (E.audioAt(timeAt(clock, b * 4)) < now + E.stats.ahead + 0.05) b++;
    const to = E.audioAt(timeAt(clock, b * 4));
    if (!Number.isFinite(to)) { this.stopAll(now); return; } // (no timeline: everything let go)
    for (const B of this.bars.values()) if (B.bar >= b && B.state !== "dropped") { B.state = "dropped"; try { B.src?.stop(); } catch { /* not started */ } }
    for (const [k, B] of this.bars) if (B.state === "dropped") this.bars.delete(k);
    E.cancelBusFrom(to + 1e-4);
    E.handoff = { from: E.handoff.from, to };
    this.on = false;
  }

  /** Everything queued stopped (a pause, a jump in time, a new run): the engine plays everything as ever. */
  stopAll(now = this.ctx.currentTime): void {
    if (!this.on && !this.bars.size) { this.engine.handoff = { from: Infinity, to: Infinity }; return; }
    for (const B of this.bars.values()) { B.state = "dropped"; try { B.src?.stop(now + 0.3); } catch { /* not started */ } }
    this.bars.clear();
    this.engine.cancelBusFrom(now);
    this.engine.handoff = { from: Infinity, to: Infinity };
    this.on = false;
  }
}
