import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, unlinkSync, rmdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { INITIAL_POLICY } from "./expert-space.mjs";
import { createCaseRunner, modelLock, validateLock, digest, importEvaluations, isSurveyReserved, sourceFingerprint, readFitnessCases } from "./expert-contract.mjs";

test("source fingerprints match LF and CRLF checkouts but reject changed source", () => {
  const dir = mkdtempSync(join(tmpdir(), "witch-fingerprint-")), roots = [join(dir, "lf"), join(dir, "crlf")];
  const trees = ["src/rules", "src/bots", "config", "art", "tools/balance"];
  const files = ["src/rules/Zoo.ts", "src/rules/alpha.ts"];
  try {
    for (const [i, root] of roots.entries()) {
      for (const tree of trees) mkdirSync(join(root, tree), { recursive: true });
      for (const file of files) writeFileSync(join(root, file), `export const label = 'fox 🦊';${i ? "\r\n" : "\n"}`);
    }
    assert.equal(sourceFingerprint(roots[0]), sourceFingerprint(roots[1]));
    writeFileSync(join(roots[1], files[0]), "export const changed = 1;\r\n");
    assert.notEqual(sourceFingerprint(roots[0]), sourceFingerprint(roots[1]));
  } finally {
    for (const root of roots) {
      for (const file of files) unlinkSync(join(root, file));
      for (const tree of ["src/rules", "src/bots", "src", "config", "art", "tools/balance", "tools"]) rmdirSync(join(root, tree));
      rmdirSync(root);
    }
    rmdirSync(dir);
  }
});

test("locks protect source, parameters and human floors; canonical hashes ignore key order", () => {
  const lock = modelLock(INITIAL_POLICY, "source-a", [{ worldSeed: 0, nightSeed: 20 }]);
  validateLock(lock, "source-a");
  assert.equal(digest({ a: 1, b: 2 }), digest({ b: 2, a: 1 }));
  assert.throws(() => validateLock(lock, "source-b"));
  assert.throws(() => validateLock({ ...lock, parameters: { ...INITIAL_POLICY, kite: 1 } }, "source-a"));
  assert.equal(isSurveyReserved({ worldSeed: 910000, nightSeed: 1000 + 7919 * 10000 }), true);
  assert.equal(isSurveyReserved({ worldSeed: 0, nightSeed: 1000 }), false);
});

test("weak-case fitness lists preserve exact settings and exclude held-out pairs in both rounds", () => {
  const dir = mkdtempSync(join(tmpdir(), "witch-fitness-")), file = join(dir, "weak.cases.json");
  const catalogue = { bag: ["satchel"], hat: ["none", "helmet"], tip: [null, "tip-a"], chassis: [null], exhaust: [null] };
  const c = { kind: "run", worldSeed: 910000, nightSeed: 1000 + 7919 * 10000, island: "home", bpm: 91, bag: "satchel", hat: "helmet", broomPart: "tip-a", bot: "sloppy", condition: "matched", limit: 4200 };
  try {
    writeFileSync(file, JSON.stringify({ schema: 1, cases: [c] }));
    assert.throws(() => readFitnessCases(file, catalogue, ["home"], [], 1));
    const rows = readFitnessCases(file, catalogue, ["home"], [], 2);
    assert.equal(rows.length, 1); assert.deepEqual(rows[0].original, c);
    assert.deepEqual(rows[0].expert, { ...c, bot: "expert" });
    for (const round of [1, 2]) assert.throws(() => readFitnessCases(file, catalogue, ["home"], [{ worldSeed: c.worldSeed, nightSeed: c.nightSeed }], round));
    writeFileSync(file, JSON.stringify([c, { ...c, bot: "expert" }]));
    assert.throws(() => readFitnessCases(file, catalogue, ["home"], [], 2), /Duplicate/);
    writeFileSync(file, JSON.stringify([{ ...c, broomPart: "missing" }]));
    assert.throws(() => readFitnessCases(file, catalogue, ["home"], [], 2), /equipment/);
    writeFileSync(file, JSON.stringify([{ ...c, limit: 0 }]));
    assert.throws(() => readFitnessCases(file, catalogue, ["home"], [], 2), /cutoff/);
  } finally { unlinkSync(file); rmdirSync(dir); }
});

