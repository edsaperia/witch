// The coach (overnight, 2026-10-07: Ed asked for a stronger bot, the "champion"): a search over the careful bot's
// options and numbers (rules/bot.ts BotOptions, BOT_KNOBS) by a simple evolution strategy (a (μ, λ) search with each
// knob's own step size, CMA-style but diagonal), every candidate playing the real rules headless on the training seeds
// and the best scored again on held-out seeds it never trained on. Runs in parallel: one worker process a core, each
// loading the rules once.
//   node tools/balance/coach.mjs search [--gens 8] [--pop 8] [--seeds 4 (training seeds 0..N-1)] [--time 2700] [--workers 4] [--from best.json] [--out dir]
//   node tools/balance/coach.mjs score [--bots skilled,champion,crude] [--opts file.json (the champion's options)] [--held 8 (held-out seeds 100..)] [--time 5400] [--json out.json]
// Fitness (one run): the waves her soundsystems stood through (×10), less 4 a soundsystem lost, 3 an angry legend, 1 a
// knockout, plus a little for a late first knockout and for the home soundsystem's health; a run that's over scores the
// wave it ended on. Seeds as runbot.mjs: 1000 + i × 7919.
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { arg, list, mean, median, openRules } from "./lib.mjs";

const SEED = i => 1000 + i * 7919;

/** One process: reads jobs (JSON lines) on stdin, writes each run's numbers on stdout. */
async function worker() {
  const { load, close } = await openRules();
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { newBot } = await load("/src/rules/bot.ts");
  const rl = createInterface({ input: process.stdin });
  for await (const line of rl) {
    if (!line.trim()) continue;
    const job = JSON.parse(line);
    const g = newGame(job.seed, withTuning(job.tuning ?? {})), w = g.witches[0], dt = 1 / 60;
    g.clock.paused = false;
    w.body = { ...w.body, seated: false };
    const brain = newBot(job.kind, job.opts ?? {});
    let firstKo = null, kos = 0, was = false, minHp = 1;
    for (let step = 0; step * dt < job.time; step++) {
      stepGame(g, brain.decide(g), dt);
      if (w.ko && !was) { kos++; if (firstKo === null) firstKo = g.clock.time; }
      was = !!w.ko;
      if (step % 60 === 0) { const h = g.combat.sounds.get("home"); if (h) minHp = Math.min(minHp, h.hp / h.max); }
      if (g.partyOver) break;
    }
    const L = g.creatures.filter(c => c.boss);
    const out = {
      id: job.id, seed: job.seed, kind: job.kind, time: job.time, end: g.clock.time, over: g.partyOver?.at ?? null, wave: g.party.wave,
      ruined: g.party.ruined?.size ?? 0, standing: [...g.combat.sounds.values()].filter(h => h.hp > 0).length,
      firstKo, kos, angry: L.filter(c => c.legendState === "angry").length, happy: L.filter(c => c.legendState === "happy").length,
      posse: w.leash.stack.length + w.leash.placed.length, homeHp: minHp, quests: brain.done.quests.length, relics: brain.done.relics.length,
    };
    process.stdout.write("@@" + JSON.stringify(out) + "\n");
  }
  await close();
  process.exit(0);
}

/** A run's fitness (see the top). */
export function fitness(r) {
  const waves = r.over !== null ? r.wave - 1 : r.wave; // (a run that's over didn't stand through its last wave)
  const ko = r.firstKo === null ? 1 : r.firstKo / r.time;
  return 10 * waves - 4 * r.ruined - 3 * r.angry - 1 * r.kos + 3 * ko + 2 * r.homeHp + (r.over === null ? 5 : 0);
}

function pool(n) {
  const procs = [], waiting = new Map(), queue = [];
  let next = 0;
  for (let i = 0; i < n; i++) {
    const p = spawn(process.execPath, [new URL(import.meta.url).pathname, "--worker"], { stdio: ["pipe", "pipe", "inherit"] });
    const rl = createInterface({ input: p.stdout });
    const me = { p, busy: false };
    rl.on("line", line => { if (!line.startsWith("@@")) return; const r = JSON.parse(line.slice(2)), cb = waiting.get(r.id); waiting.delete(r.id); me.busy = false; cb(r); pump(); });
    procs.push(me);
  }
  function pump() { for (const me of procs) if (!me.busy && queue.length) { const j = queue.shift(); me.busy = true; me.p.stdin.write(JSON.stringify(j) + "\n"); } }
  return {
    run: job => new Promise(res => { job.id = next++; waiting.set(job.id, res); queue.push(job); pump(); }),
    close: () => { for (const me of procs) me.p.stdin.end(); },
  };
}

