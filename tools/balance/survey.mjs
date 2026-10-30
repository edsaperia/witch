// Frozen wide/shallow survey design, cloud shards and strict result merging; never tunes game rules.
// node tools/balance/survey.mjs design
// node tools/balance/survey.mjs check
// node tools/balance/survey.mjs run --manifest tools/balance/surveys/ladder.json --shard ladder-000 --lock trained-expert-lock.json --out results/ladder/ladder-000.jsonl
// node tools/balance/survey.mjs merge --manifest tools/balance/surveys/ladder.json --dir results/ladder --out results/ladder.jsonl
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, appendFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const HOME = "tools/balance/surveys";
const json = p => JSON.parse(readFileSync(resolve(ROOT, p), "utf8").replace(/^\uFEFF/, ""));
export const canonical = o => JSON.stringify(o, (_, v) => v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])) : v);
export const digest = o => createHash("sha256").update(canonical(o)).digest("hex");
const pairKey = p => `${p.worldSeed ?? p.world}/${p.nightSeed ?? p.seed}`;
export const mapPair = i => ({ mapIndex: i, world: 910000 + i, seed: 1000 + 7919 * (10000 + i) });
export const plain = { id: "plain", bag: "satchel", hat: "none", parts: [] };
export const accessOf = bot => bot === "expert" ? "expert-audit-required" : "privileged-state";

export function catalogue() {
  const kinds = readdirSync(resolve(ROOT, "art/areas"), { withFileTypes: true }).filter(e => e.isDirectory() && existsSync(resolve(ROOT, "art/areas", e.name, "kind.json"))).map(e => json(`art/areas/${e.name}/kind.json`)).filter(k => !k.placeholder).sort((a, b) => a.slot - b.slot);
  const species = readdirSync(resolve(ROOT, "art/creatures"), { withFileTypes: true }).filter(e => e.isDirectory() && existsSync(resolve(ROOT, "art/creatures", e.name, "creature.js"))).map(e => e.name).sort();
  const spells = readFileSync(resolve(ROOT, "src/rules/spells.ts"), "utf8").split("export const HAT_SPELLS")[1].split("export const BROOM_SPELLS")[0];
  const hats = [...spells.matchAll(/id: "([^"]+)"[^\n]*built: true/g)].map(m => m[1]);
  const bags = json("config/wardrobe.json").shelves.bag.items.filter(b => b.invites).map(b => b.id);
  const parts = Object.keys(json("config/broom-parts.json").parts);
  if (!kinds.length || !species.length || !hats.includes("none") || !bags.includes("satchel")) throw Error("Incomplete catalogue");
  return { islands: ["home", ...kinds.map(k => k.kind)], islandPhases: { home:0,...Object.fromEntries(kinds.map(k=>[k.kind,k.phase+1])) }, species, hats, bags, parts };
}

