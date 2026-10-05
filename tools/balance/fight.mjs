// How dangerous a fight is for the witch (Ed, 2026-10-05: "The place to balance is higher level
// fights – if there are many enemy creatures, and she has a buffed 💌 until it is a hose, it should
// still be challenging because of the number of enemies and how they move, and the fact that she
// only has a few hits"). A headless run of the real rules (src/rules/game.ts, its combat and the
// species' movement patterns): she stands on the ground among N wild creatures of a mix and a level,
// circling them at 💌 range the way a player keeps her distance, and we count the hits she takes a
// minute (her hits set high, so she isn't knocked out mid-measure). Then, with rules/throughput.ts,
// the hits she'd take filling that crowd with each build, against her 3 hits.
//   node tools/balance/fight.mjs [--seeds 2] [--sizes 2,4,8,12] [--mixes wolf,boar,raven,bat,mixed] [--levels 1,2] [--time 60] [--radius 16] [--moves 0,0.3,0.6] [--set fight.speed=1.25;combat.reaction=0.15]
import { createServer } from "vite";

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
const list = s => String(s).split(",");
const SEEDS = +arg("seeds", 2), SIZES = list(arg("sizes", "2,4,8,12")).map(Number), MIXES = list(arg("mixes", "wolf,boar,raven,bat,mixed")), LEVELS = list(arg("levels", "1,2")).map(Number);
const TIME = +arg("time", 60), RADIUS = +arg("radius", 16), MOVES = list(arg("moves", "0,0.3,0.6")).map(Number);
// Tuning overrides to try enemy-side knobs: --set "fight.speed=1.25;combat.reaction=0.15".
const SETS = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), Number(v)]; });
const MIX = { wolf: ["wolf"], boar: ["boar"], raven: ["raven"], bat: ["bat"], fox: ["fox"], mixed: ["wolf", "boar", "raven", "fox"] };

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const load = p => server.ssrLoadModule(p);
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");
const { throughput, crowdTime, INVITE_FIRE } = await load("/src/rules/throughput.ts");
const say = s => console.log(s), t0 = Date.now();
const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);

/** One measure: hits a minute among n of `mix` at `level`. */
function measure(seed, mix, n, level, move) {
  const over = { witchHealth: { ...TUNING.witchHealth, hits: 1e6 } };
  for (const [path, v] of SETS) { let o = over, src = TUNING; for (const k of path.slice(0, -1)) { src = src[k]; o = o[k] ??= { ...src }; } o[path[path.length - 1]] = v; }
  const t = withTuning(over);
  const g = newGame(seed, t), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true; // (no waves: just this fight)
  // A wild area two areas out from home: she stands at its middle.
  const [hx, hy] = g.map.centreCell, cell = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const ids = [];
  for (let i = 0; i < n; i++) {
    const c = spare[i], sp = MIX[mix][i % MIX[mix].length], a = (i / n) * Math.PI * 2, x = site.x + Math.cos(a) * 25, z = site.z + Math.sin(a) * 25;
    Object.assign(c, { species: sp, level, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(sp, level, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0 });
    ids.push(c.id);
  }
  let hits = 0, last = w.health.hp, ang = 0;
  const dt = 1 / 60;
  for (let f = 0; f < TIME * 60; f++) {
    // Circle the crowd at RADIUS (💌 range is 22 m), as a player keeping her distance does.
    const live = ids.map(i => g.creatures[i]).filter(c => !c.gone);
    const cx = live.length ? mean(live.map(c => c.x)) : site.x, cz = live.length ? mean(live.map(c => c.z)) : site.z;
    ang += (t.groundSpeed * move * dt) / RADIUS;
    const tx = cx + Math.cos(ang) * RADIUS, tz = cz + Math.sin(ang) * RADIUS, dx = tx - w.body.x, dz = tz - w.body.z, k = Math.hypot(dx, dz) || 1;
    // (Standing: she holds her spot. Circling: toward the next point on her circle, as fast as it moves.)
    const go = move > 0 ? Math.min(1, k / 2) : 0;
    stepGame(g, { moveX: (dx / k) * go, moveZ: (dz / k) * go, toggleMode: false, zoom: 0 }, dt);
    if (w.health.hp < last) hits += last - w.health.hp;
    last = w.health.hp;
  }
  return (hits / TIME) * 60;
}

const rate = {};
for (const mv of MOVES) for (const lvl of LEVELS) for (const mix of MIXES) for (const n of SIZES) {
  const k = `${mv},${lvl},${mix},${n}`;
  rate[k] = mean(Array.from({ length: SEEDS }, (_, i) => measure(1000 + i * 7919, mix, n, lvl, mv)));
  process.stderr.write(`move ${mv} L${lvl} ${mix} ×${n}: ${rate[k].toFixed(1)}/min\n`);
}
say(`${SETS.length ? `With ${SETS.map(([k, v]) => `${k.join(".")} = ${v}`).join(", ")}. ` : ""}Fight danger (the real rules, headless): she circles N wild creatures at ${RADIUS} m on the ground for ${TIME} s, ${SEEDS} seeds; hits she takes a minute (she has ${TUNING.witchHealth.hits}, one back every ${TUNING.witchHealth.repairTime} s out of the fight).\n`);
const MV = mv => (mv === 0 ? "standing" : `circling at ${Math.round(mv * 100)}% of her ground speed`);
for (const mv of MOVES) for (const lvl of LEVELS) {
  say(`**Hits a minute, ${["babies", "young", "adults"][lvl]}, ${MV(mv)}**\n`);
  say("| mix \\ crowd | " + SIZES.join(" | ") + " |");
  say("|---|" + SIZES.map(() => "---").join("|") + "|");
  for (const mix of MIXES) say(`| ${mix} | ` + SIZES.map(n => rate[`${mv},${lvl},${mix},${n}`].toFixed(1)).join(" | ") + " |");
  say("");
}
// Hits taken while filling that crowd, by build: the crowd's fill time × its hit rate.
const BUILDS = { "no buffs": [], "2 buffs (Flutter + Charm)": ["flutter", "charm"], "4 buffs (Echo Pierce Big heart Scamper)": ["echo", "pierce", "bigHeart", "scamper"], "7 (the worst stack)": ["flutter", "fan", "echo", "howl", "quickFire", "pierce", "spawn"] };
for (const mv of MOVES) for (const lvl of LEVELS) {
  say(`**Hits she takes inviting the whole crowd (${["babies", "young", "adults"][lvl]}, mixed, ${MV(mv)}), by build, and the seconds it takes: knocked out at ${TUNING.witchHealth.hits}**\n`);
  say("| build \\ crowd | " + SIZES.join(" | ") + " |");
  say("|---|" + SIZES.map(() => "---").join("|") + "|");
  for (const [name, b] of Object.entries(BUILDS)) {
    const tp = throughput(b);
    say(`| ${name} | ` + SIZES.map(n => { const secs = crowdTime(Array(n).fill(INVITE_FIRE.hits[lvl]), tp), h = (rate[`${mv},${lvl},mixed,${n}`] ?? rate[`${mv},${lvl},${MIXES[0]},${n}`]) * secs / 60; return `${h.toFixed(1)} (${secs.toFixed(0)} s)`; }).join(" | ") + " |");
  }
  say("");
}
say(`(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
await server.close();
