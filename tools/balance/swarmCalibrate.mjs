// Swarm calibration (Ed, 2026-10-08: "estimated power" is the numbers we pick; "simulated power" is what actual swarms do
// when they fight and fell soundsystems). Headless, on the real rules (rules/game.ts stepGame, combat.ts): one enraged swarm
// of a species, N creatures at a share y of young (the rest adults), set off D metres from a lone soundsystem; once with no
// one defending it, once against a standard defence (parked party animals at its stone). It times the setting off, the first
// hit and the fall, and counts who's left. Then every swarm's defended time is read back through a fit of time against
// estimated power over the whole grid: its simulated power is the estimated power an average swarm would need to fell the
// defended soundsystem as fast. Writes config/swarm-power.json (the swarm builder's calibration table) and a report.
//   npm run swarm-calibrate [-- --species wolf,bat] [--seeds 3] [--jobs 4] [--hp 500] [--limit 600] [--out config/swarm-power.json]
// The witch stays at her decks (untouchable, no waves come); every other creature is sent off the map first.
import { fork } from "node:child_process";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { arg, list, median, openRules } from "./lib.mjs";

const HERE = fileURLToPath(import.meta.url);
const DEFENCE = "wolf@1,fox@1,boar@1,owl@2,badger@2,stag@2";
const SHARES = [0, 0.25, 0.5, 0.75, 1];

