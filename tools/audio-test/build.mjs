// Builds the audio capacity test (tools/audio-test: Ed, 2026-10-26, linked from the pause page's "🔊 Audio test") beside the
// game, a step of `npm run build`: dist/audio-test/ (its pages (the capacity test, index.html, and the music stall test, stall.html), their scripts and the singer's recordings), with Vite on
// its own (the game's own build untouched; the game's modules, as they are). Served at /witch/audio-test/ and on each pull
// request's build.
//   node tools/audio-test/build.mjs [out dir: dist]
import { build } from "vite";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), dist = resolve(root, process.argv[2] ?? "dist");
if (!existsSync(dist)) throw new Error(`${dist} doesn't exist: build the game first (npm run build)`);
const version = process.env.WITCH_VERSION ? `v${process.env.WITCH_VERSION}` : "dev", sha = (process.env.WITCH_SHA ?? "").slice(0, 7);
await build({
  configFile: false, root: here, base: "./", logLevel: "warn",
  define: { __BUILD__: JSON.stringify(sha ? `${version} · ${sha}` : version) },
  build: { outDir: join(dist, "audio-test"), emptyOutDir: true, target: "es2022", chunkSizeWarningLimit: 4000, rollupOptions: { input: { main: join(here, "index.html"), stall: join(here, "stall.html") } } },
});
console.log("wrote dist/audio-test/ (the audio capacity test)");
