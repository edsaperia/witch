// The attack legibility audit's measures (Ed, 2026-11-13: "Attack legibility audit of home island creatures, let's go!"; "you only
// need to do youths"): the real rules headless (src/rules/game.ts, as dodgebot.mjs and rangedreal.mjs), one or three of a home kind
// placed 25 to 33 m from her in a wild area two out from home, one of four bots playing her for `time` seconds (her hits endless),
// and what reaches her counted from the game's own attack observer (rules/attackObservation.ts) and her own state:
//   still   stands where she is
//   strafe  walks sideways round the nearest, a little outward when it's close
//   dodger  strafes, and blinks (both charges) out of any blow about to land: a grammar telegraph (rules/attacks/engine.ts) about to
//           fire with her inside its shape, a lunge or pack shot about to reach her, a lob about to land on her, a charge or leap
//           arriving; each seen REACT s after it starts
//   chase   closes on the nearest to `chaseAt` m and throws 💌s at it all the while (the pursuit measure for fast kinds)
// Per kind and bot it prints: blows a minute; how the blows land (attack path: the grammar's own, or the pack's moves); her seconds
// slowed, staggered and confused a minute, and metres knocked back a minute; the telegraph kinds and tell poses seen (grammar casts
// at her); the actions started (windups, specials, own moves). For chase: 💌s landed a minute, share landed, seconds to the first
// stun, and the target's speed when a 💌 lands vs its median speed (a window shows as hits landing while it's slow).
// No game change: tools only.
//   node tools/balance/attackaudit.mjs [--kinds hare,stoat,...] [--levels 1] [--ns 1,3] [--bots still,strafe,dodger,chase]
//                                     [--seeds 3] [--time 60] [--react 0.15] [--chaseAt 12] [--json out.json]
import { writeFileSync } from "node:fs";
import { openRules, arg, list, mean, median } from "./lib.mjs";

const HOME = "hedgehog,squirrel,hare,fox,bee,stoat,mole,snail,dormouse,badger";
const KINDS = list(arg("kinds", HOME)), LEVELS = list(arg("levels", "1")).map(Number), NS = list(arg("ns", "1,3")).map(Number);
const BOTS = list(arg("bots", "still,strafe,dodger,chase")), SEEDS = +arg("seeds", 3), TIME = +arg("time", 60);
const REACT = +arg("react", 0.15), CHASE_AT = +arg("chaseAt", 12);

const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, witchTime } = await load("/src/rules/game.ts");
const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");
const { observeAttacks } = await load("/src/rules/attackObservation.ts");
const { stunned } = await load("/src/rules/knock.ts");
const t = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 } });

/** Is (x, z) inside a grammar telegraph's shape (with `pad` metres of slack)? */
function inShape(s, x, z, pad) {
  const d = Math.hypot(x - s.x, z - s.z);
  if (s.type === "point" || s.type === "disc") return d <= (s.r ?? 1) + pad;
  if (s.type === "ring") return d <= (s.r ?? 1) + pad && d >= (s.inner ?? 0) - pad;
  if (s.type === "cone") { const a = Math.atan2(z - s.z, x - s.x) - (s.heading ?? 0), da = Math.abs(Math.atan2(Math.sin(a), Math.cos(a))); return d <= (s.r ?? 4) + pad && da <= ((s.angle ?? 60) * Math.PI) / 360 + 0.15; }
  if (s.type === "segment" || s.type === "path") {
    const pts = s.type === "segment" ? [s.x, s.z, s.x2 ?? s.x, s.z2 ?? s.z] : (s.points ?? [s.x, s.z]);
    for (let i = 0; i + 3 < pts.length; i += 2) {
      const ax = pts[i], az = pts[i + 1], bx = pts[i + 2], bz = pts[i + 3], vx = bx - ax, vz = bz - az, L = vx * vx + vz * vz || 1;
      const k = Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / L));
      if (Math.hypot(x - (ax + vx * k), z - (az + vz * k)) <= (s.width ?? 1) / 2 + pad) return true;
    }
    return false;
  }
  return d <= (s.r ?? 2) + pad;
}

