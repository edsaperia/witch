// Single-worker, bounded real-rules expert search and disjoint held-out evaluation.
// node tools/balance/expert-search.mjs --out docs/notes/expert-results/pilot --time 60 --iterations 3 --train-seeds 1 --held-seeds 1 --wall-seconds 480
import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync, readdirSync, appendFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { spawn } from "node:child_process";
import { setPriority, constants } from "node:os";
import { fileURLToPath } from "node:url";
import { arg } from "./lib.mjs";
import { runtime } from "./report-runtime.mjs";
import { seedAt } from "./report-core.mjs";
import { startSearch, ask, tell, objective } from "./expert-search-core.mjs";
import { INITIAL_POLICY, POLICY_SPACE, equipmentSpace, equipmentOf, policyOf, trainingCases } from "./expert-space.mjs";
import { importEvaluations, canonical, modelLock, digest, readFitnessCases, validateParameters } from "./expert-contract.mjs";

// A separate idle parent enforces a real wall deadline even while one synchronous
// real-rules case is running. An interrupted case resumes from its last checkpoint.
if (!process.argv.includes("--worker")) {
  const cap = Number(arg("wall-seconds", 480));
  const cloud = arg("execution", "pilot") === "cloud";
  if (!Number.isFinite(cap) || cap <= 0 || cap > (cloud ? 3600 : 600)) throw Error("Invalid hard wall cap");
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2), "--worker"], { stdio: "inherit" });
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; child.kill(); }, Math.max(0, cap * 1000 - performance.now()));
  const code = await new Promise((resolveExit, reject) => { child.on("error", reject); child.on("exit", c => resolveExit(c)); });
  clearTimeout(timer);
  if (timedOut) console.error("Hard wall cap reached; completed-case checkpoints preserved; interrupted case must replay");
  process.exit(timedOut ? 2 : code ?? 1);
}

