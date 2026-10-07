// Bundles one of tools/bench's TypeScript probes with esbuild and runs it in Node, with the GC exposed (for its heap
// readings): node tools/bench/ts.mjs perf --seeds=871136 --waves=10,20,28   ·   node tools/bench/ts.mjs spikes --seed=123
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
const here = path.dirname(fileURLToPath(import.meta.url)), [name, ...rest] = process.argv.slice(2);
const bundle = path.join(os.tmpdir(), `witch-${name}-${process.pid}.mjs`);
await build({ entryPoints: [path.join(here, `${name}.ts`)], bundle: true, platform: "node", format: "esm", outfile: bundle, logLevel: "warning", sourcemap: "inline" });
execFileSync(process.execPath, ["--expose-gc", "--enable-source-maps", bundle, ...rest], { stdio: "inherit" });
