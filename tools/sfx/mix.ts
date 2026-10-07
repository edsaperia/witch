// The mix (tools/sfx/mix.mjs): scenes of the game's sound rendered offline as the game plays it,
// the music (platform/audio/music.ts: the engine through the proximity mix, at the game's volume)
// with the sound effects over it on a timeline of cues, frame by frame (1/30 s). Each scene is
// rendered three times, the same each time (Math.random is seeded by the page): the whole mix, the
// music alone and the effects alone, so each cue's loudness is measured against the music under it.
import { Music } from "../../src/platform/audio/music";
import { Sfx } from "../../src/platform/audio/sfx";
import { voiceOf } from "../../src/platform/audio/voices";
import { TUNING } from "../../src/rules/tuning";
import { mixAt, nearness } from "../../src/rules/music";
import { newBeatClock } from "../../src/rules/beat";
import type { MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle } from "../../src/rules/musicScore";
import type { Creature } from "../../src/rules/creatures";
import styleJson from "../../config/music-style.json";

const style = styleJson as unknown as MusicStyle;
const WIN = 0.2, HOP = 0.05, RATE = 32000, FRAME = 1 / 30, LEVEL = 0.8; // (the game's volume slider starts at 0.8)
const v = (species: string, level: number) => voiceOf({ species, level, boss: level === 3 } as unknown as Creature, TUNING);

/** A cue on a scene's timeline: when, which of the scene's sounds it is part of (`g`), what it plays. */
interface Cue { at: number; g: string; play: (s: Sfx, duck: (by: number, sec: number) => void) => void }
/** One sound measured: its group's cues alone, from `at` for `len` seconds, against the music then; `kind` its place in the mix. */
interface Sound { g: string; kind: string; at: number; len: number }
/** A scene: its length, the music (a section, metres from the nearest soundsystem), what plays each frame (as group `frameG`), its cues and sounds. */
interface Scene { name: string; seconds: number; section: string; wave: number; distance: number; frame?: (s: Sfx, t: number) => void; frameG?: string; cues: Cue[]; sounds: Sound[] }

const ouch = TUNING.sfx.ouch;
/** Her 💌 hose: bursts of three letters, each landing a quarter second on (the chime, the meter's tick, now and then a reply). */
const chatter = (at: number, bursts: number, g = "💌 chatter", gh = "💌 hits (chime, tick, reply)"): Cue[] => {
  const out: Cue[] = [];
  for (let b = 0; b < bursts; b++) for (let i = 0; i < 3; i++) {
    const t = at + b * 0.6 + i * 0.12, k = (b * 3 + i) / (bursts * 3);
    out.push({ at: t, g, play: s => s.letter(0) });
    out.push({ at: t + 0.25, g: gh, play: s => { s.hit(0.2); s.fill(Math.min(1, k), 0.2); if (i === 1) s.reply(v("hare", 0), k, 0.2); } });
  }
  return out;
};
const series = (at: number, n: number, every: number, g: string, play: (s: Sfx, i: number) => void): Cue[] => Array.from({ length: n }, (_, i) => ({ at: at + i * every, g, play: (s: Sfx) => play(s, i) }));

