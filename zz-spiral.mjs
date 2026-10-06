import { openRules, mean, median } from "./tools/balance/lib.mjs";
const rules = await openRules();
const { generateMap } = await rules.load("/src/rules/map.ts");
const { TUNING } = await rules.load("/src/rules/tuning.ts");
const { departureRoute } = await rules.load("/src/rules/departure.ts");
const { polylinesMeet, crossings } = await rules.load("/src/rules/crossing.ts");
const t0 = performance.now(); const W = Number(process.argv[2] ?? 1), N = Number(process.argv[3] ?? 40);
const T = TUNING, L = T.leyLines, rows = [];
for (let seed = 1; seed <= N; seed++) {
  const map = generateMap(seed, T), home = `${map.centreCell[0]},${map.centreCell[1]}`, f = map.treehouseFront, d = map.dancefloor;
  const pts = [];
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) { const k = `${cx},${cy}`; if (k === home) continue; const s = map.soundsystemSpot(cx, cy); pts.push({ k, x: s.x, z: s.z }); }
  const size = map.tuning.world?.areaSize ?? Math.sqrt((map.bounds?.width ?? 2352) ** 2 / (map.n * map.n));
  const w = size * W;
  for (const p of pts) { const r = Math.hypot(p.x - d.x, p.z - d.z); let phi = (Math.atan2(p.x - d.x, p.z - d.z)) / (2 * Math.PI); phi = ((phi % 1) + 1) % 1; const u = r / w - phi; p.key = Math.max(0, Math.floor(u)) + phi; }
  let ord = pts.sort((a, b) => a.key - b.key);
  const link = i => i === 0 ? departureRoute(map, ord[0], L.depart.past, L.depart.avoid, 4) : [[ord[i - 1].x, ord[i - 1].z], [ord[i].x, ord[i].z]];
  // local 2-opt: reverse short segments to remove crossings
  let changed = true, passes = 0;
  while (changed && passes < 400) { changed = false; passes++;
    for (let i = 1; i < ord.length; i++) { const li = link(i); for (let j = i + 2; j < ord.length; j++) if (polylinesMeet(li, link(j))) { const seg = ord.slice(i, j).reverse(); ord.splice(i, j - i, ...seg); changed = true; break; } }
  }
  // Or-opt: a link meeting the one right after it (the departure curve and the next): move that next stone later.
  for (let round = 0; round < 5; round++) {
    let bad = -1;
    for (let i = 0; i + 1 < ord.length && bad < 0; i++) if (polylinesMeet(link(i), link(i + 1))) bad = i + 1;
    if (bad < 0) break;
    const stone = ord[bad]; let ok = false;
    for (let p = bad + 1; p < Math.min(ord.length, bad + 30) && !ok; p++) {
      const trial = ord.slice(); trial.splice(bad, 1); trial.splice(p, 0, stone);
      const was = ord; ord = trial;
      let meets = false; for (let a = 0; a <= p + 1 && a < ord.length && !meets; a++) for (let b = a + 1; b <= p + 2 && b < ord.length && !meets; b++) if (polylinesMeet(link(a), link(b))) meets = true;
      if (!meets) ok = true; else ord = was;
    }
    // then 2-opt again
    changed = true; passes = 0;
    while (changed && passes < 400) { changed = false; passes++; for (let i = 1; i < ord.length; i++) { const li = link(i); for (let j = i + 2; j < ord.length; j++) if (polylinesMeet(li, link(j))) { const seg = ord.slice(i, j).reverse(); ord.splice(i, j - i, ...seg); changed = true; break; } } }
  }
  const links = ord.map((_, i) => link(i));
  const woke = new Set([home]); let islands = 0;
  ord.forEach((p, i) => { if (i < 40 && ![...(map.neighbours.get(p.k) ?? [])].some(n => woke.has(n))) islands++; woke.add(p.k); });
  const steps = links.map(l => Math.hypot(l[l.length - 1][0] - l[0][0], l[l.length - 1][1] - l[0][1]));
  const pairs = []; for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) if (polylinesMeet(links[i], links[j])) pairs.push([i, j]);
  rows.push({ seed, dbg: { home: [Math.round(f.x), Math.round(f.z)], d: [Math.round(d.x), Math.round(d.z)], dep: links[0].filter((_, i) => i % 6 === 0).map(q => q.map(Math.round)), l1: links[1].map(q => q.map(Math.round)), s2: links[2].map(q => q.map(Math.round)) }, pairs, cross: crossings(links), islands, step40: mean(steps.slice(0, 40)), first6: steps.slice(0, 6).map(Math.round), total: steps.reduce((a, b) => a + b) });
}
console.log(`w=${W}x area: crossing routes ${rows.filter(r => r.cross).length}/${rows.length}, crossings mean ${mean(rows.map(r => r.cross)).toFixed(2)} max ${Math.max(...rows.map(r => r.cross))}; islands in first 40 mean ${mean(rows.map(r => r.islands)).toFixed(2)}; step first 40 ${Math.round(mean(rows.map(r => r.step40)))} m; first six ${[0,1,2,3,4,5].map(i => median(rows.map(r => r.first6[i])))}; route ${Math.round(mean(rows.map(r => r.total)))} m`);
for (const r of rows) if (r.pairs.length) console.log('seed', r.seed, JSON.stringify(r.dbg));
const all = rows.flatMap(r => r.pairs); console.log('pairs by first link index: <20', all.filter(p => p[0] < 20).length, '<60', all.filter(p => p[0] < 60).length, '<120', all.filter(p => p[0] < 120).length, 'all', all.length, 'gap median', median(all.map(p => p[1] - p[0])), 'involving 0', all.filter(p => p[0] === 0).length);
console.log("ms per seed", Math.round((performance.now() - t0) / N)); await rules.close();
