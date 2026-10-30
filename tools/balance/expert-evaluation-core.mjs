// Pure fixed-vector evaluation contracts. Never loads the game or simulates a case.
import { createHash } from "node:crypto";
import { INITIAL_POLICY, POLICY_SPACE, trainingCases } from "./expert-space.mjs";
import { objective, better } from "./expert-search-core.mjs";

export const canonical = value => JSON.stringify(value, (_, v) => v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, v[k]])) : v);
export const digest = value => createHash("sha256").update(canonical(value)).digest("hex");
export const LOADOUT = { bag: "satchel", hat: "none", wearsHat: false, parts: [] };
export const LIMIT = 3000;
export const OBJECTIVE = ["wins", "questsCompleted", "allQuests", "upgradeEligibleToKeep", "provisionalFindsCollected", "questDeliveries", "nonWinWavesPassed", "signedWorldSeconds"];
const equal = (a, b) => canonical(a) === canonical(b);
const caseKeys = ["worldSeed", "seed", "island", "bpm", "condition", "bag", "hat", "wearsHat", "parts", "bot", "limit"];
const projectCase = c => Object.fromEntries(caseKeys.map(k => [k, c[k]]));

export function vectorPolicy(vectors, name) {
  if (!vectors || !Object.hasOwn(vectors, name) || !vectors[name] || typeof vectors[name] !== "object" || Array.isArray(vectors[name])) throw Error("Unknown/invalid evaluation vector");
  for (const [key, value] of Object.entries(vectors[name])) {
    const bound = POLICY_SPACE.find(([k]) => k === key);
    if (!bound || !Number.isFinite(value) || value < bound[1] || value > bound[2] || (bound[3] && !Number.isInteger(value))) throw Error("Invalid vector parameter");
  }
  if (!equal(vectors.baseline, {})) throw Error("Baseline must be unchanged expert defaults");
  return { ...INITIAL_POLICY, ...vectors[name] };
}

export function evaluationManifest({ fingerprint, commit, runtime, heldOutPairs, vectors, vector }) {
  if (!/^[a-f0-9]{64}$/.test(fingerprint) || !/^[a-f0-9]{40}$/.test(commit)) throw Error("Invalid source provenance");
  if (!runtime || ![runtime.node, runtime.platform, runtime.arch].every(x => typeof x === "string" && x.length)) throw Error("Missing runtime provenance");
  if (!Array.isArray(heldOutPairs) || !heldOutPairs.length || heldOutPairs.some(p => !Number.isInteger(p.worldSeed) || !Number.isInteger(p.nightSeed))) throw Error("Invalid held-out list");
  const cases = trainingCases([1000, 8919], LOADOUT).map(c => ({ ...c, bot: "expert", limit: LIMIT }));
  const protectedPairs = new Set(heldOutPairs.map(p => `${p.worldSeed}/${p.nightSeed}`));
  for (let i = 0; i < 30; i++) protectedPairs.add(`${910000 + i}/${1000 + 7919 * (10000 + i)}`);
  if (cases.some(c => protectedPairs.has(`${c.worldSeed}/${c.seed}`))) throw Error("Protected pair in evaluation matrix");
  const policy = vectorPolicy(vectors, vector), baselinePolicy = vectorPolicy(vectors, "baseline");
  const comparison = { schema: 1, fingerprint, runtime, cases, heldOutPairs, objective: OBJECTIVE,
    observation: "approximate fair observation", humanLimits: { reactionSeconds: 0.25, inputHz: 8, aimErrorMetres: 1 }, baselinePolicy };
  return { schema: 1, commit, vector, policy, vectorsDigest: digest(vectors), comparison, comparisonDigest: digest(comparison) };
}

