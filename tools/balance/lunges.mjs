// How long are lunges really? (Ed, 2026-11-13: "Lunge ranges seem very short; they could be twice as long, around 1.5-2 dashes
// range.") A headless run of the real rules (src/rules/game.ts, set up as tools/balance/dodgebot.mjs and posseDefends.test.ts):
// she stands in a wild area two out from home, a group of one kind 25 to 33 m off, and optionally a posse of hers 8 m behind
// her; every melee lunge let go is logged: who at (her, one of hers, a wild one), how far off its target was when its wind-up
// began and when it let go, the metres it then travelled, and whether its blow landed (a blow on its target with it right there).
// Only kinds whose strike is a lunge show up: a charger (ram, boar), a leaper (lynx, hare) or a swiper (bear) makes none.
// Before Ed's change: --set "lunge.on=0".
//   node tools/balance/lunges.mjs [--groups wolf*4,stoat*4,...] [--levels 1,2,3] [--bots still,strafe] [--posse wolf*3] [--seeds 2]
//                                 [--time 40] [--set "lunge.on=0"] [--json out.json]
import { writeFileSync } from "node:fs";
import { openRules, arg, list, mean, median } from "./lib.mjs";

const SEEDS = +arg("seeds", 2), TIME = +arg("time", 40), LEVELS = list(arg("levels", "1,2,3")).map(Number), BOTS = list(arg("bots", "still,strafe"));
const GROUPS = list(arg("groups", "wolf*4,stoat*4,badger*4,fox*4,marten*4")).map(s => { const [sp, n] = s.split("*"); return { sp, n: +(n ?? 4) }; });
const POSSE = arg("posse", "") ? list(arg("posse")).flatMap(s => { const [sp, n] = s.split("*"); return Array(+(n ?? 1)).fill(sp); }) : [];
const SETS = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), Number(v)]; });

const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");

function tuning() {
  const over = { witchHealth: { ...TUNING.witchHealth, hits: 1e6 } };
  for (const [path, v] of SETS) { let o = over, src = TUNING; for (const k of path.slice(0, -1)) { src = src?.[k]; o = o[k] ??= { ...src }; } o[path[path.length - 1]] = v; }
  return withTuning(over);
}

