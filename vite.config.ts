import { defineConfig } from "vitest/config";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { readPng } from "./tools/overrides/png";

// base "./": the same build works at the site's root and under /pr-<number>/.
// The build's version, shown in the corner: the Pages workflow sets these; local builds say "dev".
const version = process.env.WITCH_VERSION ? `v${process.env.WITCH_VERSION}` : "dev";
const sha = (process.env.WITCH_SHA ?? "").slice(0, 7);
// What the drawn sprite sets depend on (the art code, how sets are packed, the area types' own
// numbers): browsers keep drawn sets under this hash, so a build that changes none of it reuses them.
const artFiles = [...readdirSync("art").filter(f => f.endsWith(".js")).map(f => `art/${f}`), "src/render/artBuild.ts", "src/rules/map.ts", "src/rules/random.ts", "config/area-types.json"];
// Hand-drawn sprites (art/overrides/<species>/<pose>.png, src/render/overrides.ts): read here, given to the game as
// virtual:art-overrides (each one's size and RGBA pixels), and part of the art's hash.
const OVERRIDES = "art/overrides";
const overrideFiles = existsSync(OVERRIDES) ? readdirSync(OVERRIDES, { withFileTypes: true }).filter(d => d.isDirectory()).flatMap(d => readdirSync(`${OVERRIDES}/${d.name}`).filter(f => f.endsWith(".png")).sort().map(f => `${OVERRIDES}/${d.name}/${f}`)).sort() : [];
const artHash = createHash("sha1").update(artFiles.map(f => f + "\n" + readFileSync(f, "utf8")).join("\n")).update(overrideFiles.join("\n")).update(Buffer.concat(overrideFiles.map(f => readFileSync(f)))).digest("hex").slice(0, 12);
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

export default defineConfig({
  base: "./",
  define: { __BUILD__: JSON.stringify(sha ? `${version} · ${sha}` : version), __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)), __UPCOMING__: JSON.stringify(upcoming), __ART_HASH__: JSON.stringify(artHash) },
  build: { target: "es2022", chunkSizeWarningLimit: 1200 },
  plugins: [artOverrides()],
  worker: { plugins: () => [artOverrides()] },
  // The rules tests build whole maps and play out fights and waves: CPU-bound seconds each, many more
  // under load (a smoke run or CI's busy runners), so vitest's 5 s default made them time out at random.
  // One generous limit for all (a hung test still fails, after a minute).
  test: { include: ["src/**/*.test.ts"], environment: "node", testTimeout: 60_000, hookTimeout: 60_000 },
});
