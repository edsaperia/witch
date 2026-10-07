// Bot sweeps (the overnight balance programme, phase 4): every bot kind over many seeds, the real rules headless
// (as runbot.mjs: waves on, the boot-up from her first step), with a tuning overlay, out to a CSV and a summary.
//   idle, novice, crude, skilled: rules/bot.ts's kinds with no options (runbot's defaults: guards 3, keep 2);
//   top: the skilled bot with the bot game's choices (rules/bot.ts BOT_GAME.skilled: a few quests, two relics to the
//     front, feeding her young), the best player we have;
//   skilled:<strategy> (skilled:invite, skilled:mixed...): the skilled bot leaning one way (rules/bot.ts STRATEGIES).
// A run ends when the party's over or at --time. Each row: waves reached, when the first soundsystem fell, the first
// knockout, knockouts, 💌s thrown, 💌 hits, invites, evolutions, berries, quests and relics done, sigils placed.
// The summary: medians and means by bot, and the curve (the share of runs whose party is still on as each wave lands).
//   node tools/balance/sweep.mjs [--bots idle,novice,crude,skilled,top] [--seeds 20 (seeds 1000 + 7919 i, as runbot)]
//     [--skip K] [--time 4200] [--overlay knobs.json] [--set path=value;...] [--jobs 4] [--out dir] [--label name]
//   node tools/balance/sweep.mjs --report a.csv,b.csv   (the summaries of earlier sweeps, side by side)
// The overlay: { "tuning": {...config/tuning.json's shape, merged deep}, "combat": {...config/combat.json's} }
// (a file with neither key is all tuning). Arrays are replaced whole. Writes <out>/<label>.csv and <label>.md.
import { fork } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { arg, list, mean, median, openRules } from "./lib.mjs";

const COLS = ["bot", "seed", "label", "end", "over", "wave", "firstLost", "lostWave", "firstKo", "koWave", "kos", "lost", "standing", "letters", "hits", "invites", "pickups", "evolved", "berries", "quests", "relics", "placed", "posse", "angry", "happy", "areas", "woken", "wokenFar", "wokenRemote", "witchFar", "witchRemote", "secs"];
const deep = (a, b) => { for (const [k, v] of Object.entries(b)) { if (v && typeof v === "object" && !Array.isArray(v) && a[k] && typeof a[k] === "object" && !Array.isArray(a[k])) deep(a[k], v); else a[k] = v; } return a; };

