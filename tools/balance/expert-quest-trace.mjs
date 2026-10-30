// Four approved diagnostics only (coordinator 6517804162). No resume or search.
// Full quest state is OUTPUT ONLY; the policy receives its unchanged observer.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { constants, setPriority } from "node:os";
import { openRules } from "./lib.mjs";
import { sourceFingerprint } from "./expert-contract.mjs";

const arg = (key, fallback) => { const i = process.argv.indexOf(`--${key}`); return i < 0 ? fallback : process.argv[i + 1]; };
const ablation = process.argv.includes("--dream-visit-ablation"), limit = ablation ? 60 : 3000;
const cap = Number(arg("wall-seconds", ablation ? 180 : 1200)), output = arg("out", "");
if (ablation && cap > 180) throw Error("Dream-visit ablation worker must fit180s; whole job300s including preflight");
if (!output || !Number.isFinite(cap) || cap <= 0 || cap > 1200) throw Error("Supply fresh --out and --wall-seconds <=1200; whole job <=1500 including preflight");
if (!process.argv.includes("--worker")) {
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2), "--worker"], { stdio: "inherit" });
  let capped = false;
  const timer = setTimeout(() => { capped = true; child.kill(); }, Math.max(0, cap * 1000 - performance.now()));
  const code = await new Promise((ok, no) => { child.on("error", no); child.on("exit", ok); });
  clearTimeout(timer);
  if (existsSync(resolve(output))) writeFileSync(resolve(output, "job.json"), JSON.stringify({ capped, exitCode: capped ? 2 : code ?? 1, endedUtc: new Date().toISOString(), noRestart: true }, null, 2) + "\n");
  if (capped) console.error("CAPPED/INCOMPLETE: preserve partial JSONL; no restart");
  process.exit(capped ? 2 : code ?? 1);
}
setPriority(0, constants.priority.PRIORITY_BELOW_NORMAL);
const root = fileURLToPath(new URL("../..", import.meta.url)), out = resolve(output);
if (existsSync(out)) throw Error("Diagnostic output must be fresh; no resume/overwrite");
const protectedPairs = JSON.parse(readFileSync(resolve(root, "docs/notes/expert-held-out-pairs.json"), "utf8"));
if (protectedPairs.some(p => p.worldSeed === 0 && p.nightSeed === 1000)) throw Error("Diagnostic pair is protected");
mkdirSync(out, { recursive: true });
const manifest = { schema: 1, diagnosticOnly: true, startedUtc: new Date().toISOString(), sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(),
  fingerprint: sourceFingerprint(root), previousSource: "1ce28fd9d9f96ea2518b3d97811760ae793d2c8f",
  runtime: { node: process.version, platform: process.platform, arch: process.arch },
  observation: "approximate fair observation", reactionSeconds: .25, inputHz: 8, aimErrorMetres: 1,
  limit, workerWallSeconds: cap, wholeJobWallSeconds: ablation ? 300 : 1500, heldCases: 0, noRestart: true,
  dreamVisitAblation: ablation, rememberDreamVisitsDefault: true,
  stop: `first wonAt, partyOver, or ${limit} player seconds; no post-win extension`,
  cases: (ablation ? ["home-everything"] : ["matched", "home-everything"]).flatMap(condition => (ablation ? ["off", "on"] : ["baseline", "D"]).map(vector => ({ vector, condition, seed: 1000, worldSeed: 0, island: "home", bpm: 100, bag: "satchel", hat: "none", wearsHat: false, parts: [] }))) };