const SCENES: Scene[] = [
  {
    // home at the start: the forest music at the dancefloor, the meadow, inviting a hare and a fox
    name: "home", seconds: 19, section: "forest", wave: 1, distance: 10,
    frame: (s, t) => s.meadow(Math.min(1, t / 1.5)), frameG: "home's meadow",
    cues: [
      ...chatter(2, 4),
      { at: 4.6, g: "invited (young)", play: s => s.invited(1, 0.2) },
      { at: 6, g: "turned happy (pop)", play: s => s.happy(-0.3) },
      { at: 6, g: "happy speech", play: s => s.speak(v("fox", 1), "happy", -0.3, 1, 1.3) },
      { at: 8.5, g: "relic found", play: s => s.relic(0.3) },
      ...chatter(11, 3, "💌 chatter 2", "💌 hits 2"),
      { at: 13, g: "invited (adult)", play: s => s.invited(2, 0.2) },
      ...series(9.8, 3, 0.35, "💌s landing on the ground", (s, i) => s.land(i - 1, 0.9)),
      { at: 14.5, g: "the boot-up over (stirring)", play: s => s.stir() },
      { at: 16.5, g: "a home speaker powering on", play: s => s.power(3, 0.3, 1) },
    ],
    sounds: [
      { g: "home's meadow", kind: "ambience", at: 2, len: 12 },
      { g: "💌 chatter", kind: "voice", at: 2, len: 2.4 },
      { g: "💌 hits (chime, tick, reply)", kind: "feedback", at: 2.2, len: 2.4 },
      { g: "invited (young)", kind: "sting", at: 4.6, len: 1 },
      { g: "turned happy (pop)", kind: "state", at: 6, len: 0.5 },
      { g: "happy speech", kind: "voice", at: 6, len: 0.8 },
      { g: "relic found", kind: "sting", at: 8.5, len: 1.6 },
      { g: "invited (adult)", kind: "sting", at: 13, len: 1 },
      { g: "💌s landing on the ground", kind: "feedback", at: 9.8, len: 1 },
      { g: "the boot-up over (stirring)", kind: "sting", at: 14.5, len: 1.5 },
      { g: "a home speaker powering on", kind: "sting", at: 16.5, len: 1.4 },
    ],
  },
  {
    // a fight by a soundsystem in full swing: an area turning, a crowd speaking, her hurt and knocked down, a soundsystem lost
    name: "fight", seconds: 20, section: "drop", wave: 3, distance: 30,
    cues: [
      { at: 1, g: "a crowd turns enraged (growl)", play: s => s.enraged(0.3, 1, 5) },
      { at: 1, g: "a wolf's howl", play: s => s.howl(v("wolf", 2), 0.3, 1) },
      ...series(3, 10, 0.45, "a fight crowd speaking", (s, i) => s.speak(v(["wolf", "boar", "fox", "badger", "stoat", "toad", "owl", "beetle", "hare", "elk"][i], 1 + (i % 2)), i % 3 ? "enraged" : "happy", ((i % 5) - 2) / 2, 1 - (i % 4) * 0.15)),
      ...chatter(3.2, 6, "💌 chatter in a fight", "💌 hits in a fight"),
      { at: 4.2, g: "ouch (fresh)", play: (s, duck) => { s.ouch(0); duck(ouch.duck, ouch.duckTime); } },
      { at: 5.6, g: "knocked back 4 m", play: s => s.knock(4) },
      ...series(5.8, 8, 0.13, "stunned (twinkles)", (s, i) => s.twinkle(i)),
      { at: 7.4, g: "ouch (near knocked out)", play: (s, duck) => { s.ouch(0.85); duck(ouch.duck, ouch.duckTime); } },
      { at: 10, g: "knocked down (whoa-oh)", play: (s, duck) => { s.knockdown(); duck(ouch.duck, ouch.duckTime * 2); } },
      { at: 13.5, g: "soundsystem lost", play: s => s.lost(false) },
      { at: 16.2, g: "a lob landing nearby", play: s => s.impact(false, 0.3, 0.8) },
      ...series(1, 36, 0.5, "dancers' shoes on the beat", s => s.taps(4, 0.2, 0.8)),
      ...series(10, 90, 0.1, "a picnic nearby", (s, i) => s.picnic(Math.min(1, i / 15), -0.3)),
      { at: 17, g: "one turns enraged, 20 m off", play: s => { s.enraged(-0.4, 0.7); s.speak(v("boar", 2), "enraged", -0.4, 0.7, 1); } },
    ],
    sounds: [
      { g: "a crowd turns enraged (growl)", kind: "state", at: 1, len: 0.5 },
      { g: "a wolf's howl", kind: "voice", at: 1, len: 1.2 },
      { g: "a fight crowd speaking", kind: "voice", at: 3, len: 4.5 },
      { g: "💌 chatter in a fight", kind: "voice", at: 3.2, len: 3.6 },
      { g: "💌 hits in a fight", kind: "feedback", at: 3.4, len: 3.6 },
      { g: "ouch (fresh)", kind: "hurt", at: 4.2, len: 0.5 },
      { g: "knocked back 4 m", kind: "hurt", at: 5.6, len: 0.6 },
      { g: "stunned (twinkles)", kind: "feedback", at: 5.8, len: 1.1 },
      { g: "ouch (near knocked out)", kind: "hurt", at: 7.4, len: 0.5 },
      { g: "knocked down (whoa-oh)", kind: "hurt", at: 10, len: 1.2 },
      { g: "soundsystem lost", kind: "sting", at: 13.5, len: 3 },
      { g: "a lob landing nearby", kind: "body", at: 16.2, len: 0.4 },
      { g: "one turns enraged, 20 m off", kind: "state", at: 17, len: 0.8 },
      { g: "dancers' shoes on the beat", kind: "feedback", at: 1, len: 17 },
      { g: "a picnic nearby", kind: "ambience", at: 12, len: 7 },
    ],
  },
  {
    // the deep forest, the music far off and muffled: a sleeping legend's moans and nightmare, a legend's wind-up, a charge, restless legends calling out
    name: "forest", seconds: 38, section: "deep", wave: 2, distance: 170,
    // (a sleeper 4 m off; a moment away resets its clock, so the nightmare's first moan comes 1.5 s on)
    frame: (s, t) => s.legends(t < 5 || (t >= 5.2 && t < 11) ? 0.9 : 0, 0.5, t < 5 ? 0 : 0.8, -0.2), frameG: "legend moans",
    cues: [
      { at: 11.5, g: "a legend's wind-up swell", play: s => s.windup(0.2, 1) },
      { at: 13, g: "an enraged legend's song", play: s => s.speak(v("bear", 3), "enraged", 0.2, 1) },
      { at: 14.2, g: "a legend's lob landing", play: s => s.impact(true, -0.3, 0.8) },
      { at: 16.5, g: "a charge's bellow", play: s => s.bellow(0.3, 1) },
      ...series(17.8, 12, 0.22, "the charge's hooves", s => s.hoof(0, 1)),
      ...series(17.8, 12, 0.22, "the charge's rumble", (s, i) => s.charge(Math.min(1, (i + 2) / 10), 0, 0)),
      ...series(20.5, 10, 0.1, "its braking skid", (s, i) => s.charge(0, Math.max(0, 1 - i / 9), 0)),
      { at: 23, g: "a legend turns angry (roar)", play: s => s.roar(0.2, 1) },
      { at: 26, g: "a restless legend calls (near)", play: s => s.lament(v("elk", 3), 0.3, -0.5, 1) },
      { at: 32, g: "a restless legend calls (far, urgent)", play: s => s.lament(v("owl", 3), 0.9, 0.8, 0.35) },
      ...series(0, 270, 0.1, "by a pond", (s, i) => s.pond(Math.min(1, i / 20), -0.4)),
      ...series(0, 120, 0.1, "the area's ambience (old oaks)", (s, i) => s.ambience("oaks", Math.min(1, i / 20))),
      ...series(12, 120, 0.1, "the area's ambience (standing stones)", (s, i) => s.ambience(i < 118 ? "stones" : null, i < 118 ? 1 : 0)),
    ],
    sounds: [
      { g: "legend moans", kind: "ambience", at: 0, len: 4 },
      { g: "legend moans", kind: "ambience", at: 6.5, len: 3.5 },
      { g: "a legend's wind-up swell", kind: "telegraph", at: 11.5, len: 1.3 },
      { g: "an enraged legend's song", kind: "voice", at: 13, len: 3.3 },
      { g: "a legend's lob landing", kind: "telegraph", at: 14.2, len: 1.2 },
      { g: "a charge's bellow", kind: "telegraph", at: 16.5, len: 1.1 },
      { g: "the charge's hooves", kind: "body", at: 17.8, len: 2.6 },
      { g: "the charge's rumble", kind: "body", at: 17.8, len: 2.6 },
      { g: "its braking skid", kind: "body", at: 20.5, len: 1 },
      { g: "a legend turns angry (roar)", kind: "telegraph", at: 23, len: 2.2 },
      { g: "a restless legend calls (near)", kind: "call", at: 26, len: 4 },
      { g: "a restless legend calls (far, urgent)", kind: "call", at: 32, len: 4 },
      { g: "by a pond", kind: "ambience", at: 3, len: 20 },
      { g: "the area's ambience (old oaks)", kind: "ambience", at: 3, len: 8 },
      { g: "the area's ambience (standing stones)", kind: "ambience", at: 14, len: 9 },
    ],
  },
  {
    // back behind her decks (the DJ witch, after a knockout): the home music playing, her scratch bars and her hype
    name: "decks", seconds: 10, section: "forest", wave: 1, distance: 20,
    cues: [
      ...series(1, 16, 0.25, "her scratch (two bars)", (s, i) => s.scratch(i % 2 === 0, 0.1)),
      { at: 6, g: "her hype (woo-hoo!)", play: s => s.whoop(0.1) },
      ...series(7.5, 8, 0.25, "her scratch (two bars)", (s, i) => s.scratch(i % 2 === 0, 0.1)),
    ],
    sounds: [
      { g: "her scratch (two bars)", kind: "feedback", at: 1, len: 4 },
      { g: "her hype (woo-hoo!)", kind: "voice", at: 6, len: 0.5 },
    ],
  },
];

