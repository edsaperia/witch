// The sound effects (2026-10-05): every one synthesised, like the music (no samples), each a few
// short-lived nodes; the two that last (a sleeping legend's snore and dream tone, and a nightmare's
// unease) are built once and only turned up and down. Pitches keep to the music's key (the style's
// root, a minor pentatonic) so a hose of 💌s or a run of chimes sits in the track rather than on it.
// Volumes and rates are the tuning's sfx (config/tuning.json). platform/sfxCues.ts decides when.
import type { Tuning } from "../rules/tuning";

export type SfxTuning = Tuning["sfx"];

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
/** Vowels for the babble: three formants each (Hz, for an adult-ish voice) and their levels. */
const VOWELS: [number, number][][] = [
  [[800, 1], [1150, 0.55], [2900, 0.2]], // ah
  [[530, 1], [1840, 0.5], [2480, 0.25]], // eh
  [[300, 1], [2250, 0.45], [3000, 0.3]], // ee
  [[480, 1], [820, 0.5], [2800, 0.15]], // oh
  [[340, 1], [720, 0.35], [2500, 0.1]], // oo
];
/** A phrase's pitch shape, syllable by syllable (times the voice's range): an invitation lifting at the end. */
const INVITE = [0.12, -0.04, 0.42, 0.05, -0.02, 0.5];
/** A voice's mood: happy rises and bounces, enraged falls clipped and gritty, grumpy sits low and flat. */
export type Mood = "happy" | "grumpy" | "enraged";
/** One creature's voice: its pitch (Hz), how far its formants sit above an adult's (small: higher), its source. */
/** A creature's call blended into its babble (config/creature-voices.json: a family's, a species' tweaks):
 *  `pitch` and `formants` are already in its voice; the rest shape each syllable. */
export interface CallStyle {
  pitch: number; formants: number; wave?: OscillatorType; pure?: boolean; glide: number;
  trill?: number[]; am?: number[]; noise?: number; dur: number; gap: number; extra?: number; consonant?: number; vowel?: number; turn?: string; volume?: number;
}
export interface CreatureVoice { pitch: number; formants: number; wave: OscillatorType; /** a legend: whale song, not babble */ legend?: boolean; call?: CallStyle }
/** A syllable's sound: its pitch gliding to `end`, a vowel through formants (or `pure`, a whistled
 *  tone), a trill ([Hz, cents]), a buzz or rattle (`am`: [Hz, depth]), breath or hiss (`noise` 0-1). */
interface SyllableSpec { pitch: number; end: number; vowel: number; dur: number; formants: number; wave: OscillatorType; gain: number; grit: number; pan: number; consonant: boolean; pure?: boolean; trill?: number[]; am?: number[]; noise?: number }
/** What a legend's whale song says: its mood, asleep (dreaming or a nightmare), or an attack's swell. */
export type WhaleKind = Mood | "sleep" | "nightmare" | "swell";

/** The minor pentatonic's steps (semitones above the root). */
const PENTA = [0, 3, 5, 7, 10];
/** Scale degree `k` (0 the root, 5 the octave above) as a MIDI note above `root`. */
const degree = (root: number, k: number) => root + 12 * Math.floor(k / 5) + PENTA[((k % 5) + 5) % 5];

export class Sfx {
  private out: GainNode;
  private noise: AudioBuffer;
  private phrase = { at: -Infinity, n: 0, vowel: 0 };
  /** The voices speaking now (the cap: voice.animals.maxVoices), each with its gain to duck and how much it matters. */
  private speaking: { g: GainNode; end: number; prio: number }[] = [];
  private lastAt = new Map<string, number>();
  /** The legends' big space (a long generated reverb), built when one first sings; and when the sleeper next moans. */
  private ocean: GainNode | null = null;
  private nextMoan = 0;

  constructor(private ctx: AudioContext | OfflineAudioContext, public volume: number, private T: SfxTuning, private root = 57, dest?: AudioNode) {
    const c = ctx;
    this.out = c.createGain(); this.out.gain.value = volume * T.volume;
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -10; limit.knee.value = 6; limit.ratio.value = 8; limit.attack.value = 0.003; limit.release.value = 0.12;
    this.out.connect(limit); limit.connect(dest ?? c.destination);
    this.noise = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = this.noise.getChannelData(0);
    let r = 777;
    for (let i = 0; i < d.length; i++) { r = (Math.imul(r, 1103515245) + 12345) >>> 0; d[i] = (r / 4294967296) * 2 - 1; }
  }

