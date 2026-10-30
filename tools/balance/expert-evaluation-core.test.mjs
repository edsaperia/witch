import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluationManifest, vectorPolicy, sealEvaluation, readEvaluation, readBaseline, compareEvaluation, digest } from "./expert-evaluation-core.mjs";

const vectors = JSON.parse(readFileSync(new URL("./expert-evaluation-vectors.json", import.meta.url), "utf8"));
const input = { fingerprint: "a".repeat(64), commit: "b".repeat(40), runtime: { node: "v22.22.0", platform: "linux", arch: "x64" },
  heldOutPairs: [{ worldSeed: 0, nightSeed: 158381000 }], vectors };
const manifest = vector => evaluationManifest({ ...input, vector });
const rows = m => m.comparison.cases.map(c => ({ ...c, mode: "runs", outcome: "censored", playerEnd: 3000, end: 3000, wavesPassed: 2,
  questsCompleted: 0, questsTotal: 2, allQuestsCompleted: false, upgradeFound: false, upgradeEligibleToKeep: false, upgradePersisted: false,
  provisionalFindsCollected: 0, questDeliveries: 0, questDeliveriesIncomplete: 0 }));
const seal = (m, rs = rows(m), base = null) => sealEvaluation(m, rs, rs.map(() => 1), base);
const clone = x => structuredClone(x);
const reseal = value => { const { artifactDigest, ...body } = value; return { ...body, artifactDigest: digest(body) }; };

test("approved vectors change only their named existing policy choice and exclude protected pairs", () => {
  const b = vectorPolicy(vectors, "baseline");
  for (const [name, key, value] of [["A", "castMoveFrac", 0.85], ["B", "questMax", 0], ["C", "questBias", 800], ["D", "questMax", 2]]) {
    assert.deepEqual(vectorPolicy(vectors, name), { ...b, [key]: value });
    assert.equal(manifest(name).comparison.cases.length, 16);
  }
  assert.throws(() => vectorPolicy({ ...vectors, A: { inputHz: 99 } }, "A"));
  assert.throws(() => vectorPolicy({ ...vectors, D: { questMax: 2.5 } }, "D"));
  assert.throws(() => evaluationManifest({ ...input, vector: "A", heldOutPairs: [{ worldSeed: 0, nightSeed: 1000 }] }), /Protected/);
});

test("baseline reuse requires a complete default-policy artifact bound to source, runtime, matrix and cutoff", () => {
  const b = seal(manifest("baseline")), m = manifest("A");
  assert.deepEqual(readBaseline(b, m), b);
  for (const changed of [
    evaluationManifest({ ...input, vector: "A", fingerprint: "c".repeat(64) }),
    evaluationManifest({ ...input, vector: "A", runtime: { ...input.runtime, node: "v24.0.0" } }),
  ]) assert.throws(() => readBaseline(b, changed));
  const changed = clone(m); changed.comparison.cases[0].limit = 4200;
  assert.throws(() => readBaseline(b, changed));
  assert.throws(() => readBaseline(seal(manifest("baseline"), rows(m).slice(0, 4)), m), /incomplete/);
  assert.throws(() => readBaseline(seal(manifest("B")), m), /default/);
  const tampered = clone(b); tampered.rows[0].upgradeFound = true;
  assert.throws(() => readBaseline(tampered, m), /digest/);
});

test("resumption preserves completed cases and rejects a different baseline, vector or corrupt case", () => {
  const b = seal(manifest("baseline")), m = manifest("A"), rs = rows(m);
  const partial = seal(m, rs.slice(0, 7), b.artifactDigest);
  const resultCommit = { ...m, commit: "d".repeat(40) };
  const resumed = readEvaluation(partial, resultCommit, b.artifactDigest);
  assert.equal(resumed.rows.length, 7); assert.equal(resumed.manifest.commit, input.commit);
  const finished = sealEvaluation(resumed.manifest, [...resumed.rows, ...rs.slice(7)], Array(16).fill(1), b.artifactDigest);
  assert.deepEqual(finished, seal(m, rs, b.artifactDigest));
  assert.throws(() => readEvaluation(partial, m, "different baseline"));
  assert.throws(() => readEvaluation(partial, manifest("B"), b.artifactDigest));
  for (const edit of [x => x.rows.reverse(), x => { x.rows[0].seed = 99; }, x => { x.rows[0].playerEnd = 100; }, x => { x.rows[0].upgradePersisted = true; }]) {
    const value = clone(partial); edit(value);
    assert.throws(() => readEvaluation(reseal(value), m, b.artifactDigest));
  }
});

test("comparisons keep primary goal improvements distinct from survival tie-breakers", () => {
  const b = seal(manifest("baseline")), m = manifest("A"), rs = rows(m);
  rs[0].wavesPassed += 1;
  const result = compareEvaluation(seal(m, rs, b.artifactDigest), b);
  assert.equal(result.scoreBetter, true); assert.equal(result.primaryGoalsBetter, false);
  assert.equal(result.candidate.fullGoalRuns, 0);
  rs[0] = { ...rs[0], outcome: "won", playerEnd: 1000, end: 1000, questsCompleted: 2, allQuestsCompleted: true, upgradeFound: true,
    upgradeEligibleToKeep: true, provisionalFindsCollected: 1, questDeliveries: 2 };
  const goals = compareEvaluation(seal(m, rs, b.artifactDigest), b);
  assert.equal(goals.primaryGoalsBetter, true); assert.equal(goals.candidate.fullGoalRuns, 1);
  assert.equal(goals.candidate.persistenceEvaluated, false);
});
