// The run check (before a change to the music's arc or any volume):
//   node tools/sfx/run.mjs [out-name] [--clips]
// Bundles tools/sfx/run.ts (the game's own music, sound effects and tuning) and renders ten minutes
// of a scripted playthrough offline in headless Chromium, as the game mixes it: the boot at home,
// flying out past a pond, an angry legend, three waves, a partified area, sieges, a soundsystem
// lost, a knockout. Prints the loudness minute by minute (the whole mix and the music alone, 1 s
// windows, roughly K-weighted, dB), the sections the music played, and how much of the music
// repeats itself: the share of 4 s stretches whose six-band envelope matches an earlier stretch
// within 1 dB. Fails on a script error, NaN, clipping (a peak at 0.99) or a silent second (below
// -50 dB). Writes previews/sfx/run/run[-<out-name>].json and .wav (not committed); with --clips,
// 30 s mp3s of the boot, the siege and the last wave beside them (needs ffmpeg).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), name = process.argv.slice(2).find(a => !a.startsWith("--")), tag = name ? `-${name}` : "";
const clips = process.argv.includes("--clips");
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) failed++; };

const code = (await build({ entryPoints: [resolve(here, "run.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
const seed = "window.seedRandom = () => { let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }; window.seedRandom();";
await page.addScriptTag({ content: seed + "\n" + code });
const r = await page.evaluate(() => window.runRender());
await browser.close();
ok(errors.length === 0, `renders with no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);

const median = a => { const s = [...a].sort((p, q) => p - q); return s[Math.floor(s.length / 2)] ?? -120; };
const span = (a, t0, t1) => a.slice(t0, t1);
console.log(`\nminute  whole: median  min   max   music: median  min   max`);
for (let m = 0; m < r.seconds / 60; m++) {
  const w = span(r.whole, m * 60, m * 60 + 60), u = span(r.music, m * 60, m * 60 + 60);
  console.log(`${String(m).padStart(4)}    ${median(w).toFixed(1).padStart(13)} ${Math.min(...w).toFixed(1).padStart(5)} ${Math.max(...w).toFixed(1).padStart(5)}  ${median(u).toFixed(1).padStart(14)} ${Math.min(...u).toFixed(1).padStart(5)} ${Math.max(...u).toFixed(1).padStart(5)}`);
}
console.log(`\nthe script:`);
for (const s of r.stretches) console.log(`  ${String(s.at).padStart(4)} s  ${s.what}`);
console.log(`\nthe music's blocks (section, wave, pass):`);
console.log("  " + r.sections.map(s => `${Math.round(s.t)}s ${s.section}${s.pass != null ? "·" + s.pass : ""}`).join(", "));

// How much the music repeats itself: each 4 s stretch (every 2 s) against every earlier one (every 50 ms), its six bands' envelope.
const B = r.bands, n = B[0].length, seg = 80, every = 40, quiet = -70;
const repeats = [];
for (let s0 = seg; s0 + seg <= n; s0 += every) {
  let loud = 0;
  for (let i = 0; i < seg; i++) loud += B[2][s0 + i];
  if (loud / seg < quiet) continue;
  let best = Infinity;
  for (let c = 0; c + seg <= s0; c++) {
    let d = 0;
    for (let b = 0; b < B.length && d < best * seg * B.length; b++) for (let i = 0; i < seg; i++) d += Math.abs(B[b][s0 + i] - B[b][c + i]);
    best = Math.min(best, d / (seg * B.length));
  }
  repeats.push({ t: s0 * 0.05, best, lag: 0 });
}
const share = (t0, t1) => { const xs = repeats.filter(x => x.t >= t0 && x.t < t1); return xs.length ? xs.filter(x => x.best < 1).length / xs.length : 0; };
const rep = { all: share(0, r.seconds), boot: share(0, r.boot), ...Object.fromEntries(r.waves.map((w, i) => [`wave${i + 1}`, share(w, r.waves[i + 1] ?? r.seconds)])) };
console.log(`\nthe music repeating itself (share of 4 s stretches within 1 dB of an earlier one): ${Object.entries(rep).map(([k, x]) => `${k} ${(x * 100).toFixed(0)}%`).join(", ")}`);

ok(r.nan === 0, `no NaN (${r.nan})`);
ok(r.peak < 0.99, `no clipping (peak ${r.peak.toFixed(3)}, the music alone ${r.musicPeak.toFixed(3)})`);
const silent = r.whole.map((x, i) => [i, x]).filter(([, x]) => x < -50);
ok(silent.length === 0, `no silent second (quietest ${Math.min(...r.whole).toFixed(1)} dB${silent.length ? `; silent at ${silent.slice(0, 8).map(([i]) => i + "s").join(", ")}` : ""})`);

const dir = resolve(root, "previews/sfx/run");
mkdirSync(dir, { recursive: true });
const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
const wav = resolve(dir, `run${tag}.wav`);
writeFileSync(wav, Buffer.concat([h, pcm]));
const { pcm: _p, bands: _b, ...rest } = r;
writeFileSync(resolve(dir, `run${tag}.json`), JSON.stringify({ ...rest, repeats: rep }, null, 1));
if (clips) for (const [what, at] of [["boot", 20], ["siege", 285], ["wave3", 545]]) {
  const out = resolve(dir, `${what}${tag}.mp3`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", String(at), "-t", "30", "-i", wav, "-af", "afade=t=in:d=0.5,afade=t=out:st=29:d=1", "-b:a", "128k", out]);
  console.log(`wrote ${out}`);
}
process.exit(failed ? 1 : 0);
