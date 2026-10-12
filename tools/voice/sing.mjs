// A voice singing a list of notes, offline, with Pink Trombone (tools/voice/pink-trombone, MIT; docs/music/research.md:
// Ed, 2026-10-11, "a better vocalise"): sing(notes, options) gives a Float32Array. Each note { at, dur (s), midi, vowel,
// onset? }: the pitch glides to it (the glottis' own smoothing), the tongue glides to its vowel over `glide` seconds, the
// voice firms up through the note (tenseness from `tense[0]` to `tense[1]`), vibrato creeps in after `vibratoAfter`, and an
// onset consonant ("m", "n", "l") closes the tract at the lips or the tongue tip for its first `onsetTime` seconds. Between
// notes it's silent (the vocal folds still, the tract's ring dying away). Repeatable: the clock and the noise seeded.
import { PinkTrombone, setClock, setRandom, setNoiseSeed } from "./pink-trombone/index.js";

/** A vowel as the tongue's place: frontness (0 back to 1 front) and openness (0 close to 1 open). */
export const VOWELS = { ah: [0.35, 0.95], oh: [0.12, 0.6], oo: [0.05, 0.25], eh: [0.75, 0.7], ee: [0.95, 0.15], uh: [0.4, 0.6] };
/** Onsets: where the tract closes (0 the glottis to 1 the lips) and how fully; "m" also opens the nose. */
const ONSETS = { m: { at: 0.98, strength: 1, nasal: 1 }, n: { at: 0.78, strength: 1, nasal: 1 }, l: { at: 0.78, strength: 0.75, nasal: 0 } };

/** Sing `notes` for `seconds`. Options: sampleRate (48000), tractLength (36: a soprano; 44 a man's), tense [from, to]
 *  (0 breathy to 1 sharp), vibrato (its depth, a share of the pitch), vibratoRate (Hz), vibratoAfter (s), glide (s), onsetTime (s), seed. */
export function sing(notes, seconds, o = {}) {
  const rate = o.sampleRate ?? 48000, block = 256, frames = Math.ceil(seconds * rate), out = new Float32Array(frames);
  let ms = 0, r = (o.seed ?? 1) >>> 0 || 1;
  setClock(() => ms);
  setRandom(() => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296));
  setNoiseSeed(o.seed ?? 1);
  const pt = new PinkTrombone(null, { offline: { sampleRate: rate }, tractLength: o.tractLength ?? 36 });
  pt.vibrato.frequency = o.vibratoRate ?? 5.6;
  const [t0, t1] = o.tense ?? [0.45, 0.72], glide = o.glide ?? 0.09, onsetTime = o.onsetTime ?? 0.07;
  const sorted = [...notes].sort((a, b) => a.at - b.at);
  let fr = VOWELS.ah[0], op = VOWELS.ah[1], fromV = [fr, op], current = null, closure = null;
  for (let i = 0; i < frames; i += block) {
    const t = i / rate;
    ms = t * 1000;
    const n = sorted.findLast(x => x.at <= t && t < x.at + x.dur) ?? null;
    if (n !== current) { fromV = [fr, op]; current = n; }
    if (n) {
      const into = t - n.at, k = Math.min(1, into / Math.max(1e-3, Math.min(glide, n.dur / 2))), v = VOWELS[n.vowel] ?? VOWELS.ah;
      fr = fromV[0] + (v[0] - fromV[0]) * k; op = fromV[1] + (v[1] - fromV[1]) * k;
      pt.vowel.frontness = fr; pt.vowel.openness = op;
      pt.isVoiced = true; pt.pitch = n.midi;
      pt.glottis.UITenseness = t0 + (t1 - t0) * Math.min(1, into / Math.max(0.2, n.dur));
      pt.glottis.loudness = Math.pow(pt.glottis.UITenseness, 0.25);
      pt.vibrato.amount = into > (o.vibratoAfter ?? 0.25) ? (o.vibrato ?? 0.012) * Math.min(1, (into - (o.vibratoAfter ?? 0.25)) / 0.3) : 0;
      const on = n.onset ? ONSETS[n.onset] : null;
      if (on && into < onsetTime && !closure) { closure = pt.constrictions.add(on.at, on.strength); pt.nasality = on.nasal; }
      if (closure && (!on || into >= onsetTime)) { pt.constrictions.remove(closure); closure = null; pt.nasality = 0; }
    } else {
      pt.isVoiced = false;
      if (closure) { pt.constrictions.remove(closure); closure = null; pt.nasality = 0; }
    }
    out.set(pt.render(Math.min(block, frames - i)), i);
  }
  return out;
}

/** 16-bit PCM WAV bytes of mono samples (peak-normalised to `peak` if given). */
export function wav(samples, rate = 48000, peak) {
  let m = 0; for (const x of samples) m = Math.max(m, Math.abs(x));
  const g = peak && m > 0 ? peak / m : 1, b = Buffer.alloc(44 + samples.length * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + samples.length * 2, 4); b.write("WAVE", 8); b.write("fmt ", 12); b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write("data", 36); b.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(samples[i] * g * 32767))), 44 + i * 2);
  return b;
}
