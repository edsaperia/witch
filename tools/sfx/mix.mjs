// The mix check (before every push that changes a volume):
//   node tools/sfx/mix.mjs [out-name]
// Bundles tools/sfx/mix.ts (the game's own music, sound effects and tuning) and renders its scenes
// offline in headless Chromium, as the game mixes them: home (the meadow, 💌s, an invite, a relic),
// a fight by a soundsystem (a crowd turning and speaking, ouch, knocked back and down, a
// soundsystem lost) and the deep forest (a sleeping legend's moans, a wind-up, a charge). Prints
// each cue's loudness over the music under it (short-term, 200 ms, dB) and writes each scene's whole mix
// to previews/sfx/mix/<scene>[-<out-name>].wav (not committed; mp3s of a before and after
// to listen to go beside them), its numbers to previews/sfx/mix/mix[-<out-name>].json. Fails on a script error or clipping.
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), tag = process.argv[2] ? `-${process.argv[2]}` : "";
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) failed++; };

const code = (await build({ entryPoints: [resolve(here, "mix.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
// (a seeded Math.random, reset for each rendering: the whole mix, the music alone and the effects alone play the same)
const seed = "window.seedRandom = () => { let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }; window.seedRandom();";
await page.addScriptTag({ content: seed + "\n" + code });
const scenes = await page.evaluate(() => window.mixRender());
await browser.close();
ok(errors.length === 0, `renders with no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
mkdirSync(resolve(root, "previews/sfx/mix"), { recursive: true });
const f = x => (x >= 0 ? "+" : "") + x.toFixed(1);
for (const s of scenes) {
  console.log(`\n${s.name}: music ${s.music.toFixed(1)} dB, loudest moment ${s.whole.toFixed(1)} dB, peak ${s.peak.toFixed(2)}`);
  console.log(`  ${"cue".padEnd(40)} ${"kind".padEnd(10)} ${"cue dB".padStart(7)} ${"music".padStart(7)} ${"over".padStart(6)}`);
  for (const c of s.cues) console.log(`  ${c.name.padEnd(40)} ${c.kind.padEnd(10)} ${c.fx.toFixed(1).padStart(7)} ${c.music.toFixed(1).padStart(7)} ${f(c.over).padStart(6)}`);
  ok(s.peak < 1, `${s.name}: no clipping (peak ${s.peak.toFixed(2)})`);
  const pcm = Buffer.from(s.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(s.rate, 24); h.writeUInt32LE(s.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  writeFileSync(resolve(root, `previews/sfx/mix/${s.name}${tag}.wav`), Buffer.concat([h, pcm]));
}
writeFileSync(resolve(root, `previews/sfx/mix/mix${tag}.json`), JSON.stringify(scenes.map(({ pcm, ...s }) => s), null, 1));
process.exit(failed ? 1 : 0);
