import { defineConfig, mergeConfig } from "vite";
import ordinary from "./vite.config";

// An independent graph: no extraction can change the ordinary entry or its imports.
export default defineConfig(() => {
  const config = { ...ordinary, build: undefined };
  return mergeConfig(config, {
    base: "./",
    build: { target: "es2022", chunkSizeWarningLimit: 1200, outDir: "dist/online", emptyOutDir: true, rollupOptions: { input: { online: "online.html" } } },
  });
});
