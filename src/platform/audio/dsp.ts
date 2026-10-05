// What the synthesised sound shares (the music engine, platform/audio/musicEngine.ts, and the sound
// effects, platform/audio/sfx.ts): pitches, the key's pentatonic, seeded noise and the clip curve.

/** A MIDI note's frequency (Hz). */
export const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

/** The minor pentatonic's steps (semitones above the root). */
export const PENTA = [0, 3, 5, 7, 10];
/** Scale degree `k` (0 the root, 5 the octave above) as a MIDI note above `root`. */
export const degree = (root: number, k: number) => root + 12 * Math.floor(k / 5) + PENTA[((k % 5) + 5) % 5];

/** The seeded generator the noise and impulses are drawn from (the same every run): its next value, -1 to 1. */
export function lcg(seed: number): () => number {
  let r = seed;
  return () => { r = (Math.imul(r, 1103515245) + 12345) >>> 0; return (r / 4294967296) * 2 - 1; };
}

/** `seconds` of mono white noise from `seed`. */
export function noiseBuffer(ctx: BaseAudioContext, seconds: number, seed: number): AudioBuffer {
  const b = ctx.createBuffer(1, seconds * ctx.sampleRate, ctx.sampleRate), d = b.getChannelData(0), next = lcg(seed);
  for (let i = 0; i < d.length; i++) d[i] = next();
  return b;
}

let gritCurve: Float32Array<ArrayBuffer> | null = null;
/** A hard-ish clip: a growl's snarl, a voice's grit. */
export function grit(): Float32Array<ArrayBuffer> {
  if (gritCurve) return gritCurve;
  const n = 512, out = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; out[i] = Math.tanh(x * 4); }
  return (gritCurve = out);
}
