// The Music Lab on the pause page (Ed, 2026-10-14: "a music lab on the pause page"; built from Kilo's mock, 2026-10-15): the
// live Music Lab's settings (tools/music-lab/live/settings.ts, the same JSON Ed copies out of music-lab.html) driving the
// night's own music as it plays, through the engine's hooks (setStyle, setVoiceFx, the channels' gains: India's, the engine
// untouched). This is the model: the state, what it makes of the night's style and cue, the levels on the engine's channels,
// the bedroom's preview with no night playing, and the settings remembered on this browser. The panel (ui/musicLabPanel.ts)
// is its DOM; app/sound.ts asks it each frame.
import { chainFx, defaultState, FX, heard, labParts, parseSettings, settingsJson, SUNG_PATCH, type Defaults, type Fx, type LabState, type Voice } from "../../tools/music-lab/live/settings";
import { arcStepOf, type NightSet } from "../rules/musicSet";
import { newBeatClock, type BeatClock } from "../rules/beat";
import type { MusicCue } from "../rules/musicPlan";
import type { MusicStyle, PartUse } from "../rules/musicScore";
import type { MusicEngine } from "../platform/audio/musicEngine";

const STORE = "witch.musicLab.pause";
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const useLevel = (u: PartUse) => (typeof u === "string" ? 1 : u.level ?? 1);

/** The engine's channels, as the live lab reaches them (tools/music-lab/live/player.ts): the engine's own, unchanged. */
type Hooked = { channels: Map<string, { in: GainNode }> };

export class MusicLab {
  state: LabState;
  readonly defaults: Defaults;
  /** The music's own parts in the lab's order, and the sung line's part. */
  readonly parts: string[];
  readonly sungPart: string | null;
  readonly sections: string[];
  readonly families: string[];
  /** The bedroom's preview (no night playing): its clock from the moment it started, or null. */
  private previewFrom: number | null = null;
  private previewClock: BeatClock | null = null;
  /** The levels' version (each change bumps it) and the channels already at it. */
  private levelsVersion = 1;
  private applied = new WeakMap<object, number>();
  /** The night's style last asked for, the settings it was made with, and what they made (the sound sets a new one from
   *  the next block, so a change that reshapes the style makes a new object and no change gives the same one). */
  private styledFor: { night: MusicStyle; key: string; out: MusicStyle } | null = null;
  private readonly freshKey: string;

  constructor(readonly base: MusicStyle) {
    const vic = base.victory ?? "victory", victoryDef = base.sections[vic];
    const fxOf = (c: object | undefined): Partial<Record<Fx, number>> => Object.fromEntries(Object.entries(c ?? {}).filter(([k, v]) => (FX as readonly string[]).includes(k) && typeof v === "number"));
    this.parts = labParts(base);
    this.sungPart = base.form?.sung.part ?? null;
    this.sections = Object.keys(base.sections).sort();
    this.families = Object.keys(base.families ?? {});
    this.defaults = {
      bpm: base.bpm, mode: base.scale, parts: this.parts,
      victory: { transpose: victoryDef?.transpose ?? 0, layers: Object.fromEntries(Object.entries(victoryDef?.parts ?? {}).map(([k, u]) => [k, useLevel(u as PartUse)])) },
      voiceFx: { pure: fxOf(base.voiceFx), dark: { ...fxOf(base.voiceFx), ...fxOf(base.voiceFxDark) } },
    };
    this.state = this.fresh();
    this.freshKey = this.styleKey();
    try { const t = localStorage.getItem(STORE); if (t) this.state = this.parse(t).state; } catch { /* none, or unreadable */ }
  }

  /** The settings as the game plays: nothing forced, the music following the game's own wave and section. */
  fresh(): LabState { return { ...defaultState(this.defaults), wave: 0, follow: true, record: "" }; }

  /** Pasted settings (the lab page's JSON, or this panel's): the state, and what was ignored. */
  parse(text: string): { state: LabState; ignored: string[] } {
    const r = parseSettings(text, this.defaults, this.sections);
    let raw: Record<string, unknown> = {};
    try { raw = JSON.parse(text.trim().replace(/^```(json)?|```$/g, "")) as Record<string, unknown>; } catch { /* parseSettings threw first */ }
    r.state.follow = !("passage" in raw);
    if (r.state.record && !this.families.includes(r.state.record)) { r.ignored.push("record"); r.state.record = ""; }
    return r;
  }

  /** What differs from the game, as JSON (the lab page's own text). */
  json(): string { return settingsJson(this.state, this.defaults); }
  /** The keys that differ from the game, in words. */
  differs(): string[] { return Object.keys(JSON.parse(this.json()) as object).filter(k => k !== "lab"); }

  save(): void { try { localStorage.setItem(STORE, this.json()); } catch { /* private window */ } }
  reset(): void { this.state = this.fresh(); this.changed(); }
  load(state: LabState): void { this.state = state; this.changed(); }

