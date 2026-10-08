// The home speakers' boot, sped up: node tools/music-lab/boot.mjs [bars between speakers, default 1]
// Renders tools/music-lab/boot.ts offline in headless Chromium: two bars of nothing, then the 12
// speakers crackling into life one a bar, the music a layer a speaker. Prints each bar's loudness;
// fails on a script error, NaN, clipping, sound before the first speaker, or the music not growing
// to the twelfth. Writes previews/music/boot-build.mp3 (the WAV beside it if there's no ffmpeg).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), every = +(process.argv[2] || 1);
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "boot.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
const seed = "window.seedRandom = () => { let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }; window.seedRandom();";
await page.addScriptTag({ content: seed + "\n" + code });
const r = await page.evaluate(e => window.bootRender(e), every);
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
console.log("bar  dB");
r.bars.forEach((d, i) => console.log(`${String(i).padStart(3)} ${d.toFixed(1).padStart(6)}${i === r.first ? "  <- the first speaker's layer" : ""}`));
ok(r.nan === 0, "no NaN");
ok(r.peak < 0.99, `no clipping (peak ${r.peak.toFixed(2)})`);
ok(r.bars[0] < -70, `silent before the first speaker (${r.bars[0].toFixed(1)} dB)`);
const s = r.first, end = r.first + 12 * r.every;
ok(r.bars[end] > r.bars[s] + 6, `whole by the twelfth (${r.bars[end].toFixed(1)} dB) well over the first speaker's (${r.bars[s].toFixed(1)} dB)`);
const dir = resolve(root, "previews/music");
mkdirSync(dir, { recursive: true });
const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
const wav = resolve(dir, "boot-build.wav");
writeFileSync(wav, Buffer.concat([h, pcm]));
try { execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-b:a", "128k", resolve(dir, "boot-build.mp3")]); unlinkSync(wav); console.log("wrote previews/music/boot-build.mp3"); } catch { console.log("wrote previews/music/boot-build.wav"); }
process.exit(failed ? 1 : 0);
