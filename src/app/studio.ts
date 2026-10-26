// The treehouse Studio's instruments on the page (Ed, 2026-10-23; rules/studio.ts, config/studio.json, ui/studioPanel.ts): at an
// instrument (by nearness) every key plays it, and Esc (a gamepad's B) steps her away; the loop is the Studio's own, on the audio
// clock at its own tempo (the house's slowed time never touches it). Played on the game's own engine: one for the loop, the drum kit
// and the mic, one for the synth, whose output runs through its live controls (the arrows: the filter, a wobble, grit). Made at the
// first walk-up. Her notes sound exactly when pressed (Ed: never snapped to the loop).
import { MusicEngine } from "../platform/audio/musicEngine";
import { voiceRecordings } from "../platform/audio/voiceSamples";
import type { Game } from "../rules/game";
import type { MusicStyle, Patch } from "../rules/musicScore";
import { applyControl, controlFor, DRUM_KEYS, leaveInstrument, loopHits, newStudio, noteFor, PAD_DRUMS, PAD_LEAVE, PAD_NOTES, PAD_OCTAVE, padPatch, scaleNote, soundsOf, stepStudio, STUDIO_CONFIG as S, type Instrument, type Pad, type StudioState, type Vowel } from "../rules/studio";
import type { StudioPanel } from "../ui/studioPanel";

/** Keys never taken while she's at an instrument (the debug overlay, the browser's own). */
const PASS = new Set(["Backquote", "Tab", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "MetaLeft", "MetaRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight"]);
const ARROWS = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" } as const;

export class StudioPlayer {
  readonly state: StudioState = newStudio();
  private ctx: AudioContext | null = null;
  private main: MusicEngine | null = null;
  private synth: MusicEngine | null = null;
  private out: GainNode | null = null;
  /** What the Studio plays (its loop and instruments), for the tools' check. */
  meter: AnalyserNode | null = null;
  private perf: { filter: BiquadFilterNode; trem: GainNode; tremDepth: GainNode; dry: GainNode; wet: GainNode } | null = null;
  /** The live controls: the filter's cutoff (Hz), the wobble and grit (0-1), and which arrows are held. */
  private live = { cutoff: 3000, wobble: 0, grit: 0, held: new Set<string>() };
  /** Notes held, by key: what letting go releases. */
  private held = new Map<string, ((at: number) => void)[]>();
  private latched: ((at: number) => void)[] = [];
  private loopAt = 0; private loopStep = 0; private loopWas = false; private loopAhead = 0.2; private loopLast = 0;
  private pad: boolean[] = [];
  private style: MusicStyle;

  constructor(style: MusicStyle, private audio: () => AudioContext | null, private volume: () => number, private panel: StudioPanel) {
    this.style = { ...style, patches: { ...style.patches, ...(S.patches as unknown as Record<string, Patch>) } };
    addEventListener("keydown", e => this.key(e, true), { capture: true });
    addEventListener("keyup", e => this.key(e, false), { capture: true });
    panel.onPress = (what, down) => this.press(what, down);
    panel.onControl = c => this.control(c);
  }

  /** The instrument she's at now (null: none). */
  get at(): Instrument | null { return this.state.players[0].at; }

