// The voices' A/B for Ed (Ed, 2026-10-11: the FOF choir and "other effects on the voice line to make it sound more ethereal"):
// node tools/music-lab/voices.mjs [out dir] [wave] [seed] [bars] (default previews/ed/music/voices, wave 2, seed 7, 32 bars).
// The same generated melody (the form's B and C, sung), five ways, each alone and in the music (tools/music-lab/ab.ts):
//   a: Pink Trombone (the research's vocalise, sung in Node by tools/voice/sing.mjs);
//   b: the recorded woman's G4 (Freesound, CC0) retuned to each note, like a sampler;
//   c: the FOF voice (Faust's pm.SFFormantModelFofSmooth: platform/audio/fof), three detuned singers, dry;
//   d: the FOF voice through the ethereal effects (platform/audio/voiceFx.ts);
//   e: the recorded voice through the same effects.
// Each loudness-matched (ffmpeg loudnorm, -16 LUFS). Fails on a script error, NaN or silence. Nothing here touches the game.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sing, wav } from "../voice/sing.mjs";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [outArg = "previews/ed/music/voices", wave = "2", seed = "7", bars = "32"] = process.argv.slice(2), out = resolve(root, outArg);
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };

/** The ethereal preset the A/B plays (each a level 0 to 1; the Music Lab's sliders start from these). */
export const ETHEREAL = { chorus: 0.5, saturation: 0.15, air: 0.5, delay: 0.35, hall: 0.6, shimmer: 0.5, duck: 0.3, swells: 0.6, freeze: 0.5, whisper: 0.25, octave: 0.3 };

const code = (await build({ entryPoints: [resolve(here, "ab.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
// (an AudioWorklet needs a secure page: served from localhost)
const server = createServer((q, r) => { r.writeHead(200, { "content-type": "text/html" }); r.end("<!doctype html><meta charset=utf-8><body></body>"); });
await new Promise(r => server.listen(0, r));
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.goto(`http://localhost:${server.address().port}/`);
await page.addScriptTag({ content: code });
const base = { wave: +wave, seed: +seed, bars: +bars };
const samples = Object.fromEntries(["vcsl", "voices"].flatMap(d => readdirSync(join(root, "samples", d)).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples", d, f)).toString("base64")])));

// Pink Trombone's vocalise, sung in Node to the passage's sung notes (as the A/B ladder's step 5)
const VOWELS = ["ah", "oh", "ee", "eh", "ah", "oo"];
const sc = await page.evaluate(o => window.abScore(o), base);
const seconds = sc.barSeconds * +bars + 3;
const pt = wav(sing(sc.sung.map((n, i) => ({ at: n.at, dur: Math.max(0.12, n.dur * 0.95), midi: n.midi, vowel: VOWELS[i % VOWELS.length] })), seconds, { tractLength: 36, seed: 11 }), 48000, 0.9);
ok(sc.sung.length > 0, `the melody: ${sc.sung.length} sung notes over ${bars} bars`);

const ways = [
  ["a-pink-trombone", { vocalise: true }],
  ["b-recorded-g4", { sampledVocalise: true }],
  ["c-fof-dry", { fof: "fofSoprano" }],
  ["d-fof-ethereal", { fof: "fofSoprano", fx: ETHEREAL }],
  ["e-recorded-ethereal", { sampledVocalise: true, fx: ETHEREAL }],
];
const enc = (wavFile, name) => {
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", wavFile, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "44100", "-b:a", "160k", join(out, `${name}.mp3`)]);
  unlinkSync(wavFile);
  console.log(`     wrote ${join(outArg, name)}.mp3`);
};
for (const [name, flags] of ways) for (const mix of [false, true]) {
  const nm = `${name}${mix ? "-in-the-music" : ""}`;
  // (alone: only the sung line, the music left out: ab.ts drops its notes, the FOF voice's too, so it plays only its own)
  const r = await page.evaluate(o => window.abRender(o), { ...base, ...flags, samples, voices: { vocalise: pt.toString("base64") }, ...(mix ? {} : { music: false, soloSung: true }) });
  ok(r.nan === 0 && r.peak > 0.005, `${nm}: sounds, no NaN (peak ${r.peak.toFixed(3)})`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const f = join(out, `${nm}.wav`); writeFileSync(f, Buffer.concat([h, pcm])); enc(f, nm);
}
await browser.close(); server.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
