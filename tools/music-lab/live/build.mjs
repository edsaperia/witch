// Builds the live Music Lab beside the game (Ed, 2026-10-11: "a music lab with sliders that lets me copy and paste my
// choices"), the last step of `npm run build`: dist/music-lab.html (tools/music-lab/live/page.html), its script and the
// Pink Trombone worker bundled by esbuild into dist/music-lab/ (on their own, so the game's own bundle is exactly as it
// was), and the samples (samples/**, with their manifest and credits) copied to dist/music-lab/samples/. Served at
// /witch/music-lab.html and on each pull request's build.
//   node tools/music-lab/live/build.mjs [out dir: dist]
import { build } from "esbuild";
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../../.."), dist = resolve(root, process.argv[2] ?? "dist");
if (!existsSync(dist)) throw new Error(`${dist} doesn't exist: build the game first (npm run build)`);
const out = join(dist, "music-lab");
mkdirSync(out, { recursive: true });
await build({
  entryPoints: { lab: join(here, "main.ts"), ptWorker: join(here, "ptWorker.ts") }, outdir: out, bundle: true, format: "esm",
  target: "es2022", minify: true, legalComments: "none", logLevel: "warning",
});
cpSync(join(root, "samples"), join(out, "samples"), { recursive: true, filter: f => !f.endsWith("sources.json") });
const page = readFileSync(join(here, "page.html"), "utf8");
writeFileSync(join(dist, "music-lab.html"), page);
console.log(`wrote dist/music-lab.html and dist/music-lab/ (the live Music Lab)`);
