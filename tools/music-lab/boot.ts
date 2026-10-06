// The home speakers' boot, sped up (tools/music-lab/boot.mjs; Ed, 2026-10-06: "the music first starts
// when the first speaker appears, sounding incomplete, and becomes gradually more complete until the
// last of the 12 appears"): two bars of silence, then a speaker every `every` bars, each crackling
// into life (the sound effect) and its layer coming in on the next bar line, to the whole intro.
import { Music } from "../../src/platform/audio/music";
import { Sfx } from "../../src/platform/audio/sfx";
import { TUNING } from "../../src/rules/tuning";
import { mixAt } from "../../src/rules/music";
import { newBeatClock } from "../../src/rules/beat";
import { barSeconds, type MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const style = styleJson as unknown as MusicStyle;
const RATE = 32000, FRAME = 1 / 30, LEVEL = 0.8, N = 12;

(window as unknown as { bootRender: (every: number) => Promise<unknown> }).bootRender = async (every: number) => {
  (window as unknown as { seedRandom: () => void }).seedRandom();
  const bar = barSeconds(style.bpm), first = 2, seconds = (first + N * every + 4) * bar;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE), M = TUNING.music, clock = newBeatClock(style.bpm);
  const m = new Music(oc, M.volume * LEVEL, style, 7), s = new Sfx(oc, M.volume * LEVEL, TUNING.sfx, style.root + 24);
  const mix = mixAt(M, 1, 0, 10), bootAt = (i: number) => (first + i * every - 0.6) * bar; // (each crackle a little before its bar line)
  let fired = 0;
  for (let f = 0; f * FRAME < seconds - 0.05; f++) {
    const t = f * FRAME;
    void oc.suspend(Math.round(t * RATE) / RATE).then(() => {
      while (fired < N && bootAt(fired) <= t) { s.power(fired, Math.sin((fired / N) * Math.PI * 2) * 0.7, 1, fired === N - 1); fired++; }
      const speakerBars = Array.from({ length: fired }, (_, i) => bootAt(i) / bar);
      const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 1e6, knockedOut: false, siege: 0, speakerBars, speakers: N };
      m.update(mix, cue, t, clock, true, M);
      return oc.resume();
    });
  }
  const buf = await oc.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1);
  // loudness bar by bar, and the peak
  const bars: number[] = [];
  for (let b = 0; b * bar < seconds - 0.01; b++) { let q = 0, n = 0; for (let i = Math.floor(b * bar * RATE); i < Math.min(L.length, (b + 1) * bar * RATE); i++) { q += L[i] * L[i] + R[i] * R[i]; n += 2; } bars.push(10 * Math.log10(q / Math.max(1, n) + 1e-12)); }
  let peak = 0, nan = 0;
  for (const d of [L, R]) for (const x of d) { if (!Number.isFinite(x)) nan++; else peak = Math.max(peak, Math.abs(x)); }
  const pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let str = "";
  for (let i = 0; i < bytes.length; i += 0x8000) str += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: RATE, bar, first, every, bars, peak, nan, pcm: btoa(str) };
};
