// The haunted treatment's A/B (Ed, 2026-11-08: "B, 1-6"; tools/music-lab/haunted.mjs): the game's engine renders, offline and
// with the game's singer (Chimera's notes), a breakdown (its quiet half, the riser and the drum & bass drop), a legend's clearing
// as she walks in on the ground (the world slowing there, its layer at full speed), and a night's set over a few waves, each with
// the treatment on and off. Lab-only: nothing here changes the game.
import { Music } from "../../src/platform/audio/music";
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { TUNING } from "../../src/rules/tuning";
import { mixAt, nearness } from "../../src/rules/music";
import { newBeatClock, timeAt } from "../../src/rules/beat";
import { Conductor, type MusicCue } from "../../src/rules/musicPlan";
import { nightStyle, planNight } from "../../src/rules/musicSet";
import { hauntedDrop, isHaunted, withHaunted, type MusicStyle } from "../../src/rules/musicScore";
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
/** Frames of a Music at 30 a second, on an offline context (the game's way: Music.update each frame). */
function frames(oc: OfflineAudioContext, seconds: number, each: (t: number) => void): void {
  const at = new Map<number, (() => void)[]>(), on = (sec: number, f: () => void) => { const k = Math.round((sec * RATE) / 128) * 128; (at.get(k) ?? at.set(k, []).get(k)!).push(f); };
  for (let f = 0; f * FRAME < seconds - 0.05; f++) { const t = f * FRAME; on(t, () => each(t)); }
  for (const [k, fs] of at) void oc.suspend(k / RATE).then(() => { for (const f of fs) f(); return oc.resume(); });
}

interface W { hauntedRender: typeof hauntedRender; circleRender: typeof circleRender; nightRender: typeof nightRender }

/** `bars` bars of `section` on wave `wave`'s step (a forced section plays a 16-bar block: its quiet half, then the drop), the
 *  music and the voice as the game mixes them. */
async function hauntedRender(o: { section: string; wave: number; seed: number; bars: number; on: boolean; samples: Record<string, string> }) {
  const style = withHaunted(base, o.on), spb = 60 / style.bpm / 4, seconds = o.bars * 16 * spb + 5;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE), recs = await decode(oc, o.samples);
  const e = new MusicEngine(oc, oc.destination, style, o.seed);
  e.setRecordings(recs); if (recs.whispers) e.setWhisper(recs.whispers);
  const cue: MusicCue = { waves: Array.from({ length: o.wave }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave, forceSection: o.section };
  e.renderAhead(cue, 0, o.bars * 16 * spb, newBeatClock(style.bpm));
  return result(await oc.startRendering(), { drop: hauntedDrop(style, 16) * 16 * spb });
}

/** A legend's clearing as she walks in (3 s of wave 1's music nearby, then `inside` s in the clearing, the world slowing to a
 *  tenth, then out), as circles.ts renders it, through Music. */
async function circleRender(o: { species: string; seed: number; inside: number; on: boolean; samples: Record<string, string> }) {
  const style = withHaunted(base, o.on), BEFORE = 3, OUT = BEFORE + o.inside, SECONDS = OUT + 4, M = TUNING.music, clock = newBeatClock(style.bpm);
  const oc = new OfflineAudioContext(2, Math.ceil(SECONDS * RATE), RATE), recs = await decode(oc, o.samples);
  const m = new Music(oc, M.volume * 0.8, style, o.seed);
  m.engine!.setRecordings(recs);
  const cue: MusicCue = { waves: [0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 1 };
  const mix = mixAt(M, nearness(M, 40), 0, 40), scale = (t: number) => t < BEFORE ? 1 : t < OUT ? Math.max(0.1, 1 - 0.9 * (t - BEFORE) / 0.5) : Math.min(1, 0.1 + 0.9 * (t - OUT) / 0.5);
  let game = 0;
  frames(oc, SECONDS, t => { const k = scale(t), g = game; game += k * FRAME; m.update(mix, { ...cue, circle: t >= BEFORE && t < OUT ? { species: o.species, level: M.circle.level } : undefined }, g, clock, true, M, k); });
  return result(await oc.startRendering(), { enter: BEFORE, leave: OUT });
}

/** A night's set over `waves` waves of `bars` bars each (each wave: its four-on-the-floor block, its breaks, its haunted
 *  breakdown and the build into the next), through Music at the dancefloor, the game's singer singing; and where each haunted
 *  section and drop starts. */
async function nightRender(o: { island: string; waves: number; seed: number; bars: number; on: boolean; samples: Record<string, string> }) {
  const n = planNight(base, { seed: o.seed, island: o.island, waves: Math.max(o.waves, 10) }), style = withHaunted(nightStyle(base, n), o.on);
  const clock = newBeatClock(style.bpm), endBar = (o.waves + 1) * o.bars, seconds = timeAt(clock, endBar * 4) + 3;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE), recs = await decode(oc, o.samples);
  const M = TUNING.music, m = new Music(oc, M.volume * 0.8, style, o.seed), mix = mixAt(M, 1, 0, 10);
  m.engine!.setRecordings(recs); if (recs.whispers) m.engine!.setWhisper(recs.whispers);
  const cue: MusicCue = { waves: Array.from({ length: o.waves }, (_, i) => (i + 1) * o.bars), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  frames(oc, seconds, t => m.update(mix, cue, t, clock, true, M));
  // what plays where: each block's section, and the haunted ones' quiet start and drop
  const C = new Conductor(style), marks: { at: number; what: string }[] = [];
  let last = "";
  for (let b = 0; b < endBar; b++) {
    const p = C.plan(cue, b), key = `${p.section}@${p.start}`;
    if (key === last) continue;
    last = key;
    const st = n.steps[Math.min(n.steps.length - 1, p.arc)], h = isHaunted(style, p.section);
    marks.push({ at: timeAt(clock, b * 4), what: `wave ${p.arc} (${st?.family ?? "?"}): ${p.section}${h ? " (haunted: quiet)" : ""}` });
    const d = h ? hauntedDrop(style, p.bars) : Infinity;
    if (Number.isFinite(d) && C.plan(cue, p.start + d).section === p.section) marks.push({ at: timeAt(clock, (p.start + d) * 4), what: `wave ${p.arc}: the drum & bass drop` });
  }
  return result(await oc.startRendering(), { marks });
}

Object.assign(window as unknown as W, { hauntedRender, circleRender, nightRender });
