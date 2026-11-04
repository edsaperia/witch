// Refresh tools/ci/unit-timings.json (seconds per unit test file) from a full Vitest JSON report; it only balances the CI shards.
//   node tools/ci/unit-timings.mjs <one or more downloaded ci-unit-timings.json files>
//   node tools/ci/unit-timings.mjs --source <run URL> --ci-log <gh run view --log output>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function reportTimings(text, log = false) {
  const seconds = {};
  const add = (file, value) => {
    const normalized = file.replaceAll("\\", "/");
    // GitHub JSON reports contain absolute runner paths, never laptop-relative paths.
    const match = normalized.match(/(?:^|\/)((?:src|tools)\/.*\.test\.ts)$/);
    if (!match || !Number.isFinite(value) || value < 0) throw Error(`Invalid timing: ${file}`);
    if (Object.hasOwn(seconds, match[1])) throw Error(`Duplicate timed file: ${match[1]}`);
    seconds[match[1]] = Math.round(value * 1000) / 1000;
  };
  if (log) {
    const plain = text.replace(/\x1b\[[0-9;]*m/g, "").replaceAll("^[[", "\x1b[").replace(/\x1b\[[0-9;]*m/g, "");
    for (const line of plain.split("\n")) {
      const m = line.match(/^unit tests \(\d+\/\d+\).*?✓\s+((?:src|tools)\/\S+\.test\.ts)\s+\([^)]*\)\s+(\d+(?:\.\d+)?)ms/);
      if (m) add(m[1], Number(m[2]) / 1000);
    }
  } else {
    const report = JSON.parse(text);
    if (report.success !== true || !Array.isArray(report.testResults)) throw Error("Timing input must be a successful Vitest report");
    for (const t of report.testResults) {
      if (t.status !== "passed") throw Error(`Unpassed file: ${t.name}`);
      add(t.name, (t.endTime - t.startTime) / 1000);
    }
  }
  if (!Object.keys(seconds).length) throw Error("No per-file timings found");
  return seconds;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const args = process.argv.slice(2);
  const source = args[0] === "--source" ? (args.splice(0, 2)[1]) : "successful Vitest JSON reports";
  const log = args[0] === "--ci-log", reports = log ? args.slice(1) : args;
  if (!reports.length) throw Error("Use: node tools/ci/unit-timings.mjs [--ci-log] <reports...>");
  const seconds = {};
  for (const report of reports) for (const [file, value] of Object.entries(reportTimings(fs.readFileSync(report, "utf8"), log))) {
    if (Object.hasOwn(seconds, file)) throw Error(`Duplicate file across shards: ${file}`);
    seconds[file] = value;
  }
  const out = "tools/ci/unit-timings.json";
  fs.writeFileSync(out, JSON.stringify({ _note: "Measured per-file seconds; refresh from successful CI shard JSON artifacts with node tools/ci/unit-timings.mjs <reports...>, or --source <run URL> --ci-log <completed run log>. Missing/new files use a conservative estimated cost, never omit coverage.", _source: source, seconds: Object.fromEntries(Object.entries(seconds).sort(([a], [b]) => a < b ? -1 : 1)) }, null, 1) + "\n");
  console.log(`${Object.keys(seconds).length} files timed`);
}
