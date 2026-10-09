// Does dodging matter? (Ed, 2026-10-08: "almost all animals are easily evaded simply by walking backwards, even large
// swarms. Ideally good play should require effective use of dodge.") A headless run of the real rules (src/rules/game.ts,
// as tools/balance/fight.mjs): she stands on the ground in a wild area two out from home, a group of one kind placed 25 to 33 m
// off, and one of four bots plays her for `time` seconds (her hits set high, so she isn't knocked out mid-measure); we count
// the hits she takes a minute.
//   still   stands where she is
//   back    walks straight away from the middle of her three nearest attackers (bending to stay in the area)
//   strafe  walks sideways round the nearest, a little outward when it's close
//   dodger  strafes, and blinks (both charges, tuning dash.charges) when a blow at her is about to land: a melee strike whose aim
//           has locked (dodge.a.commit before it lets go; blinking sooner, it aims where she lands), a lunge let go at her, a pulse
//           about to go off, a shot about to hit, a lob about to land on her, a charge or a leap about to arrive;
//           sideways to it, the side that keeps her in the area and furthest from the rest
// For each set of the dodge changes (tuning dodge: a committed strikes, b predictive aim, c packs cutting off her retreat) it
// prints the hits a minute by group and bot, and how they stand against the targets (Ed, 2026-10-08): backing off and
// strafing take at least half of standing's hits; the dodger at most a quarter of the backer's; at most about 6 a minute in a
// swarm of 12 or more.
//   node tools/balance/dodgebot.mjs [--dodge none,a,b,c,abc] [--groups wolf*4,boar*4,...] [--all] [--bots still,back,strafe,dodger]
//                                   [--seeds 2] [--time 60] [--react 0.15] [--levels 2] [--set "dodge.a.lead=0.9;dash.charges=2"] [--json out.json]
import { writeFileSync } from "node:fs";
import { openRules, arg, list, mean } from "./lib.mjs";

const SEEDS = +arg("seeds", 2), TIME = +arg("time", 60), LEVELS = list(arg("levels", "2")).map(Number);
const DODGES = list(arg("dodge", "none,a,b,c,abc"));
const BOTS = list(arg("bots", "still,back,strafe,dodger"));
const SETS = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), Number(v)]; });
const SWARM = 12;
/** The dodger's reaction (s): it sees a lunge or a shot only this long after it's let go (a skilled player's eye and thumb). */
const REACT = +arg("react", 0.15);

const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");
const { attackOf } = await load("/src/rules/combat/data.ts");
const { MOVEMENT } = await load("/src/rules/movement.ts");

const SPECIES = Object.keys(MOVEMENT.profiles);
const DEFAULT_GROUPS = "wolf*4,boar*4,stag*4,fox*4,hare*4,bear*1,raven*4,owl*4,moth*4,spider*4,snake*4,salamander*2,toad*4,lynx*2,hedgehog*4,wolf*12,fox*12,bat*16,beetle*16,moth*16";
const GROUPS = (process.argv.includes("--all") ? SPECIES.flatMap(s => [`${s}*1`, `${s}*4`]).concat(["wolf*12", "fox*12", "bat*16", "beetle*16", "moth*16"]) : list(arg("groups", DEFAULT_GROUPS)))
  .map(s => { const [sp, n] = s.split("*"); return { sp, n: +(n ?? 4) }; });

/** The tuning for a set of the dodge changes ("none", or letters of a, b, c), her hits endless, and any --set. */
function tuningFor(dodge) {
  const on = k => dodge !== "none" && dodge.includes(k), D = TUNING.dodge;
  const over = { witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, dodge: { a: { ...D.a, on: on("a") }, b: { ...D.b, on: on("b") }, c: { ...D.c, on: on("c") } } };
  for (const [path, v] of SETS) { let o = over, src = TUNING; for (const k of path.slice(0, -1)) { src = src[k]; o = o[k] ??= { ...src }; } o[path[path.length - 1]] = v; }
  return withTuning(over);
}

