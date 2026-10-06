// Full runs (the overnight balance mandate, 2026-10-06): a bot plays the real rules headless
// (src/rules/game.ts, waves on, the boot-up from her first step) for the first --time seconds of a
// run, and we read off what a playtester would feel: when she's first knocked out, how much of each
// woken area she'd invited before its wave, how many legends are angry, and how the run ends.
//   skilled: recruits carefully (never empties an area of its own kind, so no legend grows
//     restless), does a legend's quest when she carries the creature it dreams of, heads for the
//     next wave's soundsystem before it lands and parks some of her posse there as guards, kites
//     fighters, and rises to the treetops to heal at her last hit;
//   idle: stands at home all run (the sieges alone, for comparing rules changes seed by seed);
//   hover: idle, but over the treetops (nothing can go for her);
//   crude: invites everything in the nearest wild area, area after area, and never parks, defends
//     or heals.
// The bot flies between areas over the treetops and fights on the ground, as a player does.
// WHO=1 in the environment logs every hit she takes: who was close and coming for her, and the angry legends.
//   node tools/balance/runbot.mjs [--seeds 3 (seeds 0 to N-1; --skip K starts at K)] [--bots skilled,crude] [--time 1800] [--happy N (the N legends nearest home happy from the start)] [--calm (no legend ever turns angry)] [--quests (the skilled bot fetches what sleeping legends dream of)] [--relics (and picks up relics for them)] [--relic-policy nearest|home|front|far (which sleeping legend gets each relic)] [--quest-max N (at most N quests, then she plays on as usual)] [--feed (the skilled bot leads her babies and young to berry patches)] [--guards 3 --keep 2 (the skilled bot parks up to G at the next soundsystem, keeping K)] [--set path=value;...] [--json out.json] | --report a.json,b.json
import { readFileSync, writeFileSync } from "node:fs";
import { arg, list, mean, median, openRules } from "./lib.mjs";

