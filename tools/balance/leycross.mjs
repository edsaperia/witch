// How often the ley line's route crosses itself (Ed, 2026-10-06: "Is it possible for the leylines
// to never have to cross?"): for each seed, the whole run's route through the runestones in wave
// order (rules/party.ts wavePlan, the first link the treehouse's departure curve, the rest straight
// between stones), counting the pairs of links that meet, all of them and those ever shown together
// (within leyLines.ahead + behind links of each other), and how long the route is.
//   node tools/balance/leycross.mjs [--seeds 300] [--from 1] [--before] [--json]
// --before: the picker as it was (party.uncrossed false), to compare.
import { openRules, arg, mean, median } from "./lib.mjs";

const rules = await openRules();
try {
  const { generateMap } = await rules.load("/src/rules/map.ts");
  const { TUNING } = await rules.load("/src/rules/tuning.ts");
  const { newParty, wavePlan } = await rules.load("/src/rules/party.ts");
  const { routeLinks } = await rules.load("/src/rules/leyroute.ts");
  const { crossings, polylinesMeet } = await rules.load("/src/rules/crossing.ts");
  const T = structuredClone(TUNING);
  if (process.argv.includes("--before")) T.party.uncrossed = false;
  const seeds = Number(arg("seeds", 300)), from = Number(arg("from", 1)), L = T.leyLines, shown = L.ahead + L.behind;
  const rows = [];
  for (let seed = from; seed < from + seeds; seed++) {
    const map = generateMap(seed, T), p = newParty(map), order = [...wavePlan(p, map).keys()];
    const links = routeLinks(map, [...p.areas.keys(), ...order]), bent = links.filter(l => l.length > 2).length - 1;
    let length = 0;
    for (const l of links) for (let i = 0; i + 1 < l.length; i++) length += Math.hypot(l[i + 1][0] - l[i][0], l[i + 1][1] - l[i][1]);
    const bentAt = links.findIndex((l, i) => i > 0 && l.length > 2) + 1 || Infinity;
    // Waves waking an area bordering none the party has (an island), in the first 40.
    const woke = new Set(p.areas.keys());
    let islands = 0;
    order.forEach((k, i) => { if (i < 40 && ![...(map.neighbours.get(k) ?? [])].some(n => woke.has(n))) islands++; woke.add(k); });
    const steps = links.map(l => Math.hypot(l[l.length - 1][0] - l[0][0], l[l.length - 1][1] - l[0][1]));
    // The first link to meet one before it: the wave the line first crosses itself.
    let first = Infinity;
    for (let j = 1; j < links.length && first === Infinity; j++) for (let i = 0; i < j; i++) if (polylinesMeet(links[i], links[j])) { first = j + 1; break; }
    let firstShown = Infinity;
    for (let j = 1; j < links.length && firstShown === Infinity; j++) for (let i = Math.max(0, j - shown); i < j; i++) if (polylinesMeet(links[i], links[j])) { firstShown = j + 1; break; }
    rows.push({ seed, islands, bentAt, first, firstShown, bent, areas: links.length, all: crossings(links), shown: crossings(links, shown), length: Math.round(length), meanStep: Math.round(mean(steps)), drawn40: Math.round(mean(links.slice(0, 40).map(l => { let d = 0; for (let i = 0; i + 1 < l.length; i++) d += Math.hypot(l[i + 1][0] - l[i][0], l[i + 1][1] - l[i][1]); return d; }))), step40: Math.round(mean(steps.slice(0, 40))), firstSteps: steps.slice(0, 6).map(Math.round) });
  }
  if (process.argv.includes("--json")) console.log(JSON.stringify(rows));
  else {
    const has = rows.filter(r => r.all > 0).length, hasShown = rows.filter(r => r.shown > 0).length;
    console.log(`${rows.length} seeds (${from}..${from + seeds - 1}), ${median(rows.map(r => r.areas))} areas each (median)`);
    console.log(`routes with any crossing: ${has} (${Math.round((100 * has) / rows.length)}%), crossings per route mean ${mean(rows.map(r => r.all)).toFixed(1)}, max ${Math.max(...rows.map(r => r.all))}`);
    console.log(`routes with a crossing shown together (within ${shown} links): ${hasShown} (${Math.round((100 * hasShown) / rows.length)}%), mean ${mean(rows.map(r => r.shown)).toFixed(2)}`);
    const firsts = rows.map(r => r.first).filter(Number.isFinite);
    console.log(`the first crossing comes at wave: median ${median(firsts) ?? "–"}, earliest ${firsts.length ? Math.min(...firsts) : "–"}; routes crossing by wave 20: ${rows.filter(r => r.first <= 20).length}, 40: ${rows.filter(r => r.first <= 40).length}, 60: ${rows.filter(r => r.first <= 60).length}`);
    const fs = rows.map(r => r.firstShown).filter(Number.isFinite);
    console.log(`the first crossing shown together comes at wave: median ${fs.length ? median(fs) : "–"}, earliest ${fs.length ? Math.min(...fs) : "–"}; routes with one by wave 20: ${rows.filter(r => r.firstShown <= 20).length}, 40: ${rows.filter(r => r.firstShown <= 40).length}, 60: ${rows.filter(r => r.firstShown <= 60).length}, 100: ${rows.filter(r => r.firstShown <= 100).length}`);
    console.log(`links bent round others (none straight could reach): mean ${mean(rows.map(r => r.bent)).toFixed(1)} a route; routes with one by wave 40: ${rows.filter(r => r.bentAt <= 40).length}`);
    console.log(`the first 40 waves: from stone to stone ${Math.round(mean(rows.map(r => r.step40)))} m a wave on average, the line drawn ${Math.round(mean(rows.map(r => r.drawn40)))} m; islands (an area bordering none partified) ${mean(rows.map(r => r.islands)).toFixed(2)} a route`);
    console.log(`route length mean ${Math.round(mean(rows.map(r => r.length)))} m, a link mean ${Math.round(mean(rows.map(r => r.meanStep)))} m; the first six links (median m): ${[0, 1, 2, 3, 4, 5].map(i => median(rows.map(r => r.firstSteps[i]).filter(x => x !== undefined))).join(", ")}`);
  }
} finally { await rules.close(); }
