// Banger mode's A/B (Ed, 2026-11-10): node tools/music-lab/banger.mjs <out dir> [seed...]
// Renders tools/music-lab/banger.ts offline in headless Chromium with the game's singer and writes mp3s (192 kbps), each with
// a .txt of where things start and what to listen for, to <out dir>: every passage old (banger mode off: the music as it was,
// #1924's dance way) and new (on), the same seed (default 7, 23, 101), through the game's own mix at the same level:
//   1-section    a typical section: a mid-night wave's first sixteen bars
//   2-breakdown  the breakbeat phrase's end, the breakdown and its drum & bass drop, then the groove again
//   3-build      a wave's last bars, the build and the next wave landing
//   4-clearing   a sleeping legend's clearing (seeds in turn: owl, stag, wolf)
//   5-knockout   a knockdown, the silence and the new record
//   6-victory    the victory lap
//   7-night      a night's first three waves (about three minutes)
//   8-late       the same night's sixth to eighth waves (about three minutes)
// ONLY=1,3 renders only those passages; MODES=new only that mode. Fails on a script error, NaN, clipping or silence. Nothing
// here touches the game.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const [outArg, ...seedArgs] = process.argv.slice(2);
if (!outArg) { console.error("usage: node tools/music-lab/banger.mjs <out dir> [seed...]"); process.exit(2); }
const out = resolve(outArg), seeds = seedArgs.length ? seedArgs.map(Number) : [7, 23, 101];
const MODES = (process.env.MODES ?? "old,new").split(","), ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
mkdirSync(out, { recursive: true });
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "banger.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
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
const z = n => Array(n).fill(0), SPECIES = ["owl", "stag", "wolf"];
/** [tag, what it is, the job, what to listen for in the new one] */
const passages = si => [
  ["1-section", "a typical section: the sixth wave's first sixteen bars", { landings: z(5), from: 0, to: 16 }, ["The hook lands with the wave: one bar, three times with a changed ending, then an answer (bars 1-4), then again ending home (bars 5-8).", "From bar 9 the hook rests: the wave's own riff takes over, a small high reply answering in its gaps.", "The drums: a turn in bar 4, a fill in bar 8 with the kick and bass out for the last beat, a crash on bar 9.", "The mix: brighter, the kick pumping the chords and bass."]],
  ["2-breakdown", "the breakbeat phrase's last two bars, the breakdown with its drum & bass drop, then the groove back", { landings: z(5), from: 22, to: 40 }, ["The breakdown: no drums; the singer sings the same hook at half speed.", "The drum & bass drop: the hook returns whole on the lead.", "Then the groove back in with a crash; the hook rests and the reply voice has the wave's own riff."]],
  ["3-build", "the fifth wave's breakbeat phrase, the build, and the sixth wave landing", { landings: [...z(4), 32], from: 20, to: 44 }, ["The build takes things away: the bass leaves halfway, the kick thins then stops, the snare roll doubles, the hook's first notes come faster and faster.", "One beat of near silence, then the drop: crash, sub impact, the hook in the new wave's key and on its lead."]],
  ["4-clearing", `a sleeping ${SPECIES[si % 3]}'s clearing: three seconds nearby, twenty inside (the world slowed), then out`, { landings: z(3), from: 0, to: 14, circle: { species: SPECIES[si % 3], in: 3, out: 23 } }, ["Inside, the species' own layer hums tonight's hook, a note at a time, over its drone."]],
  ["5-knockout", "a knockdown: the music stops in bar 7, the new record starts on bar 11", { landings: z(4), from: 0, to: 20, knock: { at: 6.5, back: 11 } }, ["The new record has a new hook (a knockdown re-seeds the music, as before)."]],
  ["6-victory", "the night won in bar 8: the victory", { landings: z(6), from: 0, to: 20, victory: 8 }, ["The victory plays the hook a whole step up, with conga claps (one, two, three, kick) and the reply voice."]],
  ["7-night", "the night's first three waves, 32 bars each (about three minutes)", { landings: [32, 64], from: 0, to: 96 }, ["Gentle until the second stump (here: the second wave landing, at 2:08): soft drums, the hook only at half speed, no crashes or rolls.", "At 2:08 the full treatment opens up: the hook whole for the first time, at speed, on the lead.", "The .txt marks every place the hook is heard."]],
  ["8-late", "the same night's sixth to eighth waves, 32 bars each (about three minutes)", { landings: [...z(5), 32, 64], from: 0, to: 96 }, ["The night's harder end: the hook returns at each wave landing and each drum & bass drop, on the big leads; between them each wave has its own riff.", "Each build empties out before its wave lands."]],
];
for (const [si, seed] of seeds.entries()) for (const [tag, about, job, listen] of passages(si).filter(p => !ONLY || ONLY.includes(p[0][0]))) for (const mode of MODES) {
  const r = await page.evaluate(o => window.windowRender(o), { seed, island: "owl", banger: mode === "new", ...job, samples });
  const name = `seed${seed}-${tag}-${mode}`;
  save(r, name, [`${name}: ${about}; seed ${seed}, the owl island's night, 120 bpm; ${mode === "new" ? "NEW: banger mode (?banger=1, this branch's default)" : "OLD: today's music (?banger=0: #1924's dance way)"}`, "", ...r.marks, ...(mode === "new" ? ["", "Listen for:", ...listen.map(l => `  - ${l}`), "", r.hook] : [])]);
}
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
