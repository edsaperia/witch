// How long does a real siege take? (Ed, 2026-11-13: "Please measure real siege times on one soundsystem. Use home island
// creatures, with packs sizes up to 2 adults.") The whole game through stepGame, headless: one area of the home island is given
// its soundsystem (as a wave gives it), a pack of wild creatures of the kinds asked for stands at --dist metres from it in that
// area, and nothing else is there: no witch near (she stays on her decks at home), no party animals, no other creatures of the
// area. The rules start the siege themselves (rules/game.ts stepFights, rules/combat.ts startSiege). For each pack, over the
// seeds: the march (the siege starting to the first blow), the first blow to the fall, the total, the blows landed, the attacks
// begun (wind-ups) and the share of them that landed nothing on the soundsystem; beside the upper bound the coordinator gave Ed
// (the soundsystem's health over the pack's summed combat.json levels.dps, hitting non-stop) and the same with each kind's own
// damage (its strength, and fight.adult, the adults' strength in a fight). Measurement only: it changes no rule and no number.
//   node tools/balance/siege.mjs [--kinds stoat,hare,…] [--packs 1y,2y,1a,1a1y,2a,2a2y] [--mixed "fox@2+badger@1;…"] [--seeds 1,2,3] [--dist 50] [--max 1800]
//   node tools/balance/siege.mjs --survey [--seeds 1,2,…]   (how far an area's creatures start from its soundsystem's spot)
// Run from the repository root.
import { openRules, arg, list, nums, median } from "./lib.mjs";

/** The home island's kinds (art/areas/<id>/kind.json, phase 0; the bee has the benched marten's place). */
const HOME = ["badger", "bee", "dormouse", "fox", "hare", "hedgehog", "mole", "snail", "squirrel", "stoat"];
const KINDS = list(arg("kinds", HOME.join(","))).filter(Boolean), SEEDS = nums(arg("seeds", "1,2,3")), DIST = +arg("dist", 50), MAX = +arg("max", 1800);
// A pack as "2a1y": adults and youths of one kind (babies don't besiege).
const SHAPES = list(arg("packs", "1y,2y,1a,1a1y,2a,2a2y")).map(s => ({ name: s, adults: +(/(\d+)a/.exec(s)?.[1] ?? 0), youths: +(/(\d+)y/.exec(s)?.[1] ?? 0) }));
// Mixed packs as "fox@2+badger@1" (kind@level, 1 young, 2 adult), several split by ";".
const MIXED = String(arg("mixed", "")).split(";").filter(Boolean).map(s => ({ name: s, members: s.split("+").map(m => { const [species, l] = m.split("@"); return { species, level: +(l ?? 1) }; }) }));

const { load, close } = await openRules();
const { TUNING } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { speedFactor, wanderRange } = await load("/src/rules/creatures.ts");
const { soundsystemFor } = await load("/src/rules/party.ts");
const { observeAttacks } = await load("/src/rules/attackObservation.ts");
const { combatProfile, COMBAT, adultMult } = await load("/src/rules/combat/data.ts");
const { marchSpeedOf, topSpeedOf } = await load("/src/rules/combat.ts");
const t = TUNING, HP = t.combat.soundsystemHealth, LEVEL_DPS = COMBAT.levels.dps, LV = { 1: "youth", 2: "adult" };

/** The home island's wild areas of a seed's map (not home itself), and the creatures that start in each. */
function areasOf(g) {
  const by = new Map(), [hx, hy] = g.map.centreCell;
  for (const c of g.creatures) if (!c.gone && !c.boss && !(c.cell[0] === hx && c.cell[1] === hy)) { const k = c.cell.join(","); if (!by.has(k)) by.set(k, []); by.get(k).push(c); }
  return [...by].map(([key, cs]) => ({ key, cell: key.split(",").map(Number), cs })).sort((a, b) => (a.key < b.key ? -1 : 1));
}

if (process.argv.includes("--survey")) {
  const all = [];
  for (const seed of SEEDS) { const g = newGame(seed, t); for (const a of areasOf(g)) { const q = soundsystemFor(g.map, a.cell); all.push(...a.cs.map(c => Math.hypot(c.x - q.x, c.z - q.z))); } }
  all.sort((x, y) => x - y);
  const q = p => all[Math.min(all.length - 1, Math.floor(all.length * p))].toFixed(0);
  console.log(`Creatures' starting distance from their area's soundsystem spot, ${all.length} creatures, seeds ${SEEDS.join(",")}: median ${q(0.5)} m, quartiles ${q(0.25)}–${q(0.75)} m, range ${q(0)}–${q(1)} m.`);
  await close(); process.exit(0);
}

