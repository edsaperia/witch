// The Music Lab's measurements of a render: loudness, peak, energy in six bands, the spectral
// centroid, and a spectrogram picture (log frequency, 30 Hz to 16 kHz). For tuning the sound by
// eye and by number (tools/music-lab/analyse.cjs saves them).

export interface Analysis { rms: number; peak: number; /** the loudest 50 ms (dB): a hit's own level, however sparse */ short: number; bands: number[]; centroid: number; png?: string }

/** The six bands' upper edges (Hz): sub, bass, low mids, mids, highs, air. */
export const BANDS = [60, 250, 1000, 4000, 10000, 20000];
export const BAND_NAMES = ["sub", "bass", "lowmid", "mid", "high", "air"];

const db = (x: number) => (x > 0 ? 20 * Math.log10(x) : -120);

function fft(re: Float64Array, im: Float64Array): void {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const ar = re[i + k], ai = im[i + k], br = re[i + k + len / 2] * cr - im[i + k + len / 2] * ci, bi = re[i + k + len / 2] * ci + im[i + k + len / 2] * cr;
        re[i + k] = ar + br; im[i + k] = ai + bi; re[i + k + len / 2] = ar - br; im[i + k + len / 2] = ai - bi;
        const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
      }
    }
  }
}

/** Measure a rendered buffer (both channels averaged for the spectrum). */
export function analyse(buf: AudioBuffer, picture = false): Analysis {
  const n = buf.length, rate = buf.sampleRate, chans = Array.from({ length: buf.numberOfChannels }, (_, c) => buf.getChannelData(c));
  let sum = 0, peak = 0;
  for (const d of chans) for (let i = 0; i < n; i++) { const v = d[i]; sum += v * v; const a = Math.abs(v); if (a > peak) peak = a; }
  const rms = Math.sqrt(sum / (n * chans.length));
  const win50 = Math.floor(rate * 0.05);
  let short = 0;
  for (let s = 0; s + win50 <= n; s += win50 >> 1) {
    let e = 0;
    for (const d of chans) for (let i = s; i < s + win50; i++) e += d[i] * d[i];
    short = Math.max(short, Math.sqrt(e / (win50 * chans.length)));
  }
  const N = 2048, hop = 512, frames = Math.max(1, Math.floor((n - N) / hop)), win = new Float64Array(N);
  for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1));
  const bands = new Array(BANDS.length).fill(0), H = 200, W = Math.min(frames, 900), cols: Float64Array[] = [];
  let cw = 0, cs = 0;
  for (let f = 0; f < frames; f++) {
    const re = new Float64Array(N), im = new Float64Array(N);
    for (let i = 0; i < N; i++) { let v = 0; for (const d of chans) v += d[f * hop + i]; re[i] = (v / chans.length) * win[i]; }
    fft(re, im);
    const mag = new Float64Array(N / 2);
    for (let k = 1; k < N / 2; k++) {
      const p = re[k] * re[k] + im[k] * im[k], hz = (k * rate) / N;
      mag[k] = p;
      const b = BANDS.findIndex(e => hz < e);
      bands[b < 0 ? BANDS.length - 1 : b] += p;
      cw += hz * p; cs += p;
    }
    if (picture && f % Math.ceil(frames / W) === 0) cols.push(mag);
  }
  const total = bands.reduce((a, b) => a + b, 0) || 1;
  const out: Analysis = { rms: db(rms), peak: db(peak), short: db(short), bands: bands.map(b => 10 * Math.log10(b / total + 1e-12)), centroid: cs ? cw / cs : 0 };
  if (picture && typeof document !== "undefined") {
    const cv = document.createElement("canvas"); cv.width = cols.length; cv.height = H;
    const g = cv.getContext("2d")!, img = g.createImageData(cols.length, H);
    const lo = Math.log(30), hi = Math.log(16000);
    cols.forEach((mag, x) => {
      for (let y = 0; y < H; y++) {
        const hz = Math.exp(lo + ((H - 1 - y) / (H - 1)) * (hi - lo)), k = Math.min(N / 2 - 1, Math.max(1, Math.round((hz * N) / rate)));
        const v = Math.max(0, Math.min(1, (10 * Math.log10(mag[k] + 1e-12) + 30) / 70)); // -30 dB .. +40 dB
        const o = (y * cols.length + x) * 4;
        img.data[o] = Math.round(255 * Math.min(1, v * 1.6)); img.data[o + 1] = Math.round(255 * Math.max(0, v * 1.6 - 0.6)); img.data[o + 2] = Math.round(255 * (v < 0.5 ? v : 1 - v) * 1.2); img.data[o + 3] = 255;
      }
    });
    g.putImageData(img, 0, 0);
    out.png = cv.toDataURL("image/png");
  }
  return out;
}
