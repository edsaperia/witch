// Renders every sound effect (src/platform/sfx.ts) offline, for tools/sfx/check.mjs: each in its
// own OfflineAudioContext, measured (rms, peak, NaN) and returned as 16-bit mono samples.
import { Sfx } from "../../src/platform/sfx";
import { TUNING } from "../../src/rules/tuning";
import style from "../../config/music-style.json";

type Play = (s: Sfx) => void;
const SOUNDS: [string, number, Play][] = [
  ["letter-hose", 1.2, s => { for (let i = 0; i < 12; i++) setTimeout(() => s.letter((i % 3) - 1), 0); }],
  ["hit", 0.8, s => s.hit(0)],
  ["hit-spent", 0.5, s => s.hit(0, 1, true)],
  ["fill-0", 0.3, s => s.fill(0)],
  ["fill-1", 0.3, s => s.fill(1)],
  ["invited-baby", 1.2, s => s.invited(0)],
  ["invited-young", 1.3, s => s.invited(1)],
  ["invited-adult", 1.4, s => s.invited(2)],
  ["invited-legend", 1.6, s => s.invited(3)],
  ["enraged", 0.8, s => s.enraged(0)],
  ["enraged-crowd", 0.8, s => s.enraged(0, 1, 6)],
  ["happy", 0.6, s => s.happy(0)],
  ["windup", 1.6, s => s.windup(0)],
  ["snore", 3, s => s.legends(1, 1, 0)],
  ["nightmare", 3, s => s.legends(1, 0.5, 1)],
];

async function render(name: string, seconds: number, play: Play) {
  const rate = 22050, oc = new OfflineAudioContext(2, Math.ceil(seconds * rate), rate);
  // (the letter hose: one rendering, letters spaced in time by suspending the context)
  const s = new Sfx(oc, 1, TUNING.sfx, (style as { root: number }).root + 24);
  if (name === "letter-hose") {
    for (let i = 0; i < 12; i++) { const at = i * 0.07; void oc.suspend(Math.round(at * rate) / rate).then(() => { s.letter(((i * 7) % 5) / 2 - 1); return oc.resume(); }); }
  } else play(s);
  const buf = await oc.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1);
  let sum = 0, peak = 0, nan = false;
  const pcm = new Int16Array(L.length);
  for (let i = 0; i < L.length; i++) {
    const v = (L[i] + R[i]) / 2;
    if (!Number.isFinite(L[i]) || !Number.isFinite(R[i])) nan = true;
    sum += v * v; peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
    pcm[i] = Math.max(-32767, Math.min(32767, Math.round(v * 32767)));
  }
  let b = "";
  const bytes = new Uint8Array(pcm.buffer);
  for (let i = 0; i < bytes.length; i++) b += String.fromCharCode(bytes[i]);
  return { name, rms: Math.sqrt(sum / L.length), peak, nan, rate, pcm: btoa(b) };
}

(window as unknown as { sfxRender: () => Promise<unknown> }).sfxRender = async () => {
  const out = [];
  for (const [n, sec, p] of SOUNDS) out.push(await render(n, sec, p));
  return out;
};
