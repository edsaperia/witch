// Legacy global hash for diagnostics/comparison. Production cache keys now use artFingerprintMap below.
// The art's old hash (vite.config.ts's __ART_HASH__): what the drawn sprite sets depended on, so browsers
// keep drawn sets under it and a build that changes none of it reuses them. Every .js and .json under art/, its subfolders
// too (art/genome, art/flora, art/props, art/recipes...: it read art/'s top level only, so an edit down there kept the old
// hash and players their stale drawn art), without art/out (the exports) and art/overrides (its PNGs hashed apart); then
// how sets are packed and the area types' own numbers. Paths sorted and relative, so it's the same wherever it's built.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { diskTree } from "./artDependencies";
import { artJobFingerprints, type ArtFingerprintResult } from "./artJobFingerprints";

/** Besides art/: how sets are packed, the map's places, and the area types' numbers. */
export const ART_EXTRA = ["src/render/artBuild.ts", "src/render/homeArt.ts", "src/rules/map.ts", "src/rules/random.ts", "config/area-types.json"];
/** art/'s folders that aren't the art code. */
const SKIP = new Set(["art/out", "art/overrides"]);
const OVERRIDES = "art/overrides";

/** Every .js and .json under `dir` (relative to `root`), all the way down, sorted. */
export function filesUnder(root: string, dir: string): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
      const p = `${d}/${e.name}`;
      if (e.name.startsWith(".") || SKIP.has(p)) continue;
      if (e.isDirectory()) walk(p);
      else if (/\.(js|json)$/.test(e.name)) out.push(p);
    }
  };
  walk(dir);
  return out.sort();
}

/** The hand-drawn sprites (art/overrides/<species>/<pose>.png, src/render/overrides.ts), sorted. */
export function overrideFiles(root: string): string[] {
  const o = join(root, OVERRIDES);
  return existsSync(o) ? readdirSync(o, { withFileTypes: true }).filter(d => d.isDirectory()).flatMap(d => readdirSync(join(o, d.name)).filter(f => f.endsWith(".png")).sort().map(f => `${OVERRIDES}/${d.name}/${f}`)).sort() : [];
}

/** The art's hash at `root` (12 hex): each source's path and contents, then the overrides' paths and pixels. */
export function artHash(root = "."): string {
  const files = [...filesUnder(root, "art"), ...ART_EXTRA], pngs = overrideFiles(root);
  return createHash("sha1").update(files.map(f => f + "\n" + readFileSync(join(root, f), "utf8")).join("\n")).update(pngs.join("\n")).update(Buffer.concat(pngs.map(f => readFileSync(join(root, f))))).digest("hex").slice(0, 12);
}

/** Build-time map; browsers receive only its short per-kind hashes, never the analyzer. */
export function artFingerprintMap(root = "."): ArtFingerprintResult {
  return artJobFingerprints(diskTree(root), {
    virtual: { "virtual:art-overrides": overrideFiles(root) },
    buildInputs: ["tools/artHash.ts", "tools/artDependencies.ts", "tools/artJobFingerprints.ts", "tools/overrides/png.ts", "src/render/artCache.ts", "vite.config.ts"],
  });
}
