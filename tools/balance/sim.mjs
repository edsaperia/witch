// The balance simulator's runner (src/rules/balance.ts): many seeds, wave gaps of 60 s and 300 s,
// the idle player's loss, the enemy's fighting value wave by wave, and the catch-up check for
// players growing at a few rates and starting late. Prints markdown tables (for the PR's REPORT).
//
//   node tools/balance/sim.mjs [--seeds 12] [--gaps 60,300] [--growth 30,50,70] [--waves 30] [--idle-cap 80]
//                              [--fight 30] [--starts 0,3,6,9,12,15,20] [--table '<population table JSON>'] [--scale 1]
//                              [--health 4000] [--home 8000] [--idle-only] [--json out.json]
// --table, --scale (young and adults times this), --health and --home (soundsystems' and home's
// health) try numbers without editing the tuning file.
//
// It loads the game's own rules modules through Vite (no build needed).
import { createServer } from "vite";
import { writeFileSync } from "node:fs";

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
const list = s => String(s).split(",").map(Number);
const SEEDS = +arg("seeds", 12), GAPS = list(arg("gaps", "60,300")), GROWTH = list(arg("growth", "30,50,70"));
const WAVES = +arg("waves", 30), IDLE_CAP = +arg("idle-cap", 80), FIGHT = +arg("fight", 30), STARTS = list(arg("starts", "0,3,6,9,12,15,20"));
const TABLE = arg("table", null), OUT = arg("json", null), SCALE = +arg("scale", 1), IDLE_ONLY = process.argv.includes("--idle-only");
const HEALTH = arg("health", null), HOME = arg("home", null);

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const load = p => server.ssrLoadModule(p);
const { generateMap } = await load("/src/rules/map.ts");
const { TUNING } = await load("/src/rules/tuning.ts");
const { simulate } = await load("/src/rules/balance.ts");
const table = (TABLE ? JSON.parse(TABLE) : TUNING.population.table).map(r => ({ ...r, young: r.young * SCALE, adults: r.adults * SCALE }));
const tuning = { ...TUNING, population: { ...TUNING.population, table }, combat: { ...TUNING.combat, ...(HEALTH ? { soundsystemHealth: +HEALTH } : {}), ...(HOME ? { homeHealth: +HOME } : {}) } };

const mean = a => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);
const f0 = x => (x === null || x === undefined ? "–" : Math.round(x).toString());
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const seeds = Array.from({ length: SEEDS }, (_, i) => 1000 + i * 7919);
const t0 = Date.now(), maps = seeds.map(s => generateMap(s, tuning)), out = { seeds, gaps: {} };
const lines = [];
const say = s => { lines.push(s); console.log(s); };
say(`Balance simulator: ${SEEDS} seeds (${seeds[0]}…), population table ${TABLE ? "from --table" : "from config/tuning.json"}${SCALE !== 1 ? ` (young and adults × ${SCALE})` : ""}, soundsystems ${tuning.combat.soundsystemHealth} hp, home ${tuning.combat.homeHealth} hp; player model: grows from the wave they start, fights the biggest siege they can beat, busy ${FIGHT} s after each fight.\n`);

for (const gap of GAPS) {
  const idle = maps.map(m => simulate(m, { interval: gap, maxWaves: IDLE_CAP }));
  const g = (out.gaps[gap] = { idle: idle.map(r => ({ seed: r.seed, lost: r.lost, survived: r.survived })), curve: [], catchUp: {} });
  say(`### Waves every ${gap} s\n`);
  say(`**Idle player** (does nothing): loses at wave ${idle.map(r => (r.lost ? r.lost.wave : `>${IDLE_CAP}`)).join(", ")}`);
  const lostRuns = idle.filter(r => r.lost);
  say(`mean ${lostRuns.length ? mean(lostRuns.map(r => r.lost.wave)).toFixed(1) : "–"} (min ${lostRuns.length ? Math.min(...lostRuns.map(r => r.lost.wave)) : "–"}, max ${lostRuns.length ? Math.max(...lostRuns.map(r => r.lost.wave)) : "–"}), at ${lostRuns.length ? mmss(mean(lostRuns.map(r => r.lost.time))) : "–"} on average; ${idle.length - lostRuns.length} of ${idle.length} last past wave ${IDLE_CAP}.\n`);
  // The enemy's fighting value at the end of each wave (idle player), averaged over seeds that got that far.
  say(`**Enemy fighting value** at the end of each wave, idle player (mean over seeds still going; biggest siege / every besieger / soundsystems standing):\n`);
  say("| wave | " + [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30].filter(w => w <= IDLE_CAP).join(" | ") + " |");
  say("|---|" + [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30].filter(w => w <= IDLE_CAP).map(() => "---").join("|") + "|");
  const rows = { largest: [], marching: [], standing: [] };
  for (const w of [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30].filter(w => w <= IDLE_CAP)) {
    const at = idle.map(r => r.waves.find(s => s.wave === w)).filter(Boolean);
    rows.largest.push(at.length ? f0(mean(at.map(s => s.largest))) : "–");
    rows.marching.push(at.length ? f0(mean(at.map(s => s.marching))) : "–");
    rows.standing.push(at.length ? mean(at.map(s => s.standing)).toFixed(1) : "–");
    g.curve.push({ wave: w, runs: at.length, largest: mean(at.map(s => s.largest)), marching: mean(at.map(s => s.marching)), standing: mean(at.map(s => s.standing)) });
  }
  say("| biggest siege F | " + rows.largest.join(" | ") + " |");
  say("| all besiegers F | " + rows.marching.join(" | ") + " |");
  say("| standing | " + rows.standing.join(" | ") + " |\n");
  if (IDLE_ONLY) continue;
  // The catch-up check: a player growing at g F a minute, starting at wave s.
  say(`**Catch-up check** (waves survived out of ${WAVES}, mean over seeds; ✓ = every seed lasted all ${WAVES}): rows are growth rates, columns the wave the player starts at\n`);
  say("| growth F/min | " + STARTS.map(s => (s === 0 ? "from start" : `from wave ${s}`)).join(" | ") + " | unrecoverable from |");
  say("|---|" + STARTS.map(() => "---").join("|") + "|---|");
  for (const growth of GROWTH) {
    const cells = [];
    let worst = null;
    for (const s of STARTS) {
      const runs = maps.map(m => simulate(m, { interval: gap, maxWaves: WAVES, player: { growth, fromWave: s, fightTime: FIGHT } }));
      const all = runs.every(r => !r.lost);
      cells.push(all ? `✓ ${WAVES}` : `${mean(runs.map(r => r.survived)).toFixed(1)} (${runs.filter(r => !r.lost).length}/${runs.length})`);
      if (!all && worst === null) worst = s;
      (g.catchUp[growth] ??= {})[s] = runs.map(r => ({ seed: r.seed, survived: r.survived, lost: r.lost }));
    }
    say(`| ${growth} | ${cells.join(" | ")} | ${worst === null ? `later than wave ${STARTS[STARTS.length - 1]}` : worst === 0 ? "the start" : `wave ${worst}`} |`);
  }
  say("");
}
say(`(${((Date.now() - t0) / 1000).toFixed(1)} s)`);
if (OUT) writeFileSync(OUT, JSON.stringify(out, null, 1));
await server.close();