export function makeDesign(cat = catalogue()) {
  const base = { version: "wide-shallow-v1", catalogueHash: digest(cat), maps: Array.from({ length: 5 }, (_, i) => mapPair(i)), runCapPlayerSeconds: 4200, fixtureCapPlayerSeconds: 60, fixedStep: 1 / 60, commonLoadout: plain, knowledgeProfile: "normal-island; no home-everything override", ownedFinds: {}, equipmentOwnership: "virtual equipped benchmark gear; same empty-owned find pool in every cell, not a natural campaign inventory", legacyOptions: "newBot(kind,{bag}); unchanged default policy; no quest capability inferred from its score", gate: "expert trained; cloud execution only; coordinator allocates runners", evaluationReservation: Array.from({ length: 30 }, (_, i) => mapPair(i)), evaluationRole: "excluded from first search; reusable as second-search feedback; NEVER final expert held-out scores", requiredAdapter: "tools/balance/survey-adapter.mjs", outcomes: { run: { won: "game win.wonAt recorded", lost: "partyOver recorded", censored: "cap reached without either terminal event" }, progression: "quests completed/total; permanentFind available/found/kept, kept null while retention unresolved; kept means awarded by night outcome, not app persistence", fixture: "eventObserved or right-censored at cap; eligibility separate, progression N/A, never invent a win for witch knockout", errors: "failed or explicitly unsupported cells, never losses or censored observations" } };
  const loadouts = [plain, ...cat.bags.filter(b => b !== "satchel").map(bag => ({ ...plain, id: `bag-${bag}`, bag })), ...cat.hats.filter(h => h !== "none").map(hat => ({ ...plain, id: `hat-${hat}`, hat })), ...cat.parts.map(part => ({ ...plain, id: `part-${part}`, parts: [part] }))];
  const make = (id, spec) => ({ ...base, id, ...spec });
  base.requiredAdapter = "tools/balance/expert-contract.mjs";
  base.islandPhases = cat.islandPhases ?? {};
  const studies = [
    make("ladder", { islands: cat.islands, bots: ["sloppy", "crude", "skilled", "expert"], bpms: [100, 200], loadouts: [plain], shardKind: "island-chunks", islandChunk: 5 }),
    make("tempo", { islands: ["home", "raven", "tiger"], bots: ["expert"], bpms: Array.from({ length: 15 }, (_, i) => 80 + i * 10), loadouts: [plain], shardKind: "island-map" }),
    make("equipment", { islands: ["home", "tiger"], bots: ["expert"], bpms: [120], loadouts, shardKind: "equipment-chunks", loadoutChunk: 8, equipmentPolicy: "one frozen expert checkpoint and gear-use controller; equipped/placed/activated/uptime observations required; no tuning per item" }),
    make("census", { islands: cat.islands, islandSelection: "rank 0–2: species' own island, matched; rank 3: home, home-everything", knowledgeProfile: "natural exact rank; rank 3 sampled from home-everything boss roster, absent species/rank explicitly unsupported", bots: [], bpms: [120], species: cat.species, levels: [0, 1, 2, 3], bags: cat.bags, fixtures: ["invitation-stun-protected", "witch-knockdown-unprotected"], shardKind: "species", trueLegend: "rank 3 uses a real boss with documented awake/hostile state, not a non-boss with level overwritten" }),
    make("map-luck", { islands: ["tiger"], bots: ["expert"], bpms: [120], loadouts: [plain], maps: Array.from({ length: 30 }, (_, i) => mapPair(i)), shardKind: "map-blocks", mapChunk: 5 }),
  ];
  for (const m of studies) {
    const n = cells(m).length, s = shards(m).length, baseSeconds = m.id === "census" ? 6 : 160, contingencySeconds = m.id === "census" ? 12 : 700;
    m.runtimeEstimate = { requestedCells:n,shards:s,basis:"12 paired preflight runs: 12294.9167 player seconds / 463.5 wall seconds = 26.5262x; wall is a one-busy-core reservation proxy, not measured CPU time",secondsPerCellBase:baseSeconds,secondsPerCellContingency:contingencySeconds,startupSecondsPerShard:60,oneCoreHoursBase:(n*baseSeconds+s*60)/3600,oneCoreHoursContingency:(n*contingencySeconds+s*60)/3600,fixtureCaveat:m.id==="census"?"No new fixture timing run: cap-normalised throughput plus unmeasured map/setup allowance; recalibrate on first cloud shard after expert training":"Cap-normalised base; contingency includes slower observed throughput plus 50% density/perception allowance; not a guarantee" };
  }
  return studies;
}