/** Short-term loudness (dB, 200 ms windows every 50 ms: short enough that a quick pop or knock counts as heard) of a stereo render, roughly K-weighted (a
 *  100 Hz high-pass and a +4 dB shelf above 1.5 kHz: the low end counts for less, as heard). */
function momentary(L: Float32Array, R: Float32Array): Float32Array {
  const hp = biquad("hp", 100, RATE), sh = biquad("shelf", 1500, RATE), hp2 = biquad("hp", 100, RATE), sh2 = biquad("shelf", 1500, RATE);
  const sq = new Float32Array(L.length);
  for (let i = 0; i < L.length; i++) { const a = sh(hp(L[i])), b = sh2(hp2(R[i])); sq[i] = (a * a + b * b) / 2; }
  const win = Math.round(WIN * RATE), hop = Math.round(HOP * RATE), n = Math.max(1, Math.floor((L.length - win) / hop) + 1), out = new Float32Array(n);
  for (let k = 0; k < n; k++) { let s = 0; for (let i = k * hop; i < k * hop + win && i < sq.length; i++) s += sq[i]; out[k] = 10 * Math.log10(s / win + 1e-12); }
  return out;
}
function biquad(kind: "hp" | "shelf", f: number, rate: number): (x: number) => number {
  const w = (2 * Math.PI * f) / rate, cs = Math.cos(w), sn = Math.sin(w);
  let b0, b1, b2, a0, a1, a2;
  if (kind === "hp") { const al = sn / (2 * 0.707); b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = (1 + cs) / 2; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al; }
  else { const A = Math.pow(10, 4 / 40), al = (sn / 2) * Math.sqrt(2), sq = 2 * Math.sqrt(A) * al; b0 = A * ((A + 1) + (A - 1) * cs + sq); b1 = -2 * A * ((A - 1) + (A + 1) * cs); b2 = A * ((A + 1) + (A - 1) * cs - sq); a0 = (A + 1) - (A - 1) * cs + sq; a1 = 2 * ((A - 1) - (A + 1) * cs); a2 = (A + 1) - (A - 1) * cs - sq; }
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return x => { const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; };
}