  /** A frame: where she is (the menu in or out; `use`, the house object E was pressed at, rules/studio.ts stepStudio), the loop
   *  scheduled ahead, the gamepad, the synth's live controls. */
  update(g: Game | null, active: boolean, dt: number, use: string | null = null): void {
    const P = this.state.players[0], was = P.at;
    if (g && active) stepStudio(this.state, g, g.tuning, 0, use); else { P.at = null; P.object = null; }
    if (P.at !== was) { this.releaseAll(); P.latch = false; this.panel.show(this.state); }
    if (P.at && !was && typeof navigator !== "undefined") this.pad = (navigator.getGamepads?.().find(p => p?.connected)?.buttons ?? []).map(b => b.pressed); // (the pad's use button that opened it is held, not a note)
    if (P.at && !this.main) this.make(); // (at the first walk-up; or once the context's made, at the first press)
    const ctx = this.ctx;
    if (!ctx || !this.main) return;
    this.out!.gain.setTargetAtTime(this.volume() * S.level, ctx.currentTime, 0.05);
    this.main.warmFx(); this.synth!.warmFx();
    this.loop(ctx);
    if (P.at) this.gamepad();
    // the synth's live controls, eased as the arrows are held
    const L = this.live, k = Math.min(1, dt * 3);
    if (L.held.has("up")) L.cutoff = Math.min(18000, L.cutoff * Math.pow(S.synth.perf.open, dt));
    if (L.held.has("down")) L.cutoff = Math.max(120, L.cutoff * Math.pow(S.synth.perf.close, dt));
    L.wobble += ((L.held.has("left") ? 1 : 0) - L.wobble) * k;
    L.grit += ((L.held.has("right") ? 1 : 0) - L.grit) * k;
    const p = this.perf!, t = ctx.currentTime;
    p.filter.frequency.setTargetAtTime(L.cutoff, t, 0.03);
    p.tremDepth.gain.setTargetAtTime(0.45 * L.wobble, t, 0.03); p.trem.gain.setTargetAtTime(1 - 0.45 * L.wobble, t, 0.03);
    p.wet.gain.setTargetAtTime(L.grit * S.synth.perf.grit, t, 0.03); p.dry.gain.setTargetAtTime(1 - 0.5 * L.grit, t, 0.03);
    this.panel.live(L.cutoff, L.wobble, L.grit);
  }

