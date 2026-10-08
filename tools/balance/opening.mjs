// The opening (Ed, 2026-10-05, round 11: "start each area with just one baby and have a boot up
// period of 5 minutes", then "actually ... one baby and one youth, otherwise you can't avoid
// enraging lots of legends"). A bot plays the real rules headless (src/rules/game.ts) from her first
// step to the first wave (the 5-minute boot and the 5-minute countdown): it flies to the areas
// nearest home in turn, over the treetops, lands, and invites with 💌s (kiting any fighter that
// comes close), then moves on. A sleeping legend grows restless once its area holds none of its own
// kind and is angry angryAfter seconds later (rules/legends.ts), so how it recruits decides how many
// it angers:
//   all: invites every creature in each area (the posse grows fastest);
//   careful: leaves one of the area's kind in each area (never empties one);
//   park: invites them all, then puts the last one's sigil back down in its own area (kin there again).
//   node tools/balance/opening.mjs [--seeds 3] [--starts 1,0,0;1,1,0;0,1,1] [--policies all,careful,park] [--time 600] [--areas 12]
import { arg, list, mean, openRules } from "./lib.mjs";

const SEEDS = +arg("seeds", 3), TIME = +arg("time", 600), AREAS = +arg("areas", 12);
const STARTS = String(arg("starts", "1,0,0;1,1,0;0,1,1")).split(";").map(s => s.split(",").map(Number));
const POLICIES = list(arg("policies", "all,careful,park"));
const say = s => console.log(s), t0 = Date.now();

const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { AREA_TYPES } = await load("/src/rules/map.ts");

function run(seed, start, policy) {
  const t = withTuning({ population: { ...TUNING.population, start: { babies: start[0], young: start[1], adults: start[2] } } });
  const g = newGame(seed, t), w = g.witches[0], dt = 1 / 60, R = t.invites.range;
  g.clock.paused = false;
  w.body = { ...w.body, seated: false }; // (her first step: the boot runs from here)
  const [hx, hy] = g.map.centreCell, d0 = g.map.dancefloor;
  const order = [];
  for (const [i, j] of g.map.cells) if (i !== hx || j !== hy) { const s = g.map.siteOf(i, j); order.push({ cell: [i, j], x: s.x, z: s.z, d: Math.hypot(s.x - d0.x, s.z - d0.z), species: AREA_TYPES[g.map.typeOf(i, j)].creature }); }
  order.sort((a, b) => a.d - b.d);
  const plan = order.slice(0, AREAS);
  let ai = 0, since = 0, kos = 0, wasKo = false, parked = false, firstAngry = null;
  const same = (c, a) => c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1];
  const legends = g.creatures.filter(c => c.boss).map(c => c.id);
  for (let time = 0; time < TIME; time += dt) {
    const a = plan[ai] ?? { cell: [hx, hy], x: d0.x, z: d0.z + 30, species: null }, b = w.body, T = g.clock.time; // (every area visited: wait at home)
    let mx = 0, mz = 0, toggle = false, fire = false, aimX = 0, aimZ = 0, dash = false, sigil = false;
    const dx = a.x - b.x, dz = a.z - b.z, dist = Math.hypot(dx, dz);
    if (w.ko) { wasKo = true; }
    else if (dist > 45) { if (b.mode === "ground" && (b.lift ?? 0) <= 0) toggle = true; mx = dx / dist; mz = dz / dist; }
    else if (b.mode === "treetop") { toggle = (b.lift ?? 1) >= 1; mx = dx / dist * 0.3; mz = dz / dist * 0.3; }
    else {
      since += dt;
      const kin = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && c.fleeUntil === undefined && same(c, a) && c.species === a.species);
      const wild = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && c.fleeUntil === undefined && same(c, a) && Math.hypot(c.x - b.x, c.z - b.z) < 120);
      const open = policy === "careful" ? (kin.length > 1 ? wild.filter(c => c.species !== a.species || kin.length > 1) : wild.filter(c => c.species !== a.species)) : wild;
      if (ai >= plan.length) { /* (waiting at home) */ }
      else if (!open.length || since > 120) {
        // Done here. Parking: put the newest one of the area's kind back down in its own area.
        if (policy === "park" && !parked && !g.creatures.some(c => !c.gone && same(c, a) && c.species === a.species && !c.boss && !c.leashed)) {
          const top = w.leash.stack[w.leash.stack.length - 1];
          if (top !== undefined && g.creatures[top].species === a.species) { sigil = true; parked = true; }
          else { ai++; since = 0; parked = false; }
        } else { ai++; since = 0; parked = false; }
      } else {
        let tg = open[0], td = Infinity;
        for (const c of open) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < td) { td = d; tg = c; } }
        aimX = tg.x - b.x; aimZ = tg.z - b.z; fire = td < R * 0.95;
        let th = null, hd = Infinity;
        for (const c of wild) if (c.level > 0) { const d = Math.hypot(c.x - b.x, c.z - b.z); if (d < hd) { hd = d; th = c; } }
        if (th && hd < 9) { mx = (b.x - th.x) / hd; mz = (b.z - th.z) / hd; dash = hd < 5; }
        else if (td > R * 0.8) { mx = aimX / td; mz = aimZ / td; }
      }
    }
    stepGame(g, { moveX: mx, moveZ: mz, toggleMode: toggle, zoom: 0, fire, aimX, aimZ, dash, sigil }, dt);
    if (wasKo && !w.ko) { kos++; wasKo = false; }
    if (firstAngry === null && legends.some(id => g.creatures[id].legendState === "angry")) firstAngry = g.clock.time;
    if (g.party.wave > 0) break;
  }
  const L = legends.map(id => g.creatures[id]);
  return {
    seed, start: start.join(","), policy, areas: ai, time: g.clock.time, wave: g.party.wave,
    angry: L.filter(c => c.legendState === "angry").length, restless: L.filter(c => c.legendState === "restless").length,
    posse: w.leash.stack.length, parked: w.leash.placed.length, kos: kos + (w.ko ? 1 : 0), firstAngry,
  };
}

