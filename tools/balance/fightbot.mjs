// What playtesters will feel in fights (Ed, 2026-10-05, after #89's 💌s): a bot plays the real rules
// headless (src/rules/game.ts: the 💌s of rules/invites.ts, combat and every species' movement), no
// new rules. Each fight: she lands in a real wild area two areas out from home, holding the
// creatures its kind would have grown to by wave W (the game's own population start and growth),
// aims at the nearest invitable one and holds fire while it's in range, and moves: circling the
// crowd at a share of her ground speed (the more she moves, the fewer hits she takes and the fewer
// letters land), greedily (standing to shoot, closing in when out of range), or kiting (standing to shoot, backing away from any fighter that comes close). It ends when all of them are invited, she's knocked out (sent home), or after a time
// limit. Builds are the invites tuning (the legend buffs that change it: Flutter +1 a burst, Fan a
// 3-way spread, Quick fire half the cooldown, Echo a second burst, Long thread more range, Big heart
// bigger letters, Charm stronger homing), since the rules don't apply buffs to 💌s yet.
//   node tools/balance/fightbot.mjs [--seeds 2] [--areas 3] [--waves 1,5,10,20,30] [--builds 0,2,4,7] [--bots circle20,circle35,circle50,kiter,greedy,skilled] [--kite 9] [--blink 5] [--limit 240] [--start babies,young,adults] [--json out.json] | --report a.json,b.json
import { openRules, arg, list, mean } from "./lib.mjs";
import { readFileSync, writeFileSync } from "node:fs";

const say = s => console.log(s);

// Builds: buff count → the invites tuning (each step adds to the last).
const BUILDS = {
  0: { name: "no buffs", f: I => I },
  2: { name: "Flutter + Charm", f: I => ({ ...I, burst: I.burst + 1, homing: I.homing * 2, homingRange: I.homingRange * 2 }) },
  4: { name: "+ Fan + Quick fire", f: I => ({ ...BUILDS[2].f(I), multiShot: 3, spread: 30, cooldown: I.cooldown * 0.5 }) },
  7: { name: "+ Echo + Long thread + Big heart", f: I => { const b = BUILDS[4].f(I); return { ...b, burst: b.burst * 2, range: I.range * 1.5, radius: I.radius * 2 }; } },
};

