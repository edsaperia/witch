// The rules benchmark (tools/bench/rules.ts), bundled with esbuild and run in Node; writes
// <out>/rules.json. Then, unless --rules-only, the frame benchmark (tools/bench/frames.cjs, on the
// built game: `npm run build` first). Compare two outs with tools/bench/compare.cjs.
//   node tools/bench/run.mjs [out dir] [--rules-only] [--seeds=123,165272] [--wave=30] [--steps=1800]
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2), flags = argv.filter(a => a.startsWith("--")), out = path.resolve(argv.find(a => !a.startsWith("--")) ?? path.join(here, "../../bench-out"));
fs.mkdirSync(out, { recursive: true });
const bundle = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "witch-bench-")), "rules.mjs");
await build({ entryPoints: [path.join(here, "rules.ts")], bundle: true, platform: "node", format: "esm", outfile: bundle, logLevel: "warning" });
const rules = execFileSync(process.execPath, [bundle, ...flags.filter(f => f !== "--rules-only")], { encoding: "utf8", maxBuffer: 1 << 26 });
fs.writeFileSync(path.join(out, "rules.json"), rules);
for (const s of JSON.parse(rules).seeds) console.log(`rules seed ${s.seed}: wave ${s.wave}, ${s.creatures} creatures, step median ${s.step.median} ms, p99 ${s.step.p99} ms, worst ${s.step.worst} ms`);
if (!flags.includes("--rules-only")) execFileSync(process.execPath, [path.join(here, "frames.cjs"), out], { stdio: "inherit" });
