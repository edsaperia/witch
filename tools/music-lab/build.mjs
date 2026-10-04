// Builds the Witch Music Lab as one self-contained page (an artifact page cannot load other files):
// tools/music-lab/lab.ts and everything it imports from the game (the music engine, the conductor,
// the score, the mix, config/music-style.json) bundled by esbuild (Vite's own) into the page's
// one script. Writes tools/music-lab/dist/witch-music-lab.html.
//   node tools/music-lab/build.mjs
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../..");
const out = resolve(here, "dist/witch-music-lab.html");
const result = await build({
  entryPoints: [resolve(here, "lab.ts")], bundle: true, format: "iife", target: "es2022", write: false,
  minify: false, legalComments: "none", logLevel: "warning",
});
const code = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const page = readFileSync(resolve(here, "music-lab.html"), "utf8").replace("/*SCRIPT*/", () => code);
if (/\b(src|href)="https?:/.test(page)) throw new Error("the page would fetch something: it must stand alone");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page);
console.log(`wrote ${out.slice(root.length + 1)} (${(page.length / 1024).toFixed(1)} KB)`);