const say = s => console.log(s);
let rows;
if (arg("report")) rows = list(arg("report")).flatMap(f => JSON.parse(readFileSync(f, "utf8")));
else {
  const SEEDS = +arg("seeds", 3), SKIP = +arg("skip", 0), HAPPY = +arg("happy", 0), GUARDS = +arg("guards", 3), KEEP = +arg("keep", 2), FEED = process.argv.includes("--feed"), QUESTS = process.argv.includes("--quests"), RELICS = process.argv.includes("--relics"), RELIC_POLICY = String(arg("relic-policy", "nearest")), QUEST_MAX = +arg("quest-max", Infinity), BOTS = list(arg("bots", "skilled,crude")), TIME = +arg("time", 1800);
  const SETS = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), JSON.parse(v)]; });
  const { load, close } = await openRules();
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { cellKey } = await load("/src/rules/party.ts");
  const { newBot } = await load("/src/rules/bot.ts");
  const { cheer, LEGENDS } = await load("/src/rules/legends.ts");
  if (process.argv.includes("--calm")) LEGENDS.angryAfter = 1e9; // (--calm: no legend ever turns angry, to see what their rage does)
  const { powerReport } = await load("/src/rules/power.ts");

  function over() {
    const o = {};
    for (const [path, v] of SETS) { let a = o, src = TUNING; for (const k of path.slice(0, -1)) { src = src[k]; a = a[k] ??= { ...src }; } a[path[path.length - 1]] = v; }
    if (process.argv.includes("--calm")) { o.legends ??= { ...TUNING.legends }; o.legends.stomp = { ...(o.legends.stomp ?? TUNING.legends.stomp), angryAfter: 1e9 }; } // (--calm with the stomp on too)
    return o;
  }

  function run(seed, bot) {
    const t = withTuning(over()), g = newGame(seed, t), w = g.witches[0], dt = 1 / 60;
    g.clock.paused = false;
    w.body = { ...w.body, seated: false }; // (her first step: the boot-up runs from here)
    // --happy N: the N legends nearest home happy from the start (their buffs on), to see what the buffs do.
    for (const c of g.creatures.filter(c => c.boss).sort((a, b) => Math.hypot(a.x - g.map.dancefloor.x, a.z - g.map.dancefloor.z) - Math.hypot(b.x - g.map.dancefloor.x, b.z - g.map.dancefloor.z)).slice(0, HAPPY)) cheer(c, 0);
    const map = g.map;
    const legendOf = new Map(g.creatures.filter(c => c.boss).map(c => [cellKey(c.cell), c.id]));
    const origin = new Map(); // invited id -> the key of the area it came from
    const waves = [];
    let firstKo = null, kos = 0, wasKo = false;
    const T0 = Date.now(), angryAt = [], restlessAt = [], restWas = new Map(), ruinedAt = new Map(), babiesDown = []; let babyHits = 0;
    // The bot itself (src/rules/bot.ts, shared with the game's bot game): the controls a player would give, step by step.
    const brain = newBot(bot, { guards: GUARDS, keep: KEEP, feed: FEED, quests: QUESTS, relics: RELICS, relicPolicy: RELIC_POLICY, questMax: QUEST_MAX });

    for (let step = 0; step * dt < TIME; step++) {
      if (w.ko) wasKo = true;
      const controls = brain.decide(g);
      const before = g.party.wave, hp0 = w.health.hp, time = g.clock.time;
      stepGame(g, controls, dt);
      for (const e of w.invites.events) if (e.kind === "happy" && !origin.has(e.id)) origin.set(e.id, cellKey(g.creatures[e.id].cell));
      // A woken area's wild babies hurt (struck, or knocked down) while its siege is on (Ed's "their babies get hurt during sieges").
      for (const e of g.combat.events) if ((e.kind === "hit" || e.kind === "dazed") && e.id !== undefined) { const c = g.creatures[e.id]; if (c && c.level === 0 && !c.boss && !c.leashed && g.party.areas.has(cellKey(c.cell))) { if (e.kind === "hit") babyHits++; else babiesDown.push({ at: g.clock.time, wave: g.party.wave, key: cellKey(c.cell) }); } }
      if (process.env.WHO && w.health.hp < hp0) {
        const near = g.creatures.filter(c => !c.gone && !c.leashed && Math.hypot(c.x - w.body.x, c.z - w.body.z) < 40 && (c.fight?.target?.kind === "witch")).map(c => `${c.boss ? "LEGEND " : ""}${c.species}${c.level}${c.enraged ? "!" : ""}@${Math.round(Math.hypot(c.x - w.body.x, c.z - w.body.z))}`);
        const legs = g.creatures.filter(c => c.boss && c.legendState === "angry").map(c => `${c.species}@${Math.round(Math.hypot(c.x - w.body.x, c.z - w.body.z))}`);
        const hd = Math.hypot(w.body.x - map.dancefloor.x, w.body.z - map.dancefloor.z);
        process.stderr.write(`  hit t${(time / 60).toFixed(2)} hp${w.health.hp} ${w.body.mode} home@${Math.round(hd)} near[${near.join(" ")}] angry[${legs.join(" ")}]\n`);
      }
      if (wasKo && !w.ko) { kos++; wasKo = false; if (firstKo === null) firstKo = time; }
      if (w.ko && firstKo === null) firstKo = time;
      if (g.party.wave > before) {
        // The areas this wave woke: how much of each she'd invited before it came.
        for (const [key, a] of g.party.areas) if (a.wave === g.party.wave) {
          const wild = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && cellKey(c.cell) === key).length;
          const got = [...origin.values()].filter(k => k === key).length, L = legendOf.get(key);
          const P = powerReport(g.creatures, g.witches, g.combat.sounds);
          waves.push({ wave: g.party.wave, at: g.clock.time, cell: a.cell, key, wild, got, partyF: P.leashed + P.parked, siegeF: P.sieges.reduce((x, y) => x + y.value, 0), marching: P.marching, share: wild + got ? got / (wild + got) : NaN, friendly: g.friendly.has(key), legend: L !== undefined ? g.creatures[L].legendState : null });
        }
      }
      // When each legend turns restless (its area emptied of its kind) and angry, and whether its area's wave had come (a siege's doing, or hers before it).
      if (step % 60 === 0) for (const k of g.party.ruined ?? []) if (!ruinedAt.has(k)) ruinedAt.set(k, g.clock.time);
      if (step % 60 === 0) for (const id of legendOf.values()) {
        const c = g.creatures[id], key = cellKey(c.cell), woken = g.party.areas.has(key);
        if (c.legendState === "restless" && !(restWas.get(id))) restlessAt.push({ id, at: g.clock.time, wave: g.party.wave, woken });
        restWas.set(id, c.legendState === "restless");
        if (c.legendState === "angry" && !angryAt.some(a => a.id === id)) angryAt.push({ id, at: g.clock.time, wave: g.party.wave, woken, ruinedAt: ruinedAt.get(key) ?? null });
      }
      if (g.over) break;
    }
    const L = [...legendOf.values()].map(id => g.creatures[id]);
    const standing = [...g.combat.sounds.values()].filter(h => h.hp > 0).length;
    return {
      seed, bot, set: [...SETS.map(([k, v]) => `${k.join(".")}=${JSON.stringify(v)}`), ...(HAPPY ? [`happy=${HAPPY}`] : []), ...(GUARDS !== 3 || KEEP !== 2 ? [`guards=${GUARDS},keep=${KEEP}`] : []), ...(FEED ? ["feed"] : []), ...(process.argv.includes("--calm") ? ["calm"] : []), ...(QUESTS ? [QUEST_MAX < Infinity ? `quests<=${QUEST_MAX}` : "quests"] : []), ...(RELICS ? [`relics:${RELIC_POLICY}`] : [])].join(";"), end: g.clock.time, over: g.over?.at ?? null, wave: g.party.wave,
      firstKo, kos, invited: origin.size, posse: w.leash.stack.length, parked: w.leash.placed.length,
      angry: L.filter(c => c.legendState === "angry").length, happy: L.filter(c => c.legendState === "happy").length, quests: g.friendly.size,
      standing, ruined: g.party.ruined?.size ?? 0, angryAt, restlessAt, ruinedAt: [...ruinedAt].map(([key, at]) => ({ key, at, legend: legendOf.has(key) })), legends: legendOf.size, babyHits, babiesDown, questsDone: brain.done.quests, relicsPlaced: brain.done.relics, buffsAt: [...brain.done.quests, ...brain.done.relics].map(x => x.at).sort((a, b) => a - b), waves, tally: { ...g.tally }, levels: [0, 1, 2, 3].map(l => [...w.leash.stack, ...w.leash.placed.map(p => p.id)].filter(id => !g.creatures[id].gone && g.creatures[id].level === l).length), secs: (Date.now() - T0) / 1000,
    };
  }

  rows = [];
  for (const bot of BOTS) for (let i = SKIP; i < SEEDS; i++) {
    const r = run(1000 + i * 7919, bot);
    rows.push(r);
    process.stderr.write(`${bot} ${r.seed}${r.set ? ` [${r.set}]` : ""}: ${r.over !== null ? `over at ${(r.over / 60).toFixed(1)} min` : `standing ${r.standing}`}, wave ${r.wave}, first KO ${r.firstKo === null ? "none" : `${(r.firstKo / 60).toFixed(1)} min`}, ${r.kos} KOs, invited ${r.invited} (levels ${r.levels.join('/')}, evolved ${r.tally.evolved}, berries ${r.tally.berries}), angry ${r.angry}, quests ${r.quests}, ruined ${r.ruined} (${r.secs.toFixed(0)} s)\n`);
  }
  await close();
  if (arg("json")) { writeFileSync(arg("json"), JSON.stringify(rows)); process.exit(0); }
}