/** The blow about to land on her, as the way it comes (a unit vector), or null: grammar telegraphs first, then the older paths. */
function threatOf(g, B, mine, time) {
  const at = (x, z) => { const dx = B.x - x, dz = B.z - z, d = Math.hypot(dx, dz) || 1; return { x: dx / d, z: dz / d }; };
  for (const tg of g.combat.spells?.telegraphs ?? []) {
    if (!tg.alive || !mine.has(tg.source) || time - tg.start < REACT || tg.fire - time > 0.2 || tg.fire < time - 0.05) continue;
    if (inShape(tg.shape, B.x, B.z, 1)) { const c = g.creatures[tg.source]; return at(c.x, c.z); }
  }
  for (const b of g.combat.spells?.bodies ?? []) { // (a grammar bolt in flight: closest approach in the next 0.2 s)
    if (!mine.has(b.source) || b.vx === undefined) continue;
    const rx = B.x - b.x, rz = B.z - b.z, ux = b.vx - B.vx, uz = b.vz - B.vz, v2 = ux * ux + uz * uz || 1, tc = (rx * ux + rz * uz) / v2;
    if (tc >= 0 && tc <= 0.2 && Math.hypot(rx - ux * tc, rz - uz * tc) < (b.radius ?? 0.6) + 1.2) { const v = Math.sqrt(v2); return { x: b.vx / v, z: b.vz / v }; }
  }
  for (const id of mine) {
    const c = g.creatures[id], f = c.fight; if (!f || f.target?.kind !== "witch") continue;
    const d = Math.hypot(c.x - B.x, c.z - B.z);
    const past = f.lunge?.through && (f.lunge.landed || (B.x - c.x) * f.lunge.dx + (B.z - c.z) * f.lunge.dz < 0);
    if (f.lunge && !past && d < f.lunge.left + 4) return { x: f.lunge.dx, z: f.lunge.dz };
    if (c.charge && time >= (c.charge.from ?? 0) + REACT && d < 16) { const k = Math.hypot(c.charge.dx, c.charge.dz) || 1; return { x: c.charge.dx / k, z: c.charge.dz / k }; }
    if (c.leap && c.leap.lands - time <= 0.2 && Math.hypot(c.leap.tx - B.x, c.leap.tz - B.z) < 6) return at(c.x, c.z);
    if (c.burrow && d < 5) return at(c.x, c.z);
  }
  for (const s of g.combat.shots) {
    if (!mine.has(s.from)) continue;
    if (s.lob) { if (s.lob.lands - time <= 0.2 && Math.hypot(s.lob.tx - B.x, s.lob.tz - B.z) < (s.radius ?? 4) + 1.5) return at(s.lob.fx, s.lob.fz); continue; }
    const rx = B.x - s.x, rz = B.z - s.z, ux = s.vx - B.vx, uz = s.vz - B.vz, v2 = ux * ux + uz * uz || 1, tc = (rx * ux + rz * uz) / v2;
    if (tc >= 0 && tc <= 0.2 && Math.hypot(rx - ux * tc, rz - uz * tc) < (s.radius ?? 0.6) + 1.5) { const v = Math.sqrt(v2); return { x: s.vx / v, z: s.vz / v }; }
  }
  return null;
}

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
    Object.assign(c, { species: sp, level, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(sp, level, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0, circle: undefined, fills: undefined, affection: undefined });
    ids.push(c.id);
  }
  for (const c of g.creatures) if (!ids.includes(c.id) && Math.hypot(c.x - site.x, c.z - site.z) < 260) c.gone = true;
  g.byArea = null;
  const mine = new Set(ids), dt = 1 / 60, F = Math.round(TIME / dt);
  const R = { blows: 0, paths: {}, slowS: 0, staggerS: 0, confusedS: 0, knockM: 0, slows: 0, telegraphs: {}, poses: {}, actions: {}, blinks: 0,
    sent: 0, landed: 0, firstStun: Infinity, hitSpeeds: [], speeds: [], stillShare: 0, windows: [] };
  const seenTg = new Set(), seenTell = new Set(), seenWind = new Set();
  let lastHp = w.health.hp, sdir = 1, lastFlip = 0, knockAt = -Infinity, slowWas = false, undo = null, stillRun = 0;
  for (let f = 0; f < F; f++) {
    if (!undo && g.combat) undo = observeAttacks(g.combat, o => {
      if (o.targetKind !== "witch" || !mine.has(o.source) || !(o.healthLost > 0)) return;
      const key = `${o.cast !== undefined ? "grammar" : "pack"} ${o.delivery}${o.attack && o.cast === undefined ? ` (${String(o.attack).replace(/^.*:/, "")})` : ""}`;
      R.paths[key] = (R.paths[key] ?? 0) + 1;
    });
    const B = w.body, time = g.clock.time, ht = witchTime(g, w);
    const live = ids.map(i => g.creatures[i]).filter(c => !c.gone && !c.dazed && c.fleeUntil === undefined && c.state !== "happy" && !c.leashed);
    const near = live.sort((a, b) => Math.hypot(a.x - B.x, a.z - B.z) - Math.hypot(b.x - B.x, b.z - B.z))[0];
    let mx = 0, mz = 0, dash = false, aimX = 0, aimZ = 0, fire = false;
    if (near && bot !== "still") {
      const d0 = Math.hypot(B.x - near.x, B.z - near.z) || 1, rx = (B.x - near.x) / d0, rz = (B.z - near.z) / d0;
      if (bot === "chase") {
        const k = d0 > CHASE_AT + 2 ? -1 : d0 < CHASE_AT - 3 ? 0.6 : 0; // (in, hold, or step back; sideways a little all the while)
        mx = rx * k - rz * sdir * 0.5; mz = rz * k + rx * sdir * 0.5;
        fire = true; aimX = near.x - B.x; aimZ = near.z - B.z;
      } else {
        const out = d0 < 14 ? 0.8 : d0 > 22 ? -0.3 : 0.2;
        mx = -rz * sdir + rx * out; mz = rx * sdir + rz * out;
      }
      const k2 = Math.hypot(mx, mz) || 1; mx /= k2; mz /= k2;
      if (!inArea(B.x + mx * 15, B.z + mz * 15) && time - lastFlip > 2) { sdir = -sdir; lastFlip = time; }
      if (!inArea(B.x + mx * 6, B.z + mz * 6)) { const ox = site.x - B.x, oz = site.z - B.z, od = Math.hypot(ox, oz) || 1; mx = ox / od; mz = oz / od; }
    }
    if (bot === "dodger" && w.dash.charges >= 1 && time >= w.dash.until) {
      const th = threatOf(g, B, mine, time);
      if (th) {
        const px = -th.z, pz = th.x, score = s => { const x = B.x + px * s * 10, z = B.z + pz * s * 10; return (inArea(x, z) ? 0 : -1e6) + Math.min(1e3, ...live.map(c => Math.hypot(c.x - x, c.z - z))); };
        const s = score(1) >= score(-1) ? 1 : -1;
        dash = true; mx = px * s; mz = pz * s; aimX = mx * 10; aimZ = mz * 10;
      }
    }
    const was = w.dash.at;
    stepGame(g, { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0, dash, aimX, aimZ, fire }, dt);
    if (w.dash.at !== was) R.blinks++;
    w.health.hp = Math.max(w.health.hp, 1e5);
    const hp = w.health.hp; if (hp < lastHp) R.blows += lastHp - hp; lastHp = hp;
    // her state
    const slowNow = w.slowUntil !== undefined && time < w.slowUntil && (w.slowMult ?? 1) < 1;
    if (slowNow) R.slowS += dt; if (slowNow && !slowWas) R.slows++; slowWas = slowNow;
    if (stunned(w.knock, ht)) R.staggerS += dt;
    if (w.confused && ht < w.confused.until) R.confusedS += dt;
    if (w.knock && w.knock.at !== knockAt && Number.isFinite(w.knock.at)) { knockAt = w.knock.at; R.knockM += Math.hypot(w.knock.kx, w.knock.kz) / t.witch.knock.ease; }
    // what she was shown
    const S = g.combat.spells;
    for (const tg of S?.telegraphs ?? []) if (mine.has(tg.source) && !seenTg.has(tg.id)) { seenTg.add(tg.id); R.telegraphs[tg.kind] = (R.telegraphs[tg.kind] ?? 0) + 1; }
    for (const [id, tl] of S?.tells ?? []) if (mine.has(id) && !seenTell.has(`${id}:${tl.from}`)) { seenTell.add(`${id}:${tl.from}`); const p = `${tl.pose}${tl.glow ? "+glow" : ""}`; R.poses[p] = (R.poses[p] ?? 0) + 1; }
    for (const id of ids) {
      const c = g.creatures[id], fw = c.fight;
      if (fw?.windupUntil > 0 && fw.target?.kind === "witch") { const key = `${id}:${fw.windupAt ?? fw.windupUntil}`; if (!seenWind.has(key)) { seenWind.add(key); const a = fw.spellCast !== undefined ? "grammar windup" : `pack windup${fw.packMove ? ` (${fw.packMove})` : ""}`; R.actions[a] = (R.actions[a] ?? 0) + 1; } }
    }
    for (const e of g.combat.events) if (mine.has(e.id) && e.at === time && ["packSpecial", "charged", "leapt", "burrowed", "swooped", "packPull", "packMind"].includes(e.kind)) R.actions[e.kind] = (R.actions[e.kind] ?? 0) + 1;
    // pursuit
    if (bot === "chase") {
      for (const e of w.invites.events) { if (e.kind === "shot") R.sent++; if (e.kind === "hit" && mine.has(e.id)) { R.landed++; const c = g.creatures[e.id]; R.hitSpeeds.push(Math.hypot(c.vx ?? 0, c.vz ?? 0)); } }
      if (!Number.isFinite(R.firstStun) && ids.some(i => g.creatures[i].dazed || g.creatures[i].leashed || g.creatures[i].state === "happy")) R.firstStun = time;
    }
    if (near) { // (its speed while near her: how often it stands still, and for how long at a time)
      const v = Math.hypot(near.vx ?? 0, near.vz ?? 0), d = Math.hypot(near.x - B.x, near.z - B.z);
      if (d < 30) { R.speeds.push(v); if (v < 2) stillRun += dt; else { if (stillRun > 0.1) R.windows.push(stillRun); stillRun = 0; } }
    }
  }
  undo?.();
  R.stillShare = R.speeds.length ? R.speeds.filter(v => v < 2).length / R.speeds.length : NaN;
  return R;
}