  /** The engines and the synth's live chain, made at the first walk-up (on the game's context). */
  private make(): void {
    if (this.main) return;
    const ctx = this.audio(); if (!ctx) return;
    this.ctx = ctx;
    this.out = ctx.createGain(); this.out.gain.value = 0; this.out.connect(ctx.destination);
    this.meter = ctx.createAnalyser(); this.meter.fftSize = 2048; this.out.connect(this.meter);
    this.main = new MusicEngine(ctx, this.out, this.style, 1);
    const filter = ctx.createBiquadFilter(), trem = ctx.createGain(), lfo = ctx.createOscillator(), tremDepth = ctx.createGain(), shaper = ctx.createWaveShaper(), dry = ctx.createGain(), wet = ctx.createGain(), into = ctx.createGain();
    filter.type = "lowpass"; filter.Q.value = 4; filter.frequency.value = this.live.cutoff;
    lfo.frequency.value = S.synth.perf.wobble; tremDepth.gain.value = 0; lfo.connect(tremDepth).connect(trem.gain); lfo.start();
    const curve = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = (i / 1023) * 2 - 1; curve[i] = Math.tanh(6 * x) / Math.tanh(6); }
    shaper.curve = curve; wet.gain.value = 0;
    into.connect(filter).connect(trem); trem.connect(dry).connect(this.out); trem.connect(shaper).connect(wet).connect(this.out);
    this.perf = { filter, trem, tremDepth, dry, wet };
    this.synth = new MusicEngine(ctx, into, this.style, 2);
    void voiceRecordings(ctx).then(r => this.main?.setRecordings(r));
  }

  // ---- input ----

  private key(e: KeyboardEvent, down: boolean): void {
    const P = this.state.players[0];
    if (!P.at || PASS.has(e.code) || e.metaKey || e.ctrlKey) return;
    if (down && (e.code === "Escape" || e.code === "KeyE")) { e.preventDefault(); e.stopImmediatePropagation(); if (!e.repeat) this.leave(); return; } // (E leaves, as it closes everything: Ed, 2026-10-26)
    if (e.code === "KeyE") { e.preventDefault(); e.stopImmediatePropagation(); return; } // (its key-up: not a note)
    e.preventDefault(); e.stopImmediatePropagation(); // (every other key is the instrument's, not the game's)
    if (down && e.repeat) return;
    const c = down ? controlFor(e.code) : null;
    if (c) { this.control(c); return; }
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") return;
    this.press(e.code, down, e.shiftKey);
  }

  /** A key, a pad or a note pressed or let go (the keyboard's, the gamepad's as `pad:<n>`, the menu's pointer). */
  private press(what: string, down: boolean, shift = false): void {
    const P = this.state.players[0], ctx = this.ctx, at = P.at;
    if (!at || !ctx || !this.main) return;
    const t = ctx.currentTime;
    if (at === "drums") {
      if (!down) return;
      const pad = what.startsWith("pad:") ? PAD_DRUMS[+what.slice(4)] : DRUM_KEYS[what];
      if (!pad) return;
      this.hit(pad, t); this.panel.flash(pad);
      return;
    }
    const arrow = ARROWS[what as keyof typeof ARROWS];
    if (arrow) {
      if (at === "synth") { if (down) this.live.held.add(arrow); else this.live.held.delete(arrow); }
      else if (down) { P.vowel = S.mic.vowels[arrow]; this.panel.show(this.state); }
      return;
    }
    if (what === "Space") {
      if (at === "synth" && down) { P.latch = !P.latch; if (!P.latch) { for (const r of this.latched) r(t); this.latched = []; } this.panel.show(this.state); }
      if (at === "mic") { this.harmony = down; this.panel.show(this.state); }
      return;
    }
    if (!down) {
      const rel = this.held.get(what); this.held.delete(what);
      if (rel) { if (at === "synth" && P.latch) this.latched.push(...rel); else for (const r of rel) r(t); }
      this.panel.flashNote(what, false);
      return;
    }
    if (this.held.has(what)) return;
    let midi: number | null;
    if (what.startsWith("pad:")) { const n = +what.slice(4); if (PAD_OCTAVE[n]) { P.octave = Math.max(-1, Math.min(1, P.octave + PAD_OCTAVE[n])); this.panel.show(this.state); return; } const deg = PAD_NOTES[n]; midi = deg === undefined ? null : scaleNote(S.root + 12 * P.octave, deg); }
    else midi = noteFor(what, shift, P.octave);
    if (midi === null) return;
    const rel = at === "synth" ? [this.synthNote(midi, t)] : this.sing(midi, t);
    this.held.set(what, rel);
    this.panel.flashNote(what, true);
  }
  private harmony = false;

  private hit(pad: Pad, t: number): void {
    const patch = padPatch(pad, this.state.players[0].sound.drums);
    this.main!.note(`drums|${patch}`, patch, null, 0.95, t, 0.5);
  }

  private synthNote(midi: number, t: number): (at: number) => void {
    const patch = soundsOf("synth")[this.state.players[0].sound.synth]?.id ?? "acid";
    return this.synth!.hold(`synth|${patch}`, patch, midi, 0.85, t);
  }

  /** A sung note, with its harmony (a third and a fifth up) while Space is held; the vowel the arrows chose. */
  private sing(midi: number, t: number): ((at: number) => void)[] {
    const P = this.state.players[0], voice = soundsOf("mic")[P.sound.mic]?.id ?? "altoSampled", base = this.style.patches[voice], v = P.vowel;
    if (!base) return [];
    // its vowel: a recorded voice's own (aa open, oo closed, an "l" onset for laa and loo), a synth voice's formant
    const patch: Patch = base.kind === "sample" ? { ...base, vowels: [v === "laa" ? "aa" : "oo"], onset: v === "laa" || v === "loo" ? "l" : undefined, presence: v === "mm" ? -8 : base.presence }
      : { ...base, cutoff: S.mic.formants[v] };
    const id = `studio:${voice}:${v}`;
    this.main!.style.patches[id] = patch;
    const notes = this.harmony ? [midi, scaleUp(midi, 2), scaleUp(midi, 4)] : [midi];
    // (the voice's effects are the sung part's: its hall)
    return notes.map((m, i) => this.main!.hold(i === 0 ? this.main!.style.form?.sung.part ?? "sung" : `mic|h${i}`, id, m, i === 0 ? 0.9 : 0.5, t));
  }

  private releaseAll(): void {
    const t = this.ctx?.currentTime ?? 0;
    for (const rel of this.held.values()) for (const r of rel) r(t);
    for (const r of this.latched) r(t);
    this.held.clear(); this.latched = []; this.live.held.clear(); this.harmony = false;
  }

  /** Esc at an instrument (a gamepad's B): she steps away. */
  leave(): void { leaveInstrument(this.state); this.releaseAll(); this.panel.show(this.state); }

  private gamepad(): void {
    const gp = navigator.getGamepads?.().find(p => p?.connected);
    if (!gp) return;
    gp.buttons.forEach((b, i) => {
      const on = b.pressed, was = this.pad[i] ?? false;
      this.pad[i] = on;
      if (on === was) return;
      if (PAD_LEAVE.includes(i)) { if (on) this.leave(); return; }
      if (i === 9) return; // (Start: the pause)
      this.press(`pad:${i}`, on);
    });
    if (this.at === "synth") { const y = gp.axes[1] ?? 0, x = gp.axes[2] ?? 0; if (Math.abs(y) > 0.2) this.live.cutoff = Math.max(120, Math.min(18000, this.live.cutoff * Math.pow(y < 0 ? 4 : 0.2, Math.abs(y) / 60))); this.live.wobble = Math.max(this.live.wobble, Math.abs(x) > 0.2 ? Math.abs(x) : 0); }
    if (this.at === "mic") { const x = gp.axes[0] ?? 0, y = gp.axes[1] ?? 0; if (Math.hypot(x, y) > 0.5) { const P = this.state.players[0], v: Vowel = Math.abs(x) > Math.abs(y) ? S.mic.vowels[x < 0 ? "left" : "right"] : S.mic.vowels[y < 0 ? "up" : "down"]; if (v !== P.vowel) { P.vowel = v; this.panel.show(this.state); } } }
  }

  /** The number row (or its buttons): the loop and her sound, the loop's change heard at once rather than at the next frame. */
  private control(c: NonNullable<ReturnType<typeof controlFor>>): void {
    applyControl(this.state, c); this.panel.show(this.state);
    if (this.ctx && this.main) this.loop(this.ctx);
  }

  // ---- the loop ----

  /** The loop's sixteenths scheduled ahead on the audio clock, at its own tempo, while anyone's at an instrument; started on its first
   *  bar. A fifth of a second ahead, further after a long frame (up to 2 s, easing back), so a stall doesn't drop its beats (as the
   *  music engine's `maxAhead`); a stall longer than that skips the steps it missed rather than playing them late in a burst. */
  private loop(ctx: AudioContext): void {
    const L = this.state.loop, now = ctx.currentTime, six = 60 / L.bpm / 4, gap = now - this.loopLast;
    this.loopLast = now;
    this.loopAhead = Math.min(2, Math.max(0.2, gap * 1.5, this.loopAhead - 0.5 * gap));
    if (!L.on || !this.state.players.some(p => p.at)) { this.loopWas = false; return; } // (on, it plays while someone's at an instrument)
    if (!this.loopWas) { this.loopWas = true; this.loopAt = now + 0.08; this.loopStep = 0; } // (a new tempo from the next sixteenth: each step its own length)
    if (this.loopAt < now) { const n = Math.ceil((now - this.loopAt) / six); this.loopAt += n * six; this.loopStep += n; }
    while (this.loopAt < now + this.loopAhead) {
      for (const h of loopHits(L.style, this.loopStep)) this.main!.note(`loop|${h.patch}`, h.patch, h.midi, h.vel * S.loop.level, this.loopAt, h.steps * six);
      this.panel.beat(this.loopStep % 16, this.loopAt - now);
      this.loopStep++; this.loopAt += six;
    }
  }
}

/** `n` steps up the scale from `midi` (a note on the scale). */
function scaleUp(midi: number, n: number): number {
  for (let d = -21; d < 21; d++) if (scaleNote(S.root, d) === midi) return scaleNote(S.root, d + n);
  return midi + (n === 2 ? 3 : 7);
}

