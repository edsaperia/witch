// The sound effects' check (before every push that touches them):
//   node tools/sfx/check.mjs
// Bundles tools/sfx/render.ts (the game's own src/platform/sfx.ts and tuning), renders every effect
// offline in headless Chromium, and fails on a script error, silence, NaN or clipping; writes each
// as a WAV to previews/sfx/ to listen to.
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (cond, what) => { console.log(`${cond ? "ok  " : "FAIL"} ${what}`); if (!cond) failed++; };

const code = (await build({ entryPoints: [resolve(here, "render.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning" })).outputFiles[0].text;
const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: code });
const results = await page.evaluate(() => window.sfxRender());
await browser.close();
ok(errors.length === 0, `renders with no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
mkdirSync(resolve(root, "previews/sfx"), { recursive: true });
for (const r of results) {
  console.log(`     ${r.name.padEnd(16)} rms ${r.rms.toFixed(3)}  peak ${r.peak.toFixed(2)}`);
  ok(!r.nan && r.rms > 0.002 && r.peak < 0.99, `${r.name}: sounds, no NaN, no clipping`);
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  writeFileSync(resolve(root, `previews/sfx/${r.name}.wav`), Buffer.concat([h, pcm]));
}
ok(results.length >= 28, `${results.length} effects rendered (previews/sfx/*.wav)`);
process.exit(failed ? 1 : 0);
