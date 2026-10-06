// The run (tools/sfx/run.mjs): ten minutes of a playthrough's sound rendered offline as the game
// mixes it: the music through the proximity mix, its arc driven by a scripted run (the home
// speakers booting, waves arriving, sieges, a party area, an angry legend near, a knockout), and the
// sound effects over it on the same script. Rendered twice, the same each time (Math.random is
// seeded by the page): the whole mix, and the music alone (for its loudness and how often it repeats
// itself). Newer sounds and hooks are only played where the code has them, so the same script runs on
// an older checkout for a before and after.
import { Music } from "../../src/platform/audio/music";
import { Sfx } from "../../src/platform/audio/sfx";
import { voiceOf } from "../../src/platform/audio/voices";
import { TUNING } from "../../src/rules/tuning";
import { mixAt, nearness } from "../../src/rules/music";
import { newBeatClock, waveArrived, waveTempo, type BeatClock } from "../../src/rules/beat";
import { barAt, type MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle } from "../../src/rules/musicScore";
import type { Creature } from "../../src/rules/creatures";
import styleJson from "../../config/music-style.json";

const style = styleJson as unknown as MusicStyle;
const RATE = 32000, STEP = 0.1, LEVEL = 0.8, SECONDS = 600;
const v = (species: string, level: number) => voiceOf({ species, level, boss: level === 3 } as unknown as Creature, TUNING);
// (the newer sounds, played only where this checkout has them)
type Any = Record<string, ((...a: unknown[]) => void) | undefined>;
const opt = (s: Sfx, name: string, ...a: unknown[]) => (s as unknown as Any)[name]?.call(s, ...a);

/** The run's script: when the boot ends, when each wave arrives, and where she is. */
const BOOT = 150, WAVES = [150, 300, 450];
/** A stretch of the run: from `at`, metres from the nearest standing soundsystem (eased from the last stretch's over `ease` s), the hooks. */
interface Stretch { at: number; what: string; dist: number; ease?: number; siege?: number; party?: number; legend?: number; ko?: boolean; meadow?: number; pond?: number; picnic?: number }
const STRETCHES: Stretch[] = [
  { at: 0, what: "home, the speakers booting: inviting the meadow's creatures", dist: 8, meadow: 1 },
  { at: 60, what: "flying out over the treetops, past a pond", dist: 190, ease: 30, pond: 1 },
  { at: 110, what: "the deep forest: a sleeping legend's dream", dist: 230, ease: 10 },
  { at: 130, what: "a legend wakes angry nearby", dist: 230, legend: 1 },
  { at: 150, what: "wave 1 arrives; flying back to its new soundsystem", dist: 60, ease: 30 },
  { at: 185, what: "a partified area: the picnic, the dancers", dist: 25, ease: 10, party: 1, picnic: 1 },
  { at: 240, what: "a siege at the soundsystem: a fight", dist: 20, ease: 5, siege: 1 },
  { at: 300, what: "wave 2 arrives mid-fight; the soundsystem falls", dist: 20, siege: 1 },
  { at: 335, what: "knocked out", dist: 20, ko: true },
  { at: 350, what: "home again", dist: 8, meadow: 1 },
  { at: 400, what: "out to the frontier, an angry legend charging", dist: 120, ease: 20, legend: 1 },
  { at: 450, what: "wave 3 arrives: a siege near home", dist: 30, ease: 20, siege: 0.8 },
  { at: 530, what: "the siege won: a partified area again", dist: 25, ease: 10, party: 1, picnic: 0.6 },
];

interface Cue { at: number; play: (s: Sfx, duck: (by: number, sec: number) => void) => void }
const series = (at: number, n: number, every: number, play: (s: Sfx, i: number) => void): Cue[] => Array.from({ length: n }, (_, i) => ({ at: at + i * every, play: (s: Sfx) => play(s, i) }));
const chatter = (at: number, bursts: number, species = "hare", level = 0): Cue[] => {
  const out: Cue[] = [];
  for (let b = 0; b < bursts; b++) for (let i = 0; i < 3; i++) {
    const t = at + b * 0.6 + i * 0.12, k = (b * 3 + i) / (bursts * 3);
    out.push({ at: t, play: s => s.letter(0) });
    out.push({ at: t + 0.25, play: s => { s.hit(0.2); s.fill(Math.min(1, k), 0.2); if (i === 1) s.reply(v(species, level), k, 0.2); } });
  }
  return out;
};
const invite = (at: number, species: string, level: number): Cue[] => [
  ...chatter(at, 3 + 2 * level, species, level),
  { at: at + 1.8 + 1.2 * level, play: s => s.invited(level, 0.2) },
  { at: at + 3.2 + 1.2 * level, play: s => { s.happy(-0.2); s.speak(v(species, level), "happy", -0.2, 1, 1.2); } },
];
const ouch = TUNING.sfx.ouch;
const fight = (at: number, len: number): Cue[] => [
  { at, play: s => { s.enraged(0.3, 1, 5); s.howl(v("wolf", 2), 0.3, 1); } },
  ...series(at + 2, Math.floor(len / 0.6), 0.6, (s, i) => s.speak(v(["wolf", "boar", "fox", "badger", "stoat", "toad", "owl", "beetle", "hare", "elk"][i % 10], 1 + (i % 2)), i % 4 ? "enraged" : "happy", ((i % 5) - 2) / 2, 1 - (i % 4) * 0.15)),
  ...Array.from({ length: Math.floor(len / 6) }, (_, k) => chatter(at + 3 + k * 6, 4, "fox", 1)).flat(),
  ...series(at + 7, Math.floor(len / 9), 9, (s, i) => { s.ouch(Math.min(0.9, i * 0.15), 0); }),
  ...series(at + 11, Math.floor(len / 13), 13, (s, i) => s.knock(3 + (i % 3))),
];

