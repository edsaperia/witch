// #1475 owns survey manifests/shards/merge; this owns one strict real-rules case.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { runtime } from "./report-runtime.mjs";
import { POLICY_SPACE } from "./expert-space.mjs";
import { objective } from "./expert-search-core.mjs";

export const canonical = value => JSON.stringify(value, (_, v) => v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, v[k]])) : v);
export const digest = value => createHash("sha256").update(canonical(value)).digest("hex");
export function sourceFingerprint(root = fileURLToPath(new URL("../..", import.meta.url))) {
  const hash = createHash("sha256");
  function tree(dir) {
    for (const e of readdirSync(resolve(root, dir), { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      const path = resolve(root, dir, e.name);
      if (e.isDirectory()) tree(relative(root, path));
      else if (/\.(ts|mjs|js|json)$/.test(e.name)) { hash.update(relative(root, path).replaceAll("\\", "/")); hash.update(readFileSync(path, "utf8").replace(/\r\n/g, "\n")); }
    }
  }
  for (const dir of ["src/rules", "src/bots", "src/app", "config", "art", "tools/balance"]) tree(dir);
  return hash.digest("hex");
}
export function modelLock(parameters, source, heldOutPairs) {
  validateParameters(parameters);
  const body = { schema: 1, sourceFingerprint: source, parameters, heldOutPairs, observation: "approximate fair observation", humanLimits: { reactionSeconds: 0.25, inputHz: 8, aimErrorMetres: 1 } };
  return { ...body, modelSha256: digest(body) };
}
export function validateParameters(parameters) {
  if (!parameters || Object.keys(parameters).length !== POLICY_SPACE.length) throw Error("Parameter names differ from expert policy");
  for (const [name, lo, hi, integer] of POLICY_SPACE) if (!Number.isFinite(parameters[name]) || parameters[name] < lo || parameters[name] > hi || (integer && !Number.isInteger(parameters[name]))) throw Error(`Invalid parameter ${name}`);
}
export function validateLock(lock, fingerprint) {
  if (!lock || lock.schema !== 1) throw Error("Unsupported model-lock schema");
  const { modelSha256, ...body } = lock;
  if (modelSha256 !== digest(body)) throw Error("Model-lock checksum differs");
  if (lock.sourceFingerprint !== fingerprint) throw Error("Model-lock source fingerprint differs");
  if (canonical(lock.humanLimits) !== canonical({ reactionSeconds: 0.25, inputHz: 8, aimErrorMetres: 1 }) || lock.observation !== "approximate fair observation") throw Error("Model observation/human limits differ");
  validateParameters(lock.parameters);
  if (!Array.isArray(lock.heldOutPairs) || lock.heldOutPairs.some(p => !Number.isInteger(p.worldSeed) || !Number.isInteger(p.nightSeed))) throw Error("Invalid held-out pairs");
}
export const pairKey = c => `${c.worldSeed}/${c.nightSeed ?? c.seed}`;
export const isSurveyReserved = c => Array.from({ length: 30 }, (_, i) => `${910000 + i}/${1000 + 7919 * (10000 + i)}`).includes(pairKey(c));

// Survey selection owns the list; the search owns how an expert is evaluated on
// it. Supplied cells replace the original matrix, never merely supplement a cache.
export function readFitnessCases(file, catalogue, islands, heldOutPairs, round) {
  if (![1, 2].includes(round)) throw Error("Unsupported fitness round");
  const input = JSON.parse(readFileSync(file, "utf8"));
  const cases = Array.isArray(input) ? input : input?.schema === 1 ? input.cases : null;
  if (!Array.isArray(cases) || !cases.length) throw Error("Fitness list must be a nonempty case array or {schema:1,cases:[...]}");
  const held = new Set(heldOutPairs.map(pairKey)), seen = new Set();
  return cases.map(c => {
    const allowed = ["kind", "worldSeed", "nightSeed", "island", "bpm", "bag", "hat", "broomPart", "bot", "condition", "limit"];
    if (!c || Object.keys(c).some(k => !allowed.includes(k)) || c.kind !== "run") throw Error("Fitness matrix supports exact contract run cases only");
    if (!Number.isInteger(c.worldSeed) || !Number.isInteger(c.nightSeed) || c.worldSeed < 0 || c.nightSeed < 0 || !Number.isFinite(c.bpm) || c.bpm < 80 || c.bpm > 220 || !(c.limit > 0) || !Number.isFinite(c.limit)) throw Error("Invalid fitness seeds/tempo/cutoff");
    if (!islands.includes(c.island) || !catalogue.bag.includes(c.bag) || !catalogue.hat.includes(c.hat) || (c.broomPart !== null && ![...catalogue.tip, ...catalogue.chassis, ...catalogue.exhaust].includes(c.broomPart))) throw Error("Unknown exact fitness island/equipment");
    if (!["matched", "home-everything"].includes(c.condition) || (c.condition === "home-everything" && c.island !== "home") || !["expert", "skilled", "crude", "sloppy"].includes(c.bot)) throw Error("Unsupported fitness condition/bot");
    if (held.has(pairKey(c)) || (round === 1 && isSurveyReserved(c))) throw Error("Fitness matrix intersects protected seed pairs");
    // A weak cell from any survey baseline is a challenge for the expert. Record
    // this projection explicitly; no baseline bot is optimized by its parameters.
    const normalized = { ...c, bot: "expert" }, key = canonical(normalized);
    if (seen.has(key)) throw Error("Duplicate fitness cell after expert projection");
    seen.add(key);
    return { original: c, expert: normalized };
  });
}

export async function createCaseRunner() {
  const R = await runtime(), fingerprint = sourceFingerprint();
  return { close: R.close, fingerprint, async runCase(c, lock) {
    let running = false;
    const unsupported = reason => ({ status: "unsupported", reason, case: c, modelSha256: lock?.modelSha256 ?? null });
    try {
      validateLock(lock, fingerprint);
      const allowed = ["kind", "worldSeed", "nightSeed", "island", "bpm", "bag", "hat", "broomPart", "bot", "condition", "limit", "species", "rank", "distance"];
      if (!c || Object.keys(c).some(k => !allowed.includes(k))) return unsupported("Unknown case field");
      if (!["run", "stun", "ko"].includes(c.kind)) return unsupported("Unknown case kind");
      if (!Number.isInteger(c.worldSeed) || !Number.isInteger(c.nightSeed) || c.worldSeed < 0 || c.nightSeed < 0) return unsupported("Explicit nonnegative world/night seeds required");
      if (!Number.isFinite(c.bpm) || c.bpm < 80 || c.bpm > 220) return unsupported("BPM outside supported 80–220");
      if (!R.islands.includes(c.island) || !R.bags.includes(c.bag) || !R.hats.includes(c.hat)) return unsupported("Unknown island, bag or exact hat");
      if (c.broomPart !== null && !Object.values(R.parts).flat().includes(c.broomPart)) return unsupported("Unknown exact broom part; use null for bare broom");
      if (!(c.limit > 0) || !Number.isFinite(c.limit)) return unsupported("Explicit positive player-second limit required");
      if (!["matched", "home-everything"].includes(c.condition) || (c.condition === "home-everything" && c.island !== "home")) return unsupported("Unsupported condition/island combination");
      const input = { worldSeed: c.worldSeed, seed: c.nightSeed, island: c.island, bpm: c.bpm, bag: c.bag, hat: c.hat, wearsHat: c.hat !== "none", parts: c.broomPart === null ? [] : [c.broomPart], condition: c.condition };
      if (c.kind === "run") {
        if (!["expert", "skilled", "crude", "sloppy"].includes(c.bot)) return unsupported("Unsupported survey bot");
        running = true;
        return { schema: 1, status: "ok", case: c, modelSha256: lock.modelSha256, sourceFingerprint: fingerprint, parameters: lock.parameters, observation: c.bot === "expert" ? "approximate fair observation" : "privileged observation (existing baseline)", result: R.run({ ...input, bot: c.bot }, c.limit, { expert: lock.parameters }) };
      }
      if (!R.species.includes(c.species) || !Number.isInteger(c.rank) || c.rank < 0 || c.rank > 3 || (c.distance !== undefined && (!(c.distance > 0) || !Number.isFinite(c.distance)))) return unsupported("Unsupported exact fixture species/rank/distance");
      running = true;
      const result = R.isolated({ ...input, species: c.species, rank: c.rank }, c.limit, c.kind, c.distance ?? 10);
      if (result.status === "unsupported") return unsupported(result.reason);
      return { status: "ok", case: c, modelSha256: lock.modelSha256, sourceFingerprint: fingerprint, result };
    } catch (error) { return running ? { status: "error", reason: error.message, case: c, modelSha256: lock?.modelSha256 ?? null } : unsupported(error.message); }
  } };
}

// External rows propose parameter vectors and cache exact evaluations. Never
// optimize on held-out pairs; first-round survey pairs are also excluded.
export function importEvaluations(file, fingerprint, heldOutPairs, round = 1) {
  if (![1, 2].includes(round)) throw Error("Unsupported external-evaluation round");
  const held = new Set(heldOutPairs.map(pairKey)), rows = readFileSync(file, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse);
  for (const r of rows) {
    if (r.schema !== 1 || r.status !== "ok" || r.sourceFingerprint !== fingerprint || r.case?.kind !== "run" || r.case?.bot !== "expert") throw Error("External row schema/source/kind differs");
    validateParameters(r.parameters);
    if (held.has(pairKey(r.case)) || (round === 1 && isSurveyReserved(r.case))) throw Error("External evaluation intersects protected seed pairs");
    if (!r.result || r.result.bot !== "expert" || r.result.condition !== r.case.condition || r.result.seed !== r.case.nightSeed || r.result.worldSeed !== r.case.worldSeed || r.result.bpm !== r.case.bpm || r.result.island !== r.case.island || r.result.bag !== r.case.bag || r.result.hat !== r.case.hat || canonical(r.result.parts) !== canonical(r.case.broomPart === null ? [] : [r.case.broomPart])) throw Error("External case/result mismatch");
    objective([r.result]);
  }
  return rows;
}