test("external rows cannot leak held-out pairs or first-round reserved survey pairs", () => {
  const dir = mkdtempSync(join(tmpdir(), "witch-expert-")), file = join(dir, "rows.jsonl");
  const c = { kind: "run", worldSeed: 1, nightSeed: 2, island: "home", bpm: 100, bag: "satchel", hat: "none", broomPart: null, bot: "expert" };
  const row = { schema: 1, status: "ok", sourceFingerprint: "fp", parameters: INITIAL_POLICY, case: c, result: { seed: 2, worldSeed: 1, island: "home", bpm: 100, bag: "satchel", hat: "none", parts: [], bot: "expert", outcome: "censored", questsCompleted: 0, questsTotal: 1, upgradeEligibleToKeep: false, wavesPassed: 0, end: 1 } };
  try {
    writeFileSync(file, JSON.stringify(row) + "\n");
    assert.equal(importEvaluations(file, "fp", [], 1).length, 1);
    assert.throws(() => importEvaluations(file, "fp", [{ worldSeed: 1, nightSeed: 2 }], 2));
    row.case.worldSeed = row.result.worldSeed = 910000;
    row.case.nightSeed = row.result.seed = 1000 + 7919 * 10000;
    writeFileSync(file, JSON.stringify(row) + "\n");
    assert.throws(() => importEvaluations(file, "fp", [], 1));
    assert.equal(importEvaluations(file, "fp", [], 2).length, 1);
    writeFileSync(file, JSON.stringify(row) + "\n{");
    assert.throws(() => importEvaluations(file, "fp", [], 2));
  } finally { unlinkSync(file); rmdirSync(dir); }
});

test("runCase uses exact seeds/loadout/tempo and rejects unsupported cells", async () => {
  const r = await createCaseRunner();
  try {
    const lock = modelLock(INITIAL_POLICY, r.fingerprint, [{ worldSeed: 0, nightSeed: 20000 }]);
    const c = { kind: "run", worldSeed: 22, nightSeed: 1000, island: "home", bpm: 91, bag: "satchel", hat: "none", broomPart: null, bot: "expert", condition: "matched", limit: 1 };
    const a = await r.runCase(c, lock), b = await r.runCase(c, lock);
    assert.equal(a.status, "ok"); assert.deepEqual(a, b);
    assert.equal(a.result.worldSeed, 22); assert.equal(a.result.bpm, 91);
    assert.equal(a.result.wearsHat, false); assert.deepEqual(a.result.parts, []);
    assert.equal((await r.runCase({ ...c, hat: "not-a-hat" }, lock)).status, "unsupported");
    assert.equal((await r.runCase({ ...c, broomPart: "not-a-part" }, lock)).status, "unsupported");
    const sloppy = await r.runCase({ ...c, bot: "sloppy" }, lock);
    assert.equal(sloppy.status, "ok");
    assert.equal(sloppy.result.bot, "sloppy");
    assert.match(sloppy.observation, /privileged observation/);
    const fixture = await r.runCase({ ...c, kind: "stun", species: "fox", rank: 3, limit: 0.5 }, lock);
    if (fixture.status === "ok") { assert.equal(fixture.result.actualBoss, true); assert.equal(fixture.result.actualRank, 3); }
    else assert.match(fixture.reason, /Exact natural species\/rank absent/);
    const ko = await r.runCase({ ...c, kind: "ko", species: "fox", rank: 1, limit: 0.5 }, lock);
    if (ko.status === "ok") assert.equal(ko.result.fixture, "exact-natural-rank-unprotected-ko-v1");
    else assert.match(ko.reason, /Exact natural species\/rank absent/);
  } finally { await r.close(); }
});