// ---- a worker: runs scenarios and sends each result back ----
if (process.argv[2] === "--worker") {
  const { hp, limit, distance } = JSON.parse(process.env.SWARM);
  const { load, close } = await openRules();
  const { TUNING } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { speedFactor, wanderRange, LEGEND } = await load("/src/rules/creatures.ts");
  const { routeOf, soundsystemFor } = await load("/src/rules/party.ts");
  const { creatureValue } = await load("/src/rules/power.ts");
  const T = structuredClone(TUNING); T.combat = { ...T.combat, soundsystemHealth: hp };
  const STILL = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  const parse = spec => spec.split(",").map(p => { const [sp, l] = p.split("@"); return { species: sp, level: +(l ?? 1) }; });
  const run = ({ seed, species, n, young, defended }) => {
    const g = newGame(seed, T), w = g.witches[0], t = g.tuning, time0 = g.clock.time;
    g.clock.paused = false; g.party.nextAt = Infinity;
    // Everyone else asleep where they stand: still holding their areas (rules/clear.ts: a cleared one transforms at once), out of every fight.
    for (const c of g.creatures) c.asleep = true;
    // The soundsystem: at the stone of the first area on the waves' route.
    const cell = routeOf(g.map).order[0].split(",").map(Number), key = `${cell[0]},${cell[1]}`, ss = soundsystemFor(g.map, cell);
    g.combat.sounds.clear(); // (besiegers go for the nearest soundsystem: only ours, home's ring out of it)
    g.combat.sounds.set(key, { hp, max: hp, x: ss.x, z: ss.z, radius: t.combat.soundsystemRadius });
    // Borrowed from far off (over 400 m), so the area they leave, if it clears and transforms, is far from ours.
    const spare = g.creatures.filter(c => !c.boss && Math.hypot(c.x - ss.x, c.z - ss.z) > 400); let next = 0; const take = () => spare[next++];
    const ready = (c, sp, level, x, z) => Object.assign(c, {
      circle: undefined, species: sp, level, x, z, tx: x, tz: z, cell, homeX: ss.x, homeZ: ss.z, anchorX: x, anchorZ: z, range: wanderRange(g.map),
      speed: (level === LEGEND ? t.legendSpeed : t.creatureSpeed * speedFactor(sp, level, t)) * (0.85 + c.rand() * 0.3),
      gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, rest: 2, fight: undefined, fleeUntil: undefined,
      wanderTo: undefined, sprung: undefined, charge: undefined, vx: 0, vz: 0, dazed: undefined, asleep: false, napUntil: undefined, friendly: undefined,
      hunting: undefined, watchUntil: undefined, legendState: undefined, quest: undefined, leashed: false, state: undefined, retreat: undefined,
    });
    // The swarm: set off `distance` m from the stone, on a bearing from the seed, in a loose block.
    // (on the far side of the stone from home, as an area's own creatures come in from its woods, turned by up to 25° by the seed)
    const hx = ss.x - g.map.dancefloor.x, hz = ss.z - g.map.dancefloor.z, a = Math.atan2(hz, hx) + ((seed % 51) - 25) * Math.PI / 180;
    const ox = ss.x + Math.cos(a) * distance, oz = ss.z + Math.sin(a) * distance, swarm = [];
    for (let i = 0; i < n; i++) {
      const c = take(), x = ox + ((i % 4) - 1.5) * 4, z = oz + Math.floor(i / 4) * 4;
      ready(c, species, i < young ? 1 : 2, x, z); c.siege = key; c.enraged = true; swarm.push(c);
    }
    // The defence: parked party animals round the stone.
    const defenders = [];
    if (defended) parse(DEFENCE).forEach((d, i, all) => {
      const c = take(), b = (i / all.length) * Math.PI * 2, x = ss.x + Math.cos(b) * 8, z = ss.z + Math.sin(b) * 8;
      ready(c, d.species, d.level, x, z); c.leashed = true; w.leash.placed.push({ id: c.id, x, z, at: g.clock.time }); defenders.push(c);
    });
    g.byArea = null; g.legendIds = undefined;
    for (const c of [...swarm, ...defenders]) g.combat.busy.add(c.id); // (as a wave's besiege does: stepped wherever she is)
    const up = c => !c.gone && !c.fleeUntil && !c.dazed && (c.hp ?? 1) > 0, F = l => l.filter(up).reduce((s, c) => s + creatureValue(c), 0);
    const Fs0 = F(swarm), Fd0 = F(defenders);
    let hit = null, fell = null;
    const STEP = 1 / 60;
    for (let s = 0; s * STEP < limit; s++) {
      stepGame(g, STILL, STEP);
      for (const k of g.combat.sounds.keys()) if (k !== key) g.combat.sounds.delete(k); // (only ours stands: the rules give every partified area one)
      const h = g.combat.sounds.get(key), now = g.clock.time - time0;
      if (process.env.SWARM_DEBUG && s % 1800 === 0) { const c = swarm[0]; console.error(now.toFixed(0), "d", Math.hypot(c.x - ss.x, c.z - ss.z).toFixed(1), "siege", c.siege, "enr", c.enraged, "fight", JSON.stringify(c.fight?.target), "lod", c.lod, "hp", h?.hp, "keys", [...g.combat.sounds.keys()].join("|"), "cell", c.cell.join(","), "here", g.map.cellSafe(c.x, c.z).cell.join(","), "wit", g.witches[0].body.x.toFixed(0)); }
      if (hit === null && h.hp < hp) hit = now;
      if (h.hp <= 0) { fell = now; break; }
      if (s % 60 === 0 && !swarm.some(up)) break; // (the swarm is beaten)
    }
    const Fs1 = F(swarm), Fd1 = F(defenders.filter(c => c.leashed));
    // Lanchester's square law: F_swarm² − F_defence² holds through the fight, so the swarm's effective fighting value is
    // what the exchange says it was: √(Fd0² − Fd1² + Fs1²).
    const effective = Math.sqrt(Math.max(0, Fd0 * Fd0 - Fd1 * Fd1 + Fs1 * Fs1));
    return { seed, species, n, young, defended, hit, fell, end: g.clock.time - time0, swarmLeft: swarm.filter(up).length, defendersLeft: defenders.filter(c => up(c) && c.leashed).length, Fs0, Fs1, Fd0, Fd1, effective };
  };
  process.on("message", m => { if (m === "done") { close().then(() => process.exit(0)); return; } process.send(run(m)); });
  process.send("ready");
} else {
  // ---- the conductor ----
  const ROOT = process.cwd(), OUT = arg("out", "config/swarm-power.json"), HP = +arg("hp", 500), LIMIT = +arg("limit", 600), DIST = +arg("distance", 120);
  const SEEDS = +arg("seeds", 3), JOBS = +arg("jobs", 4), KEPT = arg("kept", "previews/swarm-calibrate.jsonl");
  const { load, close } = await openRules();
  const { AREA_TYPES } = await load("/src/rules/map.ts");
  const { levelValue } = await load("/src/rules/power.ts");
  const { countScale } = await load("/src/rules/growth.ts");
  await close();
  const all = [...new Set(AREA_TYPES.map(a => a.creature))].sort();
  const SPECIES = arg("species", "") ? list(arg("species", "")) : all;
  const capOf = sp => Math.max(3, Math.min(20, Math.round(6 * countScale(sp))));
  const sizesOf = cap => [...new Set([1, 2, 3, Math.round(cap / 2), cap].filter(x => x >= 1 && x <= cap))].sort((a, b) => a - b);
  const est = (n, young) => young * levelValue(1) + (n - young) * levelValue(2);
  const jobs = [];
  const seen = new Set();
  for (const sp of SPECIES) for (const n of sizesOf(capOf(sp))) for (const y of SHARES) {
    const young = Math.round(n * y);
    if (seen.has(`${sp}|${n}|${young}`)) continue; seen.add(`${sp}|${n}|${young}`);
    for (let k = 0; k < SEEDS; k++) for (const defended of [false, true]) jobs.push({ seed: 1000 + 7919 * k, species: sp, n, young, y, defended });
  }
  mkdirSync(dirname(KEPT), { recursive: true });
  const id = j => `${j.species}|${j.n}|${j.young}|${j.seed}|${j.defended}`, done = new Map();
  if (existsSync(KEPT)) for (const l of readFileSync(KEPT, "utf8").split("\n")) if (l) { const r = JSON.parse(l); done.set(id(r), r); }
  const todo = jobs.filter(j => !done.has(id(j)));
  console.log(`${SPECIES.length} species, ${jobs.length} scenarios (${todo.length} to run), hp ${HP}, ${JOBS} workers`);
  const T0 = Date.now();
  await new Promise(res => {
    let live = 0, i = 0, n = 0; if (!todo.length) return res();
    for (let k = 0; k < Math.min(JOBS, todo.length); k++) {
      const w = fork(HERE, ["--worker"], { cwd: ROOT, env: { ...process.env, SWARM: JSON.stringify({ hp: HP, limit: LIMIT, distance: DIST }) } }); live++;
      const feed = () => { if (i < todo.length) w.send(todo[i++]); else w.send("done"); };
      w.on("message", m => { if (m !== "ready") { const r = { ...m, y: todo.find(j => id(j) === id(m))?.y }; done.set(id(r), r); appendFileSync(KEPT, JSON.stringify(r) + "\n"); if (++n % 50 === 0) console.log(`${n}/${todo.length} (${((Date.now() - T0) / 60000).toFixed(1)} min)`); } feed(); });
      w.on("exit", () => { if (--live === 0) res(); });
    }
  });
  // ---- the table ----
  const rows = jobs.map(j => done.get(id(j))).filter(Boolean);
  const table = { _: `npm run swarm-calibrate: each species' enraged swarm (N creatures, a share of young, the rest adults) set off ${DIST} m from a lone ${HP} hp soundsystem, ${SEEDS} seeds each, ${LIMIT} s at most. simulated[size][young]: its effective fighting value against the standard defence (${DEFENCE}, parked at its stone; F ${(3 * levelValue(1) + 3 * levelValue(2)).toFixed(0)}), by Lanchester's square law from what each side had left: sqrt(Fdefence0^2 - Fdefence1^2 + Fswarm1^2), in the same units as estimated (sum of levelValue: young ${levelValue(1).toFixed(1)}, adult ${levelValue(2).toFixed(1)}), so simulated / estimated above 1 punches above its numbers. siegeSec: the undefended soundsystem's first hit to its fall (null: it held ${LIMIT} s); fallSec: setting off to the fall; swarmLeft: the share of the swarm still up after the defended fight.`,
    rules: (() => { try { return execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim(); } catch { return null; } })(),
    soundsystemHealth: HP, defence: DEFENCE, distance: DIST, seeds: SEEDS, youngShares: SHARES, species: {} };
  const r1 = x => x == null ? null : Math.round(x * 10) / 10;
  for (const sp of SPECIES) {
    const cap = capOf(sp), sizes = sizesOf(cap), E = { cap, sizes, simulated: [], spread: [], estimated: [], siegeSec: [], fallSec: [], swarmLeft: [] };
    for (const n of sizes) {
      const sim = [], spr = [], es = [], ss = [], fs = [], left = [];
      for (const y of SHARES) {
        const young = Math.round(n * y), mine = rows.filter(r => r.species === sp && r.n === n && r.young === young);
        const def = mine.filter(r => r.defended), und = mine.filter(r => !r.defended), p = def.map(r => r.effective);
        sim.push(r1(median(p))); spr.push(p.length ? [r1(Math.min(...p)), r1(Math.max(...p))] : null); es.push(r1(est(n, young)));
        const fell = und.filter(r => r.fell != null);
        ss.push(fell.length * 2 > und.length ? r1(median(fell.map(r => r.fell - r.hit))) : null);
        fs.push(fell.length * 2 > und.length ? r1(median(fell.map(r => r.fell))) : null);
        left.push(r1(median(def.map(r => r.swarmLeft / n))));
      }
      E.simulated.push(sim); E.spread.push(spr); E.estimated.push(es); E.siegeSec.push(ss); E.fallSec.push(fs); E.swarmLeft.push(left);
    }
    table.species[sp] = E;
  }
  writeFileSync(OUT, JSON.stringify(table, null, 1) + "\n");
  // ---- the report: where simulated departs most from estimated ----
  const ratios = [];
  for (const [sp, E] of Object.entries(table.species)) {
    const rs = E.simulated.flat().map((s, i) => s && E.estimated.flat()[i] ? s / E.estimated.flat()[i] : null).filter(x => x != null);
    ratios.push({ sp, ratio: median(rs), cap: E.cap });
  }
  ratios.sort((a, b) => b.ratio - a.ratio);
  console.log(`\nwrote ${OUT} (${rows.length} runs, ${((Date.now() - T0) / 60000).toFixed(1)} min)\n\n| species | cap | simulated ÷ estimated (median) |\n|---|---|---|`);
  for (const r of ratios) console.log(`| ${r.sp} | ${r.cap} | ${r.ratio?.toFixed(2)} |`);
}