// ---- a worker: runs its jobs and sends each row back ----
if (process.argv.includes("--worker")) {
  const { overlay, time, sets } = JSON.parse(process.env.SWEEP);
  const { load, close } = await openRules();
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { newBot, STRATEGIES, BOT_GAME } = await load("/src/rules/bot.ts");
  const { COMBAT } = await load("/src/rules/combat.ts");
  if (overlay.combat) deep(COMBAT, overlay.combat);
  const tun = deep(structuredClone(overlay.tuning ?? {}), {});
  for (const [path, v] of sets) { let o = tun; for (const k of path.slice(0, -1)) o = o[k] ??= {}; o[path[path.length - 1]] = v; }
  // withTuning merges one level deep: hand it whole sections, the overlay merged into each.
  const over = Object.fromEntries(Object.entries(tun).map(([k, v]) => [k, v && typeof v === "object" && !Array.isArray(v) ? deep(structuredClone(TUNING[k] ?? {}), v) : v]));
  const optionsOf = bot => { const [kind, strat] = bot.split(":"); return kind === "top" ? ["skilled", BOT_GAME.skilled] : kind === "champion" && !strat ? ["champion", BOT_GAME.champion ?? {}] : [kind, strat ? STRATEGIES[strat] : {}]; };

  function run(bot, seed) {
    const T0 = Date.now(), t = withTuning(over), g = newGame(seed, t), w = g.witches[0], dt = 1 / 60;
    g.clock.paused = false;
    w.body = { ...w.body, seated: false };
    const [kind, opts] = optionsOf(bot), brain = newBot(kind, opts);
    const home = g.map.dancefloor, M = g.map, R = Math.max(...M.cells.map(([cx, cy]) => Math.hypot(M.siteOf(cx, cy).x - home.x, M.siteOf(cx, cy).z - home.z)));
    let witchFar = 0;
    let firstKo = null, koWave = null, kos = 0, wasKo = false, firstLost = null, lostWave = null, hits = 0, placed = 0;
    const invited = new Set(); // (made happy by her 💌s; tally.invites counts only talk and pickups)
    for (let step = 0; step * dt < time; step++) {
      const controls = brain.decide(g);
      stepGame(g, controls, dt);
      const now = g.clock.time;
      if (w.ko && !wasKo) { kos++; if (firstKo === null) { firstKo = now; koWave = g.party.wave; } }
      wasKo = !!w.ko;
      for (const e of w.invites.events) if (e.kind === "hit") hits++; else if (e.kind === "happy") invited.add(e.id);
      for (const e of w.leash.events) if (e.kind === "placed") placed++;
      if (firstLost === null && step % 30 === 0 && [...g.combat.sounds.values()].some(h => h.hp <= 0)) { firstLost = now; lostWave = g.party.wave; }
      if (step % 30 === 0) witchFar = Math.max(witchFar, Math.hypot(w.body.x - home.x, w.body.z - home.z));
      if (g.partyOver) break;
    }
    // How far the party got: the areas woken (home aside), the farthest of them from home (m, and as remoteness: 0 home, 1 the playable edge).
    const woken = [...g.party.areas.values()].filter(a => a.wave > 0), far = woken.map(a => { const s = M.siteOf(a.cell[0], a.cell[1]); return Math.hypot(s.x - home.x, s.z - home.z); });
    const L = g.creatures.filter(c => c.boss), lost = [...g.combat.sounds.values()].filter(h => h.hp <= 0).length;
    return {
      bot, seed, end: g.clock.time, over: g.partyOver?.at ?? null, wave: g.party.wave, firstLost, lostWave, firstKo, koWave, kos, lost,
      standing: g.combat.sounds.size - lost, letters: w.invites.next, hits, invites: invited.size, pickups: g.tally.invites, evolved: g.tally.evolved, berries: g.tally.berries,
      quests: brain.done.quests.length, relics: brain.done.relics.length, placed, posse: w.leash.stack.length + w.leash.placed.length,
      angry: L.filter(c => c.legendState === "angry").length, happy: L.filter(c => c.legendState === "happy").length, areas: M.cells.length, woken: woken.length, wokenFar: Math.max(0, ...far), wokenRemote: Math.max(0, ...woken.map(a => M.remoteness(a.cell[0], a.cell[1]))),
      witchFar, witchRemote: witchFar / R, secs: (Date.now() - T0) / 1000,
    };
  }
  process.on("message", async m => {
    if (m === "done") { await close(); process.exit(0); }
    process.send(run(m.bot, m.seed));
  });
  process.send("ready");
} else {
  const say = s => console.log(s);
  const csvOf = rows => [COLS.join(","), ...rows.map(r => COLS.map(c => (r[c] === null || r[c] === undefined ? "" : typeof r[c] === "number" ? +r[c].toFixed(2) : String(r[c]).replace(/,/g, ";"))).join(","))].join("\n") + "\n";
  const readCsv = f => { const [h, ...ls] = readFileSync(f, "utf8").trim().split("\n"), cs = h.split(","); return ls.map(l => Object.fromEntries(l.split(",").map((v, i) => [cs[i], v === "" ? null : Number.isNaN(+v) ? v : +v]))); };

  /** The summary of one sweep's rows: a table by bot, and the survival curve. */
  function summary(rows, title) {
    const out = [], o = s => out.push(s), m = s => (s === null || s === undefined ? "–" : (s / 60).toFixed(1));
    const BOTS = [...new Set(rows.map(r => r.bot))];
    o(`### ${title}\n`);
    o(`${rows.length / BOTS.length} seeds a bot, up to ${m(Math.max(...rows.map(r => r.end)))} min from her first step. Waves land every 5 min after the 5 min boot, unless the overlay says otherwise. Medians, [10th–90th percentile] where it helps; "never" counts runs where it didn't happen.\n`);
    o("| bot | waves reached | party over | 1st soundsystem lost (min / wave) | 1st knockdown (min / wave) | knockdowns | 💌 thrown | 💌 hits | invites | evolutions | berries | quests | relics | sigils placed | posse at end | angry legends |");
    o("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|");
    const q = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : null; };
    for (const b of BOTS) {
      const rs = rows.filter(r => r.bot === b), n = rs.length;
      const when = (k, wk) => { const xs = rs.filter(r => r[k] !== null); return xs.length ? `${m(median(xs.map(r => r[k])))} / w${median(xs.map(r => r[wk]))}${xs.length < n ? ` (${n - xs.length} never)` : ""}` : "never"; };
      const md = k => { const xs = rs.map(r => r[k]); return `${+median(xs).toFixed(1)}`; };
      const ov = rs.filter(r => r.over !== null);
      o(`| ${b} | ${md("wave")} [${q(rs.map(r => r.wave), 0.1)}–${q(rs.map(r => r.wave), 0.9)}] | ${ov.length}/${n}${ov.length ? ` (median ${m(median(ov.map(r => r.over)))} min)` : ""} | ${when("firstLost", "lostWave")} | ${when("firstKo", "koWave")} | ${md("kos")} | ${md("letters")} | ${md("hits")} | ${md("invites")} | ${md("evolved")} | ${md("berries")} | ${+mean(rs.map(r => r.quests)).toFixed(1)} | ${+mean(rs.map(r => r.relics)).toFixed(1)} | ${md("placed")} | ${md("posse")} | ${+mean(rs.map(r => r.angry)).toFixed(1)} |`);
    }
    // How far the party got (Ed, 2026-10-07: a smaller map?): waves, minutes, areas woken, the farthest woken area and her farthest flight (remoteness: 0 home, 1 the playable edge).
    const pp = (k, f = x => x) => { const xs = rs => rs.map(r => r[k]).filter(x => x !== null && x !== undefined); return b => { const v = xs(rows.filter(r => r.bot === b)); return v.length ? `${f(median(v))} / ${f(q(v, 0.9))}` : "–"; }; };
    if (rows[0]?.woken !== undefined) {
      o(`\n**How far the party got** (median / 90th percentile; ${rows[0].areas} playable areas on the first seed's map)\n`);
      o("| bot | waves | game min | areas woken | farthest woken area (m) | its remoteness | her farthest (m) | its remoteness |");
      o("|---|---|---|---|---|---|---|---|");
      const r2 = x => +x.toFixed(2), r0 = x => Math.round(x);
      for (const b of BOTS) o(`| ${b} | ${pp("wave")(b)} | ${pp("end", x => +(x / 60).toFixed(1))(b)} | ${pp("woken")(b)} | ${pp("wokenFar", r0)(b)} | ${pp("wokenRemote", r2)(b)} | ${pp("witchFar", r0)(b)} | ${pp("witchRemote", r2)(b)} |`);
    }
    // The curve: as each wave lands, the share of runs whose party's still on (a run cut off by --time before that wave counts as unknown).
    const W = Math.max(...rows.map(r => r.wave));
    o(`\n**Still partying as wave W lands** (% of runs; – where the time limit cut every run short first)\n`);
    o("| bot | " + Array.from({ length: W }, (_, i) => `w${i + 1}`).join(" | ") + " |");
    o("|---|" + Array.from({ length: W }, () => "---").join("|") + "|");
    for (const b of BOTS) {
      const rs = rows.filter(r => r.bot === b);
      o(`| ${b} | ` + Array.from({ length: W }, (_, i) => {
        const known = rs.filter(r => r.wave >= i + 1 || r.over !== null);
        return known.length ? `${Math.round((100 * known.filter(r => r.wave >= i + 1).length) / known.length)}` : "–";
      }).join(" | ") + " |");
    }
    o(`\n**First soundsystem lost, by wave** (runs whose first loss came in that wave's 5 minutes)\n`);
    o("| bot | " + Array.from({ length: W + 1 }, (_, i) => (i ? `w${i}` : "boot")).join(" | ") + " | never |");
    o("|---|" + Array.from({ length: W + 2 }, () => "---").join("|") + "|");
    for (const b of BOTS) {
      const rs = rows.filter(r => r.bot === b);
      o(`| ${b} | ` + Array.from({ length: W + 1 }, (_, i) => rs.filter(r => r.lostWave === i).length || "").join(" | ") + ` | ${rs.filter(r => r.firstLost === null).length} |`);
    }
    return out.join("\n");
  }

  if (arg("report")) {
    for (const f of list(arg("report"))) say(summary(readCsv(f), basename(f, ".csv")) + "\n");
  } else {
    const BOTS = list(arg("bots", "idle,novice,crude,skilled,top")), SEEDS = +arg("seeds", 20), SKIP = +arg("skip", 0), TIME = +arg("time", 4200), JOBS = +arg("jobs", 4);
    const file = arg("overlay", ""), raw = file ? JSON.parse(readFileSync(file, "utf8")) : {};
    const overlay = raw.tuning || raw.combat ? raw : { tuning: raw };
    const sets = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), JSON.parse(v)]; });
    const label = String(arg("label", file ? basename(file, ".json") : "baseline")), out = String(arg("out", "previews/sweeps"));
    mkdirSync(out, { recursive: true });
    const jobs = BOTS.flatMap(bot => Array.from({ length: SEEDS - SKIP }, (_, i) => ({ bot, seed: 1000 + (SKIP + i) * 7919 })));
    // Longest first (the strong bots' runs last longest), so the workers finish together.
    const weight = b => (b.startsWith("top") ? 4 : b.startsWith("skilled") ? 3 : b === "crude" ? 2 : 1);
    jobs.sort((a, b) => weight(b.bot) - weight(a.bot));
    const rows = [], T0 = Date.now(), me = fileURLToPath(import.meta.url);
    await Promise.all(Array.from({ length: Math.min(JOBS, jobs.length) }, () => new Promise((done, fail) => {
      const p = fork(me, ["--worker"], { env: { ...process.env, SWEEP: JSON.stringify({ overlay, time: TIME, sets }) } });
      const next = () => { const j = jobs.shift(); if (j) p.send(j); else p.send("done"); };
      p.on("message", m => {
        if (m !== "ready") {
          rows.push({ ...m, label });
          process.stderr.write(`[${rows.length}] ${m.bot} ${m.seed}: wave ${m.wave}${m.over !== null ? `, over at ${(m.over / 60).toFixed(1)} min` : ""}, 1st lost ${m.firstLost === null ? "–" : `w${m.lostWave}`}, KOs ${m.kos}, 💌 ${m.letters}, invites ${m.invites}, evolved ${m.evolved} (${m.secs.toFixed(0)} s)\n`);
        }
        next();
      });
      p.on("exit", c => (c ? fail(new Error(`worker exited ${c}`)) : done()));
    })));
    rows.sort((a, b) => BOTS.indexOf(a.bot) - BOTS.indexOf(b.bot) || a.seed - b.seed);
    writeFileSync(join(out, `${label}.csv`), csvOf(rows));
    const md = summary(rows, `${label}${sets.length ? ` (${sets.map(([k, v]) => `${k.join(".")}=${JSON.stringify(v)}`).join("; ")})` : ""}`);
    writeFileSync(join(out, `${label}.md`), md + "\n");
    say(md);
    process.stderr.write(`${rows.length} runs in ${((Date.now() - T0) / 60000).toFixed(1)} min: ${join(out, label)}.csv / .md\n`);
  }
}