export function cells(m) {
  const out = [];
  for (const p of m.maps) for (const bpm of m.bpms) {
    if (m.id === "census") {
      for (const species of m.species) for (const level of m.levels) for (const fixture of m.fixtures) for (const bag of fixture === "witch-knockdown-unprotected" ? ["satchel"] : m.bags) out.push({ ...p, bpm, island: level === 3 ? "home" : species, condition: level === 3 ? "home-everything" : "matched", species, level, fixture, loadout: { ...plain, id: `bag-${bag}`, bag }, mode: "fixture", observationAccess: "scripted-fixture; not human play" });
    } else for (const island of m.islands) for (const bot of m.bots) for (const loadout of m.loadouts) out.push({ ...p, bpm, island, bot, loadout, mode: "run", observationAccess: accessOf(bot) });
  }
  return out.map(raw => { const c={...raw,phaseNumber:m.islandPhases?.[raw.island]??null}, scenarioId = digest(c); return { ...c, study: m.id, capPlayerSeconds: c.mode === "run" ? m.runCapPlayerSeconds : m.fixtureCapPlayerSeconds, scenarioId, key: `${m.id}:${scenarioId}` }; });
}

export function shards(m) {
  const all = cells(m), groups = new Map();
  for (const c of all) {
    let group;
    if (m.shardKind === "species") group = c.species;
    else if (m.shardKind === "map-blocks") group = `maps-${Math.floor(c.mapIndex / m.mapChunk)}`;
    else if (m.shardKind === "equipment-chunks") group = `${c.island}/map-${c.mapIndex}/gear-${Math.floor(m.loadouts.findIndex(l => l.id === c.loadout.id) / m.loadoutChunk)}`;
    else if (m.shardKind === "island-chunks") group = `map-${c.mapIndex}/islands-${Math.floor(m.islands.indexOf(c.island) / m.islandChunk)}`;
    else group = `${c.island}/map-${c.mapIndex}`;
    if (!groups.has(group)) groups.set(group, []); groups.get(group).push(c);
  }
  return [...groups].map(([group, cases], i) => ({ id: `${m.id}-${String(i).padStart(3, "0")}`, group, mapIndices: [...new Set(cases.map(c => c.mapIndex))], seedPairs: [...new Map(cases.map(c => [c.mapIndex, mapPair(c.mapIndex)])).values()], cases }));
}

export function validateDesign(ms) {
  const all = ms.flatMap(cells);
  if (new Set(all.map(c => c.key)).size !== all.length) throw Error("Duplicate experiment key");
  for (const m of ms) {
    const expected = cells(m).map(c => c.key).sort(), assigned = shards(m).flatMap(s => s.cases.map(c => c.key)).sort();
    if (JSON.stringify(expected) !== JSON.stringify(assigned)) throw Error(`Incomplete/overlapping shards: ${m.id}`);
  }
  return ms.map(m => ({ study: m.id, cases: cells(m).length, shards: shards(m).length, legacyPrivileged: cells(m).filter(c => c.observationAccess === "privileged-state").length }));
}

export function validateLock(m, lock) {
  const model = lock.modelLock;
  if (lock.expertTrained !== true || !/^[a-f0-9]{64}$/.test(model?.modelSha256 ?? "") || !/^[a-f0-9]{40}$/.test(lock.sourceCommit ?? "")) throw Error("A frozen trained-expert/source lock is required; survey execution is gated");
  const { modelSha256, ...body } = model;
  if (model.schema !== 1 || digest(body) !== modelSha256 || !model.sourceFingerprint || !model.observation || !model.parameters || !Object.keys(model.parameters).length) throw Error("Exact #1477 modelLock checksum/source/vector required");
  if (!Array.isArray(lock.trainingPairs)) throw Error("Training/search pair inventory required for leakage check");
  if (![1, 2].includes(lock.searchRound)) throw Error("Explicit searchRound 1 or 2 required");
  if (!Array.isArray(model.heldOutPairs) || !model.heldOutPairs.length) throw Error("Expert final held-out inventory required");
  const reserved = new Set(m.evaluationReservation.map(pairKey)), held = new Set(model.heldOutPairs.map(pairKey));
  if (lock.trainingPairs.some(p => held.has(pairKey(p))) || [...reserved].some(p => held.has(p))) throw Error("Final held-out pairs must never enter either training round or survey feedback");
  if (lock.searchRound === 1 && lock.trainingPairs.some(p => reserved.has(pairKey(p)))) throw Error("Evaluation pair leaked into first expert training/search");
}

