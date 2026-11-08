// The haunted treatment's A/B (Ed, 2026-11-08: "B, 1-6"): node tools/music-lab/haunted.mjs <out dir> [ab|circle|night] [seed...]
// Renders tools/music-lab/haunted.ts offline in headless Chromium with the game's singer (samples/chimera) and writes mp3s
// (192 kbps) to <out dir>:
//   ab      breakdown-on.mp3 / breakdown-off.mp3 (wave 2's breakdown, 16 bars: its quiet half, the riser, the drum & bass drop)
//           and ether-on.mp3 / ether-off.mp3 (wave 4's)
//   circle  circle-<species>-on.mp3 / -off.mp3 (wave 1's music nearby, then 20 s in the legend's clearing, the world slowed)
//   night   long-seed<N>.mp3 (a night on the owl island, its start and 3 waves of 40 bars (the form's 32 and the build's 8): each wave's haunted breakdown and drop),
//           with long-seed<N>.txt, where each section, haunted section and drop starts; NIGHT_OFF=1 also the treatment off
// Fails on a script error, NaN, clipping or silence. Nothing here touches the game.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [outArg, what = "ab", ...seedArgs] = process.argv.slice(2);
if (!outArg) { console.error("usage: node tools/music-lab/haunted.mjs <out dir> [ab|circle|night] [seed...]"); process.exit(2); }
const out = resolve(outArg);
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "haunted.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const samples = Object.fromEntries(["voices", "chimera"].flatMap(d => readdirSync(join(root, "samples", d)).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples", d, f)).toString("base64")])));
const browser = await playwright.chromium.launch();
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: "{ let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }\n" + code });
const mmss = s => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
const save = (r, name) => {
  ok(r.nan === 0 && r.peak > 0.01 && r.peak < 0.999, `${name}: sounds, no NaN or clipping (peak ${r.peak.toFixed(3)}, ${r.seconds.toFixed(1)} s)`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  const wav = resolve(out, `${name}.wav`), mp3 = resolve(out, `${name}.mp3`);
  writeFileSync(wav, Buffer.concat([h, pcm]));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "192k", mp3]); unlinkSync(wav);
  console.log(`     wrote ${mp3}`);
};
if (what === "ab") {
  for (const [section, wave] of [["breakdown", 2], ["ether", 4]]) for (const on of [true, false]) {
    const r = await page.evaluate(o => window.hauntedRender(o), { section, wave, seed: +(seedArgs[0] ?? 7), bars: 16, on, samples });
    save(r, `${section}-${on ? "on" : "off"}`);
    if (on) console.log(`     ${section}: quiet from 0:00, the drum & bass drop at ${mmss(r.drop)}`);
  }
} else if (what === "circle") {
  for (const species of seedArgs.length ? seedArgs : ["owl", "wolf"]) for (const on of [true, false]) {
    const r = await page.evaluate(o => window.circleRender(o), { species, seed: 7, inside: 20, on, samples });
    save(r, `circle-${species}-${on ? "on" : "off"}`);
    if (on) console.log(`     ${species}: into the clearing at ${mmss(r.enter)}, out at ${mmss(r.leave)}`);
  }
} else if (what === "night") {
  for (const seed of seedArgs.length ? seedArgs.map(Number) : [7, 23, 101]) for (const on of process.env.NIGHT_OFF ? [true, false] : [true]) {
    const r = await page.evaluate(o => window.nightRender(o), { island: "owl", waves: 3, seed, bars: 40, on, samples });
    const name = `long-seed${seed}${on ? "" : "-off"}`;
    save(r, name);
    const lines = [`${name}: the owl island's night, seed ${seed}, its start and 3 waves of 40 bars at 120 bpm (${mmss(r.seconds)})`, ...r.marks.map(m => `${mmss(m.at).padStart(7)}  ${m.what}`)];
    writeFileSync(resolve(out, `${name}.txt`), lines.join("\n") + "\n");
    for (const l of lines) console.log("     " + l);
  }
}
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