function measure(seed, sp, n, level, bot, t) {
  const g = newGame(seed, t), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  const inArea = (x, z) => { const q = g.map.cellSafe(x, z).cell; return q[0] === cell[0] && q[1] === cell[1]; };
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const put = (c, species, lv, x, z) => Object.assign(c, { species, level: lv, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(species, lv, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0, circle: undefined });
  const ids = [], arc = n > 4 ? Math.PI * 2 : Math.PI / 2;
  if (spare.length < n + POSSE.length) throw new Error(`only ${spare.length} spare creatures for ${sp}*${n}`);
  for (let i = 0; i < n; i++) { const a = arc * ((i + 0.5) / n - 0.5), r = 25 + (i % 3) * 4; ids.push(put(spare[i], sp, level, site.x + Math.cos(a) * r, site.z + Math.sin(a) * r).id); }
  const mine = POSSE.map((ps, i) => { const c = put(spare[n + i], ps, level, site.x - 8, site.z - 3 + i * 3); c.leashed = true; c.state = "leashed"; c.homeX = c.x; c.homeZ = c.z; g.leash.stack.push(c.id); return c.id; });
  const all = [...ids, ...mine];
  for (const c of g.creatures) if (!all.includes(c.id) && Math.hypot(c.x - site.x, c.z - site.z) < 260) c.gone = true;
  g.byArea = null;
  const dt = 1 / 60, F = Math.round(TIME / dt), lunges = [], open = new Map(), wound = new Map();
  let lastHp = w.health.hp, hits = 0, sdir = 1;
  const posOf = tg => tg.kind === "witch" ? w.body : tg.kind === "creature" ? g.creatures[tg.id] : null;
  const kindOf = (c, tg) => tg.kind === "witch" ? "her" : mine.includes(c.id) ? "wild (by hers)" : mine.includes(tg.id) ? "hers" : "other";
  for (let f = 0; f < F; f++) {
    const B = w.body;
    const near = ids.map(i => g.creatures[i]).filter(c => !c.gone && c.fight?.target?.kind === "witch").sort((a, b) => Math.hypot(a.x - B.x, a.z - B.z) - Math.hypot(b.x - B.x, b.z - B.z));
    let mx = 0, mz = 0;
    if (bot === "strafe" && near.length) {
      const n0 = near[0], d0 = Math.hypot(B.x - n0.x, B.z - n0.z) || 1, rx = (B.x - n0.x) / d0, rz = (B.z - n0.z) / d0, out = d0 < 14 ? 0.8 : d0 > 22 ? -0.3 : 0.2;
      let ok = false;
      for (let tries = 0; tries < 2 && !ok; tries++) { mx = -rz * sdir + rx * out; mz = rx * sdir + rz * out; const k = Math.hypot(mx, mz) || 1; mx /= k; mz /= k; ok = inArea(B.x + mx * 15, B.z + mz * 15); if (!ok) sdir = -sdir; }
      if (!ok) { const ox = site.x - B.x, oz = site.z - B.z, od = Math.hypot(ox, oz) || 1; mx = ox / od; mz = oz / od; }
    }
    const time = g.clock.time;
    stepGame(g, { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0, dash: false, aimX: 0, aimZ: 0, autoTalk: false }, dt);
    const hp = w.health.hp; if (hp < lastHp) hits += lastHp - hp; lastHp = hp;
    for (const id of all) {
      const c = g.creatures[id], fi = c.fight, tg = fi?.target, p = tg ? posOf(tg) : null;
      if (fi && p && fi.windupUntil > 0 && !wound.has(id)) wound.set(id, Math.hypot(p.x - c.x, p.z - c.z));
      const o = open.get(id);
      if (fi?.lunge && !o && p && tg.kind !== "sound") { open.set(id, { at: kindOf(c, tg), windupAt: wound.get(id) ?? NaN, release: Math.hypot(p.x - c.x, p.z - c.z), budget: fi.lunge.left, left: fi.lunge.left, tg, path: 0, px: c.x, pz: c.z }); wound.delete(id); }
      else if (o) {
        o.path += Math.hypot(c.x - o.px, c.z - o.pz); o.px = c.x; o.pz = c.z;
        const q = posOf(o.tg);
        if (q && Math.hypot(q.x - c.x, q.z - c.z) < 6 && g.combat.events.some(e => e.at >= time && (o.tg.kind === "witch" ? e.kind === "witchHit" : e.kind === "hit" && e.id === o.tg.id))) o.hit = true; // (a blow on its target this step, with it right there: near enough its own)
        if (fi?.lunge) o.left = fi.lunge.left;
        else { lunges.push({ at: o.at, windupAt: o.windupAt, release: o.release, budget: o.budget, travelled: o.path, hit: !!o.hit, cut: o.left > 1 ? (c.dazed ? "dazed" : !fi ? "no fight" : !fi.target ? "lost its target" : "other") : "" }); if (process.env.CUTS && o.left > 1) console.log("cut", sp, o.at, "left", o.left.toFixed(1), c.dazed ? "dazed" : !fi ? "no fight" : !fi.target ? "lost its target" : "other", "stun", c.stunUntil > time, "gone", !!c.gone); open.delete(id); }
      }
      if (fi && fi.windupUntil === 0 && !fi.lunge) wound.delete(id);
    }
  }
  return { lunges, hpm: (hits / TIME) * 60 };
}

const t = tuning(), rows = [], t0 = Date.now(), f1 = x => Number.isFinite(x) ? x.toFixed(1) : "–";
console.log(`| group | level | bot | at | lunges | wind-up begins (m off) | let go (m off) | travelled, median (m) | travelled, max (m) | landed | hits on her/min |`);
console.log(`|---|---|---|---|---|---|---|---|---|---|---|`);
for (const { sp, n } of GROUPS) for (const level of LEVELS) for (const bot of BOTS) {
  const rs = []; for (let s = 1; s <= SEEDS; s++) rs.push(measure(s, sp, n, level, bot, t));
  const L = rs.flatMap(r => r.lunges), hpm = mean(rs.map(r => r.hpm));
  for (const at of [...new Set(L.map(l => l.at))].sort()) {
    const A = L.filter(l => l.at === at), row = { group: `${sp}*${n}`, level, bot, at, count: A.length, windupAt: median(A.map(l => l.windupAt).filter(Number.isFinite)), release: median(A.map(l => l.release)), travelled: median(A.map(l => l.travelled)), max: Math.max(...A.map(l => l.travelled)), landed: A.filter(l => l.hit).length / A.length, hpm };
    rows.push(row);
    console.log(`| ${sp}×${n} | ${level} | ${bot} | ${at} | ${row.count} | ${f1(row.windupAt)} | ${f1(row.release)} | ${f1(row.travelled)} | ${f1(row.max)} | ${Math.round(row.landed * 100)}% | ${at === "her" ? f1(hpm) : ""} |`);
  }
  if (!L.length) console.log(`| ${sp}×${n} | ${level} | ${bot} | – | 0 | | | | | | ${f1(hpm)} |`);
}
console.log(`\n(${SEEDS} seeds × ${TIME} s${POSSE.length ? `, posse ${POSSE.join(" ")}` : ""}, ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
if (arg("json", "")) writeFileSync(arg("json"), JSON.stringify(rows, null, 1));
await close();