const fmt = (o, k = 1) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([n, v]) => `${n} ${+(v / k).toFixed(1)}`).join(", ") || "–";
const out = [], perMin = x => (x / (TIME * SEEDS)) * 60;
console.log(`attack audit: ${SEEDS} seeds × ${TIME} s, react ${REACT} s; per minute unless said\n`);
console.log("| kind | lvl | n | bot | blows/min | blows by path | slowed s/min | staggered s/min | confused s/min | knocked m/min | blinks/min | telegraphs/min | tells/min | actions/min |");
console.log("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|");
for (const sp of KINDS) for (const level of LEVELS) for (const n of NS) for (const bot of BOTS) {
  const rs = Array.from({ length: SEEDS }, (_, s) => run(s + 1, sp, n, level, bot));
  const sum = k => rs.reduce((a, r) => a + r[k], 0), merge = k => rs.reduce((a, r) => { for (const [x, v] of Object.entries(r[k])) a[x] = (a[x] ?? 0) + v; return a; }, {});
  const k = (TIME * SEEDS) / 60;
  const row = { kind: sp, level, n, bot, blows: perMin(sum("blows")), paths: merge("paths"), slow: perMin(sum("slowS")), stagger: perMin(sum("staggerS")), confused: perMin(sum("confusedS")), knock: perMin(sum("knockM")), blinks: perMin(sum("blinks")),
    telegraphs: merge("telegraphs"), poses: merge("poses"), actions: merge("actions"), stillShare: mean(rs.map(r => r.stillShare)), windows: rs.flatMap(r => r.windows), speeds: rs.flatMap(r => r.speeds) };
  if (bot === "chase") Object.assign(row, { sent: perMin(sum("sent")), landed: perMin(sum("landed")), firstStun: median(rs.map(r => r.firstStun)), hitSpeed: median(rs.flatMap(r => r.hitSpeeds)), medSpeed: median(row.speeds) });
  out.push({ ...row, windows: undefined, speeds: undefined, medWindow: median(row.windows), windowsPerMin: row.windows.length / k });
  console.log(`| ${sp} | ${level} | ${n} | ${bot} | ${row.blows.toFixed(1)} | ${fmt(row.paths, k)} | ${row.slow.toFixed(1)} | ${row.stagger.toFixed(1)} | ${row.confused.toFixed(1)} | ${row.knock.toFixed(0)} | ${row.blinks.toFixed(0)} | ${fmt(row.telegraphs, k)} | ${fmt(row.poses, k)} | ${fmt(row.actions, k)} |`);
}
console.log("\n### pursuit (chase bot) and windows (any bot: the nearest within 30 m, standing still = under 2 m/s)\n");
console.log("| kind | lvl | n | bot | 💌 sent/min | landed/min | landed share | first stun s | its median speed m/s | its speed at a landed 💌 | still share | still spells/min | median still spell s |");
console.log("|---|---|---|---|---|---|---|---|---|---|---|---|---|");
for (const r of out) if (r.bot === "chase" || r.bot === "strafe") console.log(`| ${r.kind} | ${r.level} | ${r.n} | ${r.bot} | ${r.sent?.toFixed(0) ?? "–"} | ${r.landed?.toFixed(1) ?? "–"} | ${r.sent ? Math.round((100 * r.landed) / r.sent) + "%" : "–"} | ${r.firstStun === undefined ? "–" : Number.isFinite(r.firstStun) ? r.firstStun.toFixed(1) : "never"} | ${r.medSpeed?.toFixed(1) ?? "–"} | ${r.hitSpeed !== undefined && !Number.isNaN(r.hitSpeed) ? r.hitSpeed.toFixed(1) : "–"} | ${Math.round(r.stillShare * 100)}% | ${r.windowsPerMin.toFixed(1)} | ${Number.isNaN(r.medWindow) ? "–" : r.medWindow.toFixed(2)} |`);
const json = arg("json", "");
if (json) writeFileSync(json, JSON.stringify(out, null, 1));
await close();
