// The singer's tuning check (Ed's singer review, 2026-10-14, docs/backlog/music.md "The singer, and the music round it"):
// the game's own engine renders the sung line alone (the recorded voice, as the game plays it) over a breakdown, offline, and
// reports every sung note it scheduled, so Node can pitch-track the render and compare (tools/music-lab/tune.cjs). Lab-only.
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { tractReady } from "../../src/platform/audio/tract/tract";
import { newBeatClock } from "../../src/rules/beat";
import type { MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle, NoteEvent } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const RATE = 44100;
const base = styleJson as unknown as MusicStyle;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

export interface TuneOptions {
  wave: number; seed: number; bars: number;
  /** The section to loop (a breakdown: the voice sings there). */
  section: string;
  /** The voice effects on (the style's chain) or off (dry: what the tracker measures against the notes). */
  fx: boolean;
  /** The breakdown's wash (the doubling voices) kept; off for the tracker, which wants one voice. */
  wash: boolean;
  /** Base64 Ogg recordings by id (samples/voices, samples/alto). */
  samples: Record<string, string>;
  /** The sung patch to render (the game's recordedVoice; altoSampled, the sample set; altoTract, the vocal-tract worklet). */
  voice?: string;
}

const b64 = (s: string) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };

async function tuneRender(o: TuneOptions) {
  const style = clone(base);
  if (!o.fx) { style.voiceFx = { chorus: 0, saturation: 0, air: 0, delay: 0, hall: 0, shimmer: 0, duck: 0, swells: 0, freeze: 0, whisper: 0, octave: 0 }; delete style.voiceFxDark; }
  if (!o.wash) delete style.form!.sung.wash;
  if (o.voice && style.patches[o.voice]) style.form!.sung.patch = o.voice;
  const spb = 60 / style.bpm / 4, seconds = o.bars * 16 * spb + 2;
  const oc = new OfflineAudioContext(1, Math.ceil(seconds * RATE), RATE);
  const samples: Record<string, AudioBuffer> = {};
  for (const [id, data] of Object.entries(o.samples)) samples[id] = await oc.decodeAudioData(b64(data));
  if (style.patches[style.form!.sung.patch]?.kind === "tract" && !(await tractReady(oc))) throw new Error("the vocal-tract worklet didn't load");
  const e = new MusicEngine(oc, oc.destination, style, o.seed), sung = style.form!.sung.part;
  e.solo = new Set([sung]);
  e.setRecordings(samples); if (samples.whispers) e.setWhisper(samples.whispers);
  const notes: { at: number; dur: number; midi: number; double: boolean }[] = [];
  const play = (e as unknown as { play: (ev: NoteEvent, t: number, dur: number, sps: number, chord?: number[]) => void }).play.bind(e);
  (e as unknown as { play: typeof play }).play = (ev, t, dur, sps, chord) => {
    if (ev.part === sung && ev.midi !== null) notes.push({ at: t, dur, midi: ev.midi, double: !!ev.double });
    play(ev, t, dur, sps, chord);
  };
  const cue: MusicCue = { waves: Array.from({ length: o.wave }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave, forceSection: o.section };
  // (a worklet voice's notes reach it by messages: the render waits a moment at its start so none arrive late, as ab.ts does)
  void oc.suspend(128 / RATE).then(() => new Promise(r => setTimeout(r, 300))).then(() => oc.resume());
  e.renderAhead(cue, 0, o.bars * 16 * spb, newBeatClock(style.bpm));
  const buf = await oc.startRendering();
  const x = buf.getChannelData(0), pcm = new Int16Array(x.length);
  let peak = 0, nan = 0;
  for (let i = 0; i < x.length; i++) { const v = x[i]; if (Number.isNaN(v)) { nan++; continue; } peak = Math.max(peak, Math.abs(v)); pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767))); }
  let bin = ""; const bytes = new Uint8Array(pcm.buffer);
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { pcm: btoa(bin), rate: RATE, notes, peak, nan, recorded: !!samples["female-note"], kind: style.patches[style.form!.sung.patch]?.kind };
}

(window as unknown as { tuneRender: typeof tuneRender }).tuneRender = tuneRender;
