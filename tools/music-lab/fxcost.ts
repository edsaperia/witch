// The voice effects' own cost (src/platform/audio/voiceFx.ts): a sung line (a saw through a vowel's band, a note a beat)
// through VoiceFx with the style's settings, rendered offline at 48 kHz, timed against the audio it makes; then each effect
// taken out in turn, and none at all. Bundled into a page by tools/music-lab/fxcost.cjs.
import styleJson from "../../config/music-style.json";
import { VoiceFx, VOICE_FX, type VoiceFxSettings } from "../../src/platform/audio/voiceFx";

const RATE = 48000, SECS = 16;
const style = styleJson as unknown as { voiceFx?: Partial<VoiceFxSettings> };

async function render(settings: Partial<VoiceFxSettings> | null, whisper: boolean, shed = 0): Promise<number> {
  const oc = new OfflineAudioContext(2, RATE * SECS, RATE);
  const fx = settings ? new VoiceFx(oc, settings, () => 120) : { input: oc.createGain(), output: null as unknown as GainNode, whisper: () => {}, release: () => {}, shedTo: undefined as undefined | ((n: number) => void) };
  if (!settings) fx.output = fx.input;
  if (shed) (fx as { shedTo?: (n: number) => void }).shedTo?.(shed);
  if (whisper) { const b = oc.createBuffer(1, RATE * 3, RATE), d = b.getChannelData(0); let r = 1; for (let i = 0; i < d.length; i++) { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; d[i] = (r / 4294967296 * 2 - 1) * (0.5 + 0.5 * Math.sin(i / 3000)); } fx.whisper(b); }
  fx.output.connect(oc.destination);
  for (let n = 0; n < SECS * 2; n++) {
    const t = n * 0.5, o = oc.createOscillator(), g = oc.createGain(), bp = oc.createBiquadFilter();
    o.type = "sawtooth"; o.frequency.value = 330 * Math.pow(2, (n % 5) / 12); bp.type = "bandpass"; bp.frequency.value = 900;
    o.connect(bp).connect(g).connect(fx.input);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.3, t + 0.05); g.gain.linearRampToValueAtTime(0, t + 0.45);
    o.start(t); o.stop(t + 0.5);
    if (n % 8 === 7) fx.release(t + 0.45);
  }
  const t0 = performance.now(); await oc.startRendering();
  return (performance.now() - t0) / 1000 / SECS;
}

async function fxCost(): Promise<Record<string, number>> {
  const base = { ...(style.voiceFx ?? {}) }, out: Record<string, number> = {};
  const best = async (s: Partial<VoiceFxSettings> | null, w: boolean, shed = 0) => { let m = Infinity; for (let i = 0; i < 3; i++) m = Math.min(m, await render(s, w, shed)); return m; };
  out["no VoiceFx at all"] = await best(null, false);
  out["VoiceFx, every level 0"] = await best({}, false);
  out["the style's effects"] = await best(base, false);
  out["the style's effects + whisper vocoder"] = await best(base, true);
  for (const k of VOICE_FX) if ((base[k] ?? 0) > 0) out[`  without ${k}`] = await best({ ...base, [k]: 0 }, k !== "whisper");
  for (const shed of [1, 2, 3]) out[`shed step ${shed}`] = await best(base, true, shed);
  return out;
}
(window as unknown as { fxCost: typeof fxCost }).fxCost = fxCost;
