// Launch only in the approved existing cloud CPU allocation. No browser or local full-suite work.
//   node tools/combat-spacing/run.mjs [--fights=20] [--seconds=24] [--out=spacing-measure.json]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { build } from "esbuild";
if (process.platform === "win32" || !(process.env.GITHUB_ACTIONS === "true" || process.env.WITCH_CLOUD_CPU === "1")) throw Error("Canonical-allocated cloud CPU only");
const here = path.dirname(fileURLToPath(import.meta.url)), dir = path.resolve("previews/combat-spacing");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, "measure.mjs");
await build({ entryPoints: [path.join(here, "measure.ts")], bundle: true, platform: "node", format: "esm", outfile: file, logLevel: "silent" });
const run = spawnSync(process.execPath, [file, ...process.argv.slice(2)], { stdio: "inherit", timeout: 18 * 60 * 1000 });
if (run.error) console.error(run.error.message);
process.exitCode = run.status ?? 1;
