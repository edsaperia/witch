// The basslines before and after (Ed, 2026-11-09, of the house bass: "The bass is on all the offbeats? It's repetitive and too
// high"; tools/music-lab/bass.mjs): the game's engine renders a section offline (drums, bass, pad and the melody, as the game
// plays it), and says which bass pattern each four-bar phrase took and the bass's range. Lab-only: nothing here changes the game.
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { newBeatClock } from "../../src/rules/beat";
import type { MusicCue } from "../../src/rules/musicPlan";
import * as S from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const style = styleJson as unknown as S.MusicStyle, RATE = 44100;
const NM = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], nm = (m: number) => NM[m % 12] + (Math.floor(m / 12) - 1);
function pcmOf(buf: AudioBuffer) {
  const L = buf.getChannelData(0), R = buf.getChannelData(1), pcm = new Int16Array(L.length * 2);
  let peak = 0, nan = 0;
  for (let i = 0; i < L.length; i++) for (const [c, x] of [[0, L[i]], [1, R[i]]] as const) { if (!Number.isFinite(x)) { nan++; continue; } peak = Math.max(peak, Math.abs(x)); pcm[2 * i + c] = Math.max(-32767, Math.min(32767, Math.round(x * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: buf.sampleRate, peak, nan, seconds: buf.duration, pcm: btoa(s) };
}
/** `bars` bars of `section` on wave `wave`'s step from the form's top, seed `seed`: its mix, and each phrase's bass pattern. */
async function bassRender(o: { section: string; wave: number; seed: number; bars: number }) {
  const spb = 60 / style.bpm / 4, oc = new OfflineAudioContext(2, Math.ceil((o.bars * 16 * spb + 3) * RATE), RATE);
  const e = new MusicEngine(oc, oc.destination, style, o.seed);
  const cue: MusicCue = { waves: Array.from({ length: o.wave }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: o.wave, forceSection: o.section };
  e.renderAhead(cue, 0, o.bars * 16 * spb, newBeatClock(style.bpm));
  const sec = S.resolveSection(style, o.section), u = sec.parts.bass, own = typeof u === "string" ? u : u?.p ?? "-", a = S.arcStep(style, o.wave), C = style.compose;
  const pick = (S as unknown as { bassPatternName?: (...x: unknown[]) => string }).bassPatternName;
  const phrases: string[] = [];
  for (let b = 0; b < o.bars; b += 4) phrases.push(`bars ${b + 1}-${b + 4}: ${pick && C ? pick(C, "bass", own, o.section, a.energy, b, o.seed) : own}`);
  const plan: S.BlockPlan = { section: o.section, start: 0, bars: 16, wave: o.wave, arc: o.wave };
  const notes = Array.from({ length: o.bars * 16 }, (_, i) => S.notesAt(style, plan, null, i, { seed: o.seed, siege: 0, formStart: 0 })).flat().filter(n => style.parts[n.part]?.role === "bass" && n.midi !== null);
  const lo = Math.min(...notes.map(n => n.midi!)), hi = Math.max(...notes.map(n => n.midi!)), parts = [...new Set(notes.map(n => `${n.part} (${n.patch})`))].join(", ");
  return { ...pcmOf(await oc.startRendering()), phrases, range: notes.length ? `${nm(lo)} to ${nm(hi)}` : "no bass", parts, energy: a.energy };
}
Object.assign(window as unknown as { bassRender: typeof bassRender }, { bassRender });
