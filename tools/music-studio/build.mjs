// Builds the Music Studio beside the game (Ed, 2026-10-22: a patch designer and a MIDI player for the musician), a step of
// `npm run build`: dist/music-studio.html (tools/music-studio/page.html) and its script bundled by esbuild into
// dist/music-studio/ (on its own, so the game's bundle is exactly as it was). Served at /witch/music-studio.html and on each
// pull request's build.
//   node tools/music-studio/build.mjs [out dir: dist]
import { build } from "esbuild";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), dist = resolve(root, process.argv[2] ?? "dist");
if (!existsSync(dist)) throw new Error(`${dist} doesn't exist: build the game first (npm run build)`);
const out = join(dist, "music-studio");
mkdirSync(out, { recursive: true });
await build({
  entryPoints: { studio: join(here, "main.ts") }, outdir: out, bundle: true, format: "esm",
  target: "es2022", minify: true, legalComments: "none", logLevel: "warning",
});
writeFileSync(join(dist, "music-studio.html"), readFileSync(join(here, "page.html"), "utf8"));
console.log("wrote dist/music-studio.html and dist/music-studio/ (the Music Studio)");
