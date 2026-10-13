// How the planting mixes across area borders (Ed's #887): for the trees within 40 m of a border, the share in their
// neighbour's look by distance from it, and how clumped the strays are (the share of a stray's nearest tree that's a stray too).
//   node tools/forest/border-stats.mjs [seed] [stray]
import { openRules } from "./../balance/lib.mjs";
const [seed = "123", stray] = process.argv.slice(2);
const O = await openRules(), G = await O.load("/src/rules/game.ts"), T = await O.load("/src/rules/tuning.ts"), F = await O.load("/src/rules/forest.ts");
const tuning = structuredClone(T.TUNING); if (stray !== undefined) tuning.areaEdgeBlend.stray = Number(stray);
const g = G.newGame(Number(seed), tuning), m = g.map, f = new F.Forest(m), d = m.dancefloor;
const trees = f.treesNear(d.x, d.z, 700).filter(t => !m.isLake || true);
const borderDist = (x, z) => { const a = m.areaAt(x, z).cell; for (let r = 2; r <= 60; r += 2) for (let k = 0; k < 16; k++) { const b = m.areaAt(x + r * Math.cos(k * Math.PI / 8), z + r * Math.sin(k * Math.PI / 8)).cell; if (b[0] !== a[0] || b[1] !== a[1]) return r; } return 99; };
const bins = [0, 0, 0, 0, 0, 0].map(() => [0, 0]); const strays = [];
for (const t of trees) { const r = borderDist(t.x, t.z); if (r > 60) continue; const away = t.type !== m.areaAt(t.x, t.z).look; const b = Math.min(5, Math.floor(r / 10)); bins[b][0]++; if (away) { bins[b][1]++; strays.push(t); } }
console.log("m from border: share in the neighbour's look");
bins.forEach(([n, a], b) => console.log(`  ${b * 10}-${b * 10 + 10}${b === 5 ? "+" : ""}: ${(a / Math.max(1, n) * 100).toFixed(1)}% of ${n}`));
let same = 0; for (const s of strays) { let best = Infinity, bt; for (const t of trees) { if (t === s) continue; const q = (t.x - s.x) ** 2 + (t.z - s.z) ** 2; if (q < best) { best = q; bt = t; } } if (bt && bt.type !== m.areaAt(bt.x, bt.z).look) same++; }
console.log(`strays: ${strays.length}, their nearest tree a stray too: ${(same / Math.max(1, strays.length) * 100).toFixed(0)}% (clumping)`);
await O.close(); process.exit(0);
