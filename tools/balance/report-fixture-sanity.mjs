// Nonblocking T6 scenario observations; not a *.test file and not part of replay assertions.
// node tools/balance/report-fixture-sanity.mjs [--out=previews/report-fixture-sanity.json]
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function collectFixtureSanity(r) {
  const runCase = { seed: 1000, island: "home", bpm: 120, bag: "satchel", bot: "sloppy" };
  const stunCase = { seed: 1000, bpm: 100, bag: "tote", species: "fox", level: 1 };
  const activeCase = { ...stunCase, bag: "satchel", species: "boar", level: 2 };
  const first = r.run(runCase, 30), stun = r.stun(stunCase, 15, 10), active = r.stun(activeCase, 30, 10);
  if (typeof first.outcome !== "string" || typeof stun.stunned !== "boolean" || !Number.isFinite(stun.hits) || !Number.isFinite(active.retaliation)) throw Error("Fixture report returned malformed observations");
  return {
    schema: 1,
    purpose: "Scenario observations only; false predicates do not fail replay or release checks.",
    cases: [
      { id: "first-run", input: runCase, limit: 30, result: first },
      { id: "fox-stun", input: stunCase, limit: 15, distance: 10, result: stun },
      { id: "active-boar", input: activeCase, limit: 30, distance: 10, result: active },
    ],
    predicates: [
      { id: "first-run-censored", observed: first.outcome, reference: "censored", matchesReference: first.outcome === "censored" },
      { id: "fox-stunned", observed: stun.stunned, reference: true, matchesReference: stun.stunned === true },
      { id: "fox-hits-positive", observed: stun.hits, reference: "> 0", matchesReference: stun.hits > 0 },
      { id: "boar-retaliation-positive", observed: active.retaliation, reference: "> 0", matchesReference: active.retaliation > 0 },
    ],
  };
}

export async function main(args = process.argv.slice(2)) {
  if (args.length > 1 || args.some(a => !a.startsWith("--out="))) throw Error("Use only optional --out=<file>");
  const { runtime } = await import("./report-runtime.mjs");
  const r = await runtime();
  try {
    const report = collectFixtureSanity(r);
    report.source = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const json = JSON.stringify(report, null, 2) + "\n";
    if (args[0]) writeFileSync(args[0].slice("--out=".length), json);
    else process.stdout.write(json);
  } finally { await r.close(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
