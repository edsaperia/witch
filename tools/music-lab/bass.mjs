// The basslines before and after (Ed, 2026-11-09: "repetitive and too high"): node tools/music-lab/bass.mjs <out dir> <tag>
// [seed...]. Renders tools/music-lab/bass.ts offline in headless Chromium: the deep, garage, organic and trance sections (on
// waves 1, 3, 2 and 4: their energies' pattern pools), 16 bars each (about 32 s), seeds 7, 23 and 101 by default, as
// seed<N>-<section>-<tag>.mp3 with a .txt: the bass part and patch, its range, and the pattern each four-bar phrase took. Run
// it in a checkout of the code before, tagged "before", to compare. Fails on a script error, NaN, clipping or silence.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const [outArg, tag = "after", ...seedArgs] = process.argv.slice(2);
if (!outArg) { console.error("usage: node tools/music-lab/bass.mjs <out dir> <tag> [seed...]"); process.exit(2); }
const out = resolve(outArg), seeds = seedArgs.length ? seedArgs.map(Number) : [7, 23, 101];
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "bass.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: "{ let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }\n" + code });
for (const seed of seeds) for (const [section, wave] of [["deep", 1], ["garage", 3], ["organic", 2], ["trance", 4]]) {
  const r = await page.evaluate(o => window.bassRender(o), { section, wave, seed, bars: 16 });
  const name = `seed${seed}-${section}-${tag}`;
  ok(r.nan === 0 && r.peak > 0.01 && r.peak < 0.999, `${name}: sounds, no NaN or clipping (peak ${r.peak.toFixed(3)}, ${r.seconds.toFixed(1)} s)`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const wav = resolve(out, `${name}.wav`);
  writeFileSync(wav, Buffer.concat([h, pcm]));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "192k", resolve(out, `${name}.mp3`)]); unlinkSync(wav);
  writeFileSync(resolve(out, `${name}.txt`), [`${name}: ${section} on wave ${wave}'s step (energy ${r.energy}), seed ${seed}, 16 bars at 120 bpm (${tag}); bass ${r.parts}, ${r.range}`, ...r.phrases.map((p, i) => `${`${Math.floor(i * 8 / 60)}:${String(i * 8 % 60).padStart(2, "0")}`.padStart(5)}  ${p}`)].join("\n") + "\n");
}
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
