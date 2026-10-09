// The 32-bar ABAC form, rendered: node tools/music-lab/form.mjs [section|form] [seed] [bars] [knockdown bar] [wave]
// (default the form's own sections, seed 7, 32 bars, no knockdown, wave 1). Renders tools/music-lab/form.ts offline in
// headless Chromium: the wave's music on the game's mix (its sections on the form, or one section looped) with the form's
// melody over it, and with a knockdown bar, 5 bpm faster from the next bar
// line and the music re-seeded from the next phrase line. Prints each phrase (its letter, A's instrument, the seed); fails
// on a script error, NaN or clipping. Writes previews/music/form-<section>-<seed>.mp3 (the WAV if there's no ffmpeg).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [sectionArg = "form", seed = "7", bars = "32", knock = "-1", wave = "1"] = process.argv.slice(2), section = sectionArg === "form" ? "" : sectionArg;
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "form.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
const seedJs = "window.seedRandom = () => { let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }; window.seedRandom();";
await page.addScriptTag({ content: seedJs + "\n" + code });
const r = await page.evaluate(o => window.formRender(o), { section, seed: +seed, bars: +bars, knock: +knock, wave: +wave });
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
for (const p of r.phrases) console.log("     " + p);
ok(r.nan === 0, "no NaN");
ok(r.peak < 0.99, `no clipping (peak ${r.peak.toFixed(2)})`);
ok(r.peak > 0.01, "not silent");
const dir = resolve(root, "previews/music");
mkdirSync(dir, { recursive: true });
const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
const name = `form-${sectionArg}-${seed}${+knock >= 0 ? "-ko" : ""}`, wav = resolve(dir, `${name}.wav`);
writeFileSync(wav, Buffer.concat([h, pcm]));
const ff = ["ffmpeg", "/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux"];
let done = false;
for (const f of ff) { try { execFileSync(f, ["-y", "-loglevel", "error", "-i", wav, "-b:a", "128k", resolve(dir, `${name}.mp3`)]); unlinkSync(wav); console.log(`wrote previews/music/${name}.mp3 (${r.seconds.toFixed(1)} s)`); done = true; break; } catch { /* the next */ } }
if (!done) console.log(`wrote previews/music/${name}.wav (${r.seconds.toFixed(1)} s)`);
process.exit(failed ? 1 : 0);