// The search space: [name, lo, hi, integer?]. Options first, then rules/bot.ts BOT_KNOBS.
export const SPACE = [
  ["guards", 0, 8, true], ["keep", 0, 6, true], ["questMax", 0, 6, true], ["relicMax", 0, 4, true],
  ["defendLead", 10, 150], ["defendHold", 0, 150], ["healAt", 1, 3, true], ["kite", 4, 20], ["dashAt", 2, 10],
  ["fireFrac", 0.6, 1], ["closeFrac", 0.4, 0.95], ["recruitRange", 300, 1500], ["kinKeep", 1, 3, true],
  ["feedMin", 1, 8, true], ["feedRange", 150, 900], ["feedWait", 5, 45],
];
const OPT_KEYS = new Set(["guards", "keep", "questMax", "relicMax"]);
const START = { guards: 3, keep: 2, questMax: 3, relicMax: 2, defendLead: 50, defendHold: 60, healAt: 1, kite: 9, dashAt: 5, fireFrac: 0.95, closeFrac: 0.8, recruitRange: 900, kinKeep: 1, feedMin: 3, feedRange: 500, feedWait: 20 };
/** A point in the search space as the bot's options. */
export function optsOf(x) {
  const o = { quests: true, relics: true, relicPolicy: x.relicPolicy ?? "front", feed: x.feedMin < 8, knobs: {} };
  for (const [k] of SPACE) (OPT_KEYS.has(k) ? o : o.knobs)[k] = x[k];
  return o;
}
const toUnit = x => SPACE.map(([k, lo, hi]) => (x[k] - lo) / (hi - lo));
const fromUnit = u => Object.fromEntries(SPACE.map(([k, lo, hi, int], i) => { const v = lo + Math.min(1, Math.max(0, u[i])) * (hi - lo); return [k, int ? Math.round(v) : +v.toFixed(3)]; }));

/** A seeded normal (the search's own randomness; the runs themselves are deterministic). */
function rng(seed) { let s = seed >>> 0; const u = () => ((s = (s * 1664525 + 1013904223) >>> 0) + 0.5) / 4294967296; return () => Math.sqrt(-2 * Math.log(u())) * Math.cos(2 * Math.PI * u()); }