/** One rendering of a scene: the music on or silent, and the effects: all, none (null) or one group's alone. */
async function render(sc: Scene, music: boolean, only: string | null | undefined, seed: () => void): Promise<AudioBuffer> {
  seed();
  const oc = new OfflineAudioContext(2, Math.ceil(sc.seconds * RATE), RATE), M = TUNING.music, clock = newBeatClock(style.bpm);
  const m = new Music(oc, music ? M.volume * LEVEL : 0, style, 7);
  const s = new Sfx(oc, only !== null ? M.volume * LEVEL : 0, TUNING.sfx, style.root + 24);
  const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceSection: sc.section, forceWave: sc.wave };
  const mix = mixAt(M, nearness(M, sc.distance), 0, sc.distance), duck = (by: number, sec: number) => m.duck(by, sec);
  const cues = sc.cues.filter(c => !only || c.g === only).sort((a, b) => a.at - b.at), frame = !only || only === sc.frameG ? sc.frame : undefined;
  let next = 0;
  for (let f = 0; f * FRAME < sc.seconds - 0.05; f++) {
    const t = f * FRAME;
    void oc.suspend(Math.round(t * RATE) / RATE).then(() => {
      m.update(mix, cue, t, clock, true);
      frame?.(s, t);
      while (next < cues.length && cues[next].at <= t + 1e-6) cues[next++].play(s, duck);
      return oc.resume();
    });
  }
  return oc.startRendering();
}

(window as unknown as { mixRender: () => Promise<unknown> }).mixRender = async () => {
  const seed = (window as unknown as { seedRandom: () => void }).seedRandom;
  const out = [];
  for (const sc of SCENES) {
    const all = await render(sc, true, undefined, seed), mu = await render(sc, true, null, seed);
    const mAll = momentary(all.getChannelData(0), all.getChannelData(1)), mMu = momentary(mu.getChannelData(0), mu.getChannelData(1));
    const at = (x: Float32Array, t0: number, t1: number) => { const a = Math.max(0, Math.floor(t0 / HOP)), b = Math.min(x.length, Math.max(a + 1, Math.ceil((t1 - WIN) / HOP) + 1)); return Array.from(x.slice(a, b)); };
    const median = (a: number[]) => { const s = [...a].sort((p, q) => p - q); return s[Math.floor(s.length / 2)] ?? -120; };
    const alone = new Map<string, Float32Array>(), cues = [];
    for (const d of sc.sounds) {
      if (!alone.has(d.g)) { const b = await render(sc, false, d.g, seed); alone.set(d.g, momentary(b.getChannelData(0), b.getChannelData(1))); }
      const fx = Math.max(...at(alone.get(d.g)!, d.at, d.at + Math.max(WIN, d.len))), mu1 = median(at(mMu, d.at, d.at + Math.max(WIN, d.len)));
      cues.push({ kind: d.kind, name: d.g, fx, music: mu1, over: fx - mu1 });
    }
    const L = all.getChannelData(0), R = all.getChannelData(1);
    let peak = 0;
    const pcm = new Int16Array(L.length * 2);
    for (let i = 0; i < L.length; i++) { peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
    let b = "";
    const bytes = new Uint8Array(pcm.buffer);
    for (let i = 0; i < bytes.length; i += 0x8000) b += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    out.push({ name: sc.name, rate: RATE, peak, music: median(Array.from(mMu)), whole: Math.max(...Array.from(mAll)), cues, pcm: btoa(b) });
  }
  return out;
};
