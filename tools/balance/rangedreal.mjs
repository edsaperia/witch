// Do creatures' ranged attacks hit her in the real game? The whole game through stepGame, one or three of a kind placed
// 25–33 m from her in a wild area, a bot moving her (still, across, away, zig-zag); counts the casts and old pack shots
// aimed at her and the ones that hit (from observeAttacks). The real-rules partner of rangedhit.mjs (#1995, Ed 2026-11-12:
// option C). One run prints a table row per kind, level, group and bot; --all runs the standard set, new rules and
// --ranged old, in parallel, and writes tools/balance/ranged-real/real-{new,old}-<job>.md and the combined table, real.md.
// Run from the repository root.
//   node tools/balance/rangedreal.mjs [--kinds fox,dormouse] [--levels 1,2] [--ns 1,3] [--bots still,across,away,zigzag] [--seeds 2] [--time 60] [--ranged old]
//   node tools/balance/rangedreal.mjs --all [--jobs 4] [--seeds 3] [--time 60]   (or --table: rebuild real.md from the saved files)
import { spawn } from "node:child_process";
import fs from "node:fs";
import { cpus } from "node:os";
import { arg, list } from "./lib.mjs";
const SEEDS = +arg("seeds", 2), TIME = +arg("time", 60), LEVELS = list(arg("levels", "1,2")).map(Number), NS = list(arg("ns", "1,3")).map(Number);
const KINDS = list(arg("kinds", "dormouse,fox,marten,squirrel,mole,hedgehog,stoat,hare,badger")), BOTS = list(arg("bots", "still,across,away,zigzag"));
const OUT = "tools/balance/ranged-real", BOT4 = ["still", "across", "away", "zigzag"], LV = { 1: "young", 2: "adult", 3: "legend" };
// The standard set: home's kinds, and the report's spread (a fast shooter, slow heavy ones, homing, the tiger and cat
// fans), young and adult, alone and three; and legends alone.
const HOME = ["dormouse", "fox", "marten", "squirrel", "mole", "hedgehog", "stoat", "hare", "badger"], SPREAD = ["dragonfly", "rhino", "heron", "hydra", "tiger", "cat"];
const JOBS = [...[...HOME, ...SPREAD].flatMap(k => [1, 2].map(l => ({ name: `${k}-${l}`, args: ["--kinds", k, "--levels", String(l), "--ns", "1,3"] }))),
  { name: "legends", args: ["--kinds", "fox,tiger", "--levels", "3", "--ns", "1"] }];
if (process.argv.includes("--all")) await all();
else if (process.argv.includes("--table")) table();
else await measure();

async function all() {
  const n = +arg("jobs", cpus().length), seeds = arg("seeds", "3"), time = arg("time", "60"), queue = JOBS.flatMap(j => ["new", "old"].map(m => ({ ...j, m })));
  let next = 0;
  const worker = async () => { while (next < queue.length) { const j = queue[next++], file = `${OUT}/real-${j.m}-${j.name}.md`, t0 = Date.now();
    await new Promise((ok, bad) => { const out = fs.createWriteStream(file), p = spawn(process.execPath, [process.argv[1], ...j.args, "--seeds", seeds, "--time", time, ...(j.m === "old" ? ["--ranged", "old"] : [])], { stdio: ["ignore", "pipe", "inherit"] });
      p.stdout.pipe(out); p.on("close", c => (c ? bad(new Error(`${file}: exit ${c}`)) : out.end(ok))); });
    console.log(`${file} (${Math.round((Date.now() - t0) / 1000)} s)`); } };
  await Promise.all(Array.from({ length: n }, worker));
  table();
}