async function main() {
  const mode = process.argv[2], W = +arg("workers", 4), P = pool(W), OUT = arg("out", "previews/coach");
  mkdirSync(OUT, { recursive: true });
  const evalOn = async (kind, opts, seeds, time) => Promise.all(seeds.map(i => P.run({ kind, opts, seed: SEED(i), time })));
  if (mode === "search") {
    const GENS = +arg("gens", 8), POP = +arg("pop", 8), MU = Math.max(2, POP >> 1), SEEDS = Array.from({ length: +arg("seeds", 4) }, (_, i) => i), TIME = +arg("time", 2700);
    const start = arg("from") ? JSON.parse(readFileSync(arg("from"), "utf8")).x : START;
    let mean_ = toUnit(start), sig = SPACE.map(() => 0.15);
    const normal = rng(+arg("rng", 7)), log = [];
    const base = await evalOn("champion", optsOf(start), SEEDS, TIME), baseF = mean(base.map(fitness));
    let best = { x: start, f: baseF, runs: base };
    process.stderr.write(`start: ${baseF.toFixed(2)}\n`);
    for (let gen = 0; gen < GENS; gen++) {
      const kids = Array.from({ length: POP }, () => { const z = SPACE.map(() => normal()); return { z, u: mean_.map((m, i) => m + sig[i] * z[i]) }; });
      const scored = await Promise.all(kids.map(async k => { const x = fromUnit(k.u), runs = await evalOn("champion", optsOf(x), SEEDS, TIME); return { ...k, x, runs, f: mean(runs.map(fitness)) }; }));
      scored.sort((a, b) => b.f - a.f);
      const top = scored.slice(0, MU), wts = top.map((_, i) => Math.log(MU + 0.5) - Math.log(i + 1)), ws = wts.reduce((a, b) => a + b, 0);
      mean_ = mean_.map((_, i) => top.reduce((a, k, j) => a + wts[j] * k.u[i], 0) / ws);
      // (each knob's step: shrunk where the winners agree, kept where they spread; never under 0.03)
      sig = sig.map((s, i) => Math.max(0.03, Math.min(0.3, 0.7 * s + 0.3 * Math.sqrt(top.reduce((a, k, j) => a + wts[j] * (k.u[i] - mean_[i]) ** 2, 0) / ws) * 1.5)));
      if (scored[0].f > best.f) best = { x: scored[0].x, f: scored[0].f, runs: scored[0].runs };
      log.push({ gen, best: scored[0].f, median: median(scored.map(k => k.f)), x: scored[0].x });
      process.stderr.write(`gen ${gen}: best ${scored[0].f.toFixed(2)}, median ${median(scored.map(k => k.f)).toFixed(2)}, overall ${best.f.toFixed(2)} ${JSON.stringify(scored[0].x)}\n`);
      writeFileSync(`${OUT}/search.json`, JSON.stringify({ best, mean: fromUnit(mean_), log }, null, 1));
    }
    // The mean of the last generation is a candidate too (less lucky than the best single draw).
    const m = fromUnit(mean_), mr = await evalOn("champion", optsOf(m), SEEDS, TIME), mf = mean(mr.map(fitness));
    process.stderr.write(`final mean: ${mf.toFixed(2)} ${JSON.stringify(m)}\n`);
    writeFileSync(`${OUT}/search.json`, JSON.stringify({ best, mean: m, meanF: mf, log }, null, 1));
  } else if (mode === "score") {
    const BOTS = list(arg("bots", "skilled,champion,crude")), HELD = Array.from({ length: +arg("held", 8) }, (_, i) => 100 + i), TIME = +arg("time", 5400);
    const champ = arg("opts") ? JSON.parse(readFileSync(arg("opts"), "utf8")) : null;
    const optsFor = b => b === "champion" ? (champ ? (champ.x ? optsOf(champ.x) : champ) : optsOf(START)) : b === "skilled-game" ? { quests: true, questMax: 3, relics: true, relicMax: 2, relicPolicy: "front", feed: true } : {};
    const rows = [];
    await Promise.all(BOTS.map(async b => { const rs = await evalOn(b === "skilled-game" ? "skilled" : b, optsFor(b), HELD, TIME); for (const r of rs) rows.push({ ...r, bot: b, fit: fitness(r) }); }));
    if (arg("json")) writeFileSync(arg("json"), JSON.stringify(rows));
    console.log(`Held-out seeds ${HELD[0]}–${HELD[HELD.length - 1]}, ${TIME / 60} min each.\n`);
    console.log("| bot | fitness | waves (mean) | runs over | first knockout (min, median) | knockouts | soundsystems lost | angry legends | quests | relics |");
    console.log("|---|---|---|---|---|---|---|---|---|---|");
    for (const b of BOTS) {
      const rs = rows.filter(r => r.bot === b), ko = rs.map(r => r.firstKo).filter(x => x !== null);
      console.log(`| ${b} | ${mean(rs.map(r => r.fit)).toFixed(1)} | ${mean(rs.map(r => r.wave)).toFixed(1)} | ${rs.filter(r => r.over !== null).length}/${rs.length} | ${ko.length ? (median(ko) / 60).toFixed(1) : "none"}${ko.length < rs.length ? ` (${rs.length - ko.length} never)` : ""} | ${mean(rs.map(r => r.kos)).toFixed(1)} | ${mean(rs.map(r => r.ruined)).toFixed(1)} | ${mean(rs.map(r => r.angry)).toFixed(1)} | ${mean(rs.map(r => r.quests)).toFixed(1)} | ${mean(rs.map(r => r.relics)).toFixed(1)} |`);
    }
  }
  P.close();
}

if (process.argv.includes("--worker")) await worker();
else await main();
