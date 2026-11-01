// Is the head's game exactly the base's? Then bench:quick cannot differ and CI skips it.
//   node tools/ci/same-game.mjs <base checkout> <head checkout>   (prints same=true|false for $GITHUB_OUTPUT)
// Both builds must carry the same stamp (WITCH_VERSION/WITCH_SHA) and no in-flight list: base/dist and head/dist-same.
// "Same" needs all three: every built file byte-identical (only version.json's build time ignored), the rules
// benchmark's bundle of the game source identical, and the benchmark tool itself unchanged. Anything else runs the bench.
import { build } from "esbuild";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const IGNORED = new Set(["version.json", "online/version.json"]);

export function treeHashes(dir, ignore = new Set()) {
  const out = new Map();
  const walk = rel => {
    for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
      const f = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) walk(f);
      else if (!ignore.has(f)) out.set(f, createHash("sha256").update(fs.readFileSync(path.join(dir, f))).digest("hex"));
    }
  };
  if (fs.existsSync(dir)) walk("");
  return out;
}

/** The first difference between two hash maps, or null. */
export function firstDifference(a, b) {
  for (const [f, h] of a) if (b.get(f) !== h) return b.has(f) ? `changed ${f}` : `removed ${f}`;
  for (const f of b.keys()) if (!a.has(f)) return `added ${f}`;
  return null;
}

/** Versions stamped differently would make every byte differ: refuse rather than report a false "different". */
export function sameStamp(baseDist, headDist) {
  const read = d => { try { return JSON.parse(fs.readFileSync(path.join(d, "version.json"), "utf8")).version; } catch { return null; } };
  const a = read(baseDist);
  return a !== null && a === read(headDist);
}

async function rulesBundle(checkout) {
  const outfile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "witch-same-")), "rules.mjs");
  await build({ entryPoints: [path.join(checkout, "tools/bench/rules.ts")], absWorkingDir: checkout, bundle: true, platform: "node", format: "esm", outfile, logLevel: "silent" });
  return createHash("sha256").update(fs.readFileSync(outfile, "utf8").replaceAll(checkout, "<root>")).digest("hex");
}

export async function sameGame(base, head) {
  if (!sameStamp(path.join(base, "dist"), path.join(head, "dist-same"))) return { same: false, reason: "builds not stamped alike" };
  // A branch's tools/bench/expect/<branch>.json only declares what that branch means to change (compare.cjs reads it); it is
  // not part of the benchmark, and every release adds one, so it must not defeat the skip.
  const benchTool = dir => new Map([...treeHashes(path.join(dir, "tools/bench"))].filter(([f]) => !f.startsWith("expect/")));
  const bench = firstDifference(benchTool(base), benchTool(head));
  if (bench) return { same: false, reason: `benchmark tool ${bench}` };
  const dist = firstDifference(treeHashes(path.join(base, "dist"), IGNORED), treeHashes(path.join(head, "dist-same"), IGNORED));
  if (dist) return { same: false, reason: `build ${dist}` };
  if (await rulesBundle(base) !== await rulesBundle(head)) return { same: false, reason: "rules benchmark source differs" };
  return { same: true, reason: "game build and rules benchmark source byte-identical to base" };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const [base, head] = process.argv.slice(2).map(p => path.resolve(p));
  let r;
  try { r = await sameGame(base, head); } catch (e) { r = { same: false, reason: `comparison failed: ${e.message}` }; }
  console.error(`::notice title=game-unchanged::${r.same ? "Skipped bench:quick" : "Running bench:quick"}: ${r.reason}`);
  if (r.same) { fs.mkdirSync("out", { recursive: true }); fs.writeFileSync("out/compare.md", `## bench:quick skipped\n\n${r.reason}.\n`); }
  console.log(`same=${r.same}`);
}
