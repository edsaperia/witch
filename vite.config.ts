import { defineConfig } from "vitest/config";

// base "./": the same build works at the site's root and under /pr-<number>/.
export default defineConfig({
  base: "./",
  build: { target: "es2022", chunkSizeWarningLimit: 1200 },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