let rows;
if (arg("report")) rows = list(arg("report")).flatMap(f => JSON.parse(readFileSync(f, "utf8")));
else {
  const KITE = +arg("kite", 9), BLINK = +arg("blink", 5), START = arg("start") ? (([babies, young, adults]) => ({ babies, young, adults }))(list(arg("start")).map(Number)) : null;
  const SEEDS = +arg("seeds", 2), AREAS = +arg("areas", 3), WAVES = list(arg("waves", "1,5,10,20,30")).map(Number), BUILDS_ON = list(arg("builds", "0,2,4,7")).map(Number), BOTS = list(arg("bots", "circle20,circle35,circle50,greedy")), LIMIT = +arg("limit", 240);
  const { load, close } = await openRules();
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");
  const { countScale, grownAt, growthLevel, startCount } = await load("/src/rules/growth.ts");
  const { AREA_TYPES } = await load("/src/rules/map.ts");

  /** One fight. */
  function fight(seed, areaIx, wave, buffs, bot) {
    const t = withTuning({ invites: BUILDS[buffs].f(TUNING.invites), ...(START ? { population: { ...TUNING.population, start: START } } : {}) });
    const g = newGame(seed, t), w = g.witches[0];
    g.clock.paused = false; g.party.paused = true; // (no waves: just this fight)
    const [hx, hy] = g.map.centreCell, ring = [[2, 0], [-2, 0], [0, 2], [0, -2], [2, 2], [-2, -2]][areaIx % 6], cell = [hx + ring[0], hy + ring[1]];
    const site = g.map.siteOf(cell[0], cell[1]), species = AREA_TYPES[g.map.typeOf(cell[0], cell[1])].creature;
    // The area's creatures by wave W: its start and what it grows (the game's own numbers).
    for (const c of g.creatures) if (c.cell[0] === cell[0] && c.cell[1] === cell[1] && !c.boss) c.gone = true;
    const P = t.population, k = countScale(species), levels = [];
    for (const [n, lvl] of [[P.start.babies, 0], [P.start.young, 1], [P.start.adults, 2]]) for (let i = 0; i < startCount(n, k); i++) levels.push(lvl);
    for (let wv = 1; wv <= wave; wv++) for (let n = 0; n < grownAt(wv, P.growth.perWave, k); n++) levels.push(growthLevel(seed, cell, wv, n, P.growth.weights));
    const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
    const ids = [];
    levels.forEach((lvl, i) => {
      const c = spare[i]; if (!c) return;
      const a = i * 2.39996, r = 12 + 30 * Math.sqrt((i + 0.5) / levels.length), x = site.x + Math.cos(a) * r, z = site.z + Math.sin(a) * r;
      Object.assign(c, { species, level: lvl, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(species, lvl, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0 });
      ids.push(c.id);
    });
    w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
    const dt = 1 / 60, R = t.invites.range;
    let hits = 0, last = w.health.hp, ang = 0, time = 0, ko = false, stack = 0, resets = 0, blinks = 0;
    const sk = { target: null, pickAt: -1, resting: false, goal: null }, won = new Set(), mine = new Set(ids);
    const tally = () => { for (const e of w.invites.events) if (e.kind === "happy" && mine.has(e.id)) won.add(e.id); };
    const inArea = (x, z) => { const k = g.map.cellSafe(x, z).cell; return k[0] === cell[0] && k[1] === cell[1]; };
    for (; time < LIMIT; time += dt) {
      const left = ids.map(i => g.creatures[i]).filter(c => !c.gone && !c.leashed && !won.has(c.id) && c.fleeUntil === undefined);
      if (!left.length) break;
      if (bot === "skilled") {
        // A decent human: pulls one or two from the edge, picks off stragglers, blinks out of
        // telegraphed lunges and charges, and rises to the treetops to heal when down to her last hit.
        const T = g.clock.time, H = t.witchHealth.hits, fighters = left.filter(c => c.level > 0);
        let toggle = false, dash = false, mx = 0, mz = 0, fire = false, aimX = 0, aimZ = 0;
        if (!sk.resting && w.health.hp <= 1 && w.body.mode === "ground") { sk.resting = true; toggle = true; resets++; }
        else if (sk.resting) {
          // Over the treetops (they let her go): drift off and wait to heal, then land outside the area.
          if (w.body.mode === "treetop" && w.health.hp >= H) {
            const dx = w.body.x - site.x, dz = w.body.z - site.z, d = Math.hypot(dx, dz) || 1;
            if (!inArea(w.body.x, w.body.z) && d > 60) { toggle = true; sk.resting = false; sk.target = null; }
            else { mx = dx / d; mz = dz / d; }
          } else if (w.body.mode === "treetop") { const dx = w.body.x - site.x, dz = w.body.z - site.z, d = Math.hypot(dx, dz) || 1; if (d < 140) { mx = dx / d; mz = dz / d; } }
        } else if (w.body.mode === "ground") {
          // Its target: the invitable one with fewest fighters round it (a straggler), re-picked each second.
          if (!sk.target || sk.target.gone || sk.target.leashed || T >= sk.pickAt) {
            let best = null, bs = Infinity;
            for (const c of left) { const crowd = fighters.filter(o => o !== c && Math.hypot(o.x - c.x, o.z - c.z) < 12).length; const sc = crowd * 50 + Math.hypot(c.x - w.body.x, c.z - w.body.z); if (sc < bs) { bs = sc; best = c; } }
            sk.target = best; sk.pickAt = T + 1;
            // Where to shoot from: 18 m off it, outside the area if it can be (so only those within reach come), away from the rest.
            let gb = null, gs = Infinity;
            for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2, x = best.x + Math.cos(a) * 18, z = best.z + Math.sin(a) * 18; const near = fighters.filter(o => o !== best && Math.hypot(o.x - x, o.z - z) < 14).length; const sc = near * 10 + (inArea(x, z) ? 25 : 0) + Math.hypot(x - w.body.x, z - w.body.z) * 0.05; if (sc < gs) { gs = sc; gb = { x, z }; } }
            sk.goal = gb;
          }
          const tg = sk.target, td = Math.hypot(tg.x - w.body.x, tg.z - w.body.z);
          aimX = tg.x - w.body.x; aimZ = tg.z - w.body.z; fire = td < R * 0.95;
          // A telegraph aimed at her (a lunge winding up, a charge's lowered head), close: blink across it.
          const threat = fighters.find(c => Math.hypot(c.x - w.body.x, c.z - w.body.z) < 14 && ((c.fight?.target?.kind === "witch" && c.fight.windupUntil > T && c.fight.windupUntil - T < 0.35) || (c.charge && (c.charge.from ?? 0) > T)));
          const close = fighters.reduce((m, c) => { const d = Math.hypot(c.x - w.body.x, c.z - w.body.z); return d < m.d ? { c, d } : m; }, { c: null, d: Infinity });
          if (threat && T >= w.dash.readyAt) { const dx = threat.x - w.body.x, dz = threat.z - w.body.z, d = Math.hypot(dx, dz) || 1; mx = -dz / d; mz = dx / d; dash = true; blinks++; }
          else if (td > 24 && sk.goal) { const dx = sk.goal.x - w.body.x, dz = sk.goal.z - w.body.z, d = Math.hypot(dx, dz); if (d > 1.5) { mx = dx / d; mz = dz / d; } } // (to its shooting spot, from the edge)
          else {
            // Orbit the straggler a little inside 💌 range at half her speed (moving, she's hard to hit), the way away from the others.
            const rad = 14, cur = Math.atan2(w.body.z - tg.z, w.body.x - tg.x);
            const others = fighters.filter(c => c !== tg), side = others.length ? Math.sign(Math.sin(Math.atan2(mean(others.map(c => c.z)) - tg.z, mean(others.map(c => c.x)) - tg.x) - cur)) || 1 : 1;
            const nx = cur - side * (t.groundSpeed * 0.5 * dt) / rad * 6, px = tg.x + Math.cos(nx) * rad, pz = tg.z + Math.sin(nx) * rad, dx = px - w.body.x, dz = pz - w.body.z, k = Math.hypot(dx, dz) || 1;
            mx = (dx / k) * Math.min(1, k / 2) * 0.5 + (close.c && close.d < 6 ? (w.body.x - close.c.x) / close.d : 0); mz = (dz / k) * Math.min(1, k / 2) * 0.5 + (close.c && close.d < 6 ? (w.body.z - close.c.z) / close.d : 0);
          }
        }
        stepGame(g, { moveX: mx, moveZ: mz, toggleMode: toggle, zoom: 0, fire, aimX, aimZ, dash }, dt);
        tally();
        if (w.health.hp < last) hits += last - w.health.hp;
        last = w.health.hp;
        if (w.ko) { ko = true; break; }
        continue;
      }
      // Aim at the nearest still to invite; fire while it's in range.
      let tg = left[0], td = Infinity;
      for (const c of left) { const d = Math.hypot(c.x - w.body.x, c.z - w.body.z); if (d < td) { td = d; tg = c; } }
      const aimX = tg.x - w.body.x, aimZ = tg.z - w.body.z, fire = td < R * 0.95;
      let mx = 0, mz = 0, dash = false;
      if (bot.startsWith("circle")) {
        // Circle the crowd a little inside 💌 range, at circleNN % of her ground speed.
        const cx = mean(left.map(c => c.x)), cz = mean(left.map(c => c.z)), rad = Math.min(14, R * 0.65);
        ang += (t.groundSpeed * (Number(bot.slice(6)) / 100) * dt) / rad;
        const px = cx + Math.cos(ang) * rad, pz = cz + Math.sin(ang) * rad, dx = px - w.body.x, dz = pz - w.body.z, kk = Math.hypot(dx, dz) || 1;
        mx = (dx / kk) * Math.min(1, kk / 2); mz = (dz / kk) * Math.min(1, kk / 2);
      } else if (bot === "kiter") {
        // Stand and shoot; when a fighter comes within KITE m, back away from it (firing still).
        let th = null, hd = Infinity;
        for (const c of left) if (c.level > 0) { const d = Math.hypot(c.x - w.body.x, c.z - w.body.z); if (d < hd) { hd = d; th = c; } }
        if (th && hd < KITE) { mx = (w.body.x - th.x) / hd; mz = (w.body.z - th.z) / hd; dash = hd < BLINK; } // (and blinks clear when one is right on her)
        else if (td > R * 0.8) { mx = aimX / td; mz = aimZ / td; }
      } else if (td > R * 0.8) { mx = aimX / td; mz = aimZ / td; } // greedy: stand and shoot, close in when out of range
      stepGame(g, { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0, fire, aimX, aimZ, dash }, dt);
      tally();
      if (w.health.hp < last) hits += last - w.health.hp;
      last = w.health.hp;
      stack = w.leash.stack.length;
      if (w.ko) { ko = true; break; }
    }
    const invited = won.size; // (each one she filled; an invited one can be beaten afterwards)
    const lost = [...won].filter(i => !g.creatures[i].leashed).length;
    return { seed, areaIx, species, wave, buffs, bot, crowd: ids.length, fighters: levels.filter(l => l > 0).length, hits, ko, time, invited, lost, stack, resets, blinks };
  }

  rows = [];
  const seeds = Array.from({ length: SEEDS }, (_, i) => 1000 + i * 7919);
  for (const bot of BOTS) for (const b of BUILDS_ON) for (const wv of WAVES) for (const s of seeds) for (let a = 0; a < AREAS; a++) {
    const r = fight(s, a, wv, b, bot);
    rows.push(r);
    process.stderr.write(`${bot} ${b} buffs w${wv} ${s}/${a} ${r.species}×${r.crowd}: ${r.hits} hits${r.ko ? " KO" : ""}, ${r.time.toFixed(0)} s, ${r.invited} invited\n`);
  }
  await close();
  if (arg("json")) { writeFileSync(arg("json"), JSON.stringify(rows)); process.exit(0); }
}

