// A/B renders for Ed's music research (docs/music/research.md; Ed, 2026-10-11): one fixed passage of the game's music, then
// the same with one ingredient added at a time, so each step can be judged against the last (tools/music-lab/ab.mjs drives
// it). Lab-only: the game's engine renders the music as it is; the ingredients are laid over it here (a drone, the voice
// tracks Node sang with Pink Trombone, frame drums and a CC0 kit from samples/, tape wobble and crackle), and the kit takes
// the synthesised drums' place by catching the engine's drum notes before they sound. Nothing here changes the game.
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { newBeatClock } from "../../src/rules/beat";
import { Conductor, formClock, type MusicCue } from "../../src/rules/musicPlan";
import { formChord, musicSeed, type MusicStyle, type NoteEvent } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const RATE = 44100;
const base = styleJson as unknown as MusicStyle;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

export interface AbOptions {
  wave: number; seed: number; bars: number;
  drone?: boolean; chant?: boolean; frames?: boolean; tape?: boolean; kit?: boolean; vocalise?: boolean; witch?: boolean;
  /** Recorded voices from Freesound (samples/voices, CC0): a crowd's "uh" retuned to the chords as a choir, whispers in the
   *  breakdown, and throat singing as a drone voice on the tonic (the kargyraa, an octave lower, for the witch-house take). */
  recorded?: boolean;
  /** false: the game's music left out (a stem: only the ingredients asked for). */
  music?: boolean;
  /** The vocalise from a recording instead of Pink Trombone: a woman's steady sung note (samples/voices/female-note, G4,
   *  measured at MIDI 67.2) retuned to each of the sung part's notes, like a sampler (Ed, 2026-10-11: "try a recorded voice
   *  as an alternative vocalise"). */
  sampledVocalise?: boolean;
  /** Base64 WAVs sung by Node (tools/voice/sing.mjs): the chant and the vocalise, from time 0. */
  voices?: { chant?: string; vocalise?: string };
  /** Base64 Ogg samples by id (samples/vcsl). */
  samples?: Record<string, string>;
}

const cueFor = (o: AbOptions): MusicCue => ({ waves: Array.from({ length: o.wave }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave });
const b64 = (s: string) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };

/** The passage's score, for Node to sing to: the sung part's notes (seconds), each bar's chord root (MIDI), its sections. */
async function abScore(o: AbOptions) {
  const style = o.witch ? witchStyle() : base, spb = 60 / style.bpm / 4, cue = cueFor(o), c = new Conductor(style);
  const oc = new OfflineAudioContext(1, RATE, RATE), e = new MusicEngine(oc, oc.destination, style, o.seed), sung: { at: number; dur: number; midi: number }[] = [];
  (e as unknown as { play: (ev: NoteEvent, t: number, dur: number) => void }).play = (ev, t, dur) => { if (ev.part === style.form!.sung.part && ev.midi !== null) sung.push({ at: t, dur, midi: ev.midi }); };
  e.renderAhead(cue, 0, o.bars * 16 * spb, newBeatClock(style.bpm));
  const roots: number[] = [], sections: string[] = [];
  for (let bar = 0; bar < o.bars; bar++) {
    const f = formClock(style, cue, bar), seed = musicSeed(o.seed, f.n), ch = formChord(style, seed, bar - f.start);
    const tr = style.arc[Math.min(style.arc.length - 1, o.wave)].transpose ?? 0, sc = style.scales[style.scale];
    roots.push(style.root + tr + sc[((ch.root % 7) + 7) % 7] + 12 * Math.floor(ch.root / 7));
    sections.push(c.plan(cue, bar).section);
  }
  return { sung, roots, sections, barSeconds: 16 * spb, scale: style.scales[style.scale], root: style.root + (style.arc[Math.min(style.arc.length - 1, o.wave)].transpose ?? 0) };
}

/** The witch-house take (the bonus render): Phrygian, a huge dark reverb, the drums replaced by a half-time pattern here. */
function witchStyle(): MusicStyle {
  const s = clone(base);
  s.scale = "phrygian";
  s.mix = { ...s.mix, reverb: Math.min(1, s.mix.reverb * 1.8), reverbTime: 6 };
  return s;
}

