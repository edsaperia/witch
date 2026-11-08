// The composer's A/B (Ed, 2026-11-08: better melodies and basslines, "smarter rules"; tools/music-lab/melody.mjs): the game's
// engine renders, offline and with the game's singer, a passage of one section (or a night's start) with the melodies and
// basslines by the old rules and by the composer's, the same seed, so they can be heard side by side. Lab-only: nothing here
// changes the game.
import { Music } from "../../src/platform/audio/music";
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { TUNING } from "../../src/rules/tuning";
import { mixAt } from "../../src/rules/music";
import { newBeatClock, timeAt } from "../../src/rules/beat";
import { Conductor, type MusicCue } from "../../src/rules/musicPlan";
import { nightStyle, planNight } from "../../src/rules/musicSet";
import { arcStep, formInstrument, hauntedDrop, isHaunted, resolveSection, withHaunted, withMelody, type MusicStyle } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const base = styleJson as unknown as MusicStyle;
const RATE = 44100, FRAME = 1 / 30;
const b64 = (s: string) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
async function decode(oc: BaseAudioContext, samples: Record<string, string>): Promise<Record<string, AudioBuffer>> {
  const out: Record<string, AudioBuffer> = {};
  for (const [id, data] of Object.entries(samples)) out[id] = await oc.decodeAudioData(b64(data));
  return out;
}
function result(buf: AudioBuffer, extra: object = {}) {
  const L = buf.getChannelData(0), R = buf.getChannelData(1), pcm = new Int16Array(L.length * 2);
  let peak = 0, nan = 0;
  for (let i = 0; i < L.length; i++) for (const [c, x] of [[0, L[i]], [1, R[i]]] as const) {
    if (!Number.isFinite(x)) { nan++; continue; }
    peak = Math.max(peak, Math.abs(x)); pcm[2 * i + c] = Math.max(-32767, Math.min(32767, Math.round(x * 32767)));
  }
  const bytes = new Uint8Array(pcm.buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: buf.sampleRate, peak, nan, seconds: buf.duration, pcm: btoa(s), ...extra };
}
function frames(oc: OfflineAudioContext, seconds: number, each: (t: number) => void): void {
  const at = new Map<number, (() => void)[]>(), on = (sec: number, f: () => void) => { const k = Math.round((sec * RATE) / 128) * 128; (at.get(k) ?? at.set(k, []).get(k)!).push(f); };
  for (let f = 0; f * FRAME < seconds - 0.05; f++) { const t = f * FRAME; on(t, () => each(t)); }
  for (const [k, fs] of at) void oc.suspend(k / RATE).then(() => { for (const f of fs) f(); return oc.resume(); });
}

interface W { sectionRender: typeof sectionRender; nightRender: typeof nightRender }
const mmss = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;

/** `bars` bars of `section` on wave `wave`'s step from the form's top (A, then B...), the melodies by `melody` ("old" or "new"),
 *  the haunted treatment `haunted`; and where each phrase starts, who plays it and the bass. */
async function sectionRender(o: { section: string; wave: number; seed: number; bars: number; melody: string; haunted: boolean; samples: Record<string, string> }) {
  const style = withMelody(withHaunted(base, o.haunted), o.melody), spb = 60 / style.bpm / 4, seconds = o.bars * 16 * spb + 5;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE), recs = await decode(oc, o.samples);
  const e = new MusicEngine(oc, oc.destination, style, o.seed);
  e.setRecordings(recs); if (recs.whispers) e.setWhisper(recs.whispers);
  const cue: MusicCue = { waves: Array.from({ length: o.wave }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave, forceSection: o.section };
  e.renderAhead(cue, 0, o.bars * 16 * spb, newBeatClock(style.bpm));
  const sec = resolveSection(style, o.section), F = style.form!, a = arcStep(style, o.wave);
  const bass = Object.keys(sec.parts).filter(k => style.parts[k]?.role === "bass").join(", ") || "none";
  const marks: string[] = [];
  for (let b = 0; b < o.bars; b += F.phraseBars) marks.push(`${mmss(b * 16 * spb).padStart(7)}  phrase ${F.order[(b / F.phraseBars) % F.order.length]}`);
  const drop = isHaunted(style, o.section) ? hauntedDrop(style, 16) : Infinity;
  if (Number.isFinite(drop)) marks.push(`${mmss(drop * 16 * spb).padStart(7)}  the drum & bass drop`);
  return result(await oc.startRendering(), { marks, lead: a.lead ?? formInstrument(F, o.seed), bass });
}

/** A night's start over `waves` waves of `bars` bars each, through Music at the dancefloor, the melodies by `melody`; and where
 *  each section starts. */
async function nightRender(o: { island: string; waves: number; seed: number; bars: number; melody: string; samples: Record<string, string> }) {
  const n = planNight(base, { seed: o.seed, island: o.island, waves: Math.max(o.waves, 10) }), style = withMelody(nightStyle(base, n), o.melody);
  const clock = newBeatClock(style.bpm), endBar = (o.waves + 1) * o.bars, seconds = timeAt(clock, endBar * 4) + 3;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE), recs = await decode(oc, o.samples);
  const M = TUNING.music, m = new Music(oc, M.volume * 0.8, style, o.seed), mix = mixAt(M, 1, 0, 10);
  m.engine!.setRecordings(recs); if (recs.whispers) m.engine!.setWhisper(recs.whispers);
  const cue: MusicCue = { waves: Array.from({ length: o.waves }, (_, i) => (i + 1) * o.bars), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  frames(oc, seconds, t => m.update(mix, cue, t, clock, true, M));
  const C = new Conductor(style), marks: { at: number; what: string }[] = [];
  let last = "";
  for (let b = 0; b < endBar; b++) {
    const p = C.plan(cue, b), key = `${p.section}@${p.start}`;
    if (key === last) continue;
    last = key;
    const st = n.steps[Math.min(n.steps.length - 1, p.arc)], sec = resolveSection(style, p.section), h = isHaunted(style, p.section);
    const bass = Object.keys(sec.parts).filter(k => style.parts[k]?.role === "bass").join("+");
    marks.push({ at: timeAt(clock, b * 4), what: `wave ${p.arc} (${st?.family ?? "?"}, lead ${st?.lead ?? "?"}): ${p.section}${bass ? `, bass ${bass}` : ""}${h ? " (haunted)" : ""}` });
    const d = h ? hauntedDrop(style, p.bars) : Infinity;
    if (Number.isFinite(d) && C.plan(cue, p.start + d).section === p.section) marks.push({ at: timeAt(clock, (p.start + d) * 4), what: `wave ${p.arc}: the drum & bass drop` });
  }
  return result(await oc.startRendering(), { marks: marks.map(x => `${mmss(x.at).padStart(7)}  ${x.what}`) });
}

Object.assign(window as unknown as W, { sectionRender, nightRender });
