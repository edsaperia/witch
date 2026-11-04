// Stamps the changelog's fragments with the build they went live in (the coordinator, 2026-11-04: null fragments were left once
// builders stopped pushing after the coordinator released them, so What's new showed weeks of changes as "the build being played").
// A fragment in config/changelog/ whose version is null and which is already in a release's commit gets that release's build
// number (main's CI run number, the version bottom right in the game). Run it at each release; only "version" changes, nothing else
// in the file.
//   node tools/config/stampChangelog.mjs <release commit> <build>   stamp every null fragment that commit holds with <build>
//   node tools/config/stampChangelog.mjs --check [<ref>]            list null fragments already in <ref> (origin/main by default); exit 1 if any
// tools/config/stampChangelog.test.ts tests it.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
export const DIR = "config/changelog";
const NULL = /"version"\s*:\s*null/;

/** The fragments (not the frozen archive, which holds `entries`) in `dir` whose version is null, by file name, sorted. */
export function nullFragments(dir = join(ROOT, DIR)) {
  return readdirSync(dir).filter(f => f.endsWith(".json")).sort().filter(f => {
    const j = JSON.parse(readFileSync(join(dir, f), "utf8"));
    return !j.entries && (j.version ?? null) === null;
  });
}

/** The fragment file names in a commit's config/changelog/. */
export function fragmentsAt(ref, root = ROOT) {
  const out = execFileSync("git", ["ls-tree", "--name-only", ref, `${DIR}/`], { cwd: root, encoding: "utf8" }); // (none in a commit before the changelog)
  return new Set(out.split("\n").map(s => s.trim().slice(DIR.length + 1)).filter(f => f.endsWith(".json")));
}

/** The null fragments in `dir` that `present` (a release's fragments) holds: those already live and still unstamped. */
export const liveNulls = (present, dir = join(ROOT, DIR)) => nullFragments(dir).filter(f => present.has(f));

/** Writes `build` into each named fragment's null version, touching nothing else in it. Returns the names stamped. */
export function stamp(names, build, dir = join(ROOT, DIR)) {
  if (!Number.isInteger(build) || build <= 0) throw Error(`not a build number: ${build}`);
  const done = [];
  for (const f of names) {
    const p = join(dir, f), text = readFileSync(p, "utf8");
    if (!NULL.test(text)) continue;
    const next = text.replace(NULL, `"version": ${build}`);
    if (JSON.parse(next).version !== build) throw Error(`${f}: stamping didn't take`);
    writeFileSync(p, next);
    done.push(f);
  }
  return done;
}

/** A release: every null fragment its commit holds gets its build. */
export const stampRelease = (ref, build, root = ROOT) => stamp(liveNulls(fragmentsAt(ref, root), join(root, DIR)), build, join(root, DIR));

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  if (args[0] === "--check") {
    const ref = args[1] ?? "origin/main", live = liveNulls(fragmentsAt(ref));
    for (const f of live) console.log(`${DIR}/${f}: live in ${ref}, version null`);
    console.log(live.length ? `${live.length} live fragment(s) unstamped: node tools/config/stampChangelog.mjs <release commit> <build>` : `every fragment live in ${ref} is stamped`);
    process.exit(live.length ? 1 : 0);
  }
  const [ref, build] = args;
  if (!ref || !/^\d+$/.test(build ?? "")) { console.error("usage: node tools/config/stampChangelog.mjs <release commit> <build> | --check [<ref>]"); process.exit(2); }
  const done = stampRelease(ref, Number(build));
  for (const f of done) console.log(`${DIR}/${f}: ${build}`);
  console.log(`${done.length} stamped`);
}
