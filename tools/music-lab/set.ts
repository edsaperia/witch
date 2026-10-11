// A night's set in miniature (tools/music-lab/set.mjs; Ed, 2026-10-11: "Each night should be a full set"): the night's
// music on the game's mix (rules/musicSet.ts: its arc a step a wave), each wave `bars` bars at its own tempo (eased in over a
// beat as it lands), its build cut to a block so each wave lands on its own section first, then the victory's encore.
import { Music } from "../../src/platform/audio/music";
import { TUNING } from "../../src/rules/tuning";
import { mixAt } from "../../src/rules/music";
import { newBeatClock, rampTo, timeAt } from "../../src/rules/beat";
import { Conductor, type MusicCue } from "../../src/rules/musicPlan";
import { nightStyle, nightTempos, planNight } from "../../src/rules/musicSet";
import type { MusicStyle } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const base = styleJson as unknown as MusicStyle;
const RATE = 32000, FRAME = 1 / 30, LEVEL = 0.8;

(window as unknown as { setRender: (o: { island: string; waves: number; seed: number; bars: number; encore: number }) => Promise<unknown> }).setRender = async o => {
  (window as unknown as { seedRandom: () => void }).seedRandom();
  const n = planNight(base, { seed: o.seed, island: o.island, waves: o.waves }), night = nightStyle(base, n);
  const style: MusicStyle = { ...night, arc: night.arc.map(a => ({ ...a, buildBars: base.blockBars })) };
  const tempos = nightTempos(n), clock = newBeatClock(base.bpm, tempos[0]);
  tempos.forEach((bpm, w) => { if (w > 0) rampTo(clock, w * o.bars * 4, bpm, 4); });
  const victoryBar = (o.waves + 1) * o.bars, endBar = victoryBar + o.encore, seconds = timeAt(clock, endBar * 4) + 2;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE);
  const M = TUNING.music, m = new Music(oc, M.volume * LEVEL, style, o.seed), mix = mixAt(M, 1, 0, 10);
  const cue: MusicCue = { waves: tempos.slice(1).map((_, i) => (i + 1) * o.bars), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, ...(o.encore > 0 ? { victory: victoryBar } : {}) };
  const at = new Map<number, (() => void)[]>(), on = (sec: number, f: () => void) => { const k = Math.round((sec * RATE) / 128) * 128; (at.get(k) ?? at.set(k, []).get(k)!).push(f); };
  for (let f = 0; f * FRAME < seconds - 0.05; f++) { const time = f * FRAME; on(time, () => m.update(mix, cue, time, clock, true, M)); }
  for (const [k, fs] of at) void oc.suspend(k / RATE).then(() => { for (const f of fs) f(); return oc.resume(); });
  const buf = await oc.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1);
  let peak = 0, nan = 0;
  for (const d of [L, R]) for (const x of d) { if (!Number.isFinite(x)) nan++; else peak = Math.max(peak, Math.abs(x)); }
  // what played: each wave's start (s), its sections, its plan
  const plans = new Conductor(style), waves = n.steps.map(s => ({ ...s, start: timeAt(clock, s.wave * o.bars * 4), sections: [...new Set(Array.from({ length: o.bars }, (_, b) => plans.plan(cue, s.wave * o.bars + b).section))] }));
  const pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let str = "";
  for (let i = 0; i < bytes.length; i += 0x8000) str += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: RATE, peak, nan, seconds, curated: n.curated, waves, encoreAt: timeAt(clock, victoryBar * 4), pcm: btoa(str) };
};
