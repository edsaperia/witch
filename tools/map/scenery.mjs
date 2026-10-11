// The random scenery on an island from above (Ed, 2026-10-11: "I want to review the random scenery; some of it feels out of place
// now"): for each seed, the island's areas (the playable ones bright, the land past the flight's edge dim), its paths, streams and
// railways, and every random piece the map puts down, by kind: scenes (the featured one starred), grounds, set pieces, ruins, rocks,
// freak trees, modern relics, walls, path pieces, ponds, campfires, the party relic and the beach finds; a key with each kind's count.
//   node tools/map/scenery.mjs [--seeds 1,2,3] [--out previews/scenery-map] [--set paths.linkChance=0.1;paths.rails=0,1]
// (one PNG per seed, drawn by Playwright's Chromium.)
import fs from "fs";
import { createRequire } from "module";
import { openRules, arg, nums } from "../balance/lib.mjs";

const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts"), { generateMap } = await R.load("/src/rules/map.ts"), { Forest } = await R.load("/src/rules/forest.ts");
const { wallFeatures } = await R.load("/src/rules/walls.ts"), { isInside, beachOf } = await R.load("/src/rules/mapShape.ts"), { BeachDecor } = await R.load("/src/rules/beachDecor.ts"), { placeRelics } = await R.load("/src/rules/legends.ts");
const out = arg("out", "previews/scenery-map"), seeds = nums(arg("seeds", "1,2,3")), sets = arg("set", "");
fs.mkdirSync(out, { recursive: true });
const tuning = JSON.parse(JSON.stringify(TUNING)); tuning.paths.fingerposts = true; // (as the game: app/linkParams.ts)
for (const kv of sets.split(";").filter(Boolean)) { const [path, v] = kv.split("="), ks = path.split("."); let o = tuning; for (const k of ks.slice(0, -1)) o = o[k]; o[ks.at(-1)] = v.includes(",") ? v.split(",").map(Number) : isNaN(+v) ? v : +v; }
const KINDS = [ // [key, label, colour, shape]
  ["featured", "featured scene", "#ffd84a", "star"], ["scene", "scene", "#c77dff", "square"], ["ground", "ground", "#4aa8ff", "square"], ["set", "set piece", "#ff9a3c", "square"],
  ["ruins", "ruin", "#e8e8e8", "tri"], ["rocks", "rock", "#8a8a8a", "tri"], ["freak", "freak tree", "#6bff7a", "tri"], ["relic", "relic / farm / street", "#ff4d6d", "dot"],
  ["path", "path piece", "#d0a060", "diamond"], ["wall", "wall piece", "#5a6a5a", "px"], ["pond", "pond", "#3fd0ff", "px"], ["campfire", "campfire", "#ff7a2a", "px"], ["prelic", "party relic", "#ff5cf0", "star"], ["beach", "beach find", "#f2e2a0", "px"],
];
const S = 900;
for (const seed of seeds) {
  const map = generateMap(seed, tuning), forest = new Forest(map), b = map.bounds, cx = (b.minX + b.maxX) / 2, cz = (b.minZ + b.maxZ) / 2, half = Math.max(b.maxX - b.minX, b.maxZ - b.minZ) / 2 + 40;
  const k = S / (2 * half), X = x => (x - cx + half) * k, Z = z => (z - cz + half) * k, own = p => { const c = map.areaAt(p.x, p.z).cell; return map.playable(c[0], c[1]); };
  const pts = { featured: [], scene: [], ground: [], set: [], ruins: [], rocks: [], freak: [], relic: [], path: [], wall: [], pond: [], campfire: [], prelic: [], beach: [] };
  for (const s of map.scenes) ((tuning.scenes.featured?.ids ?? []).includes(s.id) ? pts.featured : pts.scene).push(s);
  pts.ground.push(...map.grounds); pts.set.push(...forest.setPiecesNear(cx, cz, half));
  for (const d of forest.decorNear(cx, cz, half)) pts[d.family].push(d);
  pts.relic.push(...forest.relicsNear(cx, cz, half)); pts.path.push(...map.paths.pieces);
  for (const [x, y] of map.cells) pts.wall.push(...wallFeatures(map, x, y).walls);
  for (const l of forest.lightsNear(cx, cz, half)) (l.kind === "pond" ? pts.pond : l.kind === "campfire" ? pts.campfire : []).push(l);
  pts.prelic.push(...placeRelics(map, forest));
  const B = beachOf(map.bounds, tuning); if (B) { const D = new BeachDecor(B, seed, tuning.beach.decor); for (let s = 0; s < tuning.beach.decor.sectors; s++) for (const it of D.sector(s)) if (!it.print) pts.beach.push(it); }
  // the ground: each area's type as a hue, bright where it's playable; the sea dark
  const G = 150, cells = [];
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    const x = cx - half + (i + .5) * 2 * half / G, z = cz - half + (j + .5) * 2 * half / G;
    if (!isInside(b, x, z)) continue;
    const a = map.areaAt(x, z), on = map.playable(a.cell[0], a.cell[1]), h = (a.type * 47) % 360, sand = B && map.hardClear(x, z);
    cells.push([i, j, sand ? "#5a5236" : `hsl(${h},${on ? 30 : 12}%,${on ? 24 : 13}%)`]);
  }
  const count = key => key === "beach" || key === "pond" || key === "campfire" || key === "wall" ? pts[key].filter(own).length + (key === "beach" ? pts.beach.length : 0) : pts[key].filter(p => key === "featured" || key === "scene" || key === "ground" || key === "set" || key === "prelic" || own(p)).length;
  const html = `<canvas id=c width=${S + 340} height=${S}></canvas><script>
const g = c.getContext("2d"), cells = ${JSON.stringify(cells)}, G = ${G}, S = ${S}, cw = S / G;
g.fillStyle = "#0b0d16"; g.fillRect(0, 0, S + 340, S);
for (const [i, j, col] of cells) { g.fillStyle = col; g.fillRect(i * cw, j * cw, cw + .5, cw + .5); }
const lines = ${JSON.stringify(map.paths.lines.map(l => ({ kind: l.kind, pts: l.pts.map(p => [X(p[0]), Z(p[1])]) })))};
const LC = { path: "#c8b48a", road: "#999", rail: "#b07050", stream: "#3f8fd8" };
for (const l of lines) { g.strokeStyle = LC[l.kind] || "#888"; g.lineWidth = l.kind === "stream" ? 2 : l.kind === "rail" ? 2 : 1.2; if (l.kind === "rail") g.setLineDash([4, 2]); else g.setLineDash([]); g.beginPath(); l.pts.forEach(([x, y], n) => n ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); }
g.setLineDash([]);
const d = ${JSON.stringify([X(map.dancefloor.x), Z(map.dancefloor.z)])}; g.fillStyle = "#fff"; g.beginPath(); g.arc(d[0], d[1], 6, 0, 7); g.fill();
const K = ${JSON.stringify(KINDS)}, P = ${JSON.stringify(Object.fromEntries(Object.entries(pts).map(([key, l]) => [key, l.map(p => [X(p.x), Z(p.z)])])))};
const mark = (sh, col, x, y, s) => { g.fillStyle = col; g.strokeStyle = "#000"; g.lineWidth = 1; g.beginPath();
  if (sh === "square") { g.rect(x - s, y - s, 2 * s, 2 * s); } else if (sh === "tri") { g.moveTo(x, y - s); g.lineTo(x + s, y + s * .8); g.lineTo(x - s, y + s * .8); g.closePath(); }
  else if (sh === "diamond") { g.moveTo(x, y - s); g.lineTo(x + s, y); g.lineTo(x, y + s); g.lineTo(x - s, y); g.closePath(); }
  else if (sh === "star") { for (let q = 0; q < 10; q++) { const r = q % 2 ? s * .45 : s * 1.3, a = q / 10 * 6.283 - 1.571; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); }
  else if (sh === "dot") { g.arc(x, y, s * .8, 0, 7); } else { g.rect(x - 1, y - 1, 2, 2); g.fill(); return; }
  g.fill(); g.stroke(); };
for (const [key, , col, sh] of [...K].reverse()) for (const [x, y] of P[key]) mark(sh, col, x, y, sh === "star" ? 8 : 5);
g.font = "13px monospace"; g.fillStyle = "#fff"; g.fillText(${JSON.stringify(`seed ${seed}  ${sets || "game tuning"}`)}, 10, 18);
const counts = ${JSON.stringify(Object.fromEntries(KINDS.map(([key]) => [key, count(key)])))};
K.forEach(([key, label, col, sh], n) => { const y = 30 + n * 24; mark(sh, col, S + 22, y, 6); g.fillStyle = "#ddd"; g.fillText(label + "  " + counts[key], S + 38, y + 4); });
g.fillStyle = "#999"; g.fillText("lines: path, stream (blue), rail (dashed)", S + 10, 30 + K.length * 24 + 10); g.fillText("dim: land past the flight's edge", S + 10, 30 + K.length * 24 + 30);
</script>`;
  const require = createRequire(import.meta.url); let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
  const br = await pw.chromium.launch(), page = await br.newPage({ viewport: { width: S + 340, height: S } });
  await page.setContent(html); await page.locator("canvas").screenshot({ path: `${out}/map-${seed}.png` }); await br.close();
  console.log("wrote", `${out}/map-${seed}.png`, JSON.stringify(Object.fromEntries(KINDS.map(([key]) => [key, count(key)]))));
}
await R.close();
