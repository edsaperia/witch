// A night's set in miniature, rendered: node tools/music-lab/set.mjs [island] [waves] [seed] [bars a wave] [encore bars]
// (default home, 10 waves (the hand-picked first home night), seed 7, 12 bars a wave (about 20 to 25 s), 16 bars of the
// victory's encore). Renders tools/music-lab/set.ts offline in headless Chromium: every wave of the night (rules/musicSet.ts)
// at its own tempo, then the victory. Prints each wave (its time, role, family, key, tempo, lead, bass, voice and sections);
// fails on a script error, NaN, clipping or silence. Writes previews/music/sets/<island>-<waves>-<seed>.mp3 (the WAV with no
// ffmpeg) and its wave list beside it (.txt).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [island = "home", waves = "10", seed = "7", bars = "12", encore = "16"] = process.argv.slice(2);
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "set.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
const seedJs = "window.seedRandom = () => { let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }; window.seedRandom();";
await page.addScriptTag({ content: seedJs + "\n" + code });
const r = await page.evaluate(o => window.setRender(o), { island, waves: +waves, seed: +seed, bars: +bars, encore: +encore });
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
const NOTE = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"], mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const lines = [`${island}, ${waves} waves, seed ${seed}${r.curated ? " (the hand-picked first home night)" : ""}; ${bars} bars a wave, then the victory at ${mmss(r.encoreAt)}`];
for (const w of r.waves) lines.push(`${mmss(w.start).padStart(5)}  ${(w.wave ? `wave ${w.wave}` : "start").padEnd(7)} ${w.role.padEnd(9)} ${w.family.padEnd(10)} ${(NOTE[(((33 + w.transpose) % 12) + 12) % 12] + " " + w.scale).padEnd(12)} ${w.bpm} bpm  e ${w.energy.toFixed(2)}  ${w.lead} / ${w.bass} / ${w.vocal}  [${w.sections.join(", ")}]`);
for (const l of lines) console.log("     " + l);
ok(r.nan === 0, "no NaN");
ok(r.peak < 0.99, `no clipping (peak ${r.peak.toFixed(2)})`);
ok(r.peak > 0.01, "not silent");
const dir = resolve(root, "previews/music/sets");
mkdirSync(dir, { recursive: true });
const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
const name = `${island}-${waves}-${seed}`, wav = resolve(dir, `${name}.wav`);
writeFileSync(wav, Buffer.concat([h, pcm]));
writeFileSync(resolve(dir, `${name}.txt`), lines.join("\n") + "\n");
let done = false;
for (const f of ["ffmpeg", "/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux"]) { try { execFileSync(f, ["-y", "-loglevel", "error", "-i", wav, "-b:a", "128k", resolve(dir, `${name}.mp3`)]); unlinkSync(wav); console.log(`wrote previews/music/sets/${name}.mp3 (${r.seconds.toFixed(1)} s)`); done = true; break; } catch { /* the next */ } }
if (!done) console.log(`wrote previews/music/sets/${name}.wav (${r.seconds.toFixed(1)} s)`);
process.exit(failed ? 1 : 0);