/** One siege: `members` ({ species, level }) at `dist` metres from the soundsystem of one of the seed's areas. */
function run(seed, members, dist) {
  const g = newGame(seed, t);
  g.clock.paused = false; g.party.paused = true; // (no waves: just this siege)
  // The area whose own kind the pack's first member is, if the seed's map has one; else the seed's first.
  const areas = areasOf(g), area = areas.find(a => a.cs.some(c => c.species === members[0].species)) ?? areas[0], cell = area.cell, key = area.key;
  const sound = soundsystemFor(g.map, cell);
  const inArea = (x, z) => { const q = g.map.cellSafe(x, z); return q.cell[0] === cell[0] && q.cell[1] === cell[1] ? q.safe : -1; };
  // Where at that distance the area has the most room; the pack stands there, a few metres apart.
  let ang = 0, room = -Infinity;
  for (let k = 0; k < 32; k++) { const a = (k / 32) * Math.PI * 2, r = inArea(sound.x + Math.cos(a) * dist, sound.z + Math.sin(a) * dist); if (r > room) { room = r; ang = a; } }
  if (room < 0) throw new Error(`seed ${seed}: area ${key} has no ground ${dist} m from its soundsystem`);
  const px = sound.x + Math.cos(ang) * dist, pz = sound.z + Math.sin(ang) * dist;
  // Creatures borrowed from far off stand in as the pack; everything else in or near the area is gone.
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - sound.x, c.z - sound.z) > 300);
  if (spare.length < members.length) throw new Error(`seed ${seed}: only ${spare.length} creatures to borrow`);
  const ids = [];
  members.forEach((m, i) => {
    const c = spare[i], side = (i - (members.length - 1) / 2) * 3, x = px - Math.sin(ang) * side, z = pz + Math.cos(ang) * side;
    Object.assign(c, { species: m.species, level: m.level, x, z, tx: x, tz: z, cell, homeX: px, homeZ: pz, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(m.species, m.level, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0, circle: undefined });
    ids.push(c.id);
  });
  const mine = new Set(ids);
  for (const c of g.creatures) if (!mine.has(c.id) && ((c.cell[0] === cell[0] && c.cell[1] === cell[1]) || Math.hypot(c.x - sound.x, c.z - sound.z) < 260)) c.gone = true;
  g.byArea = null;
  // Its soundsystem rises, as a wave gives it (rules/party.ts): the next step starts the siege.
  g.party.areas.set(key, { cell, wave: 1, at: g.clock.time, from: null, soundsystem: sound });
  const dt = 1 / 60, windups = new Map(ids.map(i => [i, []])), landed = new Map(ids.map(i => [i, []]));
  let undo = null, t0 = null, first = null, fall = null, blows = 0, other = 0, elsewhere = 0, started = false;
  for (let f = 0; f < MAX * 60 && fall === null; f++) {
    if (!undo && g.combat) undo = observeAttacks(g.combat, o => { if (o.targetKind !== "sound") return; if (o.targetId !== key) { if (mine.has(o.source)) elsewhere++; return; } if (mine.has(o.source)) landed.get(o.source).push(o.time); else other++; });
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, dash: false, aimX: 0, aimZ: 0 }, dt);
    const time = g.clock.time;
    if (t0 === null && g.combat.sounds.has(key)) { t0 = time; started = ids.every(i => g.creatures[i].siege === key); if (!started) throw new Error(`seed ${seed}: the pack did not take up the siege`); }
    for (const e of g.combat.events) {
      if (e.kind === "windup" && mine.has(e.id)) windups.get(e.id).push(e.at);
      if (e.kind === "soundHit" && e.key === key) { blows++; first ??= time; }
      if (e.kind === "soundDestroyed" && e.key === key) fall = time;
    }
  }
  undo?.();
  // An attack begun (a wind-up) missed if nothing of its creature's landed on the soundsystem before its next one began.
  let attacks = 0, missed = 0;
  for (const id of ids) { const W = windups.get(id), L = landed.get(id); attacks += W.length; W.forEach((at, i) => { const next = W[i + 1] ?? Infinity; if (!L.some(x => x >= at && x < next)) missed++; }); }
  const left = g.combat.sounds.get(key)?.hp ?? 0, here = ids.filter(i => !g.creatures[i].gone).length;
  return { march: first === null ? NaN : first - t0, fight: fall === null || first === null ? NaN : fall - first, total: fall === null ? NaN : fall - t0, blows, attacks, missed, other, elsewhere, left, here, key };
}

