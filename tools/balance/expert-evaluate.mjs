// Approved staged evaluation: baseline once, then exactly one fixed vector/job.
// Cloud only. No optimizer, held-out evaluation, model lock or automatic restart.
import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, execFileSync } from "node:child_process";
import { setPriority, constants } from "node:os";
import { evaluationManifest, sealEvaluation, readEvaluation, readBaseline, summarize, compareEvaluation } from "./expert-evaluation-core.mjs";

const arg = (key, fallback) => { const i = process.argv.indexOf(`--${key}`); return i < 0 ? fallback : process.argv[i + 1]; };
const cap = Number(arg("wall-seconds", 2400));
if (!Number.isFinite(cap) || cap <= 0 || cap > 2400) throw Error("Worker cap must be at most 2400 seconds");
if (!process.argv.includes("--worker")) {
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2), "--worker"], { stdio: "inherit" });
  let capped = false;
  const timer = setTimeout(() => { capped = true; child.kill(); }, Math.max(0, cap * 1000 - performance.now()));
  const code = await new Promise((ok, no) => { child.on("error", no); child.on("exit", ok); });
  clearTimeout(timer);
  if (capped) console.error("CAPPED/INCOMPLETE: saved cases retained; interrupted case must replay; no auto-restart");
  process.exit(capped ? 2 : code ?? 1);
}

setPriority(0, constants.priority.PRIORITY_BELOW_NORMAL);
const vector = arg("vector", ""), baselineFile = arg("baseline", ""), output = arg("out", "");
if (!output || !["baseline", "A", "B", "C", "D"].includes(vector)) throw Error("Supply --out and --vector baseline|A|B|C|D");
if ((vector === "baseline") === Boolean(baselineFile)) throw Error("Only candidate jobs require --baseline evaluation.json");
const root = fileURLToPath(new URL("../..", import.meta.url)), out = resolve(output);
const vectors = JSON.parse(readFileSync(resolve(root, "tools/balance/expert-evaluation-vectors.json"), "utf8"));
const heldOutPairs = JSON.parse(readFileSync(resolve(root, "docs/notes/expert-held-out-pairs.json"), "utf8"));
const { sourceFingerprint } = await import("./expert-contract.mjs");
const manifest = evaluationManifest({ fingerprint: sourceFingerprint(root), commit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(),
  runtime: { node: process.version, platform: process.platform, arch: process.arch }, heldOutPairs, vectors, vector });
// Refuse a mismatched/incomplete baseline before loading any game or making output.
const baseline = baselineFile ? readBaseline(JSON.parse(readFileSync(resolve(baselineFile), "utf8")), manifest) : null;
const baselineDigest = baseline?.artifactDigest ?? null;
const checkpoint = resolve(out, "checkpoint.json");
let state = existsSync(checkpoint) ? readEvaluation(JSON.parse(readFileSync(checkpoint, "utf8")), manifest, baselineDigest) : sealEvaluation(manifest, [], [], baselineDigest);
mkdirSync(out, { recursive: true });
const save = () => {
  writeFileSync(checkpoint + ".tmp", JSON.stringify(state, null, 2) + "\n"); renameSync(checkpoint + ".tmp", checkpoint);
  // Checkpoint is authoritative if interrupted between these writes.
  writeFileSync(resolve(out, "cases.jsonl"), state.rows.map((row, i) => JSON.stringify({ vector, policy: state.manifest.policy, caseIndex: i, wallSeconds: state.wallSeconds[i], row })).join("\n") + (state.rows.length ? "\n" : ""));
};
save();
const started = Date.now(), startedUtc = new Date().toISOString();
if (!state.complete) {
  const { runtime } = await import("./report-runtime.mjs"), r = await runtime();
  try {
    for (let i = state.rows.length; i < state.manifest.comparison.cases.length; i++) {
      const c = state.manifest.comparison.cases[i], at = performance.now();
      const row = r.run(c, c.limit, { expert: state.manifest.policy });
      state = sealEvaluation(state.manifest, [...state.rows, row], [...state.wallSeconds, (performance.now() - at) / 1000], baselineDigest);
      save();
      console.error(`${vector} ${i + 1}/16 ${c.condition}/${c.island}/${c.bpm}/${c.seed}: ${row.outcome}`);
    }
  } finally { await r.close(); }
}
writeFileSync(resolve(out, "evaluation.json"), JSON.stringify(state, null, 2) + "\n");
const result = { sourceCommit: state.manifest.commit, fingerprint: state.manifest.comparison.fingerprint, vector, complete: state.complete,
  startedUtc, endedUtc: new Date().toISOString(), wallSeconds: (Date.now() - started) / 1000, heldCases: 0,
  ...summarize(state.rows), ...(baseline ? { comparison: compareEvaluation(state, baseline) } : {}) };
writeFileSync(resolve(out, "summary.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
