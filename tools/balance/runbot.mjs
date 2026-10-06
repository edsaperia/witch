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
//   node tools/balance/runbot.mjs [--seeds 3 (seeds 0 to N-1; --skip K starts at K)] [--bots skilled,crude] [--time 1800] [--happy N (the N legends nearest home happy from the start)] [--set path=value;...] [--json out.json] | --report a.json,b.json
import { readFileSync, writeFileSync } from "node:fs";
import { arg, list, mean, median, openRules } from "./lib.mjs";

const say = s => console.log(s);
let rows;
if (arg("report")) rows = list(arg("report")).flatMap(f => JSON.parse(readFileSync(f, "utf8")));
else {
  const SEEDS = +arg("seeds", 3), SKIP = +arg("skip", 0), HAPPY = +arg("happy", 0), BOTS = list(arg("bots", "skilled,crude")), TIME = +arg("time", 1800);
  const SETS = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), JSON.parse(v)]; });
  const { load, close } = await openRules();
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { AREA_TYPES } = await load("/src/rules/map.ts");
  const { cellKey } = await load("/src/rules/party.ts");
  const { cheer } = await load("/src/rules/legends.ts");

  function over() {
    const o = {};
    for (const [path, v] of SETS) { let a = o, src = TUNING; for (const k of path.slice(0, -1)) { src = src[k]; a = a[k] ??= { ...src }; } a[path[path.length - 1]] = v; }
    return o;
  }

  function run(seed, bot) {
    const t = withTuning(over()), g = newGame(seed, t), w = g.witches[0], dt = 1 / 60, R = t.invites.range, H = t.witchHealth.hits;
    g.clock.paused = false;
    w.body = { ...w.body, seated: false }; // (her first step: the boot-up runs from here)
    // --happy N: the N legends nearest home happy from the start (their buffs on), to see what the buffs do.
    for (const c of g.creatures.filter(c => c.boss).sort((a, b) => Math.hypot(a.x - g.map.dancefloor.x, a.z - g.map.dancefloor.z) - Math.hypot(b.x - g.map.dancefloor.x, b.z - g.map.dancefloor.z)).slice(0, HAPPY)) cheer(c, 0);
    const map = g.map, home = map.centreCell, homeKey = cellKey(home);
    const spot = c => (cellKey(c) === homeKey ? map.dancefloor : map.soundsystemSpot(c[0], c[1]));
    const species = c => AREA_TYPES[map.typeOf(c[0], c[1])].creature;
    const legendOf = new Map(g.creatures.filter(c => c.boss).map(c => [cellKey(c.cell), c.id]));
    const origin = new Map(); // invited id -> the key of the area it came from
    const waves = [], parkedAt = new Set();
    let firstKo = null, kos = 0, wasKo = false, healing = false, target = null, pickAt = -1, landWave = -1, lastWave = 0;
    const T0 = Date.now();

    /** Where to recruit next: a wild area with someone she may invite (careful: never its last one of the area's kind). */
    const careful = bot === "skilled";
    function inviteable(key, cell) {
      const sp = species(cell), out = [];
      let kin = 0;
      for (const c of g.creatures) if (!c.gone && !c.boss && !c.leashed && c.fleeUntil === undefined && cellKey(c.cell) === key && c.species === sp) kin++;
      for (const c of g.creatures) {
        if (c.gone || c.boss || c.leashed || c.fleeUntil !== undefined || c.enraged || cellKey(c.cell) !== key) continue;
        if (careful && c.species === sp && kin <= 1) continue;
        out.push(c);
      }
      return out;
    }
    function pickRecruit() {
      let best = null, bs = Infinity;
      for (let i = 0; i < map.n; i++) for (let j = 0; j < map.n; j++) {
        const cell = [i, j], key = cellKey(cell);
        if (g.party.areas.has(key) || g.party.ruined?.has(key)) continue;
        const L = legendOf.get(key); if (L !== undefined && g.creatures[L].legendState === "angry") continue; // (keep out of an angry legend's area)
        const s = map.siteOf(i, j), d = Math.hypot(s.x - w.body.x, s.z - w.body.z);
        if (d > 900 || !inviteable(key, cell).length) continue;
        if (d < bs) { bs = d; best = { cell, key, x: s.x, z: s.z }; }
      }
      return best;
    }

    for (let step = 0; step * dt < TIME; step++) {
      const b = w.body, time = g.clock.time;
      let mx = 0, mz = 0, toggle = false, fire = false, aimX = 0, aimZ = 0, dash = false, sigil = false;
      const goTo = (x, z, land) => {
        const dx = x - b.x, dz = z - b.z, d = Math.hypot(dx, dz) || 1;
        if (d > 45) { if (b.mode === "ground") toggle = true; mx = dx / d; mz = dz / d; return false; }
        if (land && b.mode === "treetop") { toggle = true; return false; }
        if (b.mode === "ground" && d > 6) { mx = dx / d; mz = dz / d; }
        return b.mode === "ground";
      };
      if (w.ko) wasKo = true;
      else if (bot === "idle") { /* (stands at home all run: the sieges alone) */ }
      else if (bot === "hover") { if (b.mode === "ground") toggle = true; } // (over the treetops at home all run: out of every fight)
      else if (careful && (healing || w.health.hp <= 1)) {
        // To the treetops to heal, then back to work.
        healing = w.health.hp < H;
        if (b.mode === "ground" && healing) toggle = true;
      } else {
        const next = g.party.next[0], left = g.party.nextAt - time;
        const defending = careful && next && (left < 50 || (landWave === g.party.wave && time - lastWave < 60));
        if (defending) {
          const cell = left < 50 ? next : waves[waves.length - 1]?.cell ?? next, key = cellKey(cell), s = spot(cell);
          if (left < 50) landWave = g.party.wave + 1;
          if (goTo(s.x, s.z, true)) {
            // A quest she can do: the creature this area's legend dreams of, on her stack: put it down here.
            const L = legendOf.get(key), q = L !== undefined ? g.creatures[L].quest : null;
            const st = w.leash.stack;
            const qi = q && g.creatures[L].questOpen ? st.findIndex(id => g.creatures[id].species === q.species && g.creatures[id].level === q.level) : -1;
            if (qi >= 0 && qi !== st.length - 1) { st.push(st.splice(qi, 1)[0]); } // (cycling the stack, as the sigil button does in the treetops)
            if (qi >= 0) sigil = true;
            else if (!parkedAt.has(key) && st.length > 2) { sigil = true; if (w.leash.placed.filter(p => Math.hypot(p.x - s.x, p.z - s.z) < 40).length >= Math.min(3, st.length - 2)) parkedAt.add(key); }
            // Then hold the spot, kiting anything that comes for her.
            for (const c of g.creatures) if (c.enraged && !c.gone && Math.hypot(c.x - b.x, c.z - b.z) < 9) { const d = Math.hypot(c.x - b.x, c.z - b.z) || 1; mx = (b.x - c.x) / d; mz = (b.z - c.z) / d; dash = d < 5; break; }
          }
        } else {
          if (!target || time >= pickAt) { target = pickRecruit(); pickAt = time + 3; }
          if (target && goTo(target.x, target.z, true)) {
            const open = inviteable(target.key, target.cell).filter(c => Math.hypot(c.x - b.x, c.z - b.z) < 140);
            if (!open.length) { target = null; pickAt = time; }
            else {
              let tg = open[0], td = Infinity;
              for (const c of open) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < td) { td = d; tg = c; } }
              aimX = tg.x - b.x; aimZ = tg.z - b.z; fire = td < R * 0.95;
              mx = 0; mz = 0;
              let th = null, hd = Infinity;
              for (const c of g.creatures) if (!c.gone && !c.leashed && !c.boss && c.level > 0 && cellKey(c.cell) === target.key) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < hd) { hd = d; th = c; } }
              if (careful && th && hd < 9) { mx = (b.x - th.x) / hd; mz = (b.z - th.z) / hd; dash = hd < 5; }
              else if (td > R * 0.8) { mx = aimX / td; mz = aimZ / td; }
            }
          }
        }
      }
      const before = g.party.wave, hp0 = w.health.hp;
      stepGame(g, { moveX: mx, moveZ: mz, toggleMode: toggle, zoom: 0, fire, aimX, aimZ, dash, sigil }, dt);
      for (const e of w.invites.events) if (e.kind === "happy" && !origin.has(e.id)) origin.set(e.id, cellKey(g.creatures[e.id].cell));
      if (process.env.WHO && w.health.hp < hp0) {
        const near = g.creatures.filter(c => !c.gone && !c.leashed && Math.hypot(c.x - w.body.x, c.z - w.body.z) < 40 && (c.fight?.target?.kind === "witch")).map(c => `${c.boss ? "LEGEND " : ""}${c.species}${c.level}${c.enraged ? "!" : ""}@${Math.round(Math.hypot(c.x - w.body.x, c.z - w.body.z))}`);
        const legs = g.creatures.filter(c => c.boss && c.legendState === "angry").map(c => `${c.species}@${Math.round(Math.hypot(c.x - w.body.x, c.z - w.body.z))}`);
        const hd = Math.hypot(w.body.x - map.dancefloor.x, w.body.z - map.dancefloor.z);
        process.stderr.write(`  hit t${(time / 60).toFixed(2)} hp${w.health.hp} ${w.body.mode} home@${Math.round(hd)} near[${near.join(" ")}] angry[${legs.join(" ")}]\n`);
      }
      if (wasKo && !w.ko) { kos++; wasKo = false; if (firstKo === null) firstKo = time; }
      if (w.ko && firstKo === null) firstKo = time;
      if (g.party.wave > before) {
        lastWave = g.clock.time;
        // The areas this wave woke: how much of each she'd invited before it came.
        for (const [key, a] of g.party.areas) if (a.wave === g.party.wave) {
          const wild = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && cellKey(c.cell) === key).length;
          const got = [...origin.values()].filter(k => k === key).length, L = legendOf.get(key);
          waves.push({ wave: g.party.wave, at: g.clock.time, cell: a.cell, key, wild, got, share: wild + got ? got / (wild + got) : NaN, friendly: g.friendly.has(key), legend: L !== undefined ? g.creatures[L].legendState : null });
        }
      }
      if (g.over) break;
    }
    const L = [...legendOf.values()].map(id => g.creatures[id]);
    const standing = [...g.combat.sounds.values()].filter(h => h.hp > 0).length;
    return {
      seed, bot, set: [...SETS.map(([k, v]) => `${k.join(".")}=${JSON.stringify(v)}`), ...(HAPPY ? [`happy=${HAPPY}`] : [])].join(";"), end: g.clock.time, over: g.over?.at ?? null, wave: g.party.wave,
      firstKo, kos, invited: origin.size, posse: w.leash.stack.length, parked: w.leash.placed.length,
      angry: L.filter(c => c.legendState === "angry").length, happy: L.filter(c => c.legendState === "happy").length, quests: g.friendly.size,
      standing, ruined: g.party.ruined?.size ?? 0, waves, secs: (Date.now() - T0) / 1000,
    };
  }

  rows = [];
  for (const bot of BOTS) for (let i = SKIP; i < SEEDS; i++) {
    const r = run(1000 + i * 7919, bot);
    rows.push(r);
    process.stderr.write(`${bot} ${r.seed}${r.set ? ` [${r.set}]` : ""}: ${r.over !== null ? `over at ${(r.over / 60).toFixed(1)} min` : `standing ${r.standing}`}, wave ${r.wave}, first KO ${r.firstKo === null ? "none" : `${(r.firstKo / 60).toFixed(1)} min`}, ${r.kos} KOs, invited ${r.invited}, angry ${r.angry}, quests ${r.quests}, ruined ${r.ruined} (${r.secs.toFixed(0)} s)\n`);
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
