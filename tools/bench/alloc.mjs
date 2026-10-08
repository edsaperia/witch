// Bundles tools/bench/alloc.ts with esbuild and runs it in Node (as run.mjs does the rules bench).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
const here = path.dirname(fileURLToPath(import.meta.url)), bundle = path.join(os.tmpdir(), `witch-alloc-${process.pid}.mjs`);
await build({ entryPoints: [path.join(here, "alloc.ts")], bundle: true, platform: "node", format: "esm", outfile: bundle, logLevel: "warning", sourcemap: "inline" });
execFileSync(process.execPath, ["--enable-source-maps", bundle, ...process.argv.slice(2)], { stdio: "inherit" });
