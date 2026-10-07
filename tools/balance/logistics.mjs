// The logistics sweep (Ed, 2026-10-05: ground mode is for fighting and exploring, treetop mode for
// travel and choosing where to go; balanced by area size, treetop speed and ground speed, never
// the animals' own walk; "compared to now, areas should be fairly large, and treetop mode should
// be much faster than ground mode. We can see if this is true with tests"). Over a grid of area
// size × treetop speed (ground speed and every walk speed fixed), with the balance simulator's
// logistics (src/rules/balance.ts): the areas the witch can visit a wave, the party animals' walk
// to the frontier, whether a defence gets to each new soundsystem before its first blow, and how
// long a player lasts when every fight waits for the witch and her posse to get there.
//
//   node tools/balance/logistics.mjs [--seeds 8] [--sizes 112,168,224,280] [--treetops 32,48,64,96]
//     [--areas 14] [--gap 60] [--place 0.5] [--growth 50] [--ground-base 15] [--boost 1.4] [--route 1.3] [--cap 60] [--attrition 1]
//
// The guesses: ground time a visit = ground-base s (fighting, inviting, placing a sigil) plus
// crossing the area on foot (1.5 × its size at ground speed); a player's growth = growth × (areas
// visited a wave / the same at 112 m and 32 m/s), since each area holds the same babies and berries.
import { openRules, arg, nums as list, mean, pct } from "./lib.mjs";

const SEEDS = +arg("seeds", 8), SIZES = list(arg("sizes", "112,168,224,280")), TREETOPS = list(arg("treetops", "32,48,64,96"));
const AREAS = +arg("areas", 14), GAP = +arg("gap", 60), GROWTH = +arg("growth", 50), GROUND_BASE = +arg("ground-base", 15);
const BOOST = +arg("boost", 1.4), ROUTE = +arg("route", 1.3), CAP = +arg("cap", 60), MARCH_ON = +arg("attrition", 1);

const { load, close } = await openRules();
const { generateMap } = await load("/src/rules/map.ts");
const { TUNING } = await load("/src/rules/tuning.ts");
const { simulate } = await load("/src/rules/balance.ts");

const seeds = Array.from({ length: SEEDS }, (_, i) => 1000 + i * 7919);
const GROUND = TUNING.groundSpeed, POSSE = TUNING.leash.runSpeed * BOOST, PLACE = +arg("place", 0.5);
// You have to land to place a sigil (Ed, 2026-10-05): her descent, the placing (a guess) and her rise.
const SIGIL = TUNING.descendTime + PLACE + TUNING.riseTime;
const visitTime = (size, treetop) => size / treetop + SIGIL + GROUND_BASE + (1.5 * size) / GROUND; // fly a hop (about an area), then the ground time
const visits = (size, treetop) => GAP / visitTime(size, treetop);
const V0 = visits(112, 32);
const t0 = Date.now(), lines = [], say = s => { lines.push(s); console.log(s); };
const cells = {};

say(`Logistics sweep: ${SEEDS} seeds, ${AREAS} × ${AREAS} areas, waves every ${GAP} s, ground speed ${GROUND} m/s; party animals walk at ${TUNING.leash.runSpeed} m/s × travel boost ${BOOST} = ${POSSE.toFixed(1)} m/s along routes ${ROUTE}× the straight line; wild creatures march at ${TUNING.creatureSpeed} × ${TUNING.combat.marchMult} m/s. Every visit and every sigil placed costs a landing (Ed: "You have to land to place sigils"): descend ${TUNING.descendTime} s + place ${PLACE} s (a guess) + rise ${TUNING.riseTime} s = ${SIGIL.toFixed(2)} s. Guesses: ground time a visit ${GROUND_BASE} s + crossing the area on foot; a player grows ${GROWTH} F/min at 112 m and 32 m/s (${V0.toFixed(2)} visits a wave), in proportion to visits a wave elsewhere; every fight waits for the witch and her posse to arrive.${MARCH_ON < 1 ? ` Attrition: ${Math.round(MARCH_ON * 100)}% of a won siege march on.` : ""}\n`);

