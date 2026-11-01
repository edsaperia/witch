// Refresh tools/ci/unit-timings.json (seconds per unit test file) from a full Vitest JSON report; it only balances the CI shards.
//   npx vitest run --reporter=json --outputFile=out/unit.json && node tools/ci/unit-timings.mjs out/unit.json
import fs from "node:fs";
import path from "node:path";

const [report] = process.argv.slice(2);
if (!report) throw Error("Use: node tools/ci/unit-timings.mjs <vitest --reporter=json output>");
const seconds = {};
for (const t of JSON.parse(fs.readFileSync(report, "utf8")).testResults)
  seconds[path.relative(process.cwd(), t.name).replaceAll("\\", "/")] = Math.round((t.endTime - t.startTime) / 100) / 10;
const out = "tools/ci/unit-timings.json", old = JSON.parse(fs.readFileSync(out, "utf8"));
fs.writeFileSync(out, JSON.stringify({ _note: old._note, seconds: Object.fromEntries(Object.entries(seconds).sort(([a], [b]) => a < b ? -1 : 1)) }, null, 1) + "\n");
console.log(`${Object.keys(seconds).length} files timed`);
