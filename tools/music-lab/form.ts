// The 32-bar ABAC form (tools/music-lab/form.mjs; Ed, 2026-10-09): a wave's music on the game's mix, its sections on the
// form (A and B four on the floor, A breakbeats, C a breakdown) or one section looped, the form's melody over it (A on the seed's instrument, B and C sung), and, if asked, a knockdown: 5 bpm faster from the next
// bar line and the music re-seeded from the next phrase line.
import { Music } from "../../src/platform/audio/music";
import { TUNING } from "../../src/rules/tuning";
import { mixAt } from "../../src/rules/music";
import { knockdownTempo, newBeatClock, timeAt } from "../../src/rules/beat";
import { Conductor, formClock, type MusicCue } from "../../src/rules/musicPlan";
import { formInstrument, musicSeed, type MusicStyle } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const style = styleJson as unknown as MusicStyle;
const RATE = 32000, FRAME = 1 / 30, LEVEL = 0.8;

(window as unknown as { formRender: (o: { section: string; wave: number; seed: number; bars: number; knock: number }) => Promise<unknown> }).formRender = async o => {
  (window as unknown as { seedRandom: () => void }).seedRandom();
  const clock = newBeatClock(style.bpm), M = TUNING.music, t = { ...TUNING, beat: { ...TUNING.beat, bpm: style.bpm } };
  // (the knockdown's tempo, worked out ahead so the render knows how long it runs)
  const knockAt = o.knock >= 0 ? o.knock * 4 * 60 / style.bpm : Infinity;
  if (o.knock >= 0) knockdownTempo(clock, t, knockAt);
  const seconds = timeAt(clock, o.bars * 4) + 2;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE);
  const m = new Music(oc, M.volume * LEVEL, style, o.seed), mix = mixAt(M, 1, 0, 10);
  const knockdowns = o.knock >= 0 ? [o.knock] : [];
  const base: MusicCue = { waves: o.wave > 0 ? Array.from({ length: o.wave }, () => 0) : [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave };
  for (let f = 0; f * FRAME < seconds - 0.05; f++) {
    const time = f * FRAME;
    void oc.suspend(Math.round(time * RATE) / RATE).then(() => {
      const cue: MusicCue = { ...base, ...(o.section ? { forceSection: o.section } : {}), knockdowns: time >= knockAt ? knockdowns : [] };
      m.update(mix, cue, time, clock, true, M);
      return oc.resume();
    });
  }
  const buf = await oc.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1);
  let peak = 0, nan = 0;
  for (const d of [L, R]) for (const x of d) { if (!Number.isFinite(x)) nan++; else peak = Math.max(peak, Math.abs(x)); }
  const phrases: string[] = [];
  const all: MusicCue = { ...base, ...(o.section ? { forceSection: o.section } : {}), knockdowns }, plans = new Conductor(style);
  for (let b = 0; b < o.bars; b += style.form!.phraseBars) {
    const f = formClock(style, all, b), seed = musicSeed(o.seed, f.n), L = style.form!.order[Math.floor(((b - f.start) % 32) / 8)];
    phrases.push(`bars ${b}-${b + 7}: ${L} ${L === "A" ? formInstrument(style.form!, seed) : "sung"}, ${plans.plan(all, b).section} (seed ${seed})`);
  }
  const pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let str = "";
  for (let i = 0; i < bytes.length; i += 0x8000) str += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: RATE, peak, nan, phrases, seconds, pcm: btoa(str) };
};
