// How often the ley line crosses a lake (Ed, 2026-10-11, the journey's lakes, docs/backlog/journey.md "Watch: the ley line
// crossing a lake"): for each phase and seed, the route's links between runestones in wave order (straight, as the line runs
// before it wanders down the valleys), how many cross a lake's water and for how far.
//   node tools/lakes/leylines.mjs [--phases 1,2,3,4,5] [--seeds 1,2,3,4,5,6]
import { openRules, arg, nums } from "../balance/lib.mjs";

const phases = nums(arg("phases", "1,2,3,4,5")), seeds = nums(arg("seeds", "1,2,3,4,5,6"));
const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts"), { generateMap } = await R.load("/src/rules/map.ts"), { routeOf, soundsystemFor } = await R.load("/src/rules/party.ts"), { lakeDepth } = await R.load("/src/rules/lakes.ts");
console.log("| phase | seeds | lakes | links | links over a lake | metres over water (all) | longest |\n|---|---|---|---|---|---|---|");
for (const phase of phases) {
  let links = 0, wet = 0, metres = 0, longest = 0, lakes = 0;
  for (const seed of seeds) {
    const map = generateMap(seed, { ...TUNING, map: { ...TUNING.map, islandAreas: 10 * phase, island: "", phase } }), B = map.bounds;
    lakes += B.lakes ? B.lakes.loops.filter(l => l.sea).length : 0;
    const stones = routeOf(map).order.map(k => soundsystemFor(map, k.split(",").map(Number)));
    for (let i = 1; i < stones.length; i++) {
      const a = stones[i - 1], b = stones[i], d = Math.hypot(b.x - a.x, b.z - a.z), n = Math.ceil(d / 2);
      let over = 0;
      for (let k = 0; k < n; k++) { const u = (k + 0.5) / n; if (lakeDepth(B, a.x + (b.x - a.x) * u, a.z + (b.z - a.z) * u) > 0) over += d / n; }
      links++;
      if (over > 0) { wet++; metres += over; longest = Math.max(longest, over); }
    }
  }
  console.log(`| ${phase} | ${seeds.length} | ${lakes} | ${links} | ${wet} (${((100 * wet) / Math.max(1, links)).toFixed(0)}%) | ${metres.toFixed(0)} | ${longest.toFixed(0)} m |`);
}
await R.close();