function validateRows(manifest, rows) {
  const cases = manifest.comparison.cases;
  if (!Array.isArray(rows) || rows.length > cases.length) throw Error("Invalid evaluation row count");
  rows.forEach((row, i) => {
    if (!equal(projectCase(row), cases[i]) || row.mode !== "runs") throw Error("Evaluation case/order differs");
    if (!Number.isFinite(row.playerEnd) || row.playerEnd < 0 || row.playerEnd > LIMIT + 0.05 || (row.outcome === "censored" && row.playerEnd < LIMIT - 0.05)) throw Error("Evaluation cutoff differs");
    if (typeof row.upgradeFound !== "boolean" || row.upgradePersisted !== false || typeof row.allQuestsCompleted !== "boolean") throw Error("Missing goal metrics or unsupported persistence");
    if (row.allQuestsCompleted !== (row.questsTotal > 0 && row.questsCompleted === row.questsTotal)) throw Error("All-quest metric differs");
    if (row.upgradeEligibleToKeep && !row.upgradeFound) throw Error("Eligible find was not found");
    objective([row]); // Validates outcome and every scored field; no game loaded.
  });
}

export function sealEvaluation(manifest, rows, wallSeconds = [], baselineDigest = null) {
  validateRows(manifest, rows);
  if (wallSeconds.length !== rows.length || wallSeconds.some(x => !Number.isFinite(x) || x < 0)) throw Error("Missing case wall timings");
  const complete = rows.length === manifest.comparison.cases.length;
  const body = { schema: 1, manifest, baselineDigest, rows, wallSeconds, complete, score: complete ? objective(rows) : null };
  return { ...body, artifactDigest: digest(body) };
}

export function readEvaluation(value, expectedManifest, baselineDigest = null) {
  if (!value || value.schema !== 1) throw Error("Unsupported evaluation schema");
  const { artifactDigest, ...body } = value;
  if (artifactDigest !== digest(body)) throw Error("Evaluation digest differs");
  // A result-only commit may resume; the source fingerprint and all inputs must
  // still match. Keep the original commit in the saved provenance.
  if (!equal({ ...value.manifest, commit: expectedManifest.commit }, expectedManifest) || value.baselineDigest !== baselineDigest) throw Error("Evaluation manifest/baseline differs");
  const sealed = sealEvaluation(value.manifest, value.rows, value.wallSeconds, value.baselineDigest);
  if (!equal(value, sealed)) throw Error("Evaluation completeness/score differs");
  return structuredClone(value);
}

export function readBaseline(value, manifest) {
  if (!value?.complete || value.manifest?.vector !== "baseline" || !equal(value.manifest?.policy, manifest.comparison.baselinePolicy)) throw Error("Baseline is incomplete or is not default policy");
  const expected = { ...manifest, vector: "baseline", policy: manifest.comparison.baselinePolicy };
  const baseline = readEvaluation(value, expected);
  if (!baseline.complete) throw Error("Incomplete baseline");
  return baseline;
}

export function summarize(rows) {
  const sum = key => rows.reduce((n, row) => n + Number(row[key]), 0);
  return { cases: rows.length, wins: rows.filter(r => r.outcome === "won").length, questsCompleted: sum("questsCompleted"),
    allQuestRuns: sum("allQuestsCompleted"), provisionalFinds: sum("provisionalFindsCollected"), eligibleFinds: sum("upgradeEligibleToKeep"),
    questDeliveries: sum("questDeliveries"), fullGoalRuns: rows.filter(r => r.outcome === "won" && r.allQuestsCompleted && r.upgradeEligibleToKeep).length,
    lost: rows.filter(r => r.outcome === "lost").length, censored: rows.filter(r => r.outcome === "censored").length, persistenceEvaluated: false };
}

export function compareEvaluation(value, baseline) {
  if (!value.complete || !baseline.complete || value.manifest.comparisonDigest !== baseline.manifest.comparisonDigest) throw Error("Incomplete or incomparable evaluations");
  return { candidate: summarize(value.rows), baseline: summarize(baseline.rows), scoreBetter: better(value.score, baseline.score),
    primaryGoalsBetter: better([...value.score.slice(0, 4), 0, 0, 0, 0], [...baseline.score.slice(0, 4), 0, 0, 0, 0]) };
}
