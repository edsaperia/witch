import { defineConfig } from "vitest/config";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";

// base "./": the same build works at the site's root and under /pr-<number>/.
// The build's version, shown in the corner: the Pages workflow sets these; local builds say "dev".
const version = process.env.WITCH_VERSION ? `v${process.env.WITCH_VERSION}` : "dev";
const sha = (process.env.WITCH_SHA ?? "").slice(0, 7);
// What the drawn sprite sets depend on (the art code, how sets are packed, the area types' own
// numbers): browsers keep drawn sets under this hash, so a build that changes none of it reuses them.
const artFiles = [...readdirSync("art").filter(f => f.endsWith(".js")).map(f => `art/${f}`), "src/render/artBuild.ts", "src/rules/map.ts", "src/rules/random.ts", "config/area-types.json"];
const artHash = createHash("sha1").update(artFiles.map(f => f + "\n" + readFileSync(f, "utf8")).join("\n")).digest("hex").slice(0, 12);

export default defineConfig({
  base: "./",
  define: { __BUILD__: JSON.stringify(sha ? `${version} · ${sha}` : version), __ART_HASH__: JSON.stringify(artHash) },
  build: { target: "es2022", chunkSizeWarningLimit: 1200 },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