  setVolume(v: number): void { this.volume = v; this.out.gain.setTargetAtTime(v * this.T.volume, this.ctx.currentTime, 0.05); }

  /** Rate limiting: true (and remembered) if `key` last sounded at least `gap` seconds ago. */
  private ready(key: string, gap: number): boolean {
    const now = this.ctx.currentTime, last = this.lastAt.get(key) ?? -Infinity;
    if (now - last < gap) return false;
    this.lastAt.set(key, now);
    return true;
  }

  /** A gain into a panner into the bus: one sound's output. */
  private voice(pan: number): GainNode {
    const c = this.ctx, g = c.createGain(), p = c.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    g.connect(p); p.connect(this.out);
    return g;
  }
  private env(g: GainNode, at: number, peak: number, attack: number, decay: number): void {
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
  }
  private osc(type: OscillatorType, freq: number, at: number, dur: number, dest: AudioNode): OscillatorNode {
    const o = this.ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(freq, at);
    o.connect(dest); o.start(at); o.stop(at + dur + 0.05);
    return o;
  }
  private noiseBurst(at: number, dur: number, dest: AudioNode, offset = 0): AudioBufferSourceNode {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise; s.connect(dest); s.start(at, offset % 0.9, dur + 0.02);
    return s;
  }

  // ——— 💌 ———

  /** A 💌 sent: the witch says a syllable (Ed, 2026-10-05: "rapid fire sounds like talking: you are
   *  inviting"). Babble in her own voice, its vowels varied, each burst a little phrase lifting at
   *  the end like an invitation, so a hose of them is her chattering away. */
  letter(pan = 0, near = 1): void {
    const V = this.T.voice.witch, c = this.ctx, now = c.currentTime;
    if (now - this.phrase.at > V.phraseGap) this.phrase.n = 0;
    const k = this.phrase.n++ % INVITE.length;
    this.phrase.at = now;
    let v = Math.floor(Math.random() * VOWELS.length);
    if (v === this.phrase.vowel) v = (v + 1 + Math.floor(Math.random() * (VOWELS.length - 1))) % VOWELS.length;
    this.phrase.vowel = v;
    const f = V.pitch * (1 + V.range * (INVITE[k] + (Math.random() - 0.5) * 0.12));
    this.syllable(now + 0.005, { pitch: f, end: f * (k === 2 || k === 5 ? 1 + V.range * 0.35 : 0.97), vowel: v, dur: V.pace, formants: V.timbre, wave: "sawtooth", gain: V.volume * near, grit: 0, pan, consonant: Math.random() < 0.7 });
  }

