// What a smaller map (map.radius) gives: playable areas, legends, quests, relics, creatures and trees, by seed.
//   node tools/balance/mapsize.mjs [--radii 7.9,6,5.6] [--seeds 5] [--trees]
import { arg, nums, mean, openRules } from "./lib.mjs";
const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame } = await load("/src/rules/game.ts");
const { spiralOrder } = await load("/src/rules/leyroute.ts");
const warns = []; const cw = console.warn; console.warn = (...a) => warns.push(a.join(" "));
const out = [];
for (const R of nums(arg("radii", "7.9,6.5,6,5.6,5.3,5"))) for (let i = 0; i < +arg("seeds", 5); i++) {
  const seed = 1000 + i * 7919; warns.length = 0;
  const g = newGame(seed, withTuning({ map: { ...TUNING.map, radius: R } })), M = g.map, home = M.dancefloor;
  const legends = g.creatures.filter(c => c.boss), quests = legends.filter(c => c.quest), species = new Set(M.cells.map(([x, y]) => g.creatures.find(c => c.cell[0] === x && c.cell[1] === y && !c.boss)?.species).filter(Boolean));
  const far = Math.max(...M.cells.map(([x, y]) => { const s = M.siteOf(x, y); return Math.hypot(s.x - home.x, s.z - home.z); }));
  let trees = null;
  if (process.argv.includes("--trees")) { trees = 0; const step = 100; for (let x = home.x - far - 200; x < home.x + far + 200; x += step) for (let z = home.z - far - 200; z < home.z + far + 200; z += step) trees += g.forest.treesNear(x + step / 2, z + step / 2, step / Math.SQRT2).filter(t => Math.abs(t.x - x - step / 2) <= step / 2 && Math.abs(t.z - z - step / 2) <= step / 2).length; }
  const row = { R, seed, areas: M.cells.length, farM: Math.round(far), route: spiralOrder(M).length, legends: legends.length, quests: quests.length, questFar: +mean(quests.map(c => c.quest.far ?? 0)).toFixed(2), species: species.size, relics: g.relics.length, creatures: g.creatures.length, trees, warns: warns.filter(w => /relic|legend|quest/.test(w)).length };
  out.push(row); console.log(JSON.stringify(row));
}
console.warn = cw;
console.log("\n| radius | areas | farthest area (m) | legends | quests | kinds on the map | relics | creatures at start | trees | placement warnings |\n|---|---|---|---|---|---|---|---|---|---|");
for (const R of [...new Set(out.map(r => r.R))]) { const rs = out.filter(r => r.R === R), m = k => Math.round(mean(rs.map(r => r[k]))); console.log(`| ${R} | ${m("areas")} | ${m("farM")} | ${m("legends")} | ${m("quests")} | ${m("species")} | ${m("relics")} | ${m("creatures")} | ${rs[0].trees === null ? "–" : m("trees")} | ${rs.reduce((a, r) => a + r.warns, 0)} |`); }
await close();
