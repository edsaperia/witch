// Each bag's 💌s against one wild creature (Ed, 2026-10-29: the bags as weapon archetypes, rules/bags.ts; the coordinator: "hits per
// second and time-to-stun per bag ... for all bags, so Ed can compare"): the real rules headless, her standing still at a distance
// from one wild creature of a kind and rank, throwing at it all the while (her health held up), the letters that land counted and
// the seconds till its ring is full (stunned, rules/orbit.ts, or won over at once) taken. Every bag on the bag shelf, starting or found.
//   node tools/balance/bagstun.mjs [--bags satchel,bumbag,...] [--species fox] [--levels 1,2] [--dists 10,20,30] [--seeds 2] [--time 60]
import { openRules, arg, list, median } from "./lib.mjs";

const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
const { SHELVES } = await load("/src/rules/wardrobe.ts");
const BAGS = arg("bags") ? list(arg("bags")) : SHELVES.bag.items.filter(i => i.invites).map(i => i.id);
const SPECIES = arg("species", "fox"), LEVELS = list(arg("levels", "1,2")).map(Number), DISTS = list(arg("dists", "10,20,30")).map(Number);
const SEEDS = +arg("seeds", 2), TIME = +arg("time", 60);

function measure(seed, bag, level, dist) {
  const g = newGame(seed, withTuning({ spells: { ...TUNING.spells, bag } })), d = g.map.dancefloor;
  g.clock.paused = false; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0, vx: 0, vz: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  const c = g.creatures.find(q => !q.gone && !q.leashed && !q.boss && Math.hypot(q.x - g.witch.x, q.z - g.witch.z) > 100);
  const x = g.witch.x + dist, z = g.witch.z;
  Object.assign(c, { circle: undefined, species: SPECIES, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, boss: false, siege: undefined, rest: 0, asleep: undefined, napUntil: undefined, affection: undefined, fills: undefined });
  c.cell = g.map.cellSafe(x, z).cell; g.byArea = null;
  let landed = 0;
  for (let i = 0; i < TIME / STEP; i++) {
    const W = g.witches[0]; W.health.hp = 1e6;
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: c.x - g.witch.x, aimZ: c.z - g.witch.z }, STEP);
    let won = false;
    for (const e of W.invites.events) { if (e.kind === "hit" && e.id === c.id) landed++; if (e.kind === "happy" && e.id === c.id) won = true; }
    if (c.dazed || c.gone || c.leashed || won) return { landed, secs: g.clock.time }; // (stunned, or its ring full and won over at once)
  }
  return { landed, secs: Infinity };
}

console.log(`Each bag against one wild ${SPECIES}: letters landed a second and seconds to stun, median of ${SEEDS} seeds, ${TIME} s at most\n`);
const cols = LEVELS.flatMap(l => DISTS.map(dd => `rank ${l} @${dd} m`));
console.log(`| bag | ${cols.map(c => `${c}: hits/s | s`).join(" | ")} |`);
console.log(`|---|${cols.map(() => "---|---").join("|")}|`);
for (const bag of BAGS) {
  const cells = [];
  for (const lv of LEVELS) for (const dd of DISTS) {
    const runs = Array.from({ length: SEEDS }, (_, s) => measure(1000 + s, bag, lv, dd));
    const secs = median(runs.map(r => r.secs)), rate = median(runs.map(r => r.landed / Math.min(r.secs, TIME)));
    cells.push(`${rate.toFixed(2)} | ${Number.isFinite(secs) ? secs.toFixed(1) : "never"}`);
  }
  console.log(`| ${bag} | ${cells.join(" | ")} |`);
}
await close();