const f0 = x => (Number.isNaN(x) ? "–" : x.toFixed(0)), span = a => { const b = a.filter(x => !Number.isNaN(x)); return !b.length ? "never" : `${f0(median(a.map(x => (Number.isNaN(x) ? Infinity : x))) === Infinity ? NaN : median(a.map(x => (Number.isNaN(x) ? Infinity : x))))} (${f0(Math.min(...b))}–${f0(Math.max(...b))}${b.length < a.length ? `, ${a.length - b.length} never` : ""})`; };
const boundOf = ms => HP / ms.reduce((s, m) => s + LEVEL_DPS[m.level], 0), ownOf = ms => HP / ms.reduce((s, m) => s + combatProfile(m.species, m.level).damagePerSecond * adultMult(m.level), 0);
const label = sh => [sh.adults ? `${sh.adults} adult${sh.adults > 1 ? "s" : ""}` : "", sh.youths ? `${sh.youths} youth${sh.youths > 1 ? "s" : ""}` : ""].filter(Boolean).join(" + ");
const HEAD = "| pack | march s | first blow to fall s | total s | blows | attacks | missed | bound s (levels.dps) | bound s (kind's own dps, adults' strength in) | total ÷ bound |\n|---|---|---|---|---|---|---|---|---|---|";
function row(name, members) {
  const rs = SEEDS.map(s => run(s, members, DIST)), sum = k => rs.reduce((s, r) => s + r[k], 0), b = boundOf(members), tot = median(rs.map(r => (Number.isNaN(r.total) ? Infinity : r.total)));
  const odd = [sum("other") ? `${sum("other")} blows from others` : "", sum("elsewhere") ? `${sum("elsewhere")} of its blows fell on home's speakers instead` : "", rs.some(r => r.here < members.length) ? "a besieger left" : ""].filter(Boolean).join("; ");
  process.stderr.write(`${name}: ${rs.map(r => f0(r.total)).join(", ")} s\n`);
  return `| ${name} | ${span(rs.map(r => r.march))} | ${span(rs.map(r => r.fight))} | ${span(rs.map(r => r.total))} | ${f0(median(rs.map(r => r.blows)))} | ${f0(median(rs.map(r => r.attacks)))} | ${sum("attacks") ? `${Math.round((100 * sum("missed")) / sum("attacks"))}%` : "–"} | ${f0(b)} | ${f0(ownOf(members))} | ${Number.isFinite(tot) ? (tot / b).toFixed(1) : "–"}${odd ? ` (${odd})` : ""} |`;
}

console.log(`Siege times, the real rules, headless: one soundsystem (${HP} health, radius ${t.combat.soundsystemRadius} m), the pack starting ${DIST} m from it, seeds ${SEEDS.join(", ")}; the median and (the range) of the seeds, seconds; gave up at ${MAX} s.\n`);
for (const sp of KINDS) {
  // (the rows first: fight.adult is the game's once a game is made)
  const rows = SHAPES.map(sh => row(label(sh), [...Array(sh.adults).fill({ species: sp, level: 2 }), ...Array(sh.youths).fill({ species: sp, level: 1 })]));
  const own = [1, 2].map(l => combatProfile(sp, l).damagePerSecond * adultMult(l));
  console.log(`**${sp}** (own dps: youth ${own[0]}, adult ${own[1]}; marches at ${marchSpeedOf(sp, 1, t).toFixed(1)} m/s, top ${topSpeedOf(sp, 1, t).toFixed(1)} m/s)\n\n${HEAD}\n${rows.join("\n")}\n`);
}
if (MIXED.length) {
  console.log(`**mixed packs**\n\n${HEAD}`);
  for (const m of MIXED) console.log(row(m.members.map(x => `${x.species} ${LV[x.level]}`).join(" + "), m.members));
  console.log("");
}
await close();