const CUES: Cue[] = [
  // home, booting: invites
  ...invite(6, "hare", 0), ...invite(16, "fox", 1), ...invite(30, "badger", 1),
  ...series(25, 3, 0.35, (s, i) => s.land(i - 1, 0.9)),
  { at: 42, play: s => s.relic(0.3) },
  ...invite(46, "hare", 0),
  // the deep forest: a legend wakes angry
  { at: 130, play: s => opt(s, "roar", 0.2, 1) },
  { at: 134, play: s => s.windup(0.2, 1) },
  { at: 136, play: s => s.impact(true, -0.3, 0.8) },
  { at: 140, play: s => s.speak(v("bear", 3), "enraged", 0.2, 1) },
  { at: 142, play: s => s.windup(-0.2, 0.8) },
  { at: 144, play: s => s.impact(true, 0.3, 0.8) },
  // wave 1: the boot over
  { at: 150, play: s => opt(s, "stir") },
  // the partified area: invites among the dancers
  ...invite(200, "owl", 1), ...invite(215, "stoat", 2),
  // the siege
  ...fight(240, 95),
  ...series(250, 8, 0.13, (s, i) => s.twinkle(i)),
  { at: 316, play: s => s.lost(false) },
  { at: 335, play: (s, duck) => { s.knockdown(); duck(ouch.duck, ouch.duckTime * 2); } },
  // home: invites
  ...invite(360, "fox", 0), ...invite(372, "hare", 1),
  // the frontier: a legend's charge
  { at: 418, play: s => opt(s, "roar", 0.2, 0.9) },
  { at: 425, play: s => s.bellow(0.3, 1) },
  ...series(426.3, 12, 0.22, s => s.hoof(0, 1)),
  ...series(426.3, 12, 0.22, (s, i) => s.charge(Math.min(1, (i + 2) / 10), 0, 0)),
  ...series(429, 10, 0.1, (s, i) => s.charge(0, Math.max(0, 1 - i / 9), 0)),
  { at: 436, play: s => s.impact(true, 0.3, 0.8) },
  // wave 3's siege near home
  ...fight(460, 65),
  { at: 528, play: s => opt(s, "stir") },
  ...invite(545, "elk", 2), ...invite(570, "toad", 1),
];

/** Where the script is at `t`: the stretch, its distance eased from the last's. */
function at(t: number): Stretch {
  let i = 0;
  while (i + 1 < STRETCHES.length && STRETCHES[i + 1].at <= t) i++;
  const s = STRETCHES[i], prev = STRETCHES[i - 1], k = s.ease && prev ? Math.min(1, (t - s.at) / s.ease) : 1;
  return { ...s, dist: prev ? prev.dist + (s.dist - prev.dist) * k : s.dist };
}

/** One rendering: the music on, and the effects on or not. Returns the section heard each block. */
async function render(fx: boolean, seed: () => void): Promise<{ buf: AudioBuffer; sections: { t: number; section: string; wave: number; pass?: number }[] }> {
  seed();
  const oc = new OfflineAudioContext(2, Math.ceil(SECONDS * RATE), RATE), M = TUNING.music;
  const beatT = { beat: { bpm: style.bpm, tempos: style.arc.map(a => a.bpm ?? style.bpm), blockBars: style.blockBars, rampBars: style.tempoRampBars ?? 8 } };
  const clock: BeatClock = newBeatClock(style.bpm, waveTempo(beatT, 0));
  const m = new Music(oc, M.volume * LEVEL, style, 7);
  const s = new Sfx(oc, fx ? M.volume * LEVEL : 0, TUNING.sfx, style.root + 24);
  const duck = (by: number, sec: number) => m.duck(by, sec), cues = [...CUES].sort((a, b) => a.at - b.at), sections: { t: number; section: string; wave: number; pass?: number }[] = [];
  let next = 0, wave = 0;
  for (let f = 0; f * STEP < SECONDS - 0.05; f++) {
    const t = f * STEP;
    void oc.suspend(Math.round(t * RATE) / RATE).then(() => {
      while (wave < WAVES.length && WAVES[wave] <= t) waveArrived(clock, beatT, ++wave, t);
      const st = at(t), bar = (x: number) => barAt(clock, x);
      const cue = { waves: WAVES.slice(0, wave).map(bar), nextAt: bar(WAVES[wave] ?? Infinity), bootUntil: bar(BOOT), knockedOut: !!st.ko, siege: st.siege ?? 0, party: st.party ?? 0, legend: st.legend ?? 0 } as MusicCue;
      m.update(mixAt(M, nearness(M, st.dist), 0, st.dist), cue, t, clock, true);
      s.meadow(st.meadow ?? 0);
      opt(s, "pond", st.pond ?? 0, -0.4);
      opt(s, "picnic", st.picnic ?? 0, -0.3);
      if (st.party && f % 5 === 0) opt(s, "taps", 4, 0.2, 0.8);
      s.legends(t >= 110 && t < 130 ? 0.9 : 0, 0.5, t >= 118 && t < 130 ? 0.8 : 0, -0.2);
      while (next < cues.length && cues[next].at <= t + 1e-6) cues[next++].play(s, duck);
      const cur = m.engine?.current?.plan as ({ section: string; wave: number; pass?: number } | undefined);
      if (cur && (!sections.length || sections[sections.length - 1].section !== cur.section || sections[sections.length - 1].pass !== cur.pass)) sections.push({ t, section: cur.section, wave: cur.wave, pass: cur.pass });
      return oc.resume();
    });
  }
  return { buf: await oc.startRendering(), sections };
}