setPriority(0, constants.priority.PRIORITY_BELOW_NORMAL);
const positive = (name, value, integer = false) => {
  const n = Number(arg(name, value)); if (!Number.isFinite(n) || n <= 0 || (integer && !Number.isInteger(n))) throw Error(`Invalid --${name}`); return n;
};
const out = resolve(arg("out", "docs/notes/expert-results/pilot"));
const limit = positive("time", 60), iterations = positive("iterations", 3, true), trainCount = positive("train-seeds", 1, true), heldCount = positive("held-seeds", 1, true);
const wall = positive("wall-seconds", 480), searchSeed = positive("search-seed", 1477, true);
const execution = arg("execution", "pilot"), trainingOnly = process.argv.includes("--training-only"), shard = arg("shard", "local-pilot");
if (!["pilot", "cloud"].includes(execution)) throw Error("Unsupported execution mode");
if (wall > (execution === "cloud" ? 3600 : 600)) throw Error("Wall cap exceeds approved execution window");
if (limit > 120 && execution !== "cloud") throw Error("Long training is cloud-only; pilot case limit is 120 player seconds");
// Keep seed ranges disjoint even if the training count is increased.
const protectedPairs = JSON.parse(readFileSync(resolve(arg("held-list", "docs/notes/expert-held-out-pairs.json")), "utf8"));
if (!Array.isArray(protectedPairs) || protectedPairs.some(p => p.worldSeed !== 0 || !Number.isInteger(p.nightSeed)) || heldCount > protectedPairs.length) throw Error("Invalid/insufficient protected held-out pairs");
const trainSeeds = Array.from({ length: trainCount }, (_, i) => seedAt(i)), heldSeeds = protectedPairs.slice(0, heldCount).map(p => p.nightSeed);
if (trainSeeds.some(n => protectedPairs.some(p => p.nightSeed === n))) throw Error("Training overlaps protected held-out pairs");
if (trainCount > 10000) throw Error("Training seed range reserved above index 9999");
mkdirSync(out, { recursive: true });
const root = fileURLToPath(new URL("../..", import.meta.url)), hash = createHash("sha256");
function tree(dir) {
  for (const e of readdirSync(resolve(root, dir), { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
    const path = resolve(root, dir, e.name);
    if (e.isDirectory()) tree(relative(root, path));
    else if (/\.(ts|mjs|js|json)$/.test(e.name)) { hash.update(relative(root, path).replaceAll("\\", "/")); hash.update(readFileSync(path, "utf8").replace(/\r\n/g, "\n")); }
  }
}
for (const dir of ["src/rules", "src/bots", "config", "art", "tools/balance"]) tree(dir);
const fingerprint = hash.digest("hex"), commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const r = await runtime();
try {
  const catalogue = { bag: r.bags, hat: r.hats, ...r.parts };
  const heldOutPairs = protectedPairs;
  const round = positive("round", 1, true); if (![1, 2].includes(round)) throw Error("Unsupported training round");
  const caseFile = arg("cases", "");
  if (round === 2 && !caseFile) throw Error("Focused round 2 requires --cases; --external alone does not define its fitness matrix");
  const fitness = caseFile ? readFitnessCases(caseFile, catalogue, r.islands, heldOutPairs, round) : null;
  const fromFile = arg("from", ""), from = fromFile ? JSON.parse(readFileSync(fromFile, "utf8")) : null;
  if (round === 2 && !fromFile) throw Error("Focused round 2 requires --from for its selected round-one model");
  if (from) {
    if (from.manifest?.fingerprint !== fingerprint) throw Error("Initial trained model source differs");
    validateParameters(from.policy);
  }
  const externalFile = arg("external", ""), external = externalFile ? importEvaluations(externalFile, fingerprint, heldOutPairs, round) : [];
  const manifest = { schema: 5, commit, fingerprint, fingerprintFormat: "lf-ordinal-v1", runtime: { node: process.version, platform: process.platform, arch: process.arch }, execution, trainingOnly, shard, observation: "approximate fair observation", viewportAspect: "16:9", zoom: "default", canopyOcclusion: false, humanLimits: { reactionSeconds: 0.25, inputHz: 8, aimErrorMetres: 1 }, objective: ["wins", "questsCompleted", "allQuests", "upgradeEligibleToKeep", "provisionalFindsCollected", "questDeliveries", "wavesPassed", "worldSeconds"], trainSeeds: fitness ? null : trainSeeds, fitnessCases: fitness, fitnessDigest: digest(fitness), fromDigest: digest(from), heldSeeds, heldOutPairs, round, externalDigest: digest(external), limit, iterations, searchSeed, catalogue, policySpace: POLICY_SPACE, laterIsland: "komodo (phase 5 island; Tiger is phase 4)" };
  writeFileSync(resolve(out, "held-out-pairs.json"), JSON.stringify(heldOutPairs, null, 2) + "\n");
  const checkpointPath = resolve(out, "checkpoint.json"), logPath = resolve(out, "cases.jsonl");
  const initial = { ...(from?.policy ?? INITIAL_POLICY), ...Object.fromEntries(Object.keys(catalogue).map(k => [k, 0])) };
  if (from) {
    const gear = from.unlockedLoadout;
    if (!gear || !Array.isArray(gear.parts)) throw Error("Initial model requires explicit unlocked loadout");
    if (gear.wearsHat !== (gear.hat !== "none")) throw Error("Initial model hat-presence flag differs from its equipped hat");
    for (const name of ["bag", "hat"]) { initial[name] = catalogue[name].indexOf(gear[name]); if (initial[name] < 0) throw Error(`Unknown initial ${name}`); }
    const used = new Set();
    for (const part of gear.parts) {
      const slot = ["tip", "chassis", "exhaust"].find(k => catalogue[k].includes(part));
      if (!slot || used.has(slot)) throw Error("Initial model has unknown/conflicting broom parts");
      initial[slot] = catalogue[slot].indexOf(part); used.add(slot);
    }
  }
  const equipmentFor = point => equipmentOf({ ...initial, ...point }, catalogue);
  const activeSpace = fitness ? POLICY_SPACE : [...POLICY_SPACE, ...equipmentSpace(catalogue)];
  let checkpoint = existsSync(checkpointPath) ? JSON.parse(readFileSync(checkpointPath, "utf8")) : { manifest, search: startSearch(activeSpace, fitness ? policyOf(initial) : initial, searchSeed), evaluations: [], held: [], complete: false };
  // Runners commit results on their result branches. Those docs-only commits
  // may resume the original source fingerprint without rewriting its provenance.
  if (checkpoint.manifest.fingerprint === fingerprint) manifest.commit = checkpoint.manifest.commit;
  if (JSON.stringify(checkpoint.manifest) !== JSON.stringify(manifest)) throw Error("Manifest/source differs; use a new --out directory");
  const save = () => { writeFileSync(checkpointPath + ".tmp", JSON.stringify(checkpoint, null, 2) + "\n"); renameSync(checkpointPath + ".tmp", checkpointPath); };
  // JSONL is a readable training/evaluation log; checkpoint is authoritative on
  // resume. Rewrite it from checkpoint after an interruption between append/save.
  const logRows = () => [...checkpoint.evaluations.flatMap(e => e.rows.map(row => ({ schema: 1, split: "training", shard, candidate: e.candidate.id, parameters: policyOf(e.candidate.point), row }))), ...checkpoint.held.map(row => ({ schema: 1, split: "held-out", parameters: policyOf(checkpoint.search.incumbent), row }))];
  writeFileSync(logPath, logRows().map(x => JSON.stringify(x)).join("\n") + (logRows().length ? "\n" : ""));
  save();
  const started = performance.now();
  const expired = () => (performance.now() - started) / 1000 >= wall;
  const run = (c, point, split, candidate) => {
    const caseLimit = c.limit ?? limit;
    const cached = split === "training" ? external.find(x => canonical(x.parameters) === canonical(policyOf(point)) && x.case.limit === caseLimit && x.case.worldSeed === c.worldSeed && x.case.nightSeed === c.seed && x.case.island === c.island && x.case.bpm === c.bpm && x.case.bag === c.bag && x.case.hat === c.hat && x.case.condition === c.condition && canonical(x.case.broomPart === null ? [] : [x.case.broomPart]) === canonical(c.parts)) : null;
    const at = performance.now(), row = cached ? structuredClone(cached.result) : r.run(c, caseLimit, { expert: policyOf(point) });
    appendFileSync(logPath, JSON.stringify({ schema: 1, split, shard, ...(candidate !== undefined ? { candidate } : {}), parameters: policyOf(point), row }) + "\n");
    process.stderr.write(`${split} ${candidate ?? "best"} ${c.condition}/${c.island}/${c.bpm}/${c.bot}: ${row.outcome}; ${cached ? "external cache; " : ""}wall ${((performance.now() - at) / 1000).toFixed(2)}s\n`);
    return row;
  };
  while (checkpoint.search.evaluated < iterations && !expired()) {
    // External results propose policies; compare each on the same canonical
    // training cases before acceptance. Unmatched survey scores never change fitness.
    if (!checkpoint.search.pending && checkpoint.search.evaluated > 0 && checkpoint.search.evaluated <= external.length) {
      const x = external[checkpoint.search.evaluated - 1];
      checkpoint.search.pending = { id: checkpoint.search.evaluated, point: { ...checkpoint.search.incumbent, ...x.parameters } };
    }
    const candidate = ask(checkpoint.search);
    let evaluation = checkpoint.evaluations.find(e => e.candidate.id === candidate.id);
    if (!evaluation) { evaluation = { candidate, rows: [] }; checkpoint.evaluations.push(evaluation); }
    save();
    const cases = fitness ? fitness.map(({ expert: c }) => ({ worldSeed: c.worldSeed, seed: c.nightSeed, bpm: c.bpm, island: c.island, condition: c.condition, bag: c.bag, hat: c.hat, wearsHat: c.hat !== "none", parts: c.broomPart === null ? [] : [c.broomPart], limit: c.limit, bot: "expert" })) : trainingCases(trainSeeds, equipmentFor(candidate.point));
    for (let i = evaluation.rows.length; i < cases.length && !expired(); i++) {
      evaluation.rows.push(run({ ...cases[i], bot: "expert" }, candidate.point, "training", candidate.id)); save();
    }
    if (evaluation.rows.length !== cases.length) break;
    evaluation.score = objective(evaluation.rows); evaluation.accepted = tell(checkpoint.search, candidate, evaluation.score); save();
  }
  if (checkpoint.search.evaluated === iterations) {
    const point = checkpoint.search.incumbent;
    if (trainingOnly) {
      checkpoint.complete = true;
      writeFileSync(resolve(out, "training-parameters.json"), JSON.stringify({ manifest, policy: policyOf(point), unlockedLoadout: equipmentFor(point), trainingObjective: checkpoint.search.score, candidateCount: iterations, heldOutEvaluated: false }, null, 2) + "\n");
      save();
      console.log(JSON.stringify({ out, complete: true, trainingOnly: true, evaluated: iterations, heldCases: 0, wallSeconds: (performance.now() - started) / 1000 }));
      process.exitCode = 0;
    } else {
    const cases = trainingCases(heldSeeds, equipmentFor(point)).flatMap(c => ["expert", "skilled", "crude"].map(bot => ({ ...c, bot })));
    for (let i = checkpoint.held.length; i < cases.length && !expired(); i++) { checkpoint.held.push(run(cases[i], point, "held-out")); save(); }
    checkpoint.complete = checkpoint.held.length === cases.length;
    if (checkpoint.complete) {
      writeFileSync(resolve(out, "parameters.json"), JSON.stringify({ manifest, policy: policyOf(point), unlockedLoadout: equipmentFor(point), trainingObjective: checkpoint.search.score, candidateCount: iterations }, null, 2) + "\n");
      writeFileSync(resolve(out, "model-lock.json"), JSON.stringify(modelLock(policyOf(point), fingerprint, heldOutPairs), null, 2) + "\n");
      const table = condition => {
        const rows = checkpoint.held.filter(c => c.condition === condition), groups = new Map();
        for (const c of rows) { const key = `${c.island}|${c.bpm}|${c.bot}`, group = groups.get(key) ?? []; group.push(c); groups.set(key, group); }
        const mean = (xs, field) => (xs.reduce((s, x) => s + x[field], 0) / xs.length).toFixed(2);
        return `## ${condition}\n\n| Island | BPM | Bot | N seeds | Wins | Quests done / total | All quests | Find eligible to keep | Provisional finds | Quest deliveries (mean) | KOs (mean) | Waves passed (mean) | World seconds (mean) | Censored |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n` + [...groups].map(([key, xs]) => `| ${key.split("|").join(" | ")} | ${xs.length} | ${xs.filter(x => x.outcome === "won").length} | ${mean(xs, "questsCompleted")} / ${mean(xs, "questsTotal")} | ${xs.filter(x => x.allQuestsCompleted).length} | ${xs.filter(x => x.upgradeEligibleToKeep).length} | ${xs.reduce((n, x) => n + x.provisionalFindsCollected, 0)} | ${mean(xs, "questDeliveries")} | ${mean(xs, "knockdowns")} | ${mean(xs, "wavesPassed")} | ${mean(xs, "end")} | ${xs.filter(x => x.outcome === "censored").length} |`).join("\n") + "\n";
      };
      writeFileSync(resolve(out, "held-out.md"), `# Expert pilot: approximate fair observation\n\n${limit}-player-second cutoff; ${iterations} candidates; ${trainCount} training and ${heldCount} disjoint held-out seeds. Censored pilots do not establish strong play. Existing skilled/crude retain their privileged baseline observations.\n\n` + table("matched") + "\n" + table("home-everything"));
    }
    save();
    }
  }
  console.log(JSON.stringify({ out, complete: checkpoint.complete, evaluated: checkpoint.search.evaluated, heldCases: checkpoint.held.length, wallSeconds: (performance.now() - started) / 1000 }));
} finally { await r.close(); }
