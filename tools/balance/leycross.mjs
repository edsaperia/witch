// How often the ley line's route crosses itself (Ed, 2026-10-06: "I think the leylines should cover
// the entire set of waves the whole time, but ideally it shouldn't cross itself, or try and minimise
// crossings"): for each seed, the whole run's route through every area's runestone in wave order
// (the first link the treehouse's departure curve, the rest straight between stones), the pairs of
// links that cross, how far apart the waves are, and how many wake an area bordering none the party
// has (an island). The route picker (party.picker "route": the noisy picker's order untangled,
// rules/leyroute.ts), or --before, the noisy picker's order as it is.
//   node tools/balance/leycross.mjs [--seeds 300] [--from 1] [--before] [--json]
import { openRules, arg, mean, median } from "./lib.mjs";

const rules = await openRules();
try {
  const { generateMap } = await rules.load("/src/rules/map.ts");
  const { TUNING } = await rules.load("/src/rules/tuning.ts");
  const { newParty, wavePlan, routeOf } = await rules.load("/src/rules/party.ts");
  const { departureRoute } = await rules.load("/src/rules/departure.ts");
  const { crossings } = await rules.load("/src/rules/crossing.ts");
  const T = structuredClone(TUNING), before = process.argv.includes("--before");
  if (before) T.party.picker = "noisy";
  const seeds = Number(arg("seeds", 300)), from = Number(arg("from", 1)), D = T.leyLines.depart, rows = [];
  for (let seed = from; seed < from + seeds; seed++) {
    const map = generateMap(seed, T), t0 = performance.now(), route = before ? null : routeOf(map), plan = performance.now() - t0, p = newParty(map);
    const order = before ? [...wavePlan(p, map).keys()] : route.order;
    const st = order.map(k => { const [x, y] = k.split(",").map(Number), s = map.soundsystemSpot(x, y); return [s.x, s.z]; });
    const links = [departureRoute(map, { x: st[0][0], z: st[0][1] }, D.past, D.avoid, 4)];
    for (let i = 1; i < st.length; i++) links.push([st[i - 1], st[i]]);
    const steps = links.map(l => Math.hypot(l[l.length - 1][0] - l[0][0], l[l.length - 1][1] - l[0][1]));
    const woke = new Set(p.areas.keys());
    let islands = 0;
    order.forEach((k, i) => { if (i < 40 && ![...(map.neighbours.get(k) ?? [])].some(n => woke.has(n))) islands++; woke.add(k); });
    rows.push({ seed, areas: order.length, crossings: crossings(links), step40: mean(steps.slice(0, 40)), first: steps[0], length: steps.reduce((a, b) => a + b, 0), islands, planMs: plan });
  }
  if (process.argv.includes("--json")) console.log(JSON.stringify(rows));
  else {
    const c = rows.map(r => r.crossings);
    console.log(`${before ? "noisy picker (before)" : "route picker"}: ${rows.length} seeds (${from}..${from + seeds - 1}), ${median(rows.map(r => r.areas))} areas each`);
    console.log(`crossings per route: mean ${mean(c).toFixed(2)}, median ${median(c)}, max ${Math.max(...c)}; routes with none ${c.filter(x => x === 0).length}, with one ${c.filter(x => x === 1).length}, more ${c.filter(x => x > 1).length}`);
    console.log(`the first 40 waves: ${Math.round(mean(rows.map(r => r.step40)))} m apart on average; the first wave ${Math.round(median(rows.map(r => r.first)))} m from home (median); islands ${mean(rows.map(r => r.islands)).toFixed(2)} a route; the whole route ${Math.round(mean(rows.map(r => r.length)) / 1000)} km`);
    if (!before) console.log(`planning the route: ${Math.round(median(rows.map(r => r.planMs)))} ms median, ${Math.round(Math.max(...rows.map(r => r.planMs)))} ms worst (once per map)`);
  }
} finally { await rules.close(); }
