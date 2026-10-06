// The legends' clearings check (Ed, 2026-10-06: "the music should change when you go into a legend
// circle in ground mode"): node tools/music-lab/circles.mjs [species,...]
// Renders tools/music-lab/circles.ts offline in headless Chromium: for each species (default all
// 30 legends), 3 s of wave 1's music 40 m from a soundsystem, then she steps into its legend's
// clearing: the music muffled under the legend's own layer, slowing to a tenth with the world there
// (a tape slowing; SLOW=0 renders it as before), the layer at full speed; at 11 s she leaves. Prints, in dB, the music before, the
// layer alone and the whole inside; fails on a script error, NaN, clipping, a silent layer or a
// layer drowned by (or drowning) the muffled music. Writes previews/music/circles/<species>.mp3.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const ALL = ["bat", "marten", "elk", "stoat", "owl", "snail", "wolf", "fox", "badger", "boar", "stag", "hare", "bear", "lynx", "otter", "beaver", "ram", "squirrel", "dormouse", "salamander", "toad", "raven", "mole", "hedgehog", "woodlouse", "snake", "moth", "glowworm", "spider", "beetle"];
const species = process.argv[2] ? process.argv[2].split(",") : ALL;
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, what) => { if (!c) { console.log(`FAIL ${what}`); failed++; } };

const code = (await build({ entryPoints: [resolve(here, "circles.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
const seed = "window.seedRandom = () => { let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }; window.seedRandom();";
await page.addScriptTag({ content: seed + "\n" + code });
const out = await page.evaluate(([sp, slow]) => window.circleRender(sp, slow), [species, process.env.SLOW !== "0"]);
await browser.close();
ok(errors.length === 0, `no script errors: ${errors.join(" | ")}`);
const dir = resolve(root, "previews/music/circles");
mkdirSync(dir, { recursive: true });
console.log(`${"species".padEnd(11)} ${"before".padStart(7)} ${"inside".padStart(7)} ${"layer".padStart(7)} ${"muffled".padStart(8)} peak`);
for (const r of out) {
  // the muffled music alone, by the energy left once the layer's is taken out
  const muffledDb = 10 * Math.log10(Math.max(1e-12, 10 ** (r.inside / 10) - 10 ** (r.layer / 10)));
  console.log(`${r.species.padEnd(11)} ${r.before.toFixed(1).padStart(7)} ${r.inside.toFixed(1).padStart(7)} ${r.layer.toFixed(1).padStart(7)} ${muffledDb.toFixed(1).padStart(8)} ${r.peak.toFixed(2)}`);
  ok(r.nan === 0, `${r.species}: NaN`);
  ok(r.peak < 0.99, `${r.species}: clipping (${r.peak.toFixed(2)})`);
  ok(r.layer > -50, `${r.species}: its layer silent (${r.layer.toFixed(1)} dB)`);
  ok(r.layer - muffledDb > -6 && r.layer - muffledDb < 12, `${r.species}: its layer ${(r.layer - muffledDb).toFixed(1)} dB over the muffled music (wants -6 to +12)`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const wav = resolve(dir, `${r.species}.wav`);
  writeFileSync(wav, Buffer.concat([h, pcm]));
  try { execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-b:a", "96k", resolve(dir, `${r.species}.mp3`)]); unlinkSync(wav); } catch { /* no ffmpeg: the wav stays */ }
}
console.log(failed ? `${failed} failed` : `ok   ${out.length} clearings`);
process.exit(failed ? 1 : 0);
