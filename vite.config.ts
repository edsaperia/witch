import { defineConfig } from "vitest/config";

// base "./": the same build works at the site's root and under /pr-<number>/.
// The build's version, shown in the corner: the Pages workflow sets these; local builds say "dev".
const version = process.env.WITCH_VERSION ? `v${process.env.WITCH_VERSION}` : "dev";
const sha = (process.env.WITCH_SHA ?? "").slice(0, 7);

export default defineConfig({
  base: "./",
  define: { __BUILD__: JSON.stringify(sha ? `${version} · ${sha}` : version) },
  build: { target: "es2022", chunkSizeWarningLimit: 1200 },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
