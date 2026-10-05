// Renders every sound effect (src/platform/sfx.ts) offline, for tools/sfx/check.mjs: each in its
// own OfflineAudioContext, measured (rms, peak, NaN) and returned as 16-bit mono samples.
import { Sfx } from "../../src/platform/sfx";
import { TUNING } from "../../src/rules/tuning";
import style from "../../config/music-style.json";
import { voiceOf } from "../../src/platform/sfxCues";
import type { Creature } from "../../src/rules/creatures";

const v = (species: string, level: number) => voiceOf({ species, level, boss: level === 3 } as unknown as Creature, TUNING);

type Play = (s: Sfx) => void;
const SOUNDS: [string, number, Play][] = [
  ["witch-chatter", 2.4, () => {}],
  ["reply-baby", 0.4, s => s.reply(v("hare", 0), 0.5)],
  ["speak-baby-happy", 0.8, s => s.speak(v("hare", 0), "happy")],
  ["speak-young-grumpy", 0.9, s => s.speak(v("fox", 1), "grumpy")],
  ["speak-adult-enraged", 0.9, s => s.speak(v("wolf", 2), "enraged")],
  ["speak-swarm-enraged", 0.9, s => s.speak(v("woodlouse", 1), "enraged")],
  ["speak-legend-enraged", 5, s => s.speak(v("bear", 3), "enraged")],
  ["legend-happy", 4.5, s => s.speak(v("bear", 3), "happy")],
  ["legend-windup", 3, s => s.windup(0, 1, v("bear", 3))],
  ["fight-crowd", 1.4, s => { const sp = ["wolf", "fox", "boar", "hare", "owl", "stoat", "badger", "toad"]; sp.forEach((x, i) => s.speak(v(x, (i % 3) as number), i % 2 ? "enraged" : "happy", (i % 5) / 2 - 1, 1 - i * 0.1)); }],
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
  ["legend-sleep", 5, s => s.legends(1, 1, 0)],
  ["legend-nightmare", 5, s => s.legends(1, 0.5, 1)],
];

async function render(name: string, seconds: number, play: Play) {
  const rate = 22050, oc = new OfflineAudioContext(2, Math.ceil(seconds * rate), rate);
  // (the letter hose: one rendering, letters spaced in time by suspending the context)
  const s = new Sfx(oc, 1, TUNING.sfx, (style as { root: number }).root + 24);
  if (name === "witch-chatter") {
    // her 💌 hose as #89 fires it: bursts of 3 letters 0.12 s apart, a burst every 0.6 s
    for (let b = 0; b < 4; b++) for (let i = 0; i < 3; i++) { const at = b * 0.6 + i * 0.12; void oc.suspend(Math.round(at * rate) / rate).then(() => { s.letter(0); return oc.resume(); }); }
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
