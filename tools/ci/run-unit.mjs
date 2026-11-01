// Resolve related tests first. A broken/empty selector falls back to full tests; a failing TEST does not.
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { changedScope } from "./test-scope.mjs";

export function selectedTests(scope, list, root = process.cwd()) {
  if (scope.mode !== "related") return { ...scope, tests: [] };
  try {
    const entries = JSON.parse(list(scope.base));
    if (!Array.isArray(entries) || !entries.length) throw Error("empty related set");
    const tests = entries.map(entry => {
      if (typeof entry?.file !== "string") throw Error("unexpected selector output");
      const rel = path.relative(root, entry.file).replaceAll("\\", "/");
      if (rel.startsWith("../") || path.isAbsolute(rel) || !rel.endsWith(".test.ts")) throw Error("invalid selected test path");
      return rel;
    });
    return { ...scope, tests: [...new Set(tests)].sort() };
  } catch (error) { return { ...scope, mode: "full", reason: `related selection failed: ${error.message}`, tests: [] }; }
}

/** "i/n" from VITEST_SHARD, or null. A malformed value is an error, never a silently skipped shard. */
export function parseShard(value) {
  if (!value) return null;
  const m = /^(\d+)\/(\d+)$/.exec(value);
  if (!m || +m[1] < 1 || +m[2] < 1 || +m[1] > +m[2]) throw Error(`invalid VITEST_SHARD: ${value}`);
  return { index: +m[1], count: +m[2], text: value };
}

/** Split the full suite's files into `count` shards by measured seconds (tools/ci/unit-timings.json), largest first, each to the
 * shard whose estimated wall time (its longest file, or its total over `workers`) grows least. Vitest's own --shard splits by
 * count, which put the slowest files together (one shard took 11 minutes, the others 5). Unknown files cost the median.
 * Every file lands in exactly one shard; deterministic, so every shard computes the same split. */
export function balancedShards(files, seconds, count, workers = 4) {
  const known = files.map(f => seconds[f]).filter(Number.isFinite).sort((a, b) => a - b);
  const median = known.length ? known[Math.floor(known.length / 2)] : 1, cost = f => Number.isFinite(seconds[f]) ? seconds[f] : median;
  const shards = Array.from({ length: count }, () => ({ files: [], sum: 0, max: 0 }));
  for (const f of [...new Set(files)].sort((a, b) => cost(b) - cost(a) || (a < b ? -1 : 1))) {
    const c = cost(f), wall = s => Math.max(s.max, c, (s.sum + c) / workers);
    const s = shards.reduce((best, x) => wall(x) < wall(best) - 1e-9 || (Math.abs(wall(x) - wall(best)) <= 1e-9 && x.sum < best.sum) ? x : best);
    s.files.push(f); s.sum += c; s.max = Math.max(s.max, c);
  }
  return shards.map(s => ({ files: s.files.sort(), seconds: Math.round(Math.max(s.max, s.sum / workers)) }));
}

/** This shard's files of the full suite, or null (then Vitest's own --shard). Never an empty list: an empty filter runs everything. */
export function balancedSelection(selection, shard, listFiles, timings) {
  if (!shard || selection.mode !== "full") return null;
  try {
    const files = listFiles(), split = balancedShards(files, timings, shard.count), mine = split[shard.index - 1];
    if (!files.length || !mine.files.length) return null;
    return { ...selection, tests: mine.files, balanced: { files: mine.files.length, of: files.length, estimate: mine.seconds } };
  } catch { return null; }
}

