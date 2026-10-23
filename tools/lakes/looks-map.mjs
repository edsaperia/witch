// Which biome lakes each island has (rules/lakeLooks.ts, the sea chart's looks, the game's too): for every playable kind's island
// (from the first phase whose lakes can take a look), its lakes, each lake's look, size (samples) and middle (m).
//   node tools/lakes/looks-map.mjs [--world 0] [--kinds a,b]
import { openRules, arg, list } from "../balance/lib.mjs";
const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts");
const { KINDS, playableIsland } = await R.load("/src/rules/rosters.ts");
const { generateMap } = await R.load("/src/rules/map.ts");
const { lakesOf, mapBiome } = await R.load("/src/rules/lakeLooks.ts");
const world = Number(arg("world", 0)), only = arg("kinds") ? list(arg("kinds")) : null;
for (const kind of Object.keys(KINDS)) {
  if (only ? !only.includes(kind) : !playableIsland(kind) || KINDS[kind].phase + 1 < 3) continue;
  const t = { ...TUNING, map: { ...TUNING.map, island: kind, world } }, map = generateMap(1, t), L = map.bounds.lakes;
  if (!L) { console.log(`${kind}: no lakes`); continue; }
  const { lake, looks } = lakesOf(L, map.island.seed, mapBiome(map.island, t));
  const parts = looks.map((look, i) => { let n = 0, sx = 0, sz = 0; for (let k = 0; k < lake.length; k++) if (lake[k] === i) { n++; sx += L.x0 + (k % L.cols) * L.step; sz += L.z0 + Math.floor(k / L.cols) * L.step; } return `${look} ${n} @${Math.round(sx / n)},${Math.round(sz / n)}`; });
  console.log(`${kind} (phase ${map.island.phase}, ${KINDS[kind].biome}): ${parts.join("; ")}`);
}
await R.close();