/** The combined before/after table and the unfair cells, from the saved per-job files. */
function table() {
  const read = m => { const rows = new Map();
    for (const f of fs.readdirSync(OUT).filter(f => f.startsWith(`real-${m}-`) && f.endsWith(".md"))) for (const line of fs.readFileSync(`${OUT}/${f}`, "utf8").split("\n")) {
      const c = line.split("|").map(x => x.trim()); if (c.length < 12 || !/^\d+$/.test(c[2])) continue;
      const pc = s => (/^\d+%$/.test(s) ? +s.slice(0, -1) : 0), casts = +c[5], old = +c[7];
      rows.set(`${c[1]}|${c[2]}|${c[3]}|${c[4]}`, { hits: Math.round(pc(c[6]) * casts / 100) + Math.round(pc(c[8]) * old / 100), shots: casts + old }); }
    return rows; };
  const B = read("old"), A = read("new"), flags = [], order = [...HOME, ...SPREAD];
  const keys = [...new Set([...A.keys(), ...B.keys()].map(k => k.split("|").slice(0, 3).join("|")))].map(k => k.split("|"))
    .sort((a, b) => (+a[1] === 3) - (+b[1] === 3) || order.indexOf(a[0]) - order.indexOf(b[0]) || a[1] - b[1] || a[2] - b[2]);
  const cell = (T, k) => { const r = T.get(k); return !r ? "–" : r.shots ? `${Math.round(100 * r.hits / r.shots)}% (${r.hits}/${r.shots})` : "– (0)"; };
  const out = ["| kind | level | group | before still | before across | before away | before zig-zag | after still | after across | after away | after zig-zag |", "|---|---|---|---|---|---|---|---|---|---|---|"];
  for (const [sp, l, n] of keys) {
    const k = `${sp}|${l}|${n}`, who = `${sp} ${LV[l]} ${n === "1" ? "alone" : "three"}`;
    out.push(`| ${sp} | ${LV[l]} | ${n === "1" ? "alone" : "three"} | ${BOT4.map(b => cell(B, `${k}|${b}`)).join(" | ")} | ${BOT4.map(b => cell(A, `${k}|${b}`)).join(" | ")} |`);
    const z = A.get(`${k}|zigzag`), s = A.get(`${k}|still`);
    if (z?.shots >= 8 && z.hits / z.shots > 0.6) flags.push(`${who}: zig-zag ${Math.round(100 * z.hits / z.shots)}% (${z.hits}/${z.shots})`);
    if (s?.shots >= 8 && s.hits / s.shots < 0.8) flags.push(`${who}: still ${Math.round(100 * s.hits / s.shots)}% (${s.hits}/${s.shots})`);
  }
  const md = [...out, "", "Flagged (8+ shots; zig-zag above 60%, or still below 80%):", "", ...(flags.length ? flags.map(f => `- ${f}`) : ["- none"]), ""].join("\n");
  fs.writeFileSync(`${OUT}/real.md`, md); console.log(md);
}