/** The drum parts the CC0 kit replaces (the kicks stay synthesised: no ripped drum machines), each a sample or two. */
const KIT: Record<string, { ids: string[]; gain: number; soft?: string }> = {
  hat: { ids: ["hat-closed"], gain: 0.5, soft: "hat-closed-soft" }, ohat: { ids: ["hat-open"], gain: 0.35 },
  clap: { ids: ["clap-1", "clap-2"], gain: 0.6 }, snare: { ids: ["snare"], gain: 0.6 }, snap: { ids: ["rimshot"], gain: 0.5 },
  shaker: { ids: ["shaker-down", "shaker-up"], gain: 0.4 }, clank: { ids: ["claves", "log-high"], gain: 0.4 },
};
const KICKS = ["kick", "softkick", "hardkick", "boom"];
/** The frame drums' ritual pattern over the beat (a bar: L large open, M large muted, H small open, d doum, t tek). */
const FRAMES = ["L..t..H.M.t.H..t", "L..t..H.M.t.d.tt"];
/** The frame drums' level: 3.2 times their first renders' (Ed: "I can't hear the frame drums"; their stem measured -25 LUFS
 *  against the music's -13.5, buried under the kick). */
const FRAMES_UP = 3.2;
/** The vocalise's level and its presence lift (Ed: "I can't hear ... the vocalise"; it was in, at about the old soprano's
 *  level, so it didn't stand out): twice the first renders', a 3 kHz lift. */
const VOCALISE_GAIN = 1.1, PRESENCE_DB = 6;
const FRAME_IDS: Record<string, string> = { L: "frame-low", M: "frame-low-muted", H: "frame-high", d: "darbuka-doum", t: "darbuka-tek" };