for (const size of SIZES) {
  const t = { ...TUNING, mapAreas: AREAS, map: { ...TUNING.map, radius: AREAS / Math.sqrt(Math.PI) }, areaScale: size / TUNING.areaSize }; // (the circular map, #281: its radius, not mapAreas)
  const maps = seeds.map(s => generateMap(s, t));
  for (const treetop of TREETOPS) {
    const lg = { witchSpeed: treetop, groundTime: GROUND_BASE + (1.5 * size) / GROUND, posseSpeed: POSSE, route: ROUTE, sigilTime: SIGIL };
    const v = visits(size, treetop), g = GROWTH * (v / V0);
    const runs = maps.map(m => simulate(m, { interval: GAP, maxWaves: CAP, marchOn: MARCH_ON, areaLegends: true, logistics: lg, player: { growth: g, fromWave: 0, fightTime: 30 } }));
    const idle = maps.map(m => simulate(m, { interval: GAP, maxWaves: CAP, marchOn: MARCH_ON, areaLegends: true, logistics: lg }));
    const ds = runs.flatMap(r => r.defences).concat(idle.flatMap(r => r.defences.filter(d => !runs.some(x => x.seed === r.seed && x.defences.length >= d.wave))));
    const ok = (d, k) => d.firstHit !== null && d[k] <= d.firstHit;
    const band = (lo, hi) => ds.filter(d => d.wave >= lo && d.wave <= hi && d.firstHit !== null);
    const cell = cells[`${size},${treetop}`] = {
      visits: v, growth: g,
      survived: mean(runs.map(r => r.survived)), all: runs.every(r => !r.lost), idle: mean(idle.map(r => r.survived)),
      posse: mean(band(1, 999).map(d => (ok(d, "posseAt") ? 1 : 0))), witch: mean(band(1, 999).map(d => (ok(d, "witchAt") ? 1 : 0))),
      saves: mean(ds.filter(d => d.firstHit !== null).map(d => (d.fellAt === undefined || d.posseAt <= d.fellAt ? 1 : 0))),
      posseBands: [[1, 10], [11, 20], [21, 40]].map(([a, b]) => mean(band(a, b).map(d => (ok(d, "posseAt") ? 1 : 0)))),
      slack: mean(band(1, 999).map(d => d.firstHit - d.posseAt)),
      fromHome: [5, 10, 20].map(w => mean(ds.filter(d => d.wave === w).map(d => d.fromHome / GAP))),
      firstHit: mean(band(1, 999).map(d => d.firstHit - d.announced)),
    };
    process.stderr.write(`${size} m × ${treetop} m/s: survived ${cell.survived.toFixed(1)}, posse in time ${pct(cell.posse)}\n`);
  }
}

const grid = (title, f) => {
  say(`**${title}**\n`);
  say("| area size \\ treetop | " + TREETOPS.map(s => `${s} m/s`).join(" | ") + " |");
  say("|---|" + TREETOPS.map(() => "---").join("|") + "|");
  for (const size of SIZES) say(`| ${size} m | ` + TREETOPS.map(s => f(cells[`${size},${s}`])).join(" | ") + " |");
  say("");
};
grid(`Waves survived by a player (growth scaled by visits; cap ${CAP}: "${CAP}+" when every seed got there), idle in brackets`, c => `${c.all ? `${CAP}+` : c.survived.toFixed(1)} (${c.idle.toFixed(1)})`);
grid("Areas the witch can visit a wave, and the player growth that gives (F/min)", c => `${c.visits.toFixed(2)} → ${Math.round(c.growth)}`);
grid("Defence in time: share of new soundsystems the posse reaches before the first blow (leaving the last one's when this one is announced); the witch's share in brackets", c => `${pct(c.posse)} (${pct(c.witch)})`);
grid("Posse there before the soundsystem falls (a defence that can still save it)", c => pct(c.saves));
grid("Posse in time as the frontier grows: waves 1–10 / 11–20 / 21+", c => c.posseBands.map(pct).join(" / "));
grid("Seconds to spare (first blow minus posse arrival, mean; negative is late), and announcement to first blow", c => `${Math.round(c.slack)} s (of ${Math.round(c.firstHit)} s)`);
grid("Party animals' walk from home to the frontier, in waves: at wave 5 / 10 / 20", c => c.fromHome.map(x => (Number.isNaN(x) ? "–" : x.toFixed(1))).join(" / "));
say(`(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
await close();
