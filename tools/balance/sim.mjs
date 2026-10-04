// The balance simulator's runner (src/rules/balance.ts): many seeds, wave gaps of 60 s and 300 s.
// Prints markdown tables (for the PR's REPORT):
//  - the idle player's loss, and the enemy's fighting value wave by wave;
//  - the skill spread (Ed, 2026-10-04: "the difference between a good player and a bad player is
//    small... you just go along and then suddenly get steamrolled"): the wave and time a player
//    growing at g F a minute lasts to, for each pacing variant: (a) the distance table only,
//    (b) a + attrition on the march, (c) a + the director at a few alphas, (d) b + c; and no
//    merging at all (every survivor scatters), to show what the snowball costs;
//  - the catch-up check: players starting late.
//
//   node tools/balance/sim.mjs [--seeds 12] [--gaps 60,300] [--skills 10,30,50,70,100] [--cap 60]
//     [--growth 30,50,70] [--starts 0,3,6,9,12,15,20] [--waves 30] [--fight 30]
//     [--attrition 0.5] [--director base,perWave,power] [--by-wave] [--expected 50] [--alphas 0,0.3,0.6]
//     [--table '<population table JSON>'] [--scale 1] [--health 4000] [--home 8000] [--legacy] [--quick] [--json out.json]
// --table, --scale (young and adults times this), --health and --home (soundsystems' and home's
// health) try numbers without editing the tuning file; --legacy uses today's populations by
// remoteness instead of the distance table; --quick leaves out the catch-up check; --by-wave sets
// the director's budget by waves rather than by minutes; --no-area-legends leaves out every area's
// own legend (Ed, 2026-10-04) and keeps the map's wild legends as today.
// It loads the game's own rules modules through Vite (no build needed).
import { createServer } from "vite";
import { writeFileSync } from "node:fs";

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
const flag = name => process.argv.includes(`--${name}`);
const list = s => String(s).split(",").map(Number);
const SEEDS = +arg("seeds", 12), GAPS = list(arg("gaps", "60,300")), GROWTH = list(arg("growth", "30,50,70")), SKILLS = list(arg("skills", "10,30,50,70,100"));
const WAVES = +arg("waves", 30), CAP = +arg("cap", 60), IDLE_CAP = +arg("idle-cap", 80), FIGHT = +arg("fight", 30), STARTS = list(arg("starts", "0,3,6,9,12,15,20"));
const ATTRITION = +arg("attrition", 0.5), [DBASE, DPER, DPOW = 1] = list(arg("director", "0,4,1.5")), EXPECTED = +arg("expected", 50), ALPHAS = list(arg("alphas", "0,0.3,0.6"));
const TABLE = arg("table", null), OUT = arg("json", null), SCALE = +arg("scale", 1), HEALTH = arg("health", null), HOME = arg("home", null);

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const load = p => server.ssrLoadModule(p);
const { generateMap } = await load("/src/rules/map.ts");
const { TUNING } = await load("/src/rules/tuning.ts");
const { simulate } = await load("/src/rules/balance.ts");
const table = (TABLE ? JSON.parse(TABLE) : TUNING.population.table).map(r => ({ ...r, young: r.young * SCALE, adults: r.adults * SCALE }));
const tuning = { ...TUNING, population: { ...TUNING.population, byDistance: !flag("legacy"), table }, combat: { ...TUNING.combat, ...(HEALTH ? { soundsystemHealth: +HEALTH } : {}), ...(HOME ? { homeHealth: +HOME } : {}) } };

const mean = a => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);
const f0 = x => (x === null || x === undefined || Number.isNaN(x) ? "–" : Math.round(x).toString());
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const seeds = Array.from({ length: SEEDS }, (_, i) => 1000 + i * 7919);
const t0 = Date.now(), maps = seeds.map(s => generateMap(s, tuning)), out = { seeds, tuning: { table, health: tuning.combat.soundsystemHealth, home: tuning.combat.homeHealth }, gaps: {} };
const lines = [];
const say = s => { lines.push(s); console.log(s); };
const BY_WAVE = flag("by-wave"), director = alpha => ({ base: DBASE, perWave: DPER, power: DPOW, alpha, expected: EXPECTED, byTime: !BY_WAVE });
const VARIANTS = [
  { id: "a", name: "a. distance table only", o: {} },
  { id: "b", name: `b. a + attrition (${Math.round(ATTRITION * 100)}% march on)`, o: { marchOn: ATTRITION } },
  ...ALPHAS.map(al => ({ id: `c${al}`, name: `c. a + director, α ${al}`, o: { director: director(al) } })),
  ...ALPHAS.filter(al => al > 0).map(al => ({ id: `d${al}`, name: `d. b + director, α ${al}`, o: { marchOn: ATTRITION, director: director(al) } })),
  { id: "none", name: "no merging (every survivor scatters)", o: { marchOn: 0 } },
];
const LEGENDS = !flag("no-area-legends"), runAll = o => maps.map(m => simulate(m, { areaLegends: LEGENDS, ...o }));
const lastTime = r => (r.lost ? r.lost.time : r.waves[r.waves.length - 1]?.time ?? 0);

