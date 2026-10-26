import { defineConfig } from "vitest/config";
import { existsSync, readFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { readPng } from "./tools/overrides/png";
import { artHash as artHashOf, overrideFiles as overridesAt } from "./tools/artHash";

// base "./": the same build works at the site's root and under /pr-<number>/.
// The build's version, shown in the corner: the Pages workflow sets these; local builds say "dev".
const version = process.env.WITCH_VERSION ? `v${process.env.WITCH_VERSION}` : "dev";
const sha = (process.env.WITCH_SHA ?? "").slice(0, 7);
// What the drawn sprite sets depend on (tools/artHash.ts): browsers keep drawn sets under this hash, so a build that
// changes none of it reuses them.
const artHash = artHashOf();
// Hand-drawn sprites (art/overrides/<species>/<pose>.png, src/render/overrides.ts): read here, given to the game as
// virtual:art-overrides (each one's size and RGBA pixels), and part of the art's hash.
const OVERRIDES = "art/overrides";
const overrideFiles = overridesAt(".");
// The config files' notes (keys starting with _: Ed's reference, generated into config/KNOBS.md) are not read by the game, so
// a build leaves them out of the bundle: the tuning file alone is 187 kB minified, 159 kB of it notes, and it rides in the game
// and in the sea chart's outlines worker both (about 95 kB gzipped off the download). Dev, the tests and the tools read the
// files as they are (the schema test checks the notes).
const stripNotes = (v: unknown): unknown => Array.isArray(v) ? v.map(stripNotes) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v as Record<string, unknown>).filter(([k]) => !k.startsWith("_")).map(([k, x]) => [k, stripNotes(x)])) : v;
const configNotes = () => ({
  name: "config-notes",
  apply: "build" as const,
  enforce: "pre" as const,
  transform(code: string, id: string) {
    if (!/\/config\/[^/]+\.json$/.test(id)) return null;
    return { code: JSON.stringify(stripNotes(JSON.parse(code))), map: null };
  },
});
const artOverrides = () => ({
  name: "art-overrides",
  resolveId: (id: string) => (id === "virtual:art-overrides" ? "\0virtual:art-overrides" : null),
  load(id: string) {
    if (id !== "\0virtual:art-overrides") return null;
    const out: Record<string, { w: number; h: number; px: string }> = {};
    for (const f of overrideFiles) {
      const [species, file] = f.slice(OVERRIDES.length + 1).split("/"), { w, h, rgba } = readPng(readFileSync(f));
      out[`${species}/${file.slice(0, -4)}`] = { w, h, px: Buffer.from(rgba).toString("base64") };
    }
    return `export default ${JSON.stringify(out)};`;
  },
});
// The start screen's "Coming up": the open pull requests, listed by the Pages workflow into
// upcoming.generated.json before it builds (never committed); none in a local build.
const upcoming = existsSync("upcoming.generated.json") ? JSON.parse(readFileSync("upcoming.generated.json", "utf8")) : [];

// version.json beside the game (Ed, 2026-10-14: the page says when a newer build is out; app/newBuild.ts reads it): the build's label, so a
// page left open can tell it's been replaced (main's at the site's root, each pull request's in its pr-<number>/).
const versionFile = () => ({
  name: "version-file",
  generateBundle(this: { emitFile: (f: { type: "asset"; fileName: string; source: string }) => void }) {
    this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ version: sha ? `${version} · ${sha}` : version, built: new Date().toISOString() }) });
  },
});

export default defineConfig({
  base: "./",
  define: { __BUILD__: JSON.stringify(sha ? `${version} · ${sha}` : version), __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)), __UPCOMING__: JSON.stringify(upcoming), __ART_HASH__: JSON.stringify(artHash) },
  // (two pages: the game, and the sea chart: chart.html, wave 2 part C)
  build: { target: "es2022", chunkSizeWarningLimit: 1200, rollupOptions: { input: { main: "index.html", chart: "chart.html" } } },
  plugins: [artOverrides(), configNotes(), versionFile()],
  worker: { plugins: () => [artOverrides(), configNotes()] },
  // The rules tests build whole maps and play out fights and waves: CPU-bound seconds each, many more
  // under load (a smoke run or CI's busy runners), so vitest's 5 s default made them time out at random.
  // One generous limit for all (a hung test still fails, after a minute).
  // Tests (overnight phase 1, test speed): a worker per core (Vitest leaves one idle by default) and one module load per
  // worker rather than per file (isolate false: no test file leaves module state changed; the few that change it put it
  // back in afterEach). 281 s to 216 s locally on 4 cores, the same 758 tests.
  test: { include: ["src/**/*.test.ts", "tools/bench/*.test.ts", "tools/shots/*.test.ts"], environment: "node", setupFiles: ["src/test/radiusMap.ts"], testTimeout: 60_000, hookTimeout: 60_000, maxWorkers: availableParallelism(), isolate: false },
});
