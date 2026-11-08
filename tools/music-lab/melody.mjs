// The composer's A/B (Ed, 2026-11-08: "smarter rules"): node tools/music-lab/melody.mjs <out dir> [sections|night|all] [seed...]
// Renders tools/music-lab/melody.ts offline in headless Chromium with the game's singer and writes mp3s (192 kbps) and a .txt of
// where things start to <out dir>, each passage twice, the old rules then the composer's, the same seed (default 7, 23, 101):
//   sections  seed<N>-<a|b|c|d>-<old|new>.mp3: (a) a four-on-the-floor section, the A instrument and the bass (deep, wave 1);
//             (b) a sung breakdown (the haunted treatment off: the melody alone); (c) a bass-heavy section (acid house, dark
//             electro or breakbeat's reese, one a seed); (d) a haunted breakdown through its drum & bass drop
//   night     seed<N>-night-<old|new>.mp3: a night's start, the intro and two waves of 32 bars (about three minutes)
// Fails on a script error, NaN, clipping or silence. Nothing here touches the game.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [outArg, what = "all", ...seedArgs] = process.argv.slice(2);
if (!outArg) { console.error("usage: node tools/music-lab/melody.mjs <out dir> [sections|night|all] [seed...]"); process.exit(2); }
const out = resolve(outArg), seeds = seedArgs.length ? seedArgs.map(Number) : [7, 23, 101];
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "melody.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const samples = Object.fromEntries(["voices", "chimera"].flatMap(d => readdirSync(join(root, "samples", d)).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples", d, f)).toString("base64")])));
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: "{ let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }\n" + code });
const save = (r, name, lines) => {
  ok(r.nan === 0 && r.peak > 0.01 && r.peak < 0.999, `${name}: sounds, no NaN or clipping (peak ${r.peak.toFixed(3)}, ${r.seconds.toFixed(1)} s)`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const wav = resolve(out, `${name}.wav`), mp3 = resolve(out, `${name}.mp3`);
  writeFileSync(wav, Buffer.concat([h, pcm]));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "192k", mp3]); unlinkSync(wav);
  writeFileSync(resolve(out, `${name}.txt`), lines.join("\n") + "\n");
  console.log(`     wrote ${mp3}`);
};
const HEAVY = [["acidDrop", 5, "acid house: the acid line"], ["darkDrop", 3, "dark electro: the dark bass"], ["breaks", 6, "breakbeat: the reese under the break"]];
for (const [si, seed] of seeds.entries()) {
  if (what === "sections" || what === "all") {
    const heavy = HEAVY[si % HEAVY.length];
    const passages = [
      ["a", "deep", 1, 16, true, "deep house, wave 1: the A instrument plays A then B, the house bass under it"],
      ["b", "breakdown", 2, 16, false, "the breakdown with the haunted treatment off: the singer sings A then B (the melody alone, washed)"],
      ["c", heavy[0], heavy[1], 16, true, heavy[2]],
      ["d", "breakdown", 2, 16, true, "the haunted breakdown: the held sung line, then the drum & bass drop"],
    ];
    for (const [tag, section, wave, bars, haunted, about] of passages) for (const melody of ["old", "new"]) {
      const r = await page.evaluate(o => window.sectionRender(o), { section, wave, seed, bars, melody, haunted, samples });
      const name = `seed${seed}-${tag}-${melody}`;
      save(r, name, [`${name}: ${about}; seed ${seed}, ${section} on wave ${wave}'s step, ${bars} bars at 120 bpm, the ${melody === "old" ? "old rules (?melody=old)" : "composer's rules"}; the A instrument ${r.lead}, bass ${r.bass}`, ...r.marks]);
    }
  }
  if (what === "night" || what === "all") for (const melody of ["old", "new"]) {
    const r = await page.evaluate(o => window.nightRender(o), { island: "owl", waves: 2, seed, bars: 32, melody, samples });
    const name = `seed${seed}-night-${melody}`;
    save(r, name, [`${name}: the owl island's night, seed ${seed}, its start and two waves of 32 bars at 120 bpm, the ${melody === "old" ? "old rules (?melody=old)" : "composer's rules"}`, ...r.marks]);
  }
}
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
