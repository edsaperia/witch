// The legends' clearings (tools/music-lab/circles.mjs): for each species, its legend's clearing as
// she walks into it on the ground (Ed, 2026-10-06): a few seconds of the music as it plays nearby,
// then the music muffling under the legend's own layer, the world (and so the music) slowing to a
// tenth there as a tape does (Ed, 2026-10-06), the layer at full speed over it, and out again at the
// end, speeding back up. Rendered offline through Music, as the game plays it; measured (the music
// before, the muffled music, the layer alone; peak, NaN). SLOW=0: no slowing, as before.
import { Music } from "../../src/platform/audio/music";
import { TUNING } from "../../src/rules/tuning";
import { mixAt, nearness } from "../../src/rules/music";
import { newBeatClock } from "../../src/rules/beat";
import type { MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle } from "../../src/rules/musicScore";
import styleJson from "../../config/music-style.json";

const style = styleJson as unknown as MusicStyle;
const RATE = 32000, FRAME = 1 / 30, LEVEL = 0.8, BEFORE = 3, OUT = 11, SECONDS = 14, DIST = 40;
/** The game's time scale at audio time t: easing to a tenth over half a second inside the clearing, and back as she leaves (as the game's g.timeScale). */
const scaleAt = (t: number, slow: boolean) => !slow ? 1 : t < BEFORE ? 1 : t < OUT ? Math.max(0.1, 1 - 0.9 * (t - BEFORE) / 0.5) : Math.min(1, 0.1 + 0.9 * (t - OUT) / 0.5);

async function render(species: string | null, layerOnly: boolean, seed: () => void, slow: boolean): Promise<AudioBuffer> {
  seed();
  const oc = new OfflineAudioContext(2, Math.ceil(SECONDS * RATE), RATE), M = TUNING.music, clock = newBeatClock(style.bpm);
  const m = new Music(oc, M.volume * LEVEL, style, 7);
  if (layerOnly) (m as unknown as { master: GainNode }).master.disconnect();
  const cue: MusicCue = { waves: [0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 1 };
  const mix = mixAt(M, nearness(M, DIST), 0, DIST);
  let game = 0;
  for (let f = 0; f * FRAME < SECONDS - 0.05; f++) {
    const t = f * FRAME, k = species ? scaleAt(t, slow) : 1, g = game;
    game += k * FRAME;
    void oc.suspend(Math.round(t * RATE) / RATE).then(() => {
      m.update(mix, { ...cue, circle: species && t >= BEFORE && t < OUT ? { species, level: M.circle.level } : undefined }, g, clock, true, M, k);
      return oc.resume();
    });
  }
  return oc.startRendering();
}

const db = (b: AudioBuffer, t0: number, t1: number) => {
  let s = 0, n = 0;
  for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = Math.floor(t0 * RATE); i < Math.min(d.length, t1 * RATE); i++) { s += d[i] * d[i]; n++; } }
  return 10 * Math.log10(s / Math.max(1, n) + 1e-12);
};
const pcm16 = (b: AudioBuffer): string => {
  const L = b.getChannelData(0), R = b.getChannelData(1), pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};

(window as unknown as { circleRender: (species: string[], slow?: boolean) => Promise<unknown> }).circleRender = async (species: string[], slow = true) => {
  const seed = (window as unknown as { seedRandom: () => void }).seedRandom, out = [];
  for (const sp of species) {
    const all = await render(sp, false, seed, slow), layer = await render(sp, true, seed, slow), none = await render(null, false, seed, slow);
    let peak = 0, nan = 0;
    for (let c = 0; c < 2; c++) for (const x of all.getChannelData(c)) { if (!Number.isFinite(x)) nan++; else peak = Math.max(peak, Math.abs(x)); }
    out.push({
      species: sp, rate: RATE, peak, nan,
      music: db(none, BEFORE + 2, OUT), inside: db(all, BEFORE + 2, OUT), layer: db(layer, BEFORE + 2, OUT), before: db(all, 0.5, BEFORE),
      pcm: pcm16(all),
    });
  }
  return out;
};