export function contractCase(c) {
  return { kind: c.mode === "run" ? "run" : c.fixture === "invitation-stun-protected" ? "stun" : "ko", worldSeed: c.world, nightSeed: c.seed, island: c.island, bpm: c.bpm, bag: c.loadout.bag, hat: c.loadout.hat, broomPart: c.loadout.parts[0] ?? null, condition: c.condition ?? "matched", limit: c.capPlayerSeconds, ...(c.mode === "run" ? { bot: c.bot } : { species: c.species, rank: c.level, distance: 10 }) };
}

export function normalize(c, external, model) {
  if (external.status === "unsupported") return { status: "unsupported", reason: external.reason };
  if (external.status !== "ok") throw Error(`Adapter execution error: ${external.reason ?? "missing status"}`);
  if (digest(external.case) !== digest(contractCase(c)) || external.modelSha256 !== model.modelSha256 || external.sourceFingerprint !== model.sourceFingerprint) throw Error("Adapter case/source/model mismatch");
  const r = external.result;
  if (c.mode === "fixture") {
    if (r.actualRank !== c.level || (c.level === 3 && r.actualBoss !== true)) throw Error("Requested natural rank/legend was not observed");
    const eventObserved = c.fixture === "invitation-stun-protected" ? r.stunned : r.knockout;
    return { status: "ok", durationPlayer: r.playerEnd ?? null, durationWorld: r.end, eventObserved, eligible: r.eligible ?? (eventObserved ? true : null), quests: null, permanentFind: null, fixture: r.fixture, hitCount: r.hits, censored: r.censored, actualBoss: r.actualBoss, actualRank: r.actualRank };
  }
  if (c.bot === "expert" && digest(external.parameters) !== digest(model.parameters)) throw Error("Actual expert vector differs from lock");
  return { status: "ok", outcome: r.outcome, durationPlayer: r.playerEnd, durationWorld: r.end, knockdowns: r.knockdowns, waveReached: r.waveReached, wavesPassed: r.wavesPassed, rangedSeconds: r.rangedSeconds, eligibleSeconds: r.eligibleSeconds, quests: { completed: r.questsCompleted, total: r.questsTotal }, permanentFind: { available: r.upgradeAvailable ?? (r.upgradeFound ? true : null), found: r.upgradeFound, kept: r.outcome === "censored" ? null : r.upgradeEligibleToKeep, persisted: r.upgradePersisted }, ...(c.bot === "expert" ? { expertParameters: external.parameters, expertAudit: model.observation, expertEvaluation: external } : {}), ...(c.study === "equipment" ? { equipmentUse: r.equipmentUse ?? { observed: false, reason: "contract does not yet log item placement/activation" } } : {}) };
}