  /** After any change: saved, the levels marked (the style, if what makes it changed, is a new object at the next `styled`). */
  changed(): void { this.save(); this.levelsVersion++; }
  /** A voice effect's level moved: set live on the sung part (one turned on or off reshapes the chain: `changed`). */
  fxMoved(engine: MusicEngine | null | undefined): void { this.save(); engine?.setVoiceFx(this.state.voiceFx); }

  private styleKey(): string {
    const s = this.state;
    return JSON.stringify([s.mode, s.record, s.voice, s.fofChoir, s.breath, s.chain, s.arpeggio, FX.map(f => s.voiceFx[f] > 0)]);
  }

  /** The night's style with the settings on it (the same object while nothing changes, so the sound sets it once):
   *  the mode forced on every wave (the night's own at the style's dorian), a genre family forced on every wave (its sections,
   *  build and bass; the waves' own keys, leads and tunes kept), the singer's voice, breath and effects chain as the live lab
   *  applies them, the FOF choir, the constant-arpeggio test. */
  styled(night: MusicStyle, set: NightSet | null | undefined): MusicStyle {
    const key = this.styleKey();
    if (this.styledFor && this.styledFor.night === night && this.styledFor.key === key) return this.styledFor.out;
    const s = this.state, base = this.base;
    let st: MusicStyle = night;
    if (key !== this.freshKey) {
      st = clone(night);
      if (s.record && base.families?.[s.record] && set) st.arc = set.steps.map(step => arcStepOf(base, { ...step, family: s.record! }));
      if (s.mode !== base.scale) { st.scale = s.mode; st.arc = st.arc.map(a => ({ ...a, scale: s.mode })); }
      const sp = SUNG_PATCH[s.voice as Voice];
      if (sp && st.form && st.patches[sp]) { st.form = { ...st.form, sung: { ...st.form.sung, patch: sp } }; st.arc = st.arc.map(a => ({ ...a, vocal: sp })); }
      const sungPatch = st.form?.sung.patch;
      if (s.breath !== null && sungPatch && st.patches[sungPatch]) st.patches = { ...st.patches, [sungPatch]: { ...st.patches[sungPatch], breath: s.breath } };
      if (s.fofChoir && st.parts.choir && st.patches.fofChoir) st.parts = { ...st.parts, choir: { ...st.parts.choir, patch: "fofChoir" } };
      if (s.arpeggio && st.form) st.form = { ...st.form, sung: { ...st.form.sung, arpeggio: true } };
      st.voiceFx = { ...st.voiceFx, ...s.voiceFx };
      if (s.chain !== "auto") delete st.voiceFxDark;
    }
    this.styledFor = { night, key, out: st };
    return st;
  }

  /** The game's cue with the jump on it: the wave and section forced (the passage), or the game's own. */
  cued(cue: MusicCue): MusicCue {
    const s = this.state;
    if (this.previewFrom !== null) return { waves: Array.from({ length: Math.max(1, s.wave) }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: s.wave, forceSection: s.section || undefined };
    if (s.follow !== false) return cue;
    return { ...cue, forceWave: s.wave, forceSection: s.section || undefined };
  }

  /** Each frame: the parts' levels, mutes and solos on the engine's channels (new channels, or a change since; the sung
   *  line's level is the vocalise's). */
  frame(engine: MusicEngine, ctx: BaseAudioContext): void {
    const s = this.state, t = ctx.currentTime, v = this.levelsVersion;
    for (const [part, ch] of (engine as unknown as Hooked).channels) {
      if (part.startsWith("circle:") || this.applied.get(ch) === v) continue;
      this.applied.set(ch, v);
      const lvl = part === this.sungPart ? heard(s, "vocalise", s.layers.vocalise) : heard(s, part, s.parts[part] ?? 1);
      ch.in.gain.setTargetAtTime(lvl, t, 0.02);
    }
  }

  /** The bedroom's preview (Ed, 2026-10-15: "bedroom gets the ▶ Preview"): with no night playing the music runs on its own
   *  clock at the style's tempo from the moment it started, the passage above; off, the game's own. */
  get previewing(): boolean { return this.previewFrom !== null; }
  preview(on: boolean, now: number): void {
    if (on === (this.previewFrom !== null)) return;
    this.previewFrom = on ? now : null;
    this.previewClock = on ? newBeatClock(this.base.bpm) : null;
    if (on && this.state.follow !== false) { this.state.follow = false; this.state.wave = Math.max(0, this.state.wave); }
  }
  /** The preview's game time and beat clock now, or null. */
  previewTime(now: number): { time: number; clock: BeatClock } | null {
    return this.previewFrom === null || !this.previewClock ? null : { time: now - this.previewFrom, clock: this.previewClock };
  }

  /** The chain in force's own values for the effects' sliders (the lab's: pure, or dark forced). */
  chainFx(): Record<Fx, number> { return chainFx(this.defaults, this.state.chain); }
}