/** One run: hits a minute for `bot` among n of `sp` at `level`, and how it went. */
function measure(seed, sp, n, level, bot, t) {
  const g = newGame(seed, t), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true; // (no waves: just this fight)
  const [hx, hy] = g.map.centreCell, cell = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  const inArea = (x, z) => { const q = g.map.cellSafe(x, z).cell; return q[0] === cell[0] && q[1] === cell[1]; };
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const ids = [], arc = n > 4 ? Math.PI * 2 : Math.PI / 2;
  for (let i = 0; i < n; i++) {
    const c = spare[i], a = arc * ((i + 0.5) / n - 0.5), r = 25 + (i % 3) * 4, x = site.x + Math.cos(a) * r, z = site.z + Math.sin(a) * r;
    Object.assign(c, { species: sp, level, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(sp, level, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0, circle: undefined });
    ids.push(c.id);
  }
  // (the area's own creatures out of it: only the group fights her)
  for (const c of g.creatures) if (!ids.includes(c.id) && Math.hypot(c.x - site.x, c.z - site.z) < 260) c.gone = true;
  g.byArea = null;
  const dt = 1 / 60, F = Math.round(TIME / dt), mine = new Set(ids);
  let lastHp = w.health.hp, hits = 0, blinks = 0, doubles = 0, lastBlink = -Infinity, sdir = 1;
  for (let f = 0; f < F; f++) {
    const B = w.body, time = g.clock.time;
    const live = ids.map(i => g.creatures[i]).filter(c => !c.gone && !c.dazed && c.fleeUntil === undefined && c.state !== "happy" && !c.leashed);
    const onHer = live.filter(c => c.fight?.target?.kind === "witch");
    const near = onHer.filter(c => Math.hypot(c.x - B.x, c.z - B.z) < 45).sort((a, b) => Math.hypot(a.x - B.x, a.z - B.z) - Math.hypot(b.x - B.x, b.z - B.z)).slice(0, 3);
    let mx = 0, mz = 0, dash = false, aimX = 0, aimZ = 0;
    if (bot !== "still" && near.length) {
      let ax = B.x - mean(near.map(c => c.x)), az = B.z - mean(near.map(c => c.z)), k = Math.hypot(ax, az) || 1; ax /= k; az /= k;
      if (bot === "back") {
        const a0 = Math.atan2(az, ax); let found = false;
        for (const da of [0, 0.3, -0.3, 0.6, -0.6, 0.9, -0.9, 1.2, -1.2, 1.5, -1.5, 1.8, -1.8, 2.1, -2.1, 2.4, -2.4, 2.8, -2.8, Math.PI]) {
          const a = a0 + da, ex = Math.cos(a), ez = Math.sin(a);
          if (inArea(B.x + ex * 10, B.z + ez * 10) && inArea(B.x + ex * 20, B.z + ez * 20)) { ax = ex; az = ez; found = true; break; }
        }
        if (!found) { const ox = site.x - B.x, oz = site.z - B.z, od = Math.hypot(ox, oz) || 1; ax = ox / od; az = oz / od; }
      } else {
        // strafe (and the dodger): sideways to the nearest, a little outward when it's close, turning back at the area's edge
        const n0 = near[0], d0 = Math.hypot(B.x - n0.x, B.z - n0.z) || 1, rx = (B.x - n0.x) / d0, rz = (B.z - n0.z) / d0, out = d0 < 14 ? 0.8 : d0 > 22 ? -0.3 : 0.2;
        let ok = false;
        for (let tries = 0; tries < 2 && !ok; tries++) { ax = -rz * sdir + rx * out; az = rx * sdir + rz * out; const k2 = Math.hypot(ax, az) || 1; ax /= k2; az /= k2; ok = inArea(B.x + ax * 15, B.z + az * 15); if (!ok) sdir = -sdir; }
        if (!ok) { const ox = site.x - B.x, oz = site.z - B.z, od = Math.hypot(ox, oz) || 1; ax = ox / od; az = oz / od; }
      }
      mx = ax; mz = az;
    }
    if (bot === "dodger" && w.dash.charges >= 1 && time >= w.dash.until) {
      const threat = threatOf(g, B, onHer, mine, time, t);
      if (threat) {
        // sideways to it: of the two sides, the one in the area and furthest from the rest of them
        const px = -threat.z, pz = threat.x;
        const score = s => { const x = B.x + px * s * 10, z = B.z + pz * s * 10; return (inArea(x, z) ? 0 : -1e6) + Math.min(1e3, ...onHer.map(c => Math.hypot(c.x - x, c.z - z))); };
        const s = score(1) >= score(-1) ? 1 : -1;
        dash = true; aimX = px * s * 10; aimZ = pz * s * 10;
      }
    }
    if (process.env.DBG && f % 30 === 0) { const c = g.creatures[ids[0]]; console.log(bot, time.toFixed(1), "d", Math.hypot(c.x - B.x, c.z - B.z).toFixed(1), "v", Math.hypot(B.vx, B.vz).toFixed(1), "cv", Math.hypot(c.vx ?? 0, c.vz ?? 0).toFixed(1), c.fight?.target?.kind ?? "-", c.fight?.windupUntil ? "W" : "", c.fight?.lunge ? "L" : "", c.retreat ? "R" : "", c.hunting ?? "", "watch", c.watchUntil !== undefined && c.watchUntil > time ? "y" : ""); }
    const was = w.dash.at;
    stepGame(g, { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0, dash, aimX, aimZ }, dt);
    if (w.dash.at !== was) { if (w.dash.at - lastBlink < t.dash.cooldown) doubles++; blinks++; lastBlink = w.dash.at; } // (a second blink before the first's cooldown: both charges used)
    const hp = w.health.hp; if (hp < lastHp) {
      hits += lastHp - hp;
      if (process.env.HITS) console.log("hit", bot, time.toFixed(2), "charges", w.dash.charges, "since blink", (time - lastBlink).toFixed(2), "|", ids.map(i => g.creatures[i]).filter(c => Math.hypot(c.x - w.body.x, c.z - w.body.z) < 25).map(c => `${c.fight?.lunge ? "U" : ""}${c.fight?.windupUntil ? "W" : ""}${c.charge ? "C" : ""}${Math.hypot(c.x - w.body.x, c.z - w.body.z).toFixed(1)}`).join(" "));
    }
    lastHp = hp;
  }
  return { hpm: (hits / TIME) * 60, blinks: (blinks / TIME) * 60, doubles };
}

/** The blow about to land on her, as the way it comes at her (a unit vector), or null. */
function threatOf(g, B, onHer, mine, time, t) {
  const commit = t.dodge?.a.on ? t.dodge.a.commit : 0;
  const at = (x, z) => { const dx = B.x - x, dz = B.z - z, d = Math.hypot(dx, dz) || 1; return { x: dx / d, z: dz / d }; };
  for (const c of onHer) {
    const f = c.fight, d = Math.hypot(c.x - B.x, c.z - B.z), A = attackOf(c.species, c.level)?.attack;
    if (!A) continue;
    // a lunge let go at her and about to reach her (blinking before it lets go, it aims where she lands), or a pulse about to go off
    if (f.lunge && time - (f.readyAt - A.cooldown) >= REACT && d < f.lunge.left + A.range + 2) return { x: f.lunge.dx, z: f.lunge.dz };
    // committed strikes: its aim locked (dodge.a.commit before it lets go), seen REACT after, within its reach
    if (commit > REACT && A.delivery === "melee" && f.windupUntil > 0 && f.windupUntil - time <= commit - REACT && d <= (A.lunge ?? 0) * t.dodge.a.lunge + A.range + 3) return at(c.x, c.z);
    if (A.delivery === "pulse" && f.windupUntil > 0 && f.windupUntil - time <= 0.1 && d <= (A.radius ?? 5) + 2) return at(c.x, c.z); // (its windup seen long before)
    if (c.charge && time >= (c.charge.from ?? 0) + REACT && d < 16) { const k = Math.hypot(c.charge.dx, c.charge.dz) || 1; if (((B.x - c.x) * c.charge.dx + (B.z - c.z) * c.charge.dz) / (k * d) > 0.8) return { x: c.charge.dx / k, z: c.charge.dz / k }; }
    if (c.leap && c.leap.lands - time <= 0.2 && Math.hypot(c.leap.tx - B.x, c.leap.tz - B.z) < 6) return at(c.x, c.z);
  }
  for (const s of g.combat.shots) {
    if (!mine.has(s.from)) continue; // (a shot in flight is seen coming: dodged 0.2 s out)
    if (s.lob) { if (s.lob.lands - time <= 0.2 && Math.hypot(s.lob.tx - B.x, s.lob.tz - B.z) < (s.radius ?? 4) + 1.5) return at(s.lob.fx, s.lob.fz); continue; }
    // (closest approach as she moves: the shot's velocity relative to hers)
    const rx = B.x - s.x, rz = B.z - s.z, ux = s.vx - B.vx, uz = s.vz - B.vz, v2 = ux * ux + uz * uz || 1, tc = (rx * ux + rz * uz) / v2;
    if (tc < 0 || tc > 0.2) continue;
    const mxs = rx - ux * tc, mzs = rz - uz * tc;
    if (Math.hypot(mxs, mzs) < (s.radius ?? 0.6) + 1.5) { const v = Math.sqrt(v2); return { x: s.vx / v, z: s.vz / v }; }
  }
  for (const b of g.combat.beams) if (mine.has(b.from)) { const c = g.creatures[b.from]; if (Math.hypot(c.x - B.x, c.z - B.z) < b.length + 1) return at(c.x, c.z); }
  return null;
}

const out = {}, say = s => console.log(s), t0 = Date.now();
for (const dodge of DODGES) {
  const t = tuningFor(dodge);
  say(`\n### dodge: ${dodge === "none" ? "none (as before)" : dodge.split("").join(" + ")}\n`);
  say(`| group | ${BOTS.join(" | ")} | blinks/min (dodger) |`);
  say(`|---|${BOTS.map(() => "---").join("|")}|---|`);
  const rows = [];
  for (const lvl of LEVELS) for (const { sp, n } of GROUPS) {
    const r = {};
    let blinks = 0, doubles = 0;
    for (const bot of BOTS) {
      const rs = []; for (let s = 1; s <= SEEDS; s++) rs.push(measure(s, sp, n, lvl, bot, t));
      r[bot] = mean(rs.map(x => x.hpm));
      if (bot === "dodger") { blinks = mean(rs.map(x => x.blinks)); doubles = rs.reduce((a, x) => a + x.doubles, 0); }
    }
    rows.push({ group: `${sp}*${n}${LEVELS.length > 1 ? `@${lvl}` : ""}`, n, ...r, blinks, doubles });
    say(`| ${sp}×${n}${LEVELS.length > 1 ? ` (level ${lvl})` : ""} | ${BOTS.map(b => r[b].toFixed(1)).join(" | ")} | ${BOTS.includes("dodger") ? `${blinks.toFixed(0)} (${doubles} doubles)` : ""} |`);
  }
  // Against the targets: shares of standing's (back, strafe) and of the backer's (dodger), by the median over the groups.
  const med = a => { const b = a.filter(x => Number.isFinite(x)).sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : NaN; };
  const share = (a, b) => med(rows.filter(r => r[b] > 0.5).map(r => r[a] / r[b]));
  const swarm = rows.filter(r => r.n >= SWARM);
  const sum = { back: share("back", "still"), strafe: share("strafe", "still"), dodger: share("dodger", "back"), swarmDodger: Math.max(...swarm.map(r => r.dodger ?? NaN)) };
  out[dodge] = { rows, sum };
  say(`\nmedian back/still ${Math.round(sum.back * 100)}% (target ≥ 50%), strafe/still ${Math.round(sum.strafe * 100)}% (≥ 50%), dodger/back ${Math.round(sum.dodger * 100)}% (≤ 25%), worst swarm (${SWARM}+) dodger ${sum.swarmDodger.toFixed(1)}/min (≤ about 6)`);
}
say(`\n(${SEEDS} seeds × ${TIME} s, ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
const json = arg("json", "");
if (json) writeFileSync(json, JSON.stringify(out, null, 1));
await close();