export function validateRow(c, row) {
  if (row.key !== c.key || digest(row.case) !== digest(c)) throw Error("Result key/case differs from assigned cell");
  if (row.result?.status === "unsupported") { if (!row.result.reason?.trim()) throw Error("Unsupported cells need a reason"); return; }
  if (row.result?.status !== "ok") throw Error("Explicit result status required; errors are not game outcomes");
  if (c.mode === "run" && !["won", "lost", "censored"].includes(row.result?.outcome)) throw Error("Invalid run outcome");
  if (c.mode === "fixture" && typeof row.result?.eventObserved !== "boolean") throw Error("Fixture needs explicit eventObserved and censoring");
  if (!(c.mode === "fixture" && row.result.durationPlayer === null) && (!Number.isFinite(row.result?.durationPlayer) || row.result.durationPlayer < 0 || row.result.durationPlayer > c.capPlayerSeconds + 1 / 60 + 1e-6)) throw Error("Invalid observation duration");
  if (!Number.isFinite(row.result.durationWorld) || row.result.durationWorld < 0) throw Error("World-clock duration required separately");
  if (c.mode === "fixture" && ![true,false,null].includes(row.result.eligible)) throw Error("Fixture eligibility must be explicit or unknown");
  if (c.mode === "fixture" && (row.result.eligible === false && row.result.eventObserved || row.result.quests !== null || row.result.permanentFind !== null)) throw Error("Fixture progression is N/A and ineligible events cannot succeed");
  if (c.mode === "run") {
    const q = row.result.quests, f = row.result.permanentFind;
    if (!Number.isInteger(q?.completed) || !Number.isInteger(q?.total) || q.completed < 0 || q.total < q.completed) throw Error("Every run needs quests completed/total");
    if (![true,false,null].includes(f?.available) || typeof f?.found !== "boolean" || ![true, false, null].includes(f?.kept) || f.found && f.available === false || f.kept === true && (!f.found || row.result.outcome !== "won")) throw Error("Every run needs separate valid permanent-find availability/found/kept");
    if (row.result.outcome === "lost" && f.kept !== false || row.result.outcome === "won" && f.kept !== f.found || row.result.outcome === "censored" && f.kept !== null) throw Error("Find retention must distinguish resolved terminal outcomes from censored uncertainty");
    if (![row.result.knockdowns,row.result.waveReached,row.result.wavesPassed].every(v=>Number.isInteger(v)&&v>=0) || row.result.wavesPassed > row.result.waveReached) throw Error("Run knockdown/wave observations required");
    if (![row.result.rangedSeconds,row.result.eligibleSeconds].every(v=>Number.isFinite(v)&&v>=0) || row.result.rangedSeconds > row.result.eligibleSeconds + 1e-6) throw Error("Observed ranged-target numerator/denominator required");
    if (c.study === "equipment" && !row.result.equipmentUse) throw Error("Equipment-use observations required; unused gear is not proof of no value");
    if (c.bot === "expert" && (!row.result.expertParameters || !Object.keys(row.result.expertParameters).length || !row.result.expertAudit)) throw Error("Every expert evaluation needs its actual vector and audit label");
  }
}

export function selected(m, selection) {
  const all = cells(m);
  if (!selection) return all;
  if (selection.manifestHash !== digest(m) || !Array.isArray(selection.keys) || new Set(selection.keys).size !== selection.keys.length) throw Error("Invalid weak-cell selection");
  const wanted = new Set(selection.keys), picked = all.filter(c => wanted.has(c.key));
  if (picked.length !== wanted.size || picked.some(c => c.bot !== "expert")) throw Error("Weak reruns select exact existing expert cells only");
  return picked;
}

export function mergeData(m, datasets, selection) {
  const expected = new Map(selected(m, selection).map(c => [c.key, c])), found = new Map();
  const specs = new Map(shards(m).map(s=>[s.id,s]));
  let common;
  for (const data of datasets) {
    const meta = data[0]?.survey;
    if (!meta || meta.manifestHash !== digest(m)) throw Error("Wrong study manifest");
    if (![meta.sourceFingerprint, meta.expertModelHash, meta.adapterHash].every(s => /^[a-f0-9]{64}$/.test(s ?? "")) || !/^[a-f0-9]{40}$/.test(meta.sourceCommit ?? "") || !meta.expertAudit || !meta.expertParameters) throw Error("Result provenance incomplete");
    if (meta.selectionHash !== (selection ? digest(selection) : null)) throw Error("Selection differs across result shards");
    const { shard, ...identity } = meta;
    if (common && digest(common) !== digest(identity)) throw Error("Source/model/adapter mismatch across shards"); common = identity;
    const spec = specs.get(shard);
    if (!spec) throw Error("Unknown shard");
    const allowed = new Set(spec.cases.map(c => c.key));
    for (const row of data.slice(1)) {
      const c = expected.get(row.key);
      if (!c || !allowed.has(row.key) || found.has(row.key)) throw Error("Unknown, wrong-shard or duplicate result key");
      validateRow(c, row);
      if (c.bot === "expert" && row.result.status === "ok" && (digest(row.result.expertParameters) !== digest(meta.expertParameters) || row.result.expertAudit !== meta.expertAudit)) throw Error("Expert result vector/audit differs from shard provenance");
      found.set(row.key, row);
    }
  }
  if (found.size !== expected.size) throw Error(`Incomplete experiment: ${found.size}/${expected.size}; missing cells are not losses`);
  return [{ survey: { ...common, shard: "merged" } }, ...[...found.values()].sort((a, b) => a.key.localeCompare(b.key))];
}

