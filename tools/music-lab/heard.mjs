// Banger mode's sprinkles are heard (Ed, 2026-11-11, of a clip whose notes marked them: "I don't hear any xylophones or clicks
// at all": they reached the output, 10 to 13 dB under the lead): node tools/music-lab/heard.mjs
// In headless Chromium, the game's engine (tools/music-lab/banger.ts) renders bars of a night (seed 7) where the xylophone has
// the chords and the finger snaps the backbeat, each part alone, as it's mixed (the compressors off, far under the limiter),
// and checks: the xylophone no quieter than the lead less 3 dB, its peaks over the lead's; the snaps, where they have the
// backbeat, over the clap in its phrases; no sixteenth with a snap and a clap or snare together (Ed: "Don't need claps and
// snaps at the same time");
// and, drawn as the music ahead draws a bar (platform/audio/musicAhead.ts: a renderer into the stems), the xylophone in the
// rest's stem and the snaps in the drums' stem. Run by tools/music-lab/check.cjs (CI's smoke job). Exits 1 on a failure.
import { build } from "esbuild";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
const code = (await build({ entryPoints: [resolve(here, "banger.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
const samples = Object.fromEntries(["voices", "chimera"].flatMap(d => readdirSync(join(root, "samples", d)).filter(f => f.endsWith(".ogg")).map(f => [f.replace(/\.ogg$/, ""), readFileSync(join(root, "samples", d, f)).toString("base64")])));
const browser = await playwright.chromium.launch(), page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: "{ let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }\n" + code });
// (seed 7's night, opened up from bar 48: the first phrase where the xylophone has the chords beside the lead, the first lighter
// phrase (finger snaps on the backbeat) and the first with the clap, found from the score)
const base = { seed: 7, island: "owl", banger: true, landings: [16, 48, 112, 168] };
/** The patches sounding in the eight bars from `from`, each with how many notes it starts. */
const rows = async (from) => { const m = new Map(); for (const l of (await page.evaluate(o => window.scoreText(o), { ...base, from, to: from + 8 })).split("\n").filter(l => l.startsWith("  "))) { const c = l.trim().split(/\s+/); m.set(c[0], (m.get(c[0]) ?? 0) + c.slice(1).filter(x => x !== ".").length); } return m; };
let xyAt = -1, snapAt = -1, clapAt = -1;
for (let b = 48; b < 168; b += 8) {
  const r = await rows(b);
  if (xyAt < 0 && (r.get("bgXylo") ?? 0) >= 24 && (r.has("bgSquare") || r.has("bgSquareSoft"))) xyAt = b; // (its chords, not an answer or a run)
  if (snapAt < 0 && r.has("bgSnap") && !r.has("bgClap")) snapAt = b;
  if (clapAt < 0 && r.has("bgClap") && !r.has("bgSnap")) clapAt = b;
}
ok(xyAt >= 0 && snapAt >= 0 && clapAt >= 0, `the night has a phrase of xylophone chords (bar ${xyAt}), a lighter one of finger snaps (bar ${snapAt}) and one of claps (bar ${clapAt})`);
const SETS = { xylophone: [["bgXylo", "bgXyloL", "bgXyloR"], xyAt], lead: [["bgSquare", "bgSquareSoft"], xyAt], snaps: [["bgSnap"], snapAt], clap: [["bgClap"], clapAt] }, L = {};
for (const [name, [only, from]] of Object.entries(SETS)) {
  const r = await page.evaluate(o => window.windowRender(o), { ...base, from, to: from + 8, only, linear: true, samples });
  const pcm = Buffer.from(r.pcm, "base64"), s = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length / 2), n = Math.min(s.length, 16 * 44100 * 2);
  let q = 0, pk = 0;
  for (let i = 0; i < n; i++) { const v = s[i] / 32768; q += v * v; pk = Math.max(pk, Math.abs(v)); }
  L[name] = { rms: 10 * Math.log10(q / n + 1e-15), peak: 20 * Math.log10(pk + 1e-9) };
  console.log(`     ${name.padEnd(10)} rms ${L[name].rms.toFixed(1)} dB, peak ${L[name].peak.toFixed(1)} dB (alone, as mixed, bars ${from} to ${from + 8})`);
}
ok(L.xylophone.rms > -70 && L.snaps.peak > -60, "the xylophone and the finger snaps reach the output");
ok(L.xylophone.rms >= L.lead.rms - 3, `the xylophone is no quieter than the lead less 3 dB (${(L.xylophone.rms - L.lead.rms).toFixed(1)} dB against it)`);
ok(L.xylophone.peak >= L.lead.peak, `the xylophone's hits stand over the lead's (${(L.xylophone.peak - L.lead.peak).toFixed(1)} dB)`);
ok(L.snaps.peak >= L.clap.peak + 3, `where they have the backbeat the finger snaps click as clearly as the clap does in its phrases, and more (${(L.snaps.peak - L.clap.peak).toFixed(1)} dB at their peaks)`);
// (never together: no sixteenth of the night's score with a snap and a clap or snare on it)
{
  const txt = await page.evaluate(o => window.scoreText(o), { ...base, from: 0, to: 184 });
  let both = 0, bar = [];
  const flush = () => { const snap = bar.filter(r => /^(bgSnap|snap)\s/.test(r)), heavy = bar.filter(r => /^(bgClap|clap|snare|dnbSnare)\s/.test(r)); for (const a of snap) for (const b of heavy) { const x = a.slice(15).match(/.{1,4}/g) ?? [], y = b.slice(15).match(/.{1,4}/g) ?? []; for (let i = 0; i < 16; i++) if (x[i] && y[i] && x[i].trim() !== "." && y[i].trim() !== ".") both++; } bar = []; };
  for (const l of txt.split("\n")) { if (l.startsWith("bar ")) flush(); else bar.push(l.trim()); }
  flush();
  ok(both === 0, `no finger snap on the same sixteenth as a clap or a snare, bars 0 to 184 (${both})`);
}
// the render-ahead path: each part alone, into the stems
for (const [name, only, stem, from] of [["xylophone", SETS.xylophone[0], "dry", xyAt], ["snaps", SETS.snaps[0], "drums", snapAt]]) {
  const st = await page.evaluate(o => window.stemsProof(o), { ...base, from, to: from + 8, only, samples });
  console.log(`     ${name} drawn ahead, by stem: ${Object.entries(st).map(([k, v]) => `${k} ${v < -140 ? "silent" : v.toFixed(0) + " dB"}`).join(", ")}`);
  ok(st[stem] > -70, `drawn ahead, the ${name} are in the ${stem} stem (${st[stem].toFixed(1)} dB)`);
  ok(Object.entries(st).every(([k, v]) => k === stem || k === "reverb" || k === "delay" || v < -140), `and in no other but the sends`);
}
await browser.close();
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
process.exit(failed ? 1 : 0);
