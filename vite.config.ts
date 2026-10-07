import { defineConfig } from "vitest/config";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { availableParallelism } from "node:os";

// base "./": the same build works at the site's root and under /pr-<number>/.
// The build's version, shown in the corner: the Pages workflow sets these; local builds say "dev".
const version = process.env.WITCH_VERSION ? `v${process.env.WITCH_VERSION}` : "dev";
const sha = (process.env.WITCH_SHA ?? "").slice(0, 7);
// What the drawn sprite sets depend on (the art code, how sets are packed, the area types' own
// numbers): browsers keep drawn sets under this hash, so a build that changes none of it reuses them.
const artFiles = [...readdirSync("art").filter(f => f.endsWith(".js")).map(f => `art/${f}`), "src/render/artBuild.ts", "src/rules/map.ts", "src/rules/random.ts", "config/area-types.json"];
const artHash = createHash("sha1").update(artFiles.map(f => f + "\n" + readFileSync(f, "utf8")).join("\n")).digest("hex").slice(0, 12);
// The start screen's "Coming up": the open pull requests, listed by the Pages workflow into
// upcoming.generated.json before it builds (never committed); none in a local build.
const upcoming = existsSync("upcoming.generated.json") ? JSON.parse(readFileSync("upcoming.generated.json", "utf8")) : [];

export default defineConfig({
  base: "./",
  define: { __BUILD__: JSON.stringify(sha ? `${version} · ${sha}` : version), __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)), __UPCOMING__: JSON.stringify(upcoming), __ART_HASH__: JSON.stringify(artHash) },
  build: { target: "es2022", chunkSizeWarningLimit: 1200 },
  // The rules tests build whole maps and play out fights and waves: CPU-bound seconds each, many more
  // under load (a smoke run or CI's busy runners), so vitest's 5 s default made them time out at random.
  // One generous limit for all (a hung test still fails, after a minute).
  // Tests (overnight phase 1, test speed): a worker per core (Vitest leaves one idle by default) and one module load per
  // worker rather than per file (isolate false: no test file leaves module state changed; the few that change it put it
  // back in afterEach). 281 s to 216 s locally on 4 cores, the same 758 tests.
  test: { include: ["src/**/*.test.ts"], environment: "node", testTimeout: 60_000, hookTimeout: 60_000, maxWorkers: availableParallelism(), isolate: false },
});