export function runTests(selection, run, githubActions = false, shard = null) {
  if (selection.balanced) return run(["run", ...selection.tests, ...(githubActions ? [] : ["--maxWorkers=1"])]);
  // No passWithNoTests and no fallback after a genuine test failure.
  // Preserve CI's existing vite.config worker count; the builder's local invocation stays single-worker.
  // A related selection is small: shard 1 runs all of it and the other shards run nothing (never an empty green Vitest run).
  if (shard && selection.tests.length) return shard.index === 1 ? run(["run", ...selection.tests, ...(githubActions ? [] : ["--maxWorkers=1"])]) : { status: 0, skipped: true };
  return run(["run", ...selection.tests, ...(shard ? [`--shard=${shard.text}`] : []), ...(githubActions ? [] : ["--maxWorkers=1"])]);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const start = performance.now(), cli = path.resolve("node_modules/vitest/vitest.mjs");
  let scope;
  try {
    const payload = process.env.GITHUB_EVENT_PATH ? JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : {};
    scope = changedScope({ payload });
  } catch (error) { scope = { mode: "full", reason: `event unavailable: ${error.message}` }; }
  const selection = selectedTests(scope, base => execFileSync(process.execPath, [cli, "list", `--changed=${base}`, "--filesOnly", "--json", "--maxWorkers=1"], { encoding: "utf8", maxBuffer: 32e6 }));
  const selectionMs = performance.now() - start;
  console.log(`Unit tests: ${selection.mode}; ${selection.reason}; ${selection.tests.length || "all"} files`);
  const githubActions = process.env.GITHUB_ACTIONS === "true", shard = parseShard(process.env.VITEST_SHARD);
  const listFiles = () => JSON.parse(execFileSync(process.execPath, [cli, "list", "--filesOnly", "--json", "--maxWorkers=1"], { encoding: "utf8", maxBuffer: 32e6 }))
    .map(e => path.relative(process.cwd(), e.file).replaceAll("\\", "/"));
  let timings = {};
  try { timings = JSON.parse(fs.readFileSync("tools/ci/unit-timings.json", "utf8")).seconds ?? {}; } catch { /* unbalanced but complete */ }
  // Opt-in (UNIT_BALANCE=1): on GitHub's 4-vCPU runners, shards packed with only heavy files ran 1.6-1.9x slower than the
  // local timings predicted and one 18 s test hit its 60 s timeout (2026-11-01, #1592). Vitest's hashed --shard mixes light
  // and heavy files; keep it until the model accounts for that contention.
  const balanced = process.env.UNIT_BALANCE === "1" ? balancedSelection(selection, shard, listFiles, timings) : null;
  if (balanced) { Object.assign(selection, balanced); console.log(`Unit test shard ${shard.text}: ${balanced.balanced.files} of ${balanced.balanced.of} files by measured time, about ${balanced.balanced.estimate} s`); }
  else if (shard) console.log(`Unit test shard ${shard.text}${selection.tests.length && shard.index !== 1 ? ": related selection runs entirely in shard 1" : ""}`);
  const testsAt = performance.now(), result = runTests(selection, args => spawnSync(process.execPath, [cli, ...args], { stdio: "inherit" }), githubActions, shard);
  const report = { ...selection, shard: shard?.text ?? null, workers: githubActions ? "existing Vitest config" : 1, selectionMs, testMs: performance.now() - testsAt, totalMs: performance.now() - start, status: result.status, signal: result.signal, error: result.error?.message };
  fs.writeFileSync("ci-unit-results.json", JSON.stringify(report, null, 2) + "\n");
  // A readable check-run annotation (the coordinator can read annotations but not logs): was this the FULL suite?
  if (githubActions) console.log(`::notice title=unit-scope::Unit tests ${selection.mode}${shard ? ` shard ${shard.text}` : ""}${selection.balanced ? ` (balanced: ${selection.balanced.files}/${selection.balanced.of} files, est ${selection.balanced.estimate} s)` : ""}: ${selection.reason}; exit ${result.status ?? result.signal ?? "error"}`);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `Unit tests: **${selection.mode}** (${selection.reason}); selection ${(selectionMs / 1000).toFixed(2)}s, tests ${(report.testMs / 1000).toFixed(2)}s, exit ${result.status ?? result.signal ?? "error"}.\n`);
  process.exitCode = result.status ?? 1;
}