  /** One spoken syllable: a voiced source (gliding from `pitch` to `end`) through a vowel's three
   *  formants, a breath of consonant before it, gritted for anger. Returns its output gain. */
  private syllable(at: number, o: SyllableSpec, out?: GainNode): GainNode {
    const c = this.ctx, dest = out ?? this.voice(o.pan), g = c.createGain();
    g.connect(dest);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, o.gain), at + 0.012);
    g.gain.setValueAtTime(Math.max(0.0002, o.gain * 0.8), at + o.dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, at + o.dur);
    // a buzz or a croak's rattle: the syllable's level shaken fast
    let body: AudioNode = g;
    if (o.am && o.am[0] > 0 && o.am[1] > 0) {
      const amg = c.createGain(), lfo = c.createOscillator(), d = c.createGain();
      amg.gain.value = 1 - o.am[1] / 2; d.gain.value = o.am[1] / 2;
      lfo.type = "square"; lfo.frequency.value = o.am[0];
      lfo.connect(d); d.connect(amg.gain); amg.connect(g); lfo.start(at); lfo.stop(at + o.dur + 0.03);
      body = amg;
    }
    const voiced = 1 - Math.min(0.95, o.noise ?? 0);
    const src = c.createOscillator(), sg = c.createGain();
    sg.gain.value = voiced;
    src.type = o.wave;
    src.frequency.setValueAtTime(o.pitch, at);
    src.frequency.exponentialRampToValueAtTime(Math.max(30, o.end), at + o.dur);
    // a little wobble of the voice: a few cents of jitter; a trill, if it has one
    src.detune.setValueAtTime((Math.random() - 0.5) * 30, at);
    if (o.trill && o.trill[0] > 0 && o.trill[1] > 0) { const lfo = c.createOscillator(), d = c.createGain(); lfo.frequency.value = o.trill[0]; d.gain.value = o.trill[1]; lfo.connect(d); d.connect(src.detune); lfo.start(at); lfo.stop(at + o.dur + 0.03); }
    src.connect(sg);
    let feed: AudioNode = sg;
    if (o.grit > 0) { const sh = c.createWaveShaper(); sh.curve = grit(); const pre = c.createGain(); pre.gain.value = 1 + o.grit * 3; sg.connect(pre); pre.connect(sh); feed = sh; }
    // breath or a hiss through the same mouth
    let breath: AudioNode | null = null;
    if ((o.noise ?? 0) > 0.01) { const ng = c.createGain(); ng.gain.value = (o.noise ?? 0) * 1.6; this.noiseBurst(at, o.dur + 0.02, ng, Math.random()); breath = ng; }
    if (o.pure) {
      // whistled: the tone itself, softened (no vowels)
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = Math.min(16000, o.pitch * 3); lp.Q.value = 0.8;
      const pg = c.createGain(); pg.gain.value = 0.55;
      feed.connect(lp); breath?.connect(lp); lp.connect(pg); pg.connect(body);
    } else for (const [i, [f, lvl]] of VOWELS[o.vowel].entries()) {
      const bp = c.createBiquadFilter(), fg = c.createGain();
      bp.type = "bandpass"; bp.Q.value = i === 0 ? 6 : 9;
      // the mouth opening: from a closed shape into the vowel over the first 25 ms
      bp.frequency.setValueAtTime(f * o.formants * (i === 0 ? 0.6 : 0.9), at);
      bp.frequency.linearRampToValueAtTime(f * o.formants, at + 0.025);
      fg.gain.value = lvl * 2.2;
      feed.connect(bp); breath?.connect(bp); bp.connect(fg); fg.connect(body);
    }
    src.start(at); src.stop(at + o.dur + 0.03);
    if (o.consonant) {
      const hp = c.createBiquadFilter(), ng = c.createGain();
      hp.type = "highpass"; hp.frequency.value = 2500 + Math.random() * 3000;
      ng.connect(dest); this.env(ng, at - 0.012 > 0 ? at - 0.012 : at, o.gain * 0.25, 0.003, 0.02);
      hp.connect(ng); this.noiseBurst(at - 0.012 > 0 ? at - 0.012 : at, 0.03, hp, Math.random());
    }
    return g;
  }

  /** A creature speaks (Ed, 2026-10-05: its attacks are speech, "higher pitched for smaller animals /
   *  levels; happy speech from happy animals, angry speech from enraged animals"): a burst of babble
   *  in its own voice, delivered by mood. `prio` (nearness) decides who's heard when too many speak
   *  at once: the quietest gives way. `long`: a legend's drawn-out wind-up (seconds). */
  speak(v: CreatureVoice, mood: Mood, pan = 0, near = 1, prio = near, long = 0): void {
    if (v.legend) { this.whale(long ? "swell" : mood, pan, near, long); return; } // (Ed: legends sound like whale song)
    const A = this.T.voice.animals, c = this.ctx, now = c.currentTime;
    this.speaking = this.speaking.filter(s => s.end > now);
    if (this.speaking.length >= A.maxVoices) {
      let low = 0;
      for (let i = 1; i < this.speaking.length; i++) if (this.speaking[i].prio < this.speaking[low].prio) low = i;
      if (this.speaking[low].prio >= prio) return; // (it's the least of them: unheard)
      const quiet = this.speaking.splice(low, 1)[0];
      quiet.g.gain.cancelScheduledValues(now); quiet.g.gain.setTargetAtTime(0, now, 0.03);
    }
    // the rest give it room: each voice a little quieter the more are talking
    const crowd = 1 / Math.sqrt(1 + this.speaking.length * A.duck);
    const K = v.call, out = this.voice(pan), n = long ? Math.max(3, Math.round(long / 0.22)) : A.syllables[0] + Math.floor(Math.random() * (A.syllables[1] - A.syllables[0] + 1)) + (K?.extra ?? 0);
    let t = now + 0.005, v0 = Math.floor(Math.random() * VOWELS.length);
    const vol = A.volume * near * crowd * Math.min(1.8, Math.max(1, Math.pow(A.pitch / v.pitch, 0.4))) * (v.call?.volume ?? 1); // (low voices carry less: lifted)
    for (let i = 0; i < n; i++) {
      const x = n > 1 ? i / (n - 1) : 0;
      // the contour: happy lifts and bounces, enraged starts high and falls hard, grumpy mutters flat and low
      const shape = mood === "happy" ? 0.1 + 0.35 * x + (i % 2 ? 0.12 : 0) : mood === "enraged" ? 0.35 - 0.55 * x : -0.1 + 0.08 * Math.sin(i * 2.3);
      const f = v.pitch * (1 + 0.5 * shape) * (long ? 0.9 + 0.25 * x : 1);
      const dur = (long ? (long / n) * 0.92 : mood === "enraged" ? 0.07 : mood === "happy" ? 0.1 : 0.11) * (K?.dur ?? 1);
      v0 = (v0 + 1 + Math.floor(Math.random() * 3)) % VOWELS.length;
      // its call (the family's, the species' tweaks) shaping the mood's delivery
      this.syllable(t, {
        pitch: f, end: f * (mood === "enraged" ? 0.82 : mood === "happy" ? 1.12 : 0.95) * (K?.glide ?? 1), vowel: K?.vowel ?? (long ? (i % 2 ? 0 : 3) : v0), dur, formants: v.formants, wave: v.wave,
        gain: vol * (long ? 0.6 + 0.4 * x : 1) * (mood === "enraged" && i === 0 ? 1.15 : 1), grit: mood === "enraged" ? 0.6 : mood === "grumpy" ? 0.15 : long ? 0.3 : 0, pan,
        consonant: !long && Math.random() < (K?.consonant ?? 0.6), pure: K?.pure, trill: K?.trill, am: K?.am, noise: K?.noise,
      }, out);
      t += dur + (long ? 0.01 : mood === "enraged" ? 0.015 : mood === "happy" ? 0.04 + (i % 2) * 0.03 : 0.05) * (K?.gap ?? 1);
    }
    this.speaking.push({ g: out, end: t, prio });
  }

  /** A canid turning enraged: a short howl, rising and falling (its family's `turn`). */
  howl(v: CreatureVoice, pan = 0, near = 1): void {
    const A = this.T.voice.animals, at = this.ctx.currentTime + 0.01, p = v.pitch * 1.4, out = this.voice(pan), vol = A.volume * near;
    const base = { formants: v.formants, wave: v.wave, grit: 0.1, pan, consonant: false, trill: [5, 25] };
    this.syllable(at, { ...base, pitch: p, end: p * 1.5, vowel: 4, dur: 0.4, gain: vol * 0.8 }, out);
    this.syllable(at + 0.36, { ...base, pitch: p * 1.5, end: p * 1.05, vowel: 0, dur: 0.75, gain: vol }, out);
  }

  /** A creature's answer to a 💌 that lands (optional, Ed): one small syllable in its own voice, lifting as its affection fills. */
  reply(v: CreatureVoice, amount: number, pan = 0, near = 1): void {
    const A = this.T.voice.animals, at = this.ctx.currentTime + 0.06, f = v.pitch * (1 + 0.4 * Math.max(0, Math.min(1, amount)));
    const K = v.call;
    this.syllable(at, { pitch: f, end: f * 1.15 * (K?.glide ?? 1), vowel: K?.vowel ?? Math.floor(Math.random() * VOWELS.length), dur: 0.08 * (K?.dur ?? 1), formants: v.formants, wave: v.wave, gain: A.volume * A.reply * near, grit: 0, pan, consonant: false, pure: K?.pure, trill: K?.trill, am: K?.am, noise: K?.noise });
  }

  /** A 💌 landing: a small glassy chime (a bell's partials); a spent one (inside the creature's
   *  gap: no affection) just a faint tick. */
  hit(pan = 0, near = 1, spent = false): void {
    const H = this.T.hit;
    if (!this.ready(spent ? "hitSpent" : "hit", H.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, out = this.voice(pan);
    const f = mtof(degree(this.root + 24, Math.floor(Math.random() * 5)));
    const vol = H.volume * near * (spent ? 0.3 : 1);
    for (const [ratio, lvl, dec] of [[1, 1, 0.35], [2.76, 0.45, 0.18], [5.4, 0.2, 0.08]] as const) {
      const g = c.createGain(); g.connect(out); this.env(g, at, vol * lvl, 0.002, spent ? dec * 0.4 : dec);
      this.osc("sine", f * ratio, at, dec + 0.05, g);
    }
  }

  /** The affection meter filling: a tick that climbs the key as it fills (0-1). */
  fill(amount: number, pan = 0, near = 1): void {
    const F = this.T.fill;
    const c = this.ctx, at = c.currentTime + 0.03, out = this.voice(pan);
    const steps = Math.max(1, Math.round(5 * F.octaves)), k = Math.round(Math.max(0, Math.min(1, amount)) * steps);
    const f = mtof(degree(this.root + 36, k));
    const g = c.createGain(); g.connect(out); this.env(g, at, F.volume * near, 0.002, 0.05);
    this.osc("square", f, at, 0.06, g);
  }

  /** Invited (the meter full, or talked round): a rising flourish up the key's bright side, longer
   *  and fuller the bigger the creature (level 0 baby to 3 legend), with a sparkle on top. */
  invited(level: number, pan = 0, near = 1): void {
    const I = this.T.invited, c = this.ctx, at = c.currentTime + 0.01, out = this.voice(pan);
    const n = 3 + Math.max(0, Math.min(3, level)), step = 0.07 - level * 0.006, vol = I.volume * near * (0.75 + level * 0.12);
    const base = this.root + 24 + 3; // (the relative major: brighter)
    for (let i = 0; i < n; i++) {
      const t = at + i * step, f = mtof(degree(base, i * 2 - (i > 2 ? 1 : 0)));
      const g = c.createGain(); g.connect(out); this.env(g, t, vol * (i === n - 1 ? 1 : 0.7), 0.004, i === n - 1 ? 0.5 + level * 0.15 : 0.16);
      this.osc("triangle", f, t, 0.7, g);
      if (level >= 2) { const g2 = c.createGain(); g2.connect(out); this.env(g2, t, vol * 0.25, 0.004, 0.2); this.osc("sine", f * 2, t, 0.3, g2); }
    }
    const end = at + n * step, hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 6000;
    const ng = c.createGain(); ng.connect(out); this.env(ng, end, vol * 0.3, 0.01, 0.35 + level * 0.1);
    hp.connect(ng); this.noiseBurst(end, 0.5, hp, 0.3);
  }

  // ——— states ———

  /** Turned enraged: a short low growl with a snarl of grit; `many` together, one heavier growl. */
  enraged(pan = 0, near = 1, many = 1): void {
    const E = this.T.enraged;
    if (!this.ready("enraged", E.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, out = this.voice(pan), vol = E.volume * near * Math.min(1.6, 1 + 0.15 * (many - 1));
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(1400, at); lp.frequency.exponentialRampToValueAtTime(260, at + 0.35); lp.Q.value = 4;
    const sh = c.createWaveShaper(); sh.curve = grit(); sh.connect(lp);
    const g = c.createGain(); g.connect(out); this.env(g, at, vol, 0.01, 0.38);
    lp.connect(g);
    const f = mtof(this.root + (many > 1 ? 0 : 12));
    for (const det of [-14, 0, 11]) { const o = this.osc("sawtooth", f, at, 0.42, sh); o.detune.value = det; o.frequency.exponentialRampToValueAtTime(f * 0.78, at + 0.35); }
  }

  /** Turned happy: a bubbly pop rising, and a tiny chime after it. */
  happy(pan = 0, near = 1): void {
    const H = this.T.happy;
    if (!this.ready("happy", H.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, out = this.voice(pan), vol = H.volume * near;
    const g = c.createGain(); g.connect(out); this.env(g, at, vol, 0.003, 0.09);
    const o = this.osc("sine", 380, at, 0.12, g); o.frequency.exponentialRampToValueAtTime(980, at + 0.07);
    const f = mtof(degree(this.root + 36 + 3, 2 + Math.floor(Math.random() * 3)));
    const g2 = c.createGain(); g2.connect(out); this.env(g2, at + 0.06, vol * 0.45, 0.002, 0.22);
    this.osc("triangle", f, at + 0.06, 0.3, g2);
  }

  /** A soundsystem lost (the next wave coming sooner): a sad sting, a party gone quiet rather than
   *  a death. A record scratch, the party's chord running down like a tape stopping, then a little
   *  clock ticking faster as the countdown jumps forward, and a soft chime. Heard anywhere. */
  lost(): void {
    const c = this.ctx, at = c.currentTime + 0.01, vol = this.T.lost.volume, out = this.voice(0);
    // the scratch: band-passed noise swept fast down and up
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 2.5;
    bp.frequency.setValueAtTime(3200, at); bp.frequency.exponentialRampToValueAtTime(700, at + 0.09); bp.frequency.exponentialRampToValueAtTime(2200, at + 0.16);
    const sg = c.createGain(); sg.connect(out); this.env(sg, at, vol * 0.7, 0.005, 0.17);
    bp.connect(sg); this.noiseBurst(at, 0.2, bp, 0.4);
    // the tape stop: the party's chord (the key's minor seventh) sagging an octave as the filter closes
    const t0 = at + 0.12, run = 0.9, lp = c.createBiquadFilter(), cg = c.createGain();
    lp.type = "lowpass"; lp.Q.value = 1; lp.frequency.setValueAtTime(5000, t0); lp.frequency.exponentialRampToValueAtTime(180, t0 + run);
    cg.gain.setValueAtTime(vol * 0.5, t0); cg.gain.setValueAtTime(vol * 0.5, t0 + run * 0.5); cg.gain.exponentialRampToValueAtTime(0.0001, t0 + run);
    lp.connect(cg); cg.connect(out);
    for (const m of [0, 3, 7, 10]) {
      const o = this.osc("sawtooth", mtof(this.root + 12 + m), t0, run, lp);
      o.frequency.exponentialRampToValueAtTime(mtof(this.root + m), t0 + run);
    }
    // the clock: ticks quickening (tick, tock), then a soft chime as it lands
    let t = t0 + run + 0.15;
    for (let i = 0; i < 7; i++) {
      const k = c.createBiquadFilter(), kg = c.createGain();
      k.type = "bandpass"; k.frequency.value = i % 2 ? 1500 : 2100; k.Q.value = 12;
      kg.connect(out); this.env(kg, t, vol * 0.9, 0.001, 0.035);
      k.connect(kg); this.noiseBurst(t, 0.04, k, i * 0.1);
      t += 0.2 * Math.pow(0.82, i);
    }
    const f = mtof(degree(this.root + 24, 2));
    for (const [r, l] of [[1, 1], [2.76, 0.35]]) { const g = c.createGain(); g.connect(out); this.env(g, t + 0.05, vol * 0.4 * l, 0.003, 0.6); this.osc("sine", f * r, t + 0.05, 0.7, g); }
  }

  // ——— legends ———

  /** A legend's slow attack winding up: a rising, quickening pulse and a swelling hum that land
   *  `length` seconds on, when it fires (well telegraphed: hear it, then move). */
  windup(pan = 0, near = 1, voice?: CreatureVoice): void {
    const W = this.T.windup;
    if (!this.ready("windup", 0.25)) return;
    // a legend's: one long building swell of its whale song, the telegraph (Ed, 2026-10-05)
    if (voice?.legend) { this.whale("swell", pan, Math.max(0.6, near), Math.max(0.3, W.length), W.volume * 0.5); return; }
    if (voice) this.speak(voice, "enraged", pan, Math.max(0.6, near), 9, Math.max(0.3, W.length));
    const c = this.ctx, at = c.currentTime + 0.005, len = Math.max(0.3, W.length), out = this.voice(pan), vol = W.volume * near * (voice ? 0.45 : 1);
    const g = c.createGain(); g.connect(out);
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + len * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, at + len + 0.12);
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 6;
    lp.frequency.setValueAtTime(300, at); lp.frequency.exponentialRampToValueAtTime(3200, at + len);
    // a tremolo speeding up (the pulse): an LFO on a gain
    const trem = c.createGain(); trem.gain.value = 0.5; trem.connect(g); lp.connect(trem);
    const lfo = c.createOscillator(), depth = c.createGain(); depth.gain.value = 0.5;
    lfo.frequency.setValueAtTime(4, at); lfo.frequency.exponentialRampToValueAtTime(18, at + len);
    lfo.connect(depth); depth.connect(trem.gain); lfo.start(at); lfo.stop(at + len + 0.2);
    const f0 = mtof(this.root + 12), f1 = mtof(this.root + 24);
    for (const det of [-7, 7]) { const o = this.osc("sawtooth", f0, at, len + 0.15, lp); o.detune.value = det; o.frequency.exponentialRampToValueAtTime(f1, at + len); }
    const sub = c.createGain(); sub.connect(out); sub.gain.setValueAtTime(0.0001, at); sub.gain.exponentialRampToValueAtTime(vol * 0.6, at + len); sub.gain.exponentialRampToValueAtTime(0.0001, at + len + 0.15);
    this.osc("sine", mtof(this.root), at, len + 0.2, sub);
  }

  /** The nearest sleeping legend, each frame (`sleep` 0-1 by how near, `unease` its restlessness by
   *  nearness): now and then a slow, soft moan of whale song as it dreams; restless, the moans come
   *  more often, wavering, a nightmare. (`breath` kept for the dream's timing.) */
  legends(sleep: number, breath: number, unease: number, pan = 0): void {
    const now = this.ctx.currentTime, Wh = this.T.whale;
    if (sleep <= 0.01) { this.nextMoan = Math.min(this.nextMoan, now + 1.5); return; }
    if (now < this.nextMoan) return;
    const bad = unease > 0.25;
    this.nextMoan = now + Wh.sleepEvery * (1 - 0.55 * unease) * (0.75 + 0.5 * Math.random()) / Math.max(0.3, Wh.speed);
    this.whale(bad ? "nightmare" : "sleep", pan, sleep * (bad ? this.T.nightmare.volume / Math.max(0.01, this.T.snore.volume) * (0.6 + 0.4 * unease) : 1) * (0.9 + 0.2 * breath), 0, this.T.snore.volume);
  }

  /** A legend sings (Ed, 2026-10-05: "the legends should sound like whale song; deep and slow"): a
   *  long, slow, deep moan gliding over seconds, its overtones through a resonant throat, a slow
   *  vibrato, low clicks, in a big space. Happy rises, melodic and calm; enraged groans lower and
   *  longer, falling, with grit; a nightmare wavers; an attack's swell builds for `length` seconds. */
  whale(kind: WhaleKind, pan = 0, near = 1, length = 0, volume = this.T.whale.volume): void {
    const Wh = this.T.whale, c = this.ctx, sp = Math.max(0.3, Wh.speed);
    if (kind !== "swell" && kind !== "sleep" && kind !== "nightmare" && !this.ready("whale", 1.2 / sp)) return;
    const at = c.currentTime + 0.01, base = Wh.depth * (kind === "enraged" ? 0.8 : kind === "happy" ? 1.15 : 1);
    // its contour: [share of the moan, semitones]
    const SHAPES: Record<WhaleKind, [number, number][]> = {
      happy: [[0, 0], [0.3, 5], [0.5, 3], [0.8, 8], [1, 10]],
      grumpy: [[0, 2], [0.6, 0], [1, -3]],
      enraged: [[0, 3], [0.25, 1], [1, -10]],
      sleep: [[0, 0], [0.45, 4], [1, -2]],
      nightmare: [[0, 0], [0.2, 3], [0.4, -2], [0.6, 4], [0.8, -3], [1, 1]],
      swell: [[0, -7], [0.7, 2], [1, 7]],
    };
    const dur = kind === "swell" ? Math.max(0.3, length) : ({ happy: 2.4, grumpy: 2, enraged: 3.2, sleep: 3, nightmare: 2.6 } as Record<string, number>)[kind] / sp;
    const vol = volume * near, pts = SHAPES[kind];
    const out = this.voice(pan), g = c.createGain();
    g.connect(out); g.connect(this.space());
    // swell: builds to the end; the rest breathe in and out slowly
    g.gain.setValueAtTime(0.0001, at);
    if (kind === "swell") { g.gain.exponentialRampToValueAtTime(vol * 0.15, at + dur * 0.3); g.gain.exponentialRampToValueAtTime(vol, at + dur); g.gain.exponentialRampToValueAtTime(0.0001, at + dur + 0.5); }
    else { g.gain.exponentialRampToValueAtTime(vol, at + dur * 0.3); g.gain.setValueAtTime(vol, at + dur * 0.65); g.gain.exponentialRampToValueAtTime(0.0001, at + dur); }
    // the throat: a resonant low-pass riding with the pitch
    const throat = c.createBiquadFilter(); throat.type = "lowpass"; throat.Q.value = 7;
    let into: AudioNode = throat;
    if (kind === "enraged") { const sh = c.createWaveShaper(); sh.curve = grit(); const pre = c.createGain(); pre.gain.value = 1.6; pre.connect(sh); sh.connect(throat); into = pre; }
    throat.connect(g);
    const lfo = c.createOscillator(), depth = c.createGain();
    lfo.frequency.value = kind === "nightmare" ? 3.1 + Math.random() : 4.5;
    depth.gain.value = kind === "nightmare" ? 45 : kind === "swell" ? 20 : 9; // (cents)
    lfo.connect(depth); lfo.start(at); lfo.stop(at + dur + 0.6);
    for (const [ratio, lvl, type] of [[1, 1, "sine"], [2, 0.35, "triangle"], [3, 0.14, "sine"]] as [number, number, OscillatorType][]) {
      const o = c.createOscillator(), og = c.createGain();
      o.type = type; og.gain.value = lvl;
      o.frequency.setValueAtTime(base * ratio * Math.pow(2, pts[0][1] / 12), at);
      for (const [x, st] of pts.slice(1)) o.frequency.exponentialRampToValueAtTime(base * ratio * Math.pow(2, st / 12), at + x * dur);
      depth.connect(o.detune);
      o.connect(og); og.connect(into); o.start(at); o.stop(at + dur + 0.6);
    }
    throat.frequency.setValueAtTime(base * 3, at);
    for (const [x, st] of pts.slice(1)) throat.frequency.exponentialRampToValueAtTime(base * (kind === "swell" ? 3 + 5 * x : 4) * Math.pow(2, st / 12), at + x * dur);
    // a soft upsweep near the end of a happy song
    if (kind === "happy" || kind === "sleep") {
      const t0 = at + dur * 0.7, ug = c.createGain(); ug.connect(g);
      ug.gain.setValueAtTime(0.0001, t0); ug.gain.exponentialRampToValueAtTime(0.12, t0 + 0.25); ug.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6);
      const u = this.osc("sine", base * 4, t0, 0.65, ug); u.frequency.exponentialRampToValueAtTime(base * 7, t0 + 0.55);
    }
    // low clicks and groans now and then (not in the swell: it stays one clear sound)
    if (kind !== "swell") for (let k = 0, n = 1 + Math.floor(Math.random() * 3); k < n; k++) {
      const t0 = at + dur * (0.15 + 0.7 * Math.random()), bp = c.createBiquadFilter(), cg = c.createGain();
      bp.type = "bandpass"; bp.frequency.value = 250 + Math.random() * 350; bp.Q.value = 3;
      cg.connect(out); cg.connect(this.space()); this.env(cg, t0, vol * 0.5, 0.001, 0.025);
      bp.connect(cg); this.noiseBurst(t0, 0.03, bp, Math.random());
    }
  }

  /** The legends' space: a long, dark generated reverb (built once). */
  private space(): GainNode {
    if (this.ocean) return this.ocean;
    const c = this.ctx, len = Math.floor(c.sampleRate * 4.5), ir = c.createBuffer(2, len, c.sampleRate);
    let r = 4242;
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) { r = (Math.imul(r, 1103515245) + 12345) >>> 0; const t = i / c.sampleRate; d[i] = ((r / 4294967296) * 2 - 1) * Math.exp(-t * 1.3) * (t < 0.03 ? t / 0.03 : 1); }
    }
    const conv = c.createConvolver(), dark = c.createBiquadFilter(), wet = c.createGain();
    conv.buffer = ir; dark.type = "lowpass"; dark.frequency.value = 1800; wet.gain.value = this.T.whale.reverb;
    this.ocean = c.createGain();
    this.ocean.connect(conv); conv.connect(dark); dark.connect(wet); wet.connect(this.out);
    return this.ocean;
  }
}

let gritCurve: Float32Array<ArrayBuffer> | null = null;
/** A hard-ish clip: the growl's snarl. */
function grit(): Float32Array<ArrayBuffer> {
  if (gritCurve) return gritCurve;
  const n = 512, out = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; out[i] = Math.tanh(x * 4); }
  return (gritCurve = out);
}
