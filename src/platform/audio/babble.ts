// Babble (Ed, 2026-10-05): speech without words, a voiced source through a vowel's formants. The
// witch's 💌s are her syllables, a phrase lifting at the end like an invitation; her "ouch!" and
// knockdown "whoa-oh"; every creature's attack a burst in its own voice (platform/audio/voices.ts)
// by mood, a canid's howl, a small reply to a 💌. At most `voice.animals.maxVoices` creatures at
// once, the least near giving way. Legends sing whale song instead (platform/audio/whale.ts).
import type { SfxKit } from "./sfxKit";
import { grit } from "./dsp";
import type { CreatureVoice, Mood } from "./voices";

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
/** A syllable's sound: its pitch gliding to `end`, a vowel through formants (or `pure`, a whistled
 *  tone), a trill ([Hz, cents]), a buzz or rattle (`am`: [Hz, depth]), breath or hiss (`noise` 0-1). */
interface SyllableSpec { pitch: number; end: number; vowel: number; dur: number; formants: number; wave: OscillatorType; gain: number; grit: number; pan: number; consonant: boolean; pure?: boolean; trill?: number[]; am?: number[]; noise?: number }

/** A burst's mouth (the audit's phase 2: a crowd's speech was most of the nodes the game made): the vowel's three formant
 *  filters and the consonant's hiss, built once for a burst and re-tuned at each syllable's start (a burst's syllables
 *  never overlap), each syllable's own source and envelope feeding it. */
interface Mouth { input: GainNode; formants: { bp: BiquadFilterNode; fg: GainNode }[]; hp: BiquadFilterNode; ng: GainNode }

/** Notes a source in a burst's list, if it keeps one (never `track?.push(f())`: optional chaining would skip making it). */
const keep = (track: AudioScheduledSourceNode[] | undefined, s: AudioScheduledSourceNode): void => { track?.push(s); };

export class Babble {
  private phrase = { at: -Infinity, n: 0, vowel: 0 };
  /** The voices speaking now (the cap: voice.animals.maxVoices), each with its gain to duck and how much it matters. */
  private speaking: { g: GainNode; end: number; prio: number; sources: AudioScheduledSourceNode[] }[] = [];
  /** When a voice last gave way to a nearer one (the audit's phase 2: a crowd's churn of voices cut short). */
  private lastSwap = -Infinity;

  /** `legend`: a legend's voice, its whale song (platform/audio/whale.ts). */
  constructor(private k: SfxKit, private legend: (mood: Mood, pan: number, near: number) => void) {}