export function report(m, data) {
  const groups = new Map();
  for (const r of data.slice(1)) {
    const c = r.case, k = [c.island, c.bot ?? `${c.species}/rank${c.level}/${c.fixture}`, c.bpm, c.loadout.id, c.bot === "expert" ? r.result.expertAudit ?? "unsupported expert" : c.observationAccess].join(" | ");
    if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r.result);
  }
  const out = [`# ${m.id}: frozen survey results`, "", "Legacy bots read privileged state; expert interpretation follows its frozen audit. Censored/unsupported cells are not losses. Kept means awarded by the night outcome; browser persistence is not simulated. Fixture progression is N/A. Screening tables are descriptive, not a tuning prescription. Times use the world clock; caps use player seconds.", "", "| island | bot / fixture | bpm | loadout | observation access | n / unsupported | won / lost / censored | quests completed / total | find found / available / kept / unresolved | fixture events / eligible | mean KO | median won / lost / event seconds |", "|---|---|---|---|---|---|---|---|---|---|---|---|"];
  for (const [k, rs] of groups) {
    const ok = rs.filter(r => r.status === "ok"), runs = ok.filter(r => r.quests), fs = runs.map(r => r.permanentFind);
    const median = xs => { if(!xs.length) return "—"; const s=[...xs].sort((a,b)=>a-b); return ((s[Math.floor((s.length-1)/2)]+s[Math.floor(s.length/2)])/2).toFixed(2); };
    out.push(`| ${k} | ${rs.length} / ${rs.length - ok.length} | ${["won", "lost", "censored"].map(s => ok.filter(r => r.outcome === s).length).join(" / ")} | ${runs.length ? `${runs.reduce((s,r) => s+r.quests.completed,0)} / ${runs.reduce((s,r) => s+r.quests.total,0)}` : "N/A"} | ${runs.length ? `${fs.filter(f=>f.found).length} / ${fs.filter(f=>f.available).length} / ${fs.filter(f=>f.kept===true).length} / ${fs.filter(f=>f.kept===null).length}` : "N/A"} | ${runs.length ? "N/A" : `${ok.filter(r => r.eventObserved).length} / ${ok.filter(r => r.eligible).length}`} | ${runs.length ? (runs.reduce((s,r)=>s+r.knockdowns,0)/runs.length).toFixed(2) : "N/A"} | ${["won","lost","event"].map(s=>median(ok.filter(r=>s==="event"?r.eventObserved:r.outcome===s).map(r=>r.durationWorld))).join(" / ")} |`);
  }
  return out.join("\n") + "\n";
}

export function weakCells(m, data) {
  const groups = new Map();
  for (const row of data.slice(1)) if (row.case.bot === "expert" && row.result.status === "ok") {
    const c = row.case, k = `${c.island}/${c.bpm}/${c.loadout.id}`;
    if (!groups.has(k)) groups.set(k, []); groups.get(k).push(row);
  }
  const keys = [], priorities = [];
  for (const [cell, rows] of groups) {
    const outcomes = new Set(rows.map(r => r.result.outcome));
    const reasons = [];
    if (rows.some(r => r.result.outcome !== "won")) reasons.push("lost-or-censored");
    if (outcomes.size > 1) reasons.push("outcomes-vary-between-maps");
    if (rows.some(r => r.result.quests.completed < r.result.quests.total)) reasons.push("quests-incomplete");
    if (rows.some(r => r.result.permanentFind.available && (!r.result.permanentFind.found || r.result.permanentFind.kept !== true))) reasons.push("find-not-found-or-retained");
    if (reasons.length) { keys.push(...rows.map(r => r.key)); priorities.push({ cell, reasons, maps: rows.length }); }
  }
  return { manifestHash: digest(m), sourceFingerprint: data[0].survey.sourceFingerprint, sourceExpertModelHash: data[0].survey.expertModelHash, role: "round-two search feedback, never final held-out scoring", keys: keys.sort(), priorities };
}

