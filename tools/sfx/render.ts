// Renders every sound effect (src/platform/audio/sfx.ts) offline, for tools/sfx/check.mjs: each in its
// own OfflineAudioContext, measured (rms, peak, NaN) and returned as 16-bit mono samples.
import { Sfx } from "../../src/platform/audio/sfx";
import { TUNING } from "../../src/rules/tuning";
import style from "../../config/music-style.json";
import { voiceOf } from "../../src/platform/audio/voices";
import type { Creature } from "../../src/rules/creatures";
import type { NightKind } from "../../src/platform/audio/night";

const v = (species: string, level: number) => voiceOf({ species, level, boss: level === 3 } as unknown as Creature, TUNING);

type Play = (s: Sfx) => void;
const SOUNDS: [string, number, Play][] = [
  ["witch-chatter", 2.4, () => {}],
  ["species-calls", 21, () => {}],
  ["reply-baby", 0.4, s => s.reply(v("hare", 0), 0.5)],
  ["speak-baby-happy", 0.8, s => s.speak(v("hare", 0), "happy")],
  ["speak-young-grumpy", 0.9, s => s.speak(v("fox", 1), "grumpy")],
  ["speak-adult-enraged", 0.9, s => s.speak(v("wolf", 2), "enraged")],
  ["speak-swarm-enraged", 0.9, s => s.speak(v("woodlouse", 1), "enraged")],
  ["speak-legend-enraged", 5, s => s.speak(v("bear", 3), "enraged")],
  ["legend-happy", 4.5, s => s.speak(v("bear", 3), "happy")],
  ["legend-windup", 3, s => s.windup(0, 1)],
  ["howl", 1.4, s => s.howl(v("wolf", 2))],
  ["fight-crowd", 1.4, s => { const sp = ["wolf", "fox", "boar", "hare", "owl", "stoat", "badger", "toad"]; sp.forEach((x, i) => s.speak(v(x, (i % 3) as number), i % 2 ? "enraged" : "happy", (i % 5) / 2 - 1, 1 - i * 0.1)); }],
  ["witch-ouch", 7, () => {}],
  ["witch-knock", 6, () => {}],
  ["legend-charge", 9, () => {}],
  ["relic-found", 3, s => s.relic()],
  ["spell-hum", 3, s => s.spell("hum", 1)],
  ["spell-rustle", 0.5, s => s.spell("rustle", 1)],
  ["spell-crackle", 1.3, s => s.spell("crackle")],
  ["spell-burst", 2, s => s.spell("burst")],
  ["home-meadow", 12, () => {}],
  ["soundsystem-lost", 3, s => s.lost()],
  ["soundsystem-lost-urgent", 3, s => s.lost(true)],
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
  ["lob-landing", 2.8, () => {}],
  ["legend-roar", 2.8, s => s.roar()],
  ["stone-power", 2, s => s.power(4, 0, 1)],
  ["stone-power-soundsystem", 3, s => s.power(7, 0, 1, true)],
  ["stone-boot-12", 9.5, () => {}],
  ["legend-lament-elk", 8, s => s.lament(v("elk", 3), 0.15)],
  ["legend-lament-owl", 8, s => s.lament(v("owl", 3), 0.55)],
  ["legend-lament-wolf-urgent", 8, s => s.lament(v("wolf", 3), 1)],
  ["legend-lament-far", 8, s => s.lament(v("elk", 3), 0.5, 0.6, 0.25)],
  ["shoes", 3, () => {}],
  ["pond", 12, () => {}],
  ["sea", 16, () => {}],
  ...(["pine", "wood", "wet", "stream", "meadow", "open", "home"] as const).map(k => [`night-${k}`, 16, () => {}] as [string, number, Play]),
  ["night-crossfade", 16, () => {}],
  ["snores", 9, () => {}],
  ["picnic", 10, () => {}],
  ["creator-room", 12, () => {}],
  ["letter-land", 1.6, () => {}],
  ["boot-stir", 6, s => s.stir()],
  ["legend-sleep", 5, s => s.legends(1, 1, 0)],
  ["legend-nightmare", 5, s => s.legends(1, 0.5, 1)],
  ["deck-scratch", 4.2, () => {}],
  ["deck-whoop", 0.8, s => s.whoop()],
  ...(["oaks", "ravine", "stones", "cave"] as const).map(k => [`night-${k}`, 16, () => {}] as [string, number, Play]),
  ...(["oaks", "ravine", "stones", "cave", "wet"] as const).map(k => [`ambience-${k}`, 16, () => {}] as [string, number, Play]),
  ["sad-trumpet", 4, s => s.sadTrumpet(true)],
  ["sad-trumpet-bare", 2.4, s => s.sadTrumpet(false)],
  ["sad-trumpet-cut", 4, () => {}],
  ["sparkler", 10, () => {}],
];

