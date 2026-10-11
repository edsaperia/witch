// A/B renders for Ed (docs/music/research.md; Ed, 2026-10-11: "A/B renders adding one ingredient at a time ... for Ed to
// judge by ear"): node tools/music-lab/ab.mjs [out dir] [wave] [seed] [bars]
// (default previews/ed/music, wave 2, seed 7, 32 bars). One passage of the game's music, rendered by tools/music-lab/ab.ts in
// headless Chromium, then again with one ingredient more each time:
//   0 the music as it is; 1 + a drone; 2 + a chant (Pink Trombone, a low voice, syllables); 3 + frame drums (VCSL);
//   4 + tape wobble and crackle; 5 + the CC0 kit in the synthesised drums' place (the kicks stay); 6 + the vocalise (Pink
//   Trombone, a soprano) singing B and C; and a bonus witch-house take (Phrygian, half-time drums, the chant pitched down,
//   a huge reverb). Each loudness-matched (ffmpeg loudnorm, -16 LUFS) so louder doesn't win, as mp3; and the voices alone
//   and the kit's samples in a row. Fails on a script error, NaN or silence. Nothing here touches the game.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, unlinkSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sing, wav } from "../voice/sing.mjs";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [outArg = "previews/ed/music", wave = "2", seed = "7", bars = "32"] = process.argv.slice(2), out = resolve(root, outArg);
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };

const code = (await build({ entryPoints: [resolve(here, "ab.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: code });
const base = { wave: +wave, seed: +seed, bars: +bars };
const samples = Object.fromEntries(readdirSync(join(root, "samples/vcsl")).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples/vcsl", f)).toString("base64")]));

// the voices, sung in Node to the passage's score: the vocalise to the sung part's notes, the chant on each bar's root
const VOWELS = ["ah", "oh", "ee", "eh", "ah", "oo"], ONSETS = ["m", "n", "l", "m"];
const voices = async witch => {
  const sc = await page.evaluate(o => window.abScore(o), { ...base, witch });
  const seconds = sc.barSeconds * +bars + 3, beat = sc.barSeconds / 4;
  const vocalise = sing(sc.sung.map((n, i) => ({ at: n.at, dur: Math.max(0.12, n.dur * 0.95), midi: n.midi, vowel: VOWELS[i % VOWELS.length] })), seconds, { tractLength: 36, seed: 11 });
  // the chant: a low voice on the bar's root and fifth, a syllable a beat, a breath on the last beat of every other bar
  const chant = [];
  for (let b = 0; b < +bars; b++) for (let k = 0; k < 4; k++) {
    if (b % 2 === 1 && k === 3) continue;
    const r = sc.roots[b] + 12, midi = k === 2 ? r + 7 : r;
    chant.push({ at: (b * 4 + k) * beat, dur: beat * 0.85, midi, vowel: ["ah", "oh", "ah", "ee"][k], onset: ONSETS[(b * 4 + k) % ONSETS.length] });
  }
  return { sc, seconds, vocalise: wav(vocalise, 48000, 0.9), chant: wav(sing(chant, seconds, { tractLength: 44, tense: [0.55, 0.68], vibrato: 0.004, seed: 13 }), 48000, 0.9) };
};
const plain = await voices(false), witchy = await voices(true);
ok(plain.sc.sung.length > 0, `the passage has sung notes to sing (${plain.sc.sung.length}), sections: ${[...new Set(plain.sc.sections)].join(", ")}`);

const enc = (wavFile, name) => {
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", wavFile, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "44100", "-b:a", "128k", join(out, `${name}.mp3`)]);
  unlinkSync(wavFile);
  console.log(`     wrote ${join(outArg, name)}.mp3`);
};
const steps = [
  ["ab-0-baseline", {}],
  ["ab-1-drone", { drone: true }],
  ["ab-2-chant", { drone: true, chant: true }],
  ["ab-3-frame-drums", { drone: true, chant: true, frames: true }],
  ["ab-4-tape", { drone: true, chant: true, frames: true, tape: true }],
  ["ab-5-cc0-kit", { drone: true, chant: true, frames: true, tape: true, kit: true }],
  ["ab-6-vocalise", { drone: true, chant: true, frames: true, tape: true, kit: true, vocalise: true }],
  ["ab-bonus-witch-house", { witch: true, drone: true, chant: true, tape: true, vocalise: true }],
];
for (const [name, flags] of steps) {
  const v = flags.witch ? witchy : plain;
  const r = await page.evaluate(o => window.abRender(o), { ...base, ...flags, samples, voices: { chant: v.chant.toString("base64"), vocalise: v.vocalise.toString("base64") } });
  ok(r.nan === 0 && r.peak > 0.01, `${name}: sounds, no NaN (peak ${r.peak.toFixed(2)}, before the safety trim)`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const f = join(out, `${name}.wav`); writeFileSync(f, Buffer.concat([h, pcm])); enc(f, name);
}
await browser.close();
// the voices alone, and the kit's samples one after another
for (const [name, b] of [["voice-vocalise", plain.vocalise], ["voice-chant", plain.chant]]) { const f = join(out, `${name}.wav`); writeFileSync(f, b); enc(f, name); }
const list = join(out, "kit.txt"), ids = Object.keys(samples).sort(), parts = [];
for (const id of ids) { const p = join(out, `kit-${id}.wav`); execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", join(root, "samples/vcsl", id + ".ogg"), "-af", "apad=pad_dur=0.35", "-ar", "48000", "-ac", "1", p]); parts.push(p); }
writeFileSync(list, parts.map(p => `file '${p}'\n`).join(""));
execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-b:a", "160k", join(out, "kit-samples.mp3")]);
for (const p of [list, ...parts]) unlinkSync(p);
console.log(`     wrote ${join(outArg, "kit-samples.mp3")} (${ids.join(", ")})`);
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