const lines = p => readFileSync(resolve(ROOT, p), "utf8").trim().split("\n").filter(Boolean).map(JSON.parse);
const save = (p, s) => { mkdirSync(dirname(resolve(ROOT, p)), { recursive: true }); writeFileSync(resolve(ROOT, p), s); };
const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i < 0 ? fallback : process.argv[i + 1]; };

async function main() {
  const mode = process.argv[2];
  if (mode === "design") {
    const cat = catalogue(), ms = makeDesign(cat), counts = validateDesign(ms), commands = [];
    for (const m of ms) {
      save(`${HOME}/${m.id}.json`, JSON.stringify(m, null, 2) + "\n");
      for (const s of shards(m)) commands.push({ study: m.id, shard: s.id, cases: s.cases.length, group: s.group, seedPairs: s.seedPairs, command: `node tools/balance/survey.mjs run --manifest ${HOME}/${m.id}.json --shard ${s.id} --lock trained-expert-lock.json --out results/${m.id}/${s.id}.jsonl` });
    }
    save(`${HOME}/catalogue.json`, JSON.stringify(cat, null, 2) + "\n");
    save(`${HOME}/cloud-shards.json`, JSON.stringify(commands, null, 2) + "\n");
    save(`${HOME}/cloud-commands.txt`, commands.map(c => `# ${c.shard}; ${c.cases} cases; world/night pairs ${c.seedPairs.map(p => `${p.world}/${p.seed}`).join(",")}\n${c.command}`).join("\n\n") + "\n");
    console.log(JSON.stringify(counts)); return;
  }
  if (mode === "check") {
    const ms = ["ladder", "tempo", "equipment", "census", "map-luck"].map(id => json(`${HOME}/${id}.json`));
    if (ms.some(m => m.catalogueHash !== digest(catalogue()))) throw Error("Catalogue changed; explicitly version the design before running");
    if (digest(ms) !== digest(makeDesign(catalogue()))) throw Error("Committed manifests differ from the frozen generator; regenerate/review deliberately");
    console.log(JSON.stringify(validateDesign(ms))); return;
  }
  const m = json(arg("manifest", `${HOME}/ladder.json`)), out = arg("out");
  if (!out) throw Error("--out required");
  const selection = arg("selection") ? json(arg("selection")) : undefined;
  if (mode === "commands") {
    const wanted = new Set(selected(m, selection).map(c => c.key));
    const suffix = selection ? "-round2" : "", lockFile = selection ? "trained-expert-round2-lock.json" : "trained-expert-lock.json";
    const commands = shards(m).filter(s => s.cases.some(c => wanted.has(c.key))).map(s => `node tools/balance/survey.mjs run --manifest ${arg("manifest")} --shard ${s.id} --lock ${lockFile}${selection ? ` --selection ${arg("selection")}` : ""} --out results/${m.id}${suffix}/${s.id}.jsonl`);
    save(out, commands.join("\n") + (commands.length ? "\n" : "")); console.log(`${commands.length} nonempty shard commands`); return;
  }
  if (mode === "weak") {
    const data = lines(arg("data"));
    if (data[0]?.survey?.manifestHash !== digest(m)) throw Error("Feedback source manifest differs");
    if (data[0].survey.shard !== "merged" || data[0].survey.searchRound !== 1 || data.length !== cells(m).length + 1 || new Set(data.slice(1).map(r=>r.key)).size !== cells(m).length) throw Error("Feedback requires the complete merged first-expert cohort");
    const chosen = weakCells(m, data); save(out, JSON.stringify(chosen, null, 2) + "\n");
    const expertRows = data.slice(1).filter(r => r.case.bot === "expert" && r.result.status === "ok");
    if (expertRows.some(r=>!r.result.expertEvaluation)) throw Error("Exact #1477 external evaluations missing");
    save(out + ".evaluations.jsonl", expertRows.map(r => JSON.stringify(r.result.expertEvaluation)).join("\n") + "\n"); return;
  }
  if (mode === "merge") {
    const dir = arg("dir"), files = readdirSync(resolve(ROOT, dir)).filter(f => f.endsWith(".jsonl")).sort();
    const data = mergeData(m, files.map(f => lines(`${dir}/${f}`)), selection);
    save(out, data.map(r => JSON.stringify(r)).join("\n") + "\n"); save(out + ".md", report(m, data)); return;
  }
  if (mode !== "run") throw Error("Use design, check, commands, run, merge or weak");
  const lock = json(arg("lock", "trained-expert-lock.json")); validateLock(m, lock);
  const model = lock.modelLock;
  if (selection && (lock.searchRound !== 2 || selection.sourceFingerprint !== model.sourceFingerprint)) throw Error("Weak reruns require round-two lock on unchanged source");
  if (digest(catalogue()) !== m.catalogueHash) throw Error("Frozen catalogue differs");
  const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
  if (head !== lock.sourceCommit) throw Error("Cloud checkout differs from frozen source");
  execFileSync("git", ["diff", "--quiet", "HEAD", "--", "src/rules", "config", "art", "tools/balance"], { cwd: ROOT });
  const spec = shards(m).find(s => s.id === arg("shard")); if (!spec) throw Error("Unknown --shard");
  const adapterPath = resolve(ROOT, m.requiredAdapter);
  if (!existsSync(adapterPath)) throw Error("Survey adapter not integrated yet; design commands must wait for #1477/coordinator contract");
  const adapter = await import(pathToFileURL(adapterPath).href);
  const protectedPairs = json("docs/notes/expert-held-out-pairs.json");
  if (digest(protectedPairs) !== digest(model.heldOutPairs)) throw Error("Model lock protected pairs differ from #1477's committed held-out list");
  const runtime = await adapter.createCaseRunner();
  try {
    if (runtime.fingerprint !== model.sourceFingerprint) throw Error("Exact #1477 source fingerprint differs; never silently rebind a trained model");
    adapter.validateLock(model, runtime.fingerprint);
    const header = { survey: { manifestHash: digest(m), selectionHash: selection ? digest(selection) : null, sourceCommit: head, sourceFingerprint: runtime.fingerprint, searchRound: lock.searchRound, expertModelHash: model.modelSha256, expertParameters: model.parameters, expertAudit: model.observation, humanLimits: model.humanLimits, lockHash: digest(lock), protectedHeldOutPairsHash: digest(model.heldOutPairs), adapterHash: createHash("sha256").update(readFileSync(adapterPath)).digest("hex"), shard: spec.id } };
    const prior = existsSync(resolve(ROOT, out)) ? lines(out) : [header];
    if (digest(prior[0]) !== digest(header)) throw Error("Resume source/model/manifest differs");
    const picked = new Set(selected(m, selection).map(c => c.key)), assigned = spec.cases.filter(c => picked.has(c.key));
    if (!assigned.length) throw Error("No selected cases in this shard; omit its command");
    const byKey = new Map(assigned.map(c => [c.key, c])), done = new Set();
    for (const row of prior.slice(1)) { if (!byKey.has(row.key) || done.has(row.key)) throw Error("Invalid/duplicate resumed key"); validateRow(byKey.get(row.key), row); done.add(row.key); }
    if (!existsSync(resolve(ROOT, out))) save(out, JSON.stringify(header) + "\n");
    for (const c of assigned) if (!done.has(c.key)) {
      const external = await runtime.runCase(contractCase(c), structuredClone(model)), result = normalize(c, external, model), row = { key: c.key, case: c, result }; validateRow(c, row);
      appendFileSync(resolve(ROOT, out), JSON.stringify(row) + "\n");
    }
  } finally { await runtime.close?.(); }
}
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) await main();