async function render(name: string, seconds: number, play: Play) {
  const rate = 22050, oc = new OfflineAudioContext(2, Math.ceil(seconds * rate), rate);
  // (the letter hose: one rendering, letters spaced in time by suspending the context)
  const s = new Sfx(oc, 1, TUNING.sfx, (style as { root: number }).root + 24);
  if (name === "witch-chatter") {
    // her 💌 hose as #89 fires it: bursts of 3 letters 0.12 s apart, a burst every 0.6 s
    for (let b = 0; b < 4; b++) for (let i = 0; i < 3; i++) { const at = b * 0.6 + i * 0.12; void oc.suspend(Math.round(at * rate) / rate).then(() => { s.letter(0); return oc.resume(); }); }
  } else if (name === "deck-scratch") {
    // her scratch bars at the decks: two bars of strokes on the half-beats at 120 bpm, forward on the beat, back off it
    for (let k = 0; k < 16; k++) void oc.suspend(Math.round(k * 0.25 * rate) / rate).then(() => { s.scratch(k % 2 === 0); return oc.resume(); });
  } else if (name === "sad-trumpet-cut") {
    // knocked down with her hat: the trumpet, cut off by the rewind as she's whisked to her decks (3 s on, as hotel's float)
    const at = (sec: number, f: () => void) => void oc.suspend(Math.round(sec * rate) / rate).then(() => { f(); return oc.resume(); });
    at(0, () => s.sadTrumpet(true)); at(3, () => s.rewind());
  } else if (name === "witch-knock") {
    // a bite's small knock (1 m), a knockback attack's (4 m), a charge's big throw (9 m) with its stun's twinkle
    const at = (sec: number, f: () => void) => void oc.suspend(Math.round(sec * rate) / rate).then(() => { f(); return oc.resume(); });
    at(0, () => s.knock(1)); at(1.2, () => s.knock(4)); at(2.6, () => s.knock(9));
    for (let i = 0; i < 14; i++) at(2.75 + i * 0.13, () => s.twinkle(i));
  } else if (name === "letter-land") {
    // three 💌s that met no one coming down, a quarter second apart
    for (let i = 0; i < 3; i++) void oc.suspend(Math.round((0.1 + i * 0.4) * rate) / rate).then(() => { s.land(i - 1); return oc.resume(); });
  } else if (name === "shoes") {
    // four dancers' party shoes on the beat at 120 bpm
    for (let b = 0; b < 6; b++) void oc.suspend(Math.round(b * 0.5 * rate) / rate).then(() => { s.taps(4, 0, 1); return oc.resume(); });
  } else if (name.startsWith("ambience-")) {
    // an area's ambience in play (night.ts layers without their bed), up over 2 s and held: what she hears in the wild
    const kind = name.slice("ambience-".length) as NightKind;
    for (let k = 0; k * 0.1 < seconds - 0.2; k++) { const sec = k * 0.1, L = Math.min(1, sec / 2); void oc.suspend(Math.round(sec * rate) / rate).then(() => { s.ambience(kind, L); return oc.resume(); }); }
  } else if (name.startsWith("night-")) {
    // the party's over: the night coming in over 3 s, then held (the crossfade: the woods, then into a bog at 8 s)
    const kind = name.slice(6);
    for (let k = 0; k * 0.1 < seconds - 0.2; k++) { const sec = k * 0.1, L = Math.min(1, sec / 3); void oc.suspend(Math.round(sec * rate) / rate).then(() => { s.night(kind === "crossfade" ? (sec < 8 ? "wood" : "wet") : kind as NightKind, L); return oc.resume(); }); }
  } else if (name === "snores") {
    // three sleeping animals near her: a baby, an adult, a legend, taking turns
    for (let k = 0; k * 0.1 < seconds - 0.2; k++) { const sec = k * 0.1; void oc.suspend(Math.round(sec * rate) / rate).then(() => { s.snore([0, 0.66, 1][k % 3], (k % 3) - 1, 1); return oc.resume(); }); }
  } else if (name === "sea") {
    // walking down the beach to the water (two waves or so), then away up it until it's let go
    for (let k = 0; k * 0.1 < seconds - 0.2; k++) { const sec = k * 0.1, L = sec < 2 ? sec / 2 : sec < 11 ? 1 : Math.max(0, 1 - (sec - 11) / 2); void oc.suspend(Math.round(sec * rate) / rate).then(() => { s.sea(L, 0.3); return oc.resume(); }); }
  } else if (name === "sparkler") {
    // walking up to the ley pulse's tip, standing by it, and away until it's let go
    for (let k = 0; k * 0.1 < seconds - 0.2; k++) { const sec = k * 0.1, L = sec < 2 ? sec / 2 : sec < 7 ? 1 : Math.max(0, 1 - (sec - 7) / 1.5); void oc.suspend(Math.round(sec * rate) / rate).then(() => { s.sparkler(L, -0.2); return oc.resume(); }); }
  } else if (name === "pond" || name === "picnic" || name === "creator-room") {
    // walking up to it and standing by it: its level each 0.1 s
    for (let k = 0; k * 0.1 < seconds - 0.2; k++) { const sec = k * 0.1, L = Math.min(1, sec / 2); void oc.suspend(Math.round(sec * rate) / rate).then(() => { if (name === "pond") s.pond(L, -0.2); else if (name === "picnic") s.picnic(L, 0.2); else s.room(L); return oc.resume(); }); }
  } else if (name === "lob-landing") {
    // a creature's lob coming down, then a legend's
    void oc.suspend(0).then(() => { s.impact(false); return oc.resume(); });
    void oc.suspend(Math.round(0.8 * rate) / rate).then(() => { s.impact(true); return oc.resume(); });
  } else if (name === "legend-charge") {
    // windup bellow; the run building to its speed, rumbling; the braking arc's skid; the trot home
    const at = (sec: number, f: () => void) => void oc.suspend(Math.round(sec * rate) / rate).then(() => { f(); return oc.resume(); });
    at(0, () => s.bellow());
    let t = 1.2, speed = 2;
    while (t < 4.2) { const sp = speed; at(t, () => { s.hoof(); s.charge(Math.min(1, sp / 12), 0); }); t += Math.max(0.16, Math.min(0.5, 2.4 / sp)); speed = Math.min(14, speed + 2.2); }
    for (let k = 0; k <= 12; k++) { const sp = 14 * (1 - k / 12); at(4.2 + k * 0.1, () => s.charge(0, Math.min(1, sp / 10))); }
    at(5.5, () => s.charge(0, 0));
    for (let i = 0; i < 9; i++) at(5.7 + i * 0.34, () => s.hoof(0, 1, true));
  } else if (name === "stone-boot-12") {
    // the home ring's 12 runestones powering on round the ring, sped up (0.6 s apart), the last a chord
    for (let i = 0; i < 12; i++) void oc.suspend(Math.round(i * 0.6 * rate) / rate).then(() => { s.power(i, Math.sin((i / 12) * Math.PI * 2) * 0.8, 1, i === 11); return oc.resume(); });
  } else if (name === "home-meadow") {
    // walking in from home's edge to the dancefloor and out again: the meadow's level each 0.1 s
    for (let k = 0; k <= 115; k++) { const sec = k * 0.1, L = Math.min(1, sec / 3, Math.max(0, (11.5 - sec) / 3)); void oc.suspend(Math.round(sec * rate) / rate).then(() => { s.meadow(L); return oc.resume(); }); }
  } else if (name === "witch-ouch") {
    // eight hits, the strain rising toward her last, then knocked down
    for (let i = 0; i < 8; i++) void oc.suspend(Math.round(i * 0.6 * rate) / rate).then(() => { s.ouch(i / 7); return oc.resume(); });
    void oc.suspend(Math.round(5.2 * rate) / rate).then(() => { s.knockdown(); return oc.resume(); });
  } else if (name === "species-calls") {
    // one line per family (and the owl's hoot, the raven's croak, the canids' howl), each a young one's grumble then a happy reply
    const lines: [string, number][] = [["owl", 1], ["raven", 1], ["wolf", 2], ["fox", 1], ["bear", 2], ["boar", 1], ["elk", 2], ["hare", 0], ["squirrel", 1], ["beetle", 1], ["moth", 1], ["snake", 1], ["toad", 1], ["bat", 1], ["otter", 1], ["lynx", 1]];
    lines.forEach(([sp, lv], i) => {
      const at = i * 1.3;
      void oc.suspend(Math.round(at * rate) / rate).then(() => { s.speak(v(sp, lv), i % 2 ? "happy" : "grumpy"); return oc.resume(); });
    });
    void oc.suspend(Math.round(20 * rate) / rate).then(() => { s.howl(v("wolf", 2)); return oc.resume(); });
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

(window as unknown as { sfxRender: (only?: string[]) => Promise<unknown> }).sfxRender = async (only?: string[]) => {
  const out = [];
  for (const [n, sec, p] of SOUNDS) if (!only?.length || only.includes(n)) out.push(await render(n, sec, p));
  return out;
};