const BOTS = [...new Set(rows.map(r => r.bot))], SET = rows[0]?.set;
const min = s => (s === null || Number.isNaN(s) ? "–" : `${(s / 60).toFixed(1)}`);
say(`Full runs (the real rules, headless${SET ? `; ${SET}` : ""}): ${rows.length / BOTS.length} seeds a bot, the first ${min(Math.max(...rows.map(r => r.end)))} minutes from her first step.\n`);
say("| bot | first knockout (min, median) | knockouts | invited | posse (stack + parked) | legends angry | quests done | waves | soundsystems standing / ruined | runs over (at, min) |");
say("|---|---|---|---|---|---|---|---|---|---|");
for (const b of BOTS) {
  const rs = rows.filter(r => r.bot === b), ko = rs.map(r => r.firstKo).filter(x => x !== null), ov = rs.filter(r => r.over !== null);
  say(`| ${b} | ${ko.length ? min(median(ko)) : "none"}${ko.length < rs.length ? ` (${rs.length - ko.length} of ${rs.length} never)` : ""} | ${mean(rs.map(r => r.kos)).toFixed(1)} | ${mean(rs.map(r => r.invited)).toFixed(1)} | ${mean(rs.map(r => r.posse)).toFixed(1)} + ${mean(rs.map(r => r.parked)).toFixed(1)} | ${mean(rs.map(r => r.angry)).toFixed(1)} | ${mean(rs.map(r => r.quests)).toFixed(1)} | ${mean(rs.map(r => r.wave)).toFixed(1)} | ${mean(rs.map(r => r.standing)).toFixed(1)} / ${mean(rs.map(r => r.ruined)).toFixed(1)} | ${ov.length} of ${rs.length}${ov.length ? ` (${ov.map(r => min(r.over)).join(", ")})` : ""} |`);
}
say("\n**Each wave's woken area: the share of its creatures she'd invited before it came, and how it woke (friendly: its quest done)**\n");
const W = Math.max(0, ...rows.flatMap(r => r.waves.map(x => x.wave)));
say("| bot | " + Array.from({ length: W }, (_, i) => `wave ${i + 1}`).join(" | ") + " |");
say("|---|" + Array.from({ length: W }, () => "---").join("|") + "|");
for (const b of BOTS) {
  const rs = rows.filter(r => r.bot === b);
  say(`| ${b} | ` + Array.from({ length: W }, (_, i) => {
    const ws = rs.flatMap(r => r.waves.filter(x => x.wave === i + 1));
    if (!ws.length) return "–";
    const sh = ws.map(x => x.share).filter(x => !Number.isNaN(x));
    return `${sh.length ? Math.round(mean(sh) * 100) : "–"}%, ${ws.filter(x => x.friendly).length}/${ws.length} friendly`;
  }).join(" | ") + " |");
}
