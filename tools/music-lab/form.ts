// The 32-bar ABAC form (tools/music-lab/form.mjs; Ed, 2026-10-09): a wave's music on the game's mix, its sections on the
// form (A and B four on the floor, A breakbeats, C a breakdown) or one section looped, the form's melody over it (A on the
// seed's instrument, B and C sung), and, if asked, a knockdown as the game plays it: the record scratched and the music
// stopped, 5 bpm faster, the wait (knockout.respawn.base, ending on the nearest bar line), the needle dropped on the new
// record as she's back at her decks and her scratch routine from its seed (rules/djSet.ts), then the new record from the top.
import { Music } from "../../src/platform/audio/music";
import { Sfx } from "../../src/platform/audio/sfx";
import { djStrokes } from "../../src/rules/djSet";
import type { PartyState } from "../../src/rules/party";
import { TUNING } from "../../src/rules/tuning";
import { mixAt } from "../../src/rules/music";
import { beatAt, knockdownTempo, newBeatClock, timeAt } from "../../src/rules/beat";
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
  // her wait as the rules make it (rules/game.ts hitWitch): from going down, knockout.respawn.base, to the nearest bar line;
  // back at her decks after the teleport (no hat: knockout.emptyBeat and .teleport)
  const K = TUNING.knockout, inAt = knockAt + K.emptyBeat + K.teleport;
  let backBar = Math.round(beatAt(clock, knockAt + (K.respawn?.base ?? 6)) / 4);
  while (timeAt(clock, backBar * 4) < inAt + (K.respawn?.minScratch ?? 0)) backBar++;
  const backAt = timeAt(clock, backBar * 4), knockdowns = o.knock >= 0 ? [{ at: o.knock, back: backBar }] : [];
  const s = new Sfx(oc, M.volume * LEVEL, TUNING.sfx, style.root + 24), fake = { beat: clock, party: { spellAt: undefined } as unknown as PartyState, witch: { seated: true }, witches: [{ ko: { inAt, backAt } }], seed: o.seed, knockdowns };
  // (every callback in a render quantum in one suspend: an offline context takes one a quantum)
  const at = new Map<number, (() => void)[]>(), on = (sec: number, f: () => void) => { const k = Math.round((sec * RATE) / 128) * 128; (at.get(k) ?? at.set(k, []).get(k)!).push(f); };
  if (o.knock >= 0) {
    on(knockAt, () => s.recordScratch());
    for (const k of djStrokes(fake, 0, seconds)) on(k.at, () => s.deck(k.stroke, 0, TUNING.sfx.deck.respawn ?? 1));
  }
  const base: MusicCue = { waves: o.wave > 0 ? Array.from({ length: o.wave }, () => 0) : [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave };
  for (let f = 0; f * FRAME < seconds - 0.05; f++) {
    const time = f * FRAME;
    on(time, () => {
      const cue: MusicCue = { ...base, ...(o.section ? { forceSection: o.section } : {}), knockdowns: time >= knockAt ? knockdowns : [], knockedOut: time >= knockAt && time < backAt };
      m.update(mix, cue, time, clock, true, M);
    });
  }
  for (const [k, fs] of at) void oc.suspend(k / RATE).then(() => { for (const f of fs) f(); return oc.resume(); });
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