const WAVES = [...new Set(rows.map(r => r.wave))].sort((a, b) => a - b), BS = [...new Set(rows.map(r => r.buffs))].sort((a, b) => a - b), BOTS = [...new Set(rows.map(r => r.bot))];
const KO_TIME = 1.6 + 2; // (the teleport, and a couple of sigils letting go; plus the flight back, below)
say(`What playtesters will feel in fights: the real rules headless, a bot inviting a whole wild area with 💌s; ${rows.length} fights. She has 3 hits (one back every 20 s out of a fight); a knockout sends her home. Each cell: hits taken per fight / knocked out (share of fights) / seconds to invite them all (or until knocked out, or the time limit) / the share of the crowd she invited (the skilled bot: and its trips to the treetops to heal); the crowd is the area's whole population at that wave.\n`);
for (const bot of BOTS) {
  say(`**${bot === "skilled" ? "Skilled player (pulls from the edge, picks off stragglers, blinks out of telegraphs, rises to heal at 1 hit)" : bot.startsWith("circle") ? `Circling the crowd at ${bot.slice(6)}% of her ground speed while firing` : bot === "kiter" ? "Kiting player (stands to shoot; backs away, still firing, from any fighter within 9 m, and blinks away from one within 5 m)" : "Greedy player (stands to shoot, closes in when out of range)"}**\n`);
  say("| wave (crowd) | " + BS.map(b => `${b} buffs (${BUILDS[b]?.name ?? b})`).join(" | ") + " |");
  say("|---|" + BS.map(() => "---").join("|") + "|");
  for (const wv of WAVES) {
    const crowd = mean(rows.filter(r => r.wave === wv).map(r => r.crowd));
    say(`| ${wv} (${crowd.toFixed(0)}) | ` + BS.map(b => {
      const rs = rows.filter(r => r.bot === bot && r.buffs === b && r.wave === wv);
      if (!rs.length) return "–";
      return `${mean(rs.map(r => r.hits)).toFixed(1)} / ${Math.round(mean(rs.map(r => (r.ko ? 1 : 0))) * 100)}% / ${Math.round(mean(rs.map(r => r.time)))} s / ${Math.round(mean(rs.map(r => r.invited / Math.max(1, r.crowd))) * 100)}%${bot === "skilled" ? ` (${mean(rs.map(r => r.resets)).toFixed(1)} heals)` : ""}`;
    }).join(" | ") + " |");
  }
  say("");
}
say(`(A knockout costs her the teleport and her stack letting go, about ${KO_TIME} s, then the flight back from home: about an area or two at treetop speed, 10–20 s, and her leashed animals turn neutral.)`);
