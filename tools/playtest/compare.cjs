// Two playtest logs (the L key's JSON, platform/playtestLog.ts) side by side, like with like only (Ed, 2026-10-26: this morning's
// "v4821 slower than v4522" set a wave-0 run on one island against waves 0 to 4 after a sail on another). Each run's
// comparability key (app/compareKey.ts) must differ from the other's in nothing but what's being tested (the build by default),
// or it's refused with the fields that differ (exit 2; --testing <fields> to say what's being tested, --override to compare
// anyway). Each run's samples are split by scene (island, wave, mode: tools/lib/comparable.cjs segments), and only a scene both
// runs have is set side by side: the frames' medians by scene, never the session's.
//   node tools/playtest/compare.cjs <log a> [<log b>] [--a <run>] [--b <run>] [--testing build,...] [--override]
// A log holds the last few runs; --a and --b pick one by index (0 the oldest, -1 the newest: the default). With one log, its
// run's segments alone.
const fs = require("fs");
const { checkComparable, compareFlags, segments, byScene } = require("../lib/comparable.cjs");

const args = process.argv.slice(2), flags = compareFlags(args);
const pick = name => { const i = args.indexOf(name); return i >= 0 ? Number(args.splice(i, 2)[1]) : -1; };
const ia = pick("--a"), ib = pick("--b");
const [fa, fb] = args;
if (!fa) { console.error("usage: node tools/playtest/compare.cjs <log a> [<log b>] [--a <run>] [--b <run>] [--testing build,...] [--override]"); process.exit(1); }
const runOf = (file, i) => { const v = JSON.parse(fs.readFileSync(file, "utf8")), runs = Array.isArray(v) ? v : [v], r = runs.at(i); if (!r) throw new Error(`${file}: no run ${i} (it has ${runs.length})`); return r; };
const n = v => (v === null || v === undefined ? "–" : String(v));
const name = r => `${r.build} seed ${r.seed} (${r.started})`;

const A = runOf(fa, ia);
const table = (r) => [`segments of ${name(r)}:`, "| scene | t (s) | samples | frame ms | p95 | cpu | gpu |", "|---|---|---|---|---|---|---|",
  ...segments(r).map(s => `| ${s.scene} | ${s.t0}–${s.t1} | ${s.n} | ${n(s.ms)} | ${n(s.p95)} | ${n(s.cpu)} | ${n(s.gpu)} |`)].join("\n");
if (!fb) { console.log(table(A)); process.exit(0); }

const B = runOf(fb, ib);
// (not the key's scene: a run's is where it was last sampled; its samples' scenes are matched one by one below)
const c = checkComparable(A.key, B.key, { ...flags, testing: [...flags.testing, "scene"], what: `${name(A)} and ${name(B)}` });
console.log(c.text);
if (!c.ok) process.exit(2);
console.log(`\n${table(A)}\n\n${table(B)}\n`);
const sa = byScene(A), sb = byScene(B), both = [...sa.keys()].filter(k => sb.has(k)), only = [...new Set([...sa.keys(), ...sb.keys()])].filter(k => !both.includes(k));
console.log("by scene, both runs (median frame ms, p95, cpu, gpu: a → b):", "\n| scene | samples | frame ms | p95 | cpu | gpu |", "\n|---|---|---|---|---|---|");
for (const k of both) { const a = sa.get(k), b = sb.get(k), f = p => `${n(a[p])} → ${n(b[p])}`; console.log(`| ${k} | ${a.n} / ${b.n} | ${f("ms")} | ${f("p95")} | ${f("cpu")} | ${f("gpu")} |`); }
if (!both.length) console.log("(no scene in both runs: nothing like for like to set side by side)");
if (only.length) console.log(`\nnot compared (in one run only): ${only.map(k => `${k} (${sa.has(k) ? "a" : "b"})`).join(", ")}`);
