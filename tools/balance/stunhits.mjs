// Hits to stun (combat as orbit slots, Ed 2026-10-28; before it, hits to knock down): the real rules headless, her adult wolf (a boar
// against wolves) parked beside one wild creature of each species and rank, the blows it lands counted till the creature is down
// (stunned now; dazed or run off before), and the seconds that took. Run it on a checkout of the old rules for the before.
//   node tools/balance/stunhits.mjs [--species wolf,boar,...] [--levels 1,2] [--seeds 2] [--time 120]
import { openRules, arg, list, median } from "./lib.mjs";

const { load, close } = await openRules();
const { TUNING } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
const { CREATURE_IDS } = await load("/src/rules/creatureConfig.ts");
const SPECIES = arg("species") ? list(arg("species")) : [...CREATURE_IDS].sort(), LEVELS = list(arg("levels", "1,2")).map(Number);
const SEEDS = +arg("seeds", 2), TIME = +arg("time", 120);
const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

function measure(seed, species, level) {
  const g = newGame(seed, TUNING), d = g.map.dancefloor;
  g.clock.paused = false; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "treetop", lift: 1 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 80);
  const put = (c, sp, lv, dx) => { const x = g.witch.x + dx, z = g.witch.z; Object.assign(c, { circle: undefined, species: sp, level: lv, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0, asleep: undefined, napUntil: undefined }); c.cell = g.map.cellSafe(x, z).cell; return c; };
  const target = put(spare[0], species, level, 4), mine = put(spare[1], species === "wolf" ? "boar" : "wolf", 2, 2);
  mine.leashed = true; g.leash.placed.push({ id: mine.id, x: mine.x, z: mine.z, at: g.clock.time });
  g.byArea = null;
  let hits = 0;
  for (let i = 0; i < TIME / STEP; i++) {
    g.witches[0].health.hp = 1e6;
    stepGame(g, idle, STEP);
    for (const e of g.combat.events) if (e.kind === "hit" && e.id === target.id && e.at === g.clock.time) hits++;
    if (target.dazed || target.fleeUntil || target.gone) return { hits, secs: g.clock.time };
  }
  return { hits, secs: Infinity };
}

console.log(`Hits to stun (her adult wolf; a boar against wolves), median of ${SEEDS} seeds, ${TIME} s at most\n`);
console.log(`| species | ${LEVELS.map(l => `rank ${l} hits | rank ${l} s`).join(" | ")} |`);
console.log(`|---|${LEVELS.map(() => "---|---").join("|")}|`);
for (const sp of SPECIES) {
  const cells = [];
  for (const lv of LEVELS) {
    const r = Array.from({ length: SEEDS }, (_, i) => measure(123 + i * 41, sp, lv));
    const done = r.filter(x => Number.isFinite(x.secs));
    cells.push(done.length ? `${median(done.map(x => x.hits))}` : "–", done.length ? `${Math.round(median(done.map(x => x.secs)))}` : `>${TIME}`);
  }
  console.log(`| ${sp} | ${cells.join(" | ")} |`);
}
await close();
