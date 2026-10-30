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

export function runTests(selection, run) {
  // No passWithNoTests and no fallback after a genuine test failure.
  return run(["run", ...selection.tests, "--maxWorkers=1"]);
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
  const testsAt = performance.now(), result = runTests(selection, args => spawnSync(process.execPath, [cli, ...args], { stdio: "inherit" }));
  const report = { ...selection, selectionMs, testMs: performance.now() - testsAt, totalMs: performance.now() - start, status: result.status, signal: result.signal, error: result.error?.message };
  fs.writeFileSync("ci-unit-results.json", JSON.stringify(report, null, 2) + "\n");
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `Unit tests: **${selection.mode}** (${selection.reason}); selection ${(selectionMs / 1000).toFixed(2)}s, tests ${(report.testMs / 1000).toFixed(2)}s, exit ${result.status ?? result.signal ?? "error"}.\n`);
  process.exitCode = result.status ?? 1;
}