say(`Balance simulator: ${SEEDS} seeds (${seeds[0]}, ${seeds[1]}, …), ${flag("legacy") ? "today's populations by remoteness" : `population table ${TABLE ? "from --table" : "from config/tuning.json"}${SCALE !== 1 ? ` (young and adults × ${SCALE})` : ""}`}, soundsystems ${tuning.combat.soundsystemHealth} hp, home ${tuning.combat.homeHealth} hp.`);
say(`${LEGENDS ? "Every woken area's own legend (Ed, 2026-10-04: 480 hp, 12 dps, F 76) besieges its own soundsystem and never marches on; no other legends" : "The map's wild legends as today (--no-area-legends)"}. Evolution stops at adult (Ed, 2026-10-04), so the player's F is adults' worth at most: 29 each, so g F a minute is about g / 29 adults a minute.\n`);
say(`Player model (a guess): their party's F grows by g a minute from the wave they start; whenever free they fight the biggest siege they can beat (square law: they keep √(theirs² − its²)), then are busy ${FIGHT} s. Director (a guess): reinforcements (adults) for the next wave's areas worth (${DBASE} + ${DPER} × ${BY_WAVE ? "wave" : "minute"}${DPOW !== 1 ? `^${DPOW}` : ""}) F ${BY_WAVE ? "a wave" : "a minute (by time, the same whatever the gap)"} × max(0, 1 + α(player F / expected − 1)), expected ${EXPECTED} F a minute.\n`);

for (const gap of GAPS) {
  const g = (out.gaps[gap] = { variants: {} });
  say(`### Waves every ${gap} s\n`);
  // Idle player and the enemy curve, variant a.
  const idle = runAll({ interval: gap, maxWaves: IDLE_CAP }), lostRuns = idle.filter(r => r.lost);
  say(`**Idle player** (does nothing), variant a: loses at wave ${idle.map(r => (r.lost ? r.lost.wave : `>${IDLE_CAP}`)).join(", ")}; mean ${lostRuns.length ? mean(lostRuns.map(r => r.lost.wave)).toFixed(1) : "–"} at ${lostRuns.length ? mmss(mean(lostRuns.map(r => r.lost.time))) : "–"}${idle.length - lostRuns.length ? ` (of the ${lostRuns.length} that lose; ${idle.length - lostRuns.length} last past wave ${IDLE_CAP})` : ""}.\n`);
  const W = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50].filter(w => w <= IDLE_CAP);
  say(`**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):\n`);
  say("| wave | " + W.join(" | ") + " |");
  say("|---|" + W.map(() => "---").join("|") + "|");
  const at = w => idle.map(r => r.waves.find(s => s.wave === w)).filter(Boolean);
  say("| biggest siege F | " + W.map(w => f0(mean(at(w).map(s => s.largest)))).join(" | ") + " |");
  say("| all besiegers F | " + W.map(w => f0(mean(at(w).map(s => s.marching)))).join(" | ") + " |");
  say("| sieges going | " + W.map(w => (at(w).length ? mean(at(w).map(s => s.groups)).toFixed(1) : "–")).join(" | ") + " |");
  say("| biggest / all | " + W.map(w => { const a = at(w), m = mean(a.map(s => s.marching)); return a.length && m > 0 ? (mean(a.map(s => s.largest)) / m).toFixed(2) : "–"; }).join(" | ") + " |");
  say("| standing | " + W.map(w => (at(w).length ? mean(at(w).map(s => s.standing)).toFixed(1) : "–")).join(" | ") + " |\n");

  // The skill spread, every variant.
  say(`**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap ${CAP}: "${CAP}+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").\n`);
  say("| variant | idle | " + SKILLS.map(s => `g ${s}`).join(" | ") + " | 100 / 50 |");
  say("|---|---|" + SKILLS.map(() => "---").join("|") + "|---|");
  for (const v of VARIANTS) {
    const row = [], res = {};
    for (const s of [0, ...SKILLS]) {
      const runs = runAll({ interval: gap, maxWaves: CAP, ...v.o, ...(s > 0 ? { player: { growth: s, fromWave: 0, fightTime: FIGHT } } : {}) });
      const waves = mean(runs.map(r => r.survived)), all = runs.every(r => !r.lost);
      res[s] = { waves, time: mean(runs.map(lastTime)), all, runs: runs.map(r => ({ seed: r.seed, survived: r.survived, lost: r.lost })) };
      row.push(all ? `${CAP}+` : `${waves.toFixed(1)} (${mmss(res[s].time)})`);
    }
    g.variants[v.id] = res;
    const ratio = res[100] && res[50] ? (res[100].waves / Math.max(1, res[50].waves)).toFixed(2) + (res[100].all ? "+" : "") : "–";
    say(`| ${v.name} | ${row.join(" | ")} | ${ratio} |`);
  }
  say("");
  if (flag("quick")) continue;
  // The catch-up check, variant a: a player growing at g F a minute, starting at wave s.
  say(`**Catch-up check**, variant a (waves survived out of ${WAVES}, mean over seeds; ✓ = every seed lasted all ${WAVES}): rows are growth rates, columns the wave the player starts at\n`);
  say("| growth F/min | " + STARTS.map(s => (s === 0 ? "from start" : `from wave ${s}`)).join(" | ") + " | unrecoverable from |");
  say("|---|" + STARTS.map(() => "---").join("|") + "|---|");
  for (const growth of GROWTH) {
    const cells = [];
    let worst = null;
    for (const s of STARTS) {
      const runs = runAll({ interval: gap, maxWaves: WAVES, player: { growth, fromWave: s, fightTime: FIGHT } }), all = runs.every(r => !r.lost);
      cells.push(all ? `✓ ${WAVES}` : `${mean(runs.map(r => r.survived)).toFixed(1)} (${runs.filter(r => !r.lost).length}/${runs.length})`);
      if (!all && worst === null) worst = s;
    }
    say(`| ${growth} | ${cells.join(" | ")} | ${worst === null ? `later than wave ${STARTS[STARTS.length - 1]}` : worst === 0 ? "the start" : `wave ${worst}`} |`);
  }
  say("");
}
say(`(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
if (OUT) writeFileSync(OUT, JSON.stringify(out, null, 1));
await server.close();