async function abRender(o: AbOptions) {
  const style = o.witch ? witchStyle() : base, spb = 60 / style.bpm / 4, seconds = o.bars * 16 * spb + 3;
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE);
  const score = await abScore(o);
  // the mix: everything into `bus`, through the tape (if asked) to the output
  const bus = oc.createGain();
  if (o.tape) {
    // wow and flutter: a short delay swept slowly and quickly; the tape's top rolled off; crackle and hiss under it
    const d = oc.createDelay(0.1), wow = oc.createOscillator(), wg = oc.createGain(), fl = oc.createOscillator(), fg = oc.createGain(), lp = oc.createBiquadFilter();
    d.delayTime.value = 0.012; wow.frequency.value = 0.45; wg.gain.value = 0.0022; fl.frequency.value = 6.3; fg.gain.value = 0.00025;
    wow.connect(wg).connect(d.delayTime); fl.connect(fg).connect(d.delayTime); wow.start(); fl.start();
    lp.type = "lowpass"; lp.frequency.value = 9500;
    bus.connect(d).connect(lp).connect(oc.destination);
    const n = oc.createBuffer(1, Math.ceil(seconds * RATE), RATE), x = n.getChannelData(0);
    let r = 12345; const rnd = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < x.length; i++) { x[i] = (rnd() - 0.5) * 0.004; if (rnd() < 6 / RATE) { const a = (rnd() - 0.5) * 0.35; for (let k = 0; k < 24 && i + k < x.length; k++) x[i + k] += a * Math.exp(-k / 5); } }
    const src = oc.createBufferSource(), hp = oc.createBiquadFilter(); src.buffer = n; hp.type = "highpass"; hp.frequency.value = 1200;
    src.connect(hp).connect(oc.destination); src.start(0);
  } else bus.connect(oc.destination);
  const samples: Record<string, AudioBuffer> = {};
  for (const [id, data] of Object.entries(o.samples ?? {})) samples[id] = await oc.decodeAudioData(b64(data));
  const hit = (id: string, at: number, gain: number, rate = 1, pan = 0) => {
    const b = samples[id]; if (!b) return;
    const s = oc.createBufferSource(), g = oc.createGain(), p = oc.createStereoPanner();
    s.buffer = b; s.playbackRate.value = rate; g.gain.value = gain; p.pan.value = pan;
    s.connect(g).connect(p).connect(bus); s.start(Math.max(0, at));
  };
  // the music, through the engine; the kit (or the witch-house beat) and the vocalise catch their parts' notes
  const e = new MusicEngine(oc, bus, style, o.seed), drums = new Set(Object.keys(style.parts).filter(k => style.parts[k].role === "drum"));
  const play = (e as unknown as { play: (ev: NoteEvent, t: number, dur: number, sps: number, chord?: number[]) => void }).play.bind(e);
  let rr = 0;
  (e as unknown as { play: typeof play }).play = (ev, t, dur, sps, chord) => {
    if (o.music === false) return; // (a stem)
    if ((o.vocalise || o.sampledVocalise) && ev.part === style.form!.sung.part) return; // (the vocalise sings these)
    if (o.witch && drums.has(ev.part)) return; // (the half-time beat below instead)
    const k = o.kit ? KIT[ev.part] : undefined;
    if (k) { const id = k.soft && ev.vel < 0.6 ? k.soft : k.ids[rr++ % k.ids.length]; hit(id, t, k.gain * ev.vel, 1, ev.part === "hat" ? 0.15 : ev.part === "shaker" ? -0.2 : 0); return; }
    play(ev, t, dur, sps, chord);
  };
  e.renderAhead(cueFor(o), 0, o.bars * 16 * spb, newBeatClock(style.bpm));
  // a drone: the tonic and its fifth, low, held through, a slow filter breathing (organum, hurdy-gurdy-like)
  if (o.drone) {
    const g = oc.createGain(), lp = oc.createBiquadFilter(), lfo = oc.createOscillator(), lg = oc.createGain();
    lp.type = "lowpass"; lp.frequency.value = 700; lp.Q.value = 2; lfo.frequency.value = 0.08; lg.gain.value = 300;
    lfo.connect(lg).connect(lp.frequency); lfo.start();
    g.gain.setValueAtTime(0, 0); g.gain.linearRampToValueAtTime(0.09, 2); g.gain.setValueAtTime(0.09, seconds - 3); g.gain.linearRampToValueAtTime(0, seconds - 0.5);
    for (const [m, det] of [[score.root + 12, -4], [score.root + 12, 4], [score.root + 19, 0], [score.root + 24, 2]] as [number, number][]) {
      const osc = oc.createOscillator(); osc.type = "sawtooth"; osc.frequency.value = 440 * 2 ** ((m - 69) / 12); osc.detune.value = det;
      osc.connect(lp); osc.start(0); osc.stop(seconds);
    }
    lp.connect(g).connect(bus);
  }
  // frame drums: the ritual pattern over the beat, in every section but the breakdown
  if (o.frames) for (let bar = 0; bar < o.bars; bar++) {
    if (/breakdown|ether|whisper/.test(score.sections[bar])) continue;
    const pat = FRAMES[bar % FRAMES.length];
    for (let s = 0; s < 16; s++) { const ch = pat[s]; if (ch !== ".") hit(FRAME_IDS[ch], (bar * 16 + s) * spb + (s % 2 ? style.swing * spb : 0), FRAMES_UP * (ch === "L" ? 0.55 : ch === "t" ? 0.28 : 0.4), 1, ch === "t" ? 0.3 : ch === "H" ? -0.25 : 0); }
  }
  // the witch-house beat: half time (the kick on 1, the snare and clap on 3), trap hats in sixteenths with rolls, an 808-ish sub
  if (o.witch) for (let bar = 0; bar < o.bars; bar++) {
    const t0 = bar * 16 * spb, breakdown = /breakdown|ether|whisper/.test(score.sections[bar]);
    if (breakdown) continue;
    for (const s of [0, 10]) { hit("bass-drum", t0 + s * spb, 0.8); const sub = oc.createOscillator(), sg = oc.createGain(); sub.frequency.setValueAtTime(110, t0 + s * spb); sub.frequency.exponentialRampToValueAtTime(440 * 2 ** ((score.roots[bar] - 69) / 12), t0 + s * spb + 0.12); sg.gain.setValueAtTime(0.5, t0 + s * spb); sg.gain.exponentialRampToValueAtTime(0.001, t0 + s * spb + 1.4); sub.connect(sg).connect(bus); sub.start(t0 + s * spb); sub.stop(t0 + s * spb + 1.5); }
    hit("snare", t0 + 8 * spb, 0.55); hit("clap-1", t0 + 8 * spb, 0.45);
    for (let s = 0; s < 16; s++) { if (bar % 4 === 3 && s >= 12) { for (let k = 0; k < 3; k++) hit("hat-closed-soft", t0 + (s + k / 3) * spb, 0.25); } else hit(s % 4 === 2 ? "hat-closed" : "hat-closed-soft", t0 + s * spb, 0.3); }
  }
  // recorded voices (Freesound, CC0): each a stretch of its file, retuned by playback rate (their pitches measured: the crowd
  // sings F3 a little sharp, 53.2; the cave's throat singing holds about 42.8; the kargyraa about 37.1), faded in and out
  const seg = (id: string, at: number, offset: number, dur: number, rate: number, gain: number, pan = 0, fade = 0.3) => {
    const b = samples[id]; if (!b) return;
    const src = oc.createBufferSource(), g = oc.createGain(), p = oc.createStereoPanner();
    src.buffer = b; src.playbackRate.value = rate; p.pan.value = pan;
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(gain, at + fade); g.gain.setValueAtTime(gain, at + dur - fade); g.gain.linearRampToValueAtTime(0, at + dur);
    src.connect(g).connect(p).connect(bus); src.start(at, offset, dur * rate + 0.05);
  };
  if (o.recorded) {
    const near = (m: number, to: number) => { let x = m; while (x < to - 6) x += 12; while (x > to + 6) x -= 12; return x; };
    const bar = score.barSeconds;
    // the choir: the crowd's "uh" on each two bars' chord root and its fifth
    for (let b = 0; b < o.bars; b += 2) {
      const quiet = /drop|Drop/.test(score.sections[b]) ? 0.5 : 1, root = near(score.roots[b], 53.2);
      for (const [m, g, pan] of [[root, 0.32, -0.3], [root + 7, 0.2, 0.3]] as [number, number, number][]) seg("crowd-uh-f", b * bar, 1.5, Math.min(2 * bar, 4.3 / (2 ** ((m - 53.2) / 12))), 2 ** ((m - 53.2) / 12), g * quiet, pan, 0.4);
    }
    // whispers over the breakdown
    for (let b = 0; b < o.bars; b++) if (/breakdown|ether|whisper/.test(score.sections[b]) && (b === 0 || !/breakdown|ether|whisper/.test(score.sections[b - 1]))) seg("whispers", b * bar, 0, Math.min(9, (o.bars - b) * bar), 1, 0.3, 0.2, 0.8);
    // a throat-sung drone on the tonic (the cave's an octave above the root; the kargyraa at the root, for the witch-house take)
    const [id, pitch, len] = o.witch ? ["kargyraa", 37.1, 10] : ["throat-cave", 42.8, 12], to = o.witch ? score.root : score.root + 12, rate = 2 ** ((to - pitch) / 12);
    for (let t = 0; t < o.bars * bar; t += (len / rate) - 2) seg(id, t, 0.6, Math.min(len / rate - 0.6, o.bars * bar - t), rate, 0.22, 0, 1);
  }
  // the voices Node sang: the chant (pitched down for the witch-house take) and the vocalise
  // the sampled vocalise: the woman's note retuned to each sung note, a short attack and release, the same presence lift
  if (o.sampledVocalise) {
    const pres = oc.createBiquadFilter(); pres.type = "peaking"; pres.frequency.value = 3000; pres.Q.value = 0.8; pres.gain.value = PRESENCE_DB;
    pres.connect(bus);
    for (const n of score.sung) {
      const rate = 2 ** ((n.midi - 67.2) / 12), len = Math.min(n.dur * 0.97, 1.75 / rate);
      const b = samples["female-note"]; if (!b || len < 0.05) continue;
      const src = oc.createBufferSource(), g = oc.createGain();
      src.buffer = b; src.playbackRate.value = rate;
      g.gain.setValueAtTime(0, n.at); g.gain.linearRampToValueAtTime(VOCALISE_GAIN, n.at + 0.03); g.gain.setValueAtTime(VOCALISE_GAIN, n.at + Math.max(0.03, len - 0.08)); g.gain.linearRampToValueAtTime(0, n.at + len);
      src.connect(g).connect(pres); src.start(n.at, 0, len * rate + 0.02);
    }
  }
  for (const [k, gain] of [["chant", 0.5], ["vocalise", VOCALISE_GAIN]] as const) {
    const data = o.voices?.[k];
    if (!data || (k === "chant" && !o.chant) || (k === "vocalise" && !o.vocalise)) continue;
    const b = await oc.decodeAudioData(b64(data)), s = oc.createBufferSource(), g = oc.createGain(), send = oc.createConvolver(), sg = oc.createGain();
    // its own room: a short, dark reverb so it sits with the music's
    let q = 777; const rq = () => ((q = (Math.imul(q, 1664525) + 1013904223) >>> 0) / 4294967296);
    const ir = oc.createBuffer(2, RATE * 2, RATE); for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < d.length; i++) d[i] = (rq() * 2 - 1) * Math.exp(-i / (RATE * 0.45)); }
    send.buffer = ir; sg.gain.value = 0.25;
    s.buffer = b; if (o.witch && k === "chant") s.playbackRate.value = 0.75; g.gain.value = gain;
    const pres = oc.createBiquadFilter(); pres.type = "peaking"; pres.frequency.value = 3000; pres.Q.value = 0.8; pres.gain.value = k === "vocalise" ? PRESENCE_DB : 0;
    s.connect(pres).connect(g).connect(bus); g.connect(sg).connect(send).connect(bus); s.start(0);
  }
  const buf = await oc.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1);
  let peak = 0, nan = 0; for (const d of [L, R]) for (const x of d) { if (!Number.isFinite(x)) nan++; else peak = Math.max(peak, Math.abs(x)); }
  const pcm = new Int16Array(L.length * 2), k = peak > 0.98 ? 0.98 / peak : 1;
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.round(Math.max(-1, Math.min(1, L[i] * k)) * 32767); pcm[2 * i + 1] = Math.round(Math.max(-1, Math.min(1, R[i] * k)) * 32767); }
  const bytes = new Uint8Array(pcm.buffer); let str = "";
  for (let i = 0; i < bytes.length; i += 0x8000) str += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: RATE, peak, nan, sections: score.sections, pcm: btoa(str) };
}

Object.assign(window as unknown as Record<string, unknown>, { abScore, abRender });