async function measure() {
const { openRules } = await import("./lib.mjs");
const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");
const { observeAttacks } = await load("/src/rules/attackObservation.ts");
const t = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, ...(arg("ranged", "") === "old" ? { ranged: { ...TUNING.ranged, on: false } } : {}) });
console.log(`ranged rule: ${JSON.stringify(t.ranged)}; ${SEEDS} seeds x ${TIME} s`);
function run(seed, sp, n, level, bot) {
  const g = newGame(seed, t), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  const inArea = (x, z) => { const q = g.map.cellSafe(x, z).cell; return q[0] === cell[0] && q[1] === cell[1]; };
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const ids = [];
  for (let i = 0; i < n; i++) {
    const c = spare[i], a = (Math.PI / 2) * ((i + 0.5) / n - 0.5), r = 25 + (i % 3) * 4, x = site.x + Math.cos(a) * r, z = site.z + Math.sin(a) * r;
    Object.assign(c, { species: sp, level, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(sp, level, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0, circle: undefined });
    ids.push(c.id);
  }
  for (const c of g.creatures) if (!ids.includes(c.id) && Math.hypot(c.x - site.x, c.z - site.z) < 260) c.gone = true;
  g.byArea = null;
  const mine = new Set(ids), casts = new Map(), lastCast = new Map(), moved = [], shots = new Map(), dists = [];
  let hits = 0, hitIds = new Set(), sdir = 1, oldShots = 0, oldHits = 0, castsN = 0, castHits = 0, lastFlip = 0;
  let undo = null;
  const dt = 1 / 60, F = Math.round(TIME / dt);
  for (let f = 0; f < F; f++) {
    if (!undo && g.combat) undo = observeAttacks(g.combat, o => {
      if (o.targetKind !== "witch" || !(o.damageRequested > 0)) return;
      if (o.cast !== undefined && casts.has(o.cast) && !hitIds.has("c" + o.cast)) { hitIds.add("c" + o.cast); castHits++; }
      else if (o.cast === undefined && (o.delivery === "shot" || o.delivery === "lob") && mine.has(o.source)) oldHits++;
    });
    const B = w.body, time = g.clock.time;
    const live = ids.map(i => g.creatures[i]).filter(c => !c.gone && !c.dazed && c.state !== "happy" && !c.leashed);
    const near = live.sort((a, b) => Math.hypot(a.x - B.x, a.z - B.z) - Math.hypot(b.x - B.x, b.z - B.z))[0];
    let mx = 0, mz = 0;
    if (bot !== "still" && near) {
      const d0 = Math.hypot(B.x - near.x, B.z - near.z) || 1, rx = (B.x - near.x) / d0, rz = (B.z - near.z) / d0;
      if (bot === "away") { mx = rx; mz = rz; if (!inArea(B.x + mx * 12, B.z + mz * 12)) { const ox = site.x - B.x, oz = site.z - B.z, od = Math.hypot(ox, oz) || 1; mx = ox / od; mz = oz / od; } }
      else {
        let px = -rz * sdir, pz = rx * sdir;
        if (bot === "zigzag") { const k = Math.floor(time) % 2 === 0 ? 1 : -1; px = (px + rx * k) * Math.SQRT1_2; pz = (pz + rz * k) * Math.SQRT1_2; }
        if (!inArea(B.x + px * 15, B.z + pz * 15) && time - lastFlip > 2) { sdir = -sdir; lastFlip = time; }
        mx = px; mz = pz;
      }
    }
    stepGame(g, { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0, dash: false, aimX: 0, aimZ: 0 }, dt);
    const S = g.combat.spells;
    if (S) for (const p of S.pending) if (p.depth === 0 && !casts.has(p.cast) && mine.has(p.source) && p.aim?.kind === "witch" && (p.attack.body?.kind ?? "bolt") !== "melee" && !(p.attack.body?.kind === "area" && p.attack.area?.at !== "target") && p.attack.body?.kind !== "zone") {
      const c = g.creatures[p.source]; casts.set(p.cast, { x: c.x, z: c.z, rel: false }); lastCast.set(p.source, p.cast); dists.push(Math.hypot(c.x - w.body.x, c.z - w.body.z));
    }
    if (S) for (const e of S.events) if (e.kind === "release" && mine.has(e.source) && lastCast.has(e.source)) { const k = casts.get(lastCast.get(e.source)); if (k && !k.rel) { k.rel = true; castsN++; moved.push(Math.hypot(e.x - k.x, e.z - k.z)); } }
    for (const s of g.combat.shots) if (mine.has(s.from) && !shots.has(s.id) && /:ranged:/.test(s.attack)) { shots.set(s.id, 1); oldShots++; const c = g.creatures[s.from]; dists.push(Math.hypot(c.x - w.body.x, c.z - w.body.z)); }
  }
  undo?.();
  return { castsN, castHits, oldShots, oldHits, dists, moved, cast: casts.size };
}
console.log(`| kind | level | n | bot | engine casts | hit | old pack shots | hit | median fire dist | caster moved in windup (median m) | casts started |`);
for (const sp of KINDS) for (const level of LEVELS) for (const n of NS) for (const bot of BOTS) {
  let A = { castsN: 0, castHits: 0, oldShots: 0, oldHits: 0, dists: [], moved: [], cast: 0 };
  for (let s = 1; s <= SEEDS; s++) { const r = run(s, sp, n, level, bot); A.castsN += r.castsN; A.castHits += r.castHits; A.oldShots += r.oldShots; A.oldHits += r.oldHits; A.dists.push(...r.dists); A.moved.push(...r.moved); A.cast += r.cast; }
  const ds = A.dists.sort((a, b) => a - b), med = ds.length ? ds[Math.floor(ds.length / 2)].toFixed(1) : "-", q = p => ds.length ? ds[Math.floor(ds.length * p)].toFixed(0) : "-";
  const pc = (h, k) => k ? `${Math.round(100 * h / k)}%` : "–";
  console.log(`| ${sp} | ${level} | ${n} | ${bot} | ${A.castsN} | ${pc(A.castHits, A.castsN)} | ${A.oldShots} | ${pc(A.oldHits, A.oldShots)} | ${med} (${q(0.1)}–${q(0.9)}) | ${A.moved.length ? A.moved.sort((a,b)=>a-b)[Math.floor(A.moved.length/2)].toFixed(1) : '-'} | ${A.cast} |`);
}
await close();
}
