// The dance way's leads auditioned (Ed, 2026-11-09: "add in some more, inspired by the genres"): node tools/music-lab/leads.mjs
// <out dir> [kind: trance] [seed: 7]. Renders tools/music-lab/leads.ts offline in headless Chromium: every lead part the dance
// way deals (and the old leads, to compare) playing the same 8-bar riff over the same deep-house chords, drums and bass, an
// mp3 each (<n>-<part>.mp3) and all of them one after another (all.mp3), with leads.txt: each one's name, its patch, where it
// starts in all.mp3, and its loudness alone and in the mix (to balance them). Fails on a script error, NaN, clipping or silence.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [outArg, kind = "trance", seedArg = "7"] = process.argv.slice(2);
if (!outArg) { console.error("usage: node tools/music-lab/leads.mjs <out dir> [kind] [seed]"); process.exit(2); }
const out = resolve(outArg), seed = Number(seedArg);
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const style = JSON.parse(readFileSync(resolve(root, "config/music-style.json"), "utf8")), L = style.compose.dance.leads;
const leads = [...new Set([...Object.values(L.kinds), ...Object.values(L.families)].flat())], old = ["lead", "pluck", "keys", "chiplead", "flute"];
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "leads.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: "{ let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }\n" + code });
const lines = [`The dance way's leads: each plays the same 8-bar ${kind} riff (seed ${seed}) over deep house (wave 1's chords, drums and bass), 120 bpm; then the old leads to compare. Loudness: the lead alone and the whole mix, dB RMS.`], files = [];
let at = 0;
for (const [i, lead] of [...leads, ...old].entries()) {
  const r = await page.evaluate(o => window.leadRender(o), { lead, kind, section: "deep", seed, bars: 8 });
  const name = `${String(i + 1).padStart(2, "0")}-${lead}`;
  ok(r.nan === 0 && r.peak > 0.01 && r.peak < 0.999, `${name} (${r.patch}): alone ${r.soloDb.toFixed(1)} dB, mix ${r.mixDb.toFixed(1)} dB, peak ${r.peak.toFixed(3)}, ${(r.renderMs / 8).toFixed(0)} ms a bar to render`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const wav = resolve(out, `${name}.wav`);
  writeFileSync(wav, Buffer.concat([h, pcm]));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "192k", resolve(out, `${name}.mp3`)]);
  files.push(wav);
  const mm = `${Math.floor(at / 60)}:${String(Math.round(at % 60)).padStart(2, "0")}`;
  lines.push(`${mm.padStart(5)}  ${name}.mp3  ${lead} (patch ${r.patch})${old.includes(lead) ? " [an old lead]" : ""}: alone ${r.soloDb.toFixed(1)} dB, mix ${r.mixDb.toFixed(1)} dB`);
  at += r.seconds;
}
writeFileSync(resolve(out, "list.txt"), files.map(f => `file '${f}'`).join("\n") + "\n");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", resolve(out, "list.txt"), "-c:a", "libmp3lame", "-b:a", "192k", resolve(out, "all.mp3")]);
for (const f of files) unlinkSync(f);
unlinkSync(resolve(out, "list.txt"));
writeFileSync(resolve(out, "leads.txt"), lines.join("\n") + "\n");
for (const l of lines) console.log("     " + l);
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
