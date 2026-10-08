// How the ley line's route crosses itself and what shape it takes (Ed, 2026-10-06: "I think the
// leylines should cover the entire set of waves the whole time"; at most four crossings, none the
// pulse would pass over already drawn ahead of it: CROSSING_RULES; the spiral, "more spiral-like",
// distance from home growing steadily, time in each direction even): for each seed, the
// whole run's route through every area in wave order (the first link the treehouse's departure
// curve, the rest straight between stones): its crossings (how many, the least wave gap and the
// earliest wave of any), its shape (how often it turns back round home, angular reversals, and back
// toward or away from home, radial reversals; radial drift, the mean gap between each wave's distance
// from home and the same-numbered smallest; one-sidedness, over 24-wave windows, 0 even all round to
// 1 all one side; the largest late dip back toward home: rules/leyroute.ts routeShape), how far apart
// the waves are, and how many wake an area bordering none the party has (an island).
//   node tools/balance/leycross.mjs [--seeds 300] [--from 1] [--varied | --was | --before] [--json]
//   (default: the spiral) --varied: the varied order before it; --was: the route as #248 planned it (the
//   noisy picker's order, untangled); --before: the noisy order as it is.
import { openRules, arg, mean, median } from "./lib.mjs";

const rules = await openRules();
try {
  const { generateMap } = await rules.load("/src/rules/map.ts");
  const { TUNING } = await rules.load("/src/rules/tuning.ts");
  const { newParty, wavePlan, routeOf } = await rules.load("/src/rules/party.ts");
  const { departureRoute } = await rules.load("/src/rules/departure.ts");
  const { leyRoute, crossingPairs, withinCrossingRules, routeShape } = await rules.load("/src/rules/leyroute.ts");
  const mode = process.argv.includes("--before") ? "before" : process.argv.includes("--was") ? "was" : process.argv.includes("--varied") ? "varied" : "route";
  const seeds = Number(arg("seeds", 300)), from = Number(arg("from", 1)), D = TUNING.leyLines.depart, rows = [];
  for (let seed = from; seed < from + seeds; seed++) {
    const map = generateMap(seed, mode === "varied" ? { ...TUNING, party: { ...TUNING.party, route: "varied" } } : TUNING), noisyMap = { ...map, tuning: { ...map.tuning, party: { ...map.tuning.party, picker: "noisy" } } };
    const noisy = () => [...wavePlan(newParty(noisyMap), noisyMap).keys()];
    const t0 = performance.now(), route = mode === "route" || mode === "varied" ? routeOf(map) : mode === "was" ? leyRoute({ ...map }, noisy) : null, planMs = performance.now() - t0;
    const order = route ? route.order : noisy();
    const st = order.map(k => { const [x, y] = k.split(",").map(Number), s = map.soundsystemSpot(x, y); return [s.x, s.z]; });
    const links = [departureRoute(map, { x: st[0][0], z: st[0][1] }, D.avoid, 4)];
    for (let i = 1; i < st.length; i++) links.push([st[i - 1], st[i]]);
    const pairs = mode === "before" ? [] : crossingPairs(links), steps = links.map(l => Math.hypot(l[l.length - 1][0] - l[0][0], l[l.length - 1][1] - l[0][1]));
    const home = `${map.centreCell[0]},${map.centreCell[1]}`, woke = new Set([home]);
    let islands = 0;
    order.forEach((k, i) => { if (i < 40 && ![...(map.neighbours.get(k) ?? [])].some(n => woke.has(n))) islands++; woke.add(k); });
    const d = map.dancefloor, ang = q => Math.atan2(q[0] - d.x, q[1] - d.z), rad = q => Math.hypot(q[0] - d.x, q[1] - d.z);
    let angRev = 0, radRev = 0, la = 0, lr = 0;
    for (let i = 1; i < st.length; i++) {
      const da = Math.atan2(Math.sin(ang(st[i]) - ang(st[i - 1])), Math.cos(ang(st[i]) - ang(st[i - 1]))), dr = rad(st[i]) - rad(st[i - 1]);
      if (Math.abs(da) > 0.05) { const s = Math.sign(da); if (la && s !== la) angRev++; la = s; }
      if (Math.abs(dr) > 40) { const s = Math.sign(dr); if (lr && s !== lr) radRev++; lr = s; }
    }
    const shape = routeShape(map, st);
    rows.push({ seed, ...shape, crossings: mode === "before" ? null : pairs.length, ok: mode === "before" ? null : withinCrossingRules(links), minGap: pairs.length ? Math.min(...pairs.map(([i, j]) => j - i)) : null, earliest: pairs.length ? Math.min(...pairs.map(([i]) => i + 1)) : null, step40: mean(steps.slice(0, 40)), first: steps[0], islands, angRev, radRev, planMs });
  }
  if (process.argv.includes("--json")) console.log(JSON.stringify(rows));
  else {
    const label = { route: "the spiral route", varied: "the varied route", was: "#248's route (the noisy order untangled)", before: "the noisy order as it is" }[mode];
    const q = (a, f) => [...a].sort((x, y) => x - y)[Math.floor(a.length * f)];
    console.log(`${label}: ${rows.length} seeds (${from}..${from + seeds - 1})`);
    if (mode !== "before") {
      const c = rows.map(r => r.crossings), dist = {};
      for (const x of c) dist[x] = (dist[x] ?? 0) + 1;
      const gaps = rows.filter(r => r.minGap !== null);
      console.log(`crossings per map: ${JSON.stringify(dist)} (max ${Math.max(...c)}); within Ed's rules on ${rows.filter(r => r.ok).length} of ${rows.length}; least wave gap ${gaps.length ? Math.min(...gaps.map(r => r.minGap)) : "–"}, earliest wave ${gaps.length ? Math.min(...gaps.map(r => r.earliest)) : "–"}`);
    }
    const rng3 = k => { const a = rows.map(r => r[k]); return `median ${median(a).toFixed(k === "oneSided" ? 2 : 0)}, 10th-90th ${q(a, 0.1).toFixed(k === "oneSided" ? 2 : 0)}-${q(a, 0.9).toFixed(k === "oneSided" ? 2 : 0)}, worst ${Math.max(...a).toFixed(k === "oneSided" ? 2 : 0)}`; };
    console.log(`radial drift (m): ${rng3("drift")}`);
    console.log(`one-sidedness (24-wave windows): ${rng3("oneSided")}`);
    console.log(`largest late dip toward home (m, after wave 24): ${rng3("lateDip")}`);
    for (const k of ["angRev", "radRev"]) { const a = rows.map(r => r[k]); console.log(`${k === "angRev" ? "turning back round home (angular reversals)" : "back toward or away from home (radial reversals)"}: median ${median(a)}, 10th-90th ${q(a, 0.1)}-${q(a, 0.9)}, spread (sd) ${Math.sqrt(mean(a.map(x => (x - mean(a)) ** 2))).toFixed(1)}`); }
    console.log(`the first 40 waves: ${Math.round(mean(rows.map(r => r.step40)))} m apart on average; the first wave ${Math.round(median(rows.map(r => r.first)))} m from home (median); islands in the first 40: mean ${mean(rows.map(r => r.islands)).toFixed(2)}, max ${Math.max(...rows.map(r => r.islands))}`);
    if (mode !== "before") console.log(`planning: ${Math.round(median(rows.map(r => r.planMs)))} ms median, ${Math.round(Math.max(...rows.map(r => r.planMs)))} ms worst (once a map)`);
  }
} finally { await rules.close(); }