/** Loudness (dB) each `hop` seconds over `win`, roughly K-weighted (a 100 Hz high-pass, +4 dB above 1.5 kHz). */
function loudness(L: Float32Array, R: Float32Array, win: number, hop: number): number[] {
  const f = [biquad("hp", 100), biquad("shelf", 1500), biquad("hp", 100), biquad("shelf", 1500)];
  const sq = new Float32Array(L.length);
  for (let i = 0; i < L.length; i++) { const a = f[1](f[0](L[i])), b = f[3](f[2](R[i])); sq[i] = (a * a + b * b) / 2; }
  const w = Math.round(win * RATE), h = Math.round(hop * RATE), out: number[] = [];
  for (let k = 0; k * h + w <= sq.length; k++) { let s = 0; for (let i = k * h; i < k * h + w; i++) s += sq[i]; out.push(10 * Math.log10(s / w + 1e-12)); }
  return out;
}
function biquad(kind: "hp" | "shelf" | "bp", f: number, q = 0.707): (x: number) => number {
  const w = (2 * Math.PI * f) / RATE, cs = Math.cos(w), sn = Math.sin(w);
  let b0, b1, b2, a0, a1, a2;
  if (kind === "hp") { const al = sn / (2 * q); b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = (1 + cs) / 2; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al; }
  else if (kind === "bp") { const al = sn / (2 * q); b0 = al; b1 = 0; b2 = -al; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al; }
  else { const A = Math.pow(10, 4 / 40), al = (sn / 2) * Math.sqrt(2), sq = 2 * Math.sqrt(A) * al; b0 = A * ((A + 1) + (A - 1) * cs + sq); b1 = -2 * A * ((A - 1) + (A + 1) * cs); b2 = A * ((A + 1) + (A - 1) * cs - sq); a0 = (A + 1) - (A - 1) * cs + sq; a1 = 2 * ((A - 1) - (A + 1) * cs); a2 = (A + 1) - (A - 1) * cs - sq; }
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return x => { const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; };
}

/** The music's envelope in six bands (dB, every 50 ms): its fingerprint, for finding where it repeats itself. */
function bands(L: Float32Array, R: Float32Array): number[][] {
  const fs = [80, 200, 500, 1200, 3000, 7000], hop = Math.round(0.05 * RATE);
  return fs.map(f => {
    const a = biquad("bp", f, 1.2), out: number[] = [];
    let s = 0;
    for (let i = 0; i < L.length; i++) { const y = a((L[i] + R[i]) / 2); s += y * y; if ((i + 1) % hop === 0) { out.push(10 * Math.log10(s / hop + 1e-12)); s = 0; } }
    return out;
  });
}

const pcm16 = (b: AudioBuffer): string => {
  const L = b.getChannelData(0), R = b.getChannelData(1), pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};

(window as unknown as { runRender: () => Promise<unknown> }).runRender = async () => {
  const seed = (window as unknown as { seedRandom: () => void }).seedRandom;
  const all = await render(true, seed), mu = await render(false, seed);
  const A = all.buf, U = mu.buf, peak = (b: AudioBuffer) => { let p = 0; for (let c = 0; c < 2; c++) for (const x of b.getChannelData(c)) p = Math.max(p, Math.abs(x)); return p; };
  let nan = 0;
  for (let c = 0; c < 2; c++) for (const x of A.getChannelData(c)) if (!Number.isFinite(x)) nan++;
  return {
    rate: RATE, seconds: SECONDS, stretches: STRETCHES.map(s => ({ at: s.at, what: s.what })), waves: WAVES, boot: BOOT,
    peak: peak(A), musicPeak: peak(U), nan, sections: mu.sections,
    whole: loudness(A.getChannelData(0), A.getChannelData(1), 1, 1), music: loudness(U.getChannelData(0), U.getChannelData(1), 1, 1),
    bands: bands(U.getChannelData(0), U.getChannelData(1)), pcm: pcm16(A),
  };
};