  /** A 💌 sent: the witch says a syllable (Ed, 2026-10-05: "rapid fire sounds like talking: you are
   *  inviting"). Babble in her own voice, its vowels varied, each burst a little phrase lifting at
   *  the end like an invitation, so a hose of them is her chattering away. */
  letter(pan = 0, near = 1): void {
    const V = this.k.T.voice.witch, c = this.k.ctx, now = c.currentTime;
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
  private syllable(at: number, o: SyllableSpec, out?: GainNode, track?: AudioScheduledSourceNode[], mouth?: Mouth): GainNode {
    const K = this.k, c = K.ctx, dest = out ?? K.voice(o.pan), g = c.createGain(), m = o.pure ? undefined : mouth; // (a whistle has no vowels: its own path)
    g.connect(m ? m.input : dest);
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
      lfo.connect(d); d.connect(amg.gain); amg.connect(g); lfo.start(at); lfo.stop(at + o.dur + 0.03); keep(track, lfo);
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
    if (o.trill && o.trill[0] > 0 && o.trill[1] > 0) { const lfo = c.createOscillator(), d = c.createGain(); lfo.frequency.value = o.trill[0]; d.gain.value = o.trill[1]; lfo.connect(d); d.connect(src.detune); lfo.start(at); lfo.stop(at + o.dur + 0.03); keep(track, lfo); }
    src.connect(sg);
    let feed: AudioNode = sg;
    if (o.grit > 0) { const sh = c.createWaveShaper(); sh.curve = grit(); const pre = c.createGain(); pre.gain.value = 1 + o.grit * 3; sg.connect(pre); pre.connect(sh); feed = sh; }
    // breath or a hiss through the same mouth
    let breath: AudioNode | null = null;
    if ((o.noise ?? 0) > 0.01) { const ng = c.createGain(); ng.gain.value = (o.noise ?? 0) * 1.6; keep(track, K.noiseBurst(at, o.dur + 0.02, ng, Math.random())); breath = ng; }
    if (m) {
      // into the burst's mouth: the voice and its breath under this syllable's envelope (g), the formants re-tuned to its vowel
      feed.connect(body); breath?.connect(body);
      for (const [i, [f, lvl]] of VOWELS[o.vowel].entries()) {
        const { bp, fg } = m.formants[i];
        bp.frequency.setValueAtTime(f * o.formants * (i === 0 ? 0.6 : 0.9), at);
        bp.frequency.linearRampToValueAtTime(f * o.formants, at + 0.025);
        fg.gain.setValueAtTime(lvl * 2.2, at);
      }
    } else if (o.pure) {
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
    src.start(at); src.stop(at + o.dur + 0.03); keep(track, src);
    if (o.consonant) {
      const t0 = at - 0.012 > 0 ? at - 0.012 : at, hf = 2500 + Math.random() * 3000;
      if (m) { m.hp.frequency.setValueAtTime(hf, t0); K.env(m.ng, t0, o.gain * 0.25, 0.003, 0.02); keep(track, K.noiseBurst(t0, 0.03, m.hp, Math.random())); }
      else {
        const hp = c.createBiquadFilter(), ng = c.createGain();
        hp.type = "highpass"; hp.frequency.value = hf;
        ng.connect(dest); K.env(ng, t0, o.gain * 0.25, 0.003, 0.02);
        hp.connect(ng); keep(track, K.noiseBurst(t0, 0.03, hp, Math.random()));
      }
    }
    return g;
  }

  /** A mouth for a burst into `out` (see Mouth). */
  private mouth(out: GainNode): Mouth {
    const c = this.k.ctx, input = c.createGain();
    const formants = [0, 1, 2].map(i => {
      const bp = c.createBiquadFilter(), fg = c.createGain();
      bp.type = "bandpass"; bp.Q.value = i === 0 ? 6 : 9;
      input.connect(bp); bp.connect(fg); fg.connect(out);
      return { bp, fg };
    });
    const hp = c.createBiquadFilter(), ng = c.createGain();
    hp.type = "highpass"; ng.gain.value = 0.0001; hp.connect(ng); ng.connect(out);
    return { input, formants, hp, ng };
  }

  /** A creature speaks (Ed, 2026-10-05: its attacks are speech, "higher pitched for smaller animals /
   *  levels; happy speech from happy animals, angry speech from enraged animals"): a burst of babble
   *  in its own voice, delivered by mood. `prio` (nearness) decides who's heard when too many speak
   *  at once: the quietest gives way. */
  speak(v: CreatureVoice, mood: Mood, pan = 0, near = 1, prio = near): void {
    if (v.legend) { this.legend(mood, pan, near); return; } // (Ed: legends sound like whale song)
    const A = this.k.T.voice.animals, c = this.k.ctx, now = c.currentTime;
    this.speaking = this.speaking.filter(s => s.end > now);
    if (this.speaking.length >= A.maxVoices) {
      let low = 0;
      for (let i = 1; i < this.speaking.length; i++) if (this.speaking[i].prio < this.speaking[low].prio) low = i;
      // (it's the least of them, or not clearly nearer, or a voice gave way only just now: unheard. A crowd all speaking at
      // once otherwise cut each other off many times a second, every cut-short burst's syllables still running unheard)
      if (this.speaking[low].prio + (A.swapBy ?? 0) >= prio || now - this.lastSwap < (A.swapGap ?? 0)) return;
      const quiet = this.speaking.splice(low, 1)[0];
      this.lastSwap = now;
      quiet.g.gain.cancelScheduledValues(now); quiet.g.gain.setTargetAtTime(0, now, 0.03);
      for (const src of quiet.sources) try { src.stop(now + 0.12); } catch { /* already done */ } // (its syllables still to come never sound: they cost the audio thread nothing)
    }
    // the rest give it room: each voice a little quieter the more are talking
    const crowd = 1 / Math.sqrt(1 + this.speaking.length * A.duck);
    const K = v.call, out = this.k.voice(pan), n = A.syllables[0] + Math.floor(Math.random() * (A.syllables[1] - A.syllables[0] + 1)) + (K?.extra ?? 0);
    let t = now + 0.005, v0 = Math.floor(Math.random() * VOWELS.length);
    const sources: AudioScheduledSourceNode[] = [], mouth = this.mouth(out);
    const vol = A.volume * near * crowd * Math.min(1.8, Math.max(1, Math.pow(A.pitch / v.pitch, 0.4))) * (v.call?.volume ?? 1); // (low voices carry less: lifted)
    for (let i = 0; i < n; i++) {
      const x = n > 1 ? i / (n - 1) : 0;
      // the contour: happy lifts and bounces, enraged starts high and falls hard, grumpy mutters flat and low
      const shape = mood === "happy" ? 0.1 + 0.35 * x + (i % 2 ? 0.12 : 0) : mood === "enraged" ? 0.35 - 0.55 * x : -0.1 + 0.08 * Math.sin(i * 2.3);
      const f = v.pitch * (1 + 0.5 * shape);
      const dur = (mood === "enraged" ? 0.07 : mood === "happy" ? 0.1 : 0.11) * (K?.dur ?? 1);
      v0 = (v0 + 1 + Math.floor(Math.random() * 3)) % VOWELS.length;
      // its call (the family's, the species' tweaks) shaping the mood's delivery
      this.syllable(t, {
        pitch: f, end: f * (mood === "enraged" ? 0.82 : mood === "happy" ? 1.12 : 0.95) * (K?.glide ?? 1), vowel: K?.vowel ?? v0, dur, formants: v.formants, wave: v.wave,
        gain: vol * (mood === "enraged" && i === 0 ? 1.15 : 1), grit: mood === "enraged" ? 0.6 : mood === "grumpy" ? 0.15 : 0, pan,
        consonant: Math.random() < (K?.consonant ?? 0.6), pure: K?.pure, trill: K?.trill, am: K?.am, noise: K?.noise,
      }, out, sources, mouth);
      t += dur + (mood === "enraged" ? 0.015 : mood === "happy" ? 0.04 + (i % 2) * 0.03 : 0.05) * (K?.gap ?? 1);
    }
    this.speaking.push({ g: out, end: t, prio, sources });
  }

  /** A canid turning enraged: a short howl, rising and falling (its family's `turn`). */
  howl(v: CreatureVoice, pan = 0, near = 1): void {
    const A = this.k.T.voice.animals, at = this.k.ctx.currentTime + 0.01, p = v.pitch * 1.4, out = this.k.voice(pan), vol = A.volume * near;
    const base = { formants: v.formants, wave: v.wave, grit: 0.1, pan, consonant: false, trill: [5, 25] };
    this.syllable(at, { ...base, pitch: p, end: p * 1.5, vowel: 4, dur: 0.4, gain: vol * 0.8 }, out);
    this.syllable(at + 0.36, { ...base, pitch: p * 1.5, end: p * 1.05, vowel: 0, dur: 0.75, gain: vol }, out);
  }

  /** A restless legend calling out sadly (Ed, 2026-10-06: "during the restless period, the legend
   *  should call out sadly"): its own species' call, lowered and slowed, two to four long falling
   *  syllables with a slow sob of vibrato, into the legends' big space and muffled with distance.
   *  `urgency` (its restlessness, 0-1): more syllables, higher and louder, the sob quicker. */
  lament(v: CreatureVoice, urgency: number, pan = 0, near = 1): void {
    const K = this.k, L = K.T.lament, c = K.ctx, at = c.currentTime + 0.01, u = Math.max(0, Math.min(1, urgency)), call = v.call;
    const n = 2 + (u > 0.45 ? 1 : 0) + (u > 0.8 ? 1 : 0), p = v.pitch * L.pitch * (1 + 0.18 * u);
    // muffled the farther it is: a low-pass closing with distance, so it reads as far off over there
    const out = K.voice(pan), lp = c.createBiquadFilter(), mix = c.createGain(), wet = c.createGain();
    lp.type = "lowpass"; lp.frequency.value = 900 + 6000 * near * near; lp.connect(out);
    mix.connect(lp); mix.connect(wet); wet.gain.value = 0.6 + 0.4 * (1 - near); wet.connect(K.space());
    const vol = L.volume * (0.75 + 0.25 * u) * (0.35 + 0.65 * near) * (call?.volume ?? 1);
    let t = at;
    for (let i = 0; i < n; i++) {
      const last = i === n - 1, dur = (0.42 + (last ? 0.35 : 0)) * L.slow * Math.max(0.6, call?.dur ?? 1) * (1 - 0.2 * u);
      const f = p * (i === 0 ? 1.06 : 1 - 0.04 * i);
      this.syllable(t, {
        pitch: f, end: f * (last ? 0.7 : 0.86), vowel: call?.vowel ?? (i % 2 ? 4 : 3), dur, formants: v.formants * 0.9, wave: v.wave,
        gain: vol * (last ? 1 : 0.8), grit: 0, pan, consonant: false, pure: call?.pure, am: call?.am, noise: call?.noise ? call.noise * 0.6 : undefined,
        trill: [3.5 + 2.5 * u, 30 + 40 * u], // (a sob: a slow wide vibrato, quicker as it frets)
      }, mix);
      t += dur + 0.12 * L.slow * (call?.gap ?? 1);
    }
  }

  /** A creature's answer to a 💌 that lands (optional, Ed): one small syllable in its own voice, lifting as its affection fills. */
  reply(v: CreatureVoice, amount: number, pan = 0, near = 1): void {
    const A = this.k.T.voice.animals, at = this.k.ctx.currentTime + 0.06, f = v.pitch * (1 + 0.4 * Math.max(0, Math.min(1, amount)));
    const K = v.call;
    this.syllable(at, { pitch: f, end: f * 1.15 * (K?.glide ?? 1), vowel: K?.vowel ?? Math.floor(Math.random() * VOWELS.length), dur: 0.08 * (K?.dur ?? 1), formants: v.formants, wave: v.wave, gain: A.volume * A.reply * near, grit: 0, pan, consonant: false, pure: K?.pure, trill: K?.trill, am: K?.am, noise: K?.noise });
  }

  /** The witch hurt (Ed, 2026-10-05: "witch saying 'ouch!'"): a quick cry in her own babble voice,
   *  "ouch!" (a sharp rise, then a falling clipped "ch"), or now and then "oof!" or "eek!", over a
   *  soft thump. `strain` 0-1: how near she is to being knocked down, higher, harsher and louder. */
  ouch(strain = 0, pan = 0): void {
    const K = this.k, V = K.T.voice.witch, O = K.T.ouch, c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan);
    const p = V.pitch * (1.1 + 0.3 * strain) * (0.96 + 0.08 * Math.random()), vol = O.volume * (0.85 + 0.35 * strain), grit = 0.25 * strain;
    const base = { formants: V.timbre * (1 + 0.08 * strain), wave: "sawtooth" as OscillatorType, grit, pan, consonant: false };
    const pick = Math.random();
    if (pick < 0.6) {
      // "ow-ch": up sharply into the "ow", then down and clipped with a "ch" of breath
      this.syllable(at, { ...base, pitch: p, end: p * 1.4, vowel: 0, dur: 0.08, gain: vol }, out);
      this.syllable(at + 0.075, { ...base, pitch: p * 1.35, end: p * 0.85, vowel: 4, dur: 0.09, gain: vol * 0.85 }, out);
      const hp = c.createBiquadFilter(), ng = c.createGain();
      hp.type = "highpass"; hp.frequency.value = 3200; ng.connect(out); K.env(ng, at + 0.16, vol * 0.4, 0.003, 0.05);
      hp.connect(ng); K.noiseBurst(at + 0.16, 0.06, hp, Math.random());
    } else if (pick < 0.8) {
      // "oof!": one falling breath of a syllable
      this.syllable(at, { ...base, pitch: p * 0.85, end: p * 0.6, vowel: 4, dur: 0.14, gain: vol, noise: 0.35 }, out);
    } else {
      // "eek!": a high, squeezed rise
      this.syllable(at, { ...base, pitch: p * 1.5, end: p * 1.9, vowel: 2, dur: 0.12, gain: vol * 0.9 }, out);
    }
    K.thump(at, O.volume * (0.6 + 0.4 * strain), pan);
  }

  /** Knocked down: a longer "whoa-oh" as she's sent home, falling away, over a heavier thump. */
  knockdown(pan = 0): void {
    const K = this.k, V = K.T.voice.witch, O = K.T.ouch, at = K.ctx.currentTime + 0.005, out = K.voice(pan), p = V.pitch * 1.2, vol = O.volume * O.knockdown;
    const base = { formants: V.timbre, wave: "sawtooth" as OscillatorType, grit: 0.15, pan, consonant: false, trill: [6, 35] };
    this.syllable(at, { ...base, pitch: p, end: p * 1.45, vowel: 3, dur: 0.3, gain: vol }, out);
    this.syllable(at + 0.28, { ...base, pitch: p * 1.4, end: p * 0.55, vowel: 3, dur: 0.6, gain: vol * 0.9 }, out);
    K.thump(at, vol * 1.3, pan);
  }
}