const rows = [];
for (const st of STARTS) for (const p of POLICIES) for (let i = 0; i < SEEDS; i++) {
  const r = run(1000 + i * 7919, st, p);
  rows.push(r);
  process.stderr.write(`${r.start} ${p} ${r.seed}: ${r.areas} areas, ${r.angry} angry, ${r.restless} restless, posse ${r.posse}, ${r.kos} KOs, ${r.time.toFixed(0)} s\n`);
}
const NAME = { "1,0,0": "1 baby", "1,1,0": "1 baby + 1 young (Ed's pick)", "0,1,1": "1 young + 1 adult (before)" };
say(`The opening (the real rules, headless): from her first step to the first wave (${TIME} s: the 5-minute boot and the 5-minute countdown), a bot flying to the ${AREAS} areas nearest home in turn and inviting with 💌s; ${SEEDS} seeds. Each cell: legends angry at the end (restless besides) / posse on her stack / knockouts / areas visited.\n`);
say("| start \\ policy | " + POLICIES.join(" | ") + " |");
say("|---|" + POLICIES.map(() => "---").join("|") + "|");
for (const st of STARTS) {
  const k = st.join(",");
  say(`| ${NAME[k] ?? k} | ` + POLICIES.map(p => { const rs = rows.filter(r => r.start === k && r.policy === p); return `${mean(rs.map(r => r.angry)).toFixed(1)} (+${mean(rs.map(r => r.restless)).toFixed(1)}) / ${mean(rs.map(r => r.posse)).toFixed(1)} / ${mean(rs.map(r => r.kos)).toFixed(1)} / ${mean(rs.map(r => r.areas)).toFixed(1)}`; }).join(" | ") + " |");
}
say(`\n(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
await close();