writeFileSync(resolve(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const { load, close } = await openRules();
const summaries = [], began = Date.now();
try {
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
  const { newExpert, EXPERT_LIMITS, EXPERT_DEFAULTS } = await load("/src/bots/expert.ts");
  const { REAL_KINDS, knownKinds } = await load("/src/rules/rosters.ts");
  const { recordTempo } = await load("/src/rules/beat.ts");
  const { fillTrunk } = await load("/src/rules/finds.ts");
  const { syncHatUnlock } = await load("/src/app/debugUnlock.ts");
  const { questOpen } = await load("/src/rules/dream.ts");
  for (const [index, c] of manifest.cases.entries()) {
    const filename = `${index}-${c.condition}-${c.vector}.jsonl`, path = resolve(out, filename);
    writeFileSync(path, "");
    const emit = event => appendFileSync(path, JSON.stringify(event) + "\n");
    // Identical to report-runtime.make, including the empty owned-find profile.
    const unlocked = c.condition === "home-everything";
    const g = newGame(c.seed, withTuning({ map: { ...TUNING.map, island: c.island, world: c.worldSeed, ...(unlocked ? { found: [...REAL_KINDS], islandAreas: knownKinds(REAL_KINDS).length } : {}) },
      spells: { ...TUNING.spells, bag: c.bag, hat: c.hat, parts: c.parts, ...(unlocked ? { hats: "*" } : {}) } }));
    const w = g.witches[0]; w.hat.has = c.wearsHat;
    if (unlocked) syncHatUnlock(w, true, new URLSearchParams("hats=*"));
    g.clock.paused = false; w.body = { ...w.body, seated: false };
    recordTempo(g.beat, g.tuning, c.bpm, 0); fillTrunk(g, {});
    const policy = { ...EXPERT_DEFAULTS, ...(c.vector === "D" ? { questMax: 2 } : {}) };
    const hash = createHash("sha256");
    let step = 0, lastControl = "", lastState = "", outcome = "censored";
    const known = new Set(), selected = new Set(), visited = new Set(), offered = new Set();
    const brain = newExpert(policy, c.seed ^ 0x1477, EXPERT_LIMITS, event => {
      for (const q of event.knownQuests) known.add(q.id);
      if (event.selectedQuest !== null) selected.add(event.selectedQuest);
      if (event.visitingLegend !== null) visited.add(event.visitingLegend);
      // These sets name selected visits/available offerings, not proof of arrival or delivery.
      for (const q of event.knownQuests) if (event.observation.carried.some(a => a.species === q.wants)) offered.add(q.id);
      emit({ ev: "decision", step, ...event });
    }, { rememberDreamVisits: ablation ? c.vector === "on" : true });
    const quests = () => g.creatures.filter(q => q.boss && q.quest).map(q => ({ id: q.id, species: q.species, wants: q.quest.species,
      done: q.quest.done ?? null, open: questOpen(g.party, q), questOpenFlag: q.questOpen ?? null,
      legendState: q.legendState ?? null, angry: !!q.enraged, gone: !!q.gone, x: q.x, z: q.z, cell: q.cell,
      clearing: g.map.legendClearing?.(...q.cell) ?? null }));
    const state = () => ({ quests: quests(), carried: w.leash.stack.map(id => ({ id, species: g.creatures[id].species })),
      placed: w.leash.placed, hp: w.health.hp, ko: !!w.ko, wave: g.party.wave, winPhase: g.win?.phase ?? null,
      wonAt: g.win?.wonAt ?? null, partyOver: g.partyOver ?? null, findFound: !!g.trunk?.found });
    const snapshot = force => {
      const s = state(), key = JSON.stringify(s);
      if (force || key !== lastState) { emit({ ev: "privilegedStateOutputOnly", step, playerTime: g.herTime, worldTime: g.clock.time, ...s }); lastState = key; }
    };
    emit({ ev: "setup", case: c, policy, rememberDreamVisits: ablation ? c.vector === "on" : true, STEP, limit, seed: c.seed ^ 0x1477, diagnosticOnly: true }); snapshot(true);
    const started = Date.now();
    for (; step < Math.ceil(limit / STEP); step++) {
      const controls = brain.decide(g), serial = JSON.stringify(controls);
      hash.update(`${step}:${serial}\n`);
      // Change points plus step count reconstruct the complete held-control stream.
      if (serial !== lastControl) { emit({ ev: "controls", step, playerTime: g.herTime, controls }); lastControl = serial; }
      stepGame(g, controls, Math.min(STEP, limit - step * STEP));
      for (const [kind, events] of [["quest", g.questEvents], ["leash", g.leashEvents], ["invite", w.invites.events], ["ko", g.koEvents]])
        for (const event of events) emit({ ev: "ruleEventOutputOnly", kind, step, playerTime: g.herTime, worldTime: g.clock.time, event });
      snapshot(false);
      if (g.partyOver || g.win?.wonAt !== undefined) { outcome = g.partyOver ? "lost" : "won"; step++; break; }
    }
    snapshot(true);
    const q = quests(), summary = { case: c, filename, outcome, playerEnd: g.herTime, worldEnd: g.clock.time, steps: step,
      controlSha256: hash.digest("hex"), wallSeconds: (Date.now() - started) / 1000,
      questsCompleted: q.filter(a => a.done !== null).length, questsTotal: q.length, terminalQuests: q,
      knownQuestIds: [...known], selectedQuestIds: [...selected], selectedVisitLegendIds: [...visited],
      knownQuestIdsWithCarriedOffering: [...offered], upgradeFound: !!g.trunk?.found,
      upgradeEligibleToKeep: !!g.trunk?.found && g.win?.wonAt !== undefined, upgradePersisted: false,
      endedAtWin: g.win?.wonAt !== undefined, noPostWinSteps: true,
      ...(ablation ? { rememberDreamVisits: c.vector === "on", diagnosticLegend239RequestLearned: known.has(239) } : {}) };
    emit({ ev: "end", ...summary }); summaries.push(summary);
    writeFileSync(resolve(out, "summary.json"), JSON.stringify({ complete: summaries.length === manifest.cases.length, cases: summaries, wallSeconds: (Date.now() - began) / 1000 }, null, 2) + "\n");
    console.error(`${index + 1}/${manifest.cases.length} ${c.condition}/${c.vector}: ${outcome}, ${summary.questsCompleted}/${summary.questsTotal} quests`);
  }
} finally { await close(); }
