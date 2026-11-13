// The music's load budget (Ed, 2026-11-11: "We are hitting some music limit on my laptop since the last music update; the
// sound crunches and cuts out during gameplay"): renders the densest bars of a night (seed 7, the owl island: the build into
// the third wave and its landing, she leading the hook) as the game plays them, its bars drawn ahead (tools/music-lab/load.ts),
// in headless Chromium, and fails if the audio thread's work, a bar's render, a bar's nodes or voices sounding at once, or the
// live graph's convolvers or compressors rise over the budgets below. CPU is read from /proc (Linux), in units of a reference
// 3 s convolver measured in the same run, so a faster or slower machine moves both together. Run by tools/music-lab/check.cjs.
//   node tools/music-lab/load.mjs [from bar: 108] [to bar: 124] [banger 1|0] [out.json] [clip.wav]   (LONG=1: seed 7's night 96-208)
import { build } from "esbuild";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The budgets, with headroom over the measured numbers after the fix (docs/notes/music.md "Music's load"; seed 7, bars 108-124,
// 2026-11-11, a busy shared machine): the audio thread 4.5 to 6.2 reference convolvers (10 to 11.6 before it), a bar's render 2.6 to 4.7 a second of it
// (3.7 before #1951's space pass; 6.3 on CI's runner, whose convolver is relatively quicker: the deterministic counts are the bars'
// finer guard), at most 858 nodes and 93 voices sounding at once a bar, five convolvers and four
// compressors made live. A new convolver or compressor is a decision: raise its budget with the reason, here and in the note.
// (barRef 9 → 13, the coordinator, 2026-11-12: CI's runners measured a bar's render at 6.3, 7.55, 9.46 and 10.26 on unchanged
// music, so 9 failed unrelated PRs and release 32's after-CI. The audio thread's budget, the one that caught Ed's crunch
// (10.1-11.6 before the fix), stays 8; the bar render stays guarded by its node and voice counts too.)
const BUDGET = { liveRef: 8, barRef: 13, barNodes: 1100, barVoices: 125, convolvers: 5, compressors: 4, late: 0 };

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const long = !!process.env.LONG, [fromArg = long ? "96" : "108", toArg = long ? "208" : "124", bangerArg = "1", out = "", clip = ""] = process.argv.slice(2);
const code = (await build({ entryPoints: [resolve(here, "load.ts")], bundle: true, format: "iife", target: "es2022", write: false, logLevel: "warning", loader: { ".json": "json" } })).outputFiles[0].text;
// the recordings the game loads (platform/audio/voiceSamples.ts)
const ids = { "female-note": join(root, "samples/voices/female-note.ogg"), whispers: join(root, "samples/voices/whispers.ogg") };
for (const d of ["alto", "chimera"]) for (const f of readdirSync(join(root, "samples", d)).filter(f => f.endsWith(".ogg"))) ids[f.replace(/\.ogg$/, "")] = join(root, "samples", d, f);
const samples = Object.fromEntries(Object.entries(ids).map(([k, p]) => [k, readFileSync(p).toString("base64")]));

const browser = await playwright.chromium.launch(), page = await browser.newPage(), errors = [];
page.on("pageerror", e => errors.push(String(e)));
// the renderer's audio work: the whole process's CPU (its offline renderers' threads come and go per render; /proc keeps
// theirs in the process's total) less its main thread's
const info = await (await browser.newBrowserCDPSession()).send("SystemInfo.getProcessInfo"), pid = info.processInfo.find(p => p.type === "renderer")?.id;
const ticks = path => { const st = readFileSync(path, "utf8"), f = st.slice(st.lastIndexOf(")") + 2).split(" "); return (Number(f[11]) + Number(f[12])) * 10; };
await page.exposeFunction("threadCpu", () => { try { return { audio: ticks(`/proc/${pid}/stat`) - ticks(`/proc/${pid}/task/${pid}/stat`) }; } catch { return { audio: NaN }; } });
await page.setContent("<!doctype html><meta charset=utf-8><body></body>");
await page.addScriptTag({ content: "{ let r = 12345; Math.random = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296); }\n" + code });
const job = { seed: 7, island: "owl", banger: bangerArg !== "0", from: Number(fromArg), to: Number(toArg), landings: [16, 48, 112, 168], victory: 184, samples, pcm: !!clip };
const r = await page.evaluate(o => window.musicLoad(o), job);
await browser.close();
if (clip) {
  const pcm = Buffer.from(r.pcm, "base64"), h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22);
  h.writeUInt32LE(r.rate, 24); h.writeUInt32LE(r.rate * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  writeFileSync(clip, Buffer.concat([h, pcm]));
}
delete r.pcm;
if (out) writeFileSync(out, JSON.stringify(r, null, 1));
const f1 = x => x.toFixed(1), f2 = x => x.toFixed(2);
console.log(`     the music's load, seed 7 bars ${job.from}-${job.to}${job.banger ? "" : " (?banger=0)"}: a reference convolver ${f1(r.refMs)} ms a second on this machine`);
console.log(`     audio thread: ${f1(r.live.cpuPerSec)} ms a second (${f2(r.live.ref)} references); ${r.live.convolvers} convolvers, ${r.live.compressors} compressors made; ${r.live.voices.peak} sources at once at most once drawn ahead`);
console.log(`     the bars drawn ahead (${r.bars.n}): ${f1(r.bars.cpuPerSec)} ms a second (${f2(r.bars.ref)} references), a bar ${f1(r.bars.cpuMs.mean)} ms (most ${f1(r.bars.cpuMs.max)}), queued on the page's thread in ${f1(r.bars.scheduleMs.mean)} ms (most ${f1(r.bars.scheduleMs.max)}); nodes ${Math.round(r.bars.nodes.mean)} (most ${r.bars.nodes.max}), voices at once ${Math.round(r.bars.voices.mean)} (most ${r.bars.voices.max}); late ${r.ahead.late}`);
console.log(`     before the master limiter: peak ${f1(r.levels.preLimiterPeakDb)} dBFS; the limiter's reduction median ${f1(r.levels.limiterReductionDb.median)} dB, most ${f1(r.levels.limiterReductionDb.max)} dB; output peak ${f1(r.levels.outputPeakDb)} dBFS`);
let failed = 0;
const ok = (c, msg) => { console.log(`${c ? "ok  " : "FAIL"} ${msg}`); if (!c) failed++; };
ok(errors.length === 0, `no script errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
const cpuRead = Number.isFinite(r.refMs) && r.refMs > 0;
if (cpuRead) {
  ok(r.live.ref <= BUDGET.liveRef, `the audio thread's work within ${BUDGET.liveRef} reference convolvers (${f2(r.live.ref)})`);
  ok(r.bars.ref <= BUDGET.barRef, `a bar's render within ${BUDGET.barRef} reference convolvers a second of it (${f2(r.bars.ref)})`);
} else console.log("     (no /proc here: the CPU budgets not checked)");
ok(r.bars.nodes.max <= BUDGET.barNodes, `a bar's nodes at most ${BUDGET.barNodes} (${r.bars.nodes.max})`);
ok(r.bars.voices.max <= BUDGET.barVoices, `a bar's voices sounding at once at most ${BUDGET.barVoices} (${r.bars.voices.max})`);
ok(r.live.convolvers <= BUDGET.convolvers && r.live.compressors <= BUDGET.compressors, `the live graph's convolvers at most ${BUDGET.convolvers} (${r.live.convolvers}), compressors at most ${BUDGET.compressors} (${r.live.compressors})`);
ok(r.ahead.late <= BUDGET.late && r.ahead.rendered >= r.bars.n - 1, `every bar drawn ahead in time (${r.ahead.rendered} rendered, ${r.ahead.late} late)`);
process.exit(failed ? 1 : 0);
